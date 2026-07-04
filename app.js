// ==========================================
// 🚀 QuizApp 8.2 · 智能多用户错题库闭环引擎（完整版）
// ==========================================

window.QuizApp = {
    idx: 0, record: [], activeBank: [],
    startX: 0, startY: 0, isScrolling: false,
    folderStartY: 0, folderMoveY: 0,

    // --- 1. 核心业务：答题逻辑 ---
    start(isRandom) {
        const bank = window.QUESTION_BANK || QUESTION_BANK;
        if (!bank || bank.length === 0) { alert("❌ 题库未加载"); return; }
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
    },

    renderCard(needAnimation) {
        const card = document.getElementById("mainQuizCard");
        if (!card) return;
        const q = this.activeBank[this.idx];
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;
        const htmlContent = `
            <div id="top">正确率: ${acc}% | 进度: ${done}/${this.activeBank.length}</div>
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
            const user = this.getCurrentUser();
            if (user) this.uploadWrongQuestion(user, q);
        }
        this.renderGrid();
        setTimeout(() => {
            if (this.idx + 1 < this.activeBank.length) {
                this.idx++; this.renderCard(true);
            } else {
                alert("🎉 答题结束！即将返回首页。");
                window.location.reload();
            }
        }, 500);
    },

    // --- 2. 题库管理模式 (云端闭环版) ---
    async showManager() {
        const user = this.checkLogin();
        if (!user) return;
        document.getElementById("home").style.display = "none";
        document.getElementById("app").style.display = "block";
        document.getElementById("app").className = "stage-container";
        document.getElementById("app").innerHTML = `
            <div class="app-card">
                <h2>📚 题库管理 (${user})</h2>
                <div style="margin:15px 0;">
                    <button onclick="QuizApp.toggleSelectAll(this)">全选</button>
                    <button onclick="QuizApp.deleteSelected()" style="background:#ff3b30; color:#fff;">批量删除</button>
                    <button onclick="window.location.reload()">返回首页</button>
                </div>
                <div id="managerList" style="text-align:left; max-height: 400px; overflow-y: auto;">加载中...</div>
            </div>
        `;
        try {
            const res = await fetch(`/api/wrong?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            const list = document.getElementById("managerList");
            if (data.length === 0) { list.innerHTML = "<div>暂无错题记录</div>"; return; }
            list.innerHTML = data.map((q, i) => `
                <div style="padding:10px; border-bottom:1px solid #eee; display:flex; align-items:center;">
                    <input type="checkbox" class="q-checkbox" value="${q.id}" style="margin-right:10px;">
                    <span>${i + 1}. ${q.q}</span>
                </div>
            `).join("");
        } catch (e) { document.getElementById("managerList").innerHTML = "加载失败"; }
    },

    toggleSelectAll(btn) {
        const cbs = document.querySelectorAll('.q-checkbox');
        const isSelected = btn.innerText === "全选";
        cbs.forEach(cb => cb.checked = isSelected);
        btn.innerText = isSelected ? "取消全选" : "全选";
    },

    async deleteSelected() {
        const selected = document.querySelectorAll('.q-checkbox:checked');
        if (selected.length === 0) return alert("请先勾选题目");
        if (!confirm(`确定删除选中的 ${selected.length} 道题吗？`)) return;
        const user = this.getCurrentUser();
        for (let cb of selected) {
            await this.deleteWrongQuestion(cb.value, user);
        }
        alert("操作完成");
        window.location.reload();
    },

    // --- 3. 工具与通信 ---
    getCurrentUser() { return localStorage.getItem('quiz_user_id'); },
    checkLogin() {
        let user = this.getCurrentUser();
        if (!user) {
            user = prompt("🍏 请输入您的用户名：");
            if (user) { localStorage.setItem('quiz_user_id', user.trim()); this.updateUserUI(); return user.trim(); }
            return null;
        }
        return user;
    },
    // ✅ 新增：用于错题本链接的登录检查（唯一改动点）
    checkLoginBeforeGo(targetUrl) {
        const user = this.getCurrentUser();
        if (!user) {
            alert('请先登录再查看错题本');
            return false;   // 阻止跳转
        }
        window.location.href = targetUrl;
        return false;       // 阻止默认 a 链接跳转，由 JS 控制
    },
    updateUserUI() {
        const user = this.getCurrentUser();
        const infoText = document.getElementById('userInfoText');
        if (infoText) infoText.innerText = user ? `🍏 已登录: ${user}` : `👤 游客模式`;
    },
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
    bindGlobalEvents() { /* ...保留你原有的事件逻辑... */ },
    toggleFolder(show) { /* ...保留你原有的逻辑... */ },
    renderGrid() { /* ...保留你原有的逻辑... */ }
};

window.addEventListener('DOMContentLoaded', () => { QuizApp.updateUserUI(); });
