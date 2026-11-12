var $n=Object.defineProperty;var xn=(t,e,n)=>e in t?$n(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ve=(t,e,n)=>xn(t,typeof e!="symbol"?e+"":e,n);import{k as kn,u as Sn,s as ye,a as kt,z as An}from"./vendor-SAJHWpKn.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const En={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function h(t){return String(t??"").replace(/[&<>"']/g,e=>En[e]??e)}const Dt=/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g;function Ln(t,e){try{return kn.renderToString(t,{displayMode:e,throwOnError:!1,output:"mathml",strict:!1,trust:!1})}catch{return h(e?`$$${t}$$`:`$${t}$`)}}function we(t){let e="",n=0;Dt.lastIndex=0;for(let a=Dt.exec(t);a;a=Dt.exec(t)){e+=h(t.slice(n,a.index)).replace(/\n/g,"<br>");const s=!!(a[1]||a[2]),r=(a[1]??a[2]??a[3]??a[4]??"").trim();e+=r?Ln(r,s):h(a[0]),n=a.index+a[0].length}return e+=h(t.slice(n)).replace(/\n/g,"<br>"),e}const jn=new Set(["IMG","BR","B","STRONG","I","EM","U","SUB","SUP","P","DIV","SPAN","CODE"]);function Tn(t){return t.replace(/!\[([^\]\n]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img src="$2" alt="$1">')}function R(t){const e=Tn(String(t??""));if(!e)return"";if(!/<[a-z][\s\S]*>/i.test(e))return we(e);const a=new DOMParser().parseFromString(`<div>${e}</div>`,"text/html").body.firstElementChild;if(!a)return h(e);const s=r=>{if(r.nodeType===Node.TEXT_NODE)return we(r.textContent??"");if(r.nodeType!==Node.ELEMENT_NODE)return"";const o=r,i=o.tagName,l=Array.from(o.childNodes).map(s).join("");if(!jn.has(i))return l;if(i==="IMG"){const d=o.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(d))return"";const p=h(o.getAttribute("alt")??"");return`<img src="${h(d)}" alt="${p}" loading="lazy" referrerpolicy="no-referrer">`}const c=i.toLowerCase();return`<${c}>${l}</${c}>`};return Array.from(a.childNodes).map(s).join("")}function M(t){return String(t??"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/\s+/g,"")}function vt(t){const e=Array.isArray(t)?t:typeof t=="number"?[t]:[];return Array.from(new Set(e.filter(n=>Number.isInteger(n)))).sort((n,a)=>n-a)}function q(t){return typeof t=="string"}function W(t,e=[]){return typeof t=="string"?t:vt(t).map(n=>{const a=String.fromCharCode(65+n),s=(e[n]??"").replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return s?`${a}. ${s}`:a}).join("、")}function ze(t){const e=[...t];for(let n=e.length-1;n>0;n-=1){const a=Math.floor(Math.random()*(n+1));[e[n],e[a]]=[e[a],e[n]]}return e}function Cn(t,e){const n=vt(e);if(!n.length||t.length!==n.length)return!1;const a=[...new Set(t)].sort((s,r)=>s-r);return a.length===n.length&&a.every((s,r)=>s===n[r])}function Mn(t){if(typeof t=="number")return t;if(Array.isArray(t))return t.map(Number).filter(Number.isInteger);if(typeof t=="string"){const e=t.trim();if(!e)return"";try{const n=JSON.parse(e);if(typeof n=="number")return n;if(Array.isArray(n))return n.map(Number).filter(Number.isInteger);if(typeof n=="string")return n}catch{}return e}return""}let H=null;function qn(){return H&&document.body.contains(H)||(H=document.createElement("div"),H.className="toast-host",H.setAttribute("role","status"),H.setAttribute("aria-live","polite"),document.body.appendChild(H)),H}function Ot(t,e="info",n=2600){if(!t)return;const a=document.createElement("div");a.className=`toast toast-${e}`,a.innerHTML=`<span class="toast-dot"></span><span class="toast-text">${h(t)}</span>`,qn().appendChild(a),requestAnimationFrame(()=>a.classList.add("in")),window.setTimeout(()=>{a.classList.remove("in"),window.setTimeout(()=>a.remove(),220)},n)}const m={info:t=>Ot(t,"info"),ok:t=>Ot(t,"success"),error:t=>Ot(t,"error",3200)},Jt="oq:queue",_n=200;function te(){try{const t=localStorage.getItem(Jt),e=t?JSON.parse(t):[];return Array.isArray(e)?e.filter(n=>n&&n.path):[]}catch{return[]}}function Be(t){try{t.length?localStorage.setItem(Jt,JSON.stringify(t.slice(-_n))):localStorage.removeItem(Jt)}catch{}}function Nn(){return te().length}function In(t,e,n){const a=te();a.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,path:t,body:e,label:n,at:Date.now()}),Be(a)}let Rt=!1;async function $e(){if(Rt)return 0;const t=te();if(!t.length)return 0;Rt=!0;let e=0;const n=[];for(const a of t)try{const s=await fetch(a.path,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a.body),...xe()?{headers:{"Content-Type":"application/json",Accept:"application/json",...xe()}}:{}});if(s.ok||s.status>=400&&s.status<500){s.ok&&(e+=1);continue}n.push(a)}catch{n.push(a);break}return Rt=!1,Be([...n,...t.slice(t.length)]),e&&m.ok(`已补传 ${e} 条离线操作`),e}function xe(){try{const e=(localStorage.getItem("oq:oq:token")||localStorage.getItem("oq:token")||"").replace(/^"|"$/g,"");return e?{Authorization:`Bearer ${e}`}:{}}catch{return{}}}function Dn(){window.addEventListener("online",()=>{$e()}),navigator.onLine&&Nn()&&setTimeout(()=>void $e(),1500)}const ee="oq:",ne="oq:user",ae="oq:token",On={theme:"auto",vibration:!0,autoDelay:600,streakAlert:!0},_={...On,...K("settings",{})};["auto","light","dark","eye"].includes(_.theme)||(_.theme="auto");function K(t,e){try{const n=localStorage.getItem(ee+t);return n===null?e:JSON.parse(n)}catch{return e}}function G(t,e){try{localStorage.setItem(ee+t,JSON.stringify(e))}catch{}}function Qt(t){try{localStorage.removeItem(ee+t)}catch{}}function Et(t){Object.assign(_,t),G("settings",_)}function Rn(t){Et({theme:t})}function I(){return K(ne,"")||""}function Ue(t){G(ne,t)}function Pn(){Qt(ne),Qt(ae)}function se(){return K(ae,"")||""}function Fe(t){G(ae,t)}function J(t){return`u:${I()||"anon"}:${t}`}function re(){return K(J("notes"),{})}function Hn(t,e){const n=re(),a=String(t);e.trim()?n[a]=e:delete n[a],G(J("notes"),n)}function We(){const t=K(J("progress"),{});return Number(t.sequential_index)||0}function zn(t){G(J("progress"),{sequential_index:t,updatedAt:Date.now()})}function Ke(){const t=K(J("session"),null);return!t||!Array.isArray(t.ids)||!t.ids.length||Date.now()-t.savedAt>24*3600*1e3?null:t}function Bn(t){G(J("session"),t)}function Ge(){Qt(J("session"))}function Je(){return K(J("recent"),[])}function Un(t){const e=[...t,...Je()].slice(0,30);G(J("recent"),Array.from(new Set(e)))}function Qe(){return K("appearance",{color:"",image:"",dim:.35})}function Fn(t){G("appearance",{...Qe(),...t})}function Wn(){return K("welcomed","")===new Date().toDateString()}function Kn(){G("welcomed",new Date().toDateString())}class L extends Error{constructor(n,a){super(a);ve(this,"status");this.name="ApiError",this.status=n}}let oe=null;function Gn(t){oe=t}async function Ve(t,e={}){const n=new Headers(e.headers);e.body&&!(e.body instanceof FormData)&&n.set("Content-Type","application/json");const a=se();a&&n.set("Authorization",`Bearer ${a}`),n.set("Accept","application/json");let s;try{s=await fetch(t,{...e,headers:n})}catch{throw new L(0,"网络连接失败，请检查网络后重试")}const r=s.headers.get("content-type")??"";let o=null;r.includes("application/json")?o=await s.json().catch(()=>null):o=await s.text().catch(()=>"");const i=o??{};if(s.status===401)throw oe?.(),new L(401,typeof i.error=="string"?i.error:"登录已过期，请重新登录");if(!s.ok||i.ok===!1){const l=typeof i.error=="string"&&i.error?i.error:`请求失败（HTTP ${s.status}）`;throw new L(s.status,l)}return o}const Pt=t=>Ve(t),B=(t,e)=>Ve(t,{method:"POST",body:JSON.stringify(e)});async function Jn(t,e,n){const a=new Headers({"Content-Type":"application/json"}),s=se();s&&a.set("Authorization",`Bearer ${s}`);const r=await fetch("/api/ai",{method:"POST",headers:a,body:JSON.stringify({...t,stream:!0}),signal:n});if(!r.ok||!r.body){const u=await r.json().catch(()=>({}));if(r.status===401)throw oe?.(),new L(401,"登录已过期，请重新登录");if(typeof u.result=="string")return e(u.result),{text:u.result,cached:!1,provider:typeof u.provider=="string"?u.provider:void 0};throw new L(r.status,typeof u.error=="string"?u.error:"AI 解析失败")}const o=r.body.getReader(),i=new TextDecoder;let l="",c="",d=!1,p;for(;;){const{value:u,done:b}=await o.read();if(b)break;l+=i.decode(u,{stream:!0});const $=l.split(`

`);l=$.pop()??"";for(const E of $){const v=E.split(`
`).find(S=>S.startsWith("data:"));if(!v)continue;let y;try{y=JSON.parse(v.slice(5).trim())}catch{continue}if(typeof y.delta=="string"&&y.delta&&(c+=y.delta,e(y.delta)),typeof y.error=="string")throw new L(502,y.error);y.done&&(d=y.cached===!0,typeof y.provider=="string"&&(p=y.provider))}}return{text:c,cached:d,provider:p}}function Vt(t){return{id:Number(t.id),q:String(t.q??""),opts:Array.isArray(t.opts)?t.opts.map(String):[],a:Mn(t.a),chapter:String(t.chapter??""),subject:String(t.subject??"默认题库"),created_at:typeof t.created_at=="string"?t.created_at:void 0}}function Qn(t){return{...Vt(t),answer:String(t.answer??""),user_choice:String(t.user_choice??""),user_choice_text:String(t.user_choice_text??"")}}async function Z(t,e,n){try{return await B(t,e)}catch(a){if(a instanceof L&&a.status===0)return In(t,e,n),{ok:!0,queued:!0,offline:!0};throw a}}const j={auth:{check:t=>B("/api/auth",{action:"check",username:t}),set:(t,e)=>B("/api/auth",{action:"set",username:t,password:e}),login:(t,e)=>B("/api/auth",{action:"login",username:t,password:e}),change:(t,e)=>B("/api/auth",{action:"change",username:I(),oldPassword:t,newPassword:e})},questions:{async list(){const t=I();if(!t)return[];const e=await Pt(`/api/questions?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>Vt(a))},add:t=>Z("/api/questions-add",{user_id:I(),questions:t},`导入 ${t.length} 道题`),update:(t,e)=>Z("/api/questions-update",{id:t,user_id:I(),...e},"保存题目"),remove:t=>Z("/api/questions-delete",{ids:t,user_id:I()},`删除 ${t.length} 道题`)},wrong:{async list(){const t=I();if(!t)return[];const e=await Pt(`/api/wrong?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>Qn(a))},add:t=>Z("/api/wrong-add",{user_id:I(),q:t.q,opts:t.opts,a:t.a,chapter:t.chapter??"",subject:t.subject??"默认题库",user_choice:t.user_choice??""},"记录错题"),remove:t=>Z("/api/wrong-delete",{ids:t,user_id:I()},"移除错题")},favorites:{async list(){const t=I();if(!t)return[];const e=await Pt(`/api/favorites?user_id=${encodeURIComponent(t)}`);return(Array.isArray(e)?e:e.questions??[]).map(a=>Vt(a))},add:t=>Z("/api/favorites-add",{user_id:I(),question_id:t},"收藏题目"),remove:t=>Z("/api/favorites-remove",{user_id:I(),question_id:t},"取消收藏")},ai:{explain:t=>B("/api/ai",{action:"explain",prompt:t}),grade:t=>B("/api/ai",{action:"grade",prompt:t}),extract:t=>B("/api/ai",{action:"extract",...t}),classify:t=>B("/api/ai",{action:"classify",prompt:t}),explainStream:(t,e,n)=>Jn({action:"explain",prompt:t},e,n)}},dt='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"',Xt=[{id:"home",label:"首页",icon:`<svg viewBox="0 0 24 24" ${dt} aria-hidden="true"><path d="M3.5 10.6 12 3.8l8.5 6.8"/><path d="M5.8 9.8V20h12.4V9.8"/></svg>`},{id:"bank",label:"题库",icon:`<svg viewBox="0 0 24 24" ${dt} aria-hidden="true"><path d="M4 6.4h16M4 12h16M4 17.6h10.5"/></svg>`},{id:"wrong",label:"错题",icon:`<svg viewBox="0 0 24 24" ${dt} aria-hidden="true"><path d="M6.2 3.6v16.8"/><path d="M6.2 4.6h11.2l-2.1 3.9 2.1 3.9H6.2"/></svg>`},{id:"fav",label:"收藏",icon:`<svg viewBox="0 0 24 24" ${dt} aria-hidden="true"><path d="M12 4.2l2.3 4.8 5.2.7-3.8 3.6.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 9.7l5.2-.7z"/></svg>`},{id:"me",label:"我的",icon:`<svg viewBox="0 0 24 24" ${dt} aria-hidden="true"><circle cx="12" cy="8.4" r="3.4"/><path d="M4.8 20c1.2-3.9 3.9-5.9 7.2-5.9s6 2 7.2 5.9"/></svg>`}],ke=["保持热爱，奔赴山海","每一次练习，都是成长的伏笔","慢慢来，比较快","你的努力，终将闪闪发光","关关难过关关过，前路漫漫亦灿灿","别怕路长，进一步有进一步的欢喜","在知识的海洋里，做一只快乐的小鲸鱼","走过的每一步，都算数"],f={tab:"home",user:I(),token:se(),bank:null,wrong:null,favs:null,loading:{bank:!1,wrong:!1,fav:!1},favoriteIds:new Set,authed:!1},pt=new Map;function St(t,e){return pt.has(t)||pt.set(t,new Set),pt.get(t).add(e),()=>pt.get(t)?.delete(e)}function C(t){pt.get(t)?.forEach(e=>e())}function _t(t){f.tab!==t&&(f.tab=t,C("nav"))}const Xe=window.matchMedia("(prefers-color-scheme: dark)");function Se(){return _.theme==="auto"?Xe.matches?"dark":"light":_.theme}function ie(){document.documentElement.dataset.theme=Se();const t=document.querySelector('meta[name="theme-color"]');t&&(t.content=Se()==="dark"?"#0b0c0f":"#f4f5f7")}function Vn(t){Rn(t),ie()}Xe.addEventListener("change",()=>{_.theme==="auto"&&ie()});function Xn(t){Fn(t)}function ce(){const{color:t,image:e,dim:n}=Qe(),a=document.body;a.style.backgroundImage=e?`url("${e}")`:"",a.style.backgroundSize="cover",a.style.backgroundPosition="center",a.style.backgroundAttachment="fixed",a.dataset.dim=String(n),t&&!e?a.style.backgroundColor=t:a.style.backgroundColor=""}async function Yn(t,e){const n=await j.auth.login(t,e);Fe(n.token),Ue(t),f.user=t,f.token=n.token,f.authed=!0,X(),C("auth")}async function Zn(t,e){const n=await j.auth.set(t,e);Fe(n.token),Ue(t),f.user=t,f.token=n.token,f.authed=!0,X(),C("auth")}function Ye(){f.user="",f.token="",f.authed=!1,f.bank=null,f.wrong=null,f.favs=null,f.favoriteIds=new Set,Pn(),Ge(),C("auth")}const ta=300*1e3,tt={bank:0,wrong:0,fav:0},Lt=new Map;function X(t){t?(tt[t]=0,t==="bank"&&(f.bank=null),t==="wrong"&&(f.wrong=null),t==="fav"&&(f.favs=null)):(tt.bank=tt.wrong=tt.fav=0,f.bank=null,f.wrong=null,f.favs=null)}function ea(t,e){const n=Lt.get(t);if(n)return n;const a=e().finally(()=>Lt.delete(t));return Lt.set(t,a),a}async function le(t,e,n,a){if(!f.user)return[];const s=Lt.get(t);if(s)return s;const r=Date.now()-tt[t]<ta;if(!e&&r)return[];f.loading[t]=!0,C("data");try{const o=await ea(t,n);return a(o),tt[t]=Date.now(),o}catch(o){throw o instanceof L&&o.status!==401&&m.error(o.message),o}finally{f.loading[t]=!1,C("data")}}async function nt(t=!1){try{await le("bank",t,()=>j.questions.list(),e=>{f.bank=e})}catch{}return f.bank??[]}async function at(t=!1){try{await le("wrong",t,()=>j.wrong.list(),e=>{f.wrong=e})}catch{}return f.wrong??[]}async function ht(t=!1){try{await le("fav",t,()=>j.favorites.list(),e=>{f.favs=e,f.favoriteIds=new Set(e.map(n=>n.id))})}catch{}return f.favs??[]}function Ct(t){return f.favoriteIds.has(t)}async function na(t){const e=!Ct(t);try{return e?await j.favorites.add(t):await j.favorites.remove(t),e?f.favoriteIds.add(t):f.favoriteIds.delete(t),f.favs=null,tt.fav=0,m.ok(e?"已加入收藏":"已取消收藏"),C("data"),e}catch(n){return m.error(n instanceof L?n.message:"操作失败"),Ct(t)}}function aa(){const t=new Date().getHours();return`${t<6?"夜深了":t<11?"早上好":t<14?"中午好":t<18?"下午好":"晚上好"}，${ke[Math.floor(Math.random()*ke.length)]}`}function ft(t){Xn(t),ce()}const w={step:"name",username:"",busy:!1,error:""};function sa(){w.step="name",w.username="",w.busy=!1,w.error=""}function ra(){const t=`
    <div class="auth-brand">
      <div class="brand-mark">原</div>
      <div>
        <div class="auth-title">原点 · Origin</div>
        <div class="brand-sub">刷题 · 错题 · 收藏</div>
      </div>
    </div>`,e=w.error?`<div class="auth-error" role="alert">${h(w.error)}</div>`:"";if(w.step==="name")return`
      <div class="auth-screen">
        <div class="auth-card">
          ${t}
          <p class="auth-hint">输入一个用户名即可开始，数据保存在你自己的账号下。</p>
          <form class="stack" data-form="name">
            <label class="field">
              <span class="field-label">用户名</span>
              <input class="input" name="username" autocomplete="username" enterkeyhint="go"
                     placeholder="比如 alice" maxlength="32" value="${h(w.username)}" required>
            </label>
            ${e}
            <button class="btn btn-primary btn-block btn-lg" type="submit" ${w.busy?"disabled":""}>
              ${w.busy?"检查中…":"继续"}
            </button>
          </form>
          <p class="auth-foot">第一次使用会自动创建账号并设置密码。</p>
        </div>
      </div>`;const n=w.step==="create";return`
    <div class="auth-screen">
      <div class="auth-card">
        ${t}
        <p class="auth-hint">${n?"为":"欢迎回来，"} <strong>${h(w.username)}</strong>${n?" 设置一个密码":""}</p>
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
          <button class="btn btn-primary btn-block btn-lg" type="submit" ${w.busy?"disabled":""}>
            ${w.busy?"请稍候…":n?"创建并进入":"登录"}
          </button>
          <button class="btn btn-ghost btn-block" type="button" data-act="back" ${w.busy?"disabled":""}>换个账号</button>
        </form>
      </div>
    </div>`}async function Ze(t,e){if(t==="back")return w.step="name",w.error="",!0;if(t==="submit"){const n=e,a=new FormData(n);if(w.step==="name"){const r=String(a.get("username")??"").trim();if(!/^[\w\u4e00-\u9fa5.@-]{2,32}$/.test(r))return w.error="用户名需 2–32 位，可用中英文、数字、. _ - @",!0;w.busy=!0,w.error="";try{const{hasPassword:o}=await j.auth.check(r);w.username=r,w.step=o?"password":"create"}catch(o){w.error=o instanceof L?o.message:"网络异常，请重试"}finally{w.busy=!1}return!0}if(w.busy)return!0;const s=String(a.get("password")??"");if(w.step==="create"){const r=String(a.get("confirm")??"");if(s!==r)return w.error="两次输入的密码不一致",!0}if(s.length<6)return w.error="密码至少 6 位",!0;w.busy=!0,w.error="";try{w.step==="create"?await Zn(w.username,s):await Yn(w.username,s),m.ok(w.step==="create"?"账号已创建，开始刷题吧":`欢迎回来，${f.user}`),sa()}catch(r){w.error=r instanceof L?r.message:"登录失败，请重试"}finally{w.busy=!1}return!0}return!1}function oa(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function tn(t,e){const n=e.trim();if(!n)return t;const a=new RegExp(oa(n),"gi");return t.replace(/<[^>]+>|[^<]+/g,s=>s.startsWith("<")?s:s.replace(a,r=>`<mark class="hl">${r}</mark>`))}const yt={single:"单选",multi:"多选",judge:"判断",blank:"填空",essay:"简答"};function st(t){const e=t.opts??[],n=String(t.q??"");if(!e.length)return/_{2,}|（\s*）|\(\s*\)|【\s*】/.test(n)?"blank":"essay";if(e.length===2){const a=e.map(s=>s.replace(/^[A-Za-z][.、)）]\s*/,"").trim()).join("|");if(/^(正确|对|是|√|True)|\|(错误|错|否|×|False)$/i.test(a)||/正确\|错误|对\|错/.test(a))return"judge"}return Array.isArray(t.a)?"multi":"single"}let D=null,mt=0;function en(){return D&&document.body.contains(D)||(D=document.createElement("div"),D.className="modal-root",D.setAttribute("role","dialog"),D.setAttribute("aria-modal","true"),document.body.appendChild(D)),D}function ia(){mt+=1,document.body.classList.add("is-locked")}function ca(){mt=Math.max(0,mt-1),mt===0&&document.body.classList.remove("is-locked")}function de(){en().innerHTML="",mt=0,document.body.classList.remove("is-locked")}function N(t){const e=en(),n=t.dismissible!==!1;return new Promise(a=>{let s=!1;const r=u=>{s||(s=!0,p(),o.classList.remove("open"),window.setTimeout(()=>{o.remove(),ca()},200),a(u))},o=document.createElement("div");o.className="modal-layer",o.style.position="absolute",o.style.inset="0",o.style.display="grid",o.style.placeItems="center",o.style.padding="var(--space-4)",o.innerHTML=`
      <div class="modal-overlay" data-close></div>
      <div class="modal-card" role="document">
        ${n?'<button class="icon-btn modal-close" data-close aria-label="关闭">✕</button>':""}
        ${t.title?`<h2 class="modal-title">${h(t.title)}</h2>`:""}
        ${t.description?`<p class="modal-desc">${h(t.description)}</p>`:""}
        <div class="modal-body"></div>
        ${t.actions?.length?`<div class="modal-actions">${t.actions.map((u,b)=>`<button class="btn btn-${u.variant??"ghost"}" data-idx="${b}">${h(u.label)}</button>`).join("")}</div>`:""}
      </div>`;const i=o.querySelector(".modal-card"),l=i.querySelector(".modal-body");typeof t.body=="string"?l.innerHTML=t.body:t.body&&l.appendChild(t.body);const c=u=>{u.key==="Escape"&&n&&(u.stopPropagation(),r(null))},d=u=>{const b=u.target;if(b.closest("[data-close]")&&n){r(null);return}const $=b.closest("[data-idx]");if(!$)return;const E=t.actions?.[Number($.dataset.idx)];E&&(E.keepOpen||r(E.value))},p=()=>{document.removeEventListener("keydown",c,!0),o.removeEventListener("click",d),D&&D.children.length===0&&D.classList.remove("open")};o.addEventListener("click",d),document.addEventListener("keydown",c,!0),e.appendChild(o),e.classList.add("open"),ia(),t.onMount?.(i),requestAnimationFrame(()=>{o.classList.add("open");const u=i.querySelector("input, textarea, button.btn-primary, button");u&&window.matchMedia("(pointer: fine)").matches&&u.focus({preventScroll:!0})})})}function Nt(t){return N({title:t.title??"确认",description:t.message,actions:[{label:t.cancelText??"取消",value:!1},{label:t.okText??"确定",value:!0,variant:t.danger?"danger":"primary"}]}).then(e=>e===!0)}function la(t,e=1400,n=.82){return new Promise((a,s)=>{const r=URL.createObjectURL(t),o=new Image;o.onload=()=>{URL.revokeObjectURL(r);const i=Math.min(1,e/Math.max(o.width,o.height)),l=document.createElement("canvas");l.width=Math.max(1,Math.round(o.width*i)),l.height=Math.max(1,Math.round(o.height*i));const c=l.getContext("2d");if(!c){s(new Error("canvas 不可用"));return}c.fillStyle="#fff",c.fillRect(0,0,l.width,l.height),c.drawImage(o,0,0,l.width,l.height),a(l.toDataURL("image/jpeg",n))},o.onerror=()=>{URL.revokeObjectURL(r),s(new Error("图片解码失败"))},o.src=r})}const da=new Set(["B","STRONG","I","EM","U","SUB","SUP","BR","P","DIV","SPAN","IMG","CODE"]);function At(t){const n=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html").body.firstElementChild;if(!n)return"";const a=s=>{if(s.nodeType===Node.TEXT_NODE)return(s.textContent??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");if(s.nodeType!==Node.ELEMENT_NODE)return"";const r=s,o=r.tagName,i=Array.from(r.childNodes).map(a).join("");if(!da.has(o))return i;if(o==="IMG"){const c=r.getAttribute("src")??"";if(!/^(https?:|data:image\/|blob:|\/)/i.test(c))return"";const d=(r.getAttribute("alt")??"").replace(/"/g,"&quot;");return`<img src="${c.replace(/"/g,"&quot;")}" alt="${d}">`}if(o==="BR")return"<br>";const l=o.toLowerCase();return l==="div"||l==="p"?i.trim()?`${i}<br>`:"<br>":`<${l}>${i}</${l}>`};return Array.from(n.childNodes).map(a).join("").replace(/(<br>)+$/g,"").trim()}const ua=[{cmd:"bold",label:"B",title:"加粗（Ctrl/⌘+B）"},{cmd:"italic",label:"I",title:"斜体（Ctrl/⌘+I）"},{cmd:"underline",label:"U",title:"下划线（Ctrl/⌘+U）"},{cmd:"superscript",label:"x²",title:"上标"},{cmd:"subscript",label:"x₂",title:"下标"},{cmd:"insertUnorderedList",label:"≡",title:"列表"}];function pa(t={}){const e=document.createElement("div");e.className="rt";const n=document.createElement("div");n.className="rt-bar";const a=document.createElement("div");a.className="rt-area",a.contentEditable="true",a.spellcheck=!1,a.dataset.role="rich",a.style.minHeight=`${t.minHeight??96}px`,t.placeholder&&(a.dataset.placeholder=t.placeholder),a.innerHTML=At(t.value??"");const s=(o,i)=>{a.focus(),document.execCommand(o,!1,i),r()};if(t.toolbar!==!1){for(const d of ua){const p=document.createElement("button");p.type="button",p.className="rt-btn",p.title=d.title,p.textContent=d.label,p.addEventListener("mousedown",u=>u.preventDefault()),p.addEventListener("click",()=>s(d.cmd,d.arg)),n.appendChild(p)}const o=document.createElement("span");o.className="rt-sep",n.appendChild(o);const i=document.createElement("button");i.type="button",i.className="rt-btn",i.textContent="∑",i.title="公式：选中内容包成 $…$",i.addEventListener("mousedown",d=>d.preventDefault()),i.addEventListener("click",()=>{const d=window.getSelection()?.toString()??"";if(d){s("insertText",`$${d}$`);return}s("insertText","$$");const p=window.getSelection();if(p&&p.rangeCount){const u=p.getRangeAt(0);typeof p.modify=="function"?p.modify("move","backward","character"):u.startContainer.nodeType===Node.TEXT_NODE&&(u.setStart(u.startContainer,Math.max(0,u.startOffset-1)),u.collapse(!0),p.removeAllRanges(),p.addRange(u))}}),n.appendChild(i);const l=document.createElement("button");l.type="button",l.className="rt-btn",l.textContent="▣",l.title="插入图片（自动压缩）",l.addEventListener("mousedown",d=>d.preventDefault()),l.addEventListener("click",()=>{const d=document.createElement("input");d.type="file",d.accept="image/*",d.onchange=async()=>{const p=d.files?.[0];if(p)try{l.textContent="…";const u=await la(p);a.focus(),document.execCommand("insertHTML",!1,`<img src="${u}" alt="题图"><br>`),r(),m.ok(`图片已插入（${Math.round(u.length*.75/1024)} KB）`)}catch{m.error("图片读取失败，换一张试试")}finally{l.textContent="▣"}},d.click()}),n.appendChild(l);const c=document.createElement("button");c.type="button",c.className="rt-btn rt-clear",c.textContent="⌫",c.title="清除格式",c.addEventListener("mousedown",d=>d.preventDefault()),c.addEventListener("click",()=>s("removeFormat")),n.appendChild(c)}function r(){const o=(a.textContent??"").trim().length>0,i=!!a.querySelector("img");a.classList.toggle("is-empty",!o&&!i)}return a.addEventListener("input",r),a.addEventListener("blur",r),a.addEventListener("paste",o=>{const i=o.clipboardData?.getData("text/html");i&&(o.preventDefault(),document.execCommand("insertHTML",!1,At(i)))}),r(),e.append(n,a),{el:e,getValue:()=>At(a.innerHTML),setValue:o=>{a.innerHTML=At(o),r()},focus:()=>a.focus()}}function Ae(t){const e=t.name.toLowerCase(),n=t.type.toLowerCase();return n.startsWith("image/")||/\.(png|jpe?g|webp|gif|bmp|heic)$/.test(e)?"image":e.endsWith(".docx")?"docx":e.endsWith(".json")?"json":/\.(txt|md|csv|text)$/.test(e)||n.startsWith("text/")?"text":"unknown"}function it(t){return String(t??"").replace(/\r\n?/g,`
`).trim()}function nn(t,e){if(Array.isArray(t)){const o=t.map(i=>typeof i=="number"?i:fa(String(i),e.length)).filter(i=>i!==null);return o.length?o.length===1?o[0]:[...new Set(o)].sort((i,l)=>i-l):t.map(String).join("、")}if(typeof t=="number"&&Number.isFinite(t))return t;const n=it(t);if(!n)return"";const s=(/^[A-Ha-h][\s,，、/;；]*[A-Ha-h\s,，、/;；]*$/.test(n)?n:"")||(/^选?[A-Ha-h][\s,，、/]*[A-Ha-h]?$/.test(n)?n:"");if(s){const o=[...new Set(s.toUpperCase().split("").map(i=>i.charCodeAt(0)-65))].filter(i=>i>=0&&i<e.length);if(o.length)return o.length===1?o[0]:o.sort((i,l)=>i-l)}const r=/^([A-Ha-h])\s*[.、．)）:：]?\s*(.+)$/.exec(n);if(r&&e.length){const o=r[1].charCodeAt(0)-65;if(o>=0&&o<e.length){const i=r[2].trim();return e.findIndex(c=>c.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()===i)>=0||i,o}}return n}function fa(t,e){const n=t.trim().toUpperCase();if(!/^[A-H]$/.test(n))return null;const a=n.charCodeAt(0)-65;return a<e?a:null}function ma(t){const e=it(t.q??t.question??t.title??t.题目??t.题干);if(!e)return null;const n=t.opts??t.options??t.choices??t.选项;let a=[];Array.isArray(n)?a=n.map(o=>it(o)).filter(Boolean):typeof n=="string"&&(a=ya(n));const s=t.a??t.answer??t.correct??t.答案??t.正确答案,r=a.length?nn(s,a):it(s);return{q:e,opts:a,a:r,chapter:it(t.chapter??t.章节??t.知识点),subject:it(t.subject??t.科目??t.题库)||"默认题库"}}function an(t){const e=t.replace(/^\uFEFF/,"").trim(),n=/```(?:json)?([\s\S]*?)```/i.exec(e)?.[1]??e,a=n.indexOf("["),s=n.indexOf("{"),r=a>=0&&(s<0||a<s)?a:s;if(r<0)return[];const o=Math.max(n.lastIndexOf("]"),n.lastIndexOf("}"));if(o<=r)return[];let i;try{i=JSON.parse(n.slice(r,o+1))}catch{return[]}return(Array.isArray(i)?i:Array.isArray(i?.questions)?i.questions:Array.isArray(i?.data)?i.data:[]).filter(c=>!!c&&typeof c=="object").map(ma).filter(c=>!!c)}const ga=/^\s*([A-Ha-h])\s*[.、．)）:：]\s*(.+?)\s*$/,ha=/^\s*(?:正确)?(?:参考)?答案\s*[:：]?\s*(.*)$/,ba=/^\s*(?:章节|知识点|科目|题库|分类|解析)\s*[:：]\s*(.*)$/,va=/^\s*(?:第\s*)?(\d{1,3})\s*(?:题)?\s*[.、．)）]\s*(.*)$/;function ya(t){return t.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").split(/\s*[A-Ha-h]\s*[.、．)）:：]\s*/).map(n=>n.trim()).filter(Boolean)}function wa(t){const e=[...t.matchAll(/(?:^|\s)([A-Ha-h])\s*[.、．)）:：]/g)];return e.length<2?[]:e.map((n,a)=>{const s=(n.index??0)+n[0].length,r=a+1<e.length?e[a+1].index??t.length:t.length;return t.slice(s,r).trim()})}function $a(t){const n=t.replace(/^\uFEFF/,"").replace(/\r\n?/g,`
`).replace(/!\[[^\]]*\]\((data:image\/[^)]+)\)/g,(d,p)=>`<img src="${p}" alt="题图">`).split(`
`),a=[];let s="",r=[],o="",i="",l="";const c=()=>{const d=s.trim();if(!d){s="",r=[],o="";return}if(!r.length&&!o.trim()&&d.length<=24){s="",r=[],o="";return}const p=r.map(b=>b.replace(/^\s*[A-Ha-h]\s*[.、．)）:：]\s*/,"").trim()),u=p.length?nn(o,p):o.trim();a.push({q:d,opts:p,a:u,chapter:i,subject:l||"默认题库"}),s="",r=[],o="",i="",l=""};for(const d of n){if(!d.trim())continue;if(/^\s*<img\b/i.test(d)){s=`${s}${s?`
`:""}${d.trim()}`;continue}const p=va.exec(d),u=ga.exec(d),b=ha.exec(d),$=ba.exec(d);if(p&&!u){c();const E=wa(p[2]);E.length>=2?(s=p[2].split(/(?:^|\s)[A-Ha-h]\s*[.、．)）:：]/)[0].trim(),r=E):s=p[2].trim();continue}if(u&&s){r.push(u[2].trim());continue}if(b&&(s||r.length)){o=b[1].trim();continue}if($){const E=$[0].trim(),v=$[1].trim();/章节|知识点/.test(E)?i=v:/科目|题库|分类/.test(E)&&(l=v);continue}s?r.length?r[r.length-1]=`${r[r.length-1]} ${d.trim()}`.trim():s=`${s} ${d.trim()}`.trim():s=d.replace(/^\s*(?:题目|题干)\s*[:：]\s*/,"").trim()}return c(),a.filter(d=>d.q.length>1)}function jt(t){const e=t.trim();if(!e)return[];if(/^[[{]/.test(e)||/```(?:json)?/i.test(e)||/"(q|question|题目)"\s*:/.test(e)){const n=an(e);if(n.length)return n}return $a(e)}function Ee(t){const e=Sn(new Uint8Array(t)),n=e["word/document.xml"];if(!n)throw new Error("这个 docx 里没有正文，另存为 .docx 再试一次");const a=e["word/_rels/document.xml.rels"],s=new Map;if(a){const i=ye(a);for(const l of i.matchAll(/<Relationship\b[^>]*>/g)){const c=l[0],d=/\bId="([^"]+)"/.exec(c)?.[1],p=/\bTarget="([^"]+)"/.exec(c)?.[1],u=/\bType="([^"]+)"/.exec(c)?.[1]??"";if(!d||!p||!/image/i.test(u))continue;const b=p.startsWith("/")?p.slice(1):`word/${p.replace(/^\.\//,"")}`,$=e[b];$&&s.set(d,`data:${xa(b)};base64,${ka($)}`)}}return ye(n).replace(/<a:blip\b[^>]*r:embed="([^"]+)"[^>]*\/?>/g,(i,l)=>{const c=s.get(l);return c?`[[IMG:${c}]]`:""}).replace(/<w:tab\b[^>]*\/>/g,"	").replace(/<w:br\b[^>]*\/>/g,`
`).replace(/<\/w:p>/g,`
`).replace(/<[^>]+>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/\[\[IMG:([^\]]+)\]\]/g,(i,l)=>`
![docx 图片](${l})
`).replace(/\n{3,}/g,`

`).trim()}function xa(t){const e=t.split(".").pop()?.toLowerCase()??"";return e==="jpg"||e==="jpeg"?"image/jpeg":e==="gif"?"image/gif":e==="bmp"?"image/bmp":e==="webp"?"image/webp":e==="svg"?"image/svg+xml":"image/png"}function ka(t){let e="";for(let a=0;a<t.length;a+=32768)e+=String.fromCharCode(...t.subarray(a,a+32768));return btoa(e)}function Le(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("文件读取失败")),a.readAsText(t,"utf-8")})}function je(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(a.result),a.onerror=()=>n(new Error("文件读取失败")),a.readAsArrayBuffer(t)})}function Te(t){return new Promise((e,n)=>{const a=new FileReader;a.onload=()=>e(String(a.result??"")),a.onerror=()=>n(new Error("图片读取失败")),a.readAsDataURL(t)})}function Sa(t,e){if(!t.length)return'<p class="muted small">还没解析出题目。可以继续编辑上面的文本，或点「AI 解析」让我读一遍。</p>';const n=t.slice(0,4),a=n.map((o,i)=>{const l=(o.opts??[]).length,c=Ce(o),d=(o.q.match(/<img\b/gi)??[]).length,p=o.q.replace(/<img\b[^>]*>/gi," ").replace(/\s+/g," ").trim();return`<li><b>${i+1}.</b> ${h(p).slice(0,90)}${d?`<span class="muted"> · 含 ${d} 张图</span>`:""}${l?`<span class="muted"> · ${l} 个选项</span>`:'<span class="muted"> · 简答</span>'}${c?`<span class="tag-warn">${c}</span>`:""}</li>`}).join(""),s=t.length>n.length?`<li class="muted">…还有 ${t.length-n.length} 道</li>`:"",r=t.map(Ce).filter(Boolean).length;return`
    <div class="import-summary">
      <span class="tag tag-ok">识别到 ${t.length} 道题</span>
      ${r?`<span class="tag tag-warn">${r} 道待确认</span>`:""}
      ${e?`<span class="muted small">${h(e)}</span>`:""}
    </div>
    <ul class="import-list">${a}${s}</ul>`}function Ce(t){const e=(t.opts??[]).length,n=t.a;return(Array.isArray(n)?n.length>0:n!==""&&n!==null&&n!==void 0)?e===1?"只有 1 个选项":e>=2&&typeof n=="number"&&(n<0||n>=e)?"答案越界":"":"没识别到答案"}function Ht(t,e){return t==="json"?an(e):jt(e)}async function Aa(){const t=document.createElement("div");t.className="import",t.innerHTML=`
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
    <div class="import-preview" data-role="preview"></div>`;const e=t.querySelector('[data-role="drop"]'),n=t.querySelector('[data-role="file"]'),a=t.querySelector('[data-role="text"]'),s=t.querySelector('[data-role="preview"]');let r=[],o="",i="",l=!1;const c=()=>{s.innerHTML=Sa(r,i||(o?"图片将由 AI 识别":""));const v=document.querySelector('[data-idx="1"]');v&&(v.textContent=r.length?`导入 ${r.length} 道题`:"AI 解析并导入")},d=(v,y,S)=>{a.value=v,r=Ht(y,v),i=S,c()},p=async()=>{const v=a.value.trim();if(!v&&!o)return[];m.info(o?"AI 正在识别图片…":"AI 正在解析文字…");const y=await j.ai.extract({...v?{prompt:v}:{},...o?{imageBase64:o}:{}});return jt(y.result??"")},u=async v=>{const y=Ae(v);try{if(y==="image"){o=await Te(v),r=[],i=`${v.name}（${Math.round(v.size/1024)}KB，AI 识别）`,c();try{r=await p(),r.length||m.error("这张图没读出题目，换张更清晰的试试")}catch(k){m.error(k instanceof L?k.message:"AI 识别失败")}c();return}if(y==="docx"){const k=await je(v);d(Ee(k),"docx",v.name);return}if(y==="unknown"){m.error("暂不支持这种文件，换成 txt / json / docx / 图片试试");return}const S=await Le(v);d(S,y,v.name)}catch(S){m.error(S instanceof Error?S.message:"文件解析失败")}},b=async v=>{if(!v.length)return;if(v.length===1){await u(v[0]);return}const y=[],S=[];for(const k of v)try{const T=Ae(k);if(T==="image"){const wt=await Te(k),ot=await j.ai.extract({imageBase64:wt});y.push(...jt(ot.result??"")),S.push(k.name);continue}if(T==="docx"){y.push(...Ht("docx",Ee(await je(k)))),S.push(k.name);continue}y.push(...Ht(T,await Le(k))),S.push(k.name)}catch(T){m.error(`${k.name} 没读出来：${T instanceof Error?T.message:"格式不对"}`)}r=y,o="",i=`${v.length} 个文件（${S.join("、")}）`,a.value="",c()};n.addEventListener("change",()=>{b([...n.files??[]])});for(const v of["dragenter","dragover"])e.addEventListener(v,y=>{y.preventDefault(),e.classList.add("is-over")});for(const v of["dragleave","drop"])e.addEventListener(v,y=>{y.preventDefault(),e.classList.remove("is-over")});e.addEventListener("drop",v=>{const y=[...v.dataTransfer?.files??[]];b(y)}),a.addEventListener("paste",v=>{const S=[...v.clipboardData?.items??[]].find(T=>T.kind==="file"&&T.type.startsWith("image/"));if(!S)return;const k=S.getAsFile();k&&(v.preventDefault(),u(k))});let $=0;if(a.addEventListener("input",()=>{window.clearTimeout($),$=window.setTimeout(()=>{r=jt(a.value),o="",i="",c()},280)}),!(!await N({title:"导入题库",body:t,actions:[{label:"取消",value:!1},{label:"导入",value:!0,variant:"primary"}],onMount:()=>c()})||l))try{const v=r.length?r:await p();if(!v.length){m.error("没解析出题目，检查一下格式，或换张更清晰的图");return}l=!0;const y=await j.questions.add(v);X("bank"),await nt(!0),m.ok(`已导入 ${y.added??v.length} 道题`)}catch(v){m.error(v instanceof L?v.message:"导入失败")}}const Ea=`
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
`;function ut(t){return String(t??"").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]??e)}function Me(t,e={}){if(!t.length){m.info("没有可导出的题目");return}const n=e.title||"练习试卷",a=new Date().toLocaleDateString("zh-CN"),s=e.answers!==!1,r=t.map((c,d)=>{const p=st(c),u=(c.opts??[]).map((b,$)=>{const E=b.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");return`<li><span class="k">${String.fromCharCode(65+$)}</span>${R(E)}</li>`}).join("");return`<article class="q">
        <div class="q-no">${String(d+1).padStart(2,"0")} · ${yt[p]}${c.chapter?` · ${ut(c.chapter)}`:""}</div>
        <div class="q-body">${R(c.q)}</div>
        ${u?`<ul class="q-opts">${u}</ul>`:'<p class="q-tag">（简答题，请在答题纸上作答）</p>'}
      </article>`}).join(""),o=s?`<section class="answer-key">
        <h2>参考答案</h2>
        <ol>${t.map((c,d)=>`<li><span class="k">${String(d+1).padStart(2,"0")}</span>${ut(W(c.a,c.opts??[]))}</li>`).join("")}</ol>
      </section>`:"",i=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${ut(n)} · ${a}</title>
<style>${Ea}</style></head>
<body>
  <header class="sheet-head">
    <div class="sheet-kicker">Origin Quiz / Practice Sheet</div>
    <h1 class="sheet-title">${ut(n)}</h1>
    <div class="sheet-meta">${a} · 共 ${t.length} 题${e.subtitle?" · "+ut(e.subtitle):""} · 姓名 __________ 得分 ______</div>
  </header>
  ${r}
  ${o}
  <p class="tips">由「原点 · Origin」导出 · 打印对话框里选择「另存为 PDF」即可保存。</p>
</body></html>`,l=window.open("","_blank");if(!l){m.error("浏览器拦住了新窗口，请允许弹出窗口后重试");return}l.document.open(),l.document.write(i),l.document.close(),l.focus(),m.ok(`已生成 ${t.length} 题的打印版，在打印里选「另存为 PDF」`)}const sn=914400,La=6.4*sn,ja=4.2*sn,Ta=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function rn(t,e={}){return`<w:r><w:rPr>${['<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="宋体"/>',e.bold?"<w:b/>":"",e.italic?"<w:i/>":"",`<w:sz w:val="${e.size??21}"/><w:szCs w:val="${e.size??21}"/>`,e.color?`<w:color w:val="${e.color}"/>`:""].join("")}</w:rPr><w:t xml:space="preserve">${Ta(t)}</w:t></w:r>`}function z(t,e={}){const n=e.before||e.after?`<w:spacing w:before="${e.before??0}" w:after="${e.after??0}"/>`:"",a=e.indent||e.hanging?`<w:ind w:left="${e.indent??0}" w:hanging="${e.hanging??0}"/>`:"";return`<w:p><w:pPr>${n}${a}</w:pPr>${t?rn(t,e):""}</w:p>`}function Ca(t,e,n,a){return`<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${Math.round(n)}" cy="${Math.round(a)}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${e}" name="Picture ${e}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${e}" name="image${e}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${t}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${Math.round(n)}" cy="${Math.round(a)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`}function Ma(t){return new Promise(e=>{const n=new Image;n.onload=()=>e({w:n.naturalWidth||640,h:n.naturalHeight||480}),n.onerror=()=>e(null),n.src=t})}function qa(t){const e=/^data:image\/([a-zA-Z+]+);base64,(.+)$/.exec(t);if(!e)return null;try{const n=atob(e[2]),a=new Uint8Array(n.length);for(let r=0;r<n.length;r+=1)a[r]=n.charCodeAt(r);const s=e[1].toLowerCase()==="jpeg"?"jpeg":e[1].toLowerCase();return{bytes:a,ext:s}}catch{return null}}function _a(t){const e=new DOMParser().parseFromString(`<div>${t}</div>`,"text/html"),n=[],a=s=>{if(s.nodeType===Node.TEXT_NODE){const o=s.textContent??"";o.trim()&&n.push({kind:"text",value:o.replace(/\s+/g," ")});return}if(s.nodeType!==Node.ELEMENT_NODE)return;const r=s;if(r.tagName==="IMG"){n.push({kind:"img",value:r.getAttribute("src")??""});return}if(r.tagName==="BR"){n.push({kind:"br",value:""});return}r.childNodes.forEach(a)};return e.body.firstElementChild?.childNodes.forEach(a),n}async function Na(t,e){const n=[],a=[];let s=0;n.push(z(e.title??"题库练习卷",{size:32,bold:!0,after:80}));const r=[e.subtitle??"",`${t.length} 题`,"姓名 ________","得分 ________"].filter(Boolean).join("　　");n.push(z(r,{size:18,color:"666666",after:200}));for(let u=0;u<t.length;u+=1){const b=t[u],$=st(b),E=String(u+1).padStart(2,"0");n.push(z(`${E}　${yt[$]}${b.chapter?"　·　"+b.chapter:""}`,{size:18,bold:!0,color:"1440FF",before:200,after:60}));const v=_a(b.q);let y="";const S=()=>{y.trim()&&n.push(z(y.trim(),{after:60})),y=""};for(const k of v)if(k.kind==="text")y+=k.value;else if(k.kind==="br")S();else{S();const T=qa(k.value);if(!T)continue;const ot=await Ma(k.value)??{w:640,h:480};let $t=ot.w*9525,xt=ot.h*9525;const he=Math.min(La/$t,ja/xt,1);$t*=he,xt*=he,s+=1;const be=`rId${100+s}`,wn=`image${s}.${T.ext}`;a.push({relId:be,name:wn,bytes:T.bytes,cx:$t,cy:xt,id:s}),n.push(Ca(be,s,$t,xt))}if(S(),Array.isArray(b.opts)&&b.opts.length)b.opts.forEach((k,T)=>{const wt=String.fromCharCode(65+T),ot=String(k).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,"");n.push(z(`${wt}. ${ot}`,{size:20,hanging:280,indent:280,after:20}))});else if($==="blank")n.push(z("答：________________________________",{after:40}));else if($==="essay"){for(let k=0;k<3;k+=1)n.push(z("　",{after:60}));n.push(z("（请在答题纸上作答）",{size:18,color:"999999",after:40}))}}e.withAnswers!==!1&&(n.push(`<w:p><w:pPr><w:pageBreakBefore/></w:pPr>${rn("参考答案",{size:28,bold:!0})}</w:p>`),t.forEach((u,b)=>{const $=String(b+1).padStart(2,"0");n.push(z(`${$}　${W(u.a,u.opts)||"（无）"}`,{size:20,after:40}))}));const o=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>${n.join("")}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="851" w:footer="992" w:gutter="0"/></w:sectPr></w:body></w:document>`,i='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',l='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',c='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+a.map(u=>`<Relationship Id="${u.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${u.name}"/>`).join("")+"</Relationships>",d={"[Content_Types].xml":kt(i),"_rels/.rels":kt(l),"word/document.xml":kt(o),"word/_rels/document.xml.rels":kt(c)};for(const u of a)d[`word/media/${u.name}`]=u.bytes;const p=An(d,{level:6});return new Blob([p],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})}async function qe(t,e={}){if(!t.length){m.error("没有可导出的题目");return}try{const n=await Na(t,e),a=URL.createObjectURL(n),s=document.createElement("a"),r=new Date().toISOString().slice(0,10);s.href=a,s.download=`${(e.title??"题库试卷").replace(/[\\/:*?"<>|]/g,"-")}-${r}.docx`,document.body.appendChild(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(a),4e3),m.ok(`已导出 ${t.length} 题的 Word 文档`)}catch(n){m.error(n instanceof Error?`导出失败：${n.message}`:"导出失败")}}function Ia(t){const e=t.replace(/```json/gi,"```").trim(),n=/```([\s\S]*?)```/.exec(e)?.[1]??e,a=n.indexOf("{"),s=n.lastIndexOf("}");return a===-1||s<=a?"{}":n.slice(a,s+1)}const Q=20,g={search:"",subject:"all",type:"all",edit:!1,page:0,selected:new Set};function on(){g.search="",g.subject="all",g.type="all",g.edit=!1,g.page=0,g.selected.clear()}function V(){return f.bank??[]}function Da(){return["all",...Array.from(new Set(V().map(t=>t.subject||"默认题库")))]}function Tt(){const t=g.search.trim().toLowerCase();return V().filter(e=>g.subject!=="all"&&(e.subject||"默认题库")!==g.subject||g.type!=="all"&&st(e)!==g.type?!1:t?M(e.q).toLowerCase().includes(t)||e.opts.some(n=>M(n).toLowerCase().includes(t)):!0)}function cn(t){return typeof t.a=="string"?"简答":(Array.isArray(t.a)?t.a:[t.a]).map(n=>String.fromCharCode(65+n)).join(" / ")}function Oa(){const t=Tt(),e=Math.max(1,Math.ceil(t.length/Q));g.page>e-1&&(g.page=e-1),g.page<0&&(g.page=0);const n=t.slice(g.page*Q,g.page*Q+Q),a=Da().map(c=>`<button class="chip" data-act="subject" data-subject="${h(c)}" aria-pressed="${g.subject===c}">
          ${c==="all"?"全部":h(c)}
        </button>`).join(""),s=V(),r={single:0,multi:0,judge:0,blank:0,essay:0};s.forEach(c=>{r[st(c)]+=1});const o=[["all","全部",s.length],["single","单选",r.single],["multi","多选",r.multi],["judge","判断",r.judge],["blank","填空",r.blank],["essay","简答",r.essay]].filter(([c,,d])=>c==="all"||d>0).map(([c,d,p])=>`<button class="chip" data-act="type" data-type="${c}" aria-pressed="${g.type===c}">${d} <span class="chip-n">${p}</span></button>`).join(""),i=n.map((c,d)=>{const p=st(c),u=String(g.page*Q+d+1).padStart(2,"0");return`<tr class="q-row ${g.edit?"selectable":"is-clickable"}" data-id="${c.id}" ${g.edit?"":'data-act="peek"'}>
        <td class="c-no">${g.edit?`<button class="checkbox" data-act="select" data-id="${c.id}" aria-pressed="${g.selected.has(c.id)}">✓</button>`:u}</td>
        <td class="c-q">
          <div class="q-cell">${tn(R(c.q),g.search)}</div>
          ${c.opts.length?`<div class="q-sub">${c.opts.length} 个选项</div>`:""}
        </td>
        <td class="c-type"><span class="tag tag-type">${yt[p]}</span></td>
        <td class="c-chapter muted">${h(c.chapter||"—")}</td>
        <td class="c-ans"><span class="tag tag-ok">${h(cn(c))}</span></td>
        <td class="c-act"><button class="icon-btn sm" data-act="edit" data-id="${c.id}" aria-label="编辑">✎</button></td>
      </tr>`}).join(""),l=f.loading.bank&&!f.bank?`<div class="list">${Array.from({length:5}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div></div>').join("")}</div>`:t.length?`<div class="table-wrap">
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
      <button class="tool-btn" data-act="add" title="添加题目">＋<span>新建</span></button>
      <button class="tool-btn" data-act="print" title="导出试卷（打印 / 存 PDF）">⎙<span>试卷</span></button>
      <button class="tool-btn" data-act="docx" title="导出 Word（.docx）">⤓<span>Word</span></button>
      <button class="tool-btn" data-act="toggle-edit" title="批量管理">${g.edit?"✓":"☰"}<span>批量</span></button>
    </div>
    <div class="chips">${a}</div>
    <div class="chips chips-type">${o}</div>
    ${g.edit?`<div class="row between" style="margin-bottom:12px">
        <button class="btn btn-sm btn-ghost" data-act="select-all">${g.selected.size===t.length&&t.length?"取消全选":"全选本页"}</button>
        <div class="btn-row" style="gap:8px">
          <button class="btn btn-sm" data-act="export" ${g.selected.size?"":"disabled"}>导出 JSON</button>
          <button class="btn btn-sm" data-act="print-selected" ${g.selected.size?"":"disabled"}>导出试卷</button>
          <button class="btn btn-sm" data-act="docx-selected" ${g.selected.size?"":"disabled"}>导出 Word</button>
          <button class="btn btn-sm btn-danger" data-act="delete-selected" ${g.selected.size?"":"disabled"}>删除</button>
        </div>
      </div>`:""}
    ${l}`}async function Yt(t){const e=!t,n={editor:null},a=document.createElement("div");if(a.innerHTML=`
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
      <input class="input" data-role="a" value="${h(t?cn(t):"")}" placeholder="A">
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
    </div>`,!await N({title:e?"添加题目":"编辑题目",body:a,actions:[{label:"取消",value:!1},{label:e?"添加":"保存",value:!0,variant:"primary"}],onMount:p=>{const u=p.querySelector('[data-role="q-host"]');u&&(n.editor=pa({value:t?.q??"",placeholder:"输入题干；可用工具栏插图、写公式（$…$）",minHeight:110}),u.appendChild(n.editor.el));const b=p.querySelector('[data-role="classify"]');b&&b.addEventListener("click",async()=>{const $=M(n.editor?.getValue()??"").trim();if(!$){m.error("先写题干，AI 才能判断归类");return}const E=p.querySelector('[data-role="opts"]')?.value??"",v=b.textContent??"";b.disabled=!0,b.textContent="归类中…";try{const y=await j.ai.classify(`题目：${$}
选项：${E.split(`
`).join("；")}`),S=JSON.parse(Ia(y.result??"{}")),k=p.querySelector('[data-role="subject"]'),T=p.querySelector('[data-role="chapter"]');S.subject&&k&&(k.value=String(S.subject).slice(0,24)),S.chapter&&T&&(T.value=String(S.chapter).slice(0,24)),m.ok("已根据题目填入题库与章节")}catch{m.error("AI 归类失败，可手动填写")}finally{b.disabled=!1,b.textContent=v}})}}))return;const r=p=>a.querySelector(`[data-role="${p}"]`).value,o=(n.editor?.getValue()??"").trim();if(!M(o).trim()&&!/<img/i.test(o)){m.error("题干不能为空");return}const i=r("opts").split(`
`).map(p=>p.replace(/^[A-Za-z][.、)]\s*/,"").trim()).filter(Boolean),l=r("a").trim();let c="";if(i.length){const u=l.toUpperCase().split(/[,，\s/]+/).filter(Boolean).map(b=>b.charCodeAt(0)-65).filter(b=>b>=0&&b<i.length);if(!u.length){m.error("答案请填选项字母，如 A 或 A,B");return}c=u.length===1?u[0]:u}else c=l;const d={q:o,opts:i,a:c,chapter:r("chapter").trim(),subject:r("subject").trim()||"默认题库"};try{e?await j.questions.add([d]):await j.questions.update(t.id,d),X("bank"),await nt(!0),m.ok(e?"题目已添加":"题目已保存")}catch(p){m.error(p instanceof L?p.message:"保存失败")}}async function Ra(){await Aa()}function Pa(){const t=V().filter(s=>g.selected.has(s.id));if(!t.length){m.info("先选择要导出的题目");return}const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),a=document.createElement("a");a.href=n,a.download=`题库-${t.length}题.json`,a.click(),URL.revokeObjectURL(n),m.ok(`已导出 ${t.length} 题`)}async function Ha(){await nt()}async function za(t,e){switch(t){case"subject":return g.subject=e.dataset.subject??"all",!0;case"toggle-edit":return g.edit=!g.edit,g.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return g.selected.has(n)?g.selected.delete(n):g.selected.add(n),!0}case"add":return await Yt(),!0;case"edit":{const n=V().find(a=>a.id===Number(e.dataset.id));return n&&await Yt(n),!0}case"delete-selected":{const n=[...g.selected];if(!n.length||!await Nt({title:"删除题目",message:`确定删除选中的 ${n.length} 道题？`,danger:!0,okText:"删除"}))return!0;try{await j.questions.remove(n),g.selected.clear(),X("bank"),await nt(!0),m.ok("已删除")}catch(a){m.error(a instanceof L?a.message:"删除失败")}return!0}case"export":return Pa(),!0;case"print":return Me(Tt(),{title:`题库 · ${g.subject==="all"?"全部":g.subject}`}),!0;case"docx":return await qe(Tt(),{title:`题库 · ${g.subject==="all"?"全部":g.subject}`,subtitle:"原点 · Origin"}),!0;case"docx-selected":return await qe(V().filter(n=>g.selected.has(n.id)),{title:"选中题目 · 试卷",subtitle:"原点 · Origin"}),!0;case"print-selected":return Me(V().filter(n=>g.selected.has(n.id)),{title:"选中题目 · 试卷"}),!0;case"page-prev":return g.page=Math.max(0,g.page-1),!0;case"page-next":return g.page+=1,!0;case"select-all":{const n=Tt().slice(g.page*Q,g.page*Q+Q),a=n.every(s=>g.selected.has(s.id));return n.forEach(s=>a?g.selected.delete(s.id):g.selected.add(s.id)),!0}case"import":return await Ra(),!0;case"type":{const n=e.dataset.type;return n&&(g.type=n,g.page=0),!0}case"peek":{const n=Number(e.dataset.id),a=V().find(s=>s.id===n);return a&&await Ba(a),!0}case"search":return!0;default:return!1}}async function Ba(t){const e=st(t),n=document.createElement("div");n.className="peek",n.innerHTML=`
    <div class="peek-meta">
      <span class="tag tag-type">${yt[e]}</span>
      ${t.subject?`<span class="tag">${h(t.subject)}</span>`:""}
      ${t.chapter?`<span class="tag">${h(t.chapter)}</span>`:""}
    </div>
    <div class="peek-q q-text">${R(t.q)}</div>
    ${t.opts.length?`<ul class="peek-opts">${t.opts.map((s,r)=>`<li class="${(Array.isArray(t.a)?t.a.includes(r):t.a===r)?"is-hit":""}"><b>${String.fromCharCode(65+r)}</b>${R(String(s).replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</li>`).join("")}</ul>`:""}
    <div class="peek-ans"><span class="muted">答案</span> ${h(W(t.a,t.opts)||"（无）")}</div>`,await N({title:"题目预览",body:n,actions:[{label:"关闭",value:"close"},{label:"编辑这题",value:"edit",variant:"primary"}]})==="edit"&&await Yt(t)}function Ua(t){return t.dataset.role==="search"?(g.search=t.value,g.page=0,!0):!1}const Fa="modulepreload",Wa=function(t){return"/"+t},_e={},Ka=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let o=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=i?.nonce||i?.getAttribute("nonce");s=o(n.map(c=>{if(c=Wa(c),c in _e)return;_e[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":Fa,d||(u.as="script"),u.crossOrigin="",u.href=c,l&&u.setAttribute("nonce",l),document.head.appendChild(u),d)return new Promise((b,$)=>{u.addEventListener("load",b),u.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return s.then(o=>{for(const i of o||[])i.status==="rejected"&&r(i.reason);return e().catch(r)})};function ln(t){return new Promise(e=>window.setTimeout(e,t))}function Ga(t,e,n=620,a="%"){const s=performance.now(),r=o=>{const i=Math.min((o-s)/n,1),l=1-Math.pow(1-i,3);t.innerHTML=`${Math.round(e*l)}<span>${a}</span>`,i<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}function Mt(t=12){_.vibration&&navigator.vibrate?.(t)}let x=null,gt=null;function lt(){return x?x.options.questions[x.idx]??null:null}function It(t){const e=x;let n=e.records.get(t.id);return n||(n={id:t.id,picked:[],text:"",correct:null,submitted:!1,time:Date.now()},e.records.set(t.id,n)),n}function dn(){const t=x;return t.options.questions.filter(e=>t.records.get(e.id)?.submitted).length}function Ja(){const t=x;return t.options.questions.filter(e=>t.records.get(e.id)?.correct===!0).length}function Qa(t,e){if(q(t.a))return`
      <div class="essay-box">
        <textarea class="textarea" data-role="essay" placeholder="写下你的答案，可以和标准答案比对着看…" ${e.submitted?"readonly":""}>${h(e.text)}</textarea>
      </div>`;const n=vt(t.a);return`<div class="opts" data-multi="${n.length>1}">${t.opts.map((s,r)=>{let o="";return e.submitted?n.includes(r)?o="correct":e.picked.includes(r)?o="wrong":o="muted":e.picked.includes(r)&&(o="picked"),`<button class="opt" data-act="pick" data-idx="${r}" data-state="${o}" ${e.submitted?"disabled":""}>
        <span class="opt-key">${String.fromCharCode(65+r)}</span>
        <span class="opt-text">${R(s.replace(/^\s*[A-Ha-h]\s*[.、．)：:]\s*/,""))}</span>
      </button>`}).join("")}</div>`}function Va(t,e){if(!e.submitted)return"";const n=q(t.a)?String(t.a):W(t.a,t.opts),a=q(t.a)?M(e.text)||"（空）":W(e.picked.length?e.picked:[],t.opts)||"（未选）";if(q(t.a)){const s=e.correct===null||e.correct===void 0?`<div class="essay-actions">
          <button class="btn btn-sm btn-primary" data-act="ai-grade" ${x?.busy?"disabled":""}>✦ AI 阅卷</button>
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
    正确答案：${h(W(t.a,t.opts))}
    ${e.correct?"":`<br>你的选择：${h(a)}`}
  </div>`}function Xa(){const t=x,e=lt();if(!e)return"";const n=It(e),a=t.options.questions.length,s=a?Math.round((t.idx+(n.submitted?1:0))/a*100):0,r=vt(e.a).length>1&&!q(e.a);return`
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
          <span>${r?"多选":q(e.a)?"简答":"单选"}</span>
        </div>
        <div class="q-text">${R(e.q)}</div>
        ${Qa(e,n)}
        ${Va(e,n)}
      </div>
    </div>
    <div class="floating-actions">
      <button class="fab" data-act="fav" data-on="${Ct(e.id)}" aria-label="收藏">${Ct(e.id)?"★":"☆"}</button>
      <button class="fab" data-act="note" data-on="${!!re()[String(e.id)]}" aria-label="笔记">✎</button>
      <button class="fab" data-act="ai" aria-label="AI 解析">✦</button>
    </div>
    <div class="quiz-foot">
      <button class="btn" data-act="prev" ${t.idx===0?"disabled":""}>上一题</button>
      ${n.submitted?`<button class="btn btn-primary grow" data-act="next">${t.idx===a-1?"完成本次":"下一题"}</button>`:`<button class="btn btn-primary grow" data-act="submit">${r||q(e.a)?"提交答案":"查看答案"}</button>`}
    </div>`}function Ya(t,e){x={options:e,idx:Math.min(Math.max(e.startIndex??0,0),Math.max(e.questions.length-1,0)),records:new Map,textDraft:"",busy:!1,root:t},O(),gt=n=>{const a=x;if(!a)return;const s=n.target,r=!!(s&&["input","textarea"].includes(s.tagName.toLowerCase()));if(n.key==="Escape"){if(document.querySelector(".modal-layer"))return;me();return}if(r)return;const o=lt();if(!o)return;const i=It(o);if(n.key===" "||n.key==="Enter"){const c=a.root?.querySelector('[data-act="submit"]'),d=a.root?.querySelector('[data-act="next"]');c?(n.preventDefault(),P("submit",c)):d&&(n.preventDefault(),P("next",d));return}if(n.key==="ArrowRight"){n.preventDefault(),i.submitted?pe():P("submit",a.root.querySelector('[data-act="submit"]'));return}if(n.key==="ArrowLeft"){n.preventDefault(),P("prev",a.root);return}const l=n.key.toLowerCase();if(/^[1-9]$/.test(l)||/^[a-h]$/.test(l)){const c=/^[1-9]$/.test(l)?Number(l)-1:l.charCodeAt(0)-97;if(c<o.opts.length){n.preventDefault();const d=a.root?.querySelector(`.opt[data-idx="${c}"]`);d&&P("pick",d)}return}l==="s"?P("fav",a.root):l==="n"?P("note",a.root):l==="e"?P("ai",a.root):l==="g"?P("ai-grade",a.root):l==="?"&&Ka(()=>Promise.resolve().then(()=>As),void 0).then(c=>c.openShortcuts())},document.addEventListener("keydown",gt),t.addEventListener("submit",n=>n.preventDefault()),t.addEventListener("input",un)}function O(){const t=x;t?.root&&(t.root.innerHTML=Xa())}function un(t){const e=t.target;e?.dataset.role!=="essay"||!x||(x.textDraft=e.value)}async function zt(t,e){const n=x;if(e.submitted=!0,q(t.a))e.correct=null;else if(e.correct=Cn(e.picked,t.a),e.correct){Mt(10);const a=Za();a>=3&&a%3===0&&m.ok(`连对 ${a} 题，保持住`)}else Mt([14,40,14]),ue(t,e);O(),e.correct&&n.options.questions.length>n.idx+1&&(await ln(600),x&&x.idx===n.idx&&pe())}function Za(){const t=x;let e=0;for(let n=t.idx;n>=0;n-=1){const a=t.records.get(t.options.questions[n].id);if(a?.submitted)if(a.correct===!0)e+=1;else break}return e}async function ue(t,e){try{await j.wrong.add({q:t.q,opts:t.opts,a:t.a,chapter:t.chapter,subject:t.subject,user_choice:e.picked})}catch(n){n instanceof L&&n.status!==401&&m.error(`错题保存失败：${n.message}`)}}function pe(){const t=x,e=t.options.questions.length;if(t.idx>=e-1){ts();return}t.idx+=1,t.textDraft="",O(),t.root?.querySelector(".quiz-body")?.scrollTo({top:0})}function fe(){gt&&document.removeEventListener("keydown",gt),gt=null,x?.root?.removeEventListener("input",un),x?.root?.replaceChildren(),x=null}async function me(){const t=x;if(!t)return;const e=dn();if(!await Nt({title:"结束本次练习？",message:e?`已作答 ${e} 题，退出后进度会保留。`:"还没有开始作答，确定要退出吗？",okText:"退出",cancelText:"继续答题",danger:!0}))return;lt()&&pn();const s=t.options.onExit;fe(),s?.()}function pn(){const t=x;if(!t)return;t.options.source==="sequential"&&zn(t.idx);const e=t.options.questions.slice(0,5).map(n=>M(n.q).slice(0,40));Un(e)}async function ts(){const t=x;pn();const e=t.options.questions.length,n=dn(),a=Ja(),s=n-a,r=n?Math.round(a/n*100):0;if(fe(),await N({title:"本次完成",body:`
      <div class="result-acc">
        <div class="result-acc-num" data-role="acc">0<span>%</span></div>
        <div class="result-acc-label">正确率</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><div class="result-stat-num ok">${a}</div><div class="result-stat-label">正确</div></div>
        <div class="result-stat"><div class="result-stat-num bad">${s}</div><div class="result-stat-label">错误</div></div>
        <div class="result-stat"><div class="result-stat-num">${n}</div><div class="result-stat-label">已作答</div></div>
      </div>
      <p class="muted small" style="margin:14px 0 0;text-align:center">共 ${e} 题</p>`,actions:[{label:"返回首页",value:"home"},{label:"再来一组",value:"retry",variant:"primary"}],onMount:i=>{const l=i.querySelector('[data-role="acc"]');l&&Ga(l,r)}})==="retry"){t.options.onExit?.();return}t.options.onExit?.()}function es(t,e,n){e.correct=n,n?Mt(10):ue(t,e),O(),n&&m.ok("已记为答对")}async function ns(t,e){const n=x;if(n){n.busy=!0,O();try{const a=[`题目：${M(t.q)}`,`标准答案：${String(t.a)}`,`学生回答：${M(e.text)||"（空）"}`,"请判断学生回答是否表达了标准答案的主要意思，只输出「得分」或「不得分」。"].join(`
`),s=await j.ai.grade(a),r=String(s.result||""),o=r.includes("得分")&&!r.includes("不得分");e.correct=o,o?Mt(10):ue(t,e),m.ok(o?"AI 阅卷：答对":"AI 阅卷：答错")}catch(a){m.error(a instanceof L?a.message:"AI 阅卷失败，请稍后再试")}finally{n.busy=!1,O()}}}async function as(){const t=lt();if(!t)return;const e=re()[String(t.id)]??"",n=document.createElement("div");n.innerHTML=`<textarea class="textarea" data-role="note" rows="6" placeholder="记录解题思路、易错点…">${h(e)}</textarea>`;const a=n.querySelector("textarea");await N({title:"我的笔记",body:n,actions:[{label:"取消",value:!1},{label:"保存",value:!0,variant:"primary"}],onMount:()=>a.focus()})&&(Hn(t.id,a.value),m.ok("笔记已保存"),O())}async function ss(){const t=lt();if(!t)return;const e=It(t),n=[`题目：${M(t.q)}`,t.opts.length?`选项：${t.opts.map((o,i)=>`${String.fromCharCode(65+i)}. ${M(o)}`).join("；")}`:"",`正确答案：${q(t.a)?t.a:W(t.a,t.opts)}`,e.submitted?`我的作答：${q(t.a)?e.text:W(e.picked,t.opts)}`:"","请用中文简洁地讲解：考点、为什么选它、其他选项错在哪、容易混淆的知识点。"].filter(Boolean).join(`
`),a=document.createElement("div");a.innerHTML='<div class="answer-panel" data-role="ai"><div class="ai-title">✦ AI 解析中…</div><span data-role="text" class="cursor"></span></div>',N({title:"AI 深度解析",body:a,actions:[{label:"关闭",value:"close"}]});const s=a.querySelector('[data-role="text"]'),r=a.querySelector(".ai-title");try{let o="";const i=await j.ai.explainStream(n,c=>{o+=c,s.innerHTML=`${h(o).replace(/\n/g,"<br>")}<span class="cursor"></span>`}),l=i.provider==="deepseek"?"DeepSeek":i.provider==="zhipu"?"智谱":"";r.textContent=o?`✦ AI 解析${l?` · ${l}`:""}${i.cached?" · 缓存命中":""}`:"✦ AI 解析",o?s.innerHTML=h(i.text||o).replace(/\n/g,"<br>"):await rs(s,i.text??""),s.classList.remove("cursor")}catch(o){const i=o instanceof L?o.message:"AI 解析失败，请稍后重试";m.error(i),r.textContent="✦ 解析失败",s.classList.remove("cursor"),s.textContent=i}}async function rs(t,e){for(let n=0;n<e.length;n+=2)t.innerHTML=h(e.slice(0,n+2)).replace(/\n/g,"<br>"),await ln(12)}function os(){const t=x;if(!t)return;const e=t.options.questions.map((n,a)=>{const s=t.records.get(n.id),r=a===t.idx?"current":s?.correct===!0?"done":s?.submitted?"wrong":"";return`<button class="nav-cell" data-idx="${a}" data-state="${r}">${a+1}</button>`}).join("");N({title:"题目导航",body:`<div class="nav-grid">${e}</div>
      <div class="legend"><span><i style="background:var(--ok)"></i>答对</span><span><i style="background:var(--danger)"></i>答错</span><span><i style="background:var(--accent)"></i>当前</span></div>`,actions:[{label:"结束本次练习",value:"finish",variant:"danger"},{label:"继续",value:"close",variant:"primary"}],onMount:n=>{n.querySelectorAll(".nav-cell").forEach(a=>{a.addEventListener("click",()=>{const s=Number(a.dataset.idx);!Number.isFinite(s)||!x||(x.idx=s,x.textDraft="",de(),O())})})}}).then(n=>{n==="finish"&&me()})}async function P(t,e){const n=x;if(!n)return!1;const a=lt();if(!a)return!1;const s=It(a);switch(t){case"pick":{if(s.submitted)return!0;const r=Number(e.dataset.idx);return q(a.a)||(vt(a.a).length>1?(s.picked=s.picked.includes(r)?s.picked.filter(i=>i!==r):[...s.picked,r],O()):(s.picked=[r],await zt(a,s))),!0}case"submit":{if(q(a.a)){const r=n.root?.querySelector('[data-role="essay"]');if(s.text=r?.value??n.textDraft,!s.text.trim())return m.info("先写点什么再提交吧"),!0;await zt(a,s)}else{if(!s.picked.length)return m.info("请先选择答案"),!0;await zt(a,s)}return!0}case"ai-grade":return!q(a.a)||x?.busy||await ns(a,s),!0;case"mark":return q(a.a)&&es(a,s,e.dataset.ok==="1"),!0;case"next":return pe(),!0;case"prev":return n.idx>0&&(n.idx-=1,n.textDraft="",O()),!0;case"jump":return n.idx=Number(e.dataset.idx),n.textDraft="",de(),O(),!0;case"nav":return os(),!0;case"exit":return await me(),!0;case"fav":return await na(a.id),O(),!0;case"note":return await as(),!0;case"ai":return ss(),!0;default:return!1}}let U=null;function is(){return!!(U&&document.body.contains(U))}function ct(t){if(!t.questions.length){m.info("这里还没有题目");return}Ne(),U=document.createElement("div"),U.className="quiz",document.body.appendChild(U),document.body.classList.add("is-locked"),Ya(U,{...t,onExit:()=>{Ne(),t.onExit?.()}}),Bn({ids:t.questions.map(e=>e.id),idx:t.startIndex??0,source:t.source,savedAt:Date.now()})}function Ne(){U&&(fe(),U.remove(),U=null,document.body.classList.remove("is-locked"))}async function Bt(t="random"){const e=f.bank??[];if(!e.length){m.info("题库还是空的，先去添加题目吧");return}if(t==="chapter"){const a=await ds(e);if(!a?.length)return;const s=e.filter(o=>a.includes(o.chapter||"未分类")),r=await qt(s.length);if(r===null)return;ct({questions:s.slice(0,r),source:"chapter",title:"章节练习"});return}const n=await qt(e.length);if(n!==null){if(t==="sequential"){const a=Math.min(We(),Math.max(e.length-1,0));ct({questions:e.slice(0,n),source:"sequential",title:"顺序练习",startIndex:a<n?a:0});return}ct({questions:ze(e).slice(0,n),source:"all",title:"随机练习"})}}async function fn(){const t=f.wrong??await at(!0);if(!t.length){m.info("错题本是空的，先去刷几题吧");return}const e=await qt(t.length);if(e===null)return;const n=t.slice(0,e).map(a=>({id:a.id,q:a.q,opts:a.opts,a:a.a,chapter:a.chapter,subject:a.subject}));ct({questions:n,source:"wrong",title:"错题重练"})}function cs(t){if(!t.length){m.info("还没有收藏题目");return}qt(t.length).then(e=>{e!==null&&ct({questions:ze(t).slice(0,e),source:"fav",title:"收藏练习"})})}function ls(){const t=Ke(),e=f.bank??[];if(!t||!e.length)return m.info("没有可以继续的练习"),!1;const n=new Map(e.map(s=>[s.id,s])),a=t.ids.map(s=>n.get(s)).filter(s=>!!s);return a.length?(ct({questions:a,source:t.source==="wrong"||t.source==="fav"?t.source:"sequential",title:"继续上次练习",startIndex:Math.min(t.idx,a.length-1)}),!0):(Ge(),m.info("上次的题目已经不在了"),!1)}function qt(t){const e=[10,20,30].filter(s=>s<t);if(!e.length)return Promise.resolve(t);const n=document.createElement("div");n.innerHTML=`
    <div class="segmented" data-role="count">
      ${e.map(s=>`<button type="button" data-n="${s}">${s} 题</button>`).join("")}
      <button type="button" data-n="${t}" aria-pressed="true">全部 ${t}</button>
    </div>
    <p class="muted small" style="margin:12px 0 0">共 ${t} 道可用题目</p>`;const a=n.querySelector('[data-role="count"]');return a.addEventListener("click",s=>{const r=s.target.closest("button[data-n]");r&&(a.querySelectorAll("button").forEach(o=>o.setAttribute("aria-pressed","false")),r.setAttribute("aria-pressed","true"))}),N({title:"练多少题",body:n,actions:[{label:"取消",value:-1},{label:"开始",value:-2,variant:"primary"}]}).then(s=>{if(s===null||s===-1)return null;const r=a.querySelector('button[aria-pressed="true"]');return Number(r?.dataset.n??t)})}async function ds(t){const e=new Map;t.forEach(o=>{const i=o.chapter?.trim()||"未分类";e.set(i,(e.get(i)??0)+1)});const n=[...e.entries()].sort((o,i)=>i[1]-o[1]);if(!n.length)return null;const a=document.createElement("div");if(a.innerHTML=`<div class="list">${n.map(([o,i],l)=>`
      <button class="item" data-chapter="${h(o)}" data-checked="${l===0}" style="text-align:left">
        <div class="row between"><span style="font-weight:600">${h(o)}</span><span class="tag">${i} 题</span></div>
      </button>`).join("")}</div>`,a.addEventListener("click",o=>{const i=o.target.closest("[data-chapter]");i&&(i.dataset.checked=i.dataset.checked==="true"?"false":"true")}),!await N({title:"选择章节",body:a,actions:[{label:"取消",value:!1},{label:"开始",value:!0,variant:"primary"}]}))return null;const r=Array.from(a.querySelectorAll("[data-chapter]")).filter(o=>o.dataset.checked==="true").map(o=>o.dataset.chapter??"");return r.length?r:null}const et=new Set;function us(){et.clear()}function Zt(){return f.favs??[]}function ps(){const t=Zt(),e=f.loading.fav&&!f.favs?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(n=>`
        <div class="item" data-id="${n.id}">
          <div class="item-q">${R(n.q)}</div>
          <div class="item-meta">
            ${n.subject?`<span class="tag tag-accent">${h(n.subject)}</span>`:""}
            ${n.chapter?`<span class="tag">${h(n.chapter)}</span>`:""}
            <span class="grow"></span>
            <button class="btn btn-sm btn-ghost" data-act="reveal" data-id="${n.id}">${et.has(n.id)?"收起":"看答案"}</button>
            <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${n.id}">取消收藏</button>
          </div>
          ${et.has(n.id)?`<div class="item-answer"><div class="right">${h(W(n.a,n.opts))}</div></div>`:""}
        </div>`).join("")}</div>`:'<div class="empty"><div class="empty-ico">☆</div><div class="empty-title">还没有收藏</div><div class="empty-desc">练习时点「收藏」，好题就不会丢</div></div>';return`
    <h1 class="page-title">收藏</h1>
    <p class="muted small" style="margin:4px 0 14px">共 ${t.length} 道好题</p>
    ${t.length?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">练习收藏（${t.length} 题）</button>`:""}
    ${e}`}async function fs(){await ht()}async function ms(t,e){switch(t){case"practice":return Zt().length?(await cs(Zt()),!0):(m.info("还没有收藏的题"),!0);case"reveal":{const n=Number(e.dataset.id);return et.has(n)?et.delete(n):et.add(n),!0}case"remove":{const n=Number(e.dataset.id);try{await j.favorites.remove(n),et.delete(n),X("fav"),await ht(!0),m.ok("已取消收藏")}catch(a){m.error(a instanceof L?a.message:"操作失败")}return!0}default:return!1}}let Ut="";function gs(){return(!Wn()||!Ut)&&(Ut=aa(),Kn()),Ut}function hs(){const t=new Date,e=a=>String(a).padStart(2,"0"),n="日一二三四五六"[t.getDay()];return`${t.getFullYear()}.${e(t.getMonth()+1)}.${e(t.getDate())} / 周${n}`}const bs=t=>String(t).padStart(2,"0");function vs(){const t=f.bank,e=f.wrong,n=f.favs,a=f.loading,s=Ke(),r=Je().slice(0,4),o=We(),i=t?t.length:0,l=Math.min(20,Math.max(5,i||10)),c='<div class="skeleton sk-line w60"></div><div class="skeleton sk-line w80"></div>',d=p=>p===void 0?"—":String(p).padStart(2,"0");return`
    <section class="masthead">
      <div class="mast-meta">
        <span>${hs()}</span>
        <span class="mast-dot" aria-hidden="true"></span>
        <span>${f.user?`@${h(f.user)}`:"未登录"}</span>
      </div>
      <h1 class="mast-title">
        今天<br />练 <em>${String(l).padStart(2,"0")}</em> 题
      </h1>
      <p class="mast-sub">${h(gs())}</p>
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

    ${a.bank&&!t?`<div class="card card-pad">${c}</div>`:""}

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
        <span class="tile-desc">${t&&!t.length?"题库为空":o>0?`停在第 ${o+1} 题`:"按顺序推进"}</span>
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
             ${r.map((p,u)=>`<div class="recent-row"><span class="recent-idx">${bs(u+1)}</span><span class="recent-text">${h(p)}</span></div>`).join("")}
           </section>`:""}
  `}async function ys(){await Promise.allSettled([nt(),at(),ht()])}async function ws(t,e){switch(t){case"goto":return _t(e.dataset.tab??"bank"),!0;case"random":return await Bt("random"),!0;case"sequential":return await Bt("sequential"),!0;case"chapter":return await Bt("chapter"),!0;case"wrong":return await fn(),!0;case"resume":return ls(),!0;default:return!1}}const Ft=8;function $s(){const t=[],e=(n,a,s)=>{(n??[]).forEach(r=>t.push({id:r.id,q:r,source:a,tab:s}))};return e(f.bank,"题库","bank"),e(f.wrong,"错题","wrong"),e(f.favs,"收藏","fav"),t}function xs(t,e){const n=e.toLowerCase();return n?M(t.q.q).toLowerCase().includes(n)||(t.q.opts??[]).some(a=>M(a).toLowerCase().includes(n))||M(t.q.chapter??"").toLowerCase().includes(n)||M(t.q.subject??"").toLowerCase().includes(n):!0}function Ie(t=""){const e=document.createElement("div");e.className="search-panel",e.innerHTML=`
    <div class="search-box">
      <span class="ico">⌕</span>
      <input class="search-input" type="search" data-role="kw" placeholder="搜题干、选项、章节、题库…" value="${t.replace(/"/g,"&quot;")}">
    </div>
    <div class="search-results" data-role="hits"></div>
    <p class="muted small search-foot" data-role="foot"></p>`;const n=$s(),a=e.querySelector('[data-role="hits"]'),s=e.querySelector('[data-role="foot"]'),r=e.querySelector('[data-role="kw"]'),o=()=>{const i=r.value.trim(),l=n.filter(p=>xs(p,i));if(!i){const p=l.filter(u=>u.tab==="bank").slice(0,12);a.innerHTML=p.length?p.map(u=>`<button class="hit" data-act="open" data-tab="${u.tab}" data-id="${u.id}">
                <span class="hit-src">${u.source}</span>
                <span class="hit-q">${R(u.q.q)}</span>
              </button>`).join(""):'<p class="muted small">题库还是空的，先去导入吧。</p>',s.textContent=p.length?"输入关键词可以跨题库 / 错题 / 收藏一起搜":"";return}const c=p=>l.filter(u=>u.source===p),d=[];["题库","错题","收藏"].forEach(p=>{const u=c(p);u.length&&(d.push(`<div class="hit-group">${p} · ${u.length}</div>`),d.push(u.slice(0,Ft).map(b=>{const $=st(b.q);return`<button class="hit" data-act="open" data-tab="${b.tab}" data-id="${b.id}">
              <span class="hit-src">${yt[$]}</span>
              <span class="hit-q">${tn(R(b.q.q),i)}</span>
            </button>`}).join("")),u.length>Ft&&d.push(`<div class="hit-more muted small">还有 ${u.length-Ft} 条，缩小关键词试试</div>`))}),a.innerHTML=d.length?d.join(""):`<p class="muted small">没有找到「${i}」</p>`,s.textContent=`共命中 ${l.length} 条`};r.addEventListener("input",o),N({title:"全局搜索",body:e,actions:[{label:"关闭",value:"close"}],onMount:i=>{o();const l=i.querySelector('[data-role="kw"]');l?.focus(),l?.setSelectionRange(l.value.length,l.value.length),i.addEventListener("click",c=>{const d=c.target.closest(".hit");if(!d)return;const p=d.dataset.tab??"bank",u=Number(d.dataset.id),b=n.find($=>$.id===u&&$.tab===p);if(de(),_t(p),b){const $=M(b.q.q).slice(0,12);if(p==="bank"){const E=document.querySelector('.view input[data-role="search"]');E&&$&&(E.value=$,E.dispatchEvent(new Event("input",{bubbles:!0})))}}})}})}const mn=[{keys:"1 2 3 4 / A B C D",desc:"选择对应选项",scope:"答题中"},{keys:"Enter",desc:"提交答案 / 下一题",scope:"答题中"},{keys:"← →",desc:"上一题 / 下一题",scope:"答题中"},{keys:"S",desc:"收藏这道题",scope:"答题中"},{keys:"N",desc:"打开笔记",scope:"答题中"},{keys:"E",desc:"AI 深度解析",scope:"答题中"},{keys:"G",desc:"AI 阅卷（简答题）",scope:"答题中"},{keys:"Esc",desc:"关闭弹窗 / 结束练习",scope:"全局"},{keys:"1 – 5",desc:"切换 首页 / 题库 / 错题 / 收藏 / 我的",scope:"非答题时"},{keys:"/ 或 Ctrl+K",desc:"全局搜索（题库 / 错题 / 收藏）",scope:"全局"},{keys:"?",desc:"打开这份快捷键说明",scope:"全局"}];function ge(){const t=mn.map(e=>`<div class="kbd-row">
      <kbd class="kbd">${e.keys}</kbd>
      <span class="kbd-desc">${e.desc}</span>
      <span class="kbd-scope">${e.scope}</span>
    </div>`).join("");N({title:"键盘快捷键",body:`<div class="kbd-list">${t}</div>
      <p class="muted small" style="margin:14px 0 0">手机上直接用手指点，这些快捷键主要给电脑端用。</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]})}const ks=["home","bank","wrong","fav","me"];function Ss(t){const e=t;if(!e)return!1;const n=e.tagName.toLowerCase();return n==="input"||n==="textarea"||n==="select"||e.isContentEditable}function gn(){document.addEventListener("keydown",t=>{if((t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"){if(document.querySelector(".quiz"))return;t.preventDefault(),Ie();return}if(t.metaKey||t.ctrlKey||t.altKey||document.querySelector(".quiz")||Ss(t.target)||document.querySelector(".modal-layer"))return;if(t.key==="?"){t.preventDefault(),ge();return}if(t.key==="/"){t.preventDefault(),Ie();return}const n=Number(t.key);n>=1&&n<=5&&(t.preventDefault(),_t(ks[n-1]))})}const As=Object.freeze(Object.defineProperty({__proto__:null,SHORTCUTS:mn,installShortcuts:gn,openShortcuts:ge},Symbol.toStringTag,{value:"Module"})),Es=[{value:"auto",label:"跟随系统"},{value:"light",label:"明亮"},{value:"dark",label:"深色"},{value:"eye",label:"护眼"}],Ls=[{value:0,label:"立即"},{value:300,label:"0.3 秒"},{value:600,label:"0.6 秒"},{value:1200,label:"1.2 秒"}];function De(t,e,n){return`<div class="segmented">${t.map(a=>`<button class="seg" data-act="${n}" data-value="${a.value}" aria-pressed="${String(a.value)===String(e)}">${a.label}</button>`).join("")}</div>`}function Oe(t,e){const n=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download=t,s.click(),URL.revokeObjectURL(a)}async function js(){const t=document.createElement("div");if(t.innerHTML=`
    <label class="field"><span class="field-label">原密码</span>
      <input class="input" type="password" data-role="old" autocomplete="current-password"></label>
    <label class="field"><span class="field-label">新密码（至少 6 位）</span>
      <input class="input" type="password" data-role="next" autocomplete="new-password"></label>`,!await N({title:"修改密码",body:t,actions:[{label:"取消",value:!1},{label:"确认修改",value:!0,variant:"primary"}]}))return;const n=t.querySelector('[data-role="old"]').value,a=t.querySelector('[data-role="next"]').value;if(a.length<6){m.error("新密码至少 6 位");return}try{await j.auth.change(n,a),m.ok("密码已更新")}catch(s){m.error(s instanceof L?s.message:"修改失败")}}function Ts(){const t=f.user,e=h((t||"?").slice(0,1).toUpperCase()),n=(()=>{try{return JSON.parse(localStorage.getItem("oq:appearance")??"{}")}catch{return{}}})();return`
    <div class="profile">
      <div class="profile-avatar">${e}</div>
      <div class="profile-body">
        <div class="profile-name">${h(t)}</div>
        <div class="profile-desc">${f.bank?.length??0} 道题 · ${f.wrong?.length??0} 道错题 · ${f.favs?.length??0} 条收藏</div>
      </div>
    </div>

    <div class="section-title">外观</div>
    <div class="card card-pad">
      <div class="setting-row">
        <div><div class="setting-title">主题</div><div class="setting-desc">深色模式也会跟随系统自动切换</div></div>
      </div>
      ${De(Es,_.theme,"theme")}
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
      ${De(Ls,_.autoDelay,"delay")}
      <div class="divider"></div>
      <label class="setting-row">
        <div><div class="setting-title">答题震动</div><div class="setting-desc">答对答错给一点反馈</div></div>
        <span class="switch" role="switch" data-act="toggle-vibration" aria-checked="${_.vibration}"><i></i></span>
      </label>
      <label class="setting-row">
        <div><div class="setting-title">连对鼓励</div><div class="setting-desc">连续答对时来点掌声</div></div>
        <span class="switch" role="switch" data-act="toggle-streak" aria-checked="${_.streakAlert}"><i></i></span>
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
    <p class="muted small" style="text-align:center;margin:0 0 10px">数据存放在你自己的 Cloudflare D1 里</p>`}async function Cs(){const t=document.createElement("input");t.type="file",t.accept="image/*",t.onchange=async()=>{const e=t.files?.[0];if(e){if(e.size>8*1024*1024){m.error("图片太大了（最多 8MB）");return}try{const n=await Ms(e);ft({image:n,color:""}),m.ok("背景已更新"),C("render")}catch{m.error("这张图片读不出来，换一张试试")}}},t.click()}function Ms(t){return new Promise((e,n)=>{const a=URL.createObjectURL(t),s=new Image;s.onload=()=>{URL.revokeObjectURL(a);const r=Math.min(1,1600/Math.max(s.width,s.height)),o=document.createElement("canvas");o.width=Math.round(s.width*r),o.height=Math.round(s.height*r);const i=o.getContext("2d");if(!i){n(new Error("canvas unavailable"));return}i.drawImage(s,0,0,o.width,o.height),e(o.toDataURL("image/jpeg",.82))},s.onerror=()=>{URL.revokeObjectURL(a),n(new Error("image load failed"))},s.src=a})}function qs(){ce()}async function _s(t,e){switch(t){case"theme":return Vn(e.dataset.value),C("render"),!0;case"delay":return Et({autoDelay:Number(e.dataset.value)}),C("render"),!0;case"toggle-vibration":return Et({vibration:!_.vibration}),C("render"),!0;case"toggle-streak":return Et({streakAlert:!_.streakAlert}),C("render"),!0;case"pick-color":return ft({color:e.value,image:""}),!0;case"pick-bg":return await Cs(),!0;case"clear-bg":return ft({image:""}),C("render"),!0;case"dim":return ft({dim:Number(e.value)}),!0;case"shortcuts":return ge(),!0;case"about":return N({title:"关于",body:`<p class="muted small" style="margin:0 0 10px">原点 · Origin —— 个人题库与错题本，数据存在你自己的 Cloudflare D1。</p>
          <p class="muted small" style="margin:0 0 6px">题库 ${f.bank?.length??0} 题 · 错题 ${f.wrong?.length??0} 道 · 收藏 ${f.favs?.length??0} 条</p>
          <p class="muted small" style="margin:0">版本 v2.0.0 · 支持 PWA 离线打开</p>`,actions:[{label:"知道了",value:"ok",variant:"primary"}]}),!0;case"reset-bg":return ft({color:"",image:"",dim:.35}),m.ok("背景已恢复"),C("render"),!0;case"export-bank":return f.bank?.length?(Oe(`题库-${f.user}.json`,f.bank),m.ok("已导出"),!0):(m.info("题库是空的"),!0);case"export-wrong":return f.wrong?.length?(Oe(`错题-${f.user}.json`,f.wrong),m.ok("已导出"),!0):(m.info("没有错题"),!0);case"change-password":return await js(),!0;case"logout":return await Nt({title:"退出登录",message:"退出后需要重新输入密码，确定吗？",okText:"退出",danger:!0})&&(Ye(),m.info("已退出登录")),!0;default:return!1}}const A={subject:"all",edit:!1,selected:new Set};function Ns(){A.subject="all",A.edit=!1,A.selected.clear()}function hn(){const t=f.wrong??[];return A.subject==="all"?t:t.filter(e=>(e.subject||"默认题库")===A.subject)}function Is(){return["all",...Array.from(new Set((f.wrong??[]).map(t=>t.subject||"默认题库")))]}function Ds(){const t=hn(),e=f.wrong?.length??0,n=Is().map(s=>`<button class="chip" data-act="subject" data-subject="${h(s)}" aria-pressed="${A.subject===s}">
          ${s==="all"?"全部":h(s)}
        </button>`).join(""),a=f.loading.wrong&&!f.wrong?`<div class="list">${Array.from({length:3}).map(()=>'<div class="item"><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div></div>').join("")}</div>`:t.length?`<div class="list">${t.map(s=>`
        <div class="item" data-id="${s.id}" data-checked="${A.selected.has(s.id)}">
          ${A.edit?`<span class="checkbox" data-act="select" data-id="${s.id}">✓</span>`:""}
          <div class="item-q">${R(s.q)}</div>
          <div class="item-meta">
            ${s.subject?`<span class="tag tag-accent">${h(s.subject)}</span>`:""}
            ${s.chapter?`<span class="tag">${h(s.chapter)}</span>`:""}
          </div>
          <div class="item-answer">
            ${s.user_choice_text?`<div class="mine">你的选择：${h(s.user_choice_text)}</div>`:""}
            ${s.answer?`<div class="right">正确答案：${h(s.answer)}</div>`:""}
          </div>
          ${A.edit?"":`<div class="item-meta" style="margin-top:10px">
                   <span class="grow"></span>
                   <button class="btn btn-sm btn-ghost" data-act="remove" data-id="${s.id}">已掌握</button>
                 </div>`}
        </div>`).join("")}</div>`:`<div class="empty"><div class="empty-ico">⚑</div><div class="empty-title">${e?"这个题库下没有错题":"还没有错题"}</div><div class="empty-desc">${e?"切到「全部」看看":"答错的题会自动收集到这里，方便集中消灭"}</div></div>`;return`
    <div class="row between" style="margin-bottom:4px">
      <h1 class="page-title" style="margin:0">错题集</h1>
      <button class="icon-btn" data-act="toggle-edit" aria-label="批量管理">${A.edit?"✓":"☰"}</button>
    </div>
    <p class="muted small" style="margin:4px 0 14px">共 ${e} 道，消灭一题少一题</p>
    ${e?`<button class="btn btn-primary btn-block" data-act="practice" style="margin-bottom:14px">开始重练（${t.length} 题）</button>`:""}
    ${n}
    ${A.edit?`<div class="row between" style="margin-bottom:12px">
             <span class="muted small">已选 ${A.selected.size} 题</span>
             <button class="btn btn-sm btn-danger" data-act="remove-selected" ${A.selected.size?"":"disabled"}>删除</button>
           </div>`:""}
    ${a}`}async function Os(){await at()}async function Rs(t,e){switch(t){case"subject":return A.subject=e.dataset.subject??"all",!0;case"toggle-edit":return A.edit=!A.edit,A.selected.clear(),!0;case"select":{const n=Number(e.dataset.id);return A.selected.has(n)?A.selected.delete(n):A.selected.add(n),!0}case"practice":return hn().length?(await fn(),!0):(m.info("没有可练的错题"),!0);case"remove":{const n=Number(e.dataset.id);try{await j.wrong.remove([n]),A.selected.delete(n),X("wrong"),await at(!0),m.ok("已标记掌握，继续加油")}catch(a){m.error(a instanceof L?a.message:"操作失败")}return!0}case"remove-selected":{const n=[...A.selected];if(!n.length||!await Nt({title:"删除错题",message:`确定删除选中的 ${n.length} 道错题？`,danger:!0,okText:"删除"}))return!0;try{await j.wrong.remove(n),A.selected.clear(),X("wrong"),await at(!0),m.ok("已删除")}catch(a){m.error(a instanceof L?a.message:"删除失败")}return!0}default:return!1}}const rt={home:{render:vs,mount:ys,handle:ws},bank:{render:Oa,mount:Ha,handle:za,onInput:Ua,reset:on},wrong:{render:Ds,mount:Os,handle:Rs,reset:Ns},fav:{render:ps,mount:fs,handle:ms,reset:us},me:{render:Ts,mount:qs,handle:_s}};let bt=!1,Y=!1,Wt=!1,Kt=!1;function bn(){return document.getElementById("app-root")}function Ps(){Y=!1,bn().innerHTML=`
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand-dot"></span>
          <span class="brand-name">Origin Quiz</span>
        </div>
        <button class="avatar" data-act="tab" data-tab="me" aria-label="我的">${(f.user||"?").slice(0,1).toUpperCase()}</button>
      </header>
      <main id="view" class="view"></main>
      <nav class="tabbar" role="tablist" style="--tab-count:${Xt.length}">
        <span class="tab-ind" aria-hidden="true"></span>
        ${Xt.map(t=>`<button class="tab-btn" role="tab" data-act="tab" data-tab="${t.id}" aria-label="${t.label}">
               <span class="tab-ico">${t.icon}</span><span class="tab-label">${t.label}</span>
             </button>`).join("")}
      </nav>
    </div>`,bt=!0}function Hs(){document.querySelectorAll(".tab-btn").forEach(e=>{const n=e.dataset.tab===f.tab;e.classList.toggle("is-active",n),e.setAttribute("aria-selected",String(n))});const t=document.querySelector(".tabbar");if(t){const e=Math.max(0,Xt.findIndex(n=>n.id===f.tab));t.style.setProperty("--tab-index",String(e))}}function zs(){const t=document.getElementById("view");if(!t)return;const e=document.activeElement,n=!!(e&&t.contains(e)&&/^(INPUT|TEXTAREA)$/.test(e.tagName)),a=n?e.getAttribute("data-role"):null,s=n&&e instanceof HTMLInputElement?e.selectionStart:null,r=rt[f.tab]??rt.home;if(t.innerHTML=`<div class="view-inner">${r.render()}</div>`,Hs(),n&&a){const o=t.querySelector(`[data-role="${a}"]`);o&&(o.focus(),s!==null&&o.setSelectionRange&&o.setSelectionRange(s,s))}r.mount?.()}function F(){if(Wt){Kt=!0;return}Wt=!0;try{if(!f.authed&&!f.token){Y=!0,bt=!1,bn().innerHTML=ra();return}bt||Ps(),zs()}finally{Wt=!1,Kt&&(Kt=!1,queueMicrotask(F))}}let Gt=!1;function Re(){Gt||(Gt=!0,setTimeout(()=>{Gt=!1,F()},0))}async function vn(t){await t(),Y&&F()}function yn(t){const e=t.dataset.act??"";if(is()&&t.closest(".quiz")){P(e,t).then(a=>{a||C("render")});return}if(e==="tab"){_t(t.dataset.tab??"home");return}if(Y){vn(()=>Ze(e,t));return}const n=rt[f.tab]??rt.home;n.handle&&Promise.resolve(n.handle(e,t)).then(a=>{a&&F()})}function Bs(t){const e=t.target;if(!e)return;const n=e.closest("[data-act]");n&&(n.closest(".modal-layer")||yn(n))}function Pe(t){const e=t.target;if(!e)return;if(e.matches("[data-act]")&&e.type==="color"){yn(e);return}if(Y)return;const n=document.getElementById("view");if(!n||!n.contains(e))return;(rt[f.tab]??rt.home).onInput?.(e)&&e.getAttribute("data-role")==="search"&&F()}function Us(t){const e=t.target;!(e instanceof HTMLFormElement)||!e.matches("[data-form]")||(t.preventDefault(),Y&&vn(()=>Ze("submit",e)))}function Fs(){ie(),ce(),Gn(()=>{Ye(),bt=!1,Y=!1,m.error("登录已过期，请重新登录"),C("auth")}),St("nav",()=>{Object.entries(rt).forEach(([t,e])=>{t!==f.tab&&e.reset?.()}),F()}),St("auth",()=>{bt=!1,Y=!1,f.authed?(on(),F(),Promise.allSettled([nt(!0),at(!0),ht(!0)])):F()}),St("render",Re),St("data",Re),document.addEventListener("click",Bs),document.addEventListener("change",Pe),document.addEventListener("input",Pe),document.addEventListener("submit",Us),gn(),f.token&&(f.authed=!0),F(),f.token&&Promise.allSettled([nt(),at(),ht()])}function He(){try{Fs(),Dn()}catch(t){console.error("[origin-quiz] 启动失败",t);const e=document.getElementById("app-root");e&&(e.innerHTML=`<div class="fatal"><h1>页面加载失败</h1><p>${String(t instanceof Error?t.message:t)}</p><button onclick="location.reload()">刷新重试</button></div>`)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",He,{once:!0}):He();
