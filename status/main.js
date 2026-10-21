(()=>{var mr=Object.defineProperty;var Er=(e)=>e;function hr(e,r){this[e]=Er.bind(null,r)}var _r=(e,r)=>{for(var n in r)mr(e,n,{get:r[n],enumerable:!0,configurable:!0,set:hr.bind(r,n)})};var P=(e,r)=>()=>(e&&(r=e(e=0)),r);var f="openchamber.sdk",m=1;var ve=()=>{};function co(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(p)=>{let l=p.target===e?r:p.target;if(!(l instanceof Element))return;if(!l.hasAttribute("data-oc-scrolling"))l.setAttribute("data-oc-scrolling","");let _=n.get(l);if(_!==void 0)clearTimeout(_);n.set(l,setTimeout(()=>{n.delete(l),l.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var at=`
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
`,Sr;var ke=P(()=>{Sr=`(${co.toString()})(document);`});var ct=128,dt=65536;var we=128,Oe=65536;var lt=()=>{};var fo,lo=(e)=>Object(e)===e&&!Array.isArray(e),pt=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),po=(e)=>String(e)===e&&e.length>=1&&e.length<=60,uo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,mo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!lo(n)||!fo.test(n.id)||!po(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!pt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!pt(n,["kind","id","label","value","options","disabled"]))return!1;if(!uo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let p=new Set;for(let l of n.options){if(!lo(l)||!pt(l,["value","label"])||!uo(l.value)||!po(l.label)||p.has(l.value))return!1;p.add(l.value)}if(!p.has(n.value))return!1}return!0};var ut=P(()=>{fo=/^[a-z][a-z0-9-]{0,39}$/});var Eo=()=>{};var ho=()=>{};var Re=20000000,Ue=256,ft=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,_o=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var mt=()=>{};var So,xo,To=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let p=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let l of p)if(!To(l,r+1,n))return!1;return!0},Et=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(Et);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(Et)}return String(e)===e||Number.isFinite(e)},ht=(e)=>{try{if(String(e.id)!==e.id||!So.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!xo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!To(e.data)||!Et(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var _t=P(()=>{So=/^[A-Za-z0-9_-]{1,80}$/,xo=["left","right","top","bottom"]});var bo,xt=(e)=>Boolean(e&&"sessionId"in e),Tt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),yo,gt=(e)=>yo.test(e),Ie=500,Ce=32000,Ao=16000,vo=128,ko=200,wo=2000,Oo=16000,Ro=80,Uo=200,Io=16000,Co=2000,bt=20000,Le=1024,Me=2000000,Ge=64000,Ne=8000,yt=4000,At=90000,Lo=999,Mo=1e4,he=500,Go,No,xr,Po=(e)=>xr.has(e),Do=(e)=>e&&Po(e)?e:"HOST_REJECTED",pe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(pe);if(Object(e)===e)return Object.values(e).every(pe);return!1},$o=(e)=>pe(e)&&JSON.stringify(e).length<=Io,go=(e)=>e?.trim().slice(0,Uo)??"",ue=(e)=>{let r=e.id.trim().slice(0,vo),n=e.title.trim().slice(0,ko),p=e.url.trim().slice(0,wo),l=e.text?.trim().slice(0,Oo),_=e.author?.trim().slice(0,Ro),g=e.kind==="pull"?"pull":"issue",R={providerId:e.providerId.trim(),id:r,title:n||r,url:p,kind:g};if(l)R.text=l;if(_)R.author=_;if(g==="pull"){let S=go(e.branches?.head),v=go(e.branches?.base);if(S&&v)R.branches={head:S,base:v}}if($o(e.data))R.data=e.data;return R},vt=(e)=>{let r=ue(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},kt=(e)=>{let r={text:e.text.trim().slice(0,Ao)};if(e.send)r.send=!0;return r},wt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Lo,Math.max(0,Math.round(e)))},Ot=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Mo,Math.max(0,Math.ceil(e)))},fe=(e)=>e.length>0&&e.length<=Le&&!e.includes("\x00")&&!e.includes("\\"),Pe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Co)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Tr,Rt=(e)=>Boolean(e&&"status"in e&&Tr.has(String(e.status))&&!("body"in e)),De=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Ut=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),It=(e)=>Boolean(e&&"written"in e&&e.written===!0),Ct=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),gr,Lt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&gr.has(String(e.kind))&&Number.isFinite(e.size)),Mt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),br,yr=(e)=>Object(e)===e?e:null,St=(e)=>String(e)===e&&e.length>0,Ar=(e)=>{if(!St(e.id))return null;if(e.ok===!0){let r={channel:f,v:m,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&St(e.error))return{channel:f,v:m,type:"result",id:e.id,ok:!1,error:e.error,code:Do(St(e.code)?e.code:void 0)};return null},Gt=(e)=>{let r=yr(e);if(!r||r.channel!==f||r.v!==m)return null;if(r.type==="result")return Ar(r);if(!br.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var $e=P(()=>{ve();bo=["file","directory","other","missing"],yo=/^[0-9a-f]{7,64}$/i,Go=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],No=["stopped","starting","ready","failed"],xr=new Set(Go),Tr=new Set(No),gr=new Set(bo),br=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"])});var Ho=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),vr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",d,Fo=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),He=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${Le} characters without NUL or backslash.`)),Fe=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},u=(e)=>(e.value+=1,`oc-${e.value}`),Nt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),p=e.requestTimeoutMs??bt,l=new Set,_=new Set,g=new Set,R=new Set,S=new Set,v=new Set,K=new Set,G=new Set,N=new Set,E=null,F=null,B=new Set,Q=new Set,W=null,te=null,le=!1,Z=new Map,ne=new Map,A=new Map,b=!1,s={value:0},a=null,C=null,Y=!1,se=!1,ge=null,Zt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},V=(t)=>{r.parent.postMessage(t,"*")},U=(t,o)=>{for(let i of t)try{i(o)}catch(c){console.error(c)}},qt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=Gt(t.data);if(!o)return;if(o.type==="workspace"){let c=ne.get(o.payload.subscriptionId);if(c)U([c],o.payload.snapshot);return}if(o.type==="shells"){let c=A.get(o.payload.subscriptionId);if(c)U([c],o.payload.snapshot);return}if(o.type==="ready"){if(a=o.payload,C=Zt(o.payload.session),U(l,o.payload),U(_,o.payload.directory),U(g,o.payload.session),C)U(R,C);U(S,o.payload.connection),U(v,o.payload.settings),U(K,o.payload.item);return}if(o.type==="directory"){if(a)a={...a,directory:o.payload.directory};U(_,o.payload.directory);return}if(o.type==="session"){if(a)a={...a,session:o.payload.session};if(!o.payload.session)C=null;else if(C?.sessionId!==o.payload.session.id)C=Zt(o.payload.session);U(g,o.payload.session);return}if(o.type==="session-lifecycle"){C=o.payload,U(R,o.payload);return}if(o.type==="connection"){if(a)a={...a,connection:o.payload.connection};U(S,o.payload.connection);return}if(o.type==="settings"){if(a)a={...a,settings:o.payload.settings};U(v,o.payload.settings);return}if(o.type==="item"){if(a)a={...a,item:o.payload.item};U(K,o.payload.item);return}if(o.type==="status-control-event"){U(G,o.payload);return}if(o.type==="popover-closed"){U(N,o.payload);return}if(o.type==="action"){let c=(h)=>{if(!b)V({channel:f,v:m,type:"action-result",id:o.id,payload:h})},x=F;if(!x){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>x(o.payload)).then(()=>c({ok:!0}),(h)=>{let O=(h instanceof Error?h.message:String(h)).trim();c({ok:!1,error:(O||"Action failed.").slice(0,he)})});return}if(o.type==="file-open"){let c=o.payload;if(te&&_o(te,c))return;te=c,U(B,o.payload);return}if(o.type==="file-saved"){U(Q,o.payload.version);return}if(o.type==="file-snapshot"){let c=(O)=>{if(!b)V({channel:f,v:m,type:"file-snapshot-result",id:o.id,payload:O})},x=(O)=>c({error:(O.trim()||"Could not read the edited file.").slice(0,he)}),h=W;if(!h){x("This extension does not edit files.");return}Promise.resolve().then(()=>h(o.payload.purpose)).then((O)=>{if(ft(O)>Re){x(`The file is over ${Re} ${"bytes"in O?"bytes":"characters"}.`);return}if(O.version.length>Ue){x(`The snapshot version is over ${Ue} characters.`);return}c({snapshot:"bytes"in O?{bytes:O.bytes,version:O.version}:{content:O.content,version:O.version}})},(O)=>x(O instanceof Error?O.message:String(O)));return}if(o.type==="resolve"){let c=(h)=>{V({channel:f,v:m,type:"resolve-result",id:o.id,payload:h})},x=E;if(!x){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>x(o.payload)).then((h)=>c({item:h?ue(h):null}),(h)=>{let O=(h instanceof Error?h.message:String(h)).trim();c({error:(O||"Command failed.").slice(0,he)})});return}let i=Z.get(o.id);if(!i)return;if(clearTimeout(i.timer),Z.delete(o.id),o.ok){i.resolve(o.payload);return}i.reject(new d(o.code,o.error))};r.addEventListener("message",qt),V({channel:f,v:m,type:"hello"});let L=(t,o=p)=>{if(b||r.parent===r)return Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((i,c)=>{let x=setTimeout(()=>{Z.delete(t.id),c(new d("HOST_TIMEOUT","Host did not answer in time."))},o);Z.set(t.id,{resolve:i,reject:c,timer:x}),V(t)})},k=(t)=>L(t).then(()=>{return}),w={channel:f,v:m},nt=(t)=>{if(!b&&r.parent!==r)V(t)},eo=()=>nt({...w,type:"file-save"}),to=(t)=>{if(!Ho(t)||!vr(t))return;t.preventDefault(),eo()},oo=(t)=>{if(!Ho(t)||t.key!=="Escape"||a?.surface!=="popover"||!a.popover)return;t.preventDefault(),io(a.popover.id,"escape").catch(()=>{return})},be=()=>{let t=a?.surface==="popover"?a.popover:void 0;if(!t)return;let o=Y||se;if(ge===o)return;ge=o,ao(t.id,o).catch(()=>{return})},ye=()=>{if(a?.surface!=="popover"||Y)return;Y=!0,be()},ro=(t)=>{if(a?.surface!=="popover"||t.relatedTarget!==null||!Y)return;Y=!1,be()},no=()=>{if(a?.surface!=="popover"||se)return;se=!0,be()},so=()=>{if(a?.surface!=="popover"||!se)return;se=!1,be()},J=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new d("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},st=async(t)=>{if(t.kind!=="projects")J(t.projectId);let o=await L({...w,type:"workspace-read",id:u(s),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return o},it=async(t,o)=>{if(t.kind!=="projects")J(t.projectId);let i=u(s);ne.set(i,o);try{await k({...w,type:"workspace-subscribe",id:u(s),payload:{subscriptionId:i,query:t}})}catch(c){if(ne.delete(i),!b)V({...w,type:"workspace-unsubscribe",id:u(s),payload:{subscriptionId:i}});throw c}return()=>{if(!ne.delete(i)||b)return;V({...w,type:"workspace-unsubscribe",id:u(s),payload:{subscriptionId:i}})}},fr=async(t,o)=>{if(t.kind==="session")J(t.sessionId);if(t.kind==="project")J(t.projectId);let i=u(s);A.set(i,o);try{await k({...w,type:"shells-subscribe",id:u(s),payload:{subscriptionId:i,scope:t}})}catch(c){if(A.delete(i),!b)V({...w,type:"shells-unsubscribe",id:u(s),payload:{subscriptionId:i}});throw c}return()=>{if(!A.delete(i)||b)return;V({...w,type:"shells-unsubscribe",id:u(s),payload:{subscriptionId:i}})}},Ae=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>ct))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!pe(t.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>dt)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&a?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let o=await L({...w,type:"storage",id:u(s),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new d("HOST_REJECTED","Host did not return storage data.");return o},io=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):k({...w,type:"popover-close",id:u(s),payload:o?{id:t,reason:o}:{id:t}}),ao=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):k({...w,type:"popover-anchor",id:u(s),payload:{id:t,active:o}});return r.addEventListener("keydown",oo,!0),r.addEventListener("pointerover",ye),r.addEventListener("pointermove",ye),r.addEventListener("pointerout",ro),r.addEventListener("focus",no),r.addEventListener("blur",so),{onAction:(t)=>(F=t,()=>{if(F===t)F=null}),listProjects:async()=>{let t=await st({kind:"projects"});if(t.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await st({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await st({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>it({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>it({kind:"worktrees",projectId:t},(i)=>{if(i.kind==="worktrees")o(i)}),onSessions:(t,o)=>it({kind:"sessions",projectId:t},(i)=>{if(i.kind==="sessions")o(i)}),onRunningShells:(t,o)=>fr(t,o),readShellOutput:async(t,o)=>{J(t,we);let i=o?.cursor;if(i!==void 0&&(!Number.isInteger(i)||i<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=o?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>Oe))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Oe}.`);let h=await L({...w,type:"shell-output",id:u(s),payload:{shellId:t,cursor:i,tailBytes:c}});if(!h||typeof h.output!=="string"||!Number.isFinite(h.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return h},stopShell:async(t)=>{if(J(t,we),(await L({...w,type:"shell-stop",id:u(s),payload:{shellId:t}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{J(t),await k({...w,type:"open-session",id:u(s),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let i=Fe(o),c={op:"get",key:t};if(i)c.scope=i;let x=await Ae(c);return x.op==="get"&&x.found?x.value:void 0},set:async(t,o,i)=>{let c=Fe(i),x={op:"set",key:t,value:o};if(c)x.scope=c;await Ae(x)},delete:async(t,o)=>{let i=Fe(o),c={op:"delete",key:t};if(i)c.scope=i;await Ae(c)},keys:async(t)=>{let o=Fe(t),i={op:"keys"};if(o)i.scope=o;let c=await Ae(i);if(c.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:(t)=>{if(l.add(t),a)t(a);return()=>{l.delete(t)}},onDirectory:(t)=>{if(_.add(t),a)t(a.directory);return()=>{_.delete(t)}},onSession:(t)=>{if(g.add(t),a)t(a.session);return()=>{g.delete(t)}},onSessionLifecycle:(t)=>{if(R.add(t),C)t(C);return()=>{R.delete(t)}},onConnection:(t)=>{if(S.add(t),a)t(a.connection);return()=>{S.delete(t)}},onSettings:(t)=>{if(v.add(t),a)t(a.settings);return()=>{v.delete(t)}},onItem:(t)=>{if(K.add(t),a)t(a.item);return()=>{K.delete(t)}},onStatusControl:(t)=>(G.add(t),()=>{G.delete(t)}),onPopoverClosed:(t)=>(N.add(t),()=>{N.delete(t)}),setStatusControls:(t)=>{if(a?.features?.statusControls!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support status controls."));if(!mo(t))return Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...w,type:"status-controls",id:u(s),payload:{controls:t}})},openPopover:(t)=>{if(a?.features?.popovers!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support popovers."));if(!ht(t))return Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...w,type:"popover-open",id:u(s),payload:t})},closePopover:io,setPopoverAnchorActive:ao,onResolve:(t)=>(E=t,()=>{if(E===t)E=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Ie)return Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${Ie} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ce))return Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${Ce} characters.`));return k({channel:f,v:m,type:"toast",id:u(s),payload:{...t,message:o}})},openUrl:(t)=>k({channel:f,v:m,type:"open-url",id:u(s),payload:{url:t}}),openCommit:(t)=>gt(t)?k({channel:f,v:m,type:"open-commit",id:u(s),payload:{sha:t}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>k({channel:f,v:m,type:"open-surface",id:u(s),payload:{surfaceId:t}}),writeClipboard:(t)=>k({channel:f,v:m,type:"clipboard-write",id:u(s),payload:{text:t}}),compose:(t)=>k({channel:f,v:m,type:"compose",id:u(s),payload:t}),attach:(t)=>k({channel:f,v:m,type:"attach",id:u(s),payload:ue(t)}),startSession:async(t)=>{if(t.projectId!==void 0)J(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")J(o.directory);else{if(o.name!==void 0)J(o.name,200);if(o.baseBranch!==void 0)J(o.baseBranch,200)}let i=await L({channel:f,v:m,type:"start-session",id:u(s),payload:vt(t)},e.requestTimeoutMs??180000);if(!xt(i))throw new d("HOST_REJECTED","Host did not return a session.");return i},prompt:(t)=>L({channel:f,v:m,type:"prompt",id:u(s),payload:kt(t)}).then((o)=>{if(!Tt(o))throw new d("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>k({channel:f,v:m,type:"session-link",id:u(s),payload:ue(t)}),close:()=>k({channel:f,v:m,type:"close",id:u(s)}),oauthStart:()=>k({channel:f,v:m,type:"oauth-start",id:u(s)}),oauthDisconnect:()=>k({channel:f,v:m,type:"oauth-disconnect",id:u(s)}),request:(t)=>(Pe(t.path)?L({channel:f,v:m,type:"request",id:u(s),payload:t}):Fo()).then((o)=>{if(!De(o))throw new d("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Pe(t.path)?L({channel:f,v:m,type:"service-request",id:u(s),payload:t}):Fo()).then((o)=>{if(!De(o))throw new d("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>L({channel:f,v:m,type:"service-status",id:u(s)}).then((t)=>{if(!Rt(t))throw new d("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(fe(t)?L({channel:f,v:m,type:"file-read",id:u(s),payload:{path:t}}):He()).then((o)=>{if(!Ut(o))throw new d("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!fe(t))return He();if(o.length>Me)return Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${Me} characters.`));return L({channel:f,v:m,type:"file-write",id:u(s),payload:{path:t,content:o}}).then((i)=>{if(!It(i))throw new d("HOST_REJECTED","Host did not confirm the write.");return i})},listDir:(t)=>(fe(t)?L({channel:f,v:m,type:"file-list",id:u(s),payload:{path:t}}):He()).then((o)=>{if(!Ct(o))throw new d("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(fe(t)?L({channel:f,v:m,type:"file-stat",id:u(s),payload:{path:t}}):He()).then((o)=>{if(!Lt(o))throw new d("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),i=t.system?.trim();if(o.length===0||o.length>Ge)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${Ge} characters.`));if(i!==void 0&&(i.length===0||i.length>Ne))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${Ne} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(yt,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let x={prompt:o};if(i!==void 0)x.system=i;if(c!==void 0)x.maxOutputTokens=c;return L({channel:f,v:m,type:"generate",id:u(s),payload:x},e.requestTimeoutMs??At).then((h)=>{if(!Mt(h))throw new d("HOST_REJECTED","Host did not return generated text.");return h})},setBadge:(t)=>k({channel:f,v:m,type:"badge",id:u(s),payload:{count:wt(t)}}),setHeight:(t)=>k({channel:f,v:m,type:"resize",id:u(s),payload:{height:Ot(t)}}),onFileOpen:(t)=>{if(B.add(t),!le)le=!0,r.addEventListener("keydown",to,!0);if(te)t(te);return()=>{B.delete(t)}},onFileSnapshot:(t)=>(W=t,()=>{if(W===t)W=null}),onFileSaved:(t)=>(Q.add(t),()=>{Q.delete(t)}),reportFileChange:(t)=>nt({...w,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:eo,reportFileUnsupported:()=>nt({...w,type:"file-unsupported"}),dispose:()=>{for(let t of ne.keys())V({...w,type:"workspace-unsubscribe",id:u(s),payload:{subscriptionId:t}});ne.clear();for(let t of A.keys())V({...w,type:"shells-unsubscribe",id:u(s),payload:{subscriptionId:t}});if(A.clear(),b=!0,E=null,F=null,W=null,B.clear(),Q.clear(),le)r.removeEventListener("keydown",to,!0);r.removeEventListener("message",qt),r.removeEventListener("keydown",oo,!0),r.removeEventListener("pointerover",ye),r.removeEventListener("pointermove",ye),r.removeEventListener("pointerout",ro),r.removeEventListener("focus",no),r.removeEventListener("blur",so);for(let t of Z.values())clearTimeout(t.timer),t.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));Z.clear(),l.clear(),_.clear(),g.clear(),R.clear(),S.clear(),v.clear(),K.clear(),G.clear(),N.clear()}}};var Xo=P(()=>{ve();ut();_t();mt();$e();lt();d=class d extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}});var Bo,hn;var Vo=P(()=>{Bo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"],hn=new Set(Bo)});var zo,Sn;var jo=P(()=>{zo=["none","agent","user"],Sn=new Set(zo)});var Pt=P(()=>{ve();ke();lt();ut();Eo();ho();mt();Xo();_t();$e();$e();Vo();jo()});var j=(e,r="",n="",p=[])=>{let l=document.createElement(e);if(r)l.className=r;if(n)l.textContent=n;if(p.length>0)l.append(...p);return l};var qo={};_r(qo,{FAILURE_TEXT:()=>Nr,POLL_MS:()=>Je,isOnScreen:()=>We,portButton:()=>Kt,requestStop:()=>$r,startPolling:()=>Hr});var Je=2000,Nr,Se=(e)=>typeof e==="object"&&e!==null,Pr=(e)=>Se(e)&&typeof e.at==="number"&&Se(e.system)&&Se(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&Se(e.history)&&Se(e.lmStudio),Dr=(e)=>{if(!(e instanceof d))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},$r=async(e,r)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(r)})).status===200}catch{return!1}},Kt=(e,r)=>{let n=j("button","port",`:${r}`);return n.type="button",n.title=`Open http://localhost:${r}`,n.addEventListener("click",(p)=>{p.stopPropagation(),e.openUrl(`http://localhost:${r}`).catch(()=>{return})}),n},We=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Hr=(e,r,n,p)=>{let l=!1,_=async()=>{if(l||!We(r))return;l=!0;try{let S=await e.serviceRequest({method:"GET",path:"/snapshot"}),v;try{v=JSON.parse(S.body)}catch{v=null}if(S.status===200&&Pr(v))n(v);else p(S.status===200?"bad-answer":"service-failed")}catch(S){p(Dr(S))}finally{l=!1}};_(),setInterval(()=>{_()},Je);let g=We(r),R=()=>{let S=We(r);if(S&&!g)_();g=S};return document.addEventListener("visibilitychange",R),new ResizeObserver(R).observe(document.documentElement),{refresh:()=>{_()}}};var Wt=P(()=>{Pt();Nr={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."}});Pt();var kr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],wr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Ko=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,p]of kr)r.style.setProperty(n,e.tokens[p]);for(let[n,p,l]of wr){let _=e.tokens[l]??"";r.style.setProperty(n,_),r.style.setProperty(p,_)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Dt=(e,r)=>{if(Ko(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};ke();var Or={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},T=(e,r)=>`var(--${e}, var(--oc-${Or[e]}, ${r}))`,ie=T("surface-background","transparent"),Xe=T("surface-elevated","transparent"),_e=T("surface-elevated-foreground","inherit"),oe=T("surface-foreground","inherit"),y=T("surface-muted-foreground","gray"),Rr=T("surface-muted","transparent"),z=T("interactive-border","currentColor"),X=T("interactive-hover","transparent"),ae=T("interactive-active","transparent"),$t=T("interactive-selection","transparent"),Ht=T("interactive-selection-foreground","inherit"),Yo=T("interactive-focus-ring","currentColor"),q=T("primary","currentColor"),Ft=T("primary-text","inherit"),Xt=T("error-text","inherit"),Ur=T("font-sans","inherit"),Bt=T("font-mono","monospace"),Qo=T("radius","9px"),Vt=`calc(${Qo} - 2px)`,Wo=`calc(${Qo} - 4px)`,I=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,Jo=`box-shadow: 0 0 0 2px ${Yo};`,Be=(e)=>{let r=T(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${T(`${e}-text`,"inherit")}; }`},Ir=`
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
`,Zo=`
.oc-sdk { color: ${oe}; font-family: ${Ur}; }
.oc-sdk :focus-visible { outline: none; ${Jo} }
.oc-sdk-mono { font-family: ${Bt}; }
.oc-sdk-muted { color: ${y}; }
${Be("success")}${Be("warning")}${Be("error")}${Be("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${q}; --oc-sdk-tone-text: ${Ft}; }

.oc-sdk-btn { border-radius: ${Vt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Wo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Ft}; background: ${I(q,10,ie)}; border-color: ${I(q,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${I(q,16,ie)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${I(q,22,ie)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Rr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${X}, ${X}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Xe}; color: ${_e}; border-color: ${z}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${X}, ${X}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${X}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ae}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${T("status-error","red")}; color: ${Xt}; background: ${I("var(--oc-sdk-tone)",7,ie)}; border-color: ${I("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${I("var(--oc-sdk-tone)",9,ie)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${I("var(--oc-sdk-tone)",11,ie)}; }

.oc-sdk-field-note { color: ${y}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Xt}; }
.oc-sdk-input { border-radius: ${Vt}; background: ${Xe}; color: ${_e}; box-shadow: inset 0 0 0 1px ${I(z,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${y}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${X}, ${X}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Yo}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${T("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${T("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Bt}; }

.oc-sdk-search-icon { color: ${y}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${q}; }
.oc-sdk-search-clear { border-radius: ${Wo}; color: ${y}; }
.oc-sdk-search-clear:hover { background: ${X}; color: ${oe}; }

.oc-sdk-trigger { border-color: ${z}; border-radius: ${Vt}; background: ${Xe}; color: ${_e}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${X}, ${X}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${y}; }
.oc-sdk-trigger-chevron { color: ${y}; }
.oc-sdk-popup { --surface-foreground: ${_e}; border-color: ${I(z,60)}; border-radius: 12px; background: ${Xe}; color: ${_e}; box-shadow: 0 8px 24px ${I(oe,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${X}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${$t}; color: ${Ht}; }
.oc-sdk-option-check { color: ${oe}; }
.oc-sdk-option[data-destructive="true"] { color: ${Xt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${I(T("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${y}; }
.oc-sdk-popup-empty { color: ${y}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${z}; border-radius: 4px; color: ${oe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${I(oe,60,z)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${z}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ie}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${q}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Jo} }
.oc-sdk-check-desc { color: ${y}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${I(oe,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${y}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${oe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ht}; background: ${$t}; border-color: ${z}; }
.oc-sdk-tab-count { color: ${y}; }

.oc-sdk-badge { border-radius: 9999px; background: ${X}; color: ${y}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${I("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${X}; }
.oc-sdk-row[aria-selected="true"] { background: ${$t}; color: ${Ht}; }
.oc-sdk-row-lead { font-family: ${Bt}; color: ${y}; }
.oc-sdk-row-sub { color: ${y}; }
.oc-sdk-row-meta { color: ${y}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${y}; }

.oc-sdk-empty-body { color: ${y}; }

.oc-sdk-spinner { color: ${y}; }
.oc-sdk-spinner-ring { border-color: ${z}; border-top-color: ${q}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${I("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${I("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${y}; }

.oc-sdk-separator { color: ${y}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${I(z,40)}; }

.oc-sdk-progress-label { color: ${y}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${z}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${q}); }

.oc-sdk-text a { color: ${Ft}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${I(z,60)}; }
`,M=`
${at}
${Ir}
${Zo}`;ke();Wt();var Fr="en";var er=(e,r)=>new Intl.NumberFormat(Fr,{minimumFractionDigits:r,maximumFractionDigits:r}).format(e),Ye=(e)=>{let r=["B","KB","MB","GB","TB"],n=Math.max(0,e),p=0;while(n>=1024&&p<r.length-1)n/=1024,p+=1;let l=p>=3&&n<100?1:0;return`${er(n,l)} ${r[p]}`},Jt=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${er(e,e<10?1:0)}%`};var tr=`
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
`,or=`
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
`,rr=`
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
`;var nr=90;var Xr=0,re=(e,r)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[p,l]of Object.entries(r))n.setAttribute(p,String(l));return n},sr=(e)=>{let r=document.createElement("div");r.className="chart",r.style.height=`${e.height}px`;let n=e.height,p=re("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),l=`fill-${++Xr}`,_=re("defs",{}),g=re("linearGradient",{id:l,x1:0,x2:0,y1:0,y2:1});g.append(re("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),re("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),_.append(g);let R=re("path",{d:"",class:"chart-grid"}),S=re("path",{d:"",fill:`url(#${l})`}),v=re("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});p.append(_,R,S,v);let K=document.createElement("div");K.className="chart-cursor";let G=document.createElement("div");G.className="chart-dot",G.style.background=e.color;let N=document.createElement("div");N.className="chart-tip",r.append(p,K,G,N);let E=[],F=1,B=null,Q=null,W=(A,b)=>(e.capacity-b+A)/Math.max(1,e.capacity-1)*300,te=(A)=>n-1-Math.min(A,F)/F*(n-1-2),le=()=>{let A=B===null?void 0:E[B];if(B===null||A===void 0){r.classList.remove("hovering");return}r.classList.add("hovering");let b=r.getBoundingClientRect(),s=W(B,E.length)/300*b.width,a=te(A)/n*b.height;K.style.transform=`translateX(${s}px)`,G.style.transform=`translate(${s}px, ${a}px)`;let C=(E.length-1-B)*e.intervalSeconds;N.textContent=`${e.format(A)} · ${C===0?"now":`${C} s ago`}`;let Y=s>b.width/2;N.style.left=Y?"":`${s+8}px`,N.style.right=Y?`${b.width-s+8}px`:""},Z=(A)=>{if(E.length===0)return;let b=r.getBoundingClientRect(),s=(A-b.left)/b.width*(e.capacity-1),a=Math.round(s-(e.capacity-E.length));B=Math.min(E.length-1,Math.max(0,a)),le()};return r.addEventListener("pointermove",(A)=>{Q=A.clientX,Z(A.clientX)}),r.addEventListener("pointerleave",()=>{Q=null,B=null,le()}),{element:r,update:(A,b)=>{if(E=A,F=b>0?b:1,R.setAttribute("d",[0.25,0.5,0.75].map((s)=>`M0 ${n*s} H300`).join(" ")),E.length===0)S.setAttribute("d",""),v.setAttribute("d","");else{let s=E.map((se,ge)=>`${W(ge,E.length).toFixed(2)} ${te(se).toFixed(2)}`),a=E.length===1,C=a?`M${W(0,1)-2} ${s[0]?.split(" ")[1]} L${s[0]}`:`M${s.join(" L")}`;v.setAttribute("d",C);let Y=a?W(0,1)-2:W(0,E.length);S.setAttribute("d",`${C} L300 ${n} L${Y.toFixed(2)} ${n} Z`)}if(Q!==null)Z(Q)}}};var Qe=Nt(),Te=document.querySelector("#root");if(!Te)throw Error("Missing #root");var dr=document.createElement("style");dr.textContent=tr+or+rr;document.head.append(dr);var Br=Je/1000,lr=sr({color:"var(--oc-primary)",height:18,capacity:nr,format:(e)=>`${e}ms`,intervalSeconds:Br}),Qt=(e)=>{let r=j("span","meter-fill");return r.style.background=e,{element:j("div","meter","",[r]),set:(p)=>{r.style.width=`${Math.min(100,Math.max(0,p))}%`}}},pr=Qt("var(--oc-info)"),ur=Qt("var(--oc-success)"),Yt=Qt("var(--oc-warning)"),de=(e,r,n,p)=>{let l=j("div","line","",[j("span","what",e),r??j("div","meter-empty"),j("span","value num",n)]);if(p)l.title=p;return l},Ze=de("OpenChamber",lr.element,"–","Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU counts 100% per core."),qe=de("CPU",pr.element,"–"),et=de("Memory",ur.element,"–"),tt=de("LLM Status",null,"—","Model load state: mounted (loaded) or unmounted (unloaded)."),ot=de("Prefill",Yt.element,"—","Prompt processing progress percentage."),rt=de("Generate",null,"—","Number of tokens generated in the current run."),xe=de("Dev servers",null,""),ir=j("div","ports"),ce=j("div","note","Reading…");Te.append(ce,Ze,qe,et,tt,ot,rt,xe);var Vr=()=>{for(let e of[Ze,qe,et,tt,ot,rt,xe])e.hidden=!0};var zr=(e)=>{let{system:r,app:n}=e;qe.hidden=!1,et.hidden=!1;let p=r.cpu??0;pr.set(r.cpu!==null?p:0),qe.querySelector(".value").textContent=Jt(r.cpu);let l=Math.round(r.memoryUsed/Math.max(1,r.memoryTotal)*100);ur.set(l),et.querySelector(".value").textContent=`${Ye(r.memoryUsed)} / ${Ye(r.memoryTotal)}`,Ze.hidden=e.warnings.includes("processes-unavailable");let _=Ze.querySelector(".value");_.textContent=`${Ye(n.memory)} · ${Jt(n.cpu)}`,lr.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),tt.hidden=!1,ot.hidden=!1,rt.hidden=!1;let{lmStudio:g}=e,R=g.state==="loaded"?"掛載":g.state==="unloaded"?"卸載":g.state==="loading"?"載入中":"錯誤",S=tt.querySelector(".value");S.textContent=R,S.className=`value num lm-state-${g.state}`;let v=ot.querySelector(".value");if(g.prefillProgress!==null)v.textContent=`${g.prefillProgress}%`,Yt.set(g.prefillProgress);else v.textContent="—",Yt.set(0);let K=rt.querySelector(".value");K.textContent=g.generateTokens.toLocaleString();let G=[...new Set(e.servers.flatMap((E)=>E.ports))].sort((E,F)=>E-F);if(G.length>0&&!e.warnings.includes("processes-unavailable")){xe.hidden=!1,ir.replaceChildren(...G.slice(0,6).map((F)=>Kt(Qe,F)));let E=xe.querySelector(".value");if(E.replaceChildren(...ir.children),G.length>6)E.appendChild(j("span","muted",` +${G.length-6}`))}else xe.hidden=!0;let N=e.warnings.includes("processes-unavailable");ce.hidden=!N,ce.className=N?"note error":"note",ce.textContent=N?"Could not read the process list; showing system totals only.":""},jr={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."};function Kr(e){ce.hidden=!1,ce.className="note error",ce.textContent=jr[e]??"Could not reach the monitoring service.",Vr()}var ar=!1;Qe.onReady(async(e)=>{if(Dt(e,document.documentElement),ar)return;ar=!0;let{startPolling:r}=await Promise.resolve().then(() => (Wt(),qo)),{refresh:n}=r(Qe,Te,(p)=>{zr(p)},Kr);n()});var cr=-1;new ResizeObserver(()=>{let e=Math.ceil(Te.getBoundingClientRect().height);if(e===cr)return;cr=e,Qe.setHeight(e).catch(()=>{return})}).observe(Te);})();
