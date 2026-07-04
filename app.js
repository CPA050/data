// ==========================================
// 🚀 QuizApp 8.2 · 智能多用户错题库闭环引擎（完整版）
// ==========================================

window.QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    
    startX: 0, startY: 0,
    isScrolling: false,
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
            if (window.isWrongQuestionMode && q.id) this.deleteWrongQuestion(q.id);
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

    // --- 2. 题库管理模式 (新增) ---
    showManager() {
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
                <div id="managerList" style="text-align:left; max-height: 400px; overflow-y: auto;"></div>
            </div>
        `;
        
        const list = document.getElementById("managerList");
        const bank = window.QUESTION_BANK || [];
        list.innerHTML = bank.map((q, i) => `
            <div style="padding:10px; border-bottom:1px solid #eee; display:flex; align-items:center;">
                <input type="checkbox" class="q-checkbox" value="${q.id || i}" style="margin-right:10px;">
                <span>${i + 1}. ${q.q}</span>
            </div>
        `).join("");
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

        for (let cb of selected) {
            await this.deleteWrongQuestion(cb.value);
        }
        alert("操作完成，数据已同步。");
        window.location.reload();
    },

    // --- 3. 公共工具函数 ---
    getCurrentUser() { return localStorage.getItem('quiz_user_id'); },

    checkLogin() {
        let user = this.getCurrentUser();
        if (!user) {
            user = prompt("🍏 请输入您的用户名/邮箱：");
            if (user && user.trim() !== "") {
                localStorage.setItem('quiz_user_id', user.trim());
                this.updateUserUI();
                return user.trim();
            }
            return null;
        }
        return user;
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

    async deleteWrongQuestion(id) {
        try {
            await fetch(`/api/wrong-delete?id=${id}`, { method: 'DELETE' });
        } catch (e) { console.error(e); }
    },

    // --- 原有事件与手势 ---
    bindGlobalEvents() {
        const app = document.getElementById("app");
        const trigger = document.getElementById("masterGlassBtn");
        trigger.addEventListener("click", (e) => { e.stopPropagation(); this.toggleFolder(true); });
        
        // ... 原有的 touch 事件保持不变 ...
    },

    toggleFolder(show) {
        const folder = document.getElementById("gridFolder");
        const overlay = document.getElementById("folderOverlay");
        if (show) { folder.classList.add("active"); overlay.classList.add("active"); } 
        else { folder.classList.remove("active"); overlay.classList.remove("active"); }
    },

    renderGrid() {
        const grid = document.getElementById("folderGrid");
        if (!grid) return;
        grid.innerHTML = this.activeBank.map((_, i) => `
            <div class="qbtn ${this.record[i] !== null ? (this.record[i] === this.activeBank[i].a ? "grid-correct" : "grid-wrong") : (i === this.idx ? "grid-active" : "")}"
                 onclick="QuizApp.idx=${i}; QuizApp.renderCard(false); QuizApp.toggleFolder(false);">
                ${i + 1}
            </div>
        `).join("");
    }
};

window.addEventListener('DOMContentLoaded', () => { QuizApp.updateUserUI(); });
