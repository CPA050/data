var fa=Object.defineProperty;var ma=(t,e,n)=>e in t?fa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Fe=(t,e,n)=>ma(t,typeof e!="symbol"?e+"":e,n);import{k as ga,u as ba,s as We,a as ha,i as va,b as zt,z as ya}from"./vendor-CSYf6iwd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const $a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function $(t){return String(t??"").replace(/[&<>"']/g,e=>$a[e]??e)}const re=/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;function wa(t,e){try{return ga.renderToString(t,{displayMode:e,throwOnError:!1,output:"mathml",strict:!1,trust:!1})}catch{return $(e?`$$${t}$$`:`$${t}$`)}}function Ke(t){let e="",n=0;re.lastIndex=0;for(let a=re.exec(t);a;a=re.exec(t)){e+=$(t.slice(n,a.index)).replace(/\n/g,"<br>");const s=!!(a[1]||a[2]),o=(a[1]??a[2]??a[3]??a[4]??"").trim();e+=o?wa(o,s):$(a[0]),n=a.index+a[0].length}return e+=$(t.slice(n)).replace(/\n/g,"<br>"),e}const xa=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function ka(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function P(t){const e=ka(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return Ke(e);const a=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!a)return $(e);const s=o=>{if(o.nodeType===Node.TEXT_NODE)return Ke(o.textContent??"");if(o.nodeType!==Node.ELEMENT_NODE)return"";const r=o,i=r.tagName,l=Array.from(r.childNodes).map(s).join("");if(!xa.has(i))return l;if(i==="IMG"){const c=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(c))return"";const p=$(r.getAttribute("alt")??"");return`<img src="${$(c)}" alt="${p}" loading="lazy" referrerpolicy="no-referrer">`}const u=i.toLowerCase();return`<${u}>${l}</${u}>`};return Array.from(a.childNodes).map(s).join("")}function N(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function Ht(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(n=>Number.isInteger(n)))).sort((n,a)=>n-a)}function Sa(t){return typeof t=="string"}function G(t,e=[]){return typeof t=="string"?t:Ht(t).map(n=>{const a=String.fromCharCode(65+n),s=(e[n]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${a}. ${s}`:a}).join("、")}function te(t){const e=[...t];for(let n=e.length-1;n>0;n-=1){const a=Math.floor(Math.random()*(n+1));[e[n],e[a]]=[e[a],e[n]]}return e}function xn(t,e){const n=Ht(e);if(!n.length||t.length!==n.length)return!1;const a=[...new Set(t)].sort((s,o)=>s-o);return a.length===n.length&&a.every((s,o)=>s===n[o])}function Aa(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const n=JSON.parse(e);if(typeof n=="number")return n;if(Array.isArray(n))return n.map(Number).filter(Number.isInteger);if(typeof n=="string")return n}catch{}return e}return""}let Q=null;function Ea(){return Q&&document.body.contains(Q)||(Q=document.createElement("div"),Q.className="toast-host",Q.setAttribute("role","status"),Q.setAttribute("aria-live","polite"),document.body.appendChild(Q)),Q}function oe(t,e="info",n=2600){if(!t)return;const a=document.createElement("div");a.className=`toast toast-${e}`,a.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${$(t)}</span>`,Ea().appendChild(a),requestAnimationFrame(()=>a.classList.add("in")),window.setTimeout(()=>{a.classList.remove("in"),window.setTimeout(()=>a.remove(),220)},n)}const h={info:t=>oe(t,"info"),ok:t=>oe(t,"success"),error:t=>oe(t,"error",3200)},be="oq:queue",ja=200;function ke(){try{const t=localStorage.getItem(be),e=t?JSON.parse(t):[];return Array.isArray(e)?e.filter(n=>n&&n.path):[]}catch{return[]}}function kn(t){try{t.length?localStorage.setItem(be,JSON.stringify(t.slice(-ja))):localStorage.removeItem(be)}catch{}}function La(){return ke().length}function Ta(t,e,n){const a=ke();a.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,path:t,body:e,label:n,at:Date.now()}),kn(a)}let ie=!1;async function Ge(){if(ie)return 0;const t=ke();if(!t.length)return 0;ie=!0;let e=0;const n=[];for(const a of t)try{const s=await fetch(a.path,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a.body),...Je()?{headers:{"Content-Type":"application/json",Accept:"application/json",...Je()}}:{}});if(s.ok||s.status>=400&&s.status<500){s.ok&&(e+=1);continue}n.push(a)}catch{n.push(a);break}return ie=!1,kn([...n,...t.slice(t.length)]),e&&h.ok(`已补传 ${e} 条离线操作`),e}function Je(){try{const e=(localStorage.getItem("oq:oq:token")||localStorage.getItem("oq:token")||"").replace(/^"|"$/g,"");return e?{Authorization:`Bearer ${e}`}:{}}catch{return{}}}function Ma(){window.addEventListener("online",()=>{Ge()}),navigator.onLine&&La()&&setTimeout(()=>void Ge(),1500)}const Se="oq:",Ae="oq:user",Ee="oq:token",qa={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},O={...qa,...st("settings",{})};["auto","light","dark","eye"].includes(O.theme)||(O.theme="auto");function st(t,e){try{const n=localStorage.getItem(Se+t);return n===null?e:JSON.parse(n)}catch{return e}}function rt(t,e){try{localStorage.setItem(Se+t,JSON.stringify(e))}catch{}}function he(t){try{localStorage.removeItem(Se+t)}catch{}}function Jt(t){Object.assign(O,t),rt("settings",O)}function Ca(t){Jt({theme:t})}function H(){return st(Ae,"")||""}function Sn(t){rt(Ae,t)}function Na(){he(Ae),he(Ee)}function je(){return st(Ee,"")||""}function An(t){rt(Ee,t)}function ot(t){return`u:${H()||"anon"}:${t}`}function Le(){return st(ot("notes"),{})}function Ia(t,e){const n=Le(),a=String(t);e.trim()?n[a]=e:delete n[a],rt(ot("notes"),n)}function En(){const t=st(ot("progress"),{});return Number(t.sequential_index)||0}function _a(t){rt(ot("progress"),{sequential_index:t,updatedAt:Date.now()})}function jn(){const t=st(ot("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function Da(t){rt(ot("session"),t)}function Ln(){he(ot("session"))}function Pa(){return st(ot("recent"),[])}function Oa(t){const e=[...t,...Pa()].slice(0,30);rt(ot("recent"),Array.from(new Set(e)))}function Tn(){return st("appearance",{color:"",image:"",dim:.35})}function Ra(t){rt("appearance",{...Tn(),...t})}function Ha(){return st("welcomed","")===new Date().toDateString()}function Ua(){rt("welcomed",new Date().toDateString())}class T extends Error{constructor(n,a){super(a);Fe(this,"status");this.name="ApiError",this.status=n}}let Te=null;function za(t){Te=t}async function Mn(t,e={}){const n=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&n.set("Content-Type","application/json");const a=je();a&&n.set("Authorization",`Bearer ${a}`),n.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:n})}catch{throw new T(0,"网络连接失败，请检查网络后重试")}const o=s.headers.get("content-type")??"";let r=null;o.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const i=r??{};if(s.status===401)throw Te?.(),new T(401,typeof i.error=="string"?i.error:"登录已过期，请重新登录");if(!s.ok||i.ok===!1){const l=typeof i.error=="string"&&i.error?i.error:`请求失败（HTTP ${s.status}）`;throw new T(s.status,l)}return r}const ce=t=>Mn(t),V=(t,e)=>Mn(t,{method:"POST",body:JSON.stringify(e)});async function Ba(t,e,n){const a=new Headers({"Content-Type":"application/json"}),s=je();s&&a.set("Authorization",`Bearer ${s}`);const o=await fetch("/api/ai",{method:"POST",headers:a,body:JSON.stringify({...t,stream:!0}),signal:n});if(!o.ok||!o.body){const d=await o.json().catch(()=>({}));if(o.status===401)throw Te?.(),new T(401,"登录已过期，请重新登录");if(typeof d.result=="string")return e(d.result),{text:d.result,cached:!1,provider:typeof d.provider=="string"?d.provider:void 0};throw new T(o.status,typeof d.error=="string"?d.error:"AI 解析失败")}const r=o.body.getReader(),i=new TextDecoder;let l="",u="",c=!1,p;for(;;){const{value:d,done:m}=await r.read();if(m)break;l+=i.decode(d,{stream:!0});const g=l.split(`

`);l=g.pop()??"";for(const y of g){const j=y.split(`
`).find(w=>w.startsWith("data:"));if(!j)continue;let b;try{b=JSON.parse(j.slice(5).trim())}catch{continue}if(typeof b.delta=="string"&&b.delta&&(u+=b.delta,e(b.delta)),typeof b.error=="string")throw new T(502,b.error);b.done&&(c=b.cached===!0,typeof b.provider=="string"&&(p=b.provider))}}return{text:u,cached:c,provider:p}}function ve(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:Aa(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function Fa(t){return{...ve(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}async function ft(t,e,n){try{return await V(t,e)}catch(a){if(a instanceof T&&a.status===0)return Ta(t,e,n),{ok:!0,queued:!0,offline:!0};throw a}}const L={auth:{check:t=>V("/api/auth",{action:"check",username:t}),set:(t,e)=>V("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>V("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>V("/api/auth",{action:"change",username:H(),oldPassword:t,newPassword:e})},questions:{async list(){const t=H();if(!t)return[];const e=await ce(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>ve(a))},add:t=>ft("/api/questions-add",{user_id:H(),questions:t},`导入 ${t.length} 道题`),update:(t,e,n)=>ft("/api/questions-update",{id:t,user_id:H(),...e,...n?.baseUpdatedAt?{base_updated_at:n.baseUpdatedAt}:{},...n?.force?{force:!0}:{}},"保存题目"),remove:t=>ft("/api/questions-delete",{ids:t,user_id:H()},`删除 ${t.length} 道题`)},wrong:{async list(){const t=H();if(!t)return[];const e=await ce(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>Fa(a))},add:t=>ft("/api/wrong-add",{user_id:H(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""},"记录错题"),remove:t=>ft("/api/wrong-delete",{ids:t,user_id:H()},"移除错题")},favorites:{async list(){const t=H();if(!t)return[];const e=await ce(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>ve(a))},add:t=>ft("/api/favorites-add",{user_id:H(),question_id:t},"收藏题目"),remove:t=>ft("/api/favorites-remove",{user_id:H(),question_id:t},"取消收藏")},ai:{explain:t=>V("/api/ai",{action:"explain",prompt:t}),grade:t=>V("/api/ai",{action:"grade",prompt:t}),extract:t=>V("/api/ai",{action:"extract",...t}),classify:t=>V("/api/ai",{action:"classify",prompt:t}),generate:t=>V("/api/ai",{action:"generate",prompt:t}),explainStream:(t,e,n)=>Ba({action:"explain",prompt:t},e,n)}},Tt='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"',St=[{id:"home",label:"首页",icon:`<svg viewBox="0 0 24 24" ${Tt} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`},{id:"bank",label:"题库",icon:`<svg viewBox="0 0 24 24" ${Tt} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`},{id:"wrong",label:"错题",icon:`<svg viewBox="0 0 24 24" ${Tt} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`},{id:"fav",label:"收藏",icon:`<svg viewBox="0 0 24 24" ${Tt} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`},{id:"me",label:"我的",icon:`<svg viewBox="0 0 24 24" ${Tt} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`}],Xe=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],f={tab:"home",user:H(),token:je(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},qt=new Map;function Bt(t,e){return qt.has(t)||qt.set(t,new Set),qt.get(t).add(e),()=>qt.get(t)?.delete(e)}function _(t){qt.get(t)?.forEach(e=>e())}function Ut(t){f.tab!==t&&(f.tab=t,_("nav"))}const qn=window.matchMedia("(prefers-color-scheme: dark)");function Ve(){return O.theme==="auto"?qn.matches?"dark":"light":O.theme}function Me(){document.documentElement.dataset.theme=Ve();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=Ve()==="dark"?"#0b0c0f":"#f4f5f7")}function Wa(t){Ca(t),Me()}qn.addEventListener("change",()=>{O.theme==="auto"&&Me()});function Ka(t){Ra(t)}function qe(){const{color:t,image:e,dim:n}=Tn(),a=document.body;a.style.backgroundImage=e?`url("${e}")`:"",a.style.backgroundSize="cover",a.style.backgroundPosition="center",a.style.backgroundAttachment="fixed",a.dataset.dim=String(n),t&&!e?a.style.backgroundColor=t:a.style.backgroundColor=""}async function Ga(t,e){const n=await L.auth.login(t,e);An(n.token),Sn(t),f.user=t,f.token=n.token,f.authed=!0,F(),_("auth")}async function Ja(t,e){const n=await L.auth.set(t,e);An(n.token),Sn(t),f.user=t,f.token=n.token,f.authed=!0,F(),_("auth")}function Cn(){f.user="",f.token="",f.authed=!1,f.bank=null,f.wrong=null,f.favs=null,f.favoriteIds=new Set,Na(),Ln(),_("auth")}const Xa=300*1e3,mt={bank:0,wrong:0,fav:0},Xt=new Map;function F(t){t?mt[t]=0:(mt.bank=mt.wrong=mt.fav=0,f.bank=null,f.wrong=null,f.favs=null)}function Va(t,e){const n=Xt.get(t);if(n)return n;const a=e().finally(()=>Xt.delete(t));return Xt.set(t,a),a}async function Ce(t,e,n,a){if(!f.user)return[];const s=Xt.get(t);if(s)return s;const o=Date.now()-mt[t]<Xa;if(!e&&o)return[];f.loading[t]=!0,_("data");try{const r=await Va(t,n);return a(r),mt[t]=Date.now(),r}catch(r){throw r instanceof T&&r.status!==401&&h.error(r.message),r}finally{f.loading[t]=!1,_("data")}}function Nn(){return`oq:cache:bank:${f.user}`}function Ya(){if(!f.bank)try{const t=localStorage.getItem(Nn());if(!t)return;const e=JSON.parse(t);Array.isArray(e.rows)&&(f.bank=e.rows)}catch{}}function Qa(t){try{const e=JSON.stringify({at:Date.now(),rows:t});if(e.length>25e5)return;localStorage.setItem(Nn(),e)}catch{}}async function nt(t=!1){Ya();try{await Ce("bank",t,()=>L.questions.list(),e=>{f.bank=e,Qa(e)})}catch{}return f.bank??[]}async function dt(t=!1){try{await Ce("wrong",t,()=>L.wrong.list(),e=>{f.wrong=e})}catch{}return f.wrong??[]}async function At(t=!1){try{await Ce("fav",t,()=>L.favorites.list(),e=>{f.favs=e,f.favoriteIds=new Set(e.map(n=>n.id))})}catch{}return f.favs??[]}function ye(t){return f.favoriteIds.has(t)}async function Za(t){const e=!ye(t);try{return e?await L.favorites.add(t):await L.favorites.remove(t),e?f.favoriteIds.add(t):f.favoriteIds.delete(t),f.favs=null,mt.fav=0,h.ok(e?"已加入收藏":"已取消收藏"),_("data"),e}catch(n){return h.error(n instanceof T?n.message:"操作失败"),ye(t)}}function ts(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${Xe[Math.floor(Math.random()*Xe.length)]}`}function Ct(t){Ka(t),qe()}const S={step:"name",username:"",busy:!1,error:""};function es(){S.step="name",S.username="",S.busy=!1,S.error=""}function ns(){const t=`
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
    </div>`}async function In(t,e){if(t==="back")return S.step="name",S.error="",!0;if(t==="submit"){const n=e,a=new FormData(n);if(S.step==="name"){const o=String(a.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(o))return S.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;S.busy=!0,S.error="";try{const{hasPassword:r}=await L.auth.check(o);S.username=o,S.step=r?"password":"create"}catch(r){S.error=r instanceof T?r.message:"网络异常，请重试"}finally{S.busy=!1}return!0}if(S.busy)return!0;const s=String(a.get("password")??"");if(S.step==="create"){const o=String(a.get("confirm")??"");if(s!==o)return S.error="两次输入的密码不一致",!0}if(s.length<6)return S.error="密码至少 6 位",!0;S.busy=!0,S.error="";try{S.step==="create"?await Ja(S.username,s):await Ga(S.username,s),S.step==="create"&&h.ok("账号已创建，开始刷题吧"),es()}catch(o){S.error=o instanceof T?o.message:"登录失败，请重试"}finally{S.busy=!1}return!0}return!1}function as(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function _n(t,e){const n=e.trim();if(!n)return t;const a=new RegExp(as(n),"gi");return t.replace(/<[^>]+>|[^<]+/g,s=>s.startsWith("<")?s:s.replace(a,o=>`<mark class="hl">${o}</mark>`))}const vt={single:"单选",multi:"多选",judge:"判断",blank:"填空",essay:"简答",calc:"计算"},ss=[{value:"",label:"自动识别"},{value:"single",label:"单项选择"},{value:"multi",label:"多项选择"},{value:"judge",label:"判断题"},{value:"blank",label:"填空题"},{value:"essay",label:"简答题"},{value:"calc",label:"计算题"}],rs=["single","multi","judge","blank","essay","calc"];function J(t){const e=t.type??"";if(e&&rs.includes(e))return e;const n=t.opts??[],a=String(t.q??"");if(!n.length)return/(计算|求|试算|解：|画出|绘制)/.test(a)?"calc":/_{2,}|（\s*）|\(\s*\)|【\s*】/.test(a)?"blank":"essay";if(n.length===2){const s=n.map(o=>o.replace(/^[A-Za-z][.、)）]\s*/,"").trim()).join("|");if(/^(正确|对|是|√|True)|\|(错误|错|否|×|False)$/i.test(s)||/正确\|错误|对\|错/.test(s))return"judge"}return Array.isArray(t.a)?"multi":"single"}function os(t){return t==="essay"||t==="calc"||t==="blank"}let B=null,It=0;function Dn(){return B&&document.body.contains(B)||(B=document.createElement("div"),B.className="modal-root",B.setAttribute("role","dialog"),B.setAttribute("aria-modal","true"),document.body.appendChild(B)),B}function is(){It+=1,document.body.classList.add("is-locked")}function Ye(){It=Math.max(0,It-1),It===0&&document.body.classList.remove("is-locked")}function ee(){Dn().innerHTML="",It=0,document.body.classList.remove("is-locked")}function C(t){const e=Dn(),n=t.dismissible!==!1;return new Promise(a=>{let s=!1;const o=d=>{if(s)return;s=!0,p(),r.classList.remove("open"),r.style.pointerEvents="none",window.matchMedia("(prefers-reduced-motion: reduce)").matches?(r.remove(),Ye()):window.setTimeout(()=>{r.remove(),Ye()},80),a(d)},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${n?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${$(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${$(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((d,m)=>`<button class="btn btn-${d.variant??"ghost"}" data-idx="${m}">${$(d.label)}</button>`).join("")}</div>`:""}
      </div>`;const i=r.querySelector(".modal-card"),l=i.querySelector(".modal-body");typeof t.body=="string"?l.innerHTML=t.body:t.body&&l.appendChild(t.body);const u=d=>{d.key==="Escape"&&n&&(d.stopPropagation(),o(null))},c=d=>{const m=d.target;if(m.closest("[data-close]")&&n){o(null);return}const g=m.closest("[data-idx]");if(!g)return;const y=t.actions?.[Number(g.dataset.idx)];y&&(y.keepOpen||o(y.value))},p=()=>{document.removeEventListener("keydown",u,!0),r.removeEventListener("click",c),B&&B.children.length===0&&B.classList.remove("open")};r.addEventListener("click",c),document.addEventListener("keydown",u,!0),e.appendChild(r),e.classList.add("open"),is(),t.onMount?.(i),requestAnimationFrame(()=>{r.classList.add("open");const d=i.querySelector("input, textarea, button.btn-primary, button");d&&window.matchMedia("(pointer: fine)").matches&&d.focus({preventScroll:!0})})})}function at(t){return C({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}function cs(t,e=1400,n=.82){return new Promise((a,s)=>{const o=URL.createObjectURL(t),r=new Image;r.onload=()=>{URL.revokeObjectURL(o);const i=Math.min(1,e/Math.max(r.width,r.height)),l=document.createElement("canvas");l.width=Math.max(1,Math.round(r.width*i)),l.height=Math.max(1,Math.round(r.height*i));const u=l.getContext("2d");if(!u){s(new Error("canvas 不可用"));return}u.fillStyle="#fff",u.fillRect(0,0,l.width,l.height),u.drawImage(r,0,0,l.width,l.height),a(l.toDataURL("image/jpeg",n))},r.onerror=()=>{URL.revokeObjectURL(o),s(new Error("图片解码失败"))},r.src=o})}const ls=new Set(["B","STRONG","I","EM","U","SUB","SUP","BR","P","DIV","SPAN","IMG","CODE"]);function Ft(t){const n=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html").body.firstElementChild;if(!n)return"";const a=s=>{if(s.nodeType===Node.TEXT_NODE)return(s.textContent??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");if(s.nodeType!==Node.ELEMENT_NODE)return"";const o=s,r=o.tagName,i=Array.from(o.childNodes).map(a).join("");if(!ls.has(r))return i;if(r==="IMG"){const u=o.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(u))return"";const c=(o.getAttribute("alt")??"").replace(/"/g,"&quot;");return`<img src="${u.replace(/"/g,"&quot;")}" alt="${c}">`}if(r==="BR")return"<br>";const l=r.toLowerCase();return l==="div"||l==="p"?i.trim()?`${i}<br>`:"<br>":`<${l}>${i}</${l}>`};return Array.from(n.childNodes).map(a).join("").replace(/(<br>)+$/g,"").trim()}const ds=[{cmd:"bold",label:"B",title:"加粗（Ctrl/⌘+B）"},{cmd:"italic",label:"I",title:"斜体（Ctrl/⌘+I）"},{cmd:"underline",label:"U",title:"下划线（Ctrl/⌘+U）"},{cmd:"superscript",label:"x²",title:"上标"},{cmd:"subscript",label:"x₂",title:"下标"},{cmd:"insertUnorderedList",label:"≡",title:"列表"}];function us(t={}){const e=document.createElement("div");e.className="rt";const n=document.createElement("div");n.className="rt-bar";const a=document.createElement("div");a.className="rt-area",a.contentEditable="true",a.spellcheck=!1,a.dataset.role="rich",a.style.minHeight=`${t.minHeight??96}px`,t.placeholder&&(a.dataset.placeholder=t.placeholder),a.innerHTML=Ft(t.value??"");const s=(r,i)=>{a.focus(),document.execCommand(r,!1,i),o()};if(t.toolbar!==!1){for(const c of ds){const p=document.createElement("button");p.type="button",p.className="rt-btn",p.title=c.title,p.textContent=c.label,p.addEventListener("mousedown",d=>d.preventDefault()),p.addEventListener("click",()=>s(c.cmd,c.arg)),n.appendChild(p)}const r=document.createElement("span");r.className="rt-sep",n.appendChild(r);const i=document.createElement("button");i.type="button",i.className="rt-btn",i.textContent="∑",i.title="公式：选中内容包成 $…$",i.addEventListener("mousedown",c=>c.preventDefault()),i.addEventListener("click",()=>{const c=window.getSelection()?.toString()??"";if(c){s("insertText",`$${c}$`);return}s("insertText","$$");const p=window.getSelection();if(p&&p.rangeCount){const d=p.getRangeAt(0);typeof p.modify=="function"?p.modify("move","backward","character"):d.startContainer.nodeType===Node.TEXT_NODE&&(d.setStart(d.startContainer,Math.max(0,d.startOffset-1)),d.collapse(!0),p.removeAllRanges(),p.addRange(d))}}),n.appendChild(i);const l=document.createElement("button");l.type="button",l.className="rt-btn",l.textContent="▣",l.title="插入图片（自动压缩）",l.addEventListener("mousedown",c=>c.preventDefault()),l.addEventListener("click",()=>{const c=document.createElement("input");c.type="file",c.accept="image/*",c.onchange=async()=>{const p=c.files?.[0];if(p)try{l.textContent="…";const d=await cs(p);a.focus(),document.execCommand("insertHTML",!1,`<img src="${d}" alt="题图"><br>`),o(),h.ok(`图片已插入（${Math.round(d.length*.75/1024)} KB）`)}catch{h.error("图片读取失败，换一张试试")}finally{l.textContent="▣"}},c.click()}),n.appendChild(l);const u=document.createElement("button");u.type="button",u.className="rt-btn rt-clear",u.textContent="⌫",u.title="清除格式",u.addEventListener("mousedown",c=>c.preventDefault()),u.addEventListener("click",()=>s("removeFormat")),n.appendChild(u)}function o(){const r=(a.textContent??"").trim().length>0,i=!!a.querySelector("img");a.classList.toggle("is-empty",!r&&!i)}return a.addEventListener("input",o),a.addEventListener("blur",o),a.addEventListener("paste",r=>{const i=r.clipboardData?.getData("text/html");i&&(r.preventDefault(),document.execCommand("insertHTML",!1,Ft(i)))}),o(),e.append(n,a),{el:e,getValue:()=>Ft(a.innerHTML),setValue:r=>{a.innerHTML=Ft(r),o()},focus:()=>a.focus()}}function Qe(t){const e=t.name.toLowerCase(),n=t.type.toLowerCase();return e.endsWith(".pdf")||n==="application/pdf"?"pdf":n.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|heic)$/.test(e)?"image":e.endsWith(".docx")?"docx":e.endsWith(".json")?"json":/\.(txt|md|csv|tsv|text)$/.test(e)||n.startsWith("text/")?"text":"unknown"}function kt(t){return String(t??"").replace(/\r\n?/g,`
`).trim()}function Pn(t,e){if(Array.isArray(t)){const r=t.map(i=>typeof i=="number"?i:ps(String(i),e.length)).filter(i=>i!==null);return r.length?r.length===1?r[0]:[...new Set(r)].sort((i,l)=>i-l):t.map(String).join("、")}if(typeof t=="number"&&Number.isFinite(t))return t;const n=kt(t);if(!n)return"";const s=(/^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(n)?n:"")||(/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(n)?n:"");if(s){const r=[...new Set(s.toUpperCase().split("").map(i=>i.charCodeAt(0)-65))].filter(i=>i>=0&&i<e.length);if(r.length)return r.length===1?r[0]:r.sort((i,l)=>i-l)}const o=/^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(n);if(o&&e.length){const r=o[1].charCodeAt(0)-65;if(r>=0&&r<e.length){const i=o[2].trim();return e.findIndex(u=>u.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()===i)>=0||i,r}}return n}function ps(t,e){const n=t.trim().toUpperCase();if(!/^[A-H]$/.test(n))return null;const a=n.charCodeAt(0)-65;return a<e?a:null}function fs(t){const e=kt(t.q??t.question??t.title??t.题目??t.题干);if(!e)return null;const n=t.opts??t.options??t.choices??t.选项;let a=[];Array.isArray(n)?a=n.map(r=>kt(r)).filter(Boolean):typeof n=="string"&&(a=vs(n));const s=t.a??t.answer??t.correct??t.答案??t.正确答案,o=a.length?Pn(s,a):kt(s);return{q:e,opts:a,a:o,...t.figure?{figure:t.figure}:{},chapter:kt(t.chapter??t.章节??t.知识点),subject:kt(t.subject??t.科目??t.题库)||"默认题库"}}function Ne(t){const e=t.replace(/^\uFEFF/,"").trim(),n=/```(?:json)?([\s\S]*?)```/i.exec(e)?.[1]??e,a=n.indexOf("["),s=n.indexOf("{"),o=a>=0&&(s<0||a<s)?a:s;if(o<0)return[];const r=Math.max(n.lastIndexOf("]"),n.lastIndexOf("}"));if(r<=o)return[];let i;try{i=JSON.parse(n.slice(o,r+1))}catch{return[]}return(Array.isArray(i)?i:Array.isArray(i?.questions)?i.questions:Array.isArray(i?.data)?i.data:[]).filter(u=>!!u&&typeof u=="object").map(fs).filter(u=>!!u)}const ms=/^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/,gs=/^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/,bs=/^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/,hs=/^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;function vs(t){return t.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/).map(n=>n.trim()).filter(Boolean)}function ys(t){const e=[...t.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];return e.length<2?[]:e.map((n,a)=>{const s=(n.index??0)+n[0].length,o=a+1<e.length?e[a+1].index??t.length:t.length;return t.slice(s,o).trim()})}function $s(t){const n=t.replace(/^\uFEFF/,"").replace(/\r\n?/g,`
`).replace(/!\[[^\]]*\]\((data:image\/[^)]+)\)/g,(c,p)=>`<img src="${p}" alt="题图">`).split(`
`),a=[];let s="",o=[],r="",i="",l="";const u=()=>{const c=s.trim();if(!c){s="",o=[],r="";return}if(!o.length&&!r.trim()&&c.length<=24){s="",o=[],r="";return}const p=o.map(m=>m.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()),d=p.length?Pn(r,p):r.trim();a.push({q:c,opts:p,a:d,chapter:i,subject:l||"默认题库"}),s="",o=[],r="",i="",l=""};for(const c of n){if(!c.trim())continue;if(/^\s*<img\b/i.test(c)){s=`${s}${s?`
`:""}${c.trim()}`;continue}const p=hs.exec(c),d=ms.exec(c),m=gs.exec(c),g=bs.exec(c);if(p&&!d){u();const y=ys(p[2]);y.length>=2?(s=p[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim(),o=y):s=p[2].trim();continue}if(d&&s){o.push(d[2].trim());continue}if(m&&(s||o.length)){r=m[1].trim();continue}if(g){const y=g[0].trim(),j=g[1].trim();/章节|知识点/.test(y)?i=j:/科目|题库|分类/.test(y)&&(l=j);continue}s?o.length?o[o.length-1]=`${o[o.length-1]} ${c.trim()}`.trim():s=`${s} ${c.trim()}`.trim():s=c.replace(/^\s*(?:题目|题干)\s*[:：]\s*/,"").trim()}return u(),a.filter(c=>c.q.length>1)}function Vt(t){const e=t.trim();if(!e)return[];if(/^[[{]/.test(e)||/```(?:json)?/i.test(e)||/"(q|question|题目)"\s*:/.test(e)){const n=Ne(e);if(n.length)return n}return $s(e)}function ws(t){for(const e of[ha,va])try{return e(t)}catch{}return null}function Wt(t){return t.replace(/\\(?:([nrtbf()\\])|([0-7]{1,3}))/g,(e,n,a)=>n?{n:`
`,r:"\r",t:"	",b:"\b",f:"\f","(":"(",")":")","\\":"\\"}[n]??"":String.fromCharCode(parseInt(a??"0",8)))}function Ze(t){const e=t.replace(/\s+/g,"");if(e.length%2||!/^[0-9A-Fa-f]+$/.test(e))return"";const n=new Uint8Array(e.length/2);for(let a=0;a<n.length;a++)n[a]=parseInt(e.slice(a*2,a*2+2),16);try{return new TextDecoder("utf-8").decode(n)}catch{return""}}function le(t){let e="";for(let a=0;a<t.length;a+=32768)e+=String.fromCharCode(...t.subarray(a,a+32768));return e}function tn(t){const e=new Uint8Array(t),n=le(e),a=[],s=/stream\r?\n([\s\S]*?)endstream/g;let o;for(;o=s.exec(n);){const u=n.lastIndexOf("<<",o.index),c=u>=0?n.slice(u,o.index):"",p=o[0].indexOf(`
`),d=o.index+(p>=0?p+1:6);let g=o.index+o[0].length-9;for(;g>d&&(e[g-1]===10||e[g-1]===13||e[g-1]===32||e[g-1]===9);)g--;const y=e.subarray(d,g);if(/FlateDecode/.test(c)){const j=ws(y);j&&a.push(le(j))}else a.push(le(y))}const r=a.join(`
`),i=[];for(const u of r.matchAll(/\(((?:\\.|[^()\\])*)\)\s*Tj|<([0-9A-Fa-f\s]+)>\s*Tj/g)){const c=u[1]!==void 0?Wt(u[1]):Ze(u[2]);c.trim()&&i.push(c)}for(const u of r.matchAll(/\[((?:\\.|[^\]])*)\]\s*TJ/g)){let c="";for(const p of u[1].matchAll(/\(((?:\\.|[^()\\])*)\)|<([0-9A-Fa-f\s]+)>/g))c+=p[1]!==void 0?Wt(p[1]):Ze(p[2]);c.trim()&&i.push(c)}for(const u of r.matchAll(/(?:^|[\r\n])\s*'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)"/g)){const c=u[1]!==void 0?Wt(u[1]):Wt(u[2]);c.trim()&&i.push(c)}const l=xs(i.join(`
`).replace(/[\r\n]{3,}/g,`

`).trim());if(!l)throw new Error("这份 PDF 里没有可提取的文字（多半是扫描件），请截图让我识别，或转成 Word / 文本再导入");return l}function xs(t){if(!/[\u0080-\u00ff]/.test(t))return t;const e=new Uint8Array(t.length);for(let a=0;a<t.length;a++)e[a]=t.charCodeAt(a)&255;const n=new TextDecoder("utf-8").decode(e);return/[\u4e00-\u9fff]/.test(n)?n:t}function en(t){const e=ba(new Uint8Array(t)),n=e["word/document.xml"];if(!n)throw new Error("这个 docx 里没有正文，另存为 .docx 再试一次");const a=e["word/_rels/document.xml.rels"],s=new Map;if(a){const i=We(a);for(const l of i.matchAll(/<Relationship\b[^>]*>/g)){const u=l[0],c=/\bId="([^"]+)"/.exec(u)?.[1],p=/\bTarget="([^"]+)"/.exec(u)?.[1],d=/\bType="([^"]+)"/.exec(u)?.[1]??"";if(!c||!p||!/image/i.test(d))continue;const m=p.startsWith("/")?p.slice(1):`word/${p.replace(/^\.\//,"")}`,g=e[m];g&&s.set(c,`data:${ks(m)};base64,${Ss(g)}`)}}return We(n).replace(/<a:blip\b[^>]*r:embed="([^"]+)"[^>]*\/?>/g,(i,l)=>{const u=s.get(l);return u?`[[IMG:${u}]]`:""}).replace(/<w:tab\b[^>]*\/>/g,"	").replace(/<w:br\b[^>]*\/>/g,`
`).replace(/<\/w:p>/g,`
`).replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\[\[IMG:([^\]]+)\]\]/g,(i,l)=>`
![docx 图片](${l})
`).replace(/\n{3,}/g,`

`).trim()}function ks(t){const e=t.split(".").pop()?.toLowerCase()??"";return e==="jpg"||e==="jpeg"?"image/jpeg":e==="gif"?"image/gif":e==="bmp"?"image/bmp":e==="webp"?"image/webp":e==="svg"?"image/svg+xml":"image/png"}function Ss(t){let e="";for(let a=0;a<t.length;a+=32768)e+=String.fromCharCode(...t.subarray(a,a+32768));return btoa(e)}function nn(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("文件读取失败")),a.readAsText(t,"utf-8")})}function Kt(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(a.result),a.onerror=()=>n(new Error("文件读取失败")),a.readAsArrayBuffer(t)})}function an(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("图片读取失败")),a.readAsDataURL(t)})}function As(t,e){if(!t.length)return'<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>';const n=t.slice(0,4),a=n.map((r,i)=>{const l=(r.opts??[]).length,u=sn(r),c=(r.q.match(/<img\b/gi)??[]).length,p=r.q.replace(/<img\b[^>]*>/gi," ").replace(/\s+/g," ").trim();return`<li><b>${i+1}.</b> ${$(p).slice(0,90)}${c?`<span class="muted"> · 含 ${c} 张图</span>`:""}${l?`<span class="muted"> · ${l} 个选项</span>`:'<span class="muted"> · 简答</span>'}${u?`<span class="tag-warn">${u}</span>`:""}</li>`}).join(""),s=t.length>n.length?`<li class="muted">…还有 ${t.length-n.length} 道</li>`:"",o=t.map(sn).filter(Boolean).length;return`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${t.length} 道题</span>
      ${o?`<span class="tag tag-warn">${o} 道待确认</span>`:""}
      ${e?`<span class="muted small">${$(e)}</span>`:""}
    </div>
    <ul class="import-list">${a}${s}</ul>`}function sn(t){const e=(t.opts??[]).length,n=t.a;return(Array.isArray(n)?n.length>0:n!==""&&n!==null&&n!==void 0)?e===1?"只有 1 个选项":e>=2&&typeof n=="number"&&(n<0||n>=e)?"答案越界":"":"没识别到答案"}function Gt(t,e){return t==="json"?Ne(e):Vt(e)}async function Es(){const t=document.createElement("div");t.className="import",t.innerHTML=`
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
    <div class="import-preview" data-role="preview"></div>`;const e=t.querySelector('[data-role="drop"]'),n=t.querySelector('[data-role="file"]'),a=t.querySelector('[data-role="image"]'),s=t.querySelector('[data-role="text"]'),o=t.querySelector('[data-role="preview"]');let r=[],i="",l="",u=!1;const c=()=>{o.innerHTML=As(r,l||(i?"图片将由 AI 识别":""));const b=document.querySelector('[data-idx="1"]');b&&(b.textContent=r.length?`导入 ${r.length} 道题`:"AI 解析并导入")},p=(b,w,k)=>{s.value=b,r=Gt(w,b),l=k,c()},d=async()=>{const b=s.value.trim();if(!b&&!i)return[];h.info(i?"AI 正在识别图片…":"AI 正在解析文字…");const w=await L.ai.extract({...b?{prompt:b}:{},...i?{imageBase64:i}:{}});return Vt(w.result??"")},m=async b=>{const w=Qe(b);try{if(w==="image"){i=await an(b),r=[],l=`${b.name}（${Math.round(b.size/1024)}KB，AI 识别）`,c();try{r=await d(),r.length||h.error("这张图没读出题目，换张更清晰的试试")}catch(x){h.error(x instanceof T?x.message:"AI 识别失败")}c();return}if(w==="docx"){const x=await Kt(b);p(en(x),"docx",b.name);return}if(w==="pdf"){const x=await Kt(b);p(tn(x),"text",b.name);return}if(w==="unknown"){h.error("这种文件识别不了，换成 txt / json / docx / pdf / 图片试试");return}const k=await nn(b);p(k,w,b.name)}catch(k){h.error(k instanceof Error?k.message:"文件解析失败")}},g=async b=>{if(!b.length)return;if(b.length===1){await m(b[0]);return}const w=[],k=[];for(const x of b)try{const M=Qe(x);if(M==="image"){const W=await an(x),it=await L.ai.extract({imageBase64:W});w.push(...Vt(it.result??"")),k.push(x.name);continue}if(M==="docx"){w.push(...Gt("docx",en(await Kt(x)))),k.push(x.name);continue}if(M==="pdf"){w.push(...Gt("text",tn(await Kt(x)))),k.push(x.name);continue}if(M==="unknown"){h.error(`${x.name}：这种文件识别不了，先跳过`);continue}w.push(...Gt(M,await nn(x))),k.push(x.name)}catch(M){h.error(`${x.name} 没读出来：${M instanceof Error?M.message:"格式不对"}`)}r=w,i="",l=`${b.length} 个文件（${k.join("、")}）`,s.value="",c()};n.addEventListener("change",()=>{g([...n.files??[]])}),a.addEventListener("change",()=>{g([...a.files??[]])}),t.querySelector('[data-role="pick-file"]').addEventListener("click",b=>{b.stopPropagation(),n.click()}),t.querySelector('[data-role="pick-image"]').addEventListener("click",b=>{b.stopPropagation(),a.click()}),e.addEventListener("click",b=>{b.target.closest(".dz-btn")||n.click()});for(const b of["dragenter","dragover"])e.addEventListener(b,w=>{w.preventDefault(),e.classList.add("is-over")});for(const b of["dragleave","drop"])e.addEventListener(b,w=>{w.preventDefault(),e.classList.remove("is-over")});e.addEventListener("drop",b=>{const w=[...b.dataTransfer?.files??[]];g(w)}),s.addEventListener("paste",b=>{const k=[...b.clipboardData?.items??[]].find(M=>M.kind==="file"&&M.type.startsWith("image/"));if(!k)return;const x=k.getAsFile();x&&(b.preventDefault(),m(x))});let y=0;if(s.addEventListener("input",()=>{window.clearTimeout(y),y=window.setTimeout(()=>{r=Vt(s.value),i="",l="",c()},280)}),!(!await C({title:"导入题库",body:t,actions:[{label:"取消",value:!1},{label:"导入",value:!0,variant:"primary"}],onMount:()=>c()})||u))try{const b=r.length?r:await d();if(!b.length){h.error("没解析出题目，检查一下格式，或换张更清晰的图");return}u=!0;const w=await L.questions.add(b);F("bank"),nt(!0),h.ok(`已导入 ${w.added??b.length} 道题`)}catch(b){h.error(b instanceof T?b.message:"导入失败")}}const $e="#0a0c0f",lt="#8b9099",js="#ffffff",_t="#1440ff";function Ie(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function _e(t,e,n,a){const s=a?`<text x="${t/2}" y="${e-12}" text-anchor="middle" font-size="12.5" fill="${lt}" stroke="none">${Ie(a)}</text>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${e}" viewBox="0 0 ${t} ${e}" fill="none">
  <rect width="${t}" height="${e}" fill="${js}"/>
  <g stroke="${$e}" stroke-width="1.6" stroke-linecap="square" color="${$e}" font-family="system-ui,-apple-system,'Segoe UI',sans-serif">
  ${n}
  ${s}
  </g>
</svg>`}function Ls(t){const n=t.caption?210:186,a=Number(t.span)>0?Number(t.span):6,s=Number(t.value)>0?Number(t.value):20,o=44,r=316,i=96,l=(o+r)/2,u=t.load==="point"?"kN":"kN/m",c=t.load==="point"?`P = ${s} ${u}`:`q = ${s} ${u}`,p=[];if(t.load==="point")p.push(`<path d="M${l} 44 V${i-6}"/><path d="M${l-5} ${i-14} L${l} ${i-4} L${l+5} ${i-14}"/>`);else{for(let d=0;d<=8;d+=1){const m=o+(r-o)*d/8;p.push(`<path d="M${m} 56 V${i-10}"/><path d="M${m-4} ${i-18} L${m} ${i-9} L${m+4} ${i-18}"/>`)}p.push(`<path d="M${o} 56 H${r}"/>`)}return _e(360,n,`${p.join("")}
  <path d="M${o} ${i} H${r}"/>
  <path d="M${o} ${i} l-9 15 h18 z"/>
  <path d="M${r} ${i} l-9 15 h18 z">
  </path>
  <path d="M${o} ${i+15} H${r}" stroke="${lt}" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="${l}" y="46" text-anchor="middle" font-size="12" fill="${_t}" stroke="none">${Ie(c)}</text>
  <text x="${l}" y="${i+34}" text-anchor="middle" font-size="12" fill="${lt}" stroke="none">L = ${a} m</text>`,t.caption)}function Ts(t){const n=t.caption?220:196,a=Number(t.width)>0?Number(t.width):300,s=Number(t.height)>0?Number(t.height):500,o=132,r=92,i=(300-o)/2,l=62;return _e(300,n,`<text x="${300/2}" y="40" text-anchor="middle" font-size="12" fill="${_t}" stroke="none">截面示意图（单位 mm）</text>
  <rect x="${i}" y="${l}" width="${o}" height="${r}"/>
  <path d="M${i-12} ${l} H${i-12} V${l+r} H${i-12}" stroke="${lt}" stroke-width="1"/>
  <text x="${i-18}" y="${l+r/2}" text-anchor="middle" font-size="11" fill="${lt}" stroke="none" transform="rotate(-90 ${i-18} ${l+r/2})">h = ${s}</text>
  <text x="${300/2}" y="${l+r+22}" text-anchor="middle" font-size="11" fill="${lt}" stroke="none">b = ${a}</text>`,t.caption)}function Ms(t){const e=(t.steps??[]).filter(c=>c&&c.name).slice(0,6),n=360,s=74+Math.max(1,e.length)*30+(t.caption?22:6),o=Math.max(1,...e.map(c=>Number(c.start)+Number(c.duration))),r=92,i=n-24,l=(i-r)/o,u=e.map((c,p)=>{const d=62+p*30,m=r+Number(c.start)*l,g=Math.max(6,Number(c.duration)*l);return`<text x="${r-10}" y="${d+11}" text-anchor="end" font-size="11" fill="${$e}" stroke="none">${Ie(c.name)}</text>
  <rect x="${m}" y="${d}" width="${g}" height="14" fill="${_t}" opacity="0.12" stroke="${_t}" stroke-width="1"/>
  <text x="${m+g/2}" y="${d+11}" text-anchor="middle" font-size="10" fill="${_t}" stroke="none">${c.duration}</text>`}).join(`
  `);return _e(n,s,`<text x="${r}" y="38" font-size="11" fill="${lt}" stroke="none">施工进度（天）→</text>
  <path d="M${r} 48 H${i}" stroke="${lt}" stroke-width="1"/>
  ${u}`,t.caption)}function qs(t){if(!t||!t.kind)return"";let e="";return t.kind==="beam"?e=Ls(t):t.kind==="section"?e=Ts(t):t.kind==="flow"&&(e=Ms(t)),e?`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`:""}function Cs(t){if(!t||typeof t!="object")return null;const e=t,n=String(e.kind??e.type??"").toLowerCase();if(n!=="beam"&&n!=="section"&&n!=="flow")return null;const a=r=>{const i=Number(r);return Number.isFinite(i)&&i>0?i:void 0},s=String(e.load??"").toLowerCase(),o=Array.isArray(e.steps)?e.steps.map(r=>({name:String(r.name??r.title??""),start:Number(r.start??0),duration:Number(r.duration??0)})).filter(r=>r.duration>0):void 0;return{kind:n,caption:typeof e.caption=="string"?e.caption.slice(0,40):void 0,span:a(e.span),load:s==="point"?"point":s==="uniform"?"uniform":void 0,value:a(e.value),width:a(e.width),height:a(e.height),steps:o}}const Ns=[10,20,50,100,200,500,1e3],rn=20,Is=1e3,on=t=>new Promise(e=>setTimeout(e,t));function cn(t){return N(t).replace(/^【[^】]*】/,"").replace(/[\s，。、；：？！,.;:?!'"“”‘’()（）\[\]【】]/g,"").slice(0,40)}async function _s(){const t=f.bank??[],e=document.createElement("div");if(e.innerHTML=`
    <label class="field">
      <span class="field-label">想要什么题 <span class="muted small">（学科、题型、难度、考点，一句话说清楚）</span></span>
      <textarea class="textarea" data-role="ask" rows="4" placeholder="例如：初级会计的增值税计算题，难度中等
再如：高中生物光合作用的选择题，带解析
又如：英语四级词汇题，50 道四选一"></textarea>
    </label>
    <label class="field" style="margin-top:10px">
      <span class="field-label">数量</span>
      <select class="input" data-role="count">
        ${Ns.map(A=>`<option value="${A}"${A===50?" selected":""}>${A} 道</option>`).join("")}
      </select>
    </label>
    <p class="muted small" style="margin:10px 0 0">
      AI 会按你的描述出题，学科、题型、难度都由你说了算；没提到的部分按默认（单选、四选项、基础难度）。
      按每批 ${rn} 道分批生成，边生成边去重；生成完你可以先看前 12 道再决定是否入库。
      数量越多越慢（100 道约 1–2 分钟），中途可取消。
    </p>`,!await C({title:"AI 出题",body:e,actions:[{label:"取消",value:!1},{label:"开始生成",value:!0,variant:"primary"}]}))return;const a=e.querySelector('[data-role="ask"]')?.value.trim()??"";if(!a){h.error("先描述一下你想要什么题");return}const s=Math.min(Is,Math.max(1,Number(e.querySelector('[data-role="count"]')?.value)||20)),o=document.createElement("div");o.innerHTML=`
    <div class="gen-progress">
      <div class="gen-bar"><i data-role="bar" style="width:0%"></i></div>
      <div class="row" style="justify-content:space-between;margin-top:8px">
        <span class="muted small" data-role="line">准备中…</span>
        <span class="muted small" data-role="pct">0%</span>
      </div>
    </div>
    <div class="import-list gen-scroll" data-role="feed" style="margin-top:12px"></div>`;const r=()=>o.querySelector('[data-role="bar"]'),i=()=>o.querySelector('[data-role="line"]'),l=()=>o.querySelector('[data-role="pct"]'),u=()=>o.querySelector('[data-role="feed"]');let c=!1,p="";const d=(A,I,X="")=>{const wt=Math.min(100,Math.round(A/Math.max(1,I)*100));r().style.width=`${wt}%`,l().textContent=`${wt}%`,i().textContent=`已生成 ${A} / ${I} 道${X?` · ${X}`:""}`},m=A=>{const I=document.createElement("div");I.className="import-item gen-item";const X=N(A.q).replace(/\s+/g," ").slice(0,56);for(I.innerHTML=`<div class="gen-row"><span class="gen-text">${$(X)}</span></div>`,u().prepend(I);u().childElementCount>12;)u().lastElementChild?.remove()};C({title:"正在生成",body:o,dismissible:!1,onMount:A=>{const I=document.createElement("button");I.className="btn btn-block",I.textContent="取消生成",I.addEventListener("click",()=>{c=!0,I.textContent="正在停止…"}),A.append(I)},actions:[]});const g=new Set(t.map(A=>cn(A.q??""))),y=[];let j=0,b=0,w=0,k=0,x=0;const M=2,W=async A=>{if(c||y.length>=s)return;const I=Math.min(rn,s-y.length),X=[...y.slice(-6),...t.slice(0,6)].map(R=>`· ${N(R.q).slice(0,40)}`),wt=[`出题需求：${a}`,`本批数量：${I} 道`,A?`这是第 ${A+1} 批，请换一批考点，不要重复前面出过的题。`:"",X.length?`不要与这些题相同或近似：
${X.join(`
`)}`:""].filter(Boolean).join(`
`);let Lt=[];try{const R=await L.ai.generate(wt);Lt=Ne(R.result??""),w=0}catch(R){w+=1;const xt=R instanceof T?R.message:"网络异常";p=xt,/次数|配额|429/.test(xt)&&(c=!0);return}if(!Lt.length){w+=1,w>=3&&(p="模型没有返回可用题目，先停在这里");return}const ua=y.length;for(const R of Lt){if(y.length>=s)break;const xt=cn(R.q);if(!xt||g.has(xt)){b+=1;continue}g.add(xt);const ze=Cs(R.figure),Be=qs(ze);if(Be){j+=1;const pa=(ze?.caption??"示意图").replace(/"/g,"");y.push({...R,q:`${R.q}
<img src="${Be}" alt="${pa}">`})}else y.push(R);m(R)}k=y.length>ua?0:k+1,k>=3&&(c=!0,p="模型开始重复出同一批题，先停在这里"),d(y.length,s,b?`去重 ${b} 道`:"")},it=async()=>{for(;!c&&y.length<s;){const A=x;x+=1,await W(A),await on(60)}};if(await Promise.all(Array.from({length:M},()=>it())),ee(),await on(180),!y.length){h.error(p||"一道题也没生成出来，换个提示再试");return}const pt=document.createElement("div");if(pt.innerHTML=`
    <div class="muted small" style="margin-bottom:8px">
      共 ${y.length} 道${j?`（${j} 道带示意图）`:""}${b?`，自动去重 ${b} 道`:""}${p?` · 提前结束：${$(p)}`:""}，确认后写入题库（科目由 AI 按题目内容归类）
    </div>
    <div class="import-list gen-scroll">
      ${y.slice(0,12).map((A,I)=>{const X=/<img\b[^>]*src="([^"]+)"/i.exec(String(A.q??"")),wt=X?`<img class="gen-thumb" src="${X[1]}" alt="示意图">`:"",Lt=N(A.q).replace(/\s+/g," ").slice(0,64);return`<div class="import-item gen-item"><div class="gen-row">${wt}<span class="gen-text"><b>${I+1}.</b> ${$(Lt)}${Array.isArray(A.opts)&&A.opts.length?` <span class="muted">· ${A.opts.length} 选项</span>`:""}</span></div></div>`}).join("")}
      ${y.length>12?`<div class="muted small" style="padding:8px 2px">还有 ${y.length-12} 道未展示…</div>`:""}
    </div>`,!await C({title:"确认导入",body:pt,actions:[{label:"不要了",value:!1},{label:`导入 ${y.length} 道`,value:!0,variant:"primary"}]}))return;const yt=y.map(A=>({...A,subject:A.subject||"默认题库",chapter:A.chapter||""}));let $t=0;try{for(let A=0;A<yt.length;A+=20){const I=yt.slice(A,A+20);await L.questions.add(I),$t+=I.length,h.info(`已写入 ${$t} / ${yt.length} 道`)}F("bank"),nt(!0),h.ok(`已导入 ${$t} 道题`)}catch(A){h.error(A instanceof T?A.message:`导入中断，已写入 ${$t} 道`),F("bank")}}const Ds=`
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
`;function Mt(t){return String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]??e)}function ln(t,e={}){if(!t.length){h.info("没有可导出的题目");return}const n=e.title||"练习试卷",a=new Date().toLocaleDateString("zh-CN"),s=e.answers!==!1,o=t.map((u,c)=>{const p=J(u),d=(u.opts??[]).map((m,g)=>{const y=m.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return`<li><span class="k">${String.fromCharCode(65+g)}</span>${P(y)}</li>`}).join("");return`<article class="q">
        <div class="q-no">${String(c+1).padStart(2,"0")} · ${vt[p]}${u.chapter?` · ${Mt(u.chapter)}`:""}</div>
        <div class="q-body">${P(u.q)}</div>
        ${d?`<ul class="q-opts">${d}</ul>`:'<p class="q-tag">（简答题，请在答题纸上作答）</p>'}
      </article>`}).join(""),r=s?`<section class="answer-key">
        <h2>参考答案</h2>
        <ol>${t.map((u,c)=>`<li><span class="k">${String(c+1).padStart(2,"0")}</span>${Mt(G(u.a,u.opts??[]))}</li>`).join("")}</ol>
      </section>`:"",i=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${Mt(n)} · ${a}</title>
<style>${Ds}</style></head>
<body>
  <header class="sheet-head">
    <div class="sheet-kicker">基准 DATUM / Practice Sheet</div>
    <h1 class="sheet-title">${Mt(n)}</h1>
    <div class="sheet-meta">${a} · 共 ${t.length} 题${e.subtitle?" · "+Mt(e.subtitle):""} · 姓名 __________ 得分 ______</div>
  </header>
  ${o}
  ${r}
  <p class="tips">由「基准」导出 · 打印对话框里选择「另存为 PDF」即可保存。</p>
</body></html>`,l=window.open("","_blank");if(!l){h.error("浏览器拦住了新窗口，请允许弹出窗口后重试");return}l.document.open(),l.document.write(i),l.document.close(),l.focus(),h.ok(`已生成 ${t.length} 题的打印版，在打印里选「另存为 PDF」`)}const On=914400,Ps=6.4*On,Os=4.2*On,Rs=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function Rn(t,e={}){return`<w:r><w:rPr>${['<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>',e.bold?"<w:b/>":"",e.italic?"<w:i/>":"",`<w:sz w:val="${e.size??21}"/><w:szCs w:val="${e.size??21}"/>`,e.color?`<w:color w:val="${e.color}"/>`:""].join("")}</w:rPr><w:t xml:space="preserve">${Rs(t)}</w:t></w:r>`}function Z(t,e={}){const n=e.before||e.after?`<w:spacing w:before="${e.before??0}" w:after="${e.after??0}"/>`:"",a=e.indent||e.hanging?`<w:ind w:left="${e.indent??0}" w:hanging="${e.hanging??0}"/>`:"";return`<w:p><w:pPr>${n}${a}</w:pPr>${t?Rn(t,e):""}</w:p>`}function Hs(t,e,n,a){return`<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${Math.round(n)}" cy="${Math.round(a)}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${e}" name="Picture ${e}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${e}" name="image${e}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${t}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${Math.round(n)}" cy="${Math.round(a)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`}function Us(t){return new Promise(e=>{const n=new Image;n.onload=()=>e({w:n.naturalWidth||640,h:n.naturalHeight||480}),n.onerror=()=>e(null),n.src=t})}function zs(t){const e=/^data:image\/([a-zA-Z+]+);base64,(.+)$/.exec(t);if(!e)return null;try{const n=atob(e[2]),a=new Uint8Array(n.length);for(let o=0;o<n.length;o+=1)a[o]=n.charCodeAt(o);const s=e[1].toLowerCase()==="jpeg"?"jpeg":e[1].toLowerCase();return{bytes:a,ext:s}}catch{return null}}function Bs(t){const e=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html"),n=[],a=s=>{if(s.nodeType===Node.TEXT_NODE){const r=s.textContent??"";r.trim()&&n.push({kind:"text",value:r.replace(/\s+/g," ")});return}if(s.nodeType!==Node.ELEMENT_NODE)return;const o=s;if(o.tagName==="IMG"){n.push({kind:"img",value:o.getAttribute("src")??""});return}if(o.tagName==="BR"){n.push({kind:"br",value:""});return}o.childNodes.forEach(a)};return e.body.firstElementChild?.childNodes.forEach(a),n}async function Fs(t,e){const n=[],a=[];let s=0;n.push(Z(e.title??"题库练习卷",{size:32,bold:!0,after:80}));const o=[e.subtitle??"",`${t.length} 题`,"姓名 ________","得分 ________"].filter(Boolean).join("　　");n.push(Z(o,{size:18,color:"666666",after:200}));for(let d=0;d<t.length;d+=1){const m=t[d],g=J(m),y=String(d+1).padStart(2,"0");n.push(Z(`${y}　${vt[g]}${m.chapter?"　·　"+m.chapter:""}`,{size:18,bold:!0,color:"1440FF",before:200,after:60}));const j=Bs(m.q);let b="";const w=()=>{b.trim()&&n.push(Z(b.trim(),{after:60})),b=""};for(const k of j)if(k.kind==="text")b+=k.value;else if(k.kind==="br")w();else{w();const x=zs(k.value);if(!x)continue;const W=await Us(k.value)??{w:640,h:480};let it=W.w*9525,pt=W.h*9525;const se=Math.min(Ps/it,Os/pt,1);it*=se,pt*=se,s+=1;const yt=`rId${100+s}`,$t=`image${s}.${x.ext}`;a.push({relId:yt,name:$t,bytes:x.bytes,cx:it,cy:pt,id:s}),n.push(Hs(yt,s,it,pt))}if(w(),Array.isArray(m.opts)&&m.opts.length)m.opts.forEach((k,x)=>{const M=String.fromCharCode(65+x),W=String(k).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");n.push(Z(`${M}. ${W}`,{size:20,hanging:280,indent:280,after:20}))});else if(g==="blank")n.push(Z("答：________________________________",{after:40}));else if(g==="essay"){for(let k=0;k<3;k+=1)n.push(Z("　",{after:60}));n.push(Z("（请在答题纸上作答）",{size:18,color:"999999",after:40}))}}e.withAnswers!==!1&&(n.push(`<w:p><w:pPr><w:pageBreakBefore/></w:pPr>${Rn("参考答案",{size:28,bold:!0})}</w:p>`),t.forEach((d,m)=>{const g=String(m+1).padStart(2,"0");n.push(Z(`${g}　${G(d.a,d.opts)||"（无）"}`,{size:20,after:40}))}));const r=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>${n.join("")}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="851" w:footer="992" w:gutter="0"/></w:sectPr></w:body></w:document>`,i='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',l='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',u='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+a.map(d=>`<Relationship Id="${d.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${d.name}"/>`).join("")+"</Relationships>",c={"[Content_Types].xml":zt(i),"_rels/.rels":zt(l),"word/document.xml":zt(r),"word/_rels/document.xml.rels":zt(u)};for(const d of a)c[`word/media/${d.name}`]=d.bytes;const p=ya(c,{level:6});return new Blob([p],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})}async function dn(t,e={}){if(!t.length){h.error("没有可导出的题目");return}try{const n=await Fs(t,e),a=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,10);s.href=a,s.download=`${(e.title??"题库试卷").replace(/[\\/:*?"<>|]/g,"-")}-${o}.docx`,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(a),4e3),h.ok(`已导出 ${t.length} 题的 Word 文档`)}catch(n){h.error(n instanceof Error?`导出失败：${n.message}`:"导出失败")}}function Ws(t){const e=t.replace(/```json/gi,"```").trim(),n=/```([\s\S]*?)```/.exec(e)?.[1]??e,a=n.indexOf("{"),s=n.lastIndexOf("}");return a===-1||s<=a?"{}":n.slice(a,s+1)}const ct=20,v={search:"",subject:"all",type:"all",edit:!1,page:0,selected:new Set};function Hn(){v.search="",v.subject="all",v.type="all",v.edit=!1,v.page=0,v.selected.clear()}function K(){return f.bank??[]}function Ks(){return["all",...Array.from(new Set(K().map(t=>t.subject||"默认题库")))]}function Nt(){const t=v.search.trim().toLowerCase();return K().filter(e=>v.subject!=="all"&&(e.subject||"默认题库")!==v.subject||v.type!=="all"&&J(e)!==v.type?!1:t?N(e.q).toLowerCase().includes(t)||e.opts.some(n=>N(n).toLowerCase().includes(t)):!0)}function Un(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(n=>String.fromCharCode(65+n)).join(" / ")}function Gs(){const t=Nt(),e=Math.max(1,Math.ceil(t.length/ct));v.page>e-1&&(v.page=e-1),v.page<0&&(v.page=0);const n=t.slice(v.page*ct,v.page*ct+ct),a=new Map;K().forEach(c=>{const p=c.subject||"默认题库";a.set(p,(a.get(p)??0)+1)});const s=Ks().map(c=>`<button class="chip" data-act="subject" data-subject="${$(c)}" aria-pressed="${v.subject===c}">
          ${c==="all"?"全部":$(c)} <span class="chip-n">${c==="all"?K().length:a.get(c)??0}</span>
        </button>`).join(""),o=K().filter(c=>v.subject==="all"||(c.subject||"默认题库")===v.subject),r={single:0,multi:0,judge:0,blank:0,essay:0};o.forEach(c=>{r[J(c)]+=1});const i=[["all","全部",o.length],["single","单选",r.single],["multi","多选",r.multi],["judge","判断",r.judge],["blank","填空",r.blank],["essay","简答",r.essay]].filter(([c,,p])=>c==="all"||p>0).map(([c,p,d])=>`<button class="chip" data-act="type" data-type="${c}" aria-pressed="${v.type===c}">${p} <span class="chip-n">${d}</span></button>`).join(""),l=n.map((c,p)=>{const d=J(c),m=String(v.page*ct+p+1).padStart(2,"0");return`<tr class="q-row ${v.edit?"selectable":"is-clickable"}" data-id="${c.id}" ${v.edit?"":'data-act="peek"'}>
        <td class="c-no">${v.edit?`<button class="checkbox" data-act="select" data-id="${c.id}" aria-pressed="${v.selected.has(c.id)}">✓</button>`:m}</td>
        <td class="c-q">
          <div class="q-cell">${_n(P(c.q),v.search)}</div>
          ${c.opts.length?`<div class="q-sub">${c.opts.length} 个选项</div>`:""}
        </td>
        <td class="c-type"><span class="tag tag-type">${vt[d]}</span></td>
        <td class="c-chapter muted">${$(c.chapter||"—")}</td>
        <td class="c-ans"><span class="tag tag-ok">${$(Un(c))}</span></td>
        <td class="c-act"><button class="icon-btn sm" data-act="edit" data-id="${c.id}" aria-label="编辑">✎</button></td>
      </tr>`}).join(""),u=f.loading.bank&&!f.bank?`<div class="list">${Array.from({length:5}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div></div>').join("")}</div>`:t.length?`<div class="table-wrap">
          <table class="q-table">
            <thead><tr>
              <th class="c-no">NO</th><th class="c-q">题干</th><th class="c-type">题型</th>
              <th class="c-chapter">章节</th><th class="c-ans">答案</th><th class="c-act"></th>
            </tr></thead>
            <tbody>${l}</tbody>
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
    <div class="chips">${s}</div>
    <div class="chips chips-type">${i}</div>
    ${v.edit?`<div class="row between" style="margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <div class="btn-row" style="gap:8px;flex-wrap:wrap">
          <button class="btn btn-sm btn-ghost" data-act="select-all">全选本页</button>
          <button class="btn btn-sm btn-ghost" data-act="select-filtered">全选筛选（${t.length} 题）</button>
          ${v.subject!=="all"?`<button class="btn btn-sm btn-danger" data-act="delete-subject">删除本学科全部（${o.length} 题）</button>`:""}
        </div>
        <div class="btn-row" style="gap:8px;flex-wrap:wrap">
          <span class="muted small" style="align-self:center">已选 ${v.selected.size} 题</span>
          <button class="btn btn-sm" data-act="export" ${v.selected.size?"":"disabled"}>导出 JSON</button>
          <button class="btn btn-sm" data-act="print-selected" ${v.selected.size?"":"disabled"}>导出试卷</button>
          <button class="btn btn-sm" data-act="docx-selected" ${v.selected.size?"":"disabled"}>导出 Word</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${v.selected.size?"":"disabled"}>删除选中</button>
        </div>
      </div>`:""}
    ${u}`}async function we(t){const e=!t,n={editor:null},a=document.createElement("div");if(a.innerHTML=`
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
        ${ss.map(d=>`<option value="${d.value}"${(t?.type??"")===d.value?" selected":""}>${d.label}</option>`).join("")}
      </select>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>
      <input class="input" data-role="a" value="${$(t?typeof t.a=="string"?t.a:Un(t):"")}" placeholder="A">
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
    </div>`,!await C({title:e?"添加题目":"编辑题目",body:a,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:d=>{const m=d.querySelector('[data-role="q-host"]');m&&(n.editor=us({value:t?.q??"",placeholder:"输入题干；可用工具栏插图、写公式（$…$）",minHeight:110}),m.appendChild(n.editor.el));const g=d.querySelector('[data-role="gen-explain"]');g?.addEventListener("click",async()=>{const j=N(n.editor?.getValue()??"").trim(),b=d.querySelector('[data-role="opts"]')?.value??"",w=d.querySelector('[data-role="a"]')?.value??"";if(!j){h.error("先写题干，AI 才能写解析");return}const k=d.querySelector('[data-role="explain"]'),x=g.textContent??"";g.disabled=!0,g.textContent="生成中…";try{const M=await L.ai.explain(`题目：${j}
选项：${b.split(`
`).join("；")}
正确答案：${w}`);k&&(k.value=(M.result??"").trim()),h.ok("解析已生成，可再手动润色")}catch(M){h.error(M instanceof T?M.message:"生成失败")}finally{g.disabled=!1,g.textContent=x}});const y=d.querySelector('[data-role="classify"]');y&&y.addEventListener("click",async()=>{const j=N(n.editor?.getValue()??"").trim();if(!j){h.error("先写题干，AI 才能判断归类");return}const b=d.querySelector('[data-role="opts"]')?.value??"",w=y.textContent??"";y.disabled=!0,y.textContent="归类中…";try{const k=await L.ai.classify(`题目：${j}
选项：${b.split(`
`).join("；")}`),x=JSON.parse(Ws(k.result??"{}")),M=d.querySelector('[data-role="subject"]'),W=d.querySelector('[data-role="chapter"]');x.subject&&M&&(M.value=String(x.subject).slice(0,24)),x.chapter&&W&&(W.value=String(x.chapter).slice(0,24)),h.ok("已根据题目填入题库与章节")}catch{h.error("AI 归类失败，可手动填写")}finally{y.disabled=!1,y.textContent=w}})}}))return;const o=d=>a.querySelector(`[data-role="${d}"]`).value,r=(n.editor?.getValue()??"").trim();if(!N(r).trim()&&!/<img/i.test(r)){h.error("题干不能为空");return}const i=o("opts").split(`
`).map(d=>d.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),l=o("a").trim();let u="";if(i.length){const m=l.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(g=>g.charCodeAt(0)-65).filter(g=>g>=0&&g<i.length);if(!m.length){h.error("答案请填选项字母，如 A 或 A,B");return}u=m.length===1?m[0]:m}else u=l;const c=a.querySelector('[data-role="type"]'),p={q:r,opts:i,a:u,chapter:o("chapter").trim(),subject:o("subject").trim()||"默认题库",explain:o("explain").trim(),type:c?.value??""};try{if(e)await L.questions.add([p]);else try{await L.questions.update(t.id,p,{baseUpdatedAt:t.updated_at})}catch(d){if(d instanceof T&&d.status===409){if(!await at({title:"这道题在别处被改过",message:"另一台设备保存了这题的更新版本。要用你现在的内容覆盖它吗？",okText:"覆盖",danger:!0}))return;await L.questions.update(t.id,p,{force:!0})}else throw d}F("bank"),nt(!0),h.ok(e?"题目已添加":"题目已保存")}catch(d){h.error(d instanceof T?d.message:"保存失败")}}async function Js(){await Es()}function Xs(){const t=K().filter(s=>v.selected.has(s.id)).map(s=>({q:s.q,opts:s.opts,a:s.a,chapter:s.chapter,subject:s.subject,type:s.type,explain:s.explain}));if(!t.length){h.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=`题库-${t.length}题.json`,a.click(),URL.revokeObjectURL(n),h.ok(`已导出 ${t.length} 题`)}async function Vs(){await nt()}async function Ys(t,e){switch(t){case"subject":return v.subject=e.dataset.subject??"all",!0;case"toggle-edit":return v.edit=!v.edit,v.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return v.selected.has(n)?v.selected.delete(n):v.selected.add(n),!0}case"add":return await we(),!0;case"edit":{const n=K().find(a=>a.id===Number(e.dataset.id));return n&&await we(n),!0}case"delete-selected":{const n=[...v.selected];if(!n.length||!await at({title:"删除题目",message:`确定删除选中的 ${n.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await L.questions.remove(n),f.bank=f.bank?.filter(a=>!n.includes(a.id))??null,v.selected.clear(),F("bank"),nt(!0),h.ok(`已删除 ${n.length} 道题`)}catch(a){h.error(a instanceof T?a.message:"删除失败")}return!0}case"delete-subject":{if(v.subject==="all")return!0;const a=K().filter(s=>(s.subject||"默认题库")===v.subject).map(s=>s.id);if(!a.length)return h.info("这个学科下没有题目"),!0;if(!await at({title:"删除本学科全部题目",message:`确定删除「${v.subject}」的全部 ${a.length} 道题？此操作不可恢复。`,danger:!0,okText:"全部删除"}))return!0;try{const s=v.subject;await L.questions.remove(a),f.bank=f.bank?.filter(o=>!a.includes(o.id))??null,v.selected.clear(),v.subject="all",F("bank"),nt(!0),h.ok(`已删除「${s}」的 ${a.length} 道题`)}catch(s){h.error(s instanceof T?s.message:"删除失败")}return!0}case"export":return Xs(),!0;case"print":return ln(Nt(),{title:`题库 · ${v.subject==="all"?"全部":v.subject}`}),!0;case"docx":return await dn(Nt(),{title:`题库 · ${v.subject==="all"?"全部":v.subject}`,subtitle:"基准"}),!0;case"docx-selected":return await dn(K().filter(n=>v.selected.has(n.id)),{title:"选中题目 · 试卷",subtitle:"基准"}),!0;case"print-selected":return ln(K().filter(n=>v.selected.has(n.id)),{title:"选中题目 · 试卷"}),!0;case"page-prev":return v.page=Math.max(0,v.page-1),!0;case"page-next":return v.page+=1,!0;case"select-all":{const n=Nt().slice(v.page*ct,v.page*ct+ct),a=n.every(s=>v.selected.has(s.id));return n.forEach(s=>a?v.selected.delete(s.id):v.selected.add(s.id)),!0}case"select-filtered":{const n=Nt().map(s=>s.id),a=n.length>0&&n.every(s=>v.selected.has(s));return n.forEach(s=>a?v.selected.delete(s):v.selected.add(s)),!0}case"generate":return await _s(),!0;case"import":return await Js(),!0;case"type":{const n=e.dataset.type;return n&&(v.type=n,v.page=0),!0}case"peek":{const n=Number(e.dataset.id),a=K().find(s=>s.id===n);return a&&await Qs(a),!0}case"search":return!0;default:return!1}}async function Qs(t){const e=J(t),n=document.createElement("div");n.className="peek",n.innerHTML=`
    <div class="peek-meta">
      <span class="tag tag-type">${vt[e]}</span>
      ${t.subject?`<span class="tag">${$(t.subject)}</span>`:""}
      ${t.chapter?`<span class="tag">${$(t.chapter)}</span>`:""}
    </div>
    <div class="peek-q q-text">${P(t.q)}</div>
    ${t.opts.length?`<ul class="peek-opts">${t.opts.map((s,o)=>`<li class="${(Array.isArray(t.a)?t.a.includes(o):t.a===o)?"is-hit":""}"><b>${String.fromCharCode(65+o)}</b>${P(String(s).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</li>`).join("")}</ul>`:""}
    <div class="peek-ans"><span class="muted">答案</span> ${$(G(t.a,t.opts)||"（无）")}</div>`,await C({title:"题目预览",body:n,actions:[{label:"关闭",value:"close"},{label:"编辑这题",value:"edit",variant:"primary"}]})==="edit"&&await we(t)}function Zs(t){return t.dataset.role==="search"?(v.search=t.value,v.page=0,!0):!1}const tr="modulepreload",er=function(t){return"/"+t},un={},nr=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let r=function(u){return Promise.all(u.map(c=>Promise.resolve(c).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=i?.nonce||i?.getAttribute("nonce");s=r(n.map(u=>{if(u=er(u),u in un)return;un[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":tr,c||(d.as="script"),d.crossOrigin="",d.href=u,l&&d.setAttribute("nonce",l),document.head.appendChild(d),c)return new Promise((m,g)=>{d.addEventListener("load",m),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return s.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function zn(t){return new Promise(e=>window.setTimeout(e,t))}function ar(t,e,n=620,a="%"){const s=performance.now(),o=r=>{const i=Math.min((r-s)/n,1),l=1-Math.pow(1-i,3);t.innerHTML=`${Math.round(e*l)}<span>${a}</span>`,i<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}function Yt(t=12){O.vibration&&navigator.vibrate?.(t)}const Bn="oq:log",sr=4e3;function Fn(){try{const t=localStorage.getItem(Bn),e=t?JSON.parse(t):[];return Array.isArray(e)?e:[]}catch{return[]}}function Wn(t){try{localStorage.setItem(Bn,JSON.stringify(t.slice(-sr)))}catch{}}function rr(t,e){const n=Fn();n.push({ts:Date.now(),type:t,ok:e}),Wn(n)}const or=t=>String(t).padStart(2,"0");function Kn(){const t=Fn(),e=new Date().toDateString(),n=new Map,a=new Map;let s=0,o=0,r=0,i=0;for(const m of t){const g=new Date(m.ts);s+=1,m.ok&&(o+=1),g.toDateString()===e&&(r+=1,m.ok&&(i+=1));const y=n.get(m.type)??{n:0,ok:0};y.n+=1,m.ok&&(y.ok+=1),n.set(m.type,y);const j=`${g.getFullYear()}-${g.getMonth()+1}-${or(g.getDate())}`,b=a.get(j)??{n:0,ok:0,ts:g.setHours(0,0,0,0)};b.n+=1,m.ok&&(b.ok+=1),a.set(j,b)}const l=[...n.entries()].map(([m,g])=>({type:m,n:g.n,ok:g.ok,rate:g.n?g.ok/g.n:0})).sort((m,g)=>g.n-m.n),u=[...a.entries()].sort((m,g)=>m[1].ts-g[1].ts).map(([m,g])=>({label:m.slice(5),n:g.n,ok:g.ok})),c=new Set(t.map(m=>new Date(m.ts).toDateString()));let p=0;const d=new Date;for(c.has(d.toDateString())||d.setDate(d.getDate()-1);c.has(d.toDateString());)p+=1,d.setDate(d.getDate()-1);return{total:s,ok:o,rate:s?o/s:0,today:{n:r,ok:i,rate:r?i/r:0},byType:l,days:u,days7:u.slice(-7),streak:p}}function ir(){Wn([])}let E=null,Dt=null;function jt(){return E?E.options.questions[E.idx]??null:null}function ne(t){const e=E;let n=e.records.get(t.id);return n||(n={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,n)),n}function Gn(){const t=E;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function cr(){const t=E;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function U(t){const e=J(t);return e==="blank"||e==="essay"||e==="calc"||Sa(t.a)}function lr(t,e){if(U(t))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${$(e.text)}</textarea>
      </div>`;const n=Ht(t.a);return`<div class="opts" data-multi="${n.length>1}">${t.opts.map((s,o)=>{let r="";return e.submitted?n.includes(o)?r="correct":e.picked.includes(o)?r="wrong":r="muted":e.picked.includes(o)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${o}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+o)}</span>
        <span class="opt-text">${P(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function dr(t,e){if(!e.submitted)return"";const n=U(t)?String(t.a):G(t.a,t.opts),a=U(t)?N(e.text)||"（空）":G(e.picked.length?e.picked:[],t.opts)||"（未选）";if(U(t)){const i=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${E?.busy?"disabled":""}>✦ AI 阅卷</button>
          <button class="btn btn-sm" data-act="mark" data-ok="1">我答对了</button>
          <button class="btn btn-sm" data-act="mark" data-ok="0">没答对</button>
        </div>`:`<div class="essay-actions"><span class="tag ${e.correct?"tag-ok":"tag-bad"}">${e.correct?"已标记：答对":"已标记：答错"}</span></div>`;return`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${$(n)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${$(a)}
      <div class="divider"></div>
      ${i}
    </div>`}const s=(t.explain??"").trim(),o=e.correct===!0?"✅ 回答正确":e.correct===!1?"❌ 回答错误":"📖 正确答案",r=e.correct===void 0||e.correct===null?"":`<br>你的选择：${$(a)}`;return`<div class="answer-panel">
    <div class="ai-title">${o}</div>
    正确答案：${$(G(t.a,t.opts))}
    ${r}
    ${s?`<div class="divider"></div><div class="ai-title" style="color:var(--text-3)">解析</div><div class="explain-body">${P(s)}</div>`:""}
  </div>`}function ur(){const t=E,e=jt();if(!e)return"";const n=ne(e),a=t.options.questions.length,s=a?Math.round((t.idx+(n.submitted?1:0))/a*100):0,o=!U(e)&&Ht(e.a).length>1,r=ye(e.id),i=!!Le()[String(e.id)],l=[e.subject,e.chapter].filter(u=>!!u).map(u=>$(u)).join(" · ");return`
    <div class="quiz-top">
      <button class="text-btn" data-act="exit">退出</button>
      <div class="quiz-count">第 ${t.idx+1} 题<em> / ${a}</em></div>
      <div class="header-spacer"></div>
      <button class="text-btn" data-act="nav">答题卡</button>
    </div>
    <div class="quiz-progress"><i style="width:${s}%"></i></div>
    <div class="quiz-body">
      <div class="q-card">
        <div class="q-meta">
          <span class="q-type">${vt[J(e)]}</span>
        </div>
        <div class="q-text"><span class="q-no">第 ${t.idx+1} 题</span>${P(e.q)}</div>
        ${l?`<div class="q-sub">${l}</div>`:""}
        <div class="q-tools">
          <button class="q-tool" data-act="fav" data-on="${r}">${r?"已收藏":"收藏"}</button>
          <button class="q-tool" data-act="note" data-on="${i}">${i?"有笔记":"笔记"}</button>
          <button class="q-tool" data-act="ai">AI 解析</button>
        </div>
        ${lr(e,n)}
        ${dr(e,n)}
      </div>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${n.submitted?"":`<button class="btn" data-act="skip">${t.idx===a-1?"结束":"下一题"}</button>`}
      ${n.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===a-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${o||U(e)?"提交答案":"查看答案"}</button>`}
    </div>`}function Jn(t,e){E={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},z(),Dt=n=>{const a=E;if(!a)return;const s=n.target,o=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(n.key==="Escape"){if(document.querySelector(".modal-layer"))return;Oe();return}if(o)return;const r=jt();if(!r)return;const i=ne(r);if(n.key===" "||n.key==="Enter"){const u=a.root?.querySelector('[data-act="submit"]'),c=a.root?.querySelector('[data-act="next"]');u?(n.preventDefault(),Y("submit",u)):c&&(n.preventDefault(),Y("next",c));return}if(n.key==="ArrowRight"){n.preventDefault(),i.submitted?Ot():Y("submit",a.root.querySelector('[data-act="submit"]'));return}if(n.key==="ArrowLeft"){n.preventDefault(),Y("prev",a.root);return}const l=n.key.toLowerCase();if(/^[1-9]$/.test(l)||/^[a-h]$/.test(l)){const u=/^[1-9]$/.test(l)?Number(l)-1:l.charCodeAt(0)-97;if(u<r.opts.length){n.preventDefault();const c=a.root?.querySelector(`.opt[data-idx="${u}"]`);c&&Y("pick",c)}return}l==="s"?Y("fav",a.root):l==="n"?Y("note",a.root):l==="e"?Y("ai",a.root):l==="g"?Y("ai-grade",a.root):l==="?"&&nr(()=>Promise.resolve().then(()=>Fr),void 0).then(u=>u.openShortcuts())},document.addEventListener("keydown",Dt),t.addEventListener("submit",n=>n.preventDefault()),t.addEventListener("input",Vn)}function z(){const t=E;t?.root&&(t.root.innerHTML=ur(),pr(t.root))}function pr(t){const e=t.querySelector(".quiz-body"),n=t.querySelector(".q-card");if(!e||!n)return;let a=0,s=0,o=0,r=!1,i="none";const l=()=>{n.style.transition="transform .22s ease-out, opacity .22s ease-out",n.style.transform="",n.style.opacity=""};e.addEventListener("touchstart",c=>{c.touches.length===1&&(a=c.touches[0].clientX,s=c.touches[0].clientY,o=0,r=!0,i="none")},{passive:!0}),e.addEventListener("touchmove",c=>{if(!r||c.touches.length!==1)return;o=c.touches[0].clientX-a;const p=c.touches[0].clientY-s;if(i==="none"){if(Math.abs(o)<10&&Math.abs(p)<10)return;i=Math.abs(o)>Math.abs(p)*1.3?"x":"y",i==="x"&&(n.style.transition="none")}i==="x"&&(c.preventDefault(),n.style.transform=`translateX(${o*.5}px)`,n.style.opacity=String(1-Math.min(Math.abs(o)/640,.28)))},{passive:!1});const u=()=>{if(!r||(r=!1,i!=="x"))return;const c=b=>{b.stopPropagation(),b.preventDefault()};document.addEventListener("click",c,!0),setTimeout(()=>document.removeEventListener("click",c,!0),340);const p=E,d=p?.options.questions.length??0,m=n.offsetWidth||320,g=Math.min(90,m*.24),y=o<-g?1:o>g?-1:0,j=y>0?(p?.idx??0)<d-1:(p?.idx??0)>0;if(!y||!j){l();return}n.style.transition="transform .17s ease-out, opacity .17s ease-out",n.style.transform=`translateX(${y>0?-m:m}px)`,n.style.opacity="0",setTimeout(()=>{y>0?Ot():Xn()},168)};e.addEventListener("touchend",u,{passive:!0}),e.addEventListener("touchcancel",u,{passive:!0})}function Xn(){const t=E;!t||t.idx<=0||(t.idx-=1,t.textDraft="",z(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0}))}function Vn(t){const e=t.target;e?.dataset.role!=="essay"||!E||(E.textDraft=e.value)}async function de(t,e){const n=E;e.submitted=!0;const a=J(t);if(os(a))if(a==="blank"){const s=o=>String(o).replace(/[\s，。、；：""''（）()【】\[\]]/g,"").toLowerCase();e.correct=s(e.text??"")!==""&&s(e.text??"")===s(String(t.a??""))}else e.correct=null;else if(e.correct=xn(e.picked,t.a),e.correct){Yt(10);const s=fr();s>=3&&s%3===0&&h.ok(`连对 ${s} 题，保持住`)}else Yt([14,40,14]),De(t,e);Yn(t,e),z(),e.correct&&n.options.questions.length>n.idx+1&&(await zn(600),E&&E.idx===n.idx&&Ot())}function Yn(t,e){if(!e.submitted||e.correct===null||e.correct===void 0)return;const n=e;n.counted||(n.counted=!0,rr(J(t),e.correct===!0))}function fr(){const t=E;let e=0;for(let n=t.idx;n>=0;n-=1){const a=t.records.get(t.options.questions[n].id);if(a?.submitted)if(a.correct===!0)e+=1;else break}return e}async function De(t,e){try{await L.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:U(t)?e.text:e.picked}),F("wrong")}catch(n){n instanceof T&&n.status!==401&&h.error(`错题保存失败：${n.message}`)}}function Ot(){const t=E,e=t.options.questions.length;if(t.idx>=e-1){mr();return}t.idx+=1,t.textDraft="",z(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function Pe(){Dt&&document.removeEventListener("keydown",Dt),Dt=null,E?.root?.removeEventListener("input",Vn),E?.root?.replaceChildren(),E=null}async function Oe(){const t=E;if(!t)return;const e=Gn();if(!await at({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;jt()&&Qn();const s=t.options.onExit;Pe(),s?.()}function Qn(){const t=E;if(!t)return;t.options.source==="sequential"&&_a(t.idx);const e=t.options.questions.slice(0,5).map(n=>N(n.q).slice(0,40));Oa(e)}async function mr(){const t=E;Qn();const e=t.root,n=t.options.questions.length,a=Gn(),s=cr(),o=a-s,r=a?Math.round(s/a*100):0;if(Pe(),await C({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${s}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${o}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${a}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${n} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:l=>{const u=l.querySelector('[data-role="acc"]');u&&ar(u,r)}})==="retry"&&e){const l=t.options.source==="all"?te(t.options.questions):t.options.questions;Jn(e,{...t.options,questions:l,startIndex:0});return}t.options.onExit?.()}function gr(t,e,n){e.correct=n,e.submitted=!0,Yn(t,e),n?Yt(10):De(t,e),z(),n&&h.ok("已记为答对")}async function br(t,e){const n=E;if(n){n.busy=!0,z();try{const a=[`题目：${N(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${N(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await L.ai.grade(a),o=String(s.result||""),r=o.includes("得分")&&!o.includes("不得分");e.correct=r,r?Yt(10):De(t,e),h.ok(r?"AI 阅卷：答对":"AI 阅卷：答错")}catch(a){h.error(a instanceof T?a.message:"AI 阅卷失败，请稍后再试")}finally{n.busy=!1,z()}}}async function hr(){const t=jt();if(!t)return;const e=Le()[String(t.id)]??"",n=document.createElement("div");n.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${$(e)}</textarea>`;const a=n.querySelector("textarea");await C({title:"我的笔记",body:n,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>a.focus()})&&(Ia(t.id,a.value),h.ok("笔记已保存"),z())}async function vr(){const t=jt();if(!t)return;const e=ne(t),n=[`题目：${N(t.q)}`,t.opts.length?`选项：${t.opts.map((r,i)=>`${String.fromCharCode(65+i)}. ${N(r)}`).join("；")}`:"",`正确答案：${U(t)?t.a:G(t.a,t.opts)}`,e.submitted?`我的作答：${U(t)?e.text:G(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),a=document.createElement("div");a.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',C({title:"AI 深度解析",body:a,actions:[{label:"关闭",value:"close"}]});const s=a.querySelector('[data-role="text"]'),o=a.querySelector(".ai-title");try{let r="";const i=await L.ai.explainStream(n,u=>{r+=u,s.innerHTML=`${$(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),l=i.provider==="deepseek"?"DeepSeek":i.provider==="zhipu"?"智谱":"";o.textContent=r?`✦ AI 解析${l?` · ${l}`:""}${i.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=$(i.text||r).replace(/\n/g,"<br>"):await yr(s,i.text??""),s.classList.remove("cursor")}catch(r){const i=r instanceof T?r.message:"AI 解析失败，请稍后重试";h.error(i),o.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=i}}async function yr(t,e){for(let n=0;n<e.length;n+=2)t.innerHTML=$(e.slice(0,n+2)).replace(/\n/g,"<br>"),await zn(12)}function $r(){const t=E;if(!t)return;const e=t.options.questions.map((n,a)=>{const s=t.records.get(n.id),o=a===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${a}" data-state="${o}">${a+1}</button>`}).join("");C({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:n=>{n.querySelectorAll(".nav-cell").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.dataset.idx);!Number.isFinite(s)||!E||(E.idx=s,E.textDraft="",ee(),z())})})}}).then(n=>{n==="finish"&&Oe()})}async function Y(t,e){const n=E;if(!n)return!1;const a=jt();if(!a)return!1;const s=ne(a);switch(t){case"pick":{if(s.submitted)return!0;const o=Number(e.dataset.idx);return U(a)||(Ht(a.a).length>1?(s.picked=s.picked.includes(o)?s.picked.filter(i=>i!==o):[...s.picked,o],z()):(s.picked=[o],await de(a,s))),!0}case"submit":{if(U(a)){const o=n.root?.querySelector('[data-role="essay"]');if(s.text=o?.value??n.textDraft,!s.text.trim())return h.info("先写点什么再提交吧"),!0;await de(a,s)}else{if(!s.picked.length)return s.submitted=!0,z(),!0;await de(a,s)}return!0}case"ai-grade":return!U(a)||E?.busy||await br(a,s),!0;case"mark":return U(a)&&gr(a,s,e.dataset.ok==="1"),!0;case"next":return Ot(),!0;case"skip":return Ot(),!0;case"prev":return Xn(),!0;case"jump":return n.idx=Number(e.dataset.idx),n.textDraft="",ee(),z(),!0;case"nav":return $r(),!0;case"exit":return await Oe(),!0;case"fav":return await Za(a.id),z(),!0;case"note":return await hr(),!0;case"ai":return vr(),!0;default:return!1}}let tt=null;function wr(){return!!(tt&&document.body.contains(tt))}function bt(t){if(!t.questions.length){h.info("这里还没有题目");return}pn(),tt=document.createElement("div"),tt.className="quiz",document.body.appendChild(tt),document.body.classList.add("is-locked"),Jn(tt,{...t,onExit:()=>{pn(),t.onExit?.()}}),Da({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function pn(){tt&&(Pe(),tt.remove(),tt=null,document.body.classList.remove("is-locked"))}async function ue(t="random"){const e=f.bank??[];if(!e.length){h.info("题库还是空的，先去添加题目吧");return}const n=await ta(e);if(n===null)return;const a=n?e.filter(o=>(o.subject?.trim()||"默认题库")===n):e;if(t==="chapter"){const o=await Ar(a);if(!o?.length)return;const r=a.filter(l=>o.includes(l.chapter||"未分类")),i=await Qt(r.length);if(i===null)return;bt({questions:r.slice(0,i),source:"chapter",title:"章节练习"});return}const s=await Qt(a.length);if(s!==null){if(t==="sequential"){const o=Math.min(En(),Math.max(a.length-1,0));bt({questions:a.slice(0,s),source:"sequential",title:"顺序练习",startIndex:o<s?o:0});return}bt({questions:te(a).slice(0,s),source:"all",title:"随机练习"})}}async function xr(){const t=f.bank??[];if(!t.length){h.info("题库还是空的，先去添加题目吧");return}const e=await ta(t);if(e===null)return;const n=e?t.filter(a=>(a.subject?.trim()||"默认题库")===e):t;bt({questions:te(n),source:"all",title:`乱序练习 · ${n.length} 题${e?` · ${e}`:""}`})}async function Zn(){const t=f.wrong??await dt(!0);if(!t.length){h.info("错题本是空的，先去刷几题吧");return}const e=await Qt(t.length);if(e===null)return;const n=t.slice(0,e).map(a=>({id:a.id,q:a.q,opts:a.opts,a:a.a,chapter:a.chapter,subject:a.subject}));bt({questions:n,source:"wrong",title:"错题重练"})}function kr(t){if(!t.length){h.info("还没有收藏题目");return}Qt(t.length).then(e=>{e!==null&&bt({questions:te(t).slice(0,e),source:"fav",title:"收藏练习"})})}async function Sr(){const t=jn();if(!t)return h.info("没有可以继续的练习"),!1;const e=t.source==="wrong"?"wrong":t.source==="fav"?"fav":"bank";let n=f.bank??[];e==="wrong"?(f.wrong||await dt(!0),n=f.wrong??[]):e==="fav"&&(f.favs||await At(!0),n=f.favs??[]);const a=new Map(n.map(o=>[o.id,o])),s=t.ids.map(o=>a.get(o)).filter(o=>!!o);return s.length?(bt({questions:s,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,s.length-1)}),!0):(Ln(),h.info("上次的题目已经不在了"),!1)}function Qt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const n=document.createElement("div");n.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const a=n.querySelector('[data-role="count"]');return a.addEventListener("click",s=>{const o=s.target.closest("button[data-n]");o&&(a.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),o.setAttribute("aria-pressed","true"))}),C({title:"练多少题",body:n,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const o=a.querySelector('button[aria-pressed="true"]');return Number(o?.dataset.n??t)})}async function Ar(t){const e=new Map;t.forEach(r=>{const i=r.chapter?.trim()||"未分类";e.set(i,(e.get(i)??0)+1)});const n=[...e.entries()].sort((r,i)=>i[1]-r[1]);if(!n.length)return null;const a=document.createElement("div");if(a.innerHTML=`<div class="list">${n.map(([r,i],l)=>`
      <button class="item" data-chapter="${$(r)}" data-checked="${l===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${$(r)}</span><span class="tag">${i} 题</span></div>
      </button>`).join("")}</div>`,a.addEventListener("click",r=>{const i=r.target.closest("[data-chapter]");i&&(i.dataset.checked=i.dataset.checked==="true"?"false":"true")}),!await C({title:"选择章节",body:a,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const o=Array.from(a.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return o.length?o:null}async function ta(t){const e=new Map;t.forEach(i=>{const l=i.subject?.trim()||"默认题库";e.set(l,(e.get(l)??0)+1)});const n=[...e.entries()].sort((i,l)=>l[1]-i[1]);if(n.length<2)return"";const a=document.createElement("div");a.innerHTML=`
    <div class="chip-row" data-role="subject">
      <button type="button" class="chip is-on" data-sub="" aria-pressed="true">全部 · ${t.length}</button>
      ${n.map(([i,l])=>`<button type="button" class="chip" data-sub="${$(i)}" aria-pressed="false">${$(i)} · ${l}</button>`).join("")}
    </div>
    <p class="muted small" style="margin:12px 0 0">选科目后只会练这个科目下的题</p>`;const s=a.querySelector('[data-role="subject"]');return s.addEventListener("click",i=>{const l=i.target.closest("button[data-sub]");l&&(s.querySelectorAll("button").forEach(u=>{u.classList.remove("is-on"),u.setAttribute("aria-pressed","false")}),l.classList.add("is-on"),l.setAttribute("aria-pressed","true"))}),await C({title:"练哪个科目",body:a,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]})?s.querySelector("button.is-on")?.dataset.sub??"":null}const gt=new Set;function Er(){gt.clear()}function xe(){return f.favs??[]}function jr(){const t=xe(),e=f.loading.fav&&!f.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(n=>`
        <div class="item" data-id="${n.id}">
          <div class="item-q">${P(n.q)}</div>
          <div class="item-meta">
            ${n.subject?`<span class="tag tag-accent">${$(n.subject)}</span>`:""}
            ${n.chapter?`<span class="tag">${$(n.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${n.id}">${gt.has(n.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${n.id}">取消收藏</button>
          </div>
          ${gt.has(n.id)?`<div class="item-answer"><div class="right">${$(G(n.a,n.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function Lr(){await At()}async function Tr(t,e){switch(t){case"practice":return xe().length?(await kr(xe()),!0):(h.info("还没有收藏的题"),!0);case"reveal":{const n=Number(e.dataset.id);return gt.has(n)?gt.delete(n):gt.add(n),!0}case"remove":{const n=Number(e.dataset.id);try{await L.favorites.remove(n),gt.delete(n),F("fav"),await At(!0),h.ok("已取消收藏")}catch(a){h.error(a instanceof T?a.message:"操作失败")}return!0}default:return!1}}let D=null,Et=null,Pt=null;const Mr=t=>String.fromCharCode(65+t),qr=t=>typeof t.a=="number"||Array.isArray(t.a);function ea(t){const e=Math.max(0,Math.round(t/1e3)),n=Math.floor(e/60),a=e%60;return`${String(n).padStart(2,"0")}:${String(a).padStart(2,"0")}`}async function Cr(){const t=(f.bank??[]).filter(qr);if(t.length<3){h.error("题库里的客观题不足 3 道，先导入或手写几道再考");return}const e=document.createElement("div");if(e.innerHTML=`
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
    <p class="muted small" style="margin:12px 0 0">可选 ${t.length} 道客观题；考试中不显示对错。</p>`,!await C({title:"模拟考试",body:e,actions:[{label:"取消",value:!1},{label:"开始考试",value:!0,variant:"primary"}]}))return;const a=(i,l)=>{const u=e.querySelector(`[data-role="${i}"]`),c=Number(u?.value);return Number.isFinite(c)&&c>0?c:l},s=Math.min(t.length,a("count",Math.min(20,t.length))),o=Math.min(180,a("min",15));D={questions:[...t].sort(()=>Math.random()-.5).slice(0,s),picks:new Map,idx:0,endsAt:Date.now()+o*60*1e3,timer:window.setInterval(Ir,1e3),submitted:!1},Nr()}function Nr(){const t=document.getElementById("app-root")??document.body,e=document.createElement("div");e.className="exam",t.appendChild(e),Et=e,ae(),Pt=n=>{if(!(!D||document.querySelector(".modal-layer"))){if(n.key==="ArrowRight")n.preventDefault(),Zt(1);else if(n.key==="ArrowLeft")n.preventDefault(),Zt(-1);else if(/^[a-h1-8]$/i.test(n.key)){const a=/^\d$/.test(n.key)?Number(n.key)-1:n.key.toLowerCase().charCodeAt(0)-97;na(a)}}},document.addEventListener("keydown",Pt)}function Ir(){const t=D;if(!t||t.submitted)return;if(Date.now()>=t.endsAt){Re(!0);return}const e=Et?.querySelector(".exam-clock");if(e){const n=t.endsAt-Date.now();e.textContent=ea(n),e.classList.toggle("is-urgent",n<=6e4)}}function ae(){const t=D;if(!t||!Et)return;const e=t.questions[t.idx],n=t.picks.get(e.id)??[],a=t.endsAt-Date.now(),s=t.questions.filter(r=>(t.picks.get(r.id)??[]).length>0).length,o=Array.isArray(e.a)&&e.a.length>1;Et.innerHTML=`
    <div class="exam-bar">
      <button class="icon-btn" data-ex="exit" aria-label="退出">←</button>
      <div class="exam-progress">${t.idx+1} / ${t.questions.length} · 已答 ${s}</div>
      <span class="exam-clock ${a<=6e4?"is-urgent":""}">${ea(a)}</span>
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
        <div class="q-text">${P(e.q)}</div>
        <div class="opts">
          ${e.opts.map((r,i)=>`<button class="opt ${n.includes(i)?"is-picked":""}" data-ex="pick" data-idx="${i}">
                <span class="opt-key">${Mr(i)}</span>
                <span class="opt-text">${P(String(r).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
              </button>`).join("")}
        </div>
      </article>
    </div>
    <div class="exam-foot">
      <button class="btn" data-ex="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${t.idx===t.questions.length-1?"":'<button class="btn" data-ex="next">下一题</button>'}
      <button class="btn btn-primary" data-ex="submit">交卷</button>
    </div>`}function na(t){const e=D;if(!e)return;const n=e.questions[e.idx];if(t<0||t>=n.opts.length)return;const a=Array.isArray(n.a)&&n.a.length>1,s=e.picks.get(n.id)??[];a?e.picks.set(n.id,s.includes(t)?s.filter(o=>o!==t):[...s,t]):e.picks.set(n.id,[t]),ae()}function Zt(t){const e=D;if(!e)return;const n=e.idx+t;n<0||n>=e.questions.length||(e.idx=n,ae())}function _r(){const t=D;if(!t)return;const e=document.createElement("div");e.className="nav-grid",e.innerHTML=t.questions.map((n,a)=>`<button class="nav-cell ${(t.picks.get(n.id)??[]).length>0?"is-done":""} ${a===t.idx?"is-cur":""}" data-idx="${a}">${a+1}</button>`).join(""),e.addEventListener("click",n=>{const a=n.target.closest(".nav-cell");if(!a||!D)return;const s=Number(a.dataset.idx);Number.isFinite(s)&&(D.idx=s,document.querySelector(".modal-layer")?.remove(),ae())}),C({title:"答题卡",body:e,actions:[{label:"继续答题",value:"close"},{label:"交卷",value:"submit",variant:"primary"}]}).then(n=>{n==="submit"&&Re(!1)})}async function Re(t){const e=D;if(!e||e.submitted)return;const n=e.questions.filter(i=>(e.picks.get(i.id)??[]).length===0).length;if(!t&&n>0&&!await at({title:"还有题没答",message:`还有 ${n} 道没答，确定交卷？`,okText:"交卷"}))return;e.submitted=!0,window.clearInterval(e.timer);let a=0;const s=[];for(const i of e.questions){const l=e.picks.get(i.id)??[];l.length&&xn(l,i.a)?a+=1:s.push(i)}const o=Math.round(a/e.questions.length*100);for(const i of s)L.wrong.add({q:i.q,opts:i.opts,a:i.a,chapter:i.chapter,subject:i.subject,explain:i.explain,user_choice:e.picks.get(i.id)??[]}).catch(()=>{});const r=document.createElement("div");r.className="exam-result",r.innerHTML=`
    <div class="score-big">${o}<span>分</span></div>
    <div class="score-sub">答对 ${a} / ${e.questions.length} · ${t?"时间到自动交卷":"手动交卷"}</div>
    ${s.length?`<div class="wrong-list">${s.slice(0,8).map(i=>`<div class="wrong-item">
                <div class="wrong-q">${P(i.q)}</div>
                <div class="wrong-a">
                  <b class="bad">你选 ${G(e.picks.get(i.id)??[],i.opts)||"未答"}</b>
                  <span class="ok">正确 ${G(i.a,i.opts)}</span>
                </div>
              </div>`).join("")}${s.length>8?`<div class="muted small">…还有 ${s.length-8} 道已进错题本</div>`:""}</div>`:'<div class="all-right">全对，厉害</div>'}`,await C({title:"考试结果",body:r,actions:[{label:"知道了",value:"close",variant:"primary"}]}),aa()}function aa(){D&&window.clearInterval(D.timer),D=null,Pt&&document.removeEventListener("keydown",Pt),Pt=null,Et?.remove(),Et=null}function sa(t,e){if(!D)return!1;switch(t){case"pick":return na(Number(e.dataset.idx)),!0;case"prev":return Zt(-1),!0;case"next":return Zt(1),!0;case"sheet":return _r(),!0;case"submit":return Re(!1),!0;case"exit":return(async()=>await at({title:"退出考试",message:"退出后本次作答不保留，确定吗？",danger:!0,okText:"退出"})&&aa())(),!0;default:return!1}}function ra(){return!!D}function Dr(){const t=new Date,e=a=>String(a).padStart(2,"0"),n="日一二三四五六"[t.getDay()];return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())} · 周${n}`}const fn=t=>String(t).padStart(2,"0");function Pr(){const t=f.bank,e=f.wrong,n=f.favs,a=jn(),s=En(),o=!!(t&&!t.length),r=c=>c===void 0?"—":fn(c),i=Kn(),l=i.today.n,u=i.today.n?`${Math.round(i.today.rate*100)}%`:"—";return`
    <section class="masthead">
      <div class="mast-meta">
        <span>${Dr()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${f.user?`@${$(f.user)}`:"未登录"}</span>
      </div>
      <div class="today">
        <div class="today-head">
          <span class="today-num">${fn(l)}</span>
          <span class="today-unit">题 · 今日已练</span>
          <span class="today-side">${i.today.n?`正确率 <b>${u}</b>${i.streak>1?` · 连练 <b>${i.streak}</b> 天`:""}`:"今天还没开始"}</span>
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
    </div>`}async function Or(){Ha()||(Ua(),window.setTimeout(()=>h.info(ts()),320)),await Promise.allSettled([nt(),dt(),At()])}async function Rr(t,e){switch(t){case"goto":return Ut(e.dataset.tab??"bank"),!0;case"random":return await ue("random"),!0;case"sequential":return await ue("sequential"),!0;case"shuffle":return await xr(),!0;case"chapter":return await ue("chapter"),!0;case"wrong":return await Zn(),!0;case"resume":return Sr(),!0;case"exam":return await Cr(),!0;default:return!1}}const pe=8;function Hr(){const t=[],e=(n,a,s)=>{(n??[]).forEach(o=>t.push({id:o.id,q:o,source:a,tab:s}))};return e(f.bank,"题库","bank"),e(f.wrong,"错题","wrong"),e(f.favs,"收藏","fav"),t}function Ur(t,e){const n=e.toLowerCase();return n?N(t.q.q).toLowerCase().includes(n)||(t.q.opts??[]).some(a=>N(a).toLowerCase().includes(n))||N(t.q.chapter??"").toLowerCase().includes(n)||N(t.q.subject??"").toLowerCase().includes(n):!0}function mn(t=""){const e=document.createElement("div");e.className="search-panel",e.innerHTML=`
    <div class="search-box">
      <span class="ico">⌕</span>
      <input class="search-input" type="search" data-role="kw" placeholder="搜题干、选项、章节、题库…" value="${t.replace(/"/g,"&quot;")}">
    </div>
    <div class="search-results" data-role="hits"></div>
    <p class="muted small search-foot" data-role="foot"></p>`;const n=Hr(),a=e.querySelector('[data-role="hits"]'),s=e.querySelector('[data-role="foot"]'),o=e.querySelector('[data-role="kw"]'),r=()=>{const i=o.value.trim(),l=n.filter(p=>Ur(p,i));if(!i){const p=l.filter(d=>d.tab==="bank").slice(0,12);a.innerHTML=p.length?p.map(d=>`<button class="hit" data-act="open" data-tab="${d.tab}" data-id="${d.id}">
                <span class="hit-src">${d.source}</span>
                <span class="hit-q">${P(d.q.q)}</span>
              </button>`).join(""):'<p class="muted small">题库还是空的，先去导入吧。</p>',s.textContent=p.length?"输入关键词可以跨题库 / 错题 / 收藏一起搜":"";return}const u=p=>l.filter(d=>d.source===p),c=[];["题库","错题","收藏"].forEach(p=>{const d=u(p);d.length&&(c.push(`<div class="hit-group">${p} · ${d.length}</div>`),c.push(d.slice(0,pe).map(m=>{const g=J(m.q);return`<button class="hit" data-act="open" data-tab="${m.tab}" data-id="${m.id}">
              <span class="hit-src">${vt[g]}</span>
              <span class="hit-q">${_n(P(m.q.q),i)}</span>
            </button>`}).join("")),d.length>pe&&c.push(`<div class="hit-more muted small">还有 ${d.length-pe} 条，缩小关键词试试</div>`))}),a.innerHTML=c.length?c.join(""):`<p class="muted small">没有找到「${i}」</p>`,s.textContent=`共命中 ${l.length} 条`};o.addEventListener("input",r),C({title:"全局搜索",body:e,actions:[{label:"关闭",value:"close"}],onMount:i=>{r();const l=i.querySelector('[data-role="kw"]');l?.focus(),l?.setSelectionRange(l.value.length,l.value.length),i.addEventListener("click",u=>{const c=u.target.closest(".hit");if(!c)return;const p=c.dataset.tab??"bank",d=Number(c.dataset.id),m=n.find(g=>g.id===d&&g.tab===p);if(ee(),Ut(p),m){const g=N(m.q.q).slice(0,12);if(p==="bank"){const y=document.querySelector('.view input[data-role="search"]');y&&g&&(y.value=g,y.dispatchEvent(new Event("input",{bubbles:!0})))}}})}})}const He=[{keys:"1–4 / A–D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1–5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/ 或 Ctrl+K",desc:"全局搜索（题库 / 错题 / 收藏）",scope:"全局"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function Ue(){const t=He.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");C({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const zr=["home","bank","wrong","fav","me"];function Br(t){const e=t;if(!e)return!1;const n=e.tagName.toLowerCase();return n==="input"||n==="textarea"||n==="select"||e.isContentEditable}function oa(){document.addEventListener("keydown",t=>{if((t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"){if(document.querySelector(".quiz"))return;t.preventDefault(),mn();return}if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||Br(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),Ue();return}if(t.key==="/"){t.preventDefault(),mn();return}const n=Number(t.key);n>=1&&n<=5&&(t.preventDefault(),Ut(zr[n-1]))})}const Fr=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:He,installShortcuts:oa,openShortcuts:Ue},Symbol.toStringTag,{value:"Module"})),Wr=`<svg viewBox="0 0 100 100" width="30" height="30" aria-hidden="true" focusable="false">
  <rect x="18.5" y="18.5" width="63" height="63" fill="none" stroke="currentColor" stroke-width="4.2" />
  <circle cx="50" cy="50" r="10" fill="currentColor" />
</svg>`,Kr="2.0.0";function Gr(){const t=f.bank?.length??0,e=f.wrong?.length??0,n=f.favs?.length??0,a=He.map(s=>`<div class="kbd-row">
      <kbd class="kbd">${s.keys}</kbd>
      <span class="kbd-desc">${s.desc}</span>
      <span class="kbd-scope">${s.scope}</span>
    </div>`).join("");C({body:`<div class="about">
      <div class="about-head">
        <span class="about-mark">${Wr}</span>
        <span class="about-txt">
          <span class="about-name">基准</span>
          <span class="about-latin">DATUM</span>
        </span>
        <span class="about-ver">v${Kr}</span>
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
    </div>`,actions:[{label:"关闭",value:"ok",variant:"primary"}]})}const Jr=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],Xr=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function gn(t,e,n){return`<div class="segmented">${t.map(a=>`<button class="seg" data-act="${n}" data-value="${a.value}" aria-pressed="${String(a.value)===String(e)}">${a.label}</button>`).join("")}</div>`}function bn(t,e){const n=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=t,s.click(),URL.revokeObjectURL(a)}async function Vr(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await C({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const n=t.querySelector('[data-role="old"]').value,a=t.querySelector('[data-role="next"]').value;if(a.length<6){h.error("新密码至少 6 位");return}try{await L.auth.change(n,a),h.ok("密码已更新")}catch(s){h.error(s instanceof T?s.message:"修改失败")}}function Yr(){const t=f.user,e=$((t||"?").slice(0,1).toUpperCase()),n=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})(),a=Kn(),s=r=>r>0?`${Math.round(r*100)}%`:"—",o=Math.max(1,...a.days7.map(r=>r.n));return`
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
      ${gn(Jr,O.theme,"theme")}
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
      ${gn(Xr,O.autoDelay,"delay")}
      <div class="divider"></div>
      <label class="setting-row">
        <div><div class="setting-title">答题震动</div><div class="setting-desc">答对答错给一点反馈</div></div>
        <span class="switch" role="switch" data-act="toggle-vibration" aria-checked="${O.vibration}"><i></i></span>
      </label>
      <label class="setting-row">
        <div><div class="setting-title">连对鼓励</div><div class="setting-desc">连续答对时来点掌声</div></div>
        <span class="switch" role="switch" data-act="toggle-streak" aria-checked="${O.streakAlert}"><i></i></span>
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
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function Qr(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){h.error("图片太大了（最多 8MB）");return}try{const n=await Zr(e);Ct({image:n,color:""}),h.ok("背景已更新"),_("render")}catch{h.error("这张图片读不出来，换一张试试")}}},t.click()}function Zr(t){return new Promise((e,n)=>{const a=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(a);const o=Math.min(1,1600/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*o),r.height=Math.round(s.height*o);const i=r.getContext("2d");if(!i){n(new Error("canvas unavailable"));return}i.drawImage(s,0,0,r.width,r.height),e(r.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(a),n(new Error("image load failed"))},s.src=a})}function to(){qe()}async function eo(t,e){switch(t){case"theme":return Wa(e.dataset.value),_("render"),!0;case"delay":return Jt({autoDelay:Number(e.dataset.value)}),_("render"),!0;case"toggle-vibration":return Jt({vibration:!O.vibration}),_("render"),!0;case"toggle-streak":return Jt({streakAlert:!O.streakAlert}),_("render"),!0;case"pick-color":return Ct({color:e.value,image:""}),!0;case"pick-bg":return await Qr(),!0;case"clear-bg":return Ct({image:""}),_("render"),!0;case"dim":return Ct({dim:Number(e.value)}),!0;case"shortcuts":return Ue(),!0;case"about":return Gr(),!0;case"clear-stats":return await at({title:"清空练习记录",message:"本机的答题统计会被清除，题库不受影响。",okText:"清空",danger:!0})&&(ir(),_("render"),h.ok("练习记录已清空")),!0;case"reset-bg":return Ct({color:"",image:"",dim:.35}),h.ok("背景已恢复"),_("render"),!0;case"export-bank":return f.bank?.length?(bn(`题库-${f.user}.json`,f.bank),h.ok("已导出"),!0):(h.info("题库是空的"),!0);case"export-wrong":return f.wrong?.length?(bn(`错题-${f.user}.json`,f.wrong),h.ok("已导出"),!0):(h.info("没有错题"),!0);case"change-password":return await Vr(),!0;case"logout":return await at({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(Cn(),h.info("已退出登录")),!0;default:return!1}}const q={subject:"all",edit:!1,selected:new Set};function no(){q.subject="all",q.edit=!1,q.selected.clear()}function ia(){const t=f.wrong??[];return q.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===q.subject)}function ao(){return["all",...Array.from(new Set((f.wrong??[]).map(t=>t.subject||"默认题库")))]}function so(){const t=ia(),e=f.wrong?.length??0,n=ao().map(s=>`<button class="chip" data-act="subject" data-subject="${$(s)}" aria-pressed="${q.subject===s}">
          ${s==="all"?"全部":$(s)}
        </button>`).join(""),a=f.loading.wrong&&!f.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${q.selected.has(s.id)}">
          ${q.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${P(s.q)}</div>
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
    ${a}`}async function ro(){await dt()}async function oo(t,e){switch(t){case"subject":return q.subject=e.dataset.subject??"all",!0;case"toggle-edit":return q.edit=!q.edit,q.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return q.selected.has(n)?q.selected.delete(n):q.selected.add(n),!0}case"practice":return ia().length?(await Zn(),!0):(h.info("没有可练的错题"),!0);case"remove":{const n=Number(e.dataset.id);try{await L.wrong.remove([n]),q.selected.delete(n),F("wrong"),await dt(!0),h.ok("已标记掌握，继续加油")}catch(a){h.error(a instanceof T?a.message:"操作失败")}return!0}case"remove-selected":{const n=[...q.selected];if(!n.length||!await at({title:"删除错题",message:`确定删除选中的 ${n.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await L.wrong.remove(n),q.selected.clear(),F("wrong"),await dt(!0),h.ok("已删除")}catch(a){h.error(a instanceof T?a.message:"删除失败")}return!0}default:return!1}}const ht={home:{render:Pr,mount:Or,handle:Rr},bank:{render:Gs,mount:Vs,handle:Ys,onInput:Zs,reset:Hn},wrong:{render:so,mount:ro,handle:oo,reset:no},fav:{render:jr,mount:Lr,handle:Tr,reset:Er},me:{render:Yr,mount:to,handle:eo}};let Rt=!1,ut=!1,fe=!1,me=!1;function ca(){return document.getElementById("app-root")}function io(){ut=!1,ca().innerHTML=`
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
          <span class="side-ver" title="构建时间">${po()}</span>
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
    </div>`,Rt=!0}function co(){document.querySelectorAll(".tab-btn").forEach(e=>{const n=e.dataset.tab===f.tab;e.classList.toggle("is-active",n),e.setAttribute("aria-selected",String(n))}),document.querySelectorAll(".side-btn").forEach(e=>{const n=e.dataset.tab===f.tab;e.classList.toggle("is-active",n),e.setAttribute("aria-current",n?"page":"false")});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,St.findIndex(n=>n.id===f.tab));t.style.setProperty("--tab-index",String(e))}}function hn(t,e){const n=document.querySelector(t);if(!n)return;let a=!1,s=!1,o=!1,r=0,i=null,l;const u=d=>{const m=Array.from(n.querySelectorAll(".tab-btn, .side-btn"));if(!m.length)return 0;let g=0,y=Number.POSITIVE_INFINITY;return m.forEach((j,b)=>{const w=j.getBoundingClientRect(),k=e==="x"?w.left+w.width/2:w.top+w.height/2,x=Math.abs(d-k);x<y&&(y=x,g=b)}),g},c=()=>{if(!s&&(s=!0,n.classList.add("is-dragging"),i!==null))try{n.setPointerCapture(i)}catch{}};n.addEventListener("pointerdown",d=>{d.button===0&&(a=!0,s=!1,o=!1,i=d.pointerId,r=e==="x"?d.clientX:d.clientY,l=window.setTimeout(c,140))}),n.addEventListener("pointermove",d=>{if(!a)return;const m=e==="x"?d.clientX:d.clientY;if(!s){if(Math.abs(m-r)<6)return;c()}o=!0;const y=n.querySelectorAll(".tab-btn, .side-btn")[u(m)],j=St[u(m)],b=y?.dataset.tab??j?.id,w=St.find(k=>k.id===b)?.id;w&&w!==f.tab&&Ut(w)});const p=d=>{if(a){if(a=!1,l&&window.clearTimeout(l),n.classList.remove("is-dragging"),s)try{n.releasePointerCapture(d.pointerId)}catch{}if(i=null,o){const m=g=>{g.stopPropagation(),g.preventDefault()};n.addEventListener("click",m,{capture:!0,once:!0}),window.setTimeout(()=>n.removeEventListener("click",m,{capture:!0}),260)}}};n.addEventListener("pointerup",p),n.addEventListener("pointercancel",p)}function lo(){hn(".tabbar","x"),hn(".sidebar","y")}function uo(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,n=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),a=n?e.getAttribute("data-role"):null,s=n&&e instanceof HTMLInputElement?e.selectionStart:null,o=ht[f.tab]??ht.home;if(t.innerHTML=`<div class="view-inner">${o.render()}</div>`,co(),n&&a){const r=t.querySelector(`[data-role="${a}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}o.mount?.()}function et(){if(fe){me=!0;return}fe=!0;try{if(!f.authed&&!f.token){ut=!0,Rt=!1,ca().innerHTML=ns();return}Rt||(io(),lo()),uo()}finally{fe=!1,me&&(me=!1,queueMicrotask(et))}}let ge=!1;function po(){try{return"2026-11-27 11:38"}catch{return"dev"}}const fo=typeof requestAnimationFrame=="function"?t=>requestAnimationFrame(t):t=>{setTimeout(t,16)};function vn(){ge||(ge=!0,fo(()=>{ge=!1,et()}))}async function la(t){await t(),ut&&et()}function da(t){const e=t.dataset.act??"";if(ra()&&t.closest(".exam")&&sa(t.dataset.ex??"",t))return;if(wr()&&t.closest(".quiz")){Y(e,t).then(a=>{a||_("render")});return}if(e==="tab"){Ut(t.dataset.tab??"home");return}if(ut){la(()=>In(e,t));return}const n=ht[f.tab]??ht.home;n.handle&&Promise.resolve(n.handle(e,t)).then(a=>{a&&et()})}function mo(t){const e=t.target;if(!e)return;const n=e.closest("[data-ex]");if(n&&ra()&&n.closest(".exam")){sa(n.dataset.ex??"",n);return}const a=e.closest("[data-act]");a&&(a.closest(".modal-layer")||da(a))}function yn(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){da(e);return}if(ut)return;const n=document.getElementById("view");if(!n||!n.contains(e))return;(ht[f.tab]??ht.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&et()}function go(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),ut&&la(()=>In("submit",e)))}function bo(){Me(),qe(),za(()=>{Cn(),Rt=!1,ut=!1,h.error("登录已过期，请重新登录"),_("auth")}),Bt("nav",()=>{Object.entries(ht).forEach(([t,e])=>{t!==f.tab&&e.reset?.()}),et()}),Bt("auth",()=>{Rt=!1,ut=!1,f.authed?(Hn(),et(),Promise.allSettled([nt(!0),dt(!0),At(!0)])):et()}),Bt("render",vn),Bt("data",vn),document.addEventListener("click",mo),document.addEventListener("change",yn),document.addEventListener("input",yn),document.addEventListener("submit",go),oa(),f.token&&(f.authed=!0),et(),f.token&&Promise.allSettled([nt(),dt(),At()])}async function $n(){try{const t=await fetch(`/version.json?t=${Date.now()}`,{cache:"no-store"});if(!t.ok)return;const e=await t.json();if(!e.build||e.build==="2026-11-27 11:38")return;ho(e.build)}catch{}}function ho(t){if(document.querySelector(".update-bar"))return;const e=document.createElement("div");e.className="update-bar",e.innerHTML='<span>有新版本可用</span><button type="button">立即更新</button>',e.querySelector("button")?.addEventListener("click",async()=>{try{if("caches"in window){const n=await caches.keys();await Promise.all(n.map(a=>caches.delete(a)))}if("serviceWorker"in navigator){const n=await navigator.serviceWorker.getRegistrations();await Promise.all(n.map(a=>a.unregister()))}}catch{}location.replace(`${location.pathname}?v=${encodeURIComponent(t)}`)}),document.body.appendChild(e)}function wn(){try{bo(),Ma(),window.setTimeout(()=>void $n(),1200),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&window.setTimeout(()=>void $n(),400)})}catch(t){console.error("[datum] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",wn,{once:!0}):wn();
