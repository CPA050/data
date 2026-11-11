var Le=Object.defineProperty;var qe=(t,e,a)=>e in t?Le(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var Ft=(t,e,a)=>qe(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const Lt="oq:",qt="oq:user",Tt="oq:token",Te={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},E={...Te,...D("settings",{})};["auto","light","dark","eye"].includes(E.theme)||(E.theme="auto");function D(t,e){try{const a=localStorage.getItem(Lt+t);return a===null?e:JSON.parse(a)}catch{return e}}function _(t,e){try{localStorage.setItem(Lt+t,JSON.stringify(e))}catch{}}function St(t){try{localStorage.removeItem(Lt+t)}catch{}}function lt(t){Object.assign(E,t),_("settings",E)}function Ie(t){lt({theme:t})}function L(){return D(qt,"")||""}function ee(t){_(qt,t)}function Me(){St(qt),St(Tt)}function It(){return D(Tt,"")||""}function ae(t){_(Tt,t)}function P(t){return`u:${L()||"anon"}:${t}`}function Mt(){return D(P("notes"),{})}function Ne(t,e){const a=Mt(),n=String(t);e.trim()?a[n]=e:delete a[n],_(P("notes"),a)}function ne(){const t=D(P("progress"),{});return Number(t.sequential_index)||0}function Ce(t){_(P("progress"),{sequential_index:t,updatedAt:Date.now()})}function se(){const t=D(P("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function Oe(t){_(P("session"),t)}function re(){St(P("session"))}function ie(){return D(P("recent"),[])}function De(t){const e=[...t,...ie()].slice(0,30);_(P("recent"),Array.from(new Set(e)))}function oe(){return D("appearance",{color:"",image:"",dim:.35})}function _e(t){_("appearance",{...oe(),...t})}function Pe(){return D("welcomed","")===new Date().toDateString()}function Be(){_("welcomed",new Date().toDateString())}const Re={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function d(t){return String(t??"").replace(/[&<>"']/g,e=>Re[e]??e)}const Ue=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function He(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function st(t){const e=He(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return d(e).replace(/\n/g,"<br>");const n=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!n)return d(e);const s=i=>{if(i.nodeType===Node.TEXT_NODE)return d(i.textContent??"").replace(/\n/g,"<br>");if(i.nodeType!==Node.ELEMENT_NODE)return"";const r=i,c=r.tagName,u=Array.from(r.childNodes).map(s).join("");if(!Ue.has(c))return u;if(c==="IMG"){const f=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(f))return"";const v=d(r.getAttribute("alt")??"");return`<img src="${d(f)}" alt="${v}" loading="lazy" referrerpolicy="no-referrer">`}const m=c.toLowerCase();return`<${m}>${u}</${m}>`};return Array.from(n.childNodes).map(s).join("")}function U(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function rt(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(a=>Number.isInteger(a)))).sort((a,n)=>a-n)}function j(t){return typeof t=="string"}function Q(t,e=[]){return typeof t=="string"?t:rt(t).map(a=>{const n=String.fromCharCode(65+a),s=(e[a]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${n}. ${s}`:n}).join("、")}function ce(t){const e=[...t];for(let a=e.length-1;a>0;a-=1){const n=Math.floor(Math.random()*(a+1));[e[a],e[n]]=[e[n],e[a]]}return e}function ze(t,e){const a=rt(e);if(!a.length||t.length!==a.length)return!1;const n=[...new Set(t)].sort((s,i)=>s-i);return n.length===a.length&&n.every((s,i)=>s===a[i])}function Fe(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const a=JSON.parse(e);if(typeof a=="number")return a;if(Array.isArray(a))return a.map(Number).filter(Number.isInteger);if(typeof a=="string")return a}catch{}return e}return""}class $ extends Error{constructor(a,n){super(n);Ft(this,"status");this.name="ApiError",this.status=a}}let Nt=null;function We(t){Nt=t}async function le(t,e={}){const a=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&a.set("Content-Type","application/json");const n=It();n&&a.set("Authorization",`Bearer ${n}`),a.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:a})}catch{throw new $(0,"网络连接失败，请检查网络后重试")}const i=s.headers.get("content-type")??"";let r=null;i.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const c=r??{};if(s.status===401)throw Nt?.(),new $(401,typeof c.error=="string"?c.error:"登录已过期，请重新登录");if(!s.ok||c.ok===!1){const u=typeof c.error=="string"&&c.error?c.error:`请求失败（HTTP ${s.status}）`;throw new $(s.status,u)}return r}const vt=t=>le(t),S=(t,e)=>le(t,{method:"POST",body:JSON.stringify(e)});async function Je(t,e,a){const n=new Headers({"Content-Type":"application/json"}),s=It();s&&n.set("Authorization",`Bearer ${s}`);const i=await fetch("/api/ai",{method:"POST",headers:n,body:JSON.stringify({...t,stream:!0}),signal:a});if(!i.ok||!i.body){const v=await i.json().catch(()=>({}));if(i.status===401)throw Nt?.(),new $(401,"登录已过期，请重新登录");if(typeof v.result=="string")return e(v.result),{text:v.result,cached:!1};throw new $(i.status,typeof v.error=="string"?v.error:"AI 解析失败")}const r=i.body.getReader(),c=new TextDecoder;let u="",m="",f=!1;for(;;){const{value:v,done:b}=await r.read();if(b)break;u+=c.decode(v,{stream:!0});const k=u.split(`

`);u=k.pop()??"";for(const B of k){const R=B.split(`
`).find(ot=>ot.startsWith("data:"));if(!R)continue;let A;try{A=JSON.parse(R.slice(5).trim())}catch{continue}if(typeof A.delta=="string"&&A.delta&&(m+=A.delta,e(A.delta)),typeof A.error=="string")throw new $(502,A.error);A.done&&(f=A.cached===!0)}}return{text:m,cached:f}}function At(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:Fe(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function Ke(t){return{...At(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}const w={auth:{check:t=>S("/api/auth",{action:"check",username:t}),set:(t,e)=>S("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>S("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>S("/api/auth",{action:"change",username:L(),oldPassword:t,newPassword:e})},questions:{async list(){const t=L();if(!t)return[];const e=await vt(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>At(n))},add:t=>S("/api/questions-add",{user_id:L(),questions:t}),update:(t,e)=>S("/api/questions-update",{id:t,user_id:L(),...e}),remove:t=>S("/api/questions-delete",{ids:t,user_id:L()})},wrong:{async list(){const t=L();if(!t)return[];const e=await vt(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>Ke(n))},add:t=>S("/api/wrong-add",{user_id:L(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""}),remove:t=>S("/api/wrong-delete",{ids:t,user_id:L()})},favorites:{async list(){const t=L();if(!t)return[];const e=await vt(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>At(n))},add:t=>S("/api/favorites-add",{user_id:L(),question_id:t}),remove:t=>S("/api/favorites-remove",{user_id:L(),question_id:t})},ai:{explain:t=>S("/api/ai",{action:"explain",prompt:t}),grade:t=>S("/api/ai",{action:"grade",prompt:t}),extract:t=>S("/api/ai",{action:"extract",...t}),classify:t=>S("/api/ai",{action:"classify",prompt:t}),explainStream:(t,e,a)=>Je({action:"explain",prompt:t},e,a)}};let N=null;function Ge(){return N&&document.body.contains(N)||(N=document.createElement("div"),N.className="toast-host",N.setAttribute("role","status"),N.setAttribute("aria-live","polite"),document.body.appendChild(N)),N}function gt(t,e="info",a=2600){if(!t)return;const n=document.createElement("div");n.className=`toast toast-${e}`,n.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${d(t)}</span>`,Ge().appendChild(n),requestAnimationFrame(()=>n.classList.add("in")),window.setTimeout(()=>{n.classList.remove("in"),window.setTimeout(()=>n.remove(),220)},a)}const l={info:t=>gt(t,"info"),ok:t=>gt(t,"success"),error:t=>gt(t,"error",3200)},Et=[{id:"home",label:"首页",icon:"⌂"},{id:"bank",label:"题库",icon:"▤"},{id:"wrong",label:"错题",icon:"⚑"},{id:"fav",label:"收藏",icon:"★"},{id:"me",label:"我的",icon:"☺"}],Wt=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],o={tab:"home",user:L(),token:It(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},Y=new Map;function ct(t,e){return Y.has(t)||Y.set(t,new Set),Y.get(t).add(e),()=>Y.get(t)?.delete(e)}function x(t){Y.get(t)?.forEach(e=>e())}function Ct(t){o.tab!==t&&(o.tab=t,x("nav"))}const de=window.matchMedia("(prefers-color-scheme: dark)");function Jt(){return E.theme==="auto"?de.matches?"dark":"light":E.theme}function Ot(){document.documentElement.dataset.theme=Jt();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=Jt()==="dark"?"#0b0c0f":"#f4f5f7")}function Qe(t){Ie(t),Ot()}de.addEventListener("change",()=>{E.theme==="auto"&&Ot()});function Ve(t){_e(t)}function Dt(){const{color:t,image:e,dim:a}=oe(),n=document.body;n.style.backgroundImage=e?`url("${e}")`:"",n.style.backgroundSize="cover",n.style.backgroundPosition="center",n.style.backgroundAttachment="fixed",n.dataset.dim=String(a),t&&!e?n.style.backgroundColor=t:n.style.backgroundColor=""}async function Xe(t,e){const a=await w.auth.login(t,e);ae(a.token),ee(t),o.user=t,o.token=a.token,o.authed=!0,H(),x("auth")}async function Ye(t,e){const a=await w.auth.set(t,e);ae(a.token),ee(t),o.user=t,o.token=a.token,o.authed=!0,H(),x("auth")}function ue(){o.user="",o.token="",o.authed=!1,o.bank=null,o.wrong=null,o.favs=null,o.favoriteIds=new Set,Me(),re(),x("auth")}const Ze=300*1e3,F={bank:0,wrong:0,fav:0},dt=new Map;function H(t){t?(F[t]=0,t==="bank"&&(o.bank=null),t==="wrong"&&(o.wrong=null),t==="fav"&&(o.favs=null)):(F.bank=F.wrong=F.fav=0,o.bank=null,o.wrong=null,o.favs=null)}function ta(t,e){const a=dt.get(t);if(a)return a;const n=e().finally(()=>dt.delete(t));return dt.set(t,n),n}async function _t(t,e,a,n){if(!o.user)return[];const s=dt.get(t);if(s)return s;const i=Date.now()-F[t]<Ze;if(!e&&i)return[];o.loading[t]=!0,x("data");try{const r=await ta(t,a);return n(r),F[t]=Date.now(),r}catch(r){throw r instanceof $&&r.status!==401&&l.error(r.message),r}finally{o.loading[t]=!1,x("data")}}async function J(t=!1){try{await _t("bank",t,()=>w.questions.list(),e=>{o.bank=e})}catch{}return o.bank??[]}async function K(t=!1){try{await _t("wrong",t,()=>w.wrong.list(),e=>{o.wrong=e})}catch{}return o.wrong??[]}async function at(t=!1){try{await _t("fav",t,()=>w.favorites.list(),e=>{o.favs=e,o.favoriteIds=new Set(e.map(a=>a.id))})}catch{}return o.favs??[]}function ut(t){return o.favoriteIds.has(t)}async function ea(t){const e=!ut(t);try{return e?await w.favorites.add(t):await w.favorites.remove(t),e?o.favoriteIds.add(t):o.favoriteIds.delete(t),o.favs=null,F.fav=0,l.ok(e?"已加入收藏":"已取消收藏"),x("data"),e}catch(a){return l.error(a instanceof $?a.message:"操作失败"),ut(t)}}function aa(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${Wt[Math.floor(Math.random()*Wt.length)]}`}function Z(t){Ve(t),Dt()}const p={step:"name",username:"",busy:!1,error:""};function na(){p.step="name",p.username="",p.busy=!1,p.error=""}function sa(){const t=`
    <div class="auth-brand">
      <div class="brand-mark">原</div>
      <div>
        <div class="auth-title">原点 · Origin</div>
        <div class="brand-sub">刷题 · 错题 · 收藏</div>
      </div>
    </div>`,e=p.error?`<div class="auth-error" role="alert">${d(p.error)}</div>`:"";if(p.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${d(p.username)}" required>
            </label>
            ${e}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${p.busy?"disabled":""}>
              ${p.busy?"检查中…":"继续"}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;const a=p.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${a?"为":"欢迎回来，"} <strong>${d(p.username)}</strong>${a?" 设置一个密码":""}</p>
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
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${p.busy?"disabled":""}>
            ${p.busy?"请稍候…":a?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${p.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function fe(t,e){if(t==="back")return p.step="name",p.error="",!0;if(t==="submit"){const a=e,n=new FormData(a);if(p.step==="name"){const i=String(n.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(i))return p.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;p.busy=!0,p.error="";try{const{hasPassword:r}=await w.auth.check(i);p.username=i,p.step=r?"password":"create"}catch(r){p.error=r instanceof $?r.message:"网络异常，请重试"}finally{p.busy=!1}return!0}if(p.busy)return!0;const s=String(n.get("password")??"");if(p.step==="create"){const i=String(n.get("confirm")??"");if(s!==i)return p.error="两次输入的密码不一致",!0}if(s.length<6)return p.error="密码至少 6 位",!0;p.busy=!0,p.error="";try{p.step==="create"?await Ye(p.username,s):await Xe(p.username,s),l.ok(p.step==="create"?"账号已创建，开始刷题吧":`欢迎回来，${o.user}`),na()}catch(i){p.error=i instanceof $?i.message:"登录失败，请重试"}finally{p.busy=!1}return!0}return!1}let q=null,tt=0;function pe(){return q&&document.body.contains(q)||(q=document.createElement("div"),q.className="modal-root",q.setAttribute("role","dialog"),q.setAttribute("aria-modal","true"),document.body.appendChild(q)),q}function ra(){tt+=1,document.body.classList.add("is-locked")}function ia(){tt=Math.max(0,tt-1),tt===0&&document.body.classList.remove("is-locked")}function be(){pe().innerHTML="",tt=0,document.body.classList.remove("is-locked")}function I(t){const e=pe(),a=t.dismissible!==!1;return new Promise(n=>{let s=!1;const i=b=>{s||(s=!0,v(),r.classList.remove("open"),window.setTimeout(()=>{r.remove(),ia()},200),n(b))},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${a?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${d(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${d(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((b,k)=>`<button class="btn btn-${b.variant??"ghost"}" data-idx="${k}">${d(b.label)}</button>`).join("")}</div>`:""}
      </div>`;const c=r.querySelector(".modal-card"),u=c.querySelector(".modal-body");typeof t.body=="string"?u.innerHTML=t.body:t.body&&u.appendChild(t.body);const m=b=>{b.key==="Escape"&&a&&(b.stopPropagation(),i(null))},f=b=>{const k=b.target;if(k.closest("[data-close]")&&a){i(null);return}const B=k.closest("[data-idx]");if(!B)return;const R=t.actions?.[Number(B.dataset.idx)];R&&(R.keepOpen||i(R.value))},v=()=>{document.removeEventListener("keydown",m,!0),r.removeEventListener("click",f),q&&q.children.length===0&&q.classList.remove("open")};r.addEventListener("click",f),document.addEventListener("keydown",m,!0),e.appendChild(r),e.classList.add("open"),ra(),t.onMount?.(c),requestAnimationFrame(()=>{r.classList.add("open");const b=c.querySelector("input, textarea, button.btn-primary, button");b&&window.matchMedia("(pointer: fine)").matches&&b.focus({preventScroll:!0})})})}function bt(t){return I({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}const h={search:"",subject:"all",edit:!1,selected:new Set};function me(){h.search="",h.subject="all",h.edit=!1,h.selected.clear()}function it(){return o.bank??[]}function oa(){return["all",...Array.from(new Set(it().map(t=>t.subject||"默认题库")))]}function ca(){const t=h.search.trim().toLowerCase();return it().filter(e=>h.subject!=="all"&&(e.subject||"默认题库")!==h.subject?!1:t?U(e.q).toLowerCase().includes(t)||e.opts.some(a=>U(a).toLowerCase().includes(t)):!0)}function ve(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(a=>String.fromCharCode(65+a)).join(" / ")}function la(){const t=ca(),e=oa().map(n=>`<button class="chip" data-act="subject" data-subject="${d(n)}" aria-pressed="${h.subject===n}">
          ${n==="all"?"全部":d(n)}
        </button>`).join(""),a=o.loading.bank&&!o.bank?`<div class="list">${Array.from({length:4}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(n=>`
          <div class="item ${h.edit?"selectable":""}" data-id="${n.id}" data-checked="${h.selected.has(n.id)}">
            ${h.edit?`<span class="checkbox" data-act="select" data-id="${n.id}">✓</span>`:""}
            <div class="item-q">${st(n.q)}</div>
            <div class="item-meta">
              ${n.subject?`<span class="tag tag-accent">${d(n.subject)}</span>`:""}
              ${n.chapter?`<span class="tag">${d(n.chapter)}</span>`:""}
              <span class="tag tag-ok">答案 ${d(ve(n))}</span>
              <span class="grow"></span>
              ${h.edit?"":`<button class="btn btn-sm btn-ghost" data-act="edit" data-id="${n.id}">编辑</button>`}
            </div>
          </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${h.search?"没有匹配的题目":"题库还是空的"}</div><div class="empty-desc">${h.search?"换个关键词试试":"点右上角「＋」添加，或用 AI 从图片导入"}</div></div>`;return`
    <h1 class="page-title">题库</h1>
    <div class="row" style="margin-bottom:12px">
      <div class="search-box grow">
        <span class="ico">⌕</span>
        <input type="search" placeholder="搜索题目或选项" data-role="search" value="${d(h.search)}" enterkeyhint="search">
      </div>
      <button class="icon-btn" data-act="add" aria-label="添加题目">＋</button>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${h.edit?"✓":"☰"}</button>
    </div>
    <div class="chips">${e}</div>
    ${h.edit?`<div class="row between" style="margin-bottom:12px">
        <span class="muted small">已选 ${h.selected.size} 题</span>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export">导出</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${h.selected.size?"":"disabled"}>删除</button>
        </div>
      </div>`:""}
    ${a}
    <p class="muted small" style="margin-top:18px;text-align:center">共 ${it().length} 题 · 当前显示 ${t.length} 题</p>`}async function Kt(t){const e=!t,a=document.createElement("div");if(a.innerHTML=`
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
    </div>`,!await I({title:e?"添加题目":"编辑题目",body:a,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:f=>{const v=f.querySelector('[data-role="classify"]');v&&v.addEventListener("click",async()=>{const b=f.querySelector('[data-role="q"]')?.value.trim()??"";if(!b){l.error("先写题干，AI 才能判断归类");return}const k=f.querySelector('[data-role="opts"]')?.value??"",B=v.textContent??"";v.disabled=!0,v.textContent="归类中…";try{const R=await w.ai.classify(`题目：${b}
选项：${k.split(`
`).join("；")}`),A=JSON.parse(fa(R.result??"{}")),ot=f.querySelector('[data-role="subject"]'),zt=f.querySelector('[data-role="chapter"]');A.subject&&ot&&(ot.value=String(A.subject).slice(0,24)),A.chapter&&zt&&(zt.value=String(A.chapter).slice(0,24)),l.ok("已根据题目填入题库与章节")}catch{l.error("AI 归类失败，可手动填写")}finally{v.disabled=!1,v.textContent=B}})}}))return;const s=f=>a.querySelector(`[data-role="${f}"]`).value,i=s("q").trim();if(!i){l.error("题干不能为空");return}const r=s("opts").split(`
`).map(f=>f.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),c=s("a").trim();let u="";if(r.length){const v=c.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(b=>b.charCodeAt(0)-65).filter(b=>b>=0&&b<r.length);if(!v.length){l.error("答案请填选项字母，如 A 或 A,B");return}u=v.length===1?v[0]:v}else u=c;const m={q:i,opts:r,a:u,chapter:s("chapter").trim(),subject:s("subject").trim()||"默认题库"};try{e?await w.questions.add([m]):await w.questions.update(t.id,m),H("bank"),await J(!0),l.ok(e?"题目已添加":"题目已保存")}catch(f){l.error(f instanceof $?f.message:"保存失败")}}async function da(){const t=document.createElement("div");t.innerHTML=`
    <label class="field">
      <span class="field-label">粘贴题目文本，或上传截图</span>
      <textarea class="textarea" data-role="text" placeholder="把题目文字贴进来…"></textarea>
    </label>
    <label class="btn btn-block" style="cursor:pointer">
      📷 选择图片
      <input type="file" accept="image/*" data-role="file" hidden>
    </label>
    <p class="muted small" style="margin:10px 0 0">AI 会识别题干、选项与答案，导入前可以再改。</p>`;const e=t.querySelector('[data-role="file"]'),a=e.closest("label");if(e.addEventListener("change",()=>{const r=e.files?.[0];r&&(a.textContent=`已选择：${r.name}`)}),!await I({title:"AI 导入题目",body:t,actions:[{label:"取消",value:!1},{label:"识别",value:!0,variant:"primary"}]}))return;const s=t.querySelector('[data-role="text"]').value.trim(),i=e.files?.[0];if(!s&&!i){l.info("还没给我内容呢");return}l.info("AI 正在识别…");try{const r={};s&&(r.prompt=s),i&&(r.image=await ua(i));const c=await w.ai.extract(r),u=pa(c.result??"");if(!u.length){l.error("没有识别出题目，换个清晰点的图片试试");return}await w.questions.add(u),H("bank"),await J(!0),l.ok(`已导入 ${u.length} 道题`)}catch(r){l.error(r instanceof $?r.message:"识别失败")}}function ua(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>a(new Error("图片读取失败")),n.readAsDataURL(t)})}function fa(t){const e=t.replace(/```json/gi,"```").trim(),a=/```([\s\S]*?)```/.exec(e)?.[1]??e,n=a.indexOf("{"),s=a.lastIndexOf("}");return n===-1||s<=n?"{}":a.slice(n,s+1)}function pa(t){const e=t.replace(/```json/gi,"```").trim(),a=/```([\s\S]*?)```/.exec(e)?.[1]??e,n=a.indexOf("["),s=a.lastIndexOf("]");if(n===-1||s<=n)return[];try{return JSON.parse(a.slice(n,s+1)).map(r=>{const c=String(r.q??r.question??"").trim();if(!c)return null;const u=Array.isArray(r.opts??r.options)?(r.opts??r.options).map(String):[];let m="";const f=r.a??r.answer;if(typeof f=="string"){const b=f.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(k=>k.charCodeAt(0)-65).filter(k=>k>=0&&k<u.length);m=u.length?b.length===1?b[0]:b:f}else typeof f=="number"&&(m=f);return{q:c,opts:u,a:m,chapter:String(r.chapter??"").trim(),subject:String(r.subject??"默认题库").trim()||"默认题库"}}).filter(r=>!!r)}catch{return[]}}function ba(){const t=it().filter(s=>h.selected.has(s.id));if(!t.length){l.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=`题库-${t.length}题.json`,n.click(),URL.revokeObjectURL(a),l.ok(`已导出 ${t.length} 题`)}async function ma(){await J()}async function va(t,e){switch(t){case"subject":return h.subject=e.dataset.subject??"all",!0;case"toggle-edit":return h.edit=!h.edit,h.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return h.selected.has(a)?h.selected.delete(a):h.selected.add(a),!0}case"add":return await Kt(),!0;case"edit":{const a=it().find(n=>n.id===Number(e.dataset.id));return a&&await Kt(a),!0}case"delete-selected":{const a=[...h.selected];if(!a.length||!await bt({title:"删除题目",message:`确定删除选中的 ${a.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await w.questions.remove(a),h.selected.clear(),H("bank"),await J(!0),l.ok("已删除")}catch(n){l.error(n instanceof $?n.message:"删除失败")}return!0}case"export":return ba(),!0;case"ai-import":return await da(),!0;case"search":return!0;default:return!1}}function ga(t){return t.dataset.role==="search"?(h.search=t.value,!0):!1}const ha="modulepreload",ya=function(t){return"/"+t},Gt={},wa=function(e,a,n){let s=Promise.resolve();if(a&&a.length>0){let r=function(m){return Promise.all(m.map(f=>Promise.resolve(f).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),u=c?.nonce||c?.getAttribute("nonce");s=r(a.map(m=>{if(m=ya(m),m in Gt)return;Gt[m]=!0;const f=m.endsWith(".css"),v=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${v}`))return;const b=document.createElement("link");if(b.rel=f?"stylesheet":ha,f||(b.as="script"),b.crossOrigin="",b.href=m,u&&b.setAttribute("nonce",u),document.head.appendChild(b),f)return new Promise((k,B)=>{b.addEventListener("load",k),b.addEventListener("error",()=>B(new Error(`Unable to preload CSS for ${m}`)))})}))}function i(r){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=r,window.dispatchEvent(c),!c.defaultPrevented)throw r}return s.then(r=>{for(const c of r||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})};function ge(t){return new Promise(e=>window.setTimeout(e,t))}function $a(t,e,a=620,n="%"){const s=performance.now(),i=r=>{const c=Math.min((r-s)/a,1),u=1-Math.pow(1-c,3);t.innerHTML=`${Math.round(e*u)}<span>${n}</span>`,c<1&&requestAnimationFrame(i)};requestAnimationFrame(i)}function ft(t=12){E.vibration&&navigator.vibrate?.(t)}let g=null,et=null;function X(){return g?g.options.questions[g.idx]??null:null}function mt(t){const e=g;let a=e.records.get(t.id);return a||(a={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,a)),a}function he(){const t=g;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function ka(){const t=g;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function xa(t,e){if(j(t.a))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${d(e.text)}</textarea>
      </div>`;const a=rt(t.a);return`<div class="opts" data-multi="${a.length>1}">${t.opts.map((s,i)=>{let r="";return e.submitted?a.includes(i)?r="correct":e.picked.includes(i)?r="wrong":r="muted":e.picked.includes(i)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${i}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+i)}</span>
        <span class="opt-text">${st(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function Sa(t,e){if(!e.submitted)return"";const a=j(t.a)?String(t.a):Q(t.a,t.opts),n=j(t.a)?U(e.text)||"（空）":Q(e.picked.length?e.picked:[],t.opts)||"（未选）";if(j(t.a)){const s=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${g?.busy?"disabled":""}>✦ AI 阅卷</button>
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
    正确答案：${d(Q(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${d(n)}`}
  </div>`}function Aa(){const t=g,e=X();if(!e)return"";const a=mt(e),n=t.options.questions.length,s=n?Math.round((t.idx+(a.submitted?1:0))/n*100):0,i=rt(e.a).length>1&&!j(e.a);return`
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
        <div class="q-text">${st(e.q)}</div>
        ${xa(e,a)}
        ${Sa(e,a)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${ut(e.id)}" aria-label="收藏">${ut(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!Mt()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${a.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===n-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${i||j(e.a)?"提交答案":"查看答案"}</button>`}
    </div>`}function Ea(t,e){g={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},T(),et=a=>{const n=g;if(!n)return;const s=a.target,i=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(a.key==="Escape"){if(document.querySelector(".modal-layer"))return;Ut();return}if(i)return;const r=X();if(!r)return;const c=mt(r);if(a.key===" "||a.key==="Enter"){const m=n.root?.querySelector('[data-act="submit"]'),f=n.root?.querySelector('[data-act="next"]');m?(a.preventDefault(),M("submit",m)):f&&(a.preventDefault(),M("next",f));return}if(a.key==="ArrowRight"){a.preventDefault(),c.submitted?Bt():M("submit",n.root.querySelector('[data-act="submit"]'));return}if(a.key==="ArrowLeft"){a.preventDefault(),M("prev",n.root);return}const u=a.key.toLowerCase();if(/^[1-9]$/.test(u)||/^[a-h]$/.test(u)){const m=/^[1-9]$/.test(u)?Number(u)-1:u.charCodeAt(0)-97;if(m<r.opts.length){a.preventDefault();const f=n.root?.querySelector(`.opt[data-idx="${m}"]`);f&&M("pick",f)}return}u==="s"?M("fav",n.root):u==="n"?M("note",n.root):u==="e"?M("ai",n.root):u==="g"?M("ai-grade",n.root):u==="?"&&wa(()=>Promise.resolve().then(()=>Qa),void 0).then(m=>m.openShortcuts())},document.addEventListener("keydown",et),t.addEventListener("submit",a=>a.preventDefault()),t.addEventListener("input",ye)}function T(){const t=g;t?.root&&(t.root.innerHTML=Aa())}function ye(t){const e=t.target;e?.dataset.role!=="essay"||!g||(g.textDraft=e.value)}async function ht(t,e){const a=g;if(e.submitted=!0,j(t.a))e.correct=null;else if(e.correct=ze(e.picked,t.a),e.correct){ft(10);const n=ja();n>=3&&n%3===0&&l.ok(`连对 ${n} 题，保持住`)}else ft([14,40,14]),Pt(t,e);T(),e.correct&&a.options.questions.length>a.idx+1&&(await ge(600),g&&g.idx===a.idx&&Bt())}function ja(){const t=g;let e=0;for(let a=t.idx;a>=0;a-=1){const n=t.records.get(t.options.questions[a].id);if(n?.submitted)if(n.correct===!0)e+=1;else break}return e}async function Pt(t,e){try{await w.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(a){a instanceof $&&a.status!==401&&l.error(`错题保存失败：${a.message}`)}}function Bt(){const t=g,e=t.options.questions.length;if(t.idx>=e-1){La();return}t.idx+=1,t.textDraft="",T(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function Rt(){et&&document.removeEventListener("keydown",et),et=null,g?.root?.removeEventListener("input",ye),g?.root?.replaceChildren(),g=null}async function Ut(){const t=g;if(!t)return;const e=he();if(!await bt({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;X()&&we();const s=t.options.onExit;Rt(),s?.()}function we(){const t=g;if(!t)return;t.options.source==="sequential"&&Ce(t.idx);const e=t.options.questions.slice(0,5).map(a=>U(a.q).slice(0,40));De(e)}async function La(){const t=g;we();const e=t.options.questions.length,a=he(),n=ka(),s=a-n,i=a?Math.round(n/a*100):0;if(Rt(),await I({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${n}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${a}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:c=>{const u=c.querySelector('[data-role="acc"]');u&&$a(u,i)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function qa(t,e,a){e.correct=a,a?ft(10):Pt(t,e),T(),a&&l.ok("已记为答对")}async function Ta(t,e){const a=g;if(a){a.busy=!0,T();try{const n=[`题目：${U(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${U(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await w.ai.grade(n),i=String(s.result||""),r=i.includes("得分")&&!i.includes("不得分");e.correct=r,r?ft(10):Pt(t,e),l.ok(r?"AI 阅卷：答对":"AI 阅卷：答错")}catch(n){l.error(n instanceof $?n.message:"AI 阅卷失败，请稍后再试")}finally{a.busy=!1,T()}}}async function Ia(){const t=X();if(!t)return;const e=Mt()[String(t.id)]??"",a=document.createElement("div");a.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${d(e)}</textarea>`;const n=a.querySelector("textarea");await I({title:"我的笔记",body:a,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>n.focus()})&&(Ne(t.id,n.value),l.ok("笔记已保存"),T())}async function Ma(){const t=X();if(!t)return;const e=mt(t),a=[`题目：${U(t.q)}`,t.opts.length?`选项：${t.opts.map((r,c)=>`${String.fromCharCode(65+c)}. ${U(r)}`).join("；")}`:"",`正确答案：${j(t.a)?t.a:Q(t.a,t.opts)}`,e.submitted?`我的作答：${j(t.a)?e.text:Q(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),n=document.createElement("div");n.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',I({title:"AI 深度解析",body:n,actions:[{label:"关闭",value:"close"}]});const s=n.querySelector('[data-role="text"]'),i=n.querySelector(".ai-title");try{let r="";const c=await w.ai.explainStream(a,u=>{r+=u,s.innerHTML=`${d(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`});i.textContent=r?`✦ AI 解析${c.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=d(c.text||r).replace(/\n/g,"<br>"):await Na(s,c.text??""),s.classList.remove("cursor")}catch(r){const c=r instanceof $?r.message:"AI 解析失败，请稍后重试";l.error(c),i.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=c}}async function Na(t,e){for(let a=0;a<e.length;a+=2)t.innerHTML=d(e.slice(0,a+2)).replace(/\n/g,"<br>"),await ge(12)}function Ca(){const t=g;if(!t)return;const e=t.options.questions.map((a,n)=>{const s=t.records.get(a.id),i=n===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${n}" data-state="${i}">${n+1}</button>`}).join("");I({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:a=>{a.querySelectorAll(".nav-cell").forEach(n=>{n.addEventListener("click",()=>{const s=Number(n.dataset.idx);!Number.isFinite(s)||!g||(g.idx=s,g.textDraft="",be(),T())})})}}).then(a=>{a==="finish"&&Ut()})}async function M(t,e){const a=g;if(!a)return!1;const n=X();if(!n)return!1;const s=mt(n);switch(t){case"pick":{if(s.submitted)return!0;const i=Number(e.dataset.idx);return j(n.a)||(rt(n.a).length>1?(s.picked=s.picked.includes(i)?s.picked.filter(c=>c!==i):[...s.picked,i],T()):(s.picked=[i],await ht(n,s))),!0}case"submit":{if(j(n.a)){const i=a.root?.querySelector('[data-role="essay"]');if(s.text=i?.value??a.textDraft,!s.text.trim())return l.info("先写点什么再提交吧"),!0;await ht(n,s)}else{if(!s.picked.length)return l.info("请先选择答案"),!0;await ht(n,s)}return!0}case"ai-grade":return!j(n.a)||g?.busy||await Ta(n,s),!0;case"mark":return j(n.a)&&qa(n,s,e.dataset.ok==="1"),!0;case"next":return Bt(),!0;case"prev":return a.idx>0&&(a.idx-=1,a.textDraft="",T()),!0;case"jump":return a.idx=Number(e.dataset.idx),a.textDraft="",be(),T(),!0;case"nav":return Ca(),!0;case"exit":return await Ut(),!0;case"fav":return await ea(n.id),T(),!0;case"note":return await Ia(),!0;case"ai":return Ma(),!0;default:return!1}}let C=null;function Oa(){return!!(C&&document.body.contains(C))}function V(t){if(!t.questions.length){l.info("这里还没有题目");return}Qt(),C=document.createElement("div"),C.className="quiz",document.body.appendChild(C),document.body.classList.add("is-locked"),Ea(C,{...t,onExit:()=>{Qt(),t.onExit?.()}}),Oe({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function Qt(){C&&(Rt(),C.remove(),C=null,document.body.classList.remove("is-locked"))}async function yt(t="random"){const e=o.bank??[];if(!e.length){l.info("题库还是空的，先去添加题目吧");return}if(t==="chapter"){const n=await Pa(e);if(!n?.length)return;const s=e.filter(r=>n.includes(r.chapter||"未分类")),i=await pt(s.length);if(i===null)return;V({questions:s.slice(0,i),source:"chapter",title:"章节练习"});return}const a=await pt(e.length);if(a!==null){if(t==="sequential"){const n=Math.min(ne(),Math.max(e.length-1,0));V({questions:e.slice(0,a),source:"sequential",title:"顺序练习",startIndex:n<a?n:0});return}V({questions:ce(e).slice(0,a),source:"all",title:"随机练习"})}}async function $e(){const t=o.wrong??await K(!0);if(!t.length){l.info("错题本是空的，先去刷几题吧");return}const e=await pt(t.length);if(e===null)return;const a=t.slice(0,e).map(n=>({id:n.id,q:n.q,opts:n.opts,a:n.a,chapter:n.chapter,subject:n.subject}));V({questions:a,source:"wrong",title:"错题重练"})}function Da(t){if(!t.length){l.info("还没有收藏题目");return}pt(t.length).then(e=>{e!==null&&V({questions:ce(t).slice(0,e),source:"fav",title:"收藏练习"})})}function _a(){const t=se(),e=o.bank??[];if(!t||!e.length)return l.info("没有可以继续的练习"),!1;const a=new Map(e.map(s=>[s.id,s])),n=t.ids.map(s=>a.get(s)).filter(s=>!!s);return n.length?(V({questions:n,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,n.length-1)}),!0):(re(),l.info("上次的题目已经不在了"),!1)}function pt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const a=document.createElement("div");a.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const n=a.querySelector('[data-role="count"]');return n.addEventListener("click",s=>{const i=s.target.closest("button[data-n]");i&&(n.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),i.setAttribute("aria-pressed","true"))}),I({title:"练多少题",body:a,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const i=n.querySelector('button[aria-pressed="true"]');return Number(i?.dataset.n??t)})}async function Pa(t){const e=new Map;t.forEach(r=>{const c=r.chapter?.trim()||"未分类";e.set(c,(e.get(c)??0)+1)});const a=[...e.entries()].sort((r,c)=>c[1]-r[1]);if(!a.length)return null;const n=document.createElement("div");if(n.innerHTML=`<div class="list">${a.map(([r,c],u)=>`
      <button class="item" data-chapter="${d(r)}" data-checked="${u===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${d(r)}</span><span class="tag">${c} 题</span></div>
      </button>`).join("")}</div>`,n.addEventListener("click",r=>{const c=r.target.closest("[data-chapter]");c&&(c.dataset.checked=c.dataset.checked==="true"?"false":"true")}),!await I({title:"选择章节",body:n,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const i=Array.from(n.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return i.length?i:null}const W=new Set;function Ba(){W.clear()}function jt(){return o.favs??[]}function Ra(){const t=jt(),e=o.loading.fav&&!o.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(a=>`
        <div class="item" data-id="${a.id}">
          <div class="item-q">${st(a.q)}</div>
          <div class="item-meta">
            ${a.subject?`<span class="tag tag-accent">${d(a.subject)}</span>`:""}
            ${a.chapter?`<span class="tag">${d(a.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${a.id}">${W.has(a.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${a.id}">取消收藏</button>
          </div>
          ${W.has(a.id)?`<div class="item-answer"><div class="right">${d(Q(a.a,a.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function Ua(){await at()}async function Ha(t,e){switch(t){case"practice":return jt().length?(await Da(jt()),!0):(l.info("还没有收藏的题"),!0);case"reveal":{const a=Number(e.dataset.id);return W.has(a)?W.delete(a):W.add(a),!0}case"remove":{const a=Number(e.dataset.id);try{await w.favorites.remove(a),W.delete(a),H("fav"),await at(!0),l.ok("已取消收藏")}catch(n){l.error(n instanceof $?n.message:"操作失败")}return!0}default:return!1}}let wt="";function za(){return(!Pe()||!wt)&&(wt=aa(),Be()),wt}function Fa(){const t=o.bank,e=o.wrong,a=o.favs,n=o.loading,s=se(),i=ie().slice(0,4),r=ne();return`
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
  `}async function Wa(){await Promise.allSettled([J(),K(),at()])}async function Ja(t,e){switch(t){case"goto":return Ct(e.dataset.tab??"bank"),!0;case"random":return await yt("random"),!0;case"sequential":return await yt("sequential"),!0;case"chapter":return await yt("chapter"),!0;case"wrong":return await $e(),!0;case"resume":return _a(),!0;default:return!1}}const ke=[{keys:"1 2 3 4 / A B C D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1 – 5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/",desc:"聚焦题库搜索框",scope:"题库页"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function Ht(){const t=ke.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");I({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const Ka=["home","bank","wrong","fav","me"];function Ga(t){const e=t;if(!e)return!1;const a=e.tagName.toLowerCase();return a==="input"||a==="textarea"||a==="select"||e.isContentEditable}function xe(){document.addEventListener("keydown",t=>{if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||Ga(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),Ht();return}if(t.key==="/"){const a=document.querySelector('.view input[data-role="search"]');a&&(t.preventDefault(),a.focus());return}const e=Number(t.key);e>=1&&e<=5&&(t.preventDefault(),Ct(Ka[e-1]))})}const Qa=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:ke,installShortcuts:xe,openShortcuts:Ht},Symbol.toStringTag,{value:"Module"})),Va=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],Xa=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function Vt(t,e,a){return`<div class="segmented">${t.map(n=>`<button class="seg" data-act="${a}" data-value="${n.value}" aria-pressed="${String(n.value)===String(e)}">${n.label}</button>`).join("")}</div>`}function Xt(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),URL.revokeObjectURL(n)}async function Ya(){const t=document.createElement("div");if(t.innerHTML=`
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
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function tn(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){l.error("图片太大了（最多 8MB）");return}try{const a=await en(e);Z({image:a,color:""}),l.ok("背景已更新"),x("render")}catch{l.error("这张图片读不出来，换一张试试")}}},t.click()}function en(t){return new Promise((e,a)=>{const n=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(n);const i=Math.min(1,1600/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*i),r.height=Math.round(s.height*i);const c=r.getContext("2d");if(!c){a(new Error("canvas unavailable"));return}c.drawImage(s,0,0,r.width,r.height),e(r.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(n),a(new Error("image load failed"))},s.src=n})}function an(){Dt()}async function nn(t,e){switch(t){case"theme":return Qe(e.dataset.value),x("render"),!0;case"delay":return lt({autoDelay:Number(e.dataset.value)}),x("render"),!0;case"toggle-vibration":return lt({vibration:!E.vibration}),x("render"),!0;case"toggle-streak":return lt({streakAlert:!E.streakAlert}),x("render"),!0;case"pick-color":return Z({color:e.value,image:""}),!0;case"pick-bg":return await tn(),!0;case"clear-bg":return Z({image:""}),x("render"),!0;case"dim":return Z({dim:Number(e.value)}),!0;case"shortcuts":return Ht(),!0;case"about":return I({title:"关于",body:`<p class="muted small" style="margin:0 0 10px">原点 · Origin —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。</p>
          <p class="muted small" style="margin:0 0 6px">题库 ${o.bank?.length??0} 题 · 错题 ${o.wrong?.length??0} 道 · 收藏 ${o.favs?.length??0} 条</p>
          <p class="muted small" style="margin:0">版本 v2.0.0 · 支持 PWA 离线打开</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]}),!0;case"reset-bg":return Z({color:"",image:"",dim:.35}),l.ok("背景已恢复"),x("render"),!0;case"export-bank":return o.bank?.length?(Xt(`题库-${o.user}.json`,o.bank),l.ok("已导出"),!0):(l.info("题库是空的"),!0);case"export-wrong":return o.wrong?.length?(Xt(`错题-${o.user}.json`,o.wrong),l.ok("已导出"),!0):(l.info("没有错题"),!0);case"change-password":return await Ya(),!0;case"logout":return await bt({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(ue(),l.info("已退出登录")),!0;default:return!1}}const y={subject:"all",edit:!1,selected:new Set};function sn(){y.subject="all",y.edit=!1,y.selected.clear()}function Se(){const t=o.wrong??[];return y.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===y.subject)}function rn(){return["all",...Array.from(new Set((o.wrong??[]).map(t=>t.subject||"默认题库")))]}function on(){const t=Se(),e=o.wrong?.length??0,a=rn().map(s=>`<button class="chip" data-act="subject" data-subject="${d(s)}" aria-pressed="${y.subject===s}">
          ${s==="all"?"全部":d(s)}
        </button>`).join(""),n=o.loading.wrong&&!o.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${y.selected.has(s.id)}">
          ${y.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${st(s.q)}</div>
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
    ${n}`}async function cn(){await K()}async function ln(t,e){switch(t){case"subject":return y.subject=e.dataset.subject??"all",!0;case"toggle-edit":return y.edit=!y.edit,y.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return y.selected.has(a)?y.selected.delete(a):y.selected.add(a),!0}case"practice":return Se().length?(await $e(),!0):(l.info("没有可练的错题"),!0);case"remove":{const a=Number(e.dataset.id);try{await w.wrong.remove([a]),y.selected.delete(a),H("wrong"),await K(!0),l.ok("已标记掌握，继续加油")}catch(n){l.error(n instanceof $?n.message:"操作失败")}return!0}case"remove-selected":{const a=[...y.selected];if(!a.length||!await bt({title:"删除错题",message:`确定删除选中的 ${a.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await w.wrong.remove(a),y.selected.clear(),H("wrong"),await K(!0),l.ok("已删除")}catch(n){l.error(n instanceof $?n.message:"删除失败")}return!0}default:return!1}}const G={home:{render:Fa,mount:Wa,handle:Ja},bank:{render:la,mount:ma,handle:va,onInput:ga,reset:me},wrong:{render:on,mount:cn,handle:ln,reset:sn},fav:{render:Ra,mount:Ua,handle:Ha,reset:Ba},me:{render:Za,mount:an,handle:nn}};let nt=!1,z=!1,$t=!1,kt=!1;function Ae(){return document.getElementById("app-root")}function dn(){z=!1,Ae().innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-name">Origin Quiz</span>
        </div>
        <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(o.user||"?").slice(0,1).toUpperCase()}</button>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${Et.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${Et.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,nt=!0}function un(){document.querySelectorAll(".tab-btn").forEach(e=>{const a=e.dataset.tab===o.tab;e.classList.toggle("is-active",a),e.setAttribute("aria-selected",String(a))});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,Et.findIndex(a=>a.id===o.tab));t.style.setProperty("--tab-index",String(e))}}function fn(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,a=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),n=a?e.getAttribute("data-role"):null,s=a&&e instanceof HTMLInputElement?e.selectionStart:null,i=G[o.tab]??G.home;if(t.innerHTML=`<div class="view-inner">${i.render()}</div>`,un(),a&&n){const r=t.querySelector(`[data-role="${n}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}i.mount?.()}function O(){if($t){kt=!0;return}$t=!0;try{if(!o.authed&&!o.token){z=!0,nt=!1,Ae().innerHTML=sa();return}nt||dn(),fn()}finally{$t=!1,kt&&(kt=!1,queueMicrotask(O))}}let xt=!1;function Yt(){xt||(xt=!0,setTimeout(()=>{xt=!1,O()},0))}async function Ee(t){await t(),z&&O()}function je(t){const e=t.dataset.act??"";if(Oa()&&t.closest(".quiz")){M(e,t).then(n=>{n||x("render")});return}if(e==="tab"){Ct(t.dataset.tab??"home");return}if(z){Ee(()=>fe(e,t));return}const a=G[o.tab]??G.home;a.handle&&Promise.resolve(a.handle(e,t)).then(n=>{n&&O()})}function pn(t){const e=t.target;if(!e)return;const a=e.closest("[data-act]");a&&(a.closest(".modal-layer")||je(a))}function Zt(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){je(e);return}if(z)return;const a=document.getElementById("view");if(!a||!a.contains(e))return;(G[o.tab]??G.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&O()}function bn(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),z&&Ee(()=>fe("submit",e)))}function mn(){Ot(),Dt(),We(()=>{ue(),nt=!1,z=!1,l.error("登录已过期，请重新登录"),x("auth")}),ct("nav",()=>{Object.entries(G).forEach(([t,e])=>{t!==o.tab&&e.reset?.()}),O()}),ct("auth",()=>{nt=!1,z=!1,o.authed?(me(),O(),Promise.allSettled([J(!0),K(!0),at(!0)])):O()}),ct("render",Yt),ct("data",Yt),document.addEventListener("click",pn),document.addEventListener("change",Zt),document.addEventListener("input",Zt),document.addEventListener("submit",bn),xe(),o.token&&(o.authed=!0),O(),o.token&&Promise.allSettled([J(),K(),at()])}function te(){try{mn()}catch(t){console.error("[origin-quiz] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",te,{once:!0}):te();
