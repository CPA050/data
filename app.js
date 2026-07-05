// ==========================================
// 🚀 QuizApp 9.3 · 智能刷题 + 错题重练 + 多端适配
// ==========================================

window.QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    startX: 0,
    startY: 0,
    isScrolling: false,
    folderStartY: 0,
    folderMoveY: 0,
    folderVisible: false,
    lastSelected: 20,
    lastMode: 'sequential',
    _source: 'all', // 'all' | 'wrong'

    // ------------------------------------------------------------
    // 1. 核心业务：加载并开始答题（支持 source 参数）
    // ------------------------------------------------------------
    async start(isRandom, limit = -1, source = 'all') {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录！"); return; }
        try {
            let bank = [];
            this._source = source;

            if (source === 'wrong') {
                // 从错题库加载
                const wrongRes = await fetch(`/api/wrong?user_id=${encodeURIComponent(user)}`);
                const wrongData = await wrongRes.json();
                if (!wrongData || wrongData.length === 0) {
                    alert("🎉 暂无错题，继续加油！");
                    return;
                }
                // 映射为标准格式
                bank = wrongData.map(item => ({
                    id: item.id,
                    q: item.q,
                    opts: item.opts || [],
                    a: item.answer !== undefined ? item.opts.indexOf(item.answer) : 0,
                    _wrongId: item.id // 保留错题ID用于删除
                }));
                // 如果没有 opts，尝试从 answer 反推
                if (bank.length > 0 && bank[0].opts.length === 0) {
                    // 如果只有 q 和 answer，无法反推，提示错误
                    alert("错题数据格式不完整，请重新添加错题。");
                    return;
                }
                // 保存错题ID映射
                this._wrongIdMap = {};
                bank.forEach(item => {
                    this._wrongIdMap[item.id] = item._wrongId;
                });
            } else {
                // 从主题库加载
                const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
                bank = await res.json();
                if (!bank || bank.length === 0) {
                    alert("❌ 题库为空，请先添加题目！");
                    return;
                }
                this._wrongIdMap = {};
            }

            this.lastMode = isRandom ? 'random' : 'sequential';

            let selectedBank = [];
            if (limit === -1 || limit >= bank.length) {
                selectedBank = bank;
            } else {
                if (isRandom) {
                    const recent = this.getRecentQuestions(user);
                    const available = bank.filter(q => !recent.includes(q.id));
                    let pool = available.length >= limit ? available : bank;
                    const shuffled = [...pool].sort(() => Math.random() - 0.5);
                    selectedBank = shuffled.slice(0, limit);
                } else {
                    const progress = this.getProgress(user);
                    let startIdx = progress.sequential_index || 0;
                    if (startIdx >= bank.length) {
                        startIdx = 0;
                        this.saveProgress(user, { sequential_index: 0 });
                    }
                    const end = Math.min(startIdx + limit, bank.length);
                    selectedBank = bank.slice(startIdx, end);
                    this._pendingStart = startIdx;
                    this._pendingLimit = limit;
                    this._totalBank = bank;
                }
            }

            if (selectedBank.length === 0) {
                alert("没有符合条件的题目，请重试。");
                return;
            }

            this.activeBank = selectedBank;
            this.idx = 0;
            this.record = new Array(this.activeBank.length).fill(null);

            document.getElementById("home").style.display = "none";
            document.getElementById("app").innerHTML = `
                <div class="app-card" id="mainQuizCard"></div>
                <div class="glass-trigger" id="masterGlassBtn">
                    <svg viewBox="0 0 24 24"><path d="M4 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 12h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 18h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/></svg>
                </div>
                <div class="folder-overlay" id="folderOverlay"></div>
                <div class="grid-folder" id="gridFolder">
                    <div class="folder-drag-handle"></div>
                    <div class="folder-grid-content" id="folderGrid"></div>
                </div>
            `;
            document.getElementById("app").className = "stage-container";
            document.getElementById("app").style.display = "block";
            this.renderCard(false);
            this.bindGlobalEvents();
            this.renderGrid();
            this.folderVisible = false;
            this._currentLimit = limit;
            this._isRandom = isRandom;

        } catch (err) {
            alert("加载题库失败：" + err.message);
        }
    },

    renderCard(needAnimation) {
        const card = document.getElementById("mainQuizCard");
        if (!card) return;
        const q = this.activeBank[this.idx];
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;

        const htmlContent = `
            <div id="top">
                <span>正确率: ${acc}% | 进度: ${done}/${this.activeBank.length}</span>
                <button onclick="window.location.href='/'" style="background:rgba(255,255,255,0.2); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.3); border-radius:30px; padding:4px 14px; font-size:13px; font-weight:500; color:#0071e3; cursor:pointer;">🏠 返回</button>
            </div>
            <h2>Q${this.idx + 1}. ${q.q}</h2>
            ${q.opts.map((o, oIdx) => {
                let cls = "opt";
                if (this.record[this.idx] !== null) {
                    if (oIdx === q.a) cls += " correct";
                    else if (oIdx === this.record[this.idx]) cls += " wrong";
                }
                return `<div class="${cls}" onclick="QuizApp.select(${oIdx}, this)">${o}</div>`;
            }).join("")}
        `;

        if (needAnimation) {
            card.classList.add("card-fade");
            setTimeout(() => { card.innerHTML = htmlContent; card.classList.remove("card-fade"); }, 180);
        } else {
            card.innerHTML = htmlContent;
        }
        this.renderGrid();
    },

    select(oIdx, element) {
        if (this.record[this.idx] !== null) return;
        const q = this.activeBank[this.idx];
        this.record[this.idx] = oIdx;
        const isCorrect = (oIdx === q.a);
        if (isCorrect) {
            element.classList.add("correct");
        } else {
            element.classList.add("wrong");
            const opts = element.parentNode.querySelectorAll(".opt");
            if (opts[q.a]) opts[q.a].classList.add("correct");
            // 只有从主题库刷题才记录错题
            if (this._source === 'all') {
                const user = this.getCurrentUser();
                if (user) this.uploadWrongQuestion(user, q);
            }
        }
        this.renderGrid();

        const allDone = this.record.every(v => v !== null);
        if (allDone) {
            setTimeout(() => this.finishBatch(), 600);
            return;
        }

        setTimeout(() => {
            if (this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this.renderCard(true);
            } else {
                this.finishBatch();
            }
        }, 500);
    },

    finishBatch() {
        const user = this.getCurrentUser();
        if (!user) return;
        const total = this.record.length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = total > 0 ? Math.round(correct / total * 100) : 0;

        // 处理顺序模式断点
        if (!this._isRandom && this._totalBank && this._pendingStart !== undefined && this._source === 'all') {
            const newIndex = this._pendingStart + this.activeBank.length;
            if (newIndex >= this._totalBank.length) {
                this.saveProgress(user, { sequential_index: 0 });
                alert("🎉 恭喜！你已经刷完所有题目！");
            } else {
                this.saveProgress(user, { sequential_index: newIndex });
            }
        }

        // 保存最近做过的题（用于随机去重）
        const recentIds = this.activeBank.map(q => q.id);
        this.saveRecentQuestions(user, recentIds);

        // 🆕 错题重练模式：删除已做对的错题
        if (this._source === 'wrong') {
            const correctIds = this.activeBank
                .filter((q, i) => this.record[i] !== null && this.record[i] === q.a)
                .map(q => q.id);
            if (correctIds.length > 0) {
                // 批量删除错题
                const deletePromises = correctIds.map(id => {
                    const wrongId = this._wrongIdMap[id] || id;
                    return this.deleteWrongQuestion(wrongId, user);
                });
                Promise.all(deletePromises).then(() => {
                    console.log(`已移除 ${correctIds.length} 道错题`);
                }).catch(err => console.error('删除错题失败:', err));
            }
            // 检查是否还有剩余错题
            const wrongCount = this.activeBank.filter((q, i) => this.record[i] !== null && this.record[i] !== q.a).length;
            const remaining = this.activeBank.length - correct.length;
            if (remaining === 0) {
                setTimeout(() => alert("🎉 所有错题已消灭！"), 300);
            }
        }

        const modeLabel = this._source === 'wrong' ? '错题重练' : '刷题';
        const msg = `✅ ${modeLabel}完成！\n共 ${total} 题，正确率 ${acc}%`;
        if (confirm(msg + "\n\n点击「确定」再来一组，点击「取消」返回首页")) {
            const limit = this._currentLimit || 20;
            const isRandom = this._isRandom || false;
            const source = this._source || 'all';
            this.start(isRandom, limit, source);
        } else {
            window.location.reload();
        }
    },

    // ------------------------------------------------------------
    // 2. 题库管理（完整保留）
    // ------------------------------------------------------------
    async showManager() {
        const user = this.checkLogin();
        if (!user) return;
        document.getElementById("home").style.display = "none";
        document.getElementById("app").style.display = "block";
        document.getElementById("app").className = "stage-container";
        document.getElementById("app").innerHTML = `
            <div class="app-card" style="padding:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:8px;">
                    <h2 style="margin:0; font-size:22px;">📚 我的题库</h2>
                    <span style="font-size:14px; color:#86868b; background:rgba(0,0,0,0.05); padding:4px 12px; border-radius:20px;">👤 ${user}</span>
                </div>
                <div style="display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap;">
                    <button onclick="QuizApp.showAddForm()" style="flex:1; min-width:120px; background:#34c759; color:#fff; border:none; border-radius:12px; padding:12px 16px; font-size:15px; font-weight:600; cursor:pointer; box-shadow:0 4px 12px rgba(52,199,89,0.3); transition:0.2s;">➕ 添加题目</button>
                    <button onclick="window.location.reload()" style="flex:1; min-width:120px; background:#86868b; color:#fff; border:none; border-radius:12px; padding:12px 16px; font-size:15px; font-weight:600; cursor:pointer; transition:0.2s;">🏠 返回首页</button>
                </div>
                <div style="margin-bottom: 12px;">
                    <input id="searchInput" type="text" placeholder="🔍 搜索题目..."
                           style="width:100%; padding:10px 14px; border:1px solid rgba(0,0,0,0.08); border-radius:10px; font-size:15px; background:rgba(255,255,255,0.5); outline:none; transition:0.2s;"
                           oninput="QuizApp.loadQuestionsForManageWithSearch()" />
                </div>
                <div id="managerList" style="text-align:left; max-height: 400px; overflow-y: auto; padding-right:4px;">
                    <div style="text-align:center; padding:40px 0; color:#86868b;">加载中...</div>
                </div>
            </div>
        `;
        await this.loadQuestionsForManageWithSearch();
    },

    async loadQuestionsForManageWithSearch() {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }
        const list = document.getElementById("managerList");
        const searchInput = document.getElementById("searchInput");
        const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';

        try {
            const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();

            if (!data || data.length === 0) {
                list.innerHTML = `
                    <div style="text-align:center; padding:50px 20px; background:rgba(255,255,255,0.3); border-radius:16px; border:2px dashed rgba(0,0,0,0.08);">
                        <div style="font-size:48px; margin-bottom:12px;">📭</div>
                        <div style="font-size:16px; color:#86868b;">暂无题目</div>
                        <div style="font-size:14px; color:#a0a0a0; margin-top:4px;">点击「添加题目」创建第一道题</div>
                    </div>
                `;
                return;
            }

            let filteredData = data;
            if (keyword) {
                filteredData = data.filter(item =>
                    item.q.toLowerCase().includes(keyword) ||
                    item.opts.some(opt => opt.toLowerCase().includes(keyword))
                );
            }

            if (filteredData.length === 0) {
                list.innerHTML = `
                    <div style="text-align:center; padding:40px 20px; color:#86868b;">
                        🔍 没有找到与「${keyword}」匹配的题目
                    </div>
                `;
                return;
            }

            const total = data.length;
            const filteredTotal = filteredData.length;
            const searchInfo = keyword ? `（筛选结果 ${filteredTotal}/${total} 道）` : '';

            list.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:13px; color:#86868b; margin-bottom:12px; padding:8px 12px; background:rgba(0,0,0,0.03); border-radius:8px; flex-wrap:wrap; gap:4px;">
                    <span>共 <strong style="color:#1d1d1f;">${total}</strong> 道题 ${searchInfo}</span>
                    ${keyword ? `<span onclick="document.getElementById('searchInput').value='';QuizApp.loadQuestionsForManageWithSearch();" style="color:#0071e3; cursor:pointer;">✕ 清除筛选</span>` : ''}
                </div>
                ${filteredData.map((q, i) => `
                    <div style="background:rgba(255,255,255,0.5); backdrop-filter:blur(10px); border-radius:14px; padding:12px 14px; margin-bottom:10px; border:1px solid rgba(255,255,255,0.6); box-shadow:0 2px 8px rgba(0,0,0,0.04); transition:0.2s; display:flex; flex-wrap:wrap; align-items:center; gap:8px;">
                        <div style="flex-shrink:0; width:28px; height:28px; background:#0071e3; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:600;">${i + 1}</div>
                        <div style="flex:1; min-width:150px;">
                            <div style="font-size:15px; font-weight:500; color:#1d1d1f; line-height:1.4; word-break:break-word;">${q.q}</div>
                            <div style="font-size:12px; color:#86868b; margin-top:4px;">
                                ${q.opts.length} 个选项 · 正确答案: ${q.opts[q.a] || q.a}
                            </div>
                        </div>
                        <div style="display:flex; gap:6px; flex-wrap:wrap; flex-shrink:0;">
                            <button onclick="QuizApp.editQuestion(${q.id})" style="background:#0071e3; color:#fff; border:none; border-radius:10px; padding:6px 14px; font-size:13px; font-weight:500; cursor:pointer; transition:0.2s;">✏️ 编辑</button>
                            <button onclick="QuizApp.deleteQuestion(${q.id})" style="background:#ff3b30; color:#fff; border:none; border-radius:10px; padding:6px 14px; font-size:13px; font-weight:500; cursor:pointer; transition:0.2s;">🗑️ 删除</button>
                        </div>
                    </div>
                `).join('')}
            `;
        } catch (e) {
            list.innerHTML = `<div style="text-align:center; padding:40px; color:#ff3b30;">加载失败：${e.message}</div>`;
        }
    },

    showAddForm() {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }
        const q = prompt("请输入题目内容：");
        if (!q) return;
        const optsRaw = prompt("请输入选项，用逗号分隔（如：A. 选项1, B. 选项2, C. 选项3）：");
        if (!optsRaw) return;
        const opts = optsRaw.split(',').map(s => s.trim());
        const a = parseInt(prompt("请输入正确答案的序号（从0开始，例如0代表第一个选项）："));
        if (isNaN(a) || a < 0 || a >= opts.length) {
            alert("序号无效");
            return;
        }
        this.submitQuestion({ q, opts, a });
    },

    async submitQuestion(questionData) {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }
        try {
            const res = await fetch('/api/questions-add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...questionData, user_id: user })
            });
            const result = await res.json();
            if (result.ok) {
                alert("添加成功！");
                this.loadQuestionsForManageWithSearch();
            } else {
                alert("添加失败：" + (result.error || ''));
            }
        } catch (e) {
            alert("请求失败：" + e.message);
        }
    },

    async deleteQuestion(id) {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }
        if (!confirm("确定删除这道题吗？")) return;
        try {
            const res = await fetch('/api/questions-delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user, id })
            });
            const result = await res.json();
            if (result.ok) {
                alert("删除成功");
                this.loadQuestionsForManageWithSearch();
            } else {
                alert("删除失败：" + (result.error || ''));
            }
        } catch (e) {
            alert("请求失败：" + e.message);
        }
    },

    async editQuestion(id) {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }
        const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
        const all = await res.json();
        const q = all.find(item => item.id === id);
        if (!q) { alert("未找到该题"); return; }
        const newQ = prompt("编辑题目内容：", q.q);
        if (newQ === null) return;
        const newOptsRaw = prompt("编辑选项（逗号分隔）：", q.opts.join(', '));
        if (newOptsRaw === null) return;
        const newOpts = newOptsRaw.split(',').map(s => s.trim());
        const newA = parseInt(prompt("编辑正确答案序号（从0开始）：", q.a));
        if (isNaN(newA) || newA < 0 || newA >= newOpts.length) {
            alert("序号无效");
            return;
        }
        try {
            const updateRes = await fetch('/api/questions-update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user, id, q: newQ, opts: newOpts, a: newA })
            });
            const result = await updateRes.json();
            if (result.ok) {
                alert("更新成功！");
                this.loadQuestionsForManageWithSearch();
            } else {
                alert("更新失败：" + (result.error || ''));
            }
        } catch (e) {
            alert("请求失败：" + e.message);
        }
    },

    // ------------------------------------------------------------
    // 3. 用户管理
    // ------------------------------------------------------------
    getCurrentUser() { return localStorage.getItem('quiz_user_id'); },
    checkLogin() {
        let user = this.getCurrentUser();
        if (!user) {
            user = prompt("🍏 请输入您的用户名：");
            if (user) {
                localStorage.setItem('quiz_user_id', user.trim());
                this.updateUserUI();
                return user.trim();
            }
            return null;
        }
        return user;
    },
    logout() {
        if (confirm("确定退出吗？")) {
            localStorage.removeItem('quiz_user_id');
            this.updateUserUI();
            alert("已退出");
            window.location.reload();
        }
    },
    checkLoginBeforeGo(targetUrl) {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return false; }
        window.location.href = targetUrl;
        return false;
    },
    updateUserUI() {
        const user = this.getCurrentUser();
        const info = document.getElementById('userInfoText');
        const btn = document.getElementById('logoutBtn');
        if (info) {
            info.textContent = user ? `🍏 已登录: ${user}` : `👤 游客模式`;
            if (btn) btn.style.display = user ? 'inline-block' : 'none';
        }
    },

    // ------------------------------------------------------------
    // 4. 错题相关
    // ------------------------------------------------------------
    async uploadWrongQuestion(userId, q) {
        try {
            await fetch('/api/wrong-add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, q: q.q, opts: q.opts, a: q.a })
            });
        } catch (e) { console.error(e); }
    },

    async deleteWrongQuestion(id, userId) {
        try {
            await fetch('/api/wrong-delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, id: id })
            });
        } catch (e) { console.error(e); }
    },

    // ------------------------------------------------------------
    // 5. 导航网格
    // ------------------------------------------------------------
    toggleFolder(show) {
        const folder = document.getElementById('gridFolder');
        const overlay = document.getElementById('folderOverlay');
        if (!folder || !overlay) return;
        if (show === undefined) this.folderVisible = !this.folderVisible;
        else this.folderVisible = show;
        if (this.folderVisible) {
            folder.classList.add('active');
            overlay.classList.add('active');
            this.renderGrid();
        } else {
            folder.classList.remove('active');
            overlay.classList.remove('active');
        }
    },
    renderGrid() {
        const container = document.getElementById('folderGrid');
        if (!container) return;
        const total = this.activeBank.length;
        if (total === 0) {
            container.innerHTML = '<div style="padding:20px;text-align:center;color:#86868b;">暂无题目</div>';
            return;
        }
        let html = '';
        for (let i = 0; i < total; i++) {
            const status = this.record[i];
            let cls = 'qbtn';
            if (status !== null) {
                cls += (status === this.activeBank[i].a) ? ' grid-correct' : ' grid-wrong';
            }
            if (i === this.idx) cls += ' grid-active';
            html += `<div class="${cls}" onclick="QuizApp.jumpToQuestion(${i})">${i + 1}</div>`;
        }
        container.innerHTML = html;
    },
    jumpToQuestion(index) {
        if (index < 0 || index >= this.activeBank.length) return;
        this.idx = index;
        this.toggleFolder(false);
        this.renderCard(true);
    },

    // ------------------------------------------------------------
    // 6. 事件绑定
    // ------------------------------------------------------------
    bindGlobalEvents() {
        const btn = document.getElementById('masterGlassBtn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFolder();
            });
        }
        const overlay = document.getElementById('folderOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.toggleFolder(false);
            });
        }
        // 键盘快捷键（桌面端）
        document.addEventListener('keydown', (e) => {
            // 仅在答题界面生效
            if (document.getElementById('app').style.display === 'none') return;
            // 1-4 选择选项
            const num = parseInt(e.key);
            if (num >= 1 && num <= 4) {
                const opts = document.querySelectorAll('.opt:not(.correct):not(.wrong)');
                if (opts[num - 1]) opts[num - 1].click();
            }
            // Enter 确认（跳下一题）
            if (e.key === 'Enter') {
                const nextBtn = document.querySelector('#top button');
                if (nextBtn && nextBtn.textContent.includes('下一题')) nextBtn.click();
            }
            // Esc 关闭弹窗
            if (e.key === 'Escape') {
                this.closeQuantityModal();
                this.toggleFolder(false);
            }
            // ← → 切换题目
            if (e.key === 'ArrowLeft' && this.idx > 0) {
                this.idx--;
                this.renderCard(true);
            }
            if (e.key === 'ArrowRight' && this.idx < this.activeBank.length - 1) {
                this.idx++;
                this.renderCard(true);
            }
        });
    },

    // ------------------------------------------------------------
    // 7. 主题系统
    // ------------------------------------------------------------
    setTheme(theme) {
        const body = document.body;
        body.classList.remove('theme-light','theme-dark','theme-eye','theme-custom','bg-image');
        if (theme === 'light') { body.classList.add('theme-light'); localStorage.setItem('quiz_theme','light'); }
        else if (theme === 'dark') { body.classList.add('theme-dark'); localStorage.setItem('quiz_theme','dark'); }
        else if (theme === 'eye') { body.classList.add('theme-eye'); localStorage.setItem('quiz_theme','eye'); }
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        const map = { light: 'theme-btn-light', dark: 'theme-btn-dark', eye: 'theme-btn-eye' };
        const target = document.querySelector(`.${map[theme]}`);
        if (target) target.classList.add('active');
    },
    openBgPicker() {
        document.getElementById('bgColorPicker').click();
    },
    applyCustomBg(color) {
        const body = document.body;
        body.classList.remove('theme-light','theme-dark','theme-eye','bg-image');
        body.classList.add('theme-custom');
        body.style.setProperty('--custom-bg', color);
        localStorage.setItem('quiz_theme','custom');
        localStorage.setItem('quiz_custom_bg', color);
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        const target = document.querySelector('.theme-btn-custom');
        if (target) target.classList.add('active');
    },
    uploadBgImage() {
        document.getElementById('bgImageInput').click();
    },
    handleBgImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const body = document.body;
                body.classList.remove('theme-light','theme-dark','theme-eye','theme-custom');
                body.classList.add('bg-image');
                body.style.setProperty('--custom-bg-image', `url(${ev.target.result})`);
                localStorage.setItem('quiz_theme','bg-image');
                localStorage.setItem('quiz_bg_image', ev.target.result);
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                const target = document.querySelector('.theme-btn-image');
                if (target) target.classList.add('active');
            };
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    },
    loadTheme() {
        const saved = localStorage.getItem('quiz_theme') || 'light';
        if (saved === 'custom') {
            const bg = localStorage.getItem('quiz_custom_bg');
            if (bg) this.applyCustomBg(bg);
        } else if (saved === 'bg-image') {
            const img = localStorage.getItem('quiz_bg_image');
            if (img) {
                const body = document.body;
                body.classList.add('bg-image');
                body.style.setProperty('--custom-bg-image', `url(${img})`);
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                const target = document.querySelector('.theme-btn-image');
                if (target) target.classList.add('active');
            }
        } else {
            this.setTheme(saved);
        }
    },

    // ------------------------------------------------------------
    // 8. 数量选择弹窗（支持 sequential / random / wrong）
    // ------------------------------------------------------------
    showQuantityModal(mode) {
        const modal = document.getElementById('quantityModal');
        if (!modal) return;
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }

        // 根据模式设置标题和提示
        const titleMap = {
            'sequential': '📋 选择刷题数量',
            'random': '🎲 选择随机数量',
            'wrong': '❌ 错题重练'
        };
        document.getElementById('modalTitle').textContent = titleMap[mode] || '📋 选择数量';

        // 错题模式：从错题库获取总数
        const fetchUrl = mode === 'wrong'
            ? `/api/wrong?user_id=${encodeURIComponent(user)}`
            : `/api/questions?user_id=${encodeURIComponent(user)}`;

        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                const total = data.length;
                document.getElementById('totalCount').textContent = total;
                if (total === 0) {
                    const msg = mode === 'wrong' ? '暂无错题，继续加油！' : '题库为空，请先添加题目！';
                    alert('🎉 ' + msg);
                    this.closeQuantityModal();
                    return;
                }
                const defaultVal = this.lastSelected || 20;
                this.selectQuantity(defaultVal);
                this._modalMode = mode;
                this.updatePreview(defaultVal, total, mode);
                modal.style.display = 'flex';
            })
            .catch(err => alert('加载失败：' + err.message));
    },

    selectQuantity(num) {
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.preset-btn').forEach(b => {
            const txt = b.textContent.trim();
            if (txt === String(num) || (num === -1 && txt.includes('全部'))) {
                b.classList.add('active');
            }
        });
        document.getElementById('customQuantity').value = '';
        this._selectedNum = num;
        const total = parseInt(document.getElementById('totalCount').textContent) || 0;
        const mode = this._modalMode || 'sequential';
        this.updatePreview(num, total, mode);
    },

    confirmCustom() {
        const input = document.getElementById('customQuantity');
        const val = parseInt(input.value);
        if (isNaN(val) || val < 1) { alert('请输入有效正整数'); return; }
        const total = parseInt(document.getElementById('totalCount').textContent) || 0;
        if (val > total) { this.selectQuantity(-1); return; }
        this.selectQuantity(val);
    },

    closeQuantityModal() {
        document.getElementById('quantityModal').style.display = 'none';
    },

    updatePreview(num, total, mode) {
        const preview = document.getElementById('modalPreview');
        if (!preview) return;
        let text = '';
        const modeLabel = mode === 'wrong' ? '错题' : '题库';
        if (num === -1 || num >= total) {
            text = `📦 将加载全部 ${total} 道${modeLabel}`;
        } else {
            const user = this.getCurrentUser();
            if (mode === 'sequential') {
                const progress = this.getProgress(user);
                const start = progress.sequential_index || 0;
                const end = Math.min(start + num, total);
                const remaining = total - end;
                text = `顺序：第 ${start+1} ~ ${end} 题（剩余 ${remaining} 题）`;
            } else if (mode === 'wrong') {
                text = `❌ 错题重练：${num} 道（共 ${total} 道错题）`;
            } else {
                const recent = this.getRecentQuestions(user);
                const available = total - recent.length;
                text = `随机抽取 ${num} 道题（共 ${total} 题）`;
                if (available < num) text += `，将补充已做题目`;
            }
        }
        preview.textContent = text;
    },

    startWithQuantity() {
        const num = this._selectedNum;
        if (num === undefined) { alert('请选择刷题数量'); return; }
        const mode = this._modalMode || 'sequential';
        const isRandom = (mode === 'random');
        const source = (mode === 'wrong') ? 'wrong' : 'all';
        this.lastSelected = num;
        localStorage.setItem('quiz_last_selected', String(num));
        this.closeQuantityModal();
        this.start(isRandom, num, source);
    },

    // ------------------------------------------------------------
    // 9. 进度管理
    // ------------------------------------------------------------
    getProgress(user) {
        const key = `quiz_progress_${user}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : { sequential_index: 0 };
    },
    saveProgress(user, data) {
        const key = `quiz_progress_${user}`;
        const current = this.getProgress(user);
        const updated = { ...current, ...data };
        localStorage.setItem(key, JSON.stringify(updated));
    },
    getRecentQuestions(user) {
        const key = `quiz_recent_${user}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },
    saveRecentQuestions(user, ids) {
        const key = `quiz_recent_${user}`;
        let recent = this.getRecentQuestions(user);
        recent = [...new Set([...ids, ...recent])];
        if (recent.length > 100) recent = recent.slice(0, 100);
        localStorage.setItem(key, JSON.stringify(recent));
    },

    // ------------------------------------------------------------
    // 10. 初始化
    // ------------------------------------------------------------
    init() {
        this.updateUserUI();
        this.loadTheme();
        const saved = localStorage.getItem('quiz_last_selected');
        if (saved) {
            const num = parseInt(saved);
            if (!isNaN(num)) this.lastSelected = num;
        }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    QuizApp.init();
});
