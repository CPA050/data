var fn=Object.defineProperty;var mn=(t,e,a)=>e in t?fn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var Ge=(t,e,a)=>mn(t,typeof e!="symbol"?e+"":e,a);import{k as gn,u as bn,s as Je,a as Bt,z as hn}from"./vendor-SAJHWpKn.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const vn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function y(t){return String(t??"").replace(/[&<>"']/g,e=>vn[e]??e)}const se=/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;function yn(t,e){try{return gn.renderToString(t,{displayMode:e,throwOnError:!1,output:"mathml",strict:!1,trust:!1})}catch{return y(e?`$$${t}$$`:`$${t}$`)}}function Ve(t){let e="",a=0;se.lastIndex=0;for(let n=se.exec(t);n;n=se.exec(t)){e+=y(t.slice(a,n.index)).replace(/\n/g,"<br>");const s=!!(n[1]||n[2]),o=(n[1]??n[2]??n[3]??n[4]??"").trim();e+=o?yn(o,s):y(n[0]),a=n.index+n[0].length}return e+=y(t.slice(a)).replace(/\n/g,"<br>"),e}const $n=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function wn(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function R(t){const e=wn(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return Ve(e);const n=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!n)return y(e);const s=o=>{if(o.nodeType===Node.TEXT_NODE)return Ve(o.textContent??"");if(o.nodeType!==Node.ELEMENT_NODE)return"";const r=o,i=r.tagName,c=Array.from(r.childNodes).map(s).join("");if(!$n.has(i))return c;if(i==="IMG"){const u=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(u))return"";const p=y(r.getAttribute("alt")??"");return`<img src="${y(u)}" alt="${p}" loading="lazy" referrerpolicy="no-referrer">`}const d=i.toLowerCase();return`<${d}>${c}</${d}>`};return Array.from(n.childNodes).map(s).join("")}function N(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function Ot(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(a=>Number.isInteger(a)))).sort((a,n)=>a-n)}function xn(t){return typeof t=="string"}function W(t,e=[]){return typeof t=="string"?t:Ot(t).map(a=>{const n=String.fromCharCode(65+a),s=(e[a]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${n}. ${s}`:n}).join("、")}function xe(t){const e=[...t];for(let a=e.length-1;a>0;a-=1){const n=Math.floor(Math.random()*(a+1));[e[a],e[n]]=[e[n],e[a]]}return e}function xa(t,e){const a=Ot(e);if(!a.length||t.length!==a.length)return!1;const n=[...new Set(t)].sort((s,o)=>s-o);return n.length===a.length&&n.every((s,o)=>s===a[o])}function kn(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const a=JSON.parse(e);if(typeof a=="number")return a;if(Array.isArray(a))return a.map(Number).filter(Number.isInteger);if(typeof a=="string")return a}catch{}return e}return""}let Y=null;function Sn(){return Y&&document.body.contains(Y)||(Y=document.createElement("div"),Y.className="toast-host",Y.setAttribute("role","status"),Y.setAttribute("aria-live","polite"),document.body.appendChild(Y)),Y}function re(t,e="info",a=2600){if(!t)return;const n=document.createElement("div");n.className=`toast toast-${e}`,n.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${y(t)}</span>`,Sn().appendChild(n),requestAnimationFrame(()=>n.classList.add("in")),window.setTimeout(()=>{n.classList.remove("in"),window.setTimeout(()=>n.remove(),220)},a)}const g={info:t=>re(t,"info"),ok:t=>re(t,"success"),error:t=>re(t,"error",3200)},ge="oq:queue",An=200;function ke(){try{const t=localStorage.getItem(ge),e=t?JSON.parse(t):[];return Array.isArray(e)?e.filter(a=>a&&a.path):[]}catch{return[]}}function ka(t){try{t.length?localStorage.setItem(ge,JSON.stringify(t.slice(-An))):localStorage.removeItem(ge)}catch{}}function En(){return ke().length}function jn(t,e,a){const n=ke();n.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,path:t,body:e,label:a,at:Date.now()}),ka(n)}let oe=!1;async function Xe(){if(oe)return 0;const t=ke();if(!t.length)return 0;oe=!0;let e=0;const a=[];for(const n of t)try{const s=await fetch(n.path,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n.body),...Qe()?{headers:{"Content-Type":"application/json",Accept:"application/json",...Qe()}}:{}});if(s.ok||s.status>=400&&s.status<500){s.ok&&(e+=1);continue}a.push(n)}catch{a.push(n);break}return oe=!1,ka([...a,...t.slice(t.length)]),e&&g.ok(`已补传 ${e} 条离线操作`),e}function Qe(){try{const e=(localStorage.getItem("oq:oq:token")||localStorage.getItem("oq:token")||"").replace(/^"|"$/g,"");return e?{Authorization:`Bearer ${e}`}:{}}catch{return{}}}function Ln(){window.addEventListener("online",()=>{Xe()}),navigator.onLine&&En()&&setTimeout(()=>void Xe(),1500)}const Se="oq:",Ae="oq:user",Ee="oq:token",Mn={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},P={...Mn,...at("settings",{})};["auto","light","dark","eye"].includes(P.theme)||(P.theme="auto");function at(t,e){try{const a=localStorage.getItem(Se+t);return a===null?e:JSON.parse(a)}catch{return e}}function nt(t,e){try{localStorage.setItem(Se+t,JSON.stringify(e))}catch{}}function be(t){try{localStorage.removeItem(Se+t)}catch{}}function Ft(t){Object.assign(P,t),nt("settings",P)}function Tn(t){Ft({theme:t})}function B(){return at(Ae,"")||""}function Sa(t){nt(Ae,t)}function qn(){be(Ae),be(Ee)}function je(){return at(Ee,"")||""}function Aa(t){nt(Ee,t)}function st(t){return`u:${B()||"anon"}:${t}`}function Le(){return at(st("notes"),{})}function Cn(t,e){const a=Le(),n=String(t);e.trim()?a[n]=e:delete a[n],nt(st("notes"),a)}function Ea(){const t=at(st("progress"),{});return Number(t.sequential_index)||0}function Nn(t){nt(st("progress"),{sequential_index:t,updatedAt:Date.now()})}function ja(){const t=at(st("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function _n(t){nt(st("session"),t)}function La(){be(st("session"))}function In(){return at(st("recent"),[])}function Dn(t){const e=[...t,...In()].slice(0,30);nt(st("recent"),Array.from(new Set(e)))}function Ma(){return at("appearance",{color:"",image:"",dim:.35})}function On(t){nt("appearance",{...Ma(),...t})}function Rn(){return at("welcomed","")===new Date().toDateString()}function Pn(){nt("welcomed",new Date().toDateString())}class T extends Error{constructor(a,n){super(n);Ge(this,"status");this.name="ApiError",this.status=a}}let Me=null;function Hn(t){Me=t}async function Ta(t,e={}){const a=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&a.set("Content-Type","application/json");const n=je();n&&a.set("Authorization",`Bearer ${n}`),a.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:a})}catch{throw new T(0,"网络连接失败，请检查网络后重试")}const o=s.headers.get("content-type")??"";let r=null;o.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const i=r??{};if(s.status===401)throw Me?.(),new T(401,typeof i.error=="string"?i.error:"登录已过期，请重新登录");if(!s.ok||i.ok===!1){const c=typeof i.error=="string"&&i.error?i.error:`请求失败（HTTP ${s.status}）`;throw new T(s.status,c)}return r}const ie=t=>Ta(t),V=(t,e)=>Ta(t,{method:"POST",body:JSON.stringify(e)});async function Bn(t,e,a){const n=new Headers({"Content-Type":"application/json"}),s=je();s&&n.set("Authorization",`Bearer ${s}`);const o=await fetch("/api/ai",{method:"POST",headers:n,body:JSON.stringify({...t,stream:!0}),signal:a});if(!o.ok||!o.body){const l=await o.json().catch(()=>({}));if(o.status===401)throw Me?.(),new T(401,"登录已过期，请重新登录");if(typeof l.result=="string")return e(l.result),{text:l.result,cached:!1,provider:typeof l.provider=="string"?l.provider:void 0};throw new T(o.status,typeof l.error=="string"?l.error:"AI 解析失败")}const r=o.body.getReader(),i=new TextDecoder;let c="",d="",u=!1,p;for(;;){const{value:l,done:m}=await r.read();if(m)break;c+=i.decode(l,{stream:!0});const b=c.split(`

`);c=b.pop()??"";for(const k of b){const v=k.split(`
`).find(x=>x.startsWith("data:"));if(!v)continue;let $;try{$=JSON.parse(v.slice(5).trim())}catch{continue}if(typeof $.delta=="string"&&$.delta&&(d+=$.delta,e($.delta)),typeof $.error=="string")throw new T(502,$.error);$.done&&(u=$.cached===!0,typeof $.provider=="string"&&(p=$.provider))}}return{text:d,cached:u,provider:p}}function he(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:kn(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function Un(t){return{...he(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}async function mt(t,e,a){try{return await V(t,e)}catch(n){if(n instanceof T&&n.status===0)return jn(t,e,a),{ok:!0,queued:!0,offline:!0};throw n}}const M={auth:{check:t=>V("/api/auth",{action:"check",username:t}),set:(t,e)=>V("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>V("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>V("/api/auth",{action:"change",username:B(),oldPassword:t,newPassword:e})},questions:{async list(){const t=B();if(!t)return[];const e=await ie(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>he(n))},add:t=>mt("/api/questions-add",{user_id:B(),questions:t},`导入 ${t.length} 道题`),update:(t,e,a)=>mt("/api/questions-update",{id:t,user_id:B(),...e,...a?.baseUpdatedAt?{base_updated_at:a.baseUpdatedAt}:{},...a?.force?{force:!0}:{}},"保存题目"),remove:t=>mt("/api/questions-delete",{ids:t,user_id:B()},`删除 ${t.length} 道题`)},wrong:{async list(){const t=B();if(!t)return[];const e=await ie(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>Un(n))},add:t=>mt("/api/wrong-add",{user_id:B(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""},"记录错题"),remove:t=>mt("/api/wrong-delete",{ids:t,user_id:B()},"移除错题")},favorites:{async list(){const t=B();if(!t)return[];const e=await ie(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>he(n))},add:t=>mt("/api/favorites-add",{user_id:B(),question_id:t},"收藏题目"),remove:t=>mt("/api/favorites-remove",{user_id:B(),question_id:t},"取消收藏")},ai:{explain:t=>V("/api/ai",{action:"explain",prompt:t}),grade:t=>V("/api/ai",{action:"grade",prompt:t}),extract:t=>V("/api/ai",{action:"extract",...t}),classify:t=>V("/api/ai",{action:"classify",prompt:t}),generate:t=>V("/api/ai",{action:"generate",prompt:t}),explainStream:(t,e,a)=>Bn({action:"explain",prompt:t},e,a)}},jt='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"',St=[{id:"home",label:"首页",icon:`<svg viewBox="0 0 24 24" ${jt} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`},{id:"bank",label:"题库",icon:`<svg viewBox="0 0 24 24" ${jt} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`},{id:"wrong",label:"错题",icon:`<svg viewBox="0 0 24 24" ${jt} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`},{id:"fav",label:"收藏",icon:`<svg viewBox="0 0 24 24" ${jt} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`},{id:"me",label:"我的",icon:`<svg viewBox="0 0 24 24" ${jt} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`}],Ye=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],f={tab:"home",user:B(),token:je(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},Mt=new Map;function Ut(t,e){return Mt.has(t)||Mt.set(t,new Set),Mt.get(t).add(e),()=>Mt.get(t)?.delete(e)}function I(t){Mt.get(t)?.forEach(e=>e())}function Rt(t){f.tab!==t&&(f.tab=t,I("nav"))}const qa=window.matchMedia("(prefers-color-scheme: dark)");function Ze(){return P.theme==="auto"?qa.matches?"dark":"light":P.theme}function Te(){document.documentElement.dataset.theme=Ze();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=Ze()==="dark"?"#0b0c0f":"#f4f5f7")}function zn(t){Tn(t),Te()}qa.addEventListener("change",()=>{P.theme==="auto"&&Te()});function Fn(t){On(t)}function qe(){const{color:t,image:e,dim:a}=Ma(),n=document.body;n.style.backgroundImage=e?`url("${e}")`:"",n.style.backgroundSize="cover",n.style.backgroundPosition="center",n.style.backgroundAttachment="fixed",n.dataset.dim=String(a),t&&!e?n.style.backgroundColor=t:n.style.backgroundColor=""}async function Wn(t,e){const a=await M.auth.login(t,e);Aa(a.token),Sa(t),f.user=t,f.token=a.token,f.authed=!0,Q(),I("auth")}async function Kn(t,e){const a=await M.auth.set(t,e);Aa(a.token),Sa(t),f.user=t,f.token=a.token,f.authed=!0,Q(),I("auth")}function Ca(){f.user="",f.token="",f.authed=!1,f.bank=null,f.wrong=null,f.favs=null,f.favoriteIds=new Set,qn(),La(),I("auth")}const Gn=300*1e3,gt={bank:0,wrong:0,fav:0},Wt=new Map;function Q(t){t?(gt[t]=0,t==="bank"&&(f.bank=null),t==="wrong"&&(f.wrong=null),t==="fav"&&(f.favs=null)):(gt.bank=gt.wrong=gt.fav=0,f.bank=null,f.wrong=null,f.favs=null)}function Jn(t,e){const a=Wt.get(t);if(a)return a;const n=e().finally(()=>Wt.delete(t));return Wt.set(t,n),n}async function Ce(t,e,a,n){if(!f.user)return[];const s=Wt.get(t);if(s)return s;const o=Date.now()-gt[t]<Gn;if(!e&&o)return[];f.loading[t]=!0,I("data");try{const r=await Jn(t,a);return n(r),gt[t]=Date.now(),r}catch(r){throw r instanceof T&&r.status!==401&&g.error(r.message),r}finally{f.loading[t]=!1,I("data")}}async function lt(t=!1){try{await Ce("bank",t,()=>M.questions.list(),e=>{f.bank=e})}catch{}return f.bank??[]}async function vt(t=!1){try{await Ce("wrong",t,()=>M.wrong.list(),e=>{f.wrong=e})}catch{}return f.wrong??[]}async function It(t=!1){try{await Ce("fav",t,()=>M.favorites.list(),e=>{f.favs=e,f.favoriteIds=new Set(e.map(a=>a.id))})}catch{}return f.favs??[]}function Jt(t){return f.favoriteIds.has(t)}async function Vn(t){const e=!Jt(t);try{return e?await M.favorites.add(t):await M.favorites.remove(t),e?f.favoriteIds.add(t):f.favoriteIds.delete(t),f.favs=null,gt.fav=0,g.ok(e?"已加入收藏":"已取消收藏"),I("data"),e}catch(a){return g.error(a instanceof T?a.message:"操作失败"),Jt(t)}}function Xn(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${Ye[Math.floor(Math.random()*Ye.length)]}`}function Tt(t){Fn(t),qe()}const A={step:"name",username:"",busy:!1,error:""};function Qn(){A.step="name",A.username="",A.busy=!1,A.error=""}function Yn(){const t=`
    <div class="auth-brand">
      <div class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 100 100" width="20" height="20" focusable="false">
          <rect x="18.5" y="18.5" width="63" height="63" fill="none" stroke="currentColor" stroke-width="4.2" />
          <circle cx="50" cy="50" r="10" fill="currentColor" />
        </svg>
      </div>
      <div>
        <div class="auth-title">基准</div>
        <div class="brand-sub">刷题 / 错题 / 收藏</div>
      </div>
    </div>`,e=A.error?`<div class="auth-error" role="alert">${y(A.error)}</div>`:"";if(A.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${y(A.username)}" required>
            </label>
            ${e}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${A.busy?"disabled":""}>
              ${A.busy?"检查中…":"继续"}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;const a=A.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${a?"为":"欢迎回来，"} <strong>${y(A.username)}</strong>${a?" 设置一个密码":""}</p>
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
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${A.busy?"disabled":""}>
            ${A.busy?"请稍候…":a?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${A.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function Na(t,e){if(t==="back")return A.step="name",A.error="",!0;if(t==="submit"){const a=e,n=new FormData(a);if(A.step==="name"){const o=String(n.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(o))return A.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;A.busy=!0,A.error="";try{const{hasPassword:r}=await M.auth.check(o);A.username=o,A.step=r?"password":"create"}catch(r){A.error=r instanceof T?r.message:"网络异常，请重试"}finally{A.busy=!1}return!0}if(A.busy)return!0;const s=String(n.get("password")??"");if(A.step==="create"){const o=String(n.get("confirm")??"");if(s!==o)return A.error="两次输入的密码不一致",!0}if(s.length<6)return A.error="密码至少 6 位",!0;A.busy=!0,A.error="";try{A.step==="create"?await Kn(A.username,s):await Wn(A.username,s),A.step==="create"&&g.ok("账号已创建，开始刷题吧"),Qn()}catch(o){A.error=o instanceof T?o.message:"登录失败，请重试"}finally{A.busy=!1}return!0}return!1}function Zn(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function _a(t,e){const a=e.trim();if(!a)return t;const n=new RegExp(Zn(a),"gi");return t.replace(/<[^>]+>|[^<]+/g,s=>s.startsWith("<")?s:s.replace(n,o=>`<mark class="hl">${o}</mark>`))}const $t={single:"单选",multi:"多选",judge:"判断",blank:"填空",essay:"简答",calc:"计算"},ts=[{value:"",label:"自动识别"},{value:"single",label:"单项选择"},{value:"multi",label:"多项选择"},{value:"judge",label:"判断题"},{value:"blank",label:"填空题"},{value:"essay",label:"简答题"},{value:"calc",label:"计算题"}],es=["single","multi","judge","blank","essay","calc"];function K(t){const e=t.type??"";if(e&&es.includes(e))return e;const a=t.opts??[],n=String(t.q??"");if(!a.length)return/(计算|求|试算|解：|画出|绘制)/.test(n)?"calc":/_{2,}|（\s*）|\(\s*\)|【\s*】/.test(n)?"blank":"essay";if(a.length===2){const s=a.map(o=>o.replace(/^[A-Za-z][.、)）]\s*/,"").trim()).join("|");if(/^(正确|对|是|√|True)|\|(错误|错|否|×|False)$/i.test(s)||/正确\|错误|对\|错/.test(s))return"judge"}return Array.isArray(t.a)?"multi":"single"}function as(t){return t==="essay"||t==="calc"||t==="blank"}let U=null,qt=0;function Ia(){return U&&document.body.contains(U)||(U=document.createElement("div"),U.className="modal-root",U.setAttribute("role","dialog"),U.setAttribute("aria-modal","true"),document.body.appendChild(U)),U}function ns(){qt+=1,document.body.classList.add("is-locked")}function ta(){qt=Math.max(0,qt-1),qt===0&&document.body.classList.remove("is-locked")}function Yt(){Ia().innerHTML="",qt=0,document.body.classList.remove("is-locked")}function C(t){const e=Ia(),a=t.dismissible!==!1;return new Promise(n=>{let s=!1;const o=l=>{if(s)return;s=!0,p(),r.classList.remove("open"),r.style.pointerEvents="none",window.matchMedia("(prefers-reduced-motion: reduce)").matches?(r.remove(),ta()):window.setTimeout(()=>{r.remove(),ta()},80),n(l)},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${a?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${y(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${y(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((l,m)=>`<button class="btn btn-${l.variant??"ghost"}" data-idx="${m}">${y(l.label)}</button>`).join("")}</div>`:""}
      </div>`;const i=r.querySelector(".modal-card"),c=i.querySelector(".modal-body");typeof t.body=="string"?c.innerHTML=t.body:t.body&&c.appendChild(t.body);const d=l=>{l.key==="Escape"&&a&&(l.stopPropagation(),o(null))},u=l=>{const m=l.target;if(m.closest("[data-close]")&&a){o(null);return}const b=m.closest("[data-idx]");if(!b)return;const k=t.actions?.[Number(b.dataset.idx)];k&&(k.keepOpen||o(k.value))},p=()=>{document.removeEventListener("keydown",d,!0),r.removeEventListener("click",u),U&&U.children.length===0&&U.classList.remove("open")};r.addEventListener("click",u),document.addEventListener("keydown",d,!0),e.appendChild(r),e.classList.add("open"),ns(),t.onMount?.(i),requestAnimationFrame(()=>{r.classList.add("open");const l=i.querySelector("input, textarea, button.btn-primary, button");l&&window.matchMedia("(pointer: fine)").matches&&l.focus({preventScroll:!0})})})}function dt(t){return C({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}function ss(t,e=1400,a=.82){return new Promise((n,s)=>{const o=URL.createObjectURL(t),r=new Image;r.onload=()=>{URL.revokeObjectURL(o);const i=Math.min(1,e/Math.max(r.width,r.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(r.width*i)),c.height=Math.max(1,Math.round(r.height*i));const d=c.getContext("2d");if(!d){s(new Error("canvas 不可用"));return}d.fillStyle="#fff",d.fillRect(0,0,c.width,c.height),d.drawImage(r,0,0,c.width,c.height),n(c.toDataURL("image/jpeg",a))},r.onerror=()=>{URL.revokeObjectURL(o),s(new Error("图片解码失败"))},r.src=o})}const rs=new Set(["B","STRONG","I","EM","U","SUB","SUP","BR","P","DIV","SPAN","IMG","CODE"]);function zt(t){const a=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html").body.firstElementChild;if(!a)return"";const n=s=>{if(s.nodeType===Node.TEXT_NODE)return(s.textContent??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");if(s.nodeType!==Node.ELEMENT_NODE)return"";const o=s,r=o.tagName,i=Array.from(o.childNodes).map(n).join("");if(!rs.has(r))return i;if(r==="IMG"){const d=o.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(d))return"";const u=(o.getAttribute("alt")??"").replace(/"/g,"&quot;");return`<img src="${d.replace(/"/g,"&quot;")}" alt="${u}">`}if(r==="BR")return"<br>";const c=r.toLowerCase();return c==="div"||c==="p"?i.trim()?`${i}<br>`:"<br>":`<${c}>${i}</${c}>`};return Array.from(a.childNodes).map(n).join("").replace(/(<br>)+$/g,"").trim()}const os=[{cmd:"bold",label:"B",title:"加粗（Ctrl/⌘+B）"},{cmd:"italic",label:"I",title:"斜体（Ctrl/⌘+I）"},{cmd:"underline",label:"U",title:"下划线（Ctrl/⌘+U）"},{cmd:"superscript",label:"x²",title:"上标"},{cmd:"subscript",label:"x₂",title:"下标"},{cmd:"insertUnorderedList",label:"≡",title:"列表"}];function is(t={}){const e=document.createElement("div");e.className="rt";const a=document.createElement("div");a.className="rt-bar";const n=document.createElement("div");n.className="rt-area",n.contentEditable="true",n.spellcheck=!1,n.dataset.role="rich",n.style.minHeight=`${t.minHeight??96}px`,t.placeholder&&(n.dataset.placeholder=t.placeholder),n.innerHTML=zt(t.value??"");const s=(r,i)=>{n.focus(),document.execCommand(r,!1,i),o()};if(t.toolbar!==!1){for(const u of os){const p=document.createElement("button");p.type="button",p.className="rt-btn",p.title=u.title,p.textContent=u.label,p.addEventListener("mousedown",l=>l.preventDefault()),p.addEventListener("click",()=>s(u.cmd,u.arg)),a.appendChild(p)}const r=document.createElement("span");r.className="rt-sep",a.appendChild(r);const i=document.createElement("button");i.type="button",i.className="rt-btn",i.textContent="∑",i.title="公式：选中内容包成 $…$",i.addEventListener("mousedown",u=>u.preventDefault()),i.addEventListener("click",()=>{const u=window.getSelection()?.toString()??"";if(u){s("insertText",`$${u}$`);return}s("insertText","$$");const p=window.getSelection();if(p&&p.rangeCount){const l=p.getRangeAt(0);typeof p.modify=="function"?p.modify("move","backward","character"):l.startContainer.nodeType===Node.TEXT_NODE&&(l.setStart(l.startContainer,Math.max(0,l.startOffset-1)),l.collapse(!0),p.removeAllRanges(),p.addRange(l))}}),a.appendChild(i);const c=document.createElement("button");c.type="button",c.className="rt-btn",c.textContent="▣",c.title="插入图片（自动压缩）",c.addEventListener("mousedown",u=>u.preventDefault()),c.addEventListener("click",()=>{const u=document.createElement("input");u.type="file",u.accept="image/*",u.onchange=async()=>{const p=u.files?.[0];if(p)try{c.textContent="…";const l=await ss(p);n.focus(),document.execCommand("insertHTML",!1,`<img src="${l}" alt="题图"><br>`),o(),g.ok(`图片已插入（${Math.round(l.length*.75/1024)} KB）`)}catch{g.error("图片读取失败，换一张试试")}finally{c.textContent="▣"}},u.click()}),a.appendChild(c);const d=document.createElement("button");d.type="button",d.className="rt-btn rt-clear",d.textContent="⌫",d.title="清除格式",d.addEventListener("mousedown",u=>u.preventDefault()),d.addEventListener("click",()=>s("removeFormat")),a.appendChild(d)}function o(){const r=(n.textContent??"").trim().length>0,i=!!n.querySelector("img");n.classList.toggle("is-empty",!r&&!i)}return n.addEventListener("input",o),n.addEventListener("blur",o),n.addEventListener("paste",r=>{const i=r.clipboardData?.getData("text/html");i&&(r.preventDefault(),document.execCommand("insertHTML",!1,zt(i)))}),o(),e.append(a,n),{el:e,getValue:()=>zt(n.innerHTML),setValue:r=>{n.innerHTML=zt(r),o()},focus:()=>n.focus()}}function ea(t){const e=t.name.toLowerCase(),a=t.type.toLowerCase();return a.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|heic)$/.test(e)?"image":e.endsWith(".docx")?"docx":e.endsWith(".json")?"json":/\.(txt|md|csv|text)$/.test(e)||a.startsWith("text/")?"text":"unknown"}function kt(t){return String(t??"").replace(/\r\n?/g,`
`).trim()}function Da(t,e){if(Array.isArray(t)){const r=t.map(i=>typeof i=="number"?i:cs(String(i),e.length)).filter(i=>i!==null);return r.length?r.length===1?r[0]:[...new Set(r)].sort((i,c)=>i-c):t.map(String).join("、")}if(typeof t=="number"&&Number.isFinite(t))return t;const a=kt(t);if(!a)return"";const s=(/^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(a)?a:"")||(/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(a)?a:"");if(s){const r=[...new Set(s.toUpperCase().split("").map(i=>i.charCodeAt(0)-65))].filter(i=>i>=0&&i<e.length);if(r.length)return r.length===1?r[0]:r.sort((i,c)=>i-c)}const o=/^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(a);if(o&&e.length){const r=o[1].charCodeAt(0)-65;if(r>=0&&r<e.length){const i=o[2].trim();return e.findIndex(d=>d.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()===i)>=0||i,r}}return a}function cs(t,e){const a=t.trim().toUpperCase();if(!/^[A-H]$/.test(a))return null;const n=a.charCodeAt(0)-65;return n<e?n:null}function ls(t){const e=kt(t.q??t.question??t.title??t.题目??t.题干);if(!e)return null;const a=t.opts??t.options??t.choices??t.选项;let n=[];Array.isArray(a)?n=a.map(r=>kt(r)).filter(Boolean):typeof a=="string"&&(n=ms(a));const s=t.a??t.answer??t.correct??t.答案??t.正确答案,o=n.length?Da(s,n):kt(s);return{q:e,opts:n,a:o,...t.figure?{figure:t.figure}:{},chapter:kt(t.chapter??t.章节??t.知识点),subject:kt(t.subject??t.科目??t.题库)||"默认题库"}}function Ne(t){const e=t.replace(/^\uFEFF/,"").trim(),a=/```(?:json)?([\s\S]*?)```/i.exec(e)?.[1]??e,n=a.indexOf("["),s=a.indexOf("{"),o=n>=0&&(s<0||n<s)?n:s;if(o<0)return[];const r=Math.max(a.lastIndexOf("]"),a.lastIndexOf("}"));if(r<=o)return[];let i;try{i=JSON.parse(a.slice(o,r+1))}catch{return[]}return(Array.isArray(i)?i:Array.isArray(i?.questions)?i.questions:Array.isArray(i?.data)?i.data:[]).filter(d=>!!d&&typeof d=="object").map(ls).filter(d=>!!d)}const ds=/^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/,us=/^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/,ps=/^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/,fs=/^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;function ms(t){return t.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/).map(a=>a.trim()).filter(Boolean)}function gs(t){const e=[...t.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];return e.length<2?[]:e.map((a,n)=>{const s=(a.index??0)+a[0].length,o=n+1<e.length?e[n+1].index??t.length:t.length;return t.slice(s,o).trim()})}function bs(t){const a=t.replace(/^\uFEFF/,"").replace(/\r\n?/g,`
`).replace(/!\[[^\]]*\]\((data:image\/[^)]+)\)/g,(u,p)=>`<img src="${p}" alt="题图">`).split(`
`),n=[];let s="",o=[],r="",i="",c="";const d=()=>{const u=s.trim();if(!u){s="",o=[],r="";return}if(!o.length&&!r.trim()&&u.length<=24){s="",o=[],r="";return}const p=o.map(m=>m.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()),l=p.length?Da(r,p):r.trim();n.push({q:u,opts:p,a:l,chapter:i,subject:c||"默认题库"}),s="",o=[],r="",i="",c=""};for(const u of a){if(!u.trim())continue;if(/^\s*<img\b/i.test(u)){s=`${s}${s?`
`:""}${u.trim()}`;continue}const p=fs.exec(u),l=ds.exec(u),m=us.exec(u),b=ps.exec(u);if(p&&!l){d();const k=gs(p[2]);k.length>=2?(s=p[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim(),o=k):s=p[2].trim();continue}if(l&&s){o.push(l[2].trim());continue}if(m&&(s||o.length)){r=m[1].trim();continue}if(b){const k=b[0].trim(),v=b[1].trim();/章节|知识点/.test(k)?i=v:/科目|题库|分类/.test(k)&&(c=v);continue}s?o.length?o[o.length-1]=`${o[o.length-1]} ${u.trim()}`.trim():s=`${s} ${u.trim()}`.trim():s=u.replace(/^\s*(?:题目|题干)\s*[:：]\s*/,"").trim()}return d(),n.filter(u=>u.q.length>1)}function Kt(t){const e=t.trim();if(!e)return[];if(/^[[{]/.test(e)||/```(?:json)?/i.test(e)||/"(q|question|题目)"\s*:/.test(e)){const a=Ne(e);if(a.length)return a}return bs(e)}function aa(t){const e=bn(new Uint8Array(t)),a=e["word/document.xml"];if(!a)throw new Error("这个 docx 里没有正文，另存为 .docx 再试一次");const n=e["word/_rels/document.xml.rels"],s=new Map;if(n){const i=Je(n);for(const c of i.matchAll(/<Relationship\b[^>]*>/g)){const d=c[0],u=/\bId="([^"]+)"/.exec(d)?.[1],p=/\bTarget="([^"]+)"/.exec(d)?.[1],l=/\bType="([^"]+)"/.exec(d)?.[1]??"";if(!u||!p||!/image/i.test(l))continue;const m=p.startsWith("/")?p.slice(1):`word/${p.replace(/^\.\//,"")}`,b=e[m];b&&s.set(u,`data:${hs(m)};base64,${vs(b)}`)}}return Je(a).replace(/<a:blip\b[^>]*r:embed="([^"]+)"[^>]*\/?>/g,(i,c)=>{const d=s.get(c);return d?`[[IMG:${d}]]`:""}).replace(/<w:tab\b[^>]*\/>/g,"	").replace(/<w:br\b[^>]*\/>/g,`
`).replace(/<\/w:p>/g,`
`).replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\[\[IMG:([^\]]+)\]\]/g,(i,c)=>`
![docx 图片](${c})
`).replace(/\n{3,}/g,`

`).trim()}function hs(t){const e=t.split(".").pop()?.toLowerCase()??"";return e==="jpg"||e==="jpeg"?"image/jpeg":e==="gif"?"image/gif":e==="bmp"?"image/bmp":e==="webp"?"image/webp":e==="svg"?"image/svg+xml":"image/png"}function vs(t){let e="";for(let n=0;n<t.length;n+=32768)e+=String.fromCharCode(...t.subarray(n,n+32768));return btoa(e)}function na(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(String(n.result??"")),n.onerror=()=>a(new Error("文件读取失败")),n.readAsText(t,"utf-8")})}function sa(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(n.result),n.onerror=()=>a(new Error("文件读取失败")),n.readAsArrayBuffer(t)})}function ra(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(String(n.result??"")),n.onerror=()=>a(new Error("图片读取失败")),n.readAsDataURL(t)})}function ys(t,e){if(!t.length)return'<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>';const a=t.slice(0,4),n=a.map((r,i)=>{const c=(r.opts??[]).length,d=oa(r),u=(r.q.match(/<img\b/gi)??[]).length,p=r.q.replace(/<img\b[^>]*>/gi," ").replace(/\s+/g," ").trim();return`<li><b>${i+1}.</b> ${y(p).slice(0,90)}${u?`<span class="muted"> · 含 ${u} 张图</span>`:""}${c?`<span class="muted"> · ${c} 个选项</span>`:'<span class="muted"> · 简答</span>'}${d?`<span class="tag-warn">${d}</span>`:""}</li>`}).join(""),s=t.length>a.length?`<li class="muted">…还有 ${t.length-a.length} 道</li>`:"",o=t.map(oa).filter(Boolean).length;return`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${t.length} 道题</span>
      ${o?`<span class="tag tag-warn">${o} 道待确认</span>`:""}
      ${e?`<span class="muted small">${y(e)}</span>`:""}
    </div>
    <ul class="import-list">${n}${s}</ul>`}function oa(t){const e=(t.opts??[]).length,a=t.a;return(Array.isArray(a)?a.length>0:a!==""&&a!==null&&a!==void 0)?e===1?"只有 1 个选项":e>=2&&typeof a=="number"&&(a<0||a>=e)?"答案越界":"":"没识别到答案"}function ce(t,e){return t==="json"?Ne(e):Kt(e)}async function $s(){const t=document.createElement("div");t.className="import",t.innerHTML=`
    <label class="dropzone" data-role="drop">
      <span class="dz-icon">⇪</span>
      <span class="dz-title">把文件拖进来，或点这里选文件</span>
      <span class="dz-hint">支持 .json / .txt / .md / .csv / .docx / 图片，可一次选多个；也能直接 Ctrl+V 粘贴截图</span>
      <input type="file" hidden multiple data-role="file"
             accept=".json,.txt,.md,.csv,.tsv,.docx,image/png,image/jpeg,image/webp,image/gif,image/bmp">
    </label>
    <div class="import-or"><span>或者直接粘贴文字</span></div>
    <textarea class="textarea import-text" data-role="text" rows="7"
      placeholder="1. 普通硅酸盐水泥的初凝时间不得早于？&#10;A. 45min&#10;B. 60min&#10;C. 90min&#10;D. 30min&#10;答案：A&#10;章节：建筑材料"></textarea>
    <div class="import-preview" data-role="preview"></div>`;const e=t.querySelector('[data-role="drop"]'),a=t.querySelector('[data-role="file"]'),n=t.querySelector('[data-role="text"]'),s=t.querySelector('[data-role="preview"]');let o=[],r="",i="",c=!1;const d=()=>{s.innerHTML=ys(o,i||(r?"图片将由 AI 识别":""));const v=document.querySelector('[data-idx="1"]');v&&(v.textContent=o.length?`导入 ${o.length} 道题`:"AI 解析并导入")},u=(v,$,x)=>{n.value=v,o=ce($,v),i=x,d()},p=async()=>{const v=n.value.trim();if(!v&&!r)return[];g.info(r?"AI 正在识别图片…":"AI 正在解析文字…");const $=await M.ai.extract({...v?{prompt:v}:{},...r?{imageBase64:r}:{}});return Kt($.result??"")},l=async v=>{const $=ea(v);try{if($==="image"){r=await ra(v),o=[],i=`${v.name}（${Math.round(v.size/1024)}KB，AI 识别）`,d();try{o=await p(),o.length||g.error("这张图没读出题目，换张更清晰的试试")}catch(S){g.error(S instanceof T?S.message:"AI 识别失败")}d();return}if($==="docx"){const S=await sa(v);u(aa(S),"docx",v.name);return}if($==="unknown"){g.error("暂不支持这种文件，换成 txt / json / docx / 图片试试");return}const x=await na(v);u(x,$,v.name)}catch(x){g.error(x instanceof Error?x.message:"文件解析失败")}},m=async v=>{if(!v.length)return;if(v.length===1){await l(v[0]);return}const $=[],x=[];for(const S of v)try{const j=ea(S);if(j==="image"){const D=await ra(S),L=await M.ai.extract({imageBase64:D});$.push(...Kt(L.result??"")),x.push(S.name);continue}if(j==="docx"){$.push(...ce("docx",aa(await sa(S)))),x.push(S.name);continue}$.push(...ce(j,await na(S))),x.push(S.name)}catch(j){g.error(`${S.name} 没读出来：${j instanceof Error?j.message:"格式不对"}`)}o=$,r="",i=`${v.length} 个文件（${x.join("、")}）`,n.value="",d()};a.addEventListener("change",()=>{m([...a.files??[]])});for(const v of["dragenter","dragover"])e.addEventListener(v,$=>{$.preventDefault(),e.classList.add("is-over")});for(const v of["dragleave","drop"])e.addEventListener(v,$=>{$.preventDefault(),e.classList.remove("is-over")});e.addEventListener("drop",v=>{const $=[...v.dataTransfer?.files??[]];m($)}),n.addEventListener("paste",v=>{const x=[...v.clipboardData?.items??[]].find(j=>j.kind==="file"&&j.type.startsWith("image/"));if(!x)return;const S=x.getAsFile();S&&(v.preventDefault(),l(S))});let b=0;if(n.addEventListener("input",()=>{window.clearTimeout(b),b=window.setTimeout(()=>{o=Kt(n.value),r="",i="",d()},280)}),!(!await C({title:"导入题库",body:t,actions:[{label:"取消",value:!1},{label:"导入",value:!0,variant:"primary"}],onMount:()=>d()})||c))try{const v=o.length?o:await p();if(!v.length){g.error("没解析出题目，检查一下格式，或换张更清晰的图");return}c=!0;const $=await M.questions.add(v);Q("bank"),await lt(!0),g.ok(`已导入 ${$.added??v.length} 道题`)}catch(v){g.error(v instanceof T?v.message:"导入失败")}}const ve="#0a0c0f",ct="#8b9099",ws="#ffffff",Ct="#1440ff";function _e(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ie(t,e,a,n){const s=n?`<text x="${t/2}" y="${e-12}" text-anchor="middle" font-size="12.5" fill="${ct}" stroke="none">${_e(n)}</text>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${e}" viewBox="0 0 ${t} ${e}" fill="none">
  <rect width="${t}" height="${e}" fill="${ws}"/>
  <g stroke="${ve}" stroke-width="1.6" stroke-linecap="square" color="${ve}" font-family="system-ui,-apple-system,'Segoe UI',sans-serif">
  ${a}
  ${s}
  </g>
</svg>`}function xs(t){const a=t.caption?210:186,n=Number(t.span)>0?Number(t.span):6,s=Number(t.value)>0?Number(t.value):20,o=44,r=316,i=96,c=(o+r)/2,d=t.load==="point"?"kN":"kN/m",u=t.load==="point"?`P = ${s} ${d}`:`q = ${s} ${d}`,p=[];if(t.load==="point")p.push(`<path d="M${c} 44 V${i-6}"/><path d="M${c-5} ${i-14} L${c} ${i-4} L${c+5} ${i-14}"/>`);else{for(let l=0;l<=8;l+=1){const m=o+(r-o)*l/8;p.push(`<path d="M${m} 56 V${i-10}"/><path d="M${m-4} ${i-18} L${m} ${i-9} L${m+4} ${i-18}"/>`)}p.push(`<path d="M${o} 56 H${r}"/>`)}return Ie(360,a,`${p.join("")}
  <path d="M${o} ${i} H${r}"/>
  <path d="M${o} ${i} l-9 15 h18 z"/>
  <path d="M${r} ${i} l-9 15 h18 z">
  </path>
  <path d="M${o} ${i+15} H${r}" stroke="${ct}" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="${c}" y="46" text-anchor="middle" font-size="12" fill="${Ct}" stroke="none">${_e(u)}</text>
  <text x="${c}" y="${i+34}" text-anchor="middle" font-size="12" fill="${ct}" stroke="none">L = ${n} m</text>`,t.caption)}function ks(t){const a=t.caption?220:196,n=Number(t.width)>0?Number(t.width):300,s=Number(t.height)>0?Number(t.height):500,o=132,r=92,i=(300-o)/2,c=62;return Ie(300,a,`<text x="${300/2}" y="40" text-anchor="middle" font-size="12" fill="${Ct}" stroke="none">截面示意图（单位 mm）</text>
  <rect x="${i}" y="${c}" width="${o}" height="${r}"/>
  <path d="M${i-12} ${c} H${i-12} V${c+r} H${i-12}" stroke="${ct}" stroke-width="1"/>
  <text x="${i-18}" y="${c+r/2}" text-anchor="middle" font-size="11" fill="${ct}" stroke="none" transform="rotate(-90 ${i-18} ${c+r/2})">h = ${s}</text>
  <text x="${300/2}" y="${c+r+22}" text-anchor="middle" font-size="11" fill="${ct}" stroke="none">b = ${n}</text>`,t.caption)}function Ss(t){const e=(t.steps??[]).filter(u=>u&&u.name).slice(0,6),a=360,s=74+Math.max(1,e.length)*30+(t.caption?22:6),o=Math.max(1,...e.map(u=>Number(u.start)+Number(u.duration))),r=92,i=a-24,c=(i-r)/o,d=e.map((u,p)=>{const l=62+p*30,m=r+Number(u.start)*c,b=Math.max(6,Number(u.duration)*c);return`<text x="${r-10}" y="${l+11}" text-anchor="end" font-size="11" fill="${ve}" stroke="none">${_e(u.name)}</text>
  <rect x="${m}" y="${l}" width="${b}" height="14" fill="${Ct}" opacity="0.12" stroke="${Ct}" stroke-width="1"/>
  <text x="${m+b/2}" y="${l+11}" text-anchor="middle" font-size="10" fill="${Ct}" stroke="none">${u.duration}</text>`}).join(`
  `);return Ie(a,s,`<text x="${r}" y="38" font-size="11" fill="${ct}" stroke="none">施工进度（天）→</text>
  <path d="M${r} 48 H${i}" stroke="${ct}" stroke-width="1"/>
  ${d}`,t.caption)}function As(t){if(!t||!t.kind)return"";let e="";return t.kind==="beam"?e=xs(t):t.kind==="section"?e=ks(t):t.kind==="flow"&&(e=Ss(t)),e?`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`:""}function Es(t){if(!t||typeof t!="object")return null;const e=t,a=String(e.kind??e.type??"").toLowerCase();if(a!=="beam"&&a!=="section"&&a!=="flow")return null;const n=r=>{const i=Number(r);return Number.isFinite(i)&&i>0?i:void 0},s=String(e.load??"").toLowerCase(),o=Array.isArray(e.steps)?e.steps.map(r=>({name:String(r.name??r.title??""),start:Number(r.start??0),duration:Number(r.duration??0)})).filter(r=>r.duration>0):void 0;return{kind:a,caption:typeof e.caption=="string"?e.caption.slice(0,40):void 0,span:n(e.span),load:s==="point"?"point":s==="uniform"?"uniform":void 0,value:n(e.value),width:n(e.width),height:n(e.height),steps:o}}const js=["基础","进阶","冲刺"],Ls=[10,20,50,100,200,500,1e3],ia=20,Ms=1e3,ca=t=>new Promise(e=>setTimeout(e,t));function la(t){return N(t).replace(/^【[^】]*】/,"").replace(/[\s，。、；：？！,.;:?!'"“”‘’()（）\[\]【】]/g,"").slice(0,40)}async function Ts(){const t=f.bank??[],e=[...new Set(t.map(w=>w.subject).filter(Boolean))],a=[...new Set(t.map(w=>w.chapter).filter(Boolean))],n=e[0]??"默认题库",s=document.createElement("div");if(s.innerHTML=`
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${y(n)}" placeholder="如 建筑工程 / 经济法 / 英语">
      </label>
      <label class="field grow">
        <span class="field-label">章节 <span class="muted small">（留空则自动轮换）</span></span>
        <input class="input" data-role="chapter" value="" placeholder="如 混凝土工程">
      </label>
    </div>
    <div class="row" style="gap:10px;margin-top:10px">
      <label class="field grow">
        <span class="field-label">数量</span>
        <select class="input" data-role="count">
          ${Ls.map(w=>`<option value="${w}"${w===50?" selected":""}>${w} 道</option>`).join("")}
        </select>
      </label>
      <label class="field grow">
        <span class="field-label">难度</span>
        <select class="input" data-role="level">
          ${js.map(w=>`<option value="${w}">${w}</option>`).join("")}
        </select>
      </label>
    </div>
    <label class="field" style="margin-top:10px">
      <span class="field-label">考点提示 <span class="muted small">（可选，越具体越好）</span></span>
      <textarea class="textarea" data-role="hint" rows="2" placeholder="如：混凝土养护时间、水化热控制"></textarea>
    </label>
    <p class="muted small" style="margin:10px 0 0">
      按每批 ${ia} 道分批生成，边生成边去重；生成完你可以先看前 12 道再决定是否入库。
      数量越多越慢（100 道约 1–2 分钟），中途可取消。
    </p>`,!await C({title:"AI 出题",body:s,actions:[{label:"取消",value:!1},{label:"开始生成",value:!0,variant:"primary"}]}))return;const r=w=>s.querySelector(`[data-role="${w}"]`)?.value.trim()??"",i=r("subject")||"默认题库",c=r("chapter"),d=Math.min(Ms,Math.max(1,Number(r("count"))||20)),u=r("level")||"基础",p=r("hint"),l=document.createElement("div");l.innerHTML=`
    <div class="gen-progress">
      <div class="gen-bar"><i data-role="bar" style="width:0%"></i></div>
      <div class="row" style="justify-content:space-between;margin-top:8px">
        <span class="muted small" data-role="line">准备中…</span>
        <span class="muted small" data-role="pct">0%</span>
      </div>
    </div>
    <div class="import-list gen-scroll" data-role="feed" style="margin-top:12px"></div>`;const m=()=>l.querySelector('[data-role="bar"]'),b=()=>l.querySelector('[data-role="line"]'),k=()=>l.querySelector('[data-role="pct"]'),v=()=>l.querySelector('[data-role="feed"]');let $=!1,x="";const S=(w,_,J="")=>{const ft=Math.min(100,Math.round(w/Math.max(1,_)*100));m().style.width=`${ft}%`,k().textContent=`${ft}%`,b().textContent=`已生成 ${w} / ${_} 道${J?` · ${J}`:""}`},j=w=>{const _=document.createElement("div");_.className="import-item gen-item";const J=N(w.q).replace(/\s+/g," ").slice(0,56);for(_.innerHTML=`<div class="gen-row"><span class="gen-text">${y(J)}</span></div>`,v().prepend(_);v().childElementCount>12;)v().lastElementChild?.remove()};C({title:"正在生成",body:l,dismissible:!1,onMount:w=>{const _=document.createElement("button");_.className="btn btn-block",_.textContent="取消生成",_.addEventListener("click",()=>{$=!0,_.textContent="正在停止…"}),w.append(_)},actions:[]});const D=new Set(t.map(w=>la(w.q??""))),L=[];let rt=0,G=0,pt=0,wt=0;const Pt=c?[c]:a.length?a:[""];let ze=0;const cn=2,ln=async w=>{if($||L.length>=d)return;const _=Math.min(ia,d-L.length),J=Pt[w%Pt.length],ft=[...L.slice(-6),...t.slice(0,6)].map(H=>`· ${N(H.q).slice(0,40)}`),ae=[`题库：${i}`,J?`章节：${J}`:"",`数量：${_} 道`,`难度：${u}`,p?`考点提示：${p}`:"",w?`这是第 ${w+1} 批，请换一批考点，不要重复前面出过的题。`:"",ft.length?`不要与这些题相同或近似：
${ft.join(`
`)}`:"","要求：贴近真实考试题型，四个选项，答案唯一，附一句解析。"].filter(Boolean).join(`
`);let ne=[];try{const H=await M.ai.generate(ae);ne=Ne(H.result??""),pt=0}catch(H){pt+=1;const xt=H instanceof T?H.message:"网络异常";x=xt,/次数|配额|429/.test(xt)&&($=!0);return}if(!ne.length){pt+=1,pt>=3&&(x="模型没有返回可用题目，先停在这里");return}const un=L.length;for(const H of ne){if(L.length>=d)break;const xt=la(H.q);if(!xt||D.has(xt)){G+=1;continue}D.add(xt);const We=Es(H.figure),Ke=As(We);if(Ke){rt+=1;const pn=(We?.caption??"示意图").replace(/"/g,"");L.push({...H,q:`${H.q}
<img src="${Ke}" alt="${pn}">`})}else L.push(H);j(H)}wt=L.length>un?0:wt+1,wt>=3&&($=!0,x="模型开始重复出同一批题，先停在这里"),S(L.length,d,G?`去重 ${G} 道`:"")},dn=async()=>{for(;!$&&L.length<d;){const w=ze;ze+=1,await ln(w),await ca(60)}};if(await Promise.all(Array.from({length:cn},()=>dn())),Yt(),await ca(180),!L.length){g.error(x||"一道题也没生成出来，换个提示再试");return}const Fe=document.createElement("div");if(Fe.innerHTML=`
    <div class="muted small" style="margin-bottom:8px">
      共 ${L.length} 道${rt?`（${rt} 道带示意图）`:""}${G?`，自动去重 ${G} 道`:""}${x?` · 提前结束：${y(x)}`:""}，确认后写入「${y(i)}」
    </div>
    <div class="import-list gen-scroll">
      ${L.slice(0,12).map((w,_)=>{const J=/<img\b[^>]*src="([^"]+)"/i.exec(String(w.q??"")),ft=J?`<img class="gen-thumb" src="${J[1]}" alt="示意图">`:"",ae=N(w.q).replace(/\s+/g," ").slice(0,64);return`<div class="import-item gen-item"><div class="gen-row">${ft}<span class="gen-text"><b>${_+1}.</b> ${y(ae)}${Array.isArray(w.opts)&&w.opts.length?` <span class="muted">· ${w.opts.length} 选项</span>`:""}</span></div></div>`}).join("")}
      ${L.length>12?`<div class="muted small" style="padding:8px 2px">还有 ${L.length-12} 道未展示…</div>`:""}
    </div>`,!await C({title:"确认导入",body:Fe,actions:[{label:"不要了",value:!1},{label:`导入 ${L.length} 道`,value:!0,variant:"primary"}]}))return;const ee=L.map(w=>({...w,subject:i,chapter:w.chapter||c}));let Ht=0;try{for(let w=0;w<ee.length;w+=20){const _=ee.slice(w,w+20);await M.questions.add(_),Ht+=_.length,g.info(`已写入 ${Ht} / ${ee.length} 道`)}Q("bank"),await lt(!0),g.ok(`已导入 ${Ht} 道题`)}catch(w){g.error(w instanceof T?w.message:`导入中断，已写入 ${Ht} 道`),Q("bank")}}const qs=`
  @page { size: A4; margin: 18mm 16mm 16mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    color: #111;
    background: #fff;
    font: 15px/1.75 "Songti SC", "SimSun", "Noto Serif SC", serif;
  }
  .sheet-head { border-bottom: 2px solid #111; padding-bottom: 10px; margin-bottom: 22px; }
  .sheet-kicker { font: 600 10px/1.4 system-ui, sans-serif; letter-spacing: .22em; color: #555; text-transform: uppercase; }
  .sheet-title { font-size: 26px; font-weight: 700; margin: 6px 0 4px; letter-spacing: .02em; }
  .sheet-meta { font: 12px/1.6 system-ui, sans-serif; color: #666; }
  .q { margin: 0 0 20px; page-break-inside: avoid; }
  .q-no { font: 600 12px/1 system-ui, sans-serif; color: #888; letter-spacing: .1em; margin-bottom: 6px; }
  .q-body { font-size: 15px; }
  .q-body img { max-width: 100%; max-height: 260px; object-fit: contain; display: block; margin: 8px 0; }
  .q-opts { margin: 8px 0 0; padding: 0; list-style: none; }
  .q-opts li { margin: 3px 0 3px 4px; }
  .q-opts .k { display: inline-block; width: 1.6em; color: #111; font-weight: 600; }
  .q-tag { font: 500 10px/1 system-ui, sans-serif; color: #666; letter-spacing: .08em; }
  .answer-key { page-break-before: always; }
  .answer-key h2 { font-size: 18px; border-bottom: 1px solid #111; padding-bottom: 8px; margin: 0 0 14px; }
  .answer-key li { margin: 4px 0; font-size: 13px; }
  .answer-key .k { display: inline-block; width: 3em; color: #888; }
  .tips { margin-top: 26px; font: 11px/1.6 system-ui, sans-serif; color: #999; }
  mark.hl { background: #ffe58a; }
`;function Lt(t){return String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]??e)}function da(t,e={}){if(!t.length){g.info("没有可导出的题目");return}const a=e.title||"练习试卷",n=new Date().toLocaleDateString("zh-CN"),s=e.answers!==!1,o=t.map((d,u)=>{const p=K(d),l=(d.opts??[]).map((m,b)=>{const k=m.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return`<li><span class="k">${String.fromCharCode(65+b)}</span>${R(k)}</li>`}).join("");return`<article class="q">
        <div class="q-no">${String(u+1).padStart(2,"0")} · ${$t[p]}${d.chapter?` · ${Lt(d.chapter)}`:""}</div>
        <div class="q-body">${R(d.q)}</div>
        ${l?`<ul class="q-opts">${l}</ul>`:'<p class="q-tag">（简答题，请在答题纸上作答）</p>'}
      </article>`}).join(""),r=s?`<section class="answer-key">
        <h2>参考答案</h2>
        <ol>${t.map((d,u)=>`<li><span class="k">${String(u+1).padStart(2,"0")}</span>${Lt(W(d.a,d.opts??[]))}</li>`).join("")}</ol>
      </section>`:"",i=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${Lt(a)} · ${n}</title>
<style>${qs}</style></head>
<body>
  <header class="sheet-head">
    <div class="sheet-kicker">基准 DATUM / Practice Sheet</div>
    <h1 class="sheet-title">${Lt(a)}</h1>
    <div class="sheet-meta">${n} · 共 ${t.length} 题${e.subtitle?" · "+Lt(e.subtitle):""} · 姓名 __________ 得分 ______</div>
  </header>
  ${o}
  ${r}
  <p class="tips">由「基准」导出 · 打印对话框里选择「另存为 PDF」即可保存。</p>
</body></html>`,c=window.open("","_blank");if(!c){g.error("浏览器拦住了新窗口，请允许弹出窗口后重试");return}c.document.open(),c.document.write(i),c.document.close(),c.focus(),g.ok(`已生成 ${t.length} 题的打印版，在打印里选「另存为 PDF」`)}const Oa=914400,Cs=6.4*Oa,Ns=4.2*Oa,_s=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function Ra(t,e={}){return`<w:r><w:rPr>${['<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>',e.bold?"<w:b/>":"",e.italic?"<w:i/>":"",`<w:sz w:val="${e.size??21}"/><w:szCs w:val="${e.size??21}"/>`,e.color?`<w:color w:val="${e.color}"/>`:""].join("")}</w:rPr><w:t xml:space="preserve">${_s(t)}</w:t></w:r>`}function Z(t,e={}){const a=e.before||e.after?`<w:spacing w:before="${e.before??0}" w:after="${e.after??0}"/>`:"",n=e.indent||e.hanging?`<w:ind w:left="${e.indent??0}" w:hanging="${e.hanging??0}"/>`:"";return`<w:p><w:pPr>${a}${n}</w:pPr>${t?Ra(t,e):""}</w:p>`}function Is(t,e,a,n){return`<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${Math.round(a)}" cy="${Math.round(n)}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${e}" name="Picture ${e}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${e}" name="image${e}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${t}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${Math.round(a)}" cy="${Math.round(n)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`}function Ds(t){return new Promise(e=>{const a=new Image;a.onload=()=>e({w:a.naturalWidth||640,h:a.naturalHeight||480}),a.onerror=()=>e(null),a.src=t})}function Os(t){const e=/^data:image\/([a-zA-Z+]+);base64,(.+)$/.exec(t);if(!e)return null;try{const a=atob(e[2]),n=new Uint8Array(a.length);for(let o=0;o<a.length;o+=1)n[o]=a.charCodeAt(o);const s=e[1].toLowerCase()==="jpeg"?"jpeg":e[1].toLowerCase();return{bytes:n,ext:s}}catch{return null}}function Rs(t){const e=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html"),a=[],n=s=>{if(s.nodeType===Node.TEXT_NODE){const r=s.textContent??"";r.trim()&&a.push({kind:"text",value:r.replace(/\s+/g," ")});return}if(s.nodeType!==Node.ELEMENT_NODE)return;const o=s;if(o.tagName==="IMG"){a.push({kind:"img",value:o.getAttribute("src")??""});return}if(o.tagName==="BR"){a.push({kind:"br",value:""});return}o.childNodes.forEach(n)};return e.body.firstElementChild?.childNodes.forEach(n),a}async function Ps(t,e){const a=[],n=[];let s=0;a.push(Z(e.title??"题库练习卷",{size:32,bold:!0,after:80}));const o=[e.subtitle??"",`${t.length} 题`,"姓名 ________","得分 ________"].filter(Boolean).join("　　");a.push(Z(o,{size:18,color:"666666",after:200}));for(let l=0;l<t.length;l+=1){const m=t[l],b=K(m),k=String(l+1).padStart(2,"0");a.push(Z(`${k}　${$t[b]}${m.chapter?"　·　"+m.chapter:""}`,{size:18,bold:!0,color:"1440FF",before:200,after:60}));const v=Rs(m.q);let $="";const x=()=>{$.trim()&&a.push(Z($.trim(),{after:60})),$=""};for(const S of v)if(S.kind==="text")$+=S.value;else if(S.kind==="br")x();else{x();const j=Os(S.value);if(!j)continue;const L=await Ds(S.value)??{w:640,h:480};let rt=L.w*9525,G=L.h*9525;const pt=Math.min(Cs/rt,Ns/G,1);rt*=pt,G*=pt,s+=1;const wt=`rId${100+s}`,Pt=`image${s}.${j.ext}`;n.push({relId:wt,name:Pt,bytes:j.bytes,cx:rt,cy:G,id:s}),a.push(Is(wt,s,rt,G))}if(x(),Array.isArray(m.opts)&&m.opts.length)m.opts.forEach((S,j)=>{const D=String.fromCharCode(65+j),L=String(S).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");a.push(Z(`${D}. ${L}`,{size:20,hanging:280,indent:280,after:20}))});else if(b==="blank")a.push(Z("答：________________________________",{after:40}));else if(b==="essay"){for(let S=0;S<3;S+=1)a.push(Z("　",{after:60}));a.push(Z("（请在答题纸上作答）",{size:18,color:"999999",after:40}))}}e.withAnswers!==!1&&(a.push(`<w:p><w:pPr><w:pageBreakBefore/></w:pPr>${Ra("参考答案",{size:28,bold:!0})}</w:p>`),t.forEach((l,m)=>{const b=String(m+1).padStart(2,"0");a.push(Z(`${b}　${W(l.a,l.opts)||"（无）"}`,{size:20,after:40}))}));const r=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>${a.join("")}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="851" w:footer="992" w:gutter="0"/></w:sectPr></w:body></w:document>`,i='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',c='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',d='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+n.map(l=>`<Relationship Id="${l.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${l.name}"/>`).join("")+"</Relationships>",u={"[Content_Types].xml":Bt(i),"_rels/.rels":Bt(c),"word/document.xml":Bt(r),"word/_rels/document.xml.rels":Bt(d)};for(const l of n)u[`word/media/${l.name}`]=l.bytes;const p=hn(u,{level:6});return new Blob([p],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})}async function ua(t,e={}){if(!t.length){g.error("没有可导出的题目");return}try{const a=await Ps(t,e),n=URL.createObjectURL(a),s=document.createElement("a"),o=new Date().toISOString().slice(0,10);s.href=n,s.download=`${(e.title??"题库试卷").replace(/[\\/:*?"<>|]/g,"-")}-${o}.docx`,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(n),4e3),g.ok(`已导出 ${t.length} 题的 Word 文档`)}catch(a){g.error(a instanceof Error?`导出失败：${a.message}`:"导出失败")}}function Hs(t){const e=t.replace(/```json/gi,"```").trim(),a=/```([\s\S]*?)```/.exec(e)?.[1]??e,n=a.indexOf("{"),s=a.lastIndexOf("}");return n===-1||s<=n?"{}":a.slice(n,s+1)}const ot=20,h={search:"",subject:"all",type:"all",edit:!1,page:0,selected:new Set};function Pa(){h.search="",h.subject="all",h.type="all",h.edit=!1,h.page=0,h.selected.clear()}function it(){return f.bank??[]}function Bs(){return["all",...Array.from(new Set(it().map(t=>t.subject||"默认题库")))]}function Gt(){const t=h.search.trim().toLowerCase();return it().filter(e=>h.subject!=="all"&&(e.subject||"默认题库")!==h.subject||h.type!=="all"&&K(e)!==h.type?!1:t?N(e.q).toLowerCase().includes(t)||e.opts.some(a=>N(a).toLowerCase().includes(t)):!0)}function Ha(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(a=>String.fromCharCode(65+a)).join(" / ")}function Us(){const t=Gt(),e=Math.max(1,Math.ceil(t.length/ot));h.page>e-1&&(h.page=e-1),h.page<0&&(h.page=0);const a=t.slice(h.page*ot,h.page*ot+ot),n=Bs().map(d=>`<button class="chip" data-act="subject" data-subject="${y(d)}" aria-pressed="${h.subject===d}">
          ${d==="all"?"全部":y(d)}
        </button>`).join(""),s=it(),o={single:0,multi:0,judge:0,blank:0,essay:0};s.forEach(d=>{o[K(d)]+=1});const r=[["all","全部",s.length],["single","单选",o.single],["multi","多选",o.multi],["judge","判断",o.judge],["blank","填空",o.blank],["essay","简答",o.essay]].filter(([d,,u])=>d==="all"||u>0).map(([d,u,p])=>`<button class="chip" data-act="type" data-type="${d}" aria-pressed="${h.type===d}">${u} <span class="chip-n">${p}</span></button>`).join(""),i=a.map((d,u)=>{const p=K(d),l=String(h.page*ot+u+1).padStart(2,"0");return`<tr class="q-row ${h.edit?"selectable":"is-clickable"}" data-id="${d.id}" ${h.edit?"":'data-act="peek"'}>
        <td class="c-no">${h.edit?`<button class="checkbox" data-act="select" data-id="${d.id}" aria-pressed="${h.selected.has(d.id)}">✓</button>`:l}</td>
        <td class="c-q">
          <div class="q-cell">${_a(R(d.q),h.search)}</div>
          ${d.opts.length?`<div class="q-sub">${d.opts.length} 个选项</div>`:""}
        </td>
        <td class="c-type"><span class="tag tag-type">${$t[p]}</span></td>
        <td class="c-chapter muted">${y(d.chapter||"—")}</td>
        <td class="c-ans"><span class="tag tag-ok">${y(Ha(d))}</span></td>
        <td class="c-act"><button class="icon-btn sm" data-act="edit" data-id="${d.id}" aria-label="编辑">✎</button></td>
      </tr>`}).join(""),c=f.loading.bank&&!f.bank?`<div class="list">${Array.from({length:5}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div></div>').join("")}</div>`:t.length?`<div class="table-wrap">
          <table class="q-table">
            <thead><tr>
              <th class="c-no">NO</th><th class="c-q">题干</th><th class="c-type">题型</th>
              <th class="c-chapter">章节</th><th class="c-ans">答案</th><th class="c-act"></th>
            </tr></thead>
            <tbody>${i}</tbody>
          </table>
        </div>
        ${e>1?`<div class="pager">
                 <button class="btn btn-sm" data-act="page-prev" ${h.page===0?"disabled":""}>← 上一页</button>
                 <span class="pager-info">${h.page+1} / ${e} 页 · 共 ${t.length} 题</span>
                 <button class="btn btn-sm" data-act="page-next" ${h.page>=e-1?"disabled":""}>下一页 →</button>
               </div>`:`<p class="muted small table-count">共 ${t.length} 题</p>`}`:`<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${h.search?"没有匹配的题目":"题库还是空的"}</div><div class="empty-desc">${h.search?"换个关键词试试":"点右上角「⇪」导入 JSON / TXT / Word / 图片，或点「＋」手写"}</div></div>`;return`
    <h1 class="page-title">题库</h1>
    <div class="search-box">
      <span class="ico">⌕</span>
      <input type="search" placeholder="搜索题干或选项（/ 聚焦）" data-role="search" value="${y(h.search)}" enterkeyhint="search">
    </div>
    <div class="tool-row">
      <button class="tool-btn" data-act="import" title="导入题库">⇪<span>导入</span></button>
      <button class="tool-btn" data-act="generate" title="AI 出题">✦<span>出题</span></button>
      <button class="tool-btn" data-act="add" title="添加题目">＋<span>新建</span></button>
      <button class="tool-btn" data-act="print" title="导出试卷（打印 / 存 PDF）">⎙<span>试卷</span></button>
      <button class="tool-btn" data-act="docx" title="导出 Word（.docx）">⤓<span>Word</span></button>
      <button class="tool-btn" data-act="toggle-edit" title="批量管理">${h.edit?"✓":"☰"}<span>批量</span></button>
    </div>
    <div class="chips">${n}</div>
    <div class="chips chips-type">${r}</div>
    ${h.edit?`<div class="row between" style="margin-bottom:12px">
        <button class="btn btn-sm btn-ghost" data-act="select-all">${h.selected.size===t.length&&t.length?"取消全选":"全选本页"}</button>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export" ${h.selected.size?"":"disabled"}>导出 JSON</button>
          <button class="btn btn-sm" data-act="print-selected" ${h.selected.size?"":"disabled"}>导出试卷</button>
          <button class="btn btn-sm" data-act="docx-selected" ${h.selected.size?"":"disabled"}>导出 Word</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${h.selected.size?"":"disabled"}>删除</button>
        </div>
      </div>`:""}
    ${c}`}async function ye(t){const e=!t,a={editor:null},n=document.createElement("div");if(n.innerHTML=`
    <label class="field">
      <span class="field-label">题干</span>
      <div data-role="q-host"></div>
    </label>
    <div class="row" style="gap:8px;margin-top:-8px;flex-wrap:wrap">
      <span class="muted small">粗体 / 上下标 / 列表 / ∑ 公式 / ▣ 图片（自动压缩内联）</span>
    </div>
    <label class="field">
      <span class="field-label">选项（每行一个，留空表示简答题）</span>
      <textarea class="textarea" data-role="opts" placeholder="A. 选项一&#10;B. 选项二">${y((t?.opts??[]).join(`
`))}</textarea>
    </label>
    <label class="field">
      <span class="field-label">题型 <span class="muted small">（自动识别不准时手动指定）</span></span>
      <select class="input" data-role="type">
        ${ts.map(l=>`<option value="${l.value}"${(t?.type??"")===l.value?" selected":""}>${l.label}</option>`).join("")}
      </select>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>
      <input class="input" data-role="a" value="${y(t?Ha(t):"")}" placeholder="A">
    </label>
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">章节</span>
        <input class="input" data-role="chapter" value="${y(t?.chapter??"")}" placeholder="如 第三章">
      </label>
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${y(t?.subject??"默认题库")}" placeholder="默认题库">
      </label>
    </div>
    <label class="field">
      <span class="field-label">解析 <span class="muted small">（错题复习时直接看，不用每次问 AI）</span></span>
      <textarea class="textarea" data-role="explain" rows="3" placeholder="为什么选它、其他选项错在哪">${y(t?.explain??"")}</textarea>
    </label>
    <div class="row" style="justify-content:flex-end;gap:8px;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="gen-explain">✦ 生成解析</button>
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`,!await C({title:e?"添加题目":"编辑题目",body:n,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:l=>{const m=l.querySelector('[data-role="q-host"]');m&&(a.editor=is({value:t?.q??"",placeholder:"输入题干；可用工具栏插图、写公式（$…$）",minHeight:110}),m.appendChild(a.editor.el));const b=l.querySelector('[data-role="gen-explain"]');b?.addEventListener("click",async()=>{const v=N(a.editor?.getValue()??"").trim(),$=l.querySelector('[data-role="opts"]')?.value??"",x=l.querySelector('[data-role="a"]')?.value??"";if(!v){g.error("先写题干，AI 才能写解析");return}const S=l.querySelector('[data-role="explain"]'),j=b.textContent??"";b.disabled=!0,b.textContent="生成中…";try{const D=await M.ai.explain(`题目：${v}
选项：${$.split(`
`).join("；")}
正确答案：${x}`);S&&(S.value=(D.result??"").trim()),g.ok("解析已生成，可再手动润色")}catch(D){g.error(D instanceof T?D.message:"生成失败")}finally{b.disabled=!1,b.textContent=j}});const k=l.querySelector('[data-role="classify"]');k&&k.addEventListener("click",async()=>{const v=N(a.editor?.getValue()??"").trim();if(!v){g.error("先写题干，AI 才能判断归类");return}const $=l.querySelector('[data-role="opts"]')?.value??"",x=k.textContent??"";k.disabled=!0,k.textContent="归类中…";try{const S=await M.ai.classify(`题目：${v}
选项：${$.split(`
`).join("；")}`),j=JSON.parse(Hs(S.result??"{}")),D=l.querySelector('[data-role="subject"]'),L=l.querySelector('[data-role="chapter"]');j.subject&&D&&(D.value=String(j.subject).slice(0,24)),j.chapter&&L&&(L.value=String(j.chapter).slice(0,24)),g.ok("已根据题目填入题库与章节")}catch{g.error("AI 归类失败，可手动填写")}finally{k.disabled=!1,k.textContent=x}})}}))return;const o=l=>n.querySelector(`[data-role="${l}"]`).value,r=(a.editor?.getValue()??"").trim();if(!N(r).trim()&&!/<img/i.test(r)){g.error("题干不能为空");return}const i=o("opts").split(`
`).map(l=>l.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),c=o("a").trim();let d="";if(i.length){const m=c.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(b=>b.charCodeAt(0)-65).filter(b=>b>=0&&b<i.length);if(!m.length){g.error("答案请填选项字母，如 A 或 A,B");return}d=m.length===1?m[0]:m}else d=c;const u=n.querySelector('[data-role="type"]'),p={q:r,opts:i,a:d,chapter:o("chapter").trim(),subject:o("subject").trim()||"默认题库",explain:o("explain").trim(),type:u?.value??""};try{if(e)await M.questions.add([p]);else try{await M.questions.update(t.id,p,{baseUpdatedAt:t.updated_at})}catch(l){if(l instanceof T&&l.status===409){if(!await dt({title:"这道题在别处被改过",message:"另一台设备保存了这题的更新版本。要用你现在的内容覆盖它吗？",okText:"覆盖",danger:!0}))return;await M.questions.update(t.id,p,{force:!0})}else throw l}Q("bank"),await lt(!0),g.ok(e?"题目已添加":"题目已保存")}catch(l){g.error(l instanceof T?l.message:"保存失败")}}async function zs(){await $s()}function Fs(){const t=it().filter(s=>h.selected.has(s.id));if(!t.length){g.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=`题库-${t.length}题.json`,n.click(),URL.revokeObjectURL(a),g.ok(`已导出 ${t.length} 题`)}async function Ws(){await lt()}async function Ks(t,e){switch(t){case"subject":return h.subject=e.dataset.subject??"all",!0;case"toggle-edit":return h.edit=!h.edit,h.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return h.selected.has(a)?h.selected.delete(a):h.selected.add(a),!0}case"add":return await ye(),!0;case"edit":{const a=it().find(n=>n.id===Number(e.dataset.id));return a&&await ye(a),!0}case"delete-selected":{const a=[...h.selected];if(!a.length||!await dt({title:"删除题目",message:`确定删除选中的 ${a.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await M.questions.remove(a),h.selected.clear(),Q("bank"),await lt(!0),g.ok("已删除")}catch(n){g.error(n instanceof T?n.message:"删除失败")}return!0}case"export":return Fs(),!0;case"print":return da(Gt(),{title:`题库 · ${h.subject==="all"?"全部":h.subject}`}),!0;case"docx":return await ua(Gt(),{title:`题库 · ${h.subject==="all"?"全部":h.subject}`,subtitle:"基准"}),!0;case"docx-selected":return await ua(it().filter(a=>h.selected.has(a.id)),{title:"选中题目 · 试卷",subtitle:"基准"}),!0;case"print-selected":return da(it().filter(a=>h.selected.has(a.id)),{title:"选中题目 · 试卷"}),!0;case"page-prev":return h.page=Math.max(0,h.page-1),!0;case"page-next":return h.page+=1,!0;case"select-all":{const a=Gt().slice(h.page*ot,h.page*ot+ot),n=a.every(s=>h.selected.has(s.id));return a.forEach(s=>n?h.selected.delete(s.id):h.selected.add(s.id)),!0}case"generate":return await Ts(),!0;case"import":return await zs(),!0;case"type":{const a=e.dataset.type;return a&&(h.type=a,h.page=0),!0}case"peek":{const a=Number(e.dataset.id),n=it().find(s=>s.id===a);return n&&await Gs(n),!0}case"search":return!0;default:return!1}}async function Gs(t){const e=K(t),a=document.createElement("div");a.className="peek",a.innerHTML=`
    <div class="peek-meta">
      <span class="tag tag-type">${$t[e]}</span>
      ${t.subject?`<span class="tag">${y(t.subject)}</span>`:""}
      ${t.chapter?`<span class="tag">${y(t.chapter)}</span>`:""}
    </div>
    <div class="peek-q q-text">${R(t.q)}</div>
    ${t.opts.length?`<ul class="peek-opts">${t.opts.map((s,o)=>`<li class="${(Array.isArray(t.a)?t.a.includes(o):t.a===o)?"is-hit":""}"><b>${String.fromCharCode(65+o)}</b>${R(String(s).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</li>`).join("")}</ul>`:""}
    <div class="peek-ans"><span class="muted">答案</span> ${y(W(t.a,t.opts)||"（无）")}</div>`,await C({title:"题目预览",body:a,actions:[{label:"关闭",value:"close"},{label:"编辑这题",value:"edit",variant:"primary"}]})==="edit"&&await ye(t)}function Js(t){return t.dataset.role==="search"?(h.search=t.value,h.page=0,!0):!1}const Vs="modulepreload",Xs=function(t){return"/"+t},pa={},Qs=function(e,a,n){let s=Promise.resolve();if(a&&a.length>0){let r=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");s=r(a.map(d=>{if(d=Xs(d),d in pa)return;pa[d]=!0;const u=d.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const l=document.createElement("link");if(l.rel=u?"stylesheet":Vs,u||(l.as="script"),l.crossOrigin="",l.href=d,c&&l.setAttribute("nonce",c),document.head.appendChild(l),u)return new Promise((m,b)=>{l.addEventListener("load",m),l.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return s.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function Ba(t){return new Promise(e=>window.setTimeout(e,t))}function Ys(t,e,a=620,n="%"){const s=performance.now(),o=r=>{const i=Math.min((r-s)/a,1),c=1-Math.pow(1-i,3);t.innerHTML=`${Math.round(e*c)}<span>${n}</span>`,i<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}function Vt(t=12){P.vibration&&navigator.vibrate?.(t)}const Ua="oq:log",Zs=4e3;function za(){try{const t=localStorage.getItem(Ua),e=t?JSON.parse(t):[];return Array.isArray(e)?e:[]}catch{return[]}}function Fa(t){try{localStorage.setItem(Ua,JSON.stringify(t.slice(-Zs)))}catch{}}function tr(t,e){const a=za();a.push({ts:Date.now(),type:t,ok:e}),Fa(a)}const er=t=>String(t).padStart(2,"0");function Wa(){const t=za(),e=new Date().toDateString(),a=new Map,n=new Map;let s=0,o=0,r=0,i=0;for(const m of t){const b=new Date(m.ts);s+=1,m.ok&&(o+=1),b.toDateString()===e&&(r+=1,m.ok&&(i+=1));const k=a.get(m.type)??{n:0,ok:0};k.n+=1,m.ok&&(k.ok+=1),a.set(m.type,k);const v=`${b.getMonth()+1}-${er(b.getDate())}`,$=n.get(v)??{n:0,ok:0,ts:b.setHours(0,0,0,0)};$.n+=1,m.ok&&($.ok+=1),n.set(v,$)}const c=[...a.entries()].map(([m,b])=>({type:m,n:b.n,ok:b.ok,rate:b.n?b.ok/b.n:0})).sort((m,b)=>b.n-m.n),d=[...n.entries()].sort((m,b)=>m[1].ts-b[1].ts).map(([m,b])=>({label:m,n:b.n,ok:b.ok})),u=new Set(t.map(m=>new Date(m.ts).toDateString()));let p=0;const l=new Date;for(u.has(l.toDateString())||l.setDate(l.getDate()-1);u.has(l.toDateString());)p+=1,l.setDate(l.getDate()-1);return{total:s,ok:o,rate:s?o/s:0,today:{n:r,ok:i,rate:r?i/r:0},byType:c,days:d,days7:d.slice(-7),streak:p}}function ar(){Fa([])}let E=null,Nt=null;function Et(){return E?E.options.questions[E.idx]??null:null}function Zt(t){const e=E;let a=e.records.get(t.id);return a||(a={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,a)),a}function Ka(){const t=E;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function nr(){const t=E;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function z(t){const e=K(t);return e==="blank"||e==="essay"||e==="calc"||xn(t.a)}function sr(t,e){if(z(t))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${y(e.text)}</textarea>
      </div>`;const a=Ot(t.a);return`<div class="opts" data-multi="${a.length>1}">${t.opts.map((s,o)=>{let r="";return e.submitted?a.includes(o)?r="correct":e.picked.includes(o)?r="wrong":r="muted":e.picked.includes(o)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${o}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+o)}</span>
        <span class="opt-text">${R(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function rr(t,e){if(!e.submitted)return"";const a=z(t)?String(t.a):W(t.a,t.opts),n=z(t)?N(e.text)||"（空）":W(e.picked.length?e.picked:[],t.opts)||"（未选）";if(z(t)){const o=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${E?.busy?"disabled":""}>✦ AI 阅卷</button>
          <button class="btn btn-sm" data-act="mark" data-ok="1">我答对了</button>
          <button class="btn btn-sm" data-act="mark" data-ok="0">没答对</button>
        </div>`:`<div class="essay-actions"><span class="tag ${e.correct?"tag-ok":"tag-bad"}">${e.correct?"已标记：答对":"已标记：答错"}</span></div>`;return`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${y(a)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${y(n)}
      <div class="divider"></div>
      ${o}
    </div>`}const s=(t.explain??"").trim();return`<div class="answer-panel">
    <div class="ai-title">${e.correct?"✅ 回答正确":"❌ 回答错误"}</div>
    正确答案：${y(W(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${y(n)}`}
    ${s?`<div class="divider"></div><div class="ai-title" style="color:var(--text-3)">解析</div><div class="explain-body">${R(s)}</div>`:""}
  </div>`}function or(){const t=E,e=Et();if(!e)return"";const a=Zt(e),n=t.options.questions.length,s=n?Math.round((t.idx+(a.submitted?1:0))/n*100):0,o=!z(e)&&Ot(e.a).length>1;return`
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
          ${e.subject?`<span class="tag tag-accent">${y(e.subject)}</span>`:""}
          ${e.chapter?`<span class="tag">${y(e.chapter)}</span>`:""}
          <span class="grow"></span>
          <span>${$t[K(e)]}</span>
        </div>
        <div class="q-text">${R(e.q)}</div>
        ${sr(e,a)}
        ${rr(e,a)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${Jt(e.id)}" aria-label="收藏">${Jt(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!Le()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${a.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===n-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${o||z(e)?"提交答案":"查看答案"}</button>`}
    </div>`}function ir(t,e){E={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},F(),Nt=a=>{const n=E;if(!n)return;const s=a.target,o=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(a.key==="Escape"){if(document.querySelector(".modal-layer"))return;Pe();return}if(o)return;const r=Et();if(!r)return;const i=Zt(r);if(a.key===" "||a.key==="Enter"){const d=n.root?.querySelector('[data-act="submit"]'),u=n.root?.querySelector('[data-act="next"]');d?(a.preventDefault(),X("submit",d)):u&&(a.preventDefault(),X("next",u));return}if(a.key==="ArrowRight"){a.preventDefault(),i.submitted?Oe():X("submit",n.root.querySelector('[data-act="submit"]'));return}if(a.key==="ArrowLeft"){a.preventDefault(),X("prev",n.root);return}const c=a.key.toLowerCase();if(/^[1-9]$/.test(c)||/^[a-h]$/.test(c)){const d=/^[1-9]$/.test(c)?Number(c)-1:c.charCodeAt(0)-97;if(d<r.opts.length){a.preventDefault();const u=n.root?.querySelector(`.opt[data-idx="${d}"]`);u&&X("pick",u)}return}c==="s"?X("fav",n.root):c==="n"?X("note",n.root):c==="e"?X("ai",n.root):c==="g"?X("ai-grade",n.root):c==="?"&&Qs(()=>Promise.resolve().then(()=>Pr),void 0).then(d=>d.openShortcuts())},document.addEventListener("keydown",Nt),t.addEventListener("submit",a=>a.preventDefault()),t.addEventListener("input",Ga)}function F(){const t=E;t?.root&&(t.root.innerHTML=or())}function Ga(t){const e=t.target;e?.dataset.role!=="essay"||!E||(E.textDraft=e.value)}async function le(t,e){const a=E;e.submitted=!0;const n=K(t);if(as(n))if(n==="blank"){const s=o=>String(o).replace(/[\s，。、；：""''（）()【】\[\]]/g,"").toLowerCase();e.correct=s(e.text??"")!==""&&s(e.text??"")===s(String(t.a??""))}else e.correct=null;else if(e.correct=xa(e.picked,t.a),e.correct){Vt(10);const s=cr();s>=3&&s%3===0&&g.ok(`连对 ${s} 题，保持住`)}else Vt([14,40,14]),De(t,e);$e(t,e),F(),e.correct&&a.options.questions.length>a.idx+1&&(await Ba(600),E&&E.idx===a.idx&&Oe())}function $e(t,e){if(!e.submitted||e.correct===null||e.correct===void 0)return;const a=e;a.counted||(a.counted=!0,tr(K(t),e.correct===!0))}function cr(){const t=E;let e=0;for(let a=t.idx;a>=0;a-=1){const n=t.records.get(t.options.questions[a].id);if(n?.submitted)if(n.correct===!0)e+=1;else break}return e}async function De(t,e){try{await M.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(a){a instanceof T&&a.status!==401&&g.error(`错题保存失败：${a.message}`)}}function Oe(){const t=E,e=t.options.questions.length;if(t.idx>=e-1){lr();return}t.idx+=1,t.textDraft="",F(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function Re(){Nt&&document.removeEventListener("keydown",Nt),Nt=null,E?.root?.removeEventListener("input",Ga),E?.root?.replaceChildren(),E=null}async function Pe(){const t=E;if(!t)return;const e=Ka();if(!await dt({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;Et()&&Ja();const s=t.options.onExit;Re(),s?.()}function Ja(){const t=E;if(!t)return;t.options.source==="sequential"&&Nn(t.idx);const e=t.options.questions.slice(0,5).map(a=>N(a.q).slice(0,40));Dn(e)}async function lr(){const t=E;Ja();const e=t.options.questions.length,a=Ka(),n=nr(),s=a-n,o=a?Math.round(n/a*100):0;if(Re(),await C({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${n}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${a}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:i=>{const c=i.querySelector('[data-role="acc"]');c&&Ys(c,o)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function dr(t,e,a){e.correct=a,e.submitted=!0,$e(t,e),$e(t,e),a?Vt(10):De(t,e),F(),a&&g.ok("已记为答对")}async function ur(t,e){const a=E;if(a){a.busy=!0,F();try{const n=[`题目：${N(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${N(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await M.ai.grade(n),o=String(s.result||""),r=o.includes("得分")&&!o.includes("不得分");e.correct=r,r?Vt(10):De(t,e),g.ok(r?"AI 阅卷：答对":"AI 阅卷：答错")}catch(n){g.error(n instanceof T?n.message:"AI 阅卷失败，请稍后再试")}finally{a.busy=!1,F()}}}async function pr(){const t=Et();if(!t)return;const e=Le()[String(t.id)]??"",a=document.createElement("div");a.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${y(e)}</textarea>`;const n=a.querySelector("textarea");await C({title:"我的笔记",body:a,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>n.focus()})&&(Cn(t.id,n.value),g.ok("笔记已保存"),F())}async function fr(){const t=Et();if(!t)return;const e=Zt(t),a=[`题目：${N(t.q)}`,t.opts.length?`选项：${t.opts.map((r,i)=>`${String.fromCharCode(65+i)}. ${N(r)}`).join("；")}`:"",`正确答案：${z(t)?t.a:W(t.a,t.opts)}`,e.submitted?`我的作答：${z(t)?e.text:W(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),n=document.createElement("div");n.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',C({title:"AI 深度解析",body:n,actions:[{label:"关闭",value:"close"}]});const s=n.querySelector('[data-role="text"]'),o=n.querySelector(".ai-title");try{let r="";const i=await M.ai.explainStream(a,d=>{r+=d,s.innerHTML=`${y(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),c=i.provider==="deepseek"?"DeepSeek":i.provider==="zhipu"?"智谱":"";o.textContent=r?`✦ AI 解析${c?` · ${c}`:""}${i.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=y(i.text||r).replace(/\n/g,"<br>"):await mr(s,i.text??""),s.classList.remove("cursor")}catch(r){const i=r instanceof T?r.message:"AI 解析失败，请稍后重试";g.error(i),o.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=i}}async function mr(t,e){for(let a=0;a<e.length;a+=2)t.innerHTML=y(e.slice(0,a+2)).replace(/\n/g,"<br>"),await Ba(12)}function gr(){const t=E;if(!t)return;const e=t.options.questions.map((a,n)=>{const s=t.records.get(a.id),o=n===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${n}" data-state="${o}">${n+1}</button>`}).join("");C({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:a=>{a.querySelectorAll(".nav-cell").forEach(n=>{n.addEventListener("click",()=>{const s=Number(n.dataset.idx);!Number.isFinite(s)||!E||(E.idx=s,E.textDraft="",Yt(),F())})})}}).then(a=>{a==="finish"&&Pe()})}async function X(t,e){const a=E;if(!a)return!1;const n=Et();if(!n)return!1;const s=Zt(n);switch(t){case"pick":{if(s.submitted)return!0;const o=Number(e.dataset.idx);return z(n)||(Ot(n.a).length>1?(s.picked=s.picked.includes(o)?s.picked.filter(i=>i!==o):[...s.picked,o],F()):(s.picked=[o],await le(n,s))),!0}case"submit":{if(z(n)){const o=a.root?.querySelector('[data-role="essay"]');if(s.text=o?.value??a.textDraft,!s.text.trim())return g.info("先写点什么再提交吧"),!0;await le(n,s)}else{if(!s.picked.length)return g.info("请先选择答案"),!0;await le(n,s)}return!0}case"ai-grade":return!z(n)||E?.busy||await ur(n,s),!0;case"mark":return z(n)&&dr(n,s,e.dataset.ok==="1"),!0;case"next":return Oe(),!0;case"prev":return a.idx>0&&(a.idx-=1,a.textDraft="",F()),!0;case"jump":return a.idx=Number(e.dataset.idx),a.textDraft="",Yt(),F(),!0;case"nav":return gr(),!0;case"exit":return await Pe(),!0;case"fav":return await Vn(n.id),F(),!0;case"note":return await pr(),!0;case"ai":return fr(),!0;default:return!1}}let tt=null;function br(){return!!(tt&&document.body.contains(tt))}function ht(t){if(!t.questions.length){g.info("这里还没有题目");return}fa(),tt=document.createElement("div"),tt.className="quiz",document.body.appendChild(tt),document.body.classList.add("is-locked"),ir(tt,{...t,onExit:()=>{fa(),t.onExit?.()}}),_n({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function fa(){tt&&(Re(),tt.remove(),tt=null,document.body.classList.remove("is-locked"))}async function de(t="random"){const e=f.bank??[];if(!e.length){g.info("题库还是空的，先去添加题目吧");return}const a=await Xa(e);if(a===null)return;const n=a?e.filter(o=>(o.subject?.trim()||"默认题库")===a):e;if(t==="chapter"){const o=await $r(n);if(!o?.length)return;const r=n.filter(c=>o.includes(c.chapter||"未分类")),i=await Xt(r.length);if(i===null)return;ht({questions:r.slice(0,i),source:"chapter",title:"章节练习"});return}const s=await Xt(n.length);if(s!==null){if(t==="sequential"){const o=Math.min(Ea(),Math.max(n.length-1,0));ht({questions:n.slice(0,s),source:"sequential",title:"顺序练习",startIndex:o<s?o:0});return}ht({questions:xe(n).slice(0,s),source:"all",title:"随机练习"})}}async function hr(){const t=f.bank??[];if(!t.length){g.info("题库还是空的，先去添加题目吧");return}const e=await Xa(t);if(e===null)return;const a=e?t.filter(n=>(n.subject?.trim()||"默认题库")===e):t;ht({questions:xe(a),source:"all",title:`乱序练习 · ${a.length} 题${e?` · ${e}`:""}`})}async function Va(){const t=f.wrong??await vt(!0);if(!t.length){g.info("错题本是空的，先去刷几题吧");return}const e=await Xt(t.length);if(e===null)return;const a=t.slice(0,e).map(n=>({id:n.id,q:n.q,opts:n.opts,a:n.a,chapter:n.chapter,subject:n.subject}));ht({questions:a,source:"wrong",title:"错题重练"})}function vr(t){if(!t.length){g.info("还没有收藏题目");return}Xt(t.length).then(e=>{e!==null&&ht({questions:xe(t).slice(0,e),source:"fav",title:"收藏练习"})})}function yr(){const t=ja(),e=f.bank??[];if(!t||!e.length)return g.info("没有可以继续的练习"),!1;const a=new Map(e.map(s=>[s.id,s])),n=t.ids.map(s=>a.get(s)).filter(s=>!!s);return n.length?(ht({questions:n,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,n.length-1)}),!0):(La(),g.info("上次的题目已经不在了"),!1)}function Xt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const a=document.createElement("div");a.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const n=a.querySelector('[data-role="count"]');return n.addEventListener("click",s=>{const o=s.target.closest("button[data-n]");o&&(n.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),o.setAttribute("aria-pressed","true"))}),C({title:"练多少题",body:a,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const o=n.querySelector('button[aria-pressed="true"]');return Number(o?.dataset.n??t)})}async function $r(t){const e=new Map;t.forEach(r=>{const i=r.chapter?.trim()||"未分类";e.set(i,(e.get(i)??0)+1)});const a=[...e.entries()].sort((r,i)=>i[1]-r[1]);if(!a.length)return null;const n=document.createElement("div");if(n.innerHTML=`<div class="list">${a.map(([r,i],c)=>`
      <button class="item" data-chapter="${y(r)}" data-checked="${c===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${y(r)}</span><span class="tag">${i} 题</span></div>
      </button>`).join("")}</div>`,n.addEventListener("click",r=>{const i=r.target.closest("[data-chapter]");i&&(i.dataset.checked=i.dataset.checked==="true"?"false":"true")}),!await C({title:"选择章节",body:n,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const o=Array.from(n.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return o.length?o:null}async function Xa(t){const e=new Map;t.forEach(i=>{const c=i.subject?.trim()||"默认题库";e.set(c,(e.get(c)??0)+1)});const a=[...e.entries()].sort((i,c)=>c[1]-i[1]);if(a.length<2)return"";const n=document.createElement("div");n.innerHTML=`
    <div class="chip-row" data-role="subject">
      <button type="button" class="chip is-on" data-sub="" aria-pressed="true">全部 · ${t.length}</button>
      ${a.map(([i,c])=>`<button type="button" class="chip" data-sub="${y(i)}" aria-pressed="false">${y(i)} · ${c}</button>`).join("")}
    </div>
    <p class="muted small" style="margin:12px 0 0">选科目后只会练这个科目下的题</p>`;const s=n.querySelector('[data-role="subject"]');return s.addEventListener("click",i=>{const c=i.target.closest("button[data-sub]");c&&(s.querySelectorAll("button").forEach(d=>{d.classList.remove("is-on"),d.setAttribute("aria-pressed","false")}),c.classList.add("is-on"),c.setAttribute("aria-pressed","true"))}),await C({title:"练哪个科目",body:n,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]})?s.querySelector("button.is-on")?.dataset.sub??"":null}const bt=new Set;function wr(){bt.clear()}function we(){return f.favs??[]}function xr(){const t=we(),e=f.loading.fav&&!f.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(a=>`
        <div class="item" data-id="${a.id}">
          <div class="item-q">${R(a.q)}</div>
          <div class="item-meta">
            ${a.subject?`<span class="tag tag-accent">${y(a.subject)}</span>`:""}
            ${a.chapter?`<span class="tag">${y(a.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${a.id}">${bt.has(a.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${a.id}">取消收藏</button>
          </div>
          ${bt.has(a.id)?`<div class="item-answer"><div class="right">${y(W(a.a,a.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function kr(){await It()}async function Sr(t,e){switch(t){case"practice":return we().length?(await vr(we()),!0):(g.info("还没有收藏的题"),!0);case"reveal":{const a=Number(e.dataset.id);return bt.has(a)?bt.delete(a):bt.add(a),!0}case"remove":{const a=Number(e.dataset.id);try{await M.favorites.remove(a),bt.delete(a),Q("fav"),await It(!0),g.ok("已取消收藏")}catch(n){g.error(n instanceof T?n.message:"操作失败")}return!0}default:return!1}}let O=null,At=null,_t=null;const Ar=t=>String.fromCharCode(65+t),Er=t=>typeof t.a=="number"||Array.isArray(t.a);function Qa(t){const e=Math.max(0,Math.round(t/1e3)),a=Math.floor(e/60),n=e%60;return`${String(a).padStart(2,"0")}:${String(n).padStart(2,"0")}`}async function jr(){const t=(f.bank??[]).filter(Er);if(t.length<3){g.error("题库里的客观题不足 3 道，先导入或手写几道再考");return}const e=document.createElement("div");if(e.innerHTML=`
    <div class="row" style="gap:10px;align-items:flex-end">
      <label class="field grow">
        <span class="field-label">题量</span>
        <input class="input" data-role="count" type="number" min="3" max="${t.length}" value="${Math.min(20,t.length)}">
      </label>
      <label class="field grow">
        <span class="field-label">时长 / 分钟</span>
        <input class="input" data-role="min" type="number" min="1" max="180" value="15">
      </label>
    </div>
    <p class="muted small" style="margin:12px 0 0">可选 ${t.length} 道客观题；考试中不显示对错。</p>`,!await C({title:"模拟考试",body:e,actions:[{label:"取消",value:!1},{label:"开始考试",value:!0,variant:"primary"}]}))return;const n=(i,c)=>{const d=e.querySelector(`[data-role="${i}"]`),u=Number(d?.value);return Number.isFinite(u)&&u>0?u:c},s=Math.min(t.length,n("count",Math.min(20,t.length))),o=Math.min(180,n("min",15));O={questions:[...t].sort(()=>Math.random()-.5).slice(0,s),picks:new Map,idx:0,endsAt:Date.now()+o*60*1e3,timer:window.setInterval(Mr,1e3),submitted:!1},Lr()}function Lr(){const t=document.getElementById("app-root")??document.body,e=document.createElement("div");e.className="exam",t.appendChild(e),At=e,te(),_t=a=>{if(!(!O||document.querySelector(".modal-layer"))){if(a.key==="ArrowRight")a.preventDefault(),Qt(1);else if(a.key==="ArrowLeft")a.preventDefault(),Qt(-1);else if(/^[a-h1-8]$/i.test(a.key)){const n=/^\d$/.test(a.key)?Number(a.key)-1:a.key.toLowerCase().charCodeAt(0)-97;Ya(n)}}},document.addEventListener("keydown",_t)}function Mr(){const t=O;if(!t||t.submitted)return;if(Date.now()>=t.endsAt){He(!0);return}const e=At?.querySelector(".exam-clock");if(e){const a=t.endsAt-Date.now();e.textContent=Qa(a),e.classList.toggle("is-urgent",a<=6e4)}}function te(){const t=O;if(!t||!At)return;const e=t.questions[t.idx],a=t.picks.get(e.id)??[],n=t.endsAt-Date.now(),s=t.questions.filter(r=>(t.picks.get(r.id)??[]).length>0).length,o=Array.isArray(e.a)&&e.a.length>1;At.innerHTML=`
    <div class="exam-bar">
      <button class="icon-btn" data-ex="exit" aria-label="退出">←</button>
      <div class="exam-progress">${t.idx+1} / ${t.questions.length} · 已答 ${s}</div>
      <span class="exam-clock ${n<=6e4?"is-urgent":""}">${Qa(n)}</span>
      <button class="icon-btn" data-ex="sheet" aria-label="答题卡">▦</button>
    </div>
    <div class="exam-body">
      <article class="q-card">
        <div class="q-head">
          <div class="q-tags">
            ${e.chapter?`<span class="tag">${e.chapter}</span>`:""}
            ${e.subject&&e.subject!=="默认题库"?`<span class="tag">${e.subject}</span>`:""}
          </div>
          <span class="muted small">${o?"多选":"单选"}</span>
        </div>
        <div class="q-text">${R(e.q)}</div>
        <div class="opts">
          ${e.opts.map((r,i)=>`<button class="opt ${a.includes(i)?"is-picked":""}" data-ex="pick" data-idx="${i}">
                <span class="opt-key">${Ar(i)}</span>
                <span class="opt-text">${R(String(r).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
              </button>`).join("")}
        </div>
      </article>
    </div>
    <div class="exam-foot">
      <button class="btn" data-ex="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${t.idx===t.questions.length-1?"":'<button class="btn" data-ex="next">下一题</button>'}
      <button class="btn btn-primary" data-ex="submit">交卷</button>
    </div>`}function Ya(t){const e=O;if(!e)return;const a=e.questions[e.idx];if(t<0||t>=a.opts.length)return;const n=Array.isArray(a.a)&&a.a.length>1,s=e.picks.get(a.id)??[];n?e.picks.set(a.id,s.includes(t)?s.filter(o=>o!==t):[...s,t]):e.picks.set(a.id,[t]),te()}function Qt(t){const e=O;if(!e)return;const a=e.idx+t;a<0||a>=e.questions.length||(e.idx=a,te())}function Tr(){const t=O;if(!t)return;const e=document.createElement("div");e.className="nav-grid",e.innerHTML=t.questions.map((a,n)=>`<button class="nav-cell ${(t.picks.get(a.id)??[]).length>0?"is-done":""} ${n===t.idx?"is-cur":""}" data-idx="${n}">${n+1}</button>`).join(""),e.addEventListener("click",a=>{const n=a.target.closest(".nav-cell");if(!n||!O)return;const s=Number(n.dataset.idx);Number.isFinite(s)&&(O.idx=s,document.querySelector(".modal-layer")?.remove(),te())}),C({title:"答题卡",body:e,actions:[{label:"继续答题",value:"close"},{label:"交卷",value:"submit",variant:"primary"}]}).then(a=>{a==="submit"&&He(!1)})}async function He(t){const e=O;if(!e||e.submitted)return;const a=e.questions.filter(i=>(e.picks.get(i.id)??[]).length===0).length;if(!t&&a>0&&!await dt({title:"还有题没答",message:`还有 ${a} 道没答，确定交卷？`,okText:"交卷"}))return;e.submitted=!0,window.clearInterval(e.timer);let n=0;const s=[];for(const i of e.questions){const c=e.picks.get(i.id)??[];c.length&&xa(c,i.a)?n+=1:s.push(i)}const o=Math.round(n/e.questions.length*100);for(const i of s)M.wrong.add({q:i.q,opts:i.opts,a:i.a,chapter:i.chapter,subject:i.subject,explain:i.explain,user_choice:e.picks.get(i.id)??[]}).catch(()=>{});const r=document.createElement("div");r.className="exam-result",r.innerHTML=`
    <div class="score-big">${o}<span>分</span></div>
    <div class="score-sub">答对 ${n} / ${e.questions.length} · ${t?"时间到自动交卷":"手动交卷"}</div>
    ${s.length?`<div class="wrong-list">${s.slice(0,8).map(i=>`<div class="wrong-item">
                <div class="wrong-q">${R(i.q)}</div>
                <div class="wrong-a">
                  <b class="bad">你选 ${W(e.picks.get(i.id)??[],i.opts)||"未答"}</b>
                  <span class="ok">正确 ${W(i.a,i.opts)}</span>
                </div>
              </div>`).join("")}${s.length>8?`<div class="muted small">…还有 ${s.length-8} 道已进错题本</div>`:""}</div>`:'<div class="all-right">全对，厉害</div>'}`,await C({title:"考试结果",body:r,actions:[{label:"知道了",value:"close",variant:"primary"}]}),Za()}function Za(){O&&window.clearInterval(O.timer),O=null,_t&&document.removeEventListener("keydown",_t),_t=null,At?.remove(),At=null}function tn(t,e){if(!O)return!1;switch(t){case"pick":return Ya(Number(e.dataset.idx)),!0;case"prev":return Qt(-1),!0;case"next":return Qt(1),!0;case"sheet":return Tr(),!0;case"submit":return He(!1),!0;case"exit":return(async()=>await dt({title:"退出考试",message:"退出后本次作答不保留，确定吗？",danger:!0,okText:"退出"})&&Za())(),!0;default:return!1}}function en(){return!!O}function qr(){const t=new Date,e=n=>String(n).padStart(2,"0"),a="日一二三四五六"[t.getDay()];return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())} · 周${a}`}const ma=t=>String(t).padStart(2,"0");function Cr(){const t=f.bank,e=f.wrong,a=f.favs,n=ja(),s=Ea(),o=!!(t&&!t.length),r=u=>u===void 0?"—":ma(u),i=Wa(),c=i.today.n,d=i.today.n?`${Math.round(i.today.rate*100)}%`:"—";return`
    <section class="masthead">
      <div class="mast-meta">
        <span>${qr()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${f.user?`@${y(f.user)}`:"未登录"}</span>
      </div>
      <div class="today">
        <div class="today-head">
          <span class="today-num">${ma(c)}</span>
          <span class="today-unit">题 · 今日已练</span>
          <span class="today-side">${i.today.n?`正确率 <b>${d}</b>${i.streak>1?` · 连练 <b>${i.streak}</b> 天`:""}`:"今天还没开始"}</span>
        </div>
      </div>
      <div class="stat-strip">
        <button class="stat" data-act="goto" data-tab="bank">
          <span class="stat-num">${r(t?.length)}</span><span class="stat-label">题库</span>
        </button>
        <button class="stat" data-act="goto" data-tab="wrong">
          <span class="stat-num">${r(e?.length)}</span><span class="stat-label">错题</span>
        </button>
        <button class="stat" data-act="goto" data-tab="fav">
          <span class="stat-num">${r(a?.length)}</span><span class="stat-label">收藏</span>
        </button>
      </div>
    </section>

    <div class="primary-row">
      ${o?`<button class="cta cta-compact" data-act="goto" data-tab="bank">
               <span class="cta-kicker">EMPTY / 题库为空</span>
               <span class="cta-title">先导入题库</span>
               <span class="cta-arrow" aria-hidden="true">→</span>
             </button>`:`<button class="cta cta-compact" data-act="random" ${t?"":"disabled"}>
               <span class="cta-kicker">START / 随机抽题</span>
               <span class="cta-title">开始练习</span>
               <span class="cta-arrow" aria-hidden="true">→</span>
             </button>`}
      <button class="ghost-card" data-act="exam" ${o?"disabled":""}>
        <span class="ghost-kicker">MOCK EXAM</span>
        <span class="ghost-title">模拟考试</span>
        <span class="ghost-arrow" aria-hidden="true">→</span>
      </button>
    </div>

    <div class="tile-grid tile-grid-sm">
      <button class="tile tile-sm" data-act="sequential" ${o?"disabled":""}>
        <span class="tile-idx">01</span>
        <span class="tile-name">顺序练习</span>
        <span class="tile-desc">${o?"题库为空":s>0?`停在第 ${s+1} 题`:"按顺序推进"}</span>
      </button>
      <button class="tile tile-sm" data-act="shuffle" ${o?"disabled":""}>
        <span class="tile-idx">02</span>
        <span class="tile-name">乱序练习</span>
        <span class="tile-desc">${o?"题库为空":`打乱全部 ${t?.length??0} 题`}</span>
      </button>
      <button class="tile tile-sm" data-act="wrong" ${e&&!e.length?"disabled":""}>
        <span class="tile-idx">03</span>
        <span class="tile-name">错题重练</span>
        <span class="tile-desc">${e?`${e.length} 道待消灭`:"暂无错题"}</span>
      </button>
      ${n?`<button class="tile tile-sm tile-accent" data-act="resume">
               <span class="tile-idx">04</span>
               <span class="tile-name">继续上次</span>
               <span class="tile-desc">${n.ids.length} 题 · 第 ${n.idx+1} 题</span>
             </button>`:`<button class="tile tile-sm" data-act="goto" data-tab="bank">
               <span class="tile-idx">04</span>
               <span class="tile-name">题库管理</span>
               <span class="tile-desc">导入 / 编辑</span>
             </button>`}
    </div>`}async function Nr(){Rn()||(Pn(),window.setTimeout(()=>g.info(Xn()),320)),await Promise.allSettled([lt(),vt(),It()])}async function _r(t,e){switch(t){case"goto":return Rt(e.dataset.tab??"bank"),!0;case"random":return await de("random"),!0;case"sequential":return await de("sequential"),!0;case"shuffle":return await hr(),!0;case"chapter":return await de("chapter"),!0;case"wrong":return await Va(),!0;case"resume":return yr(),!0;case"exam":return await jr(),!0;default:return!1}}const ue=8;function Ir(){const t=[],e=(a,n,s)=>{(a??[]).forEach(o=>t.push({id:o.id,q:o,source:n,tab:s}))};return e(f.bank,"题库","bank"),e(f.wrong,"错题","wrong"),e(f.favs,"收藏","fav"),t}function Dr(t,e){const a=e.toLowerCase();return a?N(t.q.q).toLowerCase().includes(a)||(t.q.opts??[]).some(n=>N(n).toLowerCase().includes(a))||N(t.q.chapter??"").toLowerCase().includes(a)||N(t.q.subject??"").toLowerCase().includes(a):!0}function ga(t=""){const e=document.createElement("div");e.className="search-panel",e.innerHTML=`
    <div class="search-box">
      <span class="ico">⌕</span>
      <input class="search-input" type="search" data-role="kw" placeholder="搜题干、选项、章节、题库…" value="${t.replace(/"/g,"&quot;")}">
    </div>
    <div class="search-results" data-role="hits"></div>
    <p class="muted small search-foot" data-role="foot"></p>`;const a=Ir(),n=e.querySelector('[data-role="hits"]'),s=e.querySelector('[data-role="foot"]'),o=e.querySelector('[data-role="kw"]'),r=()=>{const i=o.value.trim(),c=a.filter(p=>Dr(p,i));if(!i){const p=c.filter(l=>l.tab==="bank").slice(0,12);n.innerHTML=p.length?p.map(l=>`<button class="hit" data-act="open" data-tab="${l.tab}" data-id="${l.id}">
                <span class="hit-src">${l.source}</span>
                <span class="hit-q">${R(l.q.q)}</span>
              </button>`).join(""):'<p class="muted small">题库还是空的，先去导入吧。</p>',s.textContent=p.length?"输入关键词可以跨题库 / 错题 / 收藏一起搜":"";return}const d=p=>c.filter(l=>l.source===p),u=[];["题库","错题","收藏"].forEach(p=>{const l=d(p);l.length&&(u.push(`<div class="hit-group">${p} · ${l.length}</div>`),u.push(l.slice(0,ue).map(m=>{const b=K(m.q);return`<button class="hit" data-act="open" data-tab="${m.tab}" data-id="${m.id}">
              <span class="hit-src">${$t[b]}</span>
              <span class="hit-q">${_a(R(m.q.q),i)}</span>
            </button>`}).join("")),l.length>ue&&u.push(`<div class="hit-more muted small">还有 ${l.length-ue} 条，缩小关键词试试</div>`))}),n.innerHTML=u.length?u.join(""):`<p class="muted small">没有找到「${i}」</p>`,s.textContent=`共命中 ${c.length} 条`};o.addEventListener("input",r),C({title:"全局搜索",body:e,actions:[{label:"关闭",value:"close"}],onMount:i=>{r();const c=i.querySelector('[data-role="kw"]');c?.focus(),c?.setSelectionRange(c.value.length,c.value.length),i.addEventListener("click",d=>{const u=d.target.closest(".hit");if(!u)return;const p=u.dataset.tab??"bank",l=Number(u.dataset.id),m=a.find(b=>b.id===l&&b.tab===p);if(Yt(),Rt(p),m){const b=N(m.q.q).slice(0,12);if(p==="bank"){const k=document.querySelector('.view input[data-role="search"]');k&&b&&(k.value=b,k.dispatchEvent(new Event("input",{bubbles:!0})))}}})}})}const Be=[{keys:"1–4 / A–D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1–5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/ 或 Ctrl+K",desc:"全局搜索（题库 / 错题 / 收藏）",scope:"全局"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function Ue(){const t=Be.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");C({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const Or=["home","bank","wrong","fav","me"];function Rr(t){const e=t;if(!e)return!1;const a=e.tagName.toLowerCase();return a==="input"||a==="textarea"||a==="select"||e.isContentEditable}function an(){document.addEventListener("keydown",t=>{if((t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"){if(document.querySelector(".quiz"))return;t.preventDefault(),ga();return}if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||Rr(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),Ue();return}if(t.key==="/"){t.preventDefault(),ga();return}const a=Number(t.key);a>=1&&a<=5&&(t.preventDefault(),Rt(Or[a-1]))})}const Pr=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:Be,installShortcuts:an,openShortcuts:Ue},Symbol.toStringTag,{value:"Module"})),Hr=`<svg viewBox="0 0 100 100" width="30" height="30" aria-hidden="true" focusable="false">
  <rect x="18.5" y="18.5" width="63" height="63" fill="none" stroke="currentColor" stroke-width="4.2" />
  <circle cx="50" cy="50" r="10" fill="currentColor" />
</svg>`,Br="2.0.0";function Ur(){const t=f.bank?.length??0,e=f.wrong?.length??0,a=f.favs?.length??0,n=Be.map(s=>`<div class="kbd-row">
      <kbd class="kbd">${s.keys}</kbd>
      <span class="kbd-desc">${s.desc}</span>
      <span class="kbd-scope">${s.scope}</span>
    </div>`).join("");C({body:`<div class="about">
      <div class="about-head">
        <span class="about-mark">${Hr}</span>
        <span class="about-txt">
          <span class="about-name">基准</span>
          <span class="about-latin">DATUM</span>
        </span>
        <span class="about-ver">v${Br}</span>
      </div>

      <p class="about-line">多科目刷题、错题本、收藏夹。数据存在你自己的 Cloudflare D1，别人看不到。</p>

      <div class="about-stats">
        <div class="about-stat"><b>${t}</b><span>题库</span></div>
        <div class="about-stat"><b>${e}</b><span>错题</span></div>
        <div class="about-stat"><b>${a}</b><span>收藏</span></div>
      </div>

      <div class="about-sec">键盘快捷键</div>
      <div class="kbd-list">${n}</div>

      <p class="about-foot">本地优先 · 可离线打开 · AI 解析与出题由 DeepSeek 提供</p>
    </div>`,actions:[{label:"关闭",value:"ok",variant:"primary"}]})}const zr=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],Fr=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function ba(t,e,a){return`<div class="segmented">${t.map(n=>`<button class="seg" data-act="${a}" data-value="${n.value}" aria-pressed="${String(n.value)===String(e)}">${n.label}</button>`).join("")}</div>`}function ha(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),URL.revokeObjectURL(n)}async function Wr(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await C({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const a=t.querySelector('[data-role="old"]').value,n=t.querySelector('[data-role="next"]').value;if(n.length<6){g.error("新密码至少 6 位");return}try{await M.auth.change(a,n),g.ok("密码已更新")}catch(s){g.error(s instanceof T?s.message:"修改失败")}}function Kr(){const t=f.user,e=y((t||"?").slice(0,1).toUpperCase()),a=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})(),n=Wa(),s=r=>r>0?`${Math.round(r*100)}%`:"—",o=Math.max(1,...n.days7.map(r=>r.n));return`
    <div class="profile">
      <div class="profile-avatar">${e}</div>
      <div class="profile-body">
        <div class="profile-name">${y(t)}</div>
        <div class="profile-desc">${f.bank?.length??0} 道题 · ${f.wrong?.length??0} 道错题 · ${f.favs?.length??0} 条收藏</div>
      </div>
    </div>

    <div class="section-title">练习记录</div>
    <div class="card card-pad">
      <div class="stat-grid">
        <div class="stat-cell">
          <span class="stat-big">${n.today.n}</span>
          <span class="stat-cap">今日答题</span>
        </div>
        <div class="stat-cell">
          <span class="stat-big">${n.total}</span>
          <span class="stat-cap">累计答题</span>
        </div>
        <div class="stat-cell">
          <span class="stat-big">${s(n.rate)}</span>
          <span class="stat-cap">总正确率</span>
        </div>
      </div>

      ${n.byType.length?`<div class="type-stats">${n.byType.map(r=>`
            <div class="type-row">
              <span class="type-name">${$t[r.type]}</span>
              <span class="type-bar"><i style="width:${Math.round(r.rate*100)}%"></i></span>
              <span class="type-val">${r.ok}/${r.n}</span>
            </div>`).join("")}</div>`:'<p class="muted small" style="margin:10px 0 0">还没有练习记录，去刷几题吧</p>'}

      ${n.days7.length?`<div class="days">${n.days7.map(r=>`<div class="day"><i style="height:${Math.max(6,Math.round(r.n/o*46))}px"></i><span>${r.label}</span></div>`).join("")}</div>`:""}

      <div class="row between" style="margin-top:14px">
        <span class="muted small">只统计本机练习；换设备不同步</span>
        <button class="btn btn-sm btn-ghost" data-act="clear-stats">清空记录</button>
      </div>
    </div>

    <div class="section-title">外观</div>

    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">主题</div><div class="setting-desc">深色模式也会跟随系统自动切换</div></div>
      </div>
      ${ba(zr,P.theme,"theme")}
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景色</div><div class="setting-desc">给首页换个心情</div></div>
        <input class="color-input" type="color" value="${y(a.color||"#f4f5f7")}" data-act="pick-color" aria-label="背景色">
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
      <button class="btn btn-ghost btn-block" data-act="about">关于基准与快捷键</button>
    </div>

    <div class="section-title">练习</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">答对后自动跳题</div><div class="setting-desc">答对稍作停留就去下一题</div></div>
      </div>
      ${ba(Fr,P.autoDelay,"delay")}
      <div class="divider"></div>
      <label class="setting-row">
        <div><div class="setting-title">答题震动</div><div class="setting-desc">答对答错给一点反馈</div></div>
        <span class="switch" role="switch" data-act="toggle-vibration" aria-checked="${P.vibration}"><i></i></span>
      </label>
      <label class="setting-row">
        <div><div class="setting-title">连对鼓励</div><div class="setting-desc">连续答对时来点掌声</div></div>
        <span class="switch" role="switch" data-act="toggle-streak" aria-checked="${P.streakAlert}"><i></i></span>
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

    <p class="muted small" style="text-align:center;margin:22px 0 6px">DATUM v2.0.0</p>
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function Gr(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){g.error("图片太大了（最多 8MB）");return}try{const a=await Jr(e);Tt({image:a,color:""}),g.ok("背景已更新"),I("render")}catch{g.error("这张图片读不出来，换一张试试")}}},t.click()}function Jr(t){return new Promise((e,a)=>{const n=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(n);const o=Math.min(1,1600/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*o),r.height=Math.round(s.height*o);const i=r.getContext("2d");if(!i){a(new Error("canvas unavailable"));return}i.drawImage(s,0,0,r.width,r.height),e(r.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(n),a(new Error("image load failed"))},s.src=n})}function Vr(){qe()}async function Xr(t,e){switch(t){case"theme":return zn(e.dataset.value),I("render"),!0;case"delay":return Ft({autoDelay:Number(e.dataset.value)}),I("render"),!0;case"toggle-vibration":return Ft({vibration:!P.vibration}),I("render"),!0;case"toggle-streak":return Ft({streakAlert:!P.streakAlert}),I("render"),!0;case"pick-color":return Tt({color:e.value,image:""}),!0;case"pick-bg":return await Gr(),!0;case"clear-bg":return Tt({image:""}),I("render"),!0;case"dim":return Tt({dim:Number(e.value)}),!0;case"shortcuts":return Ue(),!0;case"about":return Ur(),!0;case"clear-stats":return await dt({title:"清空练习记录",message:"本机的答题统计会被清除，题库不受影响。",okText:"清空",danger:!0})&&(ar(),I("render"),g.ok("练习记录已清空")),!0;case"reset-bg":return Tt({color:"",image:"",dim:.35}),g.ok("背景已恢复"),I("render"),!0;case"export-bank":return f.bank?.length?(ha(`题库-${f.user}.json`,f.bank),g.ok("已导出"),!0):(g.info("题库是空的"),!0);case"export-wrong":return f.wrong?.length?(ha(`错题-${f.user}.json`,f.wrong),g.ok("已导出"),!0):(g.info("没有错题"),!0);case"change-password":return await Wr(),!0;case"logout":return await dt({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(Ca(),g.info("已退出登录")),!0;default:return!1}}const q={subject:"all",edit:!1,selected:new Set};function Qr(){q.subject="all",q.edit=!1,q.selected.clear()}function nn(){const t=f.wrong??[];return q.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===q.subject)}function Yr(){return["all",...Array.from(new Set((f.wrong??[]).map(t=>t.subject||"默认题库")))]}function Zr(){const t=nn(),e=f.wrong?.length??0,a=Yr().map(s=>`<button class="chip" data-act="subject" data-subject="${y(s)}" aria-pressed="${q.subject===s}">
          ${s==="all"?"全部":y(s)}
        </button>`).join(""),n=f.loading.wrong&&!f.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${q.selected.has(s.id)}">
          ${q.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${R(s.q)}</div>
          <div class="item-meta">
            ${s.subject?`<span class="tag tag-accent">${y(s.subject)}</span>`:""}
            ${s.chapter?`<span class="tag">${y(s.chapter)}</span>`:""}
          </div>
          <div class="item-answer">
            ${s.user_choice_text?`<div class="mine">你的选择：${y(s.user_choice_text)}</div>`:""}
            ${s.answer?`<div class="right">正确答案：${y(s.answer)}</div>`:""}
          </div>
          ${q.edit?"":`<div class="item-meta" style="margin-top:10px">
                   <span class="grow"></span>
                   <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${s.id}">已掌握</button>
                 </div>`}
        </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">⚑</div><div class="empty-title">${e?"这个题库下没有错题":"还没有错题"}</div><div class="empty-desc">${e?"切到「全部」看看":"答错的题会自动收集到这里，方便集中消灭"}</div></div>`;return`
    <div class="row between" style="margin-bottom:4px">
      <h1 class="page-title" style="margin:0">错题集</h1>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${q.edit?"✓":"☰"}</button>
    </div>
    <p class="muted small" style="margin:4px 0 14px">共 ${e} 道，消灭一题少一题</p>
    ${e?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">开始重练（${t.length} 题）</button>`:""}
    ${a}
    ${q.edit?`<div class="row between" style="margin-bottom:12px">
             <span class="muted small">已选 ${q.selected.size} 题</span>
             <button class="btn btn-sm btn-danger" data-act="remove-selected" ${q.selected.size?"":"disabled"}>删除</button>
           </div>`:""}
    ${n}`}async function to(){await vt()}async function eo(t,e){switch(t){case"subject":return q.subject=e.dataset.subject??"all",!0;case"toggle-edit":return q.edit=!q.edit,q.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return q.selected.has(a)?q.selected.delete(a):q.selected.add(a),!0}case"practice":return nn().length?(await Va(),!0):(g.info("没有可练的错题"),!0);case"remove":{const a=Number(e.dataset.id);try{await M.wrong.remove([a]),q.selected.delete(a),Q("wrong"),await vt(!0),g.ok("已标记掌握，继续加油")}catch(n){g.error(n instanceof T?n.message:"操作失败")}return!0}case"remove-selected":{const a=[...q.selected];if(!a.length||!await dt({title:"删除错题",message:`确定删除选中的 ${a.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await M.wrong.remove(a),q.selected.clear(),Q("wrong"),await vt(!0),g.ok("已删除")}catch(n){g.error(n instanceof T?n.message:"删除失败")}return!0}default:return!1}}const yt={home:{render:Cr,mount:Nr,handle:_r},bank:{render:Us,mount:Ws,handle:Ks,onInput:Js,reset:Pa},wrong:{render:Zr,mount:to,handle:eo,reset:Qr},fav:{render:xr,mount:kr,handle:Sr,reset:wr},me:{render:Kr,mount:Vr,handle:Xr}};let Dt=!1,ut=!1,pe=!1,fe=!1;function sn(){return document.getElementById("app-root")}function ao(){ut=!1,sn().innerHTML=`
    <div class="app-shell">
      <aside class="sidebar" aria-label="主导航">
        <div class="sidebar-brand">基准</div>
        <nav class="sidebar-nav">
          ${St.map(t=>`<button class="side-btn" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
                 <span class="side-ico">${t.icon}</span><span class="side-label">${t.label}</span>
               </button>`).join("")}
        </nav>
        <div class="sidebar-foot">
          <span class="side-user">${f.user?`@${f.user}`:"未登录"}</span>
          <span class="side-ver" title="构建时间">2026-11-16 15:02</span>
        </div>
      </aside>
      <header class="app-header">
        <div class="header-inner">
          <div class="brand">
            <span class="brand-dot"></span>
            <span class="brand-name">基准</span>
          </div>
          <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(f.user||"?").slice(0,1).toUpperCase()}</button>
        </div>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${St.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${St.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,Dt=!0}function no(){document.querySelectorAll(".tab-btn").forEach(e=>{const a=e.dataset.tab===f.tab;e.classList.toggle("is-active",a),e.setAttribute("aria-selected",String(a))}),document.querySelectorAll(".side-btn").forEach(e=>{const a=e.dataset.tab===f.tab;e.classList.toggle("is-active",a),e.setAttribute("aria-current",a?"page":"false")});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,St.findIndex(a=>a.id===f.tab));t.style.setProperty("--tab-index",String(e))}}function va(t,e){const a=document.querySelector(t);if(!a)return;let n=!1,s=!1,o=!1,r=0,i=null,c;const d=l=>{const m=Array.from(a.querySelectorAll(".tab-btn, .side-btn"));if(!m.length)return 0;let b=0,k=Number.POSITIVE_INFINITY;return m.forEach((v,$)=>{const x=v.getBoundingClientRect(),S=e==="x"?x.left+x.width/2:x.top+x.height/2,j=Math.abs(l-S);j<k&&(k=j,b=$)}),b},u=()=>{if(!s&&(s=!0,a.classList.add("is-dragging"),i!==null))try{a.setPointerCapture(i)}catch{}};a.addEventListener("pointerdown",l=>{l.button===0&&(n=!0,s=!1,o=!1,i=l.pointerId,r=e==="x"?l.clientX:l.clientY,c=window.setTimeout(u,140))}),a.addEventListener("pointermove",l=>{if(!n)return;const m=e==="x"?l.clientX:l.clientY;if(!s){if(Math.abs(m-r)<6)return;u()}o=!0;const k=a.querySelectorAll(".tab-btn, .side-btn")[d(m)],v=St[d(m)],$=k?.dataset.tab??v?.id,x=St.find(S=>S.id===$)?.id;x&&x!==f.tab&&Rt(x)});const p=l=>{if(n){if(n=!1,c&&window.clearTimeout(c),a.classList.remove("is-dragging"),s)try{a.releasePointerCapture(l.pointerId)}catch{}if(i=null,o){const m=b=>{b.stopPropagation(),b.preventDefault()};a.addEventListener("click",m,{capture:!0,once:!0}),window.setTimeout(()=>a.removeEventListener("click",m,{capture:!0}),260)}}};a.addEventListener("pointerup",p),a.addEventListener("pointercancel",p)}function so(){va(".tabbar","x"),va(".sidebar","y")}function ro(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,a=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),n=a?e.getAttribute("data-role"):null,s=a&&e instanceof HTMLInputElement?e.selectionStart:null,o=yt[f.tab]??yt.home;if(t.innerHTML=`<div class="view-inner">${o.render()}</div>`,no(),a&&n){const r=t.querySelector(`[data-role="${n}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}o.mount?.()}function et(){if(pe){fe=!0;return}pe=!0;try{if(!f.authed&&!f.token){ut=!0,Dt=!1,sn().innerHTML=Yn();return}Dt||(ao(),so()),ro()}finally{pe=!1,fe&&(fe=!1,queueMicrotask(et))}}let me=!1;function ya(){me||(me=!0,requestAnimationFrame(()=>{me=!1,et()}))}async function rn(t){await t(),ut&&et()}function on(t){const e=t.dataset.act??"";if(en()&&t.closest(".exam")&&tn(t.dataset.ex??"",t))return;if(br()&&t.closest(".quiz")){X(e,t).then(n=>{n||I("render")});return}if(e==="tab"){Rt(t.dataset.tab??"home");return}if(ut){rn(()=>Na(e,t));return}const a=yt[f.tab]??yt.home;a.handle&&Promise.resolve(a.handle(e,t)).then(n=>{n&&et()})}function oo(t){const e=t.target;if(!e)return;const a=e.closest("[data-ex]");if(a&&en()&&a.closest(".exam")){tn(a.dataset.ex??"",a);return}const n=e.closest("[data-act]");n&&(n.closest(".modal-layer")||on(n))}function $a(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){on(e);return}if(ut)return;const a=document.getElementById("view");if(!a||!a.contains(e))return;(yt[f.tab]??yt.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&et()}function io(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),ut&&rn(()=>Na("submit",e)))}function co(){Te(),qe(),Hn(()=>{Ca(),Dt=!1,ut=!1,g.error("登录已过期，请重新登录"),I("auth")}),Ut("nav",()=>{Object.entries(yt).forEach(([t,e])=>{t!==f.tab&&e.reset?.()}),et()}),Ut("auth",()=>{Dt=!1,ut=!1,f.authed?(Pa(),et(),Promise.allSettled([lt(!0),vt(!0),It(!0)])):et()}),Ut("render",ya),Ut("data",ya),document.addEventListener("click",oo),document.addEventListener("change",$a),document.addEventListener("input",$a),document.addEventListener("submit",io),an(),f.token&&(f.authed=!0),et(),f.token&&Promise.allSettled([lt(),vt(),It()])}function wa(){try{co(),Ln()}catch(t){console.error("[datum] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",wa,{once:!0}):wa();
