var la=Object.defineProperty;var da=(t,e,n)=>e in t?la(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var We=(t,e,n)=>da(t,typeof e!="symbol"?e+"":e,n);import{k as ua,u as pa,s as Ke,a as fa,i as ma,b as Ht,z as ga}from"./vendor-CSYf6iwd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const ba={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function $(t){return String(t??"").replace(/[&<>"']/g,e=>ba[e]??e)}const se=/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;function ha(t,e){try{return ua.renderToString(t,{displayMode:e,throwOnError:!1,output:"mathml",strict:!1,trust:!1})}catch{return $(e?`$$${t}$$`:`$${t}$`)}}function Ge(t){let e="",n=0;se.lastIndex=0;for(let a=se.exec(t);a;a=se.exec(t)){e+=$(t.slice(n,a.index)).replace(/\n/g,"<br>");const s=!!(a[1]||a[2]),o=(a[1]??a[2]??a[3]??a[4]??"").trim();e+=o?ha(o,s):$(a[0]),n=a.index+a[0].length}return e+=$(t.slice(n)).replace(/\n/g,"<br>"),e}const va=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function ya(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function O(t){const e=ya(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return Ge(e);const a=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!a)return $(e);const s=o=>{if(o.nodeType===Node.TEXT_NODE)return Ge(o.textContent??"");if(o.nodeType!==Node.ELEMENT_NODE)return"";const r=o,i=r.tagName,c=Array.from(r.childNodes).map(s).join("");if(!va.has(i))return c;if(i==="IMG"){const u=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(u))return"";const p=$(r.getAttribute("alt")??"");return`<img src="${$(u)}" alt="${p}" loading="lazy" referrerpolicy="no-referrer">`}const d=i.toLowerCase();return`<${d}>${c}</${d}>`};return Array.from(a.childNodes).map(s).join("")}function N(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function Pt(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(n=>Number.isInteger(n)))).sort((n,a)=>n-a)}function $a(t){return typeof t=="string"}function W(t,e=[]){return typeof t=="string"?t:Pt(t).map(n=>{const a=String.fromCharCode(65+n),s=(e[n]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${a}. ${s}`:a}).join("、")}function xe(t){const e=[...t];for(let n=e.length-1;n>0;n-=1){const a=Math.floor(Math.random()*(n+1));[e[n],e[a]]=[e[a],e[n]]}return e}function xn(t,e){const n=Pt(e);if(!n.length||t.length!==n.length)return!1;const a=[...new Set(t)].sort((s,o)=>s-o);return a.length===n.length&&a.every((s,o)=>s===n[o])}function wa(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const n=JSON.parse(e);if(typeof n=="number")return n;if(Array.isArray(n))return n.map(Number).filter(Number.isInteger);if(typeof n=="string")return n}catch{}return e}return""}let Q=null;function xa(){return Q&&document.body.contains(Q)||(Q=document.createElement("div"),Q.className="toast-host",Q.setAttribute("role","status"),Q.setAttribute("aria-live","polite"),document.body.appendChild(Q)),Q}function re(t,e="info",n=2600){if(!t)return;const a=document.createElement("div");a.className=`toast toast-${e}`,a.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${$(t)}</span>`,xa().appendChild(a),requestAnimationFrame(()=>a.classList.add("in")),window.setTimeout(()=>{a.classList.remove("in"),window.setTimeout(()=>a.remove(),220)},n)}const h={info:t=>re(t,"info"),ok:t=>re(t,"success"),error:t=>re(t,"error",3200)},ge="oq:queue",ka=200;function ke(){try{const t=localStorage.getItem(ge),e=t?JSON.parse(t):[];return Array.isArray(e)?e.filter(n=>n&&n.path):[]}catch{return[]}}function kn(t){try{t.length?localStorage.setItem(ge,JSON.stringify(t.slice(-ka))):localStorage.removeItem(ge)}catch{}}function Sa(){return ke().length}function Aa(t,e,n){const a=ke();a.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,path:t,body:e,label:n,at:Date.now()}),kn(a)}let oe=!1;async function Je(){if(oe)return 0;const t=ke();if(!t.length)return 0;oe=!0;let e=0;const n=[];for(const a of t)try{const s=await fetch(a.path,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a.body),...Ve()?{headers:{"Content-Type":"application/json",Accept:"application/json",...Ve()}}:{}});if(s.ok||s.status>=400&&s.status<500){s.ok&&(e+=1);continue}n.push(a)}catch{n.push(a);break}return oe=!1,kn([...n,...t.slice(t.length)]),e&&h.ok(`已补传 ${e} 条离线操作`),e}function Ve(){try{const e=(localStorage.getItem("oq:oq:token")||localStorage.getItem("oq:token")||"").replace(/^"|"$/g,"");return e?{Authorization:`Bearer ${e}`}:{}}catch{return{}}}function Ea(){window.addEventListener("online",()=>{Je()}),navigator.onLine&&Sa()&&setTimeout(()=>void Je(),1500)}const Se="oq:",Ae="oq:user",Ee="oq:token",Ta={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},P={...Ta,...et("settings",{})};["auto","light","dark","eye"].includes(P.theme)||(P.theme="auto");function et(t,e){try{const n=localStorage.getItem(Se+t);return n===null?e:JSON.parse(n)}catch{return e}}function nt(t,e){try{localStorage.setItem(Se+t,JSON.stringify(e))}catch{}}function be(t){try{localStorage.removeItem(Se+t)}catch{}}function Kt(t){Object.assign(P,t),nt("settings",P)}function La(t){Kt({theme:t})}function H(){return et(Ae,"")||""}function Sn(t){nt(Ae,t)}function ja(){be(Ae),be(Ee)}function Te(){return et(Ee,"")||""}function An(t){nt(Ee,t)}function at(t){return`u:${H()||"anon"}:${t}`}function Le(){return et(at("notes"),{})}function Ma(t,e){const n=Le(),a=String(t);e.trim()?n[a]=e:delete n[a],nt(at("notes"),n)}function En(){const t=et(at("progress"),{});return Number(t.sequential_index)||0}function qa(t){nt(at("progress"),{sequential_index:t,updatedAt:Date.now()})}function Tn(){const t=et(at("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function Ca(t){nt(at("session"),t)}function Ln(){be(at("session"))}function Na(){return et(at("recent"),[])}function _a(t){const e=[...t,...Na()].slice(0,30);nt(at("recent"),Array.from(new Set(e)))}function jn(){return et("appearance",{color:"",image:"",dim:.35})}function Ia(t){nt("appearance",{...jn(),...t})}function Da(){return et("welcomed","")===new Date().toDateString()}function Oa(){nt("welcomed",new Date().toDateString())}class j extends Error{constructor(n,a){super(a);We(this,"status");this.name="ApiError",this.status=n}}let je=null;function Pa(t){je=t}async function Mn(t,e={}){const n=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&n.set("Content-Type","application/json");const a=Te();a&&n.set("Authorization",`Bearer ${a}`),n.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:n})}catch{throw new j(0,"网络连接失败，请检查网络后重试")}const o=s.headers.get("content-type")??"";let r=null;o.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const i=r??{};if(s.status===401)throw je?.(),new j(401,typeof i.error=="string"?i.error:"登录已过期，请重新登录");if(!s.ok||i.ok===!1){const c=typeof i.error=="string"&&i.error?i.error:`请求失败（HTTP ${s.status}）`;throw new j(s.status,c)}return r}const ie=t=>Mn(t),J=(t,e)=>Mn(t,{method:"POST",body:JSON.stringify(e)});async function Ra(t,e,n){const a=new Headers({"Content-Type":"application/json"}),s=Te();s&&a.set("Authorization",`Bearer ${s}`);const o=await fetch("/api/ai",{method:"POST",headers:a,body:JSON.stringify({...t,stream:!0}),signal:n});if(!o.ok||!o.body){const l=await o.json().catch(()=>({}));if(o.status===401)throw je?.(),new j(401,"登录已过期，请重新登录");if(typeof l.result=="string")return e(l.result),{text:l.result,cached:!1,provider:typeof l.provider=="string"?l.provider:void 0};throw new j(o.status,typeof l.error=="string"?l.error:"AI 解析失败")}const r=o.body.getReader(),i=new TextDecoder;let c="",d="",u=!1,p;for(;;){const{value:l,done:m}=await r.read();if(m)break;c+=i.decode(l,{stream:!0});const g=c.split(`

`);c=g.pop()??"";for(const y of g){const T=y.split(`
`).find(w=>w.startsWith("data:"));if(!T)continue;let b;try{b=JSON.parse(T.slice(5).trim())}catch{continue}if(typeof b.delta=="string"&&b.delta&&(d+=b.delta,e(b.delta)),typeof b.error=="string")throw new j(502,b.error);b.done&&(u=b.cached===!0,typeof b.provider=="string"&&(p=b.provider))}}return{text:d,cached:u,provider:p}}function he(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:wa(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function Ha(t){return{...he(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}async function pt(t,e,n){try{return await J(t,e)}catch(a){if(a instanceof j&&a.status===0)return Aa(t,e,n),{ok:!0,queued:!0,offline:!0};throw a}}const L={auth:{check:t=>J("/api/auth",{action:"check",username:t}),set:(t,e)=>J("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>J("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>J("/api/auth",{action:"change",username:H(),oldPassword:t,newPassword:e})},questions:{async list(){const t=H();if(!t)return[];const e=await ie(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>he(a))},add:t=>pt("/api/questions-add",{user_id:H(),questions:t},`导入 ${t.length} 道题`),update:(t,e,n)=>pt("/api/questions-update",{id:t,user_id:H(),...e,...n?.baseUpdatedAt?{base_updated_at:n.baseUpdatedAt}:{},...n?.force?{force:!0}:{}},"保存题目"),remove:t=>pt("/api/questions-delete",{ids:t,user_id:H()},`删除 ${t.length} 道题`)},wrong:{async list(){const t=H();if(!t)return[];const e=await ie(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>Ha(a))},add:t=>pt("/api/wrong-add",{user_id:H(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""},"记录错题"),remove:t=>pt("/api/wrong-delete",{ids:t,user_id:H()},"移除错题")},favorites:{async list(){const t=H();if(!t)return[];const e=await ie(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>he(a))},add:t=>pt("/api/favorites-add",{user_id:H(),question_id:t},"收藏题目"),remove:t=>pt("/api/favorites-remove",{user_id:H(),question_id:t},"取消收藏")},ai:{explain:t=>J("/api/ai",{action:"explain",prompt:t}),grade:t=>J("/api/ai",{action:"grade",prompt:t}),extract:t=>J("/api/ai",{action:"extract",...t}),classify:t=>J("/api/ai",{action:"classify",prompt:t}),generate:t=>J("/api/ai",{action:"generate",prompt:t}),explainStream:(t,e,n)=>Ra({action:"explain",prompt:t},e,n)}},Lt='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"',St=[{id:"home",label:"首页",icon:`<svg viewBox="0 0 24 24" ${Lt} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`},{id:"bank",label:"题库",icon:`<svg viewBox="0 0 24 24" ${Lt} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`},{id:"wrong",label:"错题",icon:`<svg viewBox="0 0 24 24" ${Lt} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`},{id:"fav",label:"收藏",icon:`<svg viewBox="0 0 24 24" ${Lt} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`},{id:"me",label:"我的",icon:`<svg viewBox="0 0 24 24" ${Lt} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`}],Xe=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],f={tab:"home",user:H(),token:Te(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},Mt=new Map;function Ut(t,e){return Mt.has(t)||Mt.set(t,new Set),Mt.get(t).add(e),()=>Mt.get(t)?.delete(e)}function I(t){Mt.get(t)?.forEach(e=>e())}function Rt(t){f.tab!==t&&(f.tab=t,I("nav"))}const qn=window.matchMedia("(prefers-color-scheme: dark)");function Qe(){return P.theme==="auto"?qn.matches?"dark":"light":P.theme}function Me(){document.documentElement.dataset.theme=Qe();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=Qe()==="dark"?"#0b0c0f":"#f4f5f7")}function Ua(t){La(t),Me()}qn.addEventListener("change",()=>{P.theme==="auto"&&Me()});function za(t){Ia(t)}function qe(){const{color:t,image:e,dim:n}=jn(),a=document.body;a.style.backgroundImage=e?`url("${e}")`:"",a.style.backgroundSize="cover",a.style.backgroundPosition="center",a.style.backgroundAttachment="fixed",a.dataset.dim=String(n),t&&!e?a.style.backgroundColor=t:a.style.backgroundColor=""}async function Ba(t,e){const n=await L.auth.login(t,e);An(n.token),Sn(t),f.user=t,f.token=n.token,f.authed=!0,X(),I("auth")}async function Fa(t,e){const n=await L.auth.set(t,e);An(n.token),Sn(t),f.user=t,f.token=n.token,f.authed=!0,X(),I("auth")}function Cn(){f.user="",f.token="",f.authed=!1,f.bank=null,f.wrong=null,f.favs=null,f.favoriteIds=new Set,ja(),Ln(),I("auth")}const Wa=300*1e3,ft={bank:0,wrong:0,fav:0},Gt=new Map;function X(t){t?(ft[t]=0,t==="bank"&&(f.bank=null),t==="wrong"&&(f.wrong=null),t==="fav"&&(f.favs=null)):(ft.bank=ft.wrong=ft.fav=0,f.bank=null,f.wrong=null,f.favs=null)}function Ka(t,e){const n=Gt.get(t);if(n)return n;const a=e().finally(()=>Gt.delete(t));return Gt.set(t,a),a}async function Ce(t,e,n,a){if(!f.user)return[];const s=Gt.get(t);if(s)return s;const o=Date.now()-ft[t]<Wa;if(!e&&o)return[];f.loading[t]=!0,I("data");try{const r=await Ka(t,n);return a(r),ft[t]=Date.now(),r}catch(r){throw r instanceof j&&r.status!==401&&h.error(r.message),r}finally{f.loading[t]=!1,I("data")}}async function ct(t=!1){try{await Ce("bank",t,()=>L.questions.list(),e=>{f.bank=e})}catch{}return f.bank??[]}async function bt(t=!1){try{await Ce("wrong",t,()=>L.wrong.list(),e=>{f.wrong=e})}catch{}return f.wrong??[]}async function Dt(t=!1){try{await Ce("fav",t,()=>L.favorites.list(),e=>{f.favs=e,f.favoriteIds=new Set(e.map(n=>n.id))})}catch{}return f.favs??[]}function Xt(t){return f.favoriteIds.has(t)}async function Ga(t){const e=!Xt(t);try{return e?await L.favorites.add(t):await L.favorites.remove(t),e?f.favoriteIds.add(t):f.favoriteIds.delete(t),f.favs=null,ft.fav=0,h.ok(e?"已加入收藏":"已取消收藏"),I("data"),e}catch(n){return h.error(n instanceof j?n.message:"操作失败"),Xt(t)}}function Ja(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${Xe[Math.floor(Math.random()*Xe.length)]}`}function qt(t){za(t),qe()}const S={step:"name",username:"",busy:!1,error:""};function Va(){S.step="name",S.username="",S.busy=!1,S.error=""}function Xa(){const t=`
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
    </div>`,e=S.error?`<div class="auth-error" role="alert">${$(S.error)}</div>`:"";if(S.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${$(S.username)}" required>
            </label>
            ${e}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${S.busy?"disabled":""}>
              ${S.busy?"检查中…":"继续"}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;const n=S.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${n?"为":"欢迎回来，"} <strong>${$(S.username)}</strong>${n?" 设置一个密码":""}</p>
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
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${S.busy?"disabled":""}>
            ${S.busy?"请稍候…":n?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${S.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function Nn(t,e){if(t==="back")return S.step="name",S.error="",!0;if(t==="submit"){const n=e,a=new FormData(n);if(S.step==="name"){const o=String(a.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(o))return S.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;S.busy=!0,S.error="";try{const{hasPassword:r}=await L.auth.check(o);S.username=o,S.step=r?"password":"create"}catch(r){S.error=r instanceof j?r.message:"网络异常，请重试"}finally{S.busy=!1}return!0}if(S.busy)return!0;const s=String(a.get("password")??"");if(S.step==="create"){const o=String(a.get("confirm")??"");if(s!==o)return S.error="两次输入的密码不一致",!0}if(s.length<6)return S.error="密码至少 6 位",!0;S.busy=!0,S.error="";try{S.step==="create"?await Fa(S.username,s):await Ba(S.username,s),S.step==="create"&&h.ok("账号已创建，开始刷题吧"),Va()}catch(o){S.error=o instanceof j?o.message:"登录失败，请重试"}finally{S.busy=!1}return!0}return!1}function Qa(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function _n(t,e){const n=e.trim();if(!n)return t;const a=new RegExp(Qa(n),"gi");return t.replace(/<[^>]+>|[^<]+/g,s=>s.startsWith("<")?s:s.replace(a,o=>`<mark class="hl">${o}</mark>`))}const vt={single:"单选",multi:"多选",judge:"判断",blank:"填空",essay:"简答",calc:"计算"},Ya=[{value:"",label:"自动识别"},{value:"single",label:"单项选择"},{value:"multi",label:"多项选择"},{value:"judge",label:"判断题"},{value:"blank",label:"填空题"},{value:"essay",label:"简答题"},{value:"calc",label:"计算题"}],Za=["single","multi","judge","blank","essay","calc"];function K(t){const e=t.type??"";if(e&&Za.includes(e))return e;const n=t.opts??[],a=String(t.q??"");if(!n.length)return/(计算|求|试算|解：|画出|绘制)/.test(a)?"calc":/_{2,}|（\s*）|\(\s*\)|【\s*】/.test(a)?"blank":"essay";if(n.length===2){const s=n.map(o=>o.replace(/^[A-Za-z][.、)）]\s*/,"").trim()).join("|");if(/^(正确|对|是|√|True)|\|(错误|错|否|×|False)$/i.test(s)||/正确\|错误|对\|错/.test(s))return"judge"}return Array.isArray(t.a)?"multi":"single"}function ts(t){return t==="essay"||t==="calc"||t==="blank"}let U=null,Ct=0;function In(){return U&&document.body.contains(U)||(U=document.createElement("div"),U.className="modal-root",U.setAttribute("role","dialog"),U.setAttribute("aria-modal","true"),document.body.appendChild(U)),U}function es(){Ct+=1,document.body.classList.add("is-locked")}function Ye(){Ct=Math.max(0,Ct-1),Ct===0&&document.body.classList.remove("is-locked")}function te(){In().innerHTML="",Ct=0,document.body.classList.remove("is-locked")}function C(t){const e=In(),n=t.dismissible!==!1;return new Promise(a=>{let s=!1;const o=l=>{if(s)return;s=!0,p(),r.classList.remove("open"),r.style.pointerEvents="none",window.matchMedia("(prefers-reduced-motion: reduce)").matches?(r.remove(),Ye()):window.setTimeout(()=>{r.remove(),Ye()},80),a(l)},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${n?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${$(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${$(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((l,m)=>`<button class="btn btn-${l.variant??"ghost"}" data-idx="${m}">${$(l.label)}</button>`).join("")}</div>`:""}
      </div>`;const i=r.querySelector(".modal-card"),c=i.querySelector(".modal-body");typeof t.body=="string"?c.innerHTML=t.body:t.body&&c.appendChild(t.body);const d=l=>{l.key==="Escape"&&n&&(l.stopPropagation(),o(null))},u=l=>{const m=l.target;if(m.closest("[data-close]")&&n){o(null);return}const g=m.closest("[data-idx]");if(!g)return;const y=t.actions?.[Number(g.dataset.idx)];y&&(y.keepOpen||o(y.value))},p=()=>{document.removeEventListener("keydown",d,!0),r.removeEventListener("click",u),U&&U.children.length===0&&U.classList.remove("open")};r.addEventListener("click",u),document.addEventListener("keydown",d,!0),e.appendChild(r),e.classList.add("open"),es(),t.onMount?.(i),requestAnimationFrame(()=>{r.classList.add("open");const l=i.querySelector("input, textarea, button.btn-primary, button");l&&window.matchMedia("(pointer: fine)").matches&&l.focus({preventScroll:!0})})})}function lt(t){return C({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}function ns(t,e=1400,n=.82){return new Promise((a,s)=>{const o=URL.createObjectURL(t),r=new Image;r.onload=()=>{URL.revokeObjectURL(o);const i=Math.min(1,e/Math.max(r.width,r.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(r.width*i)),c.height=Math.max(1,Math.round(r.height*i));const d=c.getContext("2d");if(!d){s(new Error("canvas 不可用"));return}d.fillStyle="#fff",d.fillRect(0,0,c.width,c.height),d.drawImage(r,0,0,c.width,c.height),a(c.toDataURL("image/jpeg",n))},r.onerror=()=>{URL.revokeObjectURL(o),s(new Error("图片解码失败"))},r.src=o})}const as=new Set(["B","STRONG","I","EM","U","SUB","SUP","BR","P","DIV","SPAN","IMG","CODE"]);function zt(t){const n=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html").body.firstElementChild;if(!n)return"";const a=s=>{if(s.nodeType===Node.TEXT_NODE)return(s.textContent??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");if(s.nodeType!==Node.ELEMENT_NODE)return"";const o=s,r=o.tagName,i=Array.from(o.childNodes).map(a).join("");if(!as.has(r))return i;if(r==="IMG"){const d=o.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(d))return"";const u=(o.getAttribute("alt")??"").replace(/"/g,"&quot;");return`<img src="${d.replace(/"/g,"&quot;")}" alt="${u}">`}if(r==="BR")return"<br>";const c=r.toLowerCase();return c==="div"||c==="p"?i.trim()?`${i}<br>`:"<br>":`<${c}>${i}</${c}>`};return Array.from(n.childNodes).map(a).join("").replace(/(<br>)+$/g,"").trim()}const ss=[{cmd:"bold",label:"B",title:"加粗（Ctrl/⌘+B）"},{cmd:"italic",label:"I",title:"斜体（Ctrl/⌘+I）"},{cmd:"underline",label:"U",title:"下划线（Ctrl/⌘+U）"},{cmd:"superscript",label:"x²",title:"上标"},{cmd:"subscript",label:"x₂",title:"下标"},{cmd:"insertUnorderedList",label:"≡",title:"列表"}];function rs(t={}){const e=document.createElement("div");e.className="rt";const n=document.createElement("div");n.className="rt-bar";const a=document.createElement("div");a.className="rt-area",a.contentEditable="true",a.spellcheck=!1,a.dataset.role="rich",a.style.minHeight=`${t.minHeight??96}px`,t.placeholder&&(a.dataset.placeholder=t.placeholder),a.innerHTML=zt(t.value??"");const s=(r,i)=>{a.focus(),document.execCommand(r,!1,i),o()};if(t.toolbar!==!1){for(const u of ss){const p=document.createElement("button");p.type="button",p.className="rt-btn",p.title=u.title,p.textContent=u.label,p.addEventListener("mousedown",l=>l.preventDefault()),p.addEventListener("click",()=>s(u.cmd,u.arg)),n.appendChild(p)}const r=document.createElement("span");r.className="rt-sep",n.appendChild(r);const i=document.createElement("button");i.type="button",i.className="rt-btn",i.textContent="∑",i.title="公式：选中内容包成 $…$",i.addEventListener("mousedown",u=>u.preventDefault()),i.addEventListener("click",()=>{const u=window.getSelection()?.toString()??"";if(u){s("insertText",`$${u}$`);return}s("insertText","$$");const p=window.getSelection();if(p&&p.rangeCount){const l=p.getRangeAt(0);typeof p.modify=="function"?p.modify("move","backward","character"):l.startContainer.nodeType===Node.TEXT_NODE&&(l.setStart(l.startContainer,Math.max(0,l.startOffset-1)),l.collapse(!0),p.removeAllRanges(),p.addRange(l))}}),n.appendChild(i);const c=document.createElement("button");c.type="button",c.className="rt-btn",c.textContent="▣",c.title="插入图片（自动压缩）",c.addEventListener("mousedown",u=>u.preventDefault()),c.addEventListener("click",()=>{const u=document.createElement("input");u.type="file",u.accept="image/*",u.onchange=async()=>{const p=u.files?.[0];if(p)try{c.textContent="…";const l=await ns(p);a.focus(),document.execCommand("insertHTML",!1,`<img src="${l}" alt="题图"><br>`),o(),h.ok(`图片已插入（${Math.round(l.length*.75/1024)} KB）`)}catch{h.error("图片读取失败，换一张试试")}finally{c.textContent="▣"}},u.click()}),n.appendChild(c);const d=document.createElement("button");d.type="button",d.className="rt-btn rt-clear",d.textContent="⌫",d.title="清除格式",d.addEventListener("mousedown",u=>u.preventDefault()),d.addEventListener("click",()=>s("removeFormat")),n.appendChild(d)}function o(){const r=(a.textContent??"").trim().length>0,i=!!a.querySelector("img");a.classList.toggle("is-empty",!r&&!i)}return a.addEventListener("input",o),a.addEventListener("blur",o),a.addEventListener("paste",r=>{const i=r.clipboardData?.getData("text/html");i&&(r.preventDefault(),document.execCommand("insertHTML",!1,zt(i)))}),o(),e.append(n,a),{el:e,getValue:()=>zt(a.innerHTML),setValue:r=>{a.innerHTML=zt(r),o()},focus:()=>a.focus()}}function Ze(t){const e=t.name.toLowerCase(),n=t.type.toLowerCase();return e.endsWith(".pdf")||n==="application/pdf"?"pdf":n.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|heic)$/.test(e)?"image":e.endsWith(".docx")?"docx":e.endsWith(".json")?"json":/\.(txt|md|csv|tsv|text)$/.test(e)||n.startsWith("text/")?"text":"unknown"}function kt(t){return String(t??"").replace(/\r\n?/g,`
`).trim()}function Dn(t,e){if(Array.isArray(t)){const r=t.map(i=>typeof i=="number"?i:os(String(i),e.length)).filter(i=>i!==null);return r.length?r.length===1?r[0]:[...new Set(r)].sort((i,c)=>i-c):t.map(String).join("、")}if(typeof t=="number"&&Number.isFinite(t))return t;const n=kt(t);if(!n)return"";const s=(/^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(n)?n:"")||(/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(n)?n:"");if(s){const r=[...new Set(s.toUpperCase().split("").map(i=>i.charCodeAt(0)-65))].filter(i=>i>=0&&i<e.length);if(r.length)return r.length===1?r[0]:r.sort((i,c)=>i-c)}const o=/^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(n);if(o&&e.length){const r=o[1].charCodeAt(0)-65;if(r>=0&&r<e.length){const i=o[2].trim();return e.findIndex(d=>d.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()===i)>=0||i,r}}return n}function os(t,e){const n=t.trim().toUpperCase();if(!/^[A-H]$/.test(n))return null;const a=n.charCodeAt(0)-65;return a<e?a:null}function is(t){const e=kt(t.q??t.question??t.title??t.题目??t.题干);if(!e)return null;const n=t.opts??t.options??t.choices??t.选项;let a=[];Array.isArray(n)?a=n.map(r=>kt(r)).filter(Boolean):typeof n=="string"&&(a=ps(n));const s=t.a??t.answer??t.correct??t.答案??t.正确答案,o=a.length?Dn(s,a):kt(s);return{q:e,opts:a,a:o,...t.figure?{figure:t.figure}:{},chapter:kt(t.chapter??t.章节??t.知识点),subject:kt(t.subject??t.科目??t.题库)||"默认题库"}}function Ne(t){const e=t.replace(/^\uFEFF/,"").trim(),n=/```(?:json)?([\s\S]*?)```/i.exec(e)?.[1]??e,a=n.indexOf("["),s=n.indexOf("{"),o=a>=0&&(s<0||a<s)?a:s;if(o<0)return[];const r=Math.max(n.lastIndexOf("]"),n.lastIndexOf("}"));if(r<=o)return[];let i;try{i=JSON.parse(n.slice(o,r+1))}catch{return[]}return(Array.isArray(i)?i:Array.isArray(i?.questions)?i.questions:Array.isArray(i?.data)?i.data:[]).filter(d=>!!d&&typeof d=="object").map(is).filter(d=>!!d)}const cs=/^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/,ls=/^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/,ds=/^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/,us=/^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;function ps(t){return t.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/).map(n=>n.trim()).filter(Boolean)}function fs(t){const e=[...t.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];return e.length<2?[]:e.map((n,a)=>{const s=(n.index??0)+n[0].length,o=a+1<e.length?e[a+1].index??t.length:t.length;return t.slice(s,o).trim()})}function ms(t){const n=t.replace(/^\uFEFF/,"").replace(/\r\n?/g,`
`).replace(/!\[[^\]]*\]\((data:image\/[^)]+)\)/g,(u,p)=>`<img src="${p}" alt="题图">`).split(`
`),a=[];let s="",o=[],r="",i="",c="";const d=()=>{const u=s.trim();if(!u){s="",o=[],r="";return}if(!o.length&&!r.trim()&&u.length<=24){s="",o=[],r="";return}const p=o.map(m=>m.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()),l=p.length?Dn(r,p):r.trim();a.push({q:u,opts:p,a:l,chapter:i,subject:c||"默认题库"}),s="",o=[],r="",i="",c=""};for(const u of n){if(!u.trim())continue;if(/^\s*<img\b/i.test(u)){s=`${s}${s?`
`:""}${u.trim()}`;continue}const p=us.exec(u),l=cs.exec(u),m=ls.exec(u),g=ds.exec(u);if(p&&!l){d();const y=fs(p[2]);y.length>=2?(s=p[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim(),o=y):s=p[2].trim();continue}if(l&&s){o.push(l[2].trim());continue}if(m&&(s||o.length)){r=m[1].trim();continue}if(g){const y=g[0].trim(),T=g[1].trim();/章节|知识点/.test(y)?i=T:/科目|题库|分类/.test(y)&&(c=T);continue}s?o.length?o[o.length-1]=`${o[o.length-1]} ${u.trim()}`.trim():s=`${s} ${u.trim()}`.trim():s=u.replace(/^\s*(?:题目|题干)\s*[:：]\s*/,"").trim()}return d(),a.filter(u=>u.q.length>1)}function Jt(t){const e=t.trim();if(!e)return[];if(/^[[{]/.test(e)||/```(?:json)?/i.test(e)||/"(q|question|题目)"\s*:/.test(e)){const n=Ne(e);if(n.length)return n}return ms(e)}function gs(t){for(const e of[fa,ma])try{return e(t)}catch{}return null}function Bt(t){return t.replace(/\\(?:([nrtbf()\\])|([0-7]{1,3}))/g,(e,n,a)=>n?{n:`
`,r:"\r",t:"	",b:"\b",f:"\f","(":"(",")":")","\\":"\\"}[n]??"":String.fromCharCode(parseInt(a??"0",8)))}function tn(t){const e=t.replace(/\s+/g,"");if(e.length%2||!/^[0-9A-Fa-f]+$/.test(e))return"";const n=new Uint8Array(e.length/2);for(let a=0;a<n.length;a++)n[a]=parseInt(e.slice(a*2,a*2+2),16);try{return new TextDecoder("utf-8").decode(n)}catch{return""}}function ce(t){let e="";for(let a=0;a<t.length;a+=32768)e+=String.fromCharCode(...t.subarray(a,a+32768));return e}function en(t){const e=new Uint8Array(t),n=ce(e),a=[],s=/stream\r?\n([\s\S]*?)endstream/g;let o;for(;o=s.exec(n);){const d=n.lastIndexOf("<<",o.index),u=d>=0?n.slice(d,o.index):"",p=o[0].indexOf(`
`),l=o.index+(p>=0?p+1:6);let g=o.index+o[0].length-9;for(;g>l&&(e[g-1]===10||e[g-1]===13||e[g-1]===32||e[g-1]===9);)g--;const y=e.subarray(l,g);if(/FlateDecode/.test(u)){const T=gs(y);T&&a.push(ce(T))}else a.push(ce(y))}const r=a.join(`
`),i=[];for(const d of r.matchAll(/\(((?:\\.|[^()\\])*)\)\s*Tj|<([0-9A-Fa-f\s]+)>\s*Tj/g)){const u=d[1]!==void 0?Bt(d[1]):tn(d[2]);u.trim()&&i.push(u)}for(const d of r.matchAll(/\[((?:\\.|[^\]])*)\]\s*TJ/g)){let u="";for(const p of d[1].matchAll(/\(((?:\\.|[^()\\])*)\)|<([0-9A-Fa-f\s]+)>/g))u+=p[1]!==void 0?Bt(p[1]):tn(p[2]);u.trim()&&i.push(u)}for(const d of r.matchAll(/(?:^|[\r\n])\s*'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)"/g)){const u=d[1]!==void 0?Bt(d[1]):Bt(d[2]);u.trim()&&i.push(u)}const c=bs(i.join(`
`).replace(/[\r\n]{3,}/g,`

`).trim());if(!c)throw new Error("这份 PDF 里没有可提取的文字（多半是扫描件），请截图让我识别，或转成 Word / 文本再导入");return c}function bs(t){if(!/[\u0080-\u00ff]/.test(t))return t;const e=new Uint8Array(t.length);for(let a=0;a<t.length;a++)e[a]=t.charCodeAt(a)&255;const n=new TextDecoder("utf-8").decode(e);return/[\u4e00-\u9fff]/.test(n)?n:t}function nn(t){const e=pa(new Uint8Array(t)),n=e["word/document.xml"];if(!n)throw new Error("这个 docx 里没有正文，另存为 .docx 再试一次");const a=e["word/_rels/document.xml.rels"],s=new Map;if(a){const i=Ke(a);for(const c of i.matchAll(/<Relationship\b[^>]*>/g)){const d=c[0],u=/\bId="([^"]+)"/.exec(d)?.[1],p=/\bTarget="([^"]+)"/.exec(d)?.[1],l=/\bType="([^"]+)"/.exec(d)?.[1]??"";if(!u||!p||!/image/i.test(l))continue;const m=p.startsWith("/")?p.slice(1):`word/${p.replace(/^\.\//,"")}`,g=e[m];g&&s.set(u,`data:${hs(m)};base64,${vs(g)}`)}}return Ke(n).replace(/<a:blip\b[^>]*r:embed="([^"]+)"[^>]*\/?>/g,(i,c)=>{const d=s.get(c);return d?`[[IMG:${d}]]`:""}).replace(/<w:tab\b[^>]*\/>/g,"	").replace(/<w:br\b[^>]*\/>/g,`
`).replace(/<\/w:p>/g,`
`).replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\[\[IMG:([^\]]+)\]\]/g,(i,c)=>`
![docx 图片](${c})
`).replace(/\n{3,}/g,`

`).trim()}function hs(t){const e=t.split(".").pop()?.toLowerCase()??"";return e==="jpg"||e==="jpeg"?"image/jpeg":e==="gif"?"image/gif":e==="bmp"?"image/bmp":e==="webp"?"image/webp":e==="svg"?"image/svg+xml":"image/png"}function vs(t){let e="";for(let a=0;a<t.length;a+=32768)e+=String.fromCharCode(...t.subarray(a,a+32768));return btoa(e)}function an(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("文件读取失败")),a.readAsText(t,"utf-8")})}function Ft(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(a.result),a.onerror=()=>n(new Error("文件读取失败")),a.readAsArrayBuffer(t)})}function sn(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("图片读取失败")),a.readAsDataURL(t)})}function ys(t,e){if(!t.length)return'<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>';const n=t.slice(0,4),a=n.map((r,i)=>{const c=(r.opts??[]).length,d=rn(r),u=(r.q.match(/<img\b/gi)??[]).length,p=r.q.replace(/<img\b[^>]*>/gi," ").replace(/\s+/g," ").trim();return`<li><b>${i+1}.</b> ${$(p).slice(0,90)}${u?`<span class="muted"> · 含 ${u} 张图</span>`:""}${c?`<span class="muted"> · ${c} 个选项</span>`:'<span class="muted"> · 简答</span>'}${d?`<span class="tag-warn">${d}</span>`:""}</li>`}).join(""),s=t.length>n.length?`<li class="muted">…还有 ${t.length-n.length} 道</li>`:"",o=t.map(rn).filter(Boolean).length;return`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${t.length} 道题</span>
      ${o?`<span class="tag tag-warn">${o} 道待确认</span>`:""}
      ${e?`<span class="muted small">${$(e)}</span>`:""}
    </div>
    <ul class="import-list">${a}${s}</ul>`}function rn(t){const e=(t.opts??[]).length,n=t.a;return(Array.isArray(n)?n.length>0:n!==""&&n!==null&&n!==void 0)?e===1?"只有 1 个选项":e>=2&&typeof n=="number"&&(n<0||n>=e)?"答案越界":"":"没识别到答案"}function Wt(t,e){return t==="json"?Ne(e):Jt(e)}async function $s(){const t=document.createElement("div");t.className="import",t.innerHTML=`
    <div class="dropzone" data-role="drop">
      <span class="dz-icon">⇪</span>
      <span class="dz-title">把文件拖进来，或点下面选</span>
      <span class="dz-hint">支持 .json / .txt / .md / .csv / .tsv / .docx / .pdf / 图片，可一次选多个；也能直接 Ctrl+V 粘贴截图</span>
      <div class="dz-actions">
        <button type="button" class="dz-btn" data-role="pick-file">📄 选文件</button>
        <button type="button" class="dz-btn" data-role="pick-image">📷 拍照 / 选图</button>
      </div>
      <input type="file" hidden multiple data-role="file"
             accept=".json,.txt,.md,.csv,.tsv,.docx,.pdf">
      <input type="file" hidden multiple data-role="image" accept="image/*">
    </div>
    <div class="import-or"><span>或者直接粘贴文字</span></div>
    <textarea class="textarea import-text" data-role="text" rows="7"
      placeholder="1. 普通硅酸盐水泥的初凝时间不得早于？&#10;A. 45min&#10;B. 60min&#10;C. 90min&#10;D. 30min&#10;答案：A&#10;章节：建筑材料"></textarea>
    <div class="import-preview" data-role="preview"></div>`;const e=t.querySelector('[data-role="drop"]'),n=t.querySelector('[data-role="file"]'),a=t.querySelector('[data-role="image"]'),s=t.querySelector('[data-role="text"]'),o=t.querySelector('[data-role="preview"]');let r=[],i="",c="",d=!1;const u=()=>{o.innerHTML=ys(r,c||(i?"图片将由 AI 识别":""));const b=document.querySelector('[data-idx="1"]');b&&(b.textContent=r.length?`导入 ${r.length} 道题`:"AI 解析并导入")},p=(b,w,k)=>{s.value=b,r=Wt(w,b),c=k,u()},l=async()=>{const b=s.value.trim();if(!b&&!i)return[];h.info(i?"AI 正在识别图片…":"AI 正在解析文字…");const w=await L.ai.extract({...b?{prompt:b}:{},...i?{imageBase64:i}:{}});return Jt(w.result??"")},m=async b=>{const w=Ze(b);try{if(w==="image"){i=await sn(b),r=[],c=`${b.name}（${Math.round(b.size/1024)}KB，AI 识别）`,u();try{r=await l(),r.length||h.error("这张图没读出题目，换张更清晰的试试")}catch(x){h.error(x instanceof j?x.message:"AI 识别失败")}u();return}if(w==="docx"){const x=await Ft(b);p(nn(x),"docx",b.name);return}if(w==="pdf"){const x=await Ft(b);p(en(x),"text",b.name);return}if(w==="unknown"){h.error("这种文件识别不了，换成 txt / json / docx / pdf / 图片试试");return}const k=await an(b);p(k,w,b.name)}catch(k){h.error(k instanceof Error?k.message:"文件解析失败")}},g=async b=>{if(!b.length)return;if(b.length===1){await m(b[0]);return}const w=[],k=[];for(const x of b)try{const M=Ze(x);if(M==="image"){const F=await sn(x),st=await L.ai.extract({imageBase64:F});w.push(...Jt(st.result??"")),k.push(x.name);continue}if(M==="docx"){w.push(...Wt("docx",nn(await Ft(x)))),k.push(x.name);continue}if(M==="pdf"){w.push(...Wt("text",en(await Ft(x)))),k.push(x.name);continue}if(M==="unknown"){h.error(`${x.name}：这种文件识别不了，先跳过`);continue}w.push(...Wt(M,await an(x))),k.push(x.name)}catch(M){h.error(`${x.name} 没读出来：${M instanceof Error?M.message:"格式不对"}`)}r=w,i="",c=`${b.length} 个文件（${k.join("、")}）`,s.value="",u()};n.addEventListener("change",()=>{g([...n.files??[]])}),a.addEventListener("change",()=>{g([...a.files??[]])}),t.querySelector('[data-role="pick-file"]').addEventListener("click",b=>{b.stopPropagation(),n.click()}),t.querySelector('[data-role="pick-image"]').addEventListener("click",b=>{b.stopPropagation(),a.click()}),e.addEventListener("click",b=>{b.target.closest(".dz-btn")||n.click()});for(const b of["dragenter","dragover"])e.addEventListener(b,w=>{w.preventDefault(),e.classList.add("is-over")});for(const b of["dragleave","drop"])e.addEventListener(b,w=>{w.preventDefault(),e.classList.remove("is-over")});e.addEventListener("drop",b=>{const w=[...b.dataTransfer?.files??[]];g(w)}),s.addEventListener("paste",b=>{const k=[...b.clipboardData?.items??[]].find(M=>M.kind==="file"&&M.type.startsWith("image/"));if(!k)return;const x=k.getAsFile();x&&(b.preventDefault(),m(x))});let y=0;if(s.addEventListener("input",()=>{window.clearTimeout(y),y=window.setTimeout(()=>{r=Jt(s.value),i="",c="",u()},280)}),!(!await C({title:"导入题库",body:t,actions:[{label:"取消",value:!1},{label:"导入",value:!0,variant:"primary"}],onMount:()=>u()})||d))try{const b=r.length?r:await l();if(!b.length){h.error("没解析出题目，检查一下格式，或换张更清晰的图");return}d=!0;const w=await L.questions.add(b);X("bank"),await ct(!0),h.ok(`已导入 ${w.added??b.length} 道题`)}catch(b){h.error(b instanceof j?b.message:"导入失败")}}const ve="#0a0c0f",it="#8b9099",ws="#ffffff",Nt="#1440ff";function _e(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ie(t,e,n,a){const s=a?`<text x="${t/2}" y="${e-12}" text-anchor="middle" font-size="12.5" fill="${it}" stroke="none">${_e(a)}</text>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${e}" viewBox="0 0 ${t} ${e}" fill="none">
  <rect width="${t}" height="${e}" fill="${ws}"/>
  <g stroke="${ve}" stroke-width="1.6" stroke-linecap="square" color="${ve}" font-family="system-ui,-apple-system,'Segoe UI',sans-serif">
  ${n}
  ${s}
  </g>
</svg>`}function xs(t){const n=t.caption?210:186,a=Number(t.span)>0?Number(t.span):6,s=Number(t.value)>0?Number(t.value):20,o=44,r=316,i=96,c=(o+r)/2,d=t.load==="point"?"kN":"kN/m",u=t.load==="point"?`P = ${s} ${d}`:`q = ${s} ${d}`,p=[];if(t.load==="point")p.push(`<path d="M${c} 44 V${i-6}"/><path d="M${c-5} ${i-14} L${c} ${i-4} L${c+5} ${i-14}"/>`);else{for(let l=0;l<=8;l+=1){const m=o+(r-o)*l/8;p.push(`<path d="M${m} 56 V${i-10}"/><path d="M${m-4} ${i-18} L${m} ${i-9} L${m+4} ${i-18}"/>`)}p.push(`<path d="M${o} 56 H${r}"/>`)}return Ie(360,n,`${p.join("")}
  <path d="M${o} ${i} H${r}"/>
  <path d="M${o} ${i} l-9 15 h18 z"/>
  <path d="M${r} ${i} l-9 15 h18 z">
  </path>
  <path d="M${o} ${i+15} H${r}" stroke="${it}" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="${c}" y="46" text-anchor="middle" font-size="12" fill="${Nt}" stroke="none">${_e(u)}</text>
  <text x="${c}" y="${i+34}" text-anchor="middle" font-size="12" fill="${it}" stroke="none">L = ${a} m</text>`,t.caption)}function ks(t){const n=t.caption?220:196,a=Number(t.width)>0?Number(t.width):300,s=Number(t.height)>0?Number(t.height):500,o=132,r=92,i=(300-o)/2,c=62;return Ie(300,n,`<text x="${300/2}" y="40" text-anchor="middle" font-size="12" fill="${Nt}" stroke="none">截面示意图（单位 mm）</text>
  <rect x="${i}" y="${c}" width="${o}" height="${r}"/>
  <path d="M${i-12} ${c} H${i-12} V${c+r} H${i-12}" stroke="${it}" stroke-width="1"/>
  <text x="${i-18}" y="${c+r/2}" text-anchor="middle" font-size="11" fill="${it}" stroke="none" transform="rotate(-90 ${i-18} ${c+r/2})">h = ${s}</text>
  <text x="${300/2}" y="${c+r+22}" text-anchor="middle" font-size="11" fill="${it}" stroke="none">b = ${a}</text>`,t.caption)}function Ss(t){const e=(t.steps??[]).filter(u=>u&&u.name).slice(0,6),n=360,s=74+Math.max(1,e.length)*30+(t.caption?22:6),o=Math.max(1,...e.map(u=>Number(u.start)+Number(u.duration))),r=92,i=n-24,c=(i-r)/o,d=e.map((u,p)=>{const l=62+p*30,m=r+Number(u.start)*c,g=Math.max(6,Number(u.duration)*c);return`<text x="${r-10}" y="${l+11}" text-anchor="end" font-size="11" fill="${ve}" stroke="none">${_e(u.name)}</text>
  <rect x="${m}" y="${l}" width="${g}" height="14" fill="${Nt}" opacity="0.12" stroke="${Nt}" stroke-width="1"/>
  <text x="${m+g/2}" y="${l+11}" text-anchor="middle" font-size="10" fill="${Nt}" stroke="none">${u.duration}</text>`}).join(`
  `);return Ie(n,s,`<text x="${r}" y="38" font-size="11" fill="${it}" stroke="none">施工进度（天）→</text>
  <path d="M${r} 48 H${i}" stroke="${it}" stroke-width="1"/>
  ${d}`,t.caption)}function As(t){if(!t||!t.kind)return"";let e="";return t.kind==="beam"?e=xs(t):t.kind==="section"?e=ks(t):t.kind==="flow"&&(e=Ss(t)),e?`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`:""}function Es(t){if(!t||typeof t!="object")return null;const e=t,n=String(e.kind??e.type??"").toLowerCase();if(n!=="beam"&&n!=="section"&&n!=="flow")return null;const a=r=>{const i=Number(r);return Number.isFinite(i)&&i>0?i:void 0},s=String(e.load??"").toLowerCase(),o=Array.isArray(e.steps)?e.steps.map(r=>({name:String(r.name??r.title??""),start:Number(r.start??0),duration:Number(r.duration??0)})).filter(r=>r.duration>0):void 0;return{kind:n,caption:typeof e.caption=="string"?e.caption.slice(0,40):void 0,span:a(e.span),load:s==="point"?"point":s==="uniform"?"uniform":void 0,value:a(e.value),width:a(e.width),height:a(e.height),steps:o}}const Ts=[10,20,50,100,200,500,1e3],on=20,Ls=1e3,cn=t=>new Promise(e=>setTimeout(e,t));function ln(t){return N(t).replace(/^【[^】]*】/,"").replace(/[\s，。、；：？！,.;:?!'"“”‘’()（）\[\]【】]/g,"").slice(0,40)}async function js(){const t=f.bank??[],e=document.createElement("div");if(e.innerHTML=`
    <label class="field">
      <span class="field-label">想要什么题 <span class="muted small">（学科、题型、难度、考点，一句话说清楚）</span></span>
      <textarea class="textarea" data-role="ask" rows="4" placeholder="例如：初级会计的增值税计算题，难度中等
再如：高中生物光合作用的选择题，带解析
又如：英语四级词汇题，50 道四选一"></textarea>
    </label>
    <label class="field" style="margin-top:10px">
      <span class="field-label">数量</span>
      <select class="input" data-role="count">
        ${Ts.map(A=>`<option value="${A}"${A===50?" selected":""}>${A} 道</option>`).join("")}
      </select>
    </label>
    <p class="muted small" style="margin:10px 0 0">
      AI 会按你的描述出题，学科、题型、难度都由你说了算；没提到的部分按默认（单选、四选项、基础难度）。
      按每批 ${on} 道分批生成，边生成边去重；生成完你可以先看前 12 道再决定是否入库。
      数量越多越慢（100 道约 1–2 分钟），中途可取消。
    </p>`,!await C({title:"AI 出题",body:e,actions:[{label:"取消",value:!1},{label:"开始生成",value:!0,variant:"primary"}]}))return;const a=e.querySelector('[data-role="ask"]')?.value.trim()??"";if(!a){h.error("先描述一下你想要什么题");return}const s=Math.min(Ls,Math.max(1,Number(e.querySelector('[data-role="count"]')?.value)||20)),o=document.createElement("div");o.innerHTML=`
    <div class="gen-progress">
      <div class="gen-bar"><i data-role="bar" style="width:0%"></i></div>
      <div class="row" style="justify-content:space-between;margin-top:8px">
        <span class="muted small" data-role="line">准备中…</span>
        <span class="muted small" data-role="pct">0%</span>
      </div>
    </div>
    <div class="import-list gen-scroll" data-role="feed" style="margin-top:12px"></div>`;const r=()=>o.querySelector('[data-role="bar"]'),i=()=>o.querySelector('[data-role="line"]'),c=()=>o.querySelector('[data-role="pct"]'),d=()=>o.querySelector('[data-role="feed"]');let u=!1,p="";const l=(A,_,G="")=>{const wt=Math.min(100,Math.round(A/Math.max(1,_)*100));r().style.width=`${wt}%`,c().textContent=`${wt}%`,i().textContent=`已生成 ${A} / ${_} 道${G?` · ${G}`:""}`},m=A=>{const _=document.createElement("div");_.className="import-item gen-item";const G=N(A.q).replace(/\s+/g," ").slice(0,56);for(_.innerHTML=`<div class="gen-row"><span class="gen-text">${$(G)}</span></div>`,d().prepend(_);d().childElementCount>12;)d().lastElementChild?.remove()};C({title:"正在生成",body:o,dismissible:!1,onMount:A=>{const _=document.createElement("button");_.className="btn btn-block",_.textContent="取消生成",_.addEventListener("click",()=>{u=!0,_.textContent="正在停止…"}),A.append(_)},actions:[]});const g=new Set(t.map(A=>ln(A.q??""))),y=[];let T=0,b=0,w=0,k=0,x=0;const M=2,F=async A=>{if(u||y.length>=s)return;const _=Math.min(on,s-y.length),G=[...y.slice(-6),...t.slice(0,6)].map(R=>`· ${N(R.q).slice(0,40)}`),wt=[`出题需求：${a}`,`本批数量：${_} 道`,A?`这是第 ${A+1} 批，请换一批考点，不要重复前面出过的题。`:"",G.length?`不要与这些题相同或近似：
${G.join(`
`)}`:""].filter(Boolean).join(`
`);let Tt=[];try{const R=await L.ai.generate(wt);Tt=Ne(R.result??""),w=0}catch(R){w+=1;const xt=R instanceof j?R.message:"网络异常";p=xt,/次数|配额|429/.test(xt)&&(u=!0);return}if(!Tt.length){w+=1,w>=3&&(p="模型没有返回可用题目，先停在这里");return}const ia=y.length;for(const R of Tt){if(y.length>=s)break;const xt=ln(R.q);if(!xt||g.has(xt)){b+=1;continue}g.add(xt);const Be=Es(R.figure),Fe=As(Be);if(Fe){T+=1;const ca=(Be?.caption??"示意图").replace(/"/g,"");y.push({...R,q:`${R.q}
<img src="${Fe}" alt="${ca}">`})}else y.push(R);m(R)}k=y.length>ia?0:k+1,k>=3&&(u=!0,p="模型开始重复出同一批题，先停在这里"),l(y.length,s,b?`去重 ${b} 道`:"")},st=async()=>{for(;!u&&y.length<s;){const A=x;x+=1,await F(A),await cn(60)}};if(await Promise.all(Array.from({length:M},()=>st())),te(),await cn(180),!y.length){h.error(p||"一道题也没生成出来，换个提示再试");return}const ut=document.createElement("div");if(ut.innerHTML=`
    <div class="muted small" style="margin-bottom:8px">
      共 ${y.length} 道${T?`（${T} 道带示意图）`:""}${b?`，自动去重 ${b} 道`:""}${p?` · 提前结束：${$(p)}`:""}，确认后写入题库（科目由 AI 按题目内容归类）
    </div>
    <div class="import-list gen-scroll">
      ${y.slice(0,12).map((A,_)=>{const G=/<img\b[^>]*src="([^"]+)"/i.exec(String(A.q??"")),wt=G?`<img class="gen-thumb" src="${G[1]}" alt="示意图">`:"",Tt=N(A.q).replace(/\s+/g," ").slice(0,64);return`<div class="import-item gen-item"><div class="gen-row">${wt}<span class="gen-text"><b>${_+1}.</b> ${$(Tt)}${Array.isArray(A.opts)&&A.opts.length?` <span class="muted">· ${A.opts.length} 选项</span>`:""}</span></div></div>`}).join("")}
      ${y.length>12?`<div class="muted small" style="padding:8px 2px">还有 ${y.length-12} 道未展示…</div>`:""}
    </div>`,!await C({title:"确认导入",body:ut,actions:[{label:"不要了",value:!1},{label:`导入 ${y.length} 道`,value:!0,variant:"primary"}]}))return;const yt=y.map(A=>({...A,subject:A.subject||"默认题库",chapter:A.chapter||""}));let $t=0;try{for(let A=0;A<yt.length;A+=20){const _=yt.slice(A,A+20);await L.questions.add(_),$t+=_.length,h.info(`已写入 ${$t} / ${yt.length} 道`)}X("bank"),await ct(!0),h.ok(`已导入 ${$t} 道题`)}catch(A){h.error(A instanceof j?A.message:`导入中断，已写入 ${$t} 道`),X("bank")}}const Ms=`
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
`;function jt(t){return String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]??e)}function dn(t,e={}){if(!t.length){h.info("没有可导出的题目");return}const n=e.title||"练习试卷",a=new Date().toLocaleDateString("zh-CN"),s=e.answers!==!1,o=t.map((d,u)=>{const p=K(d),l=(d.opts??[]).map((m,g)=>{const y=m.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return`<li><span class="k">${String.fromCharCode(65+g)}</span>${O(y)}</li>`}).join("");return`<article class="q">
        <div class="q-no">${String(u+1).padStart(2,"0")} · ${vt[p]}${d.chapter?` · ${jt(d.chapter)}`:""}</div>
        <div class="q-body">${O(d.q)}</div>
        ${l?`<ul class="q-opts">${l}</ul>`:'<p class="q-tag">（简答题，请在答题纸上作答）</p>'}
      </article>`}).join(""),r=s?`<section class="answer-key">
        <h2>参考答案</h2>
        <ol>${t.map((d,u)=>`<li><span class="k">${String(u+1).padStart(2,"0")}</span>${jt(W(d.a,d.opts??[]))}</li>`).join("")}</ol>
      </section>`:"",i=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${jt(n)} · ${a}</title>
<style>${Ms}</style></head>
<body>
  <header class="sheet-head">
    <div class="sheet-kicker">基准 DATUM / Practice Sheet</div>
    <h1 class="sheet-title">${jt(n)}</h1>
    <div class="sheet-meta">${a} · 共 ${t.length} 题${e.subtitle?" · "+jt(e.subtitle):""} · 姓名 __________ 得分 ______</div>
  </header>
  ${o}
  ${r}
  <p class="tips">由「基准」导出 · 打印对话框里选择「另存为 PDF」即可保存。</p>
</body></html>`,c=window.open("","_blank");if(!c){h.error("浏览器拦住了新窗口，请允许弹出窗口后重试");return}c.document.open(),c.document.write(i),c.document.close(),c.focus(),h.ok(`已生成 ${t.length} 题的打印版，在打印里选「另存为 PDF」`)}const On=914400,qs=6.4*On,Cs=4.2*On,Ns=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function Pn(t,e={}){return`<w:r><w:rPr>${['<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>',e.bold?"<w:b/>":"",e.italic?"<w:i/>":"",`<w:sz w:val="${e.size??21}"/><w:szCs w:val="${e.size??21}"/>`,e.color?`<w:color w:val="${e.color}"/>`:""].join("")}</w:rPr><w:t xml:space="preserve">${Ns(t)}</w:t></w:r>`}function Y(t,e={}){const n=e.before||e.after?`<w:spacing w:before="${e.before??0}" w:after="${e.after??0}"/>`:"",a=e.indent||e.hanging?`<w:ind w:left="${e.indent??0}" w:hanging="${e.hanging??0}"/>`:"";return`<w:p><w:pPr>${n}${a}</w:pPr>${t?Pn(t,e):""}</w:p>`}function _s(t,e,n,a){return`<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${Math.round(n)}" cy="${Math.round(a)}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${e}" name="Picture ${e}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${e}" name="image${e}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${t}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${Math.round(n)}" cy="${Math.round(a)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`}function Is(t){return new Promise(e=>{const n=new Image;n.onload=()=>e({w:n.naturalWidth||640,h:n.naturalHeight||480}),n.onerror=()=>e(null),n.src=t})}function Ds(t){const e=/^data:image\/([a-zA-Z+]+);base64,(.+)$/.exec(t);if(!e)return null;try{const n=atob(e[2]),a=new Uint8Array(n.length);for(let o=0;o<n.length;o+=1)a[o]=n.charCodeAt(o);const s=e[1].toLowerCase()==="jpeg"?"jpeg":e[1].toLowerCase();return{bytes:a,ext:s}}catch{return null}}function Os(t){const e=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html"),n=[],a=s=>{if(s.nodeType===Node.TEXT_NODE){const r=s.textContent??"";r.trim()&&n.push({kind:"text",value:r.replace(/\s+/g," ")});return}if(s.nodeType!==Node.ELEMENT_NODE)return;const o=s;if(o.tagName==="IMG"){n.push({kind:"img",value:o.getAttribute("src")??""});return}if(o.tagName==="BR"){n.push({kind:"br",value:""});return}o.childNodes.forEach(a)};return e.body.firstElementChild?.childNodes.forEach(a),n}async function Ps(t,e){const n=[],a=[];let s=0;n.push(Y(e.title??"题库练习卷",{size:32,bold:!0,after:80}));const o=[e.subtitle??"",`${t.length} 题`,"姓名 ________","得分 ________"].filter(Boolean).join("　　");n.push(Y(o,{size:18,color:"666666",after:200}));for(let l=0;l<t.length;l+=1){const m=t[l],g=K(m),y=String(l+1).padStart(2,"0");n.push(Y(`${y}　${vt[g]}${m.chapter?"　·　"+m.chapter:""}`,{size:18,bold:!0,color:"1440FF",before:200,after:60}));const T=Os(m.q);let b="";const w=()=>{b.trim()&&n.push(Y(b.trim(),{after:60})),b=""};for(const k of T)if(k.kind==="text")b+=k.value;else if(k.kind==="br")w();else{w();const x=Ds(k.value);if(!x)continue;const F=await Is(k.value)??{w:640,h:480};let st=F.w*9525,ut=F.h*9525;const ae=Math.min(qs/st,Cs/ut,1);st*=ae,ut*=ae,s+=1;const yt=`rId${100+s}`,$t=`image${s}.${x.ext}`;a.push({relId:yt,name:$t,bytes:x.bytes,cx:st,cy:ut,id:s}),n.push(_s(yt,s,st,ut))}if(w(),Array.isArray(m.opts)&&m.opts.length)m.opts.forEach((k,x)=>{const M=String.fromCharCode(65+x),F=String(k).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");n.push(Y(`${M}. ${F}`,{size:20,hanging:280,indent:280,after:20}))});else if(g==="blank")n.push(Y("答：________________________________",{after:40}));else if(g==="essay"){for(let k=0;k<3;k+=1)n.push(Y("　",{after:60}));n.push(Y("（请在答题纸上作答）",{size:18,color:"999999",after:40}))}}e.withAnswers!==!1&&(n.push(`<w:p><w:pPr><w:pageBreakBefore/></w:pPr>${Pn("参考答案",{size:28,bold:!0})}</w:p>`),t.forEach((l,m)=>{const g=String(m+1).padStart(2,"0");n.push(Y(`${g}　${W(l.a,l.opts)||"（无）"}`,{size:20,after:40}))}));const r=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>${n.join("")}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="851" w:footer="992" w:gutter="0"/></w:sectPr></w:body></w:document>`,i='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',c='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',d='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+a.map(l=>`<Relationship Id="${l.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${l.name}"/>`).join("")+"</Relationships>",u={"[Content_Types].xml":Ht(i),"_rels/.rels":Ht(c),"word/document.xml":Ht(r),"word/_rels/document.xml.rels":Ht(d)};for(const l of a)u[`word/media/${l.name}`]=l.bytes;const p=ga(u,{level:6});return new Blob([p],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})}async function un(t,e={}){if(!t.length){h.error("没有可导出的题目");return}try{const n=await Ps(t,e),a=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,10);s.href=a,s.download=`${(e.title??"题库试卷").replace(/[\\/:*?"<>|]/g,"-")}-${o}.docx`,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(a),4e3),h.ok(`已导出 ${t.length} 题的 Word 文档`)}catch(n){h.error(n instanceof Error?`导出失败：${n.message}`:"导出失败")}}function Rs(t){const e=t.replace(/```json/gi,"```").trim(),n=/```([\s\S]*?)```/.exec(e)?.[1]??e,a=n.indexOf("{"),s=n.lastIndexOf("}");return a===-1||s<=a?"{}":n.slice(a,s+1)}const rt=20,v={search:"",subject:"all",type:"all",edit:!1,page:0,selected:new Set};function Rn(){v.search="",v.subject="all",v.type="all",v.edit=!1,v.page=0,v.selected.clear()}function ot(){return f.bank??[]}function Hs(){return["all",...Array.from(new Set(ot().map(t=>t.subject||"默认题库")))]}function Vt(){const t=v.search.trim().toLowerCase();return ot().filter(e=>v.subject!=="all"&&(e.subject||"默认题库")!==v.subject||v.type!=="all"&&K(e)!==v.type?!1:t?N(e.q).toLowerCase().includes(t)||e.opts.some(n=>N(n).toLowerCase().includes(t)):!0)}function Hn(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(n=>String.fromCharCode(65+n)).join(" / ")}function Us(){const t=Vt(),e=Math.max(1,Math.ceil(t.length/rt));v.page>e-1&&(v.page=e-1),v.page<0&&(v.page=0);const n=t.slice(v.page*rt,v.page*rt+rt),a=Hs().map(d=>`<button class="chip" data-act="subject" data-subject="${$(d)}" aria-pressed="${v.subject===d}">
          ${d==="all"?"全部":$(d)}
        </button>`).join(""),s=ot(),o={single:0,multi:0,judge:0,blank:0,essay:0};s.forEach(d=>{o[K(d)]+=1});const r=[["all","全部",s.length],["single","单选",o.single],["multi","多选",o.multi],["judge","判断",o.judge],["blank","填空",o.blank],["essay","简答",o.essay]].filter(([d,,u])=>d==="all"||u>0).map(([d,u,p])=>`<button class="chip" data-act="type" data-type="${d}" aria-pressed="${v.type===d}">${u} <span class="chip-n">${p}</span></button>`).join(""),i=n.map((d,u)=>{const p=K(d),l=String(v.page*rt+u+1).padStart(2,"0");return`<tr class="q-row ${v.edit?"selectable":"is-clickable"}" data-id="${d.id}" ${v.edit?"":'data-act="peek"'}>
        <td class="c-no">${v.edit?`<button class="checkbox" data-act="select" data-id="${d.id}" aria-pressed="${v.selected.has(d.id)}">✓</button>`:l}</td>
        <td class="c-q">
          <div class="q-cell">${_n(O(d.q),v.search)}</div>
          ${d.opts.length?`<div class="q-sub">${d.opts.length} 个选项</div>`:""}
        </td>
        <td class="c-type"><span class="tag tag-type">${vt[p]}</span></td>
        <td class="c-chapter muted">${$(d.chapter||"—")}</td>
        <td class="c-ans"><span class="tag tag-ok">${$(Hn(d))}</span></td>
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
                 <button class="btn btn-sm" data-act="page-prev" ${v.page===0?"disabled":""}>← 上一页</button>
                 <span class="pager-info">${v.page+1} / ${e} 页 · 共 ${t.length} 题</span>
                 <button class="btn btn-sm" data-act="page-next" ${v.page>=e-1?"disabled":""}>下一页 →</button>
               </div>`:`<p class="muted small table-count">共 ${t.length} 题</p>`}`:`<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${v.search?"没有匹配的题目":"题库还是空的"}</div><div class="empty-desc">${v.search?"换个关键词试试":"点右上角「⇪」导入 JSON / TXT / Word / 图片，或点「＋」手写"}</div></div>`;return`
    <h1 class="page-title">题库</h1>
    <div class="search-box">
      <span class="ico">⌕</span>
      <input type="search" placeholder="搜索题干或选项（/ 聚焦）" data-role="search" value="${$(v.search)}" enterkeyhint="search">
    </div>
    <div class="tool-row">
      <button class="tool-btn" data-act="import" title="导入题库">⇪<span>导入</span></button>
      <button class="tool-btn" data-act="generate" title="AI 出题">✦<span>出题</span></button>
      <button class="tool-btn" data-act="add" title="添加题目">＋<span>新建</span></button>
      <button class="tool-btn" data-act="print" title="导出试卷（打印 / 存 PDF）">⎙<span>试卷</span></button>
      <button class="tool-btn" data-act="docx" title="导出 Word（.docx）">⤓<span>Word</span></button>
      <button class="tool-btn" data-act="toggle-edit" title="批量管理">${v.edit?"✓":"☰"}<span>批量</span></button>
    </div>
    <div class="chips">${a}</div>
    <div class="chips chips-type">${r}</div>
    ${v.edit?`<div class="row between" style="margin-bottom:12px">
        <button class="btn btn-sm btn-ghost" data-act="select-all">${v.selected.size===t.length&&t.length?"取消全选":"全选本页"}</button>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export" ${v.selected.size?"":"disabled"}>导出 JSON</button>
          <button class="btn btn-sm" data-act="print-selected" ${v.selected.size?"":"disabled"}>导出试卷</button>
          <button class="btn btn-sm" data-act="docx-selected" ${v.selected.size?"":"disabled"}>导出 Word</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${v.selected.size?"":"disabled"}>删除</button>
        </div>
      </div>`:""}
    ${c}`}async function ye(t){const e=!t,n={editor:null},a=document.createElement("div");if(a.innerHTML=`
    <label class="field">
      <span class="field-label">题干</span>
      <div data-role="q-host"></div>
    </label>
    <div class="row" style="gap:8px;margin-top:-8px;flex-wrap:wrap">
      <span class="muted small">粗体 / 上下标 / 列表 / ∑ 公式 / ▣ 图片（自动压缩内联）</span>
    </div>
    <label class="field">
      <span class="field-label">选项（每行一个，留空表示简答题）</span>
      <textarea class="textarea" data-role="opts" placeholder="A. 选项一&#10;B. 选项二">${$((t?.opts??[]).join(`
`))}</textarea>
    </label>
    <label class="field">
      <span class="field-label">题型 <span class="muted small">（自动识别不准时手动指定）</span></span>
      <select class="input" data-role="type">
        ${Ya.map(l=>`<option value="${l.value}"${(t?.type??"")===l.value?" selected":""}>${l.label}</option>`).join("")}
      </select>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>
      <input class="input" data-role="a" value="${$(t?Hn(t):"")}" placeholder="A">
    </label>
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">章节</span>
        <input class="input" data-role="chapter" value="${$(t?.chapter??"")}" placeholder="如 第三章">
      </label>
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${$(t?.subject??"默认题库")}" placeholder="默认题库">
      </label>
    </div>
    <label class="field">
      <span class="field-label">解析 <span class="muted small">（错题复习时直接看，不用每次问 AI）</span></span>
      <textarea class="textarea" data-role="explain" rows="3" placeholder="为什么选它、其他选项错在哪">${$(t?.explain??"")}</textarea>
    </label>
    <div class="row" style="justify-content:flex-end;gap:8px;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="gen-explain">✦ 生成解析</button>
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`,!await C({title:e?"添加题目":"编辑题目",body:a,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:l=>{const m=l.querySelector('[data-role="q-host"]');m&&(n.editor=rs({value:t?.q??"",placeholder:"输入题干；可用工具栏插图、写公式（$…$）",minHeight:110}),m.appendChild(n.editor.el));const g=l.querySelector('[data-role="gen-explain"]');g?.addEventListener("click",async()=>{const T=N(n.editor?.getValue()??"").trim(),b=l.querySelector('[data-role="opts"]')?.value??"",w=l.querySelector('[data-role="a"]')?.value??"";if(!T){h.error("先写题干，AI 才能写解析");return}const k=l.querySelector('[data-role="explain"]'),x=g.textContent??"";g.disabled=!0,g.textContent="生成中…";try{const M=await L.ai.explain(`题目：${T}
选项：${b.split(`
`).join("；")}
正确答案：${w}`);k&&(k.value=(M.result??"").trim()),h.ok("解析已生成，可再手动润色")}catch(M){h.error(M instanceof j?M.message:"生成失败")}finally{g.disabled=!1,g.textContent=x}});const y=l.querySelector('[data-role="classify"]');y&&y.addEventListener("click",async()=>{const T=N(n.editor?.getValue()??"").trim();if(!T){h.error("先写题干，AI 才能判断归类");return}const b=l.querySelector('[data-role="opts"]')?.value??"",w=y.textContent??"";y.disabled=!0,y.textContent="归类中…";try{const k=await L.ai.classify(`题目：${T}
选项：${b.split(`
`).join("；")}`),x=JSON.parse(Rs(k.result??"{}")),M=l.querySelector('[data-role="subject"]'),F=l.querySelector('[data-role="chapter"]');x.subject&&M&&(M.value=String(x.subject).slice(0,24)),x.chapter&&F&&(F.value=String(x.chapter).slice(0,24)),h.ok("已根据题目填入题库与章节")}catch{h.error("AI 归类失败，可手动填写")}finally{y.disabled=!1,y.textContent=w}})}}))return;const o=l=>a.querySelector(`[data-role="${l}"]`).value,r=(n.editor?.getValue()??"").trim();if(!N(r).trim()&&!/<img/i.test(r)){h.error("题干不能为空");return}const i=o("opts").split(`
`).map(l=>l.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),c=o("a").trim();let d="";if(i.length){const m=c.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(g=>g.charCodeAt(0)-65).filter(g=>g>=0&&g<i.length);if(!m.length){h.error("答案请填选项字母，如 A 或 A,B");return}d=m.length===1?m[0]:m}else d=c;const u=a.querySelector('[data-role="type"]'),p={q:r,opts:i,a:d,chapter:o("chapter").trim(),subject:o("subject").trim()||"默认题库",explain:o("explain").trim(),type:u?.value??""};try{if(e)await L.questions.add([p]);else try{await L.questions.update(t.id,p,{baseUpdatedAt:t.updated_at})}catch(l){if(l instanceof j&&l.status===409){if(!await lt({title:"这道题在别处被改过",message:"另一台设备保存了这题的更新版本。要用你现在的内容覆盖它吗？",okText:"覆盖",danger:!0}))return;await L.questions.update(t.id,p,{force:!0})}else throw l}X("bank"),await ct(!0),h.ok(e?"题目已添加":"题目已保存")}catch(l){h.error(l instanceof j?l.message:"保存失败")}}async function zs(){await $s()}function Bs(){const t=ot().filter(s=>v.selected.has(s.id));if(!t.length){h.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=`题库-${t.length}题.json`,a.click(),URL.revokeObjectURL(n),h.ok(`已导出 ${t.length} 题`)}async function Fs(){await ct()}async function Ws(t,e){switch(t){case"subject":return v.subject=e.dataset.subject??"all",!0;case"toggle-edit":return v.edit=!v.edit,v.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return v.selected.has(n)?v.selected.delete(n):v.selected.add(n),!0}case"add":return await ye(),!0;case"edit":{const n=ot().find(a=>a.id===Number(e.dataset.id));return n&&await ye(n),!0}case"delete-selected":{const n=[...v.selected];if(!n.length||!await lt({title:"删除题目",message:`确定删除选中的 ${n.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await L.questions.remove(n),v.selected.clear(),X("bank"),await ct(!0),h.ok("已删除")}catch(a){h.error(a instanceof j?a.message:"删除失败")}return!0}case"export":return Bs(),!0;case"print":return dn(Vt(),{title:`题库 · ${v.subject==="all"?"全部":v.subject}`}),!0;case"docx":return await un(Vt(),{title:`题库 · ${v.subject==="all"?"全部":v.subject}`,subtitle:"基准"}),!0;case"docx-selected":return await un(ot().filter(n=>v.selected.has(n.id)),{title:"选中题目 · 试卷",subtitle:"基准"}),!0;case"print-selected":return dn(ot().filter(n=>v.selected.has(n.id)),{title:"选中题目 · 试卷"}),!0;case"page-prev":return v.page=Math.max(0,v.page-1),!0;case"page-next":return v.page+=1,!0;case"select-all":{const n=Vt().slice(v.page*rt,v.page*rt+rt),a=n.every(s=>v.selected.has(s.id));return n.forEach(s=>a?v.selected.delete(s.id):v.selected.add(s.id)),!0}case"generate":return await js(),!0;case"import":return await zs(),!0;case"type":{const n=e.dataset.type;return n&&(v.type=n,v.page=0),!0}case"peek":{const n=Number(e.dataset.id),a=ot().find(s=>s.id===n);return a&&await Ks(a),!0}case"search":return!0;default:return!1}}async function Ks(t){const e=K(t),n=document.createElement("div");n.className="peek",n.innerHTML=`
    <div class="peek-meta">
      <span class="tag tag-type">${vt[e]}</span>
      ${t.subject?`<span class="tag">${$(t.subject)}</span>`:""}
      ${t.chapter?`<span class="tag">${$(t.chapter)}</span>`:""}
    </div>
    <div class="peek-q q-text">${O(t.q)}</div>
    ${t.opts.length?`<ul class="peek-opts">${t.opts.map((s,o)=>`<li class="${(Array.isArray(t.a)?t.a.includes(o):t.a===o)?"is-hit":""}"><b>${String.fromCharCode(65+o)}</b>${O(String(s).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</li>`).join("")}</ul>`:""}
    <div class="peek-ans"><span class="muted">答案</span> ${$(W(t.a,t.opts)||"（无）")}</div>`,await C({title:"题目预览",body:n,actions:[{label:"关闭",value:"close"},{label:"编辑这题",value:"edit",variant:"primary"}]})==="edit"&&await ye(t)}function Gs(t){return t.dataset.role==="search"?(v.search=t.value,v.page=0,!0):!1}const Js="modulepreload",Vs=function(t){return"/"+t},pn={},Xs=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let r=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");s=r(n.map(d=>{if(d=Vs(d),d in pn)return;pn[d]=!0;const u=d.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const l=document.createElement("link");if(l.rel=u?"stylesheet":Js,u||(l.as="script"),l.crossOrigin="",l.href=d,c&&l.setAttribute("nonce",c),document.head.appendChild(l),u)return new Promise((m,g)=>{l.addEventListener("load",m),l.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return s.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function Un(t){return new Promise(e=>window.setTimeout(e,t))}function Qs(t,e,n=620,a="%"){const s=performance.now(),o=r=>{const i=Math.min((r-s)/n,1),c=1-Math.pow(1-i,3);t.innerHTML=`${Math.round(e*c)}<span>${a}</span>`,i<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}function Qt(t=12){P.vibration&&navigator.vibrate?.(t)}const zn="oq:log",Ys=4e3;function Bn(){try{const t=localStorage.getItem(zn),e=t?JSON.parse(t):[];return Array.isArray(e)?e:[]}catch{return[]}}function Fn(t){try{localStorage.setItem(zn,JSON.stringify(t.slice(-Ys)))}catch{}}function Zs(t,e){const n=Bn();n.push({ts:Date.now(),type:t,ok:e}),Fn(n)}const tr=t=>String(t).padStart(2,"0");function Wn(){const t=Bn(),e=new Date().toDateString(),n=new Map,a=new Map;let s=0,o=0,r=0,i=0;for(const m of t){const g=new Date(m.ts);s+=1,m.ok&&(o+=1),g.toDateString()===e&&(r+=1,m.ok&&(i+=1));const y=n.get(m.type)??{n:0,ok:0};y.n+=1,m.ok&&(y.ok+=1),n.set(m.type,y);const T=`${g.getMonth()+1}-${tr(g.getDate())}`,b=a.get(T)??{n:0,ok:0,ts:g.setHours(0,0,0,0)};b.n+=1,m.ok&&(b.ok+=1),a.set(T,b)}const c=[...n.entries()].map(([m,g])=>({type:m,n:g.n,ok:g.ok,rate:g.n?g.ok/g.n:0})).sort((m,g)=>g.n-m.n),d=[...a.entries()].sort((m,g)=>m[1].ts-g[1].ts).map(([m,g])=>({label:m,n:g.n,ok:g.ok})),u=new Set(t.map(m=>new Date(m.ts).toDateString()));let p=0;const l=new Date;for(u.has(l.toDateString())||l.setDate(l.getDate()-1);u.has(l.toDateString());)p+=1,l.setDate(l.getDate()-1);return{total:s,ok:o,rate:s?o/s:0,today:{n:r,ok:i,rate:r?i/r:0},byType:c,days:d,days7:d.slice(-7),streak:p}}function er(){Fn([])}let E=null,_t=null;function Et(){return E?E.options.questions[E.idx]??null:null}function ee(t){const e=E;let n=e.records.get(t.id);return n||(n={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,n)),n}function Kn(){const t=E;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function nr(){const t=E;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function z(t){const e=K(t);return e==="blank"||e==="essay"||e==="calc"||$a(t.a)}function ar(t,e){if(z(t))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${$(e.text)}</textarea>
      </div>`;const n=Pt(t.a);return`<div class="opts" data-multi="${n.length>1}">${t.opts.map((s,o)=>{let r="";return e.submitted?n.includes(o)?r="correct":e.picked.includes(o)?r="wrong":r="muted":e.picked.includes(o)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${o}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+o)}</span>
        <span class="opt-text">${O(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function sr(t,e){if(!e.submitted)return"";const n=z(t)?String(t.a):W(t.a,t.opts),a=z(t)?N(e.text)||"（空）":W(e.picked.length?e.picked:[],t.opts)||"（未选）";if(z(t)){const o=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${E?.busy?"disabled":""}>✦ AI 阅卷</button>
          <button class="btn btn-sm" data-act="mark" data-ok="1">我答对了</button>
          <button class="btn btn-sm" data-act="mark" data-ok="0">没答对</button>
        </div>`:`<div class="essay-actions"><span class="tag ${e.correct?"tag-ok":"tag-bad"}">${e.correct?"已标记：答对":"已标记：答错"}</span></div>`;return`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${$(n)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${$(a)}
      <div class="divider"></div>
      ${o}
    </div>`}const s=(t.explain??"").trim();return`<div class="answer-panel">
    <div class="ai-title">${e.correct?"✅ 回答正确":"❌ 回答错误"}</div>
    正确答案：${$(W(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${$(a)}`}
    ${s?`<div class="divider"></div><div class="ai-title" style="color:var(--text-3)">解析</div><div class="explain-body">${O(s)}</div>`:""}
  </div>`}function rr(){const t=E,e=Et();if(!e)return"";const n=ee(e),a=t.options.questions.length,s=a?Math.round((t.idx+(n.submitted?1:0))/a*100):0,o=!z(e)&&Pt(e.a).length>1;return`
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
          ${e.subject?`<span class="tag tag-accent">${$(e.subject)}</span>`:""}
          ${e.chapter?`<span class="tag">${$(e.chapter)}</span>`:""}
          <span class="grow"></span>
          <span>${vt[K(e)]}</span>
        </div>
        <div class="q-text">${O(e.q)}</div>
        ${ar(e,n)}
        ${sr(e,n)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${Xt(e.id)}" aria-label="收藏">${Xt(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!Le()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${n.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===a-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${o||z(e)?"提交答案":"查看答案"}</button>`}
    </div>`}function or(t,e){E={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},B(),_t=n=>{const a=E;if(!a)return;const s=n.target,o=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(n.key==="Escape"){if(document.querySelector(".modal-layer"))return;Re();return}if(o)return;const r=Et();if(!r)return;const i=ee(r);if(n.key===" "||n.key==="Enter"){const d=a.root?.querySelector('[data-act="submit"]'),u=a.root?.querySelector('[data-act="next"]');d?(n.preventDefault(),V("submit",d)):u&&(n.preventDefault(),V("next",u));return}if(n.key==="ArrowRight"){n.preventDefault(),i.submitted?Oe():V("submit",a.root.querySelector('[data-act="submit"]'));return}if(n.key==="ArrowLeft"){n.preventDefault(),V("prev",a.root);return}const c=n.key.toLowerCase();if(/^[1-9]$/.test(c)||/^[a-h]$/.test(c)){const d=/^[1-9]$/.test(c)?Number(c)-1:c.charCodeAt(0)-97;if(d<r.opts.length){n.preventDefault();const u=a.root?.querySelector(`.opt[data-idx="${d}"]`);u&&V("pick",u)}return}c==="s"?V("fav",a.root):c==="n"?V("note",a.root):c==="e"?V("ai",a.root):c==="g"?V("ai-grade",a.root):c==="?"&&Xs(()=>Promise.resolve().then(()=>Pr),void 0).then(d=>d.openShortcuts())},document.addEventListener("keydown",_t),t.addEventListener("submit",n=>n.preventDefault()),t.addEventListener("input",Gn)}function B(){const t=E;t?.root&&(t.root.innerHTML=rr())}function Gn(t){const e=t.target;e?.dataset.role!=="essay"||!E||(E.textDraft=e.value)}async function le(t,e){const n=E;e.submitted=!0;const a=K(t);if(ts(a))if(a==="blank"){const s=o=>String(o).replace(/[\s，。、；：""''（）()【】\[\]]/g,"").toLowerCase();e.correct=s(e.text??"")!==""&&s(e.text??"")===s(String(t.a??""))}else e.correct=null;else if(e.correct=xn(e.picked,t.a),e.correct){Qt(10);const s=ir();s>=3&&s%3===0&&h.ok(`连对 ${s} 题，保持住`)}else Qt([14,40,14]),De(t,e);$e(t,e),B(),e.correct&&n.options.questions.length>n.idx+1&&(await Un(600),E&&E.idx===n.idx&&Oe())}function $e(t,e){if(!e.submitted||e.correct===null||e.correct===void 0)return;const n=e;n.counted||(n.counted=!0,Zs(K(t),e.correct===!0))}function ir(){const t=E;let e=0;for(let n=t.idx;n>=0;n-=1){const a=t.records.get(t.options.questions[n].id);if(a?.submitted)if(a.correct===!0)e+=1;else break}return e}async function De(t,e){try{await L.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(n){n instanceof j&&n.status!==401&&h.error(`错题保存失败：${n.message}`)}}function Oe(){const t=E,e=t.options.questions.length;if(t.idx>=e-1){cr();return}t.idx+=1,t.textDraft="",B(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function Pe(){_t&&document.removeEventListener("keydown",_t),_t=null,E?.root?.removeEventListener("input",Gn),E?.root?.replaceChildren(),E=null}async function Re(){const t=E;if(!t)return;const e=Kn();if(!await lt({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;Et()&&Jn();const s=t.options.onExit;Pe(),s?.()}function Jn(){const t=E;if(!t)return;t.options.source==="sequential"&&qa(t.idx);const e=t.options.questions.slice(0,5).map(n=>N(n.q).slice(0,40));_a(e)}async function cr(){const t=E;Jn();const e=t.options.questions.length,n=Kn(),a=nr(),s=n-a,o=n?Math.round(a/n*100):0;if(Pe(),await C({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${a}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${n}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:i=>{const c=i.querySelector('[data-role="acc"]');c&&Qs(c,o)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function lr(t,e,n){e.correct=n,e.submitted=!0,$e(t,e),$e(t,e),n?Qt(10):De(t,e),B(),n&&h.ok("已记为答对")}async function dr(t,e){const n=E;if(n){n.busy=!0,B();try{const a=[`题目：${N(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${N(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await L.ai.grade(a),o=String(s.result||""),r=o.includes("得分")&&!o.includes("不得分");e.correct=r,r?Qt(10):De(t,e),h.ok(r?"AI 阅卷：答对":"AI 阅卷：答错")}catch(a){h.error(a instanceof j?a.message:"AI 阅卷失败，请稍后再试")}finally{n.busy=!1,B()}}}async function ur(){const t=Et();if(!t)return;const e=Le()[String(t.id)]??"",n=document.createElement("div");n.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${$(e)}</textarea>`;const a=n.querySelector("textarea");await C({title:"我的笔记",body:n,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>a.focus()})&&(Ma(t.id,a.value),h.ok("笔记已保存"),B())}async function pr(){const t=Et();if(!t)return;const e=ee(t),n=[`题目：${N(t.q)}`,t.opts.length?`选项：${t.opts.map((r,i)=>`${String.fromCharCode(65+i)}. ${N(r)}`).join("；")}`:"",`正确答案：${z(t)?t.a:W(t.a,t.opts)}`,e.submitted?`我的作答：${z(t)?e.text:W(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),a=document.createElement("div");a.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',C({title:"AI 深度解析",body:a,actions:[{label:"关闭",value:"close"}]});const s=a.querySelector('[data-role="text"]'),o=a.querySelector(".ai-title");try{let r="";const i=await L.ai.explainStream(n,d=>{r+=d,s.innerHTML=`${$(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),c=i.provider==="deepseek"?"DeepSeek":i.provider==="zhipu"?"智谱":"";o.textContent=r?`✦ AI 解析${c?` · ${c}`:""}${i.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=$(i.text||r).replace(/\n/g,"<br>"):await fr(s,i.text??""),s.classList.remove("cursor")}catch(r){const i=r instanceof j?r.message:"AI 解析失败，请稍后重试";h.error(i),o.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=i}}async function fr(t,e){for(let n=0;n<e.length;n+=2)t.innerHTML=$(e.slice(0,n+2)).replace(/\n/g,"<br>"),await Un(12)}function mr(){const t=E;if(!t)return;const e=t.options.questions.map((n,a)=>{const s=t.records.get(n.id),o=a===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${a}" data-state="${o}">${a+1}</button>`}).join("");C({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:n=>{n.querySelectorAll(".nav-cell").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.dataset.idx);!Number.isFinite(s)||!E||(E.idx=s,E.textDraft="",te(),B())})})}}).then(n=>{n==="finish"&&Re()})}async function V(t,e){const n=E;if(!n)return!1;const a=Et();if(!a)return!1;const s=ee(a);switch(t){case"pick":{if(s.submitted)return!0;const o=Number(e.dataset.idx);return z(a)||(Pt(a.a).length>1?(s.picked=s.picked.includes(o)?s.picked.filter(i=>i!==o):[...s.picked,o],B()):(s.picked=[o],await le(a,s))),!0}case"submit":{if(z(a)){const o=n.root?.querySelector('[data-role="essay"]');if(s.text=o?.value??n.textDraft,!s.text.trim())return h.info("先写点什么再提交吧"),!0;await le(a,s)}else{if(!s.picked.length)return h.info("请先选择答案"),!0;await le(a,s)}return!0}case"ai-grade":return!z(a)||E?.busy||await dr(a,s),!0;case"mark":return z(a)&&lr(a,s,e.dataset.ok==="1"),!0;case"next":return Oe(),!0;case"prev":return n.idx>0&&(n.idx-=1,n.textDraft="",B()),!0;case"jump":return n.idx=Number(e.dataset.idx),n.textDraft="",te(),B(),!0;case"nav":return mr(),!0;case"exit":return await Re(),!0;case"fav":return await Ga(a.id),B(),!0;case"note":return await ur(),!0;case"ai":return pr(),!0;default:return!1}}let Z=null;function gr(){return!!(Z&&document.body.contains(Z))}function gt(t){if(!t.questions.length){h.info("这里还没有题目");return}fn(),Z=document.createElement("div"),Z.className="quiz",document.body.appendChild(Z),document.body.classList.add("is-locked"),or(Z,{...t,onExit:()=>{fn(),t.onExit?.()}}),Ca({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function fn(){Z&&(Pe(),Z.remove(),Z=null,document.body.classList.remove("is-locked"))}async function de(t="random"){const e=f.bank??[];if(!e.length){h.info("题库还是空的，先去添加题目吧");return}const n=await Xn(e);if(n===null)return;const a=n?e.filter(o=>(o.subject?.trim()||"默认题库")===n):e;if(t==="chapter"){const o=await yr(a);if(!o?.length)return;const r=a.filter(c=>o.includes(c.chapter||"未分类")),i=await Yt(r.length);if(i===null)return;gt({questions:r.slice(0,i),source:"chapter",title:"章节练习"});return}const s=await Yt(a.length);if(s!==null){if(t==="sequential"){const o=Math.min(En(),Math.max(a.length-1,0));gt({questions:a.slice(0,s),source:"sequential",title:"顺序练习",startIndex:o<s?o:0});return}gt({questions:xe(a).slice(0,s),source:"all",title:"随机练习"})}}async function br(){const t=f.bank??[];if(!t.length){h.info("题库还是空的，先去添加题目吧");return}const e=await Xn(t);if(e===null)return;const n=e?t.filter(a=>(a.subject?.trim()||"默认题库")===e):t;gt({questions:xe(n),source:"all",title:`乱序练习 · ${n.length} 题${e?` · ${e}`:""}`})}async function Vn(){const t=f.wrong??await bt(!0);if(!t.length){h.info("错题本是空的，先去刷几题吧");return}const e=await Yt(t.length);if(e===null)return;const n=t.slice(0,e).map(a=>({id:a.id,q:a.q,opts:a.opts,a:a.a,chapter:a.chapter,subject:a.subject}));gt({questions:n,source:"wrong",title:"错题重练"})}function hr(t){if(!t.length){h.info("还没有收藏题目");return}Yt(t.length).then(e=>{e!==null&&gt({questions:xe(t).slice(0,e),source:"fav",title:"收藏练习"})})}function vr(){const t=Tn(),e=f.bank??[];if(!t||!e.length)return h.info("没有可以继续的练习"),!1;const n=new Map(e.map(s=>[s.id,s])),a=t.ids.map(s=>n.get(s)).filter(s=>!!s);return a.length?(gt({questions:a,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,a.length-1)}),!0):(Ln(),h.info("上次的题目已经不在了"),!1)}function Yt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const n=document.createElement("div");n.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const a=n.querySelector('[data-role="count"]');return a.addEventListener("click",s=>{const o=s.target.closest("button[data-n]");o&&(a.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),o.setAttribute("aria-pressed","true"))}),C({title:"练多少题",body:n,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const o=a.querySelector('button[aria-pressed="true"]');return Number(o?.dataset.n??t)})}async function yr(t){const e=new Map;t.forEach(r=>{const i=r.chapter?.trim()||"未分类";e.set(i,(e.get(i)??0)+1)});const n=[...e.entries()].sort((r,i)=>i[1]-r[1]);if(!n.length)return null;const a=document.createElement("div");if(a.innerHTML=`<div class="list">${n.map(([r,i],c)=>`
      <button class="item" data-chapter="${$(r)}" data-checked="${c===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${$(r)}</span><span class="tag">${i} 题</span></div>
      </button>`).join("")}</div>`,a.addEventListener("click",r=>{const i=r.target.closest("[data-chapter]");i&&(i.dataset.checked=i.dataset.checked==="true"?"false":"true")}),!await C({title:"选择章节",body:a,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const o=Array.from(a.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return o.length?o:null}async function Xn(t){const e=new Map;t.forEach(i=>{const c=i.subject?.trim()||"默认题库";e.set(c,(e.get(c)??0)+1)});const n=[...e.entries()].sort((i,c)=>c[1]-i[1]);if(n.length<2)return"";const a=document.createElement("div");a.innerHTML=`
    <div class="chip-row" data-role="subject">
      <button type="button" class="chip is-on" data-sub="" aria-pressed="true">全部 · ${t.length}</button>
      ${n.map(([i,c])=>`<button type="button" class="chip" data-sub="${$(i)}" aria-pressed="false">${$(i)} · ${c}</button>`).join("")}
    </div>
    <p class="muted small" style="margin:12px 0 0">选科目后只会练这个科目下的题</p>`;const s=a.querySelector('[data-role="subject"]');return s.addEventListener("click",i=>{const c=i.target.closest("button[data-sub]");c&&(s.querySelectorAll("button").forEach(d=>{d.classList.remove("is-on"),d.setAttribute("aria-pressed","false")}),c.classList.add("is-on"),c.setAttribute("aria-pressed","true"))}),await C({title:"练哪个科目",body:a,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]})?s.querySelector("button.is-on")?.dataset.sub??"":null}const mt=new Set;function $r(){mt.clear()}function we(){return f.favs??[]}function wr(){const t=we(),e=f.loading.fav&&!f.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(n=>`
        <div class="item" data-id="${n.id}">
          <div class="item-q">${O(n.q)}</div>
          <div class="item-meta">
            ${n.subject?`<span class="tag tag-accent">${$(n.subject)}</span>`:""}
            ${n.chapter?`<span class="tag">${$(n.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${n.id}">${mt.has(n.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${n.id}">取消收藏</button>
          </div>
          ${mt.has(n.id)?`<div class="item-answer"><div class="right">${$(W(n.a,n.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function xr(){await Dt()}async function kr(t,e){switch(t){case"practice":return we().length?(await hr(we()),!0):(h.info("还没有收藏的题"),!0);case"reveal":{const n=Number(e.dataset.id);return mt.has(n)?mt.delete(n):mt.add(n),!0}case"remove":{const n=Number(e.dataset.id);try{await L.favorites.remove(n),mt.delete(n),X("fav"),await Dt(!0),h.ok("已取消收藏")}catch(a){h.error(a instanceof j?a.message:"操作失败")}return!0}default:return!1}}let D=null,At=null,It=null;const Sr=t=>String.fromCharCode(65+t),Ar=t=>typeof t.a=="number"||Array.isArray(t.a);function Qn(t){const e=Math.max(0,Math.round(t/1e3)),n=Math.floor(e/60),a=e%60;return`${String(n).padStart(2,"0")}:${String(a).padStart(2,"0")}`}async function Er(){const t=(f.bank??[]).filter(Ar);if(t.length<3){h.error("题库里的客观题不足 3 道，先导入或手写几道再考");return}const e=document.createElement("div");if(e.innerHTML=`
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
    <p class="muted small" style="margin:12px 0 0">可选 ${t.length} 道客观题；考试中不显示对错。</p>`,!await C({title:"模拟考试",body:e,actions:[{label:"取消",value:!1},{label:"开始考试",value:!0,variant:"primary"}]}))return;const a=(i,c)=>{const d=e.querySelector(`[data-role="${i}"]`),u=Number(d?.value);return Number.isFinite(u)&&u>0?u:c},s=Math.min(t.length,a("count",Math.min(20,t.length))),o=Math.min(180,a("min",15));D={questions:[...t].sort(()=>Math.random()-.5).slice(0,s),picks:new Map,idx:0,endsAt:Date.now()+o*60*1e3,timer:window.setInterval(Lr,1e3),submitted:!1},Tr()}function Tr(){const t=document.getElementById("app-root")??document.body,e=document.createElement("div");e.className="exam",t.appendChild(e),At=e,ne(),It=n=>{if(!(!D||document.querySelector(".modal-layer"))){if(n.key==="ArrowRight")n.preventDefault(),Zt(1);else if(n.key==="ArrowLeft")n.preventDefault(),Zt(-1);else if(/^[a-h1-8]$/i.test(n.key)){const a=/^\d$/.test(n.key)?Number(n.key)-1:n.key.toLowerCase().charCodeAt(0)-97;Yn(a)}}},document.addEventListener("keydown",It)}function Lr(){const t=D;if(!t||t.submitted)return;if(Date.now()>=t.endsAt){He(!0);return}const e=At?.querySelector(".exam-clock");if(e){const n=t.endsAt-Date.now();e.textContent=Qn(n),e.classList.toggle("is-urgent",n<=6e4)}}function ne(){const t=D;if(!t||!At)return;const e=t.questions[t.idx],n=t.picks.get(e.id)??[],a=t.endsAt-Date.now(),s=t.questions.filter(r=>(t.picks.get(r.id)??[]).length>0).length,o=Array.isArray(e.a)&&e.a.length>1;At.innerHTML=`
    <div class="exam-bar">
      <button class="icon-btn" data-ex="exit" aria-label="退出">←</button>
      <div class="exam-progress">${t.idx+1} / ${t.questions.length} · 已答 ${s}</div>
      <span class="exam-clock ${a<=6e4?"is-urgent":""}">${Qn(a)}</span>
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
        <div class="q-text">${O(e.q)}</div>
        <div class="opts">
          ${e.opts.map((r,i)=>`<button class="opt ${n.includes(i)?"is-picked":""}" data-ex="pick" data-idx="${i}">
                <span class="opt-key">${Sr(i)}</span>
                <span class="opt-text">${O(String(r).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
              </button>`).join("")}
        </div>
      </article>
    </div>
    <div class="exam-foot">
      <button class="btn" data-ex="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${t.idx===t.questions.length-1?"":'<button class="btn" data-ex="next">下一题</button>'}
      <button class="btn btn-primary" data-ex="submit">交卷</button>
    </div>`}function Yn(t){const e=D;if(!e)return;const n=e.questions[e.idx];if(t<0||t>=n.opts.length)return;const a=Array.isArray(n.a)&&n.a.length>1,s=e.picks.get(n.id)??[];a?e.picks.set(n.id,s.includes(t)?s.filter(o=>o!==t):[...s,t]):e.picks.set(n.id,[t]),ne()}function Zt(t){const e=D;if(!e)return;const n=e.idx+t;n<0||n>=e.questions.length||(e.idx=n,ne())}function jr(){const t=D;if(!t)return;const e=document.createElement("div");e.className="nav-grid",e.innerHTML=t.questions.map((n,a)=>`<button class="nav-cell ${(t.picks.get(n.id)??[]).length>0?"is-done":""} ${a===t.idx?"is-cur":""}" data-idx="${a}">${a+1}</button>`).join(""),e.addEventListener("click",n=>{const a=n.target.closest(".nav-cell");if(!a||!D)return;const s=Number(a.dataset.idx);Number.isFinite(s)&&(D.idx=s,document.querySelector(".modal-layer")?.remove(),ne())}),C({title:"答题卡",body:e,actions:[{label:"继续答题",value:"close"},{label:"交卷",value:"submit",variant:"primary"}]}).then(n=>{n==="submit"&&He(!1)})}async function He(t){const e=D;if(!e||e.submitted)return;const n=e.questions.filter(i=>(e.picks.get(i.id)??[]).length===0).length;if(!t&&n>0&&!await lt({title:"还有题没答",message:`还有 ${n} 道没答，确定交卷？`,okText:"交卷"}))return;e.submitted=!0,window.clearInterval(e.timer);let a=0;const s=[];for(const i of e.questions){const c=e.picks.get(i.id)??[];c.length&&xn(c,i.a)?a+=1:s.push(i)}const o=Math.round(a/e.questions.length*100);for(const i of s)L.wrong.add({q:i.q,opts:i.opts,a:i.a,chapter:i.chapter,subject:i.subject,explain:i.explain,user_choice:e.picks.get(i.id)??[]}).catch(()=>{});const r=document.createElement("div");r.className="exam-result",r.innerHTML=`
    <div class="score-big">${o}<span>分</span></div>
    <div class="score-sub">答对 ${a} / ${e.questions.length} · ${t?"时间到自动交卷":"手动交卷"}</div>
    ${s.length?`<div class="wrong-list">${s.slice(0,8).map(i=>`<div class="wrong-item">
                <div class="wrong-q">${O(i.q)}</div>
                <div class="wrong-a">
                  <b class="bad">你选 ${W(e.picks.get(i.id)??[],i.opts)||"未答"}</b>
                  <span class="ok">正确 ${W(i.a,i.opts)}</span>
                </div>
              </div>`).join("")}${s.length>8?`<div class="muted small">…还有 ${s.length-8} 道已进错题本</div>`:""}</div>`:'<div class="all-right">全对，厉害</div>'}`,await C({title:"考试结果",body:r,actions:[{label:"知道了",value:"close",variant:"primary"}]}),Zn()}function Zn(){D&&window.clearInterval(D.timer),D=null,It&&document.removeEventListener("keydown",It),It=null,At?.remove(),At=null}function ta(t,e){if(!D)return!1;switch(t){case"pick":return Yn(Number(e.dataset.idx)),!0;case"prev":return Zt(-1),!0;case"next":return Zt(1),!0;case"sheet":return jr(),!0;case"submit":return He(!1),!0;case"exit":return(async()=>await lt({title:"退出考试",message:"退出后本次作答不保留，确定吗？",danger:!0,okText:"退出"})&&Zn())(),!0;default:return!1}}function ea(){return!!D}function Mr(){const t=new Date,e=a=>String(a).padStart(2,"0"),n="日一二三四五六"[t.getDay()];return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())} · 周${n}`}const mn=t=>String(t).padStart(2,"0");function qr(){const t=f.bank,e=f.wrong,n=f.favs,a=Tn(),s=En(),o=!!(t&&!t.length),r=u=>u===void 0?"—":mn(u),i=Wn(),c=i.today.n,d=i.today.n?`${Math.round(i.today.rate*100)}%`:"—";return`
    <section class="masthead">
      <div class="mast-meta">
        <span>${Mr()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${f.user?`@${$(f.user)}`:"未登录"}</span>
      </div>
      <div class="today">
        <div class="today-head">
          <span class="today-num">${mn(c)}</span>
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
          <span class="stat-num">${r(n?.length)}</span><span class="stat-label">收藏</span>
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
      ${a?`<button class="tile tile-sm tile-accent" data-act="resume">
               <span class="tile-idx">04</span>
               <span class="tile-name">继续上次</span>
               <span class="tile-desc">${a.ids.length} 题 · 第 ${a.idx+1} 题</span>
             </button>`:`<button class="tile tile-sm" data-act="goto" data-tab="bank">
               <span class="tile-idx">04</span>
               <span class="tile-name">题库管理</span>
               <span class="tile-desc">导入 / 编辑</span>
             </button>`}
    </div>`}async function Cr(){Da()||(Oa(),window.setTimeout(()=>h.info(Ja()),320)),await Promise.allSettled([ct(),bt(),Dt()])}async function Nr(t,e){switch(t){case"goto":return Rt(e.dataset.tab??"bank"),!0;case"random":return await de("random"),!0;case"sequential":return await de("sequential"),!0;case"shuffle":return await br(),!0;case"chapter":return await de("chapter"),!0;case"wrong":return await Vn(),!0;case"resume":return vr(),!0;case"exam":return await Er(),!0;default:return!1}}const ue=8;function _r(){const t=[],e=(n,a,s)=>{(n??[]).forEach(o=>t.push({id:o.id,q:o,source:a,tab:s}))};return e(f.bank,"题库","bank"),e(f.wrong,"错题","wrong"),e(f.favs,"收藏","fav"),t}function Ir(t,e){const n=e.toLowerCase();return n?N(t.q.q).toLowerCase().includes(n)||(t.q.opts??[]).some(a=>N(a).toLowerCase().includes(n))||N(t.q.chapter??"").toLowerCase().includes(n)||N(t.q.subject??"").toLowerCase().includes(n):!0}function gn(t=""){const e=document.createElement("div");e.className="search-panel",e.innerHTML=`
    <div class="search-box">
      <span class="ico">⌕</span>
      <input class="search-input" type="search" data-role="kw" placeholder="搜题干、选项、章节、题库…" value="${t.replace(/"/g,"&quot;")}">
    </div>
    <div class="search-results" data-role="hits"></div>
    <p class="muted small search-foot" data-role="foot"></p>`;const n=_r(),a=e.querySelector('[data-role="hits"]'),s=e.querySelector('[data-role="foot"]'),o=e.querySelector('[data-role="kw"]'),r=()=>{const i=o.value.trim(),c=n.filter(p=>Ir(p,i));if(!i){const p=c.filter(l=>l.tab==="bank").slice(0,12);a.innerHTML=p.length?p.map(l=>`<button class="hit" data-act="open" data-tab="${l.tab}" data-id="${l.id}">
                <span class="hit-src">${l.source}</span>
                <span class="hit-q">${O(l.q.q)}</span>
              </button>`).join(""):'<p class="muted small">题库还是空的，先去导入吧。</p>',s.textContent=p.length?"输入关键词可以跨题库 / 错题 / 收藏一起搜":"";return}const d=p=>c.filter(l=>l.source===p),u=[];["题库","错题","收藏"].forEach(p=>{const l=d(p);l.length&&(u.push(`<div class="hit-group">${p} · ${l.length}</div>`),u.push(l.slice(0,ue).map(m=>{const g=K(m.q);return`<button class="hit" data-act="open" data-tab="${m.tab}" data-id="${m.id}">
              <span class="hit-src">${vt[g]}</span>
              <span class="hit-q">${_n(O(m.q.q),i)}</span>
            </button>`}).join("")),l.length>ue&&u.push(`<div class="hit-more muted small">还有 ${l.length-ue} 条，缩小关键词试试</div>`))}),a.innerHTML=u.length?u.join(""):`<p class="muted small">没有找到「${i}」</p>`,s.textContent=`共命中 ${c.length} 条`};o.addEventListener("input",r),C({title:"全局搜索",body:e,actions:[{label:"关闭",value:"close"}],onMount:i=>{r();const c=i.querySelector('[data-role="kw"]');c?.focus(),c?.setSelectionRange(c.value.length,c.value.length),i.addEventListener("click",d=>{const u=d.target.closest(".hit");if(!u)return;const p=u.dataset.tab??"bank",l=Number(u.dataset.id),m=n.find(g=>g.id===l&&g.tab===p);if(te(),Rt(p),m){const g=N(m.q.q).slice(0,12);if(p==="bank"){const y=document.querySelector('.view input[data-role="search"]');y&&g&&(y.value=g,y.dispatchEvent(new Event("input",{bubbles:!0})))}}})}})}const Ue=[{keys:"1–4 / A–D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1–5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/ 或 Ctrl+K",desc:"全局搜索（题库 / 错题 / 收藏）",scope:"全局"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function ze(){const t=Ue.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");C({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const Dr=["home","bank","wrong","fav","me"];function Or(t){const e=t;if(!e)return!1;const n=e.tagName.toLowerCase();return n==="input"||n==="textarea"||n==="select"||e.isContentEditable}function na(){document.addEventListener("keydown",t=>{if((t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"){if(document.querySelector(".quiz"))return;t.preventDefault(),gn();return}if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||Or(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),ze();return}if(t.key==="/"){t.preventDefault(),gn();return}const n=Number(t.key);n>=1&&n<=5&&(t.preventDefault(),Rt(Dr[n-1]))})}const Pr=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:Ue,installShortcuts:na,openShortcuts:ze},Symbol.toStringTag,{value:"Module"})),Rr=`<svg viewBox="0 0 100 100" width="30" height="30" aria-hidden="true" focusable="false">
  <rect x="18.5" y="18.5" width="63" height="63" fill="none" stroke="currentColor" stroke-width="4.2" />
  <circle cx="50" cy="50" r="10" fill="currentColor" />
</svg>`,Hr="2.0.0";function Ur(){const t=f.bank?.length??0,e=f.wrong?.length??0,n=f.favs?.length??0,a=Ue.map(s=>`<div class="kbd-row">
      <kbd class="kbd">${s.keys}</kbd>
      <span class="kbd-desc">${s.desc}</span>
      <span class="kbd-scope">${s.scope}</span>
    </div>`).join("");C({body:`<div class="about">
      <div class="about-head">
        <span class="about-mark">${Rr}</span>
        <span class="about-txt">
          <span class="about-name">基准</span>
          <span class="about-latin">DATUM</span>
        </span>
        <span class="about-ver">v${Hr}</span>
      </div>

      <p class="about-line">多科目刷题、错题本、收藏夹。数据存在你自己的 Cloudflare D1，别人看不到。</p>

      <div class="about-stats">
        <div class="about-stat"><b>${t}</b><span>题库</span></div>
        <div class="about-stat"><b>${e}</b><span>错题</span></div>
        <div class="about-stat"><b>${n}</b><span>收藏</span></div>
      </div>

      <div class="about-sec">键盘快捷键</div>
      <div class="kbd-list">${a}</div>

      <p class="about-foot">本地优先 · 可离线打开 · AI 解析与出题由 DeepSeek 提供</p>
    </div>`,actions:[{label:"关闭",value:"ok",variant:"primary"}]})}const zr=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],Br=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function bn(t,e,n){return`<div class="segmented">${t.map(a=>`<button class="seg" data-act="${n}" data-value="${a.value}" aria-pressed="${String(a.value)===String(e)}">${a.label}</button>`).join("")}</div>`}function hn(t,e){const n=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=t,s.click(),URL.revokeObjectURL(a)}async function Fr(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await C({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const n=t.querySelector('[data-role="old"]').value,a=t.querySelector('[data-role="next"]').value;if(a.length<6){h.error("新密码至少 6 位");return}try{await L.auth.change(n,a),h.ok("密码已更新")}catch(s){h.error(s instanceof j?s.message:"修改失败")}}function Wr(){const t=f.user,e=$((t||"?").slice(0,1).toUpperCase()),n=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})(),a=Wn(),s=r=>r>0?`${Math.round(r*100)}%`:"—",o=Math.max(1,...a.days7.map(r=>r.n));return`
    <div class="profile">
      <div class="profile-avatar">${e}</div>
      <div class="profile-body">
        <div class="profile-name">${$(t)}</div>
        <div class="profile-desc">${f.bank?.length??0} 道题 · ${f.wrong?.length??0} 道错题 · ${f.favs?.length??0} 条收藏</div>
      </div>
    </div>

    <div class="section-title">练习记录</div>
    <div class="card card-pad">
      <div class="stat-grid">
        <div class="stat-cell">
          <span class="stat-big">${a.today.n}</span>
          <span class="stat-cap">今日答题</span>
        </div>
        <div class="stat-cell">
          <span class="stat-big">${a.total}</span>
          <span class="stat-cap">累计答题</span>
        </div>
        <div class="stat-cell">
          <span class="stat-big">${s(a.rate)}</span>
          <span class="stat-cap">总正确率</span>
        </div>
      </div>

      ${a.byType.length?`<div class="type-stats">${a.byType.map(r=>`
            <div class="type-row">
              <span class="type-name">${vt[r.type]}</span>
              <span class="type-bar"><i style="width:${Math.round(r.rate*100)}%"></i></span>
              <span class="type-val">${r.ok}/${r.n}</span>
            </div>`).join("")}</div>`:'<p class="muted small" style="margin:10px 0 0">还没有练习记录，去刷几题吧</p>'}

      ${a.days7.length?`<div class="days">${a.days7.map(r=>`<div class="day"><i style="height:${Math.max(6,Math.round(r.n/o*46))}px"></i><span>${r.label}</span></div>`).join("")}</div>`:""}

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
      ${bn(zr,P.theme,"theme")}
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景色</div><div class="setting-desc">给首页换个心情</div></div>
        <input class="color-input" type="color" value="${$(n.color||"#f4f5f7")}" data-act="pick-color" aria-label="背景色">
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
      <button class="btn btn-ghost btn-block" data-act="about">关于基准与快捷键</button>
    </div>

    <div class="section-title">练习</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">答对后自动跳题</div><div class="setting-desc">答对稍作停留就去下一题</div></div>
      </div>
      ${bn(Br,P.autoDelay,"delay")}
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
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function Kr(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){h.error("图片太大了（最多 8MB）");return}try{const n=await Gr(e);qt({image:n,color:""}),h.ok("背景已更新"),I("render")}catch{h.error("这张图片读不出来，换一张试试")}}},t.click()}function Gr(t){return new Promise((e,n)=>{const a=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(a);const o=Math.min(1,1600/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*o),r.height=Math.round(s.height*o);const i=r.getContext("2d");if(!i){n(new Error("canvas unavailable"));return}i.drawImage(s,0,0,r.width,r.height),e(r.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(a),n(new Error("image load failed"))},s.src=a})}function Jr(){qe()}async function Vr(t,e){switch(t){case"theme":return Ua(e.dataset.value),I("render"),!0;case"delay":return Kt({autoDelay:Number(e.dataset.value)}),I("render"),!0;case"toggle-vibration":return Kt({vibration:!P.vibration}),I("render"),!0;case"toggle-streak":return Kt({streakAlert:!P.streakAlert}),I("render"),!0;case"pick-color":return qt({color:e.value,image:""}),!0;case"pick-bg":return await Kr(),!0;case"clear-bg":return qt({image:""}),I("render"),!0;case"dim":return qt({dim:Number(e.value)}),!0;case"shortcuts":return ze(),!0;case"about":return Ur(),!0;case"clear-stats":return await lt({title:"清空练习记录",message:"本机的答题统计会被清除，题库不受影响。",okText:"清空",danger:!0})&&(er(),I("render"),h.ok("练习记录已清空")),!0;case"reset-bg":return qt({color:"",image:"",dim:.35}),h.ok("背景已恢复"),I("render"),!0;case"export-bank":return f.bank?.length?(hn(`题库-${f.user}.json`,f.bank),h.ok("已导出"),!0):(h.info("题库是空的"),!0);case"export-wrong":return f.wrong?.length?(hn(`错题-${f.user}.json`,f.wrong),h.ok("已导出"),!0):(h.info("没有错题"),!0);case"change-password":return await Fr(),!0;case"logout":return await lt({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(Cn(),h.info("已退出登录")),!0;default:return!1}}const q={subject:"all",edit:!1,selected:new Set};function Xr(){q.subject="all",q.edit=!1,q.selected.clear()}function aa(){const t=f.wrong??[];return q.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===q.subject)}function Qr(){return["all",...Array.from(new Set((f.wrong??[]).map(t=>t.subject||"默认题库")))]}function Yr(){const t=aa(),e=f.wrong?.length??0,n=Qr().map(s=>`<button class="chip" data-act="subject" data-subject="${$(s)}" aria-pressed="${q.subject===s}">
          ${s==="all"?"全部":$(s)}
        </button>`).join(""),a=f.loading.wrong&&!f.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${q.selected.has(s.id)}">
          ${q.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${O(s.q)}</div>
          <div class="item-meta">
            ${s.subject?`<span class="tag tag-accent">${$(s.subject)}</span>`:""}
            ${s.chapter?`<span class="tag">${$(s.chapter)}</span>`:""}
          </div>
          <div class="item-answer">
            ${s.user_choice_text?`<div class="mine">你的选择：${$(s.user_choice_text)}</div>`:""}
            ${s.answer?`<div class="right">正确答案：${$(s.answer)}</div>`:""}
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
    ${n}
    ${q.edit?`<div class="row between" style="margin-bottom:12px">
             <span class="muted small">已选 ${q.selected.size} 题</span>
             <button class="btn btn-sm btn-danger" data-act="remove-selected" ${q.selected.size?"":"disabled"}>删除</button>
           </div>`:""}
    ${a}`}async function Zr(){await bt()}async function to(t,e){switch(t){case"subject":return q.subject=e.dataset.subject??"all",!0;case"toggle-edit":return q.edit=!q.edit,q.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return q.selected.has(n)?q.selected.delete(n):q.selected.add(n),!0}case"practice":return aa().length?(await Vn(),!0):(h.info("没有可练的错题"),!0);case"remove":{const n=Number(e.dataset.id);try{await L.wrong.remove([n]),q.selected.delete(n),X("wrong"),await bt(!0),h.ok("已标记掌握，继续加油")}catch(a){h.error(a instanceof j?a.message:"操作失败")}return!0}case"remove-selected":{const n=[...q.selected];if(!n.length||!await lt({title:"删除错题",message:`确定删除选中的 ${n.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await L.wrong.remove(n),q.selected.clear(),X("wrong"),await bt(!0),h.ok("已删除")}catch(a){h.error(a instanceof j?a.message:"删除失败")}return!0}default:return!1}}const ht={home:{render:qr,mount:Cr,handle:Nr},bank:{render:Us,mount:Fs,handle:Ws,onInput:Gs,reset:Rn},wrong:{render:Yr,mount:Zr,handle:to,reset:Xr},fav:{render:wr,mount:xr,handle:kr,reset:$r},me:{render:Wr,mount:Jr,handle:Vr}};let Ot=!1,dt=!1,pe=!1,fe=!1;function sa(){return document.getElementById("app-root")}function eo(){dt=!1,sa().innerHTML=`
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
          <span class="side-ver" title="构建时间">${ro()}</span>
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
    </div>`,Ot=!0}function no(){document.querySelectorAll(".tab-btn").forEach(e=>{const n=e.dataset.tab===f.tab;e.classList.toggle("is-active",n),e.setAttribute("aria-selected",String(n))}),document.querySelectorAll(".side-btn").forEach(e=>{const n=e.dataset.tab===f.tab;e.classList.toggle("is-active",n),e.setAttribute("aria-current",n?"page":"false")});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,St.findIndex(n=>n.id===f.tab));t.style.setProperty("--tab-index",String(e))}}function vn(t,e){const n=document.querySelector(t);if(!n)return;let a=!1,s=!1,o=!1,r=0,i=null,c;const d=l=>{const m=Array.from(n.querySelectorAll(".tab-btn, .side-btn"));if(!m.length)return 0;let g=0,y=Number.POSITIVE_INFINITY;return m.forEach((T,b)=>{const w=T.getBoundingClientRect(),k=e==="x"?w.left+w.width/2:w.top+w.height/2,x=Math.abs(l-k);x<y&&(y=x,g=b)}),g},u=()=>{if(!s&&(s=!0,n.classList.add("is-dragging"),i!==null))try{n.setPointerCapture(i)}catch{}};n.addEventListener("pointerdown",l=>{l.button===0&&(a=!0,s=!1,o=!1,i=l.pointerId,r=e==="x"?l.clientX:l.clientY,c=window.setTimeout(u,140))}),n.addEventListener("pointermove",l=>{if(!a)return;const m=e==="x"?l.clientX:l.clientY;if(!s){if(Math.abs(m-r)<6)return;u()}o=!0;const y=n.querySelectorAll(".tab-btn, .side-btn")[d(m)],T=St[d(m)],b=y?.dataset.tab??T?.id,w=St.find(k=>k.id===b)?.id;w&&w!==f.tab&&Rt(w)});const p=l=>{if(a){if(a=!1,c&&window.clearTimeout(c),n.classList.remove("is-dragging"),s)try{n.releasePointerCapture(l.pointerId)}catch{}if(i=null,o){const m=g=>{g.stopPropagation(),g.preventDefault()};n.addEventListener("click",m,{capture:!0,once:!0}),window.setTimeout(()=>n.removeEventListener("click",m,{capture:!0}),260)}}};n.addEventListener("pointerup",p),n.addEventListener("pointercancel",p)}function ao(){vn(".tabbar","x"),vn(".sidebar","y")}function so(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,n=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),a=n?e.getAttribute("data-role"):null,s=n&&e instanceof HTMLInputElement?e.selectionStart:null,o=ht[f.tab]??ht.home;if(t.innerHTML=`<div class="view-inner">${o.render()}</div>`,no(),n&&a){const r=t.querySelector(`[data-role="${a}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}o.mount?.()}function tt(){if(pe){fe=!0;return}pe=!0;try{if(!f.authed&&!f.token){dt=!0,Ot=!1,sa().innerHTML=Xa();return}Ot||(eo(),ao()),so()}finally{pe=!1,fe&&(fe=!1,queueMicrotask(tt))}}let me=!1;function ro(){try{return"2026-11-21 13:45"}catch{return"dev"}}const oo=typeof requestAnimationFrame=="function"?t=>requestAnimationFrame(t):t=>{setTimeout(t,16)};function yn(){me||(me=!0,oo(()=>{me=!1,tt()}))}async function ra(t){await t(),dt&&tt()}function oa(t){const e=t.dataset.act??"";if(ea()&&t.closest(".exam")&&ta(t.dataset.ex??"",t))return;if(gr()&&t.closest(".quiz")){V(e,t).then(a=>{a||I("render")});return}if(e==="tab"){Rt(t.dataset.tab??"home");return}if(dt){ra(()=>Nn(e,t));return}const n=ht[f.tab]??ht.home;n.handle&&Promise.resolve(n.handle(e,t)).then(a=>{a&&tt()})}function io(t){const e=t.target;if(!e)return;const n=e.closest("[data-ex]");if(n&&ea()&&n.closest(".exam")){ta(n.dataset.ex??"",n);return}const a=e.closest("[data-act]");a&&(a.closest(".modal-layer")||oa(a))}function $n(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){oa(e);return}if(dt)return;const n=document.getElementById("view");if(!n||!n.contains(e))return;(ht[f.tab]??ht.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&tt()}function co(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),dt&&ra(()=>Nn("submit",e)))}function lo(){Me(),qe(),Pa(()=>{Cn(),Ot=!1,dt=!1,h.error("登录已过期，请重新登录"),I("auth")}),Ut("nav",()=>{Object.entries(ht).forEach(([t,e])=>{t!==f.tab&&e.reset?.()}),tt()}),Ut("auth",()=>{Ot=!1,dt=!1,f.authed?(Rn(),tt(),Promise.allSettled([ct(!0),bt(!0),Dt(!0)])):tt()}),Ut("render",yn),Ut("data",yn),document.addEventListener("click",io),document.addEventListener("change",$n),document.addEventListener("input",$n),document.addEventListener("submit",co),na(),f.token&&(f.authed=!0),tt(),f.token&&Promise.allSettled([ct(),bt(),Dt()])}function wn(){try{lo(),Ea()}catch(t){console.error("[datum] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",wn,{once:!0}):wn();
