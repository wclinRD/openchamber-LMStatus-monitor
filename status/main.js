(()=>{var Er=Object.defineProperty;var hr=(e)=>e;function Sr(e,r){this[e]=hr.bind(null,r)}var _r=(e,r)=>{for(var n in r)Er(e,n,{get:r[n],enumerable:!0,configurable:!0,set:Sr.bind(r,n)})};var H=(e,r)=>()=>(e&&(r=e(e=0)),r);var f="openchamber.sdk",m=1;var ke=()=>{};function po(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(p)=>{let l=p.target===e?r:p.target;if(!(l instanceof Element))return;if(!l.hasAttribute("data-oc-scrolling"))l.setAttribute("data-oc-scrolling","");let b=n.get(l);if(b!==void 0)clearTimeout(b);n.set(l,setTimeout(()=>{n.delete(l),l.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var ct=`
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
`,xr;var we=H(()=>{xr=`(${po.toString()})(document);`});var dt=128,lt=65536;var Oe=128,Re=65536;var pt=()=>{};var Eo,uo=(e)=>Object(e)===e&&!Array.isArray(e),ut=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),fo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,mo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,ho=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!uo(n)||!Eo.test(n.id)||!fo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!ut(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!ut(n,["kind","id","label","value","options","disabled"]))return!1;if(!mo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let p=new Set;for(let l of n.options){if(!uo(l)||!ut(l,["value","label"])||!mo(l.value)||!fo(l.label)||p.has(l.value))return!1;p.add(l.value)}if(!p.has(n.value))return!1}return!0};var ft=H(()=>{Eo=/^[a-z][a-z0-9-]{0,39}$/});var So=()=>{};var _o=()=>{};var Ue=20000000,Ie=256,mt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,xo=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var Et=()=>{};var To,go,bo=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let p=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let l of p)if(!bo(l,r+1,n))return!1;return!0},ht=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(ht);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(ht)}return String(e)===e||Number.isFinite(e)},St=(e)=>{try{if(String(e.id)!==e.id||!To.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!go.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!bo(e.data)||!ht(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var _t=H(()=>{To=/^[A-Za-z0-9_-]{1,80}$/,go=["left","right","top","bottom"]});var Ao,Tt=(e)=>Boolean(e&&"sessionId"in e),gt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),vo,bt=(e)=>vo.test(e),Ce=500,Le=32000,ko=16000,wo=128,Oo=200,Ro=2000,Uo=16000,Io=80,Co=200,Lo=16000,Mo=2000,yt=20000,Me=1024,Ge=2000000,Pe=64000,Ne=8000,At=4000,vt=90000,Go=999,Po=1e4,he=500,No,Do,Tr,$o=(e)=>Tr.has(e),Ho=(e)=>e&&$o(e)?e:"HOST_REJECTED",pe=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(pe);if(Object(e)===e)return Object.values(e).every(pe);return!1},Fo=(e)=>pe(e)&&JSON.stringify(e).length<=Lo,yo=(e)=>e?.trim().slice(0,Co)??"",ue=(e)=>{let r=e.id.trim().slice(0,wo),n=e.title.trim().slice(0,Oo),p=e.url.trim().slice(0,Ro),l=e.text?.trim().slice(0,Uo),b=e.author?.trim().slice(0,Io),E=e.kind==="pull"?"pull":"issue",h={providerId:e.providerId.trim(),id:r,title:n||r,url:p,kind:E};if(l)h.text=l;if(b)h.author=b;if(E==="pull"){let I=yo(e.branches?.head),_=yo(e.branches?.base);if(I&&_)h.branches={head:I,base:_}}if(Fo(e.data))h.data=e.data;return h},kt=(e)=>{let r=ue(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},wt=(e)=>{let r={text:e.text.trim().slice(0,ko)};if(e.send)r.send=!0;return r},Ot=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Go,Math.max(0,Math.round(e)))},Rt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Po,Math.max(0,Math.ceil(e)))},fe=(e)=>e.length>0&&e.length<=Me&&!e.includes("\x00")&&!e.includes("\\"),De=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Mo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},gr,Ut=(e)=>Boolean(e&&"status"in e&&gr.has(String(e.status))&&!("body"in e)),$e=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),It=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Ct=(e)=>Boolean(e&&"written"in e&&e.written===!0),Lt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),br,Mt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&br.has(String(e.kind))&&Number.isFinite(e.size)),Gt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),yr,Ar=(e)=>Object(e)===e?e:null,xt=(e)=>String(e)===e&&e.length>0,vr=(e)=>{if(!xt(e.id))return null;if(e.ok===!0){let r={channel:f,v:m,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&xt(e.error))return{channel:f,v:m,type:"result",id:e.id,ok:!1,error:e.error,code:Ho(xt(e.code)?e.code:void 0)};return null},Pt=(e)=>{let r=Ar(e);if(!r||r.channel!==f||r.v!==m)return null;if(r.type==="result")return vr(r);if(!yr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var He=H(()=>{ke();Ao=["file","directory","other","missing"],vo=/^[0-9a-f]{7,64}$/i,No=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Do=["stopped","starting","ready","failed"],Tr=new Set(No),gr=new Set(Do),br=new Set(Ao),yr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"])});var Xo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),kr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",d,Bo=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Fe=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${Me} characters without NUL or backslash.`)),Xe=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},u=(e)=>(e.value+=1,`oc-${e.value}`),Nt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),p=e.requestTimeoutMs??yt,l=new Set,b=new Set,E=new Set,h=new Set,I=new Set,_=new Set,C=new Set,B=new Set,L=new Set,y=null,M=null,G=new Set,Q=new Set,W=null,te=null,le=!1,Z=new Map,ne=new Map,v=new Map,g=!1,s={value:0},a=null,P=null,Y=!1,se=!1,be=null,eo=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},z=(t)=>{r.parent.postMessage(t,"*")},R=(t,o)=>{for(let i of t)try{i(o)}catch(c){console.error(c)}},to=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=Pt(t.data);if(!o)return;if(o.type==="workspace"){let c=ne.get(o.payload.subscriptionId);if(c)R([c],o.payload.snapshot);return}if(o.type==="shells"){let c=v.get(o.payload.subscriptionId);if(c)R([c],o.payload.snapshot);return}if(o.type==="ready"){if(a=o.payload,P=eo(o.payload.session),R(l,o.payload),R(b,o.payload.directory),R(E,o.payload.session),P)R(h,P);R(I,o.payload.connection),R(_,o.payload.settings),R(C,o.payload.item);return}if(o.type==="directory"){if(a)a={...a,directory:o.payload.directory};R(b,o.payload.directory);return}if(o.type==="session"){if(a)a={...a,session:o.payload.session};if(!o.payload.session)P=null;else if(P?.sessionId!==o.payload.session.id)P=eo(o.payload.session);R(E,o.payload.session);return}if(o.type==="session-lifecycle"){P=o.payload,R(h,o.payload);return}if(o.type==="connection"){if(a)a={...a,connection:o.payload.connection};R(I,o.payload.connection);return}if(o.type==="settings"){if(a)a={...a,settings:o.payload.settings};R(_,o.payload.settings);return}if(o.type==="item"){if(a)a={...a,item:o.payload.item};R(C,o.payload.item);return}if(o.type==="status-control-event"){R(B,o.payload);return}if(o.type==="popover-closed"){R(L,o.payload);return}if(o.type==="action"){let c=(S)=>{if(!g)z({channel:f,v:m,type:"action-result",id:o.id,payload:S})},x=M;if(!x){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>x(o.payload)).then(()=>c({ok:!0}),(S)=>{let O=(S instanceof Error?S.message:String(S)).trim();c({ok:!1,error:(O||"Action failed.").slice(0,he)})});return}if(o.type==="file-open"){let c=o.payload;if(te&&xo(te,c))return;te=c,R(G,o.payload);return}if(o.type==="file-saved"){R(Q,o.payload.version);return}if(o.type==="file-snapshot"){let c=(O)=>{if(!g)z({channel:f,v:m,type:"file-snapshot-result",id:o.id,payload:O})},x=(O)=>c({error:(O.trim()||"Could not read the edited file.").slice(0,he)}),S=W;if(!S){x("This extension does not edit files.");return}Promise.resolve().then(()=>S(o.payload.purpose)).then((O)=>{if(mt(O)>Ue){x(`The file is over ${Ue} ${"bytes"in O?"bytes":"characters"}.`);return}if(O.version.length>Ie){x(`The snapshot version is over ${Ie} characters.`);return}c({snapshot:"bytes"in O?{bytes:O.bytes,version:O.version}:{content:O.content,version:O.version}})},(O)=>x(O instanceof Error?O.message:String(O)));return}if(o.type==="resolve"){let c=(S)=>{z({channel:f,v:m,type:"resolve-result",id:o.id,payload:S})},x=y;if(!x){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>x(o.payload)).then((S)=>c({item:S?ue(S):null}),(S)=>{let O=(S instanceof Error?S.message:String(S)).trim();c({error:(O||"Command failed.").slice(0,he)})});return}let i=Z.get(o.id);if(!i)return;if(clearTimeout(i.timer),Z.delete(o.id),o.ok){i.resolve(o.payload);return}i.reject(new d(o.code,o.error))};r.addEventListener("message",to),z({channel:f,v:m,type:"hello"});let N=(t,o=p)=>{if(g||r.parent===r)return Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((i,c)=>{let x=setTimeout(()=>{Z.delete(t.id),c(new d("HOST_TIMEOUT","Host did not answer in time."))},o);Z.set(t.id,{resolve:i,reject:c,timer:x}),z(t)})},k=(t)=>N(t).then(()=>{return}),w={channel:f,v:m},st=(t)=>{if(!g&&r.parent!==r)z(t)},oo=()=>st({...w,type:"file-save"}),ro=(t)=>{if(!Xo(t)||!kr(t))return;t.preventDefault(),oo()},no=(t)=>{if(!Xo(t)||t.key!=="Escape"||a?.surface!=="popover"||!a.popover)return;t.preventDefault(),co(a.popover.id,"escape").catch(()=>{return})},ye=()=>{let t=a?.surface==="popover"?a.popover:void 0;if(!t)return;let o=Y||se;if(be===o)return;be=o,lo(t.id,o).catch(()=>{return})},Ae=()=>{if(a?.surface!=="popover"||Y)return;Y=!0,ye()},so=(t)=>{if(a?.surface!=="popover"||t.relatedTarget!==null||!Y)return;Y=!1,ye()},io=()=>{if(a?.surface!=="popover"||se)return;se=!0,ye()},ao=()=>{if(a?.surface!=="popover"||!se)return;se=!1,ye()},J=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new d("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},it=async(t)=>{if(t.kind!=="projects")J(t.projectId);let o=await N({...w,type:"workspace-read",id:u(s),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return o},at=async(t,o)=>{if(t.kind!=="projects")J(t.projectId);let i=u(s);ne.set(i,o);try{await k({...w,type:"workspace-subscribe",id:u(s),payload:{subscriptionId:i,query:t}})}catch(c){if(ne.delete(i),!g)z({...w,type:"workspace-unsubscribe",id:u(s),payload:{subscriptionId:i}});throw c}return()=>{if(!ne.delete(i)||g)return;z({...w,type:"workspace-unsubscribe",id:u(s),payload:{subscriptionId:i}})}},mr=async(t,o)=>{if(t.kind==="session")J(t.sessionId);if(t.kind==="project")J(t.projectId);let i=u(s);v.set(i,o);try{await k({...w,type:"shells-subscribe",id:u(s),payload:{subscriptionId:i,scope:t}})}catch(c){if(v.delete(i),!g)z({...w,type:"shells-unsubscribe",id:u(s),payload:{subscriptionId:i}});throw c}return()=>{if(!v.delete(i)||g)return;z({...w,type:"shells-unsubscribe",id:u(s),payload:{subscriptionId:i}})}},ve=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>dt))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!pe(t.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>lt)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&a?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let o=await N({...w,type:"storage",id:u(s),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new d("HOST_REJECTED","Host did not return storage data.");return o},co=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):k({...w,type:"popover-close",id:u(s),payload:o?{id:t,reason:o}:{id:t}}),lo=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):k({...w,type:"popover-anchor",id:u(s),payload:{id:t,active:o}});return r.addEventListener("keydown",no,!0),r.addEventListener("pointerover",Ae),r.addEventListener("pointermove",Ae),r.addEventListener("pointerout",so),r.addEventListener("focus",io),r.addEventListener("blur",ao),{onAction:(t)=>(M=t,()=>{if(M===t)M=null}),listProjects:async()=>{let t=await it({kind:"projects"});if(t.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await it({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await it({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>at({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>at({kind:"worktrees",projectId:t},(i)=>{if(i.kind==="worktrees")o(i)}),onSessions:(t,o)=>at({kind:"sessions",projectId:t},(i)=>{if(i.kind==="sessions")o(i)}),onRunningShells:(t,o)=>mr(t,o),readShellOutput:async(t,o)=>{J(t,Oe);let i=o?.cursor;if(i!==void 0&&(!Number.isInteger(i)||i<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=o?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>Re))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Re}.`);let S=await N({...w,type:"shell-output",id:u(s),payload:{shellId:t,cursor:i,tailBytes:c}});if(!S||typeof S.output!=="string"||!Number.isFinite(S.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return S},stopShell:async(t)=>{if(J(t,Oe),(await N({...w,type:"shell-stop",id:u(s),payload:{shellId:t}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{J(t),await k({...w,type:"open-session",id:u(s),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let i=Xe(o),c={op:"get",key:t};if(i)c.scope=i;let x=await ve(c);return x.op==="get"&&x.found?x.value:void 0},set:async(t,o,i)=>{let c=Xe(i),x={op:"set",key:t,value:o};if(c)x.scope=c;await ve(x)},delete:async(t,o)=>{let i=Xe(o),c={op:"delete",key:t};if(i)c.scope=i;await ve(c)},keys:async(t)=>{let o=Xe(t),i={op:"keys"};if(o)i.scope=o;let c=await ve(i);if(c.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:(t)=>{if(l.add(t),a)t(a);return()=>{l.delete(t)}},onDirectory:(t)=>{if(b.add(t),a)t(a.directory);return()=>{b.delete(t)}},onSession:(t)=>{if(E.add(t),a)t(a.session);return()=>{E.delete(t)}},onSessionLifecycle:(t)=>{if(h.add(t),P)t(P);return()=>{h.delete(t)}},onConnection:(t)=>{if(I.add(t),a)t(a.connection);return()=>{I.delete(t)}},onSettings:(t)=>{if(_.add(t),a)t(a.settings);return()=>{_.delete(t)}},onItem:(t)=>{if(C.add(t),a)t(a.item);return()=>{C.delete(t)}},onStatusControl:(t)=>(B.add(t),()=>{B.delete(t)}),onPopoverClosed:(t)=>(L.add(t),()=>{L.delete(t)}),setStatusControls:(t)=>{if(a?.features?.statusControls!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support status controls."));if(!ho(t))return Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...w,type:"status-controls",id:u(s),payload:{controls:t}})},openPopover:(t)=>{if(a?.features?.popovers!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support popovers."));if(!St(t))return Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...w,type:"popover-open",id:u(s),payload:t})},closePopover:co,setPopoverAnchorActive:lo,onResolve:(t)=>(y=t,()=>{if(y===t)y=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Ce)return Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${Ce} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Le))return Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${Le} characters.`));return k({channel:f,v:m,type:"toast",id:u(s),payload:{...t,message:o}})},openUrl:(t)=>k({channel:f,v:m,type:"open-url",id:u(s),payload:{url:t}}),openCommit:(t)=>bt(t)?k({channel:f,v:m,type:"open-commit",id:u(s),payload:{sha:t}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>k({channel:f,v:m,type:"open-surface",id:u(s),payload:{surfaceId:t}}),writeClipboard:(t)=>k({channel:f,v:m,type:"clipboard-write",id:u(s),payload:{text:t}}),compose:(t)=>k({channel:f,v:m,type:"compose",id:u(s),payload:t}),attach:(t)=>k({channel:f,v:m,type:"attach",id:u(s),payload:ue(t)}),startSession:async(t)=>{if(t.projectId!==void 0)J(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")J(o.directory);else{if(o.name!==void 0)J(o.name,200);if(o.baseBranch!==void 0)J(o.baseBranch,200)}let i=await N({channel:f,v:m,type:"start-session",id:u(s),payload:kt(t)},e.requestTimeoutMs??180000);if(!Tt(i))throw new d("HOST_REJECTED","Host did not return a session.");return i},prompt:(t)=>N({channel:f,v:m,type:"prompt",id:u(s),payload:wt(t)}).then((o)=>{if(!gt(o))throw new d("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>k({channel:f,v:m,type:"session-link",id:u(s),payload:ue(t)}),close:()=>k({channel:f,v:m,type:"close",id:u(s)}),oauthStart:()=>k({channel:f,v:m,type:"oauth-start",id:u(s)}),oauthDisconnect:()=>k({channel:f,v:m,type:"oauth-disconnect",id:u(s)}),request:(t)=>(De(t.path)?N({channel:f,v:m,type:"request",id:u(s),payload:t}):Bo()).then((o)=>{if(!$e(o))throw new d("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(De(t.path)?N({channel:f,v:m,type:"service-request",id:u(s),payload:t}):Bo()).then((o)=>{if(!$e(o))throw new d("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>N({channel:f,v:m,type:"service-status",id:u(s)}).then((t)=>{if(!Ut(t))throw new d("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(fe(t)?N({channel:f,v:m,type:"file-read",id:u(s),payload:{path:t}}):Fe()).then((o)=>{if(!It(o))throw new d("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!fe(t))return Fe();if(o.length>Ge)return Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${Ge} characters.`));return N({channel:f,v:m,type:"file-write",id:u(s),payload:{path:t,content:o}}).then((i)=>{if(!Ct(i))throw new d("HOST_REJECTED","Host did not confirm the write.");return i})},listDir:(t)=>(fe(t)?N({channel:f,v:m,type:"file-list",id:u(s),payload:{path:t}}):Fe()).then((o)=>{if(!Lt(o))throw new d("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(fe(t)?N({channel:f,v:m,type:"file-stat",id:u(s),payload:{path:t}}):Fe()).then((o)=>{if(!Mt(o))throw new d("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),i=t.system?.trim();if(o.length===0||o.length>Pe)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${Pe} characters.`));if(i!==void 0&&(i.length===0||i.length>Ne))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${Ne} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(At,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let x={prompt:o};if(i!==void 0)x.system=i;if(c!==void 0)x.maxOutputTokens=c;return N({channel:f,v:m,type:"generate",id:u(s),payload:x},e.requestTimeoutMs??vt).then((S)=>{if(!Gt(S))throw new d("HOST_REJECTED","Host did not return generated text.");return S})},setBadge:(t)=>k({channel:f,v:m,type:"badge",id:u(s),payload:{count:Ot(t)}}),setHeight:(t)=>k({channel:f,v:m,type:"resize",id:u(s),payload:{height:Rt(t)}}),onFileOpen:(t)=>{if(G.add(t),!le)le=!0,r.addEventListener("keydown",ro,!0);if(te)t(te);return()=>{G.delete(t)}},onFileSnapshot:(t)=>(W=t,()=>{if(W===t)W=null}),onFileSaved:(t)=>(Q.add(t),()=>{Q.delete(t)}),reportFileChange:(t)=>st({...w,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:oo,reportFileUnsupported:()=>st({...w,type:"file-unsupported"}),dispose:()=>{for(let t of ne.keys())z({...w,type:"workspace-unsubscribe",id:u(s),payload:{subscriptionId:t}});ne.clear();for(let t of v.keys())z({...w,type:"shells-unsubscribe",id:u(s),payload:{subscriptionId:t}});if(v.clear(),g=!0,y=null,M=null,W=null,G.clear(),Q.clear(),le)r.removeEventListener("keydown",ro,!0);r.removeEventListener("message",to),r.removeEventListener("keydown",no,!0),r.removeEventListener("pointerover",Ae),r.removeEventListener("pointermove",Ae),r.removeEventListener("pointerout",so),r.removeEventListener("focus",io),r.removeEventListener("blur",ao);for(let t of Z.values())clearTimeout(t.timer),t.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));Z.clear(),l.clear(),b.clear(),E.clear(),h.clear(),I.clear(),_.clear(),C.clear(),B.clear(),L.clear()}}};var Vo=H(()=>{ke();ft();_t();Et();He();pt();d=class d extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}});var zo,Sn;var jo=H(()=>{zo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"],Sn=new Set(zo)});var Ko,xn;var Wo=H(()=>{Ko=["none","agent","user"],xn=new Set(Ko)});var Dt=H(()=>{ke();we();pt();ft();So();_o();Et();Vo();_t();He();He();jo();Wo()});var K=(e,r="",n="",p=[])=>{let l=document.createElement(e);if(r)l.className=r;if(n)l.textContent=n;if(p.length>0)l.append(...p);return l};var tr={};_r(tr,{FAILURE_TEXT:()=>Nr,POLL_MS:()=>xe,isOnScreen:()=>Je,portButton:()=>Wt,requestStop:()=>Hr,startPolling:()=>Fr});var xe=2000,Nr,_e=(e)=>typeof e==="object"&&e!==null,Dr=(e)=>_e(e)&&typeof e.at==="number"&&_e(e.system)&&_e(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&_e(e.history)&&_e(e.lmStudio),$r=(e)=>{if(!(e instanceof d))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},Hr=async(e,r)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(r)})).status===200}catch{return!1}},Wt=(e,r)=>{let n=K("button","port",`:${r}`);return n.type="button",n.title=`Open http://localhost:${r}`,n.addEventListener("click",(p)=>{p.stopPropagation(),e.openUrl(`http://localhost:${r}`).catch(()=>{return})}),n},Je=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Fr=(e,r,n,p)=>{let l=!1,b=xe,E=async()=>{if(l||!Je(r))return;l=!0;try{let _=await e.serviceRequest({method:"GET",path:"/snapshot"}),C;try{C=JSON.parse(_.body)}catch{C=null}if(_.status===200&&Dr(C)){n(C);let B=C.lmStudio;b=B.prefillProgress>0||B.generateTokens>0?100:xe}else p(_.status===200?"bad-answer":"service-failed")}catch(_){p($r(_))}finally{l=!1,setTimeout(()=>{E()},b)}};E();let h=Je(r),I=()=>{let _=Je(r);if(_&&!h)E();h=_};return document.addEventListener("visibilitychange",I),new ResizeObserver(I).observe(document.documentElement),{refresh:()=>{E()}}};var Jt=H(()=>{Dt();Nr={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."}});Dt();var wr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Or=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Jo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,p]of wr)r.style.setProperty(n,e.tokens[p]);for(let[n,p,l]of Or){let b=e.tokens[l]??"";r.style.setProperty(n,b),r.style.setProperty(p,b)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},$t=(e,r)=>{if(Jo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};we();var Rr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},T=(e,r)=>`var(--${e}, var(--oc-${Rr[e]}, ${r}))`,ie=T("surface-background","transparent"),Be=T("surface-elevated","transparent"),Se=T("surface-elevated-foreground","inherit"),oe=T("surface-foreground","inherit"),A=T("surface-muted-foreground","gray"),Ur=T("surface-muted","transparent"),j=T("interactive-border","currentColor"),V=T("interactive-hover","transparent"),ae=T("interactive-active","transparent"),Ht=T("interactive-selection","transparent"),Ft=T("interactive-selection-foreground","inherit"),Zo=T("interactive-focus-ring","currentColor"),q=T("primary","currentColor"),Xt=T("primary-text","inherit"),Bt=T("error-text","inherit"),Ir=T("font-sans","inherit"),Vt=T("font-mono","monospace"),qo=T("radius","9px"),zt=`calc(${qo} - 2px)`,Yo=`calc(${qo} - 4px)`,U=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,Qo=`box-shadow: 0 0 0 2px ${Zo};`,Ve=(e)=>{let r=T(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${T(`${e}-text`,"inherit")}; }`},Cr=`
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
`,er=`
.oc-sdk { color: ${oe}; font-family: ${Ir}; }
.oc-sdk :focus-visible { outline: none; ${Qo} }
.oc-sdk-mono { font-family: ${Vt}; }
.oc-sdk-muted { color: ${A}; }
${Ve("success")}${Ve("warning")}${Ve("error")}${Ve("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${q}; --oc-sdk-tone-text: ${Xt}; }

.oc-sdk-btn { border-radius: ${zt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Yo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Xt}; background: ${U(q,10,ie)}; border-color: ${U(q,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${U(q,16,ie)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${U(q,22,ie)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Ur}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${V}, ${V}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Be}; color: ${Se}; border-color: ${j}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${V}, ${V}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${V}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ae}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${T("status-error","red")}; color: ${Bt}; background: ${U("var(--oc-sdk-tone)",7,ie)}; border-color: ${U("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${U("var(--oc-sdk-tone)",9,ie)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${U("var(--oc-sdk-tone)",11,ie)}; }

.oc-sdk-field-note { color: ${A}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Bt}; }
.oc-sdk-input { border-radius: ${zt}; background: ${Be}; color: ${Se}; box-shadow: inset 0 0 0 1px ${U(j,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${A}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${V}, ${V}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Zo}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${T("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${T("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Vt}; }

.oc-sdk-search-icon { color: ${A}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${q}; }
.oc-sdk-search-clear { border-radius: ${Yo}; color: ${A}; }
.oc-sdk-search-clear:hover { background: ${V}; color: ${oe}; }

.oc-sdk-trigger { border-color: ${j}; border-radius: ${zt}; background: ${Be}; color: ${Se}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${V}, ${V}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ae}, ${ae}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${A}; }
.oc-sdk-trigger-chevron { color: ${A}; }
.oc-sdk-popup { --surface-foreground: ${Se}; border-color: ${U(j,60)}; border-radius: 12px; background: ${Be}; color: ${Se}; box-shadow: 0 8px 24px ${U(oe,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${V}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ht}; color: ${Ft}; }
.oc-sdk-option-check { color: ${oe}; }
.oc-sdk-option[data-destructive="true"] { color: ${Bt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${U(T("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${A}; }
.oc-sdk-popup-empty { color: ${A}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${j}; border-radius: 4px; color: ${oe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${U(oe,60,j)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${j}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ie}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${q}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Qo} }
.oc-sdk-check-desc { color: ${A}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${U(oe,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${A}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${oe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ft}; background: ${Ht}; border-color: ${j}; }
.oc-sdk-tab-count { color: ${A}; }

.oc-sdk-badge { border-radius: 9999px; background: ${V}; color: ${A}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${U("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${V}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ht}; color: ${Ft}; }
.oc-sdk-row-lead { font-family: ${Vt}; color: ${A}; }
.oc-sdk-row-sub { color: ${A}; }
.oc-sdk-row-meta { color: ${A}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${A}; }

.oc-sdk-empty-body { color: ${A}; }

.oc-sdk-spinner { color: ${A}; }
.oc-sdk-spinner-ring { border-color: ${j}; border-top-color: ${q}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${U("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${U("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${A}; }

.oc-sdk-separator { color: ${A}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${U(j,40)}; }

.oc-sdk-progress-label { color: ${A}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${j}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${q}); }

.oc-sdk-text a { color: ${Xt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${U(j,60)}; }
`,D=`
${ct}
${Cr}
${er}`;we();Jt();var Xr="en";var Yt=(e,r)=>new Intl.NumberFormat(Xr,{minimumFractionDigits:r,maximumFractionDigits:r}).format(e),Ye=(e)=>{let r=["B","KB","MB","GB","TB"],n=Math.max(0,e),p=0;while(n>=1024&&p<r.length-1)n/=1024,p+=1;let l=p>=3&&n<100?1:0;return`${Yt(n,l)} ${r[p]}`},Qt=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${Yt(e,e<10?1:0)}%`},Qe=(e)=>`${Yt(e,1)}%`;var or=`
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
`,rr=`
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
`,nr=`
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
`;var sr=90;var Br=0,re=(e,r)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[p,l]of Object.entries(r))n.setAttribute(p,String(l));return n},ir=(e)=>{let r=document.createElement("div");r.className="chart",r.style.height=`${e.height}px`;let n=e.height,p=re("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),l=`fill-${++Br}`,b=re("defs",{}),E=re("linearGradient",{id:l,x1:0,x2:0,y1:0,y2:1});E.append(re("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),re("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),b.append(E);let h=re("path",{d:"",class:"chart-grid"}),I=re("path",{d:"",fill:`url(#${l})`}),_=re("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});p.append(b,h,I,_);let C=document.createElement("div");C.className="chart-cursor";let B=document.createElement("div");B.className="chart-dot",B.style.background=e.color;let L=document.createElement("div");L.className="chart-tip",r.append(p,C,B,L);let y=[],M=1,G=null,Q=null,W=(v,g)=>(e.capacity-g+v)/Math.max(1,e.capacity-1)*300,te=(v)=>n-1-Math.min(v,M)/M*(n-1-2),le=()=>{let v=G===null?void 0:y[G];if(G===null||v===void 0){r.classList.remove("hovering");return}r.classList.add("hovering");let g=r.getBoundingClientRect(),s=W(G,y.length)/300*g.width,a=te(v)/n*g.height;C.style.transform=`translateX(${s}px)`,B.style.transform=`translate(${s}px, ${a}px)`;let P=(y.length-1-G)*e.intervalSeconds;L.textContent=`${e.format(v)} · ${P===0?"now":`${P} s ago`}`;let Y=s>g.width/2;L.style.left=Y?"":`${s+8}px`,L.style.right=Y?`${g.width-s+8}px`:""},Z=(v)=>{if(y.length===0)return;let g=r.getBoundingClientRect(),s=(v-g.left)/g.width*(e.capacity-1),a=Math.round(s-(e.capacity-y.length));G=Math.min(y.length-1,Math.max(0,a)),le()};return r.addEventListener("pointermove",(v)=>{Q=v.clientX,Z(v.clientX)}),r.addEventListener("pointerleave",()=>{Q=null,G=null,le()}),{element:r,update:(v,g)=>{if(y=v,M=g>0?g:1,h.setAttribute("d",[0.25,0.5,0.75].map((s)=>`M0 ${n*s} H300`).join(" ")),y.length===0)I.setAttribute("d",""),_.setAttribute("d","");else{let s=y.map((se,be)=>`${W(be,y.length).toFixed(2)} ${te(se).toFixed(2)}`),a=y.length===1,P=a?`M${W(0,1)-2} ${s[0]?.split(" ")[1]} L${s[0]}`:`M${s.join(" L")}`;_.setAttribute("d",P);let Y=a?W(0,1)-2:W(0,y.length);I.setAttribute("d",`${P} L300 ${n} L${Y.toFixed(2)} ${n} Z`)}if(Q!==null)Z(Q)}}};var Ze=Nt(),ge=document.querySelector("#root");if(!ge)throw Error("Missing #root");var lr=document.createElement("style");lr.textContent=or+rr+nr;document.head.append(lr);var Vr=xe/1000,pr=ir({color:"var(--oc-primary)",height:18,capacity:sr,format:(e)=>`${e}ms`,intervalSeconds:Vr}),qt=(e)=>{let r=K("span","meter-fill");return r.style.background=e,{element:K("div","meter","",[r]),set:(p)=>{r.style.width=`${Math.min(100,Math.max(0,p))}%`}}},ur=qt("var(--oc-info)"),fr=qt("var(--oc-success)"),Zt=qt("var(--oc-warning)"),de=(e,r,n,p)=>{let l=K("div","line","",[K("span","what",e),r??K("div","meter-empty"),K("span","value num",n)]);if(p)l.title=p;return l},qe=de("OpenChamber",pr.element,"–","Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU counts 100% per core."),et=de("CPU",ur.element,"–"),tt=de("Memory",fr.element,"–"),ot=de("LLM Status",null,"—","Model load state: mounted (loaded) or unmounted (unloaded)."),rt=de("Prefill",Zt.element,"—","Prompt processing progress percentage."),nt=de("Generate",null,"—","Number of tokens generated in the current run."),Te=de("Dev servers",null,""),ar=K("div","ports"),ce=K("div","note","Reading…");ge.append(ce,qe,et,tt,ot,rt,nt,Te);var zr=()=>{for(let e of[qe,et,tt,ot,rt,nt,Te])e.hidden=!0};var jr=(e)=>{let{system:r,app:n}=e;et.hidden=!1,tt.hidden=!1;let p=r.cpu??0;ur.set(r.cpu!==null?p:0),et.querySelector(".value").textContent=Qt(r.cpu);let l=Math.round(r.memoryUsed/Math.max(1,r.memoryTotal)*100);fr.set(l),tt.querySelector(".value").textContent=`${Ye(r.memoryUsed)} / ${Ye(r.memoryTotal)}`,qe.hidden=e.warnings.includes("processes-unavailable");let b=qe.querySelector(".value");b.textContent=`${Ye(n.memory)} · ${Qt(n.cpu)}`,pr.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),ot.hidden=!1,rt.hidden=!1,nt.hidden=!1;let{lmStudio:E}=e,h;if(E.modelName)switch(E.state){case"loaded":h=`${E.modelName} · 掛載`;break;case"loading":h=`${E.modelName} · 載入中 ${Qe(E.prefillProgress)}`;break;case"unloaded":h=`${E.modelName} · 卸載`;break;case"error":h=`${E.modelName} · 錯誤`;break;default:h=E.modelName}else switch(E.state){case"loaded":h="掛載";break;case"unloaded":h="卸載";break;case"loading":h=`載入中 ${Qe(E.prefillProgress)}`;break;case"error":h="錯誤";break;default:h="—"}let I=ot.querySelector(".value");I.textContent=h,I.className=`value num lm-state-${E.state}`;let _=rt.querySelector(".value"),C=nt.querySelector(".value");if(E.prefillProgress>0||E.generateTokens>0)_.textContent=Qe(E.prefillProgress),Zt.set(E.prefillProgress),C.textContent=E.generateTokens.toLocaleString();else _.textContent="—",Zt.set(0),C.textContent="—";let L=[...new Set(e.servers.flatMap((M)=>M.ports))].sort((M,G)=>M-G);if(L.length>0&&!e.warnings.includes("processes-unavailable")){Te.hidden=!1,ar.replaceChildren(...L.slice(0,6).map((G)=>Wt(Ze,G)));let M=Te.querySelector(".value");if(M.replaceChildren(...ar.children),L.length>6)M.appendChild(K("span","muted",` +${L.length-6}`))}else Te.hidden=!0;let y=e.warnings.includes("processes-unavailable");ce.hidden=!y,ce.className=y?"note error":"note",ce.textContent=y?"Could not read the process list; showing system totals only.":""},Kr={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."};function Wr(e){ce.hidden=!1,ce.className="note error",ce.textContent=Kr[e]??"Could not reach the monitoring service.",zr()}var cr=!1;Ze.onReady(async(e)=>{if($t(e,document.documentElement),cr)return;cr=!0;let{startPolling:r}=await Promise.resolve().then(() => (Jt(),tr)),{refresh:n}=r(Ze,ge,(p)=>{jr(p)},Wr);n()});var dr=-1;new ResizeObserver(()=>{let e=Math.ceil(ge.getBoundingClientRect().height);if(e===dr)return;dr=e,Ze.setHeight(e).catch(()=>{return})}).observe(ge);})();
