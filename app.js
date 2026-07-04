// ==========================================
// 🚀 QuizApp 8.0 · 智能多用户错题库闭环引擎
// ==========================================

window.QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    
    // 滑动卡片与面板变量
    startX: 0, startY: 0,
    isScrolling: false,
    folderStartY: 0, folderMoveY: 0,

    start(isRandom) {
        const bank = window.QUESTION_BANK || QUESTION_BANK;
        if (!bank || bank.length === 0) {
            alert("❌ 题库未加载，请检查数据。");
            return;
        }

        this.activeBank = [...bank];
        if (isRandom) this.activeBank.sort(() => Math.random() - 0.5);

        this.idx = 0;
        this.record = new Array(this.activeBank.length).fill(null);

        document.getElementById("home").style.display = "none";
        
        // 构建稳定的苹果毛玻璃卡片骨架
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
            setTimeout(() => {
                card.innerHTML = htmlContent;
                card.classList.remove("card-fade");
            }, 180);
        } else {
            card.innerHTML = htmlContent;
            card.classList.remove("card-fade");
        }
    },

    select(oIdx, element) {
        if (this.record[this.idx] !== null) return;

        const q = this.activeBank[this.idx];
        this.record[this.idx] = oIdx;
        const isCorrect = (oIdx === q.a);

        if (isCorrect) {
            element.classList.add("correct");
            // 🌟 核心：如果在错题模式下答对，且带有数据库 id，自动从数据库移除
            if (window.isWrongQuestionMode && q.id) {
                this.deleteWrongQuestion(q.id);
            }
        } else {
            element.classList.add("wrong");
            const opts = element.parentNode.querySelectorAll(".opt");
            if (opts[q.a]) opts[q.a].classList.add("correct");

            // 🌟 核心：答错时，如果用户已登录，自动同步到 D1 数据库
            const user = this.getCurrentUser();
            if (user) {
                this.uploadWrongQuestion(user, q);
            }
        }

        this.renderGrid();

        setTimeout(() => {
            if (this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this.renderCard(true);
            } else if (window.isWrongQuestionMode) {
                alert("🎉 恭喜你刷完了当前错题集！");
                window.location.reload();
            }
        }, 500);
    },

    // 登录及用户标识管理
    getCurrentUser() {
        return localStorage.getItem('quiz_user_id');
    },

    checkLogin() {
        let user = this.getCurrentUser();
        if (!user) {
            user = prompt("🍏 为了保存您的专属错题集，请输入您的用户名/邮箱：");
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
        const logoutBtn = document.querySelector('.logout-btn');
        if (infoText) {
            if (user) {
                infoText.innerText = `🍏 已登录: ${user}`;
                if (logoutBtn) logoutBtn.style.display = 'inline-block';
            } else {
                infoText.innerText = `👤 游客模式 (错题不会同步)`;
                if (logoutBtn) logoutBtn.style.display = 'none';
            }
        }
    },

    logout() {
        localStorage.removeItem('quiz_user_id');
        this.updateUserUI();
    },

    checkLoginBeforeGo(e) {
        if (!this.getCurrentUser()) {
            e.preventDefault();
            this.checkLogin();
        }
        return true;
    },

    // 异步 API：上传错题
    async uploadWrongQuestion(userId, questionData) {
        try {
            await fetch('/api/wrong-add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    q: questionData.q,
                    opts: questionData.opts,
                    a: questionData.a
                })
            });
        } catch (err) { console.error("同步错题失败:", err); }
    },

    // 异步 API：删除错题
    async deleteWrongQuestion(questionDbId) {
        try {
            const res = await fetch(`/api/wrong-delete?id=${questionDbId}`, { method: 'DELETE' });
            if (res.ok) console.log(`错题 ${questionDbId} 已从云端移除`);
        } catch (err) { console.error("自动删题异常:", err); }
    },

    // 全局手势与点击事件保护机制
    bindGlobalEvents() {
        const app = document.getElementById("app");
        const folder = document.getElementById("gridFolder");
        const trigger = document.getElementById("masterGlassBtn");
        const overlay = document.getElementById("folderOverlay");

        trigger.addEventListener("click", (e) => { e.stopPropagation(); this.toggleFolder(true); });
        overlay.addEventListener("click", () => this.toggleFolder(false));

        app.addEventListener("touchstart", (e) => {
            if (e.target.closest(".opt") || e.target.closest("#masterGlassBtn") || e.target.closest("#gridFolder")) return;
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
            this.isScrolling = false;
        }, { passive: true });

        app.addEventListener("touchmove", (e) => {
            if (!this.startX) return;
            if (Math.abs(e.touches[0].clientY - this.startY) > Math.abs(e.touches[0].clientX - this.startX)) {
                this.isScrolling = true;
            }
        }, { passive: true });

        app.addEventListener("touchend", (e) => {
            if (!this.startX || this.isScrolling) { this.startX = 0; return; }
            const deltaX = e.changedTouches[0].clientX - this.startX;
            if (deltaX < -60 && this.idx + 1 < this.activeBank.length) { this.idx++; this.renderCard(true); }
            else if (deltaX > 60 && this.idx - 1 >= 0) { this.idx--; this.renderCard(true); }
            this.startX = 0;
        });

        folder.addEventListener("touchstart", (e) => {
            if (document.getElementById("folderGrid").scrollTop > 0) return;
            this.folderStartY = e.touches[0].clientY;
            folder.style.transition = "none"; 
        }, { passive: true });

        folder.addEventListener("touchmove", (e) => {
            if (!this.folderStartY) return;
            this.folderMoveY = e.touches[0].clientY;
            const deltaY = this.folderMoveY - this.folderStartY;
            if (deltaY > 0) folder.style.transform = `translate3d(0, ${deltaY}px, 0)`;
        }, { passive: true });

        folder.addEventListener("touchend", () => {
            if (!this.folderStartY) return;
            if (this.folderMoveY - this.folderStartY > 100) this.toggleFolder(false); 
            else this.toggleFolder(true);  
            this.folderStartY = 0; this.folderMoveY = 0;
        });
    },

    toggleFolder(show) {
        const folder = document.getElementById("gridFolder");
        const overlay = document.getElementById("folderOverlay");
        if (!folder || !overlay) return;
        folder.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
        if (show) { folder.classList.add("active"); overlay.classList.add("active"); this.renderGrid(); } 
        else { folder.style.transform = ""; folder.classList.remove("active"); overlay.classList.remove("active"); }
    },

    renderGrid() {
        const grid = document.getElementById("folderGrid");
        if (!grid) return;
        grid.innerHTML = "";
        this.activeBank.forEach((_, i) => {
            const d = document.createElement("div");
            d.innerText = i + 1; d.className = "qbtn";
            if (this.record[i] !== null) d.classList.add(this.record[i] === this.activeBank[i].a ? "grid-correct" : "grid-wrong");
            else if (i === this.idx) d.classList.add("grid-active");
            d.addEventListener("click", (e) => { e.stopPropagation(); this.idx = i; this.renderCard(false); this.toggleFolder(false); });
            grid.appendChild(d);
        });
    }
};

window.addEventListener('DOMContentLoaded', () => { QuizApp.updateUserUI(); });
