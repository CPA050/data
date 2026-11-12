function escapeRe(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 给已经转义过的 HTML 片段加高亮。
 * 只在文本节点里替换，不会破坏标签与属性；关键词按字面量匹配、忽略大小写。
 */
export function highlightHtml(html: string, keyword: string): string {
  const needle = keyword.trim();
  if (!needle) return html;
  const re = new RegExp(escapeRe(needle), 'gi');
  return html.replace(/<[^>]+>|[^<]+/g, (chunk) => {
    if (chunk.startsWith('<')) return chunk;
    return chunk.replace(re, (hit) => `<mark class="hl">${hit}</mark>`);
  });
}

/** 纯文本高亮（用于 title 属性、导出等不需要标签的场合） */
export function highlightText(text: string, keyword: string): string {
  return highlightHtml(text, keyword);
}
