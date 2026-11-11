var Le=Object.defineProperty;var qe=(t,e,a)=>e in t?Le(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var Ft=(t,e,a)=>qe(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const qt="oq:",Tt="oq:user",It="oq:token",Te={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},E={...Te,..._("settings",{})};["auto","light","dark","eye"].includes(E.theme)||(E.theme="auto");function _(t,e){try{const a=localStorage.getItem(qt+t);return a===null?e:JSON.parse(a)}catch{return e}}function P(t,e){try{localStorage.setItem(qt+t,JSON.stringify(e))}catch{}}function At(t){try{localStorage.removeItem(qt+t)}catch{}}function dt(t){Object.assign(E,t),P("settings",E)}function Ie(t){dt({theme:t})}function L(){return _(Tt,"")||""}function ee(t){P(Tt,t)}function Me(){At(Tt),At(It)}function Mt(){return _(It,"")||""}function ae(t){P(It,t)}function B(t){return`u:${L()||"anon"}:${t}`}function Nt(){return _(B("notes"),{})}function Ne(t,e){const a=Nt(),n=String(t);e.trim()?a[n]=e:delete a[n],P(B("notes"),a)}function ne(){const t=_(B("progress"),{});return Number(t.sequential_index)||0}function Ce(t){P(B("progress"),{sequential_index:t,updatedAt:Date.now()})}function se(){const t=_(B("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function Oe(t){P(B("session"),t)}function re(){At(B("session"))}function ie(){return _(B("recent"),[])}function De(t){const e=[...t,...ie()].slice(0,30);P(B("recent"),Array.from(new Set(e)))}function oe(){return _("appearance",{color:"",image:"",dim:.35})}function _e(t){P("appearance",{...oe(),...t})}function Pe(){return _("welcomed","")===new Date().toDateString()}function Be(){P("welcomed",new Date().toDateString())}const Re={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function d(t){return String(t??"").replace(/[&<>"']/g,e=>Re[e]??e)}const Ue=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function He(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function rt(t){const e=He(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return d(e).replace(/\n/g,"<br>");const n=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!n)return d(e);const s=i=>{if(i.nodeType===Node.TEXT_NODE)return d(i.textContent??"").replace(/\n/g,"<br>");if(i.nodeType!==Node.ELEMENT_NODE)return"";const r=i,c=r.tagName,u=Array.from(r.childNodes).map(s).join("");if(!Ue.has(c))return u;if(c==="IMG"){const f=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(f))return"";const h=d(r.getAttribute("alt")??"");return`<img src="${d(f)}" alt="${h}" loading="lazy" referrerpolicy="no-referrer">`}const m=c.toLowerCase();return`<${m}>${u}</${m}>`};return Array.from(n.childNodes).map(s).join("")}function R(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function it(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(a=>Number.isInteger(a)))).sort((a,n)=>a-n)}function j(t){return typeof t=="string"}function V(t,e=[]){return typeof t=="string"?t:it(t).map(a=>{const n=String.fromCharCode(65+a),s=(e[a]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${n}. ${s}`:n}).join("、")}function ce(t){const e=[...t];for(let a=e.length-1;a>0;a-=1){const n=Math.floor(Math.random()*(a+1));[e[a],e[n]]=[e[n],e[a]]}return e}function ze(t,e){const a=it(e);if(!a.length||t.length!==a.length)return!1;const n=[...new Set(t)].sort((s,i)=>s-i);return n.length===a.length&&n.every((s,i)=>s===a[i])}function Fe(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const a=JSON.parse(e);if(typeof a=="number")return a;if(Array.isArray(a))return a.map(Number).filter(Number.isInteger);if(typeof a=="string")return a}catch{}return e}return""}class $ extends Error{constructor(a,n){super(n);Ft(this,"status");this.name="ApiError",this.status=a}}let Ct=null;function We(t){Ct=t}async function le(t,e={}){const a=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&a.set("Content-Type","application/json");const n=Mt();n&&a.set("Authorization",`Bearer ${n}`),a.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:a})}catch{throw new $(0,"网络连接失败，请检查网络后重试")}const i=s.headers.get("content-type")??"";let r=null;i.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const c=r??{};if(s.status===401)throw Ct?.(),new $(401,typeof c.error=="string"?c.error:"登录已过期，请重新登录");if(!s.ok||c.ok===!1){const u=typeof c.error=="string"&&c.error?c.error:`请求失败（HTTP ${s.status}）`;throw new $(s.status,u)}return r}const gt=t=>le(t),S=(t,e)=>le(t,{method:"POST",body:JSON.stringify(e)});async function Je(t,e,a){const n=new Headers({"Content-Type":"application/json"}),s=Mt();s&&n.set("Authorization",`Bearer ${s}`);const i=await fetch("/api/ai",{method:"POST",headers:n,body:JSON.stringify({...t,stream:!0}),signal:a});if(!i.ok||!i.body){const p=await i.json().catch(()=>({}));if(i.status===401)throw Ct?.(),new $(401,"登录已过期，请重新登录");if(typeof p.result=="string")return e(p.result),{text:p.result,cached:!1,provider:typeof p.provider=="string"?p.provider:void 0};throw new $(i.status,typeof p.error=="string"?p.error:"AI 解析失败")}const r=i.body.getReader(),c=new TextDecoder;let u="",m="",f=!1,h;for(;;){const{value:p,done:x}=await r.read();if(x)break;u+=c.decode(p,{stream:!0});const N=u.split(`

`);u=N.pop()??"";for(const z of N){const F=z.split(`
`).find(ct=>ct.startsWith("data:"));if(!F)continue;let A;try{A=JSON.parse(F.slice(5).trim())}catch{continue}if(typeof A.delta=="string"&&A.delta&&(m+=A.delta,e(A.delta)),typeof A.error=="string")throw new $(502,A.error);A.done&&(f=A.cached===!0,typeof A.provider=="string"&&(h=A.provider))}}return{text:m,cached:f,provider:h}}function Et(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:Fe(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function Ke(t){return{...Et(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}const w={auth:{check:t=>S("/api/auth",{action:"check",username:t}),set:(t,e)=>S("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>S("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>S("/api/auth",{action:"change",username:L(),oldPassword:t,newPassword:e})},questions:{async list(){const t=L();if(!t)return[];const e=await gt(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>Et(n))},add:t=>S("/api/questions-add",{user_id:L(),questions:t}),update:(t,e)=>S("/api/questions-update",{id:t,user_id:L(),...e}),remove:t=>S("/api/questions-delete",{ids:t,user_id:L()})},wrong:{async list(){const t=L();if(!t)return[];const e=await gt(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>Ke(n))},add:t=>S("/api/wrong-add",{user_id:L(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""}),remove:t=>S("/api/wrong-delete",{ids:t,user_id:L()})},favorites:{async list(){const t=L();if(!t)return[];const e=await gt(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>Et(n))},add:t=>S("/api/favorites-add",{user_id:L(),question_id:t}),remove:t=>S("/api/favorites-remove",{user_id:L(),question_id:t})},ai:{explain:t=>S("/api/ai",{action:"explain",prompt:t}),grade:t=>S("/api/ai",{action:"grade",prompt:t}),extract:t=>S("/api/ai",{action:"extract",...t}),classify:t=>S("/api/ai",{action:"classify",prompt:t}),explainStream:(t,e,a)=>Je({action:"explain",prompt:t},e,a)}};let C=null;function Ge(){return C&&document.body.contains(C)||(C=document.createElement("div"),C.className="toast-host",C.setAttribute("role","status"),C.setAttribute("aria-live","polite"),document.body.appendChild(C)),C}function ht(t,e="info",a=2600){if(!t)return;const n=document.createElement("div");n.className=`toast toast-${e}`,n.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${d(t)}</span>`,Ge().appendChild(n),requestAnimationFrame(()=>n.classList.add("in")),window.setTimeout(()=>{n.classList.remove("in"),window.setTimeout(()=>n.remove(),220)},a)}const l={info:t=>ht(t,"info"),ok:t=>ht(t,"success"),error:t=>ht(t,"error",3200)},jt=[{id:"home",label:"首页",icon:"⌂"},{id:"bank",label:"题库",icon:"▤"},{id:"wrong",label:"错题",icon:"⚑"},{id:"fav",label:"收藏",icon:"★"},{id:"me",label:"我的",icon:"☺"}],Wt=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],o={tab:"home",user:L(),token:Mt(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},Z=new Map;function lt(t,e){return Z.has(t)||Z.set(t,new Set),Z.get(t).add(e),()=>Z.get(t)?.delete(e)}function k(t){Z.get(t)?.forEach(e=>e())}function Ot(t){o.tab!==t&&(o.tab=t,k("nav"))}const de=window.matchMedia("(prefers-color-scheme: dark)");function Jt(){return E.theme==="auto"?de.matches?"dark":"light":E.theme}function Dt(){document.documentElement.dataset.theme=Jt();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=Jt()==="dark"?"#0b0c0f":"#f4f5f7")}function Qe(t){Ie(t),Dt()}de.addEventListener("change",()=>{E.theme==="auto"&&Dt()});function Ve(t){_e(t)}function _t(){const{color:t,image:e,dim:a}=oe(),n=document.body;n.style.backgroundImage=e?`url("${e}")`:"",n.style.backgroundSize="cover",n.style.backgroundPosition="center",n.style.backgroundAttachment="fixed",n.dataset.dim=String(a),t&&!e?n.style.backgroundColor=t:n.style.backgroundColor=""}async function Xe(t,e){const a=await w.auth.login(t,e);ae(a.token),ee(t),o.user=t,o.token=a.token,o.authed=!0,U(),k("auth")}async function Ye(t,e){const a=await w.auth.set(t,e);ae(a.token),ee(t),o.user=t,o.token=a.token,o.authed=!0,U(),k("auth")}function ue(){o.user="",o.token="",o.authed=!1,o.bank=null,o.wrong=null,o.favs=null,o.favoriteIds=new Set,Me(),re(),k("auth")}const Ze=300*1e3,W={bank:0,wrong:0,fav:0},ut=new Map;function U(t){t?(W[t]=0,t==="bank"&&(o.bank=null),t==="wrong"&&(o.wrong=null),t==="fav"&&(o.favs=null)):(W.bank=W.wrong=W.fav=0,o.bank=null,o.wrong=null,o.favs=null)}function ta(t,e){const a=ut.get(t);if(a)return a;const n=e().finally(()=>ut.delete(t));return ut.set(t,n),n}async function Pt(t,e,a,n){if(!o.user)return[];const s=ut.get(t);if(s)return s;const i=Date.now()-W[t]<Ze;if(!e&&i)return[];o.loading[t]=!0,k("data");try{const r=await ta(t,a);return n(r),W[t]=Date.now(),r}catch(r){throw r instanceof $&&r.status!==401&&l.error(r.message),r}finally{o.loading[t]=!1,k("data")}}async function K(t=!1){try{await Pt("bank",t,()=>w.questions.list(),e=>{o.bank=e})}catch{}return o.bank??[]}async function G(t=!1){try{await Pt("wrong",t,()=>w.wrong.list(),e=>{o.wrong=e})}catch{}return o.wrong??[]}async function nt(t=!1){try{await Pt("fav",t,()=>w.favorites.list(),e=>{o.favs=e,o.favoriteIds=new Set(e.map(a=>a.id))})}catch{}return o.favs??[]}function pt(t){return o.favoriteIds.has(t)}async function ea(t){const e=!pt(t);try{return e?await w.favorites.add(t):await w.favorites.remove(t),e?o.favoriteIds.add(t):o.favoriteIds.delete(t),o.favs=null,W.fav=0,l.ok(e?"已加入收藏":"已取消收藏"),k("data"),e}catch(a){return l.error(a instanceof $?a.message:"操作失败"),pt(t)}}function aa(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${Wt[Math.floor(Math.random()*Wt.length)]}`}function tt(t){Ve(t),_t()}const b={step:"name",username:"",busy:!1,error:""};function na(){b.step="name",b.username="",b.busy=!1,b.error=""}function sa(){const t=`
    <div class="auth-brand">
      <div class="brand-mark">原</div>
      <div>
        <div class="auth-title">原点 · Origin</div>
        <div class="brand-sub">刷题 · 错题 · 收藏</div>
      </div>
    </div>`,e=b.error?`<div class="auth-error" role="alert">${d(b.error)}</div>`:"";if(b.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${d(b.username)}" required>
            </label>
            ${e}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${b.busy?"disabled":""}>
              ${b.busy?"检查中…":"继续"}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;const a=b.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${a?"为":"欢迎回来，"} <strong>${d(b.username)}</strong>${a?" 设置一个密码":""}</p>
        <form class="stack" data-form="${a?"create":"login"}">
          <label class="field">
            <span class="field-label">密码</span>
            <input class="input" name="password" type="password" autocomplete="${a?"new-password":"current-password"}"
                   placeholder="至少 6 位" minlength="6" required>
          </label>
          ${a?`<label class="field">
                   <span class="field-label">再输一次</span>
                   <input class="input" name="confirm" type="password" autocomplete="new-password" placeholder="确认密码" minlength="6" required>
                 </label>`:""}
          ${e}
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${b.busy?"disabled":""}>
            ${b.busy?"请稍候…":a?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${b.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function pe(t,e){if(t==="back")return b.step="name",b.error="",!0;if(t==="submit"){const a=e,n=new FormData(a);if(b.step==="name"){const i=String(n.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(i))return b.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;b.busy=!0,b.error="";try{const{hasPassword:r}=await w.auth.check(i);b.username=i,b.step=r?"password":"create"}catch(r){b.error=r instanceof $?r.message:"网络异常，请重试"}finally{b.busy=!1}return!0}if(b.busy)return!0;const s=String(n.get("password")??"");if(b.step==="create"){const i=String(n.get("confirm")??"");if(s!==i)return b.error="两次输入的密码不一致",!0}if(s.length<6)return b.error="密码至少 6 位",!0;b.busy=!0,b.error="";try{b.step==="create"?await Ye(b.username,s):await Xe(b.username,s),l.ok(b.step==="create"?"账号已创建，开始刷题吧":`欢迎回来，${o.user}`),na()}catch(i){b.error=i instanceof $?i.message:"登录失败，请重试"}finally{b.busy=!1}return!0}return!1}let q=null,et=0;function fe(){return q&&document.body.contains(q)||(q=document.createElement("div"),q.className="modal-root",q.setAttribute("role","dialog"),q.setAttribute("aria-modal","true"),document.body.appendChild(q)),q}function ra(){et+=1,document.body.classList.add("is-locked")}function ia(){et=Math.max(0,et-1),et===0&&document.body.classList.remove("is-locked")}function be(){fe().innerHTML="",et=0,document.body.classList.remove("is-locked")}function I(t){const e=fe(),a=t.dismissible!==!1;return new Promise(n=>{let s=!1;const i=p=>{s||(s=!0,h(),r.classList.remove("open"),window.setTimeout(()=>{r.remove(),ia()},200),n(p))},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${a?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${d(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${d(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((p,x)=>`<button class="btn btn-${p.variant??"ghost"}" data-idx="${x}">${d(p.label)}</button>`).join("")}</div>`:""}
      </div>`;const c=r.querySelector(".modal-card"),u=c.querySelector(".modal-body");typeof t.body=="string"?u.innerHTML=t.body:t.body&&u.appendChild(t.body);const m=p=>{p.key==="Escape"&&a&&(p.stopPropagation(),i(null))},f=p=>{const x=p.target;if(x.closest("[data-close]")&&a){i(null);return}const N=x.closest("[data-idx]");if(!N)return;const z=t.actions?.[Number(N.dataset.idx)];z&&(z.keepOpen||i(z.value))},h=()=>{document.removeEventListener("keydown",m,!0),r.removeEventListener("click",f),q&&q.children.length===0&&q.classList.remove("open")};r.addEventListener("click",f),document.addEventListener("keydown",m,!0),e.appendChild(r),e.classList.add("open"),ra(),t.onMount?.(c),requestAnimationFrame(()=>{r.classList.add("open");const p=c.querySelector("input, textarea, button.btn-primary, button");p&&window.matchMedia("(pointer: fine)").matches&&p.focus({preventScroll:!0})})})}function mt(t){return I({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}const g={search:"",subject:"all",edit:!1,selected:new Set};function me(){g.search="",g.subject="all",g.edit=!1,g.selected.clear()}function ot(){return o.bank??[]}function oa(){return["all",...Array.from(new Set(ot().map(t=>t.subject||"默认题库")))]}function ca(){const t=g.search.trim().toLowerCase();return ot().filter(e=>g.subject!=="all"&&(e.subject||"默认题库")!==g.subject?!1:t?R(e.q).toLowerCase().includes(t)||e.opts.some(a=>R(a).toLowerCase().includes(t)):!0)}function ve(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(a=>String.fromCharCode(65+a)).join(" / ")}function la(){const t=ca(),e=oa().map(n=>`<button class="chip" data-act="subject" data-subject="${d(n)}" aria-pressed="${g.subject===n}">
          ${n==="all"?"全部":d(n)}
        </button>`).join(""),a=o.loading.bank&&!o.bank?`<div class="list">${Array.from({length:4}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(n=>`
          <div class="item ${g.edit?"selectable":""}" data-id="${n.id}" data-checked="${g.selected.has(n.id)}">
            ${g.edit?`<span class="checkbox" data-act="select" data-id="${n.id}">✓</span>`:""}
            <div class="item-q">${rt(n.q)}</div>
            <div class="item-meta">
              ${n.subject?`<span class="tag tag-accent">${d(n.subject)}</span>`:""}
              ${n.chapter?`<span class="tag">${d(n.chapter)}</span>`:""}
              <span class="tag tag-ok">答案 ${d(ve(n))}</span>
              <span class="grow"></span>
              ${g.edit?"":`<button class="btn btn-sm btn-ghost" data-act="edit" data-id="${n.id}">编辑</button>`}
            </div>
          </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${g.search?"没有匹配的题目":"题库还是空的"}</div><div class="empty-desc">${g.search?"换个关键词试试":"点右上角「＋」添加，或用 AI 从图片导入"}</div></div>`;return`
    <h1 class="page-title">题库</h1>
    <div class="row" style="margin-bottom:12px">
      <div class="search-box grow">
        <span class="ico">⌕</span>
        <input type="search" placeholder="搜索题目或选项" data-role="search" value="${d(g.search)}" enterkeyhint="search">
      </div>
      <button class="icon-btn" data-act="add" aria-label="添加题目">＋</button>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${g.edit?"✓":"☰"}</button>
    </div>
    <div class="chips">${e}</div>
    ${g.edit?`<div class="row between" style="margin-bottom:12px">
        <span class="muted small">已选 ${g.selected.size} 题</span>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export">导出</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${g.selected.size?"":"disabled"}>删除</button>
        </div>
      </div>`:""}
    ${a}
    <p class="muted small" style="margin-top:18px;text-align:center">共 ${ot().length} 题 · 当前显示 ${t.length} 题</p>`}async function Kt(t){const e=!t,a=document.createElement("div");if(a.innerHTML=`
    <label class="field">
      <span class="field-label">题干</span>
      <textarea class="textarea" data-role="q" placeholder="支持换行与图片">${d(t?.q??"")}</textarea>
    </label>
    <label class="field">
      <span class="field-label">选项（每行一个，留空表示简答题）</span>
      <textarea class="textarea" data-role="opts" placeholder="A. 选项一&#10;B. 选项二">${d((t?.opts??[]).join(`
`))}</textarea>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>
      <input class="input" data-role="a" value="${d(t?ve(t):"")}" placeholder="A">
    </label>
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">章节</span>
        <input class="input" data-role="chapter" value="${d(t?.chapter??"")}" placeholder="如 第三章">
      </label>
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${d(t?.subject??"默认题库")}" placeholder="默认题库">
      </label>
    </div>
    <div class="row" style="justify-content:flex-end;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`,!await I({title:e?"添加题目":"编辑题目",body:a,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:f=>{const h=f.querySelector('[data-role="classify"]');h&&h.addEventListener("click",async()=>{const p=f.querySelector('[data-role="q"]')?.value.trim()??"";if(!p){l.error("先写题干，AI 才能判断归类");return}const x=f.querySelector('[data-role="opts"]')?.value??"",N=h.textContent??"";h.disabled=!0,h.textContent="归类中…";try{const z=await w.ai.classify(`题目：${p}
选项：${x.split(`
`).join("；")}`),F=JSON.parse(pa(z.result??"{}")),A=f.querySelector('[data-role="subject"]'),ct=f.querySelector('[data-role="chapter"]');F.subject&&A&&(A.value=String(F.subject).slice(0,24)),F.chapter&&ct&&(ct.value=String(F.chapter).slice(0,24)),l.ok("已根据题目填入题库与章节")}catch{l.error("AI 归类失败，可手动填写")}finally{h.disabled=!1,h.textContent=N}})}}))return;const s=f=>a.querySelector(`[data-role="${f}"]`).value,i=s("q").trim();if(!i){l.error("题干不能为空");return}const r=s("opts").split(`
`).map(f=>f.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),c=s("a").trim();let u="";if(r.length){const h=c.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(p=>p.charCodeAt(0)-65).filter(p=>p>=0&&p<r.length);if(!h.length){l.error("答案请填选项字母，如 A 或 A,B");return}u=h.length===1?h[0]:h}else u=c;const m={q:i,opts:r,a:u,chapter:s("chapter").trim(),subject:s("subject").trim()||"默认题库"};try{e?await w.questions.add([m]):await w.questions.update(t.id,m),U("bank"),await K(!0),l.ok(e?"题目已添加":"题目已保存")}catch(f){l.error(f instanceof $?f.message:"保存失败")}}async function da(){const t=document.createElement("div");t.innerHTML=`
    <label class="field">
      <span class="field-label">粘贴题目文本，或上传截图</span>
      <textarea class="textarea" data-role="text" placeholder="把题目文字贴进来…"></textarea>
    </label>
    <label class="btn btn-block" style="cursor:pointer">
      📷 选择图片
      <input type="file" accept="image/*" data-role="file" hidden>
    </label>
    <p class="muted small" style="margin:10px 0 0">AI 会识别题干、选项与答案，导入前可以再改。</p>`;const e=t.querySelector('[data-role="file"]'),a=e.closest("label");if(e.addEventListener("change",()=>{const r=e.files?.[0];r&&(a.textContent=`已选择：${r.name}`)}),!await I({title:"AI 导入题目",body:t,actions:[{label:"取消",value:!1},{label:"识别",value:!0,variant:"primary"}]}))return;const s=t.querySelector('[data-role="text"]').value.trim(),i=e.files?.[0];if(!s&&!i){l.info("还没给我内容呢");return}l.info("AI 正在识别…");try{const r={};s&&(r.prompt=s),i&&(r.image=await ua(i));const c=await w.ai.extract(r),u=fa(c.result??"");if(!u.length){l.error("没有识别出题目，换个清晰点的图片试试");return}await w.questions.add(u),U("bank"),await K(!0),l.ok(`已导入 ${u.length} 道题`)}catch(r){l.error(r instanceof $?r.message:"识别失败")}}function ua(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>a(new Error("图片读取失败")),n.readAsDataURL(t)})}function pa(t){const e=t.replace(/```json/gi,"```").trim(),a=/```([\s\S]*?)```/.exec(e)?.[1]??e,n=a.indexOf("{"),s=a.lastIndexOf("}");return n===-1||s<=n?"{}":a.slice(n,s+1)}function fa(t){const e=t.replace(/```json/gi,"```").trim(),a=/```([\s\S]*?)```/.exec(e)?.[1]??e,n=a.indexOf("["),s=a.lastIndexOf("]");if(n===-1||s<=n)return[];try{return JSON.parse(a.slice(n,s+1)).map(r=>{const c=String(r.q??r.question??"").trim();if(!c)return null;const u=Array.isArray(r.opts??r.options)?(r.opts??r.options).map(String):[];let m="";const f=r.a??r.answer;if(typeof f=="string"){const p=f.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(x=>x.charCodeAt(0)-65).filter(x=>x>=0&&x<u.length);m=u.length?p.length===1?p[0]:p:f}else typeof f=="number"&&(m=f);return{q:c,opts:u,a:m,chapter:String(r.chapter??"").trim(),subject:String(r.subject??"默认题库").trim()||"默认题库"}}).filter(r=>!!r)}catch{return[]}}function ba(){const t=ot().filter(s=>g.selected.has(s.id));if(!t.length){l.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=`题库-${t.length}题.json`,n.click(),URL.revokeObjectURL(a),l.ok(`已导出 ${t.length} 题`)}async function ma(){await K()}async function va(t,e){switch(t){case"subject":return g.subject=e.dataset.subject??"all",!0;case"toggle-edit":return g.edit=!g.edit,g.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return g.selected.has(a)?g.selected.delete(a):g.selected.add(a),!0}case"add":return await Kt(),!0;case"edit":{const a=ot().find(n=>n.id===Number(e.dataset.id));return a&&await Kt(a),!0}case"delete-selected":{const a=[...g.selected];if(!a.length||!await mt({title:"删除题目",message:`确定删除选中的 ${a.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await w.questions.remove(a),g.selected.clear(),U("bank"),await K(!0),l.ok("已删除")}catch(n){l.error(n instanceof $?n.message:"删除失败")}return!0}case"export":return ba(),!0;case"ai-import":return await da(),!0;case"search":return!0;default:return!1}}function ga(t){return t.dataset.role==="search"?(g.search=t.value,!0):!1}const ha="modulepreload",ya=function(t){return"/"+t},Gt={},wa=function(e,a,n){let s=Promise.resolve();if(a&&a.length>0){let r=function(m){return Promise.all(m.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),u=c?.nonce||c?.getAttribute("nonce");s=r(a.map(m=>{if(m=ya(m),m in Gt)return;Gt[m]=!0;const f=m.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${h}`))return;const p=document.createElement("link");if(p.rel=f?"stylesheet":ha,f||(p.as="script"),p.crossOrigin="",p.href=m,u&&p.setAttribute("nonce",u),document.head.appendChild(p),f)return new Promise((x,N)=>{p.addEventListener("load",x),p.addEventListener("error",()=>N(new Error(`Unable to preload CSS for ${m}`)))})}))}function i(r){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=r,window.dispatchEvent(c),!c.defaultPrevented)throw r}return s.then(r=>{for(const c of r||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})};function ge(t){return new Promise(e=>window.setTimeout(e,t))}function $a(t,e,a=620,n="%"){const s=performance.now(),i=r=>{const c=Math.min((r-s)/a,1),u=1-Math.pow(1-c,3);t.innerHTML=`${Math.round(e*u)}<span>${n}</span>`,c<1&&requestAnimationFrame(i)};requestAnimationFrame(i)}function ft(t=12){E.vibration&&navigator.vibrate?.(t)}let v=null,at=null;function Y(){return v?v.options.questions[v.idx]??null:null}function vt(t){const e=v;let a=e.records.get(t.id);return a||(a={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,a)),a}function he(){const t=v;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function ka(){const t=v;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function xa(t,e){if(j(t.a))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${d(e.text)}</textarea>
      </div>`;const a=it(t.a);return`<div class="opts" data-multi="${a.length>1}">${t.opts.map((s,i)=>{let r="";return e.submitted?a.includes(i)?r="correct":e.picked.includes(i)?r="wrong":r="muted":e.picked.includes(i)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${i}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+i)}</span>
        <span class="opt-text">${rt(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function Sa(t,e){if(!e.submitted)return"";const a=j(t.a)?String(t.a):V(t.a,t.opts),n=j(t.a)?R(e.text)||"（空）":V(e.picked.length?e.picked:[],t.opts)||"（未选）";if(j(t.a)){const s=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${v?.busy?"disabled":""}>✦ AI 阅卷</button>
          <button class="btn btn-sm" data-act="mark" data-ok="1">我答对了</button>
          <button class="btn btn-sm" data-act="mark" data-ok="0">没答对</button>
        </div>`:`<div class="essay-actions"><span class="tag ${e.correct?"tag-ok":"tag-bad"}">${e.correct?"已标记：答对":"已标记：答错"}</span></div>`;return`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${d(a)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${d(n)}
      <div class="divider"></div>
      ${s}
    </div>`}return`<div class="answer-panel">
    <div class="ai-title">${e.correct?"✅ 回答正确":"❌ 回答错误"}</div>
    正确答案：${d(V(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${d(n)}`}
  </div>`}function Aa(){const t=v,e=Y();if(!e)return"";const a=vt(e),n=t.options.questions.length,s=n?Math.round((t.idx+(a.submitted?1:0))/n*100):0,i=it(e.a).length>1&&!j(e.a);return`
    <div class="quiz-top">
      <button class="icon-btn" data-act="exit" aria-label="退出练习">←</button>
      <div class="quiz-count">${t.idx+1}<em> / ${n}</em></div>
      <div class="header-spacer"></div>
      <button class="icon-btn" data-act="nav" aria-label="题目导航">▦</button>
    </div>
    <div class="quiz-progress"><i style="width:${s}%"></i></div>
    <div class="quiz-body">
      <div class="q-card">
        <div class="q-head">
          ${e.subject?`<span class="tag tag-accent">${d(e.subject)}</span>`:""}
          ${e.chapter?`<span class="tag">${d(e.chapter)}</span>`:""}
          <span class="grow"></span>
          <span>${i?"多选":j(e.a)?"简答":"单选"}</span>
        </div>
        <div class="q-text">${rt(e.q)}</div>
        ${xa(e,a)}
        ${Sa(e,a)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${pt(e.id)}" aria-label="收藏">${pt(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!Nt()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${a.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===n-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${i||j(e.a)?"提交答案":"查看答案"}</button>`}
    </div>`}function Ea(t,e){v={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},T(),at=a=>{const n=v;if(!n)return;const s=a.target,i=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(a.key==="Escape"){if(document.querySelector(".modal-layer"))return;Ht();return}if(i)return;const r=Y();if(!r)return;const c=vt(r);if(a.key===" "||a.key==="Enter"){const m=n.root?.querySelector('[data-act="submit"]'),f=n.root?.querySelector('[data-act="next"]');m?(a.preventDefault(),M("submit",m)):f&&(a.preventDefault(),M("next",f));return}if(a.key==="ArrowRight"){a.preventDefault(),c.submitted?Rt():M("submit",n.root.querySelector('[data-act="submit"]'));return}if(a.key==="ArrowLeft"){a.preventDefault(),M("prev",n.root);return}const u=a.key.toLowerCase();if(/^[1-9]$/.test(u)||/^[a-h]$/.test(u)){const m=/^[1-9]$/.test(u)?Number(u)-1:u.charCodeAt(0)-97;if(m<r.opts.length){a.preventDefault();const f=n.root?.querySelector(`.opt[data-idx="${m}"]`);f&&M("pick",f)}return}u==="s"?M("fav",n.root):u==="n"?M("note",n.root):u==="e"?M("ai",n.root):u==="g"?M("ai-grade",n.root):u==="?"&&wa(()=>Promise.resolve().then(()=>Qa),void 0).then(m=>m.openShortcuts())},document.addEventListener("keydown",at),t.addEventListener("submit",a=>a.preventDefault()),t.addEventListener("input",ye)}function T(){const t=v;t?.root&&(t.root.innerHTML=Aa())}function ye(t){const e=t.target;e?.dataset.role!=="essay"||!v||(v.textDraft=e.value)}async function yt(t,e){const a=v;if(e.submitted=!0,j(t.a))e.correct=null;else if(e.correct=ze(e.picked,t.a),e.correct){ft(10);const n=ja();n>=3&&n%3===0&&l.ok(`连对 ${n} 题，保持住`)}else ft([14,40,14]),Bt(t,e);T(),e.correct&&a.options.questions.length>a.idx+1&&(await ge(600),v&&v.idx===a.idx&&Rt())}function ja(){const t=v;let e=0;for(let a=t.idx;a>=0;a-=1){const n=t.records.get(t.options.questions[a].id);if(n?.submitted)if(n.correct===!0)e+=1;else break}return e}async function Bt(t,e){try{await w.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(a){a instanceof $&&a.status!==401&&l.error(`错题保存失败：${a.message}`)}}function Rt(){const t=v,e=t.options.questions.length;if(t.idx>=e-1){La();return}t.idx+=1,t.textDraft="",T(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function Ut(){at&&document.removeEventListener("keydown",at),at=null,v?.root?.removeEventListener("input",ye),v?.root?.replaceChildren(),v=null}async function Ht(){const t=v;if(!t)return;const e=he();if(!await mt({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;Y()&&we();const s=t.options.onExit;Ut(),s?.()}function we(){const t=v;if(!t)return;t.options.source==="sequential"&&Ce(t.idx);const e=t.options.questions.slice(0,5).map(a=>R(a.q).slice(0,40));De(e)}async function La(){const t=v;we();const e=t.options.questions.length,a=he(),n=ka(),s=a-n,i=a?Math.round(n/a*100):0;if(Ut(),await I({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${n}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${a}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:c=>{const u=c.querySelector('[data-role="acc"]');u&&$a(u,i)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function qa(t,e,a){e.correct=a,a?ft(10):Bt(t,e),T(),a&&l.ok("已记为答对")}async function Ta(t,e){const a=v;if(a){a.busy=!0,T();try{const n=[`题目：${R(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${R(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await w.ai.grade(n),i=String(s.result||""),r=i.includes("得分")&&!i.includes("不得分");e.correct=r,r?ft(10):Bt(t,e),l.ok(r?"AI 阅卷：答对":"AI 阅卷：答错")}catch(n){l.error(n instanceof $?n.message:"AI 阅卷失败，请稍后再试")}finally{a.busy=!1,T()}}}async function Ia(){const t=Y();if(!t)return;const e=Nt()[String(t.id)]??"",a=document.createElement("div");a.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${d(e)}</textarea>`;const n=a.querySelector("textarea");await I({title:"我的笔记",body:a,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>n.focus()})&&(Ne(t.id,n.value),l.ok("笔记已保存"),T())}async function Ma(){const t=Y();if(!t)return;const e=vt(t),a=[`题目：${R(t.q)}`,t.opts.length?`选项：${t.opts.map((r,c)=>`${String.fromCharCode(65+c)}. ${R(r)}`).join("；")}`:"",`正确答案：${j(t.a)?t.a:V(t.a,t.opts)}`,e.submitted?`我的作答：${j(t.a)?e.text:V(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),n=document.createElement("div");n.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',I({title:"AI 深度解析",body:n,actions:[{label:"关闭",value:"close"}]});const s=n.querySelector('[data-role="text"]'),i=n.querySelector(".ai-title");try{let r="";const c=await w.ai.explainStream(a,m=>{r+=m,s.innerHTML=`${d(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),u=c.provider==="deepseek"?"DeepSeek":c.provider==="zhipu"?"智谱":"";i.textContent=r?`✦ AI 解析${u?` · ${u}`:""}${c.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=d(c.text||r).replace(/\n/g,"<br>"):await Na(s,c.text??""),s.classList.remove("cursor")}catch(r){const c=r instanceof $?r.message:"AI 解析失败，请稍后重试";l.error(c),i.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=c}}async function Na(t,e){for(let a=0;a<e.length;a+=2)t.innerHTML=d(e.slice(0,a+2)).replace(/\n/g,"<br>"),await ge(12)}function Ca(){const t=v;if(!t)return;const e=t.options.questions.map((a,n)=>{const s=t.records.get(a.id),i=n===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${n}" data-state="${i}">${n+1}</button>`}).join("");I({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:a=>{a.querySelectorAll(".nav-cell").forEach(n=>{n.addEventListener("click",()=>{const s=Number(n.dataset.idx);!Number.isFinite(s)||!v||(v.idx=s,v.textDraft="",be(),T())})})}}).then(a=>{a==="finish"&&Ht()})}async function M(t,e){const a=v;if(!a)return!1;const n=Y();if(!n)return!1;const s=vt(n);switch(t){case"pick":{if(s.submitted)return!0;const i=Number(e.dataset.idx);return j(n.a)||(it(n.a).length>1?(s.picked=s.picked.includes(i)?s.picked.filter(c=>c!==i):[...s.picked,i],T()):(s.picked=[i],await yt(n,s))),!0}case"submit":{if(j(n.a)){const i=a.root?.querySelector('[data-role="essay"]');if(s.text=i?.value??a.textDraft,!s.text.trim())return l.info("先写点什么再提交吧"),!0;await yt(n,s)}else{if(!s.picked.length)return l.info("请先选择答案"),!0;await yt(n,s)}return!0}case"ai-grade":return!j(n.a)||v?.busy||await Ta(n,s),!0;case"mark":return j(n.a)&&qa(n,s,e.dataset.ok==="1"),!0;case"next":return Rt(),!0;case"prev":return a.idx>0&&(a.idx-=1,a.textDraft="",T()),!0;case"jump":return a.idx=Number(e.dataset.idx),a.textDraft="",be(),T(),!0;case"nav":return Ca(),!0;case"exit":return await Ht(),!0;case"fav":return await ea(n.id),T(),!0;case"note":return await Ia(),!0;case"ai":return Ma(),!0;default:return!1}}let O=null;function Oa(){return!!(O&&document.body.contains(O))}function X(t){if(!t.questions.length){l.info("这里还没有题目");return}Qt(),O=document.createElement("div"),O.className="quiz",document.body.appendChild(O),document.body.classList.add("is-locked"),Ea(O,{...t,onExit:()=>{Qt(),t.onExit?.()}}),Oe({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function Qt(){O&&(Ut(),O.remove(),O=null,document.body.classList.remove("is-locked"))}async function wt(t="random"){const e=o.bank??[];if(!e.length){l.info("题库还是空的，先去添加题目吧");return}if(t==="chapter"){const n=await Pa(e);if(!n?.length)return;const s=e.filter(r=>n.includes(r.chapter||"未分类")),i=await bt(s.length);if(i===null)return;X({questions:s.slice(0,i),source:"chapter",title:"章节练习"});return}const a=await bt(e.length);if(a!==null){if(t==="sequential"){const n=Math.min(ne(),Math.max(e.length-1,0));X({questions:e.slice(0,a),source:"sequential",title:"顺序练习",startIndex:n<a?n:0});return}X({questions:ce(e).slice(0,a),source:"all",title:"随机练习"})}}async function $e(){const t=o.wrong??await G(!0);if(!t.length){l.info("错题本是空的，先去刷几题吧");return}const e=await bt(t.length);if(e===null)return;const a=t.slice(0,e).map(n=>({id:n.id,q:n.q,opts:n.opts,a:n.a,chapter:n.chapter,subject:n.subject}));X({questions:a,source:"wrong",title:"错题重练"})}function Da(t){if(!t.length){l.info("还没有收藏题目");return}bt(t.length).then(e=>{e!==null&&X({questions:ce(t).slice(0,e),source:"fav",title:"收藏练习"})})}function _a(){const t=se(),e=o.bank??[];if(!t||!e.length)return l.info("没有可以继续的练习"),!1;const a=new Map(e.map(s=>[s.id,s])),n=t.ids.map(s=>a.get(s)).filter(s=>!!s);return n.length?(X({questions:n,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,n.length-1)}),!0):(re(),l.info("上次的题目已经不在了"),!1)}function bt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const a=document.createElement("div");a.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const n=a.querySelector('[data-role="count"]');return n.addEventListener("click",s=>{const i=s.target.closest("button[data-n]");i&&(n.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),i.setAttribute("aria-pressed","true"))}),I({title:"练多少题",body:a,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const i=n.querySelector('button[aria-pressed="true"]');return Number(i?.dataset.n??t)})}async function Pa(t){const e=new Map;t.forEach(r=>{const c=r.chapter?.trim()||"未分类";e.set(c,(e.get(c)??0)+1)});const a=[...e.entries()].sort((r,c)=>c[1]-r[1]);if(!a.length)return null;const n=document.createElement("div");if(n.innerHTML=`<div class="list">${a.map(([r,c],u)=>`
      <button class="item" data-chapter="${d(r)}" data-checked="${u===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${d(r)}</span><span class="tag">${c} 题</span></div>
      </button>`).join("")}</div>`,n.addEventListener("click",r=>{const c=r.target.closest("[data-chapter]");c&&(c.dataset.checked=c.dataset.checked==="true"?"false":"true")}),!await I({title:"选择章节",body:n,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const i=Array.from(n.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return i.length?i:null}const J=new Set;function Ba(){J.clear()}function Lt(){return o.favs??[]}function Ra(){const t=Lt(),e=o.loading.fav&&!o.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(a=>`
        <div class="item" data-id="${a.id}">
          <div class="item-q">${rt(a.q)}</div>
          <div class="item-meta">
            ${a.subject?`<span class="tag tag-accent">${d(a.subject)}</span>`:""}
            ${a.chapter?`<span class="tag">${d(a.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${a.id}">${J.has(a.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${a.id}">取消收藏</button>
          </div>
          ${J.has(a.id)?`<div class="item-answer"><div class="right">${d(V(a.a,a.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function Ua(){await nt()}async function Ha(t,e){switch(t){case"practice":return Lt().length?(await Da(Lt()),!0):(l.info("还没有收藏的题"),!0);case"reveal":{const a=Number(e.dataset.id);return J.has(a)?J.delete(a):J.add(a),!0}case"remove":{const a=Number(e.dataset.id);try{await w.favorites.remove(a),J.delete(a),U("fav"),await nt(!0),l.ok("已取消收藏")}catch(n){l.error(n instanceof $?n.message:"操作失败")}return!0}default:return!1}}let $t="";function za(){return(!Pe()||!$t)&&($t=aa(),Be()),$t}function Fa(){const t=o.bank,e=o.wrong,a=o.favs,n=o.loading,s=se(),i=ie().slice(0,4),r=ne();return`
    <section class="hero">
      <div class="hero-greet">${d(za())}</div>
      <div class="hero-hint">${o.user?`@${d(o.user)} · 今天也要加油`:"轻装上阵，一次一题"}</div>
    </section>

    <div class="stat-grid">
      <div class="stat" data-act="goto" data-tab="bank">
        <div class="stat-num">${t?t.length:"—"}</div>
        <div class="stat-label">题库</div>
      </div>
      <div class="stat" data-act="goto" data-tab="wrong">
        <div class="stat-num">${e?e.length:"—"}</div>
        <div class="stat-label">错题</div>
      </div>
      <div class="stat" data-act="goto" data-tab="fav">
        <div class="stat-num">${a?a.length:"—"}</div>
        <div class="stat-label">收藏</div>
      </div>
    </div>

    <div class="section-title">开始练习</div>
    ${n.bank&&!t?'<div class="card card-pad"><div class="skeleton sk-line w60"></div><div class="skeleton sk-line w80"></div></div>':""}
    <div class="action-list">
      <button class="action" data-act="random" ${t&&!t.length?"disabled":""}>
        <span class="action-ico">⚡</span>
        <span class="action-body">
          <span class="action-title">随机练习</span>
          <span class="action-desc">从题库里随机抽题，查漏补缺</span>
        </span>
        <span class="chev">›</span>
      </button>
      <button class="action" data-act="sequential" ${t&&!t.length?"disabled":""}>
        <span class="action-ico">▤</span>
        <span class="action-body">
          <span class="action-title">顺序练习</span>
          <span class="action-desc">${r>0?`上次停在第 ${r+1} 题`:"按题库顺序，稳稳推进"}</span>
        </span>
        <span class="chev">›</span>
      </button>
      <button class="action" data-act="chapter" ${t&&!t.length?"disabled":""}>
        <span class="action-ico">❖</span>
        <span class="action-body">
          <span class="action-title">按章节练</span>
          <span class="action-desc">只练薄弱的那一章</span>
        </span>
        <span class="chev">›</span>
      </button>
      <button class="action" data-act="wrong" ${e&&!e.length?"disabled":""}>
        <span class="action-ico red">⚑</span>
        <span class="action-body">
          <span class="action-title">错题重练</span>
          <span class="action-desc">${e?`${e.length} 道错题等着你`:"把错过的都拿回来"}</span>
        </span>
        <span class="chev">›</span>
      </button>
      ${s?`<button class="action" data-act="resume">
               <span class="action-ico green">↻</span>
               <span class="action-body">
                 <span class="action-title">继续上次</span>
                 <span class="action-desc">${s.ids.length} 题 · 停在第 ${s.idx+1} 题</span>
               </span>
               <span class="chev">›</span>
             </button>`:""}
    </div>

    ${i.length?`<div class="section-title">最近练过</div>
           <div class="list">${i.map(u=>`<div class="item"><div class="item-q muted">${d(u)}</div></div>`).join("")}</div>`:""}
  `}async function Wa(){await Promise.allSettled([K(),G(),nt()])}async function Ja(t,e){switch(t){case"goto":return Ot(e.dataset.tab??"bank"),!0;case"random":return await wt("random"),!0;case"sequential":return await wt("sequential"),!0;case"chapter":return await wt("chapter"),!0;case"wrong":return await $e(),!0;case"resume":return _a(),!0;default:return!1}}const ke=[{keys:"1 2 3 4 / A B C D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1 – 5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/",desc:"聚焦题库搜索框",scope:"题库页"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function zt(){const t=ke.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");I({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const Ka=["home","bank","wrong","fav","me"];function Ga(t){const e=t;if(!e)return!1;const a=e.tagName.toLowerCase();return a==="input"||a==="textarea"||a==="select"||e.isContentEditable}function xe(){document.addEventListener("keydown",t=>{if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||Ga(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),zt();return}if(t.key==="/"){const a=document.querySelector('.view input[data-role="search"]');a&&(t.preventDefault(),a.focus());return}const e=Number(t.key);e>=1&&e<=5&&(t.preventDefault(),Ot(Ka[e-1]))})}const Qa=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:ke,installShortcuts:xe,openShortcuts:zt},Symbol.toStringTag,{value:"Module"})),Va=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],Xa=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function Vt(t,e,a){return`<div class="segmented">${t.map(n=>`<button class="seg" data-act="${a}" data-value="${n.value}" aria-pressed="${String(n.value)===String(e)}">${n.label}</button>`).join("")}</div>`}function Xt(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),URL.revokeObjectURL(n)}async function Ya(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await I({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const a=t.querySelector('[data-role="old"]').value,n=t.querySelector('[data-role="next"]').value;if(n.length<6){l.error("新密码至少 6 位");return}try{await w.auth.change(a,n),l.ok("密码已更新")}catch(s){l.error(s instanceof $?s.message:"修改失败")}}function Za(){const t=o.user,e=d((t||"?").slice(0,1).toUpperCase()),a=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})();return`
    <div class="profile">
      <div class="profile-avatar">${e}</div>
      <div class="profile-body">
        <div class="profile-name">${d(t)}</div>
        <div class="profile-desc">${o.bank?.length??0} 道题 · ${o.wrong?.length??0} 道错题 · ${o.favs?.length??0} 条收藏</div>
      </div>
    </div>

    <div class="section-title">外观</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">主题</div><div class="setting-desc">深色模式也会跟随系统自动切换</div></div>
      </div>
      ${Vt(Va,E.theme,"theme")}
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景色</div><div class="setting-desc">给首页换个心情</div></div>
        <input class="color-input" type="color" value="${d(a.color||"#f4f5f7")}" data-act="pick-color" aria-label="背景色">
      </div>
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景图</div><div class="setting-desc">选一张图当首页背景，会自动压缩</div></div>
        <div class="row-actions">
          <button class="btn btn-sm" data-act="pick-bg">选择图片</button>
          ${a.image?'<button class="btn btn-sm btn-ghost" data-act="clear-bg">移除</button>':""}
        </div>
      </div>
      ${a.image?`<label class="setting-row dim-row">
              <div><div class="setting-title">背景暗化</div><div class="setting-desc">让文字更清楚一点</div></div>
              <input class="range" type="range" min="0" max="0.85" step="0.05" value="${(a.dim??.35).toFixed(2)}" data-act="dim" aria-label="背景暗化程度">
            </label>`:""}
      <button class="btn btn-sm btn-ghost" data-act="reset-bg">恢复默认背景</button>
    </div>

    <div class="section-title">帮助</div>
    <div class="card card-pad">
      <button class="btn btn-ghost btn-block" data-act="shortcuts" style="justify-content:flex-start">键盘快捷键</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block" data-act="about" style="justify-content:flex-start">关于这个题库</button>
    </div>

    <div class="section-title">练习</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">答对后自动跳题</div><div class="setting-desc">答对稍作停留就去下一题</div></div>
      </div>
      ${Vt(Xa,E.autoDelay,"delay")}
      <div class="divider"></div>
      <label class="setting-row">
        <div><div class="setting-title">答题震动</div><div class="setting-desc">答对答错给一点反馈</div></div>
        <span class="switch" role="switch" data-act="toggle-vibration" aria-checked="${E.vibration}"><i></i></span>
      </label>
      <label class="setting-row">
        <div><div class="setting-title">连对鼓励</div><div class="setting-desc">连续答对时来点掌声</div></div>
        <span class="switch" role="switch" data-act="toggle-streak" aria-checked="${E.streakAlert}"><i></i></span>
      </label>
    </div>

    <div class="section-title">数据</div>
    <div class="card card-pad">
      <button class="btn btn-ghost btn-block" data-act="export-bank" style="justify-content:flex-start">导出题库（JSON）</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block" data-act="export-wrong" style="justify-content:flex-start">导出错题（JSON）</button>
    </div>

    <div class="section-title">账号</div>
    <div class="card card-pad">
      <button class="btn btn-ghost btn-block" data-act="change-password" style="justify-content:flex-start">修改密码</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block danger-text" data-act="logout" style="justify-content:flex-start">退出登录</button>
    </div>

    <p class="muted small" style="text-align:center;margin:22px 0 6px">origin-quiz v2.0.0</p>
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function tn(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){l.error("图片太大了（最多 8MB）");return}try{const a=await en(e);tt({image:a,color:""}),l.ok("背景已更新"),k("render")}catch{l.error("这张图片读不出来，换一张试试")}}},t.click()}function en(t){return new Promise((e,a)=>{const n=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(n);const i=Math.min(1,1600/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*i),r.height=Math.round(s.height*i);const c=r.getContext("2d");if(!c){a(new Error("canvas unavailable"));return}c.drawImage(s,0,0,r.width,r.height),e(r.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(n),a(new Error("image load failed"))},s.src=n})}function an(){_t()}async function nn(t,e){switch(t){case"theme":return Qe(e.dataset.value),k("render"),!0;case"delay":return dt({autoDelay:Number(e.dataset.value)}),k("render"),!0;case"toggle-vibration":return dt({vibration:!E.vibration}),k("render"),!0;case"toggle-streak":return dt({streakAlert:!E.streakAlert}),k("render"),!0;case"pick-color":return tt({color:e.value,image:""}),!0;case"pick-bg":return await tn(),!0;case"clear-bg":return tt({image:""}),k("render"),!0;case"dim":return tt({dim:Number(e.value)}),!0;case"shortcuts":return zt(),!0;case"about":return I({title:"关于",body:`<p class="muted small" style="margin:0 0 10px">原点 · Origin —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。</p>
          <p class="muted small" style="margin:0 0 6px">题库 ${o.bank?.length??0} 题 · 错题 ${o.wrong?.length??0} 道 · 收藏 ${o.favs?.length??0} 条</p>
          <p class="muted small" style="margin:0">版本 v2.0.0 · 支持 PWA 离线打开</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]}),!0;case"reset-bg":return tt({color:"",image:"",dim:.35}),l.ok("背景已恢复"),k("render"),!0;case"export-bank":return o.bank?.length?(Xt(`题库-${o.user}.json`,o.bank),l.ok("已导出"),!0):(l.info("题库是空的"),!0);case"export-wrong":return o.wrong?.length?(Xt(`错题-${o.user}.json`,o.wrong),l.ok("已导出"),!0):(l.info("没有错题"),!0);case"change-password":return await Ya(),!0;case"logout":return await mt({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(ue(),l.info("已退出登录")),!0;default:return!1}}const y={subject:"all",edit:!1,selected:new Set};function sn(){y.subject="all",y.edit=!1,y.selected.clear()}function Se(){const t=o.wrong??[];return y.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===y.subject)}function rn(){return["all",...Array.from(new Set((o.wrong??[]).map(t=>t.subject||"默认题库")))]}function on(){const t=Se(),e=o.wrong?.length??0,a=rn().map(s=>`<button class="chip" data-act="subject" data-subject="${d(s)}" aria-pressed="${y.subject===s}">
          ${s==="all"?"全部":d(s)}
        </button>`).join(""),n=o.loading.wrong&&!o.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${y.selected.has(s.id)}">
          ${y.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${rt(s.q)}</div>
          <div class="item-meta">
            ${s.subject?`<span class="tag tag-accent">${d(s.subject)}</span>`:""}
            ${s.chapter?`<span class="tag">${d(s.chapter)}</span>`:""}
          </div>
          <div class="item-answer">
            ${s.user_choice_text?`<div class="mine">你的选择：${d(s.user_choice_text)}</div>`:""}
            ${s.answer?`<div class="right">正确答案：${d(s.answer)}</div>`:""}
          </div>
          ${y.edit?"":`<div class="item-meta" style="margin-top:10px">
                   <span class="grow"></span>
                   <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${s.id}">已掌握</button>
                 </div>`}
        </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">⚑</div><div class="empty-title">${e?"这个题库下没有错题":"还没有错题"}</div><div class="empty-desc">${e?"切到「全部」看看":"答错的题会自动收集到这里，方便集中消灭"}</div></div>`;return`
    <div class="row between" style="margin-bottom:4px">
      <h1 class="page-title" style="margin:0">错题集</h1>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${y.edit?"✓":"☰"}</button>
    </div>
    <p class="muted small" style="margin:4px 0 14px">共 ${e} 道，消灭一题少一题</p>
    ${e?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">开始重练（${t.length} 题）</button>`:""}
    ${a}
    ${y.edit?`<div class="row between" style="margin-bottom:12px">
             <span class="muted small">已选 ${y.selected.size} 题</span>
             <button class="btn btn-sm btn-danger" data-act="remove-selected" ${y.selected.size?"":"disabled"}>删除</button>
           </div>`:""}
    ${n}`}async function cn(){await G()}async function ln(t,e){switch(t){case"subject":return y.subject=e.dataset.subject??"all",!0;case"toggle-edit":return y.edit=!y.edit,y.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return y.selected.has(a)?y.selected.delete(a):y.selected.add(a),!0}case"practice":return Se().length?(await $e(),!0):(l.info("没有可练的错题"),!0);case"remove":{const a=Number(e.dataset.id);try{await w.wrong.remove([a]),y.selected.delete(a),U("wrong"),await G(!0),l.ok("已标记掌握，继续加油")}catch(n){l.error(n instanceof $?n.message:"操作失败")}return!0}case"remove-selected":{const a=[...y.selected];if(!a.length||!await mt({title:"删除错题",message:`确定删除选中的 ${a.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await w.wrong.remove(a),y.selected.clear(),U("wrong"),await G(!0),l.ok("已删除")}catch(n){l.error(n instanceof $?n.message:"删除失败")}return!0}default:return!1}}const Q={home:{render:Fa,mount:Wa,handle:Ja},bank:{render:la,mount:ma,handle:va,onInput:ga,reset:me},wrong:{render:on,mount:cn,handle:ln,reset:sn},fav:{render:Ra,mount:Ua,handle:Ha,reset:Ba},me:{render:Za,mount:an,handle:nn}};let st=!1,H=!1,kt=!1,xt=!1;function Ae(){return document.getElementById("app-root")}function dn(){H=!1,Ae().innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-name">Origin Quiz</span>
        </div>
        <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(o.user||"?").slice(0,1).toUpperCase()}</button>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${jt.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${jt.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,st=!0}function un(){document.querySelectorAll(".tab-btn").forEach(e=>{const a=e.dataset.tab===o.tab;e.classList.toggle("is-active",a),e.setAttribute("aria-selected",String(a))});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,jt.findIndex(a=>a.id===o.tab));t.style.setProperty("--tab-index",String(e))}}function pn(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,a=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),n=a?e.getAttribute("data-role"):null,s=a&&e instanceof HTMLInputElement?e.selectionStart:null,i=Q[o.tab]??Q.home;if(t.innerHTML=`<div class="view-inner">${i.render()}</div>`,un(),a&&n){const r=t.querySelector(`[data-role="${n}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}i.mount?.()}function D(){if(kt){xt=!0;return}kt=!0;try{if(!o.authed&&!o.token){H=!0,st=!1,Ae().innerHTML=sa();return}st||dn(),pn()}finally{kt=!1,xt&&(xt=!1,queueMicrotask(D))}}let St=!1;function Yt(){St||(St=!0,setTimeout(()=>{St=!1,D()},0))}async function Ee(t){await t(),H&&D()}function je(t){const e=t.dataset.act??"";if(Oa()&&t.closest(".quiz")){M(e,t).then(n=>{n||k("render")});return}if(e==="tab"){Ot(t.dataset.tab??"home");return}if(H){Ee(()=>pe(e,t));return}const a=Q[o.tab]??Q.home;a.handle&&Promise.resolve(a.handle(e,t)).then(n=>{n&&D()})}function fn(t){const e=t.target;if(!e)return;const a=e.closest("[data-act]");a&&(a.closest(".modal-layer")||je(a))}function Zt(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){je(e);return}if(H)return;const a=document.getElementById("view");if(!a||!a.contains(e))return;(Q[o.tab]??Q.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&D()}function bn(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),H&&Ee(()=>pe("submit",e)))}function mn(){Dt(),_t(),We(()=>{ue(),st=!1,H=!1,l.error("登录已过期，请重新登录"),k("auth")}),lt("nav",()=>{Object.entries(Q).forEach(([t,e])=>{t!==o.tab&&e.reset?.()}),D()}),lt("auth",()=>{st=!1,H=!1,o.authed?(me(),D(),Promise.allSettled([K(!0),G(!0),nt(!0)])):D()}),lt("render",Yt),lt("data",Yt),document.addEventListener("click",fn),document.addEventListener("change",Zt),document.addEventListener("input",Zt),document.addEventListener("submit",bn),xe(),o.token&&(o.authed=!0),D(),o.token&&Promise.allSettled([K(),G(),nt()])}function te(){try{mn()}catch(t){console.error("[origin-quiz] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",te,{once:!0}):te();
