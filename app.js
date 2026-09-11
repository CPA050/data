// ============================================================
// QuizApp 11.2 · 完整功能版
// 保留全部原有功能 + 液态玻璃底栏 + 错题闭环 + 无图标
// ============================================================

window.QuizApp = {

    // ============================================================
    // 状态
    // ============================================================
    idx: 0,
    record: [],
    activeBank: [],
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

    // 章节
    _allChapters: [],
    _selectedChapters: [],
    _isChapterMode: false,
    _currentLimit: -1,
    _isRandom: false,

    // 收藏
    _favorites: [],
    _isFavoritesMode: false,

    // 多选
    _tempMulti: [],
    _multiSubmitted: false,

    // 内部
    _selectTimer: null,
    _pendingStart: 0,
    _pendingLimit: 0,
    _totalBank: [],
    _wrongIdMap: {},
    _wrongList: [],
    _wrongFilter: 'all',
    _bankCache: [],
    _bankSearchTimer: null,

    // 底栏
    currentTab: 'home',
    TABS: ['home', 'bank', 'wrong', 'fav', 'me'],
    welcomeText: '',
    showQuizActions: false,

    // 欢迎词库
    GREETINGS: [
        '保持热爱，奔赴山海',
        '每一次练习，都是成长的伏笔',
        '今天也要加油',
        '慢慢来，比较快',
        '你的努力，终将闪闪发光',
        '别焦虑，一步步来',
        '刷题是孤独的浪漫',
        '你的未来，藏在你现在的努力里',
        '愿你所求皆所愿，所行化坦途',
        '把每一天过成自己喜欢的样子',
        '在知识的海洋里，做一只快乐的小鲸鱼',
        '别怕路长，进一步有进一步的欢喜',
        '你的坚持，终将美好',
        '关关难过关关过，前路漫漫亦灿灿',
        '每一次答题，都是和更好的自己相遇',
        '静静的努力，总有一天会照亮前方',
        '所有的不期而遇，都是努力后的惊喜',
        '慢慢走，欣赏啊',
        '走过的每一步，都算数',
        '心怀希望，无畏前行'
    ],

    // ============================================================
    // 用户管理
    // ============================================================
    getCurrentUser() {
        return localStorage.getItem('quiz_user_id');
    },

    checkLogin() {
        let user = this.getCurrentUser();
        if (!user) {
            user = prompt('请输入您的用户名：');
            if (user && user.trim()) {
                localStorage.setItem('quiz_user_id', user.trim());
                this.updateUserUI();
                return user.trim();
            }
            return null;
        }
        return user;
    },

    logout() {
        if (confirm('确定退出登录吗？')) {
            localStorage.removeItem('quiz_user_id');
            this.clearSessionContext();
            this.updateUserUI();
            this.showToast('已退出登录');
            if (this.currentTab === 'me') this.renderMe();
        }
    },

    updateUserUI() {
        const user = this.getCurrentUser();
        const el = document.getElementById('settingsUser');
        if (el) el.textContent = user || '未登录';
    },

    loginNow() {
        const name = prompt('请输入用户名：');
        if (name && name.trim()) {
            localStorage.setItem('quiz_user_id', name.trim());
            this.updateUserUI();
            this.showToast('登录成功');
            this.renderMe();
        }
    },

    // ============================================================
    // 初始化
    // ============================================================
    init() {
        this.updateUserUI();
        this.loadTheme();
        this.loadSettings();
        this.loadWelcome();

        // 恢复上次选择的题目数量
        const saved = localStorage.getItem('quiz_last_selected');
        if (saved) {
            const num = parseInt(saved);
            if (!isNaN(num)) this.lastSelected = num;
        }

        // 清除历史遗留的背景图（用户反馈手机显示相册图片的问题）
        if (localStorage.getItem('quiz_bg_image')) {
            localStorage.removeItem('quiz_bg_image');
        }
        document.body.style.backgroundImage = '';

        // 绑定事件
        this.bindTabs();
        this.bindDragSlider();
        this.bindKeyboard();
        this.bindHomeClick();
        this.bindBgUpload();

        // 默认显示首页
        this.switchTab('home');

        // 智能提示
        setTimeout(() => this.checkSmartPrompts(), 2000);
    },

    bindBgUpload() {
        const el = document.getElementById('bgImageInput');
        if (el) {
            el.addEventListener('change', (e) => this.handleBgImageUpload(e));
        }
    },

    // ============================================================
    // 首页点击展开
    // ============================================================
    bindHomeClick() {
        const home = document.getElementById('home');
        if (!home) return;
        home.addEventListener('click', (e) => {
            if (home.classList.contains('expanded')) return;
            if (e.target.closest('.resume-hint')) return;
            if (e.target.closest('.quiz-actions')) return;
            this.expandQuizActions();
        });
    },

    expandQuizActions() {
        const home = document.getElementById('home');
        const welcomeText = document.getElementById('welcomeText');
        const welcomeHint = document.getElementById('welcomeHint');
        const actions = document.getElementById('quizActions');
        if (!home || !actions) return;

        home.classList.add('expanded');
        welcomeText.classList.add('hidden');
        welcomeHint.classList.add('hidden');
        actions.style.display = 'flex';
        this.showQuizActions = true;
    },

    // ============================================================
    // 底栏路由
    // ============================================================
    bindTabs() {
        const tabbar = document.getElementById('tabbar');
        if (!tabbar) return;
        tabbar.addEventListener('click', (e) => {
            const btn = e.target.closest('.tab-btn');
            if (!btn) return;
            if (tabbar.dataset.dragging === '1') return;
            const tab = btn.dataset.tab;
            if (tab === this.currentTab) return;
            this.switchTab(tab);
        });
    },

    switchTab(tab) {
        this.currentTab = tab;
        const idx = this.TABS.indexOf(tab);
        if (idx >= 0) this.setSlider(idx, true);

        document.querySelectorAll('.tab-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.tab === tab)
        );

        const home = document.getElementById('home');
        const app = document.getElementById('app');

        if (tab === 'home') {
            home.style.display = 'flex';
            app.style.display = 'none';
            this.renderHome();
            return;
        }

        home.style.display = 'none';
        app.style.display = 'block';
        app.className = 'page';

        if (tab === 'bank') this.renderBank();
        else if (tab === 'wrong') this.renderWrong();
        else if (tab === 'fav') this.renderFav();
        else if (tab === 'me') this.renderMe();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    setSlider(idx, animate = true) {
        const slider = document.getElementById('tabSlider');
        if (!slider) return;
        if (!animate) slider.style.transition = 'none';
        slider.style.transform = `translateX(${idx * 100}%)`;
        if (!animate) {
            void slider.offsetWidth;
            slider.style.transition = '';
        }
    },

    // ============================================================
    // 玻璃滑块长按拖拽
    // ============================================================
    bindDragSlider() {
        const tabbar = document.getElementById('tabbar');
        const slider = document.getElementById('tabSlider');
        if (!tabbar || !slider) return;

        let isDragging = false;
        let isPressing = false;
        let pressTimer = null;
        let startX = 0;
        let startY = 0;
        let currentIdx = 0;

        const onStart = (clientX, clientY) => {
            isPressing = true;
            startX = clientX;
            startY = clientY;
            currentIdx = this.TABS.indexOf(this.currentTab);
            if (currentIdx < 0) currentIdx = 0;

            pressTimer = setTimeout(() => {
                if (!isPressing) return;
                isDragging = true;
                tabbar.classList.add('dragging');
                tabbar.dataset.dragging = '1';
                if (this._vibrationEnabled && navigator.vibrate) navigator.vibrate(8);
            }, 200);
        };

        const onMove = (clientX, clientY) => {
            if (!isPressing) return;

            const dx = clientX - startX;
            const dy = clientY - startY;

            // 未激活拖拽
            if (!isDragging) {
                // 垂直移动：取消
                if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
                    isPressing = false;
                    clearTimeout(pressTimer);
                    return;
                }
                // 水平移动超过阈值：立即激活
                if (Math.abs(dx) > 8) {
                    isDragging = true;
                    clearTimeout(pressTimer);
                    tabbar.classList.add('dragging');
                    tabbar.dataset.dragging = '1';
                    if (this._vibrationEnabled && navigator.vibrate) navigator.vibrate(8);
                }
                return;
            }

            // 拖拽中
            const rect = tabbar.getBoundingClientRect();
            const padding = 6;
            const innerW = rect.width - padding * 2;
            const tabW = innerW / 5;
            let x = clientX - rect.left - padding;
            x = Math.max(0, Math.min(innerW - tabW, x));
            const tx = (x / tabW) * 100;

            slider.style.transition = 'none';
            slider.style.transform = `translateX(${tx}%)`;

            const nearest = Math.round(x / tabW);
            tabbar.querySelectorAll('.tab-btn').forEach((b, i) =>
                b.classList.toggle('active', i === nearest)
            );
        };

        const onEnd = () => {
            clearTimeout(pressTimer);

            if (isDragging) {
                const currentTransform = slider.style.transform;
                const match = currentTransform.match(/translateX\(([-\d.]+)%\)/);
                let nearest = currentIdx;
                if (match) nearest = Math.round(parseFloat(match[1]) / 100);
                nearest = Math.max(0, Math.min(4, nearest));

                slider.style.transition = '';
                this.setSlider(nearest, true);

                tabbar.classList.remove('dragging');
                tabbar.querySelectorAll('.tab-btn').forEach((b, i) =>
                    b.classList.toggle('active', i === nearest)
                );

                const targetTab = this.TABS[nearest];
                if (targetTab && targetTab !== this.currentTab) {
                    setTimeout(() => {
                        tabbar.dataset.dragging = '0';
                        this.switchTab(targetTab);
                    }, 50);
                } else {
                    setTimeout(() => { tabbar.dataset.dragging = '0'; }, 50);
                }
            } else {
                tabbar.dataset.dragging = '0';
            }

            isPressing = false;
            isDragging = false;
        };

        // 触摸事件
        tabbar.addEventListener('touchstart', (e) => {
            const t = e.touches[0];
            onStart(t.clientX, t.clientY);
        }, { passive: true });

        tabbar.addEventListener('touchmove', (e) => {
            const t = e.touches[0];
            if (isDragging) e.preventDefault();
            onMove(t.clientX, t.clientY);
        }, { passive: false });

        tabbar.addEventListener('touchend', onEnd);
        tabbar.addEventListener('touchcancel', onEnd);

        // 鼠标事件
        tabbar.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            onStart(e.clientX, e.clientY);
        });
        window.addEventListener('mousemove', (e) => {
            if (isPressing) onMove(e.clientX, e.clientY);
        });
        window.addEventListener('mouseup', () => {
            if (isPressing) onEnd();
        });
    },

    // ============================================================
    // 欢迎词
    // ============================================================
    loadWelcome() {
        const key = 'quiz_welcome_used';
        const today = new Date().toDateString();
        let data = {};
        try { data = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}
        if (data.date !== today) data = { date: today, used: [] };

        let pool = [];
        for (let i = 0; i < this.GREETINGS.length; i++) {
            if (!data.used.includes(i)) pool.push(i);
        }
        if (pool.length === 0) {
            data.used = [];
            pool = this.GREETINGS.map((_, i) => i);
        }
        const pick = pool[Math.floor(Math.random() * pool.length)];
        data.used.push(pick);
        this.welcomeText = this.GREETINGS[pick];
        localStorage.setItem(key, JSON.stringify(data));
    },

    renderHome() {
        const welcomeText = document.getElementById('welcomeText');
        const welcomeHint = document.getElementById('welcomeHint');
        const actions = document.getElementById('quizActions');
        const resumeWrap = document.getElementById('resumeHintWrap');
        const home = document.getElementById('home');

        if (welcomeText) welcomeText.textContent = this.welcomeText;

        if (this.showQuizActions) {
            if (home) home.classList.add('expanded');
            if (welcomeText) welcomeText.classList.add('hidden');
            if (welcomeHint) welcomeHint.classList.add('hidden');
            if (actions) actions.style.display = 'flex';
        } else {
            if (home) home.classList.remove('expanded');
            if (welcomeText) welcomeText.classList.remove('hidden');
            if (welcomeHint) welcomeHint.classList.remove('hidden');
            if (actions) actions.style.display = 'none';
        }

        // 恢复上次答题提示
        if (resumeWrap) {
            resumeWrap.innerHTML = '';
            const user = this.getCurrentUser();
            if (user) {
                const sessionData = localStorage.getItem(`quiz_session_${user}`);
                if (sessionData) {
                    try {
                        const ctx = JSON.parse(sessionData);
                        const total = (ctx.ids || []).length;
                        const idx = (ctx.idx || 0) + 1;
                        resumeWrap.innerHTML =
                            `<div class="resume-hint" onclick="event.stopPropagation();QuizApp.restoreSession()">继续上次答题（第 ${idx}/${total} 题）</div>`;
                    } catch (e) {}
                }
            }
        }
    },

    chooseMode(mode) {
        const user = this.checkLogin();
        if (!user) return;
        this.lastMode = mode;
        this._source = 'all';
        this._isRandom = (mode === 'random');
        this._isFavoritesMode = false;
        this.showQuantityModal(mode);
    },

    // ============================================================
    // 数量选择弹窗
    // ============================================================
    showQuantityModal(mode) {
        const modal = document.getElementById('quantityModal');
        if (!modal) return;
        const user = this.getCurrentUser();
        if (!user) { alert('请先登录'); return; }

        const titleMap = {
            'sequential': '选择刷题数量',
            'random': '选择随机数量',
            'wrong': '错题重练'
        };
        document.getElementById('modalTitle').textContent = titleMap[mode] || '选择数量';

        const fetchUrl = mode === 'wrong'
            ? `/api/wrong?user_id=${encodeURIComponent(user)}`
            : `/api/questions?user_id=${encodeURIComponent(user)}`;

        fetch(fetchUrl)
            .then(res => res.json())
            .then(data => {
                const questions = data.questions || data;
                const total = questions.length;
                document.getElementById('totalCount').textContent = total;

                if (total === 0) {
                    const msg = mode === 'wrong' ? '暂无错题，继续加油！' : '题库为空，请先添加题目！';
                    alert(msg);
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
        const inp = document.getElementById('customQuantity');
        if (inp) inp.value = '';
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
        const m = document.getElementById('quantityModal');
        if (m) m.style.display = 'none';
    },

    updatePreview(num, total, mode) {
        const preview = document.getElementById('modalPreview');
        if (!preview) return;
        let text = '';
        const modeLabel = mode === 'wrong' ? '错题' : '题库';

        if (num === -1 || num >= total) {
            text = `将加载全部 ${total} 道${modeLabel}`;
        } else {
            const user = this.getCurrentUser();
            if (mode === 'sequential') {
                const progress = this.getProgress(user);
                const start = progress.sequential_index || 0;
                const end = Math.min(start + num, total);
                const remaining = total - end;
                text = `顺序：第 ${start + 1} ~ ${end} 题（剩余 ${remaining} 题）`;
            } else if (mode === 'wrong') {
                text = `错题重练：${num} 道（共 ${total} 道错题）`;
            } else {
                text = `随机抽取 ${num} 道题（共 ${total} 题）`;
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

    // ============================================================
    // 核心：开始刷题
    // ============================================================
    async start(isRandom, limit = -1, source = 'all', selectedChapters = null) {
        const user = this.getCurrentUser();
        if (!user) { alert('请先登录！'); return; }

        try {
            this._source = source;
            this._isFinishing = false;
            this._isRandom = isRandom;
            this._currentLimit = limit;
            this._tempMulti = [];
            this._multiSubmitted = false;

            // 并行加载：收藏 + 题库
            const [favRes, qRes] = await Promise.all([
                fetch(`/api/favorites?user_id=${encodeURIComponent(user)}`)
                    .then(r => r.json()).catch(() => []),
                fetch(`/api/questions?user_id=${encodeURIComponent(user)}`)
                    .then(r => r.json())
            ]);

            this._favorites = (favRes || []).map(q => q.id);
            const allChapters = (qRes.chapters || [])
                .filter(ch => ch && ch.trim() !== '' && ch !== '其他');
            this._allChapters = allChapters;

            let bank = qRes.questions || qRes;

            if (!bank || bank.length === 0) {
                alert('当前没有题目');
                return;
            }

            // 错题模式
            if (source === 'wrong') {
                await this.loadWrongList();
                const unmastered = this._wrongList.filter(w => !w.mastered);
                if (unmastered.length === 0) {
                    this.showToast('所有错题已掌握');
                    return;
                }
                bank = unmastered.map(w => ({
                    id: w.id,
                    q: w.q,
                    opts: w.opts,
                    a: w.a,
                    chapter: w.chapter,
                    _isWrong: true,
                    _wrongId: w.id
                }));
                this._wrongIdMap = {};
                bank.forEach(item => {
                    this._wrongIdMap[item.id] = item._wrongId;
                });
            } else {
                this._wrongIdMap = {};
            }

            // 筛选题目
            let selectedBank = [];
            if (limit === -1 || limit >= bank.length) {
                selectedBank = bank;
            } else if (isRandom) {
                const recent = this.getRecentQuestions(user);
                const available = bank.filter(q => !recent.includes(q.id));
                let pool = available.length >= limit ? available : bank;
                selectedBank = [...pool].sort(() => Math.random() - 0.5).slice(0, limit);
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

            if (selectedBank.length === 0) {
                alert('没有符合条件的题目，请重试。');
                return;
            }

            this.activeBank = selectedBank;
            this.idx = 0;
            this.record = new Array(this.activeBank.length).fill(null);
            this._consecutiveCorrect = 0;
            this._consecutiveWrong = 0;
            this._sessionId = Date.now() + '_' + Math.random().toString(36).substr(2, 6);

            // 切换到答题界面
            document.getElementById('home').style.display = 'none';
            document.getElementById('app').style.display = 'block';
            document.getElementById('app').className = 'page';

            this.renderCard(false);
            this.saveSessionContext();

        } catch (err) {
            alert('加载题库失败：' + err.message);
            console.error(err);
        }
    },

    // ============================================================
    // 章节选择
    // ============================================================
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
                btn.classList.toggle('active',
                    !this._selectedChapters || this._selectedChapters.length === 0);
            } else {
                btn.classList.toggle('active',
                    this._selectedChapters && this._selectedChapters.includes(ch));
            }
        });
    },

    // ============================================================
    // 渲染答题卡片
    // ============================================================
    renderCard(needAnimation, direction = 'none') {
        const app = document.getElementById('app');
        if (!app) return;

        if (!this.activeBank || this.activeBank.length === 0) {
            app.innerHTML = `<div class="page-card empty-state">暂无题目</div>`;
            return;
        }

        const q = this.activeBank[this.idx];
        const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) =>
            v !== null && this.checkAnswer(this.activeBank[i], v)
        ).length;
        const acc = done ? Math.round(correct / done * 100) : 0;
        const total = this.activeBank.length;
        const remaining = total - done;
        const percent = total > 0 ? Math.round(done / total * 100) : 0;

        const isMulti = Array.isArray(q.a);
        const isJudge = !isMulti && q.opts.length === 2 &&
            ((q.opts[0].includes('正确') && q.opts[1].includes('错误')) ||
             (q.opts[0].includes('对') && q.opts[1].includes('错')));
        const typeLabel = isMulti ? '多选题' : (isJudge ? '判断题' : '单选题');

        let filterInfo = '';
        if (this._isChapterMode && this._selectedChapters.length > 0) {
            filterInfo = `筛选: ${this._selectedChapters.join(' + ')}`;
        }

        const isFav = this._favorites && this._favorites.includes(q.id);
        const starText = isFav ? '已收藏' : '收藏';

        const hasSelected = this.record[this.idx] !== null;
        const isCorrect = hasSelected && this.checkAnswer(q, this.record[this.idx]);

        const tempSelected = this._tempMulti || [];
        const isMultiSubmitted = this._multiSubmitted || false;
        const showSubmit = isMulti && !isMultiSubmitted && !hasSelected;

        const isFirst = this.idx === 0;
        const isLast = this.idx === this.activeBank.length - 1;

        // 选项渲染
        let optionsHtml = q.opts.map((o, oIdx) => {
            let cls = 'opt';
            if (isMulti) {
                if (tempSelected.includes(oIdx)) cls += ' selected';
                if (isMultiSubmitted || hasSelected) {
                    if (q.a.includes(oIdx)) cls += ' correct';
                    else if (tempSelected.includes(oIdx) && !q.a.includes(oIdx)) cls += ' wrong';
                }
                const onclick = (!isMultiSubmitted && !hasSelected)
                    ? `onclick="QuizApp.toggleMultiOption(${oIdx})"` : '';
                return `<div class="${cls}" ${onclick}>${o}</div>`;
            } else {
                if (hasSelected) {
                    if (oIdx === q.a) cls += ' correct';
                    else if (oIdx === this.record[this.idx]) cls += ' wrong';
                }
                const onclick = !hasSelected
                    ? `onclick="QuizApp.select(${oIdx})"` : '';
                return `<div class="${cls}" ${onclick}>${o}</div>`;
            }
        }).join('');

        // 正确答案提示
        let correctAnswerHtml = '';
        if (isMulti && (isMultiSubmitted || hasSelected)) {
            const correctText = q.a.map(idx => q.opts[idx]).join('、');
            correctAnswerHtml = `<div class="correct-note">正确答案：<strong>${correctText}</strong></div>`;
        }

        // 错题重练：标记已掌握
        let masterBtnHtml = '';
        if (this._source === 'wrong' && q._isWrong && hasSelected && isCorrect) {
            masterBtnHtml = `
                <div style="margin-top:14px; text-align:center;">
                    <button class="master-action-btn"
                            onclick="QuizApp.markMastered(${q._wrongId})">
                        标记为已掌握
                    </button>
                </div>
            `;
        }

        // 提交按钮
        let submitBtnHtml = '';
        if (showSubmit) {
            submitBtnHtml = `<button class="submit-btn"
                                     onclick="QuizApp.submitMultiChoice()">提交答案</button>`;
        }

        // 多选提示
        let multiHint = '';
        if (isMulti && !isMultiSubmitted && !hasSelected && tempSelected.length > 0) {
            multiHint = `<div class="multi-hint">已选 ${tempSelected.length} 个选项，点击提交确认</div>`;
        }

        // 状态提示
        let statusHtml = '';
        if (hasSelected || isMultiSubmitted) {
            if (isCorrect) {
                statusHtml = `<span class="ok">回答正确</span>`;
            } else {
                statusHtml = `<span class="no">再试一次</span>`;
            }
        }

        const htmlContent = `
            <div class="page-card">
                <div class="quiz-top">
                    <div class="quiz-info">
                        <span>正确率 ${acc}%</span>
                        <span>进度 ${done}/${total}</span>
                        ${remaining > 0 ? `<span>剩 ${remaining} 题</span>` : ''}
                        ${filterInfo ? `<span>${filterInfo}</span>` : ''}
                        ${statusHtml}
                    </div>
                    <div style="display:flex;gap:8px;align-items:center;">
                        <button class="glass-btn ghost"
                                style="width:auto;padding:7px 14px;font-size:13px;"
                                onclick="QuizApp.toggleFavorite(${q.id})">
                            ${starText}
                        </button>
                        <button class="glass-btn ghost"
                                style="width:auto;padding:7px 14px;font-size:13px;"
                                onclick="QuizApp.goHome()">
                            首页
                        </button>
                    </div>
                </div>
                <div class="type-tag">${typeLabel}</div>
                <div class="q-title">第 ${this.idx + 1} 题 · ${q.q}</div>
                ${optionsHtml}
                ${correctAnswerHtml}
                ${submitBtnHtml}
                ${multiHint}
                ${masterBtnHtml}
                <div style="display:flex;gap:12px;margin-top:18px;">
                    ${!isFirst
                        ? `<button class="glass-btn ghost"
                                   style="flex:1;padding:12px;font-size:14px;"
                                   onclick="QuizApp.prevQuestion()">上一题</button>`
                        : `<div style="flex:1;"></div>`}
                    ${!isLast
                        ? `<button class="glass-btn primary"
                                   style="flex:1;padding:12px;font-size:14px;"
                                   onclick="QuizApp.nextQuestion()">下一题</button>`
                        : `<div style="flex:1;"></div>`}
                </div>
                <button class="glass-btn ghost"
                        style="width:100%;margin-top:12px;padding:12px;font-size:14px;"
                        onclick="QuizApp.finishBatch()">
                    结束本次练习
                </button>
            </div>
        `;

        if (needAnimation) {
            app.style.animation = 'none';
            void app.offsetWidth;
            app.style.animation = 'pageIn 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        }
        app.innerHTML = htmlContent;
        this.saveSessionContext();
    },

    checkAnswer(q, val) {
        if (val === null || val === undefined) return false;
        if (Array.isArray(q.a)) {
            return Array.isArray(val) &&
                   val.length === q.a.length &&
                   val.every(x => q.a.includes(x));
        }
        return val === q.a;
    },

    // ============================================================
    // 多选/单选
    // ============================================================
    toggleMultiOption(oIdx) {
        const q = this.activeBank[this.idx];
        if (!Array.isArray(q.a)) return;
        if (this._multiSubmitted || this.record[this.idx] !== null) return;

        const i = this._tempMulti.indexOf(oIdx);
        if (i > -1) this._tempMulti.splice(i, 1);
        else this._tempMulti.push(oIdx);

        this.renderCard(false);
    },

    submitMultiChoice() {
        const q = this.activeBank[this.idx];
        if (!Array.isArray(q.a)) return;
        if (this._multiSubmitted || this.record[this.idx] !== null) return;

        const selected = this._tempMulti.slice();
        if (selected.length === 0) {
            this.showToast('请至少选择一个选项', 1500);
            return;
        }

        const isCorrect = selected.every(idx => q.a.includes(idx)) &&
                          q.a.every(idx => selected.includes(idx));

        this.record[this.idx] = selected;
        this._multiSubmitted = true;

        if (this._vibrationEnabled && navigator.vibrate) {
            if (isCorrect) navigator.vibrate(10);
            else navigator.vibrate([10, 50, 10]);
        }

        if (!isCorrect && this._source !== 'wrong') {
            const user = this.getCurrentUser();
            if (user) this.uploadWrongQuestion(user, q);
        }

        if (isCorrect) {
            this._consecutiveCorrect++;
            this._consecutiveWrong = 0;
            if (this._streakAlertEnabled && this._consecutiveCorrect === 5)
                this.showToast('连续答对 5 题！');
            if (this._streakAlertEnabled && this._consecutiveCorrect === 10)
                this.showToast('连续答对 10 题！');
        } else {
            this._consecutiveWrong++;
            this._consecutiveCorrect = 0;
            if (this._streakAlertEnabled && this._consecutiveWrong === 3)
                this.showToast('别灰心，再想想');
        }

        this.renderCard(false);

        const allDone = this.record.every(v => v !== null);
        if (allDone) {
            this._isFinishing = true;
            setTimeout(() => this.finishBatch(), 400);
        }
    },

    select(oIdx) {
        const q = this.activeBank[this.idx];
        if (Array.isArray(q.a)) return;
        if (this.record[this.idx] !== null) return;
        if (this._isFinishing) return;

        this.record[this.idx] = oIdx;
        const isCorrect = (oIdx === q.a);

        if (this._vibrationEnabled && navigator.vibrate) {
            if (isCorrect) navigator.vibrate(10);
            else navigator.vibrate([10, 50, 10]);
        }

        if (isCorrect) {
            this._consecutiveCorrect++;
            this._consecutiveWrong = 0;
            if (this._streakAlertEnabled && this._consecutiveCorrect === 5)
                this.showToast('连续答对 5 题！');
            if (this._streakAlertEnabled && this._consecutiveCorrect === 10)
                this.showToast('连续答对 10 题！');
        } else {
            this._consecutiveWrong++;
            this._consecutiveCorrect = 0;
            if (this._streakAlertEnabled && this._consecutiveWrong === 3)
                this.showToast('别灰心，再想想');
            if (this._source !== 'wrong') {
                const user = this.getCurrentUser();
                if (user) this.uploadWrongQuestion(user, q);
            }
        }

        this.renderCard(false);

        const allDone = this.record.every(v => v !== null);
        if (allDone) {
            this._isFinishing = true;
            setTimeout(() => this.finishBatch(), 400);
            return;
        }

        const delay = this._autoDelay || 200;
        clearTimeout(this._selectTimer);
        this._selectTimer = setTimeout(() => {
            if (this._isFinishing) return;
            if (this.record.every(v => v !== null)) {
                this._isFinishing = true;
                this.finishBatch();
                return;
            }
            if (this.idx + 1 < this.activeBank.length) {
                this.idx++;
                this._tempMulti = [];
                this._multiSubmitted = false;
                this.renderCard(true, 'right');
            } else {
                this._isFinishing = true;
                this.finishBatch();
            }
        }, delay);
    },

    prevQuestion() {
        if (this.idx > 0) {
            this.idx--;
            this._tempMulti = [];
            this._multiSubmitted = false;
            this.renderCard(true, 'left');
        }
    },

    nextQuestion() {
        if (this.idx < this.activeBank.length - 1) {
            this.idx++;
            this._tempMulti = [];
            this._multiSubmitted = false;
            this.renderCard(true, 'right');
        }
    },

    // ============================================================
    // 收藏
    // ============================================================
    async loadFavorites() {
        const user = this.getCurrentUser();
        if (!user) { this._favorites = []; return; }
        try {
            const res = await fetch(`/api/favorites?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            this._favorites = (data || []).map(q => q.id);
        } catch (e) {
            this._favorites = [];
        }
    },

    async toggleFavorite(questionId) {
        const user = this.getCurrentUser();
        if (!user) { alert('请先登录'); return; }

        const isFav = this._favorites.includes(questionId);
        const url = isFav ? '/api/favorites-remove' : '/api/favorites-add';

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user,
                    question_id: questionId
                })
            });
            const data = await res.json();

            if (data.ok !== false) {
                if (isFav) {
                    this._favorites = this._favorites.filter(id => id !== questionId);
                    this.showToast('已取消收藏', 1500);
                } else {
                    this._favorites.push(questionId);
                    this.showToast('已收藏', 1500);
                }
                this.renderCard(false);
            } else {
                alert('操作失败：' + (data.error || '未知错误'));
            }
        } catch (e) {
            alert('请求失败：' + e.message);
        }
    },

    // ============================================================
    // 完成批次
    // ============================================================
    finishBatch() {
        if (this._isFinishing && this.record.every(v => v === null)) return;
        this._isFinishing = true;

        const user = this.getCurrentUser();
        if (!user) return;

        const total = this.activeBank.length;
        let correctCount = 0;
        for (let i = 0; i < this.activeBank.length; i++) {
            if (this.record[i] === null) continue;
            if (this.checkAnswer(this.activeBank[i], this.record[i])) correctCount++;
        }
        const done = this.record.filter(v => v !== null).length;
        const acc = done > 0 ? Math.round(correctCount / done * 100) : 0;

        // 收藏模式
        if (this._isFavoritesMode) {
            const msg = `收藏刷题完成\n共 ${done} 题，正确率 ${acc}%`;
            if (confirm(msg + '\n\n点击「确定」返回收藏，点击「取消」返回首页')) {
                this._isFinishing = false;
                this.switchTab('fav');
            } else {
                this._isFinishing = false;
                this.goHome();
            }
            return;
        }

        // 顺序模式保存进度
        if (!this._isRandom && this._totalBank && this._source === 'all') {
            const newIndex = (this._pendingStart || 0) + this.activeBank.length;
            if (newIndex >= this._totalBank.length) {
                this.saveProgress(user, { sequential_index: 0 });
                this.showToast('已刷完所有题目');
            } else {
                this.saveProgress(user, { sequential_index: newIndex });
            }
        }

        // 保存最近做过的题目
        const recentIds = this.activeBank.map(q => q.id);
        this.saveRecentQuestions(user, recentIds);

        this.clearSessionContext();

        const modeLabel = this._source === 'wrong' ? '错题重练' : '刷题';
        const msg = `${modeLabel}完成\n共 ${done} 题，正确率 ${acc}%`;

        if (confirm(msg + '\n\n点击「确定」再来一组，点击「取消」返回首页')) {
            const limit = this._currentLimit || 20;
            const isRandom = this._isRandom || false;
            const source = this._source || 'all';
            this._isFinishing = false;
            this.start(isRandom, limit, source);
        } else {
            this._isFinishing = false;
            this.goHome();
        }
    },

    goHome() {
        this.clearSessionContext();
        this.showQuizActions = false;
        this.switchTab('home');

        const home = document.getElementById('home');
        const welcomeText = document.getElementById('welcomeText');
        const welcomeHint = document.getElementById('welcomeHint');
        const actions = document.getElementById('quizActions');

        if (home) home.classList.remove('expanded');
        if (welcomeText) welcomeText.classList.remove('hidden');
        if (welcomeHint) welcomeHint.classList.remove('hidden');
        if (actions) actions.style.display = 'none';
    },

    // ============================================================
    // 错题
    // ============================================================
    async loadWrongList() {
        const user = this.getCurrentUser();
        if (!user) { this._wrongList = []; return; }
        try {
            const res = await fetch(`/api/wrong?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            const raw = data || [];

            // 按 q 聚合
            const map = {};
            for (const w of raw) {
                const key = w.q || String(w.id);
                if (!map[key]) {
                    map[key] = {
                        id: w.id,
                        q: w.q,
                        opts: w.opts || [],
                        a: w.a,
                        answer: w.answer,
                        user_choice: w.user_choice,
                        chapter: w.chapter || '',
                        bank: w.bank || '',
                        wrongCount: 0,
                        lastWrongAt: null,
                        mastered: false
                    };
                }
                map[key].wrongCount++;
                const t = w.created_at || w.time || null;
                if (t && (!map[key].lastWrongAt || t > map[key].lastWrongAt))
                    map[key].lastWrongAt = t;
            }

            const list = Object.values(map);

            // 读取本地已掌握
            const mKey = `quiz_mastered_${user}`;
            let mastered = {};
            try {
                mastered = JSON.parse(localStorage.getItem(mKey) || '{}');
            } catch (e) {}
            list.forEach(w => {
                if (mastered[w.q]) w.mastered = true;
            });

            this._wrongList = list;
        } catch (e) {
            this._wrongList = [];
        }
    },

    async saveMastered(qText, val) {
        const user = this.getCurrentUser();
        if (!user) return;
        const mKey = `quiz_mastered_${user}`;
        let data = {};
        try { data = JSON.parse(localStorage.getItem(mKey) || '{}'); } catch (e) {}
        if (val) data[qText] = Date.now();
        else delete data[qText];
        localStorage.setItem(mKey, JSON.stringify(data));
    },

    async renderWrong() {
        const app = document.getElementById('app');
        const user = this.getCurrentUser();

        if (!user) {
            app.innerHTML = `<div class="page-card empty-state">请先在「我的」页面登录</div>`;
            return;
        }

        app.innerHTML = `<div class="page-card empty-state">加载中...</div>`;
        await this.loadWrongList();
        this._renderWrongUI();
    },

    _renderWrongUI() {
        const app = document.getElementById('app');
        const list = this._wrongList;
        const total = list.length;
        const mastered = list.filter(w => w.mastered).length;
        const filter = this._wrongFilter;

        let filtered = list;
        if (filter === 'unmastered') filtered = list.filter(w => !w.mastered);
        else if (filter === 'mastered') filtered = list.filter(w => w.mastered);

        // 排序：未掌握在前，错误次数多的在前
        filtered.sort((a, b) => {
            if (a.mastered !== b.mastered) return a.mastered ? 1 : -1;
            return (b.wrongCount || 0) - (a.wrongCount || 0);
        });

        let listHtml = '';
        if (filtered.length === 0) {
            const emptyText = filter === 'mastered'
                ? '还没有已掌握的题'
                : (filter === 'unmastered' ? '未掌握列表为空' : '错题本为空');
            listHtml = `<div class="empty-state">${emptyText}</div>`;
        } else {
            listHtml = filtered.map((w, i) => {
                const hard = (w.wrongCount || 0) >= 5;
                const badges = [];
                if (hard) badges.push(`<span class="badge hard">高难度</span>`);
                if (w.mastered) badges.push(`<span class="badge mastered">已掌握</span>`);

                const timeStr = this.relTime(w.lastWrongAt);

                return `
                    <div class="wrong-item">
                        <div class="wi-head">
                            <span class="wi-idx">第 ${w.id || (i + 1)} 题</span>
                            <span class="wi-badges">
                                ${badges.join('')}
                                <span>错误 ${w.wrongCount || 1} 次</span>
                            </span>
                        </div>
                        <div class="wi-q">${w.q}</div>
                        <div class="wi-meta">
                            ${w.bank ? `<span>${w.bank}</span>` : ''}
                            ${w.chapter ? `<span>${w.chapter}</span>` : ''}
                            ${timeStr ? `<span>${timeStr}</span>` : ''}
                        </div>
                        <div class="wi-actions">
                            <button class="master-toggle ${w.mastered ? 'on' : ''}"
                                    onclick="event.stopPropagation();QuizApp.toggleMastered('${this.escAttr(w.q)}', ${!w.mastered})">
                                ${w.mastered ? '取消掌握' : '标记掌握'}
                            </button>
                            <button class="start-practice-btn"
                                    onclick="QuizApp.startWrongPractice('${this.escAttr(w.q)}')">
                                开始练习
                            </button>
                            <button class="del-icon"
                                    onclick="QuizApp.deleteWrongItem(${w.id})">
                                删除
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        app.innerHTML = `
            <div class="page-card">
                <div class="bank-title" style="margin-bottom:8px;">我的错题</div>
                <div class="stats-head">
                    <span class="num">${total}<small>道</small></span>
                    <span class="num" style="color:#34c759">${mastered}<small>道已掌握</small></span>
                </div>
                <div class="status-tabs">
                    <button class="status-tab ${filter === 'all' ? 'active' : ''}"
                            onclick="QuizApp.setWrongFilter('all')">全部</button>
                    <button class="status-tab ${filter === 'unmastered' ? 'active' : ''}"
                            onclick="QuizApp.setWrongFilter('unmastered')">未掌握</button>
                    <button class="status-tab ${filter === 'mastered' ? 'active' : ''}"
                            onclick="QuizApp.setWrongFilter('mastered')">已掌握</button>
                </div>

                ${total > 0 ? `
                    <div class="practice-cards">
                        <button class="practice-card"
                                onclick="QuizApp.practiceWrong('all')">
                            <div>
                                <div class="pc-title">练习全部错题</div>
                                <div class="pc-sub">${total} 道</div>
                            </div>
                            <span class="pc-arrow">→</span>
                        </button>
                    </div>
                    <div class="practice-cards row2">
                        <button class="practice-card"
                                onclick="QuizApp.practiceWrong('unmastered')">
                            <div>
                                <div class="pc-title">未掌握练习</div>
                                <div class="pc-sub">${list.filter(w => !w.mastered).length} 道</div>
                            </div>
                        </button>
                        <button class="practice-card"
                                onclick="QuizApp.practiceWrong('random')">
                            <div>
                                <div class="pc-title">随机错题</div>
                                <div class="pc-sub">抽 10 道</div>
                            </div>
                        </button>
                    </div>
                ` : ''}

                ${listHtml}
            </div>
        `;
    },

    setWrongFilter(f) {
        this._wrongFilter = f;
        this._renderWrongUI();
    },

    relTime(t) {
        if (!t) return '';
        const d = new Date(t);
        if (isNaN(d.getTime())) return '';
        const diff = Date.now() - d.getTime();
        const day = 24 * 3600 * 1000;
        if (diff < day) return '今天';
        if (diff < 2 * day) return '昨天';
        if (diff < 7 * day) return Math.floor(diff / day) + ' 天前';
        return `${d.getMonth() + 1}月${d.getDate()}日`;
    },

    escAttr(s) {
        return String(s)
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"');
    },

    async toggleMastered(qText, val) {
        await this.saveMastered(qText, val);
        this.showToast(val ? '已标记为掌握' : '已取消掌握');
        await this.loadWrongList();
        this._renderWrongUI();
    },

    async deleteWrongItem(id) {
        if (!confirm('确定删除这条错题吗？')) return;
        try {
            await fetch('/api/wrong-delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: this.getCurrentUser(),
                    id: id
                })
            });
            this.showToast('已删除');
            await this.loadWrongList();
            this._renderWrongUI();
        } catch (e) {
            this.showToast('删除失败');
        }
    },

    async practiceWrong(mode) {
        const user = this.getCurrentUser();
        if (!user) return;

        await this.loadWrongList();
        let list = this._wrongList.slice();

        if (mode === 'unmastered') list = list.filter(w => !w.mastered);
        if (mode === 'random') list = list.sort(() => Math.random() - 0.5).slice(0, 10);

        if (list.length === 0) {
            this.showToast('没有可练习的错题');
            return;
        }

        this._source = 'wrong';
        this._isRandom = (mode === 'random');
        this._isFavoritesMode = false;
        this.activeBank = list.map(w => ({
            id: w.id,
            q: w.q,
            opts: w.opts,
            a: w.a,
            chapter: w.chapter,
            _isWrong: true,
            _wrongId: w.id
        }));
        this.idx = 0;
        this.record = new Array(this.activeBank.length).fill(null);
        this._multiSubmitted = false;
        this._tempMulti = [];
        this._isFinishing = false;

        document.getElementById('home').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('app').className = 'page';

        this.renderCard(false);
        this.showToast(`开始练习 ${this.activeBank.length} 道错题`);
    },

    async startWrongPractice(qText) {
        const w = this._wrongList.find(x => x.q === qText);
        if (!w) return;

        this._source = 'wrong';
        this._isRandom = false;
        this._isFavoritesMode = false;
        this.activeBank = [{
            id: w.id,
            q: w.q,
            opts: w.opts,
            a: w.a,
            chapter: w.chapter,
            _isWrong: true,
            _wrongId: w.id
        }];
        this.idx = 0;
        this.record = [null];
        this._multiSubmitted = false;
        this._tempMulti = [];
        this._isFinishing = false;

        document.getElementById('home').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('app').className = 'page';

        this.renderCard(false);
    },

    async markMastered(wrongId) {
        const cur = this.activeBank[this.idx];
        if (!cur) return;

        await this.saveMastered(cur.q, true);
        this.showToast('已掌握，本题移入已掌握');

        if (this.idx < this.activeBank.length - 1) {
            setTimeout(() => {
                this.idx++;
                this._tempMulti = [];
                this._multiSubmitted = false;
                this.renderCard(true, 'right');
            }, 400);
        } else {
            setTimeout(() => this.finishBatch(), 400);
        }
    },

    async uploadWrongQuestion(userId, q) {
        try {
            await fetch('/api/wrong-add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    q: q.q,
                    opts: q.opts,
                    a: q.a,
                    chapter: q.chapter || '',
                    user_choice: this.record[this.idx]
                })
            });
        } catch (e) {
            console.error(e);
        }
    },

    // ============================================================
    // 题库
    // ============================================================
    async renderBank() {
        const app = document.getElementById('app');
        const user = this.getCurrentUser();

        if (!user) {
            app.innerHTML = `<div class="page-card empty-state">请先在「我的」页面登录</div>`;
            return;
        }

        app.innerHTML = `<div class="page-card empty-state">加载中...</div>`;

        try {
            const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            const questions = data.questions || data || [];
            this._bankCache = questions;
            this._renderBankUI(questions, '');
        } catch (e) {
            app.innerHTML = `<div class="page-card empty-state">加载失败：${e.message}</div>`;
        }
    },

    _renderBankUI(questions, keyword = '') {
        const app = document.getElementById('app');
        let filtered = questions;

        if (keyword) {
            const k = keyword.toLowerCase();
            filtered = questions.filter(q =>
                q.q.toLowerCase().includes(k) ||
                (q.opts || []).some(o => o.toLowerCase().includes(k))
            );
        }

        const total = questions.length;
        let listHtml;

        if (total === 0) {
            listHtml = `<div class="empty-state">暂无题目，点击右上角「添加题目」导入</div>`;
        } else if (filtered.length === 0) {
            listHtml = `<div class="empty-state">没有匹配「${keyword}」的题目</div>`;
        } else {
            listHtml = filtered.map((q, i) => {
                const ans = Array.isArray(q.a)
                    ? q.a.map(x => q.opts[x]).join('、')
                    : (q.opts[q.a] || q.a);
                return `
                    <div class="q-item">
                        <div class="q-num">第 ${i + 1} 题</div>
                        <div class="q-text">${q.q}</div>
                        <div class="q-meta">
                            <span class="q-answer">答案 ${ans}</span>
                            ${q.chapter ? `<span class="q-chapter">${q.chapter}</span>` : ''}
                        </div>
                        <div class="q-actions">
                            <button class="edit-btn"
                                    onclick="QuizApp.editQuestion(${q.id})">编辑</button>
                            <button class="del-btn"
                                    onclick="QuizApp.deleteQuestion(${q.id})">删除</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        app.innerHTML = `
            <div class="page-card">
                <div class="bank-head">
                    <div>
                        <div class="bank-title">题库</div>
                        <div class="bank-count">共 ${total} 道${keyword ? ` · 筛选 ${filtered.length} 道` : ''}</div>
                    </div>
                    <button class="add-btn"
                            onclick="QuizApp.showAddQuestionModal()">
                        添加题目
                    </button>
                </div>
                ${total > 0 ? `
                    <input class="search-box" type="text"
                           placeholder="搜索题目..."
                           value="${keyword}"
                           oninput="QuizApp.onBankSearch(this.value)">
                ` : ''}
                ${listHtml}
            </div>
        `;
    },

    onBankSearch(v) {
        if (this._bankSearchTimer) clearTimeout(this._bankSearchTimer);
        this._bankSearchTimer = setTimeout(() => {
            this._renderBankUI(this._bankCache || [], v);
            const inp = document.querySelector('.search-box');
            if (inp) {
                inp.focus();
                inp.setSelectionRange(inp.value.length, inp.value.length);
            }
        }, 250);
    },

    // ============================================================
    // 添加题目弹窗
    // ============================================================
    showAddQuestionModal() {
        const modalRoot = document.getElementById('modalRoot');
        if (!modalRoot) {
            alert('页面容器缺失，请刷新重试');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'addQuestionModal';
        modal.innerHTML = `
            <div class="modal-card" style="max-width:500px;">
                <div class="modal-header">
                    <span class="modal-title">添加题目</span>
                    <button class="modal-close"
                            onclick="QuizApp.closeModal('addQuestionModal')">✕</button>
                </div>
                <div class="modal-hint">
                    粘贴 AI 生成的 JSON 代码，自动解析导入<br>
                    格式示例：<br>
                    <code>[{"q":"题目","opts":["A","B","C","D"],"a":0,"chapter":"第一章"}]</code><br>
                    多选：<code>"a":[0,2]</code> · 判断题：<code>"a":0</code>
                </div>
                <textarea class="modal-textarea" id="importCode"
                          placeholder='[{"q":"示例题目","opts":["A","B","C","D"],"a":0,"chapter":"第1章"}]'></textarea>
                <div class="modal-btns">
                    <button class="btn-cancel"
                            onclick="QuizApp.closeModal('addQuestionModal')">
                        取消
                    </button>
                    <button class="btn-primary"
                            onclick="QuizApp.doImport()">
                        导入
                    </button>
                </div>
            </div>
        `;
        modalRoot.appendChild(modal);

        setTimeout(() => {
            const ta = document.getElementById('importCode');
            if (ta) ta.focus();
        }, 100);
    },

    async doImport() {
        const user = this.getCurrentUser();
        if (!user) { alert('请先登录'); return; }

        const ta = document.getElementById('importCode');
        if (!ta) return;
        let code = ta.value.trim();
        if (!code) {
            this.showToast('请输入内容');
            return;
        }

        // 剥离 markdown 代码块标记
        code = code.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();

        let arr;
        try {
            arr = JSON.parse(code);
        } catch (e) {
            const m = code.match(/\[[\s\S]*\]/);
            if (m) {
                try {
                    arr = JSON.parse(m[0]);
                } catch (e2) {
                    alert('JSON 格式错误：' + e2.message);
                    return;
                }
            } else {
                alert('JSON 格式错误：' + e.message);
                return;
            }
        }

        if (!Array.isArray(arr)) { alert('必须是数组'); return; }
        if (arr.length === 0) { alert('数组为空'); return; }

        // 校验
        const errors = [];
        arr.forEach((item, i) => {
            if (!item.q) errors.push(`第 ${i + 1} 题缺少 q`);
            if (!Array.isArray(item.opts) || item.opts.length < 2)
                errors.push(`第 ${i + 1} 题 opts 必须为数组且至少 2 项`);
            if (item.a === undefined || item.a === null)
                errors.push(`第 ${i + 1} 题缺少 a`);
        });
        if (errors.length > 0) {
            alert('校验失败：\n' + errors.join('\n'));
            return;
        }

        this.showToast(`导入 ${arr.length} 道题...`);

        let ok = 0;
        let fail = 0;
        for (const item of arr) {
            try {
                const res = await fetch('/api/questions-add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: user,
                        q: item.q,
                        opts: item.opts,
                        a: item.a,
                        chapter: item.chapter || ''
                    })
                });
                const r = await res.json();
                if (r.ok !== false) ok++;
                else fail++;
            } catch (e) {
                fail++;
            }
        }

        this.closeModal('addQuestionModal');
        this.showToast(`成功导入 ${ok} 道${fail ? '，失败 ' + fail + ' 道' : ''}`);
        this.renderBank();
    },

    closeModal(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    },

    async deleteQuestion(id) {
        if (!confirm('确定删除这道题吗？')) return;
        const user = this.getCurrentUser();
        try {
            await fetch('/api/questions-delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user, id: id })
            });
            this.showToast('已删除');
            this.renderBank();
        } catch (e) {
            this.showToast('删除失败');
        }
    },

    async editQuestion(id) {
        const user = this.getCurrentUser();
        const all = this._bankCache || [];
        const q = all.find(x => x.id === id);
        if (!q) return;

        const newQ = prompt('编辑题目：', q.q);
        if (newQ === null) return;

        const newOptsRaw = prompt('编辑选项（逗号分隔）：', q.opts.join(', '));
        if (newOptsRaw === null) return;
        const newOpts = newOptsRaw.split(',').map(s => s.trim()).filter(Boolean);

        const newA = parseInt(prompt('正确答案序号（从 0 开始；多选用逗号如 0,2）：',
            Array.isArray(q.a) ? q.a.join(',') : q.a));
        if (isNaN(newA)) { this.showToast('序号无效'); return; }

        const newChapter = prompt('章节名称（留空则不修改）：', q.chapter || '');

        try {
            await fetch('/api/questions-update', {
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
            this.showToast('已更新');
            this.renderBank();
        } catch (e) {
            this.showToast('更新失败');
        }
    },

    // ============================================================
    // 收藏页
    // ============================================================
    async renderFav() {
        const app = document.getElementById('app');
        const user = this.getCurrentUser();

        if (!user) {
            app.innerHTML = `<div class="page-card empty-state">请先在「我的」页面登录</div>`;
            return;
        }

        app.innerHTML = `<div class="page-card empty-state">加载中...</div>`;

        try {
            const res = await fetch(`/api/favorites?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            const list = data || [];

            let listHtml;
            if (list.length === 0) {
                listHtml = `<div class="empty-state">暂无收藏题目，答题时点「收藏」即可添加</div>`;
            } else {
                listHtml = list.map((q, i) => {
                    const ans = Array.isArray(q.a)
                        ? q.a.map(x => q.opts[x]).join('、')
                        : (q.opts[q.a] || q.a);
                    return `
                        <div class="q-item">
                            <div class="q-num">第 ${i + 1} 题</div>
                            <div class="q-text">${q.q}</div>
                            <div class="q-meta">
                                <span class="q-answer">答案 ${ans}</span>
                                ${q.chapter ? `<span class="q-chapter">${q.chapter}</span>` : ''}
                            </div>
                            <div class="q-actions">
                                <button class="del-btn"
                                        onclick="QuizApp.removeFav(${q.id})">
                                    取消收藏
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            app.innerHTML = `
                <div class="page-card">
                    <div class="bank-head">
                        <div>
                            <div class="bank-title">收藏</div>
                            <div class="bank-count">共 ${list.length} 道</div>
                        </div>
                    </div>
                    ${listHtml}
                </div>
            `;
        } catch (e) {
            app.innerHTML = `<div class="page-card empty-state">加载失败</div>`;
        }
    },

    async removeFav(qid) {
        if (!confirm('取消收藏？')) return;
        const user = this.getCurrentUser();
        try {
            await fetch('/api/favorites-remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user,
                    question_id: qid
                })
            });
            this.showToast('已取消收藏');
            this.renderFav();
        } catch (e) {
            this.showToast('操作失败');
        }
    },

    // ============================================================
    // 我的页
    // ============================================================
    async renderMe() {
        const app = document.getElementById('app');
        const user = this.getCurrentUser();

        let totalQ = 0;
        let wrongN = 0;
        let favN = 0;
        let masteredN = 0;

        if (user) {
            try {
                const [rq, rw, rf] = await Promise.all([
                    fetch(`/api/questions?user_id=${encodeURIComponent(user)}`).then(r => r.json()),
                    fetch(`/api/wrong?user_id=${encodeURIComponent(user)}`).then(r => r.json()),
                    fetch(`/api/favorites?user_id=${encodeURIComponent(user)}`).then(r => r.json())
                ]);
                totalQ = (rq.questions || rq || []).length;
                const wrongList = rw || [];
                wrongN = wrongList.length;
                favN = (rf || []).length;

                const mKey = `quiz_mastered_${user}`;
                let mastered = {};
                try {
                    mastered = JSON.parse(localStorage.getItem(mKey) || '{}');
                } catch (e) {}
                masteredN = wrongList.filter(w => mastered[w.q]).length;
            } catch (e) {}
        }

        const theme = localStorage.getItem('quiz_theme') || 'light';
        const s = this._settingsCache || (this._settingsCache = this.loadSettings());
        const initial = user ? user.charAt(0).toUpperCase() : '?';

        app.innerHTML = `
            <div class="page-card">
                <div class="profile-header">
                    <div class="avatar">${user ? initial : ''}</div>
                    <div class="user-name">${user || '未登录'}</div>
                    <div class="user-sub">${user ? '已登录' : '登录后可同步数据'}</div>
                    ${user ? `
                        <div class="stats-grid">
                            <div class="stat-box">
                                <div class="sv">${totalQ}</div>
                                <div class="sl">题库</div>
                            </div>
                            <div class="stat-box">
                                <div class="sv">${wrongN}</div>
                                <div class="sl">错题</div>
                            </div>
                            <div class="stat-box">
                                <div class="sv">${masteredN}</div>
                                <div class="sl">已掌握</div>
                            </div>
                            <div class="stat-box">
                                <div class="sv">${favN}</div>
                                <div class="sl">收藏</div>
                            </div>
                        </div>
                    ` : `
                        <button class="glass-btn primary"
                                style="margin-top:20px;"
                                onclick="QuizApp.loginNow()">
                            登录账号
                        </button>
                    `}
                </div>

                ${user ? `
                <div>
                    <div class="setting-row">
                        <span class="setting-label">主题</span>
                        <div class="theme-btns">
                            <button class="theme-btn ${theme === 'light' ? 'active' : ''}"
                                    onclick="QuizApp.setTheme('light')">明亮</button>
                            <button class="theme-btn ${theme === 'dark' ? 'active' : ''}"
                                    onclick="QuizApp.setTheme('dark')">夜间</button>
                            <button class="theme-btn ${theme === 'eye' ? 'active' : ''}"
                                    onclick="QuizApp.setTheme('eye')">护眼</button>
                        </div>
                    </div>
                    <div class="setting-row">
                        <span class="setting-label">震动反馈</span>
                        <label class="toggle-switch">
                            <input type="checkbox"
                                   ${s.vibration ? 'checked' : ''}
                                   onchange="QuizApp.setVibration(this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="setting-row">
                        <span class="setting-label">自动跳转延迟</span>
                        <select onchange="QuizApp.setAutoDelay(parseInt(this.value))">
                            ${[200, 400, 600, 800, 1000].map(v =>
                                `<option value="${v}" ${s.autoDelay === v ? 'selected' : ''}>${v}ms</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="setting-row">
                        <span class="setting-label">连续答对提示</span>
                        <label class="toggle-switch">
                            <input type="checkbox"
                                   ${s.streakAlert ? 'checked' : ''}
                                   onchange="QuizApp.setStreakAlert(this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                <button class="logout-btn"
                        onclick="QuizApp.logout()">
                    退出账号
                </button>
                ` : ''}
            </div>
        `;
    },

    // ============================================================
    // 设置
    // ============================================================
    loadSettings() {
        const s = {
            theme: 'light',
            vibration: true,
            autoDelay: 200,
            streakAlert: true
        };
        try {
            const saved = JSON.parse(localStorage.getItem('quiz_settings') || '{}');
            Object.assign(s, saved);
        } catch (e) {}

        this._vibrationEnabled = s.vibration;
        this._autoDelay = s.autoDelay;
        this._streakAlertEnabled = s.streakAlert;
        return s;
    },

    saveSettings() {
        const s = this._settingsCache || {};
        localStorage.setItem('quiz_settings', JSON.stringify(s));
    },

    loadTheme() {
        const t = localStorage.getItem('quiz_theme') || 'light';
        document.body.classList.remove('theme-dark', 'theme-eye');
        if (t === 'dark') document.body.classList.add('theme-dark');
        else if (t === 'eye') document.body.classList.add('theme-eye');
    },

    setTheme(t) {
        localStorage.setItem('quiz_theme', t);
        this.loadTheme();
        if (this.currentTab === 'me') this.renderMe();
    },

    setVibration(v) {
        this._settingsCache = this._settingsCache || {};
        this._settingsCache.vibration = v;
        this._vibrationEnabled = v;
        this.saveSettings();
        this.showToast(v ? '震动已开启' : '震动已关闭');
    },

    setAutoDelay(v) {
        this._settingsCache = this._settingsCache || {};
        this._settingsCache.autoDelay = v;
        this._autoDelay = v;
        this.saveSettings();
        this.showToast(`延迟已设为 ${v}ms`);
    },

    setStreakAlert(v) {
        this._settingsCache = this._settingsCache || {};
        this._settingsCache.streakAlert = v;
        this._streakAlertEnabled = v;
        this.saveSettings();
        this.showToast(v ? '连续提示已开启' : '连续提示已关闭');
    },

    // ============================================================
    // 进度/会话
    // ============================================================
    getProgress(user) {
        try {
            return JSON.parse(localStorage.getItem(`quiz_progress_${user}`) ||
                '{"sequential_index":0}');
        } catch (e) {
            return { sequential_index: 0 };
        }
    },

    saveProgress(user, data) {
        const cur = this.getProgress(user);
        localStorage.setItem(`quiz_progress_${user}`,
            JSON.stringify({ ...cur, ...data }));
    },

    getRecentQuestions(user) {
        try {
            return JSON.parse(localStorage.getItem(`quiz_recent_${user}`) || '[]');
        } catch (e) {
            return [];
        }
    },

    saveRecentQuestions(user, ids) {
        let recent = this.getRecentQuestions(user);
        recent = [...new Set([...ids, ...recent])];
        if (recent.length > 100) recent = recent.slice(0, 100);
        localStorage.setItem(`quiz_recent_${user}`, JSON.stringify(recent));
    },

    saveSessionContext() {
        if (this._isRestoring) return;
        if (!this.activeBank.length) return;
        const user = this.getCurrentUser();
        if (!user) return;

        const ctx = {
            ids: this.activeBank.map(q => q.id),
            records: this.record.slice(),
            idx: this.idx,
            isRandom: this._isRandom,
            limit: this._currentLimit,
            source: this._source,
            timestamp: Date.now()
        };
        localStorage.setItem(`quiz_session_${user}`, JSON.stringify(ctx));
    },

    clearSessionContext() {
        const user = this.getCurrentUser();
        if (!user) return;
        localStorage.removeItem(`quiz_session_${user}`);
    },

    async restoreSession() {
        const user = this.getCurrentUser();
        if (!user) return;

        const raw = localStorage.getItem(`quiz_session_${user}`);
        if (!raw) return;

        let ctx;
        try { ctx = JSON.parse(raw); } catch (e) { return; }

        if (Date.now() - ctx.timestamp > 24 * 3600 * 1000) {
            localStorage.removeItem(`quiz_session_${user}`);
            return;
        }

        try {
            const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            const bank = data.questions || data;
            const idMap = {};
            bank.forEach(q => idMap[q.id] = q);

            const active = ctx.ids.map(id => idMap[id]).filter(Boolean);
            if (active.length === 0) return;

            this.activeBank = active;
            this.record = ctx.records.slice(0, active.length);
            this.idx = Math.min(ctx.idx, active.length - 1);
            this._isRandom = ctx.isRandom;
            this._currentLimit = ctx.limit;
            this._source = ctx.source;
            this._isRestoring = true;

            document.getElementById('home').style.display = 'none';
            document.getElementById('app').style.display = 'block';
            document.getElementById('app').className = 'page';

            this.renderCard(false);
            this._isRestoring = false;

            this.showToast(`已恢复（第 ${this.idx + 1}/${active.length} 题）`);
        } catch (e) {
            console.error(e);
        }
    },

    // ============================================================
    // 智能提示
    // ============================================================
    async checkSmartPrompts() {
        const user = this.getCurrentUser();
        if (!user) return;

        const hasUsed = localStorage.getItem('quiz_has_used');
        if (!hasUsed) {
            setTimeout(() => {
                this.showToast('点击屏幕中央开始刷题', 4000);
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
                        this.showToast(`您有 ${wrongData.length} 道错题，试试错题重练`, 4000);
                        localStorage.setItem('quiz_wrong_prompt_dismissed', '1');
                    }, 2000);
                }
            }
        } catch (e) {}
    },

    // ============================================================
    // Toast
    // ============================================================
    showToast(message, duration = 2000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const item = document.createElement('div');
        item.className = 'toast-item';
        item.textContent = message;
        container.appendChild(item);

        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transition = 'opacity 0.3s';
            setTimeout(() => item.remove(), 300);
        }, duration);

        while (container.children.length > 3) {
            container.firstChild.remove();
        }
    },

    // ============================================================
    // 快捷键
    // ============================================================
    bindKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            const k = e.key.toLowerCase();

            // 首页快捷键
            const app = document.getElementById('app');
            if (this.currentTab === 'home' && app && app.style.display === 'none') {
                if (k === 's') { e.preventDefault(); this.chooseMode('sequential'); }
                if (k === 'r') { e.preventDefault(); this.chooseMode('random'); }
                if (k === 'w') { e.preventDefault(); this.switchTab('wrong'); }
                if (k === 'm') { e.preventDefault(); this.switchTab('bank'); }
                if (k === 'h') { e.preventDefault(); this.goHome(); }
                if (k === 't') {
                    e.preventDefault();
                    const themes = ['light', 'dark', 'eye'];
                    const cur = localStorage.getItem('quiz_theme') || 'light';
                    const i = themes.indexOf(cur);
                    this.setTheme(themes[(i + 1) % themes.length]);
                }
                if (k === 'f') {
                    e.preventDefault();
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen?.();
                    } else {
                        document.exitFullscreen?.();
                    }
                }
                if (e.key === '?') { e.preventDefault(); this.openShortcutHelp(); }
                return;
            }

            // 答题快捷键
            const num = parseInt(e.key);
            if (num >= 1 && num <= 4) {
                const opts = document.querySelectorAll('.opt:not(.correct):not(.wrong):not(.selected)');
                if (opts[num - 1]) opts[num - 1].click();
            }
            if (e.key === 'ArrowLeft') this.prevQuestion();
            if (e.key === 'ArrowRight') this.nextQuestion();
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay').forEach(m => {
                    if (m.id === 'quantityModal' || m.id === 'shortcutHelp') {
                        m.style.display = 'none';
                    } else {
                        m.remove();
                    }
                });
                this.closeQuantityModal();
                this.closeShortcutHelp();
            }
            if (e.key === '?') { e.preventDefault(); this.openShortcutHelp(); }
        });
    },

    openShortcutHelp() {
        const el = document.getElementById('shortcutHelp');
        if (el) el.style.display = 'flex';
    },

    closeShortcutHelp() {
        const el = document.getElementById('shortcutHelp');
        if (el) el.style.display = 'none';
    },

    // ============================================================
    // 兼容旧接口（备用）
    // ============================================================
    applyCustomBg(color) {
        document.body.style.background = color;
        this.showToast('背景色已更新');
    },

    applyCustomBgFromSettings(color) {
        this.applyCustomBg(color);
    },

    uploadBgImage() {
        const el = document.getElementById('bgImageInput');
        if (el) el.click();
    },

    handleBgImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            document.body.style.backgroundImage = `url(${ev.target.result})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            localStorage.setItem('quiz_bg_image', ev.target.result);
            this.showToast('背景已更新');
        };
        reader.readAsDataURL(file);
        event.target.value = '';
    },

    updateBgOpacity(v) {
        const el = document.getElementById('opacityValue');
        if (el) el.textContent = v + '%';
    },

    updateBgBlur(v) {
        const el = document.getElementById('blurValue');
        if (el) el.textContent = v + 'px';
    },

    dismissTooltip() {
        const el = document.getElementById('tooltipBubble');
        if (el) el.style.display = 'none';
    },

    setThemeFromSettings(t) {
        this.setTheme(t);
    },

    toggleSettings(force) {
        // 兼容旧接口，新版设置已整合到「我的」
    },

    checkLoginBeforeGo(targetUrl) {
        const user = this.getCurrentUser();
        if (!user) { alert('请先登录'); return false; }
        window.location.href = targetUrl;
        return false;
    }
};

// ============================================================
// 启动
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
    QuizApp.init();
});
