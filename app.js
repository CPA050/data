// ==========================================
// 🚀 QuizApp 核心逻辑 4.0 · 物理滑屏与有序文件夹版
// ==========================================

window.QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    locked: false,
    
    // 触摸手势变量
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

        // 初始化切换视图
        document.getElementById("home").style.display = "none";
        
        // 动态注入带有：滑屏视口、底部Dock、以及内置严格排序网格文件夹的 HTML 骨架
        document.getElementById("app").innerHTML = `
            <div id="top">正确率: 0% | 进度: 0/0</div>
            
            <!-- 左右滑屏视口 CONTAINER -->
            <div class="swipe-container" id="swipeContainer">
                <div class="swipe-wrapper" id="swipeWrapper"></div>
            </div>

            <!-- 底部悬浮控制栏 DOCK -->
            <div class="dock-bar">
                <div class="glass-trigger" onclick="QuizApp.toggleFolder(true)">
                    <svg viewBox="0 0 24 24">
                        <path d="M4 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 12h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 18h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>
                    </svg>
                </div>
            </div>

            <!-- 🍏 iOS 级严格顺序网格弹窗文件夹 -->
            <div class="grid-folder" id="gridFolder">
                <div class="folder-header">
                    <span class="folder-title">全部题目 (${this.activeBank.length})</span>
                    <span class="folder-close" onclick="QuizApp.toggleFolder(false)">完成</span>
                </div>
                <div class="folder-grid-content" id="folderGrid"></div>
            </div>
        `;
        
        document.getElementById("app").style.display = "flex";

        this.renderAllSlides(); // 一次性渲染所有题目平铺，实现滑屏
        this.bindSwipeEvents(); // 绑定触屏与鼠标拖拽手势
        this.renderGrid();     // 渲染有序文件夹网格
        this.update();
    },

    // 渲染所有题目平铺到 wrapper 中
    renderAllSlides() {
        const wrapper = document.getElementById("swipeWrapper");
        if (!wrapper) return;

        wrapper.innerHTML = this.activeBank.map((q, qIdx) => `
            <div class="slide" data-idx="${qIdx}">
                <h2>Q${qIdx + 1}. ${q.q}</h2>
                ${q.opts.map((o, oIdx) => `
                    <div class="opt o-${qIdx}-${oIdx}" onclick="QuizApp.select(${qIdx}, ${oIdx})">${o}</div>
                `).join("")}
            </div>
        `).join("");
    },

    // 控制 iOS 弹窗文件夹的开关状态
    toggleFolder(show) {
        const folder = document.getElementById("gridFolder");
        if (!folder) return;
        if (show) {
            folder.classList.add("active");
            this.renderGrid(); // 每次打开顺便重绘最新红绿状态
        } else {
            folder.classList.remove("active");
        }
    },

    // 核心滑屏算法：滑动切题
    scrollToQuestion(index) {
        if (index < 0 || index >= this.activeBank.length) return;
        this.idx = index;
        const wrapper = document.getElementById("swipeWrapper");
        if (wrapper) {
            wrapper.style.transform = `translateX(-${index * 100}%)`;
        }
        this.renderGrid();
    },

    // 选择答案
    select(qIdx, oIdx) {
        if (this.record[qIdx] !== null) return; // 已做过的不允许重复点

        const q = this.activeBank[qIdx];
        this.record[qIdx] = oIdx;

        // 获取当前题目的所有选项容器
        if (oIdx === q.a) {
            document.querySelector(`.o-${qIdx}-${oIdx}`).classList.add("correct");
        } else {
            document.querySelector(`.o-${qIdx}-${oIdx}`).classList.add("wrong");
            const correctDom = document.querySelector(`.o-${qIdx}-${q.a}`);
            if (correctDom) correctDom.classList.add("correct");
        }

        this.update();
        this.renderGrid();

        // 答完自动延迟 600ms 滑动到下一题
        setTimeout(() => {
            if (qIdx === this.idx && this.idx + 1 < this.activeBank.length) {
                this.scrollToQuestion(this.idx + 1);
            }
        }, 600);
    },

    // 绑定 iOS 物理滑动交互（兼容手机端 Touch 和 PC 端鼠标）
    bindSwipeEvents() {
        const container = document.getElementById("swipeContainer");
        const wrapper = document.getElementById("swipeWrapper");
        if (!container || !wrapper) return;

        const start = (e) => {
            this.startX = e.touches ? e.touches[0].clientX : e.clientX;
            this.moveX = this.startX;
            wrapper.style.transition = "none"; // 拖拽时取消动画，实现跟手效果
        };

        const move = (e) => {
            if (!this.startX) return;
            this.moveX = e.touches ? e.touches[0].clientX : e.clientX;
            const deltaX = this.moveX - this.startX;
            const currentTranslate = -this.idx * container.offsetWidth;
            wrapper.style.transform = `translateX(${currentTranslate + deltaX}px)`;
        };

        const end = () => {
            if (!this.startX) return;
            const deltaX = this.moveX - this.startX;
            const threshold = container.offsetWidth * 0.25; // 滑动超过 25% 视口则判定切题

            wrapper.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"; // 恢复丝滑动画

            if (deltaX < -threshold && this.idx + 1 < this.activeBank.length) {
                this.scrollToQuestion(this.idx + 1); // 向左滑，下一题
            } else if (deltaX > threshold && this.idx - 1 >= 0) {
                this.scrollToQuestion(this.idx - 1); // 向右滑，上一题
            } else {
                this.scrollToQuestion(this.idx); // 没划过去，弹回原位
            }
            this.startX = 0;
        };

        // 手机端事件
        container.addEventListener("touchstart", start, { passive: true });
        container.addEventListener("touchmove", move, { passive: true });
        container.addEventListener("touchend", end);

        // PC 端鼠标模拟手势
        container.addEventListener("mousedown", start);
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", end);
    },

    update() {
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;
        
        const top = document.getElementById("top");
        if (top) {
            top.innerText = `正确率: ${acc}% | 进度: ${done}/${this.activeBank.length}`;
        }
    },

    // 渲染完美的、自上而下严格按顺序排列的网格面板
    renderGrid() {
        const grid = document.getElementById("folderGrid");
        if (!grid) return;
        grid.innerHTML = "";

        // 严格按顺序平铺 1, 2, 3, 4 ...
        this.activeBank.forEach((_, i) => {
            const d = document.createElement("div");
            d.innerText = i + 1;
            d.className = "qbtn";

            if (this.record[i] !== null) {
                if (this.record[i] === this.activeBank[i].a) {
                    d.classList.add("grid-correct");
                } else {
                    d.classList.add("grid-wrong");
                }
            } else if (i === this.idx) {
                d.classList.add("grid-active"); // 当前题目蓝框
            }

            d.onclick = () => {
                this.scrollToQuestion(i); // 点击直接跳题
                this.toggleFolder(false);  // 自动关闭 iOS 文件夹
            };
            grid.appendChild(d);
        });
    }
};

console.log("🍏 iOS 滑屏矩阵文件夹系统重构成功");
