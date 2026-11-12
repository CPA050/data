import fs from 'node:fs';

const p = 'functions/api/ai.js';
let s = fs.readFileSync(p, 'utf8');

const oldTail = `要求：
1. 单选题 a 为数字（从 0 开始），多选题 a 为数组如 [0, 2]，不要出简答题。
2. 四个选项必须互斥且只有一个/一组正确，干扰项要像真题。
3. 题目必须自洽、可直接作答，不要引用图表。
4. 数量严格按用户要求，不要多也不要少。\``;

const newTail = `可选配图：如果这道题必须看图才能答（受力图 / 截面图 / 进度横道图），在对象里加 figure 字段，我们会在本地把它画成示意图：
  "figure": {"kind": "beam", "caption": "简支梁受力图", "span": 6, "load": "uniform", "value": 20}
  kind 只能是：
  - "beam"（梁受力图）：span 跨度(m)，load 取 "uniform" 或 "point"，value 荷载大小
  - "section"（矩形截面图）：width 宽(mm)，height 高(mm)
  - "flow"（施工进度横道图）：steps 数组，每项 {"name":"工序名","start":起始天,"duration":天数}
注意：figure 里只放数值，不要把文字说明塞进 figure；题干里要写"如图所示"，但不要在题干里写具体图形。
如果题目不需要图，就不要加 figure 字段。

要求：
1. 单选题 a 为数字（从 0 开始），多选题 a 为数组如 [0, 2]，不要出简答题。
2. 四个选项必须互斥且只有一个/一组正确，干扰项要像真题。
3. 题目必须自洽、可直接作答；只有配了 figure 的题才允许出现"如图"字样。
4. 数量严格按用户要求，不要多也不要少；至少一半题目要配 figure（如果这个章节适合出图）。\``;

if (!s.includes('可选配图')) {
  s = s.replace(oldTail, newTail);
  fs.writeFileSync(p, s, 'utf8');
}
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('generate prompt updated');
