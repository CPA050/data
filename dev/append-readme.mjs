import fs from 'node:fs';

const p = 'README.md';
let s = fs.readFileSync(p, 'utf8');

const section = `
## 题目里怎么写图片和公式

**图片**：题库页「编辑/添加题目」→ 题干下方的「＋ 插入图片」，选图即可。图片会在浏览器里压到最长边 1400px 的 JPEG（约几十 KB），以 \`<img src="data:image/jpeg;base64,…">\` 内联进题干，跟题目一起存进 D1，不依赖图床、导出/导入都不丢。

也可以直接粘贴外链图片：\`<img src="https://example.com/a.png">\`（只放行 http(s)、data:image、blob 和站内路径）。

**公式**：用 LaTeX 写，渲染走 KaTeX 的 MathML 输出（不额外加载字体，首屏体积为零）。

| 写法 | 效果 |
|---|---|
| \`$q=20\\\\,\\\\text{kN/m}$\` | 行内公式 |
| \`$$\\\\frac{qL^2}{8}$$\` | 独立成行的分式 |
| \`\\\\(a^2+b^2=c^2\\\\)\` | 行内（备选写法） |
| \`\\\\[\\\\int_0^1 x\\\\,dx\\\\]\` | 独立成行（备选写法） |

编辑弹窗里点「＋ 插入公式」会把选中的文字自动包成 \`$…$\`；没选中就插入 \`$公式$\` 占位符。

> 从 Word/PDF 截图导入时，AI 会把公式解析成 LaTeX（识别质量取决于截图清晰度）；Word 原生公式（OMML）在 docx 纯文本解析里会退化成字符，建议用截图走 AI 识别。
`;

s = s.trimEnd() + '\n' + section;
fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('readme ok');
