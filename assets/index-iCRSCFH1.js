var He=Object.defineProperty;var _e=(t,e,n)=>e in t?He(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Yt=(t,e,n)=>_e(t,typeof e!="symbol"?e+"":e,n);import{k as Ue,u as Pe,s as ze}from"./vendor-WiNXSSvv.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const Nt="oq:",Ot="oq:user",Dt="oq:token",Fe={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},q={...Fe,..._("settings",{})};["auto","light","dark","eye"].includes(q.theme)||(q.theme="auto");function _(t,e){try{const n=localStorage.getItem(Nt+t);return n===null?e:JSON.parse(n)}catch{return e}}function U(t,e){try{localStorage.setItem(Nt+t,JSON.stringify(e))}catch{}}function qt(t){try{localStorage.removeItem(Nt+t)}catch{}}function ft(t){Object.assign(q,t),U("settings",q)}function We(t){ft({theme:t})}function T(){return _(Ot,"")||""}function de(t){U(Ot,t)}function Je(){qt(Ot),qt(Dt)}function Rt(){return _(Dt,"")||""}function ue(t){U(Dt,t)}function P(t){return`u:${T()||"anon"}:${t}`}function Bt(){return _(P("notes"),{})}function Ke(t,e){const n=Bt(),a=String(t);e.trim()?n[a]=e:delete n[a],U(P("notes"),n)}function pe(){const t=_(P("progress"),{});return Number(t.sequential_index)||0}function Qe(t){U(P("progress"),{sequential_index:t,updatedAt:Date.now()})}function fe(){const t=_(P("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function Ge(t){U(P("session"),t)}function me(){qt(P("session"))}function be(){return _(P("recent"),[])}function Ve(t){const e=[...t,...be()].slice(0,30);U(P("recent"),Array.from(new Set(e)))}function ge(){return _("appearance",{color:"",image:"",dim:.35})}function Ye(t){U("appearance",{...ge(),...t})}function Xe(){return _("welcomed","")===new Date().toDateString()}function Ze(){U("welcomed",new Date().toDateString())}const tn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function m(t){return String(t??"").replace(/[&<>"']/g,e=>tn[e]??e)}const wt=/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;function en(t,e){try{return Ue.renderToString(t,{displayMode:e,throwOnError:!1,output:"mathml",strict:!1,trust:!1})}catch{return m(e?`$$${t}$$`:`$${t}$`)}}function Xt(t){let e="",n=0;wt.lastIndex=0;for(let a=wt.exec(t);a;a=wt.exec(t)){e+=m(t.slice(n,a.index)).replace(/\n/g,"<br>");const s=!!(a[1]||a[2]),i=(a[1]??a[2]??a[3]??a[4]??"").trim();e+=i?en(i,s):m(a[0]),n=a.index+a[0].length}return e+=m(t.slice(n)).replace(/\n/g,"<br>"),e}const nn=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function an(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function lt(t){const e=an(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return Xt(e);const a=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!a)return m(e);const s=i=>{if(i.nodeType===Node.TEXT_NODE)return Xt(i.textContent??"");if(i.nodeType!==Node.ELEMENT_NODE)return"";const r=i,o=r.tagName,l=Array.from(r.childNodes).map(s).join("");if(!nn.has(o))return l;if(o==="IMG"){const d=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(d))return"";const g=m(r.getAttribute("alt")??"");return`<img src="${m(d)}" alt="${g}" loading="lazy" referrerpolicy="no-referrer">`}const f=o.toLowerCase();return`<${f}>${l}</${f}>`};return Array.from(a.childNodes).map(s).join("")}function z(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function dt(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(n=>Number.isInteger(n)))).sort((n,a)=>n-a)}function M(t){return typeof t=="string"}function Z(t,e=[]){return typeof t=="string"?t:dt(t).map(n=>{const a=String.fromCharCode(65+n),s=(e[n]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${a}. ${s}`:a}).join("、")}function ve(t){const e=[...t];for(let n=e.length-1;n>0;n-=1){const a=Math.floor(Math.random()*(n+1));[e[n],e[a]]=[e[a],e[n]]}return e}function sn(t,e){const n=dt(e);if(!n.length||t.length!==n.length)return!1;const a=[...new Set(t)].sort((s,i)=>s-i);return a.length===n.length&&a.every((s,i)=>s===n[i])}function rn(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const n=JSON.parse(e);if(typeof n=="number")return n;if(Array.isArray(n))return n.map(Number).filter(Number.isInteger);if(typeof n=="string")return n}catch{}return e}return""}class x extends Error{constructor(n,a){super(a);Yt(this,"status");this.name="ApiError",this.status=n}}let Ht=null;function on(t){Ht=t}async function he(t,e={}){const n=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&n.set("Content-Type","application/json");const a=Rt();a&&n.set("Authorization",`Bearer ${a}`),n.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:n})}catch{throw new x(0,"网络连接失败，请检查网络后重试")}const i=s.headers.get("content-type")??"";let r=null;i.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const o=r??{};if(s.status===401)throw Ht?.(),new x(401,typeof o.error=="string"?o.error:"登录已过期，请重新登录");if(!s.ok||o.ok===!1){const l=typeof o.error=="string"&&o.error?o.error:`请求失败（HTTP ${s.status}）`;throw new x(s.status,l)}return r}const $t=t=>he(t),L=(t,e)=>he(t,{method:"POST",body:JSON.stringify(e)});async function cn(t,e,n){const a=new Headers({"Content-Type":"application/json"}),s=Rt();s&&a.set("Authorization",`Bearer ${s}`);const i=await fetch("/api/ai",{method:"POST",headers:a,body:JSON.stringify({...t,stream:!0}),signal:n});if(!i.ok||!i.body){const b=await i.json().catch(()=>({}));if(i.status===401)throw Ht?.(),new x(401,"登录已过期，请重新登录");if(typeof b.result=="string")return e(b.result),{text:b.result,cached:!1,provider:typeof b.provider=="string"?b.provider:void 0};throw new x(i.status,typeof b.error=="string"?b.error:"AI 解析失败")}const r=i.body.getReader(),o=new TextDecoder;let l="",f="",d=!1,g;for(;;){const{value:b,done:E}=await r.read();if(E)break;l+=o.decode(b,{stream:!0});const A=l.split(`

`);l=A.pop()??"";for(const p of A){const y=p.split(`
`).find(O=>O.startsWith("data:"));if(!y)continue;let w;try{w=JSON.parse(y.slice(5).trim())}catch{continue}if(typeof w.delta=="string"&&w.delta&&(f+=w.delta,e(w.delta)),typeof w.error=="string")throw new x(502,w.error);w.done&&(d=w.cached===!0,typeof w.provider=="string"&&(g=w.provider))}}return{text:f,cached:d,provider:g}}function Mt(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:rn(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function ln(t){return{...Mt(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}const S={auth:{check:t=>L("/api/auth",{action:"check",username:t}),set:(t,e)=>L("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>L("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>L("/api/auth",{action:"change",username:T(),oldPassword:t,newPassword:e})},questions:{async list(){const t=T();if(!t)return[];const e=await $t(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>Mt(a))},add:t=>L("/api/questions-add",{user_id:T(),questions:t}),update:(t,e)=>L("/api/questions-update",{id:t,user_id:T(),...e}),remove:t=>L("/api/questions-delete",{ids:t,user_id:T()})},wrong:{async list(){const t=T();if(!t)return[];const e=await $t(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>ln(a))},add:t=>L("/api/wrong-add",{user_id:T(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""}),remove:t=>L("/api/wrong-delete",{ids:t,user_id:T()})},favorites:{async list(){const t=T();if(!t)return[];const e=await $t(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>Mt(a))},add:t=>L("/api/favorites-add",{user_id:T(),question_id:t}),remove:t=>L("/api/favorites-remove",{user_id:T(),question_id:t})},ai:{explain:t=>L("/api/ai",{action:"explain",prompt:t}),grade:t=>L("/api/ai",{action:"grade",prompt:t}),extract:t=>L("/api/ai",{action:"extract",...t}),classify:t=>L("/api/ai",{action:"classify",prompt:t}),explainStream:(t,e,n)=>cn({action:"explain",prompt:t},e,n)}};let R=null;function dn(){return R&&document.body.contains(R)||(R=document.createElement("div"),R.className="toast-host",R.setAttribute("role","status"),R.setAttribute("aria-live","polite"),document.body.appendChild(R)),R}function kt(t,e="info",n=2600){if(!t)return;const a=document.createElement("div");a.className=`toast toast-${e}`,a.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${m(t)}</span>`,dn().appendChild(a),requestAnimationFrame(()=>a.classList.add("in")),window.setTimeout(()=>{a.classList.remove("in"),window.setTimeout(()=>a.remove(),220)},n)}const u={info:t=>kt(t,"info"),ok:t=>kt(t,"success"),error:t=>kt(t,"error",3200)},nt='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"',Tt=[{id:"home",label:"首页",icon:`<svg viewBox="0 0 24 24" ${nt} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`},{id:"bank",label:"题库",icon:`<svg viewBox="0 0 24 24" ${nt} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`},{id:"wrong",label:"错题",icon:`<svg viewBox="0 0 24 24" ${nt} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`},{id:"fav",label:"收藏",icon:`<svg viewBox="0 0 24 24" ${nt} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`},{id:"me",label:"我的",icon:`<svg viewBox="0 0 24 24" ${nt} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`}],Zt=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],c={tab:"home",user:T(),token:Rt(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},at=new Map;function pt(t,e){return at.has(t)||at.set(t,new Set),at.get(t).add(e),()=>at.get(t)?.delete(e)}function j(t){at.get(t)?.forEach(e=>e())}function _t(t){c.tab!==t&&(c.tab=t,j("nav"))}const ye=window.matchMedia("(prefers-color-scheme: dark)");function te(){return q.theme==="auto"?ye.matches?"dark":"light":q.theme}function Ut(){document.documentElement.dataset.theme=te();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=te()==="dark"?"#0b0c0f":"#f4f5f7")}function un(t){We(t),Ut()}ye.addEventListener("change",()=>{q.theme==="auto"&&Ut()});function pn(t){Ye(t)}function Pt(){const{color:t,image:e,dim:n}=ge(),a=document.body;a.style.backgroundImage=e?`url("${e}")`:"",a.style.backgroundSize="cover",a.style.backgroundPosition="center",a.style.backgroundAttachment="fixed",a.dataset.dim=String(n),t&&!e?a.style.backgroundColor=t:a.style.backgroundColor=""}async function fn(t,e){const n=await S.auth.login(t,e);ue(n.token),de(t),c.user=t,c.token=n.token,c.authed=!0,F(),j("auth")}async function mn(t,e){const n=await S.auth.set(t,e);ue(n.token),de(t),c.user=t,c.token=n.token,c.authed=!0,F(),j("auth")}function we(){c.user="",c.token="",c.authed=!1,c.bank=null,c.wrong=null,c.favs=null,c.favoriteIds=new Set,Je(),me(),j("auth")}const bn=300*1e3,J={bank:0,wrong:0,fav:0},mt=new Map;function F(t){t?(J[t]=0,t==="bank"&&(c.bank=null),t==="wrong"&&(c.wrong=null),t==="fav"&&(c.favs=null)):(J.bank=J.wrong=J.fav=0,c.bank=null,c.wrong=null,c.favs=null)}function gn(t,e){const n=mt.get(t);if(n)return n;const a=e().finally(()=>mt.delete(t));return mt.set(t,a),a}async function zt(t,e,n,a){if(!c.user)return[];const s=mt.get(t);if(s)return s;const i=Date.now()-J[t]<bn;if(!e&&i)return[];c.loading[t]=!0,j("data");try{const r=await gn(t,n);return a(r),J[t]=Date.now(),r}catch(r){throw r instanceof x&&r.status!==401&&u.error(r.message),r}finally{c.loading[t]=!1,j("data")}}async function Q(t=!1){try{await zt("bank",t,()=>S.questions.list(),e=>{c.bank=e})}catch{}return c.bank??[]}async function G(t=!1){try{await zt("wrong",t,()=>S.wrong.list(),e=>{c.wrong=e})}catch{}return c.wrong??[]}async function ot(t=!1){try{await zt("fav",t,()=>S.favorites.list(),e=>{c.favs=e,c.favoriteIds=new Set(e.map(n=>n.id))})}catch{}return c.favs??[]}function bt(t){return c.favoriteIds.has(t)}async function vn(t){const e=!bt(t);try{return e?await S.favorites.add(t):await S.favorites.remove(t),e?c.favoriteIds.add(t):c.favoriteIds.delete(t),c.favs=null,J.fav=0,u.ok(e?"已加入收藏":"已取消收藏"),j("data"),e}catch(n){return u.error(n instanceof x?n.message:"操作失败"),bt(t)}}function hn(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${Zt[Math.floor(Math.random()*Zt.length)]}`}function st(t){pn(t),Pt()}const v={step:"name",username:"",busy:!1,error:""};function yn(){v.step="name",v.username="",v.busy=!1,v.error=""}function wn(){const t=`
    <div class="auth-brand">
      <div class="brand-mark">原</div>
      <div>
        <div class="auth-title">原点 · Origin</div>
        <div class="brand-sub">刷题 · 错题 · 收藏</div>
      </div>
    </div>`,e=v.error?`<div class="auth-error" role="alert">${m(v.error)}</div>`:"";if(v.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${m(v.username)}" required>
            </label>
            ${e}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${v.busy?"disabled":""}>
              ${v.busy?"检查中…":"继续"}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;const n=v.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${n?"为":"欢迎回来，"} <strong>${m(v.username)}</strong>${n?" 设置一个密码":""}</p>
        <form class="stack" data-form="${n?"create":"login"}">
          <label class="field">
            <span class="field-label">密码</span>
            <input class="input" name="password" type="password" autocomplete="${n?"new-password":"current-password"}"
                   placeholder="至少 6 位" minlength="6" required>
          </label>
          ${n?`<label class="field">
                   <span class="field-label">再输一次</span>
                   <input class="input" name="confirm" type="password" autocomplete="new-password" placeholder="确认密码" minlength="6" required>
                 </label>`:""}
          ${e}
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${v.busy?"disabled":""}>
            ${v.busy?"请稍候…":n?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${v.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function $e(t,e){if(t==="back")return v.step="name",v.error="",!0;if(t==="submit"){const n=e,a=new FormData(n);if(v.step==="name"){const i=String(a.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(i))return v.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;v.busy=!0,v.error="";try{const{hasPassword:r}=await S.auth.check(i);v.username=i,v.step=r?"password":"create"}catch(r){v.error=r instanceof x?r.message:"网络异常，请重试"}finally{v.busy=!1}return!0}if(v.busy)return!0;const s=String(a.get("password")??"");if(v.step==="create"){const i=String(a.get("confirm")??"");if(s!==i)return v.error="两次输入的密码不一致",!0}if(s.length<6)return v.error="密码至少 6 位",!0;v.busy=!0,v.error="";try{v.step==="create"?await mn(v.username,s):await fn(v.username,s),u.ok(v.step==="create"?"账号已创建，开始刷题吧":`欢迎回来，${c.user}`),yn()}catch(i){v.error=i instanceof x?i.message:"登录失败，请重试"}finally{v.busy=!1}return!0}return!1}function $n(t,e=1400,n=.82){return new Promise((a,s)=>{const i=URL.createObjectURL(t),r=new Image;r.onload=()=>{URL.revokeObjectURL(i);const o=Math.min(1,e/Math.max(r.width,r.height)),l=document.createElement("canvas");l.width=Math.max(1,Math.round(r.width*o)),l.height=Math.max(1,Math.round(r.height*o));const f=l.getContext("2d");if(!f){s(new Error("canvas 不可用"));return}f.fillStyle="#fff",f.fillRect(0,0,l.width,l.height),f.drawImage(r,0,0,l.width,l.height),a(l.toDataURL("image/jpeg",n))},r.onerror=()=>{URL.revokeObjectURL(i),s(new Error("图片解码失败"))},r.src=i})}function ee(t,e,n=!1){const a=t.selectionStart??t.value.length,s=t.selectionEnd??a;t.value=t.value.slice(0,a)+e+t.value.slice(s);const i=n?a+e.length-(e.length-Math.max(0,e.indexOf("$")+1)):a+e.length;t.focus(),t.setSelectionRange(i,i),t.dispatchEvent(new Event("input",{bubbles:!0}))}let I=null,rt=0;function ke(){return I&&document.body.contains(I)||(I=document.createElement("div"),I.className="modal-root",I.setAttribute("role","dialog"),I.setAttribute("aria-modal","true"),document.body.appendChild(I)),I}function kn(){rt+=1,document.body.classList.add("is-locked")}function xn(){rt=Math.max(0,rt-1),rt===0&&document.body.classList.remove("is-locked")}function xe(){ke().innerHTML="",rt=0,document.body.classList.remove("is-locked")}function N(t){const e=ke(),n=t.dismissible!==!1;return new Promise(a=>{let s=!1;const i=b=>{s||(s=!0,g(),r.classList.remove("open"),window.setTimeout(()=>{r.remove(),xn()},200),a(b))},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${n?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${m(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${m(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((b,E)=>`<button class="btn btn-${b.variant??"ghost"}" data-idx="${E}">${m(b.label)}</button>`).join("")}</div>`:""}
      </div>`;const o=r.querySelector(".modal-card"),l=o.querySelector(".modal-body");typeof t.body=="string"?l.innerHTML=t.body:t.body&&l.appendChild(t.body);const f=b=>{b.key==="Escape"&&n&&(b.stopPropagation(),i(null))},d=b=>{const E=b.target;if(E.closest("[data-close]")&&n){i(null);return}const A=E.closest("[data-idx]");if(!A)return;const p=t.actions?.[Number(A.dataset.idx)];p&&(p.keepOpen||i(p.value))},g=()=>{document.removeEventListener("keydown",f,!0),r.removeEventListener("click",d),I&&I.children.length===0&&I.classList.remove("open")};r.addEventListener("click",d),document.addEventListener("keydown",f,!0),e.appendChild(r),e.classList.add("open"),kn(),t.onMount?.(o),requestAnimationFrame(()=>{r.classList.add("open");const b=o.querySelector("input, textarea, button.btn-primary, button");b&&window.matchMedia("(pointer: fine)").matches&&b.focus({preventScroll:!0})})})}function ht(t){return N({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}function Sn(t){const e=t.name.toLowerCase(),n=t.type.toLowerCase();return n.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|heic)$/.test(e)?"image":e.endsWith(".docx")?"docx":e.endsWith(".json")?"json":/\.(txt|md|csv|text)$/.test(e)||n.startsWith("text/")?"text":"unknown"}function X(t){return String(t??"").replace(/\r\n?/g,`
`).trim()}function Se(t,e){if(Array.isArray(t)){const r=t.map(o=>typeof o=="number"?o:An(String(o),e.length)).filter(o=>o!==null);return r.length?r.length===1?r[0]:[...new Set(r)].sort((o,l)=>o-l):t.map(String).join("、")}if(typeof t=="number"&&Number.isFinite(t))return t;const n=X(t);if(!n)return"";const s=(/^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(n)?n:"")||(/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(n)?n:"");if(s){const r=[...new Set(s.toUpperCase().split("").map(o=>o.charCodeAt(0)-65))].filter(o=>o>=0&&o<e.length);if(r.length)return r.length===1?r[0]:r.sort((o,l)=>o-l)}const i=/^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(n);if(i&&e.length){const r=i[1].charCodeAt(0)-65;if(r>=0&&r<e.length){const o=i[2].trim();return e.findIndex(f=>f.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()===o)>=0||o,r}}return n}function An(t,e){const n=t.trim().toUpperCase();if(!/^[A-H]$/.test(n))return null;const a=n.charCodeAt(0)-65;return a<e?a:null}function En(t){const e=X(t.q??t.question??t.title??t.题目??t.题干);if(!e)return null;const n=t.opts??t.options??t.choices??t.选项;let a=[];Array.isArray(n)?a=n.map(r=>X(r)).filter(Boolean):typeof n=="string"&&(a=Tn(n));const s=t.a??t.answer??t.correct??t.答案??t.正确答案,i=a.length?Se(s,a):X(s);return{q:e,opts:a,a:i,chapter:X(t.chapter??t.章节??t.知识点),subject:X(t.subject??t.科目??t.题库)||"默认题库"}}function Ae(t){const e=t.replace(/^\uFEFF/,"").trim(),n=/```(?:json)?([\s\S]*?)```/i.exec(e)?.[1]??e,a=n.indexOf("["),s=n.indexOf("{"),i=a>=0&&(s<0||a<s)?a:s;if(i<0)return[];const r=Math.max(n.lastIndexOf("]"),n.lastIndexOf("}"));if(r<=i)return[];let o;try{o=JSON.parse(n.slice(i,r+1))}catch{return[]}return(Array.isArray(o)?o:Array.isArray(o?.questions)?o.questions:Array.isArray(o?.data)?o.data:[]).filter(f=>!!f&&typeof f=="object").map(En).filter(f=>!!f)}const jn=/^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/,Ln=/^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/,qn=/^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/,Mn=/^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;function Tn(t){return t.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/).map(n=>n.trim()).filter(Boolean)}function In(t){const e=[...t.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];return e.length<2?[]:e.map((n,a)=>{const s=(n.index??0)+n[0].length,i=a+1<e.length?e[a+1].index??t.length:t.length;return t.slice(s,i).trim()})}function Cn(t){const n=t.replace(/^\uFEFF/,"").replace(/\r\n?/g,`
`).split(`
`),a=[];let s="",i=[],r="",o="",l="";const f=()=>{const d=s.trim();if(!d){s="",i=[],r="";return}if(!i.length&&!r.trim()&&d.length<=24){s="",i=[],r="";return}const g=i.map(E=>E.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()),b=g.length?Se(r,g):r.trim();a.push({q:d,opts:g,a:b,chapter:o,subject:l||"默认题库"}),s="",i=[],r="",o="",l=""};for(const d of n){if(!d.trim())continue;const g=Mn.exec(d),b=jn.exec(d),E=Ln.exec(d),A=qn.exec(d);if(g&&!b){f();const p=In(g[2]);p.length>=2?(s=g[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim(),i=p):s=g[2].trim();continue}if(b&&s){i.push(b[2].trim());continue}if(E&&(s||i.length)){r=E[1].trim();continue}if(A){const p=A[0].trim(),y=A[1].trim();/章节|知识点/.test(p)?o=y:/科目|题库|分类/.test(p)&&(l=y);continue}s?i.length?i[i.length-1]=`${i[i.length-1]} ${d.trim()}`.trim():s=`${s} ${d.trim()}`.trim():s=d.replace(/^\s*(?:题目|题干)\s*[:：]\s*/,"").trim()}return f(),a.filter(d=>d.q.length>1)}function It(t){const e=t.trim();if(!e)return[];if(/^[[{]/.test(e)||/```(?:json)?/i.test(e)||/"(q|question|题目)"\s*:/.test(e)){const n=Ae(e);if(n.length)return n}return Cn(e)}function Nn(t){const n=Pe(new Uint8Array(t))["word/document.xml"];if(!n)throw new Error("这个 docx 里没有正文，另存为 .docx 再试一次");return ze(n).replace(/<w:tab\b[^>]*\/>/g,"	").replace(/<w:br\b[^>]*\/>/g,`
`).replace(/<\/w:p>/g,`
`).replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\n{3,}/g,`

`).trim()}function On(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("文件读取失败")),a.readAsText(t,"utf-8")})}function Dn(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(a.result),a.onerror=()=>n(new Error("文件读取失败")),a.readAsArrayBuffer(t)})}function Rn(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("图片读取失败")),a.readAsDataURL(t)})}function Bn(t,e){if(!t.length)return'<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>';const n=t.slice(0,4),a=n.map((i,r)=>`<li><b>${r+1}.</b> ${m(i.q).slice(0,90)}${(i.opts??[]).length?`<span class="muted"> · ${(i.opts??[]).length} 个选项</span>`:'<span class="muted"> · 简答</span>'}</li>`).join(""),s=t.length>n.length?`<li class="muted">…还有 ${t.length-n.length} 道</li>`:"";return`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${t.length} 道题</span>
      ${e?`<span class="muted small">${m(e)}</span>`:""}
    </div>
    <ul class="import-list">${a}${s}</ul>`}function Hn(t,e){return t==="json"?Ae(e):It(e)}async function _n(){const t=document.createElement("div");t.className="import",t.innerHTML=`
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
    <div class="import-preview" data-role="preview"></div>`;const e=t.querySelector('[data-role="drop"]'),n=t.querySelector('[data-role="file"]'),a=t.querySelector('[data-role="text"]'),s=t.querySelector('[data-role="preview"]');let i=[],r="",o="",l=!1;const f=()=>{s.innerHTML=Bn(i,o||(r?"图片将由 AI 识别":""));const p=document.querySelector('[data-idx="1"]');p&&(p.textContent=i.length?`导入 ${i.length} 道题`:"AI 解析并导入")},d=(p,y,w)=>{a.value=p,i=Hn(y,p),o=w,f()},g=async()=>{const p=a.value.trim();if(!p&&!r)return[];u.info(r?"AI 正在识别图片…":"AI 正在解析文字…");const y=await S.ai.extract({...p?{prompt:p}:{},...r?{imageBase64:r}:{}});return It(y.result??"")},b=async p=>{const y=Sn(p);try{if(y==="image"){r=await Rn(p),i=[],o=`${p.name}（${Math.round(p.size/1024)}KB，AI 识别）`,f();try{i=await g(),i.length||u.error("这张图没读出题目，换张更清晰的试试")}catch(O){u.error(O instanceof x?O.message:"AI 识别失败")}f();return}if(y==="docx"){const O=await Dn(p);d(Nn(O),"docx",p.name);return}if(y==="unknown"){u.error("暂不支持这种文件，换成 txt / json / docx / 图片试试");return}const w=await On(p);d(w,y,p.name)}catch(w){u.error(w instanceof Error?w.message:"文件解析失败")}};n.addEventListener("change",()=>{const p=n.files?.[0];p&&b(p)});for(const p of["dragenter","dragover"])e.addEventListener(p,y=>{y.preventDefault(),e.classList.add("is-over")});for(const p of["dragleave","drop"])e.addEventListener(p,y=>{y.preventDefault(),e.classList.remove("is-over")});e.addEventListener("drop",p=>{const y=p.dataTransfer?.files?.[0];y&&b(y)});let E=0;if(a.addEventListener("input",()=>{window.clearTimeout(E),E=window.setTimeout(()=>{i=It(a.value),r="",o="",f()},280)}),!(!await N({title:"导入题库",body:t,actions:[{label:"取消",value:!1},{label:"导入",value:!0,variant:"primary"}],onMount:()=>f()})||l))try{const p=i.length?i:await g();if(!p.length){u.error("没解析出题目，检查一下格式，或换张更清晰的图");return}l=!0;const y=await S.questions.add(p);F("bank"),await Q(!0),u.ok(`已导入 ${y.added??p.length} 道题`)}catch(p){u.error(p instanceof x?p.message:"导入失败")}}function Un(t){const e=t.replace(/```json/gi,"```").trim(),n=/```([\s\S]*?)```/.exec(e)?.[1]??e,a=n.indexOf("{"),s=n.lastIndexOf("}");return a===-1||s<=a?"{}":n.slice(a,s+1)}const $={search:"",subject:"all",edit:!1,selected:new Set};function Ee(){$.search="",$.subject="all",$.edit=!1,$.selected.clear()}function ut(){return c.bank??[]}function Pn(){return["all",...Array.from(new Set(ut().map(t=>t.subject||"默认题库")))]}function zn(){const t=$.search.trim().toLowerCase();return ut().filter(e=>$.subject!=="all"&&(e.subject||"默认题库")!==$.subject?!1:t?z(e.q).toLowerCase().includes(t)||e.opts.some(n=>z(n).toLowerCase().includes(t)):!0)}function je(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(n=>String.fromCharCode(65+n)).join(" / ")}function Fn(){const t=zn(),e=Pn().map(a=>`<button class="chip" data-act="subject" data-subject="${m(a)}" aria-pressed="${$.subject===a}">
          ${a==="all"?"全部":m(a)}
        </button>`).join(""),n=c.loading.bank&&!c.bank?`<div class="list">${Array.from({length:4}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(a=>`
          <div class="item ${$.edit?"selectable":""}" data-id="${a.id}" data-checked="${$.selected.has(a.id)}">
            ${$.edit?`<span class="checkbox" data-act="select" data-id="${a.id}">✓</span>`:""}
            <div class="item-q">${lt(a.q)}</div>
            <div class="item-meta">
              ${a.subject?`<span class="tag tag-accent">${m(a.subject)}</span>`:""}
              ${a.chapter?`<span class="tag">${m(a.chapter)}</span>`:""}
              <span class="tag tag-ok">答案 ${m(je(a))}</span>
              <span class="grow"></span>
              ${$.edit?"":`<button class="btn btn-sm btn-ghost" data-act="edit" data-id="${a.id}">编辑</button>`}
            </div>
          </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${$.search?"没有匹配的题目":"题库还是空的"}</div><div class="empty-desc">${$.search?"换个关键词试试":"点右上角「⇪」导入 JSON / TXT / Word / 图片，或点「＋」手写"}</div></div>`;return`
    <h1 class="page-title">题库</h1>
    <div class="row" style="margin-bottom:12px">
      <div class="search-box grow">
        <span class="ico">⌕</span>
        <input type="search" placeholder="搜索题目或选项" data-role="search" value="${m($.search)}" enterkeyhint="search">
      </div>
      <button class="icon-btn" data-act="import" aria-label="导入题库" title="导入题库">⇪</button>
      <button class="icon-btn" data-act="add" aria-label="添加题目">＋</button>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${$.edit?"✓":"☰"}</button>
    </div>
    <div class="chips">${e}</div>
    ${$.edit?`<div class="row between" style="margin-bottom:12px">
        <span class="muted small">已选 ${$.selected.size} 题</span>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export">导出</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${$.selected.size?"":"disabled"}>删除</button>
        </div>
      </div>`:""}
    ${n}
    <p class="muted small" style="margin-top:18px;text-align:center">共 ${ut().length} 题 · 当前显示 ${t.length} 题</p>`}async function ne(t){const e=!t,n=document.createElement("div");if(n.innerHTML=`
    <label class="field">
      <span class="field-label">题干</span>
      <textarea class="textarea" data-role="q" placeholder="支持换行、图片与公式">${m(t?.q??"")}</textarea>
    </label>
    <div class="row" style="gap:8px;margin-top:-8px;flex-wrap:wrap">
      <button type="button" class="btn btn-ghost btn-sm" data-role="pick-img">＋ 插入图片</button>
      <button type="button" class="btn btn-ghost btn-sm" data-role="pick-math">＋ 插入公式</button>
      <span class="muted small" data-role="img-hint">图片自动压缩后内联，公式写 $E=mc^2$</span>
    </div>
    <label class="field">
      <span class="field-label">选项（每行一个，留空表示简答题）</span>
      <textarea class="textarea" data-role="opts" placeholder="A. 选项一&#10;B. 选项二">${m((t?.opts??[]).join(`
`))}</textarea>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>
      <input class="input" data-role="a" value="${m(t?je(t):"")}" placeholder="A">
    </label>
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">章节</span>
        <input class="input" data-role="chapter" value="${m(t?.chapter??"")}" placeholder="如 第三章">
      </label>
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${m(t?.subject??"默认题库")}" placeholder="默认题库">
      </label>
    </div>
    <div class="row" style="justify-content:flex-end;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`,!await N({title:e?"添加题目":"编辑题目",body:n,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:d=>{const g=d.querySelector('[data-role="q"]'),b=d.querySelector('[data-role="pick-img"]');b&&g&&b.addEventListener("click",()=>{const p=document.createElement("input");p.type="file",p.accept="image/*",p.onchange=async()=>{const y=p.files?.[0];if(!y)return;const w=d.querySelector('[data-role="img-hint"]');w&&(w.textContent="正在压缩图片…");try{const O=await $n(y);if(ee(g,`
<img src="${O}" alt="题图">
`),w){const Y=Math.round(O.length*.75/1024);w.textContent=`已插入 ${Y} KB 图片`}}catch{w&&(w.textContent="图片读取失败，换一张试试")}},p.click()});const E=d.querySelector('[data-role="pick-math"]');E&&g&&E.addEventListener("click",()=>{const p=g.selectionStart??g.value.length,y=g.selectionEnd??p,w=g.value.slice(p,y);ee(g,w?`$${w}$`:"$公式$")});const A=d.querySelector('[data-role="classify"]');A&&A.addEventListener("click",async()=>{const p=d.querySelector('[data-role="q"]')?.value.trim()??"";if(!p){u.error("先写题干，AI 才能判断归类");return}const y=d.querySelector('[data-role="opts"]')?.value??"",w=A.textContent??"";A.disabled=!0,A.textContent="归类中…";try{const O=await S.ai.classify(`题目：${p}
选项：${y.split(`
`).join("；")}`),Y=JSON.parse(Un(O.result??"{}")),Gt=d.querySelector('[data-role="subject"]'),Vt=d.querySelector('[data-role="chapter"]');Y.subject&&Gt&&(Gt.value=String(Y.subject).slice(0,24)),Y.chapter&&Vt&&(Vt.value=String(Y.chapter).slice(0,24)),u.ok("已根据题目填入题库与章节")}catch{u.error("AI 归类失败，可手动填写")}finally{A.disabled=!1,A.textContent=w}})}}))return;const s=d=>n.querySelector(`[data-role="${d}"]`).value,i=s("q").trim();if(!i){u.error("题干不能为空");return}const r=s("opts").split(`
`).map(d=>d.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),o=s("a").trim();let l="";if(r.length){const g=o.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(b=>b.charCodeAt(0)-65).filter(b=>b>=0&&b<r.length);if(!g.length){u.error("答案请填选项字母，如 A 或 A,B");return}l=g.length===1?g[0]:g}else l=o;const f={q:i,opts:r,a:l,chapter:s("chapter").trim(),subject:s("subject").trim()||"默认题库"};try{e?await S.questions.add([f]):await S.questions.update(t.id,f),F("bank"),await Q(!0),u.ok(e?"题目已添加":"题目已保存")}catch(d){u.error(d instanceof x?d.message:"保存失败")}}async function Wn(){await _n()}function Jn(){const t=ut().filter(s=>$.selected.has(s.id));if(!t.length){u.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=`题库-${t.length}题.json`,a.click(),URL.revokeObjectURL(n),u.ok(`已导出 ${t.length} 题`)}async function Kn(){await Q()}async function Qn(t,e){switch(t){case"subject":return $.subject=e.dataset.subject??"all",!0;case"toggle-edit":return $.edit=!$.edit,$.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return $.selected.has(n)?$.selected.delete(n):$.selected.add(n),!0}case"add":return await ne(),!0;case"edit":{const n=ut().find(a=>a.id===Number(e.dataset.id));return n&&await ne(n),!0}case"delete-selected":{const n=[...$.selected];if(!n.length||!await ht({title:"删除题目",message:`确定删除选中的 ${n.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await S.questions.remove(n),$.selected.clear(),F("bank"),await Q(!0),u.ok("已删除")}catch(a){u.error(a instanceof x?a.message:"删除失败")}return!0}case"export":return Jn(),!0;case"import":return await Wn(),!0;case"search":return!0;default:return!1}}function Gn(t){return t.dataset.role==="search"?($.search=t.value,!0):!1}const Vn="modulepreload",Yn=function(t){return"/"+t},ae={},Xn=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let r=function(f){return Promise.all(f.map(d=>Promise.resolve(d).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=r(n.map(f=>{if(f=Yn(f),f in ae)return;ae[f]=!0;const d=f.endsWith(".css"),g=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${g}`))return;const b=document.createElement("link");if(b.rel=d?"stylesheet":Vn,d||(b.as="script"),b.crossOrigin="",b.href=f,l&&b.setAttribute("nonce",l),document.head.appendChild(b),d)return new Promise((E,A)=>{b.addEventListener("load",E),b.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${f}`)))})}))}function i(r){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r}return s.then(r=>{for(const o of r||[])o.status==="rejected"&&i(o.reason);return e().catch(i)})};function Le(t){return new Promise(e=>window.setTimeout(e,t))}function Zn(t,e,n=620,a="%"){const s=performance.now(),i=r=>{const o=Math.min((r-s)/n,1),l=1-Math.pow(1-o,3);t.innerHTML=`${Math.round(e*l)}<span>${a}</span>`,o<1&&requestAnimationFrame(i)};requestAnimationFrame(i)}function gt(t=12){q.vibration&&navigator.vibrate?.(t)}let h=null,it=null;function et(){return h?h.options.questions[h.idx]??null:null}function yt(t){const e=h;let n=e.records.get(t.id);return n||(n={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,n)),n}function qe(){const t=h;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function ta(){const t=h;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function ea(t,e){if(M(t.a))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${m(e.text)}</textarea>
      </div>`;const n=dt(t.a);return`<div class="opts" data-multi="${n.length>1}">${t.opts.map((s,i)=>{let r="";return e.submitted?n.includes(i)?r="correct":e.picked.includes(i)?r="wrong":r="muted":e.picked.includes(i)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${i}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+i)}</span>
        <span class="opt-text">${lt(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function na(t,e){if(!e.submitted)return"";const n=M(t.a)?String(t.a):Z(t.a,t.opts),a=M(t.a)?z(e.text)||"（空）":Z(e.picked.length?e.picked:[],t.opts)||"（未选）";if(M(t.a)){const s=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${h?.busy?"disabled":""}>✦ AI 阅卷</button>
          <button class="btn btn-sm" data-act="mark" data-ok="1">我答对了</button>
          <button class="btn btn-sm" data-act="mark" data-ok="0">没答对</button>
        </div>`:`<div class="essay-actions"><span class="tag ${e.correct?"tag-ok":"tag-bad"}">${e.correct?"已标记：答对":"已标记：答错"}</span></div>`;return`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${m(n)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${m(a)}
      <div class="divider"></div>
      ${s}
    </div>`}return`<div class="answer-panel">
    <div class="ai-title">${e.correct?"✅ 回答正确":"❌ 回答错误"}</div>
    正确答案：${m(Z(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${m(a)}`}
  </div>`}function aa(){const t=h,e=et();if(!e)return"";const n=yt(e),a=t.options.questions.length,s=a?Math.round((t.idx+(n.submitted?1:0))/a*100):0,i=dt(e.a).length>1&&!M(e.a);return`
    <div class="quiz-top">
      <button class="icon-btn" data-act="exit" aria-label="退出练习">←</button>
      <div class="quiz-count">${t.idx+1}<em> / ${a}</em></div>
      <div class="header-spacer"></div>
      <button class="icon-btn" data-act="nav" aria-label="题目导航">▦</button>
    </div>
    <div class="quiz-progress"><i style="width:${s}%"></i></div>
    <div class="quiz-body">
      <div class="q-card">
        <div class="q-head">
          ${e.subject?`<span class="tag tag-accent">${m(e.subject)}</span>`:""}
          ${e.chapter?`<span class="tag">${m(e.chapter)}</span>`:""}
          <span class="grow"></span>
          <span>${i?"多选":M(e.a)?"简答":"单选"}</span>
        </div>
        <div class="q-text">${lt(e.q)}</div>
        ${ea(e,n)}
        ${na(e,n)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${bt(e.id)}" aria-label="收藏">${bt(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!Bt()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${n.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===a-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${i||M(e.a)?"提交答案":"查看答案"}</button>`}
    </div>`}function sa(t,e){h={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},C(),it=n=>{const a=h;if(!a)return;const s=n.target,i=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(n.key==="Escape"){if(document.querySelector(".modal-layer"))return;Kt();return}if(i)return;const r=et();if(!r)return;const o=yt(r);if(n.key===" "||n.key==="Enter"){const f=a.root?.querySelector('[data-act="submit"]'),d=a.root?.querySelector('[data-act="next"]');f?(n.preventDefault(),D("submit",f)):d&&(n.preventDefault(),D("next",d));return}if(n.key==="ArrowRight"){n.preventDefault(),o.submitted?Wt():D("submit",a.root.querySelector('[data-act="submit"]'));return}if(n.key==="ArrowLeft"){n.preventDefault(),D("prev",a.root);return}const l=n.key.toLowerCase();if(/^[1-9]$/.test(l)||/^[a-h]$/.test(l)){const f=/^[1-9]$/.test(l)?Number(l)-1:l.charCodeAt(0)-97;if(f<r.opts.length){n.preventDefault();const d=a.root?.querySelector(`.opt[data-idx="${f}"]`);d&&D("pick",d)}return}l==="s"?D("fav",a.root):l==="n"?D("note",a.root):l==="e"?D("ai",a.root):l==="g"?D("ai-grade",a.root):l==="?"&&Xn(()=>Promise.resolve().then(()=>qa),void 0).then(f=>f.openShortcuts())},document.addEventListener("keydown",it),t.addEventListener("submit",n=>n.preventDefault()),t.addEventListener("input",Me)}function C(){const t=h;t?.root&&(t.root.innerHTML=aa())}function Me(t){const e=t.target;e?.dataset.role!=="essay"||!h||(h.textDraft=e.value)}async function xt(t,e){const n=h;if(e.submitted=!0,M(t.a))e.correct=null;else if(e.correct=sn(e.picked,t.a),e.correct){gt(10);const a=ra();a>=3&&a%3===0&&u.ok(`连对 ${a} 题，保持住`)}else gt([14,40,14]),Ft(t,e);C(),e.correct&&n.options.questions.length>n.idx+1&&(await Le(600),h&&h.idx===n.idx&&Wt())}function ra(){const t=h;let e=0;for(let n=t.idx;n>=0;n-=1){const a=t.records.get(t.options.questions[n].id);if(a?.submitted)if(a.correct===!0)e+=1;else break}return e}async function Ft(t,e){try{await S.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(n){n instanceof x&&n.status!==401&&u.error(`错题保存失败：${n.message}`)}}function Wt(){const t=h,e=t.options.questions.length;if(t.idx>=e-1){ia();return}t.idx+=1,t.textDraft="",C(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function Jt(){it&&document.removeEventListener("keydown",it),it=null,h?.root?.removeEventListener("input",Me),h?.root?.replaceChildren(),h=null}async function Kt(){const t=h;if(!t)return;const e=qe();if(!await ht({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;et()&&Te();const s=t.options.onExit;Jt(),s?.()}function Te(){const t=h;if(!t)return;t.options.source==="sequential"&&Qe(t.idx);const e=t.options.questions.slice(0,5).map(n=>z(n.q).slice(0,40));Ve(e)}async function ia(){const t=h;Te();const e=t.options.questions.length,n=qe(),a=ta(),s=n-a,i=n?Math.round(a/n*100):0;if(Jt(),await N({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${a}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${n}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:o=>{const l=o.querySelector('[data-role="acc"]');l&&Zn(l,i)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function oa(t,e,n){e.correct=n,n?gt(10):Ft(t,e),C(),n&&u.ok("已记为答对")}async function ca(t,e){const n=h;if(n){n.busy=!0,C();try{const a=[`题目：${z(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${z(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await S.ai.grade(a),i=String(s.result||""),r=i.includes("得分")&&!i.includes("不得分");e.correct=r,r?gt(10):Ft(t,e),u.ok(r?"AI 阅卷：答对":"AI 阅卷：答错")}catch(a){u.error(a instanceof x?a.message:"AI 阅卷失败，请稍后再试")}finally{n.busy=!1,C()}}}async function la(){const t=et();if(!t)return;const e=Bt()[String(t.id)]??"",n=document.createElement("div");n.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${m(e)}</textarea>`;const a=n.querySelector("textarea");await N({title:"我的笔记",body:n,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>a.focus()})&&(Ke(t.id,a.value),u.ok("笔记已保存"),C())}async function da(){const t=et();if(!t)return;const e=yt(t),n=[`题目：${z(t.q)}`,t.opts.length?`选项：${t.opts.map((r,o)=>`${String.fromCharCode(65+o)}. ${z(r)}`).join("；")}`:"",`正确答案：${M(t.a)?t.a:Z(t.a,t.opts)}`,e.submitted?`我的作答：${M(t.a)?e.text:Z(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),a=document.createElement("div");a.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',N({title:"AI 深度解析",body:a,actions:[{label:"关闭",value:"close"}]});const s=a.querySelector('[data-role="text"]'),i=a.querySelector(".ai-title");try{let r="";const o=await S.ai.explainStream(n,f=>{r+=f,s.innerHTML=`${m(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),l=o.provider==="deepseek"?"DeepSeek":o.provider==="zhipu"?"智谱":"";i.textContent=r?`✦ AI 解析${l?` · ${l}`:""}${o.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=m(o.text||r).replace(/\n/g,"<br>"):await ua(s,o.text??""),s.classList.remove("cursor")}catch(r){const o=r instanceof x?r.message:"AI 解析失败，请稍后重试";u.error(o),i.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=o}}async function ua(t,e){for(let n=0;n<e.length;n+=2)t.innerHTML=m(e.slice(0,n+2)).replace(/\n/g,"<br>"),await Le(12)}function pa(){const t=h;if(!t)return;const e=t.options.questions.map((n,a)=>{const s=t.records.get(n.id),i=a===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${a}" data-state="${i}">${a+1}</button>`}).join("");N({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:n=>{n.querySelectorAll(".nav-cell").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.dataset.idx);!Number.isFinite(s)||!h||(h.idx=s,h.textDraft="",xe(),C())})})}}).then(n=>{n==="finish"&&Kt()})}async function D(t,e){const n=h;if(!n)return!1;const a=et();if(!a)return!1;const s=yt(a);switch(t){case"pick":{if(s.submitted)return!0;const i=Number(e.dataset.idx);return M(a.a)||(dt(a.a).length>1?(s.picked=s.picked.includes(i)?s.picked.filter(o=>o!==i):[...s.picked,i],C()):(s.picked=[i],await xt(a,s))),!0}case"submit":{if(M(a.a)){const i=n.root?.querySelector('[data-role="essay"]');if(s.text=i?.value??n.textDraft,!s.text.trim())return u.info("先写点什么再提交吧"),!0;await xt(a,s)}else{if(!s.picked.length)return u.info("请先选择答案"),!0;await xt(a,s)}return!0}case"ai-grade":return!M(a.a)||h?.busy||await ca(a,s),!0;case"mark":return M(a.a)&&oa(a,s,e.dataset.ok==="1"),!0;case"next":return Wt(),!0;case"prev":return n.idx>0&&(n.idx-=1,n.textDraft="",C()),!0;case"jump":return n.idx=Number(e.dataset.idx),n.textDraft="",xe(),C(),!0;case"nav":return pa(),!0;case"exit":return await Kt(),!0;case"fav":return await vn(a.id),C(),!0;case"note":return await la(),!0;case"ai":return da(),!0;default:return!1}}let B=null;function fa(){return!!(B&&document.body.contains(B))}function tt(t){if(!t.questions.length){u.info("这里还没有题目");return}se(),B=document.createElement("div"),B.className="quiz",document.body.appendChild(B),document.body.classList.add("is-locked"),sa(B,{...t,onExit:()=>{se(),t.onExit?.()}}),Ge({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function se(){B&&(Jt(),B.remove(),B=null,document.body.classList.remove("is-locked"))}async function St(t="random"){const e=c.bank??[];if(!e.length){u.info("题库还是空的，先去添加题目吧");return}if(t==="chapter"){const a=await ga(e);if(!a?.length)return;const s=e.filter(r=>a.includes(r.chapter||"未分类")),i=await vt(s.length);if(i===null)return;tt({questions:s.slice(0,i),source:"chapter",title:"章节练习"});return}const n=await vt(e.length);if(n!==null){if(t==="sequential"){const a=Math.min(pe(),Math.max(e.length-1,0));tt({questions:e.slice(0,n),source:"sequential",title:"顺序练习",startIndex:a<n?a:0});return}tt({questions:ve(e).slice(0,n),source:"all",title:"随机练习"})}}async function Ie(){const t=c.wrong??await G(!0);if(!t.length){u.info("错题本是空的，先去刷几题吧");return}const e=await vt(t.length);if(e===null)return;const n=t.slice(0,e).map(a=>({id:a.id,q:a.q,opts:a.opts,a:a.a,chapter:a.chapter,subject:a.subject}));tt({questions:n,source:"wrong",title:"错题重练"})}function ma(t){if(!t.length){u.info("还没有收藏题目");return}vt(t.length).then(e=>{e!==null&&tt({questions:ve(t).slice(0,e),source:"fav",title:"收藏练习"})})}function ba(){const t=fe(),e=c.bank??[];if(!t||!e.length)return u.info("没有可以继续的练习"),!1;const n=new Map(e.map(s=>[s.id,s])),a=t.ids.map(s=>n.get(s)).filter(s=>!!s);return a.length?(tt({questions:a,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,a.length-1)}),!0):(me(),u.info("上次的题目已经不在了"),!1)}function vt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const n=document.createElement("div");n.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const a=n.querySelector('[data-role="count"]');return a.addEventListener("click",s=>{const i=s.target.closest("button[data-n]");i&&(a.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),i.setAttribute("aria-pressed","true"))}),N({title:"练多少题",body:n,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const i=a.querySelector('button[aria-pressed="true"]');return Number(i?.dataset.n??t)})}async function ga(t){const e=new Map;t.forEach(r=>{const o=r.chapter?.trim()||"未分类";e.set(o,(e.get(o)??0)+1)});const n=[...e.entries()].sort((r,o)=>o[1]-r[1]);if(!n.length)return null;const a=document.createElement("div");if(a.innerHTML=`<div class="list">${n.map(([r,o],l)=>`
      <button class="item" data-chapter="${m(r)}" data-checked="${l===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${m(r)}</span><span class="tag">${o} 题</span></div>
      </button>`).join("")}</div>`,a.addEventListener("click",r=>{const o=r.target.closest("[data-chapter]");o&&(o.dataset.checked=o.dataset.checked==="true"?"false":"true")}),!await N({title:"选择章节",body:a,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const i=Array.from(a.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return i.length?i:null}const K=new Set;function va(){K.clear()}function Ct(){return c.favs??[]}function ha(){const t=Ct(),e=c.loading.fav&&!c.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(n=>`
        <div class="item" data-id="${n.id}">
          <div class="item-q">${lt(n.q)}</div>
          <div class="item-meta">
            ${n.subject?`<span class="tag tag-accent">${m(n.subject)}</span>`:""}
            ${n.chapter?`<span class="tag">${m(n.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${n.id}">${K.has(n.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${n.id}">取消收藏</button>
          </div>
          ${K.has(n.id)?`<div class="item-answer"><div class="right">${m(Z(n.a,n.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function ya(){await ot()}async function wa(t,e){switch(t){case"practice":return Ct().length?(await ma(Ct()),!0):(u.info("还没有收藏的题"),!0);case"reveal":{const n=Number(e.dataset.id);return K.has(n)?K.delete(n):K.add(n),!0}case"remove":{const n=Number(e.dataset.id);try{await S.favorites.remove(n),K.delete(n),F("fav"),await ot(!0),u.ok("已取消收藏")}catch(a){u.error(a instanceof x?a.message:"操作失败")}return!0}default:return!1}}let At="";function $a(){return(!Xe()||!At)&&(At=hn(),Ze()),At}function ka(){const t=new Date,e=a=>String(a).padStart(2,"0"),n="日一二三四五六"[t.getDay()];return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())} / 周${n}`}const xa=t=>String(t).padStart(2,"0");function Sa(){const t=c.bank,e=c.wrong,n=c.favs,a=c.loading,s=fe(),i=be().slice(0,4),r=pe(),o=t?t.length:0,l=Math.min(20,Math.max(5,o||10)),f='<div class="skeleton sk-line w60"></div><div class="skeleton sk-line w80"></div>',d=g=>g===void 0?"—":String(g).padStart(2,"0");return`
    <section class="masthead">
      <div class="mast-meta">
        <span>${ka()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${c.user?`@${m(c.user)}`:"未登录"}</span>
      </div>
      <h1 class="mast-title">
        今天<br />练 <em>${String(l).padStart(2,"0")}</em> 题
      </h1>
      <p class="mast-sub">${m($a())}</p>
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
        <span class="ov-num">${d(n?.length)}</span>
        <span class="ov-label">收藏</span>
      </button>
    </section>

    ${a.bank&&!t?`<div class="card card-pad">${f}</div>`:""}

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
             ${i.map((g,b)=>`<div class="recent-row"><span class="recent-idx">${xa(b+1)}</span><span class="recent-text">${m(g)}</span></div>`).join("")}
           </section>`:""}
  `}async function Aa(){await Promise.allSettled([Q(),G(),ot()])}async function Ea(t,e){switch(t){case"goto":return _t(e.dataset.tab??"bank"),!0;case"random":return await St("random"),!0;case"sequential":return await St("sequential"),!0;case"chapter":return await St("chapter"),!0;case"wrong":return await Ie(),!0;case"resume":return ba(),!0;default:return!1}}const Ce=[{keys:"1 2 3 4 / A B C D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1 – 5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/",desc:"聚焦题库搜索框",scope:"题库页"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function Qt(){const t=Ce.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");N({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const ja=["home","bank","wrong","fav","me"];function La(t){const e=t;if(!e)return!1;const n=e.tagName.toLowerCase();return n==="input"||n==="textarea"||n==="select"||e.isContentEditable}function Ne(){document.addEventListener("keydown",t=>{if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||La(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),Qt();return}if(t.key==="/"){const n=document.querySelector('.view input[data-role="search"]');n&&(t.preventDefault(),n.focus());return}const e=Number(t.key);e>=1&&e<=5&&(t.preventDefault(),_t(ja[e-1]))})}const qa=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:Ce,installShortcuts:Ne,openShortcuts:Qt},Symbol.toStringTag,{value:"Module"})),Ma=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],Ta=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function re(t,e,n){return`<div class="segmented">${t.map(a=>`<button class="seg" data-act="${n}" data-value="${a.value}" aria-pressed="${String(a.value)===String(e)}">${a.label}</button>`).join("")}</div>`}function ie(t,e){const n=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=t,s.click(),URL.revokeObjectURL(a)}async function Ia(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await N({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const n=t.querySelector('[data-role="old"]').value,a=t.querySelector('[data-role="next"]').value;if(a.length<6){u.error("新密码至少 6 位");return}try{await S.auth.change(n,a),u.ok("密码已更新")}catch(s){u.error(s instanceof x?s.message:"修改失败")}}function Ca(){const t=c.user,e=m((t||"?").slice(0,1).toUpperCase()),n=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})();return`
    <div class="profile">
      <div class="profile-avatar">${e}</div>
      <div class="profile-body">
        <div class="profile-name">${m(t)}</div>
        <div class="profile-desc">${c.bank?.length??0} 道题 · ${c.wrong?.length??0} 道错题 · ${c.favs?.length??0} 条收藏</div>
      </div>
    </div>

    <div class="section-title">外观</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">主题</div><div class="setting-desc">深色模式也会跟随系统自动切换</div></div>
      </div>
      ${re(Ma,q.theme,"theme")}
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景色</div><div class="setting-desc">给首页换个心情</div></div>
        <input class="color-input" type="color" value="${m(n.color||"#f4f5f7")}" data-act="pick-color" aria-label="背景色">
      </div>
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景图</div><div class="setting-desc">选一张图当首页背景，会自动压缩</div></div>
        <div class="row-actions">
          <button class="btn btn-sm" data-act="pick-bg">选择图片</button>
          ${n.image?'<button class="btn btn-sm btn-ghost" data-act="clear-bg">移除</button>':""}
        </div>
      </div>
      ${n.image?`<label class="setting-row dim-row">
              <div><div class="setting-title">背景暗化</div><div class="setting-desc">让文字更清楚一点</div></div>
              <input class="range" type="range" min="0" max="0.85" step="0.05" value="${(n.dim??.35).toFixed(2)}" data-act="dim" aria-label="背景暗化程度">
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
      ${re(Ta,q.autoDelay,"delay")}
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
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function Na(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){u.error("图片太大了（最多 8MB）");return}try{const n=await Oa(e);st({image:n,color:""}),u.ok("背景已更新"),j("render")}catch{u.error("这张图片读不出来，换一张试试")}}},t.click()}function Oa(t){return new Promise((e,n)=>{const a=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(a);const i=Math.min(1,1600/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*i),r.height=Math.round(s.height*i);const o=r.getContext("2d");if(!o){n(new Error("canvas unavailable"));return}o.drawImage(s,0,0,r.width,r.height),e(r.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(a),n(new Error("image load failed"))},s.src=a})}function Da(){Pt()}async function Ra(t,e){switch(t){case"theme":return un(e.dataset.value),j("render"),!0;case"delay":return ft({autoDelay:Number(e.dataset.value)}),j("render"),!0;case"toggle-vibration":return ft({vibration:!q.vibration}),j("render"),!0;case"toggle-streak":return ft({streakAlert:!q.streakAlert}),j("render"),!0;case"pick-color":return st({color:e.value,image:""}),!0;case"pick-bg":return await Na(),!0;case"clear-bg":return st({image:""}),j("render"),!0;case"dim":return st({dim:Number(e.value)}),!0;case"shortcuts":return Qt(),!0;case"about":return N({title:"关于",body:`<p class="muted small" style="margin:0 0 10px">原点 · Origin —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。</p>
          <p class="muted small" style="margin:0 0 6px">题库 ${c.bank?.length??0} 题 · 错题 ${c.wrong?.length??0} 道 · 收藏 ${c.favs?.length??0} 条</p>
          <p class="muted small" style="margin:0">版本 v2.0.0 · 支持 PWA 离线打开</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]}),!0;case"reset-bg":return st({color:"",image:"",dim:.35}),u.ok("背景已恢复"),j("render"),!0;case"export-bank":return c.bank?.length?(ie(`题库-${c.user}.json`,c.bank),u.ok("已导出"),!0):(u.info("题库是空的"),!0);case"export-wrong":return c.wrong?.length?(ie(`错题-${c.user}.json`,c.wrong),u.ok("已导出"),!0):(u.info("没有错题"),!0);case"change-password":return await Ia(),!0;case"logout":return await ht({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(we(),u.info("已退出登录")),!0;default:return!1}}const k={subject:"all",edit:!1,selected:new Set};function Ba(){k.subject="all",k.edit=!1,k.selected.clear()}function Oe(){const t=c.wrong??[];return k.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===k.subject)}function Ha(){return["all",...Array.from(new Set((c.wrong??[]).map(t=>t.subject||"默认题库")))]}function _a(){const t=Oe(),e=c.wrong?.length??0,n=Ha().map(s=>`<button class="chip" data-act="subject" data-subject="${m(s)}" aria-pressed="${k.subject===s}">
          ${s==="all"?"全部":m(s)}
        </button>`).join(""),a=c.loading.wrong&&!c.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${k.selected.has(s.id)}">
          ${k.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${lt(s.q)}</div>
          <div class="item-meta">
            ${s.subject?`<span class="tag tag-accent">${m(s.subject)}</span>`:""}
            ${s.chapter?`<span class="tag">${m(s.chapter)}</span>`:""}
          </div>
          <div class="item-answer">
            ${s.user_choice_text?`<div class="mine">你的选择：${m(s.user_choice_text)}</div>`:""}
            ${s.answer?`<div class="right">正确答案：${m(s.answer)}</div>`:""}
          </div>
          ${k.edit?"":`<div class="item-meta" style="margin-top:10px">
                   <span class="grow"></span>
                   <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${s.id}">已掌握</button>
                 </div>`}
        </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">⚑</div><div class="empty-title">${e?"这个题库下没有错题":"还没有错题"}</div><div class="empty-desc">${e?"切到「全部」看看":"答错的题会自动收集到这里，方便集中消灭"}</div></div>`;return`
    <div class="row between" style="margin-bottom:4px">
      <h1 class="page-title" style="margin:0">错题集</h1>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${k.edit?"✓":"☰"}</button>
    </div>
    <p class="muted small" style="margin:4px 0 14px">共 ${e} 道，消灭一题少一题</p>
    ${e?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">开始重练（${t.length} 题）</button>`:""}
    ${n}
    ${k.edit?`<div class="row between" style="margin-bottom:12px">
             <span class="muted small">已选 ${k.selected.size} 题</span>
             <button class="btn btn-sm btn-danger" data-act="remove-selected" ${k.selected.size?"":"disabled"}>删除</button>
           </div>`:""}
    ${a}`}async function Ua(){await G()}async function Pa(t,e){switch(t){case"subject":return k.subject=e.dataset.subject??"all",!0;case"toggle-edit":return k.edit=!k.edit,k.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return k.selected.has(n)?k.selected.delete(n):k.selected.add(n),!0}case"practice":return Oe().length?(await Ie(),!0):(u.info("没有可练的错题"),!0);case"remove":{const n=Number(e.dataset.id);try{await S.wrong.remove([n]),k.selected.delete(n),F("wrong"),await G(!0),u.ok("已标记掌握，继续加油")}catch(a){u.error(a instanceof x?a.message:"操作失败")}return!0}case"remove-selected":{const n=[...k.selected];if(!n.length||!await ht({title:"删除错题",message:`确定删除选中的 ${n.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await S.wrong.remove(n),k.selected.clear(),F("wrong"),await G(!0),u.ok("已删除")}catch(a){u.error(a instanceof x?a.message:"删除失败")}return!0}default:return!1}}const V={home:{render:Sa,mount:Aa,handle:Ea},bank:{render:Fn,mount:Kn,handle:Qn,onInput:Gn,reset:Ee},wrong:{render:_a,mount:Ua,handle:Pa,reset:Ba},fav:{render:ha,mount:ya,handle:wa,reset:va},me:{render:Ca,mount:Da,handle:Ra}};let ct=!1,W=!1,Et=!1,jt=!1;function De(){return document.getElementById("app-root")}function za(){W=!1,De().innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-name">Origin Quiz</span>
        </div>
        <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(c.user||"?").slice(0,1).toUpperCase()}</button>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${Tt.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${Tt.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,ct=!0}function Fa(){document.querySelectorAll(".tab-btn").forEach(e=>{const n=e.dataset.tab===c.tab;e.classList.toggle("is-active",n),e.setAttribute("aria-selected",String(n))});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,Tt.findIndex(n=>n.id===c.tab));t.style.setProperty("--tab-index",String(e))}}function Wa(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,n=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),a=n?e.getAttribute("data-role"):null,s=n&&e instanceof HTMLInputElement?e.selectionStart:null,i=V[c.tab]??V.home;if(t.innerHTML=`<div class="view-inner">${i.render()}</div>`,Fa(),n&&a){const r=t.querySelector(`[data-role="${a}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}i.mount?.()}function H(){if(Et){jt=!0;return}Et=!0;try{if(!c.authed&&!c.token){W=!0,ct=!1,De().innerHTML=wn();return}ct||za(),Wa()}finally{Et=!1,jt&&(jt=!1,queueMicrotask(H))}}let Lt=!1;function oe(){Lt||(Lt=!0,setTimeout(()=>{Lt=!1,H()},0))}async function Re(t){await t(),W&&H()}function Be(t){const e=t.dataset.act??"";if(fa()&&t.closest(".quiz")){D(e,t).then(a=>{a||j("render")});return}if(e==="tab"){_t(t.dataset.tab??"home");return}if(W){Re(()=>$e(e,t));return}const n=V[c.tab]??V.home;n.handle&&Promise.resolve(n.handle(e,t)).then(a=>{a&&H()})}function Ja(t){const e=t.target;if(!e)return;const n=e.closest("[data-act]");n&&(n.closest(".modal-layer")||Be(n))}function ce(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){Be(e);return}if(W)return;const n=document.getElementById("view");if(!n||!n.contains(e))return;(V[c.tab]??V.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&H()}function Ka(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),W&&Re(()=>$e("submit",e)))}function Qa(){Ut(),Pt(),on(()=>{we(),ct=!1,W=!1,u.error("登录已过期，请重新登录"),j("auth")}),pt("nav",()=>{Object.entries(V).forEach(([t,e])=>{t!==c.tab&&e.reset?.()}),H()}),pt("auth",()=>{ct=!1,W=!1,c.authed?(Ee(),H(),Promise.allSettled([Q(!0),G(!0),ot(!0)])):H()}),pt("render",oe),pt("data",oe),document.addEventListener("click",Ja),document.addEventListener("change",ce),document.addEventListener("input",ce),document.addEventListener("submit",Ka),Ne(),c.token&&(c.authed=!0),H(),c.token&&Promise.allSettled([Q(),G(),ot()])}function le(){try{Qa()}catch(t){console.error("[origin-quiz] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",le,{once:!0}):le();
