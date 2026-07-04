const QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    locked: false,

    start(isRandom) {
        if (!window.QUESTION_BANK || QUESTION_BANK.length === 0) {
            alert("题库未加载");
            return;
        }

        this.activeBank = [...QUESTION_BANK];

        if (isRandom) {
            this.activeBank.sort(() => Math.random() - 0.5);
        }

        this.idx = 0;
        this.record = new Array(this.activeBank.length).fill(null);

        const home = document.getElementById("home");
        const app = document.getElementById("app");

        if (!home || !app) {
            alert("HTML结构错误：缺少 home 或 app");
            return;
        }

        home.style.display = "none";
        app.style.display = "block";

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
                <div class="opt" onclick="QuizApp.select(${i})">
                    ${o}
                </div>
            `).join("")}
        `;
    },

    async select(i) {
        if (this.locked) return;
        if (this.record[this.idx] !== null) return;

        this.locked = true;

        const q = this.activeBank[this.idx];
        this.record[this.idx] = i;

        const opts = document.querySelectorAll(".opt");

        // 标记颜色
        if (i === q.a) {
            opts[i].classList.add("correct");
        } else {
            opts[i].classList.add("wrong");
            if (opts[q.a]) opts[q.a].classList.add("correct");

            // ⭐ 错题写入数据库（安全版）
            try {
                await fetch("/api/wrong-add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question: q.q,
                        correct_answer: q.opts[q.a],
                        user_answer: q.opts[i]
                    })
                });
            } catch (e) {
                console.log("错题上传失败", e);
            }
        }

        this.update();
        this.renderGrid();

        setTimeout(() => {
            this.idx++;

            if (this.idx < this.activeBank.length) {
                this.render();
            } else {
                alert("已完成所有题目");
            }

            this.locked = false;
        }, 600);
    },

    update() {
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) =>
            v !== null && v === this.activeBank[i].a
        ).length;

        const acc = done ? Math.round(correct / done * 100) : 0;

        const top = document.getElementById("top");
        if (top) top.innerText = "正确率 " + acc + "%";
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
                d.style.background = this.record[i] === this.activeBank[i].a
                    ? "#4caf50"
                    : "#f44336";
                d.style.color = "#fff";
            }

            d.onclick = () => {
                this.idx = i;
                this.render();
            };

            grid.appendChild(d);
        });
    }
};

// 初始化检查
document.addEventListener("DOMContentLoaded", () => {
    console.log("QuizApp loaded");
    console.log("题库数量:", window.QUESTION_BANK?.length);
});
