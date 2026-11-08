(()=>{var Sr=Object.defineProperty;var gr=(e)=>e;function _r(e,o){this[e]=gr.bind(null,o)}var Tr=(e,o)=>{for(var n in o)Sr(e,n,{get:o[n],enumerable:!0,configurable:!0,set:_r.bind(o,n)})};var X=(e,o)=>()=>(e&&(o=e(e=0)),o);var f="openchamber.sdk",E=1;var we=()=>{};function uo(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(p)=>{let d=p.target===e?o:p.target;if(!(d instanceof Element))return;if(!d.hasAttribute("data-oc-scrolling"))d.setAttribute("data-oc-scrolling","");let A=n.get(d);if(A!==void 0)clearTimeout(A);n.set(d,setTimeout(()=>{n.delete(d),d.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var dt=`
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
`,br;var Oe=X(()=>{br=`(${uo.toString()})(document);`});var pt=128,ut=65536;var Re=128,Ue=65536;var mt=()=>{};var ho,mo=(e)=>Object(e)===e&&!Array.isArray(e),ft=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),fo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Eo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,xo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!mo(n)||!ho.test(n.id)||!fo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!ft(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!ft(n,["kind","id","label","value","options","disabled"]))return!1;if(!Eo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let p=new Set;for(let d of n.options){if(!mo(d)||!ft(d,["value","label"])||!Eo(d.value)||!fo(d.label)||p.has(d.value))return!1;p.add(d.value)}if(!p.has(n.value))return!1}return!0};var Et=X(()=>{ho=/^[a-z][a-z0-9-]{0,39}$/});var So=()=>{};var go=()=>{};var Ce=20000000,Le=256,ht=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,_o=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var xt=()=>{};var To,bo,yo=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let p=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let d of p)if(!yo(d,o+1,n))return!1;return!0},St=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(St);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(St)}return String(e)===e||Number.isFinite(e)},gt=(e)=>{try{if(String(e.id)!==e.id||!To.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!bo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!yo(e.data)||!St(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var _t=X(()=>{To=/^[A-Za-z0-9_-]{1,80}$/,bo=["left","right","top","bottom"]});var vo,bt=(e)=>Boolean(e&&"sessionId"in e),yt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),ko,At=(e)=>ko.test(e),Ie=500,Me=32000,wo=16000,Oo=128,Ro=200,Uo=2000,Co=16000,Lo=80,Io=200,Mo=16000,Go=2000,vt=20000,Ge=1024,Pe=2000000,Ne=64000,De=8000,kt=4000,wt=90000,Po=999,No=1e4,he=500,Do,$o,yr,Ho=(e)=>yr.has(e),Fo=(e)=>e&&Ho(e)?e:"HOST_REJECTED",pe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(pe);if(Object(e)===e)return Object.values(e).every(pe);return!1},Xo=(e)=>pe(e)&&JSON.stringify(e).length<=Mo,Ao=(e)=>e?.trim().slice(0,Io)??"",ue=(e)=>{let o=e.id.trim().slice(0,Oo),n=e.title.trim().slice(0,Ro),p=e.url.trim().slice(0,Uo),d=e.text?.trim().slice(0,Co),A=e.author?.trim().slice(0,Lo),L=e.kind==="pull"?"pull":"issue",u={providerId:e.providerId.trim(),id:o,title:n||o,url:p,kind:L};if(d)u.text=d;if(A)u.author=A;if(L==="pull"){let M=Ao(e.branches?.head),h=Ao(e.branches?.base);if(M&&h)u.branches={head:M,base:h}}if(Xo(e.data))u.data=e.data;return u},Ot=(e)=>{let o=ue(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},Rt=(e)=>{let o={text:e.text.trim().slice(0,wo)};if(e.send)o.send=!0;return o},Ut=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Po,Math.max(0,Math.round(e)))},Ct=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(No,Math.max(0,Math.ceil(e)))},me=(e)=>e.length>0&&e.length<=Ge&&!e.includes("\x00")&&!e.includes("\\"),$e=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Go)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Ar,Lt=(e)=>Boolean(e&&"status"in e&&Ar.has(String(e.status))&&!("body"in e)),He=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),It=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Mt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Gt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),vr,Pt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&vr.has(String(e.kind))&&Number.isFinite(e.size)),Nt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),kr,wr=(e)=>Object(e)===e?e:null,Tt=(e)=>String(e)===e&&e.length>0,Or=(e)=>{if(!Tt(e.id))return null;if(e.ok===!0){let o={channel:f,v:E,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&Tt(e.error))return{channel:f,v:E,type:"result",id:e.id,ok:!1,error:e.error,code:Fo(Tt(e.code)?e.code:void 0)};return null},Dt=(e)=>{let o=wr(e);if(!o||o.channel!==f||o.v!==E)return null;if(o.type==="result")return Or(o);if(!kr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Fe=X(()=>{we();vo=["file","directory","other","missing"],ko=/^[0-9a-f]{7,64}$/i,Do=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],$o=["stopped","starting","ready","failed"],yr=new Set(Do),Ar=new Set($o),vr=new Set(vo),kr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"])});var Bo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Rr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",l,Vo=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Xe=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Ge} characters without NUL or backslash.`)),Be=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},m=(e)=>(e.value+=1,`oc-${e.value}`),$t=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),p=e.requestTimeoutMs??vt,d=new Set,A=new Set,L=new Set,u=new Set,M=new Set,h=new Set,x=new Set,P=new Set,F=new Set,b=null,Z=null,I=new Set,z=new Set,g=null,G=null,q=!1,Y=new Map,ie=new Map,k=new Map,y=!1,s={value:0},a=null,N=null,ee=!1,ae=!1,ye=null,to=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},K=(t)=>{o.parent.postMessage(t,"*")},U=(t,r)=>{for(let i of t)try{i(r)}catch(c){console.error(c)}},oo=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=Dt(t.data);if(!r)return;if(r.type==="workspace"){let c=ie.get(r.payload.subscriptionId);if(c)U([c],r.payload.snapshot);return}if(r.type==="shells"){let c=k.get(r.payload.subscriptionId);if(c)U([c],r.payload.snapshot);return}if(r.type==="ready"){if(a=r.payload,N=to(r.payload.session),U(d,r.payload),U(A,r.payload.directory),U(L,r.payload.session),N)U(u,N);U(M,r.payload.connection),U(h,r.payload.settings),U(x,r.payload.item);return}if(r.type==="directory"){if(a)a={...a,directory:r.payload.directory};U(A,r.payload.directory);return}if(r.type==="session"){if(a)a={...a,session:r.payload.session};if(!r.payload.session)N=null;else if(N?.sessionId!==r.payload.session.id)N=to(r.payload.session);U(L,r.payload.session);return}if(r.type==="session-lifecycle"){N=r.payload,U(u,r.payload);return}if(r.type==="connection"){if(a)a={...a,connection:r.payload.connection};U(M,r.payload.connection);return}if(r.type==="settings"){if(a)a={...a,settings:r.payload.settings};U(h,r.payload.settings);return}if(r.type==="item"){if(a)a={...a,item:r.payload.item};U(x,r.payload.item);return}if(r.type==="status-control-event"){U(P,r.payload);return}if(r.type==="popover-closed"){U(F,r.payload);return}if(r.type==="action"){let c=(S)=>{if(!y)K({channel:f,v:E,type:"action-result",id:r.id,payload:S})},_=Z;if(!_){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>_(r.payload)).then(()=>c({ok:!0}),(S)=>{let R=(S instanceof Error?S.message:String(S)).trim();c({ok:!1,error:(R||"Action failed.").slice(0,he)})});return}if(r.type==="file-open"){let c=r.payload;if(G&&_o(G,c))return;G=c,U(I,r.payload);return}if(r.type==="file-saved"){U(z,r.payload.version);return}if(r.type==="file-snapshot"){let c=(R)=>{if(!y)K({channel:f,v:E,type:"file-snapshot-result",id:r.id,payload:R})},_=(R)=>c({error:(R.trim()||"Could not read the edited file.").slice(0,he)}),S=g;if(!S){_("This extension does not edit files.");return}Promise.resolve().then(()=>S(r.payload.purpose)).then((R)=>{if(ht(R)>Ce){_(`The file is over ${Ce} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>Le){_(`The snapshot version is over ${Le} characters.`);return}c({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},(R)=>_(R instanceof Error?R.message:String(R)));return}if(r.type==="resolve"){let c=(S)=>{K({channel:f,v:E,type:"resolve-result",id:r.id,payload:S})},_=b;if(!_){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>_(r.payload)).then((S)=>c({item:S?ue(S):null}),(S)=>{let R=(S instanceof Error?S.message:String(S)).trim();c({error:(R||"Command failed.").slice(0,he)})});return}let i=Y.get(r.id);if(!i)return;if(clearTimeout(i.timer),Y.delete(r.id),r.ok){i.resolve(r.payload);return}i.reject(new l(r.code,r.error))};o.addEventListener("message",oo),K({channel:f,v:E,type:"hello"});let D=(t,r=p)=>{if(y||o.parent===o)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((i,c)=>{let _=setTimeout(()=>{Y.delete(t.id),c(new l("HOST_TIMEOUT","Host did not answer in time."))},r);Y.set(t.id,{resolve:i,reject:c,timer:_}),K(t)})},w=(t)=>D(t).then(()=>{return}),O={channel:f,v:E},at=(t)=>{if(!y&&o.parent!==o)K(t)},ro=()=>at({...O,type:"file-save"}),no=(t)=>{if(!Bo(t)||!Rr(t))return;t.preventDefault(),ro()},so=(t)=>{if(!Bo(t)||t.key!=="Escape"||a?.surface!=="popover"||!a.popover)return;t.preventDefault(),lo(a.popover.id,"escape").catch(()=>{return})},Ae=()=>{let t=a?.surface==="popover"?a.popover:void 0;if(!t)return;let r=ee||ae;if(ye===r)return;ye=r,po(t.id,r).catch(()=>{return})},ve=()=>{if(a?.surface!=="popover"||ee)return;ee=!0,Ae()},io=(t)=>{if(a?.surface!=="popover"||t.relatedTarget!==null||!ee)return;ee=!1,Ae()},ao=()=>{if(a?.surface!=="popover"||ae)return;ae=!0,Ae()},co=()=>{if(a?.surface!=="popover"||!ae)return;ae=!1,Ae()},Q=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new l("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},ct=async(t)=>{if(t.kind!=="projects")Q(t.projectId);let r=await D({...O,type:"workspace-read",id:m(s),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return r},lt=async(t,r)=>{if(t.kind!=="projects")Q(t.projectId);let i=m(s);ie.set(i,r);try{await w({...O,type:"workspace-subscribe",id:m(s),payload:{subscriptionId:i,query:t}})}catch(c){if(ie.delete(i),!y)K({...O,type:"workspace-unsubscribe",id:m(s),payload:{subscriptionId:i}});throw c}return()=>{if(!ie.delete(i)||y)return;K({...O,type:"workspace-unsubscribe",id:m(s),payload:{subscriptionId:i}})}},xr=async(t,r)=>{if(t.kind==="session")Q(t.sessionId);if(t.kind==="project")Q(t.projectId);let i=m(s);k.set(i,r);try{await w({...O,type:"shells-subscribe",id:m(s),payload:{subscriptionId:i,scope:t}})}catch(c){if(k.delete(i),!y)K({...O,type:"shells-unsubscribe",id:m(s),payload:{subscriptionId:i}});throw c}return()=>{if(!k.delete(i)||y)return;K({...O,type:"shells-unsubscribe",id:m(s),payload:{subscriptionId:i}})}},ke=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>pt))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!pe(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>ut)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&a?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let r=await D({...O,type:"storage",id:m(s),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return r},lo=(t,r)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-close",id:m(s),payload:r?{id:t,reason:r}:{id:t}}),po=(t,r)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):w({...O,type:"popover-anchor",id:m(s),payload:{id:t,active:r}});return o.addEventListener("keydown",so,!0),o.addEventListener("pointerover",ve),o.addEventListener("pointermove",ve),o.addEventListener("pointerout",io),o.addEventListener("focus",ao),o.addEventListener("blur",co),{onAction:(t)=>(Z=t,()=>{if(Z===t)Z=null}),listProjects:async()=>{let t=await ct({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await ct({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await ct({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>lt({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>lt({kind:"worktrees",projectId:t},(i)=>{if(i.kind==="worktrees")r(i)}),onSessions:(t,r)=>lt({kind:"sessions",projectId:t},(i)=>{if(i.kind==="sessions")r(i)}),onRunningShells:(t,r)=>xr(t,r),readShellOutput:async(t,r)=>{Q(t,Re);let i=r?.cursor;if(i!==void 0&&(!Number.isInteger(i)||i<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=r?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>Ue))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ue}.`);let S=await D({...O,type:"shell-output",id:m(s),payload:{shellId:t,cursor:i,tailBytes:c}});if(!S||typeof S.output!=="string"||!Number.isFinite(S.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return S},stopShell:async(t)=>{if(Q(t,Re),(await D({...O,type:"shell-stop",id:m(s),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{Q(t),await w({...O,type:"open-session",id:m(s),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let i=Be(r),c={op:"get",key:t};if(i)c.scope=i;let _=await ke(c);return _.op==="get"&&_.found?_.value:void 0},set:async(t,r,i)=>{let c=Be(i),_={op:"set",key:t,value:r};if(c)_.scope=c;await ke(_)},delete:async(t,r)=>{let i=Be(r),c={op:"delete",key:t};if(i)c.scope=i;await ke(c)},keys:async(t)=>{let r=Be(t),i={op:"keys"};if(r)i.scope=r;let c=await ke(i);if(c.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:(t)=>{if(d.add(t),a)t(a);return()=>{d.delete(t)}},onDirectory:(t)=>{if(A.add(t),a)t(a.directory);return()=>{A.delete(t)}},onSession:(t)=>{if(L.add(t),a)t(a.session);return()=>{L.delete(t)}},onSessionLifecycle:(t)=>{if(u.add(t),N)t(N);return()=>{u.delete(t)}},onConnection:(t)=>{if(M.add(t),a)t(a.connection);return()=>{M.delete(t)}},onSettings:(t)=>{if(h.add(t),a)t(a.settings);return()=>{h.delete(t)}},onItem:(t)=>{if(x.add(t),a)t(a.item);return()=>{x.delete(t)}},onStatusControl:(t)=>(P.add(t),()=>{P.delete(t)}),onPopoverClosed:(t)=>(F.add(t),()=>{F.delete(t)}),setStatusControls:(t)=>{if(a?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!xo(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return w({...O,type:"status-controls",id:m(s),payload:{controls:t}})},openPopover:(t)=>{if(a?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!gt(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return w({...O,type:"popover-open",id:m(s),payload:t})},closePopover:lo,setPopoverAnchorActive:po,onResolve:(t)=>(b=t,()=>{if(b===t)b=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Ie)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${Ie} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Me))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${Me} characters.`));return w({channel:f,v:E,type:"toast",id:m(s),payload:{...t,message:r}})},openUrl:(t)=>w({channel:f,v:E,type:"open-url",id:m(s),payload:{url:t}}),openCommit:(t)=>At(t)?w({channel:f,v:E,type:"open-commit",id:m(s),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>w({channel:f,v:E,type:"open-surface",id:m(s),payload:{surfaceId:t}}),writeClipboard:(t)=>w({channel:f,v:E,type:"clipboard-write",id:m(s),payload:{text:t}}),compose:(t)=>w({channel:f,v:E,type:"compose",id:m(s),payload:t}),attach:(t)=>w({channel:f,v:E,type:"attach",id:m(s),payload:ue(t)}),startSession:async(t)=>{if(t.projectId!==void 0)Q(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")Q(r.directory);else{if(r.name!==void 0)Q(r.name,200);if(r.baseBranch!==void 0)Q(r.baseBranch,200)}let i=await D({channel:f,v:E,type:"start-session",id:m(s),payload:Ot(t)},e.requestTimeoutMs??180000);if(!bt(i))throw new l("HOST_REJECTED","Host did not return a session.");return i},prompt:(t)=>D({channel:f,v:E,type:"prompt",id:m(s),payload:Rt(t)}).then((r)=>{if(!yt(r))throw new l("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>w({channel:f,v:E,type:"session-link",id:m(s),payload:ue(t)}),close:()=>w({channel:f,v:E,type:"close",id:m(s)}),oauthStart:()=>w({channel:f,v:E,type:"oauth-start",id:m(s)}),oauthDisconnect:()=>w({channel:f,v:E,type:"oauth-disconnect",id:m(s)}),request:(t)=>($e(t.path)?D({channel:f,v:E,type:"request",id:m(s),payload:t}):Vo()).then((r)=>{if(!He(r))throw new l("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>($e(t.path)?D({channel:f,v:E,type:"service-request",id:m(s),payload:t}):Vo()).then((r)=>{if(!He(r))throw new l("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>D({channel:f,v:E,type:"service-status",id:m(s)}).then((t)=>{if(!Lt(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(me(t)?D({channel:f,v:E,type:"file-read",id:m(s),payload:{path:t}}):Xe()).then((r)=>{if(!It(r))throw new l("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!me(t))return Xe();if(r.length>Pe)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Pe} characters.`));return D({channel:f,v:E,type:"file-write",id:m(s),payload:{path:t,content:r}}).then((i)=>{if(!Mt(i))throw new l("HOST_REJECTED","Host did not confirm the write.");return i})},listDir:(t)=>(me(t)?D({channel:f,v:E,type:"file-list",id:m(s),payload:{path:t}}):Xe()).then((r)=>{if(!Gt(r))throw new l("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(me(t)?D({channel:f,v:E,type:"file-stat",id:m(s),payload:{path:t}}):Xe()).then((r)=>{if(!Pt(r))throw new l("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),i=t.system?.trim();if(r.length===0||r.length>Ne)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ne} characters.`));if(i!==void 0&&(i.length===0||i.length>De))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${De} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(kt,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let _={prompt:r};if(i!==void 0)_.system=i;if(c!==void 0)_.maxOutputTokens=c;return D({channel:f,v:E,type:"generate",id:m(s),payload:_},e.requestTimeoutMs??wt).then((S)=>{if(!Nt(S))throw new l("HOST_REJECTED","Host did not return generated text.");return S})},setBadge:(t)=>w({channel:f,v:E,type:"badge",id:m(s),payload:{count:Ut(t)}}),setHeight:(t)=>w({channel:f,v:E,type:"resize",id:m(s),payload:{height:Ct(t)}}),onFileOpen:(t)=>{if(I.add(t),!q)q=!0,o.addEventListener("keydown",no,!0);if(G)t(G);return()=>{I.delete(t)}},onFileSnapshot:(t)=>(g=t,()=>{if(g===t)g=null}),onFileSaved:(t)=>(z.add(t),()=>{z.delete(t)}),reportFileChange:(t)=>at({...O,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:ro,reportFileUnsupported:()=>at({...O,type:"file-unsupported"}),dispose:()=>{for(let t of ie.keys())K({...O,type:"workspace-unsubscribe",id:m(s),payload:{subscriptionId:t}});ie.clear();for(let t of k.keys())K({...O,type:"shells-unsubscribe",id:m(s),payload:{subscriptionId:t}});if(k.clear(),y=!0,b=null,Z=null,g=null,I.clear(),z.clear(),q)o.removeEventListener("keydown",no,!0);o.removeEventListener("message",oo),o.removeEventListener("keydown",so,!0),o.removeEventListener("pointerover",ve),o.removeEventListener("pointermove",ve),o.removeEventListener("pointerout",io),o.removeEventListener("focus",ao),o.removeEventListener("blur",co);for(let t of Y.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),d.clear(),A.clear(),L.clear(),u.clear(),M.clear(),h.clear(),x.clear(),P.clear(),F.clear()}}};var zo=X(()=>{we();Et();_t();xt();Fe();mt();l=class l extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}});var jo,_n;var Ko=X(()=>{jo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"],_n=new Set(jo)});var Wo,bn;var Jo=X(()=>{Wo=["none","agent","user"],bn=new Set(Wo)});var Ht=X(()=>{we();Oe();mt();Et();So();go();xt();zo();_t();Fe();Fe();Ko();Jo()});var J=(e,o="",n="",p=[])=>{let d=document.createElement(e);if(o)d.className=o;if(n)d.textContent=n;if(p.length>0)d.append(...p);return d};var or={};Tr(or,{FAILURE_TEXT:()=>Hr,POLL_MS:()=>ge,isOnScreen:()=>Ye,portButton:()=>Yt,requestStop:()=>Br,startPolling:()=>Vr});var ge=2000,Hr,Se=(e)=>typeof e==="object"&&e!==null,Fr=(e)=>Se(e)&&typeof e.at==="number"&&Se(e.system)&&Se(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&Se(e.history)&&Se(e.lmStudio),Xr=(e)=>{if(!(e instanceof l))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},Br=async(e,o)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(o)})).status===200}catch{return!1}},Yt=(e,o)=>{let n=J("button","port",`:${o}`);return n.type="button",n.title=`Open http://localhost:${o}`,n.addEventListener("click",(p)=>{p.stopPropagation(),e.openUrl(`http://localhost:${o}`).catch(()=>{return})}),n},Ye=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Vr=(e,o,n,p)=>{let d=!1,A=ge,L=async()=>{if(d||!Ye(o))return;d=!0;try{let h=await e.serviceRequest({method:"GET",path:"/snapshot"}),x;try{x=JSON.parse(h.body)}catch{x=null}if(h.status===200&&Fr(x)){n(x);let P=x.lmStudio;A=P.prefillProgress>0||P.generateTokens>0?100:ge}else p(h.status===200?"bad-answer":"service-failed")}catch(h){p(Xr(h))}finally{d=!1,setTimeout(()=>{L()},A)}};L();let u=Ye(o),M=()=>{let h=Ye(o);if(h&&!u)L();u=h};return document.addEventListener("visibilitychange",M),new ResizeObserver(M).observe(document.documentElement),{refresh:()=>{L()}}};var Qt=X(()=>{Ht();Hr={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."}});Ht();var Ur=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Cr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Yo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,p]of Ur)o.style.setProperty(n,e.tokens[p]);for(let[n,p,d]of Cr){let A=e.tokens[d]??"";o.style.setProperty(n,A),o.style.setProperty(p,A)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Ft=(e,o)=>{if(Yo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};Oe();var Lr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},T=(e,o)=>`var(--${e}, var(--oc-${Lr[e]}, ${o}))`,ce=T("surface-background","transparent"),Ve=T("surface-elevated","transparent"),xe=T("surface-elevated-foreground","inherit"),re=T("surface-foreground","inherit"),v=T("surface-muted-foreground","gray"),Ir=T("surface-muted","transparent"),W=T("interactive-border","currentColor"),j=T("interactive-hover","transparent"),le=T("interactive-active","transparent"),Xt=T("interactive-selection","transparent"),Bt=T("interactive-selection-foreground","inherit"),qo=T("interactive-focus-ring","currentColor"),te=T("primary","currentColor"),Vt=T("primary-text","inherit"),zt=T("error-text","inherit"),Mr=T("font-sans","inherit"),jt=T("font-mono","monospace"),er=T("radius","9px"),Kt=`calc(${er} - 2px)`,Qo=`calc(${er} - 4px)`,C=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,Zo=`box-shadow: 0 0 0 2px ${qo};`,ze=(e)=>{let o=T(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${T(`${e}-text`,"inherit")}; }`},Gr=`
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
`,tr=`
.oc-sdk { color: ${re}; font-family: ${Mr}; }
.oc-sdk :focus-visible { outline: none; ${Zo} }
.oc-sdk-mono { font-family: ${jt}; }
.oc-sdk-muted { color: ${v}; }
${ze("success")}${ze("warning")}${ze("error")}${ze("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${te}; --oc-sdk-tone-text: ${Vt}; }

.oc-sdk-btn { border-radius: ${Kt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Qo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Vt}; background: ${C(te,10,ce)}; border-color: ${C(te,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${C(te,16,ce)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${C(te,22,ce)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Ir}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${le}, ${le}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Ve}; color: ${xe}; border-color: ${W}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${le}, ${le}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${j}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${le}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${T("status-error","red")}; color: ${zt}; background: ${C("var(--oc-sdk-tone)",7,ce)}; border-color: ${C("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${C("var(--oc-sdk-tone)",9,ce)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${C("var(--oc-sdk-tone)",11,ce)}; }

.oc-sdk-field-note { color: ${v}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${zt}; }
.oc-sdk-input { border-radius: ${Kt}; background: ${Ve}; color: ${xe}; box-shadow: inset 0 0 0 1px ${C(W,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${v}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${qo}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${T("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${T("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${jt}; }

.oc-sdk-search-icon { color: ${v}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${te}; }
.oc-sdk-search-clear { border-radius: ${Qo}; color: ${v}; }
.oc-sdk-search-clear:hover { background: ${j}; color: ${re}; }

.oc-sdk-trigger { border-color: ${W}; border-radius: ${Kt}; background: ${Ve}; color: ${xe}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${le}, ${le}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${v}; }
.oc-sdk-trigger-chevron { color: ${v}; }
.oc-sdk-popup { --surface-foreground: ${xe}; border-color: ${C(W,60)}; border-radius: 12px; background: ${Ve}; color: ${xe}; box-shadow: 0 8px 24px ${C(re,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${j}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Xt}; color: ${Bt}; }
.oc-sdk-option-check { color: ${re}; }
.oc-sdk-option[data-destructive="true"] { color: ${zt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${C(T("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${v}; }
.oc-sdk-popup-empty { color: ${v}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${W}; border-radius: 4px; color: ${re}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${C(re,60,W)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${W}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ce}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${te}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Zo} }
.oc-sdk-check-desc { color: ${v}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${C(re,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${v}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${re}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Bt}; background: ${Xt}; border-color: ${W}; }
.oc-sdk-tab-count { color: ${v}; }

.oc-sdk-badge { border-radius: 9999px; background: ${j}; color: ${v}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${C("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${j}; }
.oc-sdk-row[aria-selected="true"] { background: ${Xt}; color: ${Bt}; }
.oc-sdk-row-lead { font-family: ${jt}; color: ${v}; }
.oc-sdk-row-sub { color: ${v}; }
.oc-sdk-row-meta { color: ${v}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${v}; }

.oc-sdk-empty-body { color: ${v}; }

.oc-sdk-spinner { color: ${v}; }
.oc-sdk-spinner-ring { border-color: ${W}; border-top-color: ${te}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${C("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${C("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${v}; }

.oc-sdk-separator { color: ${v}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${C(W,40)}; }

.oc-sdk-progress-label { color: ${v}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${W}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${te}); }

.oc-sdk-text a { color: ${Vt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${C(W,60)}; }
`,H=`
${dt}
${Gr}
${tr}`;Oe();Qt();var zr="en";var Qe=(e,o)=>new Intl.NumberFormat(zr,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e),Ze=(e)=>{let o=["B","KB","MB","GB","TB"],n=Math.max(0,e),p=0;while(n>=1024&&p<o.length-1)n/=1024,p+=1;let d=p>=3&&n<100?1:0;return`${Qe(n,d)} ${o[p]}`},Zt=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${Qe(e,e<10?1:0)}%`},_e=(e)=>`${Qe(e,1)}%`;var rr=(e)=>{if(e===0)return"0 KB/s";if(e<=0)return"0 B/s";let o=["B/s","KB/s","MB/s","GB/s","TB/s"],n=e,p=0;while(n>=1024&&p<o.length-1)n/=1024,p+=1;let d=p>=3&&n<100?1:0;return`${Qe(n,d)} ${o[p]}`},nr=(e,o)=>`上傳 ${rr(e)} · 下載 ${rr(o)}`;var sr=`
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
`,ir=`
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
`,ar=`
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
`;var cr=90;var jr=0,ne=(e,o)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[p,d]of Object.entries(o))n.setAttribute(p,String(d));return n},lr=(e)=>{let o=document.createElement("div");o.className="chart",o.style.height=`${e.height}px`;let n=e.height,p=ne("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),d=`fill-${++jr}`,A=ne("defs",{}),L=ne("linearGradient",{id:d,x1:0,x2:0,y1:0,y2:1});L.append(ne("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),ne("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),A.append(L);let u=ne("path",{d:"",class:"chart-grid"}),M=ne("path",{d:"",fill:`url(#${d})`}),h=ne("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});p.append(A,u,M,h);let x=document.createElement("div");x.className="chart-cursor";let P=document.createElement("div");P.className="chart-dot",P.style.background=e.color;let F=document.createElement("div");F.className="chart-tip",o.append(p,x,P,F);let b=[],Z=1,I=null,z=null,g=(k,y)=>(e.capacity-y+k)/Math.max(1,e.capacity-1)*300,G=(k)=>n-1-Math.min(k,Z)/Z*(n-1-2),q=()=>{let k=I===null?void 0:b[I];if(I===null||k===void 0){o.classList.remove("hovering");return}o.classList.add("hovering");let y=o.getBoundingClientRect(),s=g(I,b.length)/300*y.width,a=G(k)/n*y.height;x.style.transform=`translateX(${s}px)`,P.style.transform=`translate(${s}px, ${a}px)`;let N=(b.length-1-I)*e.intervalSeconds;F.textContent=`${e.format(k)} · ${N===0?"now":`${N} s ago`}`;let ee=s>y.width/2;F.style.left=ee?"":`${s+8}px`,F.style.right=ee?`${y.width-s+8}px`:""},Y=(k)=>{if(b.length===0)return;let y=o.getBoundingClientRect(),s=(k-y.left)/y.width*(e.capacity-1),a=Math.round(s-(e.capacity-b.length));I=Math.min(b.length-1,Math.max(0,a)),q()};return o.addEventListener("pointermove",(k)=>{z=k.clientX,Y(k.clientX)}),o.addEventListener("pointerleave",()=>{z=null,I=null,q()}),{element:o,update:(k,y)=>{if(b=k,Z=y>0?y:1,u.setAttribute("d",[0.25,0.5,0.75].map((s)=>`M0 ${n*s} H300`).join(" ")),b.length===0)M.setAttribute("d",""),h.setAttribute("d","");else{let s=b.map((ae,ye)=>`${g(ye,b.length).toFixed(2)} ${G(ae).toFixed(2)}`),a=b.length===1,N=a?`M${g(0,1)-2} ${s[0]?.split(" ")[1]} L${s[0]}`:`M${s.join(" L")}`;h.setAttribute("d",N);let ee=a?g(0,1)-2:g(0,b.length);M.setAttribute("d",`${N} L300 ${n} L${ee.toFixed(2)} ${n} Z`)}if(z!==null)Y(z)}}};var qe=$t(),be=document.querySelector("#root");if(!be)throw Error("Missing #root");var mr=document.createElement("style");mr.textContent=sr+ir+ar;document.head.append(mr);var Kr=ge/1000,fr=lr({color:"var(--oc-primary)",height:18,capacity:cr,format:(e)=>`${e}ms`,intervalSeconds:Kr}),eo=(e)=>{let o=J("span","meter-fill");return o.style.background=e,{element:J("div","meter","",[o]),set:(p)=>{o.style.width=`${Math.min(100,Math.max(0,p))}%`}}},Er=eo("var(--oc-info)"),hr=eo("var(--oc-success)"),qt=eo("var(--oc-success)"),se=(e,o,n,p)=>{let d=J("div","line","",[J("span","what",e),o??J("div","meter-empty"),J("span","value num",n)]);if(p)d.title=p;return d},et=se("OpenChamber",fr.element,"–","Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU counts 100% per core."),tt=se("CPU",Er.element,"–"),ot=se("Memory",hr.element,"–"),rt=se("Network",null,"—","Upload and download speed from active interfaces."),nt=se("LLM Status",null,"—","Model load state: mounted (loaded) or unmounted (unloaded)."),st=se("Prefill",qt.element,"—","Prompt processing progress percentage."),it=se("Generate",null,"—","Number of tokens generated in the current run."),Te=se("Dev servers",null,""),dr=J("div","ports"),de=J("div","note","Reading…");be.append(de,et,tt,ot,rt,nt,st,it,Te);var Wr=()=>{for(let e of[et,tt,ot,rt,nt,st,it,Te])e.hidden=!0};var Jr=(e)=>{let{system:o,app:n}=e;tt.hidden=!1,ot.hidden=!1;let p=o.cpu??0;Er.set(o.cpu!==null?p:0),tt.querySelector(".value").textContent=Zt(o.cpu);let d=Math.round(o.memoryUsed/Math.max(1,o.memoryTotal)*100);hr.set(d),ot.querySelector(".value").textContent=`${Ze(o.memoryUsed)} / ${Ze(o.memoryTotal)}`,rt.hidden=!1;let A=rt.querySelector(".value");A.textContent=nr(o.networkSpeedUp,o.networkSpeedDown),et.hidden=e.warnings.includes("processes-unavailable");let L=et.querySelector(".value");L.textContent=`${Ze(n.memory)} · ${Zt(n.cpu)}`,fr.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),nt.hidden=!1,st.hidden=!1,it.hidden=!1;let{lmStudio:u}=e,h=(Array.isArray(u.models)?u.models.find((g)=>g.id===u.modelName):void 0)?.displayName||u.modelName,x;if(u.modelName)switch(u.state){case"loaded":x=h??"—";break;case"loading":x=`${h} · 載入中 ${_e(u.prefillProgress)}`;break;case"unloaded":x=h?`${h} · 卸載`:"卸載";break;case"error":x=h?`${h} · 錯誤`:"錯誤";break;default:x=h??"—"}else switch(u.state){case"loaded":x="掛載";break;case"unloaded":x="卸載";break;case"loading":x=`載入中 ${_e(u.prefillProgress)}`;break;case"error":x="錯誤";break;default:x="—"}let P=nt.querySelector(".value");P.textContent=x,P.className=u.state==="loaded"?"value num lm-state-loaded lm-state-dim":`value num lm-state-${u.state}`;let F=st.querySelector(".value"),b=it.querySelector(".value");if(u.prefillProgress>0||u.generateTokens>0||u.tokensPerSecond&&u.tokensPerSecond>0){let g=u.prefillProgress>0&&u.prefillProgress<100?u.prefillProgress:100,G=u.prefillTokensPerSecond;F.textContent=G&&G>0?`${_e(g)} · ${G.toFixed(1)} tok/s`:_e(g),qt.set(g);let q=u.tokensPerSecond;if(q&&q>0){let Y=u.generateTokens>0?`${u.generateTokens.toLocaleString()} tokens · `:"";b.textContent=`${Y}${q.toFixed(1)} tok/s`}else if(u.generateTokens>0)b.textContent=u.generateTokens.toLocaleString();else b.textContent="—"}else F.textContent="—",qt.set(0),b.textContent="—";let I=[...new Set(e.servers.flatMap((g)=>g.ports))].sort((g,G)=>g-G);if(I.length>0&&!e.warnings.includes("processes-unavailable")){Te.hidden=!1,dr.replaceChildren(...I.slice(0,6).map((G)=>Yt(qe,G)));let g=Te.querySelector(".value");if(g.replaceChildren(...dr.children),I.length>6)g.appendChild(J("span","muted",` +${I.length-6}`))}else Te.hidden=!0;let z=e.warnings.includes("processes-unavailable");de.hidden=!z,de.className=z?"note error":"note",de.textContent=z?"Could not read the process list; showing system totals only.":""},Yr={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."};function Qr(e){de.hidden=!1,de.className="note error",de.textContent=Yr[e]??"Could not reach the monitoring service.",Wr()}var pr=!1;qe.onReady(async(e)=>{if(Ft(e,document.documentElement),pr)return;pr=!0;let{startPolling:o}=await Promise.resolve().then(() => (Qt(),or)),{refresh:n}=o(qe,be,(p)=>{Jr(p)},Qr);n()});var ur=-1;new ResizeObserver(()=>{let e=Math.ceil(be.getBoundingClientRect().height);if(e===ur)return;ur=e,qe.setHeight(e).catch(()=>{return})}).observe(be);})();
