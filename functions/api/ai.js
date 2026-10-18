export async function onRequestPost({ request, env }) {
  try {
    // 接收前端传来的 prompt、action 和图片 base64
    const { prompt, action, imageBase64 } = await request.json();
    
    let model = 'glm-4-flash'; // 默认使用免费的文本模型
    let messages = [];

    // ============================================================
    // 1. 提取题目（支持图片和纯文本）
    // ============================================================
    if (action === 'extract') {
      const systemPrompt = `你是一个题目提取助手。请从用户提供的文本或图片中，提取所有题目并严格输出为 JSON 数组格式。
必须严格遵守以下 JSON 格式，不要输出任何其他的废话或 markdown 标记（如 \`\`\`json）：
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
3. 直接输出以 [ 开头、以 ] 结尾的纯 JSON 字符串。`;

      if (imageBase64) {
        // ★ 如果是图片，使用视觉模型 glm-4v-flash
        model = 'glm-4v-flash';
        
        // 智谱要求纯 Base64，必须去掉前端的 data:image/jpeg;base64, 前缀
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

        // ★ 注意：视觉模型不支持 system 角色，必须把提示词塞进 user 里
        messages = [
          {
            role: 'user',
            content: [
              { type: 'image_url', image_url: { url: cleanBase64 } },
              { type: 'text', text: "请提取图片中的题目，并严格输出 JSON。\n" + systemPrompt }
            ]
          }
        ];
      } else {
        // 如果是纯文本
        messages = [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ];
      }
    } 
    // ============================================================
    // 2. AI 解析题目
    // ============================================================
    else if (action === 'explain') {
      messages = [
        { role: 'system', content: "你是一个极简的答题助手。请直接输出：\n1. 核心考点：xxx\n2. 解析：xxx\n严禁输出任何多余的废话、开场白或结束语。字数控制在150字以内。" },
        { role: 'user', content: prompt }
      ];
    } 
    // ============================================================
    // 3. AI 批改简答题
    // ============================================================
    else if (action === 'grade') {
      messages = [
        { role: 'system', content: "你是阅卷老师。请对比标准答案和学生回答。如果意思相近即算正确。只允许输出两个字：'得分' 或 '不得分'。" },
        { role: 'user', content: prompt }
      ];
    }

    // ============================================================
    // 调用智谱 API
    // ============================================================
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.ZAI_API_KEY}` // 读取环境变量中的密钥
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.1, // 降低随机性，保证 JSON 格式稳定
        stream: false
      })
    });

    const data = await response.json();
    
    // 捕获接口报错
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
