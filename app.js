// ==========================================
// 🚀 QuizApp 9.0 · 多用户题库管理 + 错题闭环
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

    // ------------------------------------------------------------
    // 1. 核心业务：从 API 加载题库并开始答题
    // ------------------------------------------------------------
    async start(isRandom) {
        const user = this.getCurrentUser();
        if (!user) {
            alert("请先登录！");
            return;
        }
        try {
            const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
            const bank = await res.json();
            if (!bank || bank.length === 0) {
                alert("❌ 您的题库为空，请先添加题目！");
                return;
            }
            this.activeBank = [...bank];
            if (isRandom) this.activeBank.sort(() => Math.random() - 0.5);
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
        } catch (err) {
            alert("加载题库失败：" + err.message);
        }
    },

    // 渲染当前题目卡片
    renderCard(needAnimation) {
        const card = document.getElementById("mainQuizCard");
        if (!card) return;
        const q = this.activeBank[this.idx];
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;

        const htmlContent = `
            <div id="top" style="display:flex; justify-content:space-between; align-items:center;">
                <span>正确率: ${acc}% | 进度: ${done}/${this.activeBank.length}</span>
                <button onclick="window.location.href='/'" style="background:transparent; border:1px solid #0071e3; color:#0071e3; padding:4px 12px; border-radius:16px; cursor:pointer; font-size:14px; font-weight:500;">🏠 返回首页</button>
            </div>
            <h2>Q${this.idx + 1}. ${q.q}</h2>
            ${q.opts.map((o, oIdx) => {
                let statusClass = "";
                if (this.record[this.idx] !== null) {
                    if (oIdx === q.a) statusClass = "correct";
                    else if (oIdx === this.record[this.idx]) statusClass = "wrong";
                }
                return `<div class="opt ${statusClass}" onclick="QuizApp.select(${oIdx}, this)">${o}</div>`;
            }).join("")}
        `;

        if (needAnimation) {
            card.classList.add("card-fade");
            setTimeout(() => { card.innerHTML = htmlContent; card.classList.remove("card-fade"); }, 180);
        } else {
            card.innerHTML = htmlContent;
        }
        this.renderGrid(); // 同步更新题号网格
    },

    // 选择选项
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
            const user = this.getCurrentUser();
            if (user) this.uploadWrongQuestion(user, q);
        }
        this.renderGrid();
        setTimeout(() => {
            if (this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this.renderCard(true);
            } else {
                alert("🎉 答题结束！即将返回首页。");
                window.location.reload();
            }
        }, 500);
    },

    // ------------------------------------------------------------
    // 2. 题库管理（多用户，每个用户独立）
    // ------------------------------------------------------------
    async showManager() {
        const user = this.checkLogin();
        if (!user) return;
        document.getElementById("home").style.display = "none";
        document.getElementById("app").style.display = "block";
        document.getElementById("app").className = "stage-container";
        document.getElementById("app").innerHTML = `
            <div class="app-card">
                <h2>📚 我的题库 (${user})</h2>
                <div style="margin:15px 0;">
                    <button onclick="QuizApp.showAddForm()" style="background:#34c759; color:#fff;">➕ 添加题目</button>
                    <button onclick="window.location.reload()" style="background:#86868b; color:#fff;">返回首页</button>
                </div>
                <div id="managerList" style="text-align:left; max-height: 400px; overflow-y: auto;">加载中...</div>
            </div>
        `;
        await this.loadQuestionsForManage();
    },

    async loadQuestionsForManage() {
        const user = this.getCurrentUser();
        if (!user) {
            alert("请先登录");
            return;
        }
        const list = document.getElementById("managerList");
        try {
            const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            if (!data || data.length === 0) {
                list.innerHTML = "<div>暂无题目，点击「添加题目」创建第一道题。</div>";
                return;
            }
            list.innerHTML = data.map((q, i) => `
                <div style="padding:10px; border-bottom:1px solid #eee; display:flex; align-items:center; gap:8px;">
                    <span style="flex:1;"><strong>${i+1}.</strong> ${q.q}</span>
                    <button onclick="QuizApp.editQuestion(${q.id})" style="background:#0071e3; color:#fff; border:none; border-radius:8px; padding:4px 12px;">编辑</button>
                    <button onclick="QuizApp.deleteQuestion(${q.id})" style="background:#ff3b30; color:#fff; border:none; border-radius:8px; padding:4px 12px;">删除</button>
                </div>
            `).join('');
        } catch (e) {
            list.innerHTML = "加载失败：" + e.message;
        }
    },

    // 添加题目表单（使用 prompt）
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
                this.loadQuestionsForManage();
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
                this.loadQuestionsForManage();
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
                this.loadQuestionsForManage();
            } else {
                alert("更新失败：" + (result.error || ''));
            }
        } catch (e) {
            alert("请求失败：" + e.message);
        }
    },

    // ------------------------------------------------------------
    // 3. 错题相关（按用户隔离）
    // ------------------------------------------------------------
    getCurrentUser() {
        return localStorage.getItem('quiz_user_id');
    },

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

    checkLoginBeforeGo(targetUrl) {
        const user = this.getCurrentUser();
        if (!user) {
            alert('请先登录再查看错题本');
            return false;
        }
        window.location.href = targetUrl;
        return false;
    },

    updateUserUI() {
        const user = this.getCurrentUser();
        const infoText = document.getElementById('userInfoText');
        if (infoText) {
            infoText.innerText = user ? `🍏 已登录: ${user}` : `👤 游客模式 (点击登录)`;
        }
    },

    async uploadWrongQuestion(userId, q) {
        try {
            await fetch('/api/wrong-add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    q: q.q,
                    opts: q.opts,
                    a: q.a
                })
            });
        } catch (e) {
            console.error(e);
        }
    },

    // ------------------------------------------------------------
    // 4. 题号导航网格
    // ------------------------------------------------------------
    toggleFolder(show) {
        const folder = document.getElementById('gridFolder');
        const overlay = document.getElementById('folderOverlay');
        if (!folder || !overlay) return;

        if (show === undefined) {
            this.folderVisible = !this.folderVisible;
        } else {
            this.folderVisible = show;
        }

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
    // 5. 事件绑定
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
        // 可选：触摸事件支持
        // ...
    }
};

// 页面加载后刷新用户状态
window.addEventListener('DOMContentLoaded', () => {
    QuizApp.updateUserUI();
});
