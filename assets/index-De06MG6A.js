var Rn=Object.defineProperty;var Hn=(t,e,n)=>e in t?Rn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Te=(t,e,n)=>Hn(t,typeof e!="symbol"?e+"":e,n);import{k as Pn,u as zn,s as Me,a as qt,z as Bn}from"./vendor-SAJHWpKn.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const Un={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function v(t){return String(t??"").replace(/[&<>"']/g,e=>Un[e]??e)}const Ut=/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;function Fn(t,e){try{return Pn.renderToString(t,{displayMode:e,throwOnError:!1,output:"mathml",strict:!1,trust:!1})}catch{return v(e?`$$${t}$$`:`$${t}$`)}}function Ce(t){let e="",n=0;Ut.lastIndex=0;for(let a=Ut.exec(t);a;a=Ut.exec(t)){e+=v(t.slice(n,a.index)).replace(/\n/g,"<br>");const s=!!(a[1]||a[2]),o=(a[1]??a[2]??a[3]??a[4]??"").trim();e+=o?Fn(o,s):v(a[0]),n=a.index+a[0].length}return e+=v(t.slice(n)).replace(/\n/g,"<br>"),e}const Wn=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function Kn(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function _(t){const e=Kn(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return Ce(e);const a=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!a)return v(e);const s=o=>{if(o.nodeType===Node.TEXT_NODE)return Ce(o.textContent??"");if(o.nodeType!==Node.ELEMENT_NODE)return"";const r=o,i=r.tagName,c=Array.from(r.childNodes).map(s).join("");if(!Wn.has(i))return c;if(i==="IMG"){const d=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(d))return"";const u=v(r.getAttribute("alt")??"");return`<img src="${v(d)}" alt="${u}" loading="lazy" referrerpolicy="no-referrer">`}const l=i.toLowerCase();return`<${l}>${c}</${l}>`};return Array.from(a.childNodes).map(s).join("")}function C(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function At(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(n=>Number.isInteger(n)))).sort((n,a)=>n-a)}function I(t){return typeof t=="string"}function P(t,e=[]){return typeof t=="string"?t:At(t).map(n=>{const a=String.fromCharCode(65+n),s=(e[n]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${a}. ${s}`:a}).join("、")}function Ze(t){const e=[...t];for(let n=e.length-1;n>0;n-=1){const a=Math.floor(Math.random()*(n+1));[e[n],e[a]]=[e[a],e[n]]}return e}function tn(t,e){const n=At(e);if(!n.length||t.length!==n.length)return!1;const a=[...new Set(t)].sort((s,o)=>s-o);return a.length===n.length&&a.every((s,o)=>s===n[o])}function Gn(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const n=JSON.parse(e);if(typeof n=="number")return n;if(Array.isArray(n))return n.map(Number).filter(Number.isInteger);if(typeof n=="string")return n}catch{}return e}return""}let U=null;function Jn(){return U&&document.body.contains(U)||(U=document.createElement("div"),U.className="toast-host",U.setAttribute("role","status"),U.setAttribute("aria-live","polite"),document.body.appendChild(U)),U}function Ft(t,e="info",n=2600){if(!t)return;const a=document.createElement("div");a.className=`toast toast-${e}`,a.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${v(t)}</span>`,Jn().appendChild(a),requestAnimationFrame(()=>a.classList.add("in")),window.setTimeout(()=>{a.classList.remove("in"),window.setTimeout(()=>a.remove(),220)},n)}const g={info:t=>Ft(t,"info"),ok:t=>Ft(t,"success"),error:t=>Ft(t,"error",3200)},ee="oq:queue",Vn=200;function ce(){try{const t=localStorage.getItem(ee),e=t?JSON.parse(t):[];return Array.isArray(e)?e.filter(n=>n&&n.path):[]}catch{return[]}}function en(t){try{t.length?localStorage.setItem(ee,JSON.stringify(t.slice(-Vn))):localStorage.removeItem(ee)}catch{}}function Qn(){return ce().length}function Xn(t,e,n){const a=ce();a.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,path:t,body:e,label:n,at:Date.now()}),en(a)}let Wt=!1;async function Ne(){if(Wt)return 0;const t=ce();if(!t.length)return 0;Wt=!0;let e=0;const n=[];for(const a of t)try{const s=await fetch(a.path,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a.body),..._e()?{headers:{"Content-Type":"application/json",Accept:"application/json",..._e()}}:{}});if(s.ok||s.status>=400&&s.status<500){s.ok&&(e+=1);continue}n.push(a)}catch{n.push(a);break}return Wt=!1,en([...n,...t.slice(t.length)]),e&&g.ok(`已补传 ${e} 条离线操作`),e}function _e(){try{const e=(localStorage.getItem("oq:oq:token")||localStorage.getItem("oq:token")||"").replace(/^"|"$/g,"");return e?{Authorization:`Bearer ${e}`}:{}}catch{return{}}}function Yn(){window.addEventListener("online",()=>{Ne()}),navigator.onLine&&Qn()&&setTimeout(()=>void Ne(),1500)}const le="oq:",de="oq:user",ue="oq:token",Zn={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},D={...Zn,...J("settings",{})};["auto","light","dark","eye"].includes(D.theme)||(D.theme="auto");function J(t,e){try{const n=localStorage.getItem(le+t);return n===null?e:JSON.parse(n)}catch{return e}}function V(t,e){try{localStorage.setItem(le+t,JSON.stringify(e))}catch{}}function ne(t){try{localStorage.removeItem(le+t)}catch{}}function Ct(t){Object.assign(D,t),V("settings",D)}function ta(t){Ct({theme:t})}function O(){return J(de,"")||""}function nn(t){V(de,t)}function ea(){ne(de),ne(ue)}function pe(){return J(ue,"")||""}function an(t){V(ue,t)}function Q(t){return`u:${O()||"anon"}:${t}`}function me(){return J(Q("notes"),{})}function na(t,e){const n=me(),a=String(t);e.trim()?n[a]=e:delete n[a],V(Q("notes"),n)}function sn(){const t=J(Q("progress"),{});return Number(t.sequential_index)||0}function aa(t){V(Q("progress"),{sequential_index:t,updatedAt:Date.now()})}function rn(){const t=J(Q("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function sa(t){V(Q("session"),t)}function on(){ne(Q("session"))}function cn(){return J(Q("recent"),[])}function ra(t){const e=[...t,...cn()].slice(0,30);V(Q("recent"),Array.from(new Set(e)))}function ln(){return J("appearance",{color:"",image:"",dim:.35})}function oa(t){V("appearance",{...ln(),...t})}function ia(){return J("welcomed","")===new Date().toDateString()}function ca(){V("welcomed",new Date().toDateString())}class j extends Error{constructor(n,a){super(a);Te(this,"status");this.name="ApiError",this.status=n}}let fe=null;function la(t){fe=t}async function dn(t,e={}){const n=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&n.set("Content-Type","application/json");const a=pe();a&&n.set("Authorization",`Bearer ${a}`),n.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:n})}catch{throw new j(0,"网络连接失败，请检查网络后重试")}const o=s.headers.get("content-type")??"";let r=null;o.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const i=r??{};if(s.status===401)throw fe?.(),new j(401,typeof i.error=="string"?i.error:"登录已过期，请重新登录");if(!s.ok||i.ok===!1){const c=typeof i.error=="string"&&i.error?i.error:`请求失败（HTTP ${s.status}）`;throw new j(s.status,c)}return r}const Kt=t=>dn(t),z=(t,e)=>dn(t,{method:"POST",body:JSON.stringify(e)});async function da(t,e,n){const a=new Headers({"Content-Type":"application/json"}),s=pe();s&&a.set("Authorization",`Bearer ${s}`);const o=await fetch("/api/ai",{method:"POST",headers:a,body:JSON.stringify({...t,stream:!0}),signal:n});if(!o.ok||!o.body){const p=await o.json().catch(()=>({}));if(o.status===401)throw fe?.(),new j(401,"登录已过期，请重新登录");if(typeof p.result=="string")return e(p.result),{text:p.result,cached:!1,provider:typeof p.provider=="string"?p.provider:void 0};throw new j(o.status,typeof p.error=="string"?p.error:"AI 解析失败")}const r=o.body.getReader(),i=new TextDecoder;let c="",l="",d=!1,u;for(;;){const{value:p,done:b}=await r.read();if(b)break;c+=i.decode(p,{stream:!0});const $=c.split(`

`);c=$.pop()??"";for(const A of $){const f=A.split(`
`).find(k=>k.startsWith("data:"));if(!f)continue;let y;try{y=JSON.parse(f.slice(5).trim())}catch{continue}if(typeof y.delta=="string"&&y.delta&&(l+=y.delta,e(y.delta)),typeof y.error=="string")throw new j(502,y.error);y.done&&(d=y.cached===!0,typeof y.provider=="string"&&(u=y.provider))}}return{text:l,cached:d,provider:u}}function ae(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:Gn(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function ua(t){return{...ae(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}async function at(t,e,n){try{return await z(t,e)}catch(a){if(a instanceof j&&a.status===0)return Xn(t,e,n),{ok:!0,queued:!0,offline:!0};throw a}}const E={auth:{check:t=>z("/api/auth",{action:"check",username:t}),set:(t,e)=>z("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>z("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>z("/api/auth",{action:"change",username:O(),oldPassword:t,newPassword:e})},questions:{async list(){const t=O();if(!t)return[];const e=await Kt(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>ae(a))},add:t=>at("/api/questions-add",{user_id:O(),questions:t},`导入 ${t.length} 道题`),update:(t,e,n)=>at("/api/questions-update",{id:t,user_id:O(),...e,...n?.baseUpdatedAt?{base_updated_at:n.baseUpdatedAt}:{},...n?.force?{force:!0}:{}},"保存题目"),remove:t=>at("/api/questions-delete",{ids:t,user_id:O()},`删除 ${t.length} 道题`)},wrong:{async list(){const t=O();if(!t)return[];const e=await Kt(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>ua(a))},add:t=>at("/api/wrong-add",{user_id:O(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""},"记录错题"),remove:t=>at("/api/wrong-delete",{ids:t,user_id:O()},"移除错题")},favorites:{async list(){const t=O();if(!t)return[];const e=await Kt(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>ae(a))},add:t=>at("/api/favorites-add",{user_id:O(),question_id:t},"收藏题目"),remove:t=>at("/api/favorites-remove",{user_id:O(),question_id:t},"取消收藏")},ai:{explain:t=>z("/api/ai",{action:"explain",prompt:t}),grade:t=>z("/api/ai",{action:"grade",prompt:t}),extract:t=>z("/api/ai",{action:"extract",...t}),classify:t=>z("/api/ai",{action:"classify",prompt:t}),generate:t=>z("/api/ai",{action:"generate",prompt:t}),explainStream:(t,e,n)=>da({action:"explain",prompt:t},e,n)}},gt='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"',se=[{id:"home",label:"首页",icon:`<svg viewBox="0 0 24 24" ${gt} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`},{id:"bank",label:"题库",icon:`<svg viewBox="0 0 24 24" ${gt} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`},{id:"wrong",label:"错题",icon:`<svg viewBox="0 0 24 24" ${gt} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`},{id:"fav",label:"收藏",icon:`<svg viewBox="0 0 24 24" ${gt} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`},{id:"me",label:"我的",icon:`<svg viewBox="0 0 24 24" ${gt} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`}],Ie=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],m={tab:"home",user:O(),token:pe(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},bt=new Map;function Tt(t,e){return bt.has(t)||bt.set(t,new Set),bt.get(t).add(e),()=>bt.get(t)?.delete(e)}function M(t){bt.get(t)?.forEach(e=>e())}function Pt(t){m.tab!==t&&(m.tab=t,M("nav"))}const un=window.matchMedia("(prefers-color-scheme: dark)");function De(){return D.theme==="auto"?un.matches?"dark":"light":D.theme}function ge(){document.documentElement.dataset.theme=De();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=De()==="dark"?"#0b0c0f":"#f4f5f7")}function pa(t){ta(t),ge()}un.addEventListener("change",()=>{D.theme==="auto"&&ge()});function ma(t){oa(t)}function he(){const{color:t,image:e,dim:n}=ln(),a=document.body;a.style.backgroundImage=e?`url("${e}")`:"",a.style.backgroundSize="cover",a.style.backgroundPosition="center",a.style.backgroundAttachment="fixed",a.dataset.dim=String(n),t&&!e?a.style.backgroundColor=t:a.style.backgroundColor=""}async function fa(t,e){const n=await E.auth.login(t,e);an(n.token),nn(t),m.user=t,m.token=n.token,m.authed=!0,G(),M("auth")}async function ga(t,e){const n=await E.auth.set(t,e);an(n.token),nn(t),m.user=t,m.token=n.token,m.authed=!0,G(),M("auth")}function pn(){m.user="",m.token="",m.authed=!1,m.bank=null,m.wrong=null,m.favs=null,m.favoriteIds=new Set,ea(),on(),M("auth")}const ha=300*1e3,st={bank:0,wrong:0,fav:0},Nt=new Map;function G(t){t?(st[t]=0,t==="bank"&&(m.bank=null),t==="wrong"&&(m.wrong=null),t==="fav"&&(m.favs=null)):(st.bank=st.wrong=st.fav=0,m.bank=null,m.wrong=null,m.favs=null)}function ba(t,e){const n=Nt.get(t);if(n)return n;const a=e().finally(()=>Nt.delete(t));return Nt.set(t,a),a}async function be(t,e,n,a){if(!m.user)return[];const s=Nt.get(t);if(s)return s;const o=Date.now()-st[t]<ha;if(!e&&o)return[];m.loading[t]=!0,M("data");try{const r=await ba(t,n);return a(r),st[t]=Date.now(),r}catch(r){throw r instanceof j&&r.status!==401&&g.error(r.message),r}finally{m.loading[t]=!1,M("data")}}async function tt(t=!1){try{await be("bank",t,()=>E.questions.list(),e=>{m.bank=e})}catch{}return m.bank??[]}async function ot(t=!1){try{await be("wrong",t,()=>E.wrong.list(),e=>{m.wrong=e})}catch{}return m.wrong??[]}async function kt(t=!1){try{await be("fav",t,()=>E.favorites.list(),e=>{m.favs=e,m.favoriteIds=new Set(e.map(n=>n.id))})}catch{}return m.favs??[]}function Dt(t){return m.favoriteIds.has(t)}async function va(t){const e=!Dt(t);try{return e?await E.favorites.add(t):await E.favorites.remove(t),e?m.favoriteIds.add(t):m.favoriteIds.delete(t),m.favs=null,st.fav=0,g.ok(e?"已加入收藏":"已取消收藏"),M("data"),e}catch(n){return g.error(n instanceof j?n.message:"操作失败"),Dt(t)}}function ya(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${Ie[Math.floor(Math.random()*Ie.length)]}`}function vt(t){ma(t),he()}const x={step:"name",username:"",busy:!1,error:""};function $a(){x.step="name",x.username="",x.busy=!1,x.error=""}function wa(){const t=`
    <div class="auth-brand">
      <div class="brand-mark">原</div>
      <div>
        <div class="auth-title">原点 · Origin</div>
        <div class="brand-sub">刷题 · 错题 · 收藏</div>
      </div>
    </div>`,e=x.error?`<div class="auth-error" role="alert">${v(x.error)}</div>`:"";if(x.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${v(x.username)}" required>
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
        <p class="auth-hint">${n?"为":"欢迎回来，"} <strong>${v(x.username)}</strong>${n?" 设置一个密码":""}</p>
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
    </div>`}async function mn(t,e){if(t==="back")return x.step="name",x.error="",!0;if(t==="submit"){const n=e,a=new FormData(n);if(x.step==="name"){const o=String(a.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(o))return x.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;x.busy=!0,x.error="";try{const{hasPassword:r}=await E.auth.check(o);x.username=o,x.step=r?"password":"create"}catch(r){x.error=r instanceof j?r.message:"网络异常，请重试"}finally{x.busy=!1}return!0}if(x.busy)return!0;const s=String(a.get("password")??"");if(x.step==="create"){const o=String(a.get("confirm")??"");if(s!==o)return x.error="两次输入的密码不一致",!0}if(s.length<6)return x.error="密码至少 6 位",!0;x.busy=!0,x.error="";try{x.step==="create"?await ga(x.username,s):await fa(x.username,s),g.ok(x.step==="create"?"账号已创建，开始刷题吧":`欢迎回来，${m.user}`),$a()}catch(o){x.error=o instanceof j?o.message:"登录失败，请重试"}finally{x.busy=!1}return!0}return!1}function xa(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function fn(t,e){const n=e.trim();if(!n)return t;const a=new RegExp(xa(n),"gi");return t.replace(/<[^>]+>|[^<]+/g,s=>s.startsWith("<")?s:s.replace(a,o=>`<mark class="hl">${o}</mark>`))}const Et={single:"单选",multi:"多选",judge:"判断",blank:"填空",essay:"简答"};function it(t){const e=t.opts??[],n=String(t.q??"");if(!e.length)return/_{2,}|（\s*）|\(\s*\)|【\s*】/.test(n)?"blank":"essay";if(e.length===2){const a=e.map(s=>s.replace(/^[A-Za-z][.、)）]\s*/,"").trim()).join("|");if(/^(正确|对|是|√|True)|\|(错误|错|否|×|False)$/i.test(a)||/正确\|错误|对\|错/.test(a))return"judge"}return Array.isArray(t.a)?"multi":"single"}let R=null,yt=0;function gn(){return R&&document.body.contains(R)||(R=document.createElement("div"),R.className="modal-root",R.setAttribute("role","dialog"),R.setAttribute("aria-modal","true"),document.body.appendChild(R)),R}function ka(){yt+=1,document.body.classList.add("is-locked")}function Sa(){yt=Math.max(0,yt-1),yt===0&&document.body.classList.remove("is-locked")}function ve(){gn().innerHTML="",yt=0,document.body.classList.remove("is-locked")}function T(t){const e=gn(),n=t.dismissible!==!1;return new Promise(a=>{let s=!1;const o=p=>{s||(s=!0,u(),r.classList.remove("open"),window.setTimeout(()=>{r.remove(),Sa()},200),a(p))},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${n?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${v(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${v(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((p,b)=>`<button class="btn btn-${p.variant??"ghost"}" data-idx="${b}">${v(p.label)}</button>`).join("")}</div>`:""}
      </div>`;const i=r.querySelector(".modal-card"),c=i.querySelector(".modal-body");typeof t.body=="string"?c.innerHTML=t.body:t.body&&c.appendChild(t.body);const l=p=>{p.key==="Escape"&&n&&(p.stopPropagation(),o(null))},d=p=>{const b=p.target;if(b.closest("[data-close]")&&n){o(null);return}const $=b.closest("[data-idx]");if(!$)return;const A=t.actions?.[Number($.dataset.idx)];A&&(A.keepOpen||o(A.value))},u=()=>{document.removeEventListener("keydown",l,!0),r.removeEventListener("click",d),R&&R.children.length===0&&R.classList.remove("open")};r.addEventListener("click",d),document.addEventListener("keydown",l,!0),e.appendChild(r),e.classList.add("open"),ka(),t.onMount?.(i),requestAnimationFrame(()=>{r.classList.add("open");const p=i.querySelector("input, textarea, button.btn-primary, button");p&&window.matchMedia("(pointer: fine)").matches&&p.focus({preventScroll:!0})})})}function lt(t){return T({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}function Aa(t,e=1400,n=.82){return new Promise((a,s)=>{const o=URL.createObjectURL(t),r=new Image;r.onload=()=>{URL.revokeObjectURL(o);const i=Math.min(1,e/Math.max(r.width,r.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(r.width*i)),c.height=Math.max(1,Math.round(r.height*i));const l=c.getContext("2d");if(!l){s(new Error("canvas 不可用"));return}l.fillStyle="#fff",l.fillRect(0,0,c.width,c.height),l.drawImage(r,0,0,c.width,c.height),a(c.toDataURL("image/jpeg",n))},r.onerror=()=>{URL.revokeObjectURL(o),s(new Error("图片解码失败"))},r.src=o})}const Ea=new Set(["B","STRONG","I","EM","U","SUB","SUP","BR","P","DIV","SPAN","IMG","CODE"]);function Mt(t){const n=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html").body.firstElementChild;if(!n)return"";const a=s=>{if(s.nodeType===Node.TEXT_NODE)return(s.textContent??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");if(s.nodeType!==Node.ELEMENT_NODE)return"";const o=s,r=o.tagName,i=Array.from(o.childNodes).map(a).join("");if(!Ea.has(r))return i;if(r==="IMG"){const l=o.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(l))return"";const d=(o.getAttribute("alt")??"").replace(/"/g,"&quot;");return`<img src="${l.replace(/"/g,"&quot;")}" alt="${d}">`}if(r==="BR")return"<br>";const c=r.toLowerCase();return c==="div"||c==="p"?i.trim()?`${i}<br>`:"<br>":`<${c}>${i}</${c}>`};return Array.from(n.childNodes).map(a).join("").replace(/(<br>)+$/g,"").trim()}const ja=[{cmd:"bold",label:"B",title:"加粗（Ctrl/⌘+B）"},{cmd:"italic",label:"I",title:"斜体（Ctrl/⌘+I）"},{cmd:"underline",label:"U",title:"下划线（Ctrl/⌘+U）"},{cmd:"superscript",label:"x²",title:"上标"},{cmd:"subscript",label:"x₂",title:"下标"},{cmd:"insertUnorderedList",label:"≡",title:"列表"}];function La(t={}){const e=document.createElement("div");e.className="rt";const n=document.createElement("div");n.className="rt-bar";const a=document.createElement("div");a.className="rt-area",a.contentEditable="true",a.spellcheck=!1,a.dataset.role="rich",a.style.minHeight=`${t.minHeight??96}px`,t.placeholder&&(a.dataset.placeholder=t.placeholder),a.innerHTML=Mt(t.value??"");const s=(r,i)=>{a.focus(),document.execCommand(r,!1,i),o()};if(t.toolbar!==!1){for(const d of ja){const u=document.createElement("button");u.type="button",u.className="rt-btn",u.title=d.title,u.textContent=d.label,u.addEventListener("mousedown",p=>p.preventDefault()),u.addEventListener("click",()=>s(d.cmd,d.arg)),n.appendChild(u)}const r=document.createElement("span");r.className="rt-sep",n.appendChild(r);const i=document.createElement("button");i.type="button",i.className="rt-btn",i.textContent="∑",i.title="公式：选中内容包成 $…$",i.addEventListener("mousedown",d=>d.preventDefault()),i.addEventListener("click",()=>{const d=window.getSelection()?.toString()??"";if(d){s("insertText",`$${d}$`);return}s("insertText","$$");const u=window.getSelection();if(u&&u.rangeCount){const p=u.getRangeAt(0);typeof u.modify=="function"?u.modify("move","backward","character"):p.startContainer.nodeType===Node.TEXT_NODE&&(p.setStart(p.startContainer,Math.max(0,p.startOffset-1)),p.collapse(!0),u.removeAllRanges(),u.addRange(p))}}),n.appendChild(i);const c=document.createElement("button");c.type="button",c.className="rt-btn",c.textContent="▣",c.title="插入图片（自动压缩）",c.addEventListener("mousedown",d=>d.preventDefault()),c.addEventListener("click",()=>{const d=document.createElement("input");d.type="file",d.accept="image/*",d.onchange=async()=>{const u=d.files?.[0];if(u)try{c.textContent="…";const p=await Aa(u);a.focus(),document.execCommand("insertHTML",!1,`<img src="${p}" alt="题图"><br>`),o(),g.ok(`图片已插入（${Math.round(p.length*.75/1024)} KB）`)}catch{g.error("图片读取失败，换一张试试")}finally{c.textContent="▣"}},d.click()}),n.appendChild(c);const l=document.createElement("button");l.type="button",l.className="rt-btn rt-clear",l.textContent="⌫",l.title="清除格式",l.addEventListener("mousedown",d=>d.preventDefault()),l.addEventListener("click",()=>s("removeFormat")),n.appendChild(l)}function o(){const r=(a.textContent??"").trim().length>0,i=!!a.querySelector("img");a.classList.toggle("is-empty",!r&&!i)}return a.addEventListener("input",o),a.addEventListener("blur",o),a.addEventListener("paste",r=>{const i=r.clipboardData?.getData("text/html");i&&(r.preventDefault(),document.execCommand("insertHTML",!1,Mt(i)))}),o(),e.append(n,a),{el:e,getValue:()=>Mt(a.innerHTML),setValue:r=>{a.innerHTML=Mt(r),o()},focus:()=>a.focus()}}function Oe(t){const e=t.name.toLowerCase(),n=t.type.toLowerCase();return n.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|heic)$/.test(e)?"image":e.endsWith(".docx")?"docx":e.endsWith(".json")?"json":/\.(txt|md|csv|text)$/.test(e)||n.startsWith("text/")?"text":"unknown"}function ut(t){return String(t??"").replace(/\r\n?/g,`
`).trim()}function hn(t,e){if(Array.isArray(t)){const r=t.map(i=>typeof i=="number"?i:qa(String(i),e.length)).filter(i=>i!==null);return r.length?r.length===1?r[0]:[...new Set(r)].sort((i,c)=>i-c):t.map(String).join("、")}if(typeof t=="number"&&Number.isFinite(t))return t;const n=ut(t);if(!n)return"";const s=(/^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(n)?n:"")||(/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(n)?n:"");if(s){const r=[...new Set(s.toUpperCase().split("").map(i=>i.charCodeAt(0)-65))].filter(i=>i>=0&&i<e.length);if(r.length)return r.length===1?r[0]:r.sort((i,c)=>i-c)}const o=/^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(n);if(o&&e.length){const r=o[1].charCodeAt(0)-65;if(r>=0&&r<e.length){const i=o[2].trim();return e.findIndex(l=>l.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()===i)>=0||i,r}}return n}function qa(t,e){const n=t.trim().toUpperCase();if(!/^[A-H]$/.test(n))return null;const a=n.charCodeAt(0)-65;return a<e?a:null}function Ta(t){const e=ut(t.q??t.question??t.title??t.题目??t.题干);if(!e)return null;const n=t.opts??t.options??t.choices??t.选项;let a=[];Array.isArray(n)?a=n.map(r=>ut(r)).filter(Boolean):typeof n=="string"&&(a=Ia(n));const s=t.a??t.answer??t.correct??t.答案??t.正确答案,o=a.length?hn(s,a):ut(s);return{q:e,opts:a,a:o,...t.figure?{figure:t.figure}:{},chapter:ut(t.chapter??t.章节??t.知识点),subject:ut(t.subject??t.科目??t.题库)||"默认题库"}}function ye(t){const e=t.replace(/^\uFEFF/,"").trim(),n=/```(?:json)?([\s\S]*?)```/i.exec(e)?.[1]??e,a=n.indexOf("["),s=n.indexOf("{"),o=a>=0&&(s<0||a<s)?a:s;if(o<0)return[];const r=Math.max(n.lastIndexOf("]"),n.lastIndexOf("}"));if(r<=o)return[];let i;try{i=JSON.parse(n.slice(o,r+1))}catch{return[]}return(Array.isArray(i)?i:Array.isArray(i?.questions)?i.questions:Array.isArray(i?.data)?i.data:[]).filter(l=>!!l&&typeof l=="object").map(Ta).filter(l=>!!l)}const Ma=/^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/,Ca=/^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/,Na=/^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/,_a=/^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;function Ia(t){return t.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/).map(n=>n.trim()).filter(Boolean)}function Da(t){const e=[...t.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];return e.length<2?[]:e.map((n,a)=>{const s=(n.index??0)+n[0].length,o=a+1<e.length?e[a+1].index??t.length:t.length;return t.slice(s,o).trim()})}function Oa(t){const n=t.replace(/^\uFEFF/,"").replace(/\r\n?/g,`
`).replace(/!\[[^\]]*\]\((data:image\/[^)]+)\)/g,(d,u)=>`<img src="${u}" alt="题图">`).split(`
`),a=[];let s="",o=[],r="",i="",c="";const l=()=>{const d=s.trim();if(!d){s="",o=[],r="";return}if(!o.length&&!r.trim()&&d.length<=24){s="",o=[],r="";return}const u=o.map(b=>b.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()),p=u.length?hn(r,u):r.trim();a.push({q:d,opts:u,a:p,chapter:i,subject:c||"默认题库"}),s="",o=[],r="",i="",c=""};for(const d of n){if(!d.trim())continue;if(/^\s*<img\b/i.test(d)){s=`${s}${s?`
`:""}${d.trim()}`;continue}const u=_a.exec(d),p=Ma.exec(d),b=Ca.exec(d),$=Na.exec(d);if(u&&!p){l();const A=Da(u[2]);A.length>=2?(s=u[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim(),o=A):s=u[2].trim();continue}if(p&&s){o.push(p[2].trim());continue}if(b&&(s||o.length)){r=b[1].trim();continue}if($){const A=$[0].trim(),f=$[1].trim();/章节|知识点/.test(A)?i=f:/科目|题库|分类/.test(A)&&(c=f);continue}s?o.length?o[o.length-1]=`${o[o.length-1]} ${d.trim()}`.trim():s=`${s} ${d.trim()}`.trim():s=d.replace(/^\s*(?:题目|题干)\s*[:：]\s*/,"").trim()}return l(),a.filter(d=>d.q.length>1)}function _t(t){const e=t.trim();if(!e)return[];if(/^[[{]/.test(e)||/```(?:json)?/i.test(e)||/"(q|question|题目)"\s*:/.test(e)){const n=ye(e);if(n.length)return n}return Oa(e)}function Re(t){const e=zn(new Uint8Array(t)),n=e["word/document.xml"];if(!n)throw new Error("这个 docx 里没有正文，另存为 .docx 再试一次");const a=e["word/_rels/document.xml.rels"],s=new Map;if(a){const i=Me(a);for(const c of i.matchAll(/<Relationship\b[^>]*>/g)){const l=c[0],d=/\bId="([^"]+)"/.exec(l)?.[1],u=/\bTarget="([^"]+)"/.exec(l)?.[1],p=/\bType="([^"]+)"/.exec(l)?.[1]??"";if(!d||!u||!/image/i.test(p))continue;const b=u.startsWith("/")?u.slice(1):`word/${u.replace(/^\.\//,"")}`,$=e[b];$&&s.set(d,`data:${Ra(b)};base64,${Ha($)}`)}}return Me(n).replace(/<a:blip\b[^>]*r:embed="([^"]+)"[^>]*\/?>/g,(i,c)=>{const l=s.get(c);return l?`[[IMG:${l}]]`:""}).replace(/<w:tab\b[^>]*\/>/g,"	").replace(/<w:br\b[^>]*\/>/g,`
`).replace(/<\/w:p>/g,`
`).replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\[\[IMG:([^\]]+)\]\]/g,(i,c)=>`
![docx 图片](${c})
`).replace(/\n{3,}/g,`

`).trim()}function Ra(t){const e=t.split(".").pop()?.toLowerCase()??"";return e==="jpg"||e==="jpeg"?"image/jpeg":e==="gif"?"image/gif":e==="bmp"?"image/bmp":e==="webp"?"image/webp":e==="svg"?"image/svg+xml":"image/png"}function Ha(t){let e="";for(let a=0;a<t.length;a+=32768)e+=String.fromCharCode(...t.subarray(a,a+32768));return btoa(e)}function He(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("文件读取失败")),a.readAsText(t,"utf-8")})}function Pe(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(a.result),a.onerror=()=>n(new Error("文件读取失败")),a.readAsArrayBuffer(t)})}function ze(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("图片读取失败")),a.readAsDataURL(t)})}function Pa(t,e){if(!t.length)return'<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>';const n=t.slice(0,4),a=n.map((r,i)=>{const c=(r.opts??[]).length,l=Be(r),d=(r.q.match(/<img\b/gi)??[]).length,u=r.q.replace(/<img\b[^>]*>/gi," ").replace(/\s+/g," ").trim();return`<li><b>${i+1}.</b> ${v(u).slice(0,90)}${d?`<span class="muted"> · 含 ${d} 张图</span>`:""}${c?`<span class="muted"> · ${c} 个选项</span>`:'<span class="muted"> · 简答</span>'}${l?`<span class="tag-warn">${l}</span>`:""}</li>`}).join(""),s=t.length>n.length?`<li class="muted">…还有 ${t.length-n.length} 道</li>`:"",o=t.map(Be).filter(Boolean).length;return`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${t.length} 道题</span>
      ${o?`<span class="tag tag-warn">${o} 道待确认</span>`:""}
      ${e?`<span class="muted small">${v(e)}</span>`:""}
    </div>
    <ul class="import-list">${a}${s}</ul>`}function Be(t){const e=(t.opts??[]).length,n=t.a;return(Array.isArray(n)?n.length>0:n!==""&&n!==null&&n!==void 0)?e===1?"只有 1 个选项":e>=2&&typeof n=="number"&&(n<0||n>=e)?"答案越界":"":"没识别到答案"}function Gt(t,e){return t==="json"?ye(e):_t(e)}async function za(){const t=document.createElement("div");t.className="import",t.innerHTML=`
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
    <div class="import-preview" data-role="preview"></div>`;const e=t.querySelector('[data-role="drop"]'),n=t.querySelector('[data-role="file"]'),a=t.querySelector('[data-role="text"]'),s=t.querySelector('[data-role="preview"]');let o=[],r="",i="",c=!1;const l=()=>{s.innerHTML=Pa(o,i||(r?"图片将由 AI 识别":""));const f=document.querySelector('[data-idx="1"]');f&&(f.textContent=o.length?`导入 ${o.length} 道题`:"AI 解析并导入")},d=(f,y,k)=>{a.value=f,o=Gt(y,f),i=k,l()},u=async()=>{const f=a.value.trim();if(!f&&!r)return[];g.info(r?"AI 正在识别图片…":"AI 正在解析文字…");const y=await E.ai.extract({...f?{prompt:f}:{},...r?{imageBase64:r}:{}});return _t(y.result??"")},p=async f=>{const y=Oe(f);try{if(y==="image"){r=await ze(f),o=[],i=`${f.name}（${Math.round(f.size/1024)}KB，AI 识别）`,l();try{o=await u(),o.length||g.error("这张图没读出题目，换张更清晰的试试")}catch(w){g.error(w instanceof j?w.message:"AI 识别失败")}l();return}if(y==="docx"){const w=await Pe(f);d(Re(w),"docx",f.name);return}if(y==="unknown"){g.error("暂不支持这种文件，换成 txt / json / docx / 图片试试");return}const k=await He(f);d(k,y,f.name)}catch(k){g.error(k instanceof Error?k.message:"文件解析失败")}},b=async f=>{if(!f.length)return;if(f.length===1){await p(f[0]);return}const y=[],k=[];for(const w of f)try{const L=Oe(w);if(L==="image"){const nt=await ze(w),dt=await E.ai.extract({imageBase64:nt});y.push(..._t(dt.result??"")),k.push(w.name);continue}if(L==="docx"){y.push(...Gt("docx",Re(await Pe(w)))),k.push(w.name);continue}y.push(...Gt(L,await He(w))),k.push(w.name)}catch(L){g.error(`${w.name} 没读出来：${L instanceof Error?L.message:"格式不对"}`)}o=y,r="",i=`${f.length} 个文件（${k.join("、")}）`,a.value="",l()};n.addEventListener("change",()=>{b([...n.files??[]])});for(const f of["dragenter","dragover"])e.addEventListener(f,y=>{y.preventDefault(),e.classList.add("is-over")});for(const f of["dragleave","drop"])e.addEventListener(f,y=>{y.preventDefault(),e.classList.remove("is-over")});e.addEventListener("drop",f=>{const y=[...f.dataTransfer?.files??[]];b(y)}),a.addEventListener("paste",f=>{const k=[...f.clipboardData?.items??[]].find(L=>L.kind==="file"&&L.type.startsWith("image/"));if(!k)return;const w=k.getAsFile();w&&(f.preventDefault(),p(w))});let $=0;if(a.addEventListener("input",()=>{window.clearTimeout($),$=window.setTimeout(()=>{o=_t(a.value),r="",i="",l()},280)}),!(!await T({title:"导入题库",body:t,actions:[{label:"取消",value:!1},{label:"导入",value:!0,variant:"primary"}],onMount:()=>l()})||c))try{const f=o.length?o:await u();if(!f.length){g.error("没解析出题目，检查一下格式，或换张更清晰的图");return}c=!0;const y=await E.questions.add(f);G("bank"),await tt(!0),g.ok(`已导入 ${y.added??f.length} 道题`)}catch(f){g.error(f instanceof j?f.message:"导入失败")}}const re="#0a0c0f",Z="#8b9099",Ba="#ffffff",$t="#1440ff";function $e(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function we(t,e,n,a){const s=a?`<text x="${t/2}" y="${e-12}" text-anchor="middle" font-size="12.5" fill="${Z}" stroke="none">${$e(a)}</text>`:"";return`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${e}" viewBox="0 0 ${t} ${e}" fill="none">
  <rect width="${t}" height="${e}" fill="${Ba}"/>
  <g stroke="${re}" stroke-width="1.6" stroke-linecap="square" color="${re}" font-family="system-ui,-apple-system,'Segoe UI',sans-serif">
  ${n}
  ${s}
  </g>
</svg>`}function Ua(t){const n=t.caption?210:186,a=Number(t.span)>0?Number(t.span):6,s=Number(t.value)>0?Number(t.value):20,o=44,r=316,i=96,c=(o+r)/2,l=t.load==="point"?"kN":"kN/m",d=t.load==="point"?`P = ${s} ${l}`:`q = ${s} ${l}`,u=[];if(t.load==="point")u.push(`<path d="M${c} 44 V${i-6}"/><path d="M${c-5} ${i-14} L${c} ${i-4} L${c+5} ${i-14}"/>`);else{for(let p=0;p<=8;p+=1){const b=o+(r-o)*p/8;u.push(`<path d="M${b} 56 V${i-10}"/><path d="M${b-4} ${i-18} L${b} ${i-9} L${b+4} ${i-18}"/>`)}u.push(`<path d="M${o} 56 H${r}"/>`)}return we(360,n,`${u.join("")}
  <path d="M${o} ${i} H${r}"/>
  <path d="M${o} ${i} l-9 15 h18 z"/>
  <path d="M${r} ${i} l-9 15 h18 z">
  </path>
  <path d="M${o} ${i+15} H${r}" stroke="${Z}" stroke-width="1" stroke-dasharray="3 3"/>
  <text x="${c}" y="46" text-anchor="middle" font-size="12" fill="${$t}" stroke="none">${$e(d)}</text>
  <text x="${c}" y="${i+34}" text-anchor="middle" font-size="12" fill="${Z}" stroke="none">L = ${a} m</text>`,t.caption)}function Fa(t){const n=t.caption?220:196,a=Number(t.width)>0?Number(t.width):300,s=Number(t.height)>0?Number(t.height):500,o=132,r=92,i=(300-o)/2,c=62;return we(300,n,`<text x="${300/2}" y="40" text-anchor="middle" font-size="12" fill="${$t}" stroke="none">截面示意图（单位 mm）</text>
  <rect x="${i}" y="${c}" width="${o}" height="${r}"/>
  <path d="M${i-12} ${c} H${i-12} V${c+r} H${i-12}" stroke="${Z}" stroke-width="1"/>
  <text x="${i-18}" y="${c+r/2}" text-anchor="middle" font-size="11" fill="${Z}" stroke="none" transform="rotate(-90 ${i-18} ${c+r/2})">h = ${s}</text>
  <text x="${300/2}" y="${c+r+22}" text-anchor="middle" font-size="11" fill="${Z}" stroke="none">b = ${a}</text>`,t.caption)}function Wa(t){const e=(t.steps??[]).filter(d=>d&&d.name).slice(0,6),n=360,s=74+Math.max(1,e.length)*30+(t.caption?22:6),o=Math.max(1,...e.map(d=>Number(d.start)+Number(d.duration))),r=92,i=n-24,c=(i-r)/o,l=e.map((d,u)=>{const p=62+u*30,b=r+Number(d.start)*c,$=Math.max(6,Number(d.duration)*c);return`<text x="${r-10}" y="${p+11}" text-anchor="end" font-size="11" fill="${re}" stroke="none">${$e(d.name)}</text>
  <rect x="${b}" y="${p}" width="${$}" height="14" fill="${$t}" opacity="0.12" stroke="${$t}" stroke-width="1"/>
  <text x="${b+$/2}" y="${p+11}" text-anchor="middle" font-size="10" fill="${$t}" stroke="none">${d.duration}</text>`}).join(`
  `);return we(n,s,`<text x="${r}" y="38" font-size="11" fill="${Z}" stroke="none">施工进度（天）→</text>
  <path d="M${r} 48 H${i}" stroke="${Z}" stroke-width="1"/>
  ${l}`,t.caption)}function Ka(t){if(!t||!t.kind)return"";let e="";return t.kind==="beam"?e=Ua(t):t.kind==="section"?e=Fa(t):t.kind==="flow"&&(e=Wa(t)),e?`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`:""}function Ga(t){if(!t||typeof t!="object")return null;const e=t,n=String(e.kind??e.type??"").toLowerCase();if(n!=="beam"&&n!=="section"&&n!=="flow")return null;const a=r=>{const i=Number(r);return Number.isFinite(i)&&i>0?i:void 0},s=String(e.load??"").toLowerCase(),o=Array.isArray(e.steps)?e.steps.map(r=>({name:String(r.name??r.title??""),start:Number(r.start??0),duration:Number(r.duration??0)})).filter(r=>r.duration>0):void 0;return{kind:n,caption:typeof e.caption=="string"?e.caption.slice(0,40):void 0,span:a(e.span),load:s==="point"?"point":s==="uniform"?"uniform":void 0,value:a(e.value),width:a(e.width),height:a(e.height),steps:o}}const Ja=["基础","进阶","冲刺"],Va=[5,10,20];async function Qa(){const e=[...new Set((m.bank??[]).map(f=>f.subject).filter(Boolean))][0]??"默认题库",n=document.createElement("div");if(n.innerHTML=`
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${v(e)}" placeholder="如 一建建筑">
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
          ${Va.map(f=>`<option value="${f}">${f} 道</option>`).join("")}
        </select>
      </label>
      <label class="field grow">
        <span class="field-label">难度</span>
        <select class="input" data-role="level">
          ${Ja.map(f=>`<option value="${f}">${f}</option>`).join("")}
        </select>
      </label>
    </div>
    <label class="field" style="margin-top:10px">
      <span class="field-label">考点提示 <span class="muted small">（可选，越具体越好）</span></span>
      <textarea class="textarea" data-role="hint" rows="2" placeholder="如：混凝土养护时间、水化热控制"></textarea>
    </label>
    <p class="muted small" style="margin:10px 0 0">生成后会先预览，确认了才写进题库。每天最多生成 10 次。</p>`,!await T({title:"AI 出题",body:n,actions:[{label:"取消",value:!1},{label:"开始生成",value:!0,variant:"primary"}]}))return;const s=f=>n.querySelector(`[data-role="${f}"]`)?.value.trim()??"",o=s("subject")||"默认题库",r=s("chapter"),i=Number(s("count"))||5,c=s("level")||"基础",l=s("hint"),d=[`题库：${o}`,r?`章节：${r}`:"",`数量：${i} 道`,`难度：${c}`,l?`考点提示：${l}`:"","要求：贴近真实考试题型，四个选项，答案唯一，附一句解析。"].filter(Boolean).join(`
`);g.info("正在生成，大约 10–20 秒…");let u=[];try{const f=await E.ai.generate(d);u=ye(f.result??"")}catch(f){g.error(f instanceof j?f.message:"生成失败，稍后再试");return}if(!u.length){g.error("AI 返回的内容没法解析成题目，换个提示再试");return}let p=0;u=u.map(f=>{const y=Ga(f.figure),k=Ka(y);if(!k)return f;p+=1;const w=(y?.caption??"示意图").replace(/"/g,"");return{...f,q:`${f.q}
<img src="${k}" alt="${w}">`}});const $=document.createElement("div");if($.innerHTML=`
    <div class="muted small" style="margin-bottom:8px">共 ${u.length} 道${p?`（${p} 道带示意图）`:""}，确认后写入「${v(o)}」</div>
    <div class="import-list">
      ${u.slice(0,20).map((f,y)=>{const k=/<img\b[^>]*src="([^"]+)"/i.exec(String(f.q??"")),w=k?`<img class="gen-thumb" src="${k[1]}" alt="示意图">`:"",L=String(f.q??"").replace(/<img\b[^>]*>/gi," ").replace(/\s+/g," ").trim();return`<div class="import-item gen-item"><div class="gen-row"><b>${y+1}.</b> ${v(L.slice(0,64))}${Array.isArray(f.opts)&&f.opts.length?` <span class="muted">· ${f.opts.length} 选项</span>`:""}</div>${w}</div>`}).join("")}
    </div>`,!!await T({title:"预览生成的题目",body:$,actions:[{label:"不要了",value:!1},{label:`导入 ${u.length} 道`,value:!0,variant:"primary"}]}))try{const f=u.map(y=>({...y,subject:o,chapter:y.chapter||r}));await E.questions.add(f),G("bank"),await tt(!0),g.ok(`已生成并导入 ${f.length} 道题`)}catch(f){g.error(f instanceof j?f.message:"导入失败")}}const Xa=`
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
`;function ht(t){return String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]??e)}function Ue(t,e={}){if(!t.length){g.info("没有可导出的题目");return}const n=e.title||"练习试卷",a=new Date().toLocaleDateString("zh-CN"),s=e.answers!==!1,o=t.map((l,d)=>{const u=it(l),p=(l.opts??[]).map((b,$)=>{const A=b.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return`<li><span class="k">${String.fromCharCode(65+$)}</span>${_(A)}</li>`}).join("");return`<article class="q">
        <div class="q-no">${String(d+1).padStart(2,"0")} · ${Et[u]}${l.chapter?` · ${ht(l.chapter)}`:""}</div>
        <div class="q-body">${_(l.q)}</div>
        ${p?`<ul class="q-opts">${p}</ul>`:'<p class="q-tag">（简答题，请在答题纸上作答）</p>'}
      </article>`}).join(""),r=s?`<section class="answer-key">
        <h2>参考答案</h2>
        <ol>${t.map((l,d)=>`<li><span class="k">${String(d+1).padStart(2,"0")}</span>${ht(P(l.a,l.opts??[]))}</li>`).join("")}</ol>
      </section>`:"",i=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${ht(n)} · ${a}</title>
<style>${Xa}</style></head>
<body>
  <header class="sheet-head">
    <div class="sheet-kicker">Origin Quiz / Practice Sheet</div>
    <h1 class="sheet-title">${ht(n)}</h1>
    <div class="sheet-meta">${a} · 共 ${t.length} 题${e.subtitle?" · "+ht(e.subtitle):""} · 姓名 __________ 得分 ______</div>
  </header>
  ${o}
  ${r}
  <p class="tips">由「原点 · Origin」导出 · 打印对话框里选择「另存为 PDF」即可保存。</p>
</body></html>`,c=window.open("","_blank");if(!c){g.error("浏览器拦住了新窗口，请允许弹出窗口后重试");return}c.document.open(),c.document.write(i),c.document.close(),c.focus(),g.ok(`已生成 ${t.length} 题的打印版，在打印里选「另存为 PDF」`)}const bn=914400,Ya=6.4*bn,Za=4.2*bn,ts=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function vn(t,e={}){return`<w:r><w:rPr>${['<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>',e.bold?"<w:b/>":"",e.italic?"<w:i/>":"",`<w:sz w:val="${e.size??21}"/><w:szCs w:val="${e.size??21}"/>`,e.color?`<w:color w:val="${e.color}"/>`:""].join("")}</w:rPr><w:t xml:space="preserve">${ts(t)}</w:t></w:r>`}function F(t,e={}){const n=e.before||e.after?`<w:spacing w:before="${e.before??0}" w:after="${e.after??0}"/>`:"",a=e.indent||e.hanging?`<w:ind w:left="${e.indent??0}" w:hanging="${e.hanging??0}"/>`:"";return`<w:p><w:pPr>${n}${a}</w:pPr>${t?vn(t,e):""}</w:p>`}function es(t,e,n,a){return`<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${Math.round(n)}" cy="${Math.round(a)}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${e}" name="Picture ${e}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${e}" name="image${e}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${t}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${Math.round(n)}" cy="${Math.round(a)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`}function ns(t){return new Promise(e=>{const n=new Image;n.onload=()=>e({w:n.naturalWidth||640,h:n.naturalHeight||480}),n.onerror=()=>e(null),n.src=t})}function as(t){const e=/^data:image\/([a-zA-Z+]+);base64,(.+)$/.exec(t);if(!e)return null;try{const n=atob(e[2]),a=new Uint8Array(n.length);for(let o=0;o<n.length;o+=1)a[o]=n.charCodeAt(o);const s=e[1].toLowerCase()==="jpeg"?"jpeg":e[1].toLowerCase();return{bytes:a,ext:s}}catch{return null}}function ss(t){const e=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html"),n=[],a=s=>{if(s.nodeType===Node.TEXT_NODE){const r=s.textContent??"";r.trim()&&n.push({kind:"text",value:r.replace(/\s+/g," ")});return}if(s.nodeType!==Node.ELEMENT_NODE)return;const o=s;if(o.tagName==="IMG"){n.push({kind:"img",value:o.getAttribute("src")??""});return}if(o.tagName==="BR"){n.push({kind:"br",value:""});return}o.childNodes.forEach(a)};return e.body.firstElementChild?.childNodes.forEach(a),n}async function rs(t,e){const n=[],a=[];let s=0;n.push(F(e.title??"题库练习卷",{size:32,bold:!0,after:80}));const o=[e.subtitle??"",`${t.length} 题`,"姓名 ________","得分 ________"].filter(Boolean).join("　　");n.push(F(o,{size:18,color:"666666",after:200}));for(let p=0;p<t.length;p+=1){const b=t[p],$=it(b),A=String(p+1).padStart(2,"0");n.push(F(`${A}　${Et[$]}${b.chapter?"　·　"+b.chapter:""}`,{size:18,bold:!0,color:"1440FF",before:200,after:60}));const f=ss(b.q);let y="";const k=()=>{y.trim()&&n.push(F(y.trim(),{after:60})),y=""};for(const w of f)if(w.kind==="text")y+=w.value;else if(w.kind==="br")k();else{k();const L=as(w.value);if(!L)continue;const dt=await ns(w.value)??{w:640,h:480};let jt=dt.w*9525,Lt=dt.h*9525;const Le=Math.min(Ya/jt,Za/Lt,1);jt*=Le,Lt*=Le,s+=1;const qe=`rId${100+s}`,On=`image${s}.${L.ext}`;a.push({relId:qe,name:On,bytes:L.bytes,cx:jt,cy:Lt,id:s}),n.push(es(qe,s,jt,Lt))}if(k(),Array.isArray(b.opts)&&b.opts.length)b.opts.forEach((w,L)=>{const nt=String.fromCharCode(65+L),dt=String(w).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");n.push(F(`${nt}. ${dt}`,{size:20,hanging:280,indent:280,after:20}))});else if($==="blank")n.push(F("答：________________________________",{after:40}));else if($==="essay"){for(let w=0;w<3;w+=1)n.push(F("　",{after:60}));n.push(F("（请在答题纸上作答）",{size:18,color:"999999",after:40}))}}e.withAnswers!==!1&&(n.push(`<w:p><w:pPr><w:pageBreakBefore/></w:pPr>${vn("参考答案",{size:28,bold:!0})}</w:p>`),t.forEach((p,b)=>{const $=String(b+1).padStart(2,"0");n.push(F(`${$}　${P(p.a,p.opts)||"（无）"}`,{size:20,after:40}))}));const r=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>${n.join("")}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="851" w:footer="992" w:gutter="0"/></w:sectPr></w:body></w:document>`,i='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',c='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',l='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+a.map(p=>`<Relationship Id="${p.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${p.name}"/>`).join("")+"</Relationships>",d={"[Content_Types].xml":qt(i),"_rels/.rels":qt(c),"word/document.xml":qt(r),"word/_rels/document.xml.rels":qt(l)};for(const p of a)d[`word/media/${p.name}`]=p.bytes;const u=Bn(d,{level:6});return new Blob([u],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})}async function Fe(t,e={}){if(!t.length){g.error("没有可导出的题目");return}try{const n=await rs(t,e),a=URL.createObjectURL(n),s=document.createElement("a"),o=new Date().toISOString().slice(0,10);s.href=a,s.download=`${(e.title??"题库试卷").replace(/[\\/:*?"<>|]/g,"-")}-${o}.docx`,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(a),4e3),g.ok(`已导出 ${t.length} 题的 Word 文档`)}catch(n){g.error(n instanceof Error?`导出失败：${n.message}`:"导出失败")}}function os(t){const e=t.replace(/```json/gi,"```").trim(),n=/```([\s\S]*?)```/.exec(e)?.[1]??e,a=n.indexOf("{"),s=n.lastIndexOf("}");return a===-1||s<=a?"{}":n.slice(a,s+1)}const X=20,h={search:"",subject:"all",type:"all",edit:!1,page:0,selected:new Set};function yn(){h.search="",h.subject="all",h.type="all",h.edit=!1,h.page=0,h.selected.clear()}function Y(){return m.bank??[]}function is(){return["all",...Array.from(new Set(Y().map(t=>t.subject||"默认题库")))]}function It(){const t=h.search.trim().toLowerCase();return Y().filter(e=>h.subject!=="all"&&(e.subject||"默认题库")!==h.subject||h.type!=="all"&&it(e)!==h.type?!1:t?C(e.q).toLowerCase().includes(t)||e.opts.some(n=>C(n).toLowerCase().includes(t)):!0)}function $n(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(n=>String.fromCharCode(65+n)).join(" / ")}function cs(){const t=It(),e=Math.max(1,Math.ceil(t.length/X));h.page>e-1&&(h.page=e-1),h.page<0&&(h.page=0);const n=t.slice(h.page*X,h.page*X+X),a=is().map(l=>`<button class="chip" data-act="subject" data-subject="${v(l)}" aria-pressed="${h.subject===l}">
          ${l==="all"?"全部":v(l)}
        </button>`).join(""),s=Y(),o={single:0,multi:0,judge:0,blank:0,essay:0};s.forEach(l=>{o[it(l)]+=1});const r=[["all","全部",s.length],["single","单选",o.single],["multi","多选",o.multi],["judge","判断",o.judge],["blank","填空",o.blank],["essay","简答",o.essay]].filter(([l,,d])=>l==="all"||d>0).map(([l,d,u])=>`<button class="chip" data-act="type" data-type="${l}" aria-pressed="${h.type===l}">${d} <span class="chip-n">${u}</span></button>`).join(""),i=n.map((l,d)=>{const u=it(l),p=String(h.page*X+d+1).padStart(2,"0");return`<tr class="q-row ${h.edit?"selectable":"is-clickable"}" data-id="${l.id}" ${h.edit?"":'data-act="peek"'}>
        <td class="c-no">${h.edit?`<button class="checkbox" data-act="select" data-id="${l.id}" aria-pressed="${h.selected.has(l.id)}">✓</button>`:p}</td>
        <td class="c-q">
          <div class="q-cell">${fn(_(l.q),h.search)}</div>
          ${l.opts.length?`<div class="q-sub">${l.opts.length} 个选项</div>`:""}
        </td>
        <td class="c-type"><span class="tag tag-type">${Et[u]}</span></td>
        <td class="c-chapter muted">${v(l.chapter||"—")}</td>
        <td class="c-ans"><span class="tag tag-ok">${v($n(l))}</span></td>
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
                 <button class="btn btn-sm" data-act="page-prev" ${h.page===0?"disabled":""}>← 上一页</button>
                 <span class="pager-info">${h.page+1} / ${e} 页 · 共 ${t.length} 题</span>
                 <button class="btn btn-sm" data-act="page-next" ${h.page>=e-1?"disabled":""}>下一页 →</button>
               </div>`:`<p class="muted small table-count">共 ${t.length} 题</p>`}`:`<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${h.search?"没有匹配的题目":"题库还是空的"}</div><div class="empty-desc">${h.search?"换个关键词试试":"点右上角「⇪」导入 JSON / TXT / Word / 图片，或点「＋」手写"}</div></div>`;return`
    <h1 class="page-title">题库</h1>
    <div class="search-box">
      <span class="ico">⌕</span>
      <input type="search" placeholder="搜索题干或选项（/ 聚焦）" data-role="search" value="${v(h.search)}" enterkeyhint="search">
    </div>
    <div class="tool-row">
      <button class="tool-btn" data-act="import" title="导入题库">⇪<span>导入</span></button>
      <button class="tool-btn" data-act="generate" title="AI 出题">✦<span>出题</span></button>
      <button class="tool-btn" data-act="add" title="添加题目">＋<span>新建</span></button>
      <button class="tool-btn" data-act="print" title="导出试卷（打印 / 存 PDF）">⎙<span>试卷</span></button>
      <button class="tool-btn" data-act="docx" title="导出 Word（.docx）">⤓<span>Word</span></button>
      <button class="tool-btn" data-act="toggle-edit" title="批量管理">${h.edit?"✓":"☰"}<span>批量</span></button>
    </div>
    <div class="chips">${a}</div>
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
    ${c}`}async function oe(t){const e=!t,n={editor:null},a=document.createElement("div");if(a.innerHTML=`
    <label class="field">
      <span class="field-label">题干</span>
      <div data-role="q-host"></div>
    </label>
    <div class="row" style="gap:8px;margin-top:-8px;flex-wrap:wrap">
      <span class="muted small">粗体 / 上下标 / 列表 / ∑ 公式 / ▣ 图片（自动压缩内联）</span>
    </div>
    <label class="field">
      <span class="field-label">选项（每行一个，留空表示简答题）</span>
      <textarea class="textarea" data-role="opts" placeholder="A. 选项一&#10;B. 选项二">${v((t?.opts??[]).join(`
`))}</textarea>
    </label>
    <label class="field">
      <span class="field-label">答案（单选 A；多选 A,B；简答直接写文字）</span>
      <input class="input" data-role="a" value="${v(t?$n(t):"")}" placeholder="A">
    </label>
    <div class="row" style="gap:10px">
      <label class="field grow">
        <span class="field-label">章节</span>
        <input class="input" data-role="chapter" value="${v(t?.chapter??"")}" placeholder="如 第三章">
      </label>
      <label class="field grow">
        <span class="field-label">题库</span>
        <input class="input" data-role="subject" value="${v(t?.subject??"默认题库")}" placeholder="默认题库">
      </label>
    </div>
    <label class="field">
      <span class="field-label">解析 <span class="muted small">（错题复习时直接看，不用每次问 AI）</span></span>
      <textarea class="textarea" data-role="explain" rows="3" placeholder="为什么选它、其他选项错在哪">${v(t?.explain??"")}</textarea>
    </label>
    <div class="row" style="justify-content:flex-end;gap:8px;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="gen-explain">✦ 生成解析</button>
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`,!await T({title:e?"添加题目":"编辑题目",body:a,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:u=>{const p=u.querySelector('[data-role="q-host"]');p&&(n.editor=La({value:t?.q??"",placeholder:"输入题干；可用工具栏插图、写公式（$…$）",minHeight:110}),p.appendChild(n.editor.el));const b=u.querySelector('[data-role="gen-explain"]');b?.addEventListener("click",async()=>{const A=C(n.editor?.getValue()??"").trim(),f=u.querySelector('[data-role="opts"]')?.value??"",y=u.querySelector('[data-role="a"]')?.value??"";if(!A){g.error("先写题干，AI 才能写解析");return}const k=u.querySelector('[data-role="explain"]'),w=b.textContent??"";b.disabled=!0,b.textContent="生成中…";try{const L=await E.ai.explain(`题目：${A}
选项：${f.split(`
`).join("；")}
正确答案：${y}`);k&&(k.value=(L.result??"").trim()),g.ok("解析已生成，可再手动润色")}catch(L){g.error(L instanceof j?L.message:"生成失败")}finally{b.disabled=!1,b.textContent=w}});const $=u.querySelector('[data-role="classify"]');$&&$.addEventListener("click",async()=>{const A=C(n.editor?.getValue()??"").trim();if(!A){g.error("先写题干，AI 才能判断归类");return}const f=u.querySelector('[data-role="opts"]')?.value??"",y=$.textContent??"";$.disabled=!0,$.textContent="归类中…";try{const k=await E.ai.classify(`题目：${A}
选项：${f.split(`
`).join("；")}`),w=JSON.parse(os(k.result??"{}")),L=u.querySelector('[data-role="subject"]'),nt=u.querySelector('[data-role="chapter"]');w.subject&&L&&(L.value=String(w.subject).slice(0,24)),w.chapter&&nt&&(nt.value=String(w.chapter).slice(0,24)),g.ok("已根据题目填入题库与章节")}catch{g.error("AI 归类失败，可手动填写")}finally{$.disabled=!1,$.textContent=y}})}}))return;const o=u=>a.querySelector(`[data-role="${u}"]`).value,r=(n.editor?.getValue()??"").trim();if(!C(r).trim()&&!/<img/i.test(r)){g.error("题干不能为空");return}const i=o("opts").split(`
`).map(u=>u.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),c=o("a").trim();let l="";if(i.length){const p=c.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(b=>b.charCodeAt(0)-65).filter(b=>b>=0&&b<i.length);if(!p.length){g.error("答案请填选项字母，如 A 或 A,B");return}l=p.length===1?p[0]:p}else l=c;const d={q:r,opts:i,a:l,chapter:o("chapter").trim(),subject:o("subject").trim()||"默认题库",explain:o("explain").trim()};try{if(e)await E.questions.add([d]);else try{await E.questions.update(t.id,d,{baseUpdatedAt:t.updated_at})}catch(u){if(u instanceof j&&u.status===409){if(!await lt({title:"这道题在别处被改过",message:"另一台设备保存了这题的更新版本。要用你现在的内容覆盖它吗？",okText:"覆盖",danger:!0}))return;await E.questions.update(t.id,d,{force:!0})}else throw u}G("bank"),await tt(!0),g.ok(e?"题目已添加":"题目已保存")}catch(u){g.error(u instanceof j?u.message:"保存失败")}}async function ls(){await za()}function ds(){const t=Y().filter(s=>h.selected.has(s.id));if(!t.length){g.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=`题库-${t.length}题.json`,a.click(),URL.revokeObjectURL(n),g.ok(`已导出 ${t.length} 题`)}async function us(){await tt()}async function ps(t,e){switch(t){case"subject":return h.subject=e.dataset.subject??"all",!0;case"toggle-edit":return h.edit=!h.edit,h.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return h.selected.has(n)?h.selected.delete(n):h.selected.add(n),!0}case"add":return await oe(),!0;case"edit":{const n=Y().find(a=>a.id===Number(e.dataset.id));return n&&await oe(n),!0}case"delete-selected":{const n=[...h.selected];if(!n.length||!await lt({title:"删除题目",message:`确定删除选中的 ${n.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await E.questions.remove(n),h.selected.clear(),G("bank"),await tt(!0),g.ok("已删除")}catch(a){g.error(a instanceof j?a.message:"删除失败")}return!0}case"export":return ds(),!0;case"print":return Ue(It(),{title:`题库 · ${h.subject==="all"?"全部":h.subject}`}),!0;case"docx":return await Fe(It(),{title:`题库 · ${h.subject==="all"?"全部":h.subject}`,subtitle:"原点 · Origin"}),!0;case"docx-selected":return await Fe(Y().filter(n=>h.selected.has(n.id)),{title:"选中题目 · 试卷",subtitle:"原点 · Origin"}),!0;case"print-selected":return Ue(Y().filter(n=>h.selected.has(n.id)),{title:"选中题目 · 试卷"}),!0;case"page-prev":return h.page=Math.max(0,h.page-1),!0;case"page-next":return h.page+=1,!0;case"select-all":{const n=It().slice(h.page*X,h.page*X+X),a=n.every(s=>h.selected.has(s.id));return n.forEach(s=>a?h.selected.delete(s.id):h.selected.add(s.id)),!0}case"generate":return await Qa(),!0;case"import":return await ls(),!0;case"type":{const n=e.dataset.type;return n&&(h.type=n,h.page=0),!0}case"peek":{const n=Number(e.dataset.id),a=Y().find(s=>s.id===n);return a&&await ms(a),!0}case"search":return!0;default:return!1}}async function ms(t){const e=it(t),n=document.createElement("div");n.className="peek",n.innerHTML=`
    <div class="peek-meta">
      <span class="tag tag-type">${Et[e]}</span>
      ${t.subject?`<span class="tag">${v(t.subject)}</span>`:""}
      ${t.chapter?`<span class="tag">${v(t.chapter)}</span>`:""}
    </div>
    <div class="peek-q q-text">${_(t.q)}</div>
    ${t.opts.length?`<ul class="peek-opts">${t.opts.map((s,o)=>`<li class="${(Array.isArray(t.a)?t.a.includes(o):t.a===o)?"is-hit":""}"><b>${String.fromCharCode(65+o)}</b>${_(String(s).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</li>`).join("")}</ul>`:""}
    <div class="peek-ans"><span class="muted">答案</span> ${v(P(t.a,t.opts)||"（无）")}</div>`,await T({title:"题目预览",body:n,actions:[{label:"关闭",value:"close"},{label:"编辑这题",value:"edit",variant:"primary"}]})==="edit"&&await oe(t)}function fs(t){return t.dataset.role==="search"?(h.search=t.value,h.page=0,!0):!1}const gs="modulepreload",hs=function(t){return"/"+t},We={},bs=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let r=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");s=r(n.map(l=>{if(l=hs(l),l in We)return;We[l]=!0;const d=l.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":gs,d||(p.as="script"),p.crossOrigin="",p.href=l,c&&p.setAttribute("nonce",c),document.head.appendChild(p),d)return new Promise((b,$)=>{p.addEventListener("load",b),p.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${l}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return s.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function wn(t){return new Promise(e=>window.setTimeout(e,t))}function vs(t,e,n=620,a="%"){const s=performance.now(),o=r=>{const i=Math.min((r-s)/n,1),c=1-Math.pow(1-i,3);t.innerHTML=`${Math.round(e*c)}<span>${a}</span>`,i<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}function Ot(t=12){D.vibration&&navigator.vibrate?.(t)}let S=null,wt=null;function ft(){return S?S.options.questions[S.idx]??null:null}function zt(t){const e=S;let n=e.records.get(t.id);return n||(n={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,n)),n}function xn(){const t=S;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function ys(){const t=S;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function $s(t,e){if(I(t.a))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${v(e.text)}</textarea>
      </div>`;const n=At(t.a);return`<div class="opts" data-multi="${n.length>1}">${t.opts.map((s,o)=>{let r="";return e.submitted?n.includes(o)?r="correct":e.picked.includes(o)?r="wrong":r="muted":e.picked.includes(o)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${o}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+o)}</span>
        <span class="opt-text">${_(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function ws(t,e){if(!e.submitted)return"";const n=I(t.a)?String(t.a):P(t.a,t.opts),a=I(t.a)?C(e.text)||"（空）":P(e.picked.length?e.picked:[],t.opts)||"（未选）";if(I(t.a)){const o=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${S?.busy?"disabled":""}>✦ AI 阅卷</button>
          <button class="btn btn-sm" data-act="mark" data-ok="1">我答对了</button>
          <button class="btn btn-sm" data-act="mark" data-ok="0">没答对</button>
        </div>`:`<div class="essay-actions"><span class="tag ${e.correct?"tag-ok":"tag-bad"}">${e.correct?"已标记：答对":"已标记：答错"}</span></div>`;return`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${v(n)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${v(a)}
      <div class="divider"></div>
      ${o}
    </div>`}const s=(t.explain??"").trim();return`<div class="answer-panel">
    <div class="ai-title">${e.correct?"✅ 回答正确":"❌ 回答错误"}</div>
    正确答案：${v(P(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${v(a)}`}
    ${s?`<div class="divider"></div><div class="ai-title" style="color:var(--text-3)">解析</div><div class="explain-body">${_(s)}</div>`:""}
  </div>`}function xs(){const t=S,e=ft();if(!e)return"";const n=zt(e),a=t.options.questions.length,s=a?Math.round((t.idx+(n.submitted?1:0))/a*100):0,o=At(e.a).length>1&&!I(e.a);return`
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
          ${e.subject?`<span class="tag tag-accent">${v(e.subject)}</span>`:""}
          ${e.chapter?`<span class="tag">${v(e.chapter)}</span>`:""}
          <span class="grow"></span>
          <span>${o?"多选":I(e.a)?"简答":"单选"}</span>
        </div>
        <div class="q-text">${_(e.q)}</div>
        ${$s(e,n)}
        ${ws(e,n)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${Dt(e.id)}" aria-label="收藏">${Dt(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!me()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${n.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===a-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${o||I(e.a)?"提交答案":"查看答案"}</button>`}
    </div>`}function ks(t,e){S={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},H(),wt=n=>{const a=S;if(!a)return;const s=n.target,o=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(n.key==="Escape"){if(document.querySelector(".modal-layer"))return;Ae();return}if(o)return;const r=ft();if(!r)return;const i=zt(r);if(n.key===" "||n.key==="Enter"){const l=a.root?.querySelector('[data-act="submit"]'),d=a.root?.querySelector('[data-act="next"]');l?(n.preventDefault(),B("submit",l)):d&&(n.preventDefault(),B("next",d));return}if(n.key==="ArrowRight"){n.preventDefault(),i.submitted?ke():B("submit",a.root.querySelector('[data-act="submit"]'));return}if(n.key==="ArrowLeft"){n.preventDefault(),B("prev",a.root);return}const c=n.key.toLowerCase();if(/^[1-9]$/.test(c)||/^[a-h]$/.test(c)){const l=/^[1-9]$/.test(c)?Number(c)-1:c.charCodeAt(0)-97;if(l<r.opts.length){n.preventDefault();const d=a.root?.querySelector(`.opt[data-idx="${l}"]`);d&&B("pick",d)}return}c==="s"?B("fav",a.root):c==="n"?B("note",a.root):c==="e"?B("ai",a.root):c==="g"?B("ai-grade",a.root):c==="?"&&bs(()=>Promise.resolve().then(()=>nr),void 0).then(l=>l.openShortcuts())},document.addEventListener("keydown",wt),t.addEventListener("submit",n=>n.preventDefault()),t.addEventListener("input",kn)}function H(){const t=S;t?.root&&(t.root.innerHTML=xs())}function kn(t){const e=t.target;e?.dataset.role!=="essay"||!S||(S.textDraft=e.value)}async function Jt(t,e){const n=S;if(e.submitted=!0,I(t.a))e.correct=null;else if(e.correct=tn(e.picked,t.a),e.correct){Ot(10);const a=Ss();a>=3&&a%3===0&&g.ok(`连对 ${a} 题，保持住`)}else Ot([14,40,14]),xe(t,e);H(),e.correct&&n.options.questions.length>n.idx+1&&(await wn(600),S&&S.idx===n.idx&&ke())}function Ss(){const t=S;let e=0;for(let n=t.idx;n>=0;n-=1){const a=t.records.get(t.options.questions[n].id);if(a?.submitted)if(a.correct===!0)e+=1;else break}return e}async function xe(t,e){try{await E.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(n){n instanceof j&&n.status!==401&&g.error(`错题保存失败：${n.message}`)}}function ke(){const t=S,e=t.options.questions.length;if(t.idx>=e-1){As();return}t.idx+=1,t.textDraft="",H(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function Se(){wt&&document.removeEventListener("keydown",wt),wt=null,S?.root?.removeEventListener("input",kn),S?.root?.replaceChildren(),S=null}async function Ae(){const t=S;if(!t)return;const e=xn();if(!await lt({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;ft()&&Sn();const s=t.options.onExit;Se(),s?.()}function Sn(){const t=S;if(!t)return;t.options.source==="sequential"&&aa(t.idx);const e=t.options.questions.slice(0,5).map(n=>C(n.q).slice(0,40));ra(e)}async function As(){const t=S;Sn();const e=t.options.questions.length,n=xn(),a=ys(),s=n-a,o=n?Math.round(a/n*100):0;if(Se(),await T({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${a}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${n}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:i=>{const c=i.querySelector('[data-role="acc"]');c&&vs(c,o)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function Es(t,e,n){e.correct=n,n?Ot(10):xe(t,e),H(),n&&g.ok("已记为答对")}async function js(t,e){const n=S;if(n){n.busy=!0,H();try{const a=[`题目：${C(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${C(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await E.ai.grade(a),o=String(s.result||""),r=o.includes("得分")&&!o.includes("不得分");e.correct=r,r?Ot(10):xe(t,e),g.ok(r?"AI 阅卷：答对":"AI 阅卷：答错")}catch(a){g.error(a instanceof j?a.message:"AI 阅卷失败，请稍后再试")}finally{n.busy=!1,H()}}}async function Ls(){const t=ft();if(!t)return;const e=me()[String(t.id)]??"",n=document.createElement("div");n.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${v(e)}</textarea>`;const a=n.querySelector("textarea");await T({title:"我的笔记",body:n,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>a.focus()})&&(na(t.id,a.value),g.ok("笔记已保存"),H())}async function qs(){const t=ft();if(!t)return;const e=zt(t),n=[`题目：${C(t.q)}`,t.opts.length?`选项：${t.opts.map((r,i)=>`${String.fromCharCode(65+i)}. ${C(r)}`).join("；")}`:"",`正确答案：${I(t.a)?t.a:P(t.a,t.opts)}`,e.submitted?`我的作答：${I(t.a)?e.text:P(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),a=document.createElement("div");a.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',T({title:"AI 深度解析",body:a,actions:[{label:"关闭",value:"close"}]});const s=a.querySelector('[data-role="text"]'),o=a.querySelector(".ai-title");try{let r="";const i=await E.ai.explainStream(n,l=>{r+=l,s.innerHTML=`${v(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),c=i.provider==="deepseek"?"DeepSeek":i.provider==="zhipu"?"智谱":"";o.textContent=r?`✦ AI 解析${c?` · ${c}`:""}${i.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=v(i.text||r).replace(/\n/g,"<br>"):await Ts(s,i.text??""),s.classList.remove("cursor")}catch(r){const i=r instanceof j?r.message:"AI 解析失败，请稍后重试";g.error(i),o.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=i}}async function Ts(t,e){for(let n=0;n<e.length;n+=2)t.innerHTML=v(e.slice(0,n+2)).replace(/\n/g,"<br>"),await wn(12)}function Ms(){const t=S;if(!t)return;const e=t.options.questions.map((n,a)=>{const s=t.records.get(n.id),o=a===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${a}" data-state="${o}">${a+1}</button>`}).join("");T({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:n=>{n.querySelectorAll(".nav-cell").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.dataset.idx);!Number.isFinite(s)||!S||(S.idx=s,S.textDraft="",ve(),H())})})}}).then(n=>{n==="finish"&&Ae()})}async function B(t,e){const n=S;if(!n)return!1;const a=ft();if(!a)return!1;const s=zt(a);switch(t){case"pick":{if(s.submitted)return!0;const o=Number(e.dataset.idx);return I(a.a)||(At(a.a).length>1?(s.picked=s.picked.includes(o)?s.picked.filter(i=>i!==o):[...s.picked,o],H()):(s.picked=[o],await Jt(a,s))),!0}case"submit":{if(I(a.a)){const o=n.root?.querySelector('[data-role="essay"]');if(s.text=o?.value??n.textDraft,!s.text.trim())return g.info("先写点什么再提交吧"),!0;await Jt(a,s)}else{if(!s.picked.length)return g.info("请先选择答案"),!0;await Jt(a,s)}return!0}case"ai-grade":return!I(a.a)||S?.busy||await js(a,s),!0;case"mark":return I(a.a)&&Es(a,s,e.dataset.ok==="1"),!0;case"next":return ke(),!0;case"prev":return n.idx>0&&(n.idx-=1,n.textDraft="",H()),!0;case"jump":return n.idx=Number(e.dataset.idx),n.textDraft="",ve(),H(),!0;case"nav":return Ms(),!0;case"exit":return await Ae(),!0;case"fav":return await va(a.id),H(),!0;case"note":return await Ls(),!0;case"ai":return qs(),!0;default:return!1}}let W=null;function Cs(){return!!(W&&document.body.contains(W))}function pt(t){if(!t.questions.length){g.info("这里还没有题目");return}Ke(),W=document.createElement("div"),W.className="quiz",document.body.appendChild(W),document.body.classList.add("is-locked"),ks(W,{...t,onExit:()=>{Ke(),t.onExit?.()}}),sa({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function Ke(){W&&(Se(),W.remove(),W=null,document.body.classList.remove("is-locked"))}async function Vt(t="random"){const e=m.bank??[];if(!e.length){g.info("题库还是空的，先去添加题目吧");return}if(t==="chapter"){const a=await Is(e);if(!a?.length)return;const s=e.filter(r=>a.includes(r.chapter||"未分类")),o=await Rt(s.length);if(o===null)return;pt({questions:s.slice(0,o),source:"chapter",title:"章节练习"});return}const n=await Rt(e.length);if(n!==null){if(t==="sequential"){const a=Math.min(sn(),Math.max(e.length-1,0));pt({questions:e.slice(0,n),source:"sequential",title:"顺序练习",startIndex:a<n?a:0});return}pt({questions:Ze(e).slice(0,n),source:"all",title:"随机练习"})}}async function An(){const t=m.wrong??await ot(!0);if(!t.length){g.info("错题本是空的，先去刷几题吧");return}const e=await Rt(t.length);if(e===null)return;const n=t.slice(0,e).map(a=>({id:a.id,q:a.q,opts:a.opts,a:a.a,chapter:a.chapter,subject:a.subject}));pt({questions:n,source:"wrong",title:"错题重练"})}function Ns(t){if(!t.length){g.info("还没有收藏题目");return}Rt(t.length).then(e=>{e!==null&&pt({questions:Ze(t).slice(0,e),source:"fav",title:"收藏练习"})})}function _s(){const t=rn(),e=m.bank??[];if(!t||!e.length)return g.info("没有可以继续的练习"),!1;const n=new Map(e.map(s=>[s.id,s])),a=t.ids.map(s=>n.get(s)).filter(s=>!!s);return a.length?(pt({questions:a,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,a.length-1)}),!0):(on(),g.info("上次的题目已经不在了"),!1)}function Rt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const n=document.createElement("div");n.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const a=n.querySelector('[data-role="count"]');return a.addEventListener("click",s=>{const o=s.target.closest("button[data-n]");o&&(a.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),o.setAttribute("aria-pressed","true"))}),T({title:"练多少题",body:n,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const o=a.querySelector('button[aria-pressed="true"]');return Number(o?.dataset.n??t)})}async function Is(t){const e=new Map;t.forEach(r=>{const i=r.chapter?.trim()||"未分类";e.set(i,(e.get(i)??0)+1)});const n=[...e.entries()].sort((r,i)=>i[1]-r[1]);if(!n.length)return null;const a=document.createElement("div");if(a.innerHTML=`<div class="list">${n.map(([r,i],c)=>`
      <button class="item" data-chapter="${v(r)}" data-checked="${c===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${v(r)}</span><span class="tag">${i} 题</span></div>
      </button>`).join("")}</div>`,a.addEventListener("click",r=>{const i=r.target.closest("[data-chapter]");i&&(i.dataset.checked=i.dataset.checked==="true"?"false":"true")}),!await T({title:"选择章节",body:a,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const o=Array.from(a.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return o.length?o:null}const rt=new Set;function Ds(){rt.clear()}function ie(){return m.favs??[]}function Os(){const t=ie(),e=m.loading.fav&&!m.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(n=>`
        <div class="item" data-id="${n.id}">
          <div class="item-q">${_(n.q)}</div>
          <div class="item-meta">
            ${n.subject?`<span class="tag tag-accent">${v(n.subject)}</span>`:""}
            ${n.chapter?`<span class="tag">${v(n.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${n.id}">${rt.has(n.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${n.id}">取消收藏</button>
          </div>
          ${rt.has(n.id)?`<div class="item-answer"><div class="right">${v(P(n.a,n.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function Rs(){await kt()}async function Hs(t,e){switch(t){case"practice":return ie().length?(await Ns(ie()),!0):(g.info("还没有收藏的题"),!0);case"reveal":{const n=Number(e.dataset.id);return rt.has(n)?rt.delete(n):rt.add(n),!0}case"remove":{const n=Number(e.dataset.id);try{await E.favorites.remove(n),rt.delete(n),G("fav"),await kt(!0),g.ok("已取消收藏")}catch(a){g.error(a instanceof j?a.message:"操作失败")}return!0}default:return!1}}let N=null,mt=null,xt=null;const Ps=t=>String.fromCharCode(65+t),zs=t=>typeof t.a=="number"||Array.isArray(t.a);function En(t){const e=Math.max(0,Math.round(t/1e3)),n=Math.floor(e/60),a=e%60;return`${String(n).padStart(2,"0")}:${String(a).padStart(2,"0")}`}async function Bs(){const t=(m.bank??[]).filter(zs);if(t.length<3){g.error("题库里的客观题不足 3 道，先导入或手写几道再考");return}const e=document.createElement("div");if(e.innerHTML=`
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
    <p class="muted small" style="margin:12px 0 0">可选 ${t.length} 道客观题；考试中不显示对错。</p>`,!await T({title:"模拟考试",body:e,actions:[{label:"取消",value:!1},{label:"开始考试",value:!0,variant:"primary"}]}))return;const a=(i,c)=>{const l=e.querySelector(`[data-role="${i}"]`),d=Number(l?.value);return Number.isFinite(d)&&d>0?d:c},s=Math.min(t.length,a("count",Math.min(20,t.length))),o=Math.min(180,a("min",15));N={questions:[...t].sort(()=>Math.random()-.5).slice(0,s),picks:new Map,idx:0,endsAt:Date.now()+o*60*1e3,timer:window.setInterval(Fs,1e3),submitted:!1},Us()}function Us(){const t=document.getElementById("app-root")??document.body,e=document.createElement("div");e.className="exam",t.appendChild(e),mt=e,Bt(),xt=n=>{if(!(!N||document.querySelector(".modal-layer"))){if(n.key==="ArrowRight")n.preventDefault(),Ht(1);else if(n.key==="ArrowLeft")n.preventDefault(),Ht(-1);else if(/^[a-h1-8]$/i.test(n.key)){const a=/^\d$/.test(n.key)?Number(n.key)-1:n.key.toLowerCase().charCodeAt(0)-97;jn(a)}}},document.addEventListener("keydown",xt)}function Fs(){const t=N;if(!t||t.submitted)return;if(Date.now()>=t.endsAt){Ee(!0);return}const e=mt?.querySelector(".exam-clock");if(e){const n=t.endsAt-Date.now();e.textContent=En(n),e.classList.toggle("is-urgent",n<=6e4)}}function Bt(){const t=N;if(!t||!mt)return;const e=t.questions[t.idx],n=t.picks.get(e.id)??[],a=t.endsAt-Date.now(),s=t.questions.filter(r=>(t.picks.get(r.id)??[]).length>0).length,o=Array.isArray(e.a)&&e.a.length>1;mt.innerHTML=`
    <div class="exam-bar">
      <button class="icon-btn" data-ex="exit" aria-label="退出">←</button>
      <div class="exam-progress">${t.idx+1} / ${t.questions.length} · 已答 ${s}</div>
      <span class="exam-clock ${a<=6e4?"is-urgent":""}">${En(a)}</span>
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
        <div class="q-text">${_(e.q)}</div>
        <div class="opts">
          ${e.opts.map((r,i)=>`<button class="opt ${n.includes(i)?"is-picked":""}" data-ex="pick" data-idx="${i}">
                <span class="opt-key">${Ps(i)}</span>
                <span class="opt-text">${_(String(r).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
              </button>`).join("")}
        </div>
      </article>
    </div>
    <div class="exam-foot">
      <button class="btn" data-ex="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${t.idx===t.questions.length-1?"":'<button class="btn" data-ex="next">下一题</button>'}
      <button class="btn btn-primary" data-ex="submit">交卷</button>
    </div>`}function jn(t){const e=N;if(!e)return;const n=e.questions[e.idx];if(t<0||t>=n.opts.length)return;const a=Array.isArray(n.a)&&n.a.length>1,s=e.picks.get(n.id)??[];a?e.picks.set(n.id,s.includes(t)?s.filter(o=>o!==t):[...s,t]):e.picks.set(n.id,[t]),Bt()}function Ht(t){const e=N;if(!e)return;const n=e.idx+t;n<0||n>=e.questions.length||(e.idx=n,Bt())}function Ws(){const t=N;if(!t)return;const e=document.createElement("div");e.className="nav-grid",e.innerHTML=t.questions.map((n,a)=>`<button class="nav-cell ${(t.picks.get(n.id)??[]).length>0?"is-done":""} ${a===t.idx?"is-cur":""}" data-idx="${a}">${a+1}</button>`).join(""),e.addEventListener("click",n=>{const a=n.target.closest(".nav-cell");if(!a||!N)return;const s=Number(a.dataset.idx);Number.isFinite(s)&&(N.idx=s,document.querySelector(".modal-layer")?.remove(),Bt())}),T({title:"答题卡",body:e,actions:[{label:"继续答题",value:"close"},{label:"交卷",value:"submit",variant:"primary"}]}).then(n=>{n==="submit"&&Ee(!1)})}async function Ee(t){const e=N;if(!e||e.submitted)return;const n=e.questions.filter(i=>(e.picks.get(i.id)??[]).length===0).length;if(!t&&n>0&&!await lt({title:"还有题没答",message:`还有 ${n} 道没答，确定交卷？`,okText:"交卷"}))return;e.submitted=!0,window.clearInterval(e.timer);let a=0;const s=[];for(const i of e.questions){const c=e.picks.get(i.id)??[];c.length&&tn(c,i.a)?a+=1:s.push(i)}const o=Math.round(a/e.questions.length*100);for(const i of s)E.wrong.add({q:i.q,opts:i.opts,a:i.a,chapter:i.chapter,subject:i.subject,explain:i.explain,user_choice:e.picks.get(i.id)??[]}).catch(()=>{});const r=document.createElement("div");r.className="exam-result",r.innerHTML=`
    <div class="score-big">${o}<span>分</span></div>
    <div class="score-sub">答对 ${a} / ${e.questions.length} · ${t?"时间到自动交卷":"手动交卷"}</div>
    ${s.length?`<div class="wrong-list">${s.slice(0,8).map(i=>`<div class="wrong-item">
                <div class="wrong-q">${_(i.q)}</div>
                <div class="wrong-a">
                  <b class="bad">你选 ${P(e.picks.get(i.id)??[],i.opts)||"未答"}</b>
                  <span class="ok">正确 ${P(i.a,i.opts)}</span>
                </div>
              </div>`).join("")}${s.length>8?`<div class="muted small">…还有 ${s.length-8} 道已进错题本</div>`:""}</div>`:'<div class="all-right">全对，厉害</div>'}`,await T({title:"考试结果",body:r,actions:[{label:"知道了",value:"close",variant:"primary"}]}),Ln()}function Ln(){N&&window.clearInterval(N.timer),N=null,xt&&document.removeEventListener("keydown",xt),xt=null,mt?.remove(),mt=null}function qn(t,e){if(!N)return!1;switch(t){case"pick":return jn(Number(e.dataset.idx)),!0;case"prev":return Ht(-1),!0;case"next":return Ht(1),!0;case"sheet":return Ws(),!0;case"submit":return Ee(!1),!0;case"exit":return(async()=>await lt({title:"退出考试",message:"退出后本次作答不保留，确定吗？",danger:!0,okText:"退出"})&&Ln())(),!0;default:return!1}}function Tn(){return!!N}let Qt="";function Ks(){return(!ia()||!Qt)&&(Qt=ya(),ca()),Qt}function Gs(){const t=new Date,e=a=>String(a).padStart(2,"0"),n="日一二三四五六"[t.getDay()];return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())} / 周${n}`}const Js=t=>String(t).padStart(2,"0");function Vs(){const t=m.bank,e=m.wrong,n=m.favs,a=m.loading,s=rn(),o=cn().slice(0,4),r=sn(),i=t?t.length:0,c=Math.min(20,Math.max(5,i||10)),l='<div class="skeleton sk-line w60"></div><div class="skeleton sk-line w80"></div>',d=u=>u===void 0?"—":String(u).padStart(2,"0");return`
    <section class="masthead">
      <div class="mast-meta">
        <span>${Gs()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${m.user?`@${v(m.user)}`:"未登录"}</span>
      </div>
      <h1 class="mast-title">
        今天<br />练 <em>${String(c).padStart(2,"0")}</em> 题
      </h1>
      <p class="mast-sub">${v(Ks())}</p>
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
             ${o.map((u,p)=>`<div class="recent-row"><span class="recent-idx">${Js(p+1)}</span><span class="recent-text">${v(u)}</span></div>`).join("")}
           </section>`:""}
  `}async function Qs(){await Promise.allSettled([tt(),ot(),kt()])}async function Xs(t,e){switch(t){case"goto":return Pt(e.dataset.tab??"bank"),!0;case"random":return await Vt("random"),!0;case"sequential":return await Vt("sequential"),!0;case"chapter":return await Vt("chapter"),!0;case"wrong":return await An(),!0;case"resume":return _s(),!0;case"exam":return await Bs(),!0;default:return!1}}const Xt=8;function Ys(){const t=[],e=(n,a,s)=>{(n??[]).forEach(o=>t.push({id:o.id,q:o,source:a,tab:s}))};return e(m.bank,"题库","bank"),e(m.wrong,"错题","wrong"),e(m.favs,"收藏","fav"),t}function Zs(t,e){const n=e.toLowerCase();return n?C(t.q.q).toLowerCase().includes(n)||(t.q.opts??[]).some(a=>C(a).toLowerCase().includes(n))||C(t.q.chapter??"").toLowerCase().includes(n)||C(t.q.subject??"").toLowerCase().includes(n):!0}function Ge(t=""){const e=document.createElement("div");e.className="search-panel",e.innerHTML=`
    <div class="search-box">
      <span class="ico">⌕</span>
      <input class="search-input" type="search" data-role="kw" placeholder="搜题干、选项、章节、题库…" value="${t.replace(/"/g,"&quot;")}">
    </div>
    <div class="search-results" data-role="hits"></div>
    <p class="muted small search-foot" data-role="foot"></p>`;const n=Ys(),a=e.querySelector('[data-role="hits"]'),s=e.querySelector('[data-role="foot"]'),o=e.querySelector('[data-role="kw"]'),r=()=>{const i=o.value.trim(),c=n.filter(u=>Zs(u,i));if(!i){const u=c.filter(p=>p.tab==="bank").slice(0,12);a.innerHTML=u.length?u.map(p=>`<button class="hit" data-act="open" data-tab="${p.tab}" data-id="${p.id}">
                <span class="hit-src">${p.source}</span>
                <span class="hit-q">${_(p.q.q)}</span>
              </button>`).join(""):'<p class="muted small">题库还是空的，先去导入吧。</p>',s.textContent=u.length?"输入关键词可以跨题库 / 错题 / 收藏一起搜":"";return}const l=u=>c.filter(p=>p.source===u),d=[];["题库","错题","收藏"].forEach(u=>{const p=l(u);p.length&&(d.push(`<div class="hit-group">${u} · ${p.length}</div>`),d.push(p.slice(0,Xt).map(b=>{const $=it(b.q);return`<button class="hit" data-act="open" data-tab="${b.tab}" data-id="${b.id}">
              <span class="hit-src">${Et[$]}</span>
              <span class="hit-q">${fn(_(b.q.q),i)}</span>
            </button>`}).join("")),p.length>Xt&&d.push(`<div class="hit-more muted small">还有 ${p.length-Xt} 条，缩小关键词试试</div>`))}),a.innerHTML=d.length?d.join(""):`<p class="muted small">没有找到「${i}」</p>`,s.textContent=`共命中 ${c.length} 条`};o.addEventListener("input",r),T({title:"全局搜索",body:e,actions:[{label:"关闭",value:"close"}],onMount:i=>{r();const c=i.querySelector('[data-role="kw"]');c?.focus(),c?.setSelectionRange(c.value.length,c.value.length),i.addEventListener("click",l=>{const d=l.target.closest(".hit");if(!d)return;const u=d.dataset.tab??"bank",p=Number(d.dataset.id),b=n.find($=>$.id===p&&$.tab===u);if(ve(),Pt(u),b){const $=C(b.q.q).slice(0,12);if(u==="bank"){const A=document.querySelector('.view input[data-role="search"]');A&&$&&(A.value=$,A.dispatchEvent(new Event("input",{bubbles:!0})))}}})}})}const Mn=[{keys:"1 2 3 4 / A B C D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1 – 5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/ 或 Ctrl+K",desc:"全局搜索（题库 / 错题 / 收藏）",scope:"全局"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function je(){const t=Mn.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");T({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const tr=["home","bank","wrong","fav","me"];function er(t){const e=t;if(!e)return!1;const n=e.tagName.toLowerCase();return n==="input"||n==="textarea"||n==="select"||e.isContentEditable}function Cn(){document.addEventListener("keydown",t=>{if((t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"){if(document.querySelector(".quiz"))return;t.preventDefault(),Ge();return}if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||er(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),je();return}if(t.key==="/"){t.preventDefault(),Ge();return}const n=Number(t.key);n>=1&&n<=5&&(t.preventDefault(),Pt(tr[n-1]))})}const nr=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:Mn,installShortcuts:Cn,openShortcuts:je},Symbol.toStringTag,{value:"Module"})),ar=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],sr=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function Je(t,e,n){return`<div class="segmented">${t.map(a=>`<button class="seg" data-act="${n}" data-value="${a.value}" aria-pressed="${String(a.value)===String(e)}">${a.label}</button>`).join("")}</div>`}function Ve(t,e){const n=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=t,s.click(),URL.revokeObjectURL(a)}async function rr(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await T({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const n=t.querySelector('[data-role="old"]').value,a=t.querySelector('[data-role="next"]').value;if(a.length<6){g.error("新密码至少 6 位");return}try{await E.auth.change(n,a),g.ok("密码已更新")}catch(s){g.error(s instanceof j?s.message:"修改失败")}}function or(){const t=m.user,e=v((t||"?").slice(0,1).toUpperCase()),n=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})();return`
    <div class="profile">
      <div class="profile-avatar">${e}</div>
      <div class="profile-body">
        <div class="profile-name">${v(t)}</div>
        <div class="profile-desc">${m.bank?.length??0} 道题 · ${m.wrong?.length??0} 道错题 · ${m.favs?.length??0} 条收藏</div>
      </div>
    </div>

    <div class="section-title">外观</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">主题</div><div class="setting-desc">深色模式也会跟随系统自动切换</div></div>
      </div>
      ${Je(ar,D.theme,"theme")}
      <div class="divider"></div>
      <div class="setting-row">
        <div><div class="setting-title">背景色</div><div class="setting-desc">给首页换个心情</div></div>
        <input class="color-input" type="color" value="${v(n.color||"#f4f5f7")}" data-act="pick-color" aria-label="背景色">
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
      ${Je(sr,D.autoDelay,"delay")}
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
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function ir(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){g.error("图片太大了（最多 8MB）");return}try{const n=await cr(e);vt({image:n,color:""}),g.ok("背景已更新"),M("render")}catch{g.error("这张图片读不出来，换一张试试")}}},t.click()}function cr(t){return new Promise((e,n)=>{const a=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(a);const o=Math.min(1,1600/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*o),r.height=Math.round(s.height*o);const i=r.getContext("2d");if(!i){n(new Error("canvas unavailable"));return}i.drawImage(s,0,0,r.width,r.height),e(r.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(a),n(new Error("image load failed"))},s.src=a})}function lr(){he()}async function dr(t,e){switch(t){case"theme":return pa(e.dataset.value),M("render"),!0;case"delay":return Ct({autoDelay:Number(e.dataset.value)}),M("render"),!0;case"toggle-vibration":return Ct({vibration:!D.vibration}),M("render"),!0;case"toggle-streak":return Ct({streakAlert:!D.streakAlert}),M("render"),!0;case"pick-color":return vt({color:e.value,image:""}),!0;case"pick-bg":return await ir(),!0;case"clear-bg":return vt({image:""}),M("render"),!0;case"dim":return vt({dim:Number(e.value)}),!0;case"shortcuts":return je(),!0;case"about":return T({title:"关于",body:`<p class="muted small" style="margin:0 0 10px">原点 · Origin —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。</p>
          <p class="muted small" style="margin:0 0 6px">题库 ${m.bank?.length??0} 题 · 错题 ${m.wrong?.length??0} 道 · 收藏 ${m.favs?.length??0} 条</p>
          <p class="muted small" style="margin:0">版本 v2.0.0 · 支持 PWA 离线打开</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]}),!0;case"reset-bg":return vt({color:"",image:"",dim:.35}),g.ok("背景已恢复"),M("render"),!0;case"export-bank":return m.bank?.length?(Ve(`题库-${m.user}.json`,m.bank),g.ok("已导出"),!0):(g.info("题库是空的"),!0);case"export-wrong":return m.wrong?.length?(Ve(`错题-${m.user}.json`,m.wrong),g.ok("已导出"),!0):(g.info("没有错题"),!0);case"change-password":return await rr(),!0;case"logout":return await lt({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(pn(),g.info("已退出登录")),!0;default:return!1}}const q={subject:"all",edit:!1,selected:new Set};function ur(){q.subject="all",q.edit=!1,q.selected.clear()}function Nn(){const t=m.wrong??[];return q.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===q.subject)}function pr(){return["all",...Array.from(new Set((m.wrong??[]).map(t=>t.subject||"默认题库")))]}function mr(){const t=Nn(),e=m.wrong?.length??0,n=pr().map(s=>`<button class="chip" data-act="subject" data-subject="${v(s)}" aria-pressed="${q.subject===s}">
          ${s==="all"?"全部":v(s)}
        </button>`).join(""),a=m.loading.wrong&&!m.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${q.selected.has(s.id)}">
          ${q.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${_(s.q)}</div>
          <div class="item-meta">
            ${s.subject?`<span class="tag tag-accent">${v(s.subject)}</span>`:""}
            ${s.chapter?`<span class="tag">${v(s.chapter)}</span>`:""}
          </div>
          <div class="item-answer">
            ${s.user_choice_text?`<div class="mine">你的选择：${v(s.user_choice_text)}</div>`:""}
            ${s.answer?`<div class="right">正确答案：${v(s.answer)}</div>`:""}
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
    ${a}`}async function fr(){await ot()}async function gr(t,e){switch(t){case"subject":return q.subject=e.dataset.subject??"all",!0;case"toggle-edit":return q.edit=!q.edit,q.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return q.selected.has(n)?q.selected.delete(n):q.selected.add(n),!0}case"practice":return Nn().length?(await An(),!0):(g.info("没有可练的错题"),!0);case"remove":{const n=Number(e.dataset.id);try{await E.wrong.remove([n]),q.selected.delete(n),G("wrong"),await ot(!0),g.ok("已标记掌握，继续加油")}catch(a){g.error(a instanceof j?a.message:"操作失败")}return!0}case"remove-selected":{const n=[...q.selected];if(!n.length||!await lt({title:"删除错题",message:`确定删除选中的 ${n.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await E.wrong.remove(n),q.selected.clear(),G("wrong"),await ot(!0),g.ok("已删除")}catch(a){g.error(a instanceof j?a.message:"删除失败")}return!0}default:return!1}}const ct={home:{render:Vs,mount:Qs,handle:Xs},bank:{render:cs,mount:us,handle:ps,onInput:fs,reset:yn},wrong:{render:mr,mount:fr,handle:gr,reset:ur},fav:{render:Os,mount:Rs,handle:Hs,reset:Ds},me:{render:or,mount:lr,handle:dr}};let St=!1,et=!1,Yt=!1,Zt=!1;function _n(){return document.getElementById("app-root")}function hr(){et=!1,_n().innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-name">Origin Quiz</span>
        </div>
        <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(m.user||"?").slice(0,1).toUpperCase()}</button>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${se.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${se.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,St=!0}function br(){document.querySelectorAll(".tab-btn").forEach(e=>{const n=e.dataset.tab===m.tab;e.classList.toggle("is-active",n),e.setAttribute("aria-selected",String(n))});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,se.findIndex(n=>n.id===m.tab));t.style.setProperty("--tab-index",String(e))}}function vr(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,n=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),a=n?e.getAttribute("data-role"):null,s=n&&e instanceof HTMLInputElement?e.selectionStart:null,o=ct[m.tab]??ct.home;if(t.innerHTML=`<div class="view-inner">${o.render()}</div>`,br(),n&&a){const r=t.querySelector(`[data-role="${a}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}o.mount?.()}function K(){if(Yt){Zt=!0;return}Yt=!0;try{if(!m.authed&&!m.token){et=!0,St=!1,_n().innerHTML=wa();return}St||hr(),vr()}finally{Yt=!1,Zt&&(Zt=!1,queueMicrotask(K))}}let te=!1;function Qe(){te||(te=!0,setTimeout(()=>{te=!1,K()},0))}async function In(t){await t(),et&&K()}function Dn(t){const e=t.dataset.act??"";if(Tn()&&t.closest(".exam")&&qn(t.dataset.ex??"",t))return;if(Cs()&&t.closest(".quiz")){B(e,t).then(a=>{a||M("render")});return}if(e==="tab"){Pt(t.dataset.tab??"home");return}if(et){In(()=>mn(e,t));return}const n=ct[m.tab]??ct.home;n.handle&&Promise.resolve(n.handle(e,t)).then(a=>{a&&K()})}function yr(t){const e=t.target;if(!e)return;const n=e.closest("[data-ex]");if(n&&Tn()&&n.closest(".exam")){qn(n.dataset.ex??"",n);return}const a=e.closest("[data-act]");a&&(a.closest(".modal-layer")||Dn(a))}function Xe(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){Dn(e);return}if(et)return;const n=document.getElementById("view");if(!n||!n.contains(e))return;(ct[m.tab]??ct.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&K()}function $r(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),et&&In(()=>mn("submit",e)))}function wr(){ge(),he(),la(()=>{pn(),St=!1,et=!1,g.error("登录已过期，请重新登录"),M("auth")}),Tt("nav",()=>{Object.entries(ct).forEach(([t,e])=>{t!==m.tab&&e.reset?.()}),K()}),Tt("auth",()=>{St=!1,et=!1,m.authed?(yn(),K(),Promise.allSettled([tt(!0),ot(!0),kt(!0)])):K()}),Tt("render",Qe),Tt("data",Qe),document.addEventListener("click",yr),document.addEventListener("change",Xe),document.addEventListener("input",Xe),document.addEventListener("submit",$r),Cn(),m.token&&(m.authed=!0),K(),m.token&&Promise.allSettled([tt(),ot(),kt()])}function Ye(){try{wr(),Yn()}catch(t){console.error("[origin-quiz] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ye,{once:!0}):Ye();
