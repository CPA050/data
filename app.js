// ==========================================
// 🚀 QuizApp 核心逻辑 5.0 · 顶级卡片转场与自适应版
// ==========================================

window.QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    
    // 触屏滑卡变量
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
        
        // 动态构建更高级的 DOM 视口舞台
        document.getElementById("app").innerHTML = `
            <!-- 场景视口 -->
            <div class="card-scene" id="cardScene"></div>

            <!-- 左下角悬浮水晶球按钮 -->
            <div class="glass-trigger" onclick="QuizApp.toggleFolder(true)">
                <svg viewBox="0 0 24 24">
                    <path d="M4 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 12h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 18h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>
                </svg>
            </div>

            <!-- 🍏 iOS 级严格顺序网格文件夹弹窗 -->
            <div class="grid-folder" id="gridFolder">
                <div class="folder-header">
                    <span class="folder-title">全部题目 (${this.activeBank.length})</span>
                    <span class="folder-close" onclick="QuizApp.toggleFolder(false)">完成</span>
                </div>
                <div class="folder-grid-content" id="folderGrid"></div>
            </div>
        `;
        
        // 抹除外层固定块样式，交由自适应接管
        document.getElementById("app").className = "stage-container";
        document.getElementById("app").style.display = "block";

        this.renderCard();     // 渲染当前的卡片
        this.bindSwipeEvents(); // 绑定整张卡片的滑动捕获
        this.renderGrid();     // 渲染弹出面板
    },

    // 核心渲染：动态生成单张题目卡片，并附加高级进出场动画
    renderCard(direction) {
        const scene = document.getElementById("cardScene");
        if (!scene) return;

        const q = this.activeBank[this.idx];
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;

        // 1. 产生新卡片
        const newCard = document.createElement("div");
        newCard.className = "app-card";
        
        // 根据滑屏方向初始化新卡片在空气中的预备位置
        if (direction === "next") {
            newCard.style.transform = "translateX(60px)";
        } else if (direction === "prev") {
            newCard.style.transform = "translateX(-60px)";
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

        // 2. 找出正在场上的旧卡片，赋予其“淡出滑走”的宿命
        const oldCard = scene.querySelector(".active-card");
        if (oldCard) {
            oldCard.classList.remove("active-card");
            if (direction === "next") {
                oldCard.classList.add("exit-left");
            } else if (direction === "prev") {
                oldCard.classList.add("exit-right");
            }
            // 动画结束后移出老卡片，释放电脑内存
            setTimeout(() => oldCard.remove(), 500);
        }

        // 3. 将新卡片推入舞台，并触发“淡入滑现”
        scene.appendChild(newCard);
        // 用 requestAnimationFrame 确保浏览器能捕捉到状态变化，从而展现丝滑动画
        requestAnimationFrame(() => {
            newCard.classList.add("active-card");
        });
    },

    // 点击选项
    select(oIdx, element) {
        if (this.record[this.idx] !== null) return;

        const q = this.activeBank[this.idx];
        this.record[this.idx] = oIdx;

        // 变色反馈
        if (oIdx === q.a) {
            element.classList.add("correct");
        } else {
            element.classList.add("wrong");
            // 高亮正确答案
            const opts = element.parentNode.querySelectorAll(".opt");
            if (opts[q.a]) opts[q.a].classList.add("correct");
        }

        this.renderGrid();

        // 答对/答错后，自动高质感滑向下一题
        setTimeout(() => {
            if (this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this.renderCard("next");
            }
        }, 600);
    },

    // 有序网格文件夹显隐控制
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

    // 绑定卡片整体手势（兼容手机、电脑鼠标拖拽）
    bindSwipeEvents() {
        const scene = document.getElementById("cardScene");
        if (!scene) return;

        const start = (e) => {
            // 如果点在选项上，不触发滑卡
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
            const threshold = 60; // 只要划动超过 60 像素就触发灵敏的高级切页

            if (deltaX < -threshold && this.idx + 1 < this.activeBank.length) {
                // 向左划，看下一题
                this.idx++;
                this.renderCard("next");
            } else if (deltaX > threshold && this.idx - 1 >= 0) {
                // 向右划，看上一题
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

    // 渲染完美的、严格按数字顺序排列的题号小球面板
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
                this.toggleFolder(false); // 选完丝滑收起
            };
            grid.appendChild(d);
        });
    }
};

console.log("🍏 顶级卡片滑转场转场引擎已启动");
