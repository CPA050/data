export async function onRequestPost({ request, env }) {
  try {
    const { prompt, action } = await request.json();
    
    let systemPrompt = "你是一个专业的题目解析助手。";
    if (action === 'explain') {
      systemPrompt = "请用简洁易懂的语言，解释这道题的解题思路和知识点。不要输出与题目无关的内容。";
    } else if (action === 'grade') {
      systemPrompt = "你是一个阅卷老师。请对比标准答案和学生的回答，判断是否得分。只需回答“得分”或“不得分”，并给出一句话的简要理由。";
    }

    // 智谱 API 地址
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.ZAI_API_KEY}` // 读取环境变量中的密钥
      },
      body: JSON.stringify({
        model: 'glm-4-flash', // 永久免费模型
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        stream: false
      })
    });

    const data = await response.json();
    const aiText = data.choices[0].message.content;

    return Response.json({ ok: true, result: aiText });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
