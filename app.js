// ==========================================
// 🚀 QuizApp 10.6 · 带收藏功能
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

    // 章节相关
    _allChapters: [],
    _selectedChapters: [],
    _isChapterMode: false,
    _currentLimit: -1,
    _isRandom: false,

    // 其他内部变量
    _selectTimer: null,
    _pendingStart: 0,
    _pendingLimit: 0,
    _totalBank: [],
    _wrongIdMap: {},

    // ===== 🆕 收藏相关 =====
    _favorites: [],          // 收藏的题目 ID 列表
    _isFavoritesMode: false, // 是否处于收藏刷题模式

    // ------------------------------------------------------------
    // 用户管理
    // ------------------------------------------------------------
    getCurrentUser() {
        return localStorage.getItem('quiz_user_id');
    },

    checkLogin() {
        let user = this.getCurrentUser();
        if (!user) {
            user = prompt("🍏 请输入您的用户名：");
            if (user) {
                localStorage.setItem('quiz_user_id', user.trim());
                this.updateUserUI();
                return user.trim();
            }
            return null;
        }
        return user;
    },

    logout() {
        if (confirm("确定退出吗？")) {
            localStorage.removeItem('quiz_user_id');
            this.clearSessionContext();
            this.updateUserUI();
            alert("已退出");
            window.location.reload();
        }
    },

    updateUserUI() {
        const user = this.getCurrentUser();
        const info = document.getElementById('userInfoText');
        const btn = document.getElementById('logoutBtn');
        const settingsUser = document.getElementById('settingsUser');
        if (info) {
            info.textContent = user ? `🍏 已登录: ${user}` : `👤 游客模式`;
            if (btn) btn.style.display = user ? 'inline-block' : 'none';
        }
        if (settingsUser) settingsUser.textContent = user || '未登录';
    },

    checkLoginBeforeGo(targetUrl) {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return false; }
        window.location.href = targetUrl;
        return false;
    },

    // ------------------------------------------------------------
    // ===== 🆕 加载收藏列表 =====
    // ------------------------------------------------------------
    async loadFavorites() {
        const user = this.getCurrentUser();
        if (!user) {
            this._favorites = [];
            return;
        }
        try {
            const res = await fetch(`/api/favorites?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            this._favorites = data.map(q => q.id);
        } catch (e) {
            this._favorites = [];
            console.error('加载收藏失败:', e);
        }
    },

    // ------------------------------------------------------------
    // ===== 🆕 开始收藏刷题 =====
    // ------------------------------------------------------------
    async startFavorites() {
        const user = this.getCurrentUser();
        if (!user) {
            alert("请先登录");
            return;
        }
        await this.loadFavorites();
        if (this._favorites.length === 0) {
            alert("⭐ 暂无收藏题目");
            return;
        }
        // 获取收藏题目的完整数据
        const res = await fetch(`/api/favorites?user_id=${encodeURIComponent(user)}`);
        const bank = await res.json();
        if (!bank || bank.length === 0) {
            alert("⭐ 暂无收藏题目");
            return;
        }
        this._isFavoritesMode = true;
        this._source = 'favorites';
        this.startFromBank(bank, false);
    },

    // ===== 🆕 从给定题库开始刷题（不经过 API） =====
    startFromBank(bank, isRandom = false) {
        if (!bank || bank.length === 0) {
            alert("没有题目");
            return;
        }
        this.activeBank = bank;
        this.idx = 0;
        this.record = new Array(this.activeBank.length).fill(null);
        this._consecutiveCorrect = 0;
        this._consecutiveWrong = 0;
        this._sessionId = Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        this._isRandom = isRandom;
        this._currentLimit = bank.length;

        // 渲染界面（无章节导航，显示“收藏”）
        document.getElementById("home").style.display = "none";
        document.getElementById("app").innerHTML = `
            <div class="chapter-nav" id="chapterNav">
                <button class="chapter-btn active" data-chapter="全部" onclick="QuizApp.selectChapter('全部')">⭐ 收藏（${bank.length}题）</button>
            </div>
            <div class="app-card" id="mainQuizCard">
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
        this.saveSessionContext();
    },

    // ------------------------------------------------------------
    // 核心：开始刷题（智能隐藏无效章节）
    // ------------------------------------------------------------
    async start(isRandom, limit = -1, source = 'all', selectedChapters = null) {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录！"); return; }
        try {
            this._source = source;
            this._isFinishing = false;
            this._isRandom = isRandom;
            this._currentLimit = limit;

            // 🆕 加载收藏列表
            await this.loadFavorites();

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
            // 过滤无效章节（null、undefined、空字符串、"其他"）
            const allChapters = (data.chapters || [])
                .filter(ch => ch && ch.trim() !== '' && ch !== '其他');
            this._allChapters = allChapters;

            let bank = data.questions || data;

            if (!bank || bank.length === 0) {
                alert("❌ 当前筛选范围没有题目，请调整章节选择。");
                return;
            }

            // 错题模式
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
                    _wrongId: item.id
                }));
                this._wrongIdMap = {};
                bank.forEach(item => {
                    this._wrongIdMap[item.id] = item._wrongId;
                });
            } else {
                this._wrongIdMap = {};
            }

            // 数量限制
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

            // 渲染界面（章节导航：只有有效章节才显示按钮）
            const chapterButtons = this._allChapters.length > 0
                ? this._allChapters.map(ch => `
                    <button class="chapter-btn" data-chapter="${ch}" onclick="QuizApp.selectChapter('${ch}')">${ch}</button>
                `).join('')
                : '';

            document.getElementById("home").style.display = "none";
            document.getElementById("app").innerHTML = `
                <div class="chapter-nav" id="chapterNav">
                    <button class="chapter-btn active" data-chapter="全部" onclick="QuizApp.selectChapter('全部')">📚 全部</button>
                    ${chapterButtons}
                </div>
                <div class="app-card" id="mainQuizCard">
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

    // ------------------------------------------------------------
    // 章节选择（多选，但只有有效章节可被选中）
    // ------------------------------------------------------------
    selectChapter(chapter) {
        const allBtn = document.querySelector('.chapter-btn[data-chapter="全部"]');
        if (chapter === '全部') {
            this._selectedChapters = [];
            document.querySelectorAll('.chapter-btn').forEach(btn => btn.classList.remove('active'));
            if (allBtn) allBtn.classList.add('active');
            this._isChapterMode = false;
            this.start(this._isRandom, this._currentLimit, this._source, null);
            return;
        }
        const btn = document.querySelector(`.chapter-btn[data-chapter="${chapter}"]`);
        if (!btn) return;
        const isActive = btn.classList.contains('active');
        if (isActive) {
            btn.classList.remove('active');
            this._selectedChapters = this._selectedChapters.filter(c => c !== chapter);
        } else {
            btn.classList.add('active');
            this._selectedChapters.push(chapter);
            if (allBtn) allBtn.classList.remove('active');
        }
        if (this._selectedChapters.length === 0) {
            if (allBtn) allBtn.classList.add('active');
            this._isChapterMode = false;
            this.start(this._isRandom, this._currentLimit, this._source, null);
            return;
        }
        this._isChapterMode = true;
        this.start(this._isRandom, this._currentLimit, this._source, this._selectedChapters);
    },

    updateChapterButtons() {
        const btns = document.querySelectorAll('.chapter-btn');
        btns.forEach(btn => {
            const ch = btn.dataset.chapter;
            if (ch === '全部') {
                btn.classList.toggle('active', !this._selectedChapters || this._selectedChapters.length === 0);
            } else {
                btn.classList.toggle('active', this._selectedChapters && this._selectedChapters.includes(ch));
            }
        });
    },

    // ------------------------------------------------------------
    // 🆕 渲染卡片（增加方向参数，实现滑动动画 + 收藏星标）
    // ------------------------------------------------------------
    renderCard(needAnimation, direction = 'none') {
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

        let filterInfo = '';
        if (this._isChapterMode && this._selectedChapters.length > 0) {
            filterInfo = ` | 筛选: ${this._selectedChapters.join(' + ')}`;
        }

        // ===== 🆕 收藏星标状态 =====
        const isFav = this._favorites.includes(q.id);
        const starHtml = `
            <button onclick="QuizApp.toggleFavorite(${q.id}, this)" 
                    style="background:transparent; border:none; font-size:22px; cursor:pointer; color:${isFav ? '#f5a623' : '#ccc'}; transition:0.2s; padding:0 4px; line-height:1;">
                ${isFav ? '⭐' : '☆'}
            </button>
        `;

        const htmlContent = `
            <div id="top">
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; flex:1;">
                    <span style="font-size:13px; font-weight:600; color:#86868b;">正确率: <span id="accDisplay">${acc}</span>%</span>
                    <span style="font-size:13px; font-weight:600; color:#86868b;">| 进度: ${done}/${total}</span>
                    ${remaining > 0 ? `<span style="font-size:12px; color:#aaa; margin-left:4px;">(还剩 ${remaining} 题)</span>` : ''}
                    ${filterInfo ? `<span style="font-size:12px; color:#0071e3; margin-left:4px;">${filterInfo}</span>` : ''}
                </div>
                <div style="display:flex; align-items:center; gap:6px;">
                    ${starHtml}
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
            <h2>Q${this.idx + 1}. ${q.q}</h2>
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

        // 🆕 滑动动画处理
        if (needAnimation && direction !== 'none') {
            // 移除所有动画类
            content.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');
            void content.offsetWidth; // 强制回流

            if (direction === 'right') {
                // 下一题：当前卡片向左滑出，新卡片从右侧滑入
                content.classList.add('slide-out-left');
                setTimeout(() => {
                    content.innerHTML = htmlContent;
                    content.classList.remove('slide-out-left');
                    content.classList.add('slide-in-right');
                    setTimeout(() => {
                        content.classList.remove('slide-in-right');
                    }, 350);
                }, 250);
            } else if (direction === 'left') {
                // 上一题：当前卡片向右滑出，新卡片从左侧滑入
                content.classList.add('slide-out-right');
                setTimeout(() => {
                    content.innerHTML = htmlContent;
                    content.classList.remove('slide-out-right');
                    content.classList.add('slide-in-left');
                    setTimeout(() => {
                        content.classList.remove('slide-in-left');
                    }, 350);
                }, 250);
            }
        } else if (needAnimation) {
            // 无方向动画（淡入淡出，用于首次加载或点击跳转）
            content.classList.add('card-fade');
            setTimeout(() => {
                content.innerHTML = htmlContent;
                content.classList.remove('card-fade');
            }, 180);
        } else {
            content.innerHTML = htmlContent;
        }

        this.renderGrid();
        this.saveSessionContext();
        this.updateChapterButtons();
        this.safeUpdateSidebar();
        this.safeUpdateStats();
    },

    // ------------------------------------------------------------
    // 安全的大屏适配（无 insertBefore 错误）
    // ------------------------------------------------------------
    safeUpdateSidebar() {
        const card = document.getElementById('mainQuizCard');
        if (!card) return;
        const oldSidebar = document.querySelector('.grid-sidebar');
        if (oldSidebar) oldSidebar.remove();

        if (window.innerWidth < 640) return;
        const h2 = card.querySelector('h2');
        if (!h2) return;

        const sidebar = document.createElement('div');
        sidebar.className = 'grid-sidebar';
        const total = this.activeBank.length;
        if (total === 0) return;

        let html = '';
        for (let i = 0; i < total; i++) {
            const status = this.record[i];
            let cls = 'qbtn-mini';
            if (status !== null) {
                cls += (status === this.activeBank[i].a) ? ' correct' : ' wrong';
            }
            if (i === this.idx) cls += ' active';
            html += `<div class="${cls}" onclick="QuizApp.jumpToQuestion(${i})" title="第 ${i+1} 题">${i + 1}</div>`;
        }
        sidebar.innerHTML = html;
        h2.parentNode.insertBefore(sidebar, h2);
    },

    safeUpdateStats() {
        const card = document.getElementById('mainQuizCard');
        if (!card) return;
        const oldPanel = document.querySelector('.stats-panel');
        if (oldPanel) oldPanel.remove();

        if (window.innerWidth < 1024) return;

        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = done ? Math.round(correct / done * 100) : 0;
        const total = this.activeBank.length;
        const remaining = total - done;

        const panel = document.createElement('div');
        panel.className = 'stats-panel';
        panel.innerHTML = `
            <div class="stat-item"><span>📊 进度</span><span class="stat-value">${done}/${total}</span></div>
            <div class="stat-item"><span>✅ 正确率</span><span class="stat-value">${acc}%</span></div>
            <div class="stat-item"><span>⏳ 剩余</span><span class="stat-value">${remaining} 题</span></div>
            <div class="stat-item"><span>🔥 连续答对</span><span class="stat-value">${this._consecutiveCorrect || 0}</span></div>
            <div class="shortcut-hint">
                ⌨️ 快捷键<br>
                <kbd>1-4</kbd> 选答案 <kbd>Enter</kbd> 确认<br>
                <kbd>←</kbd> <kbd>→</kbd> 切换 <kbd>Esc</kbd> 关闭
            </div>
        `;
        card.appendChild(panel);
    },

    // ------------------------------------------------------------
    // 🆕 选择选项 + 自动跳转（带方向）
    // ------------------------------------------------------------
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
            setTimeout(() => this.finishBatch(), 300);
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
                this.renderCard(true, 'right');
            } else {
                this._isFinishing = true;
                this.finishBatch();
            }
        }, delay);
    },

    createRipple(element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    },

    finishBatch() {
        if (this._isFinishing) return;
        this._isFinishing = true;
        const user = this.getCurrentUser();
        if (!user) return;
        const total = this.record.length;
        const correct = this.record.filter((v, i) => v !== null && v === this.activeBank[i].a).length;
        const acc = total > 0 ? Math.round(correct / total * 100) : 0;

        // 如果是收藏模式，提示并返回收藏列表
        if (this._isFavoritesMode) {
            const msg = `✅ 收藏刷题完成！\n共 ${total} 题，正确率 ${acc}%`;
            if (confirm(msg + "\n\n点击「确定」返回收藏列表，点击「取消」返回首页")) {
                this.startFavorites();
            } else {
                this.goHome();
            }
            return;
        }

        if (!this._isRandom && this._totalBank && this._pendingStart !== undefined && this._source === 'all') {
            const newIndex = this._pendingStart + this.activeBank.length;
            if (newIndex >= this._totalBank.length) {
                this.saveProgress(user, { sequential_index: 0 });
                this.showToast("🎉 恭喜！你已经刷完所有题目！");
            } else {
                this.saveProgress(user, { sequential_index: newIndex });
            }
        }

        const recentIds = this.activeBank.map(q => q.id);
        this.saveRecentQuestions(user, recentIds);

        if (this._source === 'wrong') {
            const correctIds = this.activeBank
                .filter((q, i) => this.record[i] !== null && this.record[i] === q.a)
                .map(q => q.id);
            if (correctIds.length > 0) {
                const deletePromises = correctIds.map(id => {
                    const wrongId = this._wrongIdMap[id] || id;
                    return this.deleteWrongQuestion(wrongId, user);
                });
                Promise.all(deletePromises).then(() => {
                    console.log(`已移除 ${correctIds.length} 道错题`);
                }).catch(err => console.error('删除错题失败:', err));
            }
            const remaining = this.activeBank.length - correct;
            if (remaining === 0) {
                setTimeout(() => this.showToast("🎉 所有错题已消灭！"), 300);
            }
        }

        this.clearSessionContext();

        const modeLabel = this._source === 'wrong' ? '错题重练' : '刷题';
        const msg = `✅ ${modeLabel}完成！\n共 ${total} 题，正确率 ${acc}%`;
        if (confirm(msg + "\n\n点击「确定」再来一组，点击「取消」返回首页")) {
            const limit = this._currentLimit || 20;
            const isRandom = this._isRandom || false;
            const source = this._source || 'all';
            this._isFinishing = false;
            this.start(isRandom, limit, source);
        } else {
            this._isFinishing = false;
            window.location.reload();
        }
    },

    goHome() {
        this.clearSessionContext();
        window.location.href = '/';
    },

    // ===== 🆕 切换收藏状态 =====
    async toggleFavorite(questionId, btn) {
        const user = this.getCurrentUser();
        if (!user) {
            alert("请先登录");
            return;
        }
        const isFav = this._favorites.includes(questionId);
        const url = isFav ? '/api/favorites-remove' : '/api/favorites-add';
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user, question_id: questionId })
            });
            const data = await res.json();
            if (data.ok) {
                if (isFav) {
                    this._favorites = this._favorites.filter(id => id !== questionId);
                    btn.textContent = '☆';
                    btn.style.color = '#ccc';
                    this.showToast('已取消收藏', 1500);
                    // 如果当前在收藏模式且取消收藏，则移除该题并刷新列表
                    if (this._isFavoritesMode) {
                        // 从 activeBank 中移除该题
                        const idx = this.activeBank.findIndex(item => item.id === questionId);
                        if (idx !== -1) {
                            this.activeBank.splice(idx, 1);
                            this.record.splice(idx, 1);
                            if (this.idx >= this.activeBank.length) {
                                this.idx = this.activeBank.length - 1;
                            }
                            if (this.activeBank.length === 0) {
                                alert('⭐ 收藏已清空，返回首页');
                                this.goHome();
                                return;
                            }
                            this.renderCard(true);
                        }
                    }
                } else {
                    this._favorites.push(questionId);
                    btn.textContent = '⭐';
                    btn.style.color = '#f5a623';
                    this.showToast('已收藏 ⭐', 1500);
                }
            } else {
                alert('操作失败：' + (data.error || '未知错误'));
            }
        } catch (e) {
            alert('请求失败：' + e.message);
        }
    },

    // ------------------------------------------------------------
    // 题库管理（完整）
    // ------------------------------------------------------------
    async showManager() {
        const user = this.checkLogin();
        if (!user) return;
        this.clearSessionContext();
        document.getElementById("home").style.display = "none";
        document.getElementById("app").style.display = "block";
        document.getElementById("app").className = "stage-container";
        document.getElementById("app").innerHTML = `
            <div class="app-card" style="padding:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:8px;">
                    <h2 style="margin:0; font-size:22px;">📚 我的题库</h2>
                    <span style="font-size:14px; color:#86868b; background:rgba(0,0,0,0.05); padding:4px 12px; border-radius:20px;">👤 ${user}</span>
                </div>
                <div style="display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap;">
                    <button onclick="QuizApp.showAddForm()" style="flex:1; min-width:120px; background:#34c759; color:#fff; border:none; border-radius:12px; padding:12px 16px; font-size:15px; font-weight:600; cursor:pointer; box-shadow:0 4px 12px rgba(52,199,89,0.3); transition:0.2s;">➕ 添加题目</button>
                    <button onclick="QuizApp.goHome()" style="flex:1; min-width:120px; background:#86868b; color:#fff; border:none; border-radius:12px; padding:12px 16px; font-size:15px; font-weight:600; cursor:pointer; transition:0.2s;">🏠 返回首页</button>
                </div>
                <div style="margin-bottom: 12px;">
                    <input id="searchInput" type="text" placeholder="🔍 搜索题目..."
                           style="width:100%; padding:10px 14px; border:1px solid rgba(0,0,0,0.08); border-radius:10px; font-size:15px; background:rgba(255,255,255,0.5); outline:none; transition:0.2s;"
                           oninput="QuizApp.debounceSearch()" />
                </div>
                <div id="managerList" style="text-align:left; max-height: 400px; overflow-y: auto; padding-right:4px;">
                    <div style="text-align:center; padding:40px 0; color:#86868b;">加载中...</div>
                </div>
            </div>
        `;
        await this.loadQuestionsForManageWithSearch();
    },

    _searchTimer: null,
    debounceSearch() {
        clearTimeout(this._searchTimer);
        this._searchTimer = setTimeout(() => {
            this.loadQuestionsForManageWithSearch();
        }, 300);
    },

    async loadQuestionsForManageWithSearch() {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }
        const list = document.getElementById("managerList");
        const searchInput = document.getElementById("searchInput");
        const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';

        try {
            const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            const questions = data.questions || data;

            if (!questions || questions.length === 0) {
                list.innerHTML = `
                    <div style="text-align:center; padding:50px 20px; background:rgba(255,255,255,0.3); border-radius:16px; border:2px dashed rgba(0,0,0,0.08);">
                        <div style="font-size:48px; margin-bottom:12px;">📭</div>
                        <div style="font-size:16px; color:#86868b;">暂无题目</div>
                        <div style="font-size:14px; color:#a0a0a0; margin-top:4px;">点击「添加题目」创建第一道题</div>
                    </div>
                `;
                return;
            }

            let filteredData = questions;
            if (keyword) {
                filteredData = questions.filter(item =>
                    item.q.toLowerCase().includes(keyword) ||
                    item.opts.some(opt => opt.toLowerCase().includes(keyword))
                );
            }

            if (filteredData.length === 0) {
                list.innerHTML = `
                    <div style="text-align:center; padding:40px 20px; color:#86868b;">
                        🔍 没有找到与「${keyword}」匹配的题目
                    </div>
                `;
                return;
            }

            const total = questions.length;
            const filteredTotal = filteredData.length;
            const searchInfo = keyword ? `（筛选结果 ${filteredTotal}/${total} 道）` : '';

            list.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:13px; color:#86868b; margin-bottom:12px; padding:8px 12px; background:rgba(0,0,0,0.03); border-radius:8px; flex-wrap:wrap; gap:4px;">
                    <span>共 <strong style="color:#1d1d1f;">${total}</strong> 道题 ${searchInfo}</span>
                    ${keyword ? `<span onclick="document.getElementById('searchInput').value='';QuizApp.loadQuestionsForManageWithSearch();" style="color:#0071e3; cursor:pointer;">✕ 清除筛选</span>` : ''}
                </div>
                ${filteredData.map((q, i) => `
                    <div style="background:rgba(255,255,255,0.5); backdrop-filter:blur(10px); border-radius:14px; padding:12px 14px; margin-bottom:10px; border:1px solid rgba(255,255,255,0.6); box-shadow:0 2px 8px rgba(0,0,0,0.04); transition:0.2s; display:flex; flex-wrap:wrap; align-items:center; gap:8px;">
                        <div style="flex-shrink:0; width:28px; height:28px; background:#0071e3; color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:600;">${i + 1}</div>
                        <div style="flex:1; min-width:150px;">
                            <div style="font-size:15px; font-weight:500; color:#1d1d1f; line-height:1.4; word-break:break-word;">${q.q}</div>
                            <div style="font-size:12px; color:#86868b; margin-top:4px;">
                                ${q.opts.length} 个选项 · 正确答案: ${q.opts[q.a] || q.a}
                                ${q.chapter ? ` · <span style="color:#0071e3;">${q.chapter}</span>` : ''}
                            </div>
                        </div>
                        <div style="display:flex; gap:6px; flex-wrap:wrap; flex-shrink:0;">
                            <button onclick="QuizApp.editQuestion(${q.id})" style="background:#0071e3; color:#fff; border:none; border-radius:10px; padding:6px 14px; font-size:13px; font-weight:500; cursor:pointer; transition:0.2s;">✏️ 编辑</button>
                            <button onclick="QuizApp.deleteQuestion(${q.id})" style="background:#ff3b30; color:#fff; border:none; border-radius:10px; padding:6px 14px; font-size:13px; font-weight:500; cursor:pointer; transition:0.2s;">🗑️ 删除</button>
                        </div>
                    </div>
                `).join('')}
            `;
        } catch (e) {
            list.innerHTML = `<div style="text-align:center; padding:40px; color:#ff3b30;">加载失败：${e.message}</div>`;
        }
    },

    showAddForm() {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }
        const q = prompt("请输入题目内容：");
        if (!q) return;
        const optsRaw = prompt("请输入选项，用逗号分隔（如：A. 选项1, B. 选项2, C. 选项3）：");
        if (!optsRaw) return;
        const opts = optsRaw.split(',').map(s => s.trim());
        const a = parseInt(prompt("请输入正确答案的序号（从0开始，例如0代表第一个选项）："));
        if (isNaN(a) || a < 0 || a >= opts.length) {
            alert("序号无效");
            return;
        }
        const chapter = prompt("请输入章节名称（如：第1章 毛泽东思想，留空则不分类）：");
        this.submitQuestion({ q, opts, a, chapter: chapter || '' });
    },

    async submitQuestion(questionData) {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }
        try {
            const res = await fetch('/api/questions-add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...questionData, user_id: user })
            });
            const result = await res.json();
            if (result.ok) {
                alert("添加成功！");
                this.loadQuestionsForManageWithSearch();
            } else {
                alert("添加失败：" + (result.error || ''));
            }
        } catch (e) {
            alert("请求失败：" + e.message);
        }
    },

    async deleteQuestion(id) {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }
        if (!confirm("确定删除这道题吗？")) return;
        try {
            const res = await fetch('/api/questions-delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user, id })
            });
            const result = await res.json();
            if (result.ok) {
                alert("删除成功");
                this.loadQuestionsForManageWithSearch();
            } else {
                alert("删除失败：" + (result.error || ''));
            }
        } catch (e) {
            alert("请求失败：" + e.message);
        }
    },

    async editQuestion(id) {
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }
        const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
        const data = await res.json();
        const all = data.questions || data;
        const q = all.find(item => item.id === id);
        if (!q) { alert("未找到该题"); return; }
        const newQ = prompt("编辑题目内容：", q.q);
        if (newQ === null) return;
        const newOptsRaw = prompt("编辑选项（逗号分隔）：", q.opts.join(', '));
        if (newOptsRaw === null) return;
        const newOpts = newOptsRaw.split(',').map(s => s.trim());
        const newA = parseInt(prompt("编辑正确答案序号（从0开始）：", q.a));
        if (isNaN(newA) || newA < 0 || newA >= newOpts.length) {
            alert("序号无效");
            return;
        }
        const newChapter = prompt("编辑章节名称（留空则不修改）：", q.chapter || '');
        try {
            const updateRes = await fetch('/api/questions-update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user,
                    id: id,
                    q: newQ,
                    opts: newOpts,
                    a: newA,
                    chapter: newChapter || q.chapter || ''
                })
            });
            const result = await updateRes.json();
            if (result.ok) {
                alert("更新成功！");
                this.loadQuestionsForManageWithSearch();
            } else {
                alert("更新失败：" + (result.error || ''));
            }
        } catch (e) {
            alert("请求失败：" + e.message);
        }
    },

    // ------------------------------------------------------------
    // 错题相关
    // ------------------------------------------------------------
    async uploadWrongQuestion(userId, q) {
        try {
            await fetch('/api/wrong-add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, q: q.q, opts: q.opts, a: q.a })
            });
        } catch (e) { console.error(e); }
    },

    async deleteWrongQuestion(id, userId) {
        try {
            await fetch('/api/wrong-delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, id: id })
            });
        } catch (e) { console.error(e); }
    },

    // ------------------------------------------------------------
    // 导航网格
    // ------------------------------------------------------------
    toggleFolder(show) {
        const folder = document.getElementById('gridFolder');
        const overlay = document.getElementById('folderOverlay');
        if (!folder || !overlay) return;
        if (show === undefined) this.folderVisible = !this.folderVisible;
        else this.folderVisible = show;
        if (this.folderVisible) {
            folder.classList.add('active');
            overlay.classList.add('active');
            this.renderGrid();
        } else {
            folder.classList.remove('active');
            overlay.classList.remove('active');
        }
    },

    renderGrid() {
        const container = document.getElementById('folderGrid');
        if (!container) return;
        const total = this.activeBank.length;
        if (total === 0) {
            container.innerHTML = '<div style="padding:20px;text-align:center;color:#86868b;">暂无题目</div>';
            return;
        }
        let html = '';
        for (let i = 0; i < total; i++) {
            const status = this.record[i];
            let cls = 'qbtn';
            if (status !== null) {
                cls += (status === this.activeBank[i].a) ? ' grid-correct' : ' grid-wrong';
            }
            if (i === this.idx) cls += ' grid-active';
            html += `<div class="${cls}" onclick="QuizApp.jumpToQuestion(${i})">${i + 1}</div>`;
        }
        container.innerHTML = html;
    },

    // ------------------------------------------------------------
    // 🆕 跳转题目（点击题号时，增加方向参数并自动关闭网格）
    // ------------------------------------------------------------
    jumpToQuestion(index) {
        if (index < 0 || index >= this.activeBank.length) return;
        const direction = index > this.idx ? 'right' : 'left';
        this.idx = index;
        // 强制关闭网格
        this.toggleFolder(false);
        this.renderCard(true, direction);
    },

    // ------------------------------------------------------------
    // 🆕 事件绑定（含键盘 + 触摸滑动）
    // ------------------------------------------------------------
    bindGlobalEvents() {
        const btn = document.getElementById('masterGlassBtn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFolder();
            });
        }
        const overlay = document.getElementById('folderOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.toggleFolder(false);
            });
        }

        document.addEventListener('keydown', (e) => {
            const app = document.getElementById('app');
            if (app.style.display === 'none') {
                const key = e.key.toLowerCase();
                if (key === 's' && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.showQuantityModal('sequential');
                }
                if (key === 'r' && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.showQuantityModal('random');
                }
                if (key === 'w' && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.showQuantityModal('wrong');
                }
                if (key === 'm' && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.showManager();
                }
                if (key === 'h' && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.goHome();
                }
                if (key === 't' && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    const themes = ['light', 'dark', 'eye'];
                    const current = localStorage.getItem('quiz_theme') || 'light';
                    const idx = themes.indexOf(current);
                    const next = themes[(idx + 1) % themes.length];
                    this.setThemeFromSettings(next);
                }
                if (key === '?' && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.openShortcutHelp();
                }
                if (key === 'f' && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen?.();
                    } else {
                        document.exitFullscreen?.();
                    }
                }
                return;
            }

            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            const num = parseInt(e.key);
            if (num >= 1 && num <= 4) {
                const opts = document.querySelectorAll('.opt:not(.correct):not(.wrong)');
                if (opts[num - 1]) opts[num - 1].click();
            }

            if (e.key === 'ArrowLeft' && this.idx > 0) {
                e.preventDefault();
                this.idx--;
                this.renderCard(true, 'left');
            }
            if (e.key === 'ArrowRight' && this.idx < this.activeBank.length - 1) {
                e.preventDefault();
                this.idx++;
                this.renderCard(true, 'right');
            }

            if (e.key === 'Escape') {
                this.closeQuantityModal();
                this.toggleFolder(false);
                this.closeShortcutHelp();
                this.toggleSettings(false);
            }

            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                this.openShortcutHelp();
            }
        });

        // 🆕 触摸滑动切换题目（仅针对 quizContent，避免与章节导航冲突）
        const content = document.getElementById('quizContent');
        if (content) {
            let touchStartX = 0;
            let touchStartY = 0;

            content.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
            }, { passive: true });

            content.addEventListener('touchmove', (e) => {
                if (!touchStartX) return;
                const touch = e.touches[0];
                const deltaX = touch.clientX - touchStartX;
                const deltaY = touch.clientY - touchStartY;
                // 横向滑动距离大于纵向，且超过阈值（40px）
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
                    if (deltaX < 0) {
                        // 左滑 → 下一题
                        if (this.idx < this.activeBank.length - 1) {
                            this.idx++;
                            this.renderCard(true, 'right');
                        }
                    } else {
                        // 右滑 → 上一题
                        if (this.idx > 0) {
                            this.idx--;
                            this.renderCard(true, 'left');
                        }
                    }
                    // 重置起点，防止连续触发
                    touchStartX = touch.clientX;
                    touchStartY = touch.clientY;
                }
            }, { passive: true });

            content.addEventListener('touchend', () => {
                touchStartX = 0;
                touchStartY = 0;
            }, { passive: true });
        }

        window.addEventListener('resize', () => {
            this.safeUpdateSidebar();
            this.safeUpdateStats();
        });
    },

    // ------------------------------------------------------------
    // 主题系统（完整）
    // ------------------------------------------------------------
    setTheme(theme) {
        const body = document.body;
        body.classList.remove('theme-light', 'theme-dark', 'theme-eye', 'theme-custom', 'bg-image');
        body.style.removeProperty('--custom-bg');
        body.style.removeProperty('--custom-bg-image');
        body.style.removeProperty('--bg-opacity');
        body.style.removeProperty('--bg-blur');

        if (theme === 'light') { body.classList.add('theme-light'); localStorage.setItem('quiz_theme', 'light'); }
        else if (theme === 'dark') { body.classList.add('theme-dark'); localStorage.setItem('quiz_theme', 'dark'); }
        else if (theme === 'eye') { body.classList.add('theme-eye'); localStorage.setItem('quiz_theme', 'eye'); }

        document.querySelectorAll('.theme-option-btn').forEach(btn => btn.classList.remove('active'));
        const map = { light: 'settingsThemeLight', dark: 'settingsThemeDark', eye: 'settingsThemeEye' };
        const target = document.getElementById(map[theme]);
        if (target) target.classList.add('active');

        const opacitySlider = document.getElementById('bgOpacitySlider');
        const blurSlider = document.getElementById('bgBlurSlider');
        if (opacitySlider) opacitySlider.value = 100;
        if (blurSlider) blurSlider.value = 0;
        document.getElementById('opacityValue').textContent = '100%';
        document.getElementById('blurValue').textContent = '0px';
    },

    setThemeFromSettings(theme) {
        this.setTheme(theme);
    },

    applyCustomBg(color) {
        const body = document.body;
        body.classList.remove('theme-light', 'theme-dark', 'theme-eye', 'bg-image');
        body.classList.add('theme-custom');
        body.style.setProperty('--custom-bg', color);
        localStorage.setItem('quiz_theme', 'custom');
        localStorage.setItem('quiz_custom_bg', color);
        body.style.removeProperty('--custom-bg-image');
        body.style.removeProperty('--bg-opacity');
        body.style.removeProperty('--bg-blur');
        document.querySelectorAll('.theme-option-btn').forEach(btn => btn.classList.remove('active'));
        const picker = document.getElementById('settingsBgPicker');
        if (picker) picker.value = color;
    },

    applyCustomBgFromSettings(color) {
        this.applyCustomBg(color);
    },

    uploadBgImage() {
        document.getElementById('bgImageInput').click();
    },

    handleBgImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const body = document.body;
                body.classList.remove('theme-light', 'theme-dark', 'theme-eye', 'theme-custom');
                body.classList.add('bg-image');
                body.style.setProperty('--custom-bg-image', `url(${ev.target.result})`);
                const savedOpacity = localStorage.getItem('quiz_bg_opacity') || '100';
                const savedBlur = localStorage.getItem('quiz_bg_blur') || '0';
                body.style.setProperty('--bg-opacity', savedOpacity / 100);
                body.style.setProperty('--bg-blur', savedBlur);
                localStorage.setItem('quiz_theme', 'bg-image');
                localStorage.setItem('quiz_bg_image', ev.target.result);
                document.querySelectorAll('.theme-option-btn').forEach(btn => btn.classList.remove('active'));
                const opacitySlider = document.getElementById('bgOpacitySlider');
                const blurSlider = document.getElementById('bgBlurSlider');
                if (opacitySlider) opacitySlider.value = savedOpacity;
                if (blurSlider) blurSlider.value = savedBlur;
                document.getElementById('opacityValue').textContent = savedOpacity + '%';
                document.getElementById('blurValue').textContent = savedBlur + 'px';
                this.showToast('🖼️ 背景图片已更新');
            };
            reader.readAsDataURL(file);
        }
        event.target.value = '';
    },

    updateBgOpacity(value) {
        const body = document.body;
        const opacity = value / 100;
        body.style.setProperty('--bg-opacity', opacity);
        localStorage.setItem('quiz_bg_opacity', value);
        document.getElementById('opacityValue').textContent = value + '%';
    },

    updateBgBlur(value) {
        const body = document.body;
        body.style.setProperty('--bg-blur', value);
        localStorage.setItem('quiz_bg_blur', value);
        document.getElementById('blurValue').textContent = value + 'px';
    },

    loadTheme() {
        const saved = localStorage.getItem('quiz_theme') || 'light';
        const savedOpacity = localStorage.getItem('quiz_bg_opacity') || '100';
        const savedBlur = localStorage.getItem('quiz_bg_blur') || '0';

        if (saved === 'custom') {
            const bg = localStorage.getItem('quiz_custom_bg');
            if (bg) { this.applyCustomBg(bg); }
            document.querySelectorAll('.theme-option-btn').forEach(btn => btn.classList.remove('active'));
        } else if (saved === 'bg-image') {
            const img = localStorage.getItem('quiz_bg_image');
            if (img) {
                const body = document.body;
                body.classList.add('bg-image');
                body.style.setProperty('--custom-bg-image', `url(${img})`);
                body.style.setProperty('--bg-opacity', savedOpacity / 100);
                body.style.setProperty('--bg-blur', savedBlur);
                const opacitySlider = document.getElementById('bgOpacitySlider');
                const blurSlider = document.getElementById('bgBlurSlider');
                if (opacitySlider) opacitySlider.value = savedOpacity;
                if (blurSlider) blurSlider.value = savedBlur;
                document.getElementById('opacityValue').textContent = savedOpacity + '%';
                document.getElementById('blurValue').textContent = savedBlur + 'px';
            } else {
                this.setTheme('light');
            }
            document.querySelectorAll('.theme-option-btn').forEach(btn => btn.classList.remove('active'));
        } else {
            this.setTheme(saved);
        }

        const picker = document.getElementById('settingsBgPicker');
        if (picker && saved === 'custom') {
            const bg = localStorage.getItem('quiz_custom_bg') || '#e0e5ec';
            picker.value = bg;
        }
    },

    // ------------------------------------------------------------
    // 设置面板
    // ------------------------------------------------------------
    toggleSettings(force) {
        const modal = document.getElementById('settingsModal');
        if (!modal) return;
        if (force === false) {
            modal.style.display = 'none';
            return;
        }
        const isOpen = modal.style.display === 'flex';
        modal.style.display = isOpen ? 'none' : 'flex';
        if (!isOpen) {
            const vibToggle = document.getElementById('vibrationToggle');
            if (vibToggle) vibToggle.checked = this._vibrationEnabled;
            const delaySelect = document.getElementById('delaySelect');
            if (delaySelect) delaySelect.value = this._autoDelay;
            const streakToggle = document.getElementById('streakToggle');
            if (streakToggle) streakToggle.checked = this._streakAlertEnabled;
            const settingsUser = document.getElementById('settingsUser');
            if (settingsUser) settingsUser.textContent = this.getCurrentUser() || '未登录';
            const picker = document.getElementById('settingsBgPicker');
            if (picker) {
                const saved = localStorage.getItem('quiz_theme');
                if (saved === 'custom') {
                    const bg = localStorage.getItem('quiz_custom_bg') || '#e0e5ec';
                    picker.value = bg;
                } else {
                    picker.value = '#e0e5ec';
                }
            }
            const opacitySlider = document.getElementById('bgOpacitySlider');
            const blurSlider = document.getElementById('bgBlurSlider');
            const savedOpacity = localStorage.getItem('quiz_bg_opacity') || '100';
            const savedBlur = localStorage.getItem('quiz_bg_blur') || '0';
            if (opacitySlider) {
                opacitySlider.value = savedOpacity;
                document.getElementById('opacityValue').textContent = savedOpacity + '%';
            }
            if (blurSlider) {
                blurSlider.value = savedBlur;
                document.getElementById('blurValue').textContent = savedBlur + 'px';
            }
            const currentTheme = localStorage.getItem('quiz_theme') || 'light';
            document.querySelectorAll('.theme-option-btn').forEach(btn => btn.classList.remove('active'));
            const map = { light: 'settingsThemeLight', dark: 'settingsThemeDark', eye: 'settingsThemeEye' };
            const target = document.getElementById(map[currentTheme]);
            if (target) target.classList.add('active');
        }
    },

    setVibration(enabled) {
        this._vibrationEnabled = enabled;
        localStorage.setItem('quiz_vibration', enabled ? '1' : '0');
        this.showToast(enabled ? '📳 震动已开启' : '📳 震动已关闭');
    },

    setAutoDelay(delay) {
        this._autoDelay = delay;
        localStorage.setItem('quiz_auto_delay', String(delay));
        this.showToast(`⏱️ 跳转延迟已设为 ${delay}ms`);
    },

    setStreakAlert(enabled) {
        this._streakAlertEnabled = enabled;
        localStorage.setItem('quiz_streak_alert', enabled ? '1' : '0');
        this.showToast(enabled ? '🔥 连续提示已开启' : '🔥 连续提示已关闭');
    },

    loadSettings() {
        const vib = localStorage.getItem('quiz_vibration');
        if (vib !== null) this._vibrationEnabled = vib === '1';
        const delay = localStorage.getItem('quiz_auto_delay');
        if (delay !== null) this._autoDelay = parseInt(delay) || 200;
        const streak = localStorage.getItem('quiz_streak_alert');
        if (streak !== null) this._streakAlertEnabled = streak === '1';
    },

    // ------------------------------------------------------------
    // Toast / 引导 / 快捷键
    // ------------------------------------------------------------
    showToast(message, duration = 2500) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const item = document.createElement('div');
        item.className = 'toast-item';
        item.textContent = message;
        container.appendChild(item);
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => {
            item.classList.add('out');
            setTimeout(() => item.remove(), 300);
        }, duration);
        while (container.children.length > 3) {
            container.firstChild.remove();
        }
    },

    showTooltip(text, duration = 5000) {
        const bubble = document.getElementById('tooltipBubble');
        const textEl = document.getElementById('tooltipText');
        if (!bubble || !textEl) return;
        textEl.textContent = text;
        bubble.style.display = 'flex';
        clearTimeout(this._tooltipTimer);
        this._tooltipTimer = setTimeout(() => {
            bubble.style.display = 'none';
        }, duration);
    },

    dismissTooltip() {
        const bubble = document.getElementById('tooltipBubble');
        if (bubble) bubble.style.display = 'none';
        localStorage.setItem('quiz_tooltip_dismissed', '1');
    },

    openShortcutHelp() {
        document.getElementById('shortcutHelp').style.display = 'flex';
    },

    closeShortcutHelp() {
        document.getElementById('shortcutHelp').style.display = 'none';
    },

    // ------------------------------------------------------------
    // 会话上下文
    // ------------------------------------------------------------
    saveSessionContext() {
        if (this._isRestoring) return;
        if (!this.activeBank || this.activeBank.length === 0) return;
        const user = this.getCurrentUser();
        if (!user) return;
        const context = {
            sessionId: this._sessionId,
            questionIds: this.activeBank.map(q => q.id),
            records: this.record.slice(),
            currentIndex: this.idx,
            mode: this.lastMode,
            source: this._source,
            limit: this._currentLimit,
            isRandom: this._isRandom,
            totalBank: this._totalBank,
            pendingStart: this._pendingStart,
            timestamp: Date.now()
        };
        localStorage.setItem(`quiz_session_${user}`, JSON.stringify(context));
    },

    clearSessionContext() {
        const user = this.getCurrentUser();
        if (!user) return;
        localStorage.removeItem(`quiz_session_${user}`);
    },

    async restoreSession() {
        const user = this.getCurrentUser();
        if (!user) return false;
        const data = localStorage.getItem(`quiz_session_${user}`);
        if (!data) return false;
        const context = JSON.parse(data);
        if (Date.now() - context.timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem(`quiz_session_${user}`);
            return false;
        }
        try {
            const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
            const data2 = await res.json();
            const bank = data2.questions || data2;
            const validIds = new Set(bank.map(q => q.id));
            const allExist = context.questionIds.every(id => validIds.has(id));
            if (!allExist) {
                localStorage.removeItem(`quiz_session_${user}`);
                return false;
            }
        } catch (e) {
            return false;
        }

        this._isRestoring = true;
        try {
            const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
            const data2 = await res.json();
            const bank = data2.questions || data2;
            const idMap = {};
            bank.forEach(q => idMap[q.id] = q);
            this.activeBank = context.questionIds.map(id => idMap[id]).filter(q => q);
            this.record = context.records.slice(0, this.activeBank.length);
            this.idx = Math.min(context.currentIndex, this.activeBank.length - 1);
            this.lastMode = context.mode || 'sequential';
            this._source = context.source || 'all';
            this._currentLimit = context.limit || 20;
            this._isRandom = context.isRandom || false;
            this._totalBank = context.totalBank;
            this._pendingStart = context.pendingStart;
            this._sessionId = context.sessionId;
            this._isFinishing = false;

            // 重新渲染界面（保留章节按钮逻辑）
            const chapterButtons = this._allChapters.length > 0
                ? this._allChapters.map(ch => `
                    <button class="chapter-btn" data-chapter="${ch}" onclick="QuizApp.selectChapter('${ch}')">${ch}</button>
                `).join('')
                : '';

            document.getElementById("home").style.display = "none";
            document.getElementById("app").innerHTML = `
                <div class="chapter-nav" id="chapterNav">
                    <button class="chapter-btn active" data-chapter="全部" onclick="QuizApp.selectChapter('全部')">📚 全部</button>
                    ${chapterButtons}
                </div>
                <div class="app-card" id="mainQuizCard">
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

            this._isRestoring = false;
            this.showToast(`📂 已恢复上次答题（第 ${this.idx + 1}/${this.activeBank.length} 题）`, 3000);
            return true;
        } catch (e) {
            this._isRestoring = false;
            localStorage.removeItem(`quiz_session_${user}`);
            return false;
        }
    },

    // ------------------------------------------------------------
    // 智能提示
    // ------------------------------------------------------------
    async checkSmartPrompts() {
        const user = this.getCurrentUser();
        if (!user) return;

        const hasUsed = localStorage.getItem('quiz_has_used');
        if (!hasUsed) {
            setTimeout(() => {
                this.showTooltip('👋 点击【顺序刷题】开始学习', 4000);
                localStorage.setItem('quiz_has_used', '1');
            }, 1000);
            return;
        }

        try {
            const res = await fetch(`/api/wrong?user_id=${encodeURIComponent(user)}`);
            const wrongData = await res.json();
            if (wrongData && wrongData.length >= 10) {
                const dismissed = localStorage.getItem('quiz_wrong_prompt_dismissed');
                if (!dismissed) {
                    setTimeout(() => {
                        this.showTooltip(`💡 您有 ${wrongData.length} 道错题，试试【错题重练】吧`, 4000);
                        localStorage.setItem('quiz_wrong_prompt_dismissed', '1');
                    }, 2000);
                }
            }
        } catch (e) {}

        try {
            const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            const questions = data.questions || data;
            if (!questions || questions.length === 0) {
                setTimeout(() => {
                    this.showTooltip('📭 题库为空，先去【题库管理】添加题目吧', 4000);
                }, 1500);
            }
        } catch (e) {}
    },

    // ------------------------------------------------------------
    // 数量选择弹窗
    // ------------------------------------------------------------
    showQuantityModal(mode) {
        const modal = document.getElementById('quantityModal');
        if (!modal) return;
        const user = this.getCurrentUser();
        if (!user) { alert("请先登录"); return; }

        const titleMap = { 'sequential': '📋 选择刷题数量', 'random': '🎲 选择随机数量', 'wrong': '❌ 错题重练' };
        document.getElementById('modalTitle').textContent = titleMap[mode] || '📋 选择数量';

        const fetchUrl = mode === 'wrong' ?
            `/api/wrong?user_id=${encodeURIComponent(user)}` :
            `/api/questions?user_id=${encodeURIComponent(user)}`;

        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                const questions = data.questions || data;
                const total = questions.length;
                document.getElementById('totalCount').textContent = total;
                if (total === 0) {
                    const msg = mode === 'wrong' ? '暂无错题，继续加油！' : '题库为空，请先添加题目！';
                    alert('🎉 ' + msg);
                    this.closeQuantityModal();
                    return;
                }
                const defaultVal = this.lastSelected || 20;
                this.selectQuantity(defaultVal);
                this._modalMode = mode;
                this.updatePreview(defaultVal, total, mode);
                modal.style.display = 'flex';
            })
            .catch(err => alert('加载失败：' + err.message));
    },

    selectQuantity(num) {
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.preset-btn').forEach(b => {
            const txt = b.textContent.trim();
            if (txt === String(num) || (num === -1 && txt.includes('全部'))) {
                b.classList.add('active');
            }
        });
        document.getElementById('customQuantity').value = '';
        this._selectedNum = num;
        const total = parseInt(document.getElementById('totalCount').textContent) || 0;
        const mode = this._modalMode || 'sequential';
        this.updatePreview(num, total, mode);
    },

    confirmCustom() {
        const input = document.getElementById('customQuantity');
        const val = parseInt(input.value);
        if (isNaN(val) || val < 1) { alert('请输入有效正整数'); return; }
        const total = parseInt(document.getElementById('totalCount').textContent) || 0;
        if (val > total) { this.selectQuantity(-1); return; }
        this.selectQuantity(val);
    },

    closeQuantityModal() {
        document.getElementById('quantityModal').style.display = 'none';
    },

    updatePreview(num, total, mode) {
        const preview = document.getElementById('modalPreview');
        if (!preview) return;
        let text = '';
        const modeLabel = mode === 'wrong' ? '错题' : '题库';
        if (num === -1 || num >= total) {
            text = `📦 将加载全部 ${total} 道${modeLabel}`;
        } else {
            const user = this.getCurrentUser();
            if (mode === 'sequential') {
                const progress = this.getProgress(user);
                const start = progress.sequential_index || 0;
                const end = Math.min(start + num, total);
                const remaining = total - end;
                text = `顺序：第 ${start+1} ~ ${end} 题（剩余 ${remaining} 题）`;
            } else if (mode === 'wrong') {
                text = `❌ 错题重练：${num} 道（共 ${total} 道错题）`;
            } else {
                const recent = this.getRecentQuestions(user);
                const available = total - recent.length;
                text = `随机抽取 ${num} 道题（共 ${total} 题）`;
                if (available < num) text += `，将补充已做题目`;
            }
        }
        preview.textContent = text;
    },

    startWithQuantity() {
        const num = this._selectedNum;
        if (num === undefined) { alert('请选择刷题数量'); return; }
        const mode = this._modalMode || 'sequential';
        const isRandom = (mode === 'random');
        const source = (mode === 'wrong') ? 'wrong' : 'all';
        this.lastSelected = num;
        localStorage.setItem('quiz_last_selected', String(num));
        this.closeQuantityModal();
        this.start(isRandom, num, source);
    },

    // ------------------------------------------------------------
    // 进度管理
    // ------------------------------------------------------------
    getProgress(user) {
        const key = `quiz_progress_${user}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : { sequential_index: 0 };
    },

    saveProgress(user, data) {
        const key = `quiz_progress_${user}`;
        const current = this.getProgress(user);
        const updated = { ...current, ...data };
        localStorage.setItem(key, JSON.stringify(updated));
    },

    getRecentQuestions(user) {
        const key = `quiz_recent_${user}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },

    saveRecentQuestions(user, ids) {
        const key = `quiz_recent_${user}`;
        let recent = this.getRecentQuestions(user);
        recent = [...new Set([...ids, ...recent])];
        if (recent.length > 100) recent = recent.slice(0, 100);
        localStorage.setItem(key, JSON.stringify(recent));
    },

    // ------------------------------------------------------------
    // 初始化
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
