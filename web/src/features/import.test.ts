import { describe, expect, it } from 'vitest';
import { answerFrom, docxToText, parseAnyQuestions, parseJsonQuestions, parseTextQuestions } from './import';

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
