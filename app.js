// ============================================================
// QuizApp 13.0 · 终极完整版（多学科 + 笔记 + 全功能）
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

    _inQuiz: false,

    _allChapters: [],
    _selectedChapters: [],
    _isChapterMode: false,
    _currentLimit: -1,
    _isRandom: false,

    _bankSubjects: [],
    _currentBank: '全部',

    _favorites: [],
    _isFavoritesMode: false,

    _tempMulti: [],
    _multiSubmitted: false,

    _selectTimer: null,
    _pendingStart: 0,
    _pendingLimit: 0,
    _totalBank: [],
    _wrongIdMap: {},
    _wrongList: [],
    _wrongFilter: 'all',
    _wrongSubjectFilter: 'all',
    _wrongSearch: '',
    _wrongSearchTimer: null,
    _wrongEditMode: false,
    _wrongSelected: [],
    
    _favSubjectFilter: 'all',
    _favSearch: '',
    _favSearchTimer: null,
    _favEditMode: false,
    _favSelected: [],
    
    _bankCache: [],
    _bankSearchTimer: null,
    _bankSubjectFilter: 'all',
    _bankChapterFilter: 'all',
    _bankEditMode: false,
    _bankSelected: [],

    _cache: {
        bank: null, bankTime: 0,
        wrong: null, wrongTime: 0,
        fav: null, favTime: 0
    },
    CACHE_TTL: 5 * 60 * 1000,

    currentTab: 'home',
    TABS: ['home', 'bank', 'wrong', 'fav', 'me'],
    welcomeText: '',
    showQuizActions: false,

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
    // 通用弹窗 & 骨架屏
    // ============================================================
    showConfirm({ title = '确认', message = '', confirmText = '确定', cancelText = '取消', danger = false } = {}) {
        return new Promise((resolve) => {
            const modalRoot = document.getElementById('modalRoot');
            if (!modalRoot) { resolve(false); return; }
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-card confirm-card" style="max-width:380px;">
                    <div class="confirm-title">${title}</div>
                    ${message ? `<div class="confirm-message">${message}</div>` : ''}
                    <div class="confirm-btns">
                        <button class="confirm-btn cancel" data-action="cancel">${cancelText}</button>
                        <button class="confirm-btn ${danger ? 'danger' : 'primary'}" data-action="ok">${confirmText}</button>
                    </div>
                </div>
            `;
            modalRoot.appendChild(modal);
            const close = (result) => {
                modal.style.animation = 'confirmOut 0.2s forwards';
                setTimeout(() => modal.remove(), 200);
                resolve(result);
            };
            modal.querySelector('[data-action="cancel"]').onclick = () => close(false);
            modal.querySelector('[data-action="ok"]').onclick = () => close(true);
            modal.addEventListener('click', (e) => { if (e.target === modal) close(false); });
        });
    },

    showResultModal({ title = '本次完成', correct = 0, wrong = 0, total = 0, acc = 0 } = {}) {
        return new Promise((resolve) => {
            const modalRoot = document.getElementById('modalRoot');
            if (!modalRoot) { resolve('home'); return; }
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-card result-card" style="max-width:400px;">
                    <div class="result-title">${title}</div>
                    <div class="result-acc">
                        <div class="result-acc-num" data-target="${acc}">0<span>%</span></div>
                        <div class="result-acc-label">正确率</div>
                    </div>
                    <div class="result-stats">
                        <div class="result-stat"><div class="result-stat-num correct">${correct}</div><div class="result-stat-label">正确</div></div>
                        <div class="result-stat"><div class="result-stat-num wrong">${wrong}</div><div class="result-stat-label">错误</div></div>
                        <div class="result-stat"><div class="result-stat-num total">${total}</div><div class="result-stat-label">总题数</div></div>
                    </div>
                    <div class="result-btns">
                        <button class="result-btn home" data-action="home">返回首页</button>
                        <button class="result-btn retry" data-action="retry">再来一组</button>
                    </div>
                </div>
            `;
            modalRoot.appendChild(modal);
            const accEl = modal.querySelector('.result-acc-num');
            const startTime = performance.now();
            const animate = (now) => {
                const progress = Math.min((now - startTime) / 600, 1);
                accEl.innerHTML = `${Math.round(acc * (1 - Math.pow(1 - progress, 3)))}<span>%</span>`;
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            const close = (action) => {
                modal.style.animation = 'confirmOut 0.2s forwards';
                setTimeout(() => modal.remove(), 200);
                resolve(action);
            };
            modal.querySelector('[data-action="home"]').onclick = () => close('home');
            modal.querySelector('[data-action="retry"]').onclick = () => close('retry');
        });
    },

    skeletonHTML(type = 'default') {
        const item = `<div class="skeleton-item"><div class="skeleton skeleton-line-sm"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line-md"></div></div>`;
        if (type === 'bank') return `<div class="page-card"><div class="skeleton-head"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-btn"></div></div><div class="skeleton skeleton-search"></div>${item.repeat(4)}</div>`;
        if (type === 'wrong') return `<div class="page-card"><div class="skeleton-head"><div class="skeleton skeleton-title"></div></div><div class="skeleton skeleton-stats"></div><div class="skeleton skeleton-tabs"></div>${item.repeat(3)}</div>`;
        if (type === 'fav') return `<div class="page-card"><div class="skeleton-head"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-btn"></div></div>${item.repeat(3)}</div>`;
        return `<div class="page-card">${item.repeat(3)}</div>`;
    },

    // ============================================================
    // 缓存与数据请求
    // ============================================================
    invalidateCache(key) {
        if (key) {
            this._cache[key] = null;
            this._cache[key + 'Time'] = 0;
        } else {
            this._cache = { bank: null, bankTime: 0, wrong: null, wrongTime: 0, fav: null, favTime: 0 };
        }
    },

    async fetchBank(force = false) {
        const user = this.getCurrentUser();
        if (!user) return [];
        const now = Date.now();
        if (!force && this._cache.bank && now - this._cache.bankTime < this.CACHE_TTL) {
            return this._cache.bank;
        }
        try {
            const res = await fetch(`/api/questions?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            const list = data.questions || data || [];
            this._cache.bank = list;
            this._cache.bankTime = now;
            return list;
        } catch (e) { return this._cache.bank || []; }
    },

    async fetchWrong(force = false) {
        const user = this.getCurrentUser();
        if (!user) return [];
        const now = Date.now();
        if (!force && this._cache.wrong && now - this._cache.wrongTime < this.CACHE_TTL) {
            return this._cache.wrong;
        }
        try {
            const res = await fetch(`/api/wrong?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            const list = data || [];
            this._cache.wrong = list;
            this._cache.wrongTime = now;
            return list;
        } catch (e) { return this._cache.wrong || []; }
    },

    async fetchFav(force = false) {
        const user = this.getCurrentUser();
        if (!user) return [];
        const now = Date.now();
        if (!force && this._cache.fav && now - this._cache.favTime < this.CACHE_TTL) {
            return this._cache.fav;
        }
        try {
            const res = await fetch(`/api/favorites?user_id=${encodeURIComponent(user)}`);
            const data = await res.json();
            const list = data || [];
            this._cache.fav = list;
            this._cache.favTime = now;
            return list;
        } catch (e) { return this._cache.fav || []; }
    },

    // ============================================================
    // 笔记功能
    // ============================================================
    getNotes() {
        const user = this.getCurrentUser();
        if (!user) return {};
        try { return JSON.parse(localStorage.getItem(`quiz_notes_${user}`) || '{}'); } catch (e) { return {}; }
    },
    saveNotes(notes) {
        const user = this.getCurrentUser();
        if (user) localStorage.setItem(`quiz_notes_${user}`, JSON.stringify(notes));
    },
    getNote(qText) { return this.getNotes()[qText] || null; },
    hasNote(qText) { return !!this.getNote(qText); },

    openNoteModal(qText) {
        const modalRoot = document.getElementById('modalRoot');
        if (!modalRoot) return;
        if (!this.getCurrentUser()) { this.showToast('请先登录'); return; }
        const note = this.getNote(qText);
        const noteText = note ? note.text : '';
        const updatedAt = note && note.updatedAt ? new Date(note.updatedAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'noteModal';
        modal.innerHTML = `
            <div class="modal-card note-card" style="max-width:480px;">
                <div class="modal-header"><span class="modal-title">题目笔记</span><button class="modal-close" onclick="QuizApp.closeModal('noteModal')">✕</button></div>
                <div class="note-question">${this.escapeHtml(qText)}</div>
                <textarea class="note-textarea" id="noteTextarea" placeholder="在这里写下你的理解、易错点...">${noteText}</textarea>
                <div class="note-meta"><span>${updatedAt ? `上次编辑：${updatedAt}` : '还没有笔记'}</span><span class="note-count" id="noteCount">${noteText.length} 字</span></div>
                <div class="note-btns">
                    ${note ? `<button class="note-btn delete" onclick="QuizApp.doDeleteNote('${this.escAttr(qText)}')">删除笔记</button>` : ''}
                    <button class="note-btn cancel" onclick="QuizApp.closeModal('noteModal')">取消</button>
                    <button class="note-btn save" onclick="QuizApp.doSaveNote('${this.escAttr(qText)}')">保存</button>
                </div>
            </div>
        `;
        modalRoot.appendChild(modal);
        setTimeout(() => {
            const ta = document.getElementById('noteTextarea');
            if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
            const counter = document.getElementById('noteCount');
            if (ta && counter) ta.addEventListener('input', () => { counter.textContent = ta.value.length + ' 字'; });
        }, 100);
    },

    async doSaveNote(qText) {
        const ta = document.getElementById('noteTextarea');
        if (!ta) return;
        const text = ta.value.trim();
        const notes = this.getNotes();
        if (!text) { delete notes[qText]; this.showToast('笔记已删除'); }
        else { notes[qText] = { text: text, updatedAt: Date.now() }; this.showToast('笔记已保存'); }
        this.saveNotes(notes);
        this.closeModal('noteModal');
        this.refreshCurrentView();
    },

    async doDeleteNote(qText) {
        const ok = await this.showConfirm({ title: '删除笔记', message: '确定要删除这道题的笔记吗？', confirmText: '删除', cancelText: '取消', danger: true });
        if (!ok) return;
        const notes = this.getNotes(); delete notes[qText]; this.saveNotes(notes);
        this.closeModal('noteModal'); this.showToast('笔记已删除'); this.refreshCurrentView();
    },

    refreshCurrentView() {
        if (this._inQuiz && this.activeBank.length > 0) this.renderCard(false);
        else if (this.currentTab === 'bank') this._renderBankUI(this._bankCache || [], '');
        else if (this.currentTab === 'wrong') this._renderWrongUI();
        else if (this.currentTab === 'fav') this._renderFavUI(this._cache.fav || []);
    },

    escapeHtml(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },

    // ============================================================
    // 用户与震动
    // ============================================================
    isVibrationSupported() { return typeof navigator !== 'undefined' && 'vibrate' in navigator; },
    vibrate(pattern) { if (this._vibrationEnabled && this.isVibrationSupported()) try { navigator.vibrate(pattern); } catch (e) {} },
    getCurrentUser() { return localStorage.getItem('quiz_user_id'); },
    checkLogin() {
        return new Promise((resolve) => {
            let user = this.getCurrentUser();
            if (user) { resolve(user); return; }

            const modalRoot = document.getElementById('modalRoot');
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-card" style="max-width:380px;">
                    <div class="modal-title">登录 / 注册</div>
                    <input type="text" id="loginUser" class="search-box" placeholder="请输入用户名" style="width:100%;margin-bottom:12px;">
                    <div id="loginPwdWrap" style="display:none;">
                        <input type="password" id="loginPwd" class="search-box" placeholder="请输入密码" style="width:100%;margin-bottom:12px;">
                    </div>
                    <div class="modal-btns">
                        <button class="btn-cancel" onclick="this.closest('.modal-overlay').remove(); QuizApp._loginResolve(null);">取消</button>
                        <button class="btn-primary" id="loginBtn" onclick="QuizApp._doLogin()">下一步</button>
                    </div>
                </div>
            `;
            modalRoot.appendChild(modal);
            this._loginResolve = resolve;
            setTimeout(() => document.getElementById('loginUser').focus(), 100);
        });
    },

    async _doLogin() {
        const userInp = document.getElementById('loginUser').value.trim();
        if (!userInp) return this.showToast('请输入用户名');
        
        const pwdWrap = document.getElementById('loginPwdWrap');
        const pwdInp = document.getElementById('loginPwd');
        const btn = document.getElementById('loginBtn');

        if (pwdWrap.style.display === 'none') {
            btn.textContent = '检查中...';
            const res = await fetch('/api/auth', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'check', username: userInp })
            }).then(r => r.json());

            if (!res.ok) { this.showToast(res.error); btn.textContent = '下一步'; return; }

            if (res.hasPassword) {
                pwdWrap.style.display = 'block';
                btn.textContent = '登录';
                pwdInp.focus();
            } else {
                this.showToast('首次登录，请设置密码');
                this.showSetPasswordModal(userInp).then(success => {
                    if (success) {
                        localStorage.setItem('quiz_user_id', userInp);
                        this.updateUserUI(); this.invalidateCache(); this.showToast('设置成功，已登录');
                        this.renderMe(); this._loginResolve(userInp);
                    }
                });
            }
        } else {
            btn.textContent = '登录中...';
            const res = await fetch('/api/auth', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', username: userInp, password: pwdInp.value })
            }).then(r => r.json());

            if (res.ok) {
                localStorage.setItem('quiz_user_id', userInp);
                this.updateUserUI(); this.invalidateCache(); this.showToast('登录成功');
                document.querySelector('.modal-overlay').remove();
                this.renderMe(); this._loginResolve(userInp);
            } else {
                this.showToast(res.error); btn.textContent = '登录';
            }
        }
    },

    showSetPasswordModal(username) {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-card" style="max-width:380px;">
                    <div class="modal-title">设置密码</div>
                    <div style="font-size:13px;color:#86868b;margin-bottom:12px;">账户：${username}</div>
                    <input type="password" id="newPwd" class="search-box" placeholder="设置密码（至少4位）" style="width:100%;margin-bottom:12px;">
                    <input type="password" id="newPwd2" class="search-box" placeholder="确认密码" style="width:100%;margin-bottom:16px;">
                    <div class="modal-btns">
                        <button class="btn-primary" id="setPwdBtn" onclick="QuizApp._doSetPwd('${username}', ${resolve})">确定</button>
                    </div>
                </div>
            `;
            document.getElementById('modalRoot').appendChild(modal);
        });
    },

    async _doSetPwd(username, resolveCallback) {
        const p1 = document.getElementById('newPwd').value;
        const p2 = document.getElementById('newPwd2').value;
        if (p1.length < 4) return this.showToast('密码至少4位');
        if (p1 !== p2) return this.showToast('两次密码不一致');
        
        const btn = document.getElementById('setPwdBtn'); btn.textContent = '保存中...';
        const res = await fetch('/api/auth', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'set', username, password: p1 })
        }).then(r => r.json());

        if (res.ok) { document.querySelector('.modal-overlay').remove(); resolveCallback(true); } 
        else { this.showToast(res.error); btn.textContent = '确定'; }
    },

    showChangePasswordModal() {
        const user = this.getCurrentUser();
        if (!user) return;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-card" style="max-width:380px;">
                <div class="modal-title">修改密码</div>
                <input type="password" id="oldPwd" class="search-box" placeholder="原密码" style="width:100%;margin-bottom:12px;">
                <input type="password" id="chgPwd" class="search-box" placeholder="新密码（至少4位）" style="width:100%;margin-bottom:12px;">
                <div class="modal-btns">
                    <button class="btn-cancel" onclick="this.closest('.modal-overlay').remove()">取消</button>
                    <button class="btn-primary" id="chgBtn" onclick="QuizApp._doChangePwd()">确认修改</button>
                </div>
            </div>
        `;
        document.getElementById('modalRoot').appendChild(modal);
    },

    async _doChangePwd() {
        const user = this.getCurrentUser();
        const p1 = document.getElementById('oldPwd').value;
        const p2 = document.getElementById('chgPwd').value;
        if (!p1) return this.showToast('请输入原密码');
        if (p2.length < 4) return this.showToast('新密码至少4位');
        
        const btn = document.getElementById('chgBtn'); btn.textContent = '修改中...';
        const res = await fetch('/api/auth', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'change', username: user, password: p1, newPassword: p2 })
        }).then(r => r.json());

        if (res.ok) { this.showToast('密码修改成功'); document.querySelector('.modal-overlay').remove(); } 
        else { this.showToast(res.error); btn.textContent = '确认修改'; }
    },
    async logout() {
        const ok = await this.showConfirm({ title: '退出登录', message: '确定要退出当前账号吗？', confirmText: '退出', cancelText: '取消', danger: true });
        if (!ok) return;
        localStorage.removeItem('quiz_user_id'); this.clearSessionContext(); this.invalidateCache(); this._inQuiz = false; this.updateUserUI(); this.showToast('已退出登录'); if (this.currentTab === 'me') this.renderMe();
    },
    updateUserUI() { const el = document.getElementById('settingsUser'); if (el) el.textContent = this.getCurrentUser() || '未登录'; },
    loginNow() {
        const name = prompt('请输入用户名：');
        if (name && name.trim()) { localStorage.setItem('quiz_user_id', name.trim()); this.updateUserUI(); this.invalidateCache(); this.showToast('登录成功'); this.renderMe(); }
    },

    // ============================================================
    // 初始化与滑动、背景、路由
    // ============================================================
    init() {
        this.updateUserUI(); this.loadTheme(); this.loadSettings(); this.loadWelcome(); this._inQuiz = false;
        const saved = localStorage.getItem('quiz_last_selected'); if (saved && !isNaN(parseInt(saved))) this.lastSelected = parseInt(saved);
        if (localStorage.getItem('quiz_bg_image')) localStorage.removeItem('quiz_bg_image');
        this.applySavedCustomBg();
        this.bindTabs(); this.bindDragSlider(); this.bindKeyboard(); this.bindHomeClick(); this.bindHomeSwipeDown(); this.bindBgUpload(); this.bindQuizSwipe();
        this.switchTab('home');
        setTimeout(() => this.checkSmartPrompts(), 2000);
    },

    bindBgUpload() { const el = document.getElementById('bgImageInput'); if (el) el.addEventListener('change', (e) => this.handleBgImageUpload(e)); },

    bindQuizSwipe() {
        const app = document.getElementById('app'); if (!app) return;
        let startX = 0, startY = 0, tracking = false, locked = false;
        app.addEventListener('touchstart', (e) => {
            if (!this._inQuiz || this.activeBank.length === 0 || e.target.closest('.modal-overlay') || e.target.closest('button')) return;
            const t = e.touches[0]; startX = t.clientX; startY = t.clientY; tracking = true; locked = false;
        }, { passive: true });
        app.addEventListener('touchmove', (e) => {
            if (!tracking || locked) return;
            const t = e.touches[0]; const dx = t.clientX - startX; const dy = t.clientY - startY;
            if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 12) { locked = true; tracking = false; return; }
            if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.2) e.preventDefault();
        }, { passive: false });
        app.addEventListener('touchend', (e) => {
            if (!tracking) return; tracking = false;
            const t = e.changedTouches[0]; const dx = t.clientX - startX; const dy = t.clientY - startY;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                if (dx < 0) { if (this.idx < this.activeBank.length - 1) this.nextQuestion(); else this.showToast('已经是最后一题'); } 
                else { if (this.idx > 0) this.prevQuestion(); else this.showToast('已经是第一题'); }
            }
        });
        let mouseDown = false;
        app.addEventListener('mousedown', (e) => {
            if (!this._inQuiz || this.activeBank.length === 0 || e.target.closest('.modal-overlay') || e.target.closest('button')) return;
            mouseDown = true; startX = e.clientX; startY = e.clientY;
        });
        app.addEventListener('mousemove', (e) => {
            if (!mouseDown) return;
            const dx = e.clientX - startX, dy = e.clientY - startY;
            if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                mouseDown = false;
                if (dx < 0) { if (this.idx < this.activeBank.length - 1) this.nextQuestion(); } 
                else { if (this.idx > 0) this.prevQuestion(); }
            }
        });
        app.addEventListener('mouseup', () => { mouseDown = false; });
        app.addEventListener('mouseleave', () => { mouseDown = false; });
    },

    applySavedCustomBg() {
        const color = localStorage.getItem('quiz_custom_bg_color'); const img = localStorage.getItem('quiz_custom_bg_image');
        if (img) { document.body.style.background = ''; document.body.style.backgroundImage = `url(${img})`; document.body.style.backgroundSize = 'cover'; document.body.style.backgroundPosition = 'center'; document.body.style.backgroundAttachment = 'fixed'; } 
        else if (color) { document.body.style.backgroundImage = 'none'; document.body.style.background = color; }
    },
    applyCustomBgColor(color) { if (!color) return; document.body.style.backgroundImage = 'none'; document.body.style.background = color; localStorage.setItem('quiz_custom_bg_color', color); localStorage.removeItem('quiz_custom_bg_image'); this.showToast('背景色已更新'); if (this.currentTab === 'me') this.renderMe(); },
    applyCustomBgImage(dataURL) { if (!dataURL) return; document.body.style.background = ''; document.body.style.backgroundImage = `url(${dataURL})`; document.body.style.backgroundSize = 'cover'; document.body.style.backgroundPosition = 'center'; document.body.style.backgroundAttachment = 'fixed'; localStorage.setItem('quiz_custom_bg_image', dataURL); localStorage.removeItem('quiz_custom_bg_color'); this.showToast('背景图已更新'); if (this.currentTab === 'me') this.renderMe(); },
    async resetCustomBg() { const ok = await this.showConfirm({ title: '恢复默认背景', message: '确定要恢复默认背景吗？', confirmText: '恢复' }); if (!ok) return; document.body.style.backgroundImage = ''; document.body.style.background = ''; localStorage.removeItem('quiz_custom_bg_color'); localStorage.removeItem('quiz_custom_bg_image'); this.showToast('已恢复默认背景'); if (this.currentTab === 'me') this.renderMe(); },
    uploadBgImage() { const el = document.getElementById('bgImageInput'); if (el) el.click(); },
    handleBgImageUpload(event) { const file = event.target.files[0]; if (!file) return; if (file.size > 5 * 1024 * 1024) { this.showToast('图片过大，请选择小于 5MB 的图片'); event.target.value = ''; return; } const reader = new FileReader(); reader.onload = (ev) => this.applyCustomBgImage(ev.target.result); reader.readAsDataURL(file); event.target.value = ''; },

    bindHomeClick() {
        const home = document.getElementById('home'); if (!home) return;
        home.addEventListener('click', (e) => { if (home.classList.contains('expanded') || e.target.closest('.resume-hint') || e.target.closest('.quiz-actions')) return; this.expandQuizActions(); });
    },
    bindHomeSwipeDown() {
        const home = document.getElementById('home'); if (!home) return;
        let startY = 0, startX = 0, tracking = false;
        home.addEventListener('touchstart', (e) => { if (!home.classList.contains('expanded')) return; const t = e.touches[0]; startY = t.clientY; startX = t.clientX; tracking = true; }, { passive: true });
        home.addEventListener('touchmove', (e) => { if (!tracking) return; const t = e.touches[0]; if (t.clientY - startY > 60 && t.clientY - startY > Math.abs(t.clientX - startX) * 1.5) { tracking = false; this.collapseQuizActions(); } }, { passive: true });
        home.addEventListener('touchend', () => { tracking = false; });
        let mouseDown = false;
        home.addEventListener('mousedown', (e) => { if (!home.classList.contains('expanded')) return; mouseDown = true; startY = e.clientY; startX = e.clientX; });
        home.addEventListener('mousemove', (e) => { if (mouseDown && e.clientY - startY > 60 && e.clientY - startY > Math.abs(e.clientX - startX) * 1.5) { mouseDown = false; this.collapseQuizActions(); } });
        home.addEventListener('mouseup', () => { mouseDown = false; }); home.addEventListener('mouseleave', () => { mouseDown = false; });
    },
    expandQuizActions() { const h = document.getElementById('home'), w = document.getElementById('welcomeText'), hint = document.getElementById('welcomeHint'), a = document.getElementById('quizActions'); if (h && a) { h.classList.add('expanded'); w.classList.add('hidden'); hint.classList.add('hidden'); a.style.display = 'flex'; this.showQuizActions = true; } },
    collapseQuizActions() { const h = document.getElementById('home'), w = document.getElementById('welcomeText'), hint = document.getElementById('welcomeHint'), a = document.getElementById('quizActions'); if (h && a) { h.classList.remove('expanded'); w.classList.remove('hidden'); hint.classList.remove('hidden'); a.style.display = 'none'; this.showQuizActions = false; } },

    bindTabs() {
        const tabbar = document.getElementById('tabbar'); if (!tabbar) return;
        tabbar.addEventListener('click', (e) => { const btn = e.target.closest('.tab-btn'); if (!btn || tabbar.dataset.dragging === '1' || btn.dataset.tab === this.currentTab) return; this.switchTab(btn.dataset.tab); });
    },
    switchTab(tab) {
        this.currentTab = tab; const idx = this.TABS.indexOf(tab); if (idx >= 0) this.setSlider(idx, true);
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
        const home = document.getElementById('home'), app = document.getElementById('app');
        if (tab === 'home') {
            if (this._inQuiz && this.activeBank && this.activeBank.length > 0) { home.style.display = 'none'; app.style.display = 'block'; app.className = 'page'; this.renderCard(false); return; }
            home.style.display = 'flex'; app.style.display = 'none'; this.renderHome(); return;
        }
        home.style.display = 'none'; app.style.display = 'block'; app.className = 'page';
        if (tab === 'bank') this.renderBank(); else if (tab === 'wrong') this.renderWrong(); else if (tab === 'fav') this.renderFav(); else if (tab === 'me') this.renderMe();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    setSlider(idx, animate = true) { const slider = document.getElementById('tabSlider'); if (!slider) return; if (!animate) slider.style.transition = 'none'; slider.style.transform = `translateX(${idx * 100}%)`; if (!animate) { void slider.offsetWidth; slider.style.transition = ''; } },

    bindDragSlider() {
        const tabbar = document.getElementById('tabbar'), slider = document.getElementById('tabSlider');
        if (!tabbar || !slider) return;
        let isDragging = false, isPressing = false, pressTimer = null, startX = 0, startY = 0, currentIdx = 0;
        const onStart = (cx, cy) => {
            isPressing = true; startX = cx; startY = cy; currentIdx = this.TABS.indexOf(this.currentTab); if (currentIdx < 0) currentIdx = 0;
            pressTimer = setTimeout(() => { if (isPressing) { isDragging = true; tabbar.classList.add('dragging'); tabbar.dataset.dragging = '1'; this.vibrate(8); } }, 200);
        };
        const onMove = (cx, cy) => {
            if (!isPressing) return; const dx = cx - startX, dy = cy - startY;
            if (!isDragging) { if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { isPressing = false; clearTimeout(pressTimer); return; } if (Math.abs(dx) > 8) { isDragging = true; clearTimeout(pressTimer); tabbar.classList.add('dragging'); tabbar.dataset.dragging = '1'; this.vibrate(8); } return; }
            const rect = tabbar.getBoundingClientRect(), padding = 6, innerW = rect.width - padding * 2, tabW = innerW / 5;
            let x = cx - rect.left - padding; x = Math.max(0, Math.min(innerW - tabW, x)); const tx = (x / tabW) * 100;
            slider.style.transition = 'none'; slider.style.transform = `translateX(${tx}%)`;
            const nearest = Math.round(x / tabW); tabbar.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === nearest));
        };
        const onEnd = () => {
            clearTimeout(pressTimer);
            if (isDragging) {
                const match = slider.style.transform.match(/translateX\(([-\d.]+)%\)/); let nearest = currentIdx;
                if (match) nearest = Math.round(parseFloat(match[1]) / 100); nearest = Math.max(0, Math.min(4, nearest));
                slider.style.transition = ''; this.setSlider(nearest, true); tabbar.classList.remove('dragging');
                tabbar.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === nearest));
                const targetTab = this.TABS[nearest];
                if (targetTab && targetTab !== this.currentTab) { setTimeout(() => { tabbar.dataset.dragging = '0'; this.switchTab(targetTab); }, 50); } else { setTimeout(() => { tabbar.dataset.dragging = '0'; }, 50); }
            } else { tabbar.dataset.dragging = '0'; }
            isPressing = false; isDragging = false;
        };
        tabbar.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
        tabbar.addEventListener('touchmove', (e) => { if (isDragging) e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
        tabbar.addEventListener('touchend', onEnd); tabbar.addEventListener('touchcancel', onEnd);
        tabbar.addEventListener('mousedown', (e) => { if (e.button === 0) onStart(e.clientX, e.clientY); });
        window.addEventListener('mousemove', (e) => { if (isPressing) onMove(e.clientX, e.clientY); });
        window.addEventListener('mouseup', () => { if (isPressing) onEnd(); });
    },

    // ============================================================
    // 首页与数量弹窗
    // ============================================================
    loadWelcome() {
        const key = 'quiz_welcome_used', today = new Date().toDateString(); let data = {};
        try { data = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}
        if (data.date !== today) data = { date: today, used: [] };
        let pool = []; for (let i = 0; i < this.GREETINGS.length; i++) if (!data.used.includes(i)) pool.push(i);
        if (pool.length === 0) { data.used = []; pool = this.GREETINGS.map((_, i) => i); }
        const pick = pool[Math.floor(Math.random() * pool.length)]; data.used.push(pick);
        this.welcomeText = this.GREETINGS[pick]; localStorage.setItem(key, JSON.stringify(data));
    },
    renderHome() {
        const wt = document.getElementById('welcomeText'), wh = document.getElementById('welcomeHint'), a = document.getElementById('quizActions'), rw = document.getElementById('resumeHintWrap'), home = document.getElementById('home');
        if (wt) wt.textContent = this.welcomeText;
        if (this.showQuizActions) { if (home) home.classList.add('expanded'); if (wt) wt.classList.add('hidden'); if (wh) wh.classList.add('hidden'); if (a) a.style.display = 'flex'; } 
        else { if (home) home.classList.remove('expanded'); if (wt) wt.classList.remove('hidden'); if (wh) wh.classList.remove('hidden'); if (a) a.style.display = 'none'; }
        if (rw) {
            rw.innerHTML = ''; const user = this.getCurrentUser();
            if (user && localStorage.getItem(`quiz_session_${user}`)) {
                try {
                    const ctx = JSON.parse(localStorage.getItem(`quiz_session_${user}`));
                    const label = (ctx.isWrong || ctx.source === 'wrong') ? '错题' : (ctx.isFavorites ? '收藏' : '');
                    rw.innerHTML = `<div class="resume-hint" onclick="event.stopPropagation();QuizApp.restoreSession()">继续上次${label}答题（第 ${(ctx.idx || 0) + 1}/${(ctx.ids || []).length} 题）</div>`;
                } catch (e) {}
            }
        }
    },
    chooseMode(mode) { if (!this.checkLogin()) return; this.lastMode = mode; this._source = 'all'; this._isRandom = (mode === 'random'); this._isFavoritesMode = false; this.showQuantityModal(mode); },

    async showQuantityModal(mode) {
        const modal = document.getElementById('quantityModal'); if (!modal) return;
        const user = this.getCurrentUser(); if (!user) { this.showToast('请先登录'); return; }
        document.getElementById('modalTitle').textContent = { 'sequential': '选择刷题数量', 'random': '选择随机数量', 'wrong': '错题重练' }[mode] || '选择数量';

        let subSelect = document.getElementById('modalSubjectSelect');
        if (!subSelect && mode !== 'wrong') {
            const infoDiv = document.querySelector('.modal-info');
            infoDiv.insertAdjacentHTML('afterend', `<div style="margin-bottom:14px;"><label style="font-size:13px;color:#86868b;margin-bottom:6px;display:block;">选择学科/题库</label><select id="modalSubjectSelect" class="search-box" style="margin-bottom:0;" onchange="QuizApp.updatePreview(QuizApp._selectedNum,QuizApp._totalForPreview,QuizApp._modalMode)"><option value="全部">全部学科</option></select></div>`);
            subSelect = document.getElementById('modalSubjectSelect');
        }

        let total = 0;
        if (mode === 'wrong') {
            const w = await this.fetchWrong(); total = w.length; if (subSelect) subSelect.parentElement.style.display = 'none';
        } else {
            const b = await this.fetchBank(); total = b.length;
            if (subSelect) {
                subSelect.parentElement.style.display = 'block';
                const currentVal = subSelect.value || '全部';
                const subjects = [...new Set(b.map(q => q.subject || '默认题库'))];
                subSelect.innerHTML = '<option value="全部">全部学科</option>' + subjects.map(s => `<option value="${s}">${s}</option>`).join('');
                subSelect.value = currentVal === '全部' ? '全部' : (subjects.includes(currentVal) ? currentVal : '全部');
            }
        }
        this._totalForPreview = total; document.getElementById('totalCount').textContent = total;
        if (total === 0) { this.showToast(mode === 'wrong' ? '暂无错题' : '题库为空'); this.closeQuantityModal(); return; }
        const defaultVal = this.lastSelected || 20; this.selectQuantity(defaultVal); this._modalMode = mode; this.updatePreview(defaultVal, total, mode); modal.style.display = 'flex';
    },
    selectQuantity(num) {
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.preset-btn').forEach(b => { if (b.textContent.trim() === String(num) || (num === -1 && b.textContent.includes('全部'))) b.classList.add('active'); });
        const inp = document.getElementById('customQuantity'); if (inp) inp.value = '';
        this._selectedNum = num; const total = parseInt(document.getElementById('totalCount').textContent) || 0; this.updatePreview(num, total, this._modalMode || 'sequential');
    },
    confirmCustom() { const val = parseInt(document.getElementById('customQuantity').value); if (isNaN(val) || val < 1) return this.showToast('请输入有效数字'); const total = parseInt(document.getElementById('totalCount').textContent) || 0; this.selectQuantity(val > total ? -1 : val); },
    closeQuantityModal() { const m = document.getElementById('quantityModal'); if (m) m.style.display = 'none'; },
    updatePreview(num, total, mode) {
        const preview = document.getElementById('modalPreview'); if (!preview) return; let text = '';
        if (num === -1 || num >= total) text = `将加载全部 ${total} 道${mode === 'wrong' ? '错题' : '题'}`;
        else if (mode === 'sequential') { const start = this.getProgress(this.getCurrentUser()).sequential_index || 0; text = `顺序：第 ${start + 1} ~ ${Math.min(start + num, total)} 题（剩余 ${total - Math.min(start + num, total)} 题）`; } 
        else if (mode === 'wrong') text = `错题重练：${num} 道（共 ${total} 道错题）`;
        else text = `随机抽取 ${num} 道题（共 ${total} 题）`;
        preview.textContent = text;
    },
    startWithQuantity() { if (this._selectedNum === undefined) return this.showToast('请选择刷题数量'); const mode = this._modalMode || 'sequential'; this.lastSelected = this._selectedNum; localStorage.setItem('quiz_last_selected', String(this._selectedNum)); this.closeQuantityModal(); this.start(mode === 'random', this._selectedNum, mode === 'wrong' ? 'wrong' : 'all'); },

    // ============================================================
    // 开始刷题
    // ============================================================
    async start(isRandom, limit = -1, source = 'all', selectedChapters = null) {
        const user = this.getCurrentUser(); if (!user) return this.showToast('请先登录！');
        try {
            this._source = source; this._isFinishing = false; this._isRandom = isRandom; this._currentLimit = limit; this._tempMulti = []; this._multiSubmitted = false; this._isFavoritesMode = false;
            const subSelect = document.getElementById('modalSubjectSelect');
            const selectedSubject = (source === 'all' && subSelect) ? subSelect.value : '全部';
            this._currentBank = selectedSubject;

            const [favList, bankAll] = await Promise.all([this.fetchFav(), this.fetchBank()]);
            this._favorites = (favList || []).map(q => q.id);
            let bank = bankAll; if (!bank || bank.length === 0) return this.showToast('当前没有题目');

            if (selectedSubject !== '全部') bank = bank.filter(q => (q.subject || '默认题库') === selectedSubject);
            this._allChapters = [...new Set(bank.map(q => q.chapter).filter(c => c && c.trim() && c !== '其他'))];
            if (selectedChapters && selectedChapters.length > 0) {
                bank = bank.filter(q => selectedChapters.includes(q.chapter)); if (bank.length === 0) return this.showToast('该章节下没有题目');
            }

            if (source === 'wrong') {
                const wrongRaw = await this.fetchWrong(); const map = {};
                for (const w of wrongRaw) {
                    const key = w.q || String(w.id);
                    if (!map[key]) map[key] = { id: w.id, q: w.q, opts: w.opts || [], a: w.a, answer: w.answer, subject: w.subject || '默认题库', chapter: w.chapter || '', wrongCount: 0, lastWrongAt: null, mastered: false };
                    map[key].wrongCount++; const t = w.created_at || w.time || null; if (t && (!map[key].lastWrongAt || t > map[key].lastWrongAt)) map[key].lastWrongAt = t;
                }
                const mKey = `quiz_mastered_${user}`; let masteredMap = {}; try { masteredMap = JSON.parse(localStorage.getItem(mKey) || '{}'); } catch (e) {}
                const wrongList = Object.values(map).map(w => { if (masteredMap[w.q]) w.mastered = true; return w; });
                this._wrongList = wrongList; const unmastered = wrongList.filter(w => !w.mastered); if (unmastered.length === 0) return this.showToast('所有错题已掌握');
                bank = unmastered.map(w => ({ id: w.id, q: w.q, opts: w.opts, a: w.a, subject: w.subject, chapter: w.chapter, _isWrong: true, _wrongId: w.id }));
                this._wrongIdMap = {}; bank.forEach(item => { this._wrongIdMap[item.id] = item._wrongId; });
            } else { this._wrongIdMap = {}; }

            let selectedBank = [];
            if (limit === -1 || limit >= bank.length) selectedBank = bank;
            else if (isRandom) {
                const recent = this.getRecentQuestions(user); const available = bank.filter(q => !recent.includes(q.id));
                selectedBank = [...(available.length >= limit ? available : bank)].sort(() => Math.random() - 0.5).slice(0, limit);
            } else {
                let startIdx = this.getProgress(user).sequential_index || 0;
                if (startIdx >= bank.length) { startIdx = 0; this.saveProgress(user, { sequential_index: 0 }); }
                selectedBank = bank.slice(startIdx, Math.min(startIdx + limit, bank.length));
                this._pendingStart = startIdx; this._pendingLimit = limit; this._totalBank = bank;
            }

            if (selectedBank.length === 0) return this.showToast('没有符合条件的题目');
            this.activeBank = selectedBank; this.idx = 0; this.record = new Array(this.activeBank.length).fill(null); this._consecutiveCorrect = 0; this._consecutiveWrong = 0;
            this._sessionId = Date.now() + '_' + Math.random().toString(36).substr(2, 6); this._inQuiz = true;
            document.getElementById('home').style.display = 'none'; document.getElementById('app').style.display = 'block'; document.getElementById('app').className = 'page';
            this.renderCard(false); this.saveSessionContext();
        } catch (err) { this.showToast('加载题库失败：' + err.message); console.error(err); }
    },
        async startFavorites() {
        const user = this.getCurrentUser(); if (!user) return this.showToast('请先登录');
        const list = await this.fetchFav(true); if (!list || list.length === 0) return this.showToast('暂无收藏题目');
        this._isFavoritesMode = true; this._source = 'all'; this._isRandom = false; this._selectedChapters = []; this._isChapterMode = false; this._currentLimit = list.length;
        this.activeBank = list.map(q => ({ id: q.id, q: q.q, opts: q.opts, a: q.a, subject: q.subject, chapter: q.chapter }));
        this.idx = 0; this.record = new Array(this.activeBank.length).fill(null); this._multiSubmitted = false; this._tempMulti = []; this._isFinishing = false; this._consecutiveCorrect = 0; this._consecutiveWrong = 0; this._inQuiz = true;
        document.getElementById('home').style.display = 'none'; document.getElementById('app').style.display = 'block'; document.getElementById('app').className = 'page';
        this.renderCard(false); this.showToast(`开始练习 ${this.activeBank.length} 道收藏题`);
    },

    // ============================================================
    // 章节选择 & 答题卡片
    // ============================================================
    async openChapterPicker() {
        const modalRoot = document.getElementById('modalRoot'); if (!modalRoot) return;
        const bank = this._cache.bank || await this.fetchBank();
        const chapterMap = {}; bank.forEach(q => { const c = (q.chapter || '').trim(); if (!c || c === '其他') return; if (!chapterMap[c]) chapterMap[c] = 0; chapterMap[c]++; });
        const chapters = Object.keys(chapterMap);
        if (chapters.length === 0) return this.showToast('题库暂未设置章节');

        const current = this._selectedChapters || []; const allActive = current.length === 0;
        let listHtml = `<button class="chapter-card chapter-card-all ${allActive ? 'active' : ''}" onclick="QuizApp.pickChapter('')"><div class="chapter-card-left"><div class="chapter-card-num">ALL</div><div class="chapter-card-info"><div class="chapter-card-name">全部章节</div><div class="chapter-card-count">${bank.length} 道题</div></div></div><div class="chapter-card-right">${allActive ? '<span class="chapter-card-check">✓</span>' : '<span class="chapter-card-arrow">→</span>'}</div></button>`;
        chapters.forEach((c, i) => {
            const active = current.includes(c);
            listHtml += `<button class="chapter-card ${active ? 'active' : ''}" onclick="QuizApp.pickChapter('${this.escAttr(c)}')"><div class="chapter-card-left"><div class="chapter-card-num">${String(i + 1).padStart(2, '0')}</div><div class="chapter-card-info"><div class="chapter-card-name">${c}</div><div class="chapter-card-count">${chapterMap[c]} 道题</div></div></div><div class="chapter-card-right">${active ? '<span class="chapter-card-check">✓</span>' : '<span class="chapter-card-arrow">→</span>'}</div></button>`;
        });
        const modal = document.createElement('div'); modal.className = 'modal-overlay'; modal.id = 'chapterPickerModal';
        modal.innerHTML = `<div class="modal-card chapter-picker-card" style="max-width:460px;"><div class="modal-header"><span class="modal-title">切换章节</span><button class="modal-close" onclick="QuizApp.closeModal('chapterPickerModal')">✕</button></div><div class="chapter-picker-total">共 ${bank.length} 道题 · ${chapters.length} 个章节</div><div class="chapter-card-list">${listHtml}</div></div>`;
        modalRoot.appendChild(modal);
    },
    pickChapter(chapter) {
        this.closeModal('chapterPickerModal');
        if (!chapter) { this._selectedChapters = []; this._isChapterMode = false; } else { this._selectedChapters = [chapter]; this._isChapterMode = true; }
        this.start(this._isRandom || false, this._currentLimit || 20, this._source === 'wrong' ? 'all' : this._source, this._selectedChapters.length > 0 ? this._selectedChapters : null);
        this.showToast(chapter ? `已切换到「${chapter}」` : '已切换到全部章节');
    },

    renderCard(needAnimation, direction = 'none') {
        const app = document.getElementById('app'); if (!app) return;
        if (!this.activeBank || this.activeBank.length === 0) return app.innerHTML = `<div class="page-card empty-state">暂无题目</div>`;

        const q = this.activeBank[this.idx]; const done = this.record.filter(x => x !== null).length;
        const correct = this.record.filter((v, i) => v !== null && this.checkAnswer(this.activeBank[i], v)).length;
        const acc = done ? Math.round(correct / done * 100) : 0; const total = this.activeBank.length; const remaining = total - done;
        const isMulti = Array.isArray(q.a); const isJudge = !isMulti && q.opts.length === 2 && ((q.opts[0].includes('正确') && q.opts[1].includes('错误')) || (q.opts[0].includes('对') && q.opts[1].includes('错')));
        const typeLabel = isMulti ? '多选题' : (isJudge ? '判断题' : '单选题');
        let chapterLabel = (this._selectedChapters && this._selectedChapters.length > 0) ? this._selectedChapters.join('、') : '全部章节';
        const modeLabel = this._isFavoritesMode ? '收藏练习' : '';
        const isFav = this._favorites && this._favorites.includes(q.id); const starText = isFav ? '已收藏' : '收藏';
        const hasSelected = this.record[this.idx] !== null; const isCorrect = hasSelected && this.checkAnswer(q, this.record[this.idx]);
        const tempSelected = this._tempMulti || []; const isMultiSubmitted = this._multiSubmitted || false; const showSubmit = isMulti && !isMultiSubmitted && !hasSelected;
        const isFirst = this.idx === 0; const isLast = this.idx === this.activeBank.length - 1;

        let optionsHtml = q.opts.map((o, oIdx) => {
            let cls = 'opt';
            if (isMulti) {
                if (tempSelected.includes(oIdx)) cls += ' selected';
                if (isMultiSubmitted || hasSelected) { if (q.a.includes(oIdx)) cls += ' correct'; else if (tempSelected.includes(oIdx) && !q.a.includes(oIdx)) cls += ' wrong'; }
                return `<div class="${cls}" ${(!isMultiSubmitted && !hasSelected) ? `onclick="QuizApp.toggleMultiOption(${oIdx})"` : ''}>${o}</div>`;
            } else {
                if (hasSelected) { if (oIdx === q.a) cls += ' correct'; else if (oIdx === this.record[this.idx]) cls += ' wrong'; }
                return `<div class="${cls}" ${!hasSelected ? `onclick="QuizApp.select(${oIdx})"` : ''}>${o}</div>`;
            }
        }).join('');

        let correctAnswerHtml = '';
        if (isMulti && (isMultiSubmitted || hasSelected)) correctAnswerHtml = `<div class="correct-note">正确答案：<strong>${q.a.map(idx => q.opts[idx]).join('、')}</strong></div>`;
        let masterBtnHtml = '';
        if (this._source === 'wrong' && q._isWrong && hasSelected && isCorrect) masterBtnHtml = `<div style="margin-top:14px;text-align:center;"><button class="master-action-btn" onclick="QuizApp.markMastered(${q._wrongId})">标记为已掌握</button></div>`;
        let submitBtnHtml = showSubmit ? `<button class="submit-btn" onclick="QuizApp.submitMultiChoice()">提交答案</button>` : '';
        let multiHint = (isMulti && !isMultiSubmitted && !hasSelected && tempSelected.length > 0) ? `<div class="multi-hint">已选 ${tempSelected.length} 个选项，点击提交确认</div>` : '';
        let statusHtml = (hasSelected || isMultiSubmitted) ? (isCorrect ? `<span class="ok">回答正确</span>` : `<span class="no">再试一次</span>`) : '';

        const noteExists = this.hasNote(q.q);
        const noteText = noteExists ? '笔记 ·' : '笔记';

        const htmlContent = `
            <div class="page-card quiz-card">
                <div class="quiz-top">
                    <div class="quiz-info">
                        <span class="chapter-tag">${chapterLabel}</span> ${modeLabel ? `<span class="mode-tag">${modeLabel}</span>` : ''}
                        <span>正确率 ${acc}%</span><span>进度 ${done}/${total}</span> ${remaining > 0 ? `<span>剩 ${remaining} 题</span>` : ''} ${statusHtml}
                    </div>
                    <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
                        ${!this._isFavoritesMode ? `<button class="glass-btn ghost" style="width:auto;padding:6px 12px;font-size:12px;" onclick="QuizApp.openChapterPicker()">切换章节</button>` : ''}
                        <button class="glass-btn ghost" style="width:auto;padding:6px 12px;font-size:12px;" onclick="QuizApp.openQuestionNav()">导航</button>
                        <button class="glass-btn ghost" style="width:auto;padding:6px 12px;font-size:12px;" onclick="QuizApp.toggleFavorite(${q.id})">${starText}</button>
                        <button class="glass-btn ghost ${noteExists ? 'has-note' : ''}" style="width:auto;padding:6px 12px;font-size:12px;" onclick="QuizApp.openNoteModal('${this.escAttr(q.q)}')">${noteText}</button>
                        <button class="glass-btn ghost" style="width:auto;padding:6px 12px;font-size:12px;" onclick="QuizApp.goHome()">首页</button>
                    </div>
                </div>
                <div class="type-tag">${typeLabel}</div>
                <div class="q-title">第 ${this.idx + 1} 题 · ${q.q}</div>
                ${optionsHtml} ${correctAnswerHtml} ${submitBtnHtml} ${multiHint} ${masterBtnHtml}
                <div style="display:flex;gap:12px;margin-top:18px;">
                    ${!isFirst ? `<button class="glass-btn ghost" style="flex:1;padding:12px;font-size:14px;" onclick="QuizApp.prevQuestion()">上一题</button>` : `<div style="flex:1;"></div>`}
                    ${!isLast ? `<button class="glass-btn primary" style="flex:1;padding:12px;font-size:14px;" onclick="QuizApp.nextQuestion()">下一题</button>` : `<div style="flex:1;"></div>`}
                </div>
                <button class="glass-btn ghost" style="width:100%;margin-top:12px;padding:12px;font-size:14px;" onclick="QuizApp.finishBatch()">结束本次练习</button>
            </div>
        `;

        if (needAnimation) { app.style.animation = 'none'; void app.offsetWidth; app.style.animation = 'pageIn 0.3s cubic-bezier(0.25, 1, 0.5, 1)'; }
        app.innerHTML = htmlContent; this.saveSessionContext();
    },
    checkAnswer(q, val) { if (val === null || val === undefined) return false; return Array.isArray(q.a) ? (Array.isArray(val) && val.length === q.a.length && val.every(x => q.a.includes(x))) : val === q.a; },

    openQuestionNav() {
        const modalRoot = document.getElementById('modalRoot'); if (!modalRoot) return;
        let html = ''; for (let i = 0; i < this.activeBank.length; i++) {
            const status = this.record[i]; let cls = 'nav-qbtn';
            if (status !== null) cls += this.checkAnswer(this.activeBank[i], status) ? ' correct' : ' wrong';
            if (i === this.idx) cls += ' active';
            html += `<button class="${cls}" onclick="QuizApp.jumpToQuestion(${i})">${i + 1}</button>`;
        }
        const modal = document.createElement('div'); modal.className = 'modal-overlay'; modal.id = 'questionNavModal';
        modal.innerHTML = `<div class="modal-card" style="max-width:520px;"><div class="modal-header"><span class="modal-title">题目导航</span><button class="modal-close" onclick="QuizApp.closeModal('questionNavModal')">✕</button></div><div class="nav-legend"><span class="nav-legend-item"><span class="nav-dot correct"></span>正确</span><span class="nav-legend-item"><span class="nav-dot wrong"></span>错误</span><span class="nav-legend-item"><span class="nav-dot"></span>未做</span></div><div class="nav-grid">${html}</div></div>`;
        modalRoot.appendChild(modal);
    },
    jumpToQuestion(index) { if (index >= 0 && index < this.activeBank.length) { this.idx = index; this._tempMulti = []; this._multiSubmitted = false; this.closeModal('questionNavModal'); this.renderCard(true); } },
    toggleMultiOption(oIdx) { const q = this.activeBank[this.idx]; if (!Array.isArray(q.a) || this._multiSubmitted || this.record[this.idx] !== null) return; const i = this._tempMulti.indexOf(oIdx); i > -1 ? this._tempMulti.splice(i, 1) : this._tempMulti.push(oIdx); this.renderCard(false); },
    submitMultiChoice() {
        const q = this.activeBank[this.idx]; if (!Array.isArray(q.a) || this._multiSubmitted || this.record[this.idx] !== null) return;
        if (this._tempMulti.length === 0) return this.showToast('请至少选择一个选项', 1500);
        const isCorrect = this._tempMulti.every(idx => q.a.includes(idx)) && q.a.every(idx => this._tempMulti.includes(idx));
        this.record[this.idx] = this._tempMulti.slice(); this._multiSubmitted = true;
        if (isCorrect) { this.vibrate(10); this._consecutiveCorrect++; this._consecutiveWrong = 0; if (this._streakAlertEnabled && this._consecutiveCorrect === 5) this.showToast('连续答对 5 题！'); }
        else { this.vibrate([10, 50, 10]); this._consecutiveWrong++; this._consecutiveCorrect = 0; if (this._streakAlertEnabled && this._consecutiveWrong === 3) this.showToast('别灰心，再想想'); if (this._source !== 'wrong') this.uploadWrongQuestion(this.getCurrentUser(), q); }
        this.renderCard(false); if (this.record.every(v => v !== null)) { this._isFinishing = true; setTimeout(() => this.finishBatch(), 400); }
    },
    select(oIdx) {
        const q = this.activeBank[this.idx]; if (Array.isArray(q.a) || this.record[this.idx] !== null || this._isFinishing) return;
        this.record[this.idx] = oIdx; const isCorrect = (oIdx === q.a);
        if (isCorrect) { this.vibrate(10); this._consecutiveCorrect++; this._consecutiveWrong = 0; if (this._streakAlertEnabled && this._consecutiveCorrect === 5) this.showToast('连续答对 5 题！'); }
        else { this.vibrate([10, 50, 10]); this._consecutiveWrong++; this._consecutiveCorrect = 0; if (this._streakAlertEnabled && this._consecutiveWrong === 3) this.showToast('别灰心，再想想'); if (this._source !== 'wrong') this.uploadWrongQuestion(this.getCurrentUser(), q); }
        this.renderCard(false);
        if (this.record.every(v => v !== null)) { this._isFinishing = true; return setTimeout(() => this.finishBatch(), 400); }
        clearTimeout(this._selectTimer); this._selectTimer = setTimeout(() => {
            if (this._isFinishing) return; if (this.record.every(v => v !== null)) { this._isFinishing = true; return this.finishBatch(); }
            if (this.idx + 1 < this.activeBank.length) { this.idx++; this._tempMulti = []; this._multiSubmitted = false; this.renderCard(true, 'right'); } else { this._isFinishing = true; this.finishBatch(); }
        }, this._autoDelay || 200);
    },
    prevQuestion() { if (this.idx > 0) { this.idx--; this._tempMulti = []; this._multiSubmitted = false; this.renderCard(true, 'left'); } },
    nextQuestion() { if (this.idx < this.activeBank.length - 1) { this.idx++; this._tempMulti = []; this._multiSubmitted = false; this.renderCard(true, 'right'); } },

    async toggleFavorite(questionId) {
        const user = this.getCurrentUser(); if (!user) return this.showToast('请先登录');
        const isFav = this._favorites.includes(questionId); const url = isFav ? '/api/favorites-remove' : '/api/favorites-add';
        try {
            const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user, question_id: questionId }) });
            const data = await res.json(); if (data.ok !== false) {
                if (isFav) { this._favorites = this._favorites.filter(id => id !== questionId); this.showToast('已取消收藏', 1500); } else { this._favorites.push(questionId); this.showToast('已收藏', 1500); }
                this.invalidateCache('fav'); this.renderCard(false);
            }
        } catch (e) { this.showToast('操作失败'); }
    },

    async finishBatch() {
        if (this._isFinishing && this.record.every(v => v === null)) return; this._isFinishing = true;
        const user = this.getCurrentUser(); if (!user) return;
        let correctCount = 0; for (let i = 0; i < this.activeBank.length; i++) { if (this.record[i] !== null && this.checkAnswer(this.activeBank[i], this.record[i])) correctCount++; }
        const done = this.record.filter(v => v !== null).length; const acc = done > 0 ? Math.round(correctCount / done * 100) : 0;

        if (this._isFavoritesMode) {
            const action = await this.showResultModal({ title: '收藏练习完成', correct: correctCount, wrong: done - correctCount, total: done, acc: acc });
            this._isFinishing = false; return action === 'retry' ? this.startFavorites() : this.goHome();
        }
        if (!this._isRandom && this._totalBank && this._source === 'all') {
            const newIndex = (this._pendingStart || 0) + this.activeBank.length;
            if (newIndex >= this._totalBank.length) { this.saveProgress(user, { sequential_index: 0 }); this.showToast('已刷完所有题目'); } else { this.saveProgress(user, { sequential_index: newIndex }); }
        }
        this.saveRecentQuestions(user, this.activeBank.map(q => q.id)); this.clearSessionContext(); if (this._source === 'all') this.invalidateCache('wrong');
        const action = await this.showResultModal({ title: `${this._source === 'wrong' ? '错题重练' : '刷题'}完成`, correct: correctCount, wrong: done - correctCount, total: done, acc: acc });
        this._isFinishing = false; if (action === 'retry') this.start(this._isRandom || false, this._currentLimit || 20, this._source || 'all'); else this.goHome();
    },
    goHome() {
        this.clearSessionContext(); this._inQuiz = false; this._isFavoritesMode = false; this.showQuizActions = false; this.currentTab = 'home'; this.setSlider(0, true);
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === 'home'));
        const home = document.getElementById('home'), app = document.getElementById('app'), wt = document.getElementById('welcomeText'), wh = document.getElementById('welcomeHint'), a = document.getElementById('quizActions');
        if (home) { home.style.display = 'flex'; home.classList.remove('expanded'); }
        if (app) app.style.display = 'none'; if (wt) wt.classList.remove('hidden'); if (wh) wh.classList.remove('hidden'); if (a) a.style.display = 'none';
        this.renderHome();
    },

    // ============================================================
    // 错题页
    // ============================================================
    async renderWrong() {
        const app = document.getElementById('app'); if (!this.getCurrentUser()) return app.innerHTML = `<div class="page-card empty-state">请先在「我的」页面登录</div>`;
        if (this._cache.wrong) { this._buildWrongData(); this._renderWrongUI(); this.fetchWrong(true).then(() => { if (this.currentTab === 'wrong') { this._buildWrongData(); this._renderWrongUI(); } }); return; }
        app.innerHTML = this.skeletonHTML('wrong'); await this.fetchWrong(); this._buildWrongData(); this._renderWrongUI();
    },
    _buildWrongData() {
        const user = this.getCurrentUser(), raw = this._cache.wrong || [], map = {};
        const findAnswerIndex = (answerText, opts) => {
            if (!Array.isArray(opts) || !answerText) return undefined;
            const ans = String(answerText).trim(); let idx = opts.findIndex(o => String(o).trim() === ans); if (idx >= 0) return idx;
            if (/^[A-Za-z]$/.test(ans)) { const letter = ans.toUpperCase(); idx = opts.findIndex(o => String(o).trim() === letter || String(o).trim().startsWith(letter + '.') || String(o).trim().startsWith(letter + '、') || String(o).trim().startsWith(letter + ' ')); if (idx >= 0) return idx; const charCode = letter.charCodeAt(0) - 65; if (charCode >= 0 && charCode < opts.length) return charCode; }
            return undefined;
        };
        for (const w of raw) {
            const key = w.q || String(w.id);
            if (!map[key]) { const opts = Array.isArray(w.opts) ? w.opts : []; map[key] = { id: w.id, q: w.q, opts: opts, a: findAnswerIndex(w.answer, opts), answer: w.answer, user_choice: w.user_choice, subject: w.subject || '默认题库', chapter: w.chapter || '', wrongCount: 0, lastWrongAt: null, mastered: false }; }
            map[key].wrongCount++; const t = w.created_at || w.time || null; if (t && (!map[key].lastWrongAt || t > map[key].lastWrongAt)) map[key].lastWrongAt = t;
        }
        const list = Object.values(map), mKey = `quiz_mastered_${user}`; let mastered = {};
        try { mastered = JSON.parse(localStorage.getItem(mKey) || '{}'); } catch (e) {}
        list.forEach(w => { if (mastered[w.q]) w.mastered = true; }); this._wrongList = list;
    },
    _renderWrongUI() {
        const app = document.getElementById('app'), list = this._wrongList, total = list.length, mastered = list.filter(w => w.mastered).length, filter = this._wrongFilter, keyword = (this._wrongSearch || '').trim().toLowerCase();
        let filtered = list;
        if (filter === 'unmastered') filtered = list.filter(w => !w.mastered); else if (filter === 'mastered') filtered = list.filter(w => w.mastered);
        if (this._wrongSubjectFilter !== 'all') filtered = filtered.filter(w => w.subject === this._wrongSubjectFilter);
        if (keyword) filtered = filtered.filter(w => (w.q || '').toLowerCase().includes(keyword) || (w.opts || []).some(o => o.toLowerCase().includes(keyword)));
        filtered.sort((a, b) => { if (a.mastered !== b.mastered) return a.mastered ? 1 : -1; return (b.wrongCount || 0) - (a.wrongCount || 0); });

        const subjects = [...new Set(list.map(w => w.subject))];
        const subjectBar = subjects.length > 0 ? `<div class="chapter-bar" style="border-bottom: none; margin-bottom: 0; padding-bottom: 4px;"><button class="chapter-chip ${this._wrongSubjectFilter === 'all' ? 'active' : ''}" onclick="QuizApp.setWrongSubject('all')">全部学科</button>${subjects.map(s => `<button class="chapter-chip ${this._wrongSubjectFilter === s ? 'active' : ''}" onclick="QuizApp.setWrongSubject('${this.escAttr(s)}')">${s}</button>`).join('')}</div>` : '';

        let listHtml = '';
        if (filtered.length === 0) {
            const emptyText = keyword ? `没有匹配「${this._wrongSearch}」的错题` : (filter === 'mastered' ? '还没有已掌握的题' : (filter === 'unmastered' ? '未掌握列表为空' : '错题本为空'));
            listHtml = `<div class="empty-state">${emptyText}</div>`;
        } else {
            listHtml = filtered.map((w, i) => {
                const hard = (w.wrongCount || 0) >= 5; const badges = [];
                if (hard) badges.push(`<span class="badge hard">高难度</span>`); if (w.mastered) badges.push(`<span class="badge mastered">已掌握</span>`);
                const selected = this._wrongSelected.includes(w.q); const checkbox = this._wrongEditMode ? `<div class="q-checkbox ${selected ? 'checked' : ''}"></div>` : '';
                const clickHandler = this._wrongEditMode ? `onclick="QuizApp.toggleSelectWrong('${this.escAttr(w.q)}')"` : '';
                const note = this.getNote(w.q); const noteDot = note ? `<span class="note-dot" title="有笔记">📝</span>` : ''; const notePreview = note ? `<div class="note-preview">${this.escapeHtml(note.text.substring(0, 60))}...</div>` : '';
                const actionsHtml = this._wrongEditMode ? '' : `<div class="wi-actions"><button class="note-btn-small" onclick="event.stopPropagation();QuizApp.openNoteModal('${this.escAttr(w.q)}')">${note ? '编辑笔记' : '笔记'}</button><button class="master-toggle ${w.mastered ? 'on' : ''}" onclick="event.stopPropagation();QuizApp.toggleMastered('${this.escAttr(w.q)}', ${!w.mastered})">${w.mastered ? '取消掌握' : '标记掌握'}</button><button class="start-practice-btn" onclick="QuizApp.startWrongPractice('${this.escAttr(w.q)}')">开始练习</button><button class="del-icon" onclick="QuizApp.deleteWrongItem(${w.id})">删除</button></div>`;
                return `<div class="wrong-item ${this._wrongEditMode ? 'selectable' : ''} ${selected ? 'selected' : ''}" ${clickHandler}>${checkbox}<div class="wi-head"><span class="wi-idx">第 ${w.id || (i + 1)} 题 ${noteDot}</span><span class="wi-badges">${badges.join('')}<span>错误 ${w.wrongCount || 1} 次</span></span></div><div class="wi-q">${w.q}</div>${notePreview}<div class="wi-meta"><span>${w.subject}</span>${w.chapter ? `<span>${w.chapter}</span>` : ''}<span>${this.relTime(w.lastWrongAt)}</span></div>${actionsHtml}</div>`;
            }).join('');
        }

        const exportBtn = total > 0 ? `<button class="add-btn" style="background:rgba(0,0,0,0.06);color:#1d1d1f;box-shadow:none;" onclick="QuizApp.showExportOptions()">导出</button>` : '';
        const selectBtn = total > 0 ? `<button class="add-btn" style="background:rgba(0,0,0,0.06);color:#1d1d1f;box-shadow:none;" onclick="QuizApp.${this._wrongEditMode ? 'exitWrongEditMode' : 'enterWrongEditMode'}()">${this._wrongEditMode ? '完成' : '选择'}</button>` : '';
        const searchBox = total > 0 ? `<input class="search-box" type="text" placeholder="搜索错题..." value="${this._wrongSearch || ''}" oninput="QuizApp.onWrongSearch(this.value)">` : '';
        let bottomBar = '';
        if (this._wrongEditMode) { const allSelected = filtered.length > 0 && filtered.every(w => this._wrongSelected.includes(w.q)); bottomBar = `<div class="bank-bottom-bar"><button class="bottom-btn" onclick="QuizApp.selectAllWrong()">${allSelected ? '取消全选' : '全选'}</button><button class="bottom-btn danger" onclick="QuizApp.deleteSelectedWrong()" ${this._wrongSelected.length === 0 ? 'disabled' : ''}>删除选中 (${this._wrongSelected.length})</button><button class="bottom-btn" onclick="QuizApp.exitWrongEditMode()">完成</button></div>`; }

        app.innerHTML = `<div class="page-card"><div class="bank-head"><div><div class="bank-title">我的错题</div><div class="bank-count">${total} 道 · ${mastered} 道已掌握</div></div><div style="display:flex;gap:8px;">${selectBtn}${exportBtn}</div></div><div class="status-tabs"><button class="status-tab ${filter === 'all' ? 'active' : ''}" onclick="QuizApp.setWrongFilter('all')">全部</button><button class="status-tab ${filter === 'unmastered' ? 'active' : ''}" onclick="QuizApp.setWrongFilter('unmastered')">未掌握</button><button class="status-tab ${filter === 'mastered' ? 'active' : ''}" onclick="QuizApp.setWrongFilter('mastered')">已掌握</button></div>${subjectBar}${searchBox}${total > 0 ? `<div class="practice-cards"><button class="practice-card" onclick="QuizApp.practiceWrong('all')"><div><div class="pc-title">练习全部错题</div><div class="pc-sub">${total} 道</div></div><span class="pc-arrow">→</span></button></div><div class="practice-cards row2"><button class="practice-card" onclick="QuizApp.practiceWrong('unmastered')"><div><div class="pc-title">未掌握练习</div><div class="pc-sub">${list.filter(w => !w.mastered).length} 道</div></div></button><button class="practice-card" onclick="QuizApp.practiceWrong('random')"><div><div class="pc-title">随机错题</div><div class="pc-sub">抽 10 道</div></div></button></div>` : ''}${listHtml}</div>${bottomBar}`;
    },
    setWrongSubject(sub) { this._wrongSubjectFilter = sub; this._renderWrongUI(); },
    setWrongFilter(f) { this._wrongFilter = f; this._renderWrongUI(); },
    relTime(t) { if (!t) return ''; const d = new Date(t); if (isNaN(d.getTime())) return ''; const diff = Date.now() - d.getTime(), day = 86400000; if (diff < day) return '今天'; if (diff < 2 * day) return '昨天'; if (diff < 7 * day) return Math.floor(diff / day) + ' 天前'; return `${d.getMonth() + 1}月${d.getDate()}日`; },
    escAttr(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"'); },

    enterWrongEditMode() { this._wrongEditMode = true; this._wrongSelected = []; this._renderWrongUI(); },
    exitWrongEditMode() { this._wrongEditMode = false; this._wrongSelected = []; this._renderWrongUI(); },
    toggleSelectWrong(qText) { if (!this._wrongEditMode) return; const i = this._wrongSelected.indexOf(qText); i > -1 ? this._wrongSelected.splice(i, 1) : this._wrongSelected.push(qText); this._renderWrongUI(); },
    selectAllWrong() { let filtered = this._wrongList; if (this._wrongFilter === 'unmastered') filtered = filtered.filter(w => !w.mastered); else if (this._wrongFilter === 'mastered') filtered = filtered.filter(w => w.mastered); if (this._wrongSubjectFilter !== 'all') filtered = filtered.filter(w => w.subject === this._wrongSubjectFilter); const all = filtered.every(w => this._wrongSelected.includes(w.q)); this._wrongSelected = all ? [] : filtered.map(w => w.q); this._renderWrongUI(); },

    async deleteSelectedWrong() {
        if (this._wrongSelected.length === 0) return;
        const ok = await this.showConfirm({ title: '批量删除错题', message: `确定删除选中的 ${this._wrongSelected.length} 道错题吗？`, confirmText: '删除', cancelText: '取消', danger: true }); if (!ok) return;
        const itemsToDelete = this._wrongList.filter(w => this._wrongSelected.includes(w.q)); this.showToast(`删除 ${itemsToDelete.length} 道...`);
        const results = await Promise.all(itemsToDelete.map(w => fetch('/api/wrong-delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: this.getCurrentUser(), id: w.id }) }).then(r => r.json()).then(d => d.ok !== false).catch(() => false)));
        this.showToast(`已删除 ${results.filter(Boolean).length} 道`); this._wrongSelected = []; this.invalidateCache('wrong');
        if (this._cache.wrong) { const dIds = new Set(itemsToDelete.map(w => w.id)); this._cache.wrong = this._cache.wrong.filter(w => !dIds.has(w.id)); }
        this._buildWrongData(); this._renderWrongUI();
    },
    async deleteWrongItem(id) { const ok = await this.showConfirm({ title: '删除错题', message: '确定要删除这条错题吗？', confirmText: '删除', cancelText: '取消', danger: true }); if (!ok) return; try { await fetch('/api/wrong-delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: this.getCurrentUser(), id }) }); this.showToast('已删除'); this.invalidateCache('wrong'); this._cache.wrong = (this._cache.wrong || []).filter(w => w.id !== id); this._buildWrongData(); this._renderWrongUI(); } catch (e) { this.showToast('删除失败'); } },
    async toggleMastered(qText, val) { await this.saveMastered(qText, val); this.showToast(val ? '已标记为掌握' : '已取消掌握'); const w = this._wrongList.find(x => x.q === qText); if (w) w.mastered = val; this._renderWrongUI(); },
    async saveMastered(qText, val) { const user = this.getCurrentUser(); if (!user) return; const mKey = `quiz_mastered_${user}`; let data = {}; try { data = JSON.parse(localStorage.getItem(mKey) || '{}'); } catch (e) {} if (val) data[qText] = Date.now(); else delete data[qText]; localStorage.setItem(mKey, JSON.stringify(data)); },

    async practiceWrong(mode) {
        const user = this.getCurrentUser(); if (!user) return; this._buildWrongData();
        let list = this._wrongList.slice(); if (mode === 'unmastered') list = list.filter(w => !w.mastered); if (mode === 'random') list = list.sort(() => Math.random() - 0.5).slice(0, 10);
        if (list.length === 0) return this.showToast('没有可练习的错题');
        this._source = 'wrong'; this._isRandom = (mode === 'random'); this._isFavoritesMode = false; this._selectedChapters = []; this._isChapterMode = false;
        this.activeBank = list.map(w => ({ id: w.id, q: w.q, opts: w.opts, a: w.a, subject: w.subject, chapter: w.chapter, _isWrong: true, _wrongId: w.id }));
        this.idx = 0; this.record = new Array(this.activeBank.length).fill(null); this._multiSubmitted = false; this._tempMulti = []; this._isFinishing = false; this._inQuiz = true;
        document.getElementById('home').style.display = 'none'; document.getElementById('app').style.display = 'block'; document.getElementById('app').className = 'page';
        this.renderCard(false); this.showToast(`开始练习 ${this.activeBank.length} 道错题`);
    },
    async startWrongPractice(qText) {
        const w = this._wrongList.find(x => x.q === qText); if (!w) return;
        this._source = 'wrong'; this._isRandom = false; this._isFavoritesMode = false; this._selectedChapters = []; this._isChapterMode = false;
        this.activeBank = [{ id: w.id, q: w.q, opts: w.opts, a: w.a, subject: w.subject, chapter: w.chapter, _isWrong: true, _wrongId: w.id }];
        this.idx = 0; this.record = [null]; this._multiSubmitted = false; this._tempMulti = []; this._isFinishing = false; this._inQuiz = true;
        document.getElementById('home').style.display = 'none'; document.getElementById('app').style.display = 'block'; document.getElementById('app').className = 'page';
        this.renderCard(false);
    },
    async markMastered(wrongId) {
        const cur = this.activeBank[this.idx]; if (!cur) return; await this.saveMastered(cur.q, true); this.showToast('已掌握，本题移入已掌握');
        if (this.idx < this.activeBank.length - 1) setTimeout(() => { this.idx++; this._tempMulti = []; this._multiSubmitted = false; this.renderCard(true, 'right'); }, 400);
        else setTimeout(() => this.finishBatch(), 400);
    },
    async uploadWrongQuestion(userId, q) {
        try { await fetch('/api/wrong-add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId, q: q.q, opts: q.opts, a: q.a, chapter: q.chapter || '', subject: q.subject || '默认题库', user_choice: this.record[this.idx] }) }); this.invalidateCache('wrong'); } catch (e) { console.error(e); }
    },

    showExportOptions() {
        const modalRoot = document.getElementById('modalRoot'); if (!modalRoot) return;
        const modal = document.createElement('div'); modal.className = 'modal-overlay'; modal.id = 'exportModal';
        modal.innerHTML = `<div class="modal-card" style="max-width:400px;"><div class="modal-header"><span class="modal-title">导出错题</span><button class="modal-close" onclick="QuizApp.closeModal('exportModal')">✕</button></div><div class="modal-hint" style="text-align:left;">共 ${this._wrongList.length} 道错题，选择导出格式：</div><div class="export-options"><button class="export-option" onclick="QuizApp.exportWrong('json')"><div class="export-icon">JSON</div><div class="export-info"><div class="export-name">JSON 格式</div><div class="export-desc">结构化数据，可再次导入</div></div></button><button class="export-option" onclick="QuizApp.exportWrong('txt')"><div class="export-icon">TXT</div><div class="export-info"><div class="export-name">文本格式</div><div class="export-desc">方便阅读打印</div></div></button></div></div>`;
        modalRoot.appendChild(modal);
    },
    exportWrong(format) {
        const list = this._wrongList || []; if (list.length === 0) return this.showToast('暂无错题'); this.closeModal('exportModal');
        const getAnswerText = (w) => { if (w.answer !== undefined && w.answer !== null && w.answer !== '') return w.answer; if (Array.isArray(w.a)) return w.a.map(i => w.opts[i]).filter(Boolean).join('、'); if (typeof w.a === 'number' && w.opts && w.opts[w.a] !== undefined) return w.opts[w.a]; return '未记录'; };
        let content, mime, ext;
        if (format === 'json') { content = JSON.stringify(list.map(w => ({ q: w.q, opts: w.opts, answer: getAnswerText(w), subject: w.subject, chapter: w.chapter || '', wrongCount: w.wrongCount || 1 })), null, 2); mime = 'application/json;charset=utf-8'; ext = 'json'; } 
        else { content = list.map((w, i) => { const ans = getAnswerText(w); const optsLines = (w.opts || []).map((o, idx) => `   ${String.fromCharCode(65 + idx)}. ${o}`).join('\n'); return `第 ${i + 1} 题（${w.subject} - ${w.chapter}）\n${w.q}\n${optsLines}\n答案：${ans}\n错误次数：${w.wrongCount || 1}\n`; }).join('\n' + '─'.repeat(40) + '\n'); mime = 'text/plain;charset=utf-8'; ext = 'txt'; }
        const blob = new Blob([content], { type: mime }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `错题_${new Date().toISOString().slice(0, 10)}.${ext}`; document.body.appendChild(a); a.click(); document.body.removeChild(a); setTimeout(() => URL.revokeObjectURL(url), 1000); this.showToast(`已导出 ${list.length} 道错题`);
    },

    // ============================================================
    // 题库页
    // ============================================================
    async renderBank() {
        const app = document.getElementById('app'); if (!this.getCurrentUser()) return app.innerHTML = `<div class="page-card empty-state">请先在「我的」页面登录</div>`;
        if (this._cache.bank) { this._bankCache = this._cache.bank; this._renderBankUI(this._bankCache, ''); this.fetchBank(true).then(list => { if (this.currentTab === 'bank') { this._bankCache = list; this._renderBankUI(list, ''); } }); return; }
        app.innerHTML = this.skeletonHTML('bank'); const list = await this.fetchBank(); this._bankCache = list; this._renderBankUI(list, '');
    },
    _renderBankUI(questions, keyword = '') {
        const app = document.getElementById('app');
        let filtered = questions;
        if (this._bankSubjectFilter !== 'all') filtered = filtered.filter(q => (q.subject || '默认题库') === this._bankSubjectFilter);
        if (this._bankChapterFilter !== 'all') filtered = filtered.filter(q => q.chapter === this._bankChapterFilter);
        if (keyword) { const k = keyword.toLowerCase(); filtered = filtered.filter(q => q.q.toLowerCase().includes(k) || (q.opts || []).some(o => o.toLowerCase().includes(k))); }
        const total = questions.length, filteredTotal = filtered.length;

        const subjects = [...new Set(questions.map(q => q.subject || '默认题库'))];
        const subjectBar = subjects.length > 0 ? `<div class="chapter-bar" style="border-bottom: none; margin-bottom: 0; padding-bottom: 4px;"><button class="chapter-chip ${this._bankSubjectFilter === 'all' ? 'active' : ''}" onclick="QuizApp.setBankSubject('all')">全部学科</button>${subjects.map(s => `<button class="chapter-chip ${this._bankSubjectFilter === s ? 'active' : ''}" onclick="QuizApp.setBankSubject('${this.escAttr(s)}')">${s}</button>`).join('')}</div>` : '';
        const chapters = [...new Set(filtered.map(q => q.chapter).filter(c => c && c.trim() && c !== '其他'))];
        const chapterBar = chapters.length > 0 ? `<div class="chapter-bar"><button class="chapter-chip ${this._bankChapterFilter === 'all' ? 'active' : ''}" onclick="QuizApp.setBankChapter('all')">全部章节 (${filteredTotal})</button>${chapters.map(c => `<button class="chapter-chip ${this._bankChapterFilter === c ? 'active' : ''}" onclick="QuizApp.setBankChapter('${this.escAttr(c)}')">${c} (${filtered.filter(q => q.chapter === c).length})</button>`).join('')}</div>` : '';

        let listHtml = '';
        if (total === 0) listHtml = `<div class="empty-state">暂无题目，点击右上角「添加题目」导入</div>`;
        else if (filteredTotal === 0) listHtml = `<div class="empty-state">没有符合条件的题目</div>`;
        else {
            listHtml = filtered.map((q, i) => {
                const ans = Array.isArray(q.a) ? q.a.map(x => q.opts[x]).join('、') : (q.opts[q.a] || q.a);
                const selected = this._bankSelected.includes(q.id); const checkbox = this._bankEditMode ? `<div class="q-checkbox ${selected ? 'checked' : ''}"></div>` : '';
                const clickHandler = this._bankEditMode ? `onclick="QuizApp.toggleSelectQ(${q.id})"` : '';
                const note = this.getNote(q.q); const noteDot = note ? `<span class="note-dot" title="有笔记">📝</span>` : ''; const notePreview = note ? `<div class="note-preview">${this.escapeHtml(note.text.substring(0, 60))}...</div>` : '';
                const actionsHtml = this._bankEditMode ? '' : `<div class="q-actions"><button class="note-btn-small" onclick="event.stopPropagation();QuizApp.openNoteModal('${this.escAttr(q.q)}')">${note ? '编辑笔记' : '笔记'}</button><button class="edit-btn" onclick="event.stopPropagation();QuizApp.editQuestion(${q.id})">编辑</button><button class="del-btn" onclick="event.stopPropagation();QuizApp.deleteQuestion(${q.id})">删除</button></div>`;
                return `<div class="q-item ${this._bankEditMode ? 'selectable' : ''} ${selected ? 'selected' : ''}" ${clickHandler}>${checkbox}<div class="q-num">第 ${i + 1} 题 ${noteDot}</div><div class="q-text">${q.q}</div>${notePreview}<div class="q-meta"><span class="q-answer">答案 ${ans}</span>${q.subject ? `<span class="q-chapter" style="color:#0071e3;border-color:rgba(0,113,227,0.3);">${q.subject}</span>` : ''}${q.chapter ? `<span class="q-chapter">${q.chapter}</span>` : ''}</div>${actionsHtml}</div>`;
            }).join('');
        }

        let bottomBar = '';
        if (this._bankEditMode) { const allSelected = filtered.length > 0 && filtered.every(q => this._bankSelected.includes(q.id)); bottomBar = `<div class="bank-bottom-bar"><button class="bottom-btn" onclick="QuizApp.selectAllQuestions()">${allSelected ? '取消全选' : '全选'}</button><button class="bottom-btn danger" onclick="QuizApp.deleteSelectedQuestions()" ${this._bankSelected.length === 0 ? 'disabled' : ''}>删除选中 (${this._bankSelected.length})</button><button class="bottom-btn" onclick="QuizApp.exitBankEditMode()">完成</button></div>`; }

        app.innerHTML = `<div class="page-card"><div class="bank-head"><div><div class="bank-title">题库</div><div class="bank-count">共 ${total} 道${this._bankChapterFilter !== 'all' ? ` · 当前章节 ${filteredTotal} 道` : ''}</div></div><div style="display:flex;gap:8px;">${total > 0 ? `<button class="add-btn" style="background:rgba(0,0,0,0.06);color:#1d1d1f;box-shadow:none;" onclick="QuizApp.${this._bankEditMode ? 'exitBankEditMode' : 'enterBankEditMode'}()">${this._bankEditMode ? '完成' : '选择'}</button>` : ''}<button class="add-btn" onclick="QuizApp.showAddQuestionModal()">添加题目</button></div></div>${subjectBar}${chapterBar}${total > 0 ? `<input class="search-box" type="text" placeholder="搜索题目..." value="${keyword}" oninput="QuizApp.onBankSearch(this.value)">` : ''}${listHtml}</div>${bottomBar}`;
    },
    setBankSubject(sub) { this._bankSubjectFilter = sub; this._bankChapterFilter = 'all'; this._bankSelected = []; this._renderBankUI(this._bankCache || [], ''); },
    setBankChapter(ch) { this._bankChapterFilter = ch; this._bankSelected = []; this._renderBankUI(this._bankCache || [], ''); },
    enterBankEditMode() { this._bankEditMode = true; this._bankSelected = []; this._renderBankUI(this._bankCache || [], ''); },
    exitBankEditMode() { this._bankEditMode = false; this._bankSelected = []; this._renderBankUI(this._bankCache || [], ''); },
    toggleSelectQ(id) { if (!this._bankEditMode) return; const i = this._bankSelected.indexOf(id); i > -1 ? this._bankSelected.splice(i, 1) : this._bankSelected.push(id); this._renderBankUI(this._bankCache || [], ''); },
    selectAllQuestions() {
        let filtered = this._bankCache || []; if (this._bankSubjectFilter !== 'all') filtered = filtered.filter(q => (q.subject || '默认题库') === this._bankSubjectFilter); if (this._bankChapterFilter !== 'all') filtered = filtered.filter(q => q.chapter === this._bankChapterFilter);
        const keyword = document.querySelector('#app .search-box') ? document.querySelector('#app .search-box').value.trim().toLowerCase() : '';
        if (keyword) filtered = filtered.filter(q => q.q.toLowerCase().includes(keyword) || (q.opts || []).some(o => o.toLowerCase().includes(keyword)));
        const all = filtered.every(q => this._bankSelected.includes(q.id)); this._bankSelected = all ? [] : filtered.map(q => q.id); this._renderBankUI(this._bankCache || [], keyword);
    },
    async deleteSelectedQuestions() {
        if (this._bankSelected.length === 0) return; 
        const ok = await this.showConfirm({ title: '批量删除', message: `确定删除选中的 ${this._bankSelected.length} 道题吗？`, confirmText: '删除', cancelText: '取消', danger: true }); 
        if (!ok) return;
        
        const ids = [...this._bankSelected]; 
        this.showToast(`正在删除 ${ids.length} 道...`);
        
        try {
            const res = await fetch('/api/questions-delete', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ user_id: this.getCurrentUser(), ids: ids }) 
            });
            const d = await res.json();
            if (d.ok) {
                this.showToast(`已删除 ${d.count} 道`);
            } else {
                this.showToast('删除失败');
            }
        } catch (e) { this.showToast('删除请求失败'); }

        this._bankSelected = []; 
        this.invalidateCache('bank'); 
        await this.fetchBank(true); 
        this._bankCache = this._cache.bank; 
        this._renderBankUI(this._bankCache, '');
    },
    onBankSearch(v) { if (this._bankSearchTimer) clearTimeout(this._bankSearchTimer); this._bankSearchTimer = setTimeout(() => { this._renderBankUI(this._bankCache || [], v); const inp = document.querySelector('#app .search-box'); if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); } }, 200); },

    showAddQuestionModal() {
        const modalRoot = document.getElementById('modalRoot');
        if (!modalRoot) { this.showToast('页面容器缺失，请刷新重试'); return; }
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'addQuestionModal';
        modal.innerHTML = `
            <div class="modal-card" style="max-width:520px;">
                <div class="modal-header">
                    <span class="modal-title">添加题目</span>
                    <button class="modal-close" onclick="QuizApp.closeModal('addQuestionModal')">✕</button>
                </div>
                <div style="margin-bottom: 12px; display: flex; gap: 10px;">
                    <input type="text" id="importSubject" class="search-box" style="flex:1; margin:0;" placeholder="输入学科/题库（如：高等数学）" value="默认题库">
                </div>
                
                <!-- ★ 新增：本地文件导入按钮 -->
                <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                    <button class="mini-btn" onclick="document.getElementById('importFileInput').click()">📂 选择本地文件导入</button>
                    <span style="font-size: 12px; color: #86868b;">支持 .json 或 .txt 文件</span>
                    <input type="file" id="importFileInput" accept=".json,.txt" style="display: none;" onchange="QuizApp.handleFileSelect(event)">
                </div>

                <div class="modal-hint">
                    粘贴 AI 生成的 JSON 代码，自动解析导入<br>
                    <strong>格式说明：</strong><br>
                    <code>[{"q":"题目","opts":["A","B"],"a":0,"chapter":"第一章"}]</code><br>
                    如果 JSON 里带了 <code>"subject":"学科名"</code>，会优先使用 JSON 里的。
                </div>
                <textarea class="modal-textarea" id="importCode" placeholder='[{"q":"示例题目","opts":["A","B","C","D"],"a":0,"chapter":"第一章"}]'></textarea>
                <div class="modal-btns">
                    <button class="btn-cancel" onclick="QuizApp.closeModal('addQuestionModal')">取消</button>
                    <button class="btn-primary" onclick="QuizApp.doImport()">导入</button>
                </div>
            </div>
        `;
        modalRoot.appendChild(modal);
        setTimeout(() => {
            const ta = document.getElementById('importCode');
            if (ta) ta.focus();
        }, 100);
    },

    // ★ 新增：处理文件读取
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            this.showToast('文件过大，请选择小于 2MB 的文件');
            event.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const ta = document.getElementById('importCode');
            if (ta) {
                ta.value = content;
                try {
                    const parsed = JSON.parse(content);
                    ta.value = JSON.stringify(parsed, null, 2);
                } catch (err) {}
                this.showToast('文件已读取，请确认后点击导入');
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    },
    async doImport() {
        const user = this.getCurrentUser(); if (!user) return this.showToast('请先登录');
        const ta = document.getElementById('importCode'), subjectInput = document.getElementById('importSubject'); if (!ta) return;
        let code = ta.value.trim(), defaultSubject = subjectInput ? subjectInput.value.trim() : '默认题库';
        
        if (!code) return this.showToast('请输入内容');
        code = code.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
        let arr; try { arr = JSON.parse(code); } catch (e) { 
            const m = code.match(/\[[\s\S]*\]/); 
            if (m) { try { arr = JSON.parse(m[0]); } catch (e2) { return this.showToast('JSON 格式错误'); } } 
            else return this.showToast('JSON 格式错误'); 
        }
        if (!Array.isArray(arr) || arr.length === 0) return this.showToast('必须是有效数组');

        const formattedQuestions = arr.map(item => ({
            q: item.q, opts: item.opts, a: item.a, 
            chapter: item.chapter || '', 
            subject: item.subject || defaultSubject
        }));

        this.closeModal('addQuestionModal');
        const toastMsg = document.createElement('div'); toastMsg.className = 'toast-item import-progress'; toastMsg.textContent = `正在上传 ${arr.length} 道题...`;
        const container = document.getElementById('toastContainer'); if (container) container.appendChild(toastMsg);

        try {
            const res = await fetch('/api/questions-add', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ user_id: user, questions: formattedQuestions }) 
            });
            const d = await res.json();
            if (d.ok) {
                this.showToast(`成功导入 ${d.count} 道题`);
            } else {
                this.showToast('导入失败：' + (d.error || '未知错误'));
            }
        } catch (e) {
            this.showToast('请求失败');
        }

        if (toastMsg.parentNode) toastMsg.remove();
        this.invalidateCache('bank'); await this.fetchBank(true); this._bankCache = this._cache.bank; this._renderBankUI(this._bankCache, '');
    },
    closeModal(id) { const el = document.getElementById(id); if (el) el.remove(); },
    async deleteQuestion(id) {
        const ok = await this.showConfirm({ title: '删除题目', message: '确定删除这道题吗？', confirmText: '删除', cancelText: '取消', danger: true }); if (!ok) return;
        try { await fetch('/api/questions-delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: this.getCurrentUser(), id }) }); this.showToast('已删除'); this.invalidateCache('bank'); await this.fetchBank(true); this._bankCache = this._cache.bank; this._renderBankUI(this._bankCache, ''); } catch (e) { this.showToast('删除失败'); }
    },
    async editQuestion(id) {
        const user = this.getCurrentUser(), q = (this._bankCache || []).find(x => x.id === id); if (!q) return;
        const newQ = prompt('编辑题目：', q.q); if (newQ === null) return;
        const newOptsRaw = prompt('编辑选项（逗号分隔）：', q.opts.join(', ')); if (newOptsRaw === null) return;
        const newOpts = newOptsRaw.split(',').map(s => s.trim()).filter(Boolean); if (newOpts.length < 2) return this.showToast('至少 2 个选项');
        const aRaw = prompt('正确答案序号（从0开始，多选用逗号）：', Array.isArray(q.a) ? q.a.join(',') : q.a); if (aRaw === null) return;
        let newA; const trimmed = aRaw.trim();
        if (trimmed.includes(',')) { const parts = trimmed.split(',').map(s => parseInt(s.trim())); if (parts.some(isNaN)) return this.showToast('格式错误'); newA = parts.filter(n => !isNaN(n)); if (newA.length < 2) return this.showToast('多选题至少 2 个答案'); }
        else { newA = parseInt(trimmed); if (isNaN(newA)) return this.showToast('序号无效'); }
        const validRange = Array.isArray(newA) ? newA.every(n => n >= 0 && n < newOpts.length) : (newA >= 0 && newA < newOpts.length); if (!validRange) return this.showToast('序号超出范围');
        const newSubject = prompt('所属学科（留空则不修改）：', q.subject || '默认题库');
        const newChapter = prompt('章节名称（留空则不修改）：', q.chapter || '');

        try {
            const res = await fetch('/api/questions-update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user, id, q: newQ, opts: newOpts, a: newA, subject: newSubject === null ? (q.subject || '默认题库') : newSubject, chapter: newChapter === null ? (q.chapter || '') : newChapter }) });
            const r = await res.json(); if (r.ok === false) return this.showToast('更新失败');
            this.showToast('已更新'); this.invalidateCache('bank'); await this.fetchBank(true); this._bankCache = this._cache.bank; this._renderBankUI(this._bankCache, '');
        } catch (e) { this.showToast('更新失败'); }
    },

    // ============================================================
    // 收藏页
    // ============================================================
    async renderFav() {
        const app = document.getElementById('app'); if (!this.getCurrentUser()) return app.innerHTML = `<div class="page-card empty-state">请先在「我的」页面登录</div>`;
        if (this._cache.fav) { this._renderFavUI(this._cache.fav); this.fetchFav(true).then(list => { if (this.currentTab === 'fav') this._renderFavUI(list); }); return; }
        app.innerHTML = this.skeletonHTML('fav'); const list = await this.fetchFav(); this._renderFavUI(list);
    },
    _renderFavUI(list) {
        const app = document.getElementById('app'), keyword = (this._favSearch || '').trim().toLowerCase();
        let filtered = list; if (keyword) filtered = filtered.filter(q => (q.q || '').toLowerCase().includes(keyword) || (q.opts || []).some(o => o.toLowerCase().includes(keyword)));

        const subjects = [...new Set(list.map(q => q.subject || '默认题库'))];
        const subjectBar = subjects.length > 0 ? `<div class="chapter-bar" style="border-bottom: none; margin-bottom: 0; padding-bottom: 4px;"><button class="chapter-chip ${this._favSubjectFilter === 'all' ? 'active' : ''}" onclick="QuizApp.setFavSubject('all')">全部学科</button>${subjects.map(s => `<button class="chapter-chip ${this._favSubjectFilter === s ? 'active' : ''}" onclick="QuizApp.setFavSubject('${this.escAttr(s)}')">${s}</button>`).join('')}</div>` : '';
        if (this._favSubjectFilter !== 'all') filtered = filtered.filter(q => (q.subject || '默认题库') === this._favSubjectFilter);

        let listHtml = '';
        if (list.length === 0) listHtml = `<div class="empty-state">暂无收藏题目</div>`;
        else if (filtered.length === 0) listHtml = `<div class="empty-state">没有匹配「${this._favSearch}」的题目</div>`;
        else {
            listHtml = filtered.map((q, i) => {
                const ans = Array.isArray(q.a) ? q.a.map(x => q.opts[x]).join('、') : (q.opts[q.a] || q.a);
                const selected = this._favSelected.includes(q.id); const checkbox = this._favEditMode ? `<div class="q-checkbox ${selected ? 'checked' : ''}"></div>` : '';
                const clickHandler = this._favEditMode ? `onclick="QuizApp.toggleSelectFav(${q.id})"` : '';
                const note = this.getNote(q.q); const noteDot = note ? `<span class="note-dot" title="有笔记">📝</span>` : ''; const notePreview = note ? `<div class="note-preview">${this.escapeHtml(note.text.substring(0, 60))}...</div>` : '';
                const actionsHtml = this._favEditMode ? '' : `<div class="q-actions"><button class="note-btn-small" onclick="event.stopPropagation();QuizApp.openNoteModal('${this.escAttr(q.q)}')">${note ? '编辑笔记' : '笔记'}</button><button class="del-btn" onclick="event.stopPropagation();QuizApp.removeFav(${q.id})">取消收藏</button></div>`;
                return `<div class="q-item ${this._favEditMode ? 'selectable' : ''} ${selected ? 'selected' : ''}" ${clickHandler}>${checkbox}<div class="q-num">第 ${i + 1} 题 ${noteDot}</div><div class="q-text">${q.q}</div>${notePreview}<div class="q-meta"><span class="q-answer">答案 ${ans}</span>${q.subject ? `<span class="q-chapter" style="color:#0071e3;border-color:rgba(0,113,227,0.3);">${q.subject}</span>` : ''}${q.chapter ? `<span class="q-chapter">${q.chapter}</span>` : ''}</div>${actionsHtml}</div>`;
            }).join('');
        }

        const practiceBtn = list.length > 0 && !this._favEditMode ? `<button class="add-btn" onclick="QuizApp.startFavorites()">开始练习收藏</button>` : '';
        const selectBtn = list.length > 0 ? `<button class="add-btn" style="background:rgba(0,0,0,0.06);color:#1d1d1f;box-shadow:none;" onclick="QuizApp.${this._favEditMode ? 'exitFavEditMode' : 'enterFavEditMode'}()">${this._favEditMode ? '完成' : '选择'}</button>` : '';
        const searchBox = list.length > 0 ? `<input class="search-box" type="text" placeholder="搜索收藏..." value="${this._favSearch || ''}" oninput="QuizApp.onFavSearch(this.value)">` : '';
        let bottomBar = '';
        if (this._favEditMode) { const allSelected = filtered.length > 0 && filtered.every(q => this._favSelected.includes(q.id)); bottomBar = `<div class="bank-bottom-bar"><button class="bottom-btn" onclick="QuizApp.selectAllFav()">${allSelected ? '取消全选' : '全选'}</button><button class="bottom-btn danger" onclick="QuizApp.deleteSelectedFav()" ${this._favSelected.length === 0 ? 'disabled' : ''}>取消收藏 (${this._favSelected.length})</button><button class="bottom-btn" onclick="QuizApp.exitFavEditMode()">完成</button></div>`; }

        app.innerHTML = `<div class="page-card"><div class="bank-head"><div><div class="bank-title">收藏</div><div class="bank-count">共 ${list.length} 道</div></div><div style="display:flex;gap:8px;">${selectBtn}${practiceBtn}</div></div>${subjectBar}${searchBox}${listHtml}</div>${bottomBar}`;
    },
    setFavSubject(sub) { this._favSubjectFilter = sub; this._renderFavUI(this._cache.fav || []); },
    enterFavEditMode() { this._favEditMode = true; this._favSelected = []; this._renderFavUI(this._cache.fav || []); },
    exitFavEditMode() { this._favEditMode = false; this._favSelected = []; this._renderFavUI(this._cache.fav || []); },
    toggleSelectFav(id) { if (!this._favEditMode) return; const i = this._favSelected.indexOf(id); i > -1 ? this._favSelected.splice(i, 1) : this._favSelected.push(id); this._renderFavUI(this._cache.fav || []); },
    selectAllFav() { let filtered = this._cache.fav || []; if (this._favSubjectFilter !== 'all') filtered = filtered.filter(q => (q.subject || '默认题库') === this._favSubjectFilter); const keyword = document.querySelector('#app .search-box') ? document.querySelector('#app .search-box').value.trim().toLowerCase() : ''; if (keyword) filtered = filtered.filter(q => q.q.toLowerCase().includes(keyword) || (q.opts || []).some(o => o.toLowerCase().includes(keyword))); const all = filtered.every(q => this._favSelected.includes(q.id)); this._favSelected = all ? [] : filtered.map(q => q.id); this._renderFavUI(this._cache.fav || []); },
    async deleteSelectedFav() {
        if (this._favSelected.length === 0) return; const ok = await this.showConfirm({ title: '批量取消收藏', message: `确定取消收藏选中的 ${this._favSelected.length} 道题吗？`, confirmText: '取消收藏', cancelText: '再想想', danger: true }); if (!ok) return;
        const ids = [...this._favSelected]; this.showToast(`处理 ${ids.length} 道...`);
        const results = await Promise.all(ids.map(id => fetch('/api/favorites-remove', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: this.getCurrentUser(), question_id: id }) }).then(r => r.json()).then(d => d.ok !== false).catch(() => false)));
        this.showToast(`已取消 ${results.filter(Boolean).length} 道`); this._favSelected = []; this.invalidateCache('fav'); this._cache.fav = (this._cache.fav || []).filter(q => !ids.includes(q.id)); this._renderFavUI(this._cache.fav);
    },
    onFavSearch(v) { this._favSearch = v; if (this._favSearchTimer) clearTimeout(this._favSearchTimer); this._favSearchTimer = setTimeout(() => { this._renderFavUI(this._cache.fav || []); const inp = document.querySelector('#app .search-box'); if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); } }, 200); },
    async removeFav(qid) { const ok = await this.showConfirm({ title: '取消收藏', message: '确定要取消收藏这道题吗？', confirmText: '取消收藏', cancelText: '再想想' }); if (!ok) return; try { await fetch('/api/favorites-remove', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: this.getCurrentUser(), question_id: qid }) }); this.showToast('已取消收藏'); this.invalidateCache('fav'); this._cache.fav = (this._cache.fav || []).filter(q => q.id !== qid); this._renderFavUI(this._cache.fav); } catch (e) { this.showToast('操作失败'); } },

    // ============================================================
    // 我的页 & 设置 & 进度
    // ============================================================
    async renderMe() {
        const app = document.getElementById('app'), user = this.getCurrentUser();
        let totalQ = 0, wrongN = 0, favN = 0, masteredN = 0;
        if (user) {
            try {
                const [bankList, wrongList, favList] = await Promise.all([this.fetchBank(), this.fetchWrong(), this.fetchFav()]);
                totalQ = bankList.length; wrongN = wrongList.length; favN = favList.length;
                const mKey = `quiz_mastered_${user}`; let mastered = {}; try { mastered = JSON.parse(localStorage.getItem(mKey) || '{}'); } catch (e) {}
                masteredN = wrongList.filter(w => mastered[w.q]).length;
            } catch (e) {}
        }
        const theme = localStorage.getItem('quiz_theme') || 'light', s = this._settingsCache || (this._settingsCache = this.loadSettings());
        const initial = user ? user.charAt(0).toUpperCase() : '?', vibSupported = this.isVibrationSupported();
        const customColor = localStorage.getItem('quiz_custom_bg_color') || '#e8eef7', hasCustomImg = !!localStorage.getItem('quiz_custom_bg_image');
        const hasCustomBg = !!(localStorage.getItem('quiz_custom_bg_color') || localStorage.getItem('quiz_custom_bg_image'));

       app.innerHTML = `<div class="page-card"><div class="profile-header"><div class="avatar">${user ? initial : ''}</div><div class="user-name">${user || '未登录'}</div><div class="user-sub">${user ? '已登录' : '登录后可同步数据'}</div>${user ? `<div class="stats-grid"><div class="stat-box"><div class="sv">${totalQ}</div><div class="sl">题库</div></div><div class="stat-box"><div class="sv">${wrongN}</div><div class="sl">错题</div></div><div class="stat-box"><div class="sv">${masteredN}</div><div class="sl">已掌握</div></div><div class="stat-box"><div class="sv">${favN}</div><div class="sl">收藏</div></div></div>` : `<button class="glass-btn primary" style="margin-top:20px;" onclick="QuizApp.loginNow()">登录账号</button>`}</div>${user ? `<div><div class="setting-row"><span class="setting-label">主题</span><div class="theme-btns"><button class="theme-btn ${theme === 'light' ? 'active' : ''}" onclick="QuizApp.setTheme('light')">明亮</button><button class="theme-btn ${theme === 'dark' ? 'active' : ''}" onclick="QuizApp.setTheme('dark')">夜间</button><button class="theme-btn ${theme === 'eye' ? 'active' : ''}" onclick="QuizApp.setTheme('eye')">护眼</button></div></div><div class="setting-row"><span class="setting-label">🔐 密码管理</span><button class="mini-btn" onclick="QuizApp.showChangePasswordModal()">修改密码</button></div><div class="setting-row"><span class="setting-label">震动反馈 ${!vibSupported ? '<span class="setting-note">设备不支持</span>' : ''}</span><label class="toggle-switch ${!vibSupported ? 'disabled' : ''}"><input type="checkbox" ${s.vibration ? 'checked' : ''} ${!vibSupported ? 'disabled' : ''} onchange="QuizApp.setVibration(this.checked)"><span class="toggle-slider"></span></label></div><div class="setting-row"><span class="setting-label">自动跳转延迟</span><select onchange="QuizApp.setAutoDelay(parseInt(this.value))">${[200,400,600,800,1000].map(v => `<option value="${v}" ${s.autoDelay === v ? 'selected' : ''}>${v}ms</option>`).join('')}</select></div><div class="setting-row"><span class="setting-label">连续答对提示</span><label class="toggle-switch"><input type="checkbox" ${s.streakAlert ? 'checked' : ''} onchange="QuizApp.setStreakAlert(this.checked)"><span class="toggle-slider"></span></label></div><div class="setting-row"><span class="setting-label">背景颜色</span><div class="color-picker-wrap"><input type="color" class="color-picker" value="${customColor}" onchange="QuizApp.applyCustomBgColor(this.value)"><span class="color-value">${customColor}</span></div></div><div class="setting-row"><span class="setting-label">背景图片</span><button class="mini-btn" onclick="QuizApp.uploadBgImage()">${hasCustomImg ? '更换图片' : '选择图片'}</button></div><div class="setting-row"><span class="setting-label">重置背景</span><button class="mini-btn danger" onclick="QuizApp.resetCustomBg()" ${!hasCustomBg ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>恢复默认</button></div></div><button class="logout-btn" onclick="QuizApp.logout()">退出账号</button>` : ''}</div>`;
    loadSettings() { const s = { theme: 'light', vibration: true, autoDelay: 200, streakAlert: true }; try { Object.assign(s, JSON.parse(localStorage.getItem('quiz_settings') || '{}')); } catch (e) {} this._vibrationEnabled = s.vibration; this._autoDelay = s.autoDelay; this._streakAlertEnabled = s.streakAlert; return s; },
    saveSettings() { localStorage.setItem('quiz_settings', JSON.stringify(this._settingsCache || {})); },
    loadTheme() { const t = localStorage.getItem('quiz_theme') || 'light'; document.body.classList.remove('theme-dark', 'theme-eye'); if (t === 'dark') document.body.classList.add('theme-dark'); else if (t === 'eye') document.body.classList.add('theme-eye'); },
    setTheme(t) { localStorage.setItem('quiz_theme', t); this.loadTheme(); if (this.currentTab === 'me') this.renderMe(); },
    setVibration(v) { if (!this.isVibrationSupported()) return this.showToast('设备不支持震动'); this._settingsCache = this._settingsCache || {}; this._settingsCache.vibration = v; this._vibrationEnabled = v; this.saveSettings(); this.showToast(v ? '震动已开启' : '震动已关闭'); if (v) this.vibrate(10); },
    setAutoDelay(v) { this._settingsCache = this._settingsCache || {}; this._settingsCache.autoDelay = v; this._autoDelay = v; this.saveSettings(); this.showToast(`延迟已设为 ${v}ms`); },
    setStreakAlert(v) { this._settingsCache = this._settingsCache || {}; this._settingsCache.streakAlert = v; this._streakAlertEnabled = v; this.saveSettings(); this.showToast(v ? '连续提示已开启' : '连续提示已关闭'); },

    getProgress(user) { try { return JSON.parse(localStorage.getItem(`quiz_progress_${user}`) || '{"sequential_index":0}'); } catch (e) { return { sequential_index: 0 }; } },
    saveProgress(user, data) { localStorage.setItem(`quiz_progress_${user}`, JSON.stringify({ ...this.getProgress(user), ...data })); },
    getRecentQuestions(user) { try { return JSON.parse(localStorage.getItem(`quiz_recent_${user}`) || '[]'); } catch (e) { return []; } },
    saveRecentQuestions(user, ids) { let recent = this.getRecentQuestions(user); recent = [...new Set([...ids, ...recent])].slice(0, 100); localStorage.setItem(`quiz_recent_${user}`, JSON.stringify(recent)); },
    saveSessionContext() { if (this._isRestoring || !this.activeBank.length || !this.getCurrentUser()) return; localStorage.setItem(`quiz_session_${this.getCurrentUser()}`, JSON.stringify({ ids: this.activeBank.map(q => q.id), records: this.record.slice(), idx: this.idx, isRandom: this._isRandom, limit: this._currentLimit, source: this._source, chapters: this._selectedChapters, isWrong: this._source === 'wrong', isFavorites: this._isFavoritesMode, timestamp: Date.now() })); },
    clearSessionContext() { const user = this.getCurrentUser(); if (user) localStorage.removeItem(`quiz_session_${user}`); },
    async restoreSession() {
        const user = this.getCurrentUser(); if (!user) return; const raw = localStorage.getItem(`quiz_session_${user}`); if (!raw) return;
        let ctx; try { ctx = JSON.parse(raw); } catch (e) { return; }
        if (Date.now() - ctx.timestamp > 86400000) return localStorage.removeItem(`quiz_session_${user}`);
        try {
            let active = [];
            if (ctx.isWrong || ctx.source === 'wrong') {
                const wrongRaw = await this.fetchWrong(true), map = {};
                for (const w of wrongRaw) { const key = w.q || String(w.id); if (!map[key]) map[key] = { id: w.id, q: w.q, opts: w.opts || [], a: w.a, answer: w.answer, subject: w.subject || '默认题库', chapter: w.chapter || '', wrongCount: 0, lastWrongAt: null, mastered: false }; map[key].wrongCount++; const t = w.created_at || w.time || null; if (t && (!map[key].lastWrongAt || t > map[key].lastWrongAt)) map[key].lastWrongAt = t; }
                const wrongList = Object.values(map); this._wrongList = wrongList; const idMap = {};
                wrongList.forEach(w => idMap[w.id] = { id: w.id, q: w.q, opts: w.opts, a: w.a, subject: w.subject, chapter: w.chapter, _isWrong: true, _wrongId: w.id });
                active = ctx.ids.map(id => idMap[id]).filter(Boolean);
            } else if (ctx.isFavorites) { const favList = await this.fetchFav(true), idMap = {}; favList.forEach(q => idMap[q.id] = q); active = ctx.ids.map(id => idMap[id]).filter(Boolean); } 
            else { const bank = await this.fetchBank(true), idMap = {}; bank.forEach(q => idMap[q.id] = q); active = ctx.ids.map(id => idMap[id]).filter(Boolean); }
            if (active.length === 0) { this.showToast('原题目已不存在'); return localStorage.removeItem(`quiz_session_${user}`); }
            this.activeBank = active; this.record = ctx.records.slice(0, active.length); while (this.record.length < active.length) this.record.push(null);
            this.idx = Math.min(ctx.idx, active.length - 1); this._isRandom = ctx.isRandom; this._currentLimit = ctx.limit; this._source = ctx.source;
            this._selectedChapters = ctx.chapters || []; this._isChapterMode = this._selectedChapters.length > 0; this._isFavoritesMode = !!ctx.isFavorites;
            this._isRestoring = true; this._inQuiz = true;
            document.getElementById('home').style.display = 'none'; document.getElementById('app').style.display = 'block'; document.getElementById('app').className = 'page';
            this.renderCard(false); this._isRestoring = false; this.showToast(`已恢复（第 ${this.idx + 1}/${active.length} 题）`);
        } catch (e) { console.error(e); this.showToast('恢复失败'); }
    },
    async checkSmartPrompts() { if (!this.getCurrentUser()) return; if (!localStorage.getItem('quiz_has_used')) { setTimeout(() => { this.showToast('点击屏幕中央开始刷题', 4000); localStorage.setItem('quiz_has_used', '1'); }, 1000); } },

    showToast(message, duration = 2000) {
        const container = document.getElementById('toastContainer'); if (!container) return;
        const item = document.createElement('div'); item.className = 'toast-item'; item.textContent = message; container.appendChild(item);
        setTimeout(() => { item.style.opacity = '0'; item.style.transition = 'opacity 0.3s'; setTimeout(() => item.remove(), 300); }, duration);
        while (container.children.length > 3) container.firstChild.remove();
    },
    bindKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            const k = e.key.toLowerCase(), app = document.getElementById('app');
            if (this.currentTab === 'home' && app && app.style.display === 'none') {
                if (k === 's') { e.preventDefault(); this.chooseMode('sequential'); } if (k === 'r') { e.preventDefault(); this.chooseMode('random'); }
                if (k === 'w') { e.preventDefault(); this.switchTab('wrong'); } if (k === 'm') { e.preventDefault(); this.switchTab('bank'); }
                if (k === 'h') { e.preventDefault(); this.goHome(); } if (k === 't') { e.preventDefault(); this.setTheme(['light', 'dark', 'eye'][( ['light', 'dark', 'eye'].indexOf(localStorage.getItem('quiz_theme') || 'light') + 1) % 3]); }
                if (k === 'f') { e.preventDefault(); if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); } if (e.key === '?') { e.preventDefault(); this.openShortcutHelp(); }
                return;
            }
            const num = parseInt(e.key); if (num >= 1 && num <= 4) { const opts = document.querySelectorAll('.opt:not(.correct):not(.wrong):not(.selected)'); if (opts[num - 1]) opts[num - 1].click(); }
            if (e.key === 'ArrowLeft') this.prevQuestion(); if (e.key === 'ArrowRight') this.nextQuestion();
            if (e.key === 'Escape') { document.querySelectorAll('.modal-overlay').forEach(m => { if (m.id === 'quantityModal' || m.id === 'shortcutHelp') m.style.display = 'none'; else m.remove(); }); this.closeQuantityModal(); this.closeShortcutHelp(); }
            if (e.key === '?') { e.preventDefault(); this.openShortcutHelp(); }
        });
    },
    openShortcutHelp() { const el = document.getElementById('shortcutHelp'); if (el) el.style.display = 'flex'; },
    closeShortcutHelp() { const el = document.getElementById('shortcutHelp'); if (el) el.style.display = 'none'; },
    applyCustomBg(c) { this.applyCustomBgColor(c); }, applyCustomBgFromSettings(c) { this.applyCustomBgColor(c); },
    updateBgOpacity(v) { const el = document.getElementById('opacityValue'); if (el) el.textContent = v + '%'; },
    updateBgBlur(v) { const el = document.getElementById('blurValue'); if (el) el.textContent = v + 'px'; },
    dismissTooltip() { const el = document.getElementById('tooltipBubble'); if (el) el.style.display = 'none'; },
    setThemeFromSettings(t) { this.setTheme(t); }, toggleSettings() {},
    checkLoginBeforeGo(url) { if (!this.getCurrentUser()) { this.showToast('请先登录'); return false; } window.location.href = url; return false; }
};

// ============================================================
// 启动
// ============================================================
window.addEventListener('DOMContentLoaded', () => { QuizApp.init(); });
