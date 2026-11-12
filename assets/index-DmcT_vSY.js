var tn=Object.defineProperty;var en=(t,e,n)=>e in t?tn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ce=(t,e,n)=>en(t,typeof e!="symbol"?e+"":e,n);import{k as nn,u as an,s as sn}from"./vendor-WiNXSSvv.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const rn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function h(t){return String(t??"").replace(/[&<>"']/g,e=>rn[e]??e)}const St=/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;function on(t,e){try{return nn.renderToString(t,{displayMode:e,throwOnError:!1,output:"mathml",strict:!1,trust:!1})}catch{return h(e?`$$${t}$$`:`$${t}$`)}}function le(t){let e="",n=0;St.lastIndex=0;for(let a=St.exec(t);a;a=St.exec(t)){e+=h(t.slice(n,a.index)).replace(/\n/g,"<br>");const s=!!(a[1]||a[2]),o=(a[1]??a[2]??a[3]??a[4]??"").trim();e+=o?on(o,s):h(a[0]),n=a.index+a[0].length}return e+=h(t.slice(n)).replace(/\n/g,"<br>"),e}const cn=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function ln(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function P(t){const e=ln(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return le(e);const a=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!a)return h(e);const s=o=>{if(o.nodeType===Node.TEXT_NODE)return le(o.textContent??"");if(o.nodeType!==Node.ELEMENT_NODE)return"";const r=o,i=r.tagName,c=Array.from(r.childNodes).map(s).join("");if(!cn.has(i))return c;if(i==="IMG"){const u=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(u))return"";const f=h(r.getAttribute("alt")??"");return`<img src="${h(u)}" alt="${f}" loading="lazy" referrerpolicy="no-referrer">`}const d=i.toLowerCase();return`<${d}>${c}</${d}>`};return Array.from(a.childNodes).map(s).join("")}function q(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function ft(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(n=>Number.isInteger(n)))).sort((n,a)=>n-a)}function j(t){return typeof t=="string"}function X(t,e=[]){return typeof t=="string"?t:ft(t).map(n=>{const a=String.fromCharCode(65+n),s=(e[n]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${a}. ${s}`:a}).join("、")}function Se(t){const e=[...t];for(let n=e.length-1;n>0;n-=1){const a=Math.floor(Math.random()*(n+1));[e[n],e[a]]=[e[a],e[n]]}return e}function dn(t,e){const n=ft(e);if(!n.length||t.length!==n.length)return!1;const a=[...new Set(t)].sort((s,o)=>s-o);return a.length===n.length&&a.every((s,o)=>s===n[o])}function un(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const n=JSON.parse(e);if(typeof n=="number")return n;if(Array.isArray(n))return n.map(Number).filter(Number.isInteger);if(typeof n=="string")return n}catch{}return e}return""}let _=null;function pn(){return _&&document.body.contains(_)||(_=document.createElement("div"),_.className="toast-host",_.setAttribute("role","status"),_.setAttribute("aria-live","polite"),document.body.appendChild(_)),_}function At(t,e="info",n=2600){if(!t)return;const a=document.createElement("div");a.className=`toast toast-${e}`,a.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${h(t)}</span>`,pn().appendChild(a),requestAnimationFrame(()=>a.classList.add("in")),window.setTimeout(()=>{a.classList.remove("in"),window.setTimeout(()=>a.remove(),220)},n)}const m={info:t=>At(t,"info"),ok:t=>At(t,"success"),error:t=>At(t,"error",3200)},Ot="oq:queue",fn=200;function Ut(){try{const t=localStorage.getItem(Ot),e=t?JSON.parse(t):[];return Array.isArray(e)?e.filter(n=>n&&n.path):[]}catch{return[]}}function Ae(t){try{t.length?localStorage.setItem(Ot,JSON.stringify(t.slice(-fn))):localStorage.removeItem(Ot)}catch{}}function mn(){return Ut().length}function gn(t,e,n){const a=Ut();a.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,path:t,body:e,label:n,at:Date.now()}),Ae(a)}let Et=!1;async function de(){if(Et)return 0;const t=Ut();if(!t.length)return 0;Et=!0;let e=0;const n=[];for(const a of t)try{const s=await fetch(a.path,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a.body),...ue()?{headers:{"Content-Type":"application/json",Accept:"application/json",...ue()}}:{}});if(s.ok||s.status>=400&&s.status<500){s.ok&&(e+=1);continue}n.push(a)}catch{n.push(a);break}return Et=!1,Ae([...n,...t.slice(t.length)]),e&&m.ok(`已补传 ${e} 条离线操作`),e}function ue(){try{const e=(localStorage.getItem("oq:oq:token")||localStorage.getItem("oq:token")||"").replace(/^"|"$/g,"");return e?{Authorization:`Bearer ${e}`}:{}}catch{return{}}}function bn(){window.addEventListener("online",()=>{de()}),navigator.onLine&&mn()&&setTimeout(()=>void de(),1500)}const zt="oq:",Ft="oq:user",Wt="oq:token",hn={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},T={...hn,...U("settings",{})};["auto","light","dark","eye"].includes(T.theme)||(T.theme="auto");function U(t,e){try{const n=localStorage.getItem(zt+t);return n===null?e:JSON.parse(n)}catch{return e}}function z(t,e){try{localStorage.setItem(zt+t,JSON.stringify(e))}catch{}}function Dt(t){try{localStorage.removeItem(zt+t)}catch{}}function bt(t){Object.assign(T,t),z("settings",T)}function vn(t){bt({theme:t})}function M(){return U(Ft,"")||""}function Ee(t){z(Ft,t)}function yn(){Dt(Ft),Dt(Wt)}function Jt(){return U(Wt,"")||""}function Le(t){z(Wt,t)}function F(t){return`u:${M()||"anon"}:${t}`}function Kt(){return U(F("notes"),{})}function wn(t,e){const n=Kt(),a=String(t);e.trim()?n[a]=e:delete n[a],z(F("notes"),n)}function qe(){const t=U(F("progress"),{});return Number(t.sequential_index)||0}function $n(t){z(F("progress"),{sequential_index:t,updatedAt:Date.now()})}function je(){const t=U(F("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function kn(t){z(F("session"),t)}function Te(){Dt(F("session"))}function Me(){return U(F("recent"),[])}function xn(t){const e=[...t,...Me()].slice(0,30);z(F("recent"),Array.from(new Set(e)))}function Ce(){return U("appearance",{color:"",image:"",dim:.35})}function Sn(t){z("appearance",{...Ce(),...t})}function An(){return U("welcomed","")===new Date().toDateString()}function En(){z("welcomed",new Date().toDateString())}class S extends Error{constructor(n,a){super(a);ce(this,"status");this.name="ApiError",this.status=n}}let Qt=null;function Ln(t){Qt=t}async function Ne(t,e={}){const n=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&n.set("Content-Type","application/json");const a=Jt();a&&n.set("Authorization",`Bearer ${a}`),n.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:n})}catch{throw new S(0,"网络连接失败，请检查网络后重试")}const o=s.headers.get("content-type")??"";let r=null;o.includes("application/json")?r=await s.json().catch(()=>null):r=await s.text().catch(()=>"");const i=r??{};if(s.status===401)throw Qt?.(),new S(401,typeof i.error=="string"?i.error:"登录已过期，请重新登录");if(!s.ok||i.ok===!1){const c=typeof i.error=="string"&&i.error?i.error:`请求失败（HTTP ${s.status}）`;throw new S(s.status,c)}return r}const Lt=t=>Ne(t),R=(t,e)=>Ne(t,{method:"POST",body:JSON.stringify(e)});async function qn(t,e,n){const a=new Headers({"Content-Type":"application/json"}),s=Jt();s&&a.set("Authorization",`Bearer ${s}`);const o=await fetch("/api/ai",{method:"POST",headers:a,body:JSON.stringify({...t,stream:!0}),signal:n});if(!o.ok||!o.body){const p=await o.json().catch(()=>({}));if(o.status===401)throw Qt?.(),new S(401,"登录已过期，请重新登录");if(typeof p.result=="string")return e(p.result),{text:p.result,cached:!1,provider:typeof p.provider=="string"?p.provider:void 0};throw new S(o.status,typeof p.error=="string"?p.error:"AI 解析失败")}const r=o.body.getReader(),i=new TextDecoder;let c="",d="",u=!1,f;for(;;){const{value:p,done:v}=await r.read();if(v)break;c+=i.decode(p,{stream:!0});const $=c.split(`

`);c=$.pop()??"";for(const b of $){const k=b.split(`
`).find(O=>O.startsWith("data:"));if(!k)continue;let E;try{E=JSON.parse(k.slice(5).trim())}catch{continue}if(typeof E.delta=="string"&&E.delta&&(d+=E.delta,e(E.delta)),typeof E.error=="string")throw new S(502,E.error);E.done&&(u=E.cached===!0,typeof E.provider=="string"&&(f=E.provider))}}return{text:d,cached:u,provider:f}}function _t(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:un(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function jn(t){return{..._t(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}async function Q(t,e,n){try{return await R(t,e)}catch(a){if(a instanceof S&&a.status===0)return gn(t,e,n),{ok:!0,queued:!0,offline:!0};throw a}}const A={auth:{check:t=>R("/api/auth",{action:"check",username:t}),set:(t,e)=>R("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>R("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>R("/api/auth",{action:"change",username:M(),oldPassword:t,newPassword:e})},questions:{async list(){const t=M();if(!t)return[];const e=await Lt(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>_t(a))},add:t=>Q("/api/questions-add",{user_id:M(),questions:t},`导入 ${t.length} 道题`),update:(t,e)=>Q("/api/questions-update",{id:t,user_id:M(),...e},"保存题目"),remove:t=>Q("/api/questions-delete",{ids:t,user_id:M()},`删除 ${t.length} 道题`)},wrong:{async list(){const t=M();if(!t)return[];const e=await Lt(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>jn(a))},add:t=>Q("/api/wrong-add",{user_id:M(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""},"记录错题"),remove:t=>Q("/api/wrong-delete",{ids:t,user_id:M()},"移除错题")},favorites:{async list(){const t=M();if(!t)return[];const e=await Lt(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>_t(a))},add:t=>Q("/api/favorites-add",{user_id:M(),question_id:t},"收藏题目"),remove:t=>Q("/api/favorites-remove",{user_id:M(),question_id:t},"取消收藏")},ai:{explain:t=>R("/api/ai",{action:"explain",prompt:t}),grade:t=>R("/api/ai",{action:"grade",prompt:t}),extract:t=>R("/api/ai",{action:"extract",...t}),classify:t=>R("/api/ai",{action:"classify",prompt:t}),explainStream:(t,e,n)=>qn({action:"explain",prompt:t},e,n)}},st='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"',Rt=[{id:"home",label:"首页",icon:`<svg viewBox="0 0 24 24" ${st} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`},{id:"bank",label:"题库",icon:`<svg viewBox="0 0 24 24" ${st} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`},{id:"wrong",label:"错题",icon:`<svg viewBox="0 0 24 24" ${st} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`},{id:"fav",label:"收藏",icon:`<svg viewBox="0 0 24 24" ${st} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`},{id:"me",label:"我的",icon:`<svg viewBox="0 0 24 24" ${st} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`}],pe=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],l={tab:"home",user:M(),token:Jt(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},ot=new Map;function mt(t,e){return ot.has(t)||ot.set(t,new Set),ot.get(t).add(e),()=>ot.get(t)?.delete(e)}function L(t){ot.get(t)?.forEach(e=>e())}function $t(t){l.tab!==t&&(l.tab=t,L("nav"))}const Ie=window.matchMedia("(prefers-color-scheme: dark)");function fe(){return T.theme==="auto"?Ie.matches?"dark":"light":T.theme}function Gt(){document.documentElement.dataset.theme=fe();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=fe()==="dark"?"#0b0c0f":"#f4f5f7")}function Tn(t){vn(t),Gt()}Ie.addEventListener("change",()=>{T.theme==="auto"&&Gt()});function Mn(t){Sn(t)}function Vt(){const{color:t,image:e,dim:n}=Ce(),a=document.body;a.style.backgroundImage=e?`url("${e}")`:"",a.style.backgroundSize="cover",a.style.backgroundPosition="center",a.style.backgroundAttachment="fixed",a.dataset.dim=String(n),t&&!e?a.style.backgroundColor=t:a.style.backgroundColor=""}async function Cn(t,e){const n=await A.auth.login(t,e);Le(n.token),Ee(t),l.user=t,l.token=n.token,l.authed=!0,J(),L("auth")}async function Nn(t,e){const n=await A.auth.set(t,e);Le(n.token),Ee(t),l.user=t,l.token=n.token,l.authed=!0,J(),L("auth")}function Oe(){l.user="",l.token="",l.authed=!1,l.bank=null,l.wrong=null,l.favs=null,l.favoriteIds=new Set,yn(),Te(),L("auth")}const In=300*1e3,G={bank:0,wrong:0,fav:0},ht=new Map;function J(t){t?(G[t]=0,t==="bank"&&(l.bank=null),t==="wrong"&&(l.wrong=null),t==="fav"&&(l.favs=null)):(G.bank=G.wrong=G.fav=0,l.bank=null,l.wrong=null,l.favs=null)}function On(t,e){const n=ht.get(t);if(n)return n;const a=e().finally(()=>ht.delete(t));return ht.set(t,a),a}async function Xt(t,e,n,a){if(!l.user)return[];const s=ht.get(t);if(s)return s;const o=Date.now()-G[t]<In;if(!e&&o)return[];l.loading[t]=!0,L("data");try{const r=await On(t,n);return a(r),G[t]=Date.now(),r}catch(r){throw r instanceof S&&r.status!==401&&m.error(r.message),r}finally{l.loading[t]=!1,L("data")}}async function Y(t=!1){try{await Xt("bank",t,()=>A.questions.list(),e=>{l.bank=e})}catch{}return l.bank??[]}async function Z(t=!1){try{await Xt("wrong",t,()=>A.wrong.list(),e=>{l.wrong=e})}catch{}return l.wrong??[]}async function dt(t=!1){try{await Xt("fav",t,()=>A.favorites.list(),e=>{l.favs=e,l.favoriteIds=new Set(e.map(n=>n.id))})}catch{}return l.favs??[]}function vt(t){return l.favoriteIds.has(t)}async function Dn(t){const e=!vt(t);try{return e?await A.favorites.add(t):await A.favorites.remove(t),e?l.favoriteIds.add(t):l.favoriteIds.delete(t),l.favs=null,G.fav=0,m.ok(e?"已加入收藏":"已取消收藏"),L("data"),e}catch(n){return m.error(n instanceof S?n.message:"操作失败"),vt(t)}}function _n(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${pe[Math.floor(Math.random()*pe.length)]}`}function it(t){Mn(t),Vt()}const y={step:"name",username:"",busy:!1,error:""};function Rn(){y.step="name",y.username="",y.busy=!1,y.error=""}function Hn(){const t=`
    <div class="auth-brand">
      <div class="brand-mark">原</div>
      <div>
        <div class="auth-title">原点 · Origin</div>
        <div class="brand-sub">刷题 · 错题 · 收藏</div>
      </div>
    </div>`,e=y.error?`<div class="auth-error" role="alert">${h(y.error)}</div>`:"";if(y.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${h(y.username)}" required>
            </label>
            ${e}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${y.busy?"disabled":""}>
              ${y.busy?"检查中…":"继续"}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;const n=y.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${n?"为":"欢迎回来，"} <strong>${h(y.username)}</strong>${n?" 设置一个密码":""}</p>
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
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${y.busy?"disabled":""}>
            ${y.busy?"请稍候…":n?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${y.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function De(t,e){if(t==="back")return y.step="name",y.error="",!0;if(t==="submit"){const n=e,a=new FormData(n);if(y.step==="name"){const o=String(a.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(o))return y.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;y.busy=!0,y.error="";try{const{hasPassword:r}=await A.auth.check(o);y.username=o,y.step=r?"password":"create"}catch(r){y.error=r instanceof S?r.message:"网络异常，请重试"}finally{y.busy=!1}return!0}if(y.busy)return!0;const s=String(a.get("password")??"");if(y.step==="create"){const o=String(a.get("confirm")??"");if(s!==o)return y.error="两次输入的密码不一致",!0}if(s.length<6)return y.error="密码至少 6 位",!0;y.busy=!0,y.error="";try{y.step==="create"?await Nn(y.username,s):await Cn(y.username,s),m.ok(y.step==="create"?"账号已创建，开始刷题吧":`欢迎回来，${l.user}`),Rn()}catch(o){y.error=o instanceof S?o.message:"登录失败，请重试"}finally{y.busy=!1}return!0}return!1}function Bn(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function _e(t,e){const n=e.trim();if(!n)return t;const a=new RegExp(Bn(n),"gi");return t.replace(/<[^>]+>|[^<]+/g,s=>s.startsWith("<")?s:s.replace(a,o=>`<mark class="hl">${o}</mark>`))}const Yt={single:"单选",multi:"多选",judge:"判断",blank:"填空",essay:"简答"};function Zt(t){const e=t.opts??[],n=String(t.q??"");if(!e.length)return/_{2,}|（\s*）|\(\s*\)|【\s*】/.test(n)?"blank":"essay";if(e.length===2){const a=e.map(s=>s.replace(/^[A-Za-z][.、)）]\s*/,"").trim()).join("|");if(/^(正确|对|是|√|True)|\|(错误|错|否|×|False)$/i.test(a)||/正确\|错误|对\|错/.test(a))return"judge"}return Array.isArray(t.a)?"multi":"single"}let N=null,ct=0;function Re(){return N&&document.body.contains(N)||(N=document.createElement("div"),N.className="modal-root",N.setAttribute("role","dialog"),N.setAttribute("aria-modal","true"),document.body.appendChild(N)),N}function Pn(){ct+=1,document.body.classList.add("is-locked")}function Un(){ct=Math.max(0,ct-1),ct===0&&document.body.classList.remove("is-locked")}function te(){Re().innerHTML="",ct=0,document.body.classList.remove("is-locked")}function C(t){const e=Re(),n=t.dismissible!==!1;return new Promise(a=>{let s=!1;const o=p=>{s||(s=!0,f(),r.classList.remove("open"),window.setTimeout(()=>{r.remove(),Un()},200),a(p))},r=document.createElement("div");r.className="modal-layer",r.style.position="absolute",r.style.inset="0",r.style.display="grid",r.style.placeItems="center",r.style.padding="var(--space-4)",r.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${n?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${h(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${h(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((p,v)=>`<button class="btn btn-${p.variant??"ghost"}" data-idx="${v}">${h(p.label)}</button>`).join("")}</div>`:""}
      </div>`;const i=r.querySelector(".modal-card"),c=i.querySelector(".modal-body");typeof t.body=="string"?c.innerHTML=t.body:t.body&&c.appendChild(t.body);const d=p=>{p.key==="Escape"&&n&&(p.stopPropagation(),o(null))},u=p=>{const v=p.target;if(v.closest("[data-close]")&&n){o(null);return}const $=v.closest("[data-idx]");if(!$)return;const b=t.actions?.[Number($.dataset.idx)];b&&(b.keepOpen||o(b.value))},f=()=>{document.removeEventListener("keydown",d,!0),r.removeEventListener("click",u),N&&N.children.length===0&&N.classList.remove("open")};r.addEventListener("click",u),document.addEventListener("keydown",d,!0),e.appendChild(r),e.classList.add("open"),Pn(),t.onMount?.(i),requestAnimationFrame(()=>{r.classList.add("open");const p=i.querySelector("input, textarea, button.btn-primary, button");p&&window.matchMedia("(pointer: fine)").matches&&p.focus({preventScroll:!0})})})}function kt(t){return C({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}function zn(t,e=1400,n=.82){return new Promise((a,s)=>{const o=URL.createObjectURL(t),r=new Image;r.onload=()=>{URL.revokeObjectURL(o);const i=Math.min(1,e/Math.max(r.width,r.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(r.width*i)),c.height=Math.max(1,Math.round(r.height*i));const d=c.getContext("2d");if(!d){s(new Error("canvas 不可用"));return}d.fillStyle="#fff",d.fillRect(0,0,c.width,c.height),d.drawImage(r,0,0,c.width,c.height),a(c.toDataURL("image/jpeg",n))},r.onerror=()=>{URL.revokeObjectURL(o),s(new Error("图片解码失败"))},r.src=o})}const Fn=new Set(["B","STRONG","I","EM","U","SUB","SUP","BR","P","DIV","SPAN","IMG","CODE"]);function gt(t){const n=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html").body.firstElementChild;if(!n)return"";const a=s=>{if(s.nodeType===Node.TEXT_NODE)return(s.textContent??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");if(s.nodeType!==Node.ELEMENT_NODE)return"";const o=s,r=o.tagName,i=Array.from(o.childNodes).map(a).join("");if(!Fn.has(r))return i;if(r==="IMG"){const d=o.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(d))return"";const u=(o.getAttribute("alt")??"").replace(/"/g,"&quot;");return`<img src="${d.replace(/"/g,"&quot;")}" alt="${u}">`}if(r==="BR")return"<br>";const c=r.toLowerCase();return c==="div"||c==="p"?i.trim()?`${i}<br>`:"<br>":`<${c}>${i}</${c}>`};return Array.from(n.childNodes).map(a).join("").replace(/(<br>)+$/g,"").trim()}const Wn=[{cmd:"bold",label:"B",title:"加粗（Ctrl/⌘+B）"},{cmd:"italic",label:"I",title:"斜体（Ctrl/⌘+I）"},{cmd:"underline",label:"U",title:"下划线（Ctrl/⌘+U）"},{cmd:"superscript",label:"x²",title:"上标"},{cmd:"subscript",label:"x₂",title:"下标"},{cmd:"insertUnorderedList",label:"≡",title:"列表"}];function Jn(t={}){const e=document.createElement("div");e.className="rt";const n=document.createElement("div");n.className="rt-bar";const a=document.createElement("div");a.className="rt-area",a.contentEditable="true",a.spellcheck=!1,a.dataset.role="rich",a.style.minHeight=`${t.minHeight??96}px`,t.placeholder&&(a.dataset.placeholder=t.placeholder),a.innerHTML=gt(t.value??"");const s=(r,i)=>{a.focus(),document.execCommand(r,!1,i),o()};if(t.toolbar!==!1){for(const u of Wn){const f=document.createElement("button");f.type="button",f.className="rt-btn",f.title=u.title,f.textContent=u.label,f.addEventListener("mousedown",p=>p.preventDefault()),f.addEventListener("click",()=>s(u.cmd,u.arg)),n.appendChild(f)}const r=document.createElement("span");r.className="rt-sep",n.appendChild(r);const i=document.createElement("button");i.type="button",i.className="rt-btn",i.textContent="∑",i.title="公式：选中内容包成 $…$",i.addEventListener("mousedown",u=>u.preventDefault()),i.addEventListener("click",()=>{const u=window.getSelection()?.toString()??"";if(u){s("insertText",`$${u}$`);return}s("insertText","$$");const f=window.getSelection();if(f&&f.rangeCount){const p=f.getRangeAt(0);typeof f.modify=="function"?f.modify("move","backward","character"):p.startContainer.nodeType===Node.TEXT_NODE&&(p.setStart(p.startContainer,Math.max(0,p.startOffset-1)),p.collapse(!0),f.removeAllRanges(),f.addRange(p))}}),n.appendChild(i);const c=document.createElement("button");c.type="button",c.className="rt-btn",c.textContent="▣",c.title="插入图片（自动压缩）",c.addEventListener("mousedown",u=>u.preventDefault()),c.addEventListener("click",()=>{const u=document.createElement("input");u.type="file",u.accept="image/*",u.onchange=async()=>{const f=u.files?.[0];if(f)try{c.textContent="…";const p=await zn(f);a.focus(),document.execCommand("insertHTML",!1,`<img src="${p}" alt="题图"><br>`),o(),m.ok(`图片已插入（${Math.round(p.length*.75/1024)} KB）`)}catch{m.error("图片读取失败，换一张试试")}finally{c.textContent="▣"}},u.click()}),n.appendChild(c);const d=document.createElement("button");d.type="button",d.className="rt-btn rt-clear",d.textContent="⌫",d.title="清除格式",d.addEventListener("mousedown",u=>u.preventDefault()),d.addEventListener("click",()=>s("removeFormat")),n.appendChild(d)}function o(){const r=(a.textContent??"").trim().length>0,i=!!a.querySelector("img");a.classList.toggle("is-empty",!r&&!i)}return a.addEventListener("input",o),a.addEventListener("blur",o),a.addEventListener("paste",r=>{const i=r.clipboardData?.getData("text/html");i&&(r.preventDefault(),document.execCommand("insertHTML",!1,gt(i)))}),o(),e.append(n,a),{el:e,getValue:()=>gt(a.innerHTML),setValue:r=>{a.innerHTML=gt(r),o()},focus:()=>a.focus()}}function Kn(t){const e=t.name.toLowerCase(),n=t.type.toLowerCase();return n.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|heic)$/.test(e)?"image":e.endsWith(".docx")?"docx":e.endsWith(".json")?"json":/\.(txt|md|csv|text)$/.test(e)||n.startsWith("text/")?"text":"unknown"}function et(t){return String(t??"").replace(/\r\n?/g,`
`).trim()}function He(t,e){if(Array.isArray(t)){const r=t.map(i=>typeof i=="number"?i:Qn(String(i),e.length)).filter(i=>i!==null);return r.length?r.length===1?r[0]:[...new Set(r)].sort((i,c)=>i-c):t.map(String).join("、")}if(typeof t=="number"&&Number.isFinite(t))return t;const n=et(t);if(!n)return"";const s=(/^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(n)?n:"")||(/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(n)?n:"");if(s){const r=[...new Set(s.toUpperCase().split("").map(i=>i.charCodeAt(0)-65))].filter(i=>i>=0&&i<e.length);if(r.length)return r.length===1?r[0]:r.sort((i,c)=>i-c)}const o=/^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(n);if(o&&e.length){const r=o[1].charCodeAt(0)-65;if(r>=0&&r<e.length){const i=o[2].trim();return e.findIndex(d=>d.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()===i)>=0||i,r}}return n}function Qn(t,e){const n=t.trim().toUpperCase();if(!/^[A-H]$/.test(n))return null;const a=n.charCodeAt(0)-65;return a<e?a:null}function Gn(t){const e=et(t.q??t.question??t.title??t.题目??t.题干);if(!e)return null;const n=t.opts??t.options??t.choices??t.选项;let a=[];Array.isArray(n)?a=n.map(r=>et(r)).filter(Boolean):typeof n=="string"&&(a=ta(n));const s=t.a??t.answer??t.correct??t.答案??t.正确答案,o=a.length?He(s,a):et(s);return{q:e,opts:a,a:o,chapter:et(t.chapter??t.章节??t.知识点),subject:et(t.subject??t.科目??t.题库)||"默认题库"}}function Be(t){const e=t.replace(/^\uFEFF/,"").trim(),n=/```(?:json)?([\s\S]*?)```/i.exec(e)?.[1]??e,a=n.indexOf("["),s=n.indexOf("{"),o=a>=0&&(s<0||a<s)?a:s;if(o<0)return[];const r=Math.max(n.lastIndexOf("]"),n.lastIndexOf("}"));if(r<=o)return[];let i;try{i=JSON.parse(n.slice(o,r+1))}catch{return[]}return(Array.isArray(i)?i:Array.isArray(i?.questions)?i.questions:Array.isArray(i?.data)?i.data:[]).filter(d=>!!d&&typeof d=="object").map(Gn).filter(d=>!!d)}const Vn=/^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/,Xn=/^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/,Yn=/^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/,Zn=/^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;function ta(t){return t.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/).map(n=>n.trim()).filter(Boolean)}function ea(t){const e=[...t.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];return e.length<2?[]:e.map((n,a)=>{const s=(n.index??0)+n[0].length,o=a+1<e.length?e[a+1].index??t.length:t.length;return t.slice(s,o).trim()})}function na(t){const n=t.replace(/^\uFEFF/,"").replace(/\r\n?/g,`
`).split(`
`),a=[];let s="",o=[],r="",i="",c="";const d=()=>{const u=s.trim();if(!u){s="",o=[],r="";return}if(!o.length&&!r.trim()&&u.length<=24){s="",o=[],r="";return}const f=o.map(v=>v.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()),p=f.length?He(r,f):r.trim();a.push({q:u,opts:f,a:p,chapter:i,subject:c||"默认题库"}),s="",o=[],r="",i="",c=""};for(const u of n){if(!u.trim())continue;const f=Zn.exec(u),p=Vn.exec(u),v=Xn.exec(u),$=Yn.exec(u);if(f&&!p){d();const b=ea(f[2]);b.length>=2?(s=f[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim(),o=b):s=f[2].trim();continue}if(p&&s){o.push(p[2].trim());continue}if(v&&(s||o.length)){r=v[1].trim();continue}if($){const b=$[0].trim(),k=$[1].trim();/章节|知识点/.test(b)?i=k:/科目|题库|分类/.test(b)&&(c=k);continue}s?o.length?o[o.length-1]=`${o[o.length-1]} ${u.trim()}`.trim():s=`${s} ${u.trim()}`.trim():s=u.replace(/^\s*(?:题目|题干)\s*[:：]\s*/,"").trim()}return d(),a.filter(u=>u.q.length>1)}function Ht(t){const e=t.trim();if(!e)return[];if(/^[[{]/.test(e)||/```(?:json)?/i.test(e)||/"(q|question|题目)"\s*:/.test(e)){const n=Be(e);if(n.length)return n}return na(e)}function aa(t){const n=an(new Uint8Array(t))["word/document.xml"];if(!n)throw new Error("这个 docx 里没有正文，另存为 .docx 再试一次");return sn(n).replace(/<w:tab\b[^>]*\/>/g,"	").replace(/<w:br\b[^>]*\/>/g,`
`).replace(/<\/w:p>/g,`
`).replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\n{3,}/g,`

`).trim()}function sa(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("文件读取失败")),a.readAsText(t,"utf-8")})}function ra(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(a.result),a.onerror=()=>n(new Error("文件读取失败")),a.readAsArrayBuffer(t)})}function oa(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("图片读取失败")),a.readAsDataURL(t)})}function ia(t,e){if(!t.length)return'<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>';const n=t.slice(0,4),a=n.map((o,r)=>`<li><b>${r+1}.</b> ${h(o.q).slice(0,90)}${(o.opts??[]).length?`<span class="muted"> · ${(o.opts??[]).length} 个选项</span>`:'<span class="muted"> · 简答</span>'}</li>`).join(""),s=t.length>n.length?`<li class="muted">…还有 ${t.length-n.length} 道</li>`:"";return`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${t.length} 道题</span>
      ${e?`<span class="muted small">${h(e)}</span>`:""}
    </div>
    <ul class="import-list">${a}${s}</ul>`}function ca(t,e){return t==="json"?Be(e):Ht(e)}async function la(){const t=document.createElement("div");t.className="import",t.innerHTML=`
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
    <div class="import-preview" data-role="preview"></div>`;const e=t.querySelector('[data-role="drop"]'),n=t.querySelector('[data-role="file"]'),a=t.querySelector('[data-role="text"]'),s=t.querySelector('[data-role="preview"]');let o=[],r="",i="",c=!1;const d=()=>{s.innerHTML=ia(o,i||(r?"图片将由 AI 识别":""));const b=document.querySelector('[data-idx="1"]');b&&(b.textContent=o.length?`导入 ${o.length} 道题`:"AI 解析并导入")},u=(b,k,E)=>{a.value=b,o=ca(k,b),i=E,d()},f=async()=>{const b=a.value.trim();if(!b&&!r)return[];m.info(r?"AI 正在识别图片…":"AI 正在解析文字…");const k=await A.ai.extract({...b?{prompt:b}:{},...r?{imageBase64:r}:{}});return Ht(k.result??"")},p=async b=>{const k=Kn(b);try{if(k==="image"){r=await oa(b),o=[],i=`${b.name}（${Math.round(b.size/1024)}KB，AI 识别）`,d();try{o=await f(),o.length||m.error("这张图没读出题目，换张更清晰的试试")}catch(O){m.error(O instanceof S?O.message:"AI 识别失败")}d();return}if(k==="docx"){const O=await ra(b);u(aa(O),"docx",b.name);return}if(k==="unknown"){m.error("暂不支持这种文件，换成 txt / json / docx / 图片试试");return}const E=await sa(b);u(E,k,b.name)}catch(E){m.error(E instanceof Error?E.message:"文件解析失败")}};n.addEventListener("change",()=>{const b=n.files?.[0];b&&p(b)});for(const b of["dragenter","dragover"])e.addEventListener(b,k=>{k.preventDefault(),e.classList.add("is-over")});for(const b of["dragleave","drop"])e.addEventListener(b,k=>{k.preventDefault(),e.classList.remove("is-over")});e.addEventListener("drop",b=>{const k=b.dataTransfer?.files?.[0];k&&p(k)});let v=0;if(a.addEventListener("input",()=>{window.clearTimeout(v),v=window.setTimeout(()=>{o=Ht(a.value),r="",i="",d()},280)}),!(!await C({title:"导入题库",body:t,actions:[{label:"取消",value:!1},{label:"导入",value:!0,variant:"primary"}],onMount:()=>d()})||c))try{const b=o.length?o:await f();if(!b.length){m.error("没解析出题目，检查一下格式，或换张更清晰的图");return}c=!0;const k=await A.questions.add(b);J("bank"),await Y(!0),m.ok(`已导入 ${k.added??b.length} 道题`)}catch(b){m.error(b instanceof S?b.message:"导入失败")}}const da=`
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
`;function rt(t){return String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]??e)}function me(t,e={}){if(!t.length){m.info("没有可导出的题目");return}const n=e.title||"练习试卷",a=new Date().toLocaleDateString("zh-CN"),s=e.answers!==!1,o=t.map((d,u)=>{const f=Zt(d),p=(d.opts??[]).map((v,$)=>{const b=v.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return`<li><span class="k">${String.fromCharCode(65+$)}</span>${P(b)}</li>`}).join("");return`<article class="q">
        <div class="q-no">${String(u+1).padStart(2,"0")} · ${Yt[f]}${d.chapter?` · ${rt(d.chapter)}`:""}</div>
        <div class="q-body">${P(d.q)}</div>
        ${p?`<ul class="q-opts">${p}</ul>`:'<p class="q-tag">（简答题，请在答题纸上作答）</p>'}
      </article>`}).join(""),r=s?`<section class="answer-key">
        <h2>参考答案</h2>
        <ol>${t.map((d,u)=>`<li><span class="k">${String(u+1).padStart(2,"0")}</span>${rt(X(d.a,d.opts??[]))}</li>`).join("")}</ol>
      </section>`:"",i=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${rt(n)} · ${a}</title>
<style>${da}</style></head>
<body>
  <header class="sheet-head">
    <div class="sheet-kicker">Origin Quiz / Practice Sheet</div>
    <h1 class="sheet-title">${rt(n)}</h1>
    <div class="sheet-meta">${a} · 共 ${t.length} 题${e.subtitle?" · "+rt(e.subtitle):""} · 姓名 __________ 得分 ______</div>
  </header>
  ${o}
  ${r}
  <p class="tips">由「原点 · Origin」导出 · 打印对话框里选择「另存为 PDF」即可保存。</p>
</body></html>`,c=window.open("","_blank");if(!c){m.error("浏览器拦住了新窗口，请允许弹出窗口后重试");return}c.document.open(),c.document.write(i),c.document.close(),c.focus(),m.ok(`已生成 ${t.length} 题的打印版，在打印里选「另存为 PDF」`)}function ua(t){const e=t.replace(/```json/gi,"```").trim(),n=/```([\s\S]*?)```/.exec(e)?.[1]??e,a=n.indexOf("{"),s=n.lastIndexOf("}");return a===-1||s<=a?"{}":n.slice(a,s+1)}const W=20,g={search:"",subject:"all",edit:!1,page:0,selected:new Set};function Pe(){g.search="",g.subject="all",g.edit=!1,g.page=0,g.selected.clear()}function ut(){return l.bank??[]}function pa(){return["all",...Array.from(new Set(ut().map(t=>t.subject||"默认题库")))]}function Bt(){const t=g.search.trim().toLowerCase();return ut().filter(e=>g.subject!=="all"&&(e.subject||"默认题库")!==g.subject?!1:t?q(e.q).toLowerCase().includes(t)||e.opts.some(n=>q(n).toLowerCase().includes(t)):!0)}function Ue(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(n=>String.fromCharCode(65+n)).join(" / ")}function fa(){const t=Bt(),e=Math.max(1,Math.ceil(t.length/W));g.page>e-1&&(g.page=e-1),g.page<0&&(g.page=0);const n=t.slice(g.page*W,g.page*W+W),a=pa().map(r=>`<button class="chip" data-act="subject" data-subject="${h(r)}" aria-pressed="${g.subject===r}">
          ${r==="all"?"全部":h(r)}
        </button>`).join(""),s=n.map((r,i)=>{const c=Zt(r),d=String(g.page*W+i+1).padStart(2,"0");return`<tr class="q-row ${g.edit?"selectable":""}" data-id="${r.id}">
        <td class="c-no">${g.edit?`<button class="checkbox" data-act="select" data-id="${r.id}" aria-pressed="${g.selected.has(r.id)}">✓</button>`:d}</td>
        <td class="c-q">
          <div class="q-cell">${_e(P(r.q),g.search)}</div>
          ${r.opts.length?`<div class="q-sub">${r.opts.length} 个选项</div>`:""}
        </td>
        <td class="c-type"><span class="tag tag-type">${Yt[c]}</span></td>
        <td class="c-chapter muted">${h(r.chapter||"—")}</td>
        <td class="c-ans"><span class="tag tag-ok">${h(Ue(r))}</span></td>
        <td class="c-act"><button class="icon-btn sm" data-act="edit" data-id="${r.id}" aria-label="编辑">✎</button></td>
      </tr>`}).join(""),o=l.loading.bank&&!l.bank?`<div class="list">${Array.from({length:5}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div></div>').join("")}</div>`:t.length?`<div class="table-wrap">
          <table class="q-table">
            <thead><tr>
              <th class="c-no">NO</th><th class="c-q">题干</th><th class="c-type">题型</th>
              <th class="c-chapter">章节</th><th class="c-ans">答案</th><th class="c-act"></th>
            </tr></thead>
            <tbody>${s}</tbody>
          </table>
        </div>
        ${e>1?`<div class="pager">
                 <button class="btn btn-sm" data-act="page-prev" ${g.page===0?"disabled":""}>← 上一页</button>
                 <span class="pager-info">${g.page+1} / ${e} 页 · 共 ${t.length} 题</span>
                 <button class="btn btn-sm" data-act="page-next" ${g.page>=e-1?"disabled":""}>下一页 →</button>
               </div>`:`<p class="muted small table-count">共 ${t.length} 题</p>`}`:`<div class="empty"><div class="empty-ico">▤</div><div class="empty-title">${g.search?"没有匹配的题目":"题库还是空的"}</div><div class="empty-desc">${g.search?"换个关键词试试":"点右上角「⇪」导入 JSON / TXT / Word / 图片，或点「＋」手写"}</div></div>`;return`
    <h1 class="page-title">题库</h1>
    <div class="row" style="margin-bottom:12px">
      <div class="search-box grow">
        <span class="ico">⌕</span>
        <input type="search" placeholder="搜索题干或选项（/ 聚焦）" data-role="search" value="${h(g.search)}" enterkeyhint="search">
      </div>
      <button class="icon-btn" data-act="import" aria-label="导入题库" title="导入题库">⇪</button>
      <button class="icon-btn" data-act="add" aria-label="添加题目" title="添加题目">＋</button>
      <button class="icon-btn" data-act="print" aria-label="导出试卷" title="导出试卷（打印 / 存 PDF）">⎙</button>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理" title="批量管理">${g.edit?"✓":"☰"}</button>
    </div>
    <div class="chips">${a}</div>
    ${g.edit?`<div class="row between" style="margin-bottom:12px">
        <button class="btn btn-sm btn-ghost" data-act="select-all">${g.selected.size===t.length&&t.length?"取消全选":"全选本页"}</button>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export" ${g.selected.size?"":"disabled"}>导出 JSON</button>
          <button class="btn btn-sm" data-act="print-selected" ${g.selected.size?"":"disabled"}>导出试卷</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${g.selected.size?"":"disabled"}>删除</button>
        </div>
      </div>`:""}
    ${o}`}async function ge(t){const e=!t,n={editor:null},a=document.createElement("div");if(a.innerHTML=`
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
      <input class="input" data-role="a" value="${h(t?Ue(t):"")}" placeholder="A">
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
    <div class="row" style="justify-content:flex-end;margin-top:-4px">
      <button type="button" class="btn btn-ghost btn-sm" data-role="classify">✦ AI 归类</button>
    </div>`,!await C({title:e?"添加题目":"编辑题目",body:a,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:f=>{const p=f.querySelector('[data-role="q-host"]');p&&(n.editor=Jn({value:t?.q??"",placeholder:"输入题干；可用工具栏插图、写公式（$…$）",minHeight:110}),p.appendChild(n.editor.el));const v=f.querySelector('[data-role="classify"]');v&&v.addEventListener("click",async()=>{const $=q(n.editor?.getValue()??"").trim();if(!$){m.error("先写题干，AI 才能判断归类");return}const b=f.querySelector('[data-role="opts"]')?.value??"",k=v.textContent??"";v.disabled=!0,v.textContent="归类中…";try{const E=await A.ai.classify(`题目：${$}
选项：${b.split(`
`).join("；")}`),O=JSON.parse(ua(E.result??"{}")),oe=f.querySelector('[data-role="subject"]'),ie=f.querySelector('[data-role="chapter"]');O.subject&&oe&&(oe.value=String(O.subject).slice(0,24)),O.chapter&&ie&&(ie.value=String(O.chapter).slice(0,24)),m.ok("已根据题目填入题库与章节")}catch{m.error("AI 归类失败，可手动填写")}finally{v.disabled=!1,v.textContent=k}})}}))return;const o=f=>a.querySelector(`[data-role="${f}"]`).value,r=(n.editor?.getValue()??"").trim();if(!q(r).trim()&&!/<img/i.test(r)){m.error("题干不能为空");return}const i=o("opts").split(`
`).map(f=>f.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),c=o("a").trim();let d="";if(i.length){const p=c.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(v=>v.charCodeAt(0)-65).filter(v=>v>=0&&v<i.length);if(!p.length){m.error("答案请填选项字母，如 A 或 A,B");return}d=p.length===1?p[0]:p}else d=c;const u={q:r,opts:i,a:d,chapter:o("chapter").trim(),subject:o("subject").trim()||"默认题库"};try{e?await A.questions.add([u]):await A.questions.update(t.id,u),J("bank"),await Y(!0),m.ok(e?"题目已添加":"题目已保存")}catch(f){m.error(f instanceof S?f.message:"保存失败")}}async function ma(){await la()}function ga(){const t=ut().filter(s=>g.selected.has(s.id));if(!t.length){m.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=`题库-${t.length}题.json`,a.click(),URL.revokeObjectURL(n),m.ok(`已导出 ${t.length} 题`)}async function ba(){await Y()}async function ha(t,e){switch(t){case"subject":return g.subject=e.dataset.subject??"all",!0;case"toggle-edit":return g.edit=!g.edit,g.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return g.selected.has(n)?g.selected.delete(n):g.selected.add(n),!0}case"add":return await ge(),!0;case"edit":{const n=ut().find(a=>a.id===Number(e.dataset.id));return n&&await ge(n),!0}case"delete-selected":{const n=[...g.selected];if(!n.length||!await kt({title:"删除题目",message:`确定删除选中的 ${n.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await A.questions.remove(n),g.selected.clear(),J("bank"),await Y(!0),m.ok("已删除")}catch(a){m.error(a instanceof S?a.message:"删除失败")}return!0}case"export":return ga(),!0;case"print":return me(Bt(),{title:`题库 · ${g.subject==="all"?"全部":g.subject}`}),!0;case"print-selected":return me(ut().filter(n=>g.selected.has(n.id)),{title:"选中题目 · 试卷"}),!0;case"page-prev":return g.page=Math.max(0,g.page-1),!0;case"page-next":return g.page+=1,!0;case"select-all":{const n=Bt().slice(g.page*W,g.page*W+W),a=n.every(s=>g.selected.has(s.id));return n.forEach(s=>a?g.selected.delete(s.id):g.selected.add(s.id)),!0}case"import":return await ma(),!0;case"search":return!0;default:return!1}}function va(t){return t.dataset.role==="search"?(g.search=t.value,g.page=0,!0):!1}const ya="modulepreload",wa=function(t){return"/"+t},be={},$a=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let r=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),c=i?.nonce||i?.getAttribute("nonce");s=r(n.map(d=>{if(d=wa(d),d in be)return;be[d]=!0;const u=d.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${f}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":ya,u||(p.as="script"),p.crossOrigin="",p.href=d,c&&p.setAttribute("nonce",c),document.head.appendChild(p),u)return new Promise((v,$)=>{p.addEventListener("load",v),p.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return s.then(r=>{for(const i of r||[])i.status==="rejected"&&o(i.reason);return e().catch(o)})};function ze(t){return new Promise(e=>window.setTimeout(e,t))}function ka(t,e,n=620,a="%"){const s=performance.now(),o=r=>{const i=Math.min((r-s)/n,1),c=1-Math.pow(1-i,3);t.innerHTML=`${Math.round(e*c)}<span>${a}</span>`,i<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}function yt(t=12){T.vibration&&navigator.vibrate?.(t)}let w=null,lt=null;function at(){return w?w.options.questions[w.idx]??null:null}function xt(t){const e=w;let n=e.records.get(t.id);return n||(n={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,n)),n}function Fe(){const t=w;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function xa(){const t=w;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function Sa(t,e){if(j(t.a))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${h(e.text)}</textarea>
      </div>`;const n=ft(t.a);return`<div class="opts" data-multi="${n.length>1}">${t.opts.map((s,o)=>{let r="";return e.submitted?n.includes(o)?r="correct":e.picked.includes(o)?r="wrong":r="muted":e.picked.includes(o)&&(r="picked"),`<button class="opt" data-act="pick" data-idx="${o}" data-state="${r}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+o)}</span>
        <span class="opt-text">${P(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function Aa(t,e){if(!e.submitted)return"";const n=j(t.a)?String(t.a):X(t.a,t.opts),a=j(t.a)?q(e.text)||"（空）":X(e.picked.length?e.picked:[],t.opts)||"（未选）";if(j(t.a)){const s=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${w?.busy?"disabled":""}>✦ AI 阅卷</button>
          <button class="btn btn-sm" data-act="mark" data-ok="1">我答对了</button>
          <button class="btn btn-sm" data-act="mark" data-ok="0">没答对</button>
        </div>`:`<div class="essay-actions"><span class="tag ${e.correct?"tag-ok":"tag-bad"}">${e.correct?"已标记：答对":"已标记：答错"}</span></div>`;return`<div class="answer-panel">
      <div class="ai-title">参考答案</div>${h(n)}
      <div class="divider"></div>
      <div class="ai-title" style="color:var(--text-3)">你的作答</div>${h(a)}
      <div class="divider"></div>
      ${s}
    </div>`}return`<div class="answer-panel">
    <div class="ai-title">${e.correct?"✅ 回答正确":"❌ 回答错误"}</div>
    正确答案：${h(X(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${h(a)}`}
  </div>`}function Ea(){const t=w,e=at();if(!e)return"";const n=xt(e),a=t.options.questions.length,s=a?Math.round((t.idx+(n.submitted?1:0))/a*100):0,o=ft(e.a).length>1&&!j(e.a);return`
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
          <span>${o?"多选":j(e.a)?"简答":"单选"}</span>
        </div>
        <div class="q-text">${P(e.q)}</div>
        ${Sa(e,n)}
        ${Aa(e,n)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${vt(e.id)}" aria-label="收藏">${vt(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!Kt()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${n.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===a-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${o||j(e.a)?"提交答案":"查看答案"}</button>`}
    </div>`}function La(t,e){w={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},I(),lt=n=>{const a=w;if(!a)return;const s=n.target,o=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(n.key==="Escape"){if(document.querySelector(".modal-layer"))return;se();return}if(o)return;const r=at();if(!r)return;const i=xt(r);if(n.key===" "||n.key==="Enter"){const d=a.root?.querySelector('[data-act="submit"]'),u=a.root?.querySelector('[data-act="next"]');d?(n.preventDefault(),D("submit",d)):u&&(n.preventDefault(),D("next",u));return}if(n.key==="ArrowRight"){n.preventDefault(),i.submitted?ne():D("submit",a.root.querySelector('[data-act="submit"]'));return}if(n.key==="ArrowLeft"){n.preventDefault(),D("prev",a.root);return}const c=n.key.toLowerCase();if(/^[1-9]$/.test(c)||/^[a-h]$/.test(c)){const d=/^[1-9]$/.test(c)?Number(c)-1:c.charCodeAt(0)-97;if(d<r.opts.length){n.preventDefault();const u=a.root?.querySelector(`.opt[data-idx="${d}"]`);u&&D("pick",u)}return}c==="s"?D("fav",a.root):c==="n"?D("note",a.root):c==="e"?D("ai",a.root):c==="g"?D("ai-grade",a.root):c==="?"&&$a(()=>Promise.resolve().then(()=>ts),void 0).then(d=>d.openShortcuts())},document.addEventListener("keydown",lt),t.addEventListener("submit",n=>n.preventDefault()),t.addEventListener("input",We)}function I(){const t=w;t?.root&&(t.root.innerHTML=Ea())}function We(t){const e=t.target;e?.dataset.role!=="essay"||!w||(w.textDraft=e.value)}async function qt(t,e){const n=w;if(e.submitted=!0,j(t.a))e.correct=null;else if(e.correct=dn(e.picked,t.a),e.correct){yt(10);const a=qa();a>=3&&a%3===0&&m.ok(`连对 ${a} 题，保持住`)}else yt([14,40,14]),ee(t,e);I(),e.correct&&n.options.questions.length>n.idx+1&&(await ze(600),w&&w.idx===n.idx&&ne())}function qa(){const t=w;let e=0;for(let n=t.idx;n>=0;n-=1){const a=t.records.get(t.options.questions[n].id);if(a?.submitted)if(a.correct===!0)e+=1;else break}return e}async function ee(t,e){try{await A.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(n){n instanceof S&&n.status!==401&&m.error(`错题保存失败：${n.message}`)}}function ne(){const t=w,e=t.options.questions.length;if(t.idx>=e-1){ja();return}t.idx+=1,t.textDraft="",I(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function ae(){lt&&document.removeEventListener("keydown",lt),lt=null,w?.root?.removeEventListener("input",We),w?.root?.replaceChildren(),w=null}async function se(){const t=w;if(!t)return;const e=Fe();if(!await kt({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;at()&&Je();const s=t.options.onExit;ae(),s?.()}function Je(){const t=w;if(!t)return;t.options.source==="sequential"&&$n(t.idx);const e=t.options.questions.slice(0,5).map(n=>q(n.q).slice(0,40));xn(e)}async function ja(){const t=w;Je();const e=t.options.questions.length,n=Fe(),a=xa(),s=n-a,o=n?Math.round(a/n*100):0;if(ae(),await C({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${a}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${n}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:i=>{const c=i.querySelector('[data-role="acc"]');c&&ka(c,o)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function Ta(t,e,n){e.correct=n,n?yt(10):ee(t,e),I(),n&&m.ok("已记为答对")}async function Ma(t,e){const n=w;if(n){n.busy=!0,I();try{const a=[`题目：${q(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${q(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await A.ai.grade(a),o=String(s.result||""),r=o.includes("得分")&&!o.includes("不得分");e.correct=r,r?yt(10):ee(t,e),m.ok(r?"AI 阅卷：答对":"AI 阅卷：答错")}catch(a){m.error(a instanceof S?a.message:"AI 阅卷失败，请稍后再试")}finally{n.busy=!1,I()}}}async function Ca(){const t=at();if(!t)return;const e=Kt()[String(t.id)]??"",n=document.createElement("div");n.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${h(e)}</textarea>`;const a=n.querySelector("textarea");await C({title:"我的笔记",body:n,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>a.focus()})&&(wn(t.id,a.value),m.ok("笔记已保存"),I())}async function Na(){const t=at();if(!t)return;const e=xt(t),n=[`题目：${q(t.q)}`,t.opts.length?`选项：${t.opts.map((r,i)=>`${String.fromCharCode(65+i)}. ${q(r)}`).join("；")}`:"",`正确答案：${j(t.a)?t.a:X(t.a,t.opts)}`,e.submitted?`我的作答：${j(t.a)?e.text:X(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),a=document.createElement("div");a.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',C({title:"AI 深度解析",body:a,actions:[{label:"关闭",value:"close"}]});const s=a.querySelector('[data-role="text"]'),o=a.querySelector(".ai-title");try{let r="";const i=await A.ai.explainStream(n,d=>{r+=d,s.innerHTML=`${h(r).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),c=i.provider==="deepseek"?"DeepSeek":i.provider==="zhipu"?"智谱":"";o.textContent=r?`✦ AI 解析${c?` · ${c}`:""}${i.cached?" · 缓存命中":""}`:"✦ AI 解析",r?s.innerHTML=h(i.text||r).replace(/\n/g,"<br>"):await Ia(s,i.text??""),s.classList.remove("cursor")}catch(r){const i=r instanceof S?r.message:"AI 解析失败，请稍后重试";m.error(i),o.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=i}}async function Ia(t,e){for(let n=0;n<e.length;n+=2)t.innerHTML=h(e.slice(0,n+2)).replace(/\n/g,"<br>"),await ze(12)}function Oa(){const t=w;if(!t)return;const e=t.options.questions.map((n,a)=>{const s=t.records.get(n.id),o=a===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${a}" data-state="${o}">${a+1}</button>`}).join("");C({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:n=>{n.querySelectorAll(".nav-cell").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.dataset.idx);!Number.isFinite(s)||!w||(w.idx=s,w.textDraft="",te(),I())})})}}).then(n=>{n==="finish"&&se()})}async function D(t,e){const n=w;if(!n)return!1;const a=at();if(!a)return!1;const s=xt(a);switch(t){case"pick":{if(s.submitted)return!0;const o=Number(e.dataset.idx);return j(a.a)||(ft(a.a).length>1?(s.picked=s.picked.includes(o)?s.picked.filter(i=>i!==o):[...s.picked,o],I()):(s.picked=[o],await qt(a,s))),!0}case"submit":{if(j(a.a)){const o=n.root?.querySelector('[data-role="essay"]');if(s.text=o?.value??n.textDraft,!s.text.trim())return m.info("先写点什么再提交吧"),!0;await qt(a,s)}else{if(!s.picked.length)return m.info("请先选择答案"),!0;await qt(a,s)}return!0}case"ai-grade":return!j(a.a)||w?.busy||await Ma(a,s),!0;case"mark":return j(a.a)&&Ta(a,s,e.dataset.ok==="1"),!0;case"next":return ne(),!0;case"prev":return n.idx>0&&(n.idx-=1,n.textDraft="",I()),!0;case"jump":return n.idx=Number(e.dataset.idx),n.textDraft="",te(),I(),!0;case"nav":return Oa(),!0;case"exit":return await se(),!0;case"fav":return await Dn(a.id),I(),!0;case"note":return await Ca(),!0;case"ai":return Na(),!0;default:return!1}}let H=null;function Da(){return!!(H&&document.body.contains(H))}function nt(t){if(!t.questions.length){m.info("这里还没有题目");return}he(),H=document.createElement("div"),H.className="quiz",document.body.appendChild(H),document.body.classList.add("is-locked"),La(H,{...t,onExit:()=>{he(),t.onExit?.()}}),kn({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function he(){H&&(ae(),H.remove(),H=null,document.body.classList.remove("is-locked"))}async function jt(t="random"){const e=l.bank??[];if(!e.length){m.info("题库还是空的，先去添加题目吧");return}if(t==="chapter"){const a=await Ha(e);if(!a?.length)return;const s=e.filter(r=>a.includes(r.chapter||"未分类")),o=await wt(s.length);if(o===null)return;nt({questions:s.slice(0,o),source:"chapter",title:"章节练习"});return}const n=await wt(e.length);if(n!==null){if(t==="sequential"){const a=Math.min(qe(),Math.max(e.length-1,0));nt({questions:e.slice(0,n),source:"sequential",title:"顺序练习",startIndex:a<n?a:0});return}nt({questions:Se(e).slice(0,n),source:"all",title:"随机练习"})}}async function Ke(){const t=l.wrong??await Z(!0);if(!t.length){m.info("错题本是空的，先去刷几题吧");return}const e=await wt(t.length);if(e===null)return;const n=t.slice(0,e).map(a=>({id:a.id,q:a.q,opts:a.opts,a:a.a,chapter:a.chapter,subject:a.subject}));nt({questions:n,source:"wrong",title:"错题重练"})}function _a(t){if(!t.length){m.info("还没有收藏题目");return}wt(t.length).then(e=>{e!==null&&nt({questions:Se(t).slice(0,e),source:"fav",title:"收藏练习"})})}function Ra(){const t=je(),e=l.bank??[];if(!t||!e.length)return m.info("没有可以继续的练习"),!1;const n=new Map(e.map(s=>[s.id,s])),a=t.ids.map(s=>n.get(s)).filter(s=>!!s);return a.length?(nt({questions:a,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,a.length-1)}),!0):(Te(),m.info("上次的题目已经不在了"),!1)}function wt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const n=document.createElement("div");n.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const a=n.querySelector('[data-role="count"]');return a.addEventListener("click",s=>{const o=s.target.closest("button[data-n]");o&&(a.querySelectorAll("button").forEach(r=>r.setAttribute("aria-pressed","false")),o.setAttribute("aria-pressed","true"))}),C({title:"练多少题",body:n,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const o=a.querySelector('button[aria-pressed="true"]');return Number(o?.dataset.n??t)})}async function Ha(t){const e=new Map;t.forEach(r=>{const i=r.chapter?.trim()||"未分类";e.set(i,(e.get(i)??0)+1)});const n=[...e.entries()].sort((r,i)=>i[1]-r[1]);if(!n.length)return null;const a=document.createElement("div");if(a.innerHTML=`<div class="list">${n.map(([r,i],c)=>`
      <button class="item" data-chapter="${h(r)}" data-checked="${c===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${h(r)}</span><span class="tag">${i} 题</span></div>
      </button>`).join("")}</div>`,a.addEventListener("click",r=>{const i=r.target.closest("[data-chapter]");i&&(i.dataset.checked=i.dataset.checked==="true"?"false":"true")}),!await C({title:"选择章节",body:a,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const o=Array.from(a.querySelectorAll("[data-chapter]")).filter(r=>r.dataset.checked==="true").map(r=>r.dataset.chapter??"");return o.length?o:null}const V=new Set;function Ba(){V.clear()}function Pt(){return l.favs??[]}function Pa(){const t=Pt(),e=l.loading.fav&&!l.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(n=>`
        <div class="item" data-id="${n.id}">
          <div class="item-q">${P(n.q)}</div>
          <div class="item-meta">
            ${n.subject?`<span class="tag tag-accent">${h(n.subject)}</span>`:""}
            ${n.chapter?`<span class="tag">${h(n.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${n.id}">${V.has(n.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${n.id}">取消收藏</button>
          </div>
          ${V.has(n.id)?`<div class="item-answer"><div class="right">${h(X(n.a,n.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function Ua(){await dt()}async function za(t,e){switch(t){case"practice":return Pt().length?(await _a(Pt()),!0):(m.info("还没有收藏的题"),!0);case"reveal":{const n=Number(e.dataset.id);return V.has(n)?V.delete(n):V.add(n),!0}case"remove":{const n=Number(e.dataset.id);try{await A.favorites.remove(n),V.delete(n),J("fav"),await dt(!0),m.ok("已取消收藏")}catch(a){m.error(a instanceof S?a.message:"操作失败")}return!0}default:return!1}}let Tt="";function Fa(){return(!An()||!Tt)&&(Tt=_n(),En()),Tt}function Wa(){const t=new Date,e=a=>String(a).padStart(2,"0"),n="日一二三四五六"[t.getDay()];return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())} / 周${n}`}const Ja=t=>String(t).padStart(2,"0");function Ka(){const t=l.bank,e=l.wrong,n=l.favs,a=l.loading,s=je(),o=Me().slice(0,4),r=qe(),i=t?t.length:0,c=Math.min(20,Math.max(5,i||10)),d='<div class="skeleton sk-line w60"></div><div class="skeleton sk-line w80"></div>',u=f=>f===void 0?"—":String(f).padStart(2,"0");return`
    <section class="masthead">
      <div class="mast-meta">
        <span>${Wa()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${l.user?`@${h(l.user)}`:"未登录"}</span>
      </div>
      <h1 class="mast-title">
        今天<br />练 <em>${String(c).padStart(2,"0")}</em> 题
      </h1>
      <p class="mast-sub">${h(Fa())}</p>
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
        <span class="ov-num">${u(n?.length)}</span>
        <span class="ov-label">收藏</span>
      </button>
    </section>

    ${a.bank&&!t?`<div class="card card-pad">${d}</div>`:""}

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

    ${o.length?`<section class="recent">
             <div class="section-title">最近练过</div>
             ${o.map((f,p)=>`<div class="recent-row"><span class="recent-idx">${Ja(p+1)}</span><span class="recent-text">${h(f)}</span></div>`).join("")}
           </section>`:""}
  `}async function Qa(){await Promise.allSettled([Y(),Z(),dt()])}async function Ga(t,e){switch(t){case"goto":return $t(e.dataset.tab??"bank"),!0;case"random":return await jt("random"),!0;case"sequential":return await jt("sequential"),!0;case"chapter":return await jt("chapter"),!0;case"wrong":return await Ke(),!0;case"resume":return Ra(),!0;default:return!1}}const Mt=8;function Va(){const t=[],e=(n,a,s)=>{(n??[]).forEach(o=>t.push({id:o.id,q:o,source:a,tab:s}))};return e(l.bank,"题库","bank"),e(l.wrong,"错题","wrong"),e(l.favs,"收藏","fav"),t}function Xa(t,e){const n=e.toLowerCase();return n?q(t.q.q).toLowerCase().includes(n)||(t.q.opts??[]).some(a=>q(a).toLowerCase().includes(n))||q(t.q.chapter??"").toLowerCase().includes(n)||q(t.q.subject??"").toLowerCase().includes(n):!0}function ve(t=""){const e=document.createElement("div");e.className="search-panel",e.innerHTML=`
    <div class="search-box">
      <span class="ico">⌕</span>
      <input class="search-input" type="search" data-role="kw" placeholder="搜题干、选项、章节、题库…" value="${t.replace(/"/g,"&quot;")}">
    </div>
    <div class="search-results" data-role="hits"></div>
    <p class="muted small search-foot" data-role="foot"></p>`;const n=Va(),a=e.querySelector('[data-role="hits"]'),s=e.querySelector('[data-role="foot"]'),o=e.querySelector('[data-role="kw"]'),r=()=>{const i=o.value.trim(),c=n.filter(f=>Xa(f,i));if(!i){const f=c.filter(p=>p.tab==="bank").slice(0,12);a.innerHTML=f.length?f.map(p=>`<button class="hit" data-act="open" data-tab="${p.tab}" data-id="${p.id}">
                <span class="hit-src">${p.source}</span>
                <span class="hit-q">${P(p.q.q)}</span>
              </button>`).join(""):'<p class="muted small">题库还是空的，先去导入吧。</p>',s.textContent=f.length?"输入关键词可以跨题库 / 错题 / 收藏一起搜":"";return}const d=f=>c.filter(p=>p.source===f),u=[];["题库","错题","收藏"].forEach(f=>{const p=d(f);p.length&&(u.push(`<div class="hit-group">${f} · ${p.length}</div>`),u.push(p.slice(0,Mt).map(v=>{const $=Zt(v.q);return`<button class="hit" data-act="open" data-tab="${v.tab}" data-id="${v.id}">
              <span class="hit-src">${Yt[$]}</span>
              <span class="hit-q">${_e(P(v.q.q),i)}</span>
            </button>`}).join("")),p.length>Mt&&u.push(`<div class="hit-more muted small">还有 ${p.length-Mt} 条，缩小关键词试试</div>`))}),a.innerHTML=u.length?u.join(""):`<p class="muted small">没有找到「${i}」</p>`,s.textContent=`共命中 ${c.length} 条`};o.addEventListener("input",r),C({title:"全局搜索",body:e,actions:[{label:"关闭",value:"close"}],onMount:i=>{r();const c=i.querySelector('[data-role="kw"]');c?.focus(),c?.setSelectionRange(c.value.length,c.value.length),i.addEventListener("click",d=>{const u=d.target.closest(".hit");if(!u)return;const f=u.dataset.tab??"bank",p=Number(u.dataset.id),v=n.find($=>$.id===p&&$.tab===f);if(te(),$t(f),v){const $=q(v.q.q).slice(0,12);if(f==="bank"){const b=document.querySelector('.view input[data-role="search"]');b&&$&&(b.value=$,b.dispatchEvent(new Event("input",{bubbles:!0})))}}})}})}const Qe=[{keys:"1 2 3 4 / A B C D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1 – 5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/ 或 Ctrl+K",desc:"全局搜索（题库 / 错题 / 收藏）",scope:"全局"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function re(){const t=Qe.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");C({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const Ya=["home","bank","wrong","fav","me"];function Za(t){const e=t;if(!e)return!1;const n=e.tagName.toLowerCase();return n==="input"||n==="textarea"||n==="select"||e.isContentEditable}function Ge(){document.addEventListener("keydown",t=>{if((t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"){if(document.querySelector(".quiz"))return;t.preventDefault(),ve();return}if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||Za(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),re();return}if(t.key==="/"){t.preventDefault(),ve();return}const n=Number(t.key);n>=1&&n<=5&&(t.preventDefault(),$t(Ya[n-1]))})}const ts=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:Qe,installShortcuts:Ge,openShortcuts:re},Symbol.toStringTag,{value:"Module"})),es=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],ns=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function ye(t,e,n){return`<div class="segmented">${t.map(a=>`<button class="seg" data-act="${n}" data-value="${a.value}" aria-pressed="${String(a.value)===String(e)}">${a.label}</button>`).join("")}</div>`}function we(t,e){const n=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=t,s.click(),URL.revokeObjectURL(a)}async function as(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await C({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const n=t.querySelector('[data-role="old"]').value,a=t.querySelector('[data-role="next"]').value;if(a.length<6){m.error("新密码至少 6 位");return}try{await A.auth.change(n,a),m.ok("密码已更新")}catch(s){m.error(s instanceof S?s.message:"修改失败")}}function ss(){const t=l.user,e=h((t||"?").slice(0,1).toUpperCase()),n=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})();return`
    <div class="profile">
      <div class="profile-avatar">${e}</div>
      <div class="profile-body">
        <div class="profile-name">${h(t)}</div>
        <div class="profile-desc">${l.bank?.length??0} 道题 · ${l.wrong?.length??0} 道错题 · ${l.favs?.length??0} 条收藏</div>
      </div>
    </div>

    <div class="section-title">外观</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">主题</div><div class="setting-desc">深色模式也会跟随系统自动切换</div></div>
      </div>
      ${ye(es,T.theme,"theme")}
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
      ${ye(ns,T.autoDelay,"delay")}
      <div class="divider"></div>
      <label class="setting-row">
        <div><div class="setting-title">答题震动</div><div class="setting-desc">答对答错给一点反馈</div></div>
        <span class="switch" role="switch" data-act="toggle-vibration" aria-checked="${T.vibration}"><i></i></span>
      </label>
      <label class="setting-row">
        <div><div class="setting-title">连对鼓励</div><div class="setting-desc">连续答对时来点掌声</div></div>
        <span class="switch" role="switch" data-act="toggle-streak" aria-checked="${T.streakAlert}"><i></i></span>
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
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function rs(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){m.error("图片太大了（最多 8MB）");return}try{const n=await os(e);it({image:n,color:""}),m.ok("背景已更新"),L("render")}catch{m.error("这张图片读不出来，换一张试试")}}},t.click()}function os(t){return new Promise((e,n)=>{const a=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(a);const o=Math.min(1,1600/Math.max(s.width,s.height)),r=document.createElement("canvas");r.width=Math.round(s.width*o),r.height=Math.round(s.height*o);const i=r.getContext("2d");if(!i){n(new Error("canvas unavailable"));return}i.drawImage(s,0,0,r.width,r.height),e(r.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(a),n(new Error("image load failed"))},s.src=a})}function is(){Vt()}async function cs(t,e){switch(t){case"theme":return Tn(e.dataset.value),L("render"),!0;case"delay":return bt({autoDelay:Number(e.dataset.value)}),L("render"),!0;case"toggle-vibration":return bt({vibration:!T.vibration}),L("render"),!0;case"toggle-streak":return bt({streakAlert:!T.streakAlert}),L("render"),!0;case"pick-color":return it({color:e.value,image:""}),!0;case"pick-bg":return await rs(),!0;case"clear-bg":return it({image:""}),L("render"),!0;case"dim":return it({dim:Number(e.value)}),!0;case"shortcuts":return re(),!0;case"about":return C({title:"关于",body:`<p class="muted small" style="margin:0 0 10px">原点 · Origin —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。</p>
          <p class="muted small" style="margin:0 0 6px">题库 ${l.bank?.length??0} 题 · 错题 ${l.wrong?.length??0} 道 · 收藏 ${l.favs?.length??0} 条</p>
          <p class="muted small" style="margin:0">版本 v2.0.0 · 支持 PWA 离线打开</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]}),!0;case"reset-bg":return it({color:"",image:"",dim:.35}),m.ok("背景已恢复"),L("render"),!0;case"export-bank":return l.bank?.length?(we(`题库-${l.user}.json`,l.bank),m.ok("已导出"),!0):(m.info("题库是空的"),!0);case"export-wrong":return l.wrong?.length?(we(`错题-${l.user}.json`,l.wrong),m.ok("已导出"),!0):(m.info("没有错题"),!0);case"change-password":return await as(),!0;case"logout":return await kt({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(Oe(),m.info("已退出登录")),!0;default:return!1}}const x={subject:"all",edit:!1,selected:new Set};function ls(){x.subject="all",x.edit=!1,x.selected.clear()}function Ve(){const t=l.wrong??[];return x.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===x.subject)}function ds(){return["all",...Array.from(new Set((l.wrong??[]).map(t=>t.subject||"默认题库")))]}function us(){const t=Ve(),e=l.wrong?.length??0,n=ds().map(s=>`<button class="chip" data-act="subject" data-subject="${h(s)}" aria-pressed="${x.subject===s}">
          ${s==="all"?"全部":h(s)}
        </button>`).join(""),a=l.loading.wrong&&!l.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${x.selected.has(s.id)}">
          ${x.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${P(s.q)}</div>
          <div class="item-meta">
            ${s.subject?`<span class="tag tag-accent">${h(s.subject)}</span>`:""}
            ${s.chapter?`<span class="tag">${h(s.chapter)}</span>`:""}
          </div>
          <div class="item-answer">
            ${s.user_choice_text?`<div class="mine">你的选择：${h(s.user_choice_text)}</div>`:""}
            ${s.answer?`<div class="right">正确答案：${h(s.answer)}</div>`:""}
          </div>
          ${x.edit?"":`<div class="item-meta" style="margin-top:10px">
                   <span class="grow"></span>
                   <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${s.id}">已掌握</button>
                 </div>`}
        </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">⚑</div><div class="empty-title">${e?"这个题库下没有错题":"还没有错题"}</div><div class="empty-desc">${e?"切到「全部」看看":"答错的题会自动收集到这里，方便集中消灭"}</div></div>`;return`
    <div class="row between" style="margin-bottom:4px">
      <h1 class="page-title" style="margin:0">错题集</h1>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${x.edit?"✓":"☰"}</button>
    </div>
    <p class="muted small" style="margin:4px 0 14px">共 ${e} 道，消灭一题少一题</p>
    ${e?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">开始重练（${t.length} 题）</button>`:""}
    ${n}
    ${x.edit?`<div class="row between" style="margin-bottom:12px">
             <span class="muted small">已选 ${x.selected.size} 题</span>
             <button class="btn btn-sm btn-danger" data-act="remove-selected" ${x.selected.size?"":"disabled"}>删除</button>
           </div>`:""}
    ${a}`}async function ps(){await Z()}async function fs(t,e){switch(t){case"subject":return x.subject=e.dataset.subject??"all",!0;case"toggle-edit":return x.edit=!x.edit,x.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return x.selected.has(n)?x.selected.delete(n):x.selected.add(n),!0}case"practice":return Ve().length?(await Ke(),!0):(m.info("没有可练的错题"),!0);case"remove":{const n=Number(e.dataset.id);try{await A.wrong.remove([n]),x.selected.delete(n),J("wrong"),await Z(!0),m.ok("已标记掌握，继续加油")}catch(a){m.error(a instanceof S?a.message:"操作失败")}return!0}case"remove-selected":{const n=[...x.selected];if(!n.length||!await kt({title:"删除错题",message:`确定删除选中的 ${n.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await A.wrong.remove(n),x.selected.clear(),J("wrong"),await Z(!0),m.ok("已删除")}catch(a){m.error(a instanceof S?a.message:"删除失败")}return!0}default:return!1}}const tt={home:{render:Ka,mount:Qa,handle:Ga},bank:{render:fa,mount:ba,handle:ha,onInput:va,reset:Pe},wrong:{render:us,mount:ps,handle:fs,reset:ls},fav:{render:Pa,mount:Ua,handle:za,reset:Ba},me:{render:ss,mount:is,handle:cs}};let pt=!1,K=!1,Ct=!1,Nt=!1;function Xe(){return document.getElementById("app-root")}function ms(){K=!1,Xe().innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-name">Origin Quiz</span>
        </div>
        <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(l.user||"?").slice(0,1).toUpperCase()}</button>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${Rt.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${Rt.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,pt=!0}function gs(){document.querySelectorAll(".tab-btn").forEach(e=>{const n=e.dataset.tab===l.tab;e.classList.toggle("is-active",n),e.setAttribute("aria-selected",String(n))});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,Rt.findIndex(n=>n.id===l.tab));t.style.setProperty("--tab-index",String(e))}}function bs(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,n=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),a=n?e.getAttribute("data-role"):null,s=n&&e instanceof HTMLInputElement?e.selectionStart:null,o=tt[l.tab]??tt.home;if(t.innerHTML=`<div class="view-inner">${o.render()}</div>`,gs(),n&&a){const r=t.querySelector(`[data-role="${a}"]`);r&&(r.focus(),s!==null&&r.setSelectionRange&&r.setSelectionRange(s,s))}o.mount?.()}function B(){if(Ct){Nt=!0;return}Ct=!0;try{if(!l.authed&&!l.token){K=!0,pt=!1,Xe().innerHTML=Hn();return}pt||ms(),bs()}finally{Ct=!1,Nt&&(Nt=!1,queueMicrotask(B))}}let It=!1;function $e(){It||(It=!0,setTimeout(()=>{It=!1,B()},0))}async function Ye(t){await t(),K&&B()}function Ze(t){const e=t.dataset.act??"";if(Da()&&t.closest(".quiz")){D(e,t).then(a=>{a||L("render")});return}if(e==="tab"){$t(t.dataset.tab??"home");return}if(K){Ye(()=>De(e,t));return}const n=tt[l.tab]??tt.home;n.handle&&Promise.resolve(n.handle(e,t)).then(a=>{a&&B()})}function hs(t){const e=t.target;if(!e)return;const n=e.closest("[data-act]");n&&(n.closest(".modal-layer")||Ze(n))}function ke(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){Ze(e);return}if(K)return;const n=document.getElementById("view");if(!n||!n.contains(e))return;(tt[l.tab]??tt.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&B()}function vs(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),K&&Ye(()=>De("submit",e)))}function ys(){Gt(),Vt(),Ln(()=>{Oe(),pt=!1,K=!1,m.error("登录已过期，请重新登录"),L("auth")}),mt("nav",()=>{Object.entries(tt).forEach(([t,e])=>{t!==l.tab&&e.reset?.()}),B()}),mt("auth",()=>{pt=!1,K=!1,l.authed?(Pe(),B(),Promise.allSettled([Y(!0),Z(!0),dt(!0)])):B()}),mt("render",$e),mt("data",$e),document.addEventListener("click",hs),document.addEventListener("change",ke),document.addEventListener("input",ke),document.addEventListener("submit",vs),Ge(),l.token&&(l.authed=!0),B(),l.token&&Promise.allSettled([Y(),Z(),dt()])}function xe(){try{ys(),bn()}catch(t){console.error("[origin-quiz] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",xe,{once:!0}):xe();
