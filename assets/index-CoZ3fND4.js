var na=Object.defineProperty;var aa=(t,e,n)=>e in t?na(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var We=(t,e,n)=>aa(t,typeof e!="symbol"?e+"":e,n);import{k as sa,u as ra,s as Ke,a as Ht,z as oa}from"./vendor-SAJHWpKn.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const ia={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function h(t){return String(t??"").replace(/[&<>"']/g,e=>ia[e]??e)}const ae=/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;function ca(t,e){try{return sa.renderToString(t,{displayMode:e,throwOnError:!1,output:"mathml",strict:!1,trust:!1})}catch{return h(e?`$$${t}$$`:`$${t}$`)}}function Ge(t){let e="",n=0;ae.lastIndex=0;for(let a=ae.exec(t);a;a=ae.exec(t)){e+=h(t.slice(n,a.index)).replace(/\n/g,"<br>");const s=!!(a[1]||a[2]),o=(a[1]??a[2]??a[3]??a[4]??"").trim();e+=o?ca(o,s):h(a[0]),n=a.index+a[0].length}return e+=h(t.slice(n)).replace(/\n/g,"<br>"),e}const la=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function da(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function O(t){const e=da(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return Ge(e);const a=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!a)return h(e);const s=o=>{if(o.nodeType===Node.TEXT_NODE)return Ge(o.textContent??"");if(o.nodeType!==Node.ELEMENT_NODE)return"";const r=o,i=r.tagName,c=Array.from(r.childNodes).map(s).join("");if(!la.has(i))return c;if(i==="IMG"){const d=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(d))return"";const p=h(r.getAttribute("alt")??"");return`<img src="${h(d)}" alt="${p}" loading="lazy" referrerpolicy="no-referrer">`}const l=i.toLowerCase();return`<${l}>${c}</${l}>`};return Array.from(a.childNodes).map(s).join("")}function C(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function It(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(n=>Number.isInteger(n)))).sort((n,a)=>n-a)}function R(t){return typeof t=="string"}function F(t,e=[]){return typeof t=="string"?t:It(t).map(n=>{const a=String.fromCharCode(65+n),s=(e[n]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${a}. ${s}`:a}).join("、")}function bn(t){const e=[...t];for(let n=e.length-1;n>0;n-=1){const a=Math.floor(Math.random()*(n+1));[e[n],e[a]]=[e[a],e[n]]}return e}function vn(t,e){const n=It(e);if(!n.length||t.length!==n.length)return!1;const a=[...new Set(t)].sort((s,o)=>s-o);return a.length===n.length&&a.every((s,o)=>s===n[o])}function ua(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const n=JSON.parse(e);if(typeof n=="number")return n;if(Array.isArray(n))return n.map(Number).filter(Number.isInteger);if(typeof n=="string")return n}catch{}return e}return""}let X=null;function pa(){return X&&document.body.contains(X)||(X=document.createElement("div"),X.className="toast-host",X.setAttribute("role","status"),X.setAttribute("aria-live","polite"),document.body.appendChild(X)),X}function se(t,e="info",n=2600){if(!t)return;const a=document.createElement("div");a.className=`toast toast-${e}`,a.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${h(t)}</span>`,pa().appendChild(a),requestAnimationFrame(()=>a.classList.add("in")),window.setTimeout(()=>{a.classList.remove("in"),window.setTimeout(()=>a.remove(),220)},n)}const f={info:t=>se(t,"info"),ok:t=>se(t,"success"),error:t=>se(t,"error",3200)},he="oq:queue",ma=200;function ke(){try{const t=localStorage.getItem(he),e=t?JSON.parse(t):[];return Array.isArray(e)?e.filter(n=>n&&n.path):[]}catch{return[]}}function yn(t){try{t.length?localStorage.setItem(he,JSON.stringify(t.slice(-ma))):localStorage.removeItem(he)}catch{}}function fa(){return ke().length}function ga(t,e,n){const a=ke();a.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,path:t,body:e,label:n,at:Date.now()}),yn(a)}let re=!1;async function Je(){if(re)return 0;const t=ke();if(!t.length)return 0;re=!0;let e=0;const n=[];for(const a of t)try{const s=await fetch(a.path,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a.body),...Ve()?{headers:{"Content-Type":"application/json",Accept:"application/json",...Ve()}}:{}});if(s.ok||s.status>=400&&s.status<500){s.ok&&(e+=1);continue}n.push(a)}catch{n.push(a);break}return re=!1,yn([...n,...t.slice(t.length)]),e&&f.ok(`已补传 ${e} 条离线操作`),e}function Ve(){try{const e=(localStorage.getItem("oq:oq:token")||localStorage.getItem("oq:token")||"").replace(/^"|"$/g,"");return e?{Authorization:`Bearer ${e}`}:{}}catch{return{}}}function ha(){window.addEventListener("online",()=>{Je()}),navigator.onLine&&fa()&&setTimeout(()=>void Je(),1500)}const Se="oq:",Ae="oq:user",Ee="oq:token",ba={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},H={...ba,...et("settings",{})};["auto","light","dark","eye"].includes(H.theme)||(H.theme="auto");function et(t,e){try{const n=localStorage.getItem(Se+t);return n===null?e:JSON.parse(n)}catch{return e}}function nt(t,e){try{localStorage.setItem(Se+t,JSON.stringify(e))}catch{}}function be(t){try{localStorage.removeItem(Se+t)}catch{}}function Bt(t){Object.assign(H,t),nt("settings",H)}function va(t){Bt({theme:t})}function z(){return et(Ae,"")||""}function $n(t){nt(Ae,t)}function ya(){be(Ae),be(Ee)}function je(){return et(Ee,"")||""}function wn(t){nt(Ee,t)}function at(t){return`u:${z()||"anon"}:${t}`}function Le(){return et(at("notes"),{})}function $a(t,e){const n=Le(),a=String(t);e.trim()?n[a]=e:delete n[a],nt(at("notes"),n)}function xn(){const t=et(at("progress"),{});return Number(t.sequential_index)||0}function wa(t){nt(at("progress"),{sequential_index:t,updatedAt:Date.now()})}function kn(){const t=et(at("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function xa(t){nt(at("session"),t)}function Sn(){be(at("session"))}function An(){return et(at("recent"),[])}function ka(t){const e=[...t,...An()].slice(0,30);nt(at("recent"),Array.from(new Set(e)))}function En(){return et("appearance",{color:"",image:"",dim:.35})}function Sa(t){nt("appearance",{...En(),...t})}function Aa(){return et("welcomed","")===new Date().toDateString()}function Ea(){nt("welcomed",new Date().toDateString())}class L extends Error{constructor(n,a){super(a);We(this,"status");this.name="ApiError",this.status=n}}let qe=null;function ja(t){qe=t}async function jn(t,e={}){const n=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&n.set("Content-Type","application/json");const a=je();a&&n.set("Authorization",`Bearer ${a}`),n.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:n})}catch{throw new L(0,"网络连接失败，请检查网络后重试")}const o=s.headers.get("content-type")??"";let r=null;o.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const i=r??{};if(s.status===401)throw qe?.(),new L(401,typeof i.error=="string"?i.error:"登录已过期，请重新登录");if(!s.ok||i.ok===!1){const c=typeof i.error=="string"&&i.error?i.error:`请求失败（HTTP ${s.status}）`;throw new L(s.status,c)}return r}const oe=t=>jn(t),J=(t,e)=>jn(t,{method:"POST",body:JSON.stringify(e)});async function La(t,e,n){const a=new Headers({"Content-Type":"application/json"}),s=je();s&&a.set("Authorization",`Bearer ${s}`);const o=await fetch("/api/ai",{method:"POST",headers:a,body:JSON.stringify({...t,stream:!0}),signal:n});if(!o.ok||!o.body){const u=await o.json().catch(()=>({}));if(o.status===401)throw qe?.(),new L(401,"登录已过期，请重新登录");if(typeof u.result=="string")return e(u.result),{text:u.result,cached:!1,provider:typeof u.provider=="string"?u.provider:void 0};throw new L(o.status,typeof u.error=="string"?u.error:"AI 解析失败")}const r=o.body.getReader(),i=new TextDecoder;let c="",l="",d=!1,p;for(;;){const{value:u,done:b}=await r.read();if(b)break;c+=i.decode(u,{stream:!0});const y=c.split(`

`);c=y.pop()??"";for(const E of y){const v=E.split(`
`).find(S=>S.startsWith("data:"));if(!v)continue;let $;try{$=JSON.parse(v.slice(5).trim())}catch{continue}if(typeof $.delta=="string"&&$.delta&&(l+=$.delta,e($.delta)),typeof $.error=="string")throw new L(502,$.error);$.done&&(d=$.cached===!0,typeof $.provider=="string"&&(p=$.provider))}}return{text:l,cached:d,provider:p}}function ve(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:ua(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function qa(t){return{...ve(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}async function mt(t,e,n){try{return await J(t,e)}catch(a){if(a instanceof L&&a.status===0)return ga(t,e,n),{ok:!0,queued:!0,offline:!0};throw a}}const j={auth:{check:t=>J("/api/auth",{action:"check",username:t}),set:(t,e)=>J("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>J("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>J("/api/auth",{action:"change",username:z(),oldPassword:t,newPassword:e})},questions:{async list(){const t=z();if(!t)return[];const e=await oe(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>ve(a))},add:t=>mt("/api/questions-add",{user_id:z(),questions:t},`导入 ${t.length} 道题`),update:(t,e,n)=>mt("/api/questions-update",{id:t,user_id:z(),...e,...n?.baseUpdatedAt?{base_updated_at:n.baseUpdatedAt}:{},...n?.force?{force:!0}:{}},"保存题目"),remove:t=>mt("/api/questions-delete",{ids:t,user_id:z()},`删除 ${t.length} 道题`)},wrong:{async list(){const t=z();if(!t)return[];const e=await oe(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>qa(a))},add:t=>mt("/api/wrong-add",{user_id:z(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""},"记录错题"),remove:t=>mt("/api/wrong-delete",{ids:t,user_id:z()},"移除错题")},favorites:{async list(){const t=z();if(!t)return[];const e=await oe(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>ve(a))},add:t=>mt("/api/favorites-add",{user_id:z(),question_id:t},"收藏题目"),remove:t=>mt("/api/favorites-remove",{user_id:z(),question_id:t},"取消收藏")},ai:{explain:t=>J("/api/ai",{action:"explain",prompt:t}),grade:t=>J("/api/ai",{action:"grade",prompt:t}),extract:t=>J("/api/ai",{action:"extract",...t}),classify:t=>J("/api/ai",{action:"classify",prompt:t}),generate:t=>J("/api/ai",{action:"generate",prompt:t}),explainStream:(t,e,n)=>La({action:"explain",prompt:t},e,n)}},At='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"',ye=[{id:"home",label:"首页",icon:`<svg viewBox="0 0 24 24" ${At} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`},{id:"bank",label:"题库",icon:`<svg viewBox="0 0 24 24" ${At} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`},{id:"wrong",label:"错题",icon:`<svg viewBox="0 0 24 24" ${At} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`},{id:"fav",label:"收藏",icon:`<svg viewBox="0 0 24 24" ${At} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`},{id:"me",label:"我的",icon:`<svg viewBox="0 0 24 24" ${At} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`}],Qe=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],m={tab:"home",user:z(),token:je(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},jt=new Map;function Pt(t,e){return jt.has(t)||jt.set(t,new Set),jt.get(t).add(e),()=>jt.get(t)?.delete(e)}function I(t){jt.get(t)?.forEach(e=>e())}function Qt(t){m.tab!==t&&(m.tab=t,I("nav"))}const Ln=window.matchMedia("(prefers-color-scheme: dark)");function Xe(){return H.theme==="auto"?Ln.matches?"dark":"light":H.theme}function Me(){document.documentElement.dataset.theme=Xe();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=Xe()==="dark"?"#0b0c0f":"#f4f5f7")}function Ma(t){va(t),Me()}Ln.addEventListener("change",()=>{H.theme==="auto"&&Me()});function Ta(t){Sa(t)}function Te(){const{color:t,image:e,dim:n}=En(),a=document.body;a.style.backgroundImage=e?`url("${e}")`:"",a.style.backgroundSize="cover",a.style.backgroundPosition="center",a.style.backgroundAttachment="fixed",a.dataset.dim=String(n),t&&!e?a.style.backgroundColor=t:a.style.backgroundColor=""}async function Ca(t,e){const n=await j.auth.login(t,e);wn(n.token),$n(t),m.user=t,m.token=n.token,m.authed=!0,Q(),I("auth")}async function Na(t,e){const n=await j.auth.set(t,e);wn(n.token),$n(t),m.user=t,m.token=n.token,m.authed=!0,Q(),I("auth")}function qn(){m.user="",m.token="",m.authed=!1,m.bank=null,m.wrong=null,m.favs=null,m.favoriteIds=new Set,ya(),Sn(),I("auth")}const _a=300*1e3,ft={bank:0,wrong:0,fav:0},Ut=new Map;function Q(t){t?(ft[t]=0,t==="bank"&&(m.bank=null),t==="wrong"&&(m.wrong=null),t==="fav"&&(m.favs=null)):(ft.bank=ft.wrong=ft.fav=0,m.bank=null,m.wrong=null,m.favs=null)}function Ia(t,e){const n=Ut.get(t);if(n)return n;const a=e().finally(()=>Ut.delete(t));return Ut.set(t,a),a}async function Ce(t,e,n,a){if(!m.user)return[];const s=Ut.get(t);if(s)return s;const o=Date.now()-ft[t]<_a;if(!e&&o)return[];m.loading[t]=!0,I("data");try{const r=await Ia(t,n);return a(r),ft[t]=Date.now(),r}catch(r){throw r instanceof L&&r.status!==401&&f.error(r.message),r}finally{m.loading[t]=!1,I("data")}}async function ct(t=!1){try{await Ce("bank",t,()=>j.questions.list(),e=>{m.bank=e})}catch{}return m.bank??[]}async function ht(t=!1){try{await Ce("wrong",t,()=>j.wrong.list(),e=>{m.wrong=e})}catch{}return m.wrong??[]}async function Nt(t=!1){try{await Ce("fav",t,()=>j.favorites.list(),e=>{m.favs=e,m.favoriteIds=new Set(e.map(n=>n.id))})}catch{}return m.favs??[]}function Kt(t){return m.favoriteIds.has(t)}async function Da(t){const e=!Kt(t);try{return e?await j.favorites.add(t):await j.favorites.remove(t),e?m.favoriteIds.add(t):m.favoriteIds.delete(t),m.favs=null,ft.fav=0,f.ok(e?"已加入收藏":"已取消收藏"),I("data"),e}catch(n){return f.error(n instanceof L?n.message:"操作失败"),Kt(t)}}function Oa(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${Qe[Math.floor(Math.random()*Qe.length)]}`}function Lt(t){Ta(t),Te()}const x={step:"name",username:"",busy:!1,error:""};function Ra(){x.step="name",x.username="",x.busy=!1,x.error=""}function Ha(){const t=`
    <div class="auth-brand">
      <div class="brand-mark">原</div>
      <div>
        <div class="auth-title">原点 · Origin</div>
        <div class="brand-sub">刷题 · 错题 · 收藏</div>
      </div>
    </div>`,e=x.error?`<div class="auth-error" role="alert">${h(x.error)}</div>`:"";if(x.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${h(x.username)}" required>
            </label>
            ${e}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${x.busy?"disabled":""}>
              ${x.busy?"检查中…":"继续"}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;const n=x.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${n?"为":"欢迎回来，"} <strong>${h(x.username)}</strong>${n?" 设置一个密码":""}</p>
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
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${x.busy?"disabled":""}>
            ${x.busy?"请稍候…":n?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${x.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function Mn(t,e){if(t==="back")return x.step="name",x.error="",!0;if(t==="submit"){const n=e,a=new FormData(n);if(x.step==="name"){const o=String(a.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(o))return x.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;x.busy=!0,x.error="";try{const{hasPassword:r}=await j.auth.check(o);x.username=o,x.step=r?"password":"create"}catch(r){x.error=r instanceof L?r.message:"网络异常，请重试"}finally{x.busy=!1}return!0}if(x.busy)return!0;const s=String(a.get("password")??"");if(x.step==="create"){const o=String(a.get("confirm")??"");if(s!==o)return x.error="两次输入的密码不一致",!0}if(s.length<6)return x.error="密码至少 6 位",!0;x.busy=!0,x.error="";try{x.step==="create"?await Na(x.username,s):await Ca(x.username,s),f.ok(x.step==="create"?"账号已创建，开始刷题吧":`欢迎回来，${m.user}`),Ra()}catch(o){x.error=o instanceof L?o.message:"登录失败，请重试"}finally{x.busy=!1}return!0}return!1}function Pa(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Tn(t,e){const n=e.trim();if(!n)return t;const a=new RegExp(Pa(n),"gi");return t.replace(/<[^>]+>|[^<]+/g,s=>s.startsWith("<")?s:s.replace(a,o=>`<mark class="hl">${o}</mark>`))}const Dt={single:"单选",multi:"多选",judge:"判断",blank:"填空",essay:"简答"};function bt(t){const e=t.opts??[],n=String(t.q??"");if(!e.length)return/_{2,}|（\s*）|\(\s*\)|【\s*】/.test(n)?"blank":"essay";if(e.length===2){const a=e.map(s=>s.replace(/^[A-Za-z][.、)）]\s*/,"").trim()).join("|");if(/^(正确|对|是|√|True)|\|(错误|错|否|×|False)$/i.test(a)||/正确\|错误|对\|错/.test(a))return"judge"}return Array.isArray(t.a)?"multi":"single"}let B=null,qt=0;function Cn(){return B&&document.body.contains(B)||(B=document.createElement("div"),B.className="modal-root",B.setAttribute("role","dialog"),B.setAttribute("aria-modal","true"),document.body.appendChild(B)),B}function za(){qt+=1,document.body.classList.add("is-locked")}function Ba(){qt=Math.max(0,qt-1),qt===0&&document.body.classList.remove("is-locked")}function Xt(){Cn().innerHTML="",qt=0,document.body.classList.remove("is-locked")}function N(t){const e=Cn(),n=t.dismissible!==!1;return new Promise(a=>{let s=!1;const o=u=>{s||(s=!0,p(),r.classList.remove("open"),window.setTimeout(()=>{r.remove(),Ba()},200),a(u))},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${n?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${h(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${h(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((u,b)=>`<button class="btn btn-${u.variant??"ghost"}" data-idx="${b}">${h(u.label)}</button>`).join("")}</div>`:""}
      </div>`;const i=r.querySelector(".modal-card"),c=i.querySelector(".modal-body");typeof t.body=="string"?c.innerHTML=t.body:t.body&&c.appendChild(t.body);const l=u=>{u.key==="Escape"&&n&&(u.stopPropagation(),o(null))},d=u=>{const b=u.target;if(b.closest("[data-close]")&&n){o(null);return}const y=b.closest("[data-idx]");if(!y)return;const E=t.actions?.[Number(y.dataset.idx)];E&&(E.keepOpen||o(E.value))},p=()=>{document.removeEventListener("keydown",l,!0),r.removeEventListener("click",d),B&&B.children.length===0&&B.classList.remove("open")};r.addEventListener("click",d),document.addEventListener("keydown",l,!0),e.appendChild(r),e.classList.add("open"),za(),t.onMount?.(i),requestAnimationFrame(()=>{r.classList.add("open");const u=i.querySelector("input, textarea, button.btn-primary, button");u&&window.matchMedia("(pointer: fine)").matches&&u.focus({preventScroll:!0})})})}function yt(t){return N({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}function Ua(t,e=1400,n=.82){return new Promise((a,s)=>{const o=URL.createObjectURL(t),r=new Image;r.onload=()=>{URL.revokeObjectURL(o);const i=Math.min(1,e/Math.max(r.width,r.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(r.width*i)),c.height=Math.max(1,Math.round(r.height*i));const l=c.getContext("2d");if(!l){s(new Error("canvas 不可用"));return}l.fillStyle="#fff",l.fillRect(0,0,c.width,c.height),l.drawImage(r,0,0,c.width,c.height),a(c.toDataURL("image/jpeg",n))},r.onerror=()=>{URL.revokeObjectURL(o),s(new Error("图片解码失败"))},r.src=o})}const Fa=new Set(["B","STRONG","I","EM","U","SUB","SUP","BR","P","DIV","SPAN","IMG","CODE"]);function zt(t){const n=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html").body.firstElementChild;if(!n)return"";const a=s=>{if(s.nodeType===Node.TEXT_NODE)return(s.textContent??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");if(s.nodeType!==Node.ELEMENT_NODE)return"";const o=s,r=o.tagName,i=Array.from(o.childNodes).map(a).join("");if(!Fa.has(r))return i;if(r==="IMG"){const l=o.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(l))return"";const d=(o.getAttribute("alt")??"").replace(/"/g,"&quot;");return`<img src="${l.replace(/"/g,"&quot;")}" alt="${d}">`}if(r==="BR")return"<br>";const c=r.toLowerCase();return c==="div"||c==="p"?i.trim()?`${i}<br>`:"<br>":`<${c}>${i}</${c}>`};return Array.from(n.childNodes).map(a).join("").replace(/(<br>)+$/g,"").trim()}const Wa=[{cmd:"bold",label:"B",title:"加粗（Ctrl/⌘+B）"},{cmd:"italic",label:"I",title:"斜体（Ctrl/⌘+I）"},{cmd:"underline",label:"U",title:"下划线（Ctrl/⌘+U）"},{cmd:"superscript",label:"x²",title:"上标"},{cmd:"subscript",label:"x₂",title:"下标"},{cmd:"insertUnorderedList",label:"≡",title:"列表"}];function Ka(t={}){const e=document.createElement("div");e.className="rt";const n=document.createElement("div");n.className="rt-bar";const a=document.createElement("div");a.className="rt-area",a.contentEditable="true",a.spellcheck=!1,a.dataset.role="rich",a.style.minHeight=`${t.minHeight??96}px`,t.placeholder&&(a.dataset.placeholder=t.placeholder),a.innerHTML=zt(t.value??"");const s=(r,i)=>{a.focus(),document.execCommand(r,!1,i),o()};if(t.toolbar!==!1){for(const d of Wa){const p=document.createElement("button");p.type="button",p.className="rt-btn",p.title=d.title,p.textContent=d.label,p.addEventListener("mousedown",u=>u.preventDefault()),p.addEventListener("click",()=>s(d.cmd,d.arg)),n.appendChild(p)}const r=document.createElement("span");r.className="rt-sep",n.appendChild(r);const i=document.createElement("button");i.type="button",i.className="rt-btn",i.textContent="∑",i.title="公式：选中内容包成 $…$",i.addEventListener("mousedown",d=>d.preventDefault()),i.addEventListener("click",()=>{const d=window.getSelection()?.toString()??"";if(d){s("insertText",`$${d}$`);return}s("insertText","$$");const p=window.getSelection();if(p&&p.rangeCount){const u=p.getRangeAt(0);typeof p.modify=="function"?p.modify("move","backward","character"):u.startContainer.nodeType===Node.TEXT_NODE&&(u.setStart(u.startContainer,Math.max(0,u.startOffset-1)),u.collapse(!0),p.removeAllRanges(),p.addRange(u))}}),n.appendChild(i);const c=document.createElement("button");c.type="button",c.className="rt-btn",c.textContent="▣",c.title="插入图片（自动压缩）",c.addEventListener("mousedown",d=>d.preventDefault()),c.addEventListener("click",()=>{const d=document.createElement("input");d.type="file",d.accept="image/*",d.onchange=async()=>{const p=d.files?.[0];if(p)try{c.textContent="…";const u=await Ua(p);a.focus(),document.execCommand("insertHTML",!1,`<img src="${u}" alt="题图"><br>`),o(),f.ok(`图片已插入（${Math.round(u.length*.75/1024)} KB）`)}catch{f.error("图片读取失败，换一张试试")}finally{c.textContent="▣"}},d.click()}),n.appendChild(c);const l=document.createElement("button");l.type="button",l.className="rt-btn rt-clear",l.textContent="⌫",l.title="清除格式",l.addEventListener("mousedown",d=>d.preventDefault()),l.addEventListener("click",()=>s("removeFormat")),n.appendChild(l)}function o(){const r=(a.textContent??"").trim().length>0,i=!!a.querySelector("img");a.classList.toggle("is-empty",!r&&!i)}return a.addEventListener("input",o),a.addEventListener("blur",o),a.addEventListener("paste",r=>{const i=r.clipboardData?.getData("text/html");i&&(r.preventDefault(),document.execCommand("insertHTML",!1,zt(i)))}),o(),e.append(n,a),{el:e,getValue:()=>zt(a.innerHTML),setValue:r=>{a.innerHTML=zt(r),o()},focus:()=>a.focus()}}function Ye(t){const e=t.name.toLowerCase(),n=t.type.toLowerCase();return n.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|heic)$/.test(e)?"image":e.endsWith(".docx")?"docx":e.endsWith(".json")?"json":/\.(txt|md|csv|text)$/.test(e)||n.startsWith("text/")?"text":"unknown"}function wt(t){return String(t??"").replace(/\r\n?/g,`
`).trim()}function Nn(t,e){if(Array.isArray(t)){const r=t.map(i=>typeof i=="number"?i:Ga(String(i),e.length)).filter(i=>i!==null);return r.length?r.length===1?r[0]:[...new Set(r)].sort((i,c)=>i-c):t.map(String).join("、")}if(typeof t=="number"&&Number.isFinite(t))return t;const n=wt(t);if(!n)return"";const s=(/^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(n)?n:"")||(/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(n)?n:"");if(s){const r=[...new Set(s.toUpperCase().split("").map(i=>i.charCodeAt(0)-65))].filter(i=>i>=0&&i<e.length);if(r.length)return r.length===1?r[0]:r.sort((i,c)=>i-c)}const o=/^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(n);if(o&&e.length){const r=o[1].charCodeAt(0)-65;if(r>=0&&r<e.length){const i=o[2].trim();return e.findIndex(l=>l.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()===i)>=0||i,r}}return n}function Ga(t,e){const n=t.trim().toUpperCase();if(!/^[A-H]$/.test(n))return null;const a=n.charCodeAt(0)-65;return a<e?a:null}function Ja(t){const e=wt(t.q??t.question??t.title??t.题目??t.题干);if(!e)return null;const n=t.opts??t.options??t.choices??t.选项;let a=[];Array.isArray(n)?a=n.map(r=>wt(r)).filter(Boolean):typeof n=="string"&&(a=Za(n));const s=t.a??t.answer??t.correct??t.答案??t.正确答案,o=a.length?Nn(s,a):wt(s);return{q:e,opts:a,a:o,...t.figure?{figure:t.figure}:{},chapter:wt(t.chapter??t.章节??t.知识点),subject:wt(t.subject??t.科目??t.题库)||"默认题库"}}function Ne(t){const e=t.replace(/^\uFEFF/,"").trim(),n=/```(?:json)?([\s\S]*?)```/i.exec(e)?.[1]??e,a=n.indexOf("["),s=n.indexOf("{"),o=a>=0&&(s<0||a<s)?a:s;if(o<0)return[];const r=Math.max(n.lastIndexOf("]"),n.lastIndexOf("}"));if(r<=o)return[];let i;try{i=JSON.parse(n.slice(o,r+1))}catch{return[]}return(Array.isArray(i)?i:Array.isArray(i?.questions)?i.questions:Array.isArray(i?.data)?i.data:[]).filter(l=>!!l&&typeof l=="object").map(Ja).filter(l=>!!l)}const Va=/^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/,Qa=/^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/,Xa=/^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/,Ya=/^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;function Za(t){return t.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/).map(n=>n.trim()).filter(Boolean)}function ts(t){const e=[...t.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];return e.length<2?[]:e.map((n,a)=>{const s=(n.index??0)+n[0].length,o=a+1<e.length?e[a+1].index??t.length:t.length;return t.slice(s,o).trim()})}function es(t){const n=t.replace(/^\uFEFF/,"").replace(/\r\n?/g,`
`).replace(/!\[[^\]]*\]\((data:image\/[^)]+)\)/g,(d,p)=>`<img src="${p}" alt="题图">`).split(`
`),a=[];let s="",o=[],r="",i="",c="";const l=()=>{const d=s.trim();if(!d){s="",o=[],r="";return}if(!o.length&&!r.trim()&&d.length<=24){s="",o=[],r="";return}const p=o.map(b=>b.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()),u=p.length?Nn(r,p):r.trim();a.push({q:d,opts:p,a:u,chapter:i,subject:c||"默认题库"}),s="",o=[],r="",i="",c=""};for(const d of n){if(!d.trim())continue;if(/^\s*<img\b/i.test(d)){s=`${s}${s?`
`:""}${d.trim()}`;continue}const p=Ya.exec(d),u=Va.exec(d),b=Qa.exec(d),y=Xa.exec(d);if(p&&!u){l();const E=ts(p[2]);E.length>=2?(s=p[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim(),o=E):s=p[2].trim();continue}if(u&&s){o.push(u[2].trim());continue}if(b&&(s||o.length)){r=b[1].trim();continue}if(y){const E=y[0].trim(),v=y[1].trim();/章节|知识点/.test(E)?i=v:/科目|题库|分类/.test(E)&&(c=v);continue}s?o.length?o[o.length-1]=`${o[o.length-1]} ${d.trim()}`.trim():s=`${s} ${d.trim()}`.trim():s=d.replace(/^\s*(?:题目|题干)\s*[:：]\s*/,"").trim()}return l(),a.filter(d=>d.q.length>1)}function Ft(t){const e=t.trim();if(!e)return[];if(/^[[{]/.test(e)||/```(?:json)?/i.test(e)||/"(q|question|题目)"\s*:/.test(e)){const n=Ne(e);if(n.length)return n}return es(e)}function Ze(t){const e=ra(new Uint8Array(t)),n=e["word/document.xml"];if(!n)throw new Error("这个 docx 里没有正文，另存为 .docx 再试一次");const a=e["word/_rels/document.xml.rels"],s=new Map;if(a){const i=Ke(a);for(const c of i.matchAll(/<Relationship\b[^>]*>/g)){const l=c[0],d=/\bId="([^"]+)"/.exec(l)?.[1],p=/\bTarget="([^"]+)"/.exec(l)?.[1],u=/\bType="([^"]+)"/.exec(l)?.[1]??"";if(!d||!p||!/image/i.test(u))continue;const b=p.startsWith("/")?p.slice(1):`word/${p.replace(/^\.\//,"")}`,y=e[b];y&&s.set(d,`data:${ns(b)};base64,${as(y)}`)}}return Ke(n).replace(/<a:blip\b[^>]*r:embed="([^"]+)"[^>]*\/?>/g,(i,c)=>{const l=s.get(c);return l?`[[IMG:${l}]]`:""}).replace(/<w:tab\b[^>]*\/>/g,"	").replace(/<w:br\b[^>]*\/>/g,`
`).replace(/<\/w:p>/g,`
`).replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\[\[IMG:([^\]]+)\]\]/g,(i,c)=>`
![docx 图片](${c})
`).replace(/\n{3,}/g,`

`).trim()}function ns(t){const e=t.split(".").pop()?.toLowerCase()??"";return e==="jpg"||e==="jpeg"?"image/jpeg":e==="gif"?"image/gif":e==="bmp"?"image/bmp":e==="webp"?"image/webp":e==="svg"?"image/svg+xml":"image/png"}function as(t){let e="";for(let a=0;a<t.length;a+=32768)e+=String.fromCharCode(...t.subarray(a,a+32768));return btoa(e)}function tn(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("文件读取失败")),a.readAsText(t,"utf-8")})}function en(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(a.result),a.onerror=()=>n(new Error("文件读取失败")),a.readAsArrayBuffer(t)})}function nn(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("图片读取失败")),a.readAsDataURL(t)})}function ss(t,e){if(!t.length)return'<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>';const n=t.slice(0,4),a=n.map((r,i)=>{const c=(r.opts??[]).length,l=an(r),d=(r.q.match(/<img\b/gi)??[]).length,p=r.q.replace(/<img\b[^>]*>/gi," ").replace(/\s+/g," ").trim();return`<li><b>${i+1}.</b> ${h(p).slice(0,90)}${d?`<span class="muted"> · 含 ${d} 张图</span>`:""}${c?`<span class="muted"> · ${c} 个选项</span>`:'<span class="muted"> · 简答</span>'}${l?`<span class="tag-warn">${l}</span>`:""}</li>`}).join(""),s=t.length>n.length?`<li class="muted">…还有 ${t.length-n.length} 道</li>`:"",o=t.map(an).filter(Boolean).length;return`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${t.length} 道题</span>
      ${o?`<span class="tag tag-warn">${o} 道待确认</span>`:""}
      ${e?`<span class="muted small">${h(e)}</span>`:""}
    </div>
    <ul class="import-list">${a}${s}</ul>`}function an(t){const e=(t.opts??[]).length,n=t.a;return(Array.isArray(n)?n.length>0:n!==""&&n!==null&&n!==void 0)?e===1?"只有 1 个选项":e>=2&&typeof n=="number"&&(n<0||n>=e)?"答案越界":"":"没识别到答案"}function ie(t,e){return t==="json"?Ne(e):Ft(e)}async function rs(){const t=document.createElement("div");t.className="import",t.innerHTML=`
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
    <div class="import-preview" data-role="preview"></div>`;const e=t.querySelector('[data-role="drop"]'),n=t.querySelector('[data-role="file"]'),a=t.querySelector('[data-role="text"]'),s=t.querySelector('[data-role="preview"]');let o=[],r="",i="",c=!1;const l=()=>{s.innerHTML=ss(o,i||(r?"图片将由 AI 识别":""));const v=document.querySelector('[data-idx="1"]');v&&(v.textContent=o.length?`导入 ${o.length} 道题`:"AI 解析并导入")},d=(v,$,S)=>{a.value=v,o=ie($,v),i=S,l()},p=async()=>{const v=a.value.trim();if(!v&&!r)return[];f.info(r?"AI 正在识别图片…":"AI 正在解析文字…");const $=await j.ai.extract({...v?{prompt:v}:{},...r?{imageBase64:r}:{}});return Ft($.result??"")},u=async v=>{const $=Ye(v);try{if($==="image"){r=await nn(v),o=[],i=`${v.name}（${Math.round(v.size/1024)}KB，AI 识别）`,l();try{o=await p(),o.length||f.error("这张图没读出题目，换张更清晰的试试")}catch(k){f.error(k instanceof L?k.message:"AI 识别失败")}l();return}if($==="docx"){const k=await en(v);d(Ze(k),"docx",v.name);return}if($==="unknown"){f.error("暂不支持这种文件，换成 txt / json / docx / 图片试试");return}const S=await tn(v);d(S,$,v.name)}catch(S){f.error(S instanceof Error?S.message:"文件解析失败")}},b=async v=>{if(!v.length)return;if(v.length===1){await u(v[0]);return}const $=[],S=[];for(const k of v)try{const q=Ye(k);if(q==="image"){const W=await nn(k),M=await j.ai.extract({imageBase64:W});$.push(...Ft(M.result??"")),S.push(k.name);continue}if(q==="docx"){$.push(...ie("docx",Ze(await en(k)))),S.push(k.name);continue}$.push(...ie(q,await tn(k))),S.push(k.name)}catch(q){f.error(`${k.name} 没读出来：${q instanceof Error?q.message:"格式不对"}`)}o=$,r="",i=`${v.length} 个文件（${S.join("、")}）`,a.value="",l()};n.addEventListener("change",()=>{b([...n.files??[]])});for(const v of["dragenter","dragover"])e.addEventListener(v,$=>{$.preventDefault(),e.classList.add("is-over")});for(const v of["dragleave","drop"])e.addEventListener(v,$=>{$.preventDefault(),e.classList.remove("is-over")});e.addEventListener("drop",v=>{const $=[...v.dataTransfer?.files??[]];b($)}),a.addEventListener("paste",v=>{const S=[...v.clipboardData?.items??[]].find(q=>q.kind==="file"&&q.type.startsWith("image/"));if(!S)return;const k=S.getAsFile();k&&(v.preventDefault(),u(k))});let y=0;if(a.addEventListener("input",()=>{window.clearTimeout(y),y=window.setTimeout(()=>{o=Ft(a.value),r="",i="",l()},280)}),!(!await N({title:"导入题库",body:t,actions:[{label:"取消",value:!1},{label:"导入",value:!0,variant:"primary"}],onMount:()=>l()})||c))try{const v=o.length?o:await p();if(!v.length){f.error("没解析出题目，检查一下格式，或换张更清晰的图");return}c=!0;const $=await j.questions.add(v);Q("bank"),await ct(!0),f.ok(`已导入 ${$.added??v.length} 道题`)}catch(v){f.error(v instanceof L?v.message:"导入失败")}}const $e="#0a0c0f",it="#8b9099",os="#ffffff",Mt="#1440ff";function _e(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ie(t,e,n,a){const s=a?`<text x="${t/2}" y="${e-12}" text-anchor="middle" font-size="12.5" fill="${it}" stroke="none">${_e(a)}</text>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${e}" viewBox="0 0 ${t} ${e}" fill="none">
  <rect width="${t}" height="${e}" fill="${os}"/>
  <g stroke="${$e}" stroke-width="1.6" stroke-linecap="square" color="${$e}" font-family="system-ui,-apple-system,'Segoe UI',sans-serif">
  ${n}
  ${s}
  </g>
</svg>`}function is(t){const n=t.caption?210:186,a=Number(t.span)>0?Number(t.span):6,s=Number(t.value)>0?Number(t.value):20,o=44,r=316,i=96,c=(o+r)/2,l=t.load==="point"?"kN":"kN/m",d=t.load==="point"?`P = ${s} ${l}`:`q = ${s} ${l}`,p=[];if(t.load==="point")p.push(`<path d="M${c} 44 V${i-6}"/><path d="M${c-5} ${i-14} L${c} ${i-4} L${c+5} ${i-14}"/>`);else{for(let u=0;u<=8;u+=1){const b=o+(r-o)*u/8;p.push(`<path d="M${b} 56 V${i-10}"/><path d="M${b-4} ${i-18} L${b} ${i-9} L${b+4} ${i-18}"/>`)}p.push(`<path d="M${o} 56 H${r}"/>`)}return Ie(360,n,`${p.join("")}
  <path d="M${o} ${i} H${r}"/>
  <path d="M${o} ${i} l-9 15 h18 z"/>
  <path d="M${r} ${i} l-9 15 h18 z">
  </path>
  <path d="M${o} ${i+15} H${r}" stroke="${it}" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="${c}" y="46" text-anchor="middle" font-size="12" fill="${Mt}" stroke="none">${_e(d)}</text>
  <text x="${c}" y="${i+34}" text-anchor="middle" font-size="12" fill="${it}" stroke="none">L = ${a} m</text>`,t.caption)}function cs(t){const n=t.caption?220:196,a=Number(t.width)>0?Number(t.width):300,s=Number(t.height)>0?Number(t.height):500,o=132,r=92,i=(300-o)/2,c=62;return Ie(300,n,`<text x="${300/2}" y="40" text-anchor="middle" font-size="12" fill="${Mt}" stroke="none">截面示意图（单位 mm）</text>
  <rect x="${i}" y="${c}" width="${o}" height="${r}"/>
  <path d="M${i-12} ${c} H${i-12} V${c+r} H${i-12}" stroke="${it}" stroke-width="1"/>
  <text x="${i-18}" y="${c+r/2}" text-anchor="middle" font-size="11" fill="${it}" stroke="none" transform="rotate(-90 ${i-18} ${c+r/2})">h = ${s}</text>
  <text x="${300/2}" y="${c+r+22}" text-anchor="middle" font-size="11" fill="${it}" stroke="none">b = ${a}</text>`,t.caption)}function ls(t){const e=(t.steps??[]).filter(d=>d&&d.name).slice(0,6),n=360,s=74+Math.max(1,e.length)*30+(t.caption?22:6),o=Math.max(1,...e.map(d=>Number(d.start)+Number(d.duration))),r=92,i=n-24,c=(i-r)/o,l=e.map((d,p)=>{const u=62+p*30,b=r+Number(d.start)*c,y=Math.max(6,Number(d.duration)*c);return`<text x="${r-10}" y="${u+11}" text-anchor="end" font-size="11" fill="${$e}" stroke="none">${_e(d.name)}</text>
  <rect x="${b}" y="${u}" width="${y}" height="14" fill="${Mt}" opacity="0.12" stroke="${Mt}" stroke-width="1"/>
  <text x="${b+y/2}" y="${u+11}" text-anchor="middle" font-size="10" fill="${Mt}" stroke="none">${d.duration}</text>`}).join(`
  `);return Ie(n,s,`<text x="${r}" y="38" font-size="11" fill="${it}" stroke="none">施工进度（天）→</text>
  <path d="M${r} 48 H${i}" stroke="${it}" stroke-width="1"/>
  ${l}`,t.caption)}function ds(t){if(!t||!t.kind)return"";let e="";return t.kind==="beam"?e=is(t):t.kind==="section"?e=cs(t):t.kind==="flow"&&(e=ls(t)),e?`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`:""}function us(t){if(!t||typeof t!="object")return null;const e=t,n=String(e.kind??e.type??"").toLowerCase();if(n!=="beam"&&n!=="section"&&n!=="flow")return null;const a=r=>{const i=Number(r);return Number.isFinite(i)&&i>0?i:void 0},s=String(e.load??"").toLowerCase(),o=Array.isArray(e.steps)?e.steps.map(r=>({name:String(r.name??r.title??""),start:Number(r.start??0),duration:Number(r.duration??0)})).filter(r=>r.duration>0):void 0;return{kind:n,caption:typeof e.caption=="string"?e.caption.slice(0,40):void 0,span:a(e.span),load:s==="point"?"point":s==="uniform"?"uniform":void 0,value:a(e.value),width:a(e.width),height:a(e.height),steps:o}}const ps=["基础","进阶","冲刺"],ms=[10,20,50,100,200,500,1e3],sn=20,fs=1e3,ce=t=>new Promise(e=>setTimeout(e,t));function rn(t){return C(t).replace(/^【[^】]*】/,"").replace(/[\s，。、；：？！,.;:?!'"“”‘’()（）\[\]【】]/g,"").slice(0,40)}async function gs(){const t=m.bank??[],e=[...new Set(t.map(w=>w.subject).filter(Boolean))],n=[...new Set(t.map(w=>w.chapter).filter(Boolean))],a=e[0]??"默认题库",s=document.createElement("div");if(s.innerHTML=`
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${h(a)}" placeholder="如 一建建筑">
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
          ${ms.map(w=>`<option value="${w}"${w===50?" selected":""}>${w} 道</option>`).join("")}
        </select>
      </label>
      <label class="field grow">
        <span class="field-label">难度</span>
        <select class="input" data-role="level">
          ${ps.map(w=>`<option value="${w}">${w}</option>`).join("")}
        </select>
      </label>
    </div>
    <label class="field" style="margin-top:10px">
      <span class="field-label">考点提示 <span class="muted small">（可选，越具体越好）</span></span>
      <textarea class="textarea" data-role="hint" rows="2" placeholder="如：混凝土养护时间、水化热控制"></textarea>
    </label>
    <p class="muted small" style="margin:10px 0 0">
      按每批 ${sn} 道分批生成，边生成边去重；生成完你可以先看前 12 道再决定是否入库。
      数量越多越慢（100 道约 1–2 分钟），中途可取消。
    </p>`,!await N({title:"AI 出题",body:s,actions:[{label:"取消",value:!1},{label:"开始生成",value:!0,variant:"primary"}]}))return;const r=w=>s.querySelector(`[data-role="${w}"]`)?.value.trim()??"",i=r("subject")||"默认题库",c=r("chapter"),l=Math.min(fs,Math.max(1,Number(r("count"))||20)),d=r("level")||"基础",p=r("hint"),u=document.createElement("div");u.innerHTML=`
    <div class="gen-progress">
      <div class="gen-bar"><i data-role="bar" style="width:0%"></i></div>
      <div class="row" style="justify-content:space-between;margin-top:8px">
        <span class="muted small" data-role="line">准备中…</span>
        <span class="muted small" data-role="pct">0%</span>
      </div>
    </div>
    <div class="import-list gen-scroll" data-role="feed" style="margin-top:12px"></div>`;const b=()=>u.querySelector('[data-role="bar"]'),y=()=>u.querySelector('[data-role="line"]'),E=()=>u.querySelector('[data-role="pct"]'),v=()=>u.querySelector('[data-role="feed"]');let $=!1,S="";const k=(w,_,G="")=>{const ut=Math.min(100,Math.round(w/Math.max(1,_)*100));b().style.width=`${ut}%`,E().textContent=`${ut}%`,y().textContent=`已生成 ${w} / ${_} 道${G?` · ${G}`:""}`},q=w=>{const _=document.createElement("div");_.className="import-item gen-item";const G=C(w.q).replace(/\s+/g," ").slice(0,56);for(_.innerHTML=`<div class="gen-row"><span class="gen-text">${h(G)}</span></div>`,v().prepend(_);v().childElementCount>12;)v().lastElementChild?.remove()};N({title:"正在生成",body:u,dismissible:!1,onMount:w=>{const _=document.createElement("button");_.className="btn btn-block",_.textContent="取消生成",_.addEventListener("click",()=>{$=!0,_.textContent="正在停止…"}),w.append(_)},actions:[]});const W=new Set(t.map(w=>rn(w.q??""))),M=[];let st=0,K=0,dt=0,$t=0;const Ot=c?[c]:n.length?n:[""];for(let w=0;M.length<l&&!$;w+=1){const _=Math.min(sn,l-M.length),G=Ot[w%Ot.length],ut=[...M.slice(-6),...t.slice(0,6)].map(P=>`· ${C(P.q).slice(0,40)}`),ee=[`题库：${i}`,G?`章节：${G}`:"",`数量：${_} 道`,`难度：${d}`,p?`考点提示：${p}`:"",w?`这是第 ${w+1} 批，请换一批考点，不要重复前面出过的题。`:"",ut.length?`不要与这些题相同或近似：
${ut.join(`
`)}`:"","要求：贴近真实考试题型，四个选项，答案唯一，附一句解析。"].filter(Boolean).join(`
`);let ne=[];try{const P=await j.ai.generate(ee);ne=Ne(P.result??"")}catch(P){dt+=1;const pt=P instanceof L?P.message:"网络异常";if(/次数|配额|429/.test(pt)){S=pt;break}if(S=pt,dt>=3)break;await ce(800);continue}if(!ne.length){if(dt+=1,dt>=3)break;continue}const ta=M.length;for(const P of ne){const pt=rn(P.q);if(!pt||W.has(pt)){K+=1;continue}W.add(pt);const Ue=us(P.figure),Fe=ds(Ue);if(Fe){st+=1;const ea=(Ue?.caption??"示意图").replace(/"/g,"");M.push({...P,q:`${P.q}
<img src="${Fe}" alt="${ea}">`})}else M.push(P);if(q(P),M.length>=l)break}if($t=M.length>ta?0:$t+1,$t>=3){S="模型开始重复出同一批题，先停在这里";break}k(M.length,l,K?`去重 ${K} 道`:""),await ce(250)}if(Xt(),await ce(180),!M.length){f.error(S||"一道题也没生成出来，换个提示再试");return}const Be=document.createElement("div");if(Be.innerHTML=`
    <div class="muted small" style="margin-bottom:8px">
      共 ${M.length} 道${st?`（${st} 道带示意图）`:""}${K?`，自动去重 ${K} 道`:""}${S?` · 提前结束：${h(S)}`:""}，确认后写入「${h(i)}」
    </div>
    <div class="import-list gen-scroll">
      ${M.slice(0,12).map((w,_)=>{const G=/<img\b[^>]*src="([^"]+)"/i.exec(String(w.q??"")),ut=G?`<img class="gen-thumb" src="${G[1]}" alt="示意图">`:"",ee=C(w.q).replace(/\s+/g," ").slice(0,64);return`<div class="import-item gen-item"><div class="gen-row">${ut}<span class="gen-text"><b>${_+1}.</b> ${h(ee)}${Array.isArray(w.opts)&&w.opts.length?` <span class="muted">· ${w.opts.length} 选项</span>`:""}</span></div></div>`}).join("")}
      ${M.length>12?`<div class="muted small" style="padding:8px 2px">还有 ${M.length-12} 道未展示…</div>`:""}
    </div>`,!await N({title:"确认导入",body:Be,actions:[{label:"不要了",value:!1},{label:`导入 ${M.length} 道`,value:!0,variant:"primary"}]}))return;const te=M.map(w=>({...w,subject:i,chapter:w.chapter||c}));let Rt=0;try{for(let w=0;w<te.length;w+=20){const _=te.slice(w,w+20);await j.questions.add(_),Rt+=_.length,f.info(`已写入 ${Rt} / ${te.length} 道`)}Q("bank"),await ct(!0),f.ok(`已导入 ${Rt} 道题`)}catch(w){f.error(w instanceof L?w.message:`导入中断，已写入 ${Rt} 道`),Q("bank")}}const hs=`
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
`;function Et(t){return String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]??e)}function on(t,e={}){if(!t.length){f.info("没有可导出的题目");return}const n=e.title||"练习试卷",a=new Date().toLocaleDateString("zh-CN"),s=e.answers!==!1,o=t.map((l,d)=>{const p=bt(l),u=(l.opts??[]).map((b,y)=>{const E=b.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return`<li><span class="k">${String.fromCharCode(65+y)}</span>${O(E)}</li>`}).join("");return`<article class="q">
        <div class="q-no">${String(d+1).padStart(2,"0")} · ${Dt[p]}${l.chapter?` · ${Et(l.chapter)}`:""}</div>
        <div class="q-body">${O(l.q)}</div>
        ${u?`<ul class="q-opts">${u}</ul>`:'<p class="q-tag">（简答题，请在答题纸上作答）</p>'}
      </article>`}).join(""),r=s?`<section class="answer-key">
        <h2>参考答案</h2>
        <ol>${t.map((l,d)=>`<li><span class="k">${String(d+1).padStart(2,"0")}</span>${Et(F(l.a,l.opts??[]))}</li>`).join("")}</ol>
      </section>`:"",i=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${Et(n)} · ${a}</title>
<style>${hs}</style></head>
<body>
  <header class="sheet-head">
    <div class="sheet-kicker">Origin Quiz / Practice Sheet</div>
    <h1 class="sheet-title">${Et(n)}</h1>
    <div class="sheet-meta">${a} · 共 ${t.length} 题${e.subtitle?" · "+Et(e.subtitle):""} · 姓名 __________ 得分 ______</div>
  </header>
  ${o}
  ${r}
  <p class="tips">由「原点 · Origin」导出 · 打印对话框里选择「另存为 PDF」即可保存。</p>
</body></html>`,c=window.open("","_blank");if(!c){f.error("浏览器拦住了新窗口，请允许弹出窗口后重试");return}c.document.open(),c.document.write(i),c.document.close(),c.focus(),f.ok(`已生成 ${t.length} 题的打印版，在打印里选「另存为 PDF」`)}const _n=914400,bs=6.4*_n,vs=4.2*_n,ys=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function In(t,e={}){return`<w:r><w:rPr>${['<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>',e.bold?"<w:b/>":"",e.italic?"<w:i/>":"",`<w:sz w:val="${e.size??21}"/><w:szCs w:val="${e.size??21}"/>`,e.color?`<w:color w:val="${e.color}"/>`:""].join("")}</w:rPr><w:t xml:space="preserve">${ys(t)}</w:t></w:r>`}function Y(t,e={}){const n=e.before||e.after?`<w:spacing w:before="${e.before??0}" w:after="${e.after??0}"/>`:"",a=e.indent||e.hanging?`<w:ind w:left="${e.indent??0}" w:hanging="${e.hanging??0}"/>`:"";return`<w:p><w:pPr>${n}${a}</w:pPr>${t?In(t,e):""}</w:p>`}function $s(t,e,n,a){return`<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${Math.round(n)}" cy="${Math.round(a)}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${e}" name="Picture ${e}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${e}" name="image${e}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${t}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${Math.round(n)}" cy="${Math.round(a)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`}function ws(t){return new Promise(e=>{const n=new Image;n.onload=()=>e({w:n.naturalWidth||640,h:n.naturalHeight||480}),n.onerror=()=>e(null),n.src=t})}function xs(t){const e=/^data:image\/([a-zA-Z+]+);base64,(.+)$/.exec(t);if(!e)return null;try{const n=atob(e[2]),a=new Uint8Array(n.length);for(let o=0;o<n.length;o+=1)a[o]=n.charCodeAt(o);const s=e[1].toLowerCase()==="jpeg"?"jpeg":e[1].toLowerCase();return{bytes:a,ext:s}}catch{return null}}function ks(t){const e=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html"),n=[],a=s=>{if(s.nodeType===Node.TEXT_NODE){const r=s.textContent??"";r.trim()&&n.push({kind:"text",value:r.replace(/\s+/g," ")});return}if(s.nodeType!==Node.ELEMENT_NODE)return;const o=s;if(o.tagName==="IMG"){n.push({kind:"img",value:o.getAttribute("src")??""});return}if(o.tagName==="BR"){n.push({kind:"br",value:""});return}o.childNodes.forEach(a)};return e.body.firstElementChild?.childNodes.forEach(a),n}async function Ss(t,e){const n=[],a=[];let s=0;n.push(Y(e.title??"题库练习卷",{size:32,bold:!0,after:80}));const o=[e.subtitle??"",`${t.length} 题`,"姓名 ________","得分 ________"].filter(Boolean).join("　　");n.push(Y(o,{size:18,color:"666666",after:200}));for(let u=0;u<t.length;u+=1){const b=t[u],y=bt(b),E=String(u+1).padStart(2,"0");n.push(Y(`${E}　${Dt[y]}${b.chapter?"　·　"+b.chapter:""}`,{size:18,bold:!0,color:"1440FF",before:200,after:60}));const v=ks(b.q);let $="";const S=()=>{$.trim()&&n.push(Y($.trim(),{after:60})),$=""};for(const k of v)if(k.kind==="text")$+=k.value;else if(k.kind==="br")S();else{S();const q=xs(k.value);if(!q)continue;const M=await ws(k.value)??{w:640,h:480};let st=M.w*9525,K=M.h*9525;const dt=Math.min(bs/st,vs/K,1);st*=dt,K*=dt,s+=1;const $t=`rId${100+s}`,Ot=`image${s}.${q.ext}`;a.push({relId:$t,name:Ot,bytes:q.bytes,cx:st,cy:K,id:s}),n.push($s($t,s,st,K))}if(S(),Array.isArray(b.opts)&&b.opts.length)b.opts.forEach((k,q)=>{const W=String.fromCharCode(65+q),M=String(k).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");n.push(Y(`${W}. ${M}`,{size:20,hanging:280,indent:280,after:20}))});else if(y==="blank")n.push(Y("答：________________________________",{after:40}));else if(y==="essay"){for(let k=0;k<3;k+=1)n.push(Y("　",{after:60}));n.push(Y("（请在答题纸上作答）",{size:18,color:"999999",after:40}))}}e.withAnswers!==!1&&(n.push(`<w:p><w:pPr><w:pageBreakBefore/></w:pPr>${In("参考答案",{size:28,bold:!0})}</w:p>`),t.forEach((u,b)=>{const y=String(b+1).padStart(2,"0");n.push(Y(`${y}　${F(u.a,u.opts)||"（无）"}`,{size:20,after:40}))}));const r=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>${n.join("")}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="851" w:footer="992" w:gutter="0"/></w:sectPr></w:body></w:document>`,i='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',c='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',l='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+a.map(u=>`<Relationship Id="${u.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${u.name}"/>`).join("")+"</Relationships>",d={"[Content_Types].xml":Ht(i),"_rels/.rels":Ht(c),"word/document.xml":Ht(r),"word/_rels/document.xml.rels":Ht(l)};for(const u of a)d[`word/media/${u.name}`]=u.bytes;const p=oa(d,{level:6});return new Blob([p],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})}async function cn(t,e={}){if(!t.length){f.error("没有可导出的题目");return}try{const n=await Ss(t,e),a=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,10);s.href=a,s.download=`${(e.title??"题库试卷").replace(/[\\/:*?"<>|]/g,"-")}-${o}.docx`,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(a),4e3),f.ok(`已导出 ${t.length} 题的 Word 文档`)}catch(n){f.error(n instanceof Error?`导出失败：${n.message}`:"导出失败")}}function As(t){const e=t.replace(/```json/gi,"```").trim(),n=/```([\s\S]*?)```/.exec(e)?.[1]??e,a=n.indexOf("{"),s=n.lastIndexOf("}");return a===-1||s<=a?"{}":n.slice(a,s+1)}const rt=20,g={search:"",subject:"all",type:"all",edit:!1,page:0,selected:new Set};function Dn(){g.search="",g.subject="all",g.type="all",g.edit=!1,g.page=0,g.selected.clear()}function ot(){return m.bank??[]}function Es(){return["all",...Array.from(new Set(ot().map(t=>t.subject||"默认题库")))]}function Wt(){const t=g.search.trim().toLowerCase();return ot().filter(e=>g.subject!=="all"&&(e.subject||"默认题库")!==g.subject||g.type!=="all"&&bt(e)!==g.type?!1:t?C(e.q).toLowerCase().includes(t)||e.opts.some(n=>C(n).toLowerCase().includes(t)):!0)}function On(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(n=>String.fromCharCode(65+n)).join(" / ")}function js(){const t=Wt(),e=Math.max(1,Math.ceil(t.length/rt));g.page>e-1&&(g.page=e-1),g.page<0&&(g.page=0);const n=t.slice(g.page*rt,g.page*rt+rt),a=Es().map(l=>`<button class="chip" data-act="subject" data-subject="${h(l)}" aria-pressed="${g.subject===l}">
          ${l==="all"?"全部":h(l)}
        </button>`).join(""),s=ot(),o={single:0,multi:0,judge:0,blank:0,essay:0};s.forEach(l=>{o[bt(l)]+=1});const r=[["all","全部",s.length],["single","单选",o.single],["multi","多选",o.multi],["judge","判断",o.judge],["blank","填空",o.blank],["essay","简答",o.essay]].filter(([l,,d])=>l==="all"||d>0).map(([l,d,p])=>`<button class="chip" data-act="type" data-type="${l}" aria-pressed="${g.type===l}">${d} <span class="chip-n">${p}</span></button>`).join(""),i=n.map((l,d)=>{const p=bt(l),u=String(g.page*rt+d+1).padStart(2,"0");return`<tr class="q-row ${g.edit?"selectable":"is-clickable"}" data-id="${l.id}" ${g.edit?"":'data-act="peek"'}>
        <td class="c-no">${g.edit?`<button class="checkbox" data-act="select" data-id="${l.id}" aria-pressed="${g.selected.has(l.id)}">✓</button>`:u}</td>
        <td class="c-q">
          <div class="q-cell">${Tn(O(l.q),g.search)}</div>
          ${l.opts.length?`<div class="q-sub">${l.opts.length} 个选项</div>`:""}
        </td>
        <td class="c-type"><span class="tag tag-type">${Dt[p]}</span></td>
        <td class="c-chapter muted">${h(l.chapter||"—")}</td>
        <td class="c-ans"><span class="tag tag-ok">${h(On(l))}</span></td>
        <td class="c-act"><button class="icon-btn sm" data-act="edit" data-id="${l.id}" aria-label="编辑">✎</button></td>
      </tr>`}).join(""),c=m.loading.bank&&!m.bank?`<div class="list">${Array.from({length:5}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div></div>').join("")}</div>`:t.length?`<div class="table-wrap">
          <table class="q-table">
            <thead><tr>
              <th class="c-no">NO</th><th class="c-q">题干</th><th class="c-type">题型</th>
              <th class="c-chapter">章节</th><th class="c-ans">答案</th><th class="c-act"></th>
            </tr></thead>
            <tbody>${i}</tbody>
          </table>
        </div>
        ${e>1?`<div class="pager">
                 <button class="btn btn-sm" data-act="page-prev" ${g.page===0?"disabled":""}>← 上一页</button>
                 <span class="pager-info">${g.page+1} / ${e} 页 · 共 ${t.length} 题</span>
                 <button class="btn btn-sm" data-act="page-next" ${g.page>=e-1?"disabled":""}>下一页 →</button>
               </div>`:`<p class="muted small table-count">共 ${t.length} 题</p>`}`:`<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${g.search?"没有匹配的题目":"题库还是空的"}</div><div class="empty-desc">${g.search?"换个关键词试试":"点右上角「⇪」导入 JSON / TXT / Word / 图片，或点「＋」手写"}</div></div>`;return`
    <h1 class="page-title">题库</h1>
    <div class="search-box">
      <span class="ico">⌕</span>
      <input type="search" placeholder="搜索题干或选项（/ 聚焦）" data-role="search" value="${h(g.search)}" enterkeyhint="search">
    </div>
    <div class="tool-row">
      <button class="tool-btn" data-act="import" title="导入题库">⇪<span>导入</span></button>
      <button class="tool-btn" data-act="generate" title="AI 出题">✦<span>出题</span></button>
      <button class="tool-btn" data-act="add" title="添加题目">＋<span>新建</span></button>
      <button class="tool-btn" data-act="print" title="导出试卷（打印 / 存 PDF）">⎙<span>试卷</span></button>
      <button class="tool-btn" data-act="docx" title="导出 Word（.docx）">⤓<span>Word</span></button>
      <button class="tool-btn" data-act="toggle-edit" title="批量管理">${g.edit?"✓":"☰"}<span>批量</span></button>
    </div>
    <div class="chips">${a}</div>
    <div class="chips chips-type">${r}</div>
    ${g.edit?`<div class="row between" style="margin-bottom:12px">
        <button class="btn btn-sm btn-ghost" data-act="select-all">${g.selected.size===t.length&&t.length?"取消全选":"全选本页"}</button>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export" ${g.selected.size?"":"disabled"}>导出 JSON</button>
          <button class="btn btn-sm" data-act="print-selected" ${g.selected.size?"":"disabled"}>导出试卷</button>
          <button class="btn btn-sm" data-act="docx-selected" ${g.selected.size?"":"disabled"}>导出 Word</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${g.selected.size?"":"disabled"}>删除</button>
        </div>
      </div>`:""}
    ${c}`}async function we(t){const e=!t,n={editor:null},a=document.createElement("div");if(a.innerHTML=`
    <label class="field">
      <span class="field-label">题干</span>
      <div data-role="q-host"></div>
    </label>
    <div class="row" style="gap:8px;margin-top:-8px;flex-wrap:wrap">
      <span class="muted small">粗体 / 上下标 / 列表 / ∑ 公式 / ▣ 图片（自动压缩内联）</span>
    </div>
    <label class="field">
      <span class="field-label">选项（每行一个，留空表示简答题）</span>
      <textarea class="textarea" data-role="opts" placeholder="A. 选项一&#10;B. 选项二">${h((t?.opts??[]).join(`
`))}</textarea>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>
      <input class="input" data-role="a" value="${h(t?On(t):"")}" placeholder="A">
    </label>
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">章节</span>
        <input class="input" data-role="chapter" value="${h(t?.chapter??"")}" placeholder="如 第三章">
      </label>
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${h(t?.subject??"默认题库")}" placeholder="默认题库">
      </label>
    </div>
    <label class="field">
      <span class="field-label">解析 <span class="muted small">（错题复习时直接看，不用每次问 AI）</span></span>
      <textarea class="textarea" data-role="explain" rows="3" placeholder="为什么选它、其他选项错在哪">${h(t?.explain??"")}</textarea>
    </label>
    <div class="row" style="justify-content:flex-end;gap:8px;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="gen-explain">✦ 生成解析</button>
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`,!await N({title:e?"添加题目":"编辑题目",body:a,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:p=>{const u=p.querySelector('[data-role="q-host"]');u&&(n.editor=Ka({value:t?.q??"",placeholder:"输入题干；可用工具栏插图、写公式（$…$）",minHeight:110}),u.appendChild(n.editor.el));const b=p.querySelector('[data-role="gen-explain"]');b?.addEventListener("click",async()=>{const E=C(n.editor?.getValue()??"").trim(),v=p.querySelector('[data-role="opts"]')?.value??"",$=p.querySelector('[data-role="a"]')?.value??"";if(!E){f.error("先写题干，AI 才能写解析");return}const S=p.querySelector('[data-role="explain"]'),k=b.textContent??"";b.disabled=!0,b.textContent="生成中…";try{const q=await j.ai.explain(`题目：${E}
选项：${v.split(`
`).join("；")}
正确答案：${$}`);S&&(S.value=(q.result??"").trim()),f.ok("解析已生成，可再手动润色")}catch(q){f.error(q instanceof L?q.message:"生成失败")}finally{b.disabled=!1,b.textContent=k}});const y=p.querySelector('[data-role="classify"]');y&&y.addEventListener("click",async()=>{const E=C(n.editor?.getValue()??"").trim();if(!E){f.error("先写题干，AI 才能判断归类");return}const v=p.querySelector('[data-role="opts"]')?.value??"",$=y.textContent??"";y.disabled=!0,y.textContent="归类中…";try{const S=await j.ai.classify(`题目：${E}
选项：${v.split(`
`).join("；")}`),k=JSON.parse(As(S.result??"{}")),q=p.querySelector('[data-role="subject"]'),W=p.querySelector('[data-role="chapter"]');k.subject&&q&&(q.value=String(k.subject).slice(0,24)),k.chapter&&W&&(W.value=String(k.chapter).slice(0,24)),f.ok("已根据题目填入题库与章节")}catch{f.error("AI 归类失败，可手动填写")}finally{y.disabled=!1,y.textContent=$}})}}))return;const o=p=>a.querySelector(`[data-role="${p}"]`).value,r=(n.editor?.getValue()??"").trim();if(!C(r).trim()&&!/<img/i.test(r)){f.error("题干不能为空");return}const i=o("opts").split(`
`).map(p=>p.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),c=o("a").trim();let l="";if(i.length){const u=c.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(b=>b.charCodeAt(0)-65).filter(b=>b>=0&&b<i.length);if(!u.length){f.error("答案请填选项字母，如 A 或 A,B");return}l=u.length===1?u[0]:u}else l=c;const d={q:r,opts:i,a:l,chapter:o("chapter").trim(),subject:o("subject").trim()||"默认题库",explain:o("explain").trim()};try{if(e)await j.questions.add([d]);else try{await j.questions.update(t.id,d,{baseUpdatedAt:t.updated_at})}catch(p){if(p instanceof L&&p.status===409){if(!await yt({title:"这道题在别处被改过",message:"另一台设备保存了这题的更新版本。要用你现在的内容覆盖它吗？",okText:"覆盖",danger:!0}))return;await j.questions.update(t.id,d,{force:!0})}else throw p}Q("bank"),await ct(!0),f.ok(e?"题目已添加":"题目已保存")}catch(p){f.error(p instanceof L?p.message:"保存失败")}}async function Ls(){await rs()}function qs(){const t=ot().filter(s=>g.selected.has(s.id));if(!t.length){f.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=`题库-${t.length}题.json`,a.click(),URL.revokeObjectURL(n),f.ok(`已导出 ${t.length} 题`)}async function Ms(){await ct()}async function Ts(t,e){switch(t){case"subject":return g.subject=e.dataset.subject??"all",!0;case"toggle-edit":return g.edit=!g.edit,g.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return g.selected.has(n)?g.selected.delete(n):g.selected.add(n),!0}case"add":return await we(),!0;case"edit":{const n=ot().find(a=>a.id===Number(e.dataset.id));return n&&await we(n),!0}case"delete-selected":{const n=[...g.selected];if(!n.length||!await yt({title:"删除题目",message:`确定删除选中的 ${n.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await j.questions.remove(n),g.selected.clear(),Q("bank"),await ct(!0),f.ok("已删除")}catch(a){f.error(a instanceof L?a.message:"删除失败")}return!0}case"export":return qs(),!0;case"print":return on(Wt(),{title:`题库 · ${g.subject==="all"?"全部":g.subject}`}),!0;case"docx":return await cn(Wt(),{title:`题库 · ${g.subject==="all"?"全部":g.subject}`,subtitle:"原点 · Origin"}),!0;case"docx-selected":return await cn(ot().filter(n=>g.selected.has(n.id)),{title:"选中题目 · 试卷",subtitle:"原点 · Origin"}),!0;case"print-selected":return on(ot().filter(n=>g.selected.has(n.id)),{title:"选中题目 · 试卷"}),!0;case"page-prev":return g.page=Math.max(0,g.page-1),!0;case"page-next":return g.page+=1,!0;case"select-all":{const n=Wt().slice(g.page*rt,g.page*rt+rt),a=n.every(s=>g.selected.has(s.id));return n.forEach(s=>a?g.selected.delete(s.id):g.selected.add(s.id)),!0}case"generate":return await gs(),!0;case"import":return await Ls(),!0;case"type":{const n=e.dataset.type;return n&&(g.type=n,g.page=0),!0}case"peek":{const n=Number(e.dataset.id),a=ot().find(s=>s.id===n);return a&&await Cs(a),!0}case"search":return!0;default:return!1}}async function Cs(t){const e=bt(t),n=document.createElement("div");n.className="peek",n.innerHTML=`
    <div class="peek-meta">
      <span class="tag tag-type">${Dt[e]}</span>
      ${t.subject?`<span class="tag">${h(t.subject)}</span>`:""}
      ${t.chapter?`<span class="tag">${h(t.chapter)}</span>`:""}
    </div>
    <div class="peek-q q-text">${O(t.q)}</div>
    ${t.opts.length?`<ul class="peek-opts">${t.opts.map((s,o)=>`<li class="${(Array.isArray(t.a)?t.a.includes(o):t.a===o)?"is-hit":""}"><b>${String.fromCharCode(65+o)}</b>${O(String(s).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</li>`).join("")}</ul>`:""}
    <div class="peek-ans"><span class="muted">答案</span> ${h(F(t.a,t.opts)||"（无）")}</div>`,await N({title:"题目预览",body:n,actions:[{label:"关闭",value:"close"},{label:"编辑这题",value:"edit",variant:"primary"}]})==="edit"&&await we(t)}function Ns(t){return t.dataset.role==="search"?(g.search=t.value,g.page=0,!0):!1}const _s="modulepreload",Is=function(t){return"/"+t},ln={},Ds=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let r=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");s=r(n.map(l=>{if(l=Is(l),l in ln)return;ln[l]=!0;const d=l.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":_s,d||(u.as="script"),u.crossOrigin="",u.href=l,c&&u.setAttribute("nonce",c),document.head.appendChild(u),d)return new Promise((b,y)=>{u.addEventListener("load",b),u.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return s.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function Rn(t){return new Promise(e=>window.setTimeout(e,t))}function Os(t,e,n=620,a="%"){const s=performance.now(),o=r=>{const i=Math.min((r-s)/n,1),c=1-Math.pow(1-i,3);t.innerHTML=`${Math.round(e*c)}<span>${a}</span>`,i<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}function Gt(t=12){H.vibration&&navigator.vibrate?.(t)}let A=null,Tt=null;function St(){return A?A.options.questions[A.idx]??null:null}function Yt(t){const e=A;let n=e.records.get(t.id);return n||(n={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,n)),n}function Hn(){const t=A;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function Rs(){const t=A;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function Hs(t,e){if(R(t.a))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${h(e.text)}</textarea>
      </div>`;const n=It(t.a);return`<div class="opts" data-multi="${n.length>1}">${t.opts.map((s,o)=>{let r="";return e.submitted?n.includes(o)?r="correct":e.picked.includes(o)?r="wrong":r="muted":e.picked.includes(o)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${o}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+o)}</span>
        <span class="opt-text">${O(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function Ps(t,e){if(!e.submitted)return"";const n=R(t.a)?String(t.a):F(t.a,t.opts),a=R(t.a)?C(e.text)||"（空）":F(e.picked.length?e.picked:[],t.opts)||"（未选）";if(R(t.a)){const o=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${A?.busy?"disabled":""}>✦ AI 阅卷</button>
          <button class="btn btn-sm" data-act="mark" data-ok="1">我答对了</button>
          <button class="btn btn-sm" data-act="mark" data-ok="0">没答对</button>
        </div>`:`<div class="essay-actions"><span class="tag ${e.correct?"tag-ok":"tag-bad"}">${e.correct?"已标记：答对":"已标记：答错"}</span></div>`;return`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${h(n)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${h(a)}
      <div class="divider"></div>
      ${o}
    </div>`}const s=(t.explain??"").trim();return`<div class="answer-panel">
    <div class="ai-title">${e.correct?"✅ 回答正确":"❌ 回答错误"}</div>
    正确答案：${h(F(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${h(a)}`}
    ${s?`<div class="divider"></div><div class="ai-title" style="color:var(--text-3)">解析</div><div class="explain-body">${O(s)}</div>`:""}
  </div>`}function zs(){const t=A,e=St();if(!e)return"";const n=Yt(e),a=t.options.questions.length,s=a?Math.round((t.idx+(n.submitted?1:0))/a*100):0,o=It(e.a).length>1&&!R(e.a);return`
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
          ${e.subject?`<span class="tag tag-accent">${h(e.subject)}</span>`:""}
          ${e.chapter?`<span class="tag">${h(e.chapter)}</span>`:""}
          <span class="grow"></span>
          <span>${o?"多选":R(e.a)?"简答":"单选"}</span>
        </div>
        <div class="q-text">${O(e.q)}</div>
        ${Hs(e,n)}
        ${Ps(e,n)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${Kt(e.id)}" aria-label="收藏">${Kt(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!Le()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${n.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===a-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${o||R(e.a)?"提交答案":"查看答案"}</button>`}
    </div>`}function Bs(t,e){A={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},U(),Tt=n=>{const a=A;if(!a)return;const s=n.target,o=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(n.key==="Escape"){if(document.querySelector(".modal-layer"))return;He();return}if(o)return;const r=St();if(!r)return;const i=Yt(r);if(n.key===" "||n.key==="Enter"){const l=a.root?.querySelector('[data-act="submit"]'),d=a.root?.querySelector('[data-act="next"]');l?(n.preventDefault(),V("submit",l)):d&&(n.preventDefault(),V("next",d));return}if(n.key==="ArrowRight"){n.preventDefault(),i.submitted?Oe():V("submit",a.root.querySelector('[data-act="submit"]'));return}if(n.key==="ArrowLeft"){n.preventDefault(),V("prev",a.root);return}const c=n.key.toLowerCase();if(/^[1-9]$/.test(c)||/^[a-h]$/.test(c)){const l=/^[1-9]$/.test(c)?Number(c)-1:c.charCodeAt(0)-97;if(l<r.opts.length){n.preventDefault();const d=a.root?.querySelector(`.opt[data-idx="${l}"]`);d&&V("pick",d)}return}c==="s"?V("fav",a.root):c==="n"?V("note",a.root):c==="e"?V("ai",a.root):c==="g"?V("ai-grade",a.root):c==="?"&&Ds(()=>Promise.resolve().then(()=>wr),void 0).then(l=>l.openShortcuts())},document.addEventListener("keydown",Tt),t.addEventListener("submit",n=>n.preventDefault()),t.addEventListener("input",Pn)}function U(){const t=A;t?.root&&(t.root.innerHTML=zs())}function Pn(t){const e=t.target;e?.dataset.role!=="essay"||!A||(A.textDraft=e.value)}async function le(t,e){const n=A;if(e.submitted=!0,R(t.a))e.correct=null;else if(e.correct=vn(e.picked,t.a),e.correct){Gt(10);const a=Us();a>=3&&a%3===0&&f.ok(`连对 ${a} 题，保持住`)}else Gt([14,40,14]),De(t,e);U(),e.correct&&n.options.questions.length>n.idx+1&&(await Rn(600),A&&A.idx===n.idx&&Oe())}function Us(){const t=A;let e=0;for(let n=t.idx;n>=0;n-=1){const a=t.records.get(t.options.questions[n].id);if(a?.submitted)if(a.correct===!0)e+=1;else break}return e}async function De(t,e){try{await j.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(n){n instanceof L&&n.status!==401&&f.error(`错题保存失败：${n.message}`)}}function Oe(){const t=A,e=t.options.questions.length;if(t.idx>=e-1){Fs();return}t.idx+=1,t.textDraft="",U(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function Re(){Tt&&document.removeEventListener("keydown",Tt),Tt=null,A?.root?.removeEventListener("input",Pn),A?.root?.replaceChildren(),A=null}async function He(){const t=A;if(!t)return;const e=Hn();if(!await yt({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;St()&&zn();const s=t.options.onExit;Re(),s?.()}function zn(){const t=A;if(!t)return;t.options.source==="sequential"&&wa(t.idx);const e=t.options.questions.slice(0,5).map(n=>C(n.q).slice(0,40));ka(e)}async function Fs(){const t=A;zn();const e=t.options.questions.length,n=Hn(),a=Rs(),s=n-a,o=n?Math.round(a/n*100):0;if(Re(),await N({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${a}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${n}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:i=>{const c=i.querySelector('[data-role="acc"]');c&&Os(c,o)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function Ws(t,e,n){e.correct=n,n?Gt(10):De(t,e),U(),n&&f.ok("已记为答对")}async function Ks(t,e){const n=A;if(n){n.busy=!0,U();try{const a=[`题目：${C(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${C(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await j.ai.grade(a),o=String(s.result||""),r=o.includes("得分")&&!o.includes("不得分");e.correct=r,r?Gt(10):De(t,e),f.ok(r?"AI 阅卷：答对":"AI 阅卷：答错")}catch(a){f.error(a instanceof L?a.message:"AI 阅卷失败，请稍后再试")}finally{n.busy=!1,U()}}}async function Gs(){const t=St();if(!t)return;const e=Le()[String(t.id)]??"",n=document.createElement("div");n.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${h(e)}</textarea>`;const a=n.querySelector("textarea");await N({title:"我的笔记",body:n,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>a.focus()})&&($a(t.id,a.value),f.ok("笔记已保存"),U())}async function Js(){const t=St();if(!t)return;const e=Yt(t),n=[`题目：${C(t.q)}`,t.opts.length?`选项：${t.opts.map((r,i)=>`${String.fromCharCode(65+i)}. ${C(r)}`).join("；")}`:"",`正确答案：${R(t.a)?t.a:F(t.a,t.opts)}`,e.submitted?`我的作答：${R(t.a)?e.text:F(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),a=document.createElement("div");a.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',N({title:"AI 深度解析",body:a,actions:[{label:"关闭",value:"close"}]});const s=a.querySelector('[data-role="text"]'),o=a.querySelector(".ai-title");try{let r="";const i=await j.ai.explainStream(n,l=>{r+=l,s.innerHTML=`${h(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),c=i.provider==="deepseek"?"DeepSeek":i.provider==="zhipu"?"智谱":"";o.textContent=r?`✦ AI 解析${c?` · ${c}`:""}${i.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=h(i.text||r).replace(/\n/g,"<br>"):await Vs(s,i.text??""),s.classList.remove("cursor")}catch(r){const i=r instanceof L?r.message:"AI 解析失败，请稍后重试";f.error(i),o.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=i}}async function Vs(t,e){for(let n=0;n<e.length;n+=2)t.innerHTML=h(e.slice(0,n+2)).replace(/\n/g,"<br>"),await Rn(12)}function Qs(){const t=A;if(!t)return;const e=t.options.questions.map((n,a)=>{const s=t.records.get(n.id),o=a===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${a}" data-state="${o}">${a+1}</button>`}).join("");N({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:n=>{n.querySelectorAll(".nav-cell").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.dataset.idx);!Number.isFinite(s)||!A||(A.idx=s,A.textDraft="",Xt(),U())})})}}).then(n=>{n==="finish"&&He()})}async function V(t,e){const n=A;if(!n)return!1;const a=St();if(!a)return!1;const s=Yt(a);switch(t){case"pick":{if(s.submitted)return!0;const o=Number(e.dataset.idx);return R(a.a)||(It(a.a).length>1?(s.picked=s.picked.includes(o)?s.picked.filter(i=>i!==o):[...s.picked,o],U()):(s.picked=[o],await le(a,s))),!0}case"submit":{if(R(a.a)){const o=n.root?.querySelector('[data-role="essay"]');if(s.text=o?.value??n.textDraft,!s.text.trim())return f.info("先写点什么再提交吧"),!0;await le(a,s)}else{if(!s.picked.length)return f.info("请先选择答案"),!0;await le(a,s)}return!0}case"ai-grade":return!R(a.a)||A?.busy||await Ks(a,s),!0;case"mark":return R(a.a)&&Ws(a,s,e.dataset.ok==="1"),!0;case"next":return Oe(),!0;case"prev":return n.idx>0&&(n.idx-=1,n.textDraft="",U()),!0;case"jump":return n.idx=Number(e.dataset.idx),n.textDraft="",Xt(),U(),!0;case"nav":return Qs(),!0;case"exit":return await He(),!0;case"fav":return await Da(a.id),U(),!0;case"note":return await Gs(),!0;case"ai":return Js(),!0;default:return!1}}let Z=null;function Xs(){return!!(Z&&document.body.contains(Z))}function xt(t){if(!t.questions.length){f.info("这里还没有题目");return}dn(),Z=document.createElement("div"),Z.className="quiz",document.body.appendChild(Z),document.body.classList.add("is-locked"),Bs(Z,{...t,onExit:()=>{dn(),t.onExit?.()}}),xa({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function dn(){Z&&(Re(),Z.remove(),Z=null,document.body.classList.remove("is-locked"))}async function de(t="random"){const e=m.bank??[];if(!e.length){f.info("题库还是空的，先去添加题目吧");return}if(t==="chapter"){const a=await tr(e);if(!a?.length)return;const s=e.filter(r=>a.includes(r.chapter||"未分类")),o=await Jt(s.length);if(o===null)return;xt({questions:s.slice(0,o),source:"chapter",title:"章节练习"});return}const n=await Jt(e.length);if(n!==null){if(t==="sequential"){const a=Math.min(xn(),Math.max(e.length-1,0));xt({questions:e.slice(0,n),source:"sequential",title:"顺序练习",startIndex:a<n?a:0});return}xt({questions:bn(e).slice(0,n),source:"all",title:"随机练习"})}}async function Bn(){const t=m.wrong??await ht(!0);if(!t.length){f.info("错题本是空的，先去刷几题吧");return}const e=await Jt(t.length);if(e===null)return;const n=t.slice(0,e).map(a=>({id:a.id,q:a.q,opts:a.opts,a:a.a,chapter:a.chapter,subject:a.subject}));xt({questions:n,source:"wrong",title:"错题重练"})}function Ys(t){if(!t.length){f.info("还没有收藏题目");return}Jt(t.length).then(e=>{e!==null&&xt({questions:bn(t).slice(0,e),source:"fav",title:"收藏练习"})})}function Zs(){const t=kn(),e=m.bank??[];if(!t||!e.length)return f.info("没有可以继续的练习"),!1;const n=new Map(e.map(s=>[s.id,s])),a=t.ids.map(s=>n.get(s)).filter(s=>!!s);return a.length?(xt({questions:a,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,a.length-1)}),!0):(Sn(),f.info("上次的题目已经不在了"),!1)}function Jt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const n=document.createElement("div");n.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const a=n.querySelector('[data-role="count"]');return a.addEventListener("click",s=>{const o=s.target.closest("button[data-n]");o&&(a.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),o.setAttribute("aria-pressed","true"))}),N({title:"练多少题",body:n,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const o=a.querySelector('button[aria-pressed="true"]');return Number(o?.dataset.n??t)})}async function tr(t){const e=new Map;t.forEach(r=>{const i=r.chapter?.trim()||"未分类";e.set(i,(e.get(i)??0)+1)});const n=[...e.entries()].sort((r,i)=>i[1]-r[1]);if(!n.length)return null;const a=document.createElement("div");if(a.innerHTML=`<div class="list">${n.map(([r,i],c)=>`
      <button class="item" data-chapter="${h(r)}" data-checked="${c===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${h(r)}</span><span class="tag">${i} 题</span></div>
      </button>`).join("")}</div>`,a.addEventListener("click",r=>{const i=r.target.closest("[data-chapter]");i&&(i.dataset.checked=i.dataset.checked==="true"?"false":"true")}),!await N({title:"选择章节",body:a,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const o=Array.from(a.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return o.length?o:null}const gt=new Set;function er(){gt.clear()}function xe(){return m.favs??[]}function nr(){const t=xe(),e=m.loading.fav&&!m.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(n=>`
        <div class="item" data-id="${n.id}">
          <div class="item-q">${O(n.q)}</div>
          <div class="item-meta">
            ${n.subject?`<span class="tag tag-accent">${h(n.subject)}</span>`:""}
            ${n.chapter?`<span class="tag">${h(n.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${n.id}">${gt.has(n.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${n.id}">取消收藏</button>
          </div>
          ${gt.has(n.id)?`<div class="item-answer"><div class="right">${h(F(n.a,n.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function ar(){await Nt()}async function sr(t,e){switch(t){case"practice":return xe().length?(await Ys(xe()),!0):(f.info("还没有收藏的题"),!0);case"reveal":{const n=Number(e.dataset.id);return gt.has(n)?gt.delete(n):gt.add(n),!0}case"remove":{const n=Number(e.dataset.id);try{await j.favorites.remove(n),gt.delete(n),Q("fav"),await Nt(!0),f.ok("已取消收藏")}catch(a){f.error(a instanceof L?a.message:"操作失败")}return!0}default:return!1}}let D=null,kt=null,Ct=null;const rr=t=>String.fromCharCode(65+t),or=t=>typeof t.a=="number"||Array.isArray(t.a);function Un(t){const e=Math.max(0,Math.round(t/1e3)),n=Math.floor(e/60),a=e%60;return`${String(n).padStart(2,"0")}:${String(a).padStart(2,"0")}`}async function ir(){const t=(m.bank??[]).filter(or);if(t.length<3){f.error("题库里的客观题不足 3 道，先导入或手写几道再考");return}const e=document.createElement("div");if(e.innerHTML=`
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
    <p class="muted small" style="margin:12px 0 0">可选 ${t.length} 道客观题；考试中不显示对错。</p>`,!await N({title:"模拟考试",body:e,actions:[{label:"取消",value:!1},{label:"开始考试",value:!0,variant:"primary"}]}))return;const a=(i,c)=>{const l=e.querySelector(`[data-role="${i}"]`),d=Number(l?.value);return Number.isFinite(d)&&d>0?d:c},s=Math.min(t.length,a("count",Math.min(20,t.length))),o=Math.min(180,a("min",15));D={questions:[...t].sort(()=>Math.random()-.5).slice(0,s),picks:new Map,idx:0,endsAt:Date.now()+o*60*1e3,timer:window.setInterval(lr,1e3),submitted:!1},cr()}function cr(){const t=document.getElementById("app-root")??document.body,e=document.createElement("div");e.className="exam",t.appendChild(e),kt=e,Zt(),Ct=n=>{if(!(!D||document.querySelector(".modal-layer"))){if(n.key==="ArrowRight")n.preventDefault(),Vt(1);else if(n.key==="ArrowLeft")n.preventDefault(),Vt(-1);else if(/^[a-h1-8]$/i.test(n.key)){const a=/^\d$/.test(n.key)?Number(n.key)-1:n.key.toLowerCase().charCodeAt(0)-97;Fn(a)}}},document.addEventListener("keydown",Ct)}function lr(){const t=D;if(!t||t.submitted)return;if(Date.now()>=t.endsAt){Pe(!0);return}const e=kt?.querySelector(".exam-clock");if(e){const n=t.endsAt-Date.now();e.textContent=Un(n),e.classList.toggle("is-urgent",n<=6e4)}}function Zt(){const t=D;if(!t||!kt)return;const e=t.questions[t.idx],n=t.picks.get(e.id)??[],a=t.endsAt-Date.now(),s=t.questions.filter(r=>(t.picks.get(r.id)??[]).length>0).length,o=Array.isArray(e.a)&&e.a.length>1;kt.innerHTML=`
    <div class="exam-bar">
      <button class="icon-btn" data-ex="exit" aria-label="退出">←</button>
      <div class="exam-progress">${t.idx+1} / ${t.questions.length} · 已答 ${s}</div>
      <span class="exam-clock ${a<=6e4?"is-urgent":""}">${Un(a)}</span>
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
                <span class="opt-key">${rr(i)}</span>
                <span class="opt-text">${O(String(r).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
              </button>`).join("")}
        </div>
      </article>
    </div>
    <div class="exam-foot">
      <button class="btn" data-ex="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${t.idx===t.questions.length-1?"":'<button class="btn" data-ex="next">下一题</button>'}
      <button class="btn btn-primary" data-ex="submit">交卷</button>
    </div>`}function Fn(t){const e=D;if(!e)return;const n=e.questions[e.idx];if(t<0||t>=n.opts.length)return;const a=Array.isArray(n.a)&&n.a.length>1,s=e.picks.get(n.id)??[];a?e.picks.set(n.id,s.includes(t)?s.filter(o=>o!==t):[...s,t]):e.picks.set(n.id,[t]),Zt()}function Vt(t){const e=D;if(!e)return;const n=e.idx+t;n<0||n>=e.questions.length||(e.idx=n,Zt())}function dr(){const t=D;if(!t)return;const e=document.createElement("div");e.className="nav-grid",e.innerHTML=t.questions.map((n,a)=>`<button class="nav-cell ${(t.picks.get(n.id)??[]).length>0?"is-done":""} ${a===t.idx?"is-cur":""}" data-idx="${a}">${a+1}</button>`).join(""),e.addEventListener("click",n=>{const a=n.target.closest(".nav-cell");if(!a||!D)return;const s=Number(a.dataset.idx);Number.isFinite(s)&&(D.idx=s,document.querySelector(".modal-layer")?.remove(),Zt())}),N({title:"答题卡",body:e,actions:[{label:"继续答题",value:"close"},{label:"交卷",value:"submit",variant:"primary"}]}).then(n=>{n==="submit"&&Pe(!1)})}async function Pe(t){const e=D;if(!e||e.submitted)return;const n=e.questions.filter(i=>(e.picks.get(i.id)??[]).length===0).length;if(!t&&n>0&&!await yt({title:"还有题没答",message:`还有 ${n} 道没答，确定交卷？`,okText:"交卷"}))return;e.submitted=!0,window.clearInterval(e.timer);let a=0;const s=[];for(const i of e.questions){const c=e.picks.get(i.id)??[];c.length&&vn(c,i.a)?a+=1:s.push(i)}const o=Math.round(a/e.questions.length*100);for(const i of s)j.wrong.add({q:i.q,opts:i.opts,a:i.a,chapter:i.chapter,subject:i.subject,explain:i.explain,user_choice:e.picks.get(i.id)??[]}).catch(()=>{});const r=document.createElement("div");r.className="exam-result",r.innerHTML=`
    <div class="score-big">${o}<span>分</span></div>
    <div class="score-sub">答对 ${a} / ${e.questions.length} · ${t?"时间到自动交卷":"手动交卷"}</div>
    ${s.length?`<div class="wrong-list">${s.slice(0,8).map(i=>`<div class="wrong-item">
                <div class="wrong-q">${O(i.q)}</div>
                <div class="wrong-a">
                  <b class="bad">你选 ${F(e.picks.get(i.id)??[],i.opts)||"未答"}</b>
                  <span class="ok">正确 ${F(i.a,i.opts)}</span>
                </div>
              </div>`).join("")}${s.length>8?`<div class="muted small">…还有 ${s.length-8} 道已进错题本</div>`:""}</div>`:'<div class="all-right">全对，厉害</div>'}`,await N({title:"考试结果",body:r,actions:[{label:"知道了",value:"close",variant:"primary"}]}),Wn()}function Wn(){D&&window.clearInterval(D.timer),D=null,Ct&&document.removeEventListener("keydown",Ct),Ct=null,kt?.remove(),kt=null}function Kn(t,e){if(!D)return!1;switch(t){case"pick":return Fn(Number(e.dataset.idx)),!0;case"prev":return Vt(-1),!0;case"next":return Vt(1),!0;case"sheet":return dr(),!0;case"submit":return Pe(!1),!0;case"exit":return(async()=>await yt({title:"退出考试",message:"退出后本次作答不保留，确定吗？",danger:!0,okText:"退出"})&&Wn())(),!0;default:return!1}}function Gn(){return!!D}let ue="";function ur(){return(!Aa()||!ue)&&(ue=Oa(),Ea()),ue}function pr(){const t=new Date,e=a=>String(a).padStart(2,"0"),n="日一二三四五六"[t.getDay()];return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())} / 周${n}`}const mr=t=>String(t).padStart(2,"0");function fr(){const t=m.bank,e=m.wrong,n=m.favs,a=m.loading,s=kn(),o=An().slice(0,4),r=xn(),i=t?t.length:0,c=Math.min(20,Math.max(5,i||10)),l='<div class="skeleton sk-line w60"></div><div class="skeleton sk-line w80"></div>',d=p=>p===void 0?"—":String(p).padStart(2,"0");return`
    <section class="masthead">
      <div class="mast-meta">
        <span>${pr()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${m.user?`@${h(m.user)}`:"未登录"}</span>
      </div>
      <h1 class="mast-title">
        今天<br />练 <em>${String(c).padStart(2,"0")}</em> 题
      </h1>
      <p class="mast-sub">${h(ur())}</p>
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

    ${a.bank&&!t?`<div class="card card-pad">${l}</div>`:""}

    ${t&&!t.length?`<button class="cta" data-act="goto" data-tab="bank">
             <span class="cta-kicker">EMPTY / 题库为空</span>
             <span class="cta-title">先导入题库</span>
             <span class="cta-arrow" aria-hidden="true">→</span>
           </button>`:`<button class="cta" data-act="random" ${t?"":"disabled"}>
             <span class="cta-kicker">START / 随机抽题</span>
             <span class="cta-title">开始练习</span>
             <span class="cta-arrow" aria-hidden="true">→</span>
           </button>`}

    <button class="exam-entry" data-act="exam">
      <span class="exam-entry-label">MOCK EXAM</span>
      <span class="exam-entry-title">模拟考试</span>
      <span class="exam-entry-desc">限时 <b>15</b> 分钟 · 交卷才出分 · 错题自动进错题本</span>
      <span class="exam-entry-arrow">→</span>
    </button>

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

    ${o.length?`<section class="recent">
             <div class="section-title">最近练过</div>
             ${o.map((p,u)=>`<div class="recent-row"><span class="recent-idx">${mr(u+1)}</span><span class="recent-text">${h(p)}</span></div>`).join("")}
           </section>`:""}
  `}async function gr(){await Promise.allSettled([ct(),ht(),Nt()])}async function hr(t,e){switch(t){case"goto":return Qt(e.dataset.tab??"bank"),!0;case"random":return await de("random"),!0;case"sequential":return await de("sequential"),!0;case"chapter":return await de("chapter"),!0;case"wrong":return await Bn(),!0;case"resume":return Zs(),!0;case"exam":return await ir(),!0;default:return!1}}const pe=8;function br(){const t=[],e=(n,a,s)=>{(n??[]).forEach(o=>t.push({id:o.id,q:o,source:a,tab:s}))};return e(m.bank,"题库","bank"),e(m.wrong,"错题","wrong"),e(m.favs,"收藏","fav"),t}function vr(t,e){const n=e.toLowerCase();return n?C(t.q.q).toLowerCase().includes(n)||(t.q.opts??[]).some(a=>C(a).toLowerCase().includes(n))||C(t.q.chapter??"").toLowerCase().includes(n)||C(t.q.subject??"").toLowerCase().includes(n):!0}function un(t=""){const e=document.createElement("div");e.className="search-panel",e.innerHTML=`
    <div class="search-box">
      <span class="ico">⌕</span>
      <input class="search-input" type="search" data-role="kw" placeholder="搜题干、选项、章节、题库…" value="${t.replace(/"/g,"&quot;")}">
    </div>
    <div class="search-results" data-role="hits"></div>
    <p class="muted small search-foot" data-role="foot"></p>`;const n=br(),a=e.querySelector('[data-role="hits"]'),s=e.querySelector('[data-role="foot"]'),o=e.querySelector('[data-role="kw"]'),r=()=>{const i=o.value.trim(),c=n.filter(p=>vr(p,i));if(!i){const p=c.filter(u=>u.tab==="bank").slice(0,12);a.innerHTML=p.length?p.map(u=>`<button class="hit" data-act="open" data-tab="${u.tab}" data-id="${u.id}">
                <span class="hit-src">${u.source}</span>
                <span class="hit-q">${O(u.q.q)}</span>
              </button>`).join(""):'<p class="muted small">题库还是空的，先去导入吧。</p>',s.textContent=p.length?"输入关键词可以跨题库 / 错题 / 收藏一起搜":"";return}const l=p=>c.filter(u=>u.source===p),d=[];["题库","错题","收藏"].forEach(p=>{const u=l(p);u.length&&(d.push(`<div class="hit-group">${p} · ${u.length}</div>`),d.push(u.slice(0,pe).map(b=>{const y=bt(b.q);return`<button class="hit" data-act="open" data-tab="${b.tab}" data-id="${b.id}">
              <span class="hit-src">${Dt[y]}</span>
              <span class="hit-q">${Tn(O(b.q.q),i)}</span>
            </button>`}).join("")),u.length>pe&&d.push(`<div class="hit-more muted small">还有 ${u.length-pe} 条，缩小关键词试试</div>`))}),a.innerHTML=d.length?d.join(""):`<p class="muted small">没有找到「${i}」</p>`,s.textContent=`共命中 ${c.length} 条`};o.addEventListener("input",r),N({title:"全局搜索",body:e,actions:[{label:"关闭",value:"close"}],onMount:i=>{r();const c=i.querySelector('[data-role="kw"]');c?.focus(),c?.setSelectionRange(c.value.length,c.value.length),i.addEventListener("click",l=>{const d=l.target.closest(".hit");if(!d)return;const p=d.dataset.tab??"bank",u=Number(d.dataset.id),b=n.find(y=>y.id===u&&y.tab===p);if(Xt(),Qt(p),b){const y=C(b.q.q).slice(0,12);if(p==="bank"){const E=document.querySelector('.view input[data-role="search"]');E&&y&&(E.value=y,E.dispatchEvent(new Event("input",{bubbles:!0})))}}})}})}const Jn=[{keys:"1 2 3 4 / A B C D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1 – 5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/ 或 Ctrl+K",desc:"全局搜索（题库 / 错题 / 收藏）",scope:"全局"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function ze(){const t=Jn.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");N({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const yr=["home","bank","wrong","fav","me"];function $r(t){const e=t;if(!e)return!1;const n=e.tagName.toLowerCase();return n==="input"||n==="textarea"||n==="select"||e.isContentEditable}function Vn(){document.addEventListener("keydown",t=>{if((t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"){if(document.querySelector(".quiz"))return;t.preventDefault(),un();return}if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||$r(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),ze();return}if(t.key==="/"){t.preventDefault(),un();return}const n=Number(t.key);n>=1&&n<=5&&(t.preventDefault(),Qt(yr[n-1]))})}const wr=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:Jn,installShortcuts:Vn,openShortcuts:ze},Symbol.toStringTag,{value:"Module"})),xr=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],kr=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function pn(t,e,n){return`<div class="segmented">${t.map(a=>`<button class="seg" data-act="${n}" data-value="${a.value}" aria-pressed="${String(a.value)===String(e)}">${a.label}</button>`).join("")}</div>`}function mn(t,e){const n=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=t,s.click(),URL.revokeObjectURL(a)}async function Sr(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await N({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const n=t.querySelector('[data-role="old"]').value,a=t.querySelector('[data-role="next"]').value;if(a.length<6){f.error("新密码至少 6 位");return}try{await j.auth.change(n,a),f.ok("密码已更新")}catch(s){f.error(s instanceof L?s.message:"修改失败")}}function Ar(){const t=m.user,e=h((t||"?").slice(0,1).toUpperCase()),n=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})();return`
    <div class="profile">
      <div class="profile-avatar">${e}</div>
      <div class="profile-body">
        <div class="profile-name">${h(t)}</div>
        <div class="profile-desc">${m.bank?.length??0} 道题 · ${m.wrong?.length??0} 道错题 · ${m.favs?.length??0} 条收藏</div>
      </div>
    </div>

    <div class="section-title">外观</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">主题</div><div class="setting-desc">深色模式也会跟随系统自动切换</div></div>
      </div>
      ${pn(xr,H.theme,"theme")}
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景色</div><div class="setting-desc">给首页换个心情</div></div>
        <input class="color-input" type="color" value="${h(n.color||"#f4f5f7")}" data-act="pick-color" aria-label="背景色">
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
      ${pn(kr,H.autoDelay,"delay")}
      <div class="divider"></div>
      <label class="setting-row">
        <div><div class="setting-title">答题震动</div><div class="setting-desc">答对答错给一点反馈</div></div>
        <span class="switch" role="switch" data-act="toggle-vibration" aria-checked="${H.vibration}"><i></i></span>
      </label>
      <label class="setting-row">
        <div><div class="setting-title">连对鼓励</div><div class="setting-desc">连续答对时来点掌声</div></div>
        <span class="switch" role="switch" data-act="toggle-streak" aria-checked="${H.streakAlert}"><i></i></span>
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
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function Er(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){f.error("图片太大了（最多 8MB）");return}try{const n=await jr(e);Lt({image:n,color:""}),f.ok("背景已更新"),I("render")}catch{f.error("这张图片读不出来，换一张试试")}}},t.click()}function jr(t){return new Promise((e,n)=>{const a=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(a);const o=Math.min(1,1600/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*o),r.height=Math.round(s.height*o);const i=r.getContext("2d");if(!i){n(new Error("canvas unavailable"));return}i.drawImage(s,0,0,r.width,r.height),e(r.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(a),n(new Error("image load failed"))},s.src=a})}function Lr(){Te()}async function qr(t,e){switch(t){case"theme":return Ma(e.dataset.value),I("render"),!0;case"delay":return Bt({autoDelay:Number(e.dataset.value)}),I("render"),!0;case"toggle-vibration":return Bt({vibration:!H.vibration}),I("render"),!0;case"toggle-streak":return Bt({streakAlert:!H.streakAlert}),I("render"),!0;case"pick-color":return Lt({color:e.value,image:""}),!0;case"pick-bg":return await Er(),!0;case"clear-bg":return Lt({image:""}),I("render"),!0;case"dim":return Lt({dim:Number(e.value)}),!0;case"shortcuts":return ze(),!0;case"about":return N({title:"关于",body:`<p class="muted small" style="margin:0 0 10px">原点 · Origin —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。</p>
          <p class="muted small" style="margin:0 0 6px">题库 ${m.bank?.length??0} 题 · 错题 ${m.wrong?.length??0} 道 · 收藏 ${m.favs?.length??0} 条</p>
          <p class="muted small" style="margin:0">版本 v2.0.0 · 支持 PWA 离线打开</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]}),!0;case"reset-bg":return Lt({color:"",image:"",dim:.35}),f.ok("背景已恢复"),I("render"),!0;case"export-bank":return m.bank?.length?(mn(`题库-${m.user}.json`,m.bank),f.ok("已导出"),!0):(f.info("题库是空的"),!0);case"export-wrong":return m.wrong?.length?(mn(`错题-${m.user}.json`,m.wrong),f.ok("已导出"),!0):(f.info("没有错题"),!0);case"change-password":return await Sr(),!0;case"logout":return await yt({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(qn(),f.info("已退出登录")),!0;default:return!1}}const T={subject:"all",edit:!1,selected:new Set};function Mr(){T.subject="all",T.edit=!1,T.selected.clear()}function Qn(){const t=m.wrong??[];return T.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===T.subject)}function Tr(){return["all",...Array.from(new Set((m.wrong??[]).map(t=>t.subject||"默认题库")))]}function Cr(){const t=Qn(),e=m.wrong?.length??0,n=Tr().map(s=>`<button class="chip" data-act="subject" data-subject="${h(s)}" aria-pressed="${T.subject===s}">
          ${s==="all"?"全部":h(s)}
        </button>`).join(""),a=m.loading.wrong&&!m.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${T.selected.has(s.id)}">
          ${T.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${O(s.q)}</div>
          <div class="item-meta">
            ${s.subject?`<span class="tag tag-accent">${h(s.subject)}</span>`:""}
            ${s.chapter?`<span class="tag">${h(s.chapter)}</span>`:""}
          </div>
          <div class="item-answer">
            ${s.user_choice_text?`<div class="mine">你的选择：${h(s.user_choice_text)}</div>`:""}
            ${s.answer?`<div class="right">正确答案：${h(s.answer)}</div>`:""}
          </div>
          ${T.edit?"":`<div class="item-meta" style="margin-top:10px">
                   <span class="grow"></span>
                   <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${s.id}">已掌握</button>
                 </div>`}
        </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">⚑</div><div class="empty-title">${e?"这个题库下没有错题":"还没有错题"}</div><div class="empty-desc">${e?"切到「全部」看看":"答错的题会自动收集到这里，方便集中消灭"}</div></div>`;return`
    <div class="row between" style="margin-bottom:4px">
      <h1 class="page-title" style="margin:0">错题集</h1>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${T.edit?"✓":"☰"}</button>
    </div>
    <p class="muted small" style="margin:4px 0 14px">共 ${e} 道，消灭一题少一题</p>
    ${e?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">开始重练（${t.length} 题）</button>`:""}
    ${n}
    ${T.edit?`<div class="row between" style="margin-bottom:12px">
             <span class="muted small">已选 ${T.selected.size} 题</span>
             <button class="btn btn-sm btn-danger" data-act="remove-selected" ${T.selected.size?"":"disabled"}>删除</button>
           </div>`:""}
    ${a}`}async function Nr(){await ht()}async function _r(t,e){switch(t){case"subject":return T.subject=e.dataset.subject??"all",!0;case"toggle-edit":return T.edit=!T.edit,T.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return T.selected.has(n)?T.selected.delete(n):T.selected.add(n),!0}case"practice":return Qn().length?(await Bn(),!0):(f.info("没有可练的错题"),!0);case"remove":{const n=Number(e.dataset.id);try{await j.wrong.remove([n]),T.selected.delete(n),Q("wrong"),await ht(!0),f.ok("已标记掌握，继续加油")}catch(a){f.error(a instanceof L?a.message:"操作失败")}return!0}case"remove-selected":{const n=[...T.selected];if(!n.length||!await yt({title:"删除错题",message:`确定删除选中的 ${n.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await j.wrong.remove(n),T.selected.clear(),Q("wrong"),await ht(!0),f.ok("已删除")}catch(a){f.error(a instanceof L?a.message:"删除失败")}return!0}default:return!1}}const vt={home:{render:fr,mount:gr,handle:hr},bank:{render:js,mount:Ms,handle:Ts,onInput:Ns,reset:Dn},wrong:{render:Cr,mount:Nr,handle:_r,reset:Mr},fav:{render:nr,mount:ar,handle:sr,reset:er},me:{render:Ar,mount:Lr,handle:qr}};let _t=!1,lt=!1,me=!1,fe=!1;function Xn(){return document.getElementById("app-root")}function Ir(){lt=!1,Xn().innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="header-inner">
          <div class="brand">
            <span class="brand-dot"></span>
            <span class="brand-name">Origin Quiz</span>
          </div>
          <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(m.user||"?").slice(0,1).toUpperCase()}</button>
        </div>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${ye.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${ye.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,_t=!0}function Dr(){document.querySelectorAll(".tab-btn").forEach(e=>{const n=e.dataset.tab===m.tab;e.classList.toggle("is-active",n),e.setAttribute("aria-selected",String(n))});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,ye.findIndex(n=>n.id===m.tab));t.style.setProperty("--tab-index",String(e))}}function Or(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,n=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),a=n?e.getAttribute("data-role"):null,s=n&&e instanceof HTMLInputElement?e.selectionStart:null,o=vt[m.tab]??vt.home;if(t.innerHTML=`<div class="view-inner">${o.render()}</div>`,Dr(),n&&a){const r=t.querySelector(`[data-role="${a}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}o.mount?.()}function tt(){if(me){fe=!0;return}me=!0;try{if(!m.authed&&!m.token){lt=!0,_t=!1,Xn().innerHTML=Ha();return}_t||Ir(),Or()}finally{me=!1,fe&&(fe=!1,queueMicrotask(tt))}}let ge=!1;function fn(){ge||(ge=!0,setTimeout(()=>{ge=!1,tt()},0))}async function Yn(t){await t(),lt&&tt()}function Zn(t){const e=t.dataset.act??"";if(Gn()&&t.closest(".exam")&&Kn(t.dataset.ex??"",t))return;if(Xs()&&t.closest(".quiz")){V(e,t).then(a=>{a||I("render")});return}if(e==="tab"){Qt(t.dataset.tab??"home");return}if(lt){Yn(()=>Mn(e,t));return}const n=vt[m.tab]??vt.home;n.handle&&Promise.resolve(n.handle(e,t)).then(a=>{a&&tt()})}function Rr(t){const e=t.target;if(!e)return;const n=e.closest("[data-ex]");if(n&&Gn()&&n.closest(".exam")){Kn(n.dataset.ex??"",n);return}const a=e.closest("[data-act]");a&&(a.closest(".modal-layer")||Zn(a))}function gn(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){Zn(e);return}if(lt)return;const n=document.getElementById("view");if(!n||!n.contains(e))return;(vt[m.tab]??vt.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&tt()}function Hr(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),lt&&Yn(()=>Mn("submit",e)))}function Pr(){Me(),Te(),ja(()=>{qn(),_t=!1,lt=!1,f.error("登录已过期，请重新登录"),I("auth")}),Pt("nav",()=>{Object.entries(vt).forEach(([t,e])=>{t!==m.tab&&e.reset?.()}),tt()}),Pt("auth",()=>{_t=!1,lt=!1,m.authed?(Dn(),tt(),Promise.allSettled([ct(!0),ht(!0),Nt(!0)])):tt()}),Pt("render",fn),Pt("data",fn),document.addEventListener("click",Rr),document.addEventListener("change",gn),document.addEventListener("input",gn),document.addEventListener("submit",Hr),Vn(),m.token&&(m.authed=!0),tt(),m.token&&Promise.allSettled([ct(),ht(),Nt()])}function hn(){try{Pr(),ha()}catch(t){console.error("[origin-quiz] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",hn,{once:!0}):hn();
