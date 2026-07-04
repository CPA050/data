// ==========================================
// 🚀 QuizApp 核心逻辑 5.1 · 单页重叠式舞台引擎
// ==========================================

window.QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    
    // 触屏滑动变量
    startX: 0,
    moveX: 0,

    start(isRandom) {
        const bank = window.QUESTION_BANK || QUESTION_BANK;
        if (!bank || bank.length === 0) {
            alert("❌ 题库未加载，请检查 questions.js。");
            return;
        }

        this.activeBank = [...bank];
        if (isRandom) {
            this.activeBank.sort(() => Math.random() - 0.5);
        }

        this.idx = 0;
        this.record = new Array(this.activeBank.length).fill(null);

        // 隐藏主页
        document.getElementById("home").style.display = "none";
        
        // 渲染基础外层架构
        document.getElementById("app").innerHTML = `
            <div class="card-scene" id="cardScene"></div>

            <!-- 左下角悬浮水晶球按钮 -->
            <div class="glass-trigger" onclick="QuizApp.toggleFolder(true)">
                <svg viewBox="0 0 24 24">
                    <path d="M4 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 12h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 18h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>
                </svg>
            </div>

            <!-- 🍏 iOS 文件夹弹窗 -->
            <div class="grid-folder" id="gridFolder">
                <div class="folder-header">
                    <span class="folder-title">全部题目 (${this.activeBank.length})</span>
                    <span class="folder-close" onclick="QuizApp.toggleFolder(false)">完成</span>
                </div>
                <div class="folder-grid-content" id="folderGrid"></div>
            </div>
        `;
        
        document.getElementById("app").className = "stage-container";
        document.getElementById("app").style.display = "block";

        this.renderCard();     // 初始化渲染第一张卡片
        this.bindSwipeEvents(); // 注入滑动事件
        this.renderGrid();     // 初始化网格
    },

    // 渲染卡片：direction 可以是 "next"、"prev" 或不传
    renderCard(direction) {
        const scene = document.getElementById("cardScene");
        if (!scene) return;

        const q = this.activeBank[this.idx];
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;

        // 1. 创建新卡片
        const newCard = document.createElement("div");
        newCard.className = "app-card";
        
        // 如果是切题，先设置新卡片在空气中的进场初始偏移动画
        if (direction === "next") {
            newCard.style.transform = "translate3d(60px, 0, 0)";
        } else if (direction === "prev") {
            newCard.style.transform = "translate3d(-60px, 0, 0)";
        } else {
            newCard.style.transform = "translate3d(0, 0, 0)";
        }

        newCard.innerHTML = `
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

        // 2. 让老卡片滑出并慢慢消失
        const oldCard = scene.querySelector(".active-card");
        if (oldCard) {
            oldCard.classList.remove("active-card");
            if (direction === "next") {
                oldCard.classList.add("exit-left");
            } else if (direction === "prev") {
                oldCard.classList.add("exit-right");
            }
            // 动画完成后销毁老卡片，保证页面永远干净
            setTimeout(() => oldCard.remove(), 450);
        }

        // 3. 将新卡片推入舞台，触发淡入显现
        scene.appendChild(newCard);
        requestAnimationFrame(() => {
            newCard.classList.add("active-card");
        });
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

        // 自动切到下一题
        setTimeout(() => {
            if (this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this.renderCard("next");
            }
        }, 650);
    },

    toggleFolder(show) {
        const folder = document.getElementById("gridFolder");
        if (!folder) return;
        if (show) {
            folder.classList.add("active");
            this.renderGrid();
        } else {
            folder.classList.remove("active");
        }
    },

    bindSwipeEvents() {
        const scene = document.getElementById("cardScene");
        if (!scene) return;

        const start = (e) => {
            if (e.target.classList.contains("opt")) return;
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
            const threshold = 50; 

            if (deltaX < -threshold && this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this.renderCard("next");
            } else if (deltaX > threshold && this.idx - 1 >= 0) {
                this.idx--;
                this.renderCard("prev");
            }
            this.startX = 0;
            this.moveX = 0;
        };

        scene.addEventListener("touchstart", start, { passive: true });
        scene.addEventListener("touchmove", move, { passive: true });
        scene.addEventListener("touchend", end);

        scene.addEventListener("mousedown", start);
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

            d.onclick = () => {
                const direction = i > this.idx ? "next" : "prev";
                this.idx = i;
                this.renderCard(direction);
                this.toggleFolder(false);
            };
            grid.appendChild(d);
        });
    }
};

console.log("🍏 终极自适应重叠式舞台转场引擎已启动");
