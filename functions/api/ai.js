export async function onRequestPost({ request, env }) {
  try {
    const { prompt, action, imageBase64 } = await request.json();
    
    let model = 'glm-4-flash'; 
    let messages = [];
    const systemPrompt = `你是一个题目提取助手。请从用户提供的文本或图片中，提取所有题目并严格输出为 JSON 数组格式。
必须严格遵守以下 JSON 格式，不要输出任何其他的废话或 markdown 标记：
[
  {
    "q": "题目内容",
    "opts": ["A. 选项1", "B. 选项2"],
    "a": 0,
    "chapter": "章节名",
    "subject": "学科名"
  }
]
注意：简答题 opts 留空数组 []，a 填入答案文本。多选 a 填入数组 [0, 2]。绝对不要包含 ```json 这样的标记。`;

    if (action === 'extract') {
      if (imageBase64) {
        // ★ 视觉模型：不支持 system 角色，把所有话塞进 user
        model = 'glm-4v-flash';
        
        // 智谱要求纯 Base64，去掉 data:image/xxx;base64, 前缀
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

        messages = [
          {
            role: 'user',
            content: [
              { type: 'image_url', image_url: { url: cleanBase64 } },
              { type: 'text', text: "请提取图片中的题目，并输出 JSON。\n" + systemPrompt }
            ]
          }
        ];
      } else {
        // 纯文本模型
        messages = [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ];
      }
    } else {
      // 其他功能（解析、批改）
      let sys = action === 'explain' ? "请输出核心考点和解析，字数150字以内。" : "请对比答案，输出'得分'或'不得分'。";
      messages = [
        { role: 'system', content: sys },
        { role: 'user', content: prompt }
      ];
    }

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.ZAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.1,
        stream: false
      })
    });

    const data = await response.json();
    
    // 打印真实报错信息（如果出错，会在 Cloudflare 实时日志里看到）
    if (data.error) {
        console.error("智谱API报错:", data.error);
        throw new Error(data.error.message || 'AI 接口报错');
    }

    let aiText = data.choices[0].message.content;
    // 清理 AI 可能多输出的 markdown 标记
    aiText = aiText.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();

    return Response.json({ ok: true, result: aiText });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
