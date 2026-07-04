const QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],

    start(isRandom) {
        this.activeBank = [...QUESTION_BANK];

        if (isRandom) {
            this.activeBank.sort(() => Math.random() - 0.5);
        }

        this.idx = 0;
        this.record = new Array(this.activeBank.length).fill(null);

        document.getElementById("home").style.display = "none";
        document.getElementById("app").style.display = "block";

        this.render();
        this.renderGrid();
    },

    render() {
        const q = this.activeBank[this.idx];
        const view = document.getElementById("viewport");

        view.innerHTML = `
            <h2>${q.q}</h2>
            ${q.opts.map((o,i)=>`
                <div onclick="QuizApp.select(${i})" style="padding:10px;margin:5px;background:#eee;cursor:pointer;">
                    ${o}
                </div>
            `).join("")}
        `;
    },

    async select(i) {
        const q = this.activeBank[this.idx];

        if (this.record[this.idx] !== null) return;

        this.record[this.idx] = i;

        // ❌ 错题写入数据库
        if (i !== q.a) {
            await fetch("/api/wrong-add", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    question: q.q,
                    correct_answer: q.opts[q.a],
                    user_answer: q.opts[i]
                })
            });
        }

        this.idx++;

        if (this.idx < this.activeBank.length) {
            this.render();
        }

        this.update();
        this.renderGrid();
    },

    update() {
        const done = this.record.filter(x=>x!==null).length;
        const correct = this.record.filter((v,i)=>v===this.activeBank[i].a).length;

        const acc = done ? Math.round(correct/done*100) : 0;

        document.getElementById("top").innerText = "正确率 " + acc + "%";
    },

    renderGrid() {
        const grid = document.getElementById("grid");
        grid.innerHTML = "";

        this.activeBank.forEach((_,i)=>{
            const d = document.createElement("div");
            d.innerText = i+1;
            d.style.display = "inline-block";
            d.style.padding = "5px";

            grid.appendChild(d);
        });
    }
};
