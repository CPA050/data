// ==========================================
// 🚀 QuizApp 7.5 · 修复手势冲突 & 纯正苹果毛玻璃版
// ==========================================

window.QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    
    // 滑动卡片变量
    startX: 0, startY: 0,
    isScrolling: false,

    // 下拉面板变量
    folderStartY: 0, folderMoveY: 0,

    start(isRandom) {
        const bank = window.QUESTION_BANK || QUESTION_BANK;
        if (!bank || bank.length === 0) {
            alert("❌ 题库未加载，请检查 questions.js。");
            return;
        }

        this.activeBank = [...bank];
        if (isRandom) this.activeBank.sort(() => Math.random() - 0.5);

        this.idx = 0;
        this.record = new Array(this.activeBank.length).fill(null);

        document.getElementById("home").style.display = "none";
        
        // 构建最为稳定的单张卡片骨架
        document.getElementById("app").innerHTML = `
            <!-- 唯一的核心题目卡片 -->
            <div class="app-card" id="mainQuizCard"></div>

            <!-- 左下角总按钮 -->
            <div class="glass-trigger" id="masterGlassBtn">
                <svg viewBox="0 0 24 24">
                    <path d="M4 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 12h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 18h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>
                </svg>
            </div>

            <div class="folder-overlay" id="folderOverlay"></div>

            <div class="grid-folder" id="gridFolder">
                <div class="folder-drag-handle"></div>
                <div class="folder-grid-content" id="folderGrid"></div>
            </div>
        `;
        
        document.getElementById("app").className = "stage-container";
        document.getElementById("app").style.display = "block";

        this.renderCard(false);      // 初始化第一题
        this.bindGlobalEvents();     // 绑定改良后的安全事件体系
        this.renderGrid();           // 渲染题号面板
    },

    renderCard(needAnimation) {
        const card = document.getElementById("mainQuizCard");
        if (!card) return;

        const q = this.activeBank[this.idx];
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;

        // 构造卡片内部，使用普通的 onclick，由于改良了手势，这里绝不会被拦截
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

        if (oIdx === q.a) {
            element.classList.add("correct");
        } else {
            element.classList.add("wrong");
            const opts = element.parentNode.querySelectorAll(".opt");
            if (opts[q.a]) opts[q.a].classList.add("correct");
        }

        this.renderGrid();

        setTimeout(() => {
            if (this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this.renderCard(true);
            }
        }, 500);
    },

    toggleFolder(show) {
        const folder = document.getElementById("gridFolder");
        const overlay = document.getElementById("folderOverlay");
        if (!folder || !overlay) return;

        if (show) {
            folder.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
            folder.classList.add("active");
            overlay.classList.add("active");
            this.renderGrid();
        } else {
            folder.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
            folder.style.transform = ""; 
            folder.classList.remove("active");
            overlay.classList.remove("active");
        }
    },

    // 🌟 改良版事件系统：分离点击与手势，彻底修复点不动的 Bug
    bindGlobalEvents() {
        const app = document.getElementById("app");
        const folder = document.getElementById("gridFolder");
        const trigger = document.getElementById("masterGlassBtn");
        const overlay = document.getElementById("folderOverlay");

        // 1. 独立绑定左下角水晶按钮和遮罩的纯点击事件，绝不走手势逻辑
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleFolder(true);
        });
        overlay.addEventListener("click", () => this.toggleFolder(false));

        // 2. 改良版：左右划卡手势监听
        app.addEventListener("touchstart", (e) => {
            // 如果点在选项、悬浮球或文件夹内，不触发划卡判定
            if (e.target.closest(".opt") || e.target.closest("#masterGlassBtn") || e.target.closest("#gridFolder")) return;
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
            this.isScrolling = false;
        }, { passive: true });

        app.addEventListener("touchmove", (e) => {
            if (!this.startX) return;
            const moveX = e.touches[0].clientX;
            const moveY = e.touches[0].clientY;
            
            // 如果垂直方向滑动的距离大于横向，认为是上下滚屏，放弃划卡
            if (Math.abs(moveY - this.startY) > Math.abs(moveX - this.startX)) {
                this.isScrolling = true;
            }
        }, { passive: true });

        app.addEventListener("touchend", (e) => {
            if (!this.startX || this.isScrolling) {
                this.startX = 0; return;
            }
            const endX = e.changedTouches[0].clientX;
            const deltaX = endX - this.startX;
            const threshold = 60; // 必须划过 60 像素才触发

            if (deltaX < -threshold && this.idx + 1 < this.activeBank.length) {
                this.idx++; this.renderCard(true); // 下一题
            } else if (deltaX > threshold && this.idx - 1 >= 0) {
                this.idx--; this.renderCard(true); // 上一题
            }
            this.startX = 0;
        });

        // 3. 改良版：题号面板下拉收起手势
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
            const deltaY = this.folderMoveY - this.folderStartY;
            if (deltaY > 100) {
                this.toggleFolder(false); 
            } else {
                this.toggleFolder(true);  
            }
            this.folderStartY = 0; this.folderMoveY = 0;
        });
    },

    renderGrid() {
        const grid = document.getElementById("folderGrid");
        if (!grid) return;
        grid.innerHTML = "";

        this.activeBank.forEach((_, i) => {
            const d = document.createElement("div");
            d.innerText = i + 1;
            d.className = "qbtn";

            if (this.record[i] !== null) {
                d.classList.add(this.record[i] === this.activeBank[i].a ? "grid-correct" : "grid-wrong");
            } else if (i === this.idx) {
                d.classList.add("grid-active");
            }

            // 题号小球纯点击响应
            d.addEventListener("click", (e) => {
                e.stopPropagation(); 
                this.idx = i;
                this.renderCard(false); 
                this.toggleFolder(false);
            });
            grid.appendChild(d);
        });
    }
};
