import json
import sys
import zipfile

import docx

path = sys.argv[1]
d = docx.Document(path)
paras = [p.text for p in d.paragraphs]
with zipfile.ZipFile(path) as z:
    media = [n for n in z.namelist() if n.startswith('word/media/')]
    doc_xml = z.read('word/document.xml').decode('utf-8')

out = {
    'paragraphs': len(paras),
    'head': paras[:8],
    'has_answers': any('参考答案' in p for p in paras),
    'inline_shapes': len(d.inline_shapes),
    'media': media,
    'doc_len': len(doc_xml),
    'valid_xml': doc_xml.startswith('<?xml') and '</w:document>' in doc_xml,
}
with open(r'C:\Users\cpa\Documents\deepseek-harness\default-workspace\repo\screens\docx-check.json', 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print('ok')
