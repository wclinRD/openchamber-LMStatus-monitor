(()=>{var Er=Object.defineProperty;var hr=(e)=>e;function xr(e,r){this[e]=hr.bind(null,r)}var Sr=(e,r)=>{for(var n in r)Er(e,n,{get:r[n],enumerable:!0,configurable:!0,set:xr.bind(r,n)})};var B=(e,r)=>()=>(e&&(r=e(e=0)),r);var f="openchamber.sdk",E=1;var we=()=>{};function po(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(u)=>{let d=u.target===e?r:u.target;if(!(d instanceof Element))return;if(!d.hasAttribute("data-oc-scrolling"))d.setAttribute("data-oc-scrolling","");let y=n.get(d);if(y!==void 0)clearTimeout(y);n.set(d,setTimeout(()=>{n.delete(d),d.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var lt=`
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
`,_r;var Oe=B(()=>{_r=`(${po.toString()})(document);`});var dt=128,pt=65536;var Re=128,Ue=65536;var ut=()=>{};var Eo,uo=(e)=>Object(e)===e&&!Array.isArray(e),mt=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),mo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,fo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,ho=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!uo(n)||!Eo.test(n.id)||!mo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!mt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!mt(n,["kind","id","label","value","options","disabled"]))return!1;if(!fo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let u=new Set;for(let d of n.options){if(!uo(d)||!mt(d,["value","label"])||!fo(d.value)||!mo(d.label)||u.has(d.value))return!1;u.add(d.value)}if(!u.has(n.value))return!1}return!0};var ft=B(()=>{Eo=/^[a-z][a-z0-9-]{0,39}$/});var xo=()=>{};var So=()=>{};var Ce=20000000,Ie=256,Et=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,_o=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var ht=()=>{};var go,To,bo=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let u=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let d of u)if(!bo(d,r+1,n))return!1;return!0},xt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(xt);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(xt)}return String(e)===e||Number.isFinite(e)},St=(e)=>{try{if(String(e.id)!==e.id||!go.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!To.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!bo(e.data)||!xt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var _t=B(()=>{go=/^[A-Za-z0-9_-]{1,80}$/,To=["left","right","top","bottom"]});var Ao,Tt=(e)=>Boolean(e&&"sessionId"in e),bt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e)),vo,yt=(e)=>vo.test(e),Le=500,Me=32000,ko=16000,wo=128,Oo=200,Ro=2000,Uo=16000,Co=80,Io=200,Lo=16000,Mo=2000,At=20000,Pe=1024,Ge=2000000,Ne=64000,De=8000,vt=4000,kt=90000,Po=999,Go=1e4,xe=500,No,Do,gr,$o=(e)=>gr.has(e),Ho=(e)=>e&&$o(e)?e:"HOST_REJECTED",ue=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ue);if(Object(e)===e)return Object.values(e).every(ue);return!1},Fo=(e)=>ue(e)&&JSON.stringify(e).length<=Lo,yo=(e)=>e?.trim().slice(0,Io)??"",me=(e)=>{let r=e.id.trim().slice(0,wo),n=e.title.trim().slice(0,Oo),u=e.url.trim().slice(0,Ro),d=e.text?.trim().slice(0,Uo),y=e.author?.trim().slice(0,Co),p=e.kind==="pull"?"pull":"issue",L={providerId:e.providerId.trim(),id:r,title:n||r,url:u,kind:p};if(d)L.text=d;if(y)L.author=y;if(p==="pull"){let g=yo(e.branches?.head),h=yo(e.branches?.base);if(g&&h)L.branches={head:g,base:h}}if(Fo(e.data))L.data=e.data;return L},wt=(e)=>{let r=me(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},Ot=(e)=>{let r={text:e.text.trim().slice(0,ko)};if(e.send)r.send=!0;return r},Rt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Po,Math.max(0,Math.round(e)))},Ut=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Go,Math.max(0,Math.ceil(e)))},fe=(e)=>e.length>0&&e.length<=Pe&&!e.includes("\x00")&&!e.includes("\\"),$e=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Mo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Tr,Ct=(e)=>Boolean(e&&"status"in e&&Tr.has(String(e.status))&&!("body"in e)),He=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),It=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Lt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Mt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),br,Pt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&br.has(String(e.kind))&&Number.isFinite(e.size)),Gt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),yr,Ar=(e)=>Object(e)===e?e:null,gt=(e)=>String(e)===e&&e.length>0,vr=(e)=>{if(!gt(e.id))return null;if(e.ok===!0){let r={channel:f,v:E,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&gt(e.error))return{channel:f,v:E,type:"result",id:e.id,ok:!1,error:e.error,code:Ho(gt(e.code)?e.code:void 0)};return null},Nt=(e)=>{let r=Ar(e);if(!r||r.channel!==f||r.v!==E)return null;if(r.type==="result")return vr(r);if(!yr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Fe=B(()=>{we();Ao=["file","directory","other","missing"],vo=/^[0-9a-f]{7,64}$/i,No=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Do=["stopped","starting","ready","failed"],gr=new Set(No),Tr=new Set(Do),br=new Set(Ao),yr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"])});var Xo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),kr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",l,Bo=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Xe=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${Pe} characters without NUL or backslash.`)),Be=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new l("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},m=(e)=>(e.value+=1,`oc-${e.value}`),Dt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),u=e.requestTimeoutMs??At,d=new Set,y=new Set,p=new Set,L=new Set,g=new Set,h=new Set,M=new Set,G=new Set,P=new Set,R=null,X=null,N=new Set,T=new Set,U=null,K=null,oe=!1,q=new Map,se=new Map,v=new Map,b=!1,s={value:0},a=null,D=null,Z=!1,ie=!1,ye=null,eo=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},W=(t)=>{r.parent.postMessage(t,"*")},C=(t,o)=>{for(let i of t)try{i(o)}catch(c){console.error(c)}},to=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=Nt(t.data);if(!o)return;if(o.type==="workspace"){let c=se.get(o.payload.subscriptionId);if(c)C([c],o.payload.snapshot);return}if(o.type==="shells"){let c=v.get(o.payload.subscriptionId);if(c)C([c],o.payload.snapshot);return}if(o.type==="ready"){if(a=o.payload,D=eo(o.payload.session),C(d,o.payload),C(y,o.payload.directory),C(p,o.payload.session),D)C(L,D);C(g,o.payload.connection),C(h,o.payload.settings),C(M,o.payload.item);return}if(o.type==="directory"){if(a)a={...a,directory:o.payload.directory};C(y,o.payload.directory);return}if(o.type==="session"){if(a)a={...a,session:o.payload.session};if(!o.payload.session)D=null;else if(D?.sessionId!==o.payload.session.id)D=eo(o.payload.session);C(p,o.payload.session);return}if(o.type==="session-lifecycle"){D=o.payload,C(L,o.payload);return}if(o.type==="connection"){if(a)a={...a,connection:o.payload.connection};C(g,o.payload.connection);return}if(o.type==="settings"){if(a)a={...a,settings:o.payload.settings};C(h,o.payload.settings);return}if(o.type==="item"){if(a)a={...a,item:o.payload.item};C(M,o.payload.item);return}if(o.type==="status-control-event"){C(G,o.payload);return}if(o.type==="popover-closed"){C(P,o.payload);return}if(o.type==="action"){let c=(x)=>{if(!b)W({channel:f,v:E,type:"action-result",id:o.id,payload:x})},S=X;if(!S){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>S(o.payload)).then(()=>c({ok:!0}),(x)=>{let O=(x instanceof Error?x.message:String(x)).trim();c({ok:!1,error:(O||"Action failed.").slice(0,xe)})});return}if(o.type==="file-open"){let c=o.payload;if(K&&_o(K,c))return;K=c,C(N,o.payload);return}if(o.type==="file-saved"){C(T,o.payload.version);return}if(o.type==="file-snapshot"){let c=(O)=>{if(!b)W({channel:f,v:E,type:"file-snapshot-result",id:o.id,payload:O})},S=(O)=>c({error:(O.trim()||"Could not read the edited file.").slice(0,xe)}),x=U;if(!x){S("This extension does not edit files.");return}Promise.resolve().then(()=>x(o.payload.purpose)).then((O)=>{if(Et(O)>Ce){S(`The file is over ${Ce} ${"bytes"in O?"bytes":"characters"}.`);return}if(O.version.length>Ie){S(`The snapshot version is over ${Ie} characters.`);return}c({snapshot:"bytes"in O?{bytes:O.bytes,version:O.version}:{content:O.content,version:O.version}})},(O)=>S(O instanceof Error?O.message:String(O)));return}if(o.type==="resolve"){let c=(x)=>{W({channel:f,v:E,type:"resolve-result",id:o.id,payload:x})},S=R;if(!S){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>S(o.payload)).then((x)=>c({item:x?me(x):null}),(x)=>{let O=(x instanceof Error?x.message:String(x)).trim();c({error:(O||"Command failed.").slice(0,xe)})});return}let i=q.get(o.id);if(!i)return;if(clearTimeout(i.timer),q.delete(o.id),o.ok){i.resolve(o.payload);return}i.reject(new l(o.code,o.error))};r.addEventListener("message",to),W({channel:f,v:E,type:"hello"});let H=(t,o=u)=>{if(b||r.parent===r)return Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((i,c)=>{let S=setTimeout(()=>{q.delete(t.id),c(new l("HOST_TIMEOUT","Host did not answer in time."))},o);q.set(t.id,{resolve:i,reject:c,timer:S}),W(t)})},k=(t)=>H(t).then(()=>{return}),w={channel:f,v:E},it=(t)=>{if(!b&&r.parent!==r)W(t)},oo=()=>it({...w,type:"file-save"}),ro=(t)=>{if(!Xo(t)||!kr(t))return;t.preventDefault(),oo()},no=(t)=>{if(!Xo(t)||t.key!=="Escape"||a?.surface!=="popover"||!a.popover)return;t.preventDefault(),co(a.popover.id,"escape").catch(()=>{return})},Ae=()=>{let t=a?.surface==="popover"?a.popover:void 0;if(!t)return;let o=Z||ie;if(ye===o)return;ye=o,lo(t.id,o).catch(()=>{return})},ve=()=>{if(a?.surface!=="popover"||Z)return;Z=!0,Ae()},so=(t)=>{if(a?.surface!=="popover"||t.relatedTarget!==null||!Z)return;Z=!1,Ae()},io=()=>{if(a?.surface!=="popover"||ie)return;ie=!0,Ae()},ao=()=>{if(a?.surface!=="popover"||!ie)return;ie=!1,Ae()},Q=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new l("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},at=async(t)=>{if(t.kind!=="projects")Q(t.projectId);let o=await H({...w,type:"workspace-read",id:m(s),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return o},ct=async(t,o)=>{if(t.kind!=="projects")Q(t.projectId);let i=m(s);se.set(i,o);try{await k({...w,type:"workspace-subscribe",id:m(s),payload:{subscriptionId:i,query:t}})}catch(c){if(se.delete(i),!b)W({...w,type:"workspace-unsubscribe",id:m(s),payload:{subscriptionId:i}});throw c}return()=>{if(!se.delete(i)||b)return;W({...w,type:"workspace-unsubscribe",id:m(s),payload:{subscriptionId:i}})}},fr=async(t,o)=>{if(t.kind==="session")Q(t.sessionId);if(t.kind==="project")Q(t.projectId);let i=m(s);v.set(i,o);try{await k({...w,type:"shells-subscribe",id:m(s),payload:{subscriptionId:i,scope:t}})}catch(c){if(v.delete(i),!b)W({...w,type:"shells-unsubscribe",id:m(s),payload:{subscriptionId:i}});throw c}return()=>{if(!v.delete(i)||b)return;W({...w,type:"shells-unsubscribe",id:m(s),payload:{subscriptionId:i}})}},ke=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>dt))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ue(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>pt)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&a?.features?.deviceStorage!==!0)throw new l("UNSUPPORTED","This host does not support device storage.");let o=await H({...w,type:"storage",id:m(s),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return o},co=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):k({...w,type:"popover-close",id:m(s),payload:o?{id:t,reason:o}:{id:t}}),lo=(t,o)=>a?.features?.popovers!==!0&&!(a?.surface==="popover"&&a.popover?.id===t)?Promise.reject(new l("UNSUPPORTED","This host does not support popovers.")):k({...w,type:"popover-anchor",id:m(s),payload:{id:t,active:o}});return r.addEventListener("keydown",no,!0),r.addEventListener("pointerover",ve),r.addEventListener("pointermove",ve),r.addEventListener("pointerout",so),r.addEventListener("focus",io),r.addEventListener("blur",ao),{onAction:(t)=>(X=t,()=>{if(X===t)X=null}),listProjects:async()=>{let t=await at({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await at({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await at({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>ct({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>ct({kind:"worktrees",projectId:t},(i)=>{if(i.kind==="worktrees")o(i)}),onSessions:(t,o)=>ct({kind:"sessions",projectId:t},(i)=>{if(i.kind==="sessions")o(i)}),onRunningShells:(t,o)=>fr(t,o),readShellOutput:async(t,o)=>{Q(t,Re);let i=o?.cursor;if(i!==void 0&&(!Number.isInteger(i)||i<0))throw new l("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=o?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>Ue))throw new l("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ue}.`);let x=await H({...w,type:"shell-output",id:m(s),payload:{shellId:t,cursor:i,tailBytes:c}});if(!x||typeof x.output!=="string"||!Number.isFinite(x.cursor))throw new l("HOST_REJECTED","Host did not return shell output.");return x},stopShell:async(t)=>{if(Q(t,Re),(await H({...w,type:"shell-stop",id:m(s),payload:{shellId:t}}))?.stopped!==!0)throw new l("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{Q(t),await k({...w,type:"open-session",id:m(s),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let i=Be(o),c={op:"get",key:t};if(i)c.scope=i;let S=await ke(c);return S.op==="get"&&S.found?S.value:void 0},set:async(t,o,i)=>{let c=Be(i),S={op:"set",key:t,value:o};if(c)S.scope=c;await ke(S)},delete:async(t,o)=>{let i=Be(o),c={op:"delete",key:t};if(i)c.scope=i;await ke(c)},keys:async(t)=>{let o=Be(t),i={op:"keys"};if(o)i.scope=o;let c=await ke(i);if(c.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:(t)=>{if(d.add(t),a)t(a);return()=>{d.delete(t)}},onDirectory:(t)=>{if(y.add(t),a)t(a.directory);return()=>{y.delete(t)}},onSession:(t)=>{if(p.add(t),a)t(a.session);return()=>{p.delete(t)}},onSessionLifecycle:(t)=>{if(L.add(t),D)t(D);return()=>{L.delete(t)}},onConnection:(t)=>{if(g.add(t),a)t(a.connection);return()=>{g.delete(t)}},onSettings:(t)=>{if(h.add(t),a)t(a.settings);return()=>{h.delete(t)}},onItem:(t)=>{if(M.add(t),a)t(a.item);return()=>{M.delete(t)}},onStatusControl:(t)=>(G.add(t),()=>{G.delete(t)}),onPopoverClosed:(t)=>(P.add(t),()=>{P.delete(t)}),setStatusControls:(t)=>{if(a?.features?.statusControls!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support status controls."));if(!ho(t))return Promise.reject(new l("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return k({...w,type:"status-controls",id:m(s),payload:{controls:t}})},openPopover:(t)=>{if(a?.features?.popovers!==!0)return Promise.reject(new l("UNSUPPORTED","This host does not support popovers."));if(!St(t))return Promise.reject(new l("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return k({...w,type:"popover-open",id:m(s),payload:t})},closePopover:co,setPopoverAnchorActive:lo,onResolve:(t)=>(R=t,()=>{if(R===t)R=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Le)return Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${Le} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Me))return Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${Me} characters.`));return k({channel:f,v:E,type:"toast",id:m(s),payload:{...t,message:o}})},openUrl:(t)=>k({channel:f,v:E,type:"open-url",id:m(s),payload:{url:t}}),openCommit:(t)=>yt(t)?k({channel:f,v:E,type:"open-commit",id:m(s),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>k({channel:f,v:E,type:"open-surface",id:m(s),payload:{surfaceId:t}}),writeClipboard:(t)=>k({channel:f,v:E,type:"clipboard-write",id:m(s),payload:{text:t}}),compose:(t)=>k({channel:f,v:E,type:"compose",id:m(s),payload:t}),attach:(t)=>k({channel:f,v:E,type:"attach",id:m(s),payload:me(t)}),startSession:async(t)=>{if(t.projectId!==void 0)Q(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")Q(o.directory);else{if(o.name!==void 0)Q(o.name,200);if(o.baseBranch!==void 0)Q(o.baseBranch,200)}let i=await H({channel:f,v:E,type:"start-session",id:m(s),payload:wt(t)},e.requestTimeoutMs??180000);if(!Tt(i))throw new l("HOST_REJECTED","Host did not return a session.");return i},prompt:(t)=>H({channel:f,v:E,type:"prompt",id:m(s),payload:Ot(t)}).then((o)=>{if(!bt(o))throw new l("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>k({channel:f,v:E,type:"session-link",id:m(s),payload:me(t)}),close:()=>k({channel:f,v:E,type:"close",id:m(s)}),oauthStart:()=>k({channel:f,v:E,type:"oauth-start",id:m(s)}),oauthDisconnect:()=>k({channel:f,v:E,type:"oauth-disconnect",id:m(s)}),request:(t)=>($e(t.path)?H({channel:f,v:E,type:"request",id:m(s),payload:t}):Bo()).then((o)=>{if(!He(o))throw new l("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>($e(t.path)?H({channel:f,v:E,type:"service-request",id:m(s),payload:t}):Bo()).then((o)=>{if(!He(o))throw new l("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>H({channel:f,v:E,type:"service-status",id:m(s)}).then((t)=>{if(!Ct(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(fe(t)?H({channel:f,v:E,type:"file-read",id:m(s),payload:{path:t}}):Xe()).then((o)=>{if(!It(o))throw new l("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!fe(t))return Xe();if(o.length>Ge)return Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${Ge} characters.`));return H({channel:f,v:E,type:"file-write",id:m(s),payload:{path:t,content:o}}).then((i)=>{if(!Lt(i))throw new l("HOST_REJECTED","Host did not confirm the write.");return i})},listDir:(t)=>(fe(t)?H({channel:f,v:E,type:"file-list",id:m(s),payload:{path:t}}):Xe()).then((o)=>{if(!Mt(o))throw new l("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(fe(t)?H({channel:f,v:E,type:"file-stat",id:m(s),payload:{path:t}}):Xe()).then((o)=>{if(!Pt(o))throw new l("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),i=t.system?.trim();if(o.length===0||o.length>Ne)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${Ne} characters.`));if(i!==void 0&&(i.length===0||i.length>De))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${De} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(vt,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let S={prompt:o};if(i!==void 0)S.system=i;if(c!==void 0)S.maxOutputTokens=c;return H({channel:f,v:E,type:"generate",id:m(s),payload:S},e.requestTimeoutMs??kt).then((x)=>{if(!Gt(x))throw new l("HOST_REJECTED","Host did not return generated text.");return x})},setBadge:(t)=>k({channel:f,v:E,type:"badge",id:m(s),payload:{count:Rt(t)}}),setHeight:(t)=>k({channel:f,v:E,type:"resize",id:m(s),payload:{height:Ut(t)}}),onFileOpen:(t)=>{if(N.add(t),!oe)oe=!0,r.addEventListener("keydown",ro,!0);if(K)t(K);return()=>{N.delete(t)}},onFileSnapshot:(t)=>(U=t,()=>{if(U===t)U=null}),onFileSaved:(t)=>(T.add(t),()=>{T.delete(t)}),reportFileChange:(t)=>it({...w,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:oo,reportFileUnsupported:()=>it({...w,type:"file-unsupported"}),dispose:()=>{for(let t of se.keys())W({...w,type:"workspace-unsubscribe",id:m(s),payload:{subscriptionId:t}});se.clear();for(let t of v.keys())W({...w,type:"shells-unsubscribe",id:m(s),payload:{subscriptionId:t}});if(v.clear(),b=!0,R=null,X=null,U=null,N.clear(),T.clear(),oe)r.removeEventListener("keydown",ro,!0);r.removeEventListener("message",to),r.removeEventListener("keydown",no,!0),r.removeEventListener("pointerover",ve),r.removeEventListener("pointermove",ve),r.removeEventListener("pointerout",so),r.removeEventListener("focus",io),r.removeEventListener("blur",ao);for(let t of q.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));q.clear(),d.clear(),y.clear(),p.clear(),L.clear(),g.clear(),h.clear(),M.clear(),G.clear(),P.clear()}}};var Vo=B(()=>{we();ft();_t();ht();Fe();ut();l=class l extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}});var zo,xn;var jo=B(()=>{zo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"],xn=new Set(zo)});var Ko,_n;var Wo=B(()=>{Ko=["none","agent","user"],_n=new Set(Ko)});var $t=B(()=>{we();Oe();ut();ft();xo();So();ht();Vo();_t();Fe();Fe();jo();Wo()});var Y=(e,r="",n="",u=[])=>{let d=document.createElement(e);if(r)d.className=r;if(n)d.textContent=n;if(u.length>0)d.append(...u);return d};var tr={};Sr(tr,{FAILURE_TEXT:()=>Nr,POLL_MS:()=>ge,isOnScreen:()=>Ye,portButton:()=>Jt,requestStop:()=>Hr,startPolling:()=>Fr});var ge=2000,Nr,_e=(e)=>typeof e==="object"&&e!==null,Dr=(e)=>_e(e)&&typeof e.at==="number"&&_e(e.system)&&_e(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&_e(e.history)&&_e(e.lmStudio),$r=(e)=>{if(!(e instanceof l))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},Hr=async(e,r)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(r)})).status===200}catch{return!1}},Jt=(e,r)=>{let n=Y("button","port",`:${r}`);return n.type="button",n.title=`Open http://localhost:${r}`,n.addEventListener("click",(u)=>{u.stopPropagation(),e.openUrl(`http://localhost:${r}`).catch(()=>{return})}),n},Ye=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Fr=(e,r,n,u)=>{let d=!1,y=ge,p=async()=>{if(d||!Ye(r))return;d=!0;try{let h=await e.serviceRequest({method:"GET",path:"/snapshot"}),M;try{M=JSON.parse(h.body)}catch{M=null}if(h.status===200&&Dr(M)){n(M);let G=M.lmStudio;y=G.prefillProgress>0||G.generateTokens>0?100:ge}else u(h.status===200?"bad-answer":"service-failed")}catch(h){u($r(h))}finally{d=!1,setTimeout(()=>{p()},y)}};p();let L=Ye(r),g=()=>{let h=Ye(r);if(h&&!L)p();L=h};return document.addEventListener("visibilitychange",g),new ResizeObserver(g).observe(document.documentElement),{refresh:()=>{p()}}};var Yt=B(()=>{$t();Nr={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."}});$t();var wr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Or=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Jo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,u]of wr)r.style.setProperty(n,e.tokens[u]);for(let[n,u,d]of Or){let y=e.tokens[d]??"";r.style.setProperty(n,y),r.style.setProperty(u,y)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Ht=(e,r)=>{if(Jo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};Oe();var Rr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},_=(e,r)=>`var(--${e}, var(--oc-${Rr[e]}, ${r}))`,ae=_("surface-background","transparent"),Ve=_("surface-elevated","transparent"),Se=_("surface-elevated-foreground","inherit"),re=_("surface-foreground","inherit"),A=_("surface-muted-foreground","gray"),Ur=_("surface-muted","transparent"),J=_("interactive-border","currentColor"),j=_("interactive-hover","transparent"),ce=_("interactive-active","transparent"),Ft=_("interactive-selection","transparent"),Xt=_("interactive-selection-foreground","inherit"),Zo=_("interactive-focus-ring","currentColor"),ee=_("primary","currentColor"),Bt=_("primary-text","inherit"),Vt=_("error-text","inherit"),Cr=_("font-sans","inherit"),zt=_("font-mono","monospace"),qo=_("radius","9px"),jt=`calc(${qo} - 2px)`,Yo=`calc(${qo} - 4px)`,I=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,Qo=`box-shadow: 0 0 0 2px ${Zo};`,ze=(e)=>{let r=_(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${_(`${e}-text`,"inherit")}; }`},Ir=`
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
.oc-sdk { color: ${re}; font-family: ${Cr}; }
.oc-sdk :focus-visible { outline: none; ${Qo} }
.oc-sdk-mono { font-family: ${zt}; }
.oc-sdk-muted { color: ${A}; }
${ze("success")}${ze("warning")}${ze("error")}${ze("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${ee}; --oc-sdk-tone-text: ${Bt}; }

.oc-sdk-btn { border-radius: ${jt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Yo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Bt}; background: ${I(ee,10,ae)}; border-color: ${I(ee,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${I(ee,16,ae)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${I(ee,22,ae)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Ur}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Ve}; color: ${Se}; border-color: ${J}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${j}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ce}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${_("status-error","red")}; color: ${Vt}; background: ${I("var(--oc-sdk-tone)",7,ae)}; border-color: ${I("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${I("var(--oc-sdk-tone)",9,ae)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${I("var(--oc-sdk-tone)",11,ae)}; }

.oc-sdk-field-note { color: ${A}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Vt}; }
.oc-sdk-input { border-radius: ${jt}; background: ${Ve}; color: ${Se}; box-shadow: inset 0 0 0 1px ${I(J,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${A}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Zo}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${_("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${_("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${zt}; }

.oc-sdk-search-icon { color: ${A}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${ee}; }
.oc-sdk-search-clear { border-radius: ${Yo}; color: ${A}; }
.oc-sdk-search-clear:hover { background: ${j}; color: ${re}; }

.oc-sdk-trigger { border-color: ${J}; border-radius: ${jt}; background: ${Ve}; color: ${Se}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${j}, ${j}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${A}; }
.oc-sdk-trigger-chevron { color: ${A}; }
.oc-sdk-popup { --surface-foreground: ${Se}; border-color: ${I(J,60)}; border-radius: 12px; background: ${Ve}; color: ${Se}; box-shadow: 0 8px 24px ${I(re,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${j}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ft}; color: ${Xt}; }
.oc-sdk-option-check { color: ${re}; }
.oc-sdk-option[data-destructive="true"] { color: ${Vt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${I(_("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${A}; }
.oc-sdk-popup-empty { color: ${A}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${J}; border-radius: 4px; color: ${re}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${I(re,60,J)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${J}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ae}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${ee}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Qo} }
.oc-sdk-check-desc { color: ${A}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${I(re,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${A}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${re}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Xt}; background: ${Ft}; border-color: ${J}; }
.oc-sdk-tab-count { color: ${A}; }

.oc-sdk-badge { border-radius: 9999px; background: ${j}; color: ${A}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${I("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${j}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ft}; color: ${Xt}; }
.oc-sdk-row-lead { font-family: ${zt}; color: ${A}; }
.oc-sdk-row-sub { color: ${A}; }
.oc-sdk-row-meta { color: ${A}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${A}; }

.oc-sdk-empty-body { color: ${A}; }

.oc-sdk-spinner { color: ${A}; }
.oc-sdk-spinner-ring { border-color: ${J}; border-top-color: ${ee}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${I("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${I("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${A}; }

.oc-sdk-separator { color: ${A}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${I(J,40)}; }

.oc-sdk-progress-label { color: ${A}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${J}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${ee}); }

.oc-sdk-text a { color: ${Bt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${I(J,60)}; }
`,F=`
${lt}
${Ir}
${er}`;Oe();Yt();var Xr="en";var Qt=(e,r)=>new Intl.NumberFormat(Xr,{minimumFractionDigits:r,maximumFractionDigits:r}).format(e),Qe=(e)=>{let r=["B","KB","MB","GB","TB"],n=Math.max(0,e),u=0;while(n>=1024&&u<r.length-1)n/=1024,u+=1;let d=u>=3&&n<100?1:0;return`${Qt(n,d)} ${r[u]}`},Zt=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${Qt(e,e<10?1:0)}%`},le=(e)=>`${Qt(e,1)}%`;var or=`
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
  .lm-row { display: flex; align-items: baseline; justify-content: space-between; padding: 2px 0; }
  .lm-label { color: var(--oc-muted); font-size: 11px; }
  .lm-state-loaded { color: var(--oc-success); }
  .lm-state-loading { color: var(--oc-info); }
  .lm-state-unloaded { color: var(--oc-muted); }
  .lm-state-error { color: var(--oc-error); }
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
`;var sr=90;var Br=0,ne=(e,r)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[u,d]of Object.entries(r))n.setAttribute(u,String(d));return n},ir=(e)=>{let r=document.createElement("div");r.className="chart",r.style.height=`${e.height}px`;let n=e.height,u=ne("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),d=`fill-${++Br}`,y=ne("defs",{}),p=ne("linearGradient",{id:d,x1:0,x2:0,y1:0,y2:1});p.append(ne("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),ne("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),y.append(p);let L=ne("path",{d:"",class:"chart-grid"}),g=ne("path",{d:"",fill:`url(#${d})`}),h=ne("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});u.append(y,L,g,h);let M=document.createElement("div");M.className="chart-cursor";let G=document.createElement("div");G.className="chart-dot",G.style.background=e.color;let P=document.createElement("div");P.className="chart-tip",r.append(u,M,G,P);let R=[],X=1,N=null,T=null,U=(v,b)=>(e.capacity-b+v)/Math.max(1,e.capacity-1)*300,K=(v)=>n-1-Math.min(v,X)/X*(n-1-2),oe=()=>{let v=N===null?void 0:R[N];if(N===null||v===void 0){r.classList.remove("hovering");return}r.classList.add("hovering");let b=r.getBoundingClientRect(),s=U(N,R.length)/300*b.width,a=K(v)/n*b.height;M.style.transform=`translateX(${s}px)`,G.style.transform=`translate(${s}px, ${a}px)`;let D=(R.length-1-N)*e.intervalSeconds;P.textContent=`${e.format(v)} · ${D===0?"now":`${D} s ago`}`;let Z=s>b.width/2;P.style.left=Z?"":`${s+8}px`,P.style.right=Z?`${b.width-s+8}px`:""},q=(v)=>{if(R.length===0)return;let b=r.getBoundingClientRect(),s=(v-b.left)/b.width*(e.capacity-1),a=Math.round(s-(e.capacity-R.length));N=Math.min(R.length-1,Math.max(0,a)),oe()};return r.addEventListener("pointermove",(v)=>{T=v.clientX,q(v.clientX)}),r.addEventListener("pointerleave",()=>{T=null,N=null,oe()}),{element:r,update:(v,b)=>{if(R=v,X=b>0?b:1,L.setAttribute("d",[0.25,0.5,0.75].map((s)=>`M0 ${n*s} H300`).join(" ")),R.length===0)g.setAttribute("d",""),h.setAttribute("d","");else{let s=R.map((ie,ye)=>`${U(ye,R.length).toFixed(2)} ${K(ie).toFixed(2)}`),a=R.length===1,D=a?`M${U(0,1)-2} ${s[0]?.split(" ")[1]} L${s[0]}`:`M${s.join(" L")}`;h.setAttribute("d",D);let Z=a?U(0,1)-2:U(0,R.length);g.setAttribute("d",`${D} L300 ${n} L${Z.toFixed(2)} ${n} Z`)}if(T!==null)q(T)}}};var qe=Dt(),be=document.querySelector("#root");if(!be)throw Error("Missing #root");var dr=document.createElement("style");dr.textContent=or+rr+nr;document.head.append(dr);var Vr=ge/1000,pr=ir({color:"var(--oc-primary)",height:18,capacity:sr,format:(e)=>`${e}ms`,intervalSeconds:Vr}),qt=(e)=>{let r=Y("span","meter-fill");return r.style.background=e,{element:Y("div","meter","",[r]),set:(u)=>{r.style.width=`${Math.min(100,Math.max(0,u))}%`}}},ur=qt("var(--oc-info)"),mr=qt("var(--oc-success)"),Ze=qt("var(--oc-success)"),pe=(e,r,n,u)=>{let d=Y("div","line","",[Y("span","what",e),r??Y("div","meter-empty"),Y("span","value num",n)]);if(u)d.title=u;return d},et=pe("OpenChamber",pr.element,"–","Memory and CPU of OpenChamber, OpenCode, and everything they started. CPU counts 100% per core."),tt=pe("CPU",ur.element,"–"),ot=pe("Memory",mr.element,"–"),rt=pe("LLM Status",null,"—","Model load state: mounted (loaded) or unmounted (unloaded)."),nt=pe("Prefill",Ze.element,"—","Prompt processing progress percentage."),st=pe("Generate",null,"—","Number of tokens generated in the current run."),Te=pe("Dev servers",null,""),ar=Y("div","ports"),de=Y("div","note","Reading…");be.append(de,et,tt,ot,rt,nt,st,Te);var zr=()=>{for(let e of[et,tt,ot,rt,nt,st,Te])e.hidden=!0};var jr=(e)=>{let{system:r,app:n}=e;tt.hidden=!1,ot.hidden=!1;let u=r.cpu??0;ur.set(r.cpu!==null?u:0),tt.querySelector(".value").textContent=Zt(r.cpu);let d=Math.round(r.memoryUsed/Math.max(1,r.memoryTotal)*100);mr.set(d),ot.querySelector(".value").textContent=`${Qe(r.memoryUsed)} / ${Qe(r.memoryTotal)}`,et.hidden=e.warnings.includes("processes-unavailable");let y=et.querySelector(".value");y.textContent=`${Qe(n.memory)} · ${Zt(n.cpu)}`,pr.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),rt.hidden=!1,nt.hidden=!1,st.hidden=!1;let{lmStudio:p}=e,g=(Array.isArray(p.models)?p.models.find((T)=>T.id===p.modelName):void 0)?.displayName||p.modelName,h;if(p.modelName)switch(p.state){case"loaded":h=g;break;case"loading":h=`${g} · 載入中 ${le(p.prefillProgress)}`;break;case"unloaded":h=g?`${g} · 卸載`:"卸載";break;case"error":h=g?`${g} · 錯誤`:"錯誤";break;default:h=g}else switch(p.state){case"loaded":h="掛載";break;case"unloaded":h="卸載";break;case"loading":h=`載入中 ${le(p.prefillProgress)}`;break;case"error":h="錯誤";break;default:h="—"}let M=rt.querySelector(".value");M.textContent=h,M.className=p.state==="loaded"?"value num lm-state-loaded lm-state-dim":`value num lm-state-${p.state}`;let G=nt.querySelector(".value"),P=st.querySelector(".value");if(p.prefillProgress>0||p.generateTokens>0||p.tokensPerSecond&&p.tokensPerSecond>0){let U=p.prefillTokensPerSecond;G.textContent=U&&U>0?`${le(100)} · ${U.toFixed(1)} tok/s`:le(100),Ze.set(100);let K=p.tokensPerSecond;if(K&&K>0){let oe=p.generateTokens>0?`${p.generateTokens.toLocaleString()} tokens · `:"";P.textContent=`${oe}${K.toFixed(1)} tok/s`}else if(p.generateTokens>0)P.textContent=p.generateTokens.toLocaleString();else P.textContent="—"}else if(p.prefillProgress>0&&p.prefillProgress<100){let T=p.prefillTokensPerSecond;G.textContent=T&&T>0?`${le(p.prefillProgress)} · ${T.toFixed(1)} tok/s`:le(p.prefillProgress),Ze.set(p.prefillProgress),P.textContent="—"}else G.textContent="—",Ze.set(0),P.textContent="—";let X=[...new Set(e.servers.flatMap((T)=>T.ports))].sort((T,U)=>T-U);if(X.length>0&&!e.warnings.includes("processes-unavailable")){Te.hidden=!1,ar.replaceChildren(...X.slice(0,6).map((U)=>Jt(qe,U)));let T=Te.querySelector(".value");if(T.replaceChildren(...ar.children),X.length>6)T.appendChild(Y("span","muted",` +${X.length-6}`))}else Te.hidden=!0;let N=e.warnings.includes("processes-unavailable");de.hidden=!N,de.className=N?"note error":"note",de.textContent=N?"Could not read the process list; showing system totals only.":""},Kr={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."};function Wr(e){de.hidden=!1,de.className="note error",de.textContent=Kr[e]??"Could not reach the monitoring service.",zr()}var cr=!1;qe.onReady(async(e)=>{if(Ht(e,document.documentElement),cr)return;cr=!0;let{startPolling:r}=await Promise.resolve().then(() => (Yt(),tr)),{refresh:n}=r(qe,be,(u)=>{jr(u)},Wr);n()});var lr=-1;new ResizeObserver(()=>{let e=Math.ceil(be.getBoundingClientRect().height);if(e===lr)return;lr=e,qe.setHeight(e).catch(()=>{return})}).observe(be);})();
