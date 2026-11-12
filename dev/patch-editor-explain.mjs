import fs from 'node:fs';

const p = 'web/src/views/bank.ts';
let s = fs.readFileSync(p, 'utf8');

// 1) 编辑器里加「解析」字段 + AI 生成解析
s = s.replace(
  `    <div class="row" style="justify-content:flex-end;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`,
  `    <label class="field">
      <span class="field-label">解析 <span class="muted small">（错题复习时直接看，不用每次问 AI）</span></span>
      <textarea class="textarea" data-role="explain" rows="3" placeholder="为什么选它、其他选项错在哪">\${escapeHtml(
        question?.explain ?? '',
      )}</textarea>
    </label>
    <div class="row" style="justify-content:flex-end;gap:8px;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="gen-explain">✦ 生成解析</button>
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`,
);

// 2) 生成解析按钮
s = s.replace(
  `      const btn = card.querySelector<HTMLButtonElement>('[data-role="classify"]');
      if (!btn) return;`,
  `      const genBtn = card.querySelector<HTMLButtonElement>('[data-role="gen-explain"]');
      genBtn?.addEventListener('click', async () => {
        const qText = plainText(holder.editor?.getValue() ?? '').trim();
        const optsText = card.querySelector<HTMLTextAreaElement>('[data-role="opts"]')?.value ?? '';
        const aText = card.querySelector<HTMLInputElement>('[data-role="a"]')?.value ?? '';
        if (!qText) {
          notify.error('先写题干，AI 才能写解析');
          return;
        }
        const box = card.querySelector<HTMLTextAreaElement>('[data-role="explain"]');
        const label = genBtn.textContent ?? '';
        genBtn.disabled = true;
        genBtn.textContent = '生成中…';
        try {
          const res = await api.ai.explain(
            \`题目：\${qText}\\n选项：\${optsText.split('\\n').join('；')}\\n正确答案：\${aText}\`,
          );
          if (box) box.value = (res.result ?? '').trim();
          notify.ok('解析已生成，可再手动润色');
        } catch (error) {
          notify.error(error instanceof ApiError ? error.message : '生成失败');
        } finally {
          genBtn.disabled = false;
          genBtn.textContent = label;
        }
      });

      const btn = card.querySelector<HTMLButtonElement>('[data-role="classify"]');
      if (!btn) return;`,
);

// 3) draft 带 explain
s = s.replace(
  `    chapter: get('chapter').trim(),
    subject: get('subject').trim() || '默认题库',
  };`,
  `    chapter: get('chapter').trim(),
    subject: get('subject').trim() || '默认题库',
    explain: get('explain').trim(),
  };`,
);

// 4) 保存：带乐观锁 + 409 冲突询问
s = s.replace(
  `  try {
    if (isNew) await api.questions.add([draft]);
    else await api.questions.update(question!.id, draft);
    invalidate('bank');
    await loadBank(true);
    notify.ok(isNew ? '题目已添加' : '题目已保存');
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '保存失败');
  }`,
  `  try {
    if (isNew) {
      await api.questions.add([draft]);
    } else {
      try {
        await api.questions.update(question!.id, draft, { baseUpdatedAt: question!.updated_at });
      } catch (error) {
        // 409：另一台设备在这期间改过同一题
        if (error instanceof ApiError && error.status === 409) {
          const overwrite = await confirm({
            title: '这道题在别处被改过',
            message: '另一台设备保存了这题的更新版本。要用你现在的内容覆盖它吗？',
            okText: '覆盖',
            danger: true,
          });
          if (!overwrite) return;
          await api.questions.update(question!.id, draft, { force: true });
        } else {
          throw error;
        }
      }
    }
    invalidate('bank');
    await loadBank(true);
    notify.ok(isNew ? '题目已添加' : '题目已保存');
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '保存失败');
  }`,
);

fs.writeFileSync(p, s, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('editor explain + conflict');
