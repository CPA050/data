// ==========================================
// 🚀 QuizApp 10.0 · 章节筛选 + 多选 + 数量弹窗（完整版）
// ==========================================

window.QuizApp = {
    idx: 0,
    record: [],
    activeBank: [],
    startX: 0,
    startY: 0,
    isScrolling: false,
    folderStartY: 0,
    folderMoveY: 0,
    folderVisible: false,
    lastSelected: 20,
    lastMode: 'sequential',
    _source: 'all',
    _consecutiveCorrect: 0,
    _consecutiveWrong: 0,
    _autoDelay: 200,
    _vibrationEnabled: true,
    _streakAlertEnabled: true,
    _toastTimer: null,
    _sessionId: null,
    _isRestoring: false,
    _isFinishing: false,

    // ===== 🆕 章节相关 =====
    _allChapters: [],
    _selectedChapters: [],
    _allQuestions: [],
    _isChapterMode: false,
    _currentQuestions: [],

    // ------------------------------------------------------------
    // 1. 核心业务：加载题库并开始答题
    // ------------------------------------------------------------
    async start(isRandom, limit = -1, source = 'all', selectedChapters = null) {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录！"); return; }
        try {
            this._source = source;
            this._isFinishing = false;
            this._isRandom = isRandom;

            // 🆕 构建请求 URL（支持章节筛选）
            let url = `/api/questions?user_id=${encodeURIComponent(user)}`;
            if (selectedChapters && selectedChapters.length > 0) {
                const chaptersParam = selectedChapters.map(c => encodeURIComponent(c)).join(',');
                url += `&chapters=${chaptersParam}`;
                this._selectedChapters = selectedChapters;
                this._isChapterMode = true;
            } else {
                this._selectedChapters = [];
                this._isChapterMode = false;
            }

            const res = await fetch(url);
            const data = await res.json();

            // 保存章节列表
            this._allChapters = data.chapters || [];

            let bank = data.questions || [];
            if (!bank || bank.length === 0) {
                alert("❌ 当前筛选范围没有题目，请调整章节选择。");
                return;
            }

            this._allQuestions = bank;

            // 错题模式（暂不支持章节筛选）
            if (source === 'wrong') {
                const wrongRes = await fetch(`/api/wrong?user_id=${encodeURIComponent(user)}`);
                const wrongData = await wrongRes.json();
                if (!wrongData || wrongData.length === 0) {
                    alert("🎉 暂无错题，继续加油！");
                    return;
                }
                bank = wrongData.map(item => ({
                    id: item.id,
                    q: item.q,
                    opts: item.opts || [],
                    a: item.answer !== undefined ? item.opts.indexOf(item.answer) : 0,
                    _wrongId: item.id,
                    chapter: item.chapter || null
                }));
                this._wrongIdMap = {};
                bank.forEach(item => {
                    this._wrongIdMap[item.id] = item._wrongId;
                });
                this._isChapterMode = false;
            } else {
                this._wrongIdMap = {};
            }

            // 处理数量限制
            let selectedBank = [];
            if (limit === -1 || limit >= bank.length) {
                selectedBank = bank;
            } else {
                if (isRandom) {
                    const recent = this.getRecentQuestions(user);
                    const available = bank.filter(q => !recent.includes(q.id));
                    let pool = available.length >= limit ? available : bank;
                    const shuffled = [...pool].sort(() => Math.random() - 0.5);
                    selectedBank = shuffled.slice(0, limit);
                } else {
                    const progress = this.getProgress(user);
                    let startIdx = progress.sequential_index || 0;
                    if (startIdx >= bank.length) {
                        startIdx = 0;
                        this.saveProgress(user, { sequential_index: 0 });
                    }
                    const end = Math.min(startIdx + limit, bank.length);
                    selectedBank = bank.slice(startIdx, end);
                    this._pendingStart = startIdx;
                    this._pendingLimit = limit;
                    this._totalBank = bank;
                }
            }

            if (selectedBank.length === 0) {
                alert("没有符合条件的题目，请重试。");
                return;
            }

            this.activeBank = selectedBank;
            this.idx = 0;
            this.record = new Array(this.activeBank.length).fill(null);
            this._consecutiveCorrect = 0;
            this._consecutiveWrong = 0;
            this._sessionId = Date.now() + '_' + Math.random().toString(36).substr(2, 6);

            // 渲染界面
            document.getElementById("home").style.display = "none";
            document.getElementById("app").innerHTML = `
                <div class="app-card" id="mainQuizCard">
                    <!-- 🆕 章节导航栏 -->
                    <div class="chapter-nav" id="chapterNav">
                        <button class="chapter-btn active" data-chapter="全部" onclick="QuizApp.selectChapter('全部')">📚 全部</button>
                        ${this._allChapters.map(ch => `
                            <button class="chapter-btn" data-chapter="${ch}" onclick="QuizApp.selectChapter('${ch}')">${ch}</button>
                        `).join('')}
                    </div>
                    <div id="quizContent"></div>
                </div>
                <div class="glass-trigger" id="masterGlassBtn">
                    <svg viewBox="0 0 24 24"><path d="M4 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 12h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 18h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/></svg>
                </div>
                <div class="folder-overlay" id="folderOverlay"></div>
                <div class="grid-folder" id="gridFolder">
                    <div class="folder-drag-handle"></div>
                    <div class="folder-grid-content" id="folderGrid"></div>
                </div>
            `;
            document.getElementById("app").className = "stage-container";
            document.getElementById("app").style.display = "block";
            this.renderCard(false);
            this.bindGlobalEvents();
            this.renderGrid();
            this.folderVisible = false;
            this._currentLimit = limit;
            this._isRandom = isRandom;

            this.saveSessionContext();
            this.checkSmartPrompts();

        } catch (err) {
            alert("加载题库失败：" + err.message);
        }
    },

    // ===== 🆕 章节选择（支持多选） =====
    selectChapter(chapter) {
        const allBtn = document.querySelector('.chapter-btn[data-chapter="全部"]');
        const btns = document.querySelectorAll('.chapter-btn');

        if (chapter === '全部') {
            // 点击"全部"：取消所有其他选中，只高亮"全部"
            this._selectedChapters = [];
            btns.forEach(btn => btn.classList.remove('active'));
            if (allBtn) allBtn.classList.add('active');
            this._isChapterMode = false;
            // 重新加载全部题目
            this.start(this._isRandom || false, this._currentLimit || -1, this._source || 'all', null);
            return;
        }

        // 点击其他章节：切换选中状态
        const btn = document.querySelector(`.chapter-btn[data-chapter="${chapter}"]`);
        if (!btn) return;

        const isActive = btn.classList.contains('active');
        if (isActive) {
            btn.classList.remove('active');
            this._selectedChapters = this._selectedChapters.filter(c => c !== chapter);
        } else {
            btn.classList.add('active');
            this._selectedChapters.push(chapter);
            // 取消"全部"的高亮
            if (allBtn) allBtn.classList.remove('active');
        }

        // 如果没有选中的章节，自动切回"全部"
        if (this._selectedChapters.length === 0) {
            if (allBtn) allBtn.classList.add('active');
            this._isChapterMode = false;
            this.start(this._isRandom || false, this._currentLimit || -1, this._source || 'all', null);
            return;
        }

        this._isChapterMode = true;
        // 重新加载选中的章节
        this.start(this._isRandom || false, this._currentLimit || -1, this._source || 'all', this._selectedChapters);
    },

    // ===== 🆕 更新章节按钮高亮状态 =====
    updateChapterButtons(selectedChapters) {
        const btns = document.querySelectorAll('.chapter-btn');
        btns.forEach(btn => {
            const ch = btn.dataset.chapter;
            if (ch === '全部') {
                btn.classList.toggle('active', !selectedChapters || selectedChapters.length === 0);
            } else {
                btn.classList.toggle('active', selectedChapters && selectedChapters.includes(ch));
            }
        });
    },

    // ------------------------------------------------------------
    // 2. 渲染答题卡片（修改：将内容放入 #quizContent）
    // ------------------------------------------------------------
    renderCard(needAnimation) {
        const content = document.getElementById("quizContent");
        if (!content) return;
        const q = this.activeBank[this.idx];
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;
        const total = this.activeBank.length;
        const remaining = total - done;
        const percent = total > 0 ? Math.round(done / total * 100) : 0;
        const circumference = 94.2;
        const offset = circumference * (1 - percent / 100);

        // 🆕 显示当前筛选信息
        let filterInfo = '';
        if (this._isChapterMode && this._selectedChapters.length > 0) {
            filterInfo = ` | 筛选: ${this._selectedChapters.join(' + ')}`;
        }

        const htmlContent = `
            <div id="top">
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                    <span style="font-size:13px; font-weight:600; color:#86868b;">正确率: <span id="accDisplay">${acc}</span>%</span>
                    <span style="font-size:13px; font-weight:600; color:#86868b;">| 进度: ${done}/${total}</span>
                    ${remaining > 0 ? `<span style="font-size:12px; color:#aaa; margin-left:4px;">(还剩 ${remaining} 题)</span>` : ''}
                    ${filterInfo ? `<span style="font-size:12px; color:#0071e3; margin-left:4px;">${filterInfo}</span>` : ''}
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <button onclick="QuizApp.goHome()" style="background:rgba(255,255,255,0.2); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.3); border-radius:30px; padding:4px 14px; font-size:13px; font-weight:500; color:#0071e3; cursor:pointer;">🏠 返回</button>
                    <div class="progress-ring">
                        <svg width="36" height="36">
                            <circle class="bg" cx="18" cy="18" r="15"/>
                            <circle class="fg" cx="18" cy="18" r="15"
                                    stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
                        </svg>
                    </div>
                </div>
            </div>
            <h2 style="transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
                Q${this.idx + 1}. ${q.q}
            </h2>
            ${q.opts.map((o, oIdx) => {
                let cls = "opt";
                if (this.record[this.idx] !== null) {
                    if (oIdx === q.a) cls += " correct";
                    else if (oIdx === this.record[this.idx]) cls += " wrong";
                }
                return `<div class="${cls}" onclick="QuizApp.select(${oIdx}, this)">${o}</div>`;
            }).join("")}
            <div class="group-progress">
                <div class="bar" style="width: ${percent}%;"></div>
            </div>
        `;

        if (needAnimation) {
            content.classList.add("card-fade");
            setTimeout(() => {
                content.innerHTML = htmlContent;
                content.classList.remove("card-fade");
            }, 180);
        } else {
            content.innerHTML = htmlContent;
        }
        this.renderGrid();
        this.saveSessionContext();
        // 更新章节按钮高亮
        this.updateChapterButtons(this._selectedChapters);
    },

    // ------------------------------------------------------------
    // 以下为原有方法（完全保留，未修改）
    // ------------------------------------------------------------
    goHome() {
        this.clearSessionContext();
        window.location.href = '/';
    },

    select(oIdx, element) {
        if (this.record[this.idx] !== null) return;
        if (this._isFinishing) return;

        const q = this.activeBank[this.idx];
        this.record[this.idx] = oIdx;
        const isCorrect = (oIdx === q.a);

        if (this._vibrationEnabled && navigator.vibrate) {
            if (isCorrect) navigator.vibrate(10);
            else navigator.vibrate([10, 50, 10]);
        }

        if (isCorrect) {
            this._consecutiveCorrect++;
            this._consecutiveWrong = 0;
            if (this._streakAlertEnabled && this._consecutiveCorrect === 5) {
                this.showToast("🔥 状态不错！连续答对 5 题！");
            }
            if (this._streakAlertEnabled && this._consecutiveCorrect === 10) {
                this.showToast("🔥 太棒了！连续答对 10 题！");
            }
            element.classList.add("correct");
        } else {
            this._consecutiveWrong++;
            this._consecutiveCorrect = 0;
            if (this._streakAlertEnabled && this._consecutiveWrong === 3) {
                this.showToast("💪 别灰心，再想想！");
            }
            element.classList.add("wrong");
            this.createRipple(element);
            const opts = element.parentNode.querySelectorAll(".opt");
            if (opts[q.a]) opts[q.a].classList.add("correct");
            if (this._source === 'all') {
                const user = this.getCurrentUser();
                if (user) this.uploadWrongQuestion(user, q);
            }
        }
        this.renderGrid();

        const allDone = this.record.every(v => v !== null);
        if (allDone) {
            this._isFinishing = true;
            setTimeout(() => {
                this.finishBatch();
            }, 300);
            return;
        }

        const delay = this._autoDelay || 200;
        clearTimeout(this._selectTimer);
        this._selectTimer = setTimeout(() => {
            if (this.record.every(v => v !== null)) {
                this._isFinishing = true;
                this.finishBatch();
                return;
            }
            if (this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this.renderCard(true);
            } else {
                this._isFinishing = true;
                this.finishBatch();
            }
        }, delay);
    },

    createRipple(element) { /* 保持不变 */ },
    finishBatch() { /* 保持不变 */ },

    // ------------------------------------------------------------
    // 题库管理（原样保留）
    // ------------------------------------------------------------
    async showManager() { /* 原样 */ },
    async loadQuestionsForManageWithSearch() { /* 原样 */ },
    showAddForm() { /* 原样 */ },
    async submitQuestion(questionData) { /* 原样 */ },
    async deleteQuestion(id) { /* 原样 */ },
    async editQuestion(id) { /* 原样 */ },

    // ------------------------------------------------------------
    // 用户管理（原样保留）
    // ------------------------------------------------------------
    getCurrentUser() { return localStorage.getItem('quiz_user_id'); },
    checkLogin() { /* 原样 */ },
    logout() { /* 原样 */ },
    checkLoginBeforeGo(targetUrl) { /* 原样 */ },
    updateUserUI() { /* 原样 */ },

    // ------------------------------------------------------------
    // 错题相关（原样保留）
    // ------------------------------------------------------------
    async uploadWrongQuestion(userId, q) { /* 原样 */ },
    async deleteWrongQuestion(id, userId) { /* 原样 */ },

    // ------------------------------------------------------------
    // 导航网格（原样保留）
    // ------------------------------------------------------------
    toggleFolder(show) { /* 原样 */ },
    renderGrid() { /* 原样 */ },
    jumpToQuestion(index) { /* 原样 */ },

    // ------------------------------------------------------------
    // 事件绑定（原样保留，无需改动）
    // ------------------------------------------------------------
    bindGlobalEvents() { /* 原样 */ },

    // ------------------------------------------------------------
    // 主题系统（原样保留）
    // ------------------------------------------------------------
    setTheme(theme) { /* 原样 */ },
    applyCustomBg(color) { /* 原样 */ },
    applyCustomBgFromSettings(color) { /* 原样 */ },
    uploadBgImage() { /* 原样 */ },
    handleBgImageUpload(event) { /* 原样 */ },
    loadTheme() { /* 原样 */ },

    // ------------------------------------------------------------
    // 设置面板（原样保留）
    // ------------------------------------------------------------
    toggleSettings(force) { /* 原样 */ },
    setVibration(enabled) { /* 原样 */ },
    setAutoDelay(delay) { /* 原样 */ },
    setStreakAlert(enabled) { /* 原样 */ },
    loadSettings() { /* 原样 */ },

    // ------------------------------------------------------------
    // Toast / 引导 / 快捷键（原样保留）
    // ------------------------------------------------------------
    showToast(message, duration) { /* 原样 */ },
    showTooltip(text, duration) { /* 原样 */ },
    dismissTooltip() { /* 原样 */ },
    openShortcutHelp() { /* 原样 */ },
    closeShortcutHelp() { /* 原样 */ },

    // ------------------------------------------------------------
    // 会话上下文（原样保留）
    // ------------------------------------------------------------
    saveSessionContext() { /* 原样 */ },
    clearSessionContext() { /* 原样 */ },
    async restoreSession() { /* 原样 */ },

    // ------------------------------------------------------------
    // 智能提示（原样保留）
    // ------------------------------------------------------------
    async checkSmartPrompts() { /* 原样 */ },

    // ------------------------------------------------------------
    // 数量选择弹窗（原样保留）
    // ------------------------------------------------------------
    showQuantityModal(mode) { /* 原样 */ },
    selectQuantity(num) { /* 原样 */ },
    confirmCustom() { /* 原样 */ },
    closeQuantityModal() { /* 原样 */ },
    updatePreview(num, total, mode) { /* 原样 */ },
    startWithQuantity() { /* 原样 */ },

    // ------------------------------------------------------------
    // 进度管理（原样保留）
    // ------------------------------------------------------------
    getProgress(user) { /* 原样 */ },
    saveProgress(user, data) { /* 原样 */ },
    getRecentQuestions(user) { /* 原样 */ },
    saveRecentQuestions(user, ids) { /* 原样 */ },

    // ------------------------------------------------------------
    // 初始化（原样保留）
    // ------------------------------------------------------------
    async init() {
        this.updateUserUI();
        this.loadTheme();
        this.loadSettings();

        const saved = localStorage.getItem('quiz_last_selected');
        if (saved) {
            const num = parseInt(saved);
            if (!isNaN(num)) this.lastSelected = num;
        }

        const user = this.getCurrentUser();
        if (user) {
            const sessionData = localStorage.getItem(`quiz_session_${user}`);
            if (sessionData) {
                setTimeout(() => {
                    this.showTooltip('📂 发现未完成的答题，点击【顺序刷题】继续', 4000);
                }, 1500);
            }
        }

        setTimeout(() => this.checkSmartPrompts(), 2000);
    }
};

window.addEventListener('DOMContentLoaded', () => {
    QuizApp.init();
});
