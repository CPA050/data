var we=Object.defineProperty;var $e=(t,e,a)=>e in t?we(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var Bt=(t,e,a)=>$e(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const St="oq:",At="oq:user",jt="oq:token",ke={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},A={...ke,...C("settings",{})};["auto","light","dark","eye"].includes(A.theme)||(A.theme="auto");function C(t,e){try{const a=localStorage.getItem(St+t);return a===null?e:JSON.parse(a)}catch{return e}}function O(t,e){try{localStorage.setItem(St+t,JSON.stringify(e))}catch{}}function wt(t){try{localStorage.removeItem(St+t)}catch{}}function it(t){Object.assign(A,t),O("settings",A)}function xe(t){it({theme:t})}function j(){return C(At,"")||""}function Kt(t){O(At,t)}function Se(){wt(At),wt(jt)}function Et(){return C(jt,"")||""}function Vt(t){O(jt,t)}function _(t){return`u:${j()||"anon"}:${t}`}function qt(){return C(_("notes"),{})}function Ae(t,e){const a=qt(),n=String(t);e.trim()?a[n]=e:delete a[n],O(_("notes"),a)}function Xt(){const t=C(_("progress"),{});return Number(t.sequential_index)||0}function je(t){O(_("progress"),{sequential_index:t,updatedAt:Date.now()})}function Yt(){const t=C(_("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function Ee(t){O(_("session"),t)}function Zt(){wt(_("session"))}function te(){return C(_("recent"),[])}function qe(t){const e=[...t,...te()].slice(0,30);O(_("recent"),Array.from(new Set(e)))}function ee(){return C("appearance",{color:"",image:"",dim:.35})}function Le(t){O("appearance",{...ee(),...t})}function Te(){return C("welcomed","")===new Date().toDateString()}function Ie(){O("welcomed",new Date().toDateString())}const Me={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function l(t){return String(t??"").replace(/[&<>"']/g,e=>Me[e]??e)}const Ne=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function Ce(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function tt(t){const e=Ce(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return l(e).replace(/\n/g,"<br>");const n=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!n)return l(e);const s=i=>{if(i.nodeType===Node.TEXT_NODE)return l(i.textContent??"").replace(/\n/g,"<br>");if(i.nodeType!==Node.ELEMENT_NODE)return"";const r=i,c=r.tagName,p=Array.from(r.childNodes).map(s).join("");if(!Ne.has(c))return p;if(c==="IMG"){const b=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(b))return"";const m=l(r.getAttribute("alt")??"");return`<img src="${l(b)}" alt="${m}" loading="lazy" referrerpolicy="no-referrer">`}const $=c.toLowerCase();return`<${$}>${p}</${$}>`};return Array.from(n.childNodes).map(s).join("")}function K(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function et(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(a=>Number.isInteger(a)))).sort((a,n)=>a-n)}function L(t){return typeof t=="string"}function G(t,e=[]){return typeof t=="string"?t:et(t).map(a=>{const n=String.fromCharCode(65+a),s=(e[a]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${n}. ${s}`:n}).join("、")}function ae(t){const e=[...t];for(let a=e.length-1;a>0;a-=1){const n=Math.floor(Math.random()*(a+1));[e[a],e[n]]=[e[n],e[a]]}return e}function Oe(t,e){const a=et(e);if(!a.length||t.length!==a.length)return!1;const n=[...new Set(t)].sort((s,i)=>s-i);return n.length===a.length&&n.every((s,i)=>s===a[i])}function _e(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const a=JSON.parse(e);if(typeof a=="number")return a;if(Array.isArray(a))return a.map(Number).filter(Number.isInteger);if(typeof a=="string")return a}catch{}return e}return""}class w extends Error{constructor(a,n){super(n);Bt(this,"status");this.name="ApiError",this.status=a}}let Lt=null;function Be(t){Lt=t}async function ne(t,e={}){const a=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&a.set("Content-Type","application/json");const n=Et();n&&a.set("Authorization",`Bearer ${n}`),a.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:a})}catch{throw new w(0,"网络连接失败，请检查网络后重试")}const i=s.headers.get("content-type")??"";let r=null;i.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const c=r??{};if(s.status===401)throw Lt?.(),new w(401,typeof c.error=="string"?c.error:"登录已过期，请重新登录");if(!s.ok||c.ok===!1){const p=typeof c.error=="string"&&c.error?c.error:`请求失败（HTTP ${s.status}）`;throw new w(s.status,p)}return r}const pt=t=>ne(t),k=(t,e)=>ne(t,{method:"POST",body:JSON.stringify(e)});async function He(t,e,a){const n=new Headers({"Content-Type":"application/json"}),s=Et();s&&n.set("Authorization",`Bearer ${s}`);const i=await fetch("/api/ai",{method:"POST",headers:n,body:JSON.stringify({...t,stream:!0}),signal:a});if(!i.ok||!i.body){const m=await i.json().catch(()=>({}));if(i.status===401)throw Lt?.(),new w(401,"登录已过期，请重新登录");if(typeof m.result=="string")return e(m.result),{text:m.result,cached:!1};throw new w(i.status,typeof m.error=="string"?m.error:"AI 解析失败")}const r=i.body.getReader(),c=new TextDecoder;let p="",$="",b=!1;for(;;){const{value:m,done:v}=await r.read();if(v)break;p+=c.decode(m,{stream:!0});const x=p.split(`

`);p=x.pop()??"";for(const W of x){const B=W.split(`
`).find(st=>st.startsWith("data:"));if(!B)continue;let S;try{S=JSON.parse(B.slice(5).trim())}catch{continue}if(typeof S.delta=="string"&&S.delta&&($+=S.delta,e(S.delta)),typeof S.error=="string")throw new w(502,S.error);S.done&&(b=S.cached===!0)}}return{text:$,cached:b}}function $t(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:_e(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function De(t){return{...$t(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}const y={auth:{check:t=>k("/api/auth",{action:"check",username:t}),set:(t,e)=>k("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>k("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>k("/api/auth",{action:"change",username:j(),oldPassword:t,newPassword:e})},questions:{async list(){const t=j();if(!t)return[];const e=await pt(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>$t(n))},add:t=>k("/api/questions-add",{user_id:j(),questions:t}),update:(t,e)=>k("/api/questions-update",{id:t,user_id:j(),...e}),remove:t=>k("/api/questions-delete",{ids:t,user_id:j()})},wrong:{async list(){const t=j();if(!t)return[];const e=await pt(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>De(n))},add:t=>k("/api/wrong-add",{user_id:j(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""}),remove:t=>k("/api/wrong-delete",{ids:t,user_id:j()})},favorites:{async list(){const t=j();if(!t)return[];const e=await pt(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>$t(n))},add:t=>k("/api/favorites-add",{user_id:j(),question_id:t}),remove:t=>k("/api/favorites-remove",{user_id:j(),question_id:t})},ai:{explain:t=>k("/api/ai",{action:"explain",prompt:t}),grade:t=>k("/api/ai",{action:"grade",prompt:t}),extract:t=>k("/api/ai",{action:"extract",...t}),classify:t=>k("/api/ai",{action:"classify",prompt:t}),explainStream:(t,e,a)=>He({action:"explain",prompt:t},e,a)}};let I=null;function Pe(){return I&&document.body.contains(I)||(I=document.createElement("div"),I.className="toast-host",I.setAttribute("role","status"),I.setAttribute("aria-live","polite"),document.body.appendChild(I)),I}function ft(t,e="info",a=2600){if(!t)return;const n=document.createElement("div");n.className=`toast toast-${e}`,n.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${l(t)}</span>`,Pe().appendChild(n),requestAnimationFrame(()=>n.classList.add("in")),window.setTimeout(()=>{n.classList.remove("in"),window.setTimeout(()=>n.remove(),220)},a)}const d={info:t=>ft(t,"info"),ok:t=>ft(t,"success"),error:t=>ft(t,"error",3200)},kt=[{id:"home",label:"首页",icon:"⌂"},{id:"bank",label:"题库",icon:"▤"},{id:"wrong",label:"错题",icon:"⚑"},{id:"fav",label:"收藏",icon:"★"},{id:"me",label:"我的",icon:"☺"}],Ht=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],o={tab:"home",user:j(),token:Et(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},V=new Map;function rt(t,e){return V.has(t)||V.set(t,new Set),V.get(t).add(e),()=>V.get(t)?.delete(e)}function E(t){V.get(t)?.forEach(e=>e())}function se(t){o.tab!==t&&(o.tab=t,E("nav"))}const re=window.matchMedia("(prefers-color-scheme: dark)");function Dt(){return A.theme==="auto"?re.matches?"dark":"light":A.theme}function Tt(){document.documentElement.dataset.theme=Dt();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=Dt()==="dark"?"#0b0c0f":"#f4f5f7")}function ze(t){xe(t),Tt()}re.addEventListener("change",()=>{A.theme==="auto"&&Tt()});function Re(t){Le(t)}function It(){const{color:t,image:e,dim:a}=ee(),n=document.body;n.style.backgroundImage=e?`url("${e}")`:"",n.style.backgroundSize="cover",n.style.backgroundPosition="center",n.style.backgroundAttachment="fixed",n.dataset.dim=String(a),t&&!e?n.style.backgroundColor=t:n.style.backgroundColor=""}async function Ue(t,e){const a=await y.auth.login(t,e);Vt(a.token),Kt(t),o.user=t,o.token=a.token,o.authed=!0,D(),E("auth")}async function Fe(t,e){const a=await y.auth.set(t,e);Vt(a.token),Kt(t),o.user=t,o.token=a.token,o.authed=!0,D(),E("auth")}function ie(){o.user="",o.token="",o.authed=!1,o.bank=null,o.wrong=null,o.favs=null,o.favoriteIds=new Set,Se(),Zt(),E("auth")}const Je=300*1e3,z={bank:0,wrong:0,fav:0},ot=new Map;function D(t){t?(z[t]=0,t==="bank"&&(o.bank=null),t==="wrong"&&(o.wrong=null),t==="fav"&&(o.favs=null)):(z.bank=z.wrong=z.fav=0,o.bank=null,o.wrong=null,o.favs=null)}function We(t,e){const a=ot.get(t);if(a)return a;const n=e().finally(()=>ot.delete(t));return ot.set(t,n),n}async function Mt(t,e,a,n){if(!o.user)return[];const s=ot.get(t);if(s)return s;const i=Date.now()-z[t]<Je;if(!e&&i)return[];o.loading[t]=!0,E("data");try{const r=await We(t,a);return n(r),z[t]=Date.now(),r}catch(r){throw r instanceof w&&r.status!==401&&d.error(r.message),r}finally{o.loading[t]=!1,E("data")}}async function U(t=!1){try{await Mt("bank",t,()=>y.questions.list(),e=>{o.bank=e})}catch{}return o.bank??[]}async function F(t=!1){try{await Mt("wrong",t,()=>y.wrong.list(),e=>{o.wrong=e})}catch{}return o.wrong??[]}async function Y(t=!1){try{await Mt("fav",t,()=>y.favorites.list(),e=>{o.favs=e,o.favoriteIds=new Set(e.map(a=>a.id))})}catch{}return o.favs??[]}function lt(t){return o.favoriteIds.has(t)}async function Ge(t){const e=!lt(t);try{return e?await y.favorites.add(t):await y.favorites.remove(t),e?o.favoriteIds.add(t):o.favoriteIds.delete(t),o.favs=null,z.fav=0,d.ok(e?"已加入收藏":"已取消收藏"),E("data"),e}catch(a){return d.error(a instanceof w?a.message:"操作失败"),lt(t)}}function Qe(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${Ht[Math.floor(Math.random()*Ht.length)]}`}function Pt(t){Re(t),It()}const u={step:"name",username:"",busy:!1,error:""};function Ke(){u.step="name",u.username="",u.busy=!1,u.error=""}function Ve(){const t=`
    <div class="auth-brand">
      <div class="brand-mark">原</div>
      <div>
        <div class="auth-title">原点 · Origin</div>
        <div class="brand-sub">刷题 · 错题 · 收藏</div>
      </div>
    </div>`,e=u.error?`<div class="auth-error" role="alert">${l(u.error)}</div>`:"";if(u.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${l(u.username)}" required>
            </label>
            ${e}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${u.busy?"disabled":""}>
              ${u.busy?"检查中…":"继续"}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;const a=u.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${a?"为":"欢迎回来，"} <strong>${l(u.username)}</strong>${a?" 设置一个密码":""}</p>
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
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${u.busy?"disabled":""}>
            ${u.busy?"请稍候…":a?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${u.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function oe(t,e){if(t==="back")return u.step="name",u.error="",!0;if(t==="submit"){const a=e,n=new FormData(a);if(u.step==="name"){const i=String(n.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(i))return u.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;u.busy=!0,u.error="";try{const{hasPassword:r}=await y.auth.check(i);u.username=i,u.step=r?"password":"create"}catch(r){u.error=r instanceof w?r.message:"网络异常，请重试"}finally{u.busy=!1}return!0}if(u.busy)return!0;const s=String(n.get("password")??"");if(u.step==="create"){const i=String(n.get("confirm")??"");if(s!==i)return u.error="两次输入的密码不一致",!0}if(s.length<6)return u.error="密码至少 6 位",!0;u.busy=!0,u.error="";try{u.step==="create"?await Fe(u.username,s):await Ue(u.username,s),d.ok(u.step==="create"?"账号已创建，开始刷题吧":`欢迎回来，${o.user}`),Ke()}catch(i){u.error=i instanceof w?i.message:"登录失败，请重试"}finally{u.busy=!1}return!0}return!1}let q=null,ct=0;function Xe(){return q&&document.body.contains(q)||(q=document.createElement("div"),q.className="modal-root",q.setAttribute("role","dialog"),q.setAttribute("aria-modal","true"),document.body.appendChild(q)),q}function Ye(){ct+=1,document.body.classList.add("is-locked")}function Ze(){ct=Math.max(0,ct-1),ct===0&&document.body.classList.remove("is-locked")}function T(t){const e=Xe(),a=t.dismissible!==!1;return new Promise(n=>{let s=!1;const i=v=>{s||(s=!0,m(),r.classList.remove("open"),window.setTimeout(()=>{r.remove(),Ze()},200),n(v))},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${a?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${l(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${l(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((v,x)=>`<button class="btn btn-${v.variant??"ghost"}" data-idx="${x}">${l(v.label)}</button>`).join("")}</div>`:""}
      </div>`;const c=r.querySelector(".modal-card"),p=c.querySelector(".modal-body");typeof t.body=="string"?p.innerHTML=t.body:t.body&&p.appendChild(t.body);const $=v=>{v.key==="Escape"&&a&&(v.stopPropagation(),i(null))},b=v=>{const x=v.target;if(x.closest("[data-close]")&&a){i(null);return}const W=x.closest("[data-idx]");if(!W)return;const B=t.actions?.[Number(W.dataset.idx)];B&&(B.keepOpen||i(B.value))},m=()=>{document.removeEventListener("keydown",$,!0),r.removeEventListener("click",b),q&&q.children.length===0&&q.classList.remove("open")};r.addEventListener("click",b),document.addEventListener("keydown",$,!0),e.appendChild(r),e.classList.add("open"),Ye(),t.onMount?.(c),requestAnimationFrame(()=>{r.classList.add("open");const v=c.querySelector("input, textarea, button.btn-primary, button");v&&window.matchMedia("(pointer: fine)").matches&&v.focus({preventScroll:!0})})})}function ut(t){return T({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}const f={search:"",subject:"all",edit:!1,selected:new Set};function ce(){f.search="",f.subject="all",f.edit=!1,f.selected.clear()}function at(){return o.bank??[]}function ta(){return["all",...Array.from(new Set(at().map(t=>t.subject||"默认题库")))]}function ea(){const t=f.search.trim().toLowerCase();return at().filter(e=>f.subject!=="all"&&(e.subject||"默认题库")!==f.subject?!1:t?K(e.q).toLowerCase().includes(t)||e.opts.some(a=>K(a).toLowerCase().includes(t)):!0)}function le(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(a=>String.fromCharCode(65+a)).join(" / ")}function aa(){const t=ea(),e=ta().map(n=>`<button class="chip" data-act="subject" data-subject="${l(n)}" aria-pressed="${f.subject===n}">
          ${n==="all"?"全部":l(n)}
        </button>`).join(""),a=o.loading.bank&&!o.bank?`<div class="list">${Array.from({length:4}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(n=>`
          <div class="item ${f.edit?"selectable":""}" data-id="${n.id}" data-checked="${f.selected.has(n.id)}">
            ${f.edit?`<span class="checkbox" data-act="select" data-id="${n.id}">✓</span>`:""}
            <div class="item-q">${tt(n.q)}</div>
            <div class="item-meta">
              ${n.subject?`<span class="tag tag-accent">${l(n.subject)}</span>`:""}
              ${n.chapter?`<span class="tag">${l(n.chapter)}</span>`:""}
              <span class="tag tag-ok">答案 ${l(le(n))}</span>
              <span class="grow"></span>
              ${f.edit?"":`<button class="btn btn-sm btn-ghost" data-act="edit" data-id="${n.id}">编辑</button>`}
            </div>
          </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${f.search?"没有匹配的题目":"题库还是空的"}</div><div class="empty-desc">${f.search?"换个关键词试试":"点右上角「＋」添加，或用 AI 从图片导入"}</div></div>`;return`
    <h1 class="page-title">题库</h1>
    <div class="row" style="margin-bottom:12px">
      <div class="search-box grow">
        <span class="ico">⌕</span>
        <input type="search" placeholder="搜索题目或选项" data-role="search" value="${l(f.search)}" enterkeyhint="search">
      </div>
      <button class="icon-btn" data-act="add" aria-label="添加题目">＋</button>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${f.edit?"✓":"☰"}</button>
    </div>
    <div class="chips">${e}</div>
    ${f.edit?`<div class="row between" style="margin-bottom:12px">
        <span class="muted small">已选 ${f.selected.size} 题</span>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export">导出</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${f.selected.size?"":"disabled"}>删除</button>
        </div>
      </div>`:""}
    ${a}
    <p class="muted small" style="margin-top:18px;text-align:center">共 ${at().length} 题 · 当前显示 ${t.length} 题</p>`}async function zt(t){const e=!t,a=document.createElement("div");if(a.innerHTML=`
    <label class="field">
      <span class="field-label">题干</span>
      <textarea class="textarea" data-role="q" placeholder="支持换行与图片">${l(t?.q??"")}</textarea>
    </label>
    <label class="field">
      <span class="field-label">选项（每行一个，留空表示简答题）</span>
      <textarea class="textarea" data-role="opts" placeholder="A. 选项一&#10;B. 选项二">${l((t?.opts??[]).join(`
`))}</textarea>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>
      <input class="input" data-role="a" value="${l(t?le(t):"")}" placeholder="A">
    </label>
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">章节</span>
        <input class="input" data-role="chapter" value="${l(t?.chapter??"")}" placeholder="如 第三章">
      </label>
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${l(t?.subject??"默认题库")}" placeholder="默认题库">
      </label>
    </div>
    <div class="row" style="justify-content:flex-end;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`,!await T({title:e?"添加题目":"编辑题目",body:a,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:b=>{const m=b.querySelector('[data-role="classify"]');m&&m.addEventListener("click",async()=>{const v=b.querySelector('[data-role="q"]')?.value.trim()??"";if(!v){d.error("先写题干，AI 才能判断归类");return}const x=b.querySelector('[data-role="opts"]')?.value??"",W=m.textContent??"";m.disabled=!0,m.textContent="归类中…";try{const B=await y.ai.classify(`题目：${v}
选项：${x.split(`
`).join("；")}`),S=JSON.parse(ra(B.result??"{}")),st=b.querySelector('[data-role="subject"]'),_t=b.querySelector('[data-role="chapter"]');S.subject&&st&&(st.value=String(S.subject).slice(0,24)),S.chapter&&_t&&(_t.value=String(S.chapter).slice(0,24)),d.ok("已根据题目填入题库与章节")}catch{d.error("AI 归类失败，可手动填写")}finally{m.disabled=!1,m.textContent=W}})}}))return;const s=b=>a.querySelector(`[data-role="${b}"]`).value,i=s("q").trim();if(!i){d.error("题干不能为空");return}const r=s("opts").split(`
`).map(b=>b.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),c=s("a").trim();let p="";if(r.length){const m=c.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(v=>v.charCodeAt(0)-65).filter(v=>v>=0&&v<r.length);if(!m.length){d.error("答案请填选项字母，如 A 或 A,B");return}p=m.length===1?m[0]:m}else p=c;const $={q:i,opts:r,a:p,chapter:s("chapter").trim(),subject:s("subject").trim()||"默认题库"};try{e?await y.questions.add([$]):await y.questions.update(t.id,$),D("bank"),await U(!0),d.ok(e?"题目已添加":"题目已保存")}catch(b){d.error(b instanceof w?b.message:"保存失败")}}async function na(){const t=document.createElement("div");t.innerHTML=`
    <label class="field">
      <span class="field-label">粘贴题目文本，或上传截图</span>
      <textarea class="textarea" data-role="text" placeholder="把题目文字贴进来…"></textarea>
    </label>
    <label class="btn btn-block" style="cursor:pointer">
      📷 选择图片
      <input type="file" accept="image/*" data-role="file" hidden>
    </label>
    <p class="muted small" style="margin:10px 0 0">AI 会识别题干、选项与答案，导入前可以再改。</p>`;const e=t.querySelector('[data-role="file"]'),a=e.closest("label");if(e.addEventListener("change",()=>{const r=e.files?.[0];r&&(a.textContent=`已选择：${r.name}`)}),!await T({title:"AI 导入题目",body:t,actions:[{label:"取消",value:!1},{label:"识别",value:!0,variant:"primary"}]}))return;const s=t.querySelector('[data-role="text"]').value.trim(),i=e.files?.[0];if(!s&&!i){d.info("还没给我内容呢");return}d.info("AI 正在识别…");try{const r={};s&&(r.prompt=s),i&&(r.image=await sa(i));const c=await y.ai.extract(r),p=ia(c.result??"");if(!p.length){d.error("没有识别出题目，换个清晰点的图片试试");return}await y.questions.add(p),D("bank"),await U(!0),d.ok(`已导入 ${p.length} 道题`)}catch(r){d.error(r instanceof w?r.message:"识别失败")}}function sa(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(String(n.result)),n.onerror=()=>a(new Error("图片读取失败")),n.readAsDataURL(t)})}function ra(t){const e=t.replace(/```json/gi,"```").trim(),a=/```([\s\S]*?)```/.exec(e)?.[1]??e,n=a.indexOf("{"),s=a.lastIndexOf("}");return n===-1||s<=n?"{}":a.slice(n,s+1)}function ia(t){const e=t.replace(/```json/gi,"```").trim(),a=/```([\s\S]*?)```/.exec(e)?.[1]??e,n=a.indexOf("["),s=a.lastIndexOf("]");if(n===-1||s<=n)return[];try{return JSON.parse(a.slice(n,s+1)).map(r=>{const c=String(r.q??r.question??"").trim();if(!c)return null;const p=Array.isArray(r.opts??r.options)?(r.opts??r.options).map(String):[];let $="";const b=r.a??r.answer;if(typeof b=="string"){const v=b.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(x=>x.charCodeAt(0)-65).filter(x=>x>=0&&x<p.length);$=p.length?v.length===1?v[0]:v:b}else typeof b=="number"&&($=b);return{q:c,opts:p,a:$,chapter:String(r.chapter??"").trim(),subject:String(r.subject??"默认题库").trim()||"默认题库"}}).filter(r=>!!r)}catch{return[]}}function oa(){const t=at().filter(s=>f.selected.has(s.id));if(!t.length){d.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=`题库-${t.length}题.json`,n.click(),URL.revokeObjectURL(a),d.ok(`已导出 ${t.length} 题`)}async function ca(){await U()}async function la(t,e){switch(t){case"subject":return f.subject=e.dataset.subject??"all",!0;case"toggle-edit":return f.edit=!f.edit,f.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return f.selected.has(a)?f.selected.delete(a):f.selected.add(a),!0}case"add":return await zt(),!0;case"edit":{const a=at().find(n=>n.id===Number(e.dataset.id));return a&&await zt(a),!0}case"delete-selected":{const a=[...f.selected];if(!a.length||!await ut({title:"删除题目",message:`确定删除选中的 ${a.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await y.questions.remove(a),f.selected.clear(),D("bank"),await U(!0),d.ok("已删除")}catch(n){d.error(n instanceof w?n.message:"删除失败")}return!0}case"export":return oa(),!0;case"ai-import":return await na(),!0;case"search":return!0;default:return!1}}function da(t){return t.dataset.role==="search"?(f.search=t.value,!0):!1}function de(t){return new Promise(e=>window.setTimeout(e,t))}function ua(t,e,a=620,n="%"){const s=performance.now(),i=r=>{const c=Math.min((r-s)/a,1),p=1-Math.pow(1-c,3);t.innerHTML=`${Math.round(e*p)}<span>${n}</span>`,c<1&&requestAnimationFrame(i)};requestAnimationFrame(i)}function Rt(t=12){A.vibration&&navigator.vibrate?.(t)}let g=null,X=null;function nt(){return g?g.options.questions[g.idx]??null:null}function Nt(t){const e=g;let a=e.records.get(t.id);return a||(a={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,a)),a}function ue(){const t=g;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function pa(){const t=g;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function fa(t,e){if(L(t.a))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${l(e.text)}</textarea>
      </div>`;const a=et(t.a);return`<div class="opts" data-multi="${a.length>1}">${t.opts.map((s,i)=>{let r="";return e.submitted?a.includes(i)?r="correct":e.picked.includes(i)?r="wrong":r="muted":e.picked.includes(i)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${i}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+i)}</span>
        <span class="opt-text">${tt(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function ba(t,e){if(!e.submitted)return"";const a=L(t.a)?String(t.a):G(t.a,t.opts),n=L(t.a)?K(e.text)||"（空）":G(e.picked.length?e.picked:[],t.opts)||"（未选）";return L(t.a)?`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${l(a)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${l(n)}
    </div>`:`<div class="answer-panel">
    <div class="ai-title">${e.correct?"✅ 回答正确":"❌ 回答错误"}</div>
    正确答案：${l(G(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${l(n)}`}
  </div>`}function va(){const t=g,e=nt();if(!e)return"";const a=Nt(e),n=t.options.questions.length,s=n?Math.round((t.idx+(a.submitted?1:0))/n*100):0,i=et(e.a).length>1&&!L(e.a);return`
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
          ${e.subject?`<span class="tag tag-accent">${l(e.subject)}</span>`:""}
          ${e.chapter?`<span class="tag">${l(e.chapter)}</span>`:""}
          <span class="grow"></span>
          <span>${i?"多选":L(e.a)?"简答":"单选"}</span>
        </div>
        <div class="q-text">${tt(e.q)}</div>
        ${fa(e,a)}
        ${ba(e,a)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${lt(e.id)}" aria-label="收藏">${lt(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!qt()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${a.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===n-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${i||L(e.a)?"提交答案":"查看答案"}</button>`}
    </div>`}function ma(t,e){g={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},H(),X=a=>{a.key==="Escape"&&Ot()},document.addEventListener("keydown",X),t.addEventListener("submit",a=>a.preventDefault()),t.addEventListener("input",pe)}function H(){const t=g;t?.root&&(t.root.innerHTML=va())}function pe(t){const e=t.target;e?.dataset.role!=="essay"||!g||(g.textDraft=e.value)}async function bt(t,e){const a=g;if(e.submitted=!0,L(t.a))e.correct=null;else if(e.correct=Oe(e.picked,t.a),e.correct){Rt(10);const n=ga();n>=3&&n%3===0&&d.ok(`连对 ${n} 题，保持住`)}else Rt([14,40,14]),ha(t,e);H(),e.correct&&a.options.questions.length>a.idx+1&&(await de(600),g&&g.idx===a.idx&&fe())}function ga(){const t=g;let e=0;for(let a=t.idx;a>=0;a-=1){const n=t.records.get(t.options.questions[a].id);if(n?.submitted)if(n.correct===!0)e+=1;else break}return e}async function ha(t,e){try{await y.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(a){a instanceof w&&a.status!==401&&d.error(`错题保存失败：${a.message}`)}}function fe(){const t=g,e=t.options.questions.length;if(t.idx>=e-1){ya();return}t.idx+=1,t.textDraft="",H(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function Ct(){X&&document.removeEventListener("keydown",X),X=null,g?.root?.removeEventListener("input",pe),g?.root?.replaceChildren(),g=null}async function Ot(){const t=g;if(!t)return;const e=ue();if(!await ut({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;nt()&&be();const s=t.options.onExit;Ct(),s?.()}function be(){const t=g;if(!t)return;t.options.source==="sequential"&&je(t.idx);const e=t.options.questions.slice(0,5).map(a=>K(a.q).slice(0,40));qe(e)}async function ya(){const t=g;be();const e=t.options.questions.length,a=ue(),n=pa(),s=a-n,i=a?Math.round(n/a*100):0;if(Ct(),await T({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${n}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${a}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:c=>{const p=c.querySelector('[data-role="acc"]');p&&ua(p,i)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}async function wa(){const t=nt();if(!t)return;const e=qt()[String(t.id)]??"",a=document.createElement("div");a.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${l(e)}</textarea>`;const n=a.querySelector("textarea");await T({title:"我的笔记",body:a,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>n.focus()})&&(Ae(t.id,n.value),d.ok("笔记已保存"),H())}async function $a(){const t=nt();if(!t)return;const e=Nt(t),a=[`题目：${K(t.q)}`,t.opts.length?`选项：${t.opts.map((r,c)=>`${String.fromCharCode(65+c)}. ${K(r)}`).join("；")}`:"",`正确答案：${L(t.a)?t.a:G(t.a,t.opts)}`,e.submitted?`我的作答：${L(t.a)?e.text:G(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),n=document.createElement("div");n.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',T({title:"AI 深度解析",body:n,actions:[{label:"关闭",value:"close"}]});const s=n.querySelector('[data-role="text"]'),i=n.querySelector(".ai-title");try{let r="";const c=await y.ai.explainStream(a,p=>{r+=p,s.innerHTML=`${l(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`});i.textContent=r?`✦ AI 解析${c.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=l(c.text||r).replace(/\n/g,"<br>"):await ka(s,c.text??""),s.classList.remove("cursor")}catch(r){const c=r instanceof w?r.message:"AI 解析失败，请稍后重试";d.error(c),i.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=c}}async function ka(t,e){for(let a=0;a<e.length;a+=2)t.innerHTML=l(e.slice(0,a+2)).replace(/\n/g,"<br>"),await de(12)}function xa(){const t=g;if(!t)return;const e=t.options.questions.map((a,n)=>{const s=t.records.get(a.id),i=n===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-act="jump" data-idx="${n}" data-state="${i}">${n+1}</button>`}).join("");T({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}]}).then(a=>{a==="finish"&&Ot()})}async function Sa(t,e){const a=g;if(!a)return!1;const n=nt();if(!n)return!1;const s=Nt(n);switch(t){case"pick":{if(s.submitted)return!0;const i=Number(e.dataset.idx);return L(n.a)||(et(n.a).length>1?(s.picked=s.picked.includes(i)?s.picked.filter(c=>c!==i):[...s.picked,i],H()):(s.picked=[i],await bt(n,s))),!0}case"submit":{if(L(n.a)){const i=a.root?.querySelector('[data-role="essay"]');if(s.text=i?.value??a.textDraft,!s.text.trim())return d.info("先写点什么再提交吧"),!0;await bt(n,s)}else{if(!s.picked.length)return d.info("请先选择答案"),!0;await bt(n,s)}return!0}case"next":return fe(),!0;case"prev":return a.idx>0&&(a.idx-=1,a.textDraft="",H()),!0;case"jump":return a.idx=Number(e.dataset.idx),a.textDraft="",document.querySelector(".modal-root")?.replaceChildren(),H(),!0;case"nav":return xa(),!0;case"exit":return await Ot(),!0;case"fav":return await Ge(n.id),H(),!0;case"note":return await wa(),!0;case"ai":return $a(),!0;default:return!1}}let M=null;function Aa(){return!!(M&&document.body.contains(M))}function Q(t){if(!t.questions.length){d.info("这里还没有题目");return}Ut(),M=document.createElement("div"),M.className="quiz",document.body.appendChild(M),document.body.classList.add("is-locked"),ma(M,{...t,onExit:()=>{Ut(),t.onExit?.()}}),Ee({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function Ut(){M&&(Ct(),M.remove(),M=null,document.body.classList.remove("is-locked"))}async function vt(t="random"){const e=o.bank??[];if(!e.length){d.info("题库还是空的，先去添加题目吧");return}if(t==="chapter"){const n=await qa(e);if(!n?.length)return;const s=e.filter(r=>n.includes(r.chapter||"未分类")),i=await dt(s.length);if(i===null)return;Q({questions:s.slice(0,i),source:"chapter",title:"章节练习"});return}const a=await dt(e.length);if(a!==null){if(t==="sequential"){const n=Math.min(Xt(),Math.max(e.length-1,0));Q({questions:e.slice(0,a),source:"sequential",title:"顺序练习",startIndex:n<a?n:0});return}Q({questions:ae(e).slice(0,a),source:"all",title:"随机练习"})}}async function ve(){const t=o.wrong??await F(!0);if(!t.length){d.info("错题本是空的，先去刷几题吧");return}const e=await dt(t.length);if(e===null)return;const a=t.slice(0,e).map(n=>({id:n.id,q:n.q,opts:n.opts,a:n.a,chapter:n.chapter,subject:n.subject}));Q({questions:a,source:"wrong",title:"错题重练"})}function ja(t){if(!t.length){d.info("还没有收藏题目");return}dt(t.length).then(e=>{e!==null&&Q({questions:ae(t).slice(0,e),source:"fav",title:"收藏练习"})})}function Ea(){const t=Yt(),e=o.bank??[];if(!t||!e.length)return d.info("没有可以继续的练习"),!1;const a=new Map(e.map(s=>[s.id,s])),n=t.ids.map(s=>a.get(s)).filter(s=>!!s);return n.length?(Q({questions:n,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,n.length-1)}),!0):(Zt(),d.info("上次的题目已经不在了"),!1)}function dt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const a=document.createElement("div");a.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const n=a.querySelector('[data-role="count"]');return n.addEventListener("click",s=>{const i=s.target.closest("button[data-n]");i&&(n.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),i.setAttribute("aria-pressed","true"))}),T({title:"练多少题",body:a,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const i=n.querySelector('button[aria-pressed="true"]');return Number(i?.dataset.n??t)})}async function qa(t){const e=new Map;t.forEach(r=>{const c=r.chapter?.trim()||"未分类";e.set(c,(e.get(c)??0)+1)});const a=[...e.entries()].sort((r,c)=>c[1]-r[1]);if(!a.length)return null;const n=document.createElement("div");if(n.innerHTML=`<div class="list">${a.map(([r,c],p)=>`
      <button class="item" data-chapter="${l(r)}" data-checked="${p===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${l(r)}</span><span class="tag">${c} 题</span></div>
      </button>`).join("")}</div>`,n.addEventListener("click",r=>{const c=r.target.closest("[data-chapter]");c&&(c.dataset.checked=c.dataset.checked==="true"?"false":"true")}),!await T({title:"选择章节",body:n,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const i=Array.from(n.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return i.length?i:null}const R=new Set;function La(){R.clear()}function xt(){return o.favs??[]}function Ta(){const t=xt(),e=o.loading.fav&&!o.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(a=>`
        <div class="item" data-id="${a.id}">
          <div class="item-q">${tt(a.q)}</div>
          <div class="item-meta">
            ${a.subject?`<span class="tag tag-accent">${l(a.subject)}</span>`:""}
            ${a.chapter?`<span class="tag">${l(a.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${a.id}">${R.has(a.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${a.id}">取消收藏</button>
          </div>
          ${R.has(a.id)?`<div class="item-answer"><div class="right">${l(G(a.a,a.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function Ia(){await Y()}async function Ma(t,e){switch(t){case"practice":return xt().length?(await ja(xt()),!0):(d.info("还没有收藏的题"),!0);case"reveal":{const a=Number(e.dataset.id);return R.has(a)?R.delete(a):R.add(a),!0}case"remove":{const a=Number(e.dataset.id);try{await y.favorites.remove(a),R.delete(a),D("fav"),await Y(!0),d.ok("已取消收藏")}catch(n){d.error(n instanceof w?n.message:"操作失败")}return!0}default:return!1}}let mt="";function Na(){return(!Te()||!mt)&&(mt=Qe(),Ie()),mt}function Ca(){const t=o.bank,e=o.wrong,a=o.favs,n=o.loading,s=Yt(),i=te().slice(0,4),r=Xt();return`
    <section class="hero">
      <div class="hero-greet">${l(Na())}</div>
      <div class="hero-hint">${o.user?`@${l(o.user)} · 今天也要加油`:"轻装上阵，一次一题"}</div>
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
           <div class="list">${i.map(p=>`<div class="item"><div class="item-q muted">${l(p)}</div></div>`).join("")}</div>`:""}
  `}async function Oa(){await Promise.allSettled([U(),F(),Y()])}async function _a(t,e){switch(t){case"goto":return se(e.dataset.tab??"bank"),!0;case"random":return await vt("random"),!0;case"sequential":return await vt("sequential"),!0;case"chapter":return await vt("chapter"),!0;case"wrong":return await ve(),!0;case"resume":return Ea(),!0;default:return!1}}const Ba=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],Ha=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function Ft(t,e,a){return`<div class="segmented">${t.map(n=>`<button class="seg" data-act="${a}" data-value="${n.value}" aria-pressed="${String(n.value)===String(e)}">${n.label}</button>`).join("")}</div>`}function Jt(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),URL.revokeObjectURL(n)}async function Da(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await T({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const a=t.querySelector('[data-role="old"]').value,n=t.querySelector('[data-role="next"]').value;if(n.length<6){d.error("新密码至少 6 位");return}try{await y.auth.change(a,n),d.ok("密码已更新")}catch(s){d.error(s instanceof w?s.message:"修改失败")}}function Pa(){const t=o.user,e=l((t||"?").slice(0,1).toUpperCase()),a=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})();return`
    <div class="profile">
      <div class="profile-avatar">${e}</div>
      <div class="profile-body">
        <div class="profile-name">${l(t)}</div>
        <div class="profile-desc">${o.bank?.length??0} 道题 · ${o.wrong?.length??0} 道错题 · ${o.favs?.length??0} 条收藏</div>
      </div>
    </div>

    <div class="section-title">外观</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">主题</div><div class="setting-desc">深色模式也会跟随系统自动切换</div></div>
      </div>
      ${Ft(Ba,A.theme,"theme")}
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景色</div><div class="setting-desc">给首页换个心情</div></div>
        <input class="color-input" type="color" value="${l(a.color||"#f4f5f7")}" data-act="pick-color" aria-label="背景色">
      </div>
      <button class="btn btn-sm btn-ghost" data-act="reset-bg">恢复默认背景</button>
    </div>

    <div class="section-title">练习</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">答对后自动跳题</div><div class="setting-desc">答对稍作停留就去下一题</div></div>
      </div>
      ${Ft(Ha,A.autoDelay,"delay")}
      <div class="divider"></div>
      <label class="setting-row">
        <div><div class="setting-title">答题震动</div><div class="setting-desc">答对答错给一点反馈</div></div>
        <span class="switch" role="switch" data-act="toggle-vibration" aria-checked="${A.vibration}"><i></i></span>
      </label>
      <label class="setting-row">
        <div><div class="setting-title">连对鼓励</div><div class="setting-desc">连续答对时来点掌声</div></div>
        <span class="switch" role="switch" data-act="toggle-streak" aria-checked="${A.streakAlert}"><i></i></span>
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
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}function za(){It()}async function Ra(t,e){switch(t){case"theme":return ze(e.dataset.value),E("render"),!0;case"delay":return it({autoDelay:Number(e.dataset.value)}),E("render"),!0;case"toggle-vibration":return it({vibration:!A.vibration}),E("render"),!0;case"toggle-streak":return it({streakAlert:!A.streakAlert}),E("render"),!0;case"pick-color":return Pt({color:e.value,image:""}),!0;case"reset-bg":return Pt({color:"",image:"",dim:.35}),d.ok("背景已恢复"),!0;case"export-bank":return o.bank?.length?(Jt(`题库-${o.user}.json`,o.bank),d.ok("已导出"),!0):(d.info("题库是空的"),!0);case"export-wrong":return o.wrong?.length?(Jt(`错题-${o.user}.json`,o.wrong),d.ok("已导出"),!0):(d.info("没有错题"),!0);case"change-password":return await Da(),!0;case"logout":return await ut({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(ie(),d.info("已退出登录")),!0;default:return!1}}const h={subject:"all",edit:!1,selected:new Set};function Ua(){h.subject="all",h.edit=!1,h.selected.clear()}function me(){const t=o.wrong??[];return h.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===h.subject)}function Fa(){return["all",...Array.from(new Set((o.wrong??[]).map(t=>t.subject||"默认题库")))]}function Ja(){const t=me(),e=o.wrong?.length??0,a=Fa().map(s=>`<button class="chip" data-act="subject" data-subject="${l(s)}" aria-pressed="${h.subject===s}">
          ${s==="all"?"全部":l(s)}
        </button>`).join(""),n=o.loading.wrong&&!o.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${h.selected.has(s.id)}">
          ${h.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${tt(s.q)}</div>
          <div class="item-meta">
            ${s.subject?`<span class="tag tag-accent">${l(s.subject)}</span>`:""}
            ${s.chapter?`<span class="tag">${l(s.chapter)}</span>`:""}
          </div>
          <div class="item-answer">
            ${s.user_choice_text?`<div class="mine">你的选择：${l(s.user_choice_text)}</div>`:""}
            ${s.answer?`<div class="right">正确答案：${l(s.answer)}</div>`:""}
          </div>
          ${h.edit?"":`<div class="item-meta" style="margin-top:10px">
                   <span class="grow"></span>
                   <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${s.id}">已掌握</button>
                 </div>`}
        </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">⚑</div><div class="empty-title">${e?"这个题库下没有错题":"还没有错题"}</div><div class="empty-desc">${e?"切到「全部」看看":"答错的题会自动收集到这里，方便集中消灭"}</div></div>`;return`
    <div class="row between" style="margin-bottom:4px">
      <h1 class="page-title" style="margin:0">错题集</h1>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${h.edit?"✓":"☰"}</button>
    </div>
    <p class="muted small" style="margin:4px 0 14px">共 ${e} 道，消灭一题少一题</p>
    ${e?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">开始重练（${t.length} 题）</button>`:""}
    ${a}
    ${h.edit?`<div class="row between" style="margin-bottom:12px">
             <span class="muted small">已选 ${h.selected.size} 题</span>
             <button class="btn btn-sm btn-danger" data-act="remove-selected" ${h.selected.size?"":"disabled"}>删除</button>
           </div>`:""}
    ${n}`}async function Wa(){await F()}async function Ga(t,e){switch(t){case"subject":return h.subject=e.dataset.subject??"all",!0;case"toggle-edit":return h.edit=!h.edit,h.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return h.selected.has(a)?h.selected.delete(a):h.selected.add(a),!0}case"practice":return me().length?(await ve(),!0):(d.info("没有可练的错题"),!0);case"remove":{const a=Number(e.dataset.id);try{await y.wrong.remove([a]),h.selected.delete(a),D("wrong"),await F(!0),d.ok("已标记掌握，继续加油")}catch(n){d.error(n instanceof w?n.message:"操作失败")}return!0}case"remove-selected":{const a=[...h.selected];if(!a.length||!await ut({title:"删除错题",message:`确定删除选中的 ${a.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await y.wrong.remove(a),h.selected.clear(),D("wrong"),await F(!0),d.ok("已删除")}catch(n){d.error(n instanceof w?n.message:"删除失败")}return!0}default:return!1}}const J={home:{render:Ca,mount:Oa,handle:_a},bank:{render:aa,mount:ca,handle:la,onInput:da,reset:ce},wrong:{render:Ja,mount:Wa,handle:Ga,reset:Ua},fav:{render:Ta,mount:Ia,handle:Ma,reset:La},me:{render:Pa,mount:za,handle:Ra}};let Z=!1,P=!1,gt=!1,ht=!1;function ge(){return document.getElementById("app-root")}function Qa(){P=!1,ge().innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-name">Origin Quiz</span>
        </div>
        <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(o.user||"?").slice(0,1).toUpperCase()}</button>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${kt.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${kt.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,Z=!0}function Ka(){document.querySelectorAll(".tab-btn").forEach(e=>{const a=e.dataset.tab===o.tab;e.classList.toggle("is-active",a),e.setAttribute("aria-selected",String(a))});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,kt.findIndex(a=>a.id===o.tab));t.style.setProperty("--tab-index",String(e))}}function Va(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,a=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),n=a?e.getAttribute("data-role"):null,s=a&&e instanceof HTMLInputElement?e.selectionStart:null,i=J[o.tab]??J.home;if(t.innerHTML=`<div class="view-inner">${i.render()}</div>`,Ka(),a&&n){const r=t.querySelector(`[data-role="${n}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}i.mount?.()}function N(){if(gt){ht=!0;return}gt=!0;try{if(!o.authed&&!o.token){P=!0,Z=!1,ge().innerHTML=Ve();return}Z||Qa(),Va()}finally{gt=!1,ht&&(ht=!1,queueMicrotask(N))}}let yt=!1;function Wt(){yt||(yt=!0,setTimeout(()=>{yt=!1,N()},0))}async function he(t){await t(),P&&N()}function ye(t){const e=t.dataset.act??"";if(Aa()&&t.closest(".quiz")){Sa(e,t).then(n=>{n||E("render")});return}if(e==="tab"){se(t.dataset.tab??"home");return}if(P){he(()=>oe(e,t));return}const a=J[o.tab]??J.home;a.handle&&Promise.resolve(a.handle(e,t)).then(n=>{n&&N()})}function Xa(t){const e=t.target;if(!e)return;const a=e.closest("[data-act]");a&&(a.closest(".modal-layer")||ye(a))}function Gt(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){ye(e);return}if(P)return;const a=document.getElementById("view");if(!a||!a.contains(e))return;(J[o.tab]??J.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&N()}function Ya(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),P&&he(()=>oe("submit",e)))}function Za(){Tt(),It(),Be(()=>{ie(),Z=!1,P=!1,d.error("登录已过期，请重新登录"),E("auth")}),rt("nav",()=>{Object.entries(J).forEach(([t,e])=>{t!==o.tab&&e.reset?.()}),N()}),rt("auth",()=>{Z=!1,P=!1,o.authed?(ce(),N(),Promise.allSettled([U(!0),F(!0),Y(!0)])):N()}),rt("render",Wt),rt("data",Wt),document.addEventListener("click",Xa),document.addEventListener("change",Gt),document.addEventListener("input",Gt),document.addEventListener("submit",Ya),o.token&&(o.authed=!0),N(),o.token&&Promise.allSettled([U(),F(),Y()])}function Qt(){try{Za()}catch(t){console.error("[origin-quiz] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Qt,{once:!0}):Qt();
