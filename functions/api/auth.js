export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { action, username, password, newPassword } = body;

    if (!username) return Response.json({ ok: false, error: '缺少用户名' }, { status: 400 });

    // 1. 检查用户是否设置了密码
    if (action === 'check') {
      const user = await env.exam_db.prepare("SELECT password FROM users WHERE username = ?").bind(username).first();
      return Response.json({ ok: true, hasPassword: !!user });
    }

    // 2. 首次设置密码
    if (action === 'set') {
      if (!password || password.length < 4) return Response.json({ ok: false, error: '密码至少4位' });
      const exist = await env.exam_db.prepare("SELECT username FROM users WHERE username = ?").bind(username).first();
      if (exist) return Response.json({ ok: false, error: '该用户已设置过密码' });
      
      await env.exam_db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").bind(username, password).run();
      return Response.json({ ok: true });
    }

    // 3. 验证登录密码
    if (action === 'login') {
      const user = await env.exam_db.prepare("SELECT password FROM users WHERE username = ?").bind(username).first();
      if (!user) return Response.json({ ok: false, error: '用户不存在' });
      if (user.password !== password) return Response.json({ ok: false, error: '密码错误' });
      return Response.json({ ok: true });
    }

    // 4. 修改密码
    if (action === 'change') {
      const user = await env.exam_db.prepare("SELECT password FROM users WHERE username = ?").bind(username).first();
      if (!user) return Response.json({ ok: false, error: '用户不存在' });
      if (user.password !== password) return Response.json({ ok: false, error: '原密码错误' });
      if (!newPassword || newPassword.length < 4) return Response.json({ ok: false, error: '新密码至少4位' });

      await env.exam_db.prepare("UPDATE users SET password = ? WHERE username = ?").bind(newPassword, username).run();
      return Response.json({ ok: true });
    }

    return Response.json({ ok: false, error: '未知操作' });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
