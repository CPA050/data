var un=Object.defineProperty;var pn=(t,e,a)=>e in t?un(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var Ke=(t,e,a)=>pn(t,typeof e!="symbol"?e+"":e,a);import{k as mn,u as fn,s as Ge,a as Ht,z as gn}from"./vendor-SAJHWpKn.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const bn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function h(t){return String(t??"").replace(/[&<>"']/g,e=>bn[e]??e)}const se=/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;function hn(t,e){try{return mn.renderToString(t,{displayMode:e,throwOnError:!1,output:"mathml",strict:!1,trust:!1})}catch{return h(e?`$$${t}$$`:`$${t}$`)}}function Je(t){let e="",a=0;se.lastIndex=0;for(let n=se.exec(t);n;n=se.exec(t)){e+=h(t.slice(a,n.index)).replace(/\n/g,"<br>");const s=!!(n[1]||n[2]),o=(n[1]??n[2]??n[3]??n[4]??"").trim();e+=o?hn(o,s):h(n[0]),a=n.index+n[0].length}return e+=h(t.slice(a)).replace(/\n/g,"<br>"),e}const vn=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function yn(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function R(t){const e=yn(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return Je(e);const n=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!n)return h(e);const s=o=>{if(o.nodeType===Node.TEXT_NODE)return Je(o.textContent??"");if(o.nodeType!==Node.ELEMENT_NODE)return"";const r=o,i=r.tagName,c=Array.from(r.childNodes).map(s).join("");if(!vn.has(i))return c;if(i==="IMG"){const u=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(u))return"";const p=h(r.getAttribute("alt")??"");return`<img src="${h(u)}" alt="${p}" loading="lazy" referrerpolicy="no-referrer">`}const l=i.toLowerCase();return`<${l}>${c}</${l}>`};return Array.from(n.childNodes).map(s).join("")}function N(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function Dt(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(a=>Number.isInteger(a)))).sort((a,n)=>a-n)}function $n(t){return typeof t=="string"}function W(t,e=[]){return typeof t=="string"?t:Dt(t).map(a=>{const n=String.fromCharCode(65+a),s=(e[a]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${n}. ${s}`:n}).join("、")}function xe(t){const e=[...t];for(let a=e.length-1;a>0;a-=1){const n=Math.floor(Math.random()*(a+1));[e[a],e[n]]=[e[n],e[a]]}return e}function $a(t,e){const a=Dt(e);if(!a.length||t.length!==a.length)return!1;const n=[...new Set(t)].sort((s,o)=>s-o);return n.length===a.length&&n.every((s,o)=>s===a[o])}function wn(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const a=JSON.parse(e);if(typeof a=="number")return a;if(Array.isArray(a))return a.map(Number).filter(Number.isInteger);if(typeof a=="string")return a}catch{}return e}return""}let Y=null;function xn(){return Y&&document.body.contains(Y)||(Y=document.createElement("div"),Y.className="toast-host",Y.setAttribute("role","status"),Y.setAttribute("aria-live","polite"),document.body.appendChild(Y)),Y}function re(t,e="info",a=2600){if(!t)return;const n=document.createElement("div");n.className=`toast toast-${e}`,n.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${h(t)}</span>`,xn().appendChild(n),requestAnimationFrame(()=>n.classList.add("in")),window.setTimeout(()=>{n.classList.remove("in"),window.setTimeout(()=>n.remove(),220)},a)}const f={info:t=>re(t,"info"),ok:t=>re(t,"success"),error:t=>re(t,"error",3200)},ge="oq:queue",kn=200;function ke(){try{const t=localStorage.getItem(ge),e=t?JSON.parse(t):[];return Array.isArray(e)?e.filter(a=>a&&a.path):[]}catch{return[]}}function wa(t){try{t.length?localStorage.setItem(ge,JSON.stringify(t.slice(-kn))):localStorage.removeItem(ge)}catch{}}function Sn(){return ke().length}function An(t,e,a){const n=ke();n.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,path:t,body:e,label:a,at:Date.now()}),wa(n)}let oe=!1;async function Ve(){if(oe)return 0;const t=ke();if(!t.length)return 0;oe=!0;let e=0;const a=[];for(const n of t)try{const s=await fetch(n.path,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n.body),...Qe()?{headers:{"Content-Type":"application/json",Accept:"application/json",...Qe()}}:{}});if(s.ok||s.status>=400&&s.status<500){s.ok&&(e+=1);continue}a.push(n)}catch{a.push(n);break}return oe=!1,wa([...a,...t.slice(t.length)]),e&&f.ok(`已补传 ${e} 条离线操作`),e}function Qe(){try{const e=(localStorage.getItem("oq:oq:token")||localStorage.getItem("oq:token")||"").replace(/^"|"$/g,"");return e?{Authorization:`Bearer ${e}`}:{}}catch{return{}}}function En(){window.addEventListener("online",()=>{Ve()}),navigator.onLine&&Sn()&&setTimeout(()=>void Ve(),1500)}const Se="oq:",Ae="oq:user",Ee="oq:token",jn={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},H={...jn,...at("settings",{})};["auto","light","dark","eye"].includes(H.theme)||(H.theme="auto");function at(t,e){try{const a=localStorage.getItem(Se+t);return a===null?e:JSON.parse(a)}catch{return e}}function nt(t,e){try{localStorage.setItem(Se+t,JSON.stringify(e))}catch{}}function be(t){try{localStorage.removeItem(Se+t)}catch{}}function Bt(t){Object.assign(H,t),nt("settings",H)}function Ln(t){Bt({theme:t})}function z(){return at(Ae,"")||""}function xa(t){nt(Ae,t)}function Mn(){be(Ae),be(Ee)}function je(){return at(Ee,"")||""}function ka(t){nt(Ee,t)}function st(t){return`u:${z()||"anon"}:${t}`}function Le(){return at(st("notes"),{})}function Tn(t,e){const a=Le(),n=String(t);e.trim()?a[n]=e:delete a[n],nt(st("notes"),a)}function Sa(){const t=at(st("progress"),{});return Number(t.sequential_index)||0}function qn(t){nt(st("progress"),{sequential_index:t,updatedAt:Date.now()})}function Aa(){const t=at(st("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function Cn(t){nt(st("session"),t)}function Ea(){be(st("session"))}function Nn(){return at(st("recent"),[])}function _n(t){const e=[...t,...Nn()].slice(0,30);nt(st("recent"),Array.from(new Set(e)))}function ja(){return at("appearance",{color:"",image:"",dim:.35})}function In(t){nt("appearance",{...ja(),...t})}function Dn(){return at("welcomed","")===new Date().toDateString()}function On(){nt("welcomed",new Date().toDateString())}class M extends Error{constructor(a,n){super(n);Ke(this,"status");this.name="ApiError",this.status=a}}let Me=null;function Rn(t){Me=t}async function La(t,e={}){const a=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&a.set("Content-Type","application/json");const n=je();n&&a.set("Authorization",`Bearer ${n}`),a.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:a})}catch{throw new M(0,"网络连接失败，请检查网络后重试")}const o=s.headers.get("content-type")??"";let r=null;o.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const i=r??{};if(s.status===401)throw Me?.(),new M(401,typeof i.error=="string"?i.error:"登录已过期，请重新登录");if(!s.ok||i.ok===!1){const c=typeof i.error=="string"&&i.error?i.error:`请求失败（HTTP ${s.status}）`;throw new M(s.status,c)}return r}const ie=t=>La(t),V=(t,e)=>La(t,{method:"POST",body:JSON.stringify(e)});async function Hn(t,e,a){const n=new Headers({"Content-Type":"application/json"}),s=je();s&&n.set("Authorization",`Bearer ${s}`);const o=await fetch("/api/ai",{method:"POST",headers:n,body:JSON.stringify({...t,stream:!0}),signal:a});if(!o.ok||!o.body){const d=await o.json().catch(()=>({}));if(o.status===401)throw Me?.(),new M(401,"登录已过期，请重新登录");if(typeof d.result=="string")return e(d.result),{text:d.result,cached:!1,provider:typeof d.provider=="string"?d.provider:void 0};throw new M(o.status,typeof d.error=="string"?d.error:"AI 解析失败")}const r=o.body.getReader(),i=new TextDecoder;let c="",l="",u=!1,p;for(;;){const{value:d,done:b}=await r.read();if(b)break;c+=i.decode(d,{stream:!0});const y=c.split(`

`);c=y.pop()??"";for(const E of y){const v=E.split(`
`).find(S=>S.startsWith("data:"));if(!v)continue;let $;try{$=JSON.parse(v.slice(5).trim())}catch{continue}if(typeof $.delta=="string"&&$.delta&&(l+=$.delta,e($.delta)),typeof $.error=="string")throw new M(502,$.error);$.done&&(u=$.cached===!0,typeof $.provider=="string"&&(p=$.provider))}}return{text:l,cached:u,provider:p}}function he(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:wn(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function Pn(t){return{...he(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}async function ft(t,e,a){try{return await V(t,e)}catch(n){if(n instanceof M&&n.status===0)return An(t,e,a),{ok:!0,queued:!0,offline:!0};throw n}}const L={auth:{check:t=>V("/api/auth",{action:"check",username:t}),set:(t,e)=>V("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>V("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>V("/api/auth",{action:"change",username:z(),oldPassword:t,newPassword:e})},questions:{async list(){const t=z();if(!t)return[];const e=await ie(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>he(n))},add:t=>ft("/api/questions-add",{user_id:z(),questions:t},`导入 ${t.length} 道题`),update:(t,e,a)=>ft("/api/questions-update",{id:t,user_id:z(),...e,...a?.baseUpdatedAt?{base_updated_at:a.baseUpdatedAt}:{},...a?.force?{force:!0}:{}},"保存题目"),remove:t=>ft("/api/questions-delete",{ids:t,user_id:z()},`删除 ${t.length} 道题`)},wrong:{async list(){const t=z();if(!t)return[];const e=await ie(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>Pn(n))},add:t=>ft("/api/wrong-add",{user_id:z(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""},"记录错题"),remove:t=>ft("/api/wrong-delete",{ids:t,user_id:z()},"移除错题")},favorites:{async list(){const t=z();if(!t)return[];const e=await ie(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>he(n))},add:t=>ft("/api/favorites-add",{user_id:z(),question_id:t},"收藏题目"),remove:t=>ft("/api/favorites-remove",{user_id:z(),question_id:t},"取消收藏")},ai:{explain:t=>V("/api/ai",{action:"explain",prompt:t}),grade:t=>V("/api/ai",{action:"grade",prompt:t}),extract:t=>V("/api/ai",{action:"extract",...t}),classify:t=>V("/api/ai",{action:"classify",prompt:t}),generate:t=>V("/api/ai",{action:"generate",prompt:t}),explainStream:(t,e,a)=>Hn({action:"explain",prompt:t},e,a)}},Et='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"',Ut=[{id:"home",label:"首页",icon:`<svg viewBox="0 0 24 24" ${Et} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`},{id:"bank",label:"题库",icon:`<svg viewBox="0 0 24 24" ${Et} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`},{id:"wrong",label:"错题",icon:`<svg viewBox="0 0 24 24" ${Et} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`},{id:"fav",label:"收藏",icon:`<svg viewBox="0 0 24 24" ${Et} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`},{id:"me",label:"我的",icon:`<svg viewBox="0 0 24 24" ${Et} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`}],Xe=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],m={tab:"home",user:z(),token:je(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},Lt=new Map;function Pt(t,e){return Lt.has(t)||Lt.set(t,new Set),Lt.get(t).add(e),()=>Lt.get(t)?.delete(e)}function I(t){Lt.get(t)?.forEach(e=>e())}function Xt(t){m.tab!==t&&(m.tab=t,I("nav"))}const Ma=window.matchMedia("(prefers-color-scheme: dark)");function Ye(){return H.theme==="auto"?Ma.matches?"dark":"light":H.theme}function Te(){document.documentElement.dataset.theme=Ye();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=Ye()==="dark"?"#0b0c0f":"#f4f5f7")}function zn(t){Ln(t),Te()}Ma.addEventListener("change",()=>{H.theme==="auto"&&Te()});function Bn(t){In(t)}function qe(){const{color:t,image:e,dim:a}=ja(),n=document.body;n.style.backgroundImage=e?`url("${e}")`:"",n.style.backgroundSize="cover",n.style.backgroundPosition="center",n.style.backgroundAttachment="fixed",n.dataset.dim=String(a),t&&!e?n.style.backgroundColor=t:n.style.backgroundColor=""}async function Un(t,e){const a=await L.auth.login(t,e);ka(a.token),xa(t),m.user=t,m.token=a.token,m.authed=!0,X(),I("auth")}async function Fn(t,e){const a=await L.auth.set(t,e);ka(a.token),xa(t),m.user=t,m.token=a.token,m.authed=!0,X(),I("auth")}function Ta(){m.user="",m.token="",m.authed=!1,m.bank=null,m.wrong=null,m.favs=null,m.favoriteIds=new Set,Mn(),Ea(),I("auth")}const Wn=300*1e3,gt={bank:0,wrong:0,fav:0},Ft=new Map;function X(t){t?(gt[t]=0,t==="bank"&&(m.bank=null),t==="wrong"&&(m.wrong=null),t==="fav"&&(m.favs=null)):(gt.bank=gt.wrong=gt.fav=0,m.bank=null,m.wrong=null,m.favs=null)}function Kn(t,e){const a=Ft.get(t);if(a)return a;const n=e().finally(()=>Ft.delete(t));return Ft.set(t,n),n}async function Ce(t,e,a,n){if(!m.user)return[];const s=Ft.get(t);if(s)return s;const o=Date.now()-gt[t]<Wn;if(!e&&o)return[];m.loading[t]=!0,I("data");try{const r=await Kn(t,a);return n(r),gt[t]=Date.now(),r}catch(r){throw r instanceof M&&r.status!==401&&f.error(r.message),r}finally{m.loading[t]=!1,I("data")}}async function lt(t=!1){try{await Ce("bank",t,()=>L.questions.list(),e=>{m.bank=e})}catch{}return m.bank??[]}async function vt(t=!1){try{await Ce("wrong",t,()=>L.wrong.list(),e=>{m.wrong=e})}catch{}return m.wrong??[]}async function _t(t=!1){try{await Ce("fav",t,()=>L.favorites.list(),e=>{m.favs=e,m.favoriteIds=new Set(e.map(a=>a.id))})}catch{}return m.favs??[]}function Gt(t){return m.favoriteIds.has(t)}async function Gn(t){const e=!Gt(t);try{return e?await L.favorites.add(t):await L.favorites.remove(t),e?m.favoriteIds.add(t):m.favoriteIds.delete(t),m.favs=null,gt.fav=0,f.ok(e?"已加入收藏":"已取消收藏"),I("data"),e}catch(a){return f.error(a instanceof M?a.message:"操作失败"),Gt(t)}}function Jn(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${Xe[Math.floor(Math.random()*Xe.length)]}`}function Mt(t){Bn(t),qe()}const x={step:"name",username:"",busy:!1,error:""};function Vn(){x.step="name",x.username="",x.busy=!1,x.error=""}function Qn(){const t=`
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
      </div>`;const a=x.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${a?"为":"欢迎回来，"} <strong>${h(x.username)}</strong>${a?" 设置一个密码":""}</p>
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
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${x.busy?"disabled":""}>
            ${x.busy?"请稍候…":a?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${x.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function qa(t,e){if(t==="back")return x.step="name",x.error="",!0;if(t==="submit"){const a=e,n=new FormData(a);if(x.step==="name"){const o=String(n.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(o))return x.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;x.busy=!0,x.error="";try{const{hasPassword:r}=await L.auth.check(o);x.username=o,x.step=r?"password":"create"}catch(r){x.error=r instanceof M?r.message:"网络异常，请重试"}finally{x.busy=!1}return!0}if(x.busy)return!0;const s=String(n.get("password")??"");if(x.step==="create"){const o=String(n.get("confirm")??"");if(s!==o)return x.error="两次输入的密码不一致",!0}if(s.length<6)return x.error="密码至少 6 位",!0;x.busy=!0,x.error="";try{x.step==="create"?await Fn(x.username,s):await Un(x.username,s),x.step==="create"&&f.ok("账号已创建，开始刷题吧"),Vn()}catch(o){x.error=o instanceof M?o.message:"登录失败，请重试"}finally{x.busy=!1}return!0}return!1}function Xn(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ca(t,e){const a=e.trim();if(!a)return t;const n=new RegExp(Xn(a),"gi");return t.replace(/<[^>]+>|[^<]+/g,s=>s.startsWith("<")?s:s.replace(n,o=>`<mark class="hl">${o}</mark>`))}const $t={single:"单选",multi:"多选",judge:"判断",blank:"填空",essay:"简答",calc:"计算"},Yn=[{value:"",label:"自动识别"},{value:"single",label:"单项选择"},{value:"multi",label:"多项选择"},{value:"judge",label:"判断题"},{value:"blank",label:"填空题"},{value:"essay",label:"简答题"},{value:"calc",label:"计算题"}],Zn=["single","multi","judge","blank","essay","calc"];function K(t){const e=t.type??"";if(e&&Zn.includes(e))return e;const a=t.opts??[],n=String(t.q??"");if(!a.length)return/(计算|求|试算|解：|画出|绘制)/.test(n)?"calc":/_{2,}|（\s*）|\(\s*\)|【\s*】/.test(n)?"blank":"essay";if(a.length===2){const s=a.map(o=>o.replace(/^[A-Za-z][.、)）]\s*/,"").trim()).join("|");if(/^(正确|对|是|√|True)|\|(错误|错|否|×|False)$/i.test(s)||/正确\|错误|对\|错/.test(s))return"judge"}return Array.isArray(t.a)?"multi":"single"}function ts(t){return t==="essay"||t==="calc"||t==="blank"}let B=null,Tt=0;function Na(){return B&&document.body.contains(B)||(B=document.createElement("div"),B.className="modal-root",B.setAttribute("role","dialog"),B.setAttribute("aria-modal","true"),document.body.appendChild(B)),B}function es(){Tt+=1,document.body.classList.add("is-locked")}function Ze(){Tt=Math.max(0,Tt-1),Tt===0&&document.body.classList.remove("is-locked")}function Yt(){Na().innerHTML="",Tt=0,document.body.classList.remove("is-locked")}function C(t){const e=Na(),a=t.dismissible!==!1;return new Promise(n=>{let s=!1;const o=d=>{if(s)return;s=!0,p(),r.classList.remove("open"),r.style.pointerEvents="none",window.matchMedia("(prefers-reduced-motion: reduce)").matches?(r.remove(),Ze()):window.setTimeout(()=>{r.remove(),Ze()},80),n(d)},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${a?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${h(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${h(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((d,b)=>`<button class="btn btn-${d.variant??"ghost"}" data-idx="${b}">${h(d.label)}</button>`).join("")}</div>`:""}
      </div>`;const i=r.querySelector(".modal-card"),c=i.querySelector(".modal-body");typeof t.body=="string"?c.innerHTML=t.body:t.body&&c.appendChild(t.body);const l=d=>{d.key==="Escape"&&a&&(d.stopPropagation(),o(null))},u=d=>{const b=d.target;if(b.closest("[data-close]")&&a){o(null);return}const y=b.closest("[data-idx]");if(!y)return;const E=t.actions?.[Number(y.dataset.idx)];E&&(E.keepOpen||o(E.value))},p=()=>{document.removeEventListener("keydown",l,!0),r.removeEventListener("click",u),B&&B.children.length===0&&B.classList.remove("open")};r.addEventListener("click",u),document.addEventListener("keydown",l,!0),e.appendChild(r),e.classList.add("open"),es(),t.onMount?.(i),requestAnimationFrame(()=>{r.classList.add("open");const d=i.querySelector("input, textarea, button.btn-primary, button");d&&window.matchMedia("(pointer: fine)").matches&&d.focus({preventScroll:!0})})})}function dt(t){return C({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}function as(t,e=1400,a=.82){return new Promise((n,s)=>{const o=URL.createObjectURL(t),r=new Image;r.onload=()=>{URL.revokeObjectURL(o);const i=Math.min(1,e/Math.max(r.width,r.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(r.width*i)),c.height=Math.max(1,Math.round(r.height*i));const l=c.getContext("2d");if(!l){s(new Error("canvas 不可用"));return}l.fillStyle="#fff",l.fillRect(0,0,c.width,c.height),l.drawImage(r,0,0,c.width,c.height),n(c.toDataURL("image/jpeg",a))},r.onerror=()=>{URL.revokeObjectURL(o),s(new Error("图片解码失败"))},r.src=o})}const ns=new Set(["B","STRONG","I","EM","U","SUB","SUP","BR","P","DIV","SPAN","IMG","CODE"]);function zt(t){const a=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html").body.firstElementChild;if(!a)return"";const n=s=>{if(s.nodeType===Node.TEXT_NODE)return(s.textContent??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");if(s.nodeType!==Node.ELEMENT_NODE)return"";const o=s,r=o.tagName,i=Array.from(o.childNodes).map(n).join("");if(!ns.has(r))return i;if(r==="IMG"){const l=o.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(l))return"";const u=(o.getAttribute("alt")??"").replace(/"/g,"&quot;");return`<img src="${l.replace(/"/g,"&quot;")}" alt="${u}">`}if(r==="BR")return"<br>";const c=r.toLowerCase();return c==="div"||c==="p"?i.trim()?`${i}<br>`:"<br>":`<${c}>${i}</${c}>`};return Array.from(a.childNodes).map(n).join("").replace(/(<br>)+$/g,"").trim()}const ss=[{cmd:"bold",label:"B",title:"加粗（Ctrl/⌘+B）"},{cmd:"italic",label:"I",title:"斜体（Ctrl/⌘+I）"},{cmd:"underline",label:"U",title:"下划线（Ctrl/⌘+U）"},{cmd:"superscript",label:"x²",title:"上标"},{cmd:"subscript",label:"x₂",title:"下标"},{cmd:"insertUnorderedList",label:"≡",title:"列表"}];function rs(t={}){const e=document.createElement("div");e.className="rt";const a=document.createElement("div");a.className="rt-bar";const n=document.createElement("div");n.className="rt-area",n.contentEditable="true",n.spellcheck=!1,n.dataset.role="rich",n.style.minHeight=`${t.minHeight??96}px`,t.placeholder&&(n.dataset.placeholder=t.placeholder),n.innerHTML=zt(t.value??"");const s=(r,i)=>{n.focus(),document.execCommand(r,!1,i),o()};if(t.toolbar!==!1){for(const u of ss){const p=document.createElement("button");p.type="button",p.className="rt-btn",p.title=u.title,p.textContent=u.label,p.addEventListener("mousedown",d=>d.preventDefault()),p.addEventListener("click",()=>s(u.cmd,u.arg)),a.appendChild(p)}const r=document.createElement("span");r.className="rt-sep",a.appendChild(r);const i=document.createElement("button");i.type="button",i.className="rt-btn",i.textContent="∑",i.title="公式：选中内容包成 $…$",i.addEventListener("mousedown",u=>u.preventDefault()),i.addEventListener("click",()=>{const u=window.getSelection()?.toString()??"";if(u){s("insertText",`$${u}$`);return}s("insertText","$$");const p=window.getSelection();if(p&&p.rangeCount){const d=p.getRangeAt(0);typeof p.modify=="function"?p.modify("move","backward","character"):d.startContainer.nodeType===Node.TEXT_NODE&&(d.setStart(d.startContainer,Math.max(0,d.startOffset-1)),d.collapse(!0),p.removeAllRanges(),p.addRange(d))}}),a.appendChild(i);const c=document.createElement("button");c.type="button",c.className="rt-btn",c.textContent="▣",c.title="插入图片（自动压缩）",c.addEventListener("mousedown",u=>u.preventDefault()),c.addEventListener("click",()=>{const u=document.createElement("input");u.type="file",u.accept="image/*",u.onchange=async()=>{const p=u.files?.[0];if(p)try{c.textContent="…";const d=await as(p);n.focus(),document.execCommand("insertHTML",!1,`<img src="${d}" alt="题图"><br>`),o(),f.ok(`图片已插入（${Math.round(d.length*.75/1024)} KB）`)}catch{f.error("图片读取失败，换一张试试")}finally{c.textContent="▣"}},u.click()}),a.appendChild(c);const l=document.createElement("button");l.type="button",l.className="rt-btn rt-clear",l.textContent="⌫",l.title="清除格式",l.addEventListener("mousedown",u=>u.preventDefault()),l.addEventListener("click",()=>s("removeFormat")),a.appendChild(l)}function o(){const r=(n.textContent??"").trim().length>0,i=!!n.querySelector("img");n.classList.toggle("is-empty",!r&&!i)}return n.addEventListener("input",o),n.addEventListener("blur",o),n.addEventListener("paste",r=>{const i=r.clipboardData?.getData("text/html");i&&(r.preventDefault(),document.execCommand("insertHTML",!1,zt(i)))}),o(),e.append(a,n),{el:e,getValue:()=>zt(n.innerHTML),setValue:r=>{n.innerHTML=zt(r),o()},focus:()=>n.focus()}}function ta(t){const e=t.name.toLowerCase(),a=t.type.toLowerCase();return a.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|heic)$/.test(e)?"image":e.endsWith(".docx")?"docx":e.endsWith(".json")?"json":/\.(txt|md|csv|text)$/.test(e)||a.startsWith("text/")?"text":"unknown"}function kt(t){return String(t??"").replace(/\r\n?/g,`
`).trim()}function _a(t,e){if(Array.isArray(t)){const r=t.map(i=>typeof i=="number"?i:os(String(i),e.length)).filter(i=>i!==null);return r.length?r.length===1?r[0]:[...new Set(r)].sort((i,c)=>i-c):t.map(String).join("、")}if(typeof t=="number"&&Number.isFinite(t))return t;const a=kt(t);if(!a)return"";const s=(/^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(a)?a:"")||(/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(a)?a:"");if(s){const r=[...new Set(s.toUpperCase().split("").map(i=>i.charCodeAt(0)-65))].filter(i=>i>=0&&i<e.length);if(r.length)return r.length===1?r[0]:r.sort((i,c)=>i-c)}const o=/^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(a);if(o&&e.length){const r=o[1].charCodeAt(0)-65;if(r>=0&&r<e.length){const i=o[2].trim();return e.findIndex(l=>l.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()===i)>=0||i,r}}return a}function os(t,e){const a=t.trim().toUpperCase();if(!/^[A-H]$/.test(a))return null;const n=a.charCodeAt(0)-65;return n<e?n:null}function is(t){const e=kt(t.q??t.question??t.title??t.题目??t.题干);if(!e)return null;const a=t.opts??t.options??t.choices??t.选项;let n=[];Array.isArray(a)?n=a.map(r=>kt(r)).filter(Boolean):typeof a=="string"&&(n=ps(a));const s=t.a??t.answer??t.correct??t.答案??t.正确答案,o=n.length?_a(s,n):kt(s);return{q:e,opts:n,a:o,...t.figure?{figure:t.figure}:{},chapter:kt(t.chapter??t.章节??t.知识点),subject:kt(t.subject??t.科目??t.题库)||"默认题库"}}function Ne(t){const e=t.replace(/^\uFEFF/,"").trim(),a=/```(?:json)?([\s\S]*?)```/i.exec(e)?.[1]??e,n=a.indexOf("["),s=a.indexOf("{"),o=n>=0&&(s<0||n<s)?n:s;if(o<0)return[];const r=Math.max(a.lastIndexOf("]"),a.lastIndexOf("}"));if(r<=o)return[];let i;try{i=JSON.parse(a.slice(o,r+1))}catch{return[]}return(Array.isArray(i)?i:Array.isArray(i?.questions)?i.questions:Array.isArray(i?.data)?i.data:[]).filter(l=>!!l&&typeof l=="object").map(is).filter(l=>!!l)}const cs=/^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/,ls=/^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/,ds=/^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/,us=/^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;function ps(t){return t.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/).map(a=>a.trim()).filter(Boolean)}function ms(t){const e=[...t.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];return e.length<2?[]:e.map((a,n)=>{const s=(a.index??0)+a[0].length,o=n+1<e.length?e[n+1].index??t.length:t.length;return t.slice(s,o).trim()})}function fs(t){const a=t.replace(/^\uFEFF/,"").replace(/\r\n?/g,`
`).replace(/!\[[^\]]*\]\((data:image\/[^)]+)\)/g,(u,p)=>`<img src="${p}" alt="题图">`).split(`
`),n=[];let s="",o=[],r="",i="",c="";const l=()=>{const u=s.trim();if(!u){s="",o=[],r="";return}if(!o.length&&!r.trim()&&u.length<=24){s="",o=[],r="";return}const p=o.map(b=>b.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()),d=p.length?_a(r,p):r.trim();n.push({q:u,opts:p,a:d,chapter:i,subject:c||"默认题库"}),s="",o=[],r="",i="",c=""};for(const u of a){if(!u.trim())continue;if(/^\s*<img\b/i.test(u)){s=`${s}${s?`
`:""}${u.trim()}`;continue}const p=us.exec(u),d=cs.exec(u),b=ls.exec(u),y=ds.exec(u);if(p&&!d){l();const E=ms(p[2]);E.length>=2?(s=p[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim(),o=E):s=p[2].trim();continue}if(d&&s){o.push(d[2].trim());continue}if(b&&(s||o.length)){r=b[1].trim();continue}if(y){const E=y[0].trim(),v=y[1].trim();/章节|知识点/.test(E)?i=v:/科目|题库|分类/.test(E)&&(c=v);continue}s?o.length?o[o.length-1]=`${o[o.length-1]} ${u.trim()}`.trim():s=`${s} ${u.trim()}`.trim():s=u.replace(/^\s*(?:题目|题干)\s*[:：]\s*/,"").trim()}return l(),n.filter(u=>u.q.length>1)}function Wt(t){const e=t.trim();if(!e)return[];if(/^[[{]/.test(e)||/```(?:json)?/i.test(e)||/"(q|question|题目)"\s*:/.test(e)){const a=Ne(e);if(a.length)return a}return fs(e)}function ea(t){const e=fn(new Uint8Array(t)),a=e["word/document.xml"];if(!a)throw new Error("这个 docx 里没有正文，另存为 .docx 再试一次");const n=e["word/_rels/document.xml.rels"],s=new Map;if(n){const i=Ge(n);for(const c of i.matchAll(/<Relationship\b[^>]*>/g)){const l=c[0],u=/\bId="([^"]+)"/.exec(l)?.[1],p=/\bTarget="([^"]+)"/.exec(l)?.[1],d=/\bType="([^"]+)"/.exec(l)?.[1]??"";if(!u||!p||!/image/i.test(d))continue;const b=p.startsWith("/")?p.slice(1):`word/${p.replace(/^\.\//,"")}`,y=e[b];y&&s.set(u,`data:${gs(b)};base64,${bs(y)}`)}}return Ge(a).replace(/<a:blip\b[^>]*r:embed="([^"]+)"[^>]*\/?>/g,(i,c)=>{const l=s.get(c);return l?`[[IMG:${l}]]`:""}).replace(/<w:tab\b[^>]*\/>/g,"	").replace(/<w:br\b[^>]*\/>/g,`
`).replace(/<\/w:p>/g,`
`).replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\[\[IMG:([^\]]+)\]\]/g,(i,c)=>`
![docx 图片](${c})
`).replace(/\n{3,}/g,`

`).trim()}function gs(t){const e=t.split(".").pop()?.toLowerCase()??"";return e==="jpg"||e==="jpeg"?"image/jpeg":e==="gif"?"image/gif":e==="bmp"?"image/bmp":e==="webp"?"image/webp":e==="svg"?"image/svg+xml":"image/png"}function bs(t){let e="";for(let n=0;n<t.length;n+=32768)e+=String.fromCharCode(...t.subarray(n,n+32768));return btoa(e)}function aa(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(String(n.result??"")),n.onerror=()=>a(new Error("文件读取失败")),n.readAsText(t,"utf-8")})}function na(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(n.result),n.onerror=()=>a(new Error("文件读取失败")),n.readAsArrayBuffer(t)})}function sa(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(String(n.result??"")),n.onerror=()=>a(new Error("图片读取失败")),n.readAsDataURL(t)})}function hs(t,e){if(!t.length)return'<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>';const a=t.slice(0,4),n=a.map((r,i)=>{const c=(r.opts??[]).length,l=ra(r),u=(r.q.match(/<img\b/gi)??[]).length,p=r.q.replace(/<img\b[^>]*>/gi," ").replace(/\s+/g," ").trim();return`<li><b>${i+1}.</b> ${h(p).slice(0,90)}${u?`<span class="muted"> · 含 ${u} 张图</span>`:""}${c?`<span class="muted"> · ${c} 个选项</span>`:'<span class="muted"> · 简答</span>'}${l?`<span class="tag-warn">${l}</span>`:""}</li>`}).join(""),s=t.length>a.length?`<li class="muted">…还有 ${t.length-a.length} 道</li>`:"",o=t.map(ra).filter(Boolean).length;return`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${t.length} 道题</span>
      ${o?`<span class="tag tag-warn">${o} 道待确认</span>`:""}
      ${e?`<span class="muted small">${h(e)}</span>`:""}
    </div>
    <ul class="import-list">${n}${s}</ul>`}function ra(t){const e=(t.opts??[]).length,a=t.a;return(Array.isArray(a)?a.length>0:a!==""&&a!==null&&a!==void 0)?e===1?"只有 1 个选项":e>=2&&typeof a=="number"&&(a<0||a>=e)?"答案越界":"":"没识别到答案"}function ce(t,e){return t==="json"?Ne(e):Wt(e)}async function vs(){const t=document.createElement("div");t.className="import",t.innerHTML=`
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
    <div class="import-preview" data-role="preview"></div>`;const e=t.querySelector('[data-role="drop"]'),a=t.querySelector('[data-role="file"]'),n=t.querySelector('[data-role="text"]'),s=t.querySelector('[data-role="preview"]');let o=[],r="",i="",c=!1;const l=()=>{s.innerHTML=hs(o,i||(r?"图片将由 AI 识别":""));const v=document.querySelector('[data-idx="1"]');v&&(v.textContent=o.length?`导入 ${o.length} 道题`:"AI 解析并导入")},u=(v,$,S)=>{n.value=v,o=ce($,v),i=S,l()},p=async()=>{const v=n.value.trim();if(!v&&!r)return[];f.info(r?"AI 正在识别图片…":"AI 正在解析文字…");const $=await L.ai.extract({...v?{prompt:v}:{},...r?{imageBase64:r}:{}});return Wt($.result??"")},d=async v=>{const $=ta(v);try{if($==="image"){r=await sa(v),o=[],i=`${v.name}（${Math.round(v.size/1024)}KB，AI 识别）`,l();try{o=await p(),o.length||f.error("这张图没读出题目，换张更清晰的试试")}catch(k){f.error(k instanceof M?k.message:"AI 识别失败")}l();return}if($==="docx"){const k=await na(v);u(ea(k),"docx",v.name);return}if($==="unknown"){f.error("暂不支持这种文件，换成 txt / json / docx / 图片试试");return}const S=await aa(v);u(S,$,v.name)}catch(S){f.error(S instanceof Error?S.message:"文件解析失败")}},b=async v=>{if(!v.length)return;if(v.length===1){await d(v[0]);return}const $=[],S=[];for(const k of v)try{const T=ta(k);if(T==="image"){const D=await sa(k),j=await L.ai.extract({imageBase64:D});$.push(...Wt(j.result??"")),S.push(k.name);continue}if(T==="docx"){$.push(...ce("docx",ea(await na(k)))),S.push(k.name);continue}$.push(...ce(T,await aa(k))),S.push(k.name)}catch(T){f.error(`${k.name} 没读出来：${T instanceof Error?T.message:"格式不对"}`)}o=$,r="",i=`${v.length} 个文件（${S.join("、")}）`,n.value="",l()};a.addEventListener("change",()=>{b([...a.files??[]])});for(const v of["dragenter","dragover"])e.addEventListener(v,$=>{$.preventDefault(),e.classList.add("is-over")});for(const v of["dragleave","drop"])e.addEventListener(v,$=>{$.preventDefault(),e.classList.remove("is-over")});e.addEventListener("drop",v=>{const $=[...v.dataTransfer?.files??[]];b($)}),n.addEventListener("paste",v=>{const S=[...v.clipboardData?.items??[]].find(T=>T.kind==="file"&&T.type.startsWith("image/"));if(!S)return;const k=S.getAsFile();k&&(v.preventDefault(),d(k))});let y=0;if(n.addEventListener("input",()=>{window.clearTimeout(y),y=window.setTimeout(()=>{o=Wt(n.value),r="",i="",l()},280)}),!(!await C({title:"导入题库",body:t,actions:[{label:"取消",value:!1},{label:"导入",value:!0,variant:"primary"}],onMount:()=>l()})||c))try{const v=o.length?o:await p();if(!v.length){f.error("没解析出题目，检查一下格式，或换张更清晰的图");return}c=!0;const $=await L.questions.add(v);X("bank"),await lt(!0),f.ok(`已导入 ${$.added??v.length} 道题`)}catch(v){f.error(v instanceof M?v.message:"导入失败")}}const ve="#0a0c0f",ct="#8b9099",ys="#ffffff",qt="#1440ff";function _e(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ie(t,e,a,n){const s=n?`<text x="${t/2}" y="${e-12}" text-anchor="middle" font-size="12.5" fill="${ct}" stroke="none">${_e(n)}</text>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${e}" viewBox="0 0 ${t} ${e}" fill="none">
  <rect width="${t}" height="${e}" fill="${ys}"/>
  <g stroke="${ve}" stroke-width="1.6" stroke-linecap="square" color="${ve}" font-family="system-ui,-apple-system,'Segoe UI',sans-serif">
  ${a}
  ${s}
  </g>
</svg>`}function $s(t){const a=t.caption?210:186,n=Number(t.span)>0?Number(t.span):6,s=Number(t.value)>0?Number(t.value):20,o=44,r=316,i=96,c=(o+r)/2,l=t.load==="point"?"kN":"kN/m",u=t.load==="point"?`P = ${s} ${l}`:`q = ${s} ${l}`,p=[];if(t.load==="point")p.push(`<path d="M${c} 44 V${i-6}"/><path d="M${c-5} ${i-14} L${c} ${i-4} L${c+5} ${i-14}"/>`);else{for(let d=0;d<=8;d+=1){const b=o+(r-o)*d/8;p.push(`<path d="M${b} 56 V${i-10}"/><path d="M${b-4} ${i-18} L${b} ${i-9} L${b+4} ${i-18}"/>`)}p.push(`<path d="M${o} 56 H${r}"/>`)}return Ie(360,a,`${p.join("")}
  <path d="M${o} ${i} H${r}"/>
  <path d="M${o} ${i} l-9 15 h18 z"/>
  <path d="M${r} ${i} l-9 15 h18 z">
  </path>
  <path d="M${o} ${i+15} H${r}" stroke="${ct}" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="${c}" y="46" text-anchor="middle" font-size="12" fill="${qt}" stroke="none">${_e(u)}</text>
  <text x="${c}" y="${i+34}" text-anchor="middle" font-size="12" fill="${ct}" stroke="none">L = ${n} m</text>`,t.caption)}function ws(t){const a=t.caption?220:196,n=Number(t.width)>0?Number(t.width):300,s=Number(t.height)>0?Number(t.height):500,o=132,r=92,i=(300-o)/2,c=62;return Ie(300,a,`<text x="${300/2}" y="40" text-anchor="middle" font-size="12" fill="${qt}" stroke="none">截面示意图（单位 mm）</text>
  <rect x="${i}" y="${c}" width="${o}" height="${r}"/>
  <path d="M${i-12} ${c} H${i-12} V${c+r} H${i-12}" stroke="${ct}" stroke-width="1"/>
  <text x="${i-18}" y="${c+r/2}" text-anchor="middle" font-size="11" fill="${ct}" stroke="none" transform="rotate(-90 ${i-18} ${c+r/2})">h = ${s}</text>
  <text x="${300/2}" y="${c+r+22}" text-anchor="middle" font-size="11" fill="${ct}" stroke="none">b = ${n}</text>`,t.caption)}function xs(t){const e=(t.steps??[]).filter(u=>u&&u.name).slice(0,6),a=360,s=74+Math.max(1,e.length)*30+(t.caption?22:6),o=Math.max(1,...e.map(u=>Number(u.start)+Number(u.duration))),r=92,i=a-24,c=(i-r)/o,l=e.map((u,p)=>{const d=62+p*30,b=r+Number(u.start)*c,y=Math.max(6,Number(u.duration)*c);return`<text x="${r-10}" y="${d+11}" text-anchor="end" font-size="11" fill="${ve}" stroke="none">${_e(u.name)}</text>
  <rect x="${b}" y="${d}" width="${y}" height="14" fill="${qt}" opacity="0.12" stroke="${qt}" stroke-width="1"/>
  <text x="${b+y/2}" y="${d+11}" text-anchor="middle" font-size="10" fill="${qt}" stroke="none">${u.duration}</text>`}).join(`
  `);return Ie(a,s,`<text x="${r}" y="38" font-size="11" fill="${ct}" stroke="none">施工进度（天）→</text>
  <path d="M${r} 48 H${i}" stroke="${ct}" stroke-width="1"/>
  ${l}`,t.caption)}function ks(t){if(!t||!t.kind)return"";let e="";return t.kind==="beam"?e=$s(t):t.kind==="section"?e=ws(t):t.kind==="flow"&&(e=xs(t)),e?`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`:""}function Ss(t){if(!t||typeof t!="object")return null;const e=t,a=String(e.kind??e.type??"").toLowerCase();if(a!=="beam"&&a!=="section"&&a!=="flow")return null;const n=r=>{const i=Number(r);return Number.isFinite(i)&&i>0?i:void 0},s=String(e.load??"").toLowerCase(),o=Array.isArray(e.steps)?e.steps.map(r=>({name:String(r.name??r.title??""),start:Number(r.start??0),duration:Number(r.duration??0)})).filter(r=>r.duration>0):void 0;return{kind:a,caption:typeof e.caption=="string"?e.caption.slice(0,40):void 0,span:n(e.span),load:s==="point"?"point":s==="uniform"?"uniform":void 0,value:n(e.value),width:n(e.width),height:n(e.height),steps:o}}const As=["基础","进阶","冲刺"],Es=[10,20,50,100,200,500,1e3],oa=20,js=1e3,ia=t=>new Promise(e=>setTimeout(e,t));function ca(t){return N(t).replace(/^【[^】]*】/,"").replace(/[\s，。、；：？！,.;:?!'"“”‘’()（）\[\]【】]/g,"").slice(0,40)}async function Ls(){const t=m.bank??[],e=[...new Set(t.map(w=>w.subject).filter(Boolean))],a=[...new Set(t.map(w=>w.chapter).filter(Boolean))],n=e[0]??"默认题库",s=document.createElement("div");if(s.innerHTML=`
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${h(n)}" placeholder="如 一建建筑">
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
          ${Es.map(w=>`<option value="${w}"${w===50?" selected":""}>${w} 道</option>`).join("")}
        </select>
      </label>
      <label class="field grow">
        <span class="field-label">难度</span>
        <select class="input" data-role="level">
          ${As.map(w=>`<option value="${w}">${w}</option>`).join("")}
        </select>
      </label>
    </div>
    <label class="field" style="margin-top:10px">
      <span class="field-label">考点提示 <span class="muted small">（可选，越具体越好）</span></span>
      <textarea class="textarea" data-role="hint" rows="2" placeholder="如：混凝土养护时间、水化热控制"></textarea>
    </label>
    <p class="muted small" style="margin:10px 0 0">
      按每批 ${oa} 道分批生成，边生成边去重；生成完你可以先看前 12 道再决定是否入库。
      数量越多越慢（100 道约 1–2 分钟），中途可取消。
    </p>`,!await C({title:"AI 出题",body:s,actions:[{label:"取消",value:!1},{label:"开始生成",value:!0,variant:"primary"}]}))return;const r=w=>s.querySelector(`[data-role="${w}"]`)?.value.trim()??"",i=r("subject")||"默认题库",c=r("chapter"),l=Math.min(js,Math.max(1,Number(r("count"))||20)),u=r("level")||"基础",p=r("hint"),d=document.createElement("div");d.innerHTML=`
    <div class="gen-progress">
      <div class="gen-bar"><i data-role="bar" style="width:0%"></i></div>
      <div class="row" style="justify-content:space-between;margin-top:8px">
        <span class="muted small" data-role="line">准备中…</span>
        <span class="muted small" data-role="pct">0%</span>
      </div>
    </div>
    <div class="import-list gen-scroll" data-role="feed" style="margin-top:12px"></div>`;const b=()=>d.querySelector('[data-role="bar"]'),y=()=>d.querySelector('[data-role="line"]'),E=()=>d.querySelector('[data-role="pct"]'),v=()=>d.querySelector('[data-role="feed"]');let $=!1,S="";const k=(w,_,J="")=>{const mt=Math.min(100,Math.round(w/Math.max(1,_)*100));b().style.width=`${mt}%`,E().textContent=`${mt}%`,y().textContent=`已生成 ${w} / ${_} 道${J?` · ${J}`:""}`},T=w=>{const _=document.createElement("div");_.className="import-item gen-item";const J=N(w.q).replace(/\s+/g," ").slice(0,56);for(_.innerHTML=`<div class="gen-row"><span class="gen-text">${h(J)}</span></div>`,v().prepend(_);v().childElementCount>12;)v().lastElementChild?.remove()};C({title:"正在生成",body:d,dismissible:!1,onMount:w=>{const _=document.createElement("button");_.className="btn btn-block",_.textContent="取消生成",_.addEventListener("click",()=>{$=!0,_.textContent="正在停止…"}),w.append(_)},actions:[]});const D=new Set(t.map(w=>ca(w.q??""))),j=[];let rt=0,G=0,pt=0,wt=0;const Ot=c?[c]:a.length?a:[""];let Be=0;const rn=2,on=async w=>{if($||j.length>=l)return;const _=Math.min(oa,l-j.length),J=Ot[w%Ot.length],mt=[...j.slice(-6),...t.slice(0,6)].map(P=>`· ${N(P.q).slice(0,40)}`),ae=[`题库：${i}`,J?`章节：${J}`:"",`数量：${_} 道`,`难度：${u}`,p?`考点提示：${p}`:"",w?`这是第 ${w+1} 批，请换一批考点，不要重复前面出过的题。`:"",mt.length?`不要与这些题相同或近似：
${mt.join(`
`)}`:"","要求：贴近真实考试题型，四个选项，答案唯一，附一句解析。"].filter(Boolean).join(`
`);let ne=[];try{const P=await L.ai.generate(ae);ne=Ne(P.result??""),pt=0}catch(P){pt+=1;const xt=P instanceof M?P.message:"网络异常";S=xt,/次数|配额|429/.test(xt)&&($=!0);return}if(!ne.length){pt+=1,pt>=3&&(S="模型没有返回可用题目，先停在这里");return}const ln=j.length;for(const P of ne){if(j.length>=l)break;const xt=ca(P.q);if(!xt||D.has(xt)){G+=1;continue}D.add(xt);const Fe=Ss(P.figure),We=ks(Fe);if(We){rt+=1;const dn=(Fe?.caption??"示意图").replace(/"/g,"");j.push({...P,q:`${P.q}
<img src="${We}" alt="${dn}">`})}else j.push(P);T(P)}wt=j.length>ln?0:wt+1,wt>=3&&($=!0,S="模型开始重复出同一批题，先停在这里"),k(j.length,l,G?`去重 ${G} 道`:"")},cn=async()=>{for(;!$&&j.length<l;){const w=Be;Be+=1,await on(w),await ia(60)}};if(await Promise.all(Array.from({length:rn},()=>cn())),Yt(),await ia(180),!j.length){f.error(S||"一道题也没生成出来，换个提示再试");return}const Ue=document.createElement("div");if(Ue.innerHTML=`
    <div class="muted small" style="margin-bottom:8px">
      共 ${j.length} 道${rt?`（${rt} 道带示意图）`:""}${G?`，自动去重 ${G} 道`:""}${S?` · 提前结束：${h(S)}`:""}，确认后写入「${h(i)}」
    </div>
    <div class="import-list gen-scroll">
      ${j.slice(0,12).map((w,_)=>{const J=/<img\b[^>]*src="([^"]+)"/i.exec(String(w.q??"")),mt=J?`<img class="gen-thumb" src="${J[1]}" alt="示意图">`:"",ae=N(w.q).replace(/\s+/g," ").slice(0,64);return`<div class="import-item gen-item"><div class="gen-row">${mt}<span class="gen-text"><b>${_+1}.</b> ${h(ae)}${Array.isArray(w.opts)&&w.opts.length?` <span class="muted">· ${w.opts.length} 选项</span>`:""}</span></div></div>`}).join("")}
      ${j.length>12?`<div class="muted small" style="padding:8px 2px">还有 ${j.length-12} 道未展示…</div>`:""}
    </div>`,!await C({title:"确认导入",body:Ue,actions:[{label:"不要了",value:!1},{label:`导入 ${j.length} 道`,value:!0,variant:"primary"}]}))return;const ee=j.map(w=>({...w,subject:i,chapter:w.chapter||c}));let Rt=0;try{for(let w=0;w<ee.length;w+=20){const _=ee.slice(w,w+20);await L.questions.add(_),Rt+=_.length,f.info(`已写入 ${Rt} / ${ee.length} 道`)}X("bank"),await lt(!0),f.ok(`已导入 ${Rt} 道题`)}catch(w){f.error(w instanceof M?w.message:`导入中断，已写入 ${Rt} 道`),X("bank")}}const Ms=`
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
`;function jt(t){return String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]??e)}function la(t,e={}){if(!t.length){f.info("没有可导出的题目");return}const a=e.title||"练习试卷",n=new Date().toLocaleDateString("zh-CN"),s=e.answers!==!1,o=t.map((l,u)=>{const p=K(l),d=(l.opts??[]).map((b,y)=>{const E=b.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return`<li><span class="k">${String.fromCharCode(65+y)}</span>${R(E)}</li>`}).join("");return`<article class="q">
        <div class="q-no">${String(u+1).padStart(2,"0")} · ${$t[p]}${l.chapter?` · ${jt(l.chapter)}`:""}</div>
        <div class="q-body">${R(l.q)}</div>
        ${d?`<ul class="q-opts">${d}</ul>`:'<p class="q-tag">（简答题，请在答题纸上作答）</p>'}
      </article>`}).join(""),r=s?`<section class="answer-key">
        <h2>参考答案</h2>
        <ol>${t.map((l,u)=>`<li><span class="k">${String(u+1).padStart(2,"0")}</span>${jt(W(l.a,l.opts??[]))}</li>`).join("")}</ol>
      </section>`:"",i=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${jt(a)} · ${n}</title>
<style>${Ms}</style></head>
<body>
  <header class="sheet-head">
    <div class="sheet-kicker">Origin Quiz / Practice Sheet</div>
    <h1 class="sheet-title">${jt(a)}</h1>
    <div class="sheet-meta">${n} · 共 ${t.length} 题${e.subtitle?" · "+jt(e.subtitle):""} · 姓名 __________ 得分 ______</div>
  </header>
  ${o}
  ${r}
  <p class="tips">由「原点 · Origin」导出 · 打印对话框里选择「另存为 PDF」即可保存。</p>
</body></html>`,c=window.open("","_blank");if(!c){f.error("浏览器拦住了新窗口，请允许弹出窗口后重试");return}c.document.open(),c.document.write(i),c.document.close(),c.focus(),f.ok(`已生成 ${t.length} 题的打印版，在打印里选「另存为 PDF」`)}const Ia=914400,Ts=6.4*Ia,qs=4.2*Ia,Cs=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function Da(t,e={}){return`<w:r><w:rPr>${['<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>',e.bold?"<w:b/>":"",e.italic?"<w:i/>":"",`<w:sz w:val="${e.size??21}"/><w:szCs w:val="${e.size??21}"/>`,e.color?`<w:color w:val="${e.color}"/>`:""].join("")}</w:rPr><w:t xml:space="preserve">${Cs(t)}</w:t></w:r>`}function Z(t,e={}){const a=e.before||e.after?`<w:spacing w:before="${e.before??0}" w:after="${e.after??0}"/>`:"",n=e.indent||e.hanging?`<w:ind w:left="${e.indent??0}" w:hanging="${e.hanging??0}"/>`:"";return`<w:p><w:pPr>${a}${n}</w:pPr>${t?Da(t,e):""}</w:p>`}function Ns(t,e,a,n){return`<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${Math.round(a)}" cy="${Math.round(n)}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${e}" name="Picture ${e}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${e}" name="image${e}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${t}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${Math.round(a)}" cy="${Math.round(n)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`}function _s(t){return new Promise(e=>{const a=new Image;a.onload=()=>e({w:a.naturalWidth||640,h:a.naturalHeight||480}),a.onerror=()=>e(null),a.src=t})}function Is(t){const e=/^data:image\/([a-zA-Z+]+);base64,(.+)$/.exec(t);if(!e)return null;try{const a=atob(e[2]),n=new Uint8Array(a.length);for(let o=0;o<a.length;o+=1)n[o]=a.charCodeAt(o);const s=e[1].toLowerCase()==="jpeg"?"jpeg":e[1].toLowerCase();return{bytes:n,ext:s}}catch{return null}}function Ds(t){const e=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html"),a=[],n=s=>{if(s.nodeType===Node.TEXT_NODE){const r=s.textContent??"";r.trim()&&a.push({kind:"text",value:r.replace(/\s+/g," ")});return}if(s.nodeType!==Node.ELEMENT_NODE)return;const o=s;if(o.tagName==="IMG"){a.push({kind:"img",value:o.getAttribute("src")??""});return}if(o.tagName==="BR"){a.push({kind:"br",value:""});return}o.childNodes.forEach(n)};return e.body.firstElementChild?.childNodes.forEach(n),a}async function Os(t,e){const a=[],n=[];let s=0;a.push(Z(e.title??"题库练习卷",{size:32,bold:!0,after:80}));const o=[e.subtitle??"",`${t.length} 题`,"姓名 ________","得分 ________"].filter(Boolean).join("　　");a.push(Z(o,{size:18,color:"666666",after:200}));for(let d=0;d<t.length;d+=1){const b=t[d],y=K(b),E=String(d+1).padStart(2,"0");a.push(Z(`${E}　${$t[y]}${b.chapter?"　·　"+b.chapter:""}`,{size:18,bold:!0,color:"1440FF",before:200,after:60}));const v=Ds(b.q);let $="";const S=()=>{$.trim()&&a.push(Z($.trim(),{after:60})),$=""};for(const k of v)if(k.kind==="text")$+=k.value;else if(k.kind==="br")S();else{S();const T=Is(k.value);if(!T)continue;const j=await _s(k.value)??{w:640,h:480};let rt=j.w*9525,G=j.h*9525;const pt=Math.min(Ts/rt,qs/G,1);rt*=pt,G*=pt,s+=1;const wt=`rId${100+s}`,Ot=`image${s}.${T.ext}`;n.push({relId:wt,name:Ot,bytes:T.bytes,cx:rt,cy:G,id:s}),a.push(Ns(wt,s,rt,G))}if(S(),Array.isArray(b.opts)&&b.opts.length)b.opts.forEach((k,T)=>{const D=String.fromCharCode(65+T),j=String(k).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");a.push(Z(`${D}. ${j}`,{size:20,hanging:280,indent:280,after:20}))});else if(y==="blank")a.push(Z("答：________________________________",{after:40}));else if(y==="essay"){for(let k=0;k<3;k+=1)a.push(Z("　",{after:60}));a.push(Z("（请在答题纸上作答）",{size:18,color:"999999",after:40}))}}e.withAnswers!==!1&&(a.push(`<w:p><w:pPr><w:pageBreakBefore/></w:pPr>${Da("参考答案",{size:28,bold:!0})}</w:p>`),t.forEach((d,b)=>{const y=String(b+1).padStart(2,"0");a.push(Z(`${y}　${W(d.a,d.opts)||"（无）"}`,{size:20,after:40}))}));const r=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>${a.join("")}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="851" w:footer="992" w:gutter="0"/></w:sectPr></w:body></w:document>`,i='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',c='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',l='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+n.map(d=>`<Relationship Id="${d.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${d.name}"/>`).join("")+"</Relationships>",u={"[Content_Types].xml":Ht(i),"_rels/.rels":Ht(c),"word/document.xml":Ht(r),"word/_rels/document.xml.rels":Ht(l)};for(const d of n)u[`word/media/${d.name}`]=d.bytes;const p=gn(u,{level:6});return new Blob([p],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})}async function da(t,e={}){if(!t.length){f.error("没有可导出的题目");return}try{const a=await Os(t,e),n=URL.createObjectURL(a),s=document.createElement("a"),o=new Date().toISOString().slice(0,10);s.href=n,s.download=`${(e.title??"题库试卷").replace(/[\\/:*?"<>|]/g,"-")}-${o}.docx`,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(n),4e3),f.ok(`已导出 ${t.length} 题的 Word 文档`)}catch(a){f.error(a instanceof Error?`导出失败：${a.message}`:"导出失败")}}function Rs(t){const e=t.replace(/```json/gi,"```").trim(),a=/```([\s\S]*?)```/.exec(e)?.[1]??e,n=a.indexOf("{"),s=a.lastIndexOf("}");return n===-1||s<=n?"{}":a.slice(n,s+1)}const ot=20,g={search:"",subject:"all",type:"all",edit:!1,page:0,selected:new Set};function Oa(){g.search="",g.subject="all",g.type="all",g.edit=!1,g.page=0,g.selected.clear()}function it(){return m.bank??[]}function Hs(){return["all",...Array.from(new Set(it().map(t=>t.subject||"默认题库")))]}function Kt(){const t=g.search.trim().toLowerCase();return it().filter(e=>g.subject!=="all"&&(e.subject||"默认题库")!==g.subject||g.type!=="all"&&K(e)!==g.type?!1:t?N(e.q).toLowerCase().includes(t)||e.opts.some(a=>N(a).toLowerCase().includes(t)):!0)}function Ra(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(a=>String.fromCharCode(65+a)).join(" / ")}function Ps(){const t=Kt(),e=Math.max(1,Math.ceil(t.length/ot));g.page>e-1&&(g.page=e-1),g.page<0&&(g.page=0);const a=t.slice(g.page*ot,g.page*ot+ot),n=Hs().map(l=>`<button class="chip" data-act="subject" data-subject="${h(l)}" aria-pressed="${g.subject===l}">
          ${l==="all"?"全部":h(l)}
        </button>`).join(""),s=it(),o={single:0,multi:0,judge:0,blank:0,essay:0};s.forEach(l=>{o[K(l)]+=1});const r=[["all","全部",s.length],["single","单选",o.single],["multi","多选",o.multi],["judge","判断",o.judge],["blank","填空",o.blank],["essay","简答",o.essay]].filter(([l,,u])=>l==="all"||u>0).map(([l,u,p])=>`<button class="chip" data-act="type" data-type="${l}" aria-pressed="${g.type===l}">${u} <span class="chip-n">${p}</span></button>`).join(""),i=a.map((l,u)=>{const p=K(l),d=String(g.page*ot+u+1).padStart(2,"0");return`<tr class="q-row ${g.edit?"selectable":"is-clickable"}" data-id="${l.id}" ${g.edit?"":'data-act="peek"'}>
        <td class="c-no">${g.edit?`<button class="checkbox" data-act="select" data-id="${l.id}" aria-pressed="${g.selected.has(l.id)}">✓</button>`:d}</td>
        <td class="c-q">
          <div class="q-cell">${Ca(R(l.q),g.search)}</div>
          ${l.opts.length?`<div class="q-sub">${l.opts.length} 个选项</div>`:""}
        </td>
        <td class="c-type"><span class="tag tag-type">${$t[p]}</span></td>
        <td class="c-chapter muted">${h(l.chapter||"—")}</td>
        <td class="c-ans"><span class="tag tag-ok">${h(Ra(l))}</span></td>
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
    <div class="chips">${n}</div>
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
      <textarea class="textarea" data-role="opts" placeholder="A. 选项一&#10;B. 选项二">${h((t?.opts??[]).join(`
`))}</textarea>
    </label>
    <label class="field">
      <span class="field-label">题型 <span class="muted small">（自动识别不准时手动指定）</span></span>
      <select class="input" data-role="type">
        ${Yn.map(d=>`<option value="${d.value}"${(t?.type??"")===d.value?" selected":""}>${d.label}</option>`).join("")}
      </select>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>
      <input class="input" data-role="a" value="${h(t?Ra(t):"")}" placeholder="A">
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
    </div>`,!await C({title:e?"添加题目":"编辑题目",body:n,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:d=>{const b=d.querySelector('[data-role="q-host"]');b&&(a.editor=rs({value:t?.q??"",placeholder:"输入题干；可用工具栏插图、写公式（$…$）",minHeight:110}),b.appendChild(a.editor.el));const y=d.querySelector('[data-role="gen-explain"]');y?.addEventListener("click",async()=>{const v=N(a.editor?.getValue()??"").trim(),$=d.querySelector('[data-role="opts"]')?.value??"",S=d.querySelector('[data-role="a"]')?.value??"";if(!v){f.error("先写题干，AI 才能写解析");return}const k=d.querySelector('[data-role="explain"]'),T=y.textContent??"";y.disabled=!0,y.textContent="生成中…";try{const D=await L.ai.explain(`题目：${v}
选项：${$.split(`
`).join("；")}
正确答案：${S}`);k&&(k.value=(D.result??"").trim()),f.ok("解析已生成，可再手动润色")}catch(D){f.error(D instanceof M?D.message:"生成失败")}finally{y.disabled=!1,y.textContent=T}});const E=d.querySelector('[data-role="classify"]');E&&E.addEventListener("click",async()=>{const v=N(a.editor?.getValue()??"").trim();if(!v){f.error("先写题干，AI 才能判断归类");return}const $=d.querySelector('[data-role="opts"]')?.value??"",S=E.textContent??"";E.disabled=!0,E.textContent="归类中…";try{const k=await L.ai.classify(`题目：${v}
选项：${$.split(`
`).join("；")}`),T=JSON.parse(Rs(k.result??"{}")),D=d.querySelector('[data-role="subject"]'),j=d.querySelector('[data-role="chapter"]');T.subject&&D&&(D.value=String(T.subject).slice(0,24)),T.chapter&&j&&(j.value=String(T.chapter).slice(0,24)),f.ok("已根据题目填入题库与章节")}catch{f.error("AI 归类失败，可手动填写")}finally{E.disabled=!1,E.textContent=S}})}}))return;const o=d=>n.querySelector(`[data-role="${d}"]`).value,r=(a.editor?.getValue()??"").trim();if(!N(r).trim()&&!/<img/i.test(r)){f.error("题干不能为空");return}const i=o("opts").split(`
`).map(d=>d.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),c=o("a").trim();let l="";if(i.length){const b=c.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(y=>y.charCodeAt(0)-65).filter(y=>y>=0&&y<i.length);if(!b.length){f.error("答案请填选项字母，如 A 或 A,B");return}l=b.length===1?b[0]:b}else l=c;const u=n.querySelector('[data-role="type"]'),p={q:r,opts:i,a:l,chapter:o("chapter").trim(),subject:o("subject").trim()||"默认题库",explain:o("explain").trim(),type:u?.value??""};try{if(e)await L.questions.add([p]);else try{await L.questions.update(t.id,p,{baseUpdatedAt:t.updated_at})}catch(d){if(d instanceof M&&d.status===409){if(!await dt({title:"这道题在别处被改过",message:"另一台设备保存了这题的更新版本。要用你现在的内容覆盖它吗？",okText:"覆盖",danger:!0}))return;await L.questions.update(t.id,p,{force:!0})}else throw d}X("bank"),await lt(!0),f.ok(e?"题目已添加":"题目已保存")}catch(d){f.error(d instanceof M?d.message:"保存失败")}}async function zs(){await vs()}function Bs(){const t=it().filter(s=>g.selected.has(s.id));if(!t.length){f.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=`题库-${t.length}题.json`,n.click(),URL.revokeObjectURL(a),f.ok(`已导出 ${t.length} 题`)}async function Us(){await lt()}async function Fs(t,e){switch(t){case"subject":return g.subject=e.dataset.subject??"all",!0;case"toggle-edit":return g.edit=!g.edit,g.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return g.selected.has(a)?g.selected.delete(a):g.selected.add(a),!0}case"add":return await ye(),!0;case"edit":{const a=it().find(n=>n.id===Number(e.dataset.id));return a&&await ye(a),!0}case"delete-selected":{const a=[...g.selected];if(!a.length||!await dt({title:"删除题目",message:`确定删除选中的 ${a.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await L.questions.remove(a),g.selected.clear(),X("bank"),await lt(!0),f.ok("已删除")}catch(n){f.error(n instanceof M?n.message:"删除失败")}return!0}case"export":return Bs(),!0;case"print":return la(Kt(),{title:`题库 · ${g.subject==="all"?"全部":g.subject}`}),!0;case"docx":return await da(Kt(),{title:`题库 · ${g.subject==="all"?"全部":g.subject}`,subtitle:"原点 · Origin"}),!0;case"docx-selected":return await da(it().filter(a=>g.selected.has(a.id)),{title:"选中题目 · 试卷",subtitle:"原点 · Origin"}),!0;case"print-selected":return la(it().filter(a=>g.selected.has(a.id)),{title:"选中题目 · 试卷"}),!0;case"page-prev":return g.page=Math.max(0,g.page-1),!0;case"page-next":return g.page+=1,!0;case"select-all":{const a=Kt().slice(g.page*ot,g.page*ot+ot),n=a.every(s=>g.selected.has(s.id));return a.forEach(s=>n?g.selected.delete(s.id):g.selected.add(s.id)),!0}case"generate":return await Ls(),!0;case"import":return await zs(),!0;case"type":{const a=e.dataset.type;return a&&(g.type=a,g.page=0),!0}case"peek":{const a=Number(e.dataset.id),n=it().find(s=>s.id===a);return n&&await Ws(n),!0}case"search":return!0;default:return!1}}async function Ws(t){const e=K(t),a=document.createElement("div");a.className="peek",a.innerHTML=`
    <div class="peek-meta">
      <span class="tag tag-type">${$t[e]}</span>
      ${t.subject?`<span class="tag">${h(t.subject)}</span>`:""}
      ${t.chapter?`<span class="tag">${h(t.chapter)}</span>`:""}
    </div>
    <div class="peek-q q-text">${R(t.q)}</div>
    ${t.opts.length?`<ul class="peek-opts">${t.opts.map((s,o)=>`<li class="${(Array.isArray(t.a)?t.a.includes(o):t.a===o)?"is-hit":""}"><b>${String.fromCharCode(65+o)}</b>${R(String(s).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</li>`).join("")}</ul>`:""}
    <div class="peek-ans"><span class="muted">答案</span> ${h(W(t.a,t.opts)||"（无）")}</div>`,await C({title:"题目预览",body:a,actions:[{label:"关闭",value:"close"},{label:"编辑这题",value:"edit",variant:"primary"}]})==="edit"&&await ye(t)}function Ks(t){return t.dataset.role==="search"?(g.search=t.value,g.page=0,!0):!1}const Gs="modulepreload",Js=function(t){return"/"+t},ua={},Vs=function(e,a,n){let s=Promise.resolve();if(a&&a.length>0){let r=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");s=r(a.map(l=>{if(l=Js(l),l in ua)return;ua[l]=!0;const u=l.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":Gs,u||(d.as="script"),d.crossOrigin="",d.href=l,c&&d.setAttribute("nonce",c),document.head.appendChild(d),u)return new Promise((b,y)=>{d.addEventListener("load",b),d.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return s.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function Ha(t){return new Promise(e=>window.setTimeout(e,t))}function Qs(t,e,a=620,n="%"){const s=performance.now(),o=r=>{const i=Math.min((r-s)/a,1),c=1-Math.pow(1-i,3);t.innerHTML=`${Math.round(e*c)}<span>${n}</span>`,i<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}function Jt(t=12){H.vibration&&navigator.vibrate?.(t)}const Pa="oq:log",Xs=4e3;function za(){try{const t=localStorage.getItem(Pa),e=t?JSON.parse(t):[];return Array.isArray(e)?e:[]}catch{return[]}}function Ba(t){try{localStorage.setItem(Pa,JSON.stringify(t.slice(-Xs)))}catch{}}function Ys(t,e){const a=za();a.push({ts:Date.now(),type:t,ok:e}),Ba(a)}const Zs=t=>String(t).padStart(2,"0");function tr(){const t=za(),e=new Date().toDateString(),a=new Map,n=new Map;let s=0,o=0,r=0,i=0;for(const u of t){const p=new Date(u.ts);s+=1,u.ok&&(o+=1),p.toDateString()===e&&(r+=1,u.ok&&(i+=1));const d=a.get(u.type)??{n:0,ok:0};d.n+=1,u.ok&&(d.ok+=1),a.set(u.type,d);const b=`${p.getMonth()+1}-${Zs(p.getDate())}`,y=n.get(b)??{n:0,ok:0,ts:p.setHours(0,0,0,0)};y.n+=1,u.ok&&(y.ok+=1),n.set(b,y)}const c=[...a.entries()].map(([u,p])=>({type:u,n:p.n,ok:p.ok,rate:p.n?p.ok/p.n:0})).sort((u,p)=>p.n-u.n),l=[...n.entries()].sort((u,p)=>u[1].ts-p[1].ts).map(([u,p])=>({label:u,n:p.n,ok:p.ok}));return{total:s,ok:o,rate:s?o/s:0,today:{n:r,ok:i,rate:r?i/r:0},byType:c,days:l,days7:l.slice(-7)}}function er(){Ba([])}let A=null,Ct=null;function At(){return A?A.options.questions[A.idx]??null:null}function Zt(t){const e=A;let a=e.records.get(t.id);return a||(a={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,a)),a}function Ua(){const t=A;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function ar(){const t=A;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function U(t){const e=K(t);return e==="blank"||e==="essay"||e==="calc"||$n(t.a)}function nr(t,e){if(U(t))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${h(e.text)}</textarea>
      </div>`;const a=Dt(t.a);return`<div class="opts" data-multi="${a.length>1}">${t.opts.map((s,o)=>{let r="";return e.submitted?a.includes(o)?r="correct":e.picked.includes(o)?r="wrong":r="muted":e.picked.includes(o)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${o}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+o)}</span>
        <span class="opt-text">${R(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function sr(t,e){if(!e.submitted)return"";const a=U(t)?String(t.a):W(t.a,t.opts),n=U(t)?N(e.text)||"（空）":W(e.picked.length?e.picked:[],t.opts)||"（未选）";if(U(t)){const o=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${A?.busy?"disabled":""}>✦ AI 阅卷</button>
          <button class="btn btn-sm" data-act="mark" data-ok="1">我答对了</button>
          <button class="btn btn-sm" data-act="mark" data-ok="0">没答对</button>
        </div>`:`<div class="essay-actions"><span class="tag ${e.correct?"tag-ok":"tag-bad"}">${e.correct?"已标记：答对":"已标记：答错"}</span></div>`;return`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${h(a)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${h(n)}
      <div class="divider"></div>
      ${o}
    </div>`}const s=(t.explain??"").trim();return`<div class="answer-panel">
    <div class="ai-title">${e.correct?"✅ 回答正确":"❌ 回答错误"}</div>
    正确答案：${h(W(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${h(n)}`}
    ${s?`<div class="divider"></div><div class="ai-title" style="color:var(--text-3)">解析</div><div class="explain-body">${R(s)}</div>`:""}
  </div>`}function rr(){const t=A,e=At();if(!e)return"";const a=Zt(e),n=t.options.questions.length,s=n?Math.round((t.idx+(a.submitted?1:0))/n*100):0,o=!U(e)&&Dt(e.a).length>1;return`
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
          ${e.subject?`<span class="tag tag-accent">${h(e.subject)}</span>`:""}
          ${e.chapter?`<span class="tag">${h(e.chapter)}</span>`:""}
          <span class="grow"></span>
          <span>${$t[K(e)]}</span>
        </div>
        <div class="q-text">${R(e.q)}</div>
        ${nr(e,a)}
        ${sr(e,a)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${Gt(e.id)}" aria-label="收藏">${Gt(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!Le()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${a.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===n-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${o||U(e)?"提交答案":"查看答案"}</button>`}
    </div>`}function or(t,e){A={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},F(),Ct=a=>{const n=A;if(!n)return;const s=a.target,o=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(a.key==="Escape"){if(document.querySelector(".modal-layer"))return;He();return}if(o)return;const r=At();if(!r)return;const i=Zt(r);if(a.key===" "||a.key==="Enter"){const l=n.root?.querySelector('[data-act="submit"]'),u=n.root?.querySelector('[data-act="next"]');l?(a.preventDefault(),Q("submit",l)):u&&(a.preventDefault(),Q("next",u));return}if(a.key==="ArrowRight"){a.preventDefault(),i.submitted?Oe():Q("submit",n.root.querySelector('[data-act="submit"]'));return}if(a.key==="ArrowLeft"){a.preventDefault(),Q("prev",n.root);return}const c=a.key.toLowerCase();if(/^[1-9]$/.test(c)||/^[a-h]$/.test(c)){const l=/^[1-9]$/.test(c)?Number(c)-1:c.charCodeAt(0)-97;if(l<r.opts.length){a.preventDefault();const u=n.root?.querySelector(`.opt[data-idx="${l}"]`);u&&Q("pick",u)}return}c==="s"?Q("fav",n.root):c==="n"?Q("note",n.root):c==="e"?Q("ai",n.root):c==="g"?Q("ai-grade",n.root):c==="?"&&Vs(()=>Promise.resolve().then(()=>Rr),void 0).then(l=>l.openShortcuts())},document.addEventListener("keydown",Ct),t.addEventListener("submit",a=>a.preventDefault()),t.addEventListener("input",Fa)}function F(){const t=A;t?.root&&(t.root.innerHTML=rr())}function Fa(t){const e=t.target;e?.dataset.role!=="essay"||!A||(A.textDraft=e.value)}async function le(t,e){const a=A;e.submitted=!0;const n=K(t);if(ts(n))if(n==="blank"){const s=o=>String(o).replace(/[\s，。、；：""''（）()【】\[\]]/g,"").toLowerCase();e.correct=s(e.text??"")!==""&&s(e.text??"")===s(String(t.a??""))}else e.correct=null;else if(e.correct=$a(e.picked,t.a),e.correct){Jt(10);const s=ir();s>=3&&s%3===0&&f.ok(`连对 ${s} 题，保持住`)}else Jt([14,40,14]),De(t,e);$e(t,e),F(),e.correct&&a.options.questions.length>a.idx+1&&(await Ha(600),A&&A.idx===a.idx&&Oe())}function $e(t,e){if(!e.submitted||e.correct===null||e.correct===void 0)return;const a=e;a.counted||(a.counted=!0,Ys(K(t),e.correct===!0))}function ir(){const t=A;let e=0;for(let a=t.idx;a>=0;a-=1){const n=t.records.get(t.options.questions[a].id);if(n?.submitted)if(n.correct===!0)e+=1;else break}return e}async function De(t,e){try{await L.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(a){a instanceof M&&a.status!==401&&f.error(`错题保存失败：${a.message}`)}}function Oe(){const t=A,e=t.options.questions.length;if(t.idx>=e-1){cr();return}t.idx+=1,t.textDraft="",F(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function Re(){Ct&&document.removeEventListener("keydown",Ct),Ct=null,A?.root?.removeEventListener("input",Fa),A?.root?.replaceChildren(),A=null}async function He(){const t=A;if(!t)return;const e=Ua();if(!await dt({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;At()&&Wa();const s=t.options.onExit;Re(),s?.()}function Wa(){const t=A;if(!t)return;t.options.source==="sequential"&&qn(t.idx);const e=t.options.questions.slice(0,5).map(a=>N(a.q).slice(0,40));_n(e)}async function cr(){const t=A;Wa();const e=t.options.questions.length,a=Ua(),n=ar(),s=a-n,o=a?Math.round(n/a*100):0;if(Re(),await C({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${n}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${a}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:i=>{const c=i.querySelector('[data-role="acc"]');c&&Qs(c,o)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function lr(t,e,a){e.correct=a,e.submitted=!0,$e(t,e),$e(t,e),a?Jt(10):De(t,e),F(),a&&f.ok("已记为答对")}async function dr(t,e){const a=A;if(a){a.busy=!0,F();try{const n=[`题目：${N(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${N(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await L.ai.grade(n),o=String(s.result||""),r=o.includes("得分")&&!o.includes("不得分");e.correct=r,r?Jt(10):De(t,e),f.ok(r?"AI 阅卷：答对":"AI 阅卷：答错")}catch(n){f.error(n instanceof M?n.message:"AI 阅卷失败，请稍后再试")}finally{a.busy=!1,F()}}}async function ur(){const t=At();if(!t)return;const e=Le()[String(t.id)]??"",a=document.createElement("div");a.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${h(e)}</textarea>`;const n=a.querySelector("textarea");await C({title:"我的笔记",body:a,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>n.focus()})&&(Tn(t.id,n.value),f.ok("笔记已保存"),F())}async function pr(){const t=At();if(!t)return;const e=Zt(t),a=[`题目：${N(t.q)}`,t.opts.length?`选项：${t.opts.map((r,i)=>`${String.fromCharCode(65+i)}. ${N(r)}`).join("；")}`:"",`正确答案：${U(t)?t.a:W(t.a,t.opts)}`,e.submitted?`我的作答：${U(t)?e.text:W(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),n=document.createElement("div");n.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',C({title:"AI 深度解析",body:n,actions:[{label:"关闭",value:"close"}]});const s=n.querySelector('[data-role="text"]'),o=n.querySelector(".ai-title");try{let r="";const i=await L.ai.explainStream(a,l=>{r+=l,s.innerHTML=`${h(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),c=i.provider==="deepseek"?"DeepSeek":i.provider==="zhipu"?"智谱":"";o.textContent=r?`✦ AI 解析${c?` · ${c}`:""}${i.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=h(i.text||r).replace(/\n/g,"<br>"):await mr(s,i.text??""),s.classList.remove("cursor")}catch(r){const i=r instanceof M?r.message:"AI 解析失败，请稍后重试";f.error(i),o.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=i}}async function mr(t,e){for(let a=0;a<e.length;a+=2)t.innerHTML=h(e.slice(0,a+2)).replace(/\n/g,"<br>"),await Ha(12)}function fr(){const t=A;if(!t)return;const e=t.options.questions.map((a,n)=>{const s=t.records.get(a.id),o=n===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${n}" data-state="${o}">${n+1}</button>`}).join("");C({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:a=>{a.querySelectorAll(".nav-cell").forEach(n=>{n.addEventListener("click",()=>{const s=Number(n.dataset.idx);!Number.isFinite(s)||!A||(A.idx=s,A.textDraft="",Yt(),F())})})}}).then(a=>{a==="finish"&&He()})}async function Q(t,e){const a=A;if(!a)return!1;const n=At();if(!n)return!1;const s=Zt(n);switch(t){case"pick":{if(s.submitted)return!0;const o=Number(e.dataset.idx);return U(n)||(Dt(n.a).length>1?(s.picked=s.picked.includes(o)?s.picked.filter(i=>i!==o):[...s.picked,o],F()):(s.picked=[o],await le(n,s))),!0}case"submit":{if(U(n)){const o=a.root?.querySelector('[data-role="essay"]');if(s.text=o?.value??a.textDraft,!s.text.trim())return f.info("先写点什么再提交吧"),!0;await le(n,s)}else{if(!s.picked.length)return f.info("请先选择答案"),!0;await le(n,s)}return!0}case"ai-grade":return!U(n)||A?.busy||await dr(n,s),!0;case"mark":return U(n)&&lr(n,s,e.dataset.ok==="1"),!0;case"next":return Oe(),!0;case"prev":return a.idx>0&&(a.idx-=1,a.textDraft="",F()),!0;case"jump":return a.idx=Number(e.dataset.idx),a.textDraft="",Yt(),F(),!0;case"nav":return fr(),!0;case"exit":return await He(),!0;case"fav":return await Gn(n.id),F(),!0;case"note":return await ur(),!0;case"ai":return pr(),!0;default:return!1}}let tt=null;function gr(){return!!(tt&&document.body.contains(tt))}function ht(t){if(!t.questions.length){f.info("这里还没有题目");return}pa(),tt=document.createElement("div"),tt.className="quiz",document.body.appendChild(tt),document.body.classList.add("is-locked"),or(tt,{...t,onExit:()=>{pa(),t.onExit?.()}}),Cn({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function pa(){tt&&(Re(),tt.remove(),tt=null,document.body.classList.remove("is-locked"))}async function de(t="random"){const e=m.bank??[];if(!e.length){f.info("题库还是空的，先去添加题目吧");return}const a=await Ga(e);if(a===null)return;const n=a?e.filter(o=>(o.subject?.trim()||"默认题库")===a):e;if(t==="chapter"){const o=await yr(n);if(!o?.length)return;const r=n.filter(c=>o.includes(c.chapter||"未分类")),i=await Vt(r.length);if(i===null)return;ht({questions:r.slice(0,i),source:"chapter",title:"章节练习"});return}const s=await Vt(n.length);if(s!==null){if(t==="sequential"){const o=Math.min(Sa(),Math.max(n.length-1,0));ht({questions:n.slice(0,s),source:"sequential",title:"顺序练习",startIndex:o<s?o:0});return}ht({questions:xe(n).slice(0,s),source:"all",title:"随机练习"})}}async function br(){const t=m.bank??[];if(!t.length){f.info("题库还是空的，先去添加题目吧");return}const e=await Ga(t);if(e===null)return;const a=e?t.filter(n=>(n.subject?.trim()||"默认题库")===e):t;ht({questions:xe(a),source:"all",title:`乱序练习 · ${a.length} 题${e?` · ${e}`:""}`})}async function Ka(){const t=m.wrong??await vt(!0);if(!t.length){f.info("错题本是空的，先去刷几题吧");return}const e=await Vt(t.length);if(e===null)return;const a=t.slice(0,e).map(n=>({id:n.id,q:n.q,opts:n.opts,a:n.a,chapter:n.chapter,subject:n.subject}));ht({questions:a,source:"wrong",title:"错题重练"})}function hr(t){if(!t.length){f.info("还没有收藏题目");return}Vt(t.length).then(e=>{e!==null&&ht({questions:xe(t).slice(0,e),source:"fav",title:"收藏练习"})})}function vr(){const t=Aa(),e=m.bank??[];if(!t||!e.length)return f.info("没有可以继续的练习"),!1;const a=new Map(e.map(s=>[s.id,s])),n=t.ids.map(s=>a.get(s)).filter(s=>!!s);return n.length?(ht({questions:n,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,n.length-1)}),!0):(Ea(),f.info("上次的题目已经不在了"),!1)}function Vt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const a=document.createElement("div");a.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const n=a.querySelector('[data-role="count"]');return n.addEventListener("click",s=>{const o=s.target.closest("button[data-n]");o&&(n.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),o.setAttribute("aria-pressed","true"))}),C({title:"练多少题",body:a,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const o=n.querySelector('button[aria-pressed="true"]');return Number(o?.dataset.n??t)})}async function yr(t){const e=new Map;t.forEach(r=>{const i=r.chapter?.trim()||"未分类";e.set(i,(e.get(i)??0)+1)});const a=[...e.entries()].sort((r,i)=>i[1]-r[1]);if(!a.length)return null;const n=document.createElement("div");if(n.innerHTML=`<div class="list">${a.map(([r,i],c)=>`
      <button class="item" data-chapter="${h(r)}" data-checked="${c===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${h(r)}</span><span class="tag">${i} 题</span></div>
      </button>`).join("")}</div>`,n.addEventListener("click",r=>{const i=r.target.closest("[data-chapter]");i&&(i.dataset.checked=i.dataset.checked==="true"?"false":"true")}),!await C({title:"选择章节",body:n,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const o=Array.from(n.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return o.length?o:null}async function Ga(t){const e=new Map;t.forEach(i=>{const c=i.subject?.trim()||"默认题库";e.set(c,(e.get(c)??0)+1)});const a=[...e.entries()].sort((i,c)=>c[1]-i[1]);if(a.length<2)return"";const n=document.createElement("div");n.innerHTML=`
    <div class="chip-row" data-role="subject">
      <button type="button" class="chip is-on" data-sub="" aria-pressed="true">全部 · ${t.length}</button>
      ${a.map(([i,c])=>`<button type="button" class="chip" data-sub="${h(i)}" aria-pressed="false">${h(i)} · ${c}</button>`).join("")}
    </div>
    <p class="muted small" style="margin:12px 0 0">选科目后只会练这个科目下的题</p>`;const s=n.querySelector('[data-role="subject"]');return s.addEventListener("click",i=>{const c=i.target.closest("button[data-sub]");c&&(s.querySelectorAll("button").forEach(l=>{l.classList.remove("is-on"),l.setAttribute("aria-pressed","false")}),c.classList.add("is-on"),c.setAttribute("aria-pressed","true"))}),await C({title:"练哪个科目",body:n,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]})?s.querySelector("button.is-on")?.dataset.sub??"":null}const bt=new Set;function $r(){bt.clear()}function we(){return m.favs??[]}function wr(){const t=we(),e=m.loading.fav&&!m.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(a=>`
        <div class="item" data-id="${a.id}">
          <div class="item-q">${R(a.q)}</div>
          <div class="item-meta">
            ${a.subject?`<span class="tag tag-accent">${h(a.subject)}</span>`:""}
            ${a.chapter?`<span class="tag">${h(a.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${a.id}">${bt.has(a.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${a.id}">取消收藏</button>
          </div>
          ${bt.has(a.id)?`<div class="item-answer"><div class="right">${h(W(a.a,a.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function xr(){await _t()}async function kr(t,e){switch(t){case"practice":return we().length?(await hr(we()),!0):(f.info("还没有收藏的题"),!0);case"reveal":{const a=Number(e.dataset.id);return bt.has(a)?bt.delete(a):bt.add(a),!0}case"remove":{const a=Number(e.dataset.id);try{await L.favorites.remove(a),bt.delete(a),X("fav"),await _t(!0),f.ok("已取消收藏")}catch(n){f.error(n instanceof M?n.message:"操作失败")}return!0}default:return!1}}let O=null,St=null,Nt=null;const Sr=t=>String.fromCharCode(65+t),Ar=t=>typeof t.a=="number"||Array.isArray(t.a);function Ja(t){const e=Math.max(0,Math.round(t/1e3)),a=Math.floor(e/60),n=e%60;return`${String(a).padStart(2,"0")}:${String(n).padStart(2,"0")}`}async function Er(){const t=(m.bank??[]).filter(Ar);if(t.length<3){f.error("题库里的客观题不足 3 道，先导入或手写几道再考");return}const e=document.createElement("div");if(e.innerHTML=`
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
    <p class="muted small" style="margin:12px 0 0">可选 ${t.length} 道客观题；考试中不显示对错。</p>`,!await C({title:"模拟考试",body:e,actions:[{label:"取消",value:!1},{label:"开始考试",value:!0,variant:"primary"}]}))return;const n=(i,c)=>{const l=e.querySelector(`[data-role="${i}"]`),u=Number(l?.value);return Number.isFinite(u)&&u>0?u:c},s=Math.min(t.length,n("count",Math.min(20,t.length))),o=Math.min(180,n("min",15));O={questions:[...t].sort(()=>Math.random()-.5).slice(0,s),picks:new Map,idx:0,endsAt:Date.now()+o*60*1e3,timer:window.setInterval(Lr,1e3),submitted:!1},jr()}function jr(){const t=document.getElementById("app-root")??document.body,e=document.createElement("div");e.className="exam",t.appendChild(e),St=e,te(),Nt=a=>{if(!(!O||document.querySelector(".modal-layer"))){if(a.key==="ArrowRight")a.preventDefault(),Qt(1);else if(a.key==="ArrowLeft")a.preventDefault(),Qt(-1);else if(/^[a-h1-8]$/i.test(a.key)){const n=/^\d$/.test(a.key)?Number(a.key)-1:a.key.toLowerCase().charCodeAt(0)-97;Va(n)}}},document.addEventListener("keydown",Nt)}function Lr(){const t=O;if(!t||t.submitted)return;if(Date.now()>=t.endsAt){Pe(!0);return}const e=St?.querySelector(".exam-clock");if(e){const a=t.endsAt-Date.now();e.textContent=Ja(a),e.classList.toggle("is-urgent",a<=6e4)}}function te(){const t=O;if(!t||!St)return;const e=t.questions[t.idx],a=t.picks.get(e.id)??[],n=t.endsAt-Date.now(),s=t.questions.filter(r=>(t.picks.get(r.id)??[]).length>0).length,o=Array.isArray(e.a)&&e.a.length>1;St.innerHTML=`
    <div class="exam-bar">
      <button class="icon-btn" data-ex="exit" aria-label="退出">←</button>
      <div class="exam-progress">${t.idx+1} / ${t.questions.length} · 已答 ${s}</div>
      <span class="exam-clock ${n<=6e4?"is-urgent":""}">${Ja(n)}</span>
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
                <span class="opt-key">${Sr(i)}</span>
                <span class="opt-text">${R(String(r).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
              </button>`).join("")}
        </div>
      </article>
    </div>
    <div class="exam-foot">
      <button class="btn" data-ex="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${t.idx===t.questions.length-1?"":'<button class="btn" data-ex="next">下一题</button>'}
      <button class="btn btn-primary" data-ex="submit">交卷</button>
    </div>`}function Va(t){const e=O;if(!e)return;const a=e.questions[e.idx];if(t<0||t>=a.opts.length)return;const n=Array.isArray(a.a)&&a.a.length>1,s=e.picks.get(a.id)??[];n?e.picks.set(a.id,s.includes(t)?s.filter(o=>o!==t):[...s,t]):e.picks.set(a.id,[t]),te()}function Qt(t){const e=O;if(!e)return;const a=e.idx+t;a<0||a>=e.questions.length||(e.idx=a,te())}function Mr(){const t=O;if(!t)return;const e=document.createElement("div");e.className="nav-grid",e.innerHTML=t.questions.map((a,n)=>`<button class="nav-cell ${(t.picks.get(a.id)??[]).length>0?"is-done":""} ${n===t.idx?"is-cur":""}" data-idx="${n}">${n+1}</button>`).join(""),e.addEventListener("click",a=>{const n=a.target.closest(".nav-cell");if(!n||!O)return;const s=Number(n.dataset.idx);Number.isFinite(s)&&(O.idx=s,document.querySelector(".modal-layer")?.remove(),te())}),C({title:"答题卡",body:e,actions:[{label:"继续答题",value:"close"},{label:"交卷",value:"submit",variant:"primary"}]}).then(a=>{a==="submit"&&Pe(!1)})}async function Pe(t){const e=O;if(!e||e.submitted)return;const a=e.questions.filter(i=>(e.picks.get(i.id)??[]).length===0).length;if(!t&&a>0&&!await dt({title:"还有题没答",message:`还有 ${a} 道没答，确定交卷？`,okText:"交卷"}))return;e.submitted=!0,window.clearInterval(e.timer);let n=0;const s=[];for(const i of e.questions){const c=e.picks.get(i.id)??[];c.length&&$a(c,i.a)?n+=1:s.push(i)}const o=Math.round(n/e.questions.length*100);for(const i of s)L.wrong.add({q:i.q,opts:i.opts,a:i.a,chapter:i.chapter,subject:i.subject,explain:i.explain,user_choice:e.picks.get(i.id)??[]}).catch(()=>{});const r=document.createElement("div");r.className="exam-result",r.innerHTML=`
    <div class="score-big">${o}<span>分</span></div>
    <div class="score-sub">答对 ${n} / ${e.questions.length} · ${t?"时间到自动交卷":"手动交卷"}</div>
    ${s.length?`<div class="wrong-list">${s.slice(0,8).map(i=>`<div class="wrong-item">
                <div class="wrong-q">${R(i.q)}</div>
                <div class="wrong-a">
                  <b class="bad">你选 ${W(e.picks.get(i.id)??[],i.opts)||"未答"}</b>
                  <span class="ok">正确 ${W(i.a,i.opts)}</span>
                </div>
              </div>`).join("")}${s.length>8?`<div class="muted small">…还有 ${s.length-8} 道已进错题本</div>`:""}</div>`:'<div class="all-right">全对，厉害</div>'}`,await C({title:"考试结果",body:r,actions:[{label:"知道了",value:"close",variant:"primary"}]}),Qa()}function Qa(){O&&window.clearInterval(O.timer),O=null,Nt&&document.removeEventListener("keydown",Nt),Nt=null,St?.remove(),St=null}function Xa(t,e){if(!O)return!1;switch(t){case"pick":return Va(Number(e.dataset.idx)),!0;case"prev":return Qt(-1),!0;case"next":return Qt(1),!0;case"sheet":return Mr(),!0;case"submit":return Pe(!1),!0;case"exit":return(async()=>await dt({title:"退出考试",message:"退出后本次作答不保留，确定吗？",danger:!0,okText:"退出"})&&Qa())(),!0;default:return!1}}function Ya(){return!!O}function Tr(){const t=new Date,e=n=>String(n).padStart(2,"0"),a="日一二三四五六"[t.getDay()];return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())} · 周${a}`}const ma=t=>String(t).padStart(2,"0");function qr(){const t=m.bank,e=m.wrong,a=m.favs,n=Aa(),s=Sa(),o=t?t.length:0,r=Math.min(o||10,20),i=!!(t&&!t.length),c=l=>l===void 0?"—":ma(l);return`
    <section class="masthead">
      <div class="mast-meta">
        <span>${Tr()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${m.user?`@${h(m.user)}`:"未登录"}</span>
      </div>
      <h1 class="mast-title mast-title-sm">
        练 <em>${ma(r)}</em> 题
      </h1>
      <div class="stat-strip">
        <button class="stat" data-act="goto" data-tab="bank">
          <span class="stat-num">${c(t?.length)}</span><span class="stat-label">题库</span>
        </button>
        <button class="stat" data-act="goto" data-tab="wrong">
          <span class="stat-num">${c(e?.length)}</span><span class="stat-label">错题</span>
        </button>
        <button class="stat" data-act="goto" data-tab="fav">
          <span class="stat-num">${c(a?.length)}</span><span class="stat-label">收藏</span>
        </button>
      </div>
    </section>

    <div class="primary-row">
      ${i?`<button class="cta cta-compact" data-act="goto" data-tab="bank">
               <span class="cta-kicker">EMPTY / 题库为空</span>
               <span class="cta-title">先导入题库</span>
               <span class="cta-arrow" aria-hidden="true">→</span>
             </button>`:`<button class="cta cta-compact" data-act="random" ${t?"":"disabled"}>
               <span class="cta-kicker">START / 随机抽题</span>
               <span class="cta-title">开始练习</span>
               <span class="cta-arrow" aria-hidden="true">→</span>
             </button>`}
      <button class="ghost-card" data-act="exam" ${i?"disabled":""}>
        <span class="ghost-kicker">MOCK EXAM</span>
        <span class="ghost-title">模拟考试</span>
        <span class="ghost-arrow" aria-hidden="true">→</span>
      </button>
    </div>

    <div class="tile-grid tile-grid-sm">
      <button class="tile tile-sm" data-act="sequential" ${i?"disabled":""}>
        <span class="tile-idx">01</span>
        <span class="tile-name">顺序练习</span>
        <span class="tile-desc">${i?"题库为空":s>0?`停在第 ${s+1} 题`:"按顺序推进"}</span>
      </button>
      <button class="tile tile-sm" data-act="shuffle" ${i?"disabled":""}>
        <span class="tile-idx">02</span>
        <span class="tile-name">乱序练习</span>
        <span class="tile-desc">${i?"题库为空":`打乱全部 ${t?.length??0} 题`}</span>
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
    </div>`}async function Cr(){Dn()||(On(),window.setTimeout(()=>f.info(Jn()),320)),await Promise.allSettled([lt(),vt(),_t()])}async function Nr(t,e){switch(t){case"goto":return Xt(e.dataset.tab??"bank"),!0;case"random":return await de("random"),!0;case"sequential":return await de("sequential"),!0;case"shuffle":return await br(),!0;case"chapter":return await de("chapter"),!0;case"wrong":return await Ka(),!0;case"resume":return vr(),!0;case"exam":return await Er(),!0;default:return!1}}const ue=8;function _r(){const t=[],e=(a,n,s)=>{(a??[]).forEach(o=>t.push({id:o.id,q:o,source:n,tab:s}))};return e(m.bank,"题库","bank"),e(m.wrong,"错题","wrong"),e(m.favs,"收藏","fav"),t}function Ir(t,e){const a=e.toLowerCase();return a?N(t.q.q).toLowerCase().includes(a)||(t.q.opts??[]).some(n=>N(n).toLowerCase().includes(a))||N(t.q.chapter??"").toLowerCase().includes(a)||N(t.q.subject??"").toLowerCase().includes(a):!0}function fa(t=""){const e=document.createElement("div");e.className="search-panel",e.innerHTML=`
    <div class="search-box">
      <span class="ico">⌕</span>
      <input class="search-input" type="search" data-role="kw" placeholder="搜题干、选项、章节、题库…" value="${t.replace(/"/g,"&quot;")}">
    </div>
    <div class="search-results" data-role="hits"></div>
    <p class="muted small search-foot" data-role="foot"></p>`;const a=_r(),n=e.querySelector('[data-role="hits"]'),s=e.querySelector('[data-role="foot"]'),o=e.querySelector('[data-role="kw"]'),r=()=>{const i=o.value.trim(),c=a.filter(p=>Ir(p,i));if(!i){const p=c.filter(d=>d.tab==="bank").slice(0,12);n.innerHTML=p.length?p.map(d=>`<button class="hit" data-act="open" data-tab="${d.tab}" data-id="${d.id}">
                <span class="hit-src">${d.source}</span>
                <span class="hit-q">${R(d.q.q)}</span>
              </button>`).join(""):'<p class="muted small">题库还是空的，先去导入吧。</p>',s.textContent=p.length?"输入关键词可以跨题库 / 错题 / 收藏一起搜":"";return}const l=p=>c.filter(d=>d.source===p),u=[];["题库","错题","收藏"].forEach(p=>{const d=l(p);d.length&&(u.push(`<div class="hit-group">${p} · ${d.length}</div>`),u.push(d.slice(0,ue).map(b=>{const y=K(b.q);return`<button class="hit" data-act="open" data-tab="${b.tab}" data-id="${b.id}">
              <span class="hit-src">${$t[y]}</span>
              <span class="hit-q">${Ca(R(b.q.q),i)}</span>
            </button>`}).join("")),d.length>ue&&u.push(`<div class="hit-more muted small">还有 ${d.length-ue} 条，缩小关键词试试</div>`))}),n.innerHTML=u.length?u.join(""):`<p class="muted small">没有找到「${i}」</p>`,s.textContent=`共命中 ${c.length} 条`};o.addEventListener("input",r),C({title:"全局搜索",body:e,actions:[{label:"关闭",value:"close"}],onMount:i=>{r();const c=i.querySelector('[data-role="kw"]');c?.focus(),c?.setSelectionRange(c.value.length,c.value.length),i.addEventListener("click",l=>{const u=l.target.closest(".hit");if(!u)return;const p=u.dataset.tab??"bank",d=Number(u.dataset.id),b=a.find(y=>y.id===d&&y.tab===p);if(Yt(),Xt(p),b){const y=N(b.q.q).slice(0,12);if(p==="bank"){const E=document.querySelector('.view input[data-role="search"]');E&&y&&(E.value=y,E.dispatchEvent(new Event("input",{bubbles:!0})))}}})}})}const Za=[{keys:"1 2 3 4 / A B C D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1 – 5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/ 或 Ctrl+K",desc:"全局搜索（题库 / 错题 / 收藏）",scope:"全局"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function ze(){const t=Za.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");C({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const Dr=["home","bank","wrong","fav","me"];function Or(t){const e=t;if(!e)return!1;const a=e.tagName.toLowerCase();return a==="input"||a==="textarea"||a==="select"||e.isContentEditable}function tn(){document.addEventListener("keydown",t=>{if((t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"){if(document.querySelector(".quiz"))return;t.preventDefault(),fa();return}if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||Or(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),ze();return}if(t.key==="/"){t.preventDefault(),fa();return}const a=Number(t.key);a>=1&&a<=5&&(t.preventDefault(),Xt(Dr[a-1]))})}const Rr=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:Za,installShortcuts:tn,openShortcuts:ze},Symbol.toStringTag,{value:"Module"})),Hr=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],Pr=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function ga(t,e,a){return`<div class="segmented">${t.map(n=>`<button class="seg" data-act="${a}" data-value="${n.value}" aria-pressed="${String(n.value)===String(e)}">${n.label}</button>`).join("")}</div>`}function ba(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),URL.revokeObjectURL(n)}async function zr(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await C({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const a=t.querySelector('[data-role="old"]').value,n=t.querySelector('[data-role="next"]').value;if(n.length<6){f.error("新密码至少 6 位");return}try{await L.auth.change(a,n),f.ok("密码已更新")}catch(s){f.error(s instanceof M?s.message:"修改失败")}}function Br(){const t=m.user,e=h((t||"?").slice(0,1).toUpperCase()),a=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})(),n=tr(),s=r=>r>0?`${Math.round(r*100)}%`:"—",o=Math.max(1,...n.days7.map(r=>r.n));return`
    <div class="profile">
      <div class="profile-avatar">${e}</div>
      <div class="profile-body">
        <div class="profile-name">${h(t)}</div>
        <div class="profile-desc">${m.bank?.length??0} 道题 · ${m.wrong?.length??0} 道错题 · ${m.favs?.length??0} 条收藏</div>
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
      ${ga(Hr,H.theme,"theme")}
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景色</div><div class="setting-desc">给首页换个心情</div></div>
        <input class="color-input" type="color" value="${h(a.color||"#f4f5f7")}" data-act="pick-color" aria-label="背景色">
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
      ${ga(Pr,H.autoDelay,"delay")}
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
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function Ur(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){f.error("图片太大了（最多 8MB）");return}try{const a=await Fr(e);Mt({image:a,color:""}),f.ok("背景已更新"),I("render")}catch{f.error("这张图片读不出来，换一张试试")}}},t.click()}function Fr(t){return new Promise((e,a)=>{const n=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(n);const o=Math.min(1,1600/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*o),r.height=Math.round(s.height*o);const i=r.getContext("2d");if(!i){a(new Error("canvas unavailable"));return}i.drawImage(s,0,0,r.width,r.height),e(r.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(n),a(new Error("image load failed"))},s.src=n})}function Wr(){qe()}async function Kr(t,e){switch(t){case"theme":return zn(e.dataset.value),I("render"),!0;case"delay":return Bt({autoDelay:Number(e.dataset.value)}),I("render"),!0;case"toggle-vibration":return Bt({vibration:!H.vibration}),I("render"),!0;case"toggle-streak":return Bt({streakAlert:!H.streakAlert}),I("render"),!0;case"pick-color":return Mt({color:e.value,image:""}),!0;case"pick-bg":return await Ur(),!0;case"clear-bg":return Mt({image:""}),I("render"),!0;case"dim":return Mt({dim:Number(e.value)}),!0;case"shortcuts":return ze(),!0;case"about":return C({title:"关于",body:`<p class="muted small" style="margin:0 0 10px">原点 · Origin —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。</p>
          <p class="muted small" style="margin:0 0 6px">题库 ${m.bank?.length??0} 题 · 错题 ${m.wrong?.length??0} 道 · 收藏 ${m.favs?.length??0} 条</p>
          <p class="muted small" style="margin:0">版本 v2.0.0 · 支持 PWA 离线打开</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]}),!0;case"clear-stats":return await dt({title:"清空练习记录",message:"本机的答题统计会被清除，题库不受影响。",okText:"清空",danger:!0})&&(er(),I("render"),f.ok("练习记录已清空")),!0;case"reset-bg":return Mt({color:"",image:"",dim:.35}),f.ok("背景已恢复"),I("render"),!0;case"export-bank":return m.bank?.length?(ba(`题库-${m.user}.json`,m.bank),f.ok("已导出"),!0):(f.info("题库是空的"),!0);case"export-wrong":return m.wrong?.length?(ba(`错题-${m.user}.json`,m.wrong),f.ok("已导出"),!0):(f.info("没有错题"),!0);case"change-password":return await zr(),!0;case"logout":return await dt({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(Ta(),f.info("已退出登录")),!0;default:return!1}}const q={subject:"all",edit:!1,selected:new Set};function Gr(){q.subject="all",q.edit=!1,q.selected.clear()}function en(){const t=m.wrong??[];return q.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===q.subject)}function Jr(){return["all",...Array.from(new Set((m.wrong??[]).map(t=>t.subject||"默认题库")))]}function Vr(){const t=en(),e=m.wrong?.length??0,a=Jr().map(s=>`<button class="chip" data-act="subject" data-subject="${h(s)}" aria-pressed="${q.subject===s}">
          ${s==="all"?"全部":h(s)}
        </button>`).join(""),n=m.loading.wrong&&!m.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${q.selected.has(s.id)}">
          ${q.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${R(s.q)}</div>
          <div class="item-meta">
            ${s.subject?`<span class="tag tag-accent">${h(s.subject)}</span>`:""}
            ${s.chapter?`<span class="tag">${h(s.chapter)}</span>`:""}
          </div>
          <div class="item-answer">
            ${s.user_choice_text?`<div class="mine">你的选择：${h(s.user_choice_text)}</div>`:""}
            ${s.answer?`<div class="right">正确答案：${h(s.answer)}</div>`:""}
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
    ${n}`}async function Qr(){await vt()}async function Xr(t,e){switch(t){case"subject":return q.subject=e.dataset.subject??"all",!0;case"toggle-edit":return q.edit=!q.edit,q.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return q.selected.has(a)?q.selected.delete(a):q.selected.add(a),!0}case"practice":return en().length?(await Ka(),!0):(f.info("没有可练的错题"),!0);case"remove":{const a=Number(e.dataset.id);try{await L.wrong.remove([a]),q.selected.delete(a),X("wrong"),await vt(!0),f.ok("已标记掌握，继续加油")}catch(n){f.error(n instanceof M?n.message:"操作失败")}return!0}case"remove-selected":{const a=[...q.selected];if(!a.length||!await dt({title:"删除错题",message:`确定删除选中的 ${a.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await L.wrong.remove(a),q.selected.clear(),X("wrong"),await vt(!0),f.ok("已删除")}catch(n){f.error(n instanceof M?n.message:"删除失败")}return!0}default:return!1}}const yt={home:{render:qr,mount:Cr,handle:Nr},bank:{render:Ps,mount:Us,handle:Fs,onInput:Ks,reset:Oa},wrong:{render:Vr,mount:Qr,handle:Xr,reset:Gr},fav:{render:wr,mount:xr,handle:kr,reset:$r},me:{render:Br,mount:Wr,handle:Kr}};let It=!1,ut=!1,pe=!1,me=!1;function an(){return document.getElementById("app-root")}function Yr(){ut=!1,an().innerHTML=`
    <div class="app-shell">
      <aside class="sidebar" aria-label="主导航">
        <div class="sidebar-brand">Origin Quiz</div>
        <nav class="sidebar-nav">
          ${Ut.map(t=>`<button class="side-btn" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
                 <span class="side-ico">${t.icon}</span><span class="side-label">${t.label}</span>
               </button>`).join("")}
        </nav>
        <div class="sidebar-foot">
          <span class="side-user">${m.user?`@${m.user}`:"未登录"}</span>
          <span class="side-ver">v2.0</span>
        </div>
      </aside>
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
      <nav class="tabbar" role="tablist" style="--tab-count:${Ut.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${Ut.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,It=!0}function Zr(){document.querySelectorAll(".tab-btn").forEach(e=>{const a=e.dataset.tab===m.tab;e.classList.toggle("is-active",a),e.setAttribute("aria-selected",String(a))}),document.querySelectorAll(".side-btn").forEach(e=>{const a=e.dataset.tab===m.tab;e.classList.toggle("is-active",a),e.setAttribute("aria-current",a?"page":"false")});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,Ut.findIndex(a=>a.id===m.tab));t.style.setProperty("--tab-index",String(e))}}function to(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,a=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),n=a?e.getAttribute("data-role"):null,s=a&&e instanceof HTMLInputElement?e.selectionStart:null,o=yt[m.tab]??yt.home;if(t.innerHTML=`<div class="view-inner">${o.render()}</div>`,Zr(),a&&n){const r=t.querySelector(`[data-role="${n}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}o.mount?.()}function et(){if(pe){me=!0;return}pe=!0;try{if(!m.authed&&!m.token){ut=!0,It=!1,an().innerHTML=Qn();return}It||Yr(),to()}finally{pe=!1,me&&(me=!1,queueMicrotask(et))}}let fe=!1;function ha(){fe||(fe=!0,requestAnimationFrame(()=>{fe=!1,et()}))}async function nn(t){await t(),ut&&et()}function sn(t){const e=t.dataset.act??"";if(Ya()&&t.closest(".exam")&&Xa(t.dataset.ex??"",t))return;if(gr()&&t.closest(".quiz")){Q(e,t).then(n=>{n||I("render")});return}if(e==="tab"){Xt(t.dataset.tab??"home");return}if(ut){nn(()=>qa(e,t));return}const a=yt[m.tab]??yt.home;a.handle&&Promise.resolve(a.handle(e,t)).then(n=>{n&&et()})}function eo(t){const e=t.target;if(!e)return;const a=e.closest("[data-ex]");if(a&&Ya()&&a.closest(".exam")){Xa(a.dataset.ex??"",a);return}const n=e.closest("[data-act]");n&&(n.closest(".modal-layer")||sn(n))}function va(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){sn(e);return}if(ut)return;const a=document.getElementById("view");if(!a||!a.contains(e))return;(yt[m.tab]??yt.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&et()}function ao(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),ut&&nn(()=>qa("submit",e)))}function no(){Te(),qe(),Rn(()=>{Ta(),It=!1,ut=!1,f.error("登录已过期，请重新登录"),I("auth")}),Pt("nav",()=>{Object.entries(yt).forEach(([t,e])=>{t!==m.tab&&e.reset?.()}),et()}),Pt("auth",()=>{It=!1,ut=!1,m.authed?(Oa(),et(),Promise.allSettled([lt(!0),vt(!0),_t(!0)])):et()}),Pt("render",ha),Pt("data",ha),document.addEventListener("click",eo),document.addEventListener("change",va),document.addEventListener("input",va),document.addEventListener("submit",ao),tn(),m.token&&(m.authed=!0),et(),m.token&&Promise.allSettled([lt(),vt(),_t()])}function ya(){try{no(),En()}catch(t){console.error("[origin-quiz] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ya,{once:!0}):ya();
