export async function onRequestPost({ request, env }) {
  try {
    const { prompt, action, imageBase64 } = await request.json();
    
    let systemPrompt = "你是一个专业的题目解析助手。";
    let model = 'glm-4-flash'; // 默认文本模型
    let userContent = prompt;

    if (action === 'explain') {
      systemPrompt = "你是一个极简的答题助手。请直接输出：\n1. 核心考点：xxx\n2. 解析：xxx\n严禁输出任何多余的废话，字数控制在150字以内。";
    } else if (action === 'grade') {
      systemPrompt = "你是阅卷老师。请对比标准答案和学生回答。只允许输出两个字：'得分' 或 '不得分'。";
    } else if (action === 'extract') {
      // ★ 核心：提取题目并格式化为 JSON
      model = imageBase64 ? 'glm-4v-flash' : 'glm-4-flash'; // 如果是图片，使用多模态模型
      systemPrompt = `你是一个题目提取助手。请从用户提供的文本或图片中，提取所有题目并严格输出为 JSON 数组格式。
必须严格遵守以下 JSON 格式，不要输出任何其他的废话或 markdown 标记：
[
  {
    "q": "题目内容",
    "opts": ["A. 选项1", "B. 选项2", "C. 选项3", "D. 选项4"],
    "a": 0,
    "chapter": "章节名(如果不知道就填'默认章节')",
    "subject": "学科名(如果不知道就填'默认题库')"
  }
]
注意：
1. 如果是简答题，opts 留空数组 []，a 填入标准答案文本。
2. 如果是多选题，a 填入数组，如 [0, 2]。
3. 绝对不要包含 \`\`\`json 这样的标记，直接输出以 [ 开头、以 ] 结尾的纯 JSON 字符串。`;
      
      // 如果有图片，组装多模态请求格式
      if (imageBase64) {
        userContent = [
          { type: "image_url", image_url: { url: imageBase64 } },
          { type: "text", text: "请提取图片中的题目，并输出 JSON。" }
        ];
      }
    }

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.ZAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        temperature: 0.1, // 降低随机性，确保 JSON 格式稳定
        stream: false
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message || 'AI 接口报错');

    let aiText = data.choices[0].message.content;
    
    // 清理 AI 可能多输出的 markdown 标记
    aiText = aiText.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();

    return Response.json({ ok: true, result: aiText });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
