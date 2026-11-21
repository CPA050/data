import { describe, expect, it } from 'vitest';
import {
  answerFrom,
  detectKind,
  docxToText,
  parseAnyQuestions,
  parseJsonQuestions,
  parseTextQuestions,
  pdfToText,
} from './import';

const SAMPLE_TEXT = `1. 普通硅酸盐水泥的初凝时间不得早于？
A. 45min
B. 60min
C. 90min
D. 30min
答案：A
章节：建筑材料

2. 大体积混凝土施工中，下列哪些措施可以降低水化热？
A. 选用低水化热水泥
B. 掺加粉煤灰
C. 使用冰水拌合
D. 增加水泥用量
答案：ABC
科目：一建建筑

3. 简述大体积混凝土裂缝控制的要点。
答案：1. 选用低水化热水泥；2. 控制入模温度；3. 分层浇筑；4. 加强养护`;

describe('parseTextQuestions', () => {
  it('解析题号 + 选项 + 答案 + 章节', () => {
    const drafts = parseTextQuestions(SAMPLE_TEXT);
    expect(drafts).toHaveLength(3);
    expect(drafts[0].q).toContain('初凝时间');
    expect(drafts[0].opts).toEqual(['45min', '60min', '90min', '30min']);
    expect(drafts[0].a).toBe(0);
    expect(drafts[0].chapter).toBe('建筑材料');
    expect(drafts[1].a).toEqual([0, 1, 2]);
    expect(drafts[1].subject).toBe('一建建筑');
    expect(drafts[2].opts).toHaveLength(0);
    expect(String(drafts[2].a)).toContain('低水化热');
  });

  it('没有题号也能按选项切题', () => {
    const drafts = parseTextQuestions(`混凝土的初凝时间不得早于？
A. 45min
B. 60min
答案：A`);
    expect(drafts).toHaveLength(1);
    expect(drafts[0].opts).toHaveLength(2);
  });

  it('一行多个选项', () => {
    const drafts = parseTextQuestions('1. 水泥初凝不得早于？ A. 45min B. 60min C. 90min');
    expect(drafts).toHaveLength(1);
    expect(drafts[0].opts).toEqual(['45min', '60min', '90min']);
  });
});

describe('parseJsonQuestions', () => {
  it('兼容数组、questions 字段与中文字段', () => {
    const raw = JSON.stringify({
      questions: [
        { 题目: 'A 题', 选项: ['x', 'y'], 答案: 'B' },
        { q: 'B 题', opts: ['x'], a: 0, chapter: 'c1' },
      ],
    });
    const drafts = parseJsonQuestions(raw);
    expect(drafts).toHaveLength(2);
    expect(drafts[0].q).toBe('A 题');
    expect(drafts[0].a).toBe(1);
    expect(drafts[1].chapter).toBe('c1');
  });

  it('带 ```json 围栏也能解析', () => {
    const raw = '```json\n[{"q":"题","opts":["a","b"],"a":"A"}]\n```';
    expect(parseJsonQuestions(raw)[0].a).toBe(0);
  });

  it('坏 JSON 返回空数组而不是抛错', () => {
    expect(parseJsonQuestions('[{oops')).toEqual([]);
  });
});

describe('parseAnyQuestions', () => {
  it('自动识别 JSON 与纯文本', () => {
    expect(parseAnyQuestions('{"q":"x","opts":["a"],"a":0}')).toHaveLength(1);
    expect(parseAnyQuestions(SAMPLE_TEXT)).toHaveLength(3);
  });
});

describe('answerFrom', () => {
  const opts = ['45min', '60min', '90min'];
  it('字母与多选', () => {
    expect(answerFrom('A', opts)).toBe(0);
    expect(answerFrom('A,B', opts)).toEqual([0, 1]);
    expect(answerFrom('AB', opts)).toEqual([0, 1]);
    expect(answerFrom([0, 2], opts)).toEqual([0, 2]);
  });
  it('文本答案原样保留', () => {
    expect(answerFrom('先浇水养护', opts)).toBe('先浇水养护');
    expect(answerFrom('4 个要点', opts)).toBe('4 个要点');
  });
});

describe('docxToText', () => {
  it('从 document.xml 抽段落文本', async () => {
    const { zipSync, strToU8 } = await import('fflate');
    const xml = `<w:document><w:body>
      <w:p><w:r><w:t>1. 水泥初凝？</w:t></w:r></w:p>
      <w:p><w:r><w:t>A. 45min</w:t></w:r></w:p>
      <w:p><w:r><w:t>答案：A</w:t></w:r></w:p>
    </w:body></w:document>`;
    const buf = zipSync({ 'word/document.xml': strToU8(xml) });
    const text = docxToText(buf.buffer as ArrayBuffer);
    expect(text).toContain('1. 水泥初凝？');
    expect(parseTextQuestions(text)).toHaveLength(1);
  });
});

describe('pdfToText', () => {
  async function makePdf(content: string, flate = true): Promise<ArrayBuffer> {
    const { zlibSync, strToU8 } = await import('fflate');
    const body = flate ? zlibSync(strToU8(content)) : strToU8(content);
    const head = strToU8('%PDF-1.4\n1 0 obj\n<< /Length ' + body.length + (flate ? ' /Filter /FlateDecode' : '') + ' >>\nstream\n');
    const tail = strToU8('\nendstream\nendobj\n%%EOF\n');
    const pdf = new Uint8Array(head.length + body.length + tail.length);
    pdf.set(head, 0);
    pdf.set(body, head.length);
    pdf.set(tail, head.length + body.length);
    return pdf.buffer as ArrayBuffer;
  }

  it('从 FlateDecode 内容流抽出题目并解析', async () => {
    const content = [
      '(1. 水泥初凝不得早于？) Tj',
      '(A. 45min) Tj',
      '(B. 60min) Tj',
      '(答案：A) Tj',
    ].join(' ');
    const text = pdfToText(await makePdf(content));
    expect(text).toContain('水泥初凝');
    const drafts = parseTextQuestions(text);
    expect(drafts).toHaveLength(1);
    expect(drafts[0].a).toBe(0);
  });

  it('裸 deflate（无 zlib 头）也能解', async () => {
    const { deflateSync, strToU8 } = await import('fflate');
    const content = '(1. 水的化学式？) Tj (A. H2O) Tj (答案：A) Tj';
    const body = deflateSync(strToU8(content));
    const head = strToU8('%PDF-1.4\n1 0 obj\n<< /Length ' + body.length + ' /Filter /FlateDecode >>\nstream\n');
    const tail = strToU8('\nendstream\nendobj');
    const pdf = new Uint8Array(head.length + body.length + tail.length);
    pdf.set(head, 0);
    pdf.set(body, head.length);
    pdf.set(tail, head.length + body.length);
    expect(pdfToText(pdf.buffer as ArrayBuffer)).toContain('H2O');
  });

  it('扫描件（无文字）抛可读错误', async () => {
    const pdf = await makePdf('q\n1 0 0 1 10 10 cm\n');
    expect(() => pdfToText(pdf)).toThrow(/扫描件|没有可提取/);
  });
});

describe('detectKind', () => {
  it('pdf 扩展名与 MIME 都识别为 pdf', () => {
    expect(detectKind(new File(['x'], 'a.pdf'))).toBe('pdf');
    expect(detectKind(new File(['x'], 'b.PDF', { type: 'application/pdf' }))).toBe('pdf');
    expect(detectKind(new File(['x'], 'c.docx'))).toBe('docx');
    expect(detectKind(new File(['x'], 'd.txt'))).toBe('text');
  });
});
