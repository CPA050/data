// ==========================================
// 🚀 QuizApp 核心逻辑 6.0 · 全手势与独立玻璃小球版
// ==========================================

window.QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    
    // 触屏滑动卡片变量
    startX: 0,
    moveX: 0,

    // 下拉收起面板手势变量
    folderStartY: 0,
    folderMoveY: 0,

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

        document.getElementById("home").style.display = "none";
        
        // 动态架设具有：遮罩层、无背景面板、手势触屏的完美 DOM 结构
        document.getElementById("app").innerHTML = `
            <!-- 场景舞台 -->
            <div class="card-scene" id="cardScene"></div>

            <!-- 左下角悬浮控制按钮 -->
            <div class="glass-trigger" onclick="QuizApp.toggleFolder(true)">
                <svg viewBox="0 0 24 24">
                    <path d="M4 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 12h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 18h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>
                </svg>
            </div>

            <!-- 空白区域遮罩（点击直接收回面板） -->
            <div class="folder-overlay" id="folderOverlay" onclick="QuizApp.toggleFolder(false)"></div>

            <!-- 🍏 iOS 无色背景题号文件夹（支持触屏向下滑动收回） -->
            <div class="grid-folder" id="gridFolder">
                <div class="folder-drag-handle"></div>
                <div class="folder-grid-content" id="folderGrid"></div>
            </div>
        `;
        
        document.getElementById("app").className = "stage-container";
        document.getElementById("app").style.display = "block";

        this.renderCard();          // 初次渲染第一张卡片
        this.bindSwipeEvents();      // 绑定卡片左右划手势
        this.bindFolderDragEvents(); // 绑定面板下拉收回手势
        this.renderGrid();          // 初始化题号球
    },

    // 渲染卡片：完美的一题一页，绝不溢出跑偏
    renderCard(direction) {
        const scene = document.getElementById("cardScene");
        if (!scene) return;

        const q = this.activeBank[this.idx];
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;

        const newCard = document.createElement("div");
        newCard.className = "app-card";
        
        // 设定新卡片滑入初始动画偏移量
        if (direction === "next") {
            newCard.style.transform = "translate3d(100%, 0, 0)";
        } else if (direction === "prev") {
            newCard.style.transform = "translate3d(-100%, 0, 0)";
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

        const oldCard = scene.querySelector(".active-card");
        if (oldCard) {
            oldCard.classList.remove("active-card");
            if (direction === "next") {
                oldCard.classList.add("exit-left");
            } else if (direction === "prev") {
                oldCard.classList.add("exit-right");
            }
            setTimeout(() => oldCard.remove(), 450);
        }

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

        setTimeout(() => {
            if (this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this.renderCard("next");
            }
        }, 650);
    },

    // 控制面板和空白遮罩的开启与关闭
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
            folder.style.transform = ""; // 还原拖拽造成的位移影响
            folder.classList.remove("active");
            overlay.classList.remove("active");
        }
    },

    // 🍏 新增核心：处理题号面板“向下滑动（下拉手势）”自动收回逻辑
    bindFolderDragEvents() {
        const folder = document.getElementById("gridFolder");
        if (!folder) return;

        const start = (e) => {
            // 如果是在题号列表内部向上滚动，不干扰其正常滑动
            if (document.getElementById("folderGrid").scrollTop > 0) return;
            
            this.folderStartY = e.touches ? e.touches[0].clientY : e.clientY;
            this.folderMoveY = this.folderStartY;
            folder.style.transition = "none"; // 拖动时临时取消过渡实现极速跟手
        };

        const move = (e) => {
            if (!this.folderStartY) return;
            this.folderMoveY = e.touches ? e.touches[0].clientY : e.clientY;
            const deltaY = this.folderMoveY - this.folderStartY;

            if (deltaY > 0) { // 仅允许向下拖拽
                folder.style.transform = `translate3d(0, ${deltaY}px, 0)`;
            }
        };

        const end = () => {
            if (!this.folderStartY) return;
            const deltaY = this.folderMoveY - this.folderStartY;
            const threshold = 100; // 下拉超过 100 像素即判定为收起手势

            if (deltaY > threshold) {
                this.toggleFolder(false); // 成功收起
            } else {
                this.toggleFolder(true);  // 没拉到位，优雅弹回顶部
            }
            this.folderStartY = 0;
            this.folderMoveY = 0;
        };

        folder.addEventListener("touchstart", start, { passive: true });
        folder.addEventListener("touchmove", move, { passive: true });
        folder.addEventListener("touchend", end);

        folder.addEventListener("mousedown", start);
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", end);
    },

    // 绑定卡片手势
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

            d.onclick = (e) => {
                e.stopPropagation(); // 阻止冒泡
                const direction = i > this.idx ? "next" : "prev";
                this.idx = i;
                this.renderCard(direction);
                this.toggleFolder(false);
            };
            grid.appendChild(d);
        });
    }
};

console.log("🍏 终极修复：卡片防跑偏与下拉收起引擎已启动");
