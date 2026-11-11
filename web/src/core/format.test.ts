import { describe, expect, it } from 'vitest';
import {
  choiceIndexes,
  escapeHtml,
  formatAnswer,
  isEssay,
  parseAnswer,
  plainText,
  renderRich,
  sameAnswer,
  shuffle,
} from './format';

describe('escapeHtml', () => {
  it('转义 & < > " \'', () => {
    expect(escapeHtml(`<img src=x onerror="alert(1)">`)).toBe(
      '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;',
    );
    expect(escapeHtml("a & b 'c'")).toBe('a &amp; b &#39;c&#39;');
  });

  it('处理 null / undefined / 数字', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
    expect(escapeHtml(0)).toBe('0');
  });
});

describe('renderRich', () => {
  it('保留换行和图片', () => {
    const html = renderRich('第一行\n第二行![图](https://x.test/a.png)');
    expect(html).toContain('<br>');
    expect(html).toContain('<img src="https://x.test/a.png"');
  });

  it('剥掉脚本与事件属性', () => {
    const html = renderRich('<script>alert(1)</script><img src=x onerror="alert(1)"><b onclick="x()">粗</b>');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('onerror');
    expect(html).not.toContain('onclick');
    expect(html).toContain('<b>粗</b>');
  });

  it('过滤 javascript: 协议', () => {
    const html = renderRich('<img src="javascript:alert(1)">');
    expect(html).not.toContain('javascript:');
  });
});

describe('parseAnswer', () => {
  it('兼容数字 / 数组 / JSON 字符串 / 裸文本', () => {
    expect(parseAnswer(2)).toBe(2);
    expect(parseAnswer([0, 2])).toEqual([0, 2]);
    expect(parseAnswer('[0,2]')).toEqual([0, 2]);
    expect(parseAnswer('3')).toBe(3);
    expect(parseAnswer('"选低水化热水泥"')).toBe('选低水化热水泥');
    expect(parseAnswer('低水化热水泥')).toBe('低水化热水泥');
    expect(parseAnswer(undefined)).toBe('');
  });

  it('识别简答题', () => {
    expect(isEssay('一段文字')).toBe(true);
    expect(isEssay(1)).toBe(false);
    expect(choiceIndexes([2, 0])).toEqual([0, 2]);
  });
});

describe('formatAnswer', () => {
  it('数字答案带选项文本', () => {
    expect(formatAnswer(1, ['甲', '乙', '丙'])).toBe('B. 乙');
  });

  it('数组答案逐项拼接', () => {
    expect(formatAnswer([0, 2], ['甲', '乙', '丙'])).toBe('A. 甲、C. 丙');
  });

  it('文本答案原样返回', () => {
    expect(formatAnswer('先撑后拆', ['甲'])).toBe('先撑后拆');
  });

  it('空答案返回空串', () => {
    expect(formatAnswer('', [])).toBe('');
  });
});

describe('sameAnswer', () => {
  it('与顺序无关', () => {
    expect(sameAnswer([2, 0], [0, 2])).toBe(true);
    expect(sameAnswer([0], 0)).toBe(true);
    expect(sameAnswer([0, 1], 0)).toBe(false);
    // 没有标准答案时无法判定对错，一律按错处理
    expect(sameAnswer([], [])).toBe(false);
  });
});

describe('plainText / shuffle', () => {
  it('去标签后匹配关键词', () => {
    expect(plainText('<b>混凝土</b><br>养护')).toBe('混凝土养护');
  });

  it('shuffle 不丢元素', () => {
    const input = [1, 2, 3, 4, 5];
    expect(shuffle(input).sort()).toEqual(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });
});
