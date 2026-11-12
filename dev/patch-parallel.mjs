import fs from 'node:fs';

const p = 'web/src/features/generate.ts';
const lines = fs.readFileSync(p, 'utf8').split('\n');
// 行号 155..224（1-based）是串行 for 循环，替换为 2 个并发的批处理 worker
const head = lines.slice(0, 154).join('\n');
const tail = lines.slice(224).join('\n');

const block = `
  // 两批并发：单批 10–20 秒，串行 100 道要等 1 分多钟，并行能砍掉一半
  let nextBatch = 0;
  const CONCURRENCY = 2;

  const runBatch = async (batch: number): Promise<void> => {
    if (cancelled || collected.length >= target) return;
    const want = Math.min(BATCH, target - collected.length);
    const chapter = chapterPool[batch % chapterPool.length];
    const recent = [...collected.slice(-6), ...bank.slice(0, 6)].map((q) => \`· \${plainText(q.q).slice(0, 40)}\`);

    const prompt = [
      \`题库：\${subjectVal}\`,
      chapter ? \`章节：\${chapter}\` : '',
      \`数量：\${want} 道\`,
      \`难度：\${level}\`,
      hint ? \`考点提示：\${hint}\` : '',
      batch ? \`这是第 \${batch + 1} 批，请换一批考点，不要重复前面出过的题。\` : '',
      recent.length ? \`不要与这些题相同或近似：\\n\${recent.join('\\n')}\` : '',
      '要求：贴近真实考试题型，四个选项，答案唯一，附一句解析。',
    ]
      .filter(Boolean)
      .join('\\n');

    let drafts: QuestionDraft[] = [];
    try {
      const res = await api.ai.generate(prompt);
      drafts = parseJsonQuestions(res.result ?? '');
      failed = 0;
    } catch (error) {
      failed += 1;
      const msg = error instanceof ApiError ? error.message : '网络异常';
      stopReason = msg;
      if (/次数|配额|429/.test(msg)) cancelled = true;
      return;
    }

    if (!drafts.length) {
      failed += 1;
      if (failed >= 3) stopReason = '模型没有返回可用题目，先停在这里';
      return;
    }

    const before = collected.length;
    for (const d of drafts) {
      if (collected.length >= target) break;
      const key = norm(d.q);
      if (!key || seen.has(key)) {
        dupes += 1;
        continue;
      }
      seen.add(key);
      const spec = readFigure((d as unknown as Record<string, unknown>).figure);
      const url = figureDataUrl(spec);
      if (url) {
        figures += 1;
        const caption = (spec?.caption ?? '示意图').replace(/"/g, '');
        collected.push({ ...d, q: \`\${d.q}\\n<img src="\${url}" alt="\${caption}">\` });
      } else {
        collected.push(d);
      }
      addFeed(d);
    }

    emptyStreak = collected.length > before ? 0 : emptyStreak + 1;
    if (emptyStreak >= 3) {
      cancelled = true;
      stopReason = '模型开始重复出同一批题，先停在这里';
    }
    paintProgress(collected.length, target, dupes ? \`去重 \${dupes} 道\` : '');
  };

  const worker = async (): Promise<void> => {
    while (!cancelled && collected.length < target) {
      const batch = nextBatch;
      nextBatch += 1;
      await runBatch(batch);
      await sleep(60);
    }
  };

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
`;

fs.writeFileSync(p, head + '\n' + block + '\n' + tail, 'utf8');
new TextDecoder('utf-8', { fatal: true }).decode(fs.readFileSync(p));
console.log('parallel batches written');
