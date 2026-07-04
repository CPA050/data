const QuizApp = {
    idx: 0,
    record: [],
    currentCardNode: null,
    isAnimating: false,
    activeBank: [],
    touchStartX: 0,
    touchStartY: 0,

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },

    start(isRandom) {
        this.activeBank = [...QUESTION_BANK];
        if (isRandom) this.shuffle(this.activeBank);

        document.getElementById("home").style.display = "none";
        document.getElementById("app").style.display = "flex";

        this.idx = 0;
        this.record = new Array(this.activeBank.length).fill(null);

        this.render("pop");
        this.renderGrid();
        this.syncProgress();
    },

    render(type = "next") {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const q = this.activeBank[this.idx];
        const viewport = document.getElementById("viewport");

        const card = document.createElement("div");
        card.className = "card";

        const optionsHTML = q.opts.map((o, i) => {
            let cls = "opt";

            if (this.record[this.idx] !== null) {
                if (i === q.a) cls += " correct";
                else if (i === this.record[this.idx]) cls += " wrong";
            }

            return `
                <div class="${cls}" onclick="QuizApp.selectOpt(this, ${i})">
                    ${o}
                </div>
            `;
        }).join("");

        card.innerHTML = `
            <div class="q">Q${this.idx + 1}. ${q.q}</div>
            ${optionsHTML}
        `;

        viewport.innerHTML = "";
        viewport.appendChild(card);

        this.currentCardNode = card;
        this.syncProgress();

        setTimeout(() => this.isAnimating = false, 300);
    },

    async selectOpt(el, i) {
        if (this.isAnimating) return;
        if (this.record[this.idx] !== null) return;

        const q = this.activeBank[this.idx];
        this.record[this.idx] = i;

        const correct = i === q.a;

        if (correct) {
            el.classList.add("correct");
        } else {
            el.classList.add("wrong");

            // ⭐ 自动写入错题数据库
            await fetch("/functions/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: q.q,
                    correct_answer: q.opts[q.a],
                    user_answer: q.opts[i]
                })
            });
        }

        this.renderGrid();

        setTimeout(() => {
            if (this.idx < this.activeBank.length - 1) {
                this.idx++;
                this.render("next");
            }
        }, 700);
    },

    syncProgress() {
        const total = this.activeBank.length;
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) =>
            v !== null && v === this.activeBank[i].a
        ).length;

        const acc = done ? Math.round((correct / done) * 100) : 0;

        document.getElementById("top").innerText = `正确率 ${acc}%`;
        document.getElementById("progress").style.width =
            (this.idx / total) * 100 + "%";
    },

    renderGrid() {
        const grid = document.getElementById("grid");
        grid.innerHTML = "";

        this.activeBank.forEach((_, i) => {
            const b = document.createElement("div");
            b.className = "qbtn";

            if (this.record[i] !== null) {
                b.classList.add(
                    this.record[i] === this.activeBank[i].a ? "y" : "n"
                );
            }

            b.innerText = i + 1;
            b.onclick = () => {
                this.idx = i;
                this.render("pop");
            };

            grid.appendChild(b);
        });
    },

    async loadWrongQuestions() {
        const res = await fetch("/functions/api");
        const data = await res.json();
        console.log("错题本：", data);
        return data;
    },

    returnHome() {
        document.getElementById("app").style.display = "none";
        document.getElementById("home").style.display = "flex";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // 可加初始化逻辑
});
