(()=>{var _r=Object.defineProperty;var Tr=(e)=>e;function br(e,o){this[e]=Tr.bind(null,o)}var yr=(e,o)=>{for(var n in o)_r(e,n,{get:o[n],enumerable:!0,configurable:!0,set:br.bind(o,n)})};var X=(e,o)=>()=>(e&&(o=e(e=0)),o);var f="openchamber.sdk",E=1;var Oe=()=>{};function mo(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(p)=>{let l=p.target===e?o:p.target;if(!(l instanceof Element))return;if(!l.hasAttribute("data-oc-scrolling"))l.setAttribute("data-oc-scrolling","");let A=n.get(l);if(A!==void 0)clearTimeout(A);n.set(l,setTimeout(()=>{n.delete(l),l.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var ut=`
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
`,Ar;var Re=X(()=>{Ar=`(${mo.toString()})(document);`});var mt=128,ft=65536;var Ce=128,Ue=65536;var Et=()=>{};var xo,fo=(e)=>Object(e)===e&&!Array.isArray(e),ht=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),Eo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,ho=(e)=>String(e)===e&&e.length>=1&&e.length<=80,So=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!fo(n)||!xo.test(n.id)||!Eo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!ht(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!ht(n,["kind","id","label","value","options","disabled"]))return!1;if(!ho(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let p=new Set;for(let l of n.options){if(!fo(l)||!ht(l,["value","label"])||!ho(l.value)||!Eo(l.label)||p.has(l.value))return!1;p.add(l.value)}if(!p.has(n.value))return!1}return!0};var xt=X(()=>{xo=/^[a-z][a-z0-9-]{0,39}$/});var go=()=>{};var _o=()=>{};var Le=20000000,Ie=256,St=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,To=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var gt=()=>{};var bo,yo,Ao=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let p=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let l of p)if(!Ao(l,o+1,n))return!1;return!0},_t=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(_t);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(_t)}return String(e)===e||Number.isFinite(e)},Tt=(e)=>{try{if(String(e.id)!==e.id||!bo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!yo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Ao(e.data)||!_t(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var bt=X(()=>{bo=/^[A-Za-z0-9_-]{1,80}$/,yo=["left","right","top","bottom"]});var ko,At=(e)=>Boolean(e&&"sessionId"in e),vt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),wo,kt=(e)=>wo.test(e),Me=500,Ge=32000,Oo=16000,Ro=128,Co=200,Uo=2000,Lo=16000,Io=80,Mo=200,Go=16000,Po=2000,wt=20000,Pe=1024,Ne=2000000,De=64000,$e=8000,Ot=4000,Rt=90000,No=999,Do=1e4,xe=500,$o,Ho,vr,Fo=(e)=>vr.has(e),Xo=(e)=>e&&Fo(e)?e:"HOST_REJECTED",ue=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ue);if(Object(e)===e)return Object.values(e).every(ue);return!1},Bo=(e)=>ue(e)&&JSON.stringify(e).length<=Go,vo=(e)=>e?.trim().slice(0,Mo)??"",me=(e)=>{let o=e.id.trim().slice(0,Ro),n=e.title.trim().slice(0,Co),p=e.url.trim().slice(0,Uo),l=e.text?.trim().slice(0,Lo),A=e.author?.trim().slice(0,Io),L=e.kind==="pull"?"pull":"issue",u={providerId:e.providerId.trim(),id:o,title:n||o,url:p,kind:L};if(l)u.text=l;if(A)u.author=A;if(L==="pull"){let M=vo(e.branches?.head),h=vo(e.branches?.base);if(M&&h)u.branches={head:M,base:h}}if(Bo(e.data))u.data=e.data;return u},Ct=(e)=>{let o=me(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},Ut=(e)=>{let o={text:e.text.trim().slice(0,Oo)};if(e.send)o.send=!0;return o},Lt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(No,Math.max(0,Math.round(e)))},It=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Do,Math.max(0,Math.ceil(e)))},fe=(e)=>e.length>0&&e.length<=Pe&&!e.includes("\x00")&&!e.includes("\\"),He=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Po)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},kr,Mt=(e)=>Boolean(e&&"status"in e&&kr.has(String(e.status))&&!("body"in e)),Fe=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Gt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Pt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Nt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),wr,Dt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&wr.has(String(e.kind))&&Number.isFinite(e.size)),$t=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Or,Rr=(e)=>Object(e)===e?e:null,yt=(e)=>String(e)===e&&e.length>0,Cr=(e)=>{if(!yt(e.id))return null;if(e.ok===!0){let o={channel:f,v:E,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&yt(e.error))return{channel:f,v:E,type:"result",id:e.id,ok:!1,error:e.error,code:Xo(yt(e.code)?e.code:void 0)};return null},Ht=(e)=>{let o=Rr(e);if(!o||o.channel!==f||o.v!==E)return null;if(o.type==="result")return Cr(o);if(!Or.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Xe=X(()=>{Oe();ko=["file","directory","other","missing"],wo=/^[0-9a-f]{7,64}$/i,$o=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ho=["stopped","starting","ready","failed"],vr=new Set($o),kr=new Set(Ho),wr=new Set(ko),Or=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"])});var Vo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Ur=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",d,zo=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Be=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${Pe} characters without NUL or backslash.`)),Ve=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},m=(e)=>(e.value+=1,`oc-${e.value}`),Ft=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),p=e.requestTimeoutMs??wt,l=new Set,A=new Set,L=new Set,u=new Set,M=new Set,h=new Set,x=new Set,P=new Set,F=new Set,b=null,Z=null,I=new Set,z=new Set,g=null,G=null,q=!1,Y=new Map,ae=new Map,k=new Map,y=!1,s={value:0},a=null,N=null,ee=!1,ce=!1,Ae=null,oo=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},K=(t)=>{o.parent.postMessage(t,"*")},C=(t,r)=>{for(let i of t)try{i(r)}catch(c){console.error(c)}},ro=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=Ht(t.data);if(!r)return;if(r.type==="workspace"){let c=ae.get(r.payload.subscriptionId);if(c)C([c],r.payload.snapshot);return}if(r.type==="shells"){let c=k.get(r.payload.subscriptionId);if(c)C([c],r.payload.snapshot);return}if(r.type==="ready"){if(a=r.payload,N=oo(r.payload.session),C(l,r.payload),C(A,r.payload.directory),C(L,r.payload.session),N)C(u,N);C(M,r.payload.connection),C(h,r.payload.settings),C(x,r.payload.item);return}if(r.type==="directory"){if(a)a={...a,directory:r.payload.directory};C(A,r.payload.directory);return}if(r.type==="session"){if(a)a={...a,session:r.payload.session};if(!r.payload.session)N=null;else if(N?.sessionId!==r.payload.session.id)N=oo(r.payload.session);C(L,r.payload.session);return}if(r.type==="session-lifecycle"){N=r.payload,C(u,r.payload);return}if(r.type==="connection"){if(a)a={...a,connection:r.payload.connection};C(M,r.payload.connection);return}if(r.type==="settings"){if(a)a={...a,settings:r.payload.settings};C(h,r.payload.settings);return}if(r.type==="item"){if(a)a={...a,item:r.payload.item};C(x,r.payload.item);return}if(r.type==="status-control-event"){C(P,r.payload);return}if(r.type==="popover-closed"){C(F,r.payload);return}if(r.type==="action"){let c=(S)=>{if(!y)K({channel:f,v:E,type:"action-result",id:r.id,payload:S})},_=Z;if(!_){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>_(r.payload)).then(()=>c({ok:!0}),(S)=>{let R=(S instanceof Error?S.message:String(S)).trim();c({ok:!1,error:(R||"Action failed.").slice(0,xe)})});return}if(r.type==="file-open"){let c=r.payload;if(G&&To(G,c))return;G=c,C(I,r.payload);return}if(r.type==="file-saved"){C(z,r.payload.version);return}if(r.type==="file-snapshot"){let c=(R)=>{if(!y)K({channel:f,v:E,type:"file-snapshot-result",id:r.id,payload:R})},_=(R)=>c({error:(R.trim()||"Could not read the edited file.").slice(0,xe)}),S=g;if(!S){_("This extension does not edit files.");return}Promise.resolve().then(()=>S(r.payload.purpose)).then((R)=>{if(St(R)>Le){_(`The file is over ${Le} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>Ie){_(`The snapshot version is over ${Ie} characters.`);return}c({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},(R)=>_(R instanceof Error?R.message:String(R)));return}if(r.type==="resolve"){let c=(S)=>{K({channel:f,v:E,type:"resolve-result",id:r.id,payload:S})},_=b;if(!_){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>_(r.payload)).then((S)=>c({item:S?me(S):null}),(S)=>{let R=(S instanceof Error?S.message:String(S)).trim();c({error:(R||"Command failed.").slice(0,xe)})});return}let i=Y.get(r.id);if(!i)return;if(clearTimeout(i.timer),Y.delete(r.id),r.ok){i.resolve(r.payload);return}i.reject(new d(r.code,r.error))};o.addEventListener("message",ro),K({channel:f,v:E,type:"hello"});let D=(t,r=p)=>{if(y||o.parent===o)return Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((i,c)=>{let _=setTimeout(()=>{Y.delete(t.id),c(new d("HOST_TIMEOUT","Host did not answer in time."))},r);Y.set(t.id,{resolve:i,reject:c,timer:_}),K(t)})},w=(t)=>D(t).then(()=>{return}),O={channel:f,v:E},lt=(t)=>{if(!y&&o.parent!==o)K(t)},no=()=>lt({...O,type:"file-save"}),so=(t)=>{if(!Vo(t)||!Ur(t))return;t.preventDefault(),no()},io=(t)=>{if(!Vo(t)||t.key!=="Escape"||a?.surface!=="popover"||!a.popover)return;t.preventDefault(),po(a.popover.id,"escape").catch(()=>{return})},ve=()=>{let t=a?.surface==="popover"?a.popover:void 0;if(!t)return;let r=ee||ce;if(Ae===r)return;Ae=r,uo(t.id,r).catch(()=>{return})},ke=()=>{if(a?.surface!=="popover"||ee)return;ee=!0,ve()},ao=(t)=>{if(a?.surface!=="popover"||t.relatedTarget!==null||!ee)return;ee=!1,ve()},co=()=>{if(a?.surface!=="popover"||ce)return;ce=!0,ve()},lo=()=>{if(a?.surface!=="popover"||!ce)return;ce=!1,ve()},Q=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new d("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},dt=async(t)=>{if(t.kind!=="projects")Q(t.projectId);let r=await D({...O,type:"workspace-read",id:m(s),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return r},pt=async(t,r)=>{if(t.kind!=="projects")Q(t.projectId);let i=m(s);ae.set(i,r);try{await w({...O,type:"workspace-subscribe",id:m(s),payload:{subscriptionId:i,query:t}})}catch(c){if(ae.delete(i),!y)K({...O,type:"workspace-unsubscribe",id:m(s),payload:{subscriptionId:i}});throw c}return()=>{if(!ae.delete(i)||y)return;K({...O,type:"workspace-unsubscribe",id:m(s),payload:{subscriptionId:i}})}},gr=async(t,r)=>{if(t.kind==="session")Q(t.sessionId);if(t.kind==="project")Q(t.projectId);let i=m(s);k.set(i,r);try{await w({...O,type:"shells-subscribe",id:m(s),payload:{subscriptionId:i,scope:t}})}catch(c){if(k.delete(i),!y)K({...O,type:"shells-unsubscribe",id:m(s),payload:{subscriptionId:i}});throw c}return()=>{if(!k.delete(i)||y)return;K({...O,type:"shells-unsubscribe",id:m(s),payload:{subscriptionId:i}})}},we=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>mt))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ue(t.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>ft)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&a?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let r=await D({...O,type:"storage",id:m(s),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new d("HOST_REJECTED","Host did not return storage data.");return r},po=(t,r)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-close",id:m(s),payload:r?{id:t,reason:r}:{id:t}}),uo=(t,r)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-anchor",id:m(s),payload:{id:t,active:r}});return o.addEventListener("keydown",io,!0),o.addEventListener("pointerover",ke),o.addEventListener("pointermove",ke),o.addEventListener("pointerout",ao),o.addEventListener("focus",co),o.addEventListener("blur",lo),{onAction:(t)=>(Z=t,()=>{if(Z===t)Z=null}),listProjects:async()=>{let t=await dt({kind:"projects"});if(t.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await dt({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await dt({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>pt({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>pt({kind:"worktrees",projectId:t},(i)=>{if(i.kind==="worktrees")r(i)}),onSessions:(t,r)=>pt({kind:"sessions",projectId:t},(i)=>{if(i.kind==="sessions")r(i)}),onRunningShells:(t,r)=>gr(t,r),readShellOutput:async(t,r)=>{Q(t,Ce);let i=r?.cursor;if(i!==void 0&&(!Number.isInteger(i)||i<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=r?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>Ue))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ue}.`);let S=await D({...O,type:"shell-output",id:m(s),payload:{shellId:t,cursor:i,tailBytes:c}});if(!S||typeof S.output!=="string"||!Number.isFinite(S.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return S},stopShell:async(t)=>{if(Q(t,Ce),(await D({...O,type:"shell-stop",id:m(s),payload:{shellId:t}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{Q(t),await w({...O,type:"open-session",id:m(s),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let i=Ve(r),c={op:"get",key:t};if(i)c.scope=i;let _=await we(c);return _.op==="get"&&_.found?_.value:void 0},set:async(t,r,i)=>{let c=Ve(i),_={op:"set",key:t,value:r};if(c)_.scope=c;await we(_)},delete:async(t,r)=>{let i=Ve(r),c={op:"delete",key:t};if(i)c.scope=i;await we(c)},keys:async(t)=>{let r=Ve(t),i={op:"keys"};if(r)i.scope=r;let c=await we(i);if(c.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:(t)=>{if(l.add(t),a)t(a);return()=>{l.delete(t)}},onDirectory:(t)=>{if(A.add(t),a)t(a.directory);return()=>{A.delete(t)}},onSession:(t)=>{if(L.add(t),a)t(a.session);return()=>{L.delete(t)}},onSessionLifecycle:(t)=>{if(u.add(t),N)t(N);return()=>{u.delete(t)}},onConnection:(t)=>{if(M.add(t),a)t(a.connection);return()=>{M.delete(t)}},onSettings:(t)=>{if(h.add(t),a)t(a.settings);return()=>{h.delete(t)}},onItem:(t)=>{if(x.add(t),a)t(a.item);return()=>{x.delete(t)}},onStatusControl:(t)=>(P.add(t),()=>{P.delete(t)}),onPopoverClosed:(t)=>(F.add(t),()=>{F.delete(t)}),setStatusControls:(t)=>{if(a?.features?.statusControls!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support status controls."));if(!So(t))return Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return w({...O,type:"status-controls",id:m(s),payload:{controls:t}})},openPopover:(t)=>{if(a?.features?.popovers!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support popovers."));if(!Tt(t))return Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return w({...O,type:"popover-open",id:m(s),payload:t})},closePopover:po,setPopoverAnchorActive:uo,onResolve:(t)=>(b=t,()=>{if(b===t)b=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Me)return Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${Me} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ge))return Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${Ge} characters.`));return w({channel:f,v:E,type:"toast",id:m(s),payload:{...t,message:r}})},openUrl:(t)=>w({channel:f,v:E,type:"open-url",id:m(s),payload:{url:t}}),openCommit:(t)=>kt(t)?w({channel:f,v:E,type:"open-commit",id:m(s),payload:{sha:t}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>w({channel:f,v:E,type:"open-surface",id:m(s),payload:{surfaceId:t}}),writeClipboard:(t)=>w({channel:f,v:E,type:"clipboard-write",id:m(s),payload:{text:t}}),compose:(t)=>w({channel:f,v:E,type:"compose",id:m(s),payload:t}),attach:(t)=>w({channel:f,v:E,type:"attach",id:m(s),payload:me(t)}),startSession:async(t)=>{if(t.projectId!==void 0)Q(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")Q(r.directory);else{if(r.name!==void 0)Q(r.name,200);if(r.baseBranch!==void 0)Q(r.baseBranch,200)}let i=await D({channel:f,v:E,type:"start-session",id:m(s),payload:Ct(t)},e.requestTimeoutMs??180000);if(!At(i))throw new d("HOST_REJECTED","Host did not return a session.");return i},prompt:(t)=>D({channel:f,v:E,type:"prompt",id:m(s),payload:Ut(t)}).then((r)=>{if(!vt(r))throw new d("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>w({channel:f,v:E,type:"session-link",id:m(s),payload:me(t)}),close:()=>w({channel:f,v:E,type:"close",id:m(s)}),oauthStart:()=>w({channel:f,v:E,type:"oauth-start",id:m(s)}),oauthDisconnect:()=>w({channel:f,v:E,type:"oauth-disconnect",id:m(s)}),request:(t)=>(He(t.path)?D({channel:f,v:E,type:"request",id:m(s),payload:t}):zo()).then((r)=>{if(!Fe(r))throw new d("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(He(t.path)?D({channel:f,v:E,type:"service-request",id:m(s),payload:t}):zo()).then((r)=>{if(!Fe(r))throw new d("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>D({channel:f,v:E,type:"service-status",id:m(s)}).then((t)=>{if(!Mt(t))throw new d("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(fe(t)?D({channel:f,v:E,type:"file-read",id:m(s),payload:{path:t}}):Be()).then((r)=>{if(!Gt(r))throw new d("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!fe(t))return Be();if(r.length>Ne)return Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${Ne} characters.`));return D({channel:f,v:E,type:"file-write",id:m(s),payload:{path:t,content:r}}).then((i)=>{if(!Pt(i))throw new d("HOST_REJECTED","Host did not confirm the write.");return i})},listDir:(t)=>(fe(t)?D({channel:f,v:E,type:"file-list",id:m(s),payload:{path:t}}):Be()).then((r)=>{if(!Nt(r))throw new d("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(fe(t)?D({channel:f,v:E,type:"file-stat",id:m(s),payload:{path:t}}):Be()).then((r)=>{if(!Dt(r))throw new d("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),i=t.system?.trim();if(r.length===0||r.length>De)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${De} characters.`));if(i!==void 0&&(i.length===0||i.length>$e))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${$e} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(Ot,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let _={prompt:r};if(i!==void 0)_.system=i;if(c!==void 0)_.maxOutputTokens=c;return D({channel:f,v:E,type:"generate",id:m(s),payload:_},e.requestTimeoutMs??Rt).then((S)=>{if(!$t(S))throw new d("HOST_REJECTED","Host did not return generated text.");return S})},setBadge:(t)=>w({channel:f,v:E,type:"badge",id:m(s),payload:{count:Lt(t)}}),setHeight:(t)=>w({channel:f,v:E,type:"resize",id:m(s),payload:{height:It(t)}}),onFileOpen:(t)=>{if(I.add(t),!q)q=!0,o.addEventListener("keydown",so,!0);if(G)t(G);return()=>{I.delete(t)}},onFileSnapshot:(t)=>(g=t,()=>{if(g===t)g=null}),onFileSaved:(t)=>(z.add(t),()=>{z.delete(t)}),reportFileChange:(t)=>lt({...O,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:no,reportFileUnsupported:()=>lt({...O,type:"file-unsupported"}),dispose:()=>{for(let t of ae.keys())K({...O,type:"workspace-unsubscribe",id:m(s),payload:{subscriptionId:t}});ae.clear();for(let t of k.keys())K({...O,type:"shells-unsubscribe",id:m(s),payload:{subscriptionId:t}});if(k.clear(),y=!0,b=null,Z=null,g=null,I.clear(),z.clear(),q)o.removeEventListener("keydown",so,!0);o.removeEventListener("message",ro),o.removeEventListener("keydown",io,!0),o.removeEventListener("pointerover",ke),o.removeEventListener("pointermove",ke),o.removeEventListener("pointerout",ao),o.removeEventListener("focus",co),o.removeEventListener("blur",lo);for(let t of Y.values())clearTimeout(t.timer),t.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),l.clear(),A.clear(),L.clear(),u.clear(),M.clear(),h.clear(),x.clear(),P.clear(),F.clear()}}};var jo=X(()=>{Oe();xt();bt();gt();Xe();Et();d=class d extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}});var Ko,vn;var Wo=X(()=>{Ko=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"],vn=new Set(Ko)});var Jo,wn;var Yo=X(()=>{Jo=["none","agent","user"],wn=new Set(Jo)});var Xt=X(()=>{Oe();Re();Et();xt();go();_o();gt();jo();bt();Xe();Xe();Wo();Yo()});var J=(e,o="",n="",p=[])=>{let l=document.createElement(e);if(o)l.className=o;if(n)l.textContent=n;if(p.length>0)l.append(...p);return l};var rr={};yr(rr,{FAILURE_TEXT:()=>Xr,POLL_MS:()=>_e,isOnScreen:()=>Qe,portButton:()=>Zt,requestStop:()=>zr,startPolling:()=>jr});var _e=2000,Xr,ge=(e)=>typeof e==="object"&&e!==null,Br=(e)=>ge(e)&&typeof e.at==="number"&&ge(e.system)&&ge(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&ge(e.history)&&ge(e.lmStudio),Vr=(e)=>{if(!(e instanceof d))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},zr=async(e,o)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(o)})).status===200}catch{return!1}},Zt=(e,o)=>{let n=J("button","port",`:${o}`);return n.type="button",n.title=`Open http://localhost:${o}`,n.addEventListener("click",(p)=>{p.stopPropagation(),e.openUrl(`http://localhost:${o}`).catch(()=>{return})}),n},Qe=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,jr=(e,o,n,p)=>{let l=!1,A=_e,L=async()=>{if(l||!Qe(o))return;l=!0;try{let h=await e.serviceRequest({method:"GET",path:"/snapshot"}),x;try{x=JSON.parse(h.body)}catch{x=null}if(h.status===200&&Br(x)){n(x);let P=x.lmStudio;A=P.prefillProgress>0||P.generateTokens>0?100:_e}else p(h.status===200?"bad-answer":"service-failed")}catch(h){p(Vr(h))}finally{l=!1,setTimeout(()=>{L()},A)}};L();let u=Qe(o),M=()=>{let h=Qe(o);if(h&&!u)L();u=h};return document.addEventListener("visibilitychange",M),new ResizeObserver(M).observe(document.documentElement),{refresh:()=>{L()}}};var qt=X(()=>{Xt();Xr={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."}});Xt();var Lr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ir=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Qo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,p]of Lr)o.style.setProperty(n,e.tokens[p]);for(let[n,p,l]of Ir){let A=e.tokens[l]??"";o.style.setProperty(n,A),o.style.setProperty(p,A)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Bt=(e,o)=>{if(Qo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};Re();var Mr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},T=(e,o)=>`var(--${e}, var(--oc-${Mr[e]}, ${o}))`,le=T("surface-background","transparent"),ze=T("surface-elevated","transparent"),Se=T("surface-elevated-foreground","inherit"),re=T("surface-foreground","inherit"),v=T("surface-muted-foreground","gray"),Gr=T("surface-muted","transparent"),W=T("interactive-border","currentColor"),j=T("interactive-hover","transparent"),de=T("interactive-active","transparent"),Vt=T("interactive-selection","transparent"),zt=T("interactive-selection-foreground","inherit"),er=T("interactive-focus-ring","currentColor"),te=T("primary","currentColor"),jt=T("primary-text","inherit"),Kt=T("error-text","inherit"),Pr=T("font-sans","inherit"),Wt=T("font-mono","monospace"),tr=T("radius","9px"),Jt=`calc(${tr} - 2px)`,Zo=`calc(${tr} - 4px)`,U=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,qo=`box-shadow: 0 0 0 2px ${er};`,je=(e)=>{let o=T(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${T(`${e}-text`,"inherit")}; }`},Nr=`
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
`,or=`
.oc-sdk { color: ${re}; font-family: ${Pr}; }
.oc-sdk :focus-visible { outline: none; ${qo} }
.oc-sdk-mono { font-family: ${Wt}; }
.oc-sdk-muted { color: ${v}; }
${je("success")}${je("warning")}${je("error")}${je("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${te}; --oc-sdk-tone-text: ${jt}; }

.oc-sdk-btn { border-radius: ${Jt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Zo}; }
.oc-sdk-btn[data-variant="default"] { color: ${jt}; background: ${U(te,10,le)}; border-color: ${U(te,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${U(te,16,le)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${U(te,22,le)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Gr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-btn[data-variant="outline"] { background: ${ze}; color: ${Se}; border-color: ${W}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${j}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${de}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${T("status-error","red")}; color: ${Kt}; background: ${U("var(--oc-sdk-tone)",7,le)}; border-color: ${U("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${U("var(--oc-sdk-tone)",9,le)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${U("var(--oc-sdk-tone)",11,le)}; }

.oc-sdk-field-note { color: ${v}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Kt}; }
.oc-sdk-input { border-radius: ${Jt}; background: ${ze}; color: ${Se}; box-shadow: inset 0 0 0 1px ${U(W,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${v}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${er}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${T("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${T("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Wt}; }

.oc-sdk-search-icon { color: ${v}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${te}; }
.oc-sdk-search-clear { border-radius: ${Zo}; color: ${v}; }
.oc-sdk-search-clear:hover { background: ${j}; color: ${re}; }

.oc-sdk-trigger { border-color: ${W}; border-radius: ${Jt}; background: ${ze}; color: ${Se}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${v}; }
.oc-sdk-trigger-chevron { color: ${v}; }
.oc-sdk-popup { --surface-foreground: ${Se}; border-color: ${U(W,60)}; border-radius: 12px; background: ${ze}; color: ${Se}; box-shadow: 0 8px 24px ${U(re,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${j}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Vt}; color: ${zt}; }
.oc-sdk-option-check { color: ${re}; }
.oc-sdk-option[data-destructive="true"] { color: ${Kt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${U(T("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${v}; }
.oc-sdk-popup-empty { color: ${v}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${W}; border-radius: 4px; color: ${re}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${U(re,60,W)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${W}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${le}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${te}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${qo} }
.oc-sdk-check-desc { color: ${v}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${U(re,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${v}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${re}; }
.oc-sdk-tab[aria-selected="true"] { color: ${zt}; background: ${Vt}; border-color: ${W}; }
.oc-sdk-tab-count { color: ${v}; }

.oc-sdk-badge { border-radius: 9999px; background: ${j}; color: ${v}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${U("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${j}; }
.oc-sdk-row[aria-selected="true"] { background: ${Vt}; color: ${zt}; }
.oc-sdk-row-lead { font-family: ${Wt}; color: ${v}; }
.oc-sdk-row-sub { color: ${v}; }
.oc-sdk-row-meta { color: ${v}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${v}; }

.oc-sdk-empty-body { color: ${v}; }

.oc-sdk-spinner { color: ${v}; }
.oc-sdk-spinner-ring { border-color: ${W}; border-top-color: ${te}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${U("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${U("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${v}; }

.oc-sdk-separator { color: ${v}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${U(W,40)}; }

.oc-sdk-progress-label { color: ${v}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${W}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${te}); }

.oc-sdk-text a { color: ${jt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${U(W,60)}; }
`,H=`
${ut}
${Nr}
${or}`;Re();qt();var Kr="en";var Ze=(e,o)=>new Intl.NumberFormat(Kr,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e),qe=(e)=>{let o=["B","KB","MB","GB","TB"],n=Math.max(0,e),p=0;while(n>=1024&&p<o.length-1)n/=1024,p+=1;let l=p>=3&&n<100?1:0;return`${Ze(n,l)} ${o[p]}`},et=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${Ze(e,e<10?1:0)}%`},Te=(e)=>`${Ze(e,1)}%`;var nr=(e)=>{if(e===0)return"0 KB/s";if(e<=0)return"0 B/s";let o=["B/s","KB/s","MB/s","GB/s","TB/s"],n=e,p=0;while(n>=1024&&p<o.length-1)n/=1024,p+=1;let l=p>=3&&n<100?1:0;return`${Ze(n,l)} ${o[p]}`},sr=(e,o)=>`上傳 ${nr(e)} · 下載 ${nr(o)}`;var ir=`
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
`,ar=`
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
`,cr=`
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
`;var lr=90;var Wr=0,ne=(e,o)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[p,l]of Object.entries(o))n.setAttribute(p,String(l));return n},dr=(e)=>{let o=document.createElement("div");o.className="chart",o.style.height=`${e.height}px`;let n=e.height,p=ne("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),l=`fill-${++Wr}`,A=ne("defs",{}),L=ne("linearGradient",{id:l,x1:0,x2:0,y1:0,y2:1});L.append(ne("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),ne("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),A.append(L);let u=ne("path",{d:"",class:"chart-grid"}),M=ne("path",{d:"",fill:`url(#${l})`}),h=ne("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});p.append(A,u,M,h);let x=document.createElement("div");x.className="chart-cursor";let P=document.createElement("div");P.className="chart-dot",P.style.background=e.color;let F=document.createElement("div");F.className="chart-tip",o.append(p,x,P,F);let b=[],Z=1,I=null,z=null,g=(k,y)=>(e.capacity-y+k)/Math.max(1,e.capacity-1)*300,G=(k)=>n-1-Math.min(k,Z)/Z*(n-1-2),q=()=>{let k=I===null?void 0:b[I];if(I===null||k===void 0){o.classList.remove("hovering");return}o.classList.add("hovering");let y=o.getBoundingClientRect(),s=g(I,b.length)/300*y.width,a=G(k)/n*y.height;x.style.transform=`translateX(${s}px)`,P.style.transform=`translate(${s}px, ${a}px)`;let N=(b.length-1-I)*e.intervalSeconds;F.textContent=`${e.format(k)} · ${N===0?"now":`${N} s ago`}`;let ee=s>y.width/2;F.style.left=ee?"":`${s+8}px`,F.style.right=ee?`${y.width-s+8}px`:""},Y=(k)=>{if(b.length===0)return;let y=o.getBoundingClientRect(),s=(k-y.left)/y.width*(e.capacity-1),a=Math.round(s-(e.capacity-b.length));I=Math.min(b.length-1,Math.max(0,a)),q()};return o.addEventListener("pointermove",(k)=>{z=k.clientX,Y(k.clientX)}),o.addEventListener("pointerleave",()=>{z=null,I=null,q()}),{element:o,update:(k,y)=>{if(b=k,Z=y>0?y:1,u.setAttribute("d",[0.25,0.5,0.75].map((s)=>`M0 ${n*s} H300`).join(" ")),b.length===0)M.setAttribute("d",""),h.setAttribute("d","");else{let s=b.map((ce,Ae)=>`${g(Ae,b.length).toFixed(2)} ${G(ce).toFixed(2)}`),a=b.length===1,N=a?`M${g(0,1)-2} ${s[0]?.split(" ")[1]} L${s[0]}`:`M${s.join(" L")}`;h.setAttribute("d",N);let ee=a?g(0,1)-2:g(0,b.length);M.setAttribute("d",`${N} L300 ${n} L${ee.toFixed(2)} ${n} Z`)}if(z!==null)Y(z)}}};var se=Ft(),ye=document.querySelector("#root");if(!ye)throw Error("Missing #root");var fr=document.createElement("style");fr.textContent=ir+ar+cr;document.head.append(fr);var Jr=_e/1000,Er=dr({color:"var(--oc-primary)",height:18,capacity:lr,format:(e)=>`${e}ms`,intervalSeconds:Jr}),to=(e)=>{let o=J("span","meter-fill");return o.style.background=e,{element:J("div","meter","",[o]),set:(p)=>{o.style.width=`${Math.min(100,Math.max(0,p))}%`}}},hr=to("var(--oc-info)"),xr=to("var(--oc-success)"),eo=to("var(--oc-success)"),ie=(e,o,n,p)=>{let l=J("div","line","",[J("span","what",e),o??J("div","meter-empty"),J("span","value num",n)]);if(p)l.title=p;return l},tt=ie("OpenChamber",Er.element,"–","Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU counts 100% per core."),ot=ie("CPU",hr.element,"–"),rt=ie("Memory",xr.element,"–"),nt=ie("Network",null,"—","Upload and download speed from active interfaces."),st=ie("LLM Status",null,"—","Model load state: mounted (loaded) or unmounted (unloaded)."),it=ie("Prefill",eo.element,"—","Prompt processing progress percentage."),at=ie("Generate",null,"—","Number of tokens generated in the current run."),be=ie("Dev servers",null,""),pr=J("div","ports"),pe=J("div","note","Reading…");ye.append(pe,tt,ot,rt,nt,st,it,at,be);var Yr=()=>{for(let e of[tt,ot,rt,nt,st,it,at,be])e.hidden=!0};var Sr=!1;var Qr=()=>[{kind:"button",id:"refresh-build",label:"Refresh"}],Zr=async()=>{if(!Sr)return;let e=Qr();await se.setStatusControls(e).catch(()=>{return})},qr=(e)=>{let{system:o,app:n}=e;ot.hidden=!1,rt.hidden=!1;let p=o.cpu??0;hr.set(o.cpu!==null?p:0),ot.querySelector(".value").textContent=et(o.cpu);let l=Math.round(o.memoryUsed/Math.max(1,o.memoryTotal)*100);xr.set(l),rt.querySelector(".value").textContent=`${qe(o.memoryUsed)} / ${qe(o.memoryTotal)} · ${et(l)}`,nt.hidden=!1;let A=nt.querySelector(".value");A.textContent=sr(o.networkSpeedUp,o.networkSpeedDown),tt.hidden=e.warnings.includes("processes-unavailable");let L=tt.querySelector(".value");L.textContent=`${qe(n.memory)} · ${et(n.cpu)}`,Er.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),st.hidden=!1,it.hidden=!1,at.hidden=!1;let{lmStudio:u}=e,h=(Array.isArray(u.models)?u.models.find((g)=>g.id===u.modelName):void 0)?.displayName||u.modelName,x;if(u.modelName)switch(u.state){case"loaded":x=h??"—";break;case"loading":x=`${h} · 載入中 ${Te(u.prefillProgress)}`;break;case"unloaded":x=h?`${h} · 卸載`:"卸載";break;case"error":x=h?`${h} · 錯誤`:"錯誤";break;default:x=h??"—"}else switch(u.state){case"loaded":x="掛載";break;case"unloaded":x="卸載";break;case"loading":x=`載入中 ${Te(u.prefillProgress)}`;break;case"error":x="錯誤";break;default:x="—"}let P=st.querySelector(".value");P.textContent=x,P.className=u.state==="loaded"?"value num lm-state-loaded lm-state-dim":`value num lm-state-${u.state}`;let F=it.querySelector(".value"),b=at.querySelector(".value");if(u.prefillProgress>0||u.generateTokens>0||u.tokensPerSecond&&u.tokensPerSecond>0){let g=u.prefillProgress>0&&u.prefillProgress<100?u.prefillProgress:100,G=u.prefillTokensPerSecond;F.textContent=G&&G>0?`${Te(g)} · ${G.toFixed(1)} tok/s`:Te(g),eo.set(g);let q=u.tokensPerSecond;if(q&&q>0){let Y=u.generateTokens>0?`${u.generateTokens.toLocaleString()} tokens · `:"";b.textContent=`${Y}${q.toFixed(1)} tok/s`}else if(u.generateTokens>0)b.textContent=u.generateTokens.toLocaleString();else b.textContent="—"}else F.textContent="—",eo.set(0),b.textContent="—";let I=[...new Set(e.servers.flatMap((g)=>g.ports))].sort((g,G)=>g-G);if(I.length>0&&!e.warnings.includes("processes-unavailable")){be.hidden=!1,pr.replaceChildren(...I.slice(0,6).map((G)=>Zt(se,G)));let g=be.querySelector(".value");if(g.replaceChildren(...pr.children),I.length>6)g.appendChild(J("span","muted",` +${I.length-6}`))}else be.hidden=!0;let z=e.warnings.includes("processes-unavailable");pe.hidden=!z,pe.className=z?"note error":"note",pe.textContent=z?"Could not read the process list; showing system totals only.":""},ct=null,en=async()=>{try{let e=await se.serviceRequest({method:"POST",path:"/build"});if(e.status===200)ct?.refresh();else{let o=e.body?JSON.parse(e.body):null;if(!ct?.refresh)await se.toast({kind:"error",message:o?.error??"Build failed"})}}catch{}},tn={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."};function on(e){pe.hidden=!1,pe.className="note error",pe.textContent=tn[e]??"Could not reach the monitoring service.",Yr()}var ur=!1;se.onReady(async(e)=>{if(Bt(e,document.documentElement),ur)return;ur=!0,Sr=e.features?.statusControls===!0,Zr(),se.onStatusControl((n)=>{if(n.id==="refresh-build")en()});let{startPolling:o}=await Promise.resolve().then(() => (qt(),rr));ct=o(se,ye,(n)=>{qr(n)},on),ct?.refresh()});var mr=-1;new ResizeObserver(()=>{let e=Math.ceil(ye.getBoundingClientRect().height);if(e===mr)return;mr=e,se.setHeight(e).catch(()=>{return})}).observe(ye);})();
