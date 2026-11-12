var Ca=Object.defineProperty;var _a=(t,e,a)=>e in t?Ca(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var Ae=(t,e,a)=>_a(t,typeof e!="symbol"?e+"":e,a);import{k as Na,u as Ia,s as Ee,a as jt,z as Da}from"./vendor-SAJHWpKn.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const Oa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function h(t){return String(t??"").replace(/[&<>"']/g,e=>Oa[e]??e)}const Bt=/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;function Ra(t,e){try{return Na.renderToString(t,{displayMode:e,throwOnError:!1,output:"mathml",strict:!1,trust:!1})}catch{return h(e?`$$${t}$$`:`$${t}$`)}}function je(t){let e="",a=0;Bt.lastIndex=0;for(let n=Bt.exec(t);n;n=Bt.exec(t)){e+=h(t.slice(a,n.index)).replace(/\n/g,"<br>");const s=!!(n[1]||n[2]),r=(n[1]??n[2]??n[3]??n[4]??"").trim();e+=r?Ra(r,s):h(n[0]),a=n.index+n[0].length}return e+=h(t.slice(a)).replace(/\n/g,"<br>"),e}const Pa=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function Ha(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function N(t){const e=Ha(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return je(e);const n=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!n)return h(e);const s=r=>{if(r.nodeType===Node.TEXT_NODE)return je(r.textContent??"");if(r.nodeType!==Node.ELEMENT_NODE)return"";const i=r,o=i.tagName,l=Array.from(i.childNodes).map(s).join("");if(!Pa.has(o))return l;if(o==="IMG"){const u=i.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(u))return"";const d=h(i.getAttribute("alt")??"");return`<img src="${h(u)}" alt="${d}" loading="lazy" referrerpolicy="no-referrer">`}const c=o.toLowerCase();return`<${c}>${l}</${c}>`};return Array.from(n.childNodes).map(s).join("")}function C(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function kt(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(a=>Number.isInteger(a)))).sort((a,n)=>a-n)}function I(t){return typeof t=="string"}function H(t,e=[]){return typeof t=="string"?t:kt(t).map(a=>{const n=String.fromCharCode(65+a),s=(e[a]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${n}. ${s}`:n}).join("、")}function Je(t){const e=[...t];for(let a=e.length-1;a>0;a-=1){const n=Math.floor(Math.random()*(a+1));[e[a],e[n]]=[e[n],e[a]]}return e}function Qe(t,e){const a=kt(e);if(!a.length||t.length!==a.length)return!1;const n=[...new Set(t)].sort((s,r)=>s-r);return n.length===a.length&&n.every((s,r)=>s===a[r])}function Ba(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const a=JSON.parse(e);if(typeof a=="number")return a;if(Array.isArray(a))return a.map(Number).filter(Number.isInteger);if(typeof a=="string")return a}catch{}return e}return""}let z=null;function Ua(){return z&&document.body.contains(z)||(z=document.createElement("div"),z.className="toast-host",z.setAttribute("role","status"),z.setAttribute("aria-live","polite"),document.body.appendChild(z)),z}function Ut(t,e="info",a=2600){if(!t)return;const n=document.createElement("div");n.className=`toast toast-${e}`,n.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${h(t)}</span>`,Ua().appendChild(n),requestAnimationFrame(()=>n.classList.add("in")),window.setTimeout(()=>{n.classList.remove("in"),window.setTimeout(()=>n.remove(),220)},a)}const f={info:t=>Ut(t,"info"),ok:t=>Ut(t,"success"),error:t=>Ut(t,"error",3200)},Zt="oq:queue",za=200;function re(){try{const t=localStorage.getItem(Zt),e=t?JSON.parse(t):[];return Array.isArray(e)?e.filter(a=>a&&a.path):[]}catch{return[]}}function Ve(t){try{t.length?localStorage.setItem(Zt,JSON.stringify(t.slice(-za))):localStorage.removeItem(Zt)}catch{}}function Fa(){return re().length}function Wa(t,e,a){const n=re();n.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,path:t,body:e,label:a,at:Date.now()}),Ve(n)}let zt=!1;async function Le(){if(zt)return 0;const t=re();if(!t.length)return 0;zt=!0;let e=0;const a=[];for(const n of t)try{const s=await fetch(n.path,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(n.body),...Te()?{headers:{"Content-Type":"application/json",Accept:"application/json",...Te()}}:{}});if(s.ok||s.status>=400&&s.status<500){s.ok&&(e+=1);continue}a.push(n)}catch{a.push(n);break}return zt=!1,Ve([...a,...t.slice(t.length)]),e&&f.ok(`已补传 ${e} 条离线操作`),e}function Te(){try{const e=(localStorage.getItem("oq:oq:token")||localStorage.getItem("oq:token")||"").replace(/^"|"$/g,"");return e?{Authorization:`Bearer ${e}`}:{}}catch{return{}}}function Ka(){window.addEventListener("online",()=>{Le()}),navigator.onLine&&Fa()&&setTimeout(()=>void Le(),1500)}const ie="oq:",oe="oq:user",ce="oq:token",Ga={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},D={...Ga,...J("settings",{})};["auto","light","dark","eye"].includes(D.theme)||(D.theme="auto");function J(t,e){try{const a=localStorage.getItem(ie+t);return a===null?e:JSON.parse(a)}catch{return e}}function Q(t,e){try{localStorage.setItem(ie+t,JSON.stringify(e))}catch{}}function te(t){try{localStorage.removeItem(ie+t)}catch{}}function qt(t){Object.assign(D,t),Q("settings",D)}function Ja(t){qt({theme:t})}function O(){return J(oe,"")||""}function Xe(t){Q(oe,t)}function Qa(){te(oe),te(ce)}function le(){return J(ce,"")||""}function Ye(t){Q(ce,t)}function V(t){return`u:${O()||"anon"}:${t}`}function de(){return J(V("notes"),{})}function Va(t,e){const a=de(),n=String(t);e.trim()?a[n]=e:delete a[n],Q(V("notes"),a)}function Ze(){const t=J(V("progress"),{});return Number(t.sequential_index)||0}function Xa(t){Q(V("progress"),{sequential_index:t,updatedAt:Date.now()})}function ta(){const t=J(V("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function Ya(t){Q(V("session"),t)}function ea(){te(V("session"))}function aa(){return J(V("recent"),[])}function Za(t){const e=[...t,...aa()].slice(0,30);Q(V("recent"),Array.from(new Set(e)))}function na(){return J("appearance",{color:"",image:"",dim:.35})}function tn(t){Q("appearance",{...na(),...t})}function en(){return J("welcomed","")===new Date().toDateString()}function an(){Q("welcomed",new Date().toDateString())}class E extends Error{constructor(a,n){super(n);Ae(this,"status");this.name="ApiError",this.status=a}}let ue=null;function nn(t){ue=t}async function sa(t,e={}){const a=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&a.set("Content-Type","application/json");const n=le();n&&a.set("Authorization",`Bearer ${n}`),a.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:a})}catch{throw new E(0,"网络连接失败，请检查网络后重试")}const r=s.headers.get("content-type")??"";let i=null;r.includes("application/json")?i=await s.json().catch(()=>null):i=await s.text().catch(()=>"");const o=i??{};if(s.status===401)throw ue?.(),new E(401,typeof o.error=="string"?o.error:"登录已过期，请重新登录");if(!s.ok||o.ok===!1){const l=typeof o.error=="string"&&o.error?o.error:`请求失败（HTTP ${s.status}）`;throw new E(s.status,l)}return i}const Ft=t=>sa(t),B=(t,e)=>sa(t,{method:"POST",body:JSON.stringify(e)});async function sn(t,e,a){const n=new Headers({"Content-Type":"application/json"}),s=le();s&&n.set("Authorization",`Bearer ${s}`);const r=await fetch("/api/ai",{method:"POST",headers:n,body:JSON.stringify({...t,stream:!0}),signal:a});if(!r.ok||!r.body){const p=await r.json().catch(()=>({}));if(r.status===401)throw ue?.(),new E(401,"登录已过期，请重新登录");if(typeof p.result=="string")return e(p.result),{text:p.result,cached:!1,provider:typeof p.provider=="string"?p.provider:void 0};throw new E(r.status,typeof p.error=="string"?p.error:"AI 解析失败")}const i=r.body.getReader(),o=new TextDecoder;let l="",c="",u=!1,d;for(;;){const{value:p,done:v}=await i.read();if(v)break;l+=o.decode(p,{stream:!0});const g=l.split(`

`);l=g.pop()??"";for(const k of g){const y=k.split(`
`).find(j=>j.startsWith("data:"));if(!y)continue;let w;try{w=JSON.parse(y.slice(5).trim())}catch{continue}if(typeof w.delta=="string"&&w.delta&&(c+=w.delta,e(w.delta)),typeof w.error=="string")throw new E(502,w.error);w.done&&(u=w.cached===!0,typeof w.provider=="string"&&(d=w.provider))}}return{text:c,cached:u,provider:d}}function ee(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:Ba(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function rn(t){return{...ee(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}async function at(t,e,a){try{return await B(t,e)}catch(n){if(n instanceof E&&n.status===0)return Wa(t,e,a),{ok:!0,queued:!0,offline:!0};throw n}}const A={auth:{check:t=>B("/api/auth",{action:"check",username:t}),set:(t,e)=>B("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>B("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>B("/api/auth",{action:"change",username:O(),oldPassword:t,newPassword:e})},questions:{async list(){const t=O();if(!t)return[];const e=await Ft(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>ee(n))},add:t=>at("/api/questions-add",{user_id:O(),questions:t},`导入 ${t.length} 道题`),update:(t,e,a)=>at("/api/questions-update",{id:t,user_id:O(),...e,...a?.baseUpdatedAt?{base_updated_at:a.baseUpdatedAt}:{},...a?.force?{force:!0}:{}},"保存题目"),remove:t=>at("/api/questions-delete",{ids:t,user_id:O()},`删除 ${t.length} 道题`)},wrong:{async list(){const t=O();if(!t)return[];const e=await Ft(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>rn(n))},add:t=>at("/api/wrong-add",{user_id:O(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""},"记录错题"),remove:t=>at("/api/wrong-delete",{ids:t,user_id:O()},"移除错题")},favorites:{async list(){const t=O();if(!t)return[];const e=await Ft(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(n=>ee(n))},add:t=>at("/api/favorites-add",{user_id:O(),question_id:t},"收藏题目"),remove:t=>at("/api/favorites-remove",{user_id:O(),question_id:t},"取消收藏")},ai:{explain:t=>B("/api/ai",{action:"explain",prompt:t}),grade:t=>B("/api/ai",{action:"grade",prompt:t}),extract:t=>B("/api/ai",{action:"extract",...t}),classify:t=>B("/api/ai",{action:"classify",prompt:t}),generate:t=>B("/api/ai",{action:"generate",prompt:t}),explainStream:(t,e,a)=>sn({action:"explain",prompt:t},e,a)}},ft='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"',ae=[{id:"home",label:"首页",icon:`<svg viewBox="0 0 24 24" ${ft} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`},{id:"bank",label:"题库",icon:`<svg viewBox="0 0 24 24" ${ft} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`},{id:"wrong",label:"错题",icon:`<svg viewBox="0 0 24 24" ${ft} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`},{id:"fav",label:"收藏",icon:`<svg viewBox="0 0 24 24" ${ft} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`},{id:"me",label:"我的",icon:`<svg viewBox="0 0 24 24" ${ft} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`}],qe=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],m={tab:"home",user:O(),token:le(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},bt=new Map;function Lt(t,e){return bt.has(t)||bt.set(t,new Set),bt.get(t).add(e),()=>bt.get(t)?.delete(e)}function M(t){bt.get(t)?.forEach(e=>e())}function Rt(t){m.tab!==t&&(m.tab=t,M("nav"))}const ra=window.matchMedia("(prefers-color-scheme: dark)");function Me(){return D.theme==="auto"?ra.matches?"dark":"light":D.theme}function pe(){document.documentElement.dataset.theme=Me();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=Me()==="dark"?"#0b0c0f":"#f4f5f7")}function on(t){Ja(t),pe()}ra.addEventListener("change",()=>{D.theme==="auto"&&pe()});function cn(t){tn(t)}function me(){const{color:t,image:e,dim:a}=na(),n=document.body;n.style.backgroundImage=e?`url("${e}")`:"",n.style.backgroundSize="cover",n.style.backgroundPosition="center",n.style.backgroundAttachment="fixed",n.dataset.dim=String(a),t&&!e?n.style.backgroundColor=t:n.style.backgroundColor=""}async function ln(t,e){const a=await A.auth.login(t,e);Ye(a.token),Xe(t),m.user=t,m.token=a.token,m.authed=!0,G(),M("auth")}async function dn(t,e){const a=await A.auth.set(t,e);Ye(a.token),Xe(t),m.user=t,m.token=a.token,m.authed=!0,G(),M("auth")}function ia(){m.user="",m.token="",m.authed=!1,m.bank=null,m.wrong=null,m.favs=null,m.favoriteIds=new Set,Qa(),ea(),M("auth")}const un=300*1e3,nt={bank:0,wrong:0,fav:0},Mt=new Map;function G(t){t?(nt[t]=0,t==="bank"&&(m.bank=null),t==="wrong"&&(m.wrong=null),t==="fav"&&(m.favs=null)):(nt.bank=nt.wrong=nt.fav=0,m.bank=null,m.wrong=null,m.favs=null)}function pn(t,e){const a=Mt.get(t);if(a)return a;const n=e().finally(()=>Mt.delete(t));return Mt.set(t,n),n}async function fe(t,e,a,n){if(!m.user)return[];const s=Mt.get(t);if(s)return s;const r=Date.now()-nt[t]<un;if(!e&&r)return[];m.loading[t]=!0,M("data");try{const i=await pn(t,a);return n(i),nt[t]=Date.now(),i}catch(i){throw i instanceof E&&i.status!==401&&f.error(i.message),i}finally{m.loading[t]=!1,M("data")}}async function Z(t=!1){try{await fe("bank",t,()=>A.questions.list(),e=>{m.bank=e})}catch{}return m.bank??[]}async function rt(t=!1){try{await fe("wrong",t,()=>A.wrong.list(),e=>{m.wrong=e})}catch{}return m.wrong??[]}async function $t(t=!1){try{await fe("fav",t,()=>A.favorites.list(),e=>{m.favs=e,m.favoriteIds=new Set(e.map(a=>a.id))})}catch{}return m.favs??[]}function Nt(t){return m.favoriteIds.has(t)}async function mn(t){const e=!Nt(t);try{return e?await A.favorites.add(t):await A.favorites.remove(t),e?m.favoriteIds.add(t):m.favoriteIds.delete(t),m.favs=null,nt.fav=0,f.ok(e?"已加入收藏":"已取消收藏"),M("data"),e}catch(a){return f.error(a instanceof E?a.message:"操作失败"),Nt(t)}}function fn(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${qe[Math.floor(Math.random()*qe.length)]}`}function ht(t){cn(t),me()}const $={step:"name",username:"",busy:!1,error:""};function gn(){$.step="name",$.username="",$.busy=!1,$.error=""}function bn(){const t=`
    <div class="auth-brand">
      <div class="brand-mark">原</div>
      <div>
        <div class="auth-title">原点 · Origin</div>
        <div class="brand-sub">刷题 · 错题 · 收藏</div>
      </div>
    </div>`,e=$.error?`<div class="auth-error" role="alert">${h($.error)}</div>`:"";if($.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${h($.username)}" required>
            </label>
            ${e}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${$.busy?"disabled":""}>
              ${$.busy?"检查中…":"继续"}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;const a=$.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${a?"为":"欢迎回来，"} <strong>${h($.username)}</strong>${a?" 设置一个密码":""}</p>
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
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${$.busy?"disabled":""}>
            ${$.busy?"请稍候…":a?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${$.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function oa(t,e){if(t==="back")return $.step="name",$.error="",!0;if(t==="submit"){const a=e,n=new FormData(a);if($.step==="name"){const r=String(n.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(r))return $.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;$.busy=!0,$.error="";try{const{hasPassword:i}=await A.auth.check(r);$.username=r,$.step=i?"password":"create"}catch(i){$.error=i instanceof E?i.message:"网络异常，请重试"}finally{$.busy=!1}return!0}if($.busy)return!0;const s=String(n.get("password")??"");if($.step==="create"){const r=String(n.get("confirm")??"");if(s!==r)return $.error="两次输入的密码不一致",!0}if(s.length<6)return $.error="密码至少 6 位",!0;$.busy=!0,$.error="";try{$.step==="create"?await dn($.username,s):await ln($.username,s),f.ok($.step==="create"?"账号已创建，开始刷题吧":`欢迎回来，${m.user}`),gn()}catch(r){$.error=r instanceof E?r.message:"登录失败，请重试"}finally{$.busy=!1}return!0}return!1}function hn(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ca(t,e){const a=e.trim();if(!a)return t;const n=new RegExp(hn(a),"gi");return t.replace(/<[^>]+>|[^<]+/g,s=>s.startsWith("<")?s:s.replace(n,r=>`<mark class="hl">${r}</mark>`))}const St={single:"单选",multi:"多选",judge:"判断",blank:"填空",essay:"简答"};function it(t){const e=t.opts??[],a=String(t.q??"");if(!e.length)return/_{2,}|（\s*）|\(\s*\)|【\s*】/.test(a)?"blank":"essay";if(e.length===2){const n=e.map(s=>s.replace(/^[A-Za-z][.、)）]\s*/,"").trim()).join("|");if(/^(正确|对|是|√|True)|\|(错误|错|否|×|False)$/i.test(n)||/正确\|错误|对\|错/.test(n))return"judge"}return Array.isArray(t.a)?"multi":"single"}let R=null,vt=0;function la(){return R&&document.body.contains(R)||(R=document.createElement("div"),R.className="modal-root",R.setAttribute("role","dialog"),R.setAttribute("aria-modal","true"),document.body.appendChild(R)),R}function vn(){vt+=1,document.body.classList.add("is-locked")}function yn(){vt=Math.max(0,vt-1),vt===0&&document.body.classList.remove("is-locked")}function ge(){la().innerHTML="",vt=0,document.body.classList.remove("is-locked")}function q(t){const e=la(),a=t.dismissible!==!1;return new Promise(n=>{let s=!1;const r=p=>{s||(s=!0,d(),i.classList.remove("open"),window.setTimeout(()=>{i.remove(),yn()},200),n(p))},i=document.createElement("div");i.className="modal-layer",i.style.position="absolute",i.style.inset="0",i.style.display="grid",i.style.placeItems="center",i.style.padding="var(--space-4)",i.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${a?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${h(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${h(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((p,v)=>`<button class="btn btn-${p.variant??"ghost"}" data-idx="${v}">${h(p.label)}</button>`).join("")}</div>`:""}
      </div>`;const o=i.querySelector(".modal-card"),l=o.querySelector(".modal-body");typeof t.body=="string"?l.innerHTML=t.body:t.body&&l.appendChild(t.body);const c=p=>{p.key==="Escape"&&a&&(p.stopPropagation(),r(null))},u=p=>{const v=p.target;if(v.closest("[data-close]")&&a){r(null);return}const g=v.closest("[data-idx]");if(!g)return;const k=t.actions?.[Number(g.dataset.idx)];k&&(k.keepOpen||r(k.value))},d=()=>{document.removeEventListener("keydown",c,!0),i.removeEventListener("click",u),R&&R.children.length===0&&R.classList.remove("open")};i.addEventListener("click",u),document.addEventListener("keydown",c,!0),e.appendChild(i),e.classList.add("open"),vn(),t.onMount?.(o),requestAnimationFrame(()=>{i.classList.add("open");const p=o.querySelector("input, textarea, button.btn-primary, button");p&&window.matchMedia("(pointer: fine)").matches&&p.focus({preventScroll:!0})})})}function ct(t){return q({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}function wn(t,e=1400,a=.82){return new Promise((n,s)=>{const r=URL.createObjectURL(t),i=new Image;i.onload=()=>{URL.revokeObjectURL(r);const o=Math.min(1,e/Math.max(i.width,i.height)),l=document.createElement("canvas");l.width=Math.max(1,Math.round(i.width*o)),l.height=Math.max(1,Math.round(i.height*o));const c=l.getContext("2d");if(!c){s(new Error("canvas 不可用"));return}c.fillStyle="#fff",c.fillRect(0,0,l.width,l.height),c.drawImage(i,0,0,l.width,l.height),n(l.toDataURL("image/jpeg",a))},i.onerror=()=>{URL.revokeObjectURL(r),s(new Error("图片解码失败"))},i.src=r})}const $n=new Set(["B","STRONG","I","EM","U","SUB","SUP","BR","P","DIV","SPAN","IMG","CODE"]);function Tt(t){const a=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html").body.firstElementChild;if(!a)return"";const n=s=>{if(s.nodeType===Node.TEXT_NODE)return(s.textContent??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");if(s.nodeType!==Node.ELEMENT_NODE)return"";const r=s,i=r.tagName,o=Array.from(r.childNodes).map(n).join("");if(!$n.has(i))return o;if(i==="IMG"){const c=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(c))return"";const u=(r.getAttribute("alt")??"").replace(/"/g,"&quot;");return`<img src="${c.replace(/"/g,"&quot;")}" alt="${u}">`}if(i==="BR")return"<br>";const l=i.toLowerCase();return l==="div"||l==="p"?o.trim()?`${o}<br>`:"<br>":`<${l}>${o}</${l}>`};return Array.from(a.childNodes).map(n).join("").replace(/(<br>)+$/g,"").trim()}const xn=[{cmd:"bold",label:"B",title:"加粗（Ctrl/⌘+B）"},{cmd:"italic",label:"I",title:"斜体（Ctrl/⌘+I）"},{cmd:"underline",label:"U",title:"下划线（Ctrl/⌘+U）"},{cmd:"superscript",label:"x²",title:"上标"},{cmd:"subscript",label:"x₂",title:"下标"},{cmd:"insertUnorderedList",label:"≡",title:"列表"}];function kn(t={}){const e=document.createElement("div");e.className="rt";const a=document.createElement("div");a.className="rt-bar";const n=document.createElement("div");n.className="rt-area",n.contentEditable="true",n.spellcheck=!1,n.dataset.role="rich",n.style.minHeight=`${t.minHeight??96}px`,t.placeholder&&(n.dataset.placeholder=t.placeholder),n.innerHTML=Tt(t.value??"");const s=(i,o)=>{n.focus(),document.execCommand(i,!1,o),r()};if(t.toolbar!==!1){for(const u of xn){const d=document.createElement("button");d.type="button",d.className="rt-btn",d.title=u.title,d.textContent=u.label,d.addEventListener("mousedown",p=>p.preventDefault()),d.addEventListener("click",()=>s(u.cmd,u.arg)),a.appendChild(d)}const i=document.createElement("span");i.className="rt-sep",a.appendChild(i);const o=document.createElement("button");o.type="button",o.className="rt-btn",o.textContent="∑",o.title="公式：选中内容包成 $…$",o.addEventListener("mousedown",u=>u.preventDefault()),o.addEventListener("click",()=>{const u=window.getSelection()?.toString()??"";if(u){s("insertText",`$${u}$`);return}s("insertText","$$");const d=window.getSelection();if(d&&d.rangeCount){const p=d.getRangeAt(0);typeof d.modify=="function"?d.modify("move","backward","character"):p.startContainer.nodeType===Node.TEXT_NODE&&(p.setStart(p.startContainer,Math.max(0,p.startOffset-1)),p.collapse(!0),d.removeAllRanges(),d.addRange(p))}}),a.appendChild(o);const l=document.createElement("button");l.type="button",l.className="rt-btn",l.textContent="▣",l.title="插入图片（自动压缩）",l.addEventListener("mousedown",u=>u.preventDefault()),l.addEventListener("click",()=>{const u=document.createElement("input");u.type="file",u.accept="image/*",u.onchange=async()=>{const d=u.files?.[0];if(d)try{l.textContent="…";const p=await wn(d);n.focus(),document.execCommand("insertHTML",!1,`<img src="${p}" alt="题图"><br>`),r(),f.ok(`图片已插入（${Math.round(p.length*.75/1024)} KB）`)}catch{f.error("图片读取失败，换一张试试")}finally{l.textContent="▣"}},u.click()}),a.appendChild(l);const c=document.createElement("button");c.type="button",c.className="rt-btn rt-clear",c.textContent="⌫",c.title="清除格式",c.addEventListener("mousedown",u=>u.preventDefault()),c.addEventListener("click",()=>s("removeFormat")),a.appendChild(c)}function r(){const i=(n.textContent??"").trim().length>0,o=!!n.querySelector("img");n.classList.toggle("is-empty",!i&&!o)}return n.addEventListener("input",r),n.addEventListener("blur",r),n.addEventListener("paste",i=>{const o=i.clipboardData?.getData("text/html");o&&(i.preventDefault(),document.execCommand("insertHTML",!1,Tt(o)))}),r(),e.append(a,n),{el:e,getValue:()=>Tt(n.innerHTML),setValue:i=>{n.innerHTML=Tt(i),r()},focus:()=>n.focus()}}function Ce(t){const e=t.name.toLowerCase(),a=t.type.toLowerCase();return a.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|heic)$/.test(e)?"image":e.endsWith(".docx")?"docx":e.endsWith(".json")?"json":/\.(txt|md|csv|text)$/.test(e)||a.startsWith("text/")?"text":"unknown"}function dt(t){return String(t??"").replace(/\r\n?/g,`
`).trim()}function da(t,e){if(Array.isArray(t)){const i=t.map(o=>typeof o=="number"?o:Sn(String(o),e.length)).filter(o=>o!==null);return i.length?i.length===1?i[0]:[...new Set(i)].sort((o,l)=>o-l):t.map(String).join("、")}if(typeof t=="number"&&Number.isFinite(t))return t;const a=dt(t);if(!a)return"";const s=(/^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(a)?a:"")||(/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(a)?a:"");if(s){const i=[...new Set(s.toUpperCase().split("").map(o=>o.charCodeAt(0)-65))].filter(o=>o>=0&&o<e.length);if(i.length)return i.length===1?i[0]:i.sort((o,l)=>o-l)}const r=/^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(a);if(r&&e.length){const i=r[1].charCodeAt(0)-65;if(i>=0&&i<e.length){const o=r[2].trim();return e.findIndex(c=>c.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()===o)>=0||o,i}}return a}function Sn(t,e){const a=t.trim().toUpperCase();if(!/^[A-H]$/.test(a))return null;const n=a.charCodeAt(0)-65;return n<e?n:null}function An(t){const e=dt(t.q??t.question??t.title??t.题目??t.题干);if(!e)return null;const a=t.opts??t.options??t.choices??t.选项;let n=[];Array.isArray(a)?n=a.map(i=>dt(i)).filter(Boolean):typeof a=="string"&&(n=qn(a));const s=t.a??t.answer??t.correct??t.答案??t.正确答案,r=n.length?da(s,n):dt(s);return{q:e,opts:n,a:r,chapter:dt(t.chapter??t.章节??t.知识点),subject:dt(t.subject??t.科目??t.题库)||"默认题库"}}function be(t){const e=t.replace(/^\uFEFF/,"").trim(),a=/```(?:json)?([\s\S]*?)```/i.exec(e)?.[1]??e,n=a.indexOf("["),s=a.indexOf("{"),r=n>=0&&(s<0||n<s)?n:s;if(r<0)return[];const i=Math.max(a.lastIndexOf("]"),a.lastIndexOf("}"));if(i<=r)return[];let o;try{o=JSON.parse(a.slice(r,i+1))}catch{return[]}return(Array.isArray(o)?o:Array.isArray(o?.questions)?o.questions:Array.isArray(o?.data)?o.data:[]).filter(c=>!!c&&typeof c=="object").map(An).filter(c=>!!c)}const En=/^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/,jn=/^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/,Ln=/^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/,Tn=/^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;function qn(t){return t.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/).map(a=>a.trim()).filter(Boolean)}function Mn(t){const e=[...t.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];return e.length<2?[]:e.map((a,n)=>{const s=(a.index??0)+a[0].length,r=n+1<e.length?e[n+1].index??t.length:t.length;return t.slice(s,r).trim()})}function Cn(t){const a=t.replace(/^\uFEFF/,"").replace(/\r\n?/g,`
`).replace(/!\[[^\]]*\]\((data:image\/[^)]+)\)/g,(u,d)=>`<img src="${d}" alt="题图">`).split(`
`),n=[];let s="",r=[],i="",o="",l="";const c=()=>{const u=s.trim();if(!u){s="",r=[],i="";return}if(!r.length&&!i.trim()&&u.length<=24){s="",r=[],i="";return}const d=r.map(v=>v.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()),p=d.length?da(i,d):i.trim();n.push({q:u,opts:d,a:p,chapter:o,subject:l||"默认题库"}),s="",r=[],i="",o="",l=""};for(const u of a){if(!u.trim())continue;if(/^\s*<img\b/i.test(u)){s=`${s}${s?`
`:""}${u.trim()}`;continue}const d=Tn.exec(u),p=En.exec(u),v=jn.exec(u),g=Ln.exec(u);if(d&&!p){c();const k=Mn(d[2]);k.length>=2?(s=d[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim(),r=k):s=d[2].trim();continue}if(p&&s){r.push(p[2].trim());continue}if(v&&(s||r.length)){i=v[1].trim();continue}if(g){const k=g[0].trim(),y=g[1].trim();/章节|知识点/.test(k)?o=y:/科目|题库|分类/.test(k)&&(l=y);continue}s?r.length?r[r.length-1]=`${r[r.length-1]} ${u.trim()}`.trim():s=`${s} ${u.trim()}`.trim():s=u.replace(/^\s*(?:题目|题干)\s*[:：]\s*/,"").trim()}return c(),n.filter(u=>u.q.length>1)}function Ct(t){const e=t.trim();if(!e)return[];if(/^[[{]/.test(e)||/```(?:json)?/i.test(e)||/"(q|question|题目)"\s*:/.test(e)){const a=be(e);if(a.length)return a}return Cn(e)}function _e(t){const e=Ia(new Uint8Array(t)),a=e["word/document.xml"];if(!a)throw new Error("这个 docx 里没有正文，另存为 .docx 再试一次");const n=e["word/_rels/document.xml.rels"],s=new Map;if(n){const o=Ee(n);for(const l of o.matchAll(/<Relationship\b[^>]*>/g)){const c=l[0],u=/\bId="([^"]+)"/.exec(c)?.[1],d=/\bTarget="([^"]+)"/.exec(c)?.[1],p=/\bType="([^"]+)"/.exec(c)?.[1]??"";if(!u||!d||!/image/i.test(p))continue;const v=d.startsWith("/")?d.slice(1):`word/${d.replace(/^\.\//,"")}`,g=e[v];g&&s.set(u,`data:${_n(v)};base64,${Nn(g)}`)}}return Ee(a).replace(/<a:blip\b[^>]*r:embed="([^"]+)"[^>]*\/?>/g,(o,l)=>{const c=s.get(l);return c?`[[IMG:${c}]]`:""}).replace(/<w:tab\b[^>]*\/>/g,"	").replace(/<w:br\b[^>]*\/>/g,`
`).replace(/<\/w:p>/g,`
`).replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\[\[IMG:([^\]]+)\]\]/g,(o,l)=>`
![docx 图片](${l})
`).replace(/\n{3,}/g,`

`).trim()}function _n(t){const e=t.split(".").pop()?.toLowerCase()??"";return e==="jpg"||e==="jpeg"?"image/jpeg":e==="gif"?"image/gif":e==="bmp"?"image/bmp":e==="webp"?"image/webp":e==="svg"?"image/svg+xml":"image/png"}function Nn(t){let e="";for(let n=0;n<t.length;n+=32768)e+=String.fromCharCode(...t.subarray(n,n+32768));return btoa(e)}function Ne(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(String(n.result??"")),n.onerror=()=>a(new Error("文件读取失败")),n.readAsText(t,"utf-8")})}function Ie(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(n.result),n.onerror=()=>a(new Error("文件读取失败")),n.readAsArrayBuffer(t)})}function De(t){return new Promise((e,a)=>{const n=new FileReader;n.onload=()=>e(String(n.result??"")),n.onerror=()=>a(new Error("图片读取失败")),n.readAsDataURL(t)})}function In(t,e){if(!t.length)return'<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>';const a=t.slice(0,4),n=a.map((i,o)=>{const l=(i.opts??[]).length,c=Oe(i),u=(i.q.match(/<img\b/gi)??[]).length,d=i.q.replace(/<img\b[^>]*>/gi," ").replace(/\s+/g," ").trim();return`<li><b>${o+1}.</b> ${h(d).slice(0,90)}${u?`<span class="muted"> · 含 ${u} 张图</span>`:""}${l?`<span class="muted"> · ${l} 个选项</span>`:'<span class="muted"> · 简答</span>'}${c?`<span class="tag-warn">${c}</span>`:""}</li>`}).join(""),s=t.length>a.length?`<li class="muted">…还有 ${t.length-a.length} 道</li>`:"",r=t.map(Oe).filter(Boolean).length;return`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${t.length} 道题</span>
      ${r?`<span class="tag tag-warn">${r} 道待确认</span>`:""}
      ${e?`<span class="muted small">${h(e)}</span>`:""}
    </div>
    <ul class="import-list">${n}${s}</ul>`}function Oe(t){const e=(t.opts??[]).length,a=t.a;return(Array.isArray(a)?a.length>0:a!==""&&a!==null&&a!==void 0)?e===1?"只有 1 个选项":e>=2&&typeof a=="number"&&(a<0||a>=e)?"答案越界":"":"没识别到答案"}function Wt(t,e){return t==="json"?be(e):Ct(e)}async function Dn(){const t=document.createElement("div");t.className="import",t.innerHTML=`
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
    <div class="import-preview" data-role="preview"></div>`;const e=t.querySelector('[data-role="drop"]'),a=t.querySelector('[data-role="file"]'),n=t.querySelector('[data-role="text"]'),s=t.querySelector('[data-role="preview"]');let r=[],i="",o="",l=!1;const c=()=>{s.innerHTML=In(r,o||(i?"图片将由 AI 识别":""));const y=document.querySelector('[data-idx="1"]');y&&(y.textContent=r.length?`导入 ${r.length} 道题`:"AI 解析并导入")},u=(y,w,j)=>{n.value=y,r=Wt(w,y),o=j,c()},d=async()=>{const y=n.value.trim();if(!y&&!i)return[];f.info(i?"AI 正在识别图片…":"AI 正在解析文字…");const w=await A.ai.extract({...y?{prompt:y}:{},...i?{imageBase64:i}:{}});return Ct(w.result??"")},p=async y=>{const w=Ce(y);try{if(w==="image"){i=await De(y),r=[],o=`${y.name}（${Math.round(y.size/1024)}KB，AI 识别）`,c();try{r=await d(),r.length||f.error("这张图没读出题目，换张更清晰的试试")}catch(x){f.error(x instanceof E?x.message:"AI 识别失败")}c();return}if(w==="docx"){const x=await Ie(y);u(_e(x),"docx",y.name);return}if(w==="unknown"){f.error("暂不支持这种文件，换成 txt / json / docx / 图片试试");return}const j=await Ne(y);u(j,w,y.name)}catch(j){f.error(j instanceof Error?j.message:"文件解析失败")}},v=async y=>{if(!y.length)return;if(y.length===1){await p(y[0]);return}const w=[],j=[];for(const x of y)try{const L=Ce(x);if(L==="image"){const et=await De(x),lt=await A.ai.extract({imageBase64:et});w.push(...Ct(lt.result??"")),j.push(x.name);continue}if(L==="docx"){w.push(...Wt("docx",_e(await Ie(x)))),j.push(x.name);continue}w.push(...Wt(L,await Ne(x))),j.push(x.name)}catch(L){f.error(`${x.name} 没读出来：${L instanceof Error?L.message:"格式不对"}`)}r=w,i="",o=`${y.length} 个文件（${j.join("、")}）`,n.value="",c()};a.addEventListener("change",()=>{v([...a.files??[]])});for(const y of["dragenter","dragover"])e.addEventListener(y,w=>{w.preventDefault(),e.classList.add("is-over")});for(const y of["dragleave","drop"])e.addEventListener(y,w=>{w.preventDefault(),e.classList.remove("is-over")});e.addEventListener("drop",y=>{const w=[...y.dataTransfer?.files??[]];v(w)}),n.addEventListener("paste",y=>{const j=[...y.clipboardData?.items??[]].find(L=>L.kind==="file"&&L.type.startsWith("image/"));if(!j)return;const x=j.getAsFile();x&&(y.preventDefault(),p(x))});let g=0;if(n.addEventListener("input",()=>{window.clearTimeout(g),g=window.setTimeout(()=>{r=Ct(n.value),i="",o="",c()},280)}),!(!await q({title:"导入题库",body:t,actions:[{label:"取消",value:!1},{label:"导入",value:!0,variant:"primary"}],onMount:()=>c()})||l))try{const y=r.length?r:await d();if(!y.length){f.error("没解析出题目，检查一下格式，或换张更清晰的图");return}l=!0;const w=await A.questions.add(y);G("bank"),await Z(!0),f.ok(`已导入 ${w.added??y.length} 道题`)}catch(y){f.error(y instanceof E?y.message:"导入失败")}}const On=["基础","进阶","冲刺"],Rn=[5,10,20];async function Pn(){const e=[...new Set((m.bank??[]).map(g=>g.subject).filter(Boolean))][0]??"默认题库",a=document.createElement("div");if(a.innerHTML=`
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${h(e)}" placeholder="如 一建建筑">
      </label>
      <label class="field grow">
        <span class="field-label">章节</span>
        <input class="input" data-role="chapter" value="" placeholder="可留空">
      </label>
    </div>
    <div class="row" style="gap:10px;margin-top:10px">
      <label class="field grow">
        <span class="field-label">题量</span>
        <select class="input" data-role="count">
          ${Rn.map(g=>`<option value="${g}">${g} 道</option>`).join("")}
        </select>
      </label>
      <label class="field grow">
        <span class="field-label">难度</span>
        <select class="input" data-role="level">
          ${On.map(g=>`<option value="${g}">${g}</option>`).join("")}
        </select>
      </label>
    </div>
    <label class="field" style="margin-top:10px">
      <span class="field-label">考点提示 <span class="muted small">（可选，越具体越好）</span></span>
      <textarea class="textarea" data-role="hint" rows="2" placeholder="如：混凝土养护时间、水化热控制"></textarea>
    </label>
    <p class="muted small" style="margin:10px 0 0">生成后会先预览，确认了才写进题库。每天最多生成 10 次。</p>`,!await q({title:"AI 出题",body:a,actions:[{label:"取消",value:!1},{label:"开始生成",value:!0,variant:"primary"}]}))return;const s=g=>a.querySelector(`[data-role="${g}"]`)?.value.trim()??"",r=s("subject")||"默认题库",i=s("chapter"),o=Number(s("count"))||5,l=s("level")||"基础",c=s("hint"),u=[`题库：${r}`,i?`章节：${i}`:"",`数量：${o} 道`,`难度：${l}`,c?`考点提示：${c}`:"","要求：贴近真实考试题型，四个选项，答案唯一，附一句解析。"].filter(Boolean).join(`
`);f.info("正在生成，大约 10–20 秒…");let d=[];try{const g=await A.ai.generate(u);d=be(g.result??"")}catch(g){f.error(g instanceof E?g.message:"生成失败，稍后再试");return}if(!d.length){f.error("AI 返回的内容没法解析成题目，换个提示再试");return}const p=document.createElement("div");if(p.innerHTML=`
    <div class="muted small" style="margin-bottom:8px">共 ${d.length} 道，确认后写入「${h(r)}」</div>
    <div class="import-list">
      ${d.slice(0,20).map((g,k)=>`<div class="import-item"><b>${k+1}.</b> ${h(String(g.q??"").slice(0,70))}${Array.isArray(g.opts)&&g.opts.length?` <span class="muted">· ${g.opts.length} 选项</span>`:""}</div>`).join("")}
    </div>`,!!await q({title:"预览生成的题目",body:p,actions:[{label:"不要了",value:!1},{label:`导入 ${d.length} 道`,value:!0,variant:"primary"}]}))try{const g=d.map(k=>({...k,subject:r,chapter:k.chapter||i}));await A.questions.add(g),G("bank"),await Z(!0),f.ok(`已生成并导入 ${g.length} 道题`)}catch(g){f.error(g instanceof E?g.message:"导入失败")}}const Hn=`
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
`;function gt(t){return String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]??e)}function Re(t,e={}){if(!t.length){f.info("没有可导出的题目");return}const a=e.title||"练习试卷",n=new Date().toLocaleDateString("zh-CN"),s=e.answers!==!1,r=t.map((c,u)=>{const d=it(c),p=(c.opts??[]).map((v,g)=>{const k=v.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return`<li><span class="k">${String.fromCharCode(65+g)}</span>${N(k)}</li>`}).join("");return`<article class="q">
        <div class="q-no">${String(u+1).padStart(2,"0")} · ${St[d]}${c.chapter?` · ${gt(c.chapter)}`:""}</div>
        <div class="q-body">${N(c.q)}</div>
        ${p?`<ul class="q-opts">${p}</ul>`:'<p class="q-tag">（简答题，请在答题纸上作答）</p>'}
      </article>`}).join(""),i=s?`<section class="answer-key">
        <h2>参考答案</h2>
        <ol>${t.map((c,u)=>`<li><span class="k">${String(u+1).padStart(2,"0")}</span>${gt(H(c.a,c.opts??[]))}</li>`).join("")}</ol>
      </section>`:"",o=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${gt(a)} · ${n}</title>
<style>${Hn}</style></head>
<body>
  <header class="sheet-head">
    <div class="sheet-kicker">Origin Quiz / Practice Sheet</div>
    <h1 class="sheet-title">${gt(a)}</h1>
    <div class="sheet-meta">${n} · 共 ${t.length} 题${e.subtitle?" · "+gt(e.subtitle):""} · 姓名 __________ 得分 ______</div>
  </header>
  ${r}
  ${i}
  <p class="tips">由「原点 · Origin」导出 · 打印对话框里选择「另存为 PDF」即可保存。</p>
</body></html>`,l=window.open("","_blank");if(!l){f.error("浏览器拦住了新窗口，请允许弹出窗口后重试");return}l.document.open(),l.document.write(o),l.document.close(),l.focus(),f.ok(`已生成 ${t.length} 题的打印版，在打印里选「另存为 PDF」`)}const ua=914400,Bn=6.4*ua,Un=4.2*ua,zn=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function pa(t,e={}){return`<w:r><w:rPr>${['<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>',e.bold?"<w:b/>":"",e.italic?"<w:i/>":"",`<w:sz w:val="${e.size??21}"/><w:szCs w:val="${e.size??21}"/>`,e.color?`<w:color w:val="${e.color}"/>`:""].join("")}</w:rPr><w:t xml:space="preserve">${zn(t)}</w:t></w:r>`}function F(t,e={}){const a=e.before||e.after?`<w:spacing w:before="${e.before??0}" w:after="${e.after??0}"/>`:"",n=e.indent||e.hanging?`<w:ind w:left="${e.indent??0}" w:hanging="${e.hanging??0}"/>`:"";return`<w:p><w:pPr>${a}${n}</w:pPr>${t?pa(t,e):""}</w:p>`}function Fn(t,e,a,n){return`<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${Math.round(a)}" cy="${Math.round(n)}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${e}" name="Picture ${e}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${e}" name="image${e}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${t}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${Math.round(a)}" cy="${Math.round(n)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`}function Wn(t){return new Promise(e=>{const a=new Image;a.onload=()=>e({w:a.naturalWidth||640,h:a.naturalHeight||480}),a.onerror=()=>e(null),a.src=t})}function Kn(t){const e=/^data:image\/([a-zA-Z+]+);base64,(.+)$/.exec(t);if(!e)return null;try{const a=atob(e[2]),n=new Uint8Array(a.length);for(let r=0;r<a.length;r+=1)n[r]=a.charCodeAt(r);const s=e[1].toLowerCase()==="jpeg"?"jpeg":e[1].toLowerCase();return{bytes:n,ext:s}}catch{return null}}function Gn(t){const e=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html"),a=[],n=s=>{if(s.nodeType===Node.TEXT_NODE){const i=s.textContent??"";i.trim()&&a.push({kind:"text",value:i.replace(/\s+/g," ")});return}if(s.nodeType!==Node.ELEMENT_NODE)return;const r=s;if(r.tagName==="IMG"){a.push({kind:"img",value:r.getAttribute("src")??""});return}if(r.tagName==="BR"){a.push({kind:"br",value:""});return}r.childNodes.forEach(n)};return e.body.firstElementChild?.childNodes.forEach(n),a}async function Jn(t,e){const a=[],n=[];let s=0;a.push(F(e.title??"题库练习卷",{size:32,bold:!0,after:80}));const r=[e.subtitle??"",`${t.length} 题`,"姓名 ________","得分 ________"].filter(Boolean).join("　　");a.push(F(r,{size:18,color:"666666",after:200}));for(let p=0;p<t.length;p+=1){const v=t[p],g=it(v),k=String(p+1).padStart(2,"0");a.push(F(`${k}　${St[g]}${v.chapter?"　·　"+v.chapter:""}`,{size:18,bold:!0,color:"1440FF",before:200,after:60}));const y=Gn(v.q);let w="";const j=()=>{w.trim()&&a.push(F(w.trim(),{after:60})),w=""};for(const x of y)if(x.kind==="text")w+=x.value;else if(x.kind==="br")j();else{j();const L=Kn(x.value);if(!L)continue;const lt=await Wn(x.value)??{w:640,h:480};let At=lt.w*9525,Et=lt.h*9525;const ke=Math.min(Bn/At,Un/Et,1);At*=ke,Et*=ke,s+=1;const Se=`rId${100+s}`,Ma=`image${s}.${L.ext}`;n.push({relId:Se,name:Ma,bytes:L.bytes,cx:At,cy:Et,id:s}),a.push(Fn(Se,s,At,Et))}if(j(),Array.isArray(v.opts)&&v.opts.length)v.opts.forEach((x,L)=>{const et=String.fromCharCode(65+L),lt=String(x).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");a.push(F(`${et}. ${lt}`,{size:20,hanging:280,indent:280,after:20}))});else if(g==="blank")a.push(F("答：________________________________",{after:40}));else if(g==="essay"){for(let x=0;x<3;x+=1)a.push(F("　",{after:60}));a.push(F("（请在答题纸上作答）",{size:18,color:"999999",after:40}))}}e.withAnswers!==!1&&(a.push(`<w:p><w:pPr><w:pageBreakBefore/></w:pPr>${pa("参考答案",{size:28,bold:!0})}</w:p>`),t.forEach((p,v)=>{const g=String(v+1).padStart(2,"0");a.push(F(`${g}　${H(p.a,p.opts)||"（无）"}`,{size:20,after:40}))}));const i=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>${a.join("")}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="851" w:footer="992" w:gutter="0"/></w:sectPr></w:body></w:document>`,o='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',l='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',c='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+n.map(p=>`<Relationship Id="${p.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${p.name}"/>`).join("")+"</Relationships>",u={"[Content_Types].xml":jt(o),"_rels/.rels":jt(l),"word/document.xml":jt(i),"word/_rels/document.xml.rels":jt(c)};for(const p of n)u[`word/media/${p.name}`]=p.bytes;const d=Da(u,{level:6});return new Blob([d],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})}async function Pe(t,e={}){if(!t.length){f.error("没有可导出的题目");return}try{const a=await Jn(t,e),n=URL.createObjectURL(a),s=document.createElement("a"),r=new Date().toISOString().slice(0,10);s.href=n,s.download=`${(e.title??"题库试卷").replace(/[\\/:*?"<>|]/g,"-")}-${r}.docx`,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(n),4e3),f.ok(`已导出 ${t.length} 题的 Word 文档`)}catch(a){f.error(a instanceof Error?`导出失败：${a.message}`:"导出失败")}}function Qn(t){const e=t.replace(/```json/gi,"```").trim(),a=/```([\s\S]*?)```/.exec(e)?.[1]??e,n=a.indexOf("{"),s=a.lastIndexOf("}");return n===-1||s<=n?"{}":a.slice(n,s+1)}const X=20,b={search:"",subject:"all",type:"all",edit:!1,page:0,selected:new Set};function ma(){b.search="",b.subject="all",b.type="all",b.edit=!1,b.page=0,b.selected.clear()}function Y(){return m.bank??[]}function Vn(){return["all",...Array.from(new Set(Y().map(t=>t.subject||"默认题库")))]}function _t(){const t=b.search.trim().toLowerCase();return Y().filter(e=>b.subject!=="all"&&(e.subject||"默认题库")!==b.subject||b.type!=="all"&&it(e)!==b.type?!1:t?C(e.q).toLowerCase().includes(t)||e.opts.some(a=>C(a).toLowerCase().includes(t)):!0)}function fa(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(a=>String.fromCharCode(65+a)).join(" / ")}function Xn(){const t=_t(),e=Math.max(1,Math.ceil(t.length/X));b.page>e-1&&(b.page=e-1),b.page<0&&(b.page=0);const a=t.slice(b.page*X,b.page*X+X),n=Vn().map(c=>`<button class="chip" data-act="subject" data-subject="${h(c)}" aria-pressed="${b.subject===c}">
          ${c==="all"?"全部":h(c)}
        </button>`).join(""),s=Y(),r={single:0,multi:0,judge:0,blank:0,essay:0};s.forEach(c=>{r[it(c)]+=1});const i=[["all","全部",s.length],["single","单选",r.single],["multi","多选",r.multi],["judge","判断",r.judge],["blank","填空",r.blank],["essay","简答",r.essay]].filter(([c,,u])=>c==="all"||u>0).map(([c,u,d])=>`<button class="chip" data-act="type" data-type="${c}" aria-pressed="${b.type===c}">${u} <span class="chip-n">${d}</span></button>`).join(""),o=a.map((c,u)=>{const d=it(c),p=String(b.page*X+u+1).padStart(2,"0");return`<tr class="q-row ${b.edit?"selectable":"is-clickable"}" data-id="${c.id}" ${b.edit?"":'data-act="peek"'}>
        <td class="c-no">${b.edit?`<button class="checkbox" data-act="select" data-id="${c.id}" aria-pressed="${b.selected.has(c.id)}">✓</button>`:p}</td>
        <td class="c-q">
          <div class="q-cell">${ca(N(c.q),b.search)}</div>
          ${c.opts.length?`<div class="q-sub">${c.opts.length} 个选项</div>`:""}
        </td>
        <td class="c-type"><span class="tag tag-type">${St[d]}</span></td>
        <td class="c-chapter muted">${h(c.chapter||"—")}</td>
        <td class="c-ans"><span class="tag tag-ok">${h(fa(c))}</span></td>
        <td class="c-act"><button class="icon-btn sm" data-act="edit" data-id="${c.id}" aria-label="编辑">✎</button></td>
      </tr>`}).join(""),l=m.loading.bank&&!m.bank?`<div class="list">${Array.from({length:5}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div></div>').join("")}</div>`:t.length?`<div class="table-wrap">
          <table class="q-table">
            <thead><tr>
              <th class="c-no">NO</th><th class="c-q">题干</th><th class="c-type">题型</th>
              <th class="c-chapter">章节</th><th class="c-ans">答案</th><th class="c-act"></th>
            </tr></thead>
            <tbody>${o}</tbody>
          </table>
        </div>
        ${e>1?`<div class="pager">
                 <button class="btn btn-sm" data-act="page-prev" ${b.page===0?"disabled":""}>← 上一页</button>
                 <span class="pager-info">${b.page+1} / ${e} 页 · 共 ${t.length} 题</span>
                 <button class="btn btn-sm" data-act="page-next" ${b.page>=e-1?"disabled":""}>下一页 →</button>
               </div>`:`<p class="muted small table-count">共 ${t.length} 题</p>`}`:`<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${b.search?"没有匹配的题目":"题库还是空的"}</div><div class="empty-desc">${b.search?"换个关键词试试":"点右上角「⇪」导入 JSON / TXT / Word / 图片，或点「＋」手写"}</div></div>`;return`
    <h1 class="page-title">题库</h1>
    <div class="search-box">
      <span class="ico">⌕</span>
      <input type="search" placeholder="搜索题干或选项（/ 聚焦）" data-role="search" value="${h(b.search)}" enterkeyhint="search">
    </div>
    <div class="tool-row">
      <button class="tool-btn" data-act="import" title="导入题库">⇪<span>导入</span></button>
      <button class="tool-btn" data-act="generate" title="AI 出题">✦<span>出题</span></button>
      <button class="tool-btn" data-act="add" title="添加题目">＋<span>新建</span></button>
      <button class="tool-btn" data-act="print" title="导出试卷（打印 / 存 PDF）">⎙<span>试卷</span></button>
      <button class="tool-btn" data-act="docx" title="导出 Word（.docx）">⤓<span>Word</span></button>
      <button class="tool-btn" data-act="toggle-edit" title="批量管理">${b.edit?"✓":"☰"}<span>批量</span></button>
    </div>
    <div class="chips">${n}</div>
    <div class="chips chips-type">${i}</div>
    ${b.edit?`<div class="row between" style="margin-bottom:12px">
        <button class="btn btn-sm btn-ghost" data-act="select-all">${b.selected.size===t.length&&t.length?"取消全选":"全选本页"}</button>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export" ${b.selected.size?"":"disabled"}>导出 JSON</button>
          <button class="btn btn-sm" data-act="print-selected" ${b.selected.size?"":"disabled"}>导出试卷</button>
          <button class="btn btn-sm" data-act="docx-selected" ${b.selected.size?"":"disabled"}>导出 Word</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${b.selected.size?"":"disabled"}>删除</button>
        </div>
      </div>`:""}
    ${l}`}async function ne(t){const e=!t,a={editor:null},n=document.createElement("div");if(n.innerHTML=`
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
      <input class="input" data-role="a" value="${h(t?fa(t):"")}" placeholder="A">
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
    </div>`,!await q({title:e?"添加题目":"编辑题目",body:n,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:d=>{const p=d.querySelector('[data-role="q-host"]');p&&(a.editor=kn({value:t?.q??"",placeholder:"输入题干；可用工具栏插图、写公式（$…$）",minHeight:110}),p.appendChild(a.editor.el));const v=d.querySelector('[data-role="gen-explain"]');v?.addEventListener("click",async()=>{const k=C(a.editor?.getValue()??"").trim(),y=d.querySelector('[data-role="opts"]')?.value??"",w=d.querySelector('[data-role="a"]')?.value??"";if(!k){f.error("先写题干，AI 才能写解析");return}const j=d.querySelector('[data-role="explain"]'),x=v.textContent??"";v.disabled=!0,v.textContent="生成中…";try{const L=await A.ai.explain(`题目：${k}
选项：${y.split(`
`).join("；")}
正确答案：${w}`);j&&(j.value=(L.result??"").trim()),f.ok("解析已生成，可再手动润色")}catch(L){f.error(L instanceof E?L.message:"生成失败")}finally{v.disabled=!1,v.textContent=x}});const g=d.querySelector('[data-role="classify"]');g&&g.addEventListener("click",async()=>{const k=C(a.editor?.getValue()??"").trim();if(!k){f.error("先写题干，AI 才能判断归类");return}const y=d.querySelector('[data-role="opts"]')?.value??"",w=g.textContent??"";g.disabled=!0,g.textContent="归类中…";try{const j=await A.ai.classify(`题目：${k}
选项：${y.split(`
`).join("；")}`),x=JSON.parse(Qn(j.result??"{}")),L=d.querySelector('[data-role="subject"]'),et=d.querySelector('[data-role="chapter"]');x.subject&&L&&(L.value=String(x.subject).slice(0,24)),x.chapter&&et&&(et.value=String(x.chapter).slice(0,24)),f.ok("已根据题目填入题库与章节")}catch{f.error("AI 归类失败，可手动填写")}finally{g.disabled=!1,g.textContent=w}})}}))return;const r=d=>n.querySelector(`[data-role="${d}"]`).value,i=(a.editor?.getValue()??"").trim();if(!C(i).trim()&&!/<img/i.test(i)){f.error("题干不能为空");return}const o=r("opts").split(`
`).map(d=>d.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),l=r("a").trim();let c="";if(o.length){const p=l.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(v=>v.charCodeAt(0)-65).filter(v=>v>=0&&v<o.length);if(!p.length){f.error("答案请填选项字母，如 A 或 A,B");return}c=p.length===1?p[0]:p}else c=l;const u={q:i,opts:o,a:c,chapter:r("chapter").trim(),subject:r("subject").trim()||"默认题库",explain:r("explain").trim()};try{if(e)await A.questions.add([u]);else try{await A.questions.update(t.id,u,{baseUpdatedAt:t.updated_at})}catch(d){if(d instanceof E&&d.status===409){if(!await ct({title:"这道题在别处被改过",message:"另一台设备保存了这题的更新版本。要用你现在的内容覆盖它吗？",okText:"覆盖",danger:!0}))return;await A.questions.update(t.id,u,{force:!0})}else throw d}G("bank"),await Z(!0),f.ok(e?"题目已添加":"题目已保存")}catch(d){f.error(d instanceof E?d.message:"保存失败")}}async function Yn(){await Dn()}function Zn(){const t=Y().filter(s=>b.selected.has(s.id));if(!t.length){f.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.download=`题库-${t.length}题.json`,n.click(),URL.revokeObjectURL(a),f.ok(`已导出 ${t.length} 题`)}async function ts(){await Z()}async function es(t,e){switch(t){case"subject":return b.subject=e.dataset.subject??"all",!0;case"toggle-edit":return b.edit=!b.edit,b.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return b.selected.has(a)?b.selected.delete(a):b.selected.add(a),!0}case"add":return await ne(),!0;case"edit":{const a=Y().find(n=>n.id===Number(e.dataset.id));return a&&await ne(a),!0}case"delete-selected":{const a=[...b.selected];if(!a.length||!await ct({title:"删除题目",message:`确定删除选中的 ${a.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await A.questions.remove(a),b.selected.clear(),G("bank"),await Z(!0),f.ok("已删除")}catch(n){f.error(n instanceof E?n.message:"删除失败")}return!0}case"export":return Zn(),!0;case"print":return Re(_t(),{title:`题库 · ${b.subject==="all"?"全部":b.subject}`}),!0;case"docx":return await Pe(_t(),{title:`题库 · ${b.subject==="all"?"全部":b.subject}`,subtitle:"原点 · Origin"}),!0;case"docx-selected":return await Pe(Y().filter(a=>b.selected.has(a.id)),{title:"选中题目 · 试卷",subtitle:"原点 · Origin"}),!0;case"print-selected":return Re(Y().filter(a=>b.selected.has(a.id)),{title:"选中题目 · 试卷"}),!0;case"page-prev":return b.page=Math.max(0,b.page-1),!0;case"page-next":return b.page+=1,!0;case"select-all":{const a=_t().slice(b.page*X,b.page*X+X),n=a.every(s=>b.selected.has(s.id));return a.forEach(s=>n?b.selected.delete(s.id):b.selected.add(s.id)),!0}case"generate":return await Pn(),!0;case"import":return await Yn(),!0;case"type":{const a=e.dataset.type;return a&&(b.type=a,b.page=0),!0}case"peek":{const a=Number(e.dataset.id),n=Y().find(s=>s.id===a);return n&&await as(n),!0}case"search":return!0;default:return!1}}async function as(t){const e=it(t),a=document.createElement("div");a.className="peek",a.innerHTML=`
    <div class="peek-meta">
      <span class="tag tag-type">${St[e]}</span>
      ${t.subject?`<span class="tag">${h(t.subject)}</span>`:""}
      ${t.chapter?`<span class="tag">${h(t.chapter)}</span>`:""}
    </div>
    <div class="peek-q q-text">${N(t.q)}</div>
    ${t.opts.length?`<ul class="peek-opts">${t.opts.map((s,r)=>`<li class="${(Array.isArray(t.a)?t.a.includes(r):t.a===r)?"is-hit":""}"><b>${String.fromCharCode(65+r)}</b>${N(String(s).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</li>`).join("")}</ul>`:""}
    <div class="peek-ans"><span class="muted">答案</span> ${h(H(t.a,t.opts)||"（无）")}</div>`,await q({title:"题目预览",body:a,actions:[{label:"关闭",value:"close"},{label:"编辑这题",value:"edit",variant:"primary"}]})==="edit"&&await ne(t)}function ns(t){return t.dataset.role==="search"?(b.search=t.value,b.page=0,!0):!1}const ss="modulepreload",rs=function(t){return"/"+t},He={},is=function(e,a,n){let s=Promise.resolve();if(a&&a.length>0){let i=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=i(a.map(c=>{if(c=rs(c),c in He)return;He[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":ss,u||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),u)return new Promise((v,g)=>{p.addEventListener("load",v),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(i){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i}return s.then(i=>{for(const o of i||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};function ga(t){return new Promise(e=>window.setTimeout(e,t))}function os(t,e,a=620,n="%"){const s=performance.now(),r=i=>{const o=Math.min((i-s)/a,1),l=1-Math.pow(1-o,3);t.innerHTML=`${Math.round(e*l)}<span>${n}</span>`,o<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function It(t=12){D.vibration&&navigator.vibrate?.(t)}let S=null,yt=null;function mt(){return S?S.options.questions[S.idx]??null:null}function Pt(t){const e=S;let a=e.records.get(t.id);return a||(a={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,a)),a}function ba(){const t=S;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function cs(){const t=S;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function ls(t,e){if(I(t.a))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${h(e.text)}</textarea>
      </div>`;const a=kt(t.a);return`<div class="opts" data-multi="${a.length>1}">${t.opts.map((s,r)=>{let i="";return e.submitted?a.includes(r)?i="correct":e.picked.includes(r)?i="wrong":i="muted":e.picked.includes(r)&&(i="picked"),`<button class="opt" data-act="pick" data-idx="${r}" data-state="${i}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+r)}</span>
        <span class="opt-text">${N(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function ds(t,e){if(!e.submitted)return"";const a=I(t.a)?String(t.a):H(t.a,t.opts),n=I(t.a)?C(e.text)||"（空）":H(e.picked.length?e.picked:[],t.opts)||"（未选）";if(I(t.a)){const r=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${S?.busy?"disabled":""}>✦ AI 阅卷</button>
          <button class="btn btn-sm" data-act="mark" data-ok="1">我答对了</button>
          <button class="btn btn-sm" data-act="mark" data-ok="0">没答对</button>
        </div>`:`<div class="essay-actions"><span class="tag ${e.correct?"tag-ok":"tag-bad"}">${e.correct?"已标记：答对":"已标记：答错"}</span></div>`;return`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${h(a)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${h(n)}
      <div class="divider"></div>
      ${r}
    </div>`}const s=(t.explain??"").trim();return`<div class="answer-panel">
    <div class="ai-title">${e.correct?"✅ 回答正确":"❌ 回答错误"}</div>
    正确答案：${h(H(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${h(n)}`}
    ${s?`<div class="divider"></div><div class="ai-title" style="color:var(--text-3)">解析</div><div class="explain-body">${N(s)}</div>`:""}
  </div>`}function us(){const t=S,e=mt();if(!e)return"";const a=Pt(e),n=t.options.questions.length,s=n?Math.round((t.idx+(a.submitted?1:0))/n*100):0,r=kt(e.a).length>1&&!I(e.a);return`
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
          <span>${r?"多选":I(e.a)?"简答":"单选"}</span>
        </div>
        <div class="q-text">${N(e.q)}</div>
        ${ls(e,a)}
        ${ds(e,a)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${Nt(e.id)}" aria-label="收藏">${Nt(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!de()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${a.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===n-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${r||I(e.a)?"提交答案":"查看答案"}</button>`}
    </div>`}function ps(t,e){S={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},P(),yt=a=>{const n=S;if(!n)return;const s=a.target,r=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(a.key==="Escape"){if(document.querySelector(".modal-layer"))return;we();return}if(r)return;const i=mt();if(!i)return;const o=Pt(i);if(a.key===" "||a.key==="Enter"){const c=n.root?.querySelector('[data-act="submit"]'),u=n.root?.querySelector('[data-act="next"]');c?(a.preventDefault(),U("submit",c)):u&&(a.preventDefault(),U("next",u));return}if(a.key==="ArrowRight"){a.preventDefault(),o.submitted?ve():U("submit",n.root.querySelector('[data-act="submit"]'));return}if(a.key==="ArrowLeft"){a.preventDefault(),U("prev",n.root);return}const l=a.key.toLowerCase();if(/^[1-9]$/.test(l)||/^[a-h]$/.test(l)){const c=/^[1-9]$/.test(l)?Number(l)-1:l.charCodeAt(0)-97;if(c<i.opts.length){a.preventDefault();const u=n.root?.querySelector(`.opt[data-idx="${c}"]`);u&&U("pick",u)}return}l==="s"?U("fav",n.root):l==="n"?U("note",n.root):l==="e"?U("ai",n.root):l==="g"?U("ai-grade",n.root):l==="?"&&is(()=>Promise.resolve().then(()=>Ws),void 0).then(c=>c.openShortcuts())},document.addEventListener("keydown",yt),t.addEventListener("submit",a=>a.preventDefault()),t.addEventListener("input",ha)}function P(){const t=S;t?.root&&(t.root.innerHTML=us())}function ha(t){const e=t.target;e?.dataset.role!=="essay"||!S||(S.textDraft=e.value)}async function Kt(t,e){const a=S;if(e.submitted=!0,I(t.a))e.correct=null;else if(e.correct=Qe(e.picked,t.a),e.correct){It(10);const n=ms();n>=3&&n%3===0&&f.ok(`连对 ${n} 题，保持住`)}else It([14,40,14]),he(t,e);P(),e.correct&&a.options.questions.length>a.idx+1&&(await ga(600),S&&S.idx===a.idx&&ve())}function ms(){const t=S;let e=0;for(let a=t.idx;a>=0;a-=1){const n=t.records.get(t.options.questions[a].id);if(n?.submitted)if(n.correct===!0)e+=1;else break}return e}async function he(t,e){try{await A.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(a){a instanceof E&&a.status!==401&&f.error(`错题保存失败：${a.message}`)}}function ve(){const t=S,e=t.options.questions.length;if(t.idx>=e-1){fs();return}t.idx+=1,t.textDraft="",P(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function ye(){yt&&document.removeEventListener("keydown",yt),yt=null,S?.root?.removeEventListener("input",ha),S?.root?.replaceChildren(),S=null}async function we(){const t=S;if(!t)return;const e=ba();if(!await ct({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;mt()&&va();const s=t.options.onExit;ye(),s?.()}function va(){const t=S;if(!t)return;t.options.source==="sequential"&&Xa(t.idx);const e=t.options.questions.slice(0,5).map(a=>C(a.q).slice(0,40));Za(e)}async function fs(){const t=S;va();const e=t.options.questions.length,a=ba(),n=cs(),s=a-n,r=a?Math.round(n/a*100):0;if(ye(),await q({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${n}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${a}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:o=>{const l=o.querySelector('[data-role="acc"]');l&&os(l,r)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function gs(t,e,a){e.correct=a,a?It(10):he(t,e),P(),a&&f.ok("已记为答对")}async function bs(t,e){const a=S;if(a){a.busy=!0,P();try{const n=[`题目：${C(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${C(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await A.ai.grade(n),r=String(s.result||""),i=r.includes("得分")&&!r.includes("不得分");e.correct=i,i?It(10):he(t,e),f.ok(i?"AI 阅卷：答对":"AI 阅卷：答错")}catch(n){f.error(n instanceof E?n.message:"AI 阅卷失败，请稍后再试")}finally{a.busy=!1,P()}}}async function hs(){const t=mt();if(!t)return;const e=de()[String(t.id)]??"",a=document.createElement("div");a.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${h(e)}</textarea>`;const n=a.querySelector("textarea");await q({title:"我的笔记",body:a,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>n.focus()})&&(Va(t.id,n.value),f.ok("笔记已保存"),P())}async function vs(){const t=mt();if(!t)return;const e=Pt(t),a=[`题目：${C(t.q)}`,t.opts.length?`选项：${t.opts.map((i,o)=>`${String.fromCharCode(65+o)}. ${C(i)}`).join("；")}`:"",`正确答案：${I(t.a)?t.a:H(t.a,t.opts)}`,e.submitted?`我的作答：${I(t.a)?e.text:H(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),n=document.createElement("div");n.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',q({title:"AI 深度解析",body:n,actions:[{label:"关闭",value:"close"}]});const s=n.querySelector('[data-role="text"]'),r=n.querySelector(".ai-title");try{let i="";const o=await A.ai.explainStream(a,c=>{i+=c,s.innerHTML=`${h(i).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),l=o.provider==="deepseek"?"DeepSeek":o.provider==="zhipu"?"智谱":"";r.textContent=i?`✦ AI 解析${l?` · ${l}`:""}${o.cached?" · 缓存命中":""}`:"✦ AI 解析",i?s.innerHTML=h(o.text||i).replace(/\n/g,"<br>"):await ys(s,o.text??""),s.classList.remove("cursor")}catch(i){const o=i instanceof E?i.message:"AI 解析失败，请稍后重试";f.error(o),r.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=o}}async function ys(t,e){for(let a=0;a<e.length;a+=2)t.innerHTML=h(e.slice(0,a+2)).replace(/\n/g,"<br>"),await ga(12)}function ws(){const t=S;if(!t)return;const e=t.options.questions.map((a,n)=>{const s=t.records.get(a.id),r=n===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${n}" data-state="${r}">${n+1}</button>`}).join("");q({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:a=>{a.querySelectorAll(".nav-cell").forEach(n=>{n.addEventListener("click",()=>{const s=Number(n.dataset.idx);!Number.isFinite(s)||!S||(S.idx=s,S.textDraft="",ge(),P())})})}}).then(a=>{a==="finish"&&we()})}async function U(t,e){const a=S;if(!a)return!1;const n=mt();if(!n)return!1;const s=Pt(n);switch(t){case"pick":{if(s.submitted)return!0;const r=Number(e.dataset.idx);return I(n.a)||(kt(n.a).length>1?(s.picked=s.picked.includes(r)?s.picked.filter(o=>o!==r):[...s.picked,r],P()):(s.picked=[r],await Kt(n,s))),!0}case"submit":{if(I(n.a)){const r=a.root?.querySelector('[data-role="essay"]');if(s.text=r?.value??a.textDraft,!s.text.trim())return f.info("先写点什么再提交吧"),!0;await Kt(n,s)}else{if(!s.picked.length)return f.info("请先选择答案"),!0;await Kt(n,s)}return!0}case"ai-grade":return!I(n.a)||S?.busy||await bs(n,s),!0;case"mark":return I(n.a)&&gs(n,s,e.dataset.ok==="1"),!0;case"next":return ve(),!0;case"prev":return a.idx>0&&(a.idx-=1,a.textDraft="",P()),!0;case"jump":return a.idx=Number(e.dataset.idx),a.textDraft="",ge(),P(),!0;case"nav":return ws(),!0;case"exit":return await we(),!0;case"fav":return await mn(n.id),P(),!0;case"note":return await hs(),!0;case"ai":return vs(),!0;default:return!1}}let W=null;function $s(){return!!(W&&document.body.contains(W))}function ut(t){if(!t.questions.length){f.info("这里还没有题目");return}Be(),W=document.createElement("div"),W.className="quiz",document.body.appendChild(W),document.body.classList.add("is-locked"),ps(W,{...t,onExit:()=>{Be(),t.onExit?.()}}),Ya({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function Be(){W&&(ye(),W.remove(),W=null,document.body.classList.remove("is-locked"))}async function Gt(t="random"){const e=m.bank??[];if(!e.length){f.info("题库还是空的，先去添加题目吧");return}if(t==="chapter"){const n=await Ss(e);if(!n?.length)return;const s=e.filter(i=>n.includes(i.chapter||"未分类")),r=await Dt(s.length);if(r===null)return;ut({questions:s.slice(0,r),source:"chapter",title:"章节练习"});return}const a=await Dt(e.length);if(a!==null){if(t==="sequential"){const n=Math.min(Ze(),Math.max(e.length-1,0));ut({questions:e.slice(0,a),source:"sequential",title:"顺序练习",startIndex:n<a?n:0});return}ut({questions:Je(e).slice(0,a),source:"all",title:"随机练习"})}}async function ya(){const t=m.wrong??await rt(!0);if(!t.length){f.info("错题本是空的，先去刷几题吧");return}const e=await Dt(t.length);if(e===null)return;const a=t.slice(0,e).map(n=>({id:n.id,q:n.q,opts:n.opts,a:n.a,chapter:n.chapter,subject:n.subject}));ut({questions:a,source:"wrong",title:"错题重练"})}function xs(t){if(!t.length){f.info("还没有收藏题目");return}Dt(t.length).then(e=>{e!==null&&ut({questions:Je(t).slice(0,e),source:"fav",title:"收藏练习"})})}function ks(){const t=ta(),e=m.bank??[];if(!t||!e.length)return f.info("没有可以继续的练习"),!1;const a=new Map(e.map(s=>[s.id,s])),n=t.ids.map(s=>a.get(s)).filter(s=>!!s);return n.length?(ut({questions:n,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,n.length-1)}),!0):(ea(),f.info("上次的题目已经不在了"),!1)}function Dt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const a=document.createElement("div");a.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const n=a.querySelector('[data-role="count"]');return n.addEventListener("click",s=>{const r=s.target.closest("button[data-n]");r&&(n.querySelectorAll("button").forEach(i=>i.setAttribute("aria-pressed","false")),r.setAttribute("aria-pressed","true"))}),q({title:"练多少题",body:a,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const r=n.querySelector('button[aria-pressed="true"]');return Number(r?.dataset.n??t)})}async function Ss(t){const e=new Map;t.forEach(i=>{const o=i.chapter?.trim()||"未分类";e.set(o,(e.get(o)??0)+1)});const a=[...e.entries()].sort((i,o)=>o[1]-i[1]);if(!a.length)return null;const n=document.createElement("div");if(n.innerHTML=`<div class="list">${a.map(([i,o],l)=>`
      <button class="item" data-chapter="${h(i)}" data-checked="${l===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${h(i)}</span><span class="tag">${o} 题</span></div>
      </button>`).join("")}</div>`,n.addEventListener("click",i=>{const o=i.target.closest("[data-chapter]");o&&(o.dataset.checked=o.dataset.checked==="true"?"false":"true")}),!await q({title:"选择章节",body:n,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const r=Array.from(n.querySelectorAll("[data-chapter]")).filter(i=>i.dataset.checked==="true").map(i=>i.dataset.chapter??"");return r.length?r:null}const st=new Set;function As(){st.clear()}function se(){return m.favs??[]}function Es(){const t=se(),e=m.loading.fav&&!m.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(a=>`
        <div class="item" data-id="${a.id}">
          <div class="item-q">${N(a.q)}</div>
          <div class="item-meta">
            ${a.subject?`<span class="tag tag-accent">${h(a.subject)}</span>`:""}
            ${a.chapter?`<span class="tag">${h(a.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${a.id}">${st.has(a.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${a.id}">取消收藏</button>
          </div>
          ${st.has(a.id)?`<div class="item-answer"><div class="right">${h(H(a.a,a.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function js(){await $t()}async function Ls(t,e){switch(t){case"practice":return se().length?(await xs(se()),!0):(f.info("还没有收藏的题"),!0);case"reveal":{const a=Number(e.dataset.id);return st.has(a)?st.delete(a):st.add(a),!0}case"remove":{const a=Number(e.dataset.id);try{await A.favorites.remove(a),st.delete(a),G("fav"),await $t(!0),f.ok("已取消收藏")}catch(n){f.error(n instanceof E?n.message:"操作失败")}return!0}default:return!1}}let _=null,pt=null,wt=null;const Ts=t=>String.fromCharCode(65+t),qs=t=>typeof t.a=="number"||Array.isArray(t.a);function wa(t){const e=Math.max(0,Math.round(t/1e3)),a=Math.floor(e/60),n=e%60;return`${String(a).padStart(2,"0")}:${String(n).padStart(2,"0")}`}async function Ms(){const t=(m.bank??[]).filter(qs);if(t.length<3){f.error("题库里的客观题不足 3 道，先导入或手写几道再考");return}const e=document.createElement("div");if(e.innerHTML=`
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
    <p class="muted small" style="margin:12px 0 0">可选 ${t.length} 道客观题；考试中不显示对错。</p>`,!await q({title:"模拟考试",body:e,actions:[{label:"取消",value:!1},{label:"开始考试",value:!0,variant:"primary"}]}))return;const n=(o,l)=>{const c=e.querySelector(`[data-role="${o}"]`),u=Number(c?.value);return Number.isFinite(u)&&u>0?u:l},s=Math.min(t.length,n("count",Math.min(20,t.length))),r=Math.min(180,n("min",15));_={questions:[...t].sort(()=>Math.random()-.5).slice(0,s),picks:new Map,idx:0,endsAt:Date.now()+r*60*1e3,timer:window.setInterval(_s,1e3),submitted:!1},Cs()}function Cs(){const t=document.getElementById("app-root")??document.body,e=document.createElement("div");e.className="exam",t.appendChild(e),pt=e,Ht(),wt=a=>{if(!(!_||document.querySelector(".modal-layer"))){if(a.key==="ArrowRight")a.preventDefault(),Ot(1);else if(a.key==="ArrowLeft")a.preventDefault(),Ot(-1);else if(/^[a-h1-8]$/i.test(a.key)){const n=/^\d$/.test(a.key)?Number(a.key)-1:a.key.toLowerCase().charCodeAt(0)-97;$a(n)}}},document.addEventListener("keydown",wt)}function _s(){const t=_;if(!t||t.submitted)return;if(Date.now()>=t.endsAt){$e(!0);return}const e=pt?.querySelector(".exam-clock");if(e){const a=t.endsAt-Date.now();e.textContent=wa(a),e.classList.toggle("is-urgent",a<=6e4)}}function Ht(){const t=_;if(!t||!pt)return;const e=t.questions[t.idx],a=t.picks.get(e.id)??[],n=t.endsAt-Date.now(),s=t.questions.filter(i=>(t.picks.get(i.id)??[]).length>0).length,r=Array.isArray(e.a)&&e.a.length>1;pt.innerHTML=`
    <div class="exam-bar">
      <button class="icon-btn" data-ex="exit" aria-label="退出">←</button>
      <div class="exam-progress">${t.idx+1} / ${t.questions.length} · 已答 ${s}</div>
      <span class="exam-clock ${n<=6e4?"is-urgent":""}">${wa(n)}</span>
      <button class="icon-btn" data-ex="sheet" aria-label="答题卡">▦</button>
    </div>
    <div class="exam-body">
      <article class="q-card">
        <div class="q-head">
          <div class="q-tags">
            ${e.chapter?`<span class="tag">${e.chapter}</span>`:""}
            ${e.subject&&e.subject!=="默认题库"?`<span class="tag">${e.subject}</span>`:""}
          </div>
          <span class="muted small">${r?"多选":"单选"}</span>
        </div>
        <div class="q-text">${N(e.q)}</div>
        <div class="opts">
          ${e.opts.map((i,o)=>`<button class="opt ${a.includes(o)?"is-picked":""}" data-ex="pick" data-idx="${o}">
                <span class="opt-key">${Ts(o)}</span>
                <span class="opt-text">${N(String(i).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
              </button>`).join("")}
        </div>
      </article>
    </div>
    <div class="exam-foot">
      <button class="btn" data-ex="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${t.idx===t.questions.length-1?"":'<button class="btn" data-ex="next">下一题</button>'}
      <button class="btn btn-primary" data-ex="submit">交卷</button>
    </div>`}function $a(t){const e=_;if(!e)return;const a=e.questions[e.idx];if(t<0||t>=a.opts.length)return;const n=Array.isArray(a.a)&&a.a.length>1,s=e.picks.get(a.id)??[];n?e.picks.set(a.id,s.includes(t)?s.filter(r=>r!==t):[...s,t]):e.picks.set(a.id,[t]),Ht()}function Ot(t){const e=_;if(!e)return;const a=e.idx+t;a<0||a>=e.questions.length||(e.idx=a,Ht())}function Ns(){const t=_;if(!t)return;const e=document.createElement("div");e.className="nav-grid",e.innerHTML=t.questions.map((a,n)=>`<button class="nav-cell ${(t.picks.get(a.id)??[]).length>0?"is-done":""} ${n===t.idx?"is-cur":""}" data-idx="${n}">${n+1}</button>`).join(""),e.addEventListener("click",a=>{const n=a.target.closest(".nav-cell");if(!n||!_)return;const s=Number(n.dataset.idx);Number.isFinite(s)&&(_.idx=s,document.querySelector(".modal-layer")?.remove(),Ht())}),q({title:"答题卡",body:e,actions:[{label:"继续答题",value:"close"},{label:"交卷",value:"submit",variant:"primary"}]}).then(a=>{a==="submit"&&$e(!1)})}async function $e(t){const e=_;if(!e||e.submitted)return;const a=e.questions.filter(o=>(e.picks.get(o.id)??[]).length===0).length;if(!t&&a>0&&!await ct({title:"还有题没答",message:`还有 ${a} 道没答，确定交卷？`,okText:"交卷"}))return;e.submitted=!0,window.clearInterval(e.timer);let n=0;const s=[];for(const o of e.questions){const l=e.picks.get(o.id)??[];l.length&&Qe(l,o.a)?n+=1:s.push(o)}const r=Math.round(n/e.questions.length*100);for(const o of s)A.wrong.add({q:o.q,opts:o.opts,a:o.a,chapter:o.chapter,subject:o.subject,explain:o.explain,user_choice:e.picks.get(o.id)??[]}).catch(()=>{});const i=document.createElement("div");i.className="exam-result",i.innerHTML=`
    <div class="score-big">${r}<span>分</span></div>
    <div class="score-sub">答对 ${n} / ${e.questions.length} · ${t?"时间到自动交卷":"手动交卷"}</div>
    ${s.length?`<div class="wrong-list">${s.slice(0,8).map(o=>`<div class="wrong-item">
                <div class="wrong-q">${N(o.q)}</div>
                <div class="wrong-a">
                  <b class="bad">你选 ${H(e.picks.get(o.id)??[],o.opts)||"未答"}</b>
                  <span class="ok">正确 ${H(o.a,o.opts)}</span>
                </div>
              </div>`).join("")}${s.length>8?`<div class="muted small">…还有 ${s.length-8} 道已进错题本</div>`:""}</div>`:'<div class="all-right">全对，厉害</div>'}`,await q({title:"考试结果",body:i,actions:[{label:"知道了",value:"close",variant:"primary"}]}),xa()}function xa(){_&&window.clearInterval(_.timer),_=null,wt&&document.removeEventListener("keydown",wt),wt=null,pt?.remove(),pt=null}function ka(t,e){if(!_)return!1;switch(t){case"pick":return $a(Number(e.dataset.idx)),!0;case"prev":return Ot(-1),!0;case"next":return Ot(1),!0;case"sheet":return Ns(),!0;case"submit":return $e(!1),!0;case"exit":return(async()=>await ct({title:"退出考试",message:"退出后本次作答不保留，确定吗？",danger:!0,okText:"退出"})&&xa())(),!0;default:return!1}}function Sa(){return!!_}let Jt="";function Is(){return(!en()||!Jt)&&(Jt=fn(),an()),Jt}function Ds(){const t=new Date,e=n=>String(n).padStart(2,"0"),a="日一二三四五六"[t.getDay()];return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())} / 周${a}`}const Os=t=>String(t).padStart(2,"0");function Rs(){const t=m.bank,e=m.wrong,a=m.favs,n=m.loading,s=ta(),r=aa().slice(0,4),i=Ze(),o=t?t.length:0,l=Math.min(20,Math.max(5,o||10)),c='<div class="skeleton sk-line w60"></div><div class="skeleton sk-line w80"></div>',u=d=>d===void 0?"—":String(d).padStart(2,"0");return`
    <section class="masthead">
      <div class="mast-meta">
        <span>${Ds()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${m.user?`@${h(m.user)}`:"未登录"}</span>
      </div>
      <h1 class="mast-title">
        今天<br />练 <em>${String(l).padStart(2,"0")}</em> 题
      </h1>
      <p class="mast-sub">${h(Is())}</p>
    </section>

    <section class="overview" aria-label="数据概览">
      <button class="ov-cell" data-act="goto" data-tab="bank">
        <span class="ov-num">${u(t?.length)}</span>
        <span class="ov-label">题库</span>
      </button>
      <button class="ov-cell" data-act="goto" data-tab="wrong">
        <span class="ov-num">${u(e?.length)}</span>
        <span class="ov-label">错题</span>
      </button>
      <button class="ov-cell" data-act="goto" data-tab="fav">
        <span class="ov-num">${u(a?.length)}</span>
        <span class="ov-label">收藏</span>
      </button>
    </section>

    ${n.bank&&!t?`<div class="card card-pad">${c}</div>`:""}

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
        <span class="tile-desc">${t&&!t.length?"题库为空":i>0?`停在第 ${i+1} 题`:"按顺序推进"}</span>
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

    ${r.length?`<section class="recent">
             <div class="section-title">最近练过</div>
             ${r.map((d,p)=>`<div class="recent-row"><span class="recent-idx">${Os(p+1)}</span><span class="recent-text">${h(d)}</span></div>`).join("")}
           </section>`:""}
  `}async function Ps(){await Promise.allSettled([Z(),rt(),$t()])}async function Hs(t,e){switch(t){case"goto":return Rt(e.dataset.tab??"bank"),!0;case"random":return await Gt("random"),!0;case"sequential":return await Gt("sequential"),!0;case"chapter":return await Gt("chapter"),!0;case"wrong":return await ya(),!0;case"resume":return ks(),!0;case"exam":return await Ms(),!0;default:return!1}}const Qt=8;function Bs(){const t=[],e=(a,n,s)=>{(a??[]).forEach(r=>t.push({id:r.id,q:r,source:n,tab:s}))};return e(m.bank,"题库","bank"),e(m.wrong,"错题","wrong"),e(m.favs,"收藏","fav"),t}function Us(t,e){const a=e.toLowerCase();return a?C(t.q.q).toLowerCase().includes(a)||(t.q.opts??[]).some(n=>C(n).toLowerCase().includes(a))||C(t.q.chapter??"").toLowerCase().includes(a)||C(t.q.subject??"").toLowerCase().includes(a):!0}function Ue(t=""){const e=document.createElement("div");e.className="search-panel",e.innerHTML=`
    <div class="search-box">
      <span class="ico">⌕</span>
      <input class="search-input" type="search" data-role="kw" placeholder="搜题干、选项、章节、题库…" value="${t.replace(/"/g,"&quot;")}">
    </div>
    <div class="search-results" data-role="hits"></div>
    <p class="muted small search-foot" data-role="foot"></p>`;const a=Bs(),n=e.querySelector('[data-role="hits"]'),s=e.querySelector('[data-role="foot"]'),r=e.querySelector('[data-role="kw"]'),i=()=>{const o=r.value.trim(),l=a.filter(d=>Us(d,o));if(!o){const d=l.filter(p=>p.tab==="bank").slice(0,12);n.innerHTML=d.length?d.map(p=>`<button class="hit" data-act="open" data-tab="${p.tab}" data-id="${p.id}">
                <span class="hit-src">${p.source}</span>
                <span class="hit-q">${N(p.q.q)}</span>
              </button>`).join(""):'<p class="muted small">题库还是空的，先去导入吧。</p>',s.textContent=d.length?"输入关键词可以跨题库 / 错题 / 收藏一起搜":"";return}const c=d=>l.filter(p=>p.source===d),u=[];["题库","错题","收藏"].forEach(d=>{const p=c(d);p.length&&(u.push(`<div class="hit-group">${d} · ${p.length}</div>`),u.push(p.slice(0,Qt).map(v=>{const g=it(v.q);return`<button class="hit" data-act="open" data-tab="${v.tab}" data-id="${v.id}">
              <span class="hit-src">${St[g]}</span>
              <span class="hit-q">${ca(N(v.q.q),o)}</span>
            </button>`}).join("")),p.length>Qt&&u.push(`<div class="hit-more muted small">还有 ${p.length-Qt} 条，缩小关键词试试</div>`))}),n.innerHTML=u.length?u.join(""):`<p class="muted small">没有找到「${o}」</p>`,s.textContent=`共命中 ${l.length} 条`};r.addEventListener("input",i),q({title:"全局搜索",body:e,actions:[{label:"关闭",value:"close"}],onMount:o=>{i();const l=o.querySelector('[data-role="kw"]');l?.focus(),l?.setSelectionRange(l.value.length,l.value.length),o.addEventListener("click",c=>{const u=c.target.closest(".hit");if(!u)return;const d=u.dataset.tab??"bank",p=Number(u.dataset.id),v=a.find(g=>g.id===p&&g.tab===d);if(ge(),Rt(d),v){const g=C(v.q.q).slice(0,12);if(d==="bank"){const k=document.querySelector('.view input[data-role="search"]');k&&g&&(k.value=g,k.dispatchEvent(new Event("input",{bubbles:!0})))}}})}})}const Aa=[{keys:"1 2 3 4 / A B C D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1 – 5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/ 或 Ctrl+K",desc:"全局搜索（题库 / 错题 / 收藏）",scope:"全局"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function xe(){const t=Aa.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");q({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const zs=["home","bank","wrong","fav","me"];function Fs(t){const e=t;if(!e)return!1;const a=e.tagName.toLowerCase();return a==="input"||a==="textarea"||a==="select"||e.isContentEditable}function Ea(){document.addEventListener("keydown",t=>{if((t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"){if(document.querySelector(".quiz"))return;t.preventDefault(),Ue();return}if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||Fs(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),xe();return}if(t.key==="/"){t.preventDefault(),Ue();return}const a=Number(t.key);a>=1&&a<=5&&(t.preventDefault(),Rt(zs[a-1]))})}const Ws=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:Aa,installShortcuts:Ea,openShortcuts:xe},Symbol.toStringTag,{value:"Module"})),Ks=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],Gs=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function ze(t,e,a){return`<div class="segmented">${t.map(n=>`<button class="seg" data-act="${a}" data-value="${n.value}" aria-pressed="${String(n.value)===String(e)}">${n.label}</button>`).join("")}</div>`}function Fe(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),URL.revokeObjectURL(n)}async function Js(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await q({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const a=t.querySelector('[data-role="old"]').value,n=t.querySelector('[data-role="next"]').value;if(n.length<6){f.error("新密码至少 6 位");return}try{await A.auth.change(a,n),f.ok("密码已更新")}catch(s){f.error(s instanceof E?s.message:"修改失败")}}function Qs(){const t=m.user,e=h((t||"?").slice(0,1).toUpperCase()),a=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})();return`
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
      ${ze(Ks,D.theme,"theme")}
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
      ${ze(Gs,D.autoDelay,"delay")}
      <div class="divider"></div>
      <label class="setting-row">
        <div><div class="setting-title">答题震动</div><div class="setting-desc">答对答错给一点反馈</div></div>
        <span class="switch" role="switch" data-act="toggle-vibration" aria-checked="${D.vibration}"><i></i></span>
      </label>
      <label class="setting-row">
        <div><div class="setting-title">连对鼓励</div><div class="setting-desc">连续答对时来点掌声</div></div>
        <span class="switch" role="switch" data-act="toggle-streak" aria-checked="${D.streakAlert}"><i></i></span>
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
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function Vs(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){f.error("图片太大了（最多 8MB）");return}try{const a=await Xs(e);ht({image:a,color:""}),f.ok("背景已更新"),M("render")}catch{f.error("这张图片读不出来，换一张试试")}}},t.click()}function Xs(t){return new Promise((e,a)=>{const n=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(n);const r=Math.min(1,1600/Math.max(s.width,s.height)),i=document.createElement("canvas");i.width=Math.round(s.width*r),i.height=Math.round(s.height*r);const o=i.getContext("2d");if(!o){a(new Error("canvas unavailable"));return}o.drawImage(s,0,0,i.width,i.height),e(i.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(n),a(new Error("image load failed"))},s.src=n})}function Ys(){me()}async function Zs(t,e){switch(t){case"theme":return on(e.dataset.value),M("render"),!0;case"delay":return qt({autoDelay:Number(e.dataset.value)}),M("render"),!0;case"toggle-vibration":return qt({vibration:!D.vibration}),M("render"),!0;case"toggle-streak":return qt({streakAlert:!D.streakAlert}),M("render"),!0;case"pick-color":return ht({color:e.value,image:""}),!0;case"pick-bg":return await Vs(),!0;case"clear-bg":return ht({image:""}),M("render"),!0;case"dim":return ht({dim:Number(e.value)}),!0;case"shortcuts":return xe(),!0;case"about":return q({title:"关于",body:`<p class="muted small" style="margin:0 0 10px">原点 · Origin —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。</p>
          <p class="muted small" style="margin:0 0 6px">题库 ${m.bank?.length??0} 题 · 错题 ${m.wrong?.length??0} 道 · 收藏 ${m.favs?.length??0} 条</p>
          <p class="muted small" style="margin:0">版本 v2.0.0 · 支持 PWA 离线打开</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]}),!0;case"reset-bg":return ht({color:"",image:"",dim:.35}),f.ok("背景已恢复"),M("render"),!0;case"export-bank":return m.bank?.length?(Fe(`题库-${m.user}.json`,m.bank),f.ok("已导出"),!0):(f.info("题库是空的"),!0);case"export-wrong":return m.wrong?.length?(Fe(`错题-${m.user}.json`,m.wrong),f.ok("已导出"),!0):(f.info("没有错题"),!0);case"change-password":return await Js(),!0;case"logout":return await ct({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(ia(),f.info("已退出登录")),!0;default:return!1}}const T={subject:"all",edit:!1,selected:new Set};function tr(){T.subject="all",T.edit=!1,T.selected.clear()}function ja(){const t=m.wrong??[];return T.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===T.subject)}function er(){return["all",...Array.from(new Set((m.wrong??[]).map(t=>t.subject||"默认题库")))]}function ar(){const t=ja(),e=m.wrong?.length??0,a=er().map(s=>`<button class="chip" data-act="subject" data-subject="${h(s)}" aria-pressed="${T.subject===s}">
          ${s==="all"?"全部":h(s)}
        </button>`).join(""),n=m.loading.wrong&&!m.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${T.selected.has(s.id)}">
          ${T.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${N(s.q)}</div>
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
    ${a}
    ${T.edit?`<div class="row between" style="margin-bottom:12px">
             <span class="muted small">已选 ${T.selected.size} 题</span>
             <button class="btn btn-sm btn-danger" data-act="remove-selected" ${T.selected.size?"":"disabled"}>删除</button>
           </div>`:""}
    ${n}`}async function nr(){await rt()}async function sr(t,e){switch(t){case"subject":return T.subject=e.dataset.subject??"all",!0;case"toggle-edit":return T.edit=!T.edit,T.selected.clear(),!0;case"select":{const a=Number(e.dataset.id);return T.selected.has(a)?T.selected.delete(a):T.selected.add(a),!0}case"practice":return ja().length?(await ya(),!0):(f.info("没有可练的错题"),!0);case"remove":{const a=Number(e.dataset.id);try{await A.wrong.remove([a]),T.selected.delete(a),G("wrong"),await rt(!0),f.ok("已标记掌握，继续加油")}catch(n){f.error(n instanceof E?n.message:"操作失败")}return!0}case"remove-selected":{const a=[...T.selected];if(!a.length||!await ct({title:"删除错题",message:`确定删除选中的 ${a.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await A.wrong.remove(a),T.selected.clear(),G("wrong"),await rt(!0),f.ok("已删除")}catch(n){f.error(n instanceof E?n.message:"删除失败")}return!0}default:return!1}}const ot={home:{render:Rs,mount:Ps,handle:Hs},bank:{render:Xn,mount:ts,handle:es,onInput:ns,reset:ma},wrong:{render:ar,mount:nr,handle:sr,reset:tr},fav:{render:Es,mount:js,handle:Ls,reset:As},me:{render:Qs,mount:Ys,handle:Zs}};let xt=!1,tt=!1,Vt=!1,Xt=!1;function La(){return document.getElementById("app-root")}function rr(){tt=!1,La().innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-name">Origin Quiz</span>
        </div>
        <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(m.user||"?").slice(0,1).toUpperCase()}</button>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${ae.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${ae.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,xt=!0}function ir(){document.querySelectorAll(".tab-btn").forEach(e=>{const a=e.dataset.tab===m.tab;e.classList.toggle("is-active",a),e.setAttribute("aria-selected",String(a))});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,ae.findIndex(a=>a.id===m.tab));t.style.setProperty("--tab-index",String(e))}}function or(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,a=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),n=a?e.getAttribute("data-role"):null,s=a&&e instanceof HTMLInputElement?e.selectionStart:null,r=ot[m.tab]??ot.home;if(t.innerHTML=`<div class="view-inner">${r.render()}</div>`,ir(),a&&n){const i=t.querySelector(`[data-role="${n}"]`);i&&(i.focus(),s!==null&&i.setSelectionRange&&i.setSelectionRange(s,s))}r.mount?.()}function K(){if(Vt){Xt=!0;return}Vt=!0;try{if(!m.authed&&!m.token){tt=!0,xt=!1,La().innerHTML=bn();return}xt||rr(),or()}finally{Vt=!1,Xt&&(Xt=!1,queueMicrotask(K))}}let Yt=!1;function We(){Yt||(Yt=!0,setTimeout(()=>{Yt=!1,K()},0))}async function Ta(t){await t(),tt&&K()}function qa(t){const e=t.dataset.act??"";if(Sa()&&t.closest(".exam")&&ka(t.dataset.ex??"",t))return;if($s()&&t.closest(".quiz")){U(e,t).then(n=>{n||M("render")});return}if(e==="tab"){Rt(t.dataset.tab??"home");return}if(tt){Ta(()=>oa(e,t));return}const a=ot[m.tab]??ot.home;a.handle&&Promise.resolve(a.handle(e,t)).then(n=>{n&&K()})}function cr(t){const e=t.target;if(!e)return;const a=e.closest("[data-ex]");if(a&&Sa()&&a.closest(".exam")){ka(a.dataset.ex??"",a);return}const n=e.closest("[data-act]");n&&(n.closest(".modal-layer")||qa(n))}function Ke(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){qa(e);return}if(tt)return;const a=document.getElementById("view");if(!a||!a.contains(e))return;(ot[m.tab]??ot.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&K()}function lr(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),tt&&Ta(()=>oa("submit",e)))}function dr(){pe(),me(),nn(()=>{ia(),xt=!1,tt=!1,f.error("登录已过期，请重新登录"),M("auth")}),Lt("nav",()=>{Object.entries(ot).forEach(([t,e])=>{t!==m.tab&&e.reset?.()}),K()}),Lt("auth",()=>{xt=!1,tt=!1,m.authed?(ma(),K(),Promise.allSettled([Z(!0),rt(!0),$t(!0)])):K()}),Lt("render",We),Lt("data",We),document.addEventListener("click",cr),document.addEventListener("change",Ke),document.addEventListener("input",Ke),document.addEventListener("submit",lr),Ea(),m.token&&(m.authed=!0),K(),m.token&&Promise.allSettled([Z(),rt(),$t()])}function Ge(){try{dr(),Ka()}catch(t){console.error("[origin-quiz] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ge,{once:!0}):Ge();
