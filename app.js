// ==========================================
// 🚀 QuizApp 核心逻辑 3.0（多文件完美适配版）
// ==========================================

window.QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    locked: false,

    start(isRandom) {
        // 🌟 双重保险：同时检查 window 作用域和全局作用域下的题库
        const bank = window.QUESTION_BANK || QUESTION_BANK;
        
        if (!bank || bank.length === 0) {
            alert("❌ 题库未加载！请检查 questions.js 是否和 html 在同一目录下，且没有语法错误。");
            return;
        }

        this.activeBank = [...bank];

        // 随机乱序逻辑
        if (isRandom) {
            this.activeBank.sort(() => Math.random() - 0.5);
        }

        this.idx = 0;
        this.record = new Array(this.activeBank.length).fill(null);

        // 切换 iOS 玻璃面板显示状态
        document.getElementById("home").style.display = "none";
        document.getElementById("app").style.display = "block";

        this.render();
        this.renderGrid();
        this.update();
    },

    render() {
        const q = this.activeBank[this.idx];
        const view = document.getElementById("viewport");
        if (!q || !view) return;

        view.innerHTML = `
            <h2>Q${this.idx + 1}. ${q.q}</h2>
            ${q.opts.map((o, i) => `
                <div class="opt" onclick="QuizApp.select(${i})">${o}</div>
            `).join("")}
        `;
    },

    select(i) {
        if (this.locked || this.record[this.idx] !== null) return;
        this.locked = true;

        const q = this.activeBank[this.idx];
        this.record[this.idx] = i;

        const opts = document.querySelectorAll(".opt");
        if (i === q.a) {
            opts[i].classList.add("correct");
        } else {
            opts[i].classList.add("wrong");
            if (opts[q.a]) opts[q.a].classList.add("correct");
        }

        this.update();
        this.renderGrid();

        setTimeout(() => {
            this.idx++;
            if (this.idx < this.activeBank.length) {
                this.render();
            } else {
                alert("🎉 太棒了，所有题目已完成！");
            }
            this.locked = false;
        }, 800);
    },

    update() {
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;
        
        document.getElementById("top").innerText = `正确率: ${acc}% | 进度: ${done}/${this.activeBank.length}`;
    },

    renderGrid() {
        const grid = document.getElementById("grid");
        if (!grid) return;
        grid.innerHTML = "";

        this.activeBank.forEach((_, i) => {
            const d = document.createElement("div");
            d.innerText = i + 1;
            d.className = "qbtn";

            if (this.record[i] !== null) {
                // 精准映射新版 iOS 绿红皮肤
                d.style.background = this.record[i] === this.activeBank[i].a ? "rgba(52, 199, 89, 0.8)" : "rgba(255, 59, 48, 0.8)";
                d.style.color = "#ffffff";
                d.style.borderColor = "transparent";
            } else if (i === this.idx) {
                // 当前题号高亮
                d.style.borderColor = "#0071e3";
                d.style.color = "#0071e3";
            }

            d.onclick = () => {
                this.idx = i;
                this.render();
                this.renderGrid();
            };
            grid.appendChild(d);
        });
    }
};

// 检查引入状态
console.log("🚀 QuizApp 逻辑文件加载成功");
