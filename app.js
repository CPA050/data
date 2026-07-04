// ==========================================
// 🚀 QuizApp 7.0 · 高可靠淡入淡出答题引擎
// ==========================================

window.QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    
    // 手势变量
    startX: 0, moveX: 0,
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
            <!-- 唯一的核心题目卡片，绝无重叠跑偏和空白问题 -->
            <div class="app-card" id="mainQuizCard"></div>

            <!-- 左下角总按钮 -->
            <div class="glass-trigger" onclick="QuizApp.toggleFolder(true)">
                <svg viewBox="0 0 24 24">
                    <path d="M4 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 12h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 18h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>
                </svg>
            </div>

            <div class="folder-overlay" id="folderOverlay" onclick="QuizApp.toggleFolder(false)"></div>

            <div class="grid-folder" id="gridFolder">
                <div class="folder-drag-handle"></div>
                <div class="folder-grid-content" id="folderGrid"></div>
            </div>
        `;
        
        document.getElementById("app").className = "stage-container";
        document.getElementById("app").style.display = "block";

        this.renderCard(false);     // 初始化首题，不加动画
        this.bindSwipeEvents();      // 左右滑卡手势
        this.bindFolderDragEvents(); // 面板下拉手势
        this.renderGrid();
    },

    // 核心渲染：支持精致的“慢慢消失，慢慢显现”过渡
    renderCard(needAnimation) {
        const card = document.getElementById("mainQuizCard");
        if (!card) return;

        const q = this.activeBank[this.idx];
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;

        // 构建内部 HTML 内容
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
            // 1. 先让卡片慢慢淡出消失
            card.classList.add("card-fade");
            
            // 2. 在消失的刹那间替换题目数据，然后重新慢慢淡入显现
            setTimeout(() => {
                card.innerHTML = htmlContent;
                card.classList.remove("card-fade");
            }, 200);
        } else {
            // 无动画直接展现（如首次进入或从面板跳转）
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

        // 答完自动触发高级淡入淡出转场去下一题
        setTimeout(() => {
            if (this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this.renderCard(true); // 开启转场动画
            }
        }, 600);
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

    // 下拉手势
    bindFolderDragEvents() {
        const folder = document.getElementById("gridFolder");
        if (!folder) return;

        const start = (e) => {
            if (document.getElementById("folderGrid").scrollTop > 0) return;
            this.folderStartY = e.touches ? e.touches[0].clientY : e.clientY;
            this.folderMoveY = this.folderStartY;
            folder.style.transition = "none"; 
        };

        const move = (e) => {
            if (!this.folderStartY) return;
            this.folderMoveY = e.touches ? e.touches[0].clientY : e.clientY;
            const deltaY = this.folderMoveY - this.folderStartY;
            if (deltaY > 0) folder.style.transform = `translate3d(0, ${deltaY}px, 0)`;
        };

        const end = () => {
            if (!this.folderStartY) return;
            const deltaY = this.folderMoveY - this.folderStartY;
            if (deltaY > 90) {
                this.toggleFolder(false); 
            } else {
                this.toggleFolder(true);  
            }
            this.folderStartY = 0; this.folderMoveY = 0;
        };

        folder.addEventListener("touchstart", start, { passive: true });
        folder.addEventListener("touchmove", move, { passive: true });
        folder.addEventListener("touchend", end);
        folder.addEventListener("mousedown", start);
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", end);
    },

    // 左右滑卡
    bindSwipeEvents() {
        const card = document.getElementById("app"); // 全局捕获

        const start = (e) => {
            if (e.target.classList.contains("opt") || e.target.closest(".glass-trigger") || e.target.closest(".grid-folder")) return;
            this.startX = e.touches ? e.touches[0].clientX : e.clientX;
            this.moveX = this.startX;
        };

        const move = (e) => {
            if (!this.startX) return;
            this.moveX = e.touches ? e.touches[0].clientX : e.clientX;
        };

        const end = () => {
            if (!this.startX || !this.moveX) return;
            const deltaX = this.moveX - this.startX;
            const threshold = 60;

            if (deltaX < -threshold && this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this.renderCard(true); // 带动画切换
            } else if (deltaX > threshold && this.idx - 1 >= 0) {
                this.idx--;
                this.renderCard(true); // 带动画切换
            }
            this.startX = 0; this.moveX = 0;
        };

        card.addEventListener("touchstart", start, { passive: true });
        card.addEventListener("touchmove", move, { passive: true });
        card.addEventListener("touchend", end);
        card.addEventListener("mousedown", start);
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", end);
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

            d.onclick = (e) => {
                e.stopPropagation(); 
                this.idx = i;
                this.renderCard(false); // 跳转不拖沓，直接展现
                this.toggleFolder(false);
            };
            grid.appendChild(d);
        });
    }
};
