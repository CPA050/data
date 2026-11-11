var Ne=Object.defineProperty;var Ce=(t,e,a)=>e in t?Ne(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var Kt=(t,e,a)=>Ce(t,typeof e!="symbol"?e+"":e,a);import{u as Oe,s as De}from"./vendor-d6nEYruE.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const It="oq:",Nt="oq:user",Ct="oq:token",He={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},q={...He,...R("settings",{})};["auto","light","dark","eye"].includes(q.theme)||(q.theme="auto");function R(t,e){try{const a=localStorage.getItem(It+t);return a===null?e:JSON.parse(a)}catch{return e}}function P(t,e){try{localStorage.setItem(It+t,JSON.stringify(e))}catch{}}function jt(t){try{localStorage.removeItem(It+t)}catch{}}function pt(t){Object.assign(q,t),P("settings",q)}function Be(t){pt({theme:t})}function M(){return R(Nt,"")||""}function se(t){P(Nt,t)}function _e(){jt(Nt),jt(Ct)}function Ot(){return R(Ct,"")||""}function re(t){P(Ct,t)}function U(t){return`u:${M()||"anon"}:${t}`}function Dt(){return R(U("notes"),{})}function Re(t,e){const a=Dt(),n=String(t);e.trim()?a[n]=e:delete a[n],P(U("notes"),a)}function ie(){const t=R(U("progress"),{});return Number(t.sequential_index)||0}function Pe(t){P(U("progress"),{sequential_index:t,updatedAt:Date.now()})}function oe(){const t=R(U("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function Ue(t){P(U("session"),t)}function ce(){jt(U("session"))}function le(){return R(U("recent"),[])}function ze(t){const e=[...t,...le()].slice(0,30);P(U("recent"),Array.from(new Set(e)))}function de(){return R("appearance",{color:"",image:"",dim:.35})}function Fe(t){P("appearance",{...de(),...t})}function We(){return R("welcomed","")===new Date().toDateString()}function Je(){P("welcomed",new Date().toDateString())}const Ke={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function p(t){return String(t??"").replace(/[&<>"']/g,e=>Ke[e]??e)}const Qe=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function Ge(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function ct(t){const e=Ge(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return p(e).replace(/\n/g,"<br>");const n=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!n)return p(e);const s=i=>{if(i.nodeType===Node.TEXT_NODE)return p(i.textContent??"").replace(/\n/g,"<br>");if(i.nodeType!==Node.ELEMENT_NODE)return"";const r=i,o=r.tagName,u=Array.from(r.childNodes).map(s).join("");if(!Qe.has(o))return u;if(o==="IMG"){const d=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(d))return"";const v=p(r.getAttribute("alt")??"");return`<img src="${p(d)}" alt="${v}" loading="lazy" referrerpolicy="no-referrer">`}const f=o.toLowerCase();return`<${f}>${u}</${f}>`};return Array.from(n.childNodes).map(s).join("")}function z(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function lt(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(a=>Number.isInteger(a)))).sort((a,n)=>a-n)}function T(t){return typeof t=="string"}function X(t,e=[]){return typeof t=="string"?t:lt(t).map(a=>{const n=String.fromCharCode(65+a),s=(e[a]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${n}. ${s}`:n}).join("、")}function ue(t){const e=[...t];for(let a=e.length-1;a>0;a-=1){const n=Math.floor(Math.random()*(a+1));[e[a],e[n]]=[e[n],e[a]]}return e}function Ve(t,e){const a=lt(e);if(!a.length||t.length!==a.length)return!1;const n=[...new Set(t)].sort((s,i)=>s-i);return n.length===a.length&&n.every((s,i)=>s===a[i])}function Ye(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const a=JSON.parse(e);if(typeof a=="number")return a;if(Array.isArray(a))return a.map(Number).filter(Number.isInteger);if(typeof a=="string")return a}catch{}return e}return""}class x extends Error{constructor(a,n){super(n);Kt(this,"status");this.name="ApiError",this.status=a}}let Ht=null;function Xe(t){Ht=t}async function pe(t,e={}){const a=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&a.set("Content-Type","application/json");const n=Ot();n&&a.set("Authorization",`Bearer ${n}`),a.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:a})}catch{throw new x(0,"网络连接失败，请检查网络后重试")}const i=s.headers.get("content-type")??"";let r=null;i.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const o=r??{};if(s.status===401)throw Ht?.(),new x(401,typeof o.error=="string"?o.error:"登录已过期，请重新登录");if(!s.ok||o.ok===!1){const u=typeof o.error=="string"&&o.error?o.error:`请求失败（HTTP ${s.status}）`;throw new x(s.status,u)}return r}const yt=t=>pe(t),j=(t,e)=>pe(t,{method:"POST",body:JSON.stringify(e)});async function Ze(t,e,a){const n=new Headers({"Content-Type":"application/json"}),s=Ot();s&&n.set("Authorization",`Bearer ${s}`);const i=await fetch("/api/ai",{method:"POST",headers:n,body:JSON.stringify({...t,stream:!0}),signal:a});if(!i.ok||!i.body){const m=await i.json().catch(()=>({}));if(i.status===401)throw Ht?.(),new x(401,"登录已过期，请重新登录");if(typeof m.result=="string")return e(m.result),{text:m.result,cached:!1,provider:typeof m.provider=="string"?m.provider:void 0};throw new x(i.status,typeof m.error=="string"?m.error:"AI 解析失败")}const r=i.body.getReader(),o=new TextDecoder;let u="",f="",d=!1,v;for(;;){const{value:m,done:A}=await r.read();if(A)break;u+=o.decode(m,{stream:!0});const L=u.split(`

`);u=L.pop()??"";for(const b of L){const w=b.split(`
`).find(D=>D.startsWith("data:"));if(!w)continue;let k;try{k=JSON.parse(w.slice(5).trim())}catch{continue}if(typeof k.delta=="string"&&k.delta&&(f+=k.delta,e(k.delta)),typeof k.error=="string")throw new x(502,k.error);k.done&&(d=k.cached===!0,typeof k.provider=="string"&&(v=k.provider))}}return{text:f,cached:d,provider:v}}function Lt(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:Ye(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function ta(t){return{...Lt(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}const S={auth:{check:t=>j("/api/auth",{action:"check",username:t}),set:(t,e)=>j("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>j("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>j("/api/auth",{action:"change",username:M(),oldPassword:t,newPassword:e})},questions:{async list(){const t=M();if(!t)return[];const e=await yt(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>Lt(n))},add:t=>j("/api/questions-add",{user_id:M(),questions:t}),update:(t,e)=>j("/api/questions-update",{id:t,user_id:M(),...e}),remove:t=>j("/api/questions-delete",{ids:t,user_id:M()})},wrong:{async list(){const t=M();if(!t)return[];const e=await yt(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>ta(n))},add:t=>j("/api/wrong-add",{user_id:M(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""}),remove:t=>j("/api/wrong-delete",{ids:t,user_id:M()})},favorites:{async list(){const t=M();if(!t)return[];const e=await yt(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>Lt(n))},add:t=>j("/api/favorites-add",{user_id:M(),question_id:t}),remove:t=>j("/api/favorites-remove",{user_id:M(),question_id:t})},ai:{explain:t=>j("/api/ai",{action:"explain",prompt:t}),grade:t=>j("/api/ai",{action:"grade",prompt:t}),extract:t=>j("/api/ai",{action:"extract",...t}),classify:t=>j("/api/ai",{action:"classify",prompt:t}),explainStream:(t,e,a)=>Ze({action:"explain",prompt:t},e,a)}};let H=null;function ea(){return H&&document.body.contains(H)||(H=document.createElement("div"),H.className="toast-host",H.setAttribute("role","status"),H.setAttribute("aria-live","polite"),document.body.appendChild(H)),H}function wt(t,e="info",a=2600){if(!t)return;const n=document.createElement("div");n.className=`toast toast-${e}`,n.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${p(t)}</span>`,ea().appendChild(n),requestAnimationFrame(()=>n.classList.add("in")),window.setTimeout(()=>{n.classList.remove("in"),window.setTimeout(()=>n.remove(),220)},a)}const l={info:t=>wt(t,"info"),ok:t=>wt(t,"success"),error:t=>wt(t,"error",3200)},et='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"',qt=[{id:"home",label:"首页",icon:`<svg viewBox="0 0 24 24" ${et} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`},{id:"bank",label:"题库",icon:`<svg viewBox="0 0 24 24" ${et} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`},{id:"wrong",label:"错题",icon:`<svg viewBox="0 0 24 24" ${et} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`},{id:"fav",label:"收藏",icon:`<svg viewBox="0 0 24 24" ${et} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`},{id:"me",label:"我的",icon:`<svg viewBox="0 0 24 24" ${et} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`}],Qt=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],c={tab:"home",user:M(),token:Ot(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},at=new Map;function ut(t,e){return at.has(t)||at.set(t,new Set),at.get(t).add(e),()=>at.get(t)?.delete(e)}function E(t){at.get(t)?.forEach(e=>e())}function Bt(t){c.tab!==t&&(c.tab=t,E("nav"))}const fe=window.matchMedia("(prefers-color-scheme: dark)");function Gt(){return q.theme==="auto"?fe.matches?"dark":"light":q.theme}function _t(){document.documentElement.dataset.theme=Gt();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=Gt()==="dark"?"#0b0c0f":"#f4f5f7")}function aa(t){Be(t),_t()}fe.addEventListener("change",()=>{q.theme==="auto"&&_t()});function na(t){Fe(t)}function Rt(){const{color:t,image:e,dim:a}=de(),n=document.body;n.style.backgroundImage=e?`url("${e}")`:"",n.style.backgroundSize="cover",n.style.backgroundPosition="center",n.style.backgroundAttachment="fixed",n.dataset.dim=String(a),t&&!e?n.style.backgroundColor=t:n.style.backgroundColor=""}async function sa(t,e){const a=await S.auth.login(t,e);re(a.token),se(t),c.user=t,c.token=a.token,c.authed=!0,F(),E("auth")}async function ra(t,e){const a=await S.auth.set(t,e);re(a.token),se(t),c.user=t,c.token=a.token,c.authed=!0,F(),E("auth")}function me(){c.user="",c.token="",c.authed=!1,c.bank=null,c.wrong=null,c.favs=null,c.favoriteIds=new Set,_e(),ce(),E("auth")}const ia=300*1e3,J={bank:0,wrong:0,fav:0},ft=new Map;function F(t){t?(J[t]=0,t==="bank"&&(c.bank=null),t==="wrong"&&(c.wrong=null),t==="fav"&&(c.favs=null)):(J.bank=J.wrong=J.fav=0,c.bank=null,c.wrong=null,c.favs=null)}function oa(t,e){const a=ft.get(t);if(a)return a;const n=e().finally(()=>ft.delete(t));return ft.set(t,n),n}async function Pt(t,e,a,n){if(!c.user)return[];const s=ft.get(t);if(s)return s;const i=Date.now()-J[t]<ia;if(!e&&i)return[];c.loading[t]=!0,E("data");try{const r=await oa(t,a);return n(r),J[t]=Date.now(),r}catch(r){throw r instanceof x&&r.status!==401&&l.error(r.message),r}finally{c.loading[t]=!1,E("data")}}async function Q(t=!1){try{await Pt("bank",t,()=>S.questions.list(),e=>{c.bank=e})}catch{}return c.bank??[]}async function G(t=!1){try{await Pt("wrong",t,()=>S.wrong.list(),e=>{c.wrong=e})}catch{}return c.wrong??[]}async function it(t=!1){try{await Pt("fav",t,()=>S.favorites.list(),e=>{c.favs=e,c.favoriteIds=new Set(e.map(a=>a.id))})}catch{}return c.favs??[]}function mt(t){return c.favoriteIds.has(t)}async function ca(t){const e=!mt(t);try{return e?await S.favorites.add(t):await S.favorites.remove(t),e?c.favoriteIds.add(t):c.favoriteIds.delete(t),c.favs=null,J.fav=0,l.ok(e?"已加入收藏":"已取消收藏"),E("data"),e}catch(a){return l.error(a instanceof x?a.message:"操作失败"),mt(t)}}function la(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${Qt[Math.floor(Math.random()*Qt.length)]}`}function nt(t){na(t),Rt()}const g={step:"name",username:"",busy:!1,error:""};function da(){g.step="name",g.username="",g.busy=!1,g.error=""}function ua(){const t=`
    <div class="auth-brand">
      <div class="brand-mark">原</div>
      <div>
        <div class="auth-title">原点 · Origin</div>
        <div class="brand-sub">刷题 · 错题 · 收藏</div>
      </div>
    </div>`,e=g.error?`<div class="auth-error" role="alert">${p(g.error)}</div>`:"";if(g.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${p(g.username)}" required>
            </label>
            ${e}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${g.busy?"disabled":""}>
              ${g.busy?"检查中…":"继续"}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;const a=g.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${a?"为":"欢迎回来，"} <strong>${p(g.username)}</strong>${a?" 设置一个密码":""}</p>
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
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${g.busy?"disabled":""}>
            ${g.busy?"请稍候…":a?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${g.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function be(t,e){if(t==="back")return g.step="name",g.error="",!0;if(t==="submit"){const a=e,n=new FormData(a);if(g.step==="name"){const i=String(n.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(i))return g.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;g.busy=!0,g.error="";try{const{hasPassword:r}=await S.auth.check(i);g.username=i,g.step=r?"password":"create"}catch(r){g.error=r instanceof x?r.message:"网络异常，请重试"}finally{g.busy=!1}return!0}if(g.busy)return!0;const s=String(n.get("password")??"");if(g.step==="create"){const i=String(n.get("confirm")??"");if(s!==i)return g.error="两次输入的密码不一致",!0}if(s.length<6)return g.error="密码至少 6 位",!0;g.busy=!0,g.error="";try{g.step==="create"?await ra(g.username,s):await sa(g.username,s),l.ok(g.step==="create"?"账号已创建，开始刷题吧":`欢迎回来，${c.user}`),da()}catch(i){g.error=i instanceof x?i.message:"登录失败，请重试"}finally{g.busy=!1}return!0}return!1}let I=null,st=0;function ve(){return I&&document.body.contains(I)||(I=document.createElement("div"),I.className="modal-root",I.setAttribute("role","dialog"),I.setAttribute("aria-modal","true"),document.body.appendChild(I)),I}function pa(){st+=1,document.body.classList.add("is-locked")}function fa(){st=Math.max(0,st-1),st===0&&document.body.classList.remove("is-locked")}function ge(){ve().innerHTML="",st=0,document.body.classList.remove("is-locked")}function C(t){const e=ve(),a=t.dismissible!==!1;return new Promise(n=>{let s=!1;const i=m=>{s||(s=!0,v(),r.classList.remove("open"),window.setTimeout(()=>{r.remove(),fa()},200),n(m))},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${a?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${p(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${p(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((m,A)=>`<button class="btn btn-${m.variant??"ghost"}" data-idx="${A}">${p(m.label)}</button>`).join("")}</div>`:""}
      </div>`;const o=r.querySelector(".modal-card"),u=o.querySelector(".modal-body");typeof t.body=="string"?u.innerHTML=t.body:t.body&&u.appendChild(t.body);const f=m=>{m.key==="Escape"&&a&&(m.stopPropagation(),i(null))},d=m=>{const A=m.target;if(A.closest("[data-close]")&&a){i(null);return}const L=A.closest("[data-idx]");if(!L)return;const b=t.actions?.[Number(L.dataset.idx)];b&&(b.keepOpen||i(b.value))},v=()=>{document.removeEventListener("keydown",f,!0),r.removeEventListener("click",d),I&&I.children.length===0&&I.classList.remove("open")};r.addEventListener("click",d),document.addEventListener("keydown",f,!0),e.appendChild(r),e.classList.add("open"),pa(),t.onMount?.(o),requestAnimationFrame(()=>{r.classList.add("open");const m=o.querySelector("input, textarea, button.btn-primary, button");m&&window.matchMedia("(pointer: fine)").matches&&m.focus({preventScroll:!0})})})}function gt(t){return C({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}function ma(t){const e=t.name.toLowerCase(),a=t.type.toLowerCase();return a.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|heic)$/.test(e)?"image":e.endsWith(".docx")?"docx":e.endsWith(".json")?"json":/\.(txt|md|csv|text)$/.test(e)||a.startsWith("text/")?"text":"unknown"}function Y(t){return String(t??"").replace(/\r\n?/g,`
`).trim()}function he(t,e){if(Array.isArray(t)){const r=t.map(o=>typeof o=="number"?o:ba(String(o),e.length)).filter(o=>o!==null);return r.length?r.length===1?r[0]:[...new Set(r)].sort((o,u)=>o-u):t.map(String).join("、")}if(typeof t=="number"&&Number.isFinite(t))return t;const a=Y(t);if(!a)return"";const s=(/^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(a)?a:"")||(/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(a)?a:"");if(s){const r=[...new Set(s.toUpperCase().split("").map(o=>o.charCodeAt(0)-65))].filter(o=>o>=0&&o<e.length);if(r.length)return r.length===1?r[0]:r.sort((o,u)=>o-u)}const i=/^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(a);if(i&&e.length){const r=i[1].charCodeAt(0)-65;if(r>=0&&r<e.length){const o=i[2].trim();return e.findIndex(f=>f.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()===o)>=0||o,r}}return a}function ba(t,e){const a=t.trim().toUpperCase();if(!/^[A-H]$/.test(a))return null;const n=a.charCodeAt(0)-65;return n<e?n:null}function va(t){const e=Y(t.q??t.question??t.title??t.题目??t.题干);if(!e)return null;const a=t.opts??t.options??t.choices??t.选项;let n=[];Array.isArray(a)?n=a.map(r=>Y(r)).filter(Boolean):typeof a=="string"&&(n=$a(a));const s=t.a??t.answer??t.correct??t.答案??t.正确答案,i=n.length?he(s,n):Y(s);return{q:e,opts:n,a:i,chapter:Y(t.chapter??t.章节??t.知识点),subject:Y(t.subject??t.科目??t.题库)||"默认题库"}}function ye(t){const e=t.replace(/^\uFEFF/,"").trim(),a=/```(?:json)?([\s\S]*?)```/i.exec(e)?.[1]??e,n=a.indexOf("["),s=a.indexOf("{"),i=n>=0&&(s<0||n<s)?n:s;if(i<0)return[];const r=Math.max(a.lastIndexOf("]"),a.lastIndexOf("}"));if(r<=i)return[];let o;try{o=JSON.parse(a.slice(i,r+1))}catch{return[]}return(Array.isArray(o)?o:Array.isArray(o?.questions)?o.questions:Array.isArray(o?.data)?o.data:[]).filter(f=>!!f&&typeof f=="object").map(va).filter(f=>!!f)}const ga=/^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/,ha=/^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/,ya=/^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/,wa=/^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;function $a(t){return t.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/).map(a=>a.trim()).filter(Boolean)}function ka(t){const e=[...t.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];return e.length<2?[]:e.map((a,n)=>{const s=(a.index??0)+a[0].length,i=n+1<e.length?e[n+1].index??t.length:t.length;return t.slice(s,i).trim()})}function xa(t){const a=t.replace(/^\uFEFF/,"").replace(/\r\n?/g,`
`).split(`
`),n=[];let s="",i=[],r="",o="",u="";const f=()=>{const d=s.trim();if(!d){s="",i=[],r="";return}if(!i.length&&!r.trim()&&d.length<=24){s="",i=[],r="";return}const v=i.map(A=>A.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()),m=v.length?he(r,v):r.trim();n.push({q:d,opts:v,a:m,chapter:o,subject:u||"默认题库"}),s="",i=[],r="",o="",u=""};for(const d of a){if(!d.trim())continue;const v=wa.exec(d),m=ga.exec(d),A=ha.exec(d),L=ya.exec(d);if(v&&!m){f();const b=ka(v[2]);b.length>=2?(s=v[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim(),i=b):s=v[2].trim();continue}if(m&&s){i.push(m[2].trim());continue}if(A&&(s||i.length)){r=A[1].trim();continue}if(L){const b=L[0].trim(),w=L[1].trim();/章节|知识点/.test(b)?o=w:/科目|题库|分类/.test(b)&&(u=w);continue}s?i.length?i[i.length-1]=`${i[i.length-1]} ${d.trim()}`.trim():s=`${s} ${d.trim()}`.trim():s=d.replace(/^\s*(?:题目|题干)\s*[:：]\s*/,"").trim()}return f(),n.filter(d=>d.q.length>1)}function Tt(t){const e=t.trim();if(!e)return[];if(/^[[{]/.test(e)||/```(?:json)?/i.test(e)||/"(q|question|题目)"\s*:/.test(e)){const a=ye(e);if(a.length)return a}return xa(e)}function Sa(t){const a=Oe(new Uint8Array(t))["word/document.xml"];if(!a)throw new Error("这个 docx 里没有正文，另存为 .docx 再试一次");return De(a).replace(/<w:tab\b[^>]*\/>/g,"	").replace(/<w:br\b[^>]*\/>/g,`
`).replace(/<\/w:p>/g,`
`).replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\n{3,}/g,`

`).trim()}function Aa(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(String(n.result??"")),n.onerror=()=>a(new Error("文件读取失败")),n.readAsText(t,"utf-8")})}function Ea(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(n.result),n.onerror=()=>a(new Error("文件读取失败")),n.readAsArrayBuffer(t)})}function ja(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(String(n.result??"")),n.onerror=()=>a(new Error("图片读取失败")),n.readAsDataURL(t)})}function La(t,e){if(!t.length)return'<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>';const a=t.slice(0,4),n=a.map((i,r)=>`<li><b>${r+1}.</b> ${p(i.q).slice(0,90)}${(i.opts??[]).length?`<span class="muted"> · ${(i.opts??[]).length} 个选项</span>`:'<span class="muted"> · 简答</span>'}</li>`).join(""),s=t.length>a.length?`<li class="muted">…还有 ${t.length-a.length} 道</li>`:"";return`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${t.length} 道题</span>
      ${e?`<span class="muted small">${p(e)}</span>`:""}
    </div>
    <ul class="import-list">${n}${s}</ul>`}function qa(t,e){return t==="json"?ye(e):Tt(e)}async function Ta(){const t=document.createElement("div");t.className="import",t.innerHTML=`
    <label class="dropzone" data-role="drop">
      <span class="dz-icon">⇪</span>
      <span class="dz-title">把文件拖进来，或点这里选文件</span>
      <span class="dz-hint">支持 .json / .txt / .md / .csv / .docx / 图片（png、jpg、webp）</span>
      <input type="file" hidden data-role="file"
             accept=".json,.txt,.md,.csv,.tsv,.docx,image/png,image/jpeg,image/webp,image/gif,image/bmp">
    </label>
    <div class="import-or"><span>或者直接粘贴文字</span></div>
    <textarea class="textarea import-text" data-role="text" rows="7"
      placeholder="1. 普通硅酸盐水泥的初凝时间不得早于？&#10;A. 45min&#10;B. 60min&#10;C. 90min&#10;D. 30min&#10;答案：A&#10;章节：建筑材料"></textarea>
    <div class="import-preview" data-role="preview"></div>`;const e=t.querySelector('[data-role="drop"]'),a=t.querySelector('[data-role="file"]'),n=t.querySelector('[data-role="text"]'),s=t.querySelector('[data-role="preview"]');let i=[],r="",o="",u=!1;const f=()=>{s.innerHTML=La(i,o||(r?"图片将由 AI 识别":""));const b=document.querySelector('[data-idx="1"]');b&&(b.textContent=i.length?`导入 ${i.length} 道题`:"AI 解析并导入")},d=(b,w,k)=>{n.value=b,i=qa(w,b),o=k,f()},v=async()=>{const b=n.value.trim();if(!b&&!r)return[];l.info(r?"AI 正在识别图片…":"AI 正在解析文字…");const w=await S.ai.extract({...b?{prompt:b}:{},...r?{imageBase64:r}:{}});return Tt(w.result??"")},m=async b=>{const w=ma(b);try{if(w==="image"){r=await ja(b),i=[],o=`${b.name}（${Math.round(b.size/1024)}KB，AI 识别）`,f();try{i=await v(),i.length||l.error("这张图没读出题目，换张更清晰的试试")}catch(D){l.error(D instanceof x?D.message:"AI 识别失败")}f();return}if(w==="docx"){const D=await Ea(b);d(Sa(D),"docx",b.name);return}if(w==="unknown"){l.error("暂不支持这种文件，换成 txt / json / docx / 图片试试");return}const k=await Aa(b);d(k,w,b.name)}catch(k){l.error(k instanceof Error?k.message:"文件解析失败")}};a.addEventListener("change",()=>{const b=a.files?.[0];b&&m(b)});for(const b of["dragenter","dragover"])e.addEventListener(b,w=>{w.preventDefault(),e.classList.add("is-over")});for(const b of["dragleave","drop"])e.addEventListener(b,w=>{w.preventDefault(),e.classList.remove("is-over")});e.addEventListener("drop",b=>{const w=b.dataTransfer?.files?.[0];w&&m(w)});let A=0;if(n.addEventListener("input",()=>{window.clearTimeout(A),A=window.setTimeout(()=>{i=Tt(n.value),r="",o="",f()},280)}),!(!await C({title:"导入题库",body:t,actions:[{label:"取消",value:!1},{label:"导入",value:!0,variant:"primary"}],onMount:()=>f()})||u))try{const b=i.length?i:await v();if(!b.length){l.error("没解析出题目，检查一下格式，或换张更清晰的图");return}u=!0;const w=await S.questions.add(b);F("bank"),await Q(!0),l.ok(`已导入 ${w.added??b.length} 道题`)}catch(b){l.error(b instanceof x?b.message:"导入失败")}}function Ma(t){const e=t.replace(/```json/gi,"```").trim(),a=/```([\s\S]*?)```/.exec(e)?.[1]??e,n=a.indexOf("{"),s=a.lastIndexOf("}");return n===-1||s<=n?"{}":a.slice(n,s+1)}const y={search:"",subject:"all",edit:!1,selected:new Set};function we(){y.search="",y.subject="all",y.edit=!1,y.selected.clear()}function dt(){return c.bank??[]}function Ia(){return["all",...Array.from(new Set(dt().map(t=>t.subject||"默认题库")))]}function Na(){const t=y.search.trim().toLowerCase();return dt().filter(e=>y.subject!=="all"&&(e.subject||"默认题库")!==y.subject?!1:t?z(e.q).toLowerCase().includes(t)||e.opts.some(a=>z(a).toLowerCase().includes(t)):!0)}function $e(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(a=>String.fromCharCode(65+a)).join(" / ")}function Ca(){const t=Na(),e=Ia().map(n=>`<button class="chip" data-act="subject" data-subject="${p(n)}" aria-pressed="${y.subject===n}">
          ${n==="all"?"全部":p(n)}
        </button>`).join(""),a=c.loading.bank&&!c.bank?`<div class="list">${Array.from({length:4}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(n=>`
          <div class="item ${y.edit?"selectable":""}" data-id="${n.id}" data-checked="${y.selected.has(n.id)}">
            ${y.edit?`<span class="checkbox" data-act="select" data-id="${n.id}">✓</span>`:""}
            <div class="item-q">${ct(n.q)}</div>
            <div class="item-meta">
              ${n.subject?`<span class="tag tag-accent">${p(n.subject)}</span>`:""}
              ${n.chapter?`<span class="tag">${p(n.chapter)}</span>`:""}
              <span class="tag tag-ok">答案 ${p($e(n))}</span>
              <span class="grow"></span>
              ${y.edit?"":`<button class="btn btn-sm btn-ghost" data-act="edit" data-id="${n.id}">编辑</button>`}
            </div>
          </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${y.search?"没有匹配的题目":"题库还是空的"}</div><div class="empty-desc">${y.search?"换个关键词试试":"点右上角「⇪」导入 JSON / TXT / Word / 图片，或点「＋」手写"}</div></div>`;return`
    <h1 class="page-title">题库</h1>
    <div class="row" style="margin-bottom:12px">
      <div class="search-box grow">
        <span class="ico">⌕</span>
        <input type="search" placeholder="搜索题目或选项" data-role="search" value="${p(y.search)}" enterkeyhint="search">
      </div>
      <button class="icon-btn" data-act="import" aria-label="导入题库" title="导入题库">⇪</button>
      <button class="icon-btn" data-act="add" aria-label="添加题目">＋</button>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${y.edit?"✓":"☰"}</button>
    </div>
    <div class="chips">${e}</div>
    ${y.edit?`<div class="row between" style="margin-bottom:12px">
        <span class="muted small">已选 ${y.selected.size} 题</span>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export">导出</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${y.selected.size?"":"disabled"}>删除</button>
        </div>
      </div>`:""}
    ${a}
    <p class="muted small" style="margin-top:18px;text-align:center">共 ${dt().length} 题 · 当前显示 ${t.length} 题</p>`}async function Vt(t){const e=!t,a=document.createElement("div");if(a.innerHTML=`
    <label class="field">
      <span class="field-label">题干</span>
      <textarea class="textarea" data-role="q" placeholder="支持换行与图片">${p(t?.q??"")}</textarea>
    </label>
    <label class="field">
      <span class="field-label">选项（每行一个，留空表示简答题）</span>
      <textarea class="textarea" data-role="opts" placeholder="A. 选项一&#10;B. 选项二">${p((t?.opts??[]).join(`
`))}</textarea>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>
      <input class="input" data-role="a" value="${p(t?$e(t):"")}" placeholder="A">
    </label>
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">章节</span>
        <input class="input" data-role="chapter" value="${p(t?.chapter??"")}" placeholder="如 第三章">
      </label>
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${p(t?.subject??"默认题库")}" placeholder="默认题库">
      </label>
    </div>
    <div class="row" style="justify-content:flex-end;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`,!await C({title:e?"添加题目":"编辑题目",body:a,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:d=>{const v=d.querySelector('[data-role="classify"]');v&&v.addEventListener("click",async()=>{const m=d.querySelector('[data-role="q"]')?.value.trim()??"";if(!m){l.error("先写题干，AI 才能判断归类");return}const A=d.querySelector('[data-role="opts"]')?.value??"",L=v.textContent??"";v.disabled=!0,v.textContent="归类中…";try{const b=await S.ai.classify(`题目：${m}
选项：${A.split(`
`).join("；")}`),w=JSON.parse(Ma(b.result??"{}")),k=d.querySelector('[data-role="subject"]'),D=d.querySelector('[data-role="chapter"]');w.subject&&k&&(k.value=String(w.subject).slice(0,24)),w.chapter&&D&&(D.value=String(w.chapter).slice(0,24)),l.ok("已根据题目填入题库与章节")}catch{l.error("AI 归类失败，可手动填写")}finally{v.disabled=!1,v.textContent=L}})}}))return;const s=d=>a.querySelector(`[data-role="${d}"]`).value,i=s("q").trim();if(!i){l.error("题干不能为空");return}const r=s("opts").split(`
`).map(d=>d.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),o=s("a").trim();let u="";if(r.length){const v=o.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(m=>m.charCodeAt(0)-65).filter(m=>m>=0&&m<r.length);if(!v.length){l.error("答案请填选项字母，如 A 或 A,B");return}u=v.length===1?v[0]:v}else u=o;const f={q:i,opts:r,a:u,chapter:s("chapter").trim(),subject:s("subject").trim()||"默认题库"};try{e?await S.questions.add([f]):await S.questions.update(t.id,f),F("bank"),await Q(!0),l.ok(e?"题目已添加":"题目已保存")}catch(d){l.error(d instanceof x?d.message:"保存失败")}}async function Oa(){await Ta()}function Da(){const t=dt().filter(s=>y.selected.has(s.id));if(!t.length){l.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=`题库-${t.length}题.json`,n.click(),URL.revokeObjectURL(a),l.ok(`已导出 ${t.length} 题`)}async function Ha(){await Q()}async function Ba(t,e){switch(t){case"subject":return y.subject=e.dataset.subject??"all",!0;case"toggle-edit":return y.edit=!y.edit,y.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return y.selected.has(a)?y.selected.delete(a):y.selected.add(a),!0}case"add":return await Vt(),!0;case"edit":{const a=dt().find(n=>n.id===Number(e.dataset.id));return a&&await Vt(a),!0}case"delete-selected":{const a=[...y.selected];if(!a.length||!await gt({title:"删除题目",message:`确定删除选中的 ${a.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await S.questions.remove(a),y.selected.clear(),F("bank"),await Q(!0),l.ok("已删除")}catch(n){l.error(n instanceof x?n.message:"删除失败")}return!0}case"export":return Da(),!0;case"import":return await Oa(),!0;case"search":return!0;default:return!1}}function _a(t){return t.dataset.role==="search"?(y.search=t.value,!0):!1}const Ra="modulepreload",Pa=function(t){return"/"+t},Yt={},Ua=function(e,a,n){let s=Promise.resolve();if(a&&a.length>0){let r=function(f){return Promise.all(f.map(d=>Promise.resolve(d).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),u=o?.nonce||o?.getAttribute("nonce");s=r(a.map(f=>{if(f=Pa(f),f in Yt)return;Yt[f]=!0;const d=f.endsWith(".css"),v=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${v}`))return;const m=document.createElement("link");if(m.rel=d?"stylesheet":Ra,d||(m.as="script"),m.crossOrigin="",m.href=f,u&&m.setAttribute("nonce",u),document.head.appendChild(m),d)return new Promise((A,L)=>{m.addEventListener("load",A),m.addEventListener("error",()=>L(new Error(`Unable to preload CSS for ${f}`)))})}))}function i(r){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r}return s.then(r=>{for(const o of r||[])o.status==="rejected"&&i(o.reason);return e().catch(i)})};function ke(t){return new Promise(e=>window.setTimeout(e,t))}function za(t,e,a=620,n="%"){const s=performance.now(),i=r=>{const o=Math.min((r-s)/a,1),u=1-Math.pow(1-o,3);t.innerHTML=`${Math.round(e*u)}<span>${n}</span>`,o<1&&requestAnimationFrame(i)};requestAnimationFrame(i)}function bt(t=12){q.vibration&&navigator.vibrate?.(t)}let h=null,rt=null;function tt(){return h?h.options.questions[h.idx]??null:null}function ht(t){const e=h;let a=e.records.get(t.id);return a||(a={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,a)),a}function xe(){const t=h;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function Fa(){const t=h;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function Wa(t,e){if(T(t.a))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${p(e.text)}</textarea>
      </div>`;const a=lt(t.a);return`<div class="opts" data-multi="${a.length>1}">${t.opts.map((s,i)=>{let r="";return e.submitted?a.includes(i)?r="correct":e.picked.includes(i)?r="wrong":r="muted":e.picked.includes(i)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${i}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+i)}</span>
        <span class="opt-text">${ct(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function Ja(t,e){if(!e.submitted)return"";const a=T(t.a)?String(t.a):X(t.a,t.opts),n=T(t.a)?z(e.text)||"（空）":X(e.picked.length?e.picked:[],t.opts)||"（未选）";if(T(t.a)){const s=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${h?.busy?"disabled":""}>✦ AI 阅卷</button>
          <button class="btn btn-sm" data-act="mark" data-ok="1">我答对了</button>
          <button class="btn btn-sm" data-act="mark" data-ok="0">没答对</button>
        </div>`:`<div class="essay-actions"><span class="tag ${e.correct?"tag-ok":"tag-bad"}">${e.correct?"已标记：答对":"已标记：答错"}</span></div>`;return`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${p(a)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${p(n)}
      <div class="divider"></div>
      ${s}
    </div>`}return`<div class="answer-panel">
    <div class="ai-title">${e.correct?"✅ 回答正确":"❌ 回答错误"}</div>
    正确答案：${p(X(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${p(n)}`}
  </div>`}function Ka(){const t=h,e=tt();if(!e)return"";const a=ht(e),n=t.options.questions.length,s=n?Math.round((t.idx+(a.submitted?1:0))/n*100):0,i=lt(e.a).length>1&&!T(e.a);return`
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
          ${e.subject?`<span class="tag tag-accent">${p(e.subject)}</span>`:""}
          ${e.chapter?`<span class="tag">${p(e.chapter)}</span>`:""}
          <span class="grow"></span>
          <span>${i?"多选":T(e.a)?"简答":"单选"}</span>
        </div>
        <div class="q-text">${ct(e.q)}</div>
        ${Wa(e,a)}
        ${Ja(e,a)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${mt(e.id)}" aria-label="收藏">${mt(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!Dt()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${a.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===n-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${i||T(e.a)?"提交答案":"查看答案"}</button>`}
    </div>`}function Qa(t,e){h={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},N(),rt=a=>{const n=h;if(!n)return;const s=a.target,i=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(a.key==="Escape"){if(document.querySelector(".modal-layer"))return;Wt();return}if(i)return;const r=tt();if(!r)return;const o=ht(r);if(a.key===" "||a.key==="Enter"){const f=n.root?.querySelector('[data-act="submit"]'),d=n.root?.querySelector('[data-act="next"]');f?(a.preventDefault(),O("submit",f)):d&&(a.preventDefault(),O("next",d));return}if(a.key==="ArrowRight"){a.preventDefault(),o.submitted?zt():O("submit",n.root.querySelector('[data-act="submit"]'));return}if(a.key==="ArrowLeft"){a.preventDefault(),O("prev",n.root);return}const u=a.key.toLowerCase();if(/^[1-9]$/.test(u)||/^[a-h]$/.test(u)){const f=/^[1-9]$/.test(u)?Number(u)-1:u.charCodeAt(0)-97;if(f<r.opts.length){a.preventDefault();const d=n.root?.querySelector(`.opt[data-idx="${f}"]`);d&&O("pick",d)}return}u==="s"?O("fav",n.root):u==="n"?O("note",n.root):u==="e"?O("ai",n.root):u==="g"?O("ai-grade",n.root):u==="?"&&Ua(()=>Promise.resolve().then(()=>wn),void 0).then(f=>f.openShortcuts())},document.addEventListener("keydown",rt),t.addEventListener("submit",a=>a.preventDefault()),t.addEventListener("input",Se)}function N(){const t=h;t?.root&&(t.root.innerHTML=Ka())}function Se(t){const e=t.target;e?.dataset.role!=="essay"||!h||(h.textDraft=e.value)}async function $t(t,e){const a=h;if(e.submitted=!0,T(t.a))e.correct=null;else if(e.correct=Ve(e.picked,t.a),e.correct){bt(10);const n=Ga();n>=3&&n%3===0&&l.ok(`连对 ${n} 题，保持住`)}else bt([14,40,14]),Ut(t,e);N(),e.correct&&a.options.questions.length>a.idx+1&&(await ke(600),h&&h.idx===a.idx&&zt())}function Ga(){const t=h;let e=0;for(let a=t.idx;a>=0;a-=1){const n=t.records.get(t.options.questions[a].id);if(n?.submitted)if(n.correct===!0)e+=1;else break}return e}async function Ut(t,e){try{await S.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(a){a instanceof x&&a.status!==401&&l.error(`错题保存失败：${a.message}`)}}function zt(){const t=h,e=t.options.questions.length;if(t.idx>=e-1){Va();return}t.idx+=1,t.textDraft="",N(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function Ft(){rt&&document.removeEventListener("keydown",rt),rt=null,h?.root?.removeEventListener("input",Se),h?.root?.replaceChildren(),h=null}async function Wt(){const t=h;if(!t)return;const e=xe();if(!await gt({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;tt()&&Ae();const s=t.options.onExit;Ft(),s?.()}function Ae(){const t=h;if(!t)return;t.options.source==="sequential"&&Pe(t.idx);const e=t.options.questions.slice(0,5).map(a=>z(a.q).slice(0,40));ze(e)}async function Va(){const t=h;Ae();const e=t.options.questions.length,a=xe(),n=Fa(),s=a-n,i=a?Math.round(n/a*100):0;if(Ft(),await C({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${n}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${a}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:o=>{const u=o.querySelector('[data-role="acc"]');u&&za(u,i)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function Ya(t,e,a){e.correct=a,a?bt(10):Ut(t,e),N(),a&&l.ok("已记为答对")}async function Xa(t,e){const a=h;if(a){a.busy=!0,N();try{const n=[`题目：${z(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${z(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await S.ai.grade(n),i=String(s.result||""),r=i.includes("得分")&&!i.includes("不得分");e.correct=r,r?bt(10):Ut(t,e),l.ok(r?"AI 阅卷：答对":"AI 阅卷：答错")}catch(n){l.error(n instanceof x?n.message:"AI 阅卷失败，请稍后再试")}finally{a.busy=!1,N()}}}async function Za(){const t=tt();if(!t)return;const e=Dt()[String(t.id)]??"",a=document.createElement("div");a.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${p(e)}</textarea>`;const n=a.querySelector("textarea");await C({title:"我的笔记",body:a,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>n.focus()})&&(Re(t.id,n.value),l.ok("笔记已保存"),N())}async function tn(){const t=tt();if(!t)return;const e=ht(t),a=[`题目：${z(t.q)}`,t.opts.length?`选项：${t.opts.map((r,o)=>`${String.fromCharCode(65+o)}. ${z(r)}`).join("；")}`:"",`正确答案：${T(t.a)?t.a:X(t.a,t.opts)}`,e.submitted?`我的作答：${T(t.a)?e.text:X(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),n=document.createElement("div");n.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',C({title:"AI 深度解析",body:n,actions:[{label:"关闭",value:"close"}]});const s=n.querySelector('[data-role="text"]'),i=n.querySelector(".ai-title");try{let r="";const o=await S.ai.explainStream(a,f=>{r+=f,s.innerHTML=`${p(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),u=o.provider==="deepseek"?"DeepSeek":o.provider==="zhipu"?"智谱":"";i.textContent=r?`✦ AI 解析${u?` · ${u}`:""}${o.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=p(o.text||r).replace(/\n/g,"<br>"):await en(s,o.text??""),s.classList.remove("cursor")}catch(r){const o=r instanceof x?r.message:"AI 解析失败，请稍后重试";l.error(o),i.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=o}}async function en(t,e){for(let a=0;a<e.length;a+=2)t.innerHTML=p(e.slice(0,a+2)).replace(/\n/g,"<br>"),await ke(12)}function an(){const t=h;if(!t)return;const e=t.options.questions.map((a,n)=>{const s=t.records.get(a.id),i=n===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${n}" data-state="${i}">${n+1}</button>`}).join("");C({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:a=>{a.querySelectorAll(".nav-cell").forEach(n=>{n.addEventListener("click",()=>{const s=Number(n.dataset.idx);!Number.isFinite(s)||!h||(h.idx=s,h.textDraft="",ge(),N())})})}}).then(a=>{a==="finish"&&Wt()})}async function O(t,e){const a=h;if(!a)return!1;const n=tt();if(!n)return!1;const s=ht(n);switch(t){case"pick":{if(s.submitted)return!0;const i=Number(e.dataset.idx);return T(n.a)||(lt(n.a).length>1?(s.picked=s.picked.includes(i)?s.picked.filter(o=>o!==i):[...s.picked,i],N()):(s.picked=[i],await $t(n,s))),!0}case"submit":{if(T(n.a)){const i=a.root?.querySelector('[data-role="essay"]');if(s.text=i?.value??a.textDraft,!s.text.trim())return l.info("先写点什么再提交吧"),!0;await $t(n,s)}else{if(!s.picked.length)return l.info("请先选择答案"),!0;await $t(n,s)}return!0}case"ai-grade":return!T(n.a)||h?.busy||await Xa(n,s),!0;case"mark":return T(n.a)&&Ya(n,s,e.dataset.ok==="1"),!0;case"next":return zt(),!0;case"prev":return a.idx>0&&(a.idx-=1,a.textDraft="",N()),!0;case"jump":return a.idx=Number(e.dataset.idx),a.textDraft="",ge(),N(),!0;case"nav":return an(),!0;case"exit":return await Wt(),!0;case"fav":return await ca(n.id),N(),!0;case"note":return await Za(),!0;case"ai":return tn(),!0;default:return!1}}let B=null;function nn(){return!!(B&&document.body.contains(B))}function Z(t){if(!t.questions.length){l.info("这里还没有题目");return}Xt(),B=document.createElement("div"),B.className="quiz",document.body.appendChild(B),document.body.classList.add("is-locked"),Qa(B,{...t,onExit:()=>{Xt(),t.onExit?.()}}),Ue({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function Xt(){B&&(Ft(),B.remove(),B=null,document.body.classList.remove("is-locked"))}async function kt(t="random"){const e=c.bank??[];if(!e.length){l.info("题库还是空的，先去添加题目吧");return}if(t==="chapter"){const n=await on(e);if(!n?.length)return;const s=e.filter(r=>n.includes(r.chapter||"未分类")),i=await vt(s.length);if(i===null)return;Z({questions:s.slice(0,i),source:"chapter",title:"章节练习"});return}const a=await vt(e.length);if(a!==null){if(t==="sequential"){const n=Math.min(ie(),Math.max(e.length-1,0));Z({questions:e.slice(0,a),source:"sequential",title:"顺序练习",startIndex:n<a?n:0});return}Z({questions:ue(e).slice(0,a),source:"all",title:"随机练习"})}}async function Ee(){const t=c.wrong??await G(!0);if(!t.length){l.info("错题本是空的，先去刷几题吧");return}const e=await vt(t.length);if(e===null)return;const a=t.slice(0,e).map(n=>({id:n.id,q:n.q,opts:n.opts,a:n.a,chapter:n.chapter,subject:n.subject}));Z({questions:a,source:"wrong",title:"错题重练"})}function sn(t){if(!t.length){l.info("还没有收藏题目");return}vt(t.length).then(e=>{e!==null&&Z({questions:ue(t).slice(0,e),source:"fav",title:"收藏练习"})})}function rn(){const t=oe(),e=c.bank??[];if(!t||!e.length)return l.info("没有可以继续的练习"),!1;const a=new Map(e.map(s=>[s.id,s])),n=t.ids.map(s=>a.get(s)).filter(s=>!!s);return n.length?(Z({questions:n,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,n.length-1)}),!0):(ce(),l.info("上次的题目已经不在了"),!1)}function vt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const a=document.createElement("div");a.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const n=a.querySelector('[data-role="count"]');return n.addEventListener("click",s=>{const i=s.target.closest("button[data-n]");i&&(n.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),i.setAttribute("aria-pressed","true"))}),C({title:"练多少题",body:a,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const i=n.querySelector('button[aria-pressed="true"]');return Number(i?.dataset.n??t)})}async function on(t){const e=new Map;t.forEach(r=>{const o=r.chapter?.trim()||"未分类";e.set(o,(e.get(o)??0)+1)});const a=[...e.entries()].sort((r,o)=>o[1]-r[1]);if(!a.length)return null;const n=document.createElement("div");if(n.innerHTML=`<div class="list">${a.map(([r,o],u)=>`
      <button class="item" data-chapter="${p(r)}" data-checked="${u===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${p(r)}</span><span class="tag">${o} 题</span></div>
      </button>`).join("")}</div>`,n.addEventListener("click",r=>{const o=r.target.closest("[data-chapter]");o&&(o.dataset.checked=o.dataset.checked==="true"?"false":"true")}),!await C({title:"选择章节",body:n,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const i=Array.from(n.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return i.length?i:null}const K=new Set;function cn(){K.clear()}function Mt(){return c.favs??[]}function ln(){const t=Mt(),e=c.loading.fav&&!c.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(a=>`
        <div class="item" data-id="${a.id}">
          <div class="item-q">${ct(a.q)}</div>
          <div class="item-meta">
            ${a.subject?`<span class="tag tag-accent">${p(a.subject)}</span>`:""}
            ${a.chapter?`<span class="tag">${p(a.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${a.id}">${K.has(a.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${a.id}">取消收藏</button>
          </div>
          ${K.has(a.id)?`<div class="item-answer"><div class="right">${p(X(a.a,a.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function dn(){await it()}async function un(t,e){switch(t){case"practice":return Mt().length?(await sn(Mt()),!0):(l.info("还没有收藏的题"),!0);case"reveal":{const a=Number(e.dataset.id);return K.has(a)?K.delete(a):K.add(a),!0}case"remove":{const a=Number(e.dataset.id);try{await S.favorites.remove(a),K.delete(a),F("fav"),await it(!0),l.ok("已取消收藏")}catch(n){l.error(n instanceof x?n.message:"操作失败")}return!0}default:return!1}}let xt="";function pn(){return(!We()||!xt)&&(xt=la(),Je()),xt}function fn(){const t=new Date,e=n=>String(n).padStart(2,"0"),a="日一二三四五六"[t.getDay()];return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())} / 周${a}`}const mn=t=>String(t).padStart(2,"0");function bn(){const t=c.bank,e=c.wrong,a=c.favs,n=c.loading,s=oe(),i=le().slice(0,4),r=ie(),o=t?t.length:0,u=Math.min(20,Math.max(5,o||10)),f='<div class="skeleton sk-line w60"></div><div class="skeleton sk-line w80"></div>',d=v=>v===void 0?"—":String(v).padStart(2,"0");return`
    <section class="masthead">
      <div class="mast-meta">
        <span>${fn()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${c.user?`@${p(c.user)}`:"未登录"}</span>
      </div>
      <h1 class="mast-title">
        今天<br />练 <em>${String(u).padStart(2,"0")}</em> 题
      </h1>
      <p class="mast-sub">${p(pn())}</p>
    </section>

    <section class="overview" aria-label="数据概览">
      <button class="ov-cell" data-act="goto" data-tab="bank">
        <span class="ov-num">${d(t?.length)}</span>
        <span class="ov-label">题库</span>
      </button>
      <button class="ov-cell" data-act="goto" data-tab="wrong">
        <span class="ov-num">${d(e?.length)}</span>
        <span class="ov-label">错题</span>
      </button>
      <button class="ov-cell" data-act="goto" data-tab="fav">
        <span class="ov-num">${d(a?.length)}</span>
        <span class="ov-label">收藏</span>
      </button>
    </section>

    ${n.bank&&!t?`<div class="card card-pad">${f}</div>`:""}

    ${t&&!t.length?`<button class="cta" data-act="goto" data-tab="bank">
             <span class="cta-kicker">EMPTY / 题库为空</span>
             <span class="cta-title">先导入题库</span>
             <span class="cta-arrow" aria-hidden="true">→</span>
           </button>`:`<button class="cta" data-act="random" ${t?"":"disabled"}>
             <span class="cta-kicker">START / 随机抽题</span>
             <span class="cta-title">开始练习</span>
             <span class="cta-arrow" aria-hidden="true">→</span>
           </button>`}

    <div class="tile-grid">
      <button class="tile" data-act="sequential" ${t&&!t.length?"disabled":""}>
        <span class="tile-idx">01</span>
        <span class="tile-name">顺序练习</span>
        <span class="tile-desc">${t&&!t.length?"题库为空":r>0?`停在第 ${r+1} 题`:"按顺序推进"}</span>
      </button>
      <button class="tile" data-act="chapter" ${t&&!t.length?"disabled":""}>
        <span class="tile-idx">02</span>
        <span class="tile-name">按章节</span>
        <span class="tile-desc">${t&&!t.length?"题库为空":"只练薄弱章节"}</span>
      </button>
      <button class="tile" data-act="wrong" ${e&&!e.length?"disabled":""}>
        <span class="tile-idx">03</span>
        <span class="tile-name">错题重练</span>
        <span class="tile-desc">${e?`${e.length} 道待消灭`:"暂无错题"}</span>
      </button>
      ${s?`<button class="tile tile-accent" data-act="resume">
               <span class="tile-idx">04</span>
               <span class="tile-name">继续上次</span>
               <span class="tile-desc">${s.ids.length} 题 · 第 ${s.idx+1} 题</span>
             </button>`:`<button class="tile" data-act="goto" data-tab="bank">
               <span class="tile-idx">04</span>
               <span class="tile-name">题库管理</span>
               <span class="tile-desc">导入 / 编辑</span>
             </button>`}
    </div>

    ${i.length?`<section class="recent">
             <div class="section-title">最近练过</div>
             ${i.map((v,m)=>`<div class="recent-row"><span class="recent-idx">${mn(m+1)}</span><span class="recent-text">${p(v)}</span></div>`).join("")}
           </section>`:""}
  `}async function vn(){await Promise.allSettled([Q(),G(),it()])}async function gn(t,e){switch(t){case"goto":return Bt(e.dataset.tab??"bank"),!0;case"random":return await kt("random"),!0;case"sequential":return await kt("sequential"),!0;case"chapter":return await kt("chapter"),!0;case"wrong":return await Ee(),!0;case"resume":return rn(),!0;default:return!1}}const je=[{keys:"1 2 3 4 / A B C D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1 – 5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/",desc:"聚焦题库搜索框",scope:"题库页"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function Jt(){const t=je.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");C({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const hn=["home","bank","wrong","fav","me"];function yn(t){const e=t;if(!e)return!1;const a=e.tagName.toLowerCase();return a==="input"||a==="textarea"||a==="select"||e.isContentEditable}function Le(){document.addEventListener("keydown",t=>{if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||yn(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),Jt();return}if(t.key==="/"){const a=document.querySelector('.view input[data-role="search"]');a&&(t.preventDefault(),a.focus());return}const e=Number(t.key);e>=1&&e<=5&&(t.preventDefault(),Bt(hn[e-1]))})}const wn=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:je,installShortcuts:Le,openShortcuts:Jt},Symbol.toStringTag,{value:"Module"})),$n=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],kn=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function Zt(t,e,a){return`<div class="segmented">${t.map(n=>`<button class="seg" data-act="${a}" data-value="${n.value}" aria-pressed="${String(n.value)===String(e)}">${n.label}</button>`).join("")}</div>`}function te(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),URL.revokeObjectURL(n)}async function xn(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await C({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const a=t.querySelector('[data-role="old"]').value,n=t.querySelector('[data-role="next"]').value;if(n.length<6){l.error("新密码至少 6 位");return}try{await S.auth.change(a,n),l.ok("密码已更新")}catch(s){l.error(s instanceof x?s.message:"修改失败")}}function Sn(){const t=c.user,e=p((t||"?").slice(0,1).toUpperCase()),a=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})();return`
    <div class="profile">
      <div class="profile-avatar">${e}</div>
      <div class="profile-body">
        <div class="profile-name">${p(t)}</div>
        <div class="profile-desc">${c.bank?.length??0} 道题 · ${c.wrong?.length??0} 道错题 · ${c.favs?.length??0} 条收藏</div>
      </div>
    </div>

    <div class="section-title">外观</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">主题</div><div class="setting-desc">深色模式也会跟随系统自动切换</div></div>
      </div>
      ${Zt($n,q.theme,"theme")}
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景色</div><div class="setting-desc">给首页换个心情</div></div>
        <input class="color-input" type="color" value="${p(a.color||"#f4f5f7")}" data-act="pick-color" aria-label="背景色">
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
      <button class="btn btn-ghost btn-block" data-act="shortcuts">键盘快捷键</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block" data-act="about">关于这个题库</button>
    </div>

    <div class="section-title">练习</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">答对后自动跳题</div><div class="setting-desc">答对稍作停留就去下一题</div></div>
      </div>
      ${Zt(kn,q.autoDelay,"delay")}
      <div class="divider"></div>
      <label class="setting-row">
        <div><div class="setting-title">答题震动</div><div class="setting-desc">答对答错给一点反馈</div></div>
        <span class="switch" role="switch" data-act="toggle-vibration" aria-checked="${q.vibration}"><i></i></span>
      </label>
      <label class="setting-row">
        <div><div class="setting-title">连对鼓励</div><div class="setting-desc">连续答对时来点掌声</div></div>
        <span class="switch" role="switch" data-act="toggle-streak" aria-checked="${q.streakAlert}"><i></i></span>
      </label>
    </div>

    <div class="section-title">数据</div>
    <div class="card card-pad">
      <button class="btn btn-ghost btn-block" data-act="export-bank">导出题库（JSON）</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block" data-act="export-wrong">导出错题（JSON）</button>
    </div>

    <div class="section-title">账号</div>
    <div class="card card-pad">
      <button class="btn btn-ghost btn-block" data-act="change-password">修改密码</button>
      <div class="divider"></div>
      <button class="btn btn-ghost btn-block danger-text" data-act="logout">退出登录</button>
    </div>

    <p class="muted small" style="text-align:center;margin:22px 0 6px">origin-quiz v2.0.0</p>
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function An(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){l.error("图片太大了（最多 8MB）");return}try{const a=await En(e);nt({image:a,color:""}),l.ok("背景已更新"),E("render")}catch{l.error("这张图片读不出来，换一张试试")}}},t.click()}function En(t){return new Promise((e,a)=>{const n=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(n);const i=Math.min(1,1600/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*i),r.height=Math.round(s.height*i);const o=r.getContext("2d");if(!o){a(new Error("canvas unavailable"));return}o.drawImage(s,0,0,r.width,r.height),e(r.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(n),a(new Error("image load failed"))},s.src=n})}function jn(){Rt()}async function Ln(t,e){switch(t){case"theme":return aa(e.dataset.value),E("render"),!0;case"delay":return pt({autoDelay:Number(e.dataset.value)}),E("render"),!0;case"toggle-vibration":return pt({vibration:!q.vibration}),E("render"),!0;case"toggle-streak":return pt({streakAlert:!q.streakAlert}),E("render"),!0;case"pick-color":return nt({color:e.value,image:""}),!0;case"pick-bg":return await An(),!0;case"clear-bg":return nt({image:""}),E("render"),!0;case"dim":return nt({dim:Number(e.value)}),!0;case"shortcuts":return Jt(),!0;case"about":return C({title:"关于",body:`<p class="muted small" style="margin:0 0 10px">原点 · Origin —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。</p>
          <p class="muted small" style="margin:0 0 6px">题库 ${c.bank?.length??0} 题 · 错题 ${c.wrong?.length??0} 道 · 收藏 ${c.favs?.length??0} 条</p>
          <p class="muted small" style="margin:0">版本 v2.0.0 · 支持 PWA 离线打开</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]}),!0;case"reset-bg":return nt({color:"",image:"",dim:.35}),l.ok("背景已恢复"),E("render"),!0;case"export-bank":return c.bank?.length?(te(`题库-${c.user}.json`,c.bank),l.ok("已导出"),!0):(l.info("题库是空的"),!0);case"export-wrong":return c.wrong?.length?(te(`错题-${c.user}.json`,c.wrong),l.ok("已导出"),!0):(l.info("没有错题"),!0);case"change-password":return await xn(),!0;case"logout":return await gt({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(me(),l.info("已退出登录")),!0;default:return!1}}const $={subject:"all",edit:!1,selected:new Set};function qn(){$.subject="all",$.edit=!1,$.selected.clear()}function qe(){const t=c.wrong??[];return $.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===$.subject)}function Tn(){return["all",...Array.from(new Set((c.wrong??[]).map(t=>t.subject||"默认题库")))]}function Mn(){const t=qe(),e=c.wrong?.length??0,a=Tn().map(s=>`<button class="chip" data-act="subject" data-subject="${p(s)}" aria-pressed="${$.subject===s}">
          ${s==="all"?"全部":p(s)}
        </button>`).join(""),n=c.loading.wrong&&!c.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${$.selected.has(s.id)}">
          ${$.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${ct(s.q)}</div>
          <div class="item-meta">
            ${s.subject?`<span class="tag tag-accent">${p(s.subject)}</span>`:""}
            ${s.chapter?`<span class="tag">${p(s.chapter)}</span>`:""}
          </div>
          <div class="item-answer">
            ${s.user_choice_text?`<div class="mine">你的选择：${p(s.user_choice_text)}</div>`:""}
            ${s.answer?`<div class="right">正确答案：${p(s.answer)}</div>`:""}
          </div>
          ${$.edit?"":`<div class="item-meta" style="margin-top:10px">
                   <span class="grow"></span>
                   <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${s.id}">已掌握</button>
                 </div>`}
        </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">⚑</div><div class="empty-title">${e?"这个题库下没有错题":"还没有错题"}</div><div class="empty-desc">${e?"切到「全部」看看":"答错的题会自动收集到这里，方便集中消灭"}</div></div>`;return`
    <div class="row between" style="margin-bottom:4px">
      <h1 class="page-title" style="margin:0">错题集</h1>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${$.edit?"✓":"☰"}</button>
    </div>
    <p class="muted small" style="margin:4px 0 14px">共 ${e} 道，消灭一题少一题</p>
    ${e?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">开始重练（${t.length} 题）</button>`:""}
    ${a}
    ${$.edit?`<div class="row between" style="margin-bottom:12px">
             <span class="muted small">已选 ${$.selected.size} 题</span>
             <button class="btn btn-sm btn-danger" data-act="remove-selected" ${$.selected.size?"":"disabled"}>删除</button>
           </div>`:""}
    ${n}`}async function In(){await G()}async function Nn(t,e){switch(t){case"subject":return $.subject=e.dataset.subject??"all",!0;case"toggle-edit":return $.edit=!$.edit,$.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return $.selected.has(a)?$.selected.delete(a):$.selected.add(a),!0}case"practice":return qe().length?(await Ee(),!0):(l.info("没有可练的错题"),!0);case"remove":{const a=Number(e.dataset.id);try{await S.wrong.remove([a]),$.selected.delete(a),F("wrong"),await G(!0),l.ok("已标记掌握，继续加油")}catch(n){l.error(n instanceof x?n.message:"操作失败")}return!0}case"remove-selected":{const a=[...$.selected];if(!a.length||!await gt({title:"删除错题",message:`确定删除选中的 ${a.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await S.wrong.remove(a),$.selected.clear(),F("wrong"),await G(!0),l.ok("已删除")}catch(n){l.error(n instanceof x?n.message:"删除失败")}return!0}default:return!1}}const V={home:{render:bn,mount:vn,handle:gn},bank:{render:Ca,mount:Ha,handle:Ba,onInput:_a,reset:we},wrong:{render:Mn,mount:In,handle:Nn,reset:qn},fav:{render:ln,mount:dn,handle:un,reset:cn},me:{render:Sn,mount:jn,handle:Ln}};let ot=!1,W=!1,St=!1,At=!1;function Te(){return document.getElementById("app-root")}function Cn(){W=!1,Te().innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-name">Origin Quiz</span>
        </div>
        <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(c.user||"?").slice(0,1).toUpperCase()}</button>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${qt.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${qt.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,ot=!0}function On(){document.querySelectorAll(".tab-btn").forEach(e=>{const a=e.dataset.tab===c.tab;e.classList.toggle("is-active",a),e.setAttribute("aria-selected",String(a))});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,qt.findIndex(a=>a.id===c.tab));t.style.setProperty("--tab-index",String(e))}}function Dn(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,a=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),n=a?e.getAttribute("data-role"):null,s=a&&e instanceof HTMLInputElement?e.selectionStart:null,i=V[c.tab]??V.home;if(t.innerHTML=`<div class="view-inner">${i.render()}</div>`,On(),a&&n){const r=t.querySelector(`[data-role="${n}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}i.mount?.()}function _(){if(St){At=!0;return}St=!0;try{if(!c.authed&&!c.token){W=!0,ot=!1,Te().innerHTML=ua();return}ot||Cn(),Dn()}finally{St=!1,At&&(At=!1,queueMicrotask(_))}}let Et=!1;function ee(){Et||(Et=!0,setTimeout(()=>{Et=!1,_()},0))}async function Me(t){await t(),W&&_()}function Ie(t){const e=t.dataset.act??"";if(nn()&&t.closest(".quiz")){O(e,t).then(n=>{n||E("render")});return}if(e==="tab"){Bt(t.dataset.tab??"home");return}if(W){Me(()=>be(e,t));return}const a=V[c.tab]??V.home;a.handle&&Promise.resolve(a.handle(e,t)).then(n=>{n&&_()})}function Hn(t){const e=t.target;if(!e)return;const a=e.closest("[data-act]");a&&(a.closest(".modal-layer")||Ie(a))}function ae(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){Ie(e);return}if(W)return;const a=document.getElementById("view");if(!a||!a.contains(e))return;(V[c.tab]??V.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&_()}function Bn(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),W&&Me(()=>be("submit",e)))}function _n(){_t(),Rt(),Xe(()=>{me(),ot=!1,W=!1,l.error("登录已过期，请重新登录"),E("auth")}),ut("nav",()=>{Object.entries(V).forEach(([t,e])=>{t!==c.tab&&e.reset?.()}),_()}),ut("auth",()=>{ot=!1,W=!1,c.authed?(we(),_(),Promise.allSettled([Q(!0),G(!0),it(!0)])):_()}),ut("render",ee),ut("data",ee),document.addEventListener("click",Hn),document.addEventListener("change",ae),document.addEventListener("input",ae),document.addEventListener("submit",Bn),Le(),c.token&&(c.authed=!0),_(),c.token&&Promise.allSettled([Q(),G(),it()])}function ne(){try{_n()}catch(t){console.error("[origin-quiz] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ne,{once:!0}):ne();
