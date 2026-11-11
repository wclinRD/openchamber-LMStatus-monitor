(()=>{var Tr=Object.defineProperty;var br=(e)=>e;function yr(e,o){this[e]=br.bind(null,o)}var vr=(e,o)=>{for(var n in o)Tr(e,n,{get:o[n],enumerable:!0,configurable:!0,set:yr.bind(o,n)})};var X=(e,o)=>()=>(e&&(o=e(e=0)),o);var f="openchamber.sdk",h=1;var Ce=()=>{};function Eo(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(p)=>{let s=p.target===e?o:p.target;if(!(s instanceof Element))return;if(!s.hasAttribute("data-oc-scrolling"))s.setAttribute("data-oc-scrolling","");let S=n.get(s);if(S!==void 0)clearTimeout(S);n.set(s,setTimeout(()=>{n.delete(s),s.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var ft=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`,Ar;var Ue=X(()=>{Ar=`(${Eo.toString()})(document);`});var ht=128,Et=65536;var Le=128,Ie=65536;var St=()=>{};var _o,So=(e)=>Object(e)===e&&!Array.isArray(e),xt=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),xo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,go=(e)=>String(e)===e&&e.length>=1&&e.length<=80,To=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!So(n)||!_o.test(n.id)||!xo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!xt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!xt(n,["kind","id","label","value","options","disabled"]))return!1;if(!go(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let p=new Set;for(let s of n.options){if(!So(s)||!xt(s,["value","label"])||!go(s.value)||!xo(s.label)||p.has(s.value))return!1;p.add(s.value)}if(!p.has(n.value))return!1}return!0};var gt=X(()=>{_o=/^[a-z][a-z0-9-]{0,39}$/});var bo=()=>{};var yo=()=>{};var Me=20000000,Ge=256,_t=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,vo=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var Tt=()=>{};var Ao,ko,wo=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let p=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of p)if(!wo(s,o+1,n))return!1;return!0},bt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(bt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(bt)}return String(e)===e||Number.isFinite(e)},yt=(e)=>{try{if(String(e.id)!==e.id||!Ao.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ko.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!wo(e.data)||!bt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var vt=X(()=>{Ao=/^[A-Za-z0-9_-]{1,80}$/,ko=["left","right","top","bottom"]});var Ro,kt=(e)=>Boolean(e&&"sessionId"in e),wt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),Co,Ot=(e)=>Co.test(e),Pe=500,Ne=32000,Uo=16000,Lo=128,Io=200,Mo=2000,Go=16000,Po=80,No=200,Do=16000,$o=2000,Rt=20000,De=1024,$e=2000000,He=64000,Fe=8000,Ct=4000,Ut=90000,Ho=999,Fo=1e4,ge=500,Xo,Bo,kr,Vo=(e)=>kr.has(e),zo=(e)=>e&&Vo(e)?e:"HOST_REJECTED",ue=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ue);if(Object(e)===e)return Object.values(e).every(ue);return!1},jo=(e)=>ue(e)&&JSON.stringify(e).length<=Do,Oo=(e)=>e?.trim().slice(0,No)??"",me=(e)=>{let o=e.id.trim().slice(0,Lo),n=e.title.trim().slice(0,Io),p=e.url.trim().slice(0,Mo),s=e.text?.trim().slice(0,Go),S=e.author?.trim().slice(0,Po),L=e.kind==="pull"?"pull":"issue",u={providerId:e.providerId.trim(),id:o,title:n||o,url:p,kind:L};if(s)u.text=s;if(S)u.author=S;if(L==="pull"){let G=Oo(e.branches?.head),y=Oo(e.branches?.base);if(G&&y)u.branches={head:G,base:y}}if(jo(e.data))u.data=e.data;return u},Lt=(e)=>{let o=me(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},It=(e)=>{let o={text:e.text.trim().slice(0,Uo)};if(e.send)o.send=!0;return o},Mt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Ho,Math.max(0,Math.round(e)))},Gt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Fo,Math.max(0,Math.ceil(e)))},fe=(e)=>e.length>0&&e.length<=De&&!e.includes("\x00")&&!e.includes("\\"),Xe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>$o)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},wr,Pt=(e)=>Boolean(e&&"status"in e&&wr.has(String(e.status))&&!("body"in e)),Be=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Nt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Dt=(e)=>Boolean(e&&"written"in e&&e.written===!0),$t=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Or,Ht=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Or.has(String(e.kind))&&Number.isFinite(e.size)),Ft=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Rr,Cr=(e)=>Object(e)===e?e:null,At=(e)=>String(e)===e&&e.length>0,Ur=(e)=>{if(!At(e.id))return null;if(e.ok===!0){let o={channel:f,v:h,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&At(e.error))return{channel:f,v:h,type:"result",id:e.id,ok:!1,error:e.error,code:zo(At(e.code)?e.code:void 0)};return null},Xt=(e)=>{let o=Cr(e);if(!o||o.channel!==f||o.v!==h)return null;if(o.type==="result")return Ur(o);if(!Rr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Ve=X(()=>{Ce();Ro=["file","directory","other","missing"],Co=/^[0-9a-f]{7,64}$/i,Xo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Bo=["stopped","starting","ready","failed"],kr=new Set(Xo),wr=new Set(Bo),Or=new Set(Ro),Rr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"])});var Ko=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Lr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",d,Wo=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),ze=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${De} characters without NUL or backslash.`)),je=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},m=(e)=>(e.value+=1,`oc-${e.value}`),Bt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),p=e.requestTimeoutMs??Rt,s=new Set,S=new Set,L=new Set,u=new Set,G=new Set,y=new Set,E=new Set,I=new Set,P=new Set,g=null,q=null,M=new Set,z=new Set,_=null,N=null,ee=!1,Q=new Map,ae=new Map,k=new Map,v=!1,i={value:0},c=null,D=null,te=!1,ce=!1,ke=null,so=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},W=(t)=>{o.parent.postMessage(t,"*")},C=(t,r)=>{for(let a of t)try{a(r)}catch(l){console.error(l)}},io=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=Xt(t.data);if(!r)return;if(r.type==="workspace"){let l=ae.get(r.payload.subscriptionId);if(l)C([l],r.payload.snapshot);return}if(r.type==="shells"){let l=k.get(r.payload.subscriptionId);if(l)C([l],r.payload.snapshot);return}if(r.type==="ready"){if(c=r.payload,D=so(r.payload.session),C(s,r.payload),C(S,r.payload.directory),C(L,r.payload.session),D)C(u,D);C(G,r.payload.connection),C(y,r.payload.settings),C(E,r.payload.item);return}if(r.type==="directory"){if(c)c={...c,directory:r.payload.directory};C(S,r.payload.directory);return}if(r.type==="session"){if(c)c={...c,session:r.payload.session};if(!r.payload.session)D=null;else if(D?.sessionId!==r.payload.session.id)D=so(r.payload.session);C(L,r.payload.session);return}if(r.type==="session-lifecycle"){D=r.payload,C(u,r.payload);return}if(r.type==="connection"){if(c)c={...c,connection:r.payload.connection};C(G,r.payload.connection);return}if(r.type==="settings"){if(c)c={...c,settings:r.payload.settings};C(y,r.payload.settings);return}if(r.type==="item"){if(c)c={...c,item:r.payload.item};C(E,r.payload.item);return}if(r.type==="status-control-event"){C(I,r.payload);return}if(r.type==="popover-closed"){C(P,r.payload);return}if(r.type==="action"){let l=(x)=>{if(!v)W({channel:f,v:h,type:"action-result",id:r.id,payload:x})},T=q;if(!T){l({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>T(r.payload)).then(()=>l({ok:!0}),(x)=>{let R=(x instanceof Error?x.message:String(x)).trim();l({ok:!1,error:(R||"Action failed.").slice(0,ge)})});return}if(r.type==="file-open"){let l=r.payload;if(N&&vo(N,l))return;N=l,C(M,r.payload);return}if(r.type==="file-saved"){C(z,r.payload.version);return}if(r.type==="file-snapshot"){let l=(R)=>{if(!v)W({channel:f,v:h,type:"file-snapshot-result",id:r.id,payload:R})},T=(R)=>l({error:(R.trim()||"Could not read the edited file.").slice(0,ge)}),x=_;if(!x){T("This extension does not edit files.");return}Promise.resolve().then(()=>x(r.payload.purpose)).then((R)=>{if(_t(R)>Me){T(`The file is over ${Me} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>Ge){T(`The snapshot version is over ${Ge} characters.`);return}l({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},(R)=>T(R instanceof Error?R.message:String(R)));return}if(r.type==="resolve"){let l=(x)=>{W({channel:f,v:h,type:"resolve-result",id:r.id,payload:x})},T=g;if(!T){l({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>T(r.payload)).then((x)=>l({item:x?me(x):null}),(x)=>{let R=(x instanceof Error?x.message:String(x)).trim();l({error:(R||"Command failed.").slice(0,ge)})});return}let a=Q.get(r.id);if(!a)return;if(clearTimeout(a.timer),Q.delete(r.id),r.ok){a.resolve(r.payload);return}a.reject(new d(r.code,r.error))};o.addEventListener("message",io),W({channel:f,v:h,type:"hello"});let H=(t,r=p)=>{if(v||o.parent===o)return Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((a,l)=>{let T=setTimeout(()=>{Q.delete(t.id),l(new d("HOST_TIMEOUT","Host did not answer in time."))},r);Q.set(t.id,{resolve:a,reject:l,timer:T}),W(t)})},w=(t)=>H(t).then(()=>{return}),O={channel:f,v:h},pt=(t)=>{if(!v&&o.parent!==o)W(t)},ao=()=>pt({...O,type:"file-save"}),co=(t)=>{if(!Ko(t)||!Lr(t))return;t.preventDefault(),ao()},lo=(t)=>{if(!Ko(t)||t.key!=="Escape"||c?.surface!=="popover"||!c.popover)return;t.preventDefault(),fo(c.popover.id,"escape").catch(()=>{return})},we=()=>{let t=c?.surface==="popover"?c.popover:void 0;if(!t)return;let r=te||ce;if(ke===r)return;ke=r,ho(t.id,r).catch(()=>{return})},Oe=()=>{if(c?.surface!=="popover"||te)return;te=!0,we()},po=(t)=>{if(c?.surface!=="popover"||t.relatedTarget!==null||!te)return;te=!1,we()},uo=()=>{if(c?.surface!=="popover"||ce)return;ce=!0,we()},mo=()=>{if(c?.surface!=="popover"||!ce)return;ce=!1,we()},Z=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new d("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},ut=async(t)=>{if(t.kind!=="projects")Z(t.projectId);let r=await H({...O,type:"workspace-read",id:m(i),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return r},mt=async(t,r)=>{if(t.kind!=="projects")Z(t.projectId);let a=m(i);ae.set(a,r);try{await w({...O,type:"workspace-subscribe",id:m(i),payload:{subscriptionId:a,query:t}})}catch(l){if(ae.delete(a),!v)W({...O,type:"workspace-unsubscribe",id:m(i),payload:{subscriptionId:a}});throw l}return()=>{if(!ae.delete(a)||v)return;W({...O,type:"workspace-unsubscribe",id:m(i),payload:{subscriptionId:a}})}},_r=async(t,r)=>{if(t.kind==="session")Z(t.sessionId);if(t.kind==="project")Z(t.projectId);let a=m(i);k.set(a,r);try{await w({...O,type:"shells-subscribe",id:m(i),payload:{subscriptionId:a,scope:t}})}catch(l){if(k.delete(a),!v)W({...O,type:"shells-unsubscribe",id:m(i),payload:{subscriptionId:a}});throw l}return()=>{if(!k.delete(a)||v)return;W({...O,type:"shells-unsubscribe",id:m(i),payload:{subscriptionId:a}})}},Re=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>ht))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ue(t.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>Et)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&c?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let r=await H({...O,type:"storage",id:m(i),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new d("HOST_REJECTED","Host did not return storage data.");return r},fo=(t,r)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-close",id:m(i),payload:r?{id:t,reason:r}:{id:t}}),ho=(t,r)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-anchor",id:m(i),payload:{id:t,active:r}});return o.addEventListener("keydown",lo,!0),o.addEventListener("pointerover",Oe),o.addEventListener("pointermove",Oe),o.addEventListener("pointerout",po),o.addEventListener("focus",uo),o.addEventListener("blur",mo),{onAction:(t)=>(q=t,()=>{if(q===t)q=null}),listProjects:async()=>{let t=await ut({kind:"projects"});if(t.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await ut({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await ut({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>mt({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>mt({kind:"worktrees",projectId:t},(a)=>{if(a.kind==="worktrees")r(a)}),onSessions:(t,r)=>mt({kind:"sessions",projectId:t},(a)=>{if(a.kind==="sessions")r(a)}),onRunningShells:(t,r)=>_r(t,r),readShellOutput:async(t,r)=>{Z(t,Le);let a=r?.cursor;if(a!==void 0&&(!Number.isInteger(a)||a<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let l=r?.tailBytes;if(l!==void 0&&(!Number.isInteger(l)||l<1||l>Ie))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ie}.`);let x=await H({...O,type:"shell-output",id:m(i),payload:{shellId:t,cursor:a,tailBytes:l}});if(!x||typeof x.output!=="string"||!Number.isFinite(x.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return x},stopShell:async(t)=>{if(Z(t,Le),(await H({...O,type:"shell-stop",id:m(i),payload:{shellId:t}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{Z(t),await w({...O,type:"open-session",id:m(i),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let a=je(r),l={op:"get",key:t};if(a)l.scope=a;let T=await Re(l);return T.op==="get"&&T.found?T.value:void 0},set:async(t,r,a)=>{let l=je(a),T={op:"set",key:t,value:r};if(l)T.scope=l;await Re(T)},delete:async(t,r)=>{let a=je(r),l={op:"delete",key:t};if(a)l.scope=a;await Re(l)},keys:async(t)=>{let r=je(t),a={op:"keys"};if(r)a.scope=r;let l=await Re(a);if(l.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return l.keys}},onReady:(t)=>{if(s.add(t),c)t(c);return()=>{s.delete(t)}},onDirectory:(t)=>{if(S.add(t),c)t(c.directory);return()=>{S.delete(t)}},onSession:(t)=>{if(L.add(t),c)t(c.session);return()=>{L.delete(t)}},onSessionLifecycle:(t)=>{if(u.add(t),D)t(D);return()=>{u.delete(t)}},onConnection:(t)=>{if(G.add(t),c)t(c.connection);return()=>{G.delete(t)}},onSettings:(t)=>{if(y.add(t),c)t(c.settings);return()=>{y.delete(t)}},onItem:(t)=>{if(E.add(t),c)t(c.item);return()=>{E.delete(t)}},onStatusControl:(t)=>(I.add(t),()=>{I.delete(t)}),onPopoverClosed:(t)=>(P.add(t),()=>{P.delete(t)}),setStatusControls:(t)=>{if(c?.features?.statusControls!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support status controls."));if(!To(t))return Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return w({...O,type:"status-controls",id:m(i),payload:{controls:t}})},openPopover:(t)=>{if(c?.features?.popovers!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support popovers."));if(!yt(t))return Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return w({...O,type:"popover-open",id:m(i),payload:t})},closePopover:fo,setPopoverAnchorActive:ho,onResolve:(t)=>(g=t,()=>{if(g===t)g=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Pe)return Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${Pe} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ne))return Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${Ne} characters.`));return w({channel:f,v:h,type:"toast",id:m(i),payload:{...t,message:r}})},openUrl:(t)=>w({channel:f,v:h,type:"open-url",id:m(i),payload:{url:t}}),openCommit:(t)=>Ot(t)?w({channel:f,v:h,type:"open-commit",id:m(i),payload:{sha:t}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>w({channel:f,v:h,type:"open-surface",id:m(i),payload:{surfaceId:t}}),writeClipboard:(t)=>w({channel:f,v:h,type:"clipboard-write",id:m(i),payload:{text:t}}),compose:(t)=>w({channel:f,v:h,type:"compose",id:m(i),payload:t}),attach:(t)=>w({channel:f,v:h,type:"attach",id:m(i),payload:me(t)}),startSession:async(t)=>{if(t.projectId!==void 0)Z(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")Z(r.directory);else{if(r.name!==void 0)Z(r.name,200);if(r.baseBranch!==void 0)Z(r.baseBranch,200)}let a=await H({channel:f,v:h,type:"start-session",id:m(i),payload:Lt(t)},e.requestTimeoutMs??180000);if(!kt(a))throw new d("HOST_REJECTED","Host did not return a session.");return a},prompt:(t)=>H({channel:f,v:h,type:"prompt",id:m(i),payload:It(t)}).then((r)=>{if(!wt(r))throw new d("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>w({channel:f,v:h,type:"session-link",id:m(i),payload:me(t)}),close:()=>w({channel:f,v:h,type:"close",id:m(i)}),oauthStart:()=>w({channel:f,v:h,type:"oauth-start",id:m(i)}),oauthDisconnect:()=>w({channel:f,v:h,type:"oauth-disconnect",id:m(i)}),request:(t)=>(Xe(t.path)?H({channel:f,v:h,type:"request",id:m(i),payload:t}):Wo()).then((r)=>{if(!Be(r))throw new d("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Xe(t.path)?H({channel:f,v:h,type:"service-request",id:m(i),payload:t}):Wo()).then((r)=>{if(!Be(r))throw new d("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>H({channel:f,v:h,type:"service-status",id:m(i)}).then((t)=>{if(!Pt(t))throw new d("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(fe(t)?H({channel:f,v:h,type:"file-read",id:m(i),payload:{path:t}}):ze()).then((r)=>{if(!Nt(r))throw new d("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!fe(t))return ze();if(r.length>$e)return Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${$e} characters.`));return H({channel:f,v:h,type:"file-write",id:m(i),payload:{path:t,content:r}}).then((a)=>{if(!Dt(a))throw new d("HOST_REJECTED","Host did not confirm the write.");return a})},listDir:(t)=>(fe(t)?H({channel:f,v:h,type:"file-list",id:m(i),payload:{path:t}}):ze()).then((r)=>{if(!$t(r))throw new d("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(fe(t)?H({channel:f,v:h,type:"file-stat",id:m(i),payload:{path:t}}):ze()).then((r)=>{if(!Ht(r))throw new d("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),a=t.system?.trim();if(r.length===0||r.length>He)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${He} characters.`));if(a!==void 0&&(a.length===0||a.length>Fe))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${Fe} characters.`));let l=t.maxOutputTokens===void 0?void 0:Math.min(Ct,Math.max(1,Math.floor(t.maxOutputTokens)));if(l!==void 0&&!Number.isFinite(l))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let T={prompt:r};if(a!==void 0)T.system=a;if(l!==void 0)T.maxOutputTokens=l;return H({channel:f,v:h,type:"generate",id:m(i),payload:T},e.requestTimeoutMs??Ut).then((x)=>{if(!Ft(x))throw new d("HOST_REJECTED","Host did not return generated text.");return x})},setBadge:(t)=>w({channel:f,v:h,type:"badge",id:m(i),payload:{count:Mt(t)}}),setHeight:(t)=>w({channel:f,v:h,type:"resize",id:m(i),payload:{height:Gt(t)}}),onFileOpen:(t)=>{if(M.add(t),!ee)ee=!0,o.addEventListener("keydown",co,!0);if(N)t(N);return()=>{M.delete(t)}},onFileSnapshot:(t)=>(_=t,()=>{if(_===t)_=null}),onFileSaved:(t)=>(z.add(t),()=>{z.delete(t)}),reportFileChange:(t)=>pt({...O,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:ao,reportFileUnsupported:()=>pt({...O,type:"file-unsupported"}),dispose:()=>{for(let t of ae.keys())W({...O,type:"workspace-unsubscribe",id:m(i),payload:{subscriptionId:t}});ae.clear();for(let t of k.keys())W({...O,type:"shells-unsubscribe",id:m(i),payload:{subscriptionId:t}});if(k.clear(),v=!0,g=null,q=null,_=null,M.clear(),z.clear(),ee)o.removeEventListener("keydown",co,!0);o.removeEventListener("message",io),o.removeEventListener("keydown",lo,!0),o.removeEventListener("pointerover",Oe),o.removeEventListener("pointermove",Oe),o.removeEventListener("pointerout",po),o.removeEventListener("focus",uo),o.removeEventListener("blur",mo);for(let t of Q.values())clearTimeout(t.timer),t.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));Q.clear(),s.clear(),S.clear(),L.clear(),u.clear(),G.clear(),y.clear(),E.clear(),I.clear(),P.clear()}}};var Jo=X(()=>{Ce();gt();vt();Tt();Ve();St();d=class d extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}});var Yo,kn;var Qo=X(()=>{Yo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"],kn=new Set(Yo)});var Zo,On;var qo=X(()=>{Zo=["none","agent","user"],On=new Set(Zo)});var Vt=X(()=>{Ce();Ue();St();gt();bo();yo();Tt();Jo();vt();Ve();Ve();Qo();qo()});var Y=(e,o="",n="",p=[])=>{let s=document.createElement(e);if(o)s.className=o;if(n)s.textContent=n;if(p.length>0)s.append(...p);return s};var ir={};vr(ir,{FAILURE_TEXT:()=>Br,POLL_MS:()=>be,isOnScreen:()=>qe,portButton:()=>eo,requestStop:()=>jr,startPolling:()=>Kr});var be=2000,Br,Te=(e)=>typeof e==="object"&&e!==null,Vr=(e)=>Te(e)&&typeof e.at==="number"&&Te(e.system)&&Te(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&Te(e.history)&&Te(e.lmStudio),zr=(e)=>{if(!(e instanceof d))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},jr=async(e,o)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(o)})).status===200}catch{return!1}},eo=(e,o)=>{let n=Y("button","port",`:${o}`);return n.type="button",n.title=`Open http://localhost:${o}`,n.addEventListener("click",(p)=>{p.stopPropagation(),e.openUrl(`http://localhost:${o}`).catch(()=>{return})}),n},qe=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Kr=(e,o,n,p)=>{let s=!1,S=be,L=async()=>{if(s)return;s=!0;try{if(!qe(o))return;let E=await e.serviceRequest({method:"GET",path:"/snapshot"}),I;try{I=JSON.parse(E.body)}catch{I=null}if(E.status===200&&Vr(I)){n(I);let P=I.lmStudio;S=P.prefillProgress>0||P.generateTokens>0?100:be}else p(E.status===200?"bad-answer":"service-failed")}catch(E){p(zr(E))}finally{s=!1,setTimeout(()=>{L()},S)}};L();let u=qe(o),G=()=>{let E=qe(o);if(E&&!u)L();u=E};document.addEventListener("visibilitychange",G);let y=new ResizeObserver(G);return y.observe(document.documentElement),y.observe(o),{refresh:()=>{L()}}};var to=X(()=>{Vt();Br={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."}});Vt();var Ir=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Mr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],er=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,p]of Ir)o.style.setProperty(n,e.tokens[p]);for(let[n,p,s]of Mr){let S=e.tokens[s]??"";o.style.setProperty(n,S),o.style.setProperty(p,S)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},zt=(e,o)=>{if(er(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};Ue();var Gr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},b=(e,o)=>`var(--${e}, var(--oc-${Gr[e]}, ${o}))`,le=b("surface-background","transparent"),Ke=b("surface-elevated","transparent"),_e=b("surface-elevated-foreground","inherit"),ne=b("surface-foreground","inherit"),A=b("surface-muted-foreground","gray"),Pr=b("surface-muted","transparent"),J=b("interactive-border","currentColor"),j=b("interactive-hover","transparent"),de=b("interactive-active","transparent"),jt=b("interactive-selection","transparent"),Kt=b("interactive-selection-foreground","inherit"),rr=b("interactive-focus-ring","currentColor"),oe=b("primary","currentColor"),Wt=b("primary-text","inherit"),Jt=b("error-text","inherit"),Nr=b("font-sans","inherit"),Yt=b("font-mono","monospace"),nr=b("radius","9px"),Qt=`calc(${nr} - 2px)`,tr=`calc(${nr} - 4px)`,U=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,or=`box-shadow: 0 0 0 2px ${rr};`,We=(e)=>{let o=b(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${b(`${e}-text`,"inherit")}; }`},Dr=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,sr=`
.oc-sdk { color: ${ne}; font-family: ${Nr}; }
.oc-sdk :focus-visible { outline: none; ${or} }
.oc-sdk-mono { font-family: ${Yt}; }
.oc-sdk-muted { color: ${A}; }
${We("success")}${We("warning")}${We("error")}${We("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${oe}; --oc-sdk-tone-text: ${Wt}; }

.oc-sdk-btn { border-radius: ${Qt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${tr}; }
.oc-sdk-btn[data-variant="default"] { color: ${Wt}; background: ${U(oe,10,le)}; border-color: ${U(oe,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${U(oe,16,le)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${U(oe,22,le)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Pr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Ke}; color: ${_e}; border-color: ${J}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${j}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${de}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${b("status-error","red")}; color: ${Jt}; background: ${U("var(--oc-sdk-tone)",7,le)}; border-color: ${U("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${U("var(--oc-sdk-tone)",9,le)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${U("var(--oc-sdk-tone)",11,le)}; }

.oc-sdk-field-note { color: ${A}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Jt}; }
.oc-sdk-input { border-radius: ${Qt}; background: ${Ke}; color: ${_e}; box-shadow: inset 0 0 0 1px ${U(J,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${A}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${rr}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${b("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${b("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Yt}; }

.oc-sdk-search-icon { color: ${A}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${oe}; }
.oc-sdk-search-clear { border-radius: ${tr}; color: ${A}; }
.oc-sdk-search-clear:hover { background: ${j}; color: ${ne}; }

.oc-sdk-trigger { border-color: ${J}; border-radius: ${Qt}; background: ${Ke}; color: ${_e}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${A}; }
.oc-sdk-trigger-chevron { color: ${A}; }
.oc-sdk-popup { --surface-foreground: ${_e}; border-color: ${U(J,60)}; border-radius: 12px; background: ${Ke}; color: ${_e}; box-shadow: 0 8px 24px ${U(ne,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${j}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${jt}; color: ${Kt}; }
.oc-sdk-option-check { color: ${ne}; }
.oc-sdk-option[data-destructive="true"] { color: ${Jt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${U(b("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${A}; }
.oc-sdk-popup-empty { color: ${A}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${J}; border-radius: 4px; color: ${ne}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${U(ne,60,J)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${J}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${le}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${oe}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${or} }
.oc-sdk-check-desc { color: ${A}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${U(ne,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${A}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${ne}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Kt}; background: ${jt}; border-color: ${J}; }
.oc-sdk-tab-count { color: ${A}; }

.oc-sdk-badge { border-radius: 9999px; background: ${j}; color: ${A}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${U("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${j}; }
.oc-sdk-row[aria-selected="true"] { background: ${jt}; color: ${Kt}; }
.oc-sdk-row-lead { font-family: ${Yt}; color: ${A}; }
.oc-sdk-row-sub { color: ${A}; }
.oc-sdk-row-meta { color: ${A}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${A}; }

.oc-sdk-empty-body { color: ${A}; }

.oc-sdk-spinner { color: ${A}; }
.oc-sdk-spinner-ring { border-color: ${J}; border-top-color: ${oe}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${U("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${U("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${A}; }

.oc-sdk-separator { color: ${A}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${U(J,40)}; }

.oc-sdk-progress-label { color: ${A}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${J}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${oe}); }

.oc-sdk-text a { color: ${Wt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${U(J,60)}; }
`,F=`
${ft}
${Dr}
${sr}`;Ue();to();var Wr="en";var et=(e,o)=>new Intl.NumberFormat(Wr,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e),tt=(e)=>{let o=["B","KB","MB","GB","TB"],n=Math.max(0,e),p=0;while(n>=1024&&p<o.length-1)n/=1024,p+=1;let s=p>=3&&n<100?1:0;return`${et(n,s)} ${o[p]}`},ot=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${et(e,e<10?1:0)}%`},ye=(e)=>`${et(e,1)}%`;var ar=(e)=>{if(e===0)return"0 KB/s";if(e<=0)return"0 B/s";let o=["B/s","KB/s","MB/s","GB/s","TB/s"],n=e,p=0;while(n>=1024&&p<o.length-1)n/=1024,p+=1;let s=p>=3&&n<100?1:0;return`${et(n,s)} ${o[p]}`},cr=(e,o)=>`上傳 ${ar(e)} · 下載 ${ar(o)}`;var lr=`
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .num { font-variant-numeric: tabular-nums; }
  .muted { color: var(--oc-muted); }
  .chart { position: relative; width: 100%; overflow: hidden; }
  .chart svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .chart-grid { stroke: var(--oc-border); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: .5; fill: none; }
  .chart-cursor, .chart-dot, .chart-tip { position: absolute; pointer-events: none; opacity: 0; }
  .chart.hovering .chart-cursor, .chart.hovering .chart-dot, .chart.hovering .chart-tip { opacity: 1; }
  .chart-cursor { top: 0; bottom: 0; left: 0; width: 1px; background: var(--oc-border); }
  .chart-dot { top: -3px; left: -3px; width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 0 2px color-mix(in srgb, var(--oc-fg) 4%, var(--oc-bg)); }
  /* Floats like the app's dropdowns: lit top edge and hairline rings instead of a border. The chart clips,
     so only the rings and the tightest shadow. */
  .chart-tip { top: 2px; padding: 1px 6px; border-radius: 4px; white-space: nowrap; font-size: 11px;
    background: var(--oc-elevated); color: var(--oc-elevated-fg); font-variant-numeric: tabular-nums;
    box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .8), inset 0 0 0 1px rgb(0 0 0 / .04), 0 0 0 1px rgb(0 0 0 / .1), 0 1px 2px -.5px rgb(0 0 0 / .08); }
  [data-oc-theme="dark"] .chart-tip { box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .06), inset 0 0 0 1px rgb(255 255 255 / .08),
    0 0 0 1px rgb(0 0 0 / .36), 0 1px 1px -.5px rgb(0 0 0 / .22); }
  .port { display: inline-flex; align-items: center; height: 18px; padding: 0 6px; border: 0; border-radius: 4px; font: 11px var(--oc-mono); cursor: pointer;
    background: color-mix(in srgb, var(--oc-primary) 14%, transparent); color: var(--oc-primary-text, var(--oc-primary)); }
  .port:hover, .port:focus-visible { outline: none; background: color-mix(in srgb, var(--oc-primary) 24%, transparent); }
`,dr=`
  html, body { height: 100%; overflow-y: auto; overflow-x: hidden; }
  #root { display: flex; flex-direction: column; gap: 14px; padding: 12px 12px 20px; }
  .head { display: flex; align-items: flex-start; gap: 8px; }
  .head .titles { min-width: 0; flex: 1; }
  .host-name { font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .host-meta { color: var(--oc-muted); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .live { display: inline-flex; align-items: center; gap: 6px; color: var(--oc-muted); font-size: 11px; white-space: nowrap; padding-top: 2px; }
  .live::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--oc-success); }
  .live.stale::before { background: var(--oc-muted); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
  /* Cards are flat and set apart by tone, like the app's tiles: no border. */
  .card { min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 12px;
    border-radius: var(--oc-radius); background: color-mix(in srgb, var(--oc-fg) 4%, transparent); }
  .card-top { display: flex; align-items: baseline; gap: 8px; }
  .label { font-size: 11px; font-weight: 600; letter-spacing: .02em; color: var(--oc-muted); text-transform: uppercase; }
  .big { font-size: 22px; font-weight: 600; line-height: 1.1; letter-spacing: -.01em; }
  .card-top .grow { flex: 1; }
  .sub { color: var(--oc-muted); font-size: 11px; }
  .lm-row { display: flex; align-items: baseline; justify-content: space-between; padding: 2px 0; }
  .lm-label { color: var(--oc-muted); font-size: 11px; }
  .lm-state-loaded { color: var(--oc-success); }
  .lm-state-loading { color: var(--oc-info); }
  .lm-state-unloaded { color: var(--oc-muted); }
  .lm-state-error { color: var(--oc-error); }
  .lm-state-mixed { color: color-mix(in srgb, var(--oc-warning) 80%, transparent); }
  .lm-state-dim { color: color-mix(in srgb, var(--oc-fg) 70%, transparent); }
  .lm-spec-context { color: var(--oc-muted); font-size: 11px; }
  .lm-detail { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
  .lm-model-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 4px 0; }
  .lm-model-info { min-width: 0; display: flex; flex-direction: column; gap: 1px; }
  .lm-model-name { font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .lm-model-meta { font-size: 10px; color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .lm-model-right { display: flex; gap: 4px; flex: none; }
  .lm-pill { font-size: 10px; padding: 0 4px; border-radius: 4px; line-height: 14px; }
  .lm-pill-loaded { background: color-mix(in srgb, var(--oc-success) 16%, transparent); color: var(--oc-success); }
  .lm-pill-loading { background: color-mix(in srgb, var(--oc-info) 16%, transparent); color: var(--oc-info); }
  .lm-pill-not-loaded { background: color-mix(in srgb, var(--oc-fg) 8%, transparent); color: var(--oc-muted); }
  .lm-pill-ctx { background: color-mix(in srgb, var(--oc-fg) 8%, transparent); color: var(--oc-muted); }
  .lm-more { font-size: 10px; color: var(--oc-muted); }
  /* A track inside a card is the next tone step; segments part by a 1px gap. */
  .stack { display: flex; gap: 1px; height: 8px; border-radius: 4px; overflow: hidden; background: color-mix(in srgb, var(--oc-fg) 8%, transparent); }
  .stack > span { height: 100%; transition: width .4s ease; }
  .legend { display: flex; flex-direction: column; gap: 4px; }
  .legend-row { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto auto; align-items: center; gap: 8px; }
  .legend-row .swatch { width: 8px; height: 8px; border-radius: 2px; }
  .legend-row .name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .legend-row .value { text-align: right; min-width: 56px; }
  .section { display: flex; flex-direction: column; gap: 6px; }
  .section-head { display: flex; align-items: baseline; gap: 8px; padding: 0 2px; }
  .section-head .grow { flex: 1; }
  .empty { color: var(--oc-muted); padding: 6px 2px; }
  .origin { font-size: 10px; padding: 0 5px; border-radius: 4px; line-height: 16px; background: color-mix(in srgb, var(--oc-fg) 6%, transparent); color: var(--oc-muted); flex: none; }
  /* Lists sit on the panel itself, grouped by space: lines only under the column header and between groups. */
  .list { display: flex; flex-direction: column; }
  .cols, .row, .group-head { display: grid; grid-template-columns: minmax(0, 1fr) auto 56px 72px; align-items: center; column-gap: 8px; }
  .action { display: flex; align-items: center; justify-content: flex-end; }
  .action:empty { display: block; }
  .cols { padding: 0 2px 4px; color: var(--oc-muted); font-size: 11px; border-bottom: 1px solid var(--oc-border); }
  .cell { text-align: right; white-space: nowrap; }
  .quiet { color: var(--oc-muted); }
  /* Three levels, told apart by size, weight and indent rather than boxes:
     group heading, rows on a rail in the group's colour, unfolded members deeper and quieter. */
  .row { padding: 7px 2px; }
  .group { display: flex; flex-direction: column; padding: 4px 0 10px; border-bottom: 1px solid var(--oc-border); }
  .group-head { padding: 12px 2px 6px; font-size: 13px; }
  .group-head .cell { font-weight: 600; }
  .group > .row, .group > .job-wrap { margin-left: 4px; padding-left: 12px;
    border-left: 2px solid color-mix(in srgb, var(--group-color, var(--oc-border)) 40%, transparent); }
  .group > .row { padding-top: 5px; padding-bottom: 5px; }
  .group > .job-wrap > .row { padding: 5px 2px; }
  .group .row .cell { color: color-mix(in srgb, var(--oc-fg) 80%, transparent); }
  .group .row .cell.quiet { color: var(--oc-muted); }
  .gname { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .gname b { font-weight: 650; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .count { color: var(--oc-muted); font-weight: 400; }
  .dot { flex: none; width: 6px; height: 6px; border-radius: 50%; }
  .who { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .title-line { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .pname { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
  .pname.strong { font-weight: 600; flex: none; max-width: 50%; }
  .pdetail { color: var(--oc-muted); font: 11px/1.35 var(--oc-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .job.foldable, .group-head.foldable { cursor: pointer; }
  .group-head.foldable .gname::before { content: ''; flex: none; width: 0; height: 0; margin-right: 1px;
    border-left: 4px solid var(--oc-muted); border-top: 3.5px solid transparent; border-bottom: 3.5px solid transparent; transition: transform .15s ease; }
  .group-head.foldable.open .gname::before { transform: rotate(90deg); }
  /* Focus draws no ring, like the app: a focused row takes the hover fill. */
  .group-head.foldable:focus-visible, .job.foldable:focus-visible { outline: none; border-radius: 4px; background: var(--oc-hover); }
  .job.foldable .title-line::before { content: ''; flex: none; width: 0; height: 0; margin: 0 2px 0 1px;
    border-left: 4px solid var(--oc-muted); border-top: 3.5px solid transparent; border-bottom: 3.5px solid transparent; transition: transform .15s ease; }
  .job.foldable.open .title-line::before { transform: rotate(90deg); }
  .job-wrap.open .pdetail { white-space: normal; overflow-wrap: anywhere; }
  .pdetail { user-select: text; }
  .members { display: flex; flex-direction: column; padding: 0 0 6px 16px; }
  .row.member { padding: 3px 2px; font-size: 11.5px; }
  .row.member .pname { color: var(--oc-muted); }
  .row.member .pdetail { font-size: 10.5px; }
  .group .row.member .cell { color: var(--oc-muted); }
  .more { color: var(--oc-muted); padding: 2px 2px 4px; font-size: 11px; }
  /* Stop is a text button: no fill, it only changes colour, and asks once before acting. */
  .stop { flex: none; padding: 0 2px; border: 0; background: none; font: 11px var(--oc-font); color: var(--oc-muted); cursor: pointer; }
  .stop:hover, .stop:focus-visible { color: var(--oc-error-text, var(--oc-error)); }
  .stop.armed { color: var(--oc-error-text, var(--oc-error)); font-weight: 600; }
  .stop:disabled { cursor: default; opacity: .6; }
  .stop:focus-visible { outline: none; }
  /* The tint says warning or error; no border. */
  .banner { padding: 8px 12px; border-radius: var(--oc-radius);
    background: color-mix(in srgb, var(--oc-warning) 10%, transparent); color: var(--oc-warning-text, var(--oc-fg)); }
  .banner.error { background: color-mix(in srgb, var(--oc-error) 10%, transparent);
    color: var(--oc-error-text, var(--oc-fg)); }
  .footnote { color: var(--oc-muted); font-size: 11px; padding: 0 2px; }
  [hidden] { display: none !important; }
`,pr=`
  html, body { overflow: hidden; }
  #root { display: flex; flex-direction: column; gap: 6px; padding: 2px 0 4px; }
  .line { display: grid; grid-template-columns: 84px minmax(0, 1fr) auto; align-items: center; gap: 8px; min-height: 18px; }
  .line .what { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line .value { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .meter { position: relative; height: 4px; border-radius: 2px; background: color-mix(in srgb, var(--oc-fg) 8%, transparent); overflow: hidden; }
  .meter > span { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 2px; transition: width .4s ease; }
  .meter-empty { height: 4px; }
  .ports { display: flex; flex-wrap: wrap; gap: 4px; min-width: 0; }
  .note { color: var(--oc-muted); }
  .note.error { color: var(--oc-error-text, var(--oc-fg)); }
  [hidden] { display: none !important; }

  /* LM Studio status rows */
  .lm-status { display: grid; grid-template-columns: 84px minmax(0, 1fr) auto; align-items: center; gap: 8px; min-height: 18px; }
  .lm-status .what { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .lm-status .value { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .state-loaded { color: var(--oc-success-text, var(--oc-success)); font-weight: 600; }
  .state-unloaded { color: var(--oc-muted); }
  .state-loading { color: var(--oc-warning-text, var(--oc-warning)); font-weight: 600; }
  .state-error { color: var(--oc-error-text, var(--oc-error)); font-weight: 600; }
`;var ur=90;var Jr=0,se=(e,o)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[p,s]of Object.entries(o))n.setAttribute(p,String(s));return n},mr=(e)=>{let o=document.createElement("div");o.className="chart",o.style.height=`${e.height}px`;let n=e.height,p=se("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),s=`fill-${++Jr}`,S=se("defs",{}),L=se("linearGradient",{id:s,x1:0,x2:0,y1:0,y2:1});L.append(se("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),se("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),S.append(L);let u=se("path",{d:"",class:"chart-grid"}),G=se("path",{d:"",fill:`url(#${s})`}),y=se("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});p.append(S,u,G,y);let E=document.createElement("div");E.className="chart-cursor";let I=document.createElement("div");I.className="chart-dot",I.style.background=e.color;let P=document.createElement("div");P.className="chart-tip",o.append(p,E,I,P);let g=[],q=1,M=null,z=null,_=(k,v)=>(e.capacity-v+k)/Math.max(1,e.capacity-1)*300,N=(k)=>n-1-Math.min(k,q)/q*(n-1-2),ee=()=>{let k=M===null?void 0:g[M];if(M===null||k===void 0){o.classList.remove("hovering");return}o.classList.add("hovering");let v=o.getBoundingClientRect(),i=_(M,g.length)/300*v.width,c=N(k)/n*v.height;E.style.transform=`translateX(${i}px)`,I.style.transform=`translate(${i}px, ${c}px)`;let D=(g.length-1-M)*e.intervalSeconds;P.textContent=`${e.format(k)} · ${D===0?"now":`${D} s ago`}`;let te=i>v.width/2;P.style.left=te?"":`${i+8}px`,P.style.right=te?`${v.width-i+8}px`:""},Q=(k)=>{if(g.length===0)return;let v=o.getBoundingClientRect(),i=(k-v.left)/v.width*(e.capacity-1),c=Math.round(i-(e.capacity-g.length));M=Math.min(g.length-1,Math.max(0,c)),ee()};return o.addEventListener("pointermove",(k)=>{z=k.clientX,Q(k.clientX)}),o.addEventListener("pointerleave",()=>{z=null,M=null,ee()}),{element:o,update:(k,v)=>{if(g=k,q=v>0?v:1,u.setAttribute("d",[0.25,0.5,0.75].map((i)=>`M0 ${n*i} H300`).join(" ")),g.length===0)G.setAttribute("d",""),y.setAttribute("d","");else{let i=g.map((ce,ke)=>`${_(ke,g.length).toFixed(2)} ${N(ce).toFixed(2)}`),c=g.length===1,D=c?`M${_(0,1)-2} ${i[0]?.split(" ")[1]} L${i[0]}`:`M${i.join(" L")}`;y.setAttribute("d",D);let te=c?_(0,1)-2:_(0,g.length);G.setAttribute("d",`${D} L300 ${n} L${te.toFixed(2)} ${n} Z`)}if(z!==null)Q(z)}}};var K=Bt(),Ae=document.querySelector("#root");if(!Ae)throw Error("Missing #root");var Er=document.createElement("style");Er.textContent=lr+dr+pr;document.head.append(Er);var Yr=be/1000,Sr=mr({color:"var(--oc-primary)",height:18,capacity:ur,format:(e)=>`${e}ms`,intervalSeconds:Yr}),no=(e)=>{let o=Y("span","meter-fill");return o.style.background=e,{element:Y("div","meter","",[o]),set:(p)=>{o.style.width=`${Math.min(100,Math.max(0,p))}%`}}},xr=no("var(--oc-info)"),gr=no("var(--oc-success)"),ro=no("var(--oc-success)"),ie=(e,o,n,p)=>{let s=Y("div","line","",[Y("span","what",e),o??Y("div","meter-empty"),Y("span","value num",n)]);if(p)s.title=p;return s},rt=ie("OpenChamber",Sr.element,"–","Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU counts 100% per core."),nt=ie("CPU",xr.element,"–"),st=ie("Memory",gr.element,"–"),it=ie("Network",null,"—","Upload and download speed from active interfaces."),at=ie("LLM Status",null,"—","Model load state: mounted (loaded) or unmounted (unloaded)."),ct=ie("Prefill",ro.element,"—","Prompt processing progress percentage."),lt=ie("Generate",null,"—","Number of tokens generated in the current run."),ve=ie("Dev servers",null,""),fr=Y("div","ports"),pe=Y("div","note","Reading…");Ae.append(pe,rt,nt,st,it,at,ct,lt,ve);var Qr=()=>{for(let e of[rt,nt,st,it,at,ct,lt,ve])e.hidden=!0};var dt=!1;var Zr=()=>[{kind:"button",id:"eject-model",label:"Eject"},{kind:"button",id:"refresh-build",label:"Refresh"}],Ee=async()=>{if(!dt)return;let e=Zr();await K.setStatusControls(e).catch(()=>{return})},qr=(e)=>{let{system:o,app:n}=e;nt.hidden=!1,st.hidden=!1;let p=o.cpu??0;xr.set(o.cpu!==null?p:0),nt.querySelector(".value").textContent=ot(o.cpu);let s=Math.round(o.memoryUsed/Math.max(1,o.memoryTotal)*100);gr.set(s),st.querySelector(".value").textContent=`${tt(o.memoryUsed)} / ${tt(o.memoryTotal)} · ${ot(s)}`,it.hidden=!1;let S=it.querySelector(".value");S.textContent=cr(o.networkSpeedUp,o.networkSpeedDown),rt.hidden=e.warnings.includes("processes-unavailable");let L=rt.querySelector(".value");L.textContent=`${tt(n.memory)} · ${ot(n.cpu)}`,Sr.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),at.hidden=!1,ct.hidden=!1,lt.hidden=!1;let{lmStudio:u}=e,y=(Array.isArray(u.models)?u.models.find((_)=>_.id===u.modelName):void 0)?.displayName||u.modelName,E;if(u.modelName)switch(u.state){case"loaded":E=y??"—";break;case"loading":E=`${y} · 載入中 ${ye(u.prefillProgress)}`;break;case"unloaded":E=y?`${y} · 卸載`:"卸載";break;case"error":E=y?`${y} · 錯誤`:"錯誤";break;default:E=y??"—"}else switch(u.state){case"loaded":E="掛載";break;case"unloaded":E="卸載";break;case"loading":E=`載入中 ${ye(u.prefillProgress)}`;break;case"error":E="錯誤";break;default:E="—"}let I=at.querySelector(".value");I.textContent=E,I.className=u.state==="loaded"?"value num lm-state-loaded lm-state-dim":`value num lm-state-${u.state}`;let P=ct.querySelector(".value"),g=lt.querySelector(".value");if(u.prefillProgress>0||u.generateTokens>0||u.tokensPerSecond&&u.tokensPerSecond>0){let _=u.prefillProgress>0&&u.prefillProgress<100?u.prefillProgress:100,N=u.prefillTokensPerSecond;P.textContent=N&&N>0?`${ye(_)} · ${N.toFixed(1)} tok/s`:ye(_),ro.set(_);let ee=u.tokensPerSecond;if(ee&&ee>0){let Q=u.generateTokens>0?`${u.generateTokens.toLocaleString()} tokens · `:"";g.textContent=`${Q}${ee.toFixed(1)} tok/s`}else if(u.generateTokens>0)g.textContent=u.generateTokens.toLocaleString();else g.textContent="—"}else P.textContent="—",ro.set(0),g.textContent="—";let M=[...new Set(e.servers.flatMap((_)=>_.ports))].sort((_,N)=>_-N);if(M.length>0&&!e.warnings.includes("processes-unavailable")){ve.hidden=!1,fr.replaceChildren(...M.slice(0,6).map((N)=>eo(K,N)));let _=ve.querySelector(".value");if(_.replaceChildren(...fr.children),M.length>6)_.appendChild(Y("span","muted",` +${M.length-6}`))}else ve.hidden=!0;let z=e.warnings.includes("processes-unavailable");pe.hidden=!z,pe.className=z?"note error":"note",pe.textContent=z?"Could not read the process list; showing system totals only.":""},Se=null,en=async()=>{try{let e=await K.serviceRequest({method:"POST",path:"/build"});if(e.status===200)Se?.refresh();else{let o=e.body?JSON.parse(e.body):null;if(!Se?.refresh)await K.toast({kind:"error",message:o?.error??"Build failed"})}}catch{}},tn=async()=>{try{let e=await K.serviceRequest({method:"POST",path:"/unload"});if(e.status===200)Se?.refresh();else if(e.status===409){let o=e.body?JSON.parse(e.body):null;await K.toast({kind:"info",message:o?.error==="no-loaded-model"?"No model currently loaded.":o.error??"Unloading failed"})}else{let o=e.body?JSON.parse(e.body):null;if(!Se?.refresh)await K.toast({kind:"error",message:o?.error??"Loading/unload failed"})}}catch{}},on={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."};function rn(e){pe.hidden=!1,pe.className="note error",pe.textContent=on[e]??"Could not reach the monitoring service.",Qr()}var hr=!1;K.onReady(async(e)=>{if(zt(e,document.documentElement),hr)return;hr=!0,dt=e.features?.statusControls===!0,Ee(),K.onStatusControl((s)=>{if(s.id==="eject-model")tn();else if(s.id==="refresh-build")en()});let{startPolling:o}=await Promise.resolve().then(() => (to(),ir));Se=o(K,Ae,(s)=>{qr(s)},rn),Se?.refresh();let n=null;K.onDirectory((s)=>{if(n!==s)n=s,Ee()});let p=null;K.onSession((s)=>{let S=s?.id??"";if(p!==S)p=S,Ee()})});var oo=-1;new ResizeObserver(()=>{let e=Math.ceil(Ae.getBoundingClientRect().height);if(e===oo)return;if(oo=e,K.setHeight(e).catch(()=>{return}),dt&&oo>0)Ee()}).observe(Ae);document.addEventListener("visibilitychange",()=>{if(dt&&document.visibilityState==="visible")Ee()});Ee().catch(()=>{return});})();
