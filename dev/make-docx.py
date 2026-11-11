import sys
from docx import Document
from docx.shared import Pt

doc = Document()
lines = [
    "一建建筑 题目练习",
    "1. 普通硅酸盐水泥的初凝时间不得早于？",
    "A. 45min",
    "B. 60min",
    "C. 90min",
    "D. 30min",
    "答案：A",
    "章节：建筑材料",
    "科目：一建建筑",
    "",
    "2. 大体积混凝土施工中，下列哪些措施可以降低水化热？",
    "A. 选用低水化热水泥",
    "B. 掺加粉煤灰",
    "C. 使用冰水拌合",
    "D. 增加水泥用量",
    "答案：ABC",
    "章节：混凝土工程",
    "科目：一建建筑",
    "",
    "3. 简述大体积混凝土裂缝控制的要点。",
    "答案：1. 选用低水化热水泥；2. 控制入模温度；3. 分层浇筑；4. 加强养护",
    "章节：混凝土工程",
    "科目：一建建筑",
]
for line in lines:
    p = doc.add_paragraph(line)
    p.paragraph_format.space_after = Pt(0)

out = sys.argv[1]
doc.save(out)
print("saved", out)
