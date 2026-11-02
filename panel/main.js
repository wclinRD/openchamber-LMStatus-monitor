(()=>{var b="openchamber.sdk",T=1;var mt=`
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
`;function So(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(s)=>{let a=s.target===e?o:s.target;if(!(a instanceof Element))return;if(!a.hasAttribute("data-oc-scrolling"))a.setAttribute("data-oc-scrolling","");let m=n.get(a);if(m!==void 0)clearTimeout(m);n.set(a,setTimeout(()=>{n.delete(a),a.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Dr=`(${So.toString()})(document);`;var ft=128,ht=65536;var Le=128;var Ie=65536;var yo=/^[a-z][a-z0-9-]{0,39}$/;var _o=(e)=>Object(e)===e&&!Array.isArray(e),Et=(e,o)=>Object.keys(e).every((n)=>o.includes(n)),bo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,To=(e)=>String(e)===e&&e.length>=1&&e.length<=80,vo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!_o(n)||!yo.test(n.id)||!bo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!Et(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Et(n,["kind","id","label","value","options","disabled"]))return!1;if(!To(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let a of n.options){if(!_o(a)||!Et(a,["value","label"])||!To(a.value)||!bo(a.label)||s.has(a.value))return!1;s.add(a.value)}if(!s.has(n.value))return!1}return!0};var Ue=20000000,Me=256;var xt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Ao=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var ko=/^[A-Za-z0-9_-]{1,80}$/;var wo=["left","right","top","bottom"];var Oo=(e,o=0,n={remaining:16000})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let a of s)if(!Oo(a,o+1,n))return!1;return!0},gt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(gt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(gt)}return String(e)===e||Number.isFinite(e)},St=(e)=>{try{if(String(e.id)!==e.id||!ko.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!wo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Oo(e.data)||!gt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Co=["file","directory","other","missing"],bt=(e)=>Boolean(e&&"sessionId"in e),Tt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Lo=/^[0-9a-f]{7,64}$/i,yt=(e)=>Lo.test(e),Pe=500,Ge=32000,Io=16000,Uo=128,Mo=200,Po=2000,Go=16000,No=80,$o=200,Do=16000;var Ho=2000;var vt=20000,Ne=1024,$e=2000000;var De=64000,He=8000,At=4000;var kt=90000;var Fo=999,Xo=1e4,Se=500,Bo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Vo=["stopped","starting","ready","failed"],Hr=new Set(Bo),zo=(e)=>Hr.has(e),jo=(e)=>e&&zo(e)?e:"HOST_REJECTED",ue=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ue);if(Object(e)===e)return Object.values(e).every(ue);return!1},Ko=(e)=>ue(e)&&JSON.stringify(e).length<=Do,Ro=(e)=>e?.trim().slice(0,$o)??"",me=(e)=>{let o=e.id.trim().slice(0,Uo),n=e.title.trim().slice(0,Mo),s=e.url.trim().slice(0,Po),a=e.text?.trim().slice(0,Go),m=e.author?.trim().slice(0,No),d=e.kind==="pull"?"pull":"issue",g={providerId:e.providerId.trim(),id:o,title:n||o,url:s,kind:d};if(a)g.text=a;if(m)g.author=m;if(d==="pull"){let y=Ro(e.branches?.head),S=Ro(e.branches?.base);if(y&&S)g.branches={head:y,base:S}}if(Ko(e.data))g.data=e.data;return g},wt=(e)=>{let o=me(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},Ot=(e)=>{let o={text:e.text.trim().slice(0,Io)};if(e.send)o.send=!0;return o},Rt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Fo,Math.max(0,Math.round(e)))},Ct=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Xo,Math.max(0,Math.ceil(e)))};var fe=(e)=>e.length>0&&e.length<=Ne&&!e.includes("\x00")&&!e.includes("\\");var Fe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Ho)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Fr=new Set(Vo),Lt=(e)=>Boolean(e&&"status"in e&&Fr.has(String(e.status))&&!("body"in e)),Xe=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),It=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Ut=(e)=>Boolean(e&&"written"in e&&e.written===!0),Mt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Xr=new Set(Co),Pt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Xr.has(String(e.kind))&&Number.isFinite(e.size)),Gt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Br=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),Vr=(e)=>Object(e)===e?e:null,_t=(e)=>String(e)===e&&e.length>0,zr=(e)=>{if(!_t(e.id))return null;if(e.ok===!0){let o={channel:b,v:T,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&_t(e.error))return{channel:b,v:T,type:"result",id:e.id,ok:!1,error:e.error,code:jo(_t(e.code)?e.code:void 0)};return null},Nt=(e)=>{let o=Vr(e);if(!o||o.channel!==b||o.v!==T)return null;if(o.type==="result")return zr(o);if(!Br.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Wo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),jr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class f extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Jo=()=>Promise.reject(new f("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Be=()=>Promise.reject(new f("BAD_PATH",`File path must be 1 to ${Ne} characters without NUL or backslash.`)),Ve=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new f("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},x=(e)=>(e.value+=1,`oc-${e.value}`),$t=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new f("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===o.parent),s=e.requestTimeoutMs??vt,a=new Set,m=new Set,d=new Set,g=new Set,y=new Set,S=new Set,_=new Set,H=new Set,W=new Set,L=null,Q=null,h=new Set,E=new Set,B=null,Z=null,P=!1,C=new Map,ee=new Map,A=new Map,v=!1,c={value:0},l=null,D=null,j=!1,ie=!1,we=null,co=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},J=(t)=>{o.parent.postMessage(t,"*")},G=(t,r)=>{for(let p of t)try{p(r)}catch(u){console.error(u)}},lo=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let r=Nt(t.data);if(!r)return;if(r.type==="workspace"){let u=ee.get(r.payload.subscriptionId);if(u)G([u],r.payload.snapshot);return}if(r.type==="shells"){let u=A.get(r.payload.subscriptionId);if(u)G([u],r.payload.snapshot);return}if(r.type==="ready"){if(l=r.payload,D=co(r.payload.session),G(a,r.payload),G(m,r.payload.directory),G(d,r.payload.session),D)G(g,D);G(y,r.payload.connection),G(S,r.payload.settings),G(_,r.payload.item);return}if(r.type==="directory"){if(l)l={...l,directory:r.payload.directory};G(m,r.payload.directory);return}if(r.type==="session"){if(l)l={...l,session:r.payload.session};if(!r.payload.session)D=null;else if(D?.sessionId!==r.payload.session.id)D=co(r.payload.session);G(d,r.payload.session);return}if(r.type==="session-lifecycle"){D=r.payload,G(g,r.payload);return}if(r.type==="connection"){if(l)l={...l,connection:r.payload.connection};G(y,r.payload.connection);return}if(r.type==="settings"){if(l)l={...l,settings:r.payload.settings};G(S,r.payload.settings);return}if(r.type==="item"){if(l)l={...l,item:r.payload.item};G(_,r.payload.item);return}if(r.type==="status-control-event"){G(H,r.payload);return}if(r.type==="popover-closed"){G(W,r.payload);return}if(r.type==="action"){let u=(k)=>{if(!v)J({channel:b,v:T,type:"action-result",id:r.id,payload:k})},w=Q;if(!w){u({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>w(r.payload)).then(()=>u({ok:!0}),(k)=>{let M=(k instanceof Error?k.message:String(k)).trim();u({ok:!1,error:(M||"Action failed.").slice(0,Se)})});return}if(r.type==="file-open"){let u=r.payload;if(Z&&Ao(Z,u))return;Z=u,G(h,r.payload);return}if(r.type==="file-saved"){G(E,r.payload.version);return}if(r.type==="file-snapshot"){let u=(M)=>{if(!v)J({channel:b,v:T,type:"file-snapshot-result",id:r.id,payload:M})},w=(M)=>u({error:(M.trim()||"Could not read the edited file.").slice(0,Se)}),k=B;if(!k){w("This extension does not edit files.");return}Promise.resolve().then(()=>k(r.payload.purpose)).then((M)=>{if(xt(M)>Ue){w(`The file is over ${Ue} ${"bytes"in M?"bytes":"characters"}.`);return}if(M.version.length>Me){w(`The snapshot version is over ${Me} characters.`);return}u({snapshot:"bytes"in M?{bytes:M.bytes,version:M.version}:{content:M.content,version:M.version}})},(M)=>w(M instanceof Error?M.message:String(M)));return}if(r.type==="resolve"){let u=(k)=>{J({channel:b,v:T,type:"resolve-result",id:r.id,payload:k})},w=L;if(!w){u({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>w(r.payload)).then((k)=>u({item:k?me(k):null}),(k)=>{let M=(k instanceof Error?k.message:String(k)).trim();u({error:(M||"Command failed.").slice(0,Se)})});return}let p=C.get(r.id);if(!p)return;if(clearTimeout(p.timer),C.delete(r.id),r.ok){p.resolve(r.payload);return}p.reject(new f(r.code,r.error))};o.addEventListener("message",lo),J({channel:b,v:T,type:"hello"});let F=(t,r=s)=>{if(v||o.parent===o)return Promise.reject(new f("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((p,u)=>{let w=setTimeout(()=>{C.delete(t.id),u(new f("HOST_TIMEOUT","Host did not answer in time."))},r);C.set(t.id,{resolve:p,reject:u,timer:w}),J(t)})},I=(t)=>F(t).then(()=>{return}),U={channel:b,v:T},lt=(t)=>{if(!v&&o.parent!==o)J(t)},po=()=>lt({...U,type:"file-save"}),uo=(t)=>{if(!Wo(t)||!jr(t))return;t.preventDefault(),po()},mo=(t)=>{if(!Wo(t)||t.key!=="Escape"||l?.surface!=="popover"||!l.popover)return;t.preventDefault(),xo(l.popover.id,"escape").catch(()=>{return})},Oe=()=>{let t=l?.surface==="popover"?l.popover:void 0;if(!t)return;let r=j||ie;if(we===r)return;we=r,go(t.id,r).catch(()=>{return})},Re=()=>{if(l?.surface!=="popover"||j)return;j=!0,Oe()},fo=(t)=>{if(l?.surface!=="popover"||t.relatedTarget!==null||!j)return;j=!1,Oe()},ho=()=>{if(l?.surface!=="popover"||ie)return;ie=!0,Oe()},Eo=()=>{if(l?.surface!=="popover"||!ie)return;ie=!1,Oe()},q=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new f("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},pt=async(t)=>{if(t.kind!=="projects")q(t.projectId);let r=await F({...U,type:"workspace-read",id:x(c),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new f("HOST_REJECTED","Host did not return workspace data.");return r},ut=async(t,r)=>{if(t.kind!=="projects")q(t.projectId);let p=x(c);ee.set(p,r);try{await I({...U,type:"workspace-subscribe",id:x(c),payload:{subscriptionId:p,query:t}})}catch(u){if(ee.delete(p),!v)J({...U,type:"workspace-unsubscribe",id:x(c),payload:{subscriptionId:p}});throw u}return()=>{if(!ee.delete(p)||v)return;J({...U,type:"workspace-unsubscribe",id:x(c),payload:{subscriptionId:p}})}},$r=async(t,r)=>{if(t.kind==="session")q(t.sessionId);if(t.kind==="project")q(t.projectId);let p=x(c);A.set(p,r);try{await I({...U,type:"shells-subscribe",id:x(c),payload:{subscriptionId:p,scope:t}})}catch(u){if(A.delete(p),!v)J({...U,type:"shells-unsubscribe",id:x(c),payload:{subscriptionId:p}});throw u}return()=>{if(!A.delete(p)||v)return;J({...U,type:"shells-unsubscribe",id:x(c),payload:{subscriptionId:p}})}},Ce=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>ft))throw new f("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!ue(t.value))throw new f("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>ht)throw new f("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&l?.features?.deviceStorage!==!0)throw new f("UNSUPPORTED","This host does not support device storage.");let r=await F({...U,type:"storage",id:x(c),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new f("HOST_REJECTED","Host did not return storage data.");return r},xo=(t,r)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new f("UNSUPPORTED","This host does not support popovers.")):I({...U,type:"popover-close",id:x(c),payload:r?{id:t,reason:r}:{id:t}}),go=(t,r)=>l?.features?.popovers!==!0&&!(l?.surface==="popover"&&l.popover?.id===t)?Promise.reject(new f("UNSUPPORTED","This host does not support popovers.")):I({...U,type:"popover-anchor",id:x(c),payload:{id:t,active:r}});return o.addEventListener("keydown",mo,!0),o.addEventListener("pointerover",Re),o.addEventListener("pointermove",Re),o.addEventListener("pointerout",fo),o.addEventListener("focus",ho),o.addEventListener("blur",Eo),{onAction:(t)=>(Q=t,()=>{if(Q===t)Q=null}),listProjects:async()=>{let t=await pt({kind:"projects"});if(t.kind!=="projects")throw new f("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await pt({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new f("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await pt({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new f("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>ut({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>ut({kind:"worktrees",projectId:t},(p)=>{if(p.kind==="worktrees")r(p)}),onSessions:(t,r)=>ut({kind:"sessions",projectId:t},(p)=>{if(p.kind==="sessions")r(p)}),onRunningShells:(t,r)=>$r(t,r),readShellOutput:async(t,r)=>{q(t,Le);let p=r?.cursor;if(p!==void 0&&(!Number.isInteger(p)||p<0))throw new f("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let u=r?.tailBytes;if(u!==void 0&&(!Number.isInteger(u)||u<1||u>Ie))throw new f("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ie}.`);let k=await F({...U,type:"shell-output",id:x(c),payload:{shellId:t,cursor:p,tailBytes:u}});if(!k||typeof k.output!=="string"||!Number.isFinite(k.cursor))throw new f("HOST_REJECTED","Host did not return shell output.");return k},stopShell:async(t)=>{if(q(t,Le),(await F({...U,type:"shell-stop",id:x(c),payload:{shellId:t}}))?.stopped!==!0)throw new f("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{q(t),await I({...U,type:"open-session",id:x(c),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let p=Ve(r),u={op:"get",key:t};if(p)u.scope=p;let w=await Ce(u);return w.op==="get"&&w.found?w.value:void 0},set:async(t,r,p)=>{let u=Ve(p),w={op:"set",key:t,value:r};if(u)w.scope=u;await Ce(w)},delete:async(t,r)=>{let p=Ve(r),u={op:"delete",key:t};if(p)u.scope=p;await Ce(u)},keys:async(t)=>{let r=Ve(t),p={op:"keys"};if(r)p.scope=r;let u=await Ce(p);if(u.op!=="keys")throw new f("HOST_REJECTED","Expected storage keys.");return u.keys}},onReady:(t)=>{if(a.add(t),l)t(l);return()=>{a.delete(t)}},onDirectory:(t)=>{if(m.add(t),l)t(l.directory);return()=>{m.delete(t)}},onSession:(t)=>{if(d.add(t),l)t(l.session);return()=>{d.delete(t)}},onSessionLifecycle:(t)=>{if(g.add(t),D)t(D);return()=>{g.delete(t)}},onConnection:(t)=>{if(y.add(t),l)t(l.connection);return()=>{y.delete(t)}},onSettings:(t)=>{if(S.add(t),l)t(l.settings);return()=>{S.delete(t)}},onItem:(t)=>{if(_.add(t),l)t(l.item);return()=>{_.delete(t)}},onStatusControl:(t)=>(H.add(t),()=>{H.delete(t)}),onPopoverClosed:(t)=>(W.add(t),()=>{W.delete(t)}),setStatusControls:(t)=>{if(l?.features?.statusControls!==!0)return Promise.reject(new f("UNSUPPORTED","This host does not support status controls."));if(!vo(t))return Promise.reject(new f("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return I({...U,type:"status-controls",id:x(c),payload:{controls:t}})},openPopover:(t)=>{if(l?.features?.popovers!==!0)return Promise.reject(new f("UNSUPPORTED","This host does not support popovers."));if(!St(t))return Promise.reject(new f("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return I({...U,type:"popover-open",id:x(c),payload:t})},closePopover:xo,setPopoverAnchorActive:go,onResolve:(t)=>(L=t,()=>{if(L===t)L=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>Pe)return Promise.reject(new f("HOST_REJECTED",`Toast message must contain 1 to ${Pe} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>Ge))return Promise.reject(new f("HOST_REJECTED",`Toast copy text must contain 1 to ${Ge} characters.`));return I({channel:b,v:T,type:"toast",id:x(c),payload:{...t,message:r}})},openUrl:(t)=>I({channel:b,v:T,type:"open-url",id:x(c),payload:{url:t}}),openCommit:(t)=>yt(t)?I({channel:b,v:T,type:"open-commit",id:x(c),payload:{sha:t}}):Promise.reject(new f("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>I({channel:b,v:T,type:"open-surface",id:x(c),payload:{surfaceId:t}}),writeClipboard:(t)=>I({channel:b,v:T,type:"clipboard-write",id:x(c),payload:{text:t}}),compose:(t)=>I({channel:b,v:T,type:"compose",id:x(c),payload:t}),attach:(t)=>I({channel:b,v:T,type:"attach",id:x(c),payload:me(t)}),startSession:async(t)=>{if(t.projectId!==void 0)q(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")q(r.directory);else{if(r.name!==void 0)q(r.name,200);if(r.baseBranch!==void 0)q(r.baseBranch,200)}let p=await F({channel:b,v:T,type:"start-session",id:x(c),payload:wt(t)},e.requestTimeoutMs??180000);if(!bt(p))throw new f("HOST_REJECTED","Host did not return a session.");return p},prompt:(t)=>F({channel:b,v:T,type:"prompt",id:x(c),payload:Ot(t)}).then((r)=>{if(!Tt(r))throw new f("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>I({channel:b,v:T,type:"session-link",id:x(c),payload:me(t)}),close:()=>I({channel:b,v:T,type:"close",id:x(c)}),oauthStart:()=>I({channel:b,v:T,type:"oauth-start",id:x(c)}),oauthDisconnect:()=>I({channel:b,v:T,type:"oauth-disconnect",id:x(c)}),request:(t)=>(Fe(t.path)?F({channel:b,v:T,type:"request",id:x(c),payload:t}):Jo()).then((r)=>{if(!Xe(r))throw new f("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Fe(t.path)?F({channel:b,v:T,type:"service-request",id:x(c),payload:t}):Jo()).then((r)=>{if(!Xe(r))throw new f("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>F({channel:b,v:T,type:"service-status",id:x(c)}).then((t)=>{if(!Lt(t))throw new f("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(fe(t)?F({channel:b,v:T,type:"file-read",id:x(c),payload:{path:t}}):Be()).then((r)=>{if(!It(r))throw new f("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!fe(t))return Be();if(r.length>$e)return Promise.reject(new f("FILE_TOO_LARGE",`Content is over ${$e} characters.`));return F({channel:b,v:T,type:"file-write",id:x(c),payload:{path:t,content:r}}).then((p)=>{if(!Ut(p))throw new f("HOST_REJECTED","Host did not confirm the write.");return p})},listDir:(t)=>(fe(t)?F({channel:b,v:T,type:"file-list",id:x(c),payload:{path:t}}):Be()).then((r)=>{if(!Mt(r))throw new f("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(fe(t)?F({channel:b,v:T,type:"file-stat",id:x(c),payload:{path:t}}):Be()).then((r)=>{if(!Pt(r))throw new f("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),p=t.system?.trim();if(r.length===0||r.length>De)return Promise.reject(new f("HOST_REJECTED",`Prompt must be 1 to ${De} characters.`));if(p!==void 0&&(p.length===0||p.length>He))return Promise.reject(new f("HOST_REJECTED",`System prompt must be 1 to ${He} characters.`));let u=t.maxOutputTokens===void 0?void 0:Math.min(At,Math.max(1,Math.floor(t.maxOutputTokens)));if(u!==void 0&&!Number.isFinite(u))return Promise.reject(new f("HOST_REJECTED","maxOutputTokens must be a number."));let w={prompt:r};if(p!==void 0)w.system=p;if(u!==void 0)w.maxOutputTokens=u;return F({channel:b,v:T,type:"generate",id:x(c),payload:w},e.requestTimeoutMs??kt).then((k)=>{if(!Gt(k))throw new f("HOST_REJECTED","Host did not return generated text.");return k})},setBadge:(t)=>I({channel:b,v:T,type:"badge",id:x(c),payload:{count:Rt(t)}}),setHeight:(t)=>I({channel:b,v:T,type:"resize",id:x(c),payload:{height:Ct(t)}}),onFileOpen:(t)=>{if(h.add(t),!P)P=!0,o.addEventListener("keydown",uo,!0);if(Z)t(Z);return()=>{h.delete(t)}},onFileSnapshot:(t)=>(B=t,()=>{if(B===t)B=null}),onFileSaved:(t)=>(E.add(t),()=>{E.delete(t)}),reportFileChange:(t)=>lt({...U,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:po,reportFileUnsupported:()=>lt({...U,type:"file-unsupported"}),dispose:()=>{for(let t of ee.keys())J({...U,type:"workspace-unsubscribe",id:x(c),payload:{subscriptionId:t}});ee.clear();for(let t of A.keys())J({...U,type:"shells-unsubscribe",id:x(c),payload:{subscriptionId:t}});if(A.clear(),v=!0,L=null,Q=null,B=null,h.clear(),E.clear(),P)o.removeEventListener("keydown",uo,!0);o.removeEventListener("message",lo),o.removeEventListener("keydown",mo,!0),o.removeEventListener("pointerover",Re),o.removeEventListener("pointermove",Re),o.removeEventListener("pointerout",fo),o.removeEventListener("focus",ho),o.removeEventListener("blur",Eo);for(let t of C.values())clearTimeout(t.timer),t.reject(new f("HOST_UNAVAILABLE","Host client was disposed."));C.clear(),a.clear(),m.clear(),d.clear(),g.clear(),y.clear(),S.clear(),_.clear(),H.clear(),W.clear()}}};var Yo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var zn=new Set(Yo);var Qo=["none","agent","user"];var Kn=new Set(Qo);var Kr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Wr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Zo=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,s]of Kr)o.style.setProperty(n,e.tokens[s]);for(let[n,s,a]of Wr){let m=e.tokens[a]??"";o.style.setProperty(n,m),o.style.setProperty(s,m)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Dt=(e,o)=>{if(Zo(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var Jr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},O=(e,o)=>`var(--${e}, var(--oc-${Jr[e]}, ${o}))`,ae=O("surface-background","transparent"),ze=O("surface-elevated","transparent"),_e=O("surface-elevated-foreground","inherit"),ne=O("surface-foreground","inherit"),R=O("surface-muted-foreground","gray"),Yr=O("surface-muted","transparent"),Y=O("interactive-border","currentColor"),K=O("interactive-hover","transparent"),ce=O("interactive-active","transparent"),Ht=O("interactive-selection","transparent"),Ft=O("interactive-selection-foreground","inherit"),tr=O("interactive-focus-ring","currentColor"),te=O("primary","currentColor"),Xt=O("primary-text","inherit"),Bt=O("error-text","inherit"),Qr=O("font-sans","inherit"),Vt=O("font-mono","monospace"),or=O("radius","9px"),zt=`calc(${or} - 2px)`,qo=`calc(${or} - 4px)`,N=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,er=`box-shadow: 0 0 0 2px ${tr};`,je=(e)=>{let o=O(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${O(`${e}-text`,"inherit")}; }`},Zr=`
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
`,rr=`
.oc-sdk { color: ${ne}; font-family: ${Qr}; }
.oc-sdk :focus-visible { outline: none; ${er} }
.oc-sdk-mono { font-family: ${Vt}; }
.oc-sdk-muted { color: ${R}; }
${je("success")}${je("warning")}${je("error")}${je("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${te}; --oc-sdk-tone-text: ${Xt}; }

.oc-sdk-btn { border-radius: ${zt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${qo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Xt}; background: ${N(te,10,ae)}; border-color: ${N(te,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${N(te,16,ae)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${N(te,22,ae)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Yr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="outline"] { background: ${ze}; color: ${_e}; border-color: ${Y}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${K}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ce}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${O("status-error","red")}; color: ${Bt}; background: ${N("var(--oc-sdk-tone)",7,ae)}; border-color: ${N("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${N("var(--oc-sdk-tone)",9,ae)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${N("var(--oc-sdk-tone)",11,ae)}; }

.oc-sdk-field-note { color: ${R}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Bt}; }
.oc-sdk-input { border-radius: ${zt}; background: ${ze}; color: ${_e}; box-shadow: inset 0 0 0 1px ${N(Y,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${R}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${tr}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${O("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${O("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Vt}; }

.oc-sdk-search-icon { color: ${R}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${te}; }
.oc-sdk-search-clear { border-radius: ${qo}; color: ${R}; }
.oc-sdk-search-clear:hover { background: ${K}; color: ${ne}; }

.oc-sdk-trigger { border-color: ${Y}; border-radius: ${zt}; background: ${ze}; color: ${_e}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${K}, ${K}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${R}; }
.oc-sdk-trigger-chevron { color: ${R}; }
.oc-sdk-popup { --surface-foreground: ${_e}; border-color: ${N(Y,60)}; border-radius: 12px; background: ${ze}; color: ${_e}; box-shadow: 0 8px 24px ${N(ne,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${K}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Ht}; color: ${Ft}; }
.oc-sdk-option-check { color: ${ne}; }
.oc-sdk-option[data-destructive="true"] { color: ${Bt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${N(O("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${R}; }
.oc-sdk-popup-empty { color: ${R}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Y}; border-radius: 4px; color: ${ne}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${N(ne,60,Y)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Y}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ae}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${te}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${er} }
.oc-sdk-check-desc { color: ${R}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${N(ne,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${R}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${ne}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ft}; background: ${Ht}; border-color: ${Y}; }
.oc-sdk-tab-count { color: ${R}; }

.oc-sdk-badge { border-radius: 9999px; background: ${K}; color: ${R}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${N("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${K}; }
.oc-sdk-row[aria-selected="true"] { background: ${Ht}; color: ${Ft}; }
.oc-sdk-row-lead { font-family: ${Vt}; color: ${R}; }
.oc-sdk-row-sub { color: ${R}; }
.oc-sdk-row-meta { color: ${R}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${R}; }

.oc-sdk-empty-body { color: ${R}; }

.oc-sdk-spinner { color: ${R}; }
.oc-sdk-spinner-ring { border-color: ${Y}; border-top-color: ${te}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${N("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${N("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${R}; }

.oc-sdk-separator { color: ${R}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${N(Y,40)}; }

.oc-sdk-progress-label { color: ${R}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Y}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${te}); }

.oc-sdk-text a { color: ${Xt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${N(Y,60)}; }
`,X=`
${mt}
${Zr}
${rr}`;var rn=0,se=(e,o)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[s,a]of Object.entries(o))n.setAttribute(s,String(a));return n},Wt=(e)=>{let o=document.createElement("div");o.className="chart",o.style.height=`${e.height}px`;let n=e.height,s=se("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),a=`fill-${++rn}`,m=se("defs",{}),d=se("linearGradient",{id:a,x1:0,x2:0,y1:0,y2:1});d.append(se("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),se("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),m.append(d);let g=se("path",{d:"",class:"chart-grid"}),y=se("path",{d:"",fill:`url(#${a})`}),S=se("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});s.append(m,g,y,S);let _=document.createElement("div");_.className="chart-cursor";let H=document.createElement("div");H.className="chart-dot",H.style.background=e.color;let W=document.createElement("div");W.className="chart-tip",o.append(s,_,H,W);let L=[],Q=1,h=null,E=null,B=(A,v)=>(e.capacity-v+A)/Math.max(1,e.capacity-1)*300,Z=(A)=>n-1-Math.min(A,Q)/Q*(n-1-2),P=()=>{let A=h===null?void 0:L[h];if(h===null||A===void 0){o.classList.remove("hovering");return}o.classList.add("hovering");let v=o.getBoundingClientRect(),c=B(h,L.length)/300*v.width,l=Z(A)/n*v.height;_.style.transform=`translateX(${c}px)`,H.style.transform=`translate(${c}px, ${l}px)`;let D=(L.length-1-h)*e.intervalSeconds;W.textContent=`${e.format(A)} · ${D===0?"now":`${D} s ago`}`;let j=c>v.width/2;W.style.left=j?"":`${c+8}px`,W.style.right=j?`${v.width-c+8}px`:""},C=(A)=>{if(L.length===0)return;let v=o.getBoundingClientRect(),c=(A-v.left)/v.width*(e.capacity-1),l=Math.round(c-(e.capacity-L.length));h=Math.min(L.length-1,Math.max(0,l)),P()};return o.addEventListener("pointermove",(A)=>{E=A.clientX,C(A.clientX)}),o.addEventListener("pointerleave",()=>{E=null,h=null,P()}),{element:o,update:(A,v)=>{if(L=A,Q=v>0?v:1,g.setAttribute("d",[0.25,0.5,0.75].map((c)=>`M0 ${n*c} H300`).join(" ")),L.length===0)y.setAttribute("d",""),S.setAttribute("d","");else{let c=L.map((ie,we)=>`${B(we,L.length).toFixed(2)} ${Z(ie).toFixed(2)}`),l=L.length===1,D=l?`M${B(0,1)-2} ${c[0]?.split(" ")[1]} L${c[0]}`:`M${c.join(" L")}`;S.setAttribute("d",D);let j=l?B(0,1)-2:B(0,L.length);y.setAttribute("d",`${D} L300 ${n} L${j.toFixed(2)} ${n} Z`)}if(E!==null)C(E)}}};var i=(e,o="",n="",s=[])=>{let a=document.createElement(e);if(o)a.className=o;if(n)a.textContent=n;if(s.length>0)a.append(...s);return a};var Qe=2000,nr={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."},be=(e)=>typeof e==="object"&&e!==null,nn=(e)=>be(e)&&typeof e.at==="number"&&be(e.system)&&be(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&be(e.history)&&be(e.lmStudio),sn=(e)=>{if(!(e instanceof f))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},sr=async(e,o)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(o)})).status===200}catch{return!1}},ir=(e,o)=>{let n=i("button","port",`:${o}`);return n.type="button",n.title=`Open http://localhost:${o}`,n.addEventListener("click",(s)=>{s.stopPropagation(),e.openUrl(`http://localhost:${o}`).catch(()=>{return})}),n},Jt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,ar=(e,o,n,s)=>{let a=!1,m=Qe,d=async()=>{if(a||!Jt(o))return;a=!0;try{let S=await e.serviceRequest({method:"GET",path:"/snapshot"}),_;try{_=JSON.parse(S.body)}catch{_=null}if(S.status===200&&nn(_)){n(_);let H=_.lmStudio;m=H.prefillProgress>0||H.generateTokens>0?100:Qe}else s(S.status===200?"bad-answer":"service-failed")}catch(S){s(sn(S))}finally{a=!1,setTimeout(()=>{d()},m)}};d();let g=Jt(o),y=()=>{let S=Jt(o);if(S&&!g)d();g=S};return document.addEventListener("visibilitychange",y),new ResizeObserver(y).observe(document.documentElement),{refresh:()=>{d()}}};var cr="en",dr=(e)=>{cr=e||"en"},Yt=(e,o)=>new Intl.NumberFormat(cr,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e),re=(e)=>{let o=["B","KB","MB","GB","TB"],n=Math.max(0,e),s=0;while(n>=1024&&s<o.length-1)n/=1024,s+=1;let a=s>=3&&n<100?1:0;return`${Yt(n,a)} ${o[s]}`},de=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${Yt(e,e<10?1:0)}%`},et=(e)=>`${Yt(e,1)}%`,lr=(e)=>{let o=Math.floor(e/86400),n=Math.floor(e%86400/3600),s=Math.floor(e%3600/60);if(o>0)return`${o} d ${n} h`;if(n>0)return`${n} h ${s} min`;return`${s} min`},Ze=(e,o)=>{let n=o.replace(/^"([^"]+)"/,"$1");if(!e||!/^([A-Za-z]:)?[\\/]/.test(n))return o;let s=-1;while((s=n.indexOf(e,s+1))>=0){if(!/[\\/]/.test(n[s-1]??""))continue;let a=n.slice(s+e.length).replace(/^\.exe/i,"");if(a===""||a.startsWith(" "))return a.trim()}return o},an={renderer:"Renderer","gpu-process":"GPU",utility:"Utility",zygote:"Zygote"},cn=[[/network/i,"Network service"],[/storage/i,"Storage service"],[/audio/i,"Audio service"],[/video_?capture/i,"Video capture"]],qe=(...e)=>e.filter(Boolean).join(" · "),pr=(e,o)=>{let n=e.ports.map((d)=>`:${d}`).join(" ");if(o==="root")return{title:"Main process",detail:qe(n,Ze(e.name,e.command))};if(o==="self")return{title:"Resource Monitor",detail:"this extension"};let s=/--type=([\w-]+)/.exec(e.command)?.[1];if(s&&/\bHelper\b/.test(e.name)){let d=s==="utility"?/--utility-sub-type=([\w.]+)/.exec(e.command)?.[1]??"":"";return{title:cn.find(([y])=>y.test(d))?.[1]??an[s]??s,detail:qe(n,Ze(e.name,e.command))}}let a=e.label||e.name,m=Ze(e.name,e.command);return{title:a,detail:qe(n,m===a||m===e.name?"":m)}},ur=(e)=>{let o=Ze(e.name,e.command),n=o===e.title||o===e.name||e.command===e.title;return qe(e.ports.map((s)=>`:${s}`).join(" "),e.count>1?`${e.count} processes`:"",n?"":o)},mr=(e)=>{if(e==="darwin")return"macOS";if(e==="win32")return"Windows";if(e==="linux")return"Linux";return e},tt={app:"OpenChamber",opencode:"OpenCode",terminals:"Terminal"},fr={app:"OpenChamber",opencode:"Agent",terminals:"Terminal"},le={cpu:"var(--oc-info)",memory:"var(--oc-success)",app:"var(--oc-primary)",opencode:"color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))",terminals:"var(--oc-muted)"};var hr=`
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
`,Er=`
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
`;var Qt=90;var ge=$t(),ro=document.querySelector("#root");if(!ro)throw Error("Missing #root");var _r=document.createElement("style");_r.textContent=hr+Er;document.head.append(_r);var no=Qe/1000,ve=i("div","banner");ve.hidden=!0;var br=i("div","host-name","This machine"),Tr=i("div","host-meta","Reading…"),ke=i("div","live stale","Starting"),yr=i("div","head");yr.append(i("div","titles","",[br,Tr]),ke);var vr=(e,o,n)=>{let s=i("span","big num","–"),a=i("span","sub num"),m=i("div","card-top","",[i("span","label",e),i("span","grow"),a]),d=Wt({color:o,height:56,capacity:Qt,format:n,intervalSeconds:no}),g=i("div","sub num");return{card:i("div","card","",[m,s,d.element,g]),value:s,side:a,sub:g,chart:d}},Te=vr("CPU",le.cpu,de),ye=vr("Memory",le.memory,re),dn=i("div","grid","",[Te.card,ye.card]),Ar=i("span","big num","–"),kr=i("span","sub num"),wr=Wt({color:le.app,height:44,capacity:Qt,format:re,intervalSeconds:no}),Or=i("div","stack"),Rr=i("div","legend"),ln=i("div","card","",[i("div","card-top","",[i("span","label","OpenChamber"),i("span","grow"),kr]),Ar,i("div","sub","The app, OpenCode, and everything they started"),wr.element,Or,Rr]),Zt=i("span","big num lm-state","—"),qt=i("div","lm-spec-context"),eo=i("span","sub num"),to=i("span","sub num"),ot=i("div","lm-detail"),pn=i("div","card","",[i("div","card-top","",[i("span","label","LM Studio"),i("span","grow")]),Zt,i("div","lm-row","",[i("span","lm-label","Prefill"),eo]),i("div","lm-row","",[i("span","lm-label","Generate"),to]),qt,ot]),un=()=>i("div","cols","",[i("span"),i("span"),i("span","cell","CPU"),i("span","cell","Memory")]),it=(e)=>i("span","action","",e?[e]:[]),Cr=i("span","count"),oo=i("div","list"),Lr=i("div","empty","No dev servers right now. Servers started by an agent, a project action, or the terminal show up here with their ports."),mn=i("section","section","",[i("div","section-head","",[i("span","label","Dev servers"),Cr]),oo,Lr]),Ir=i("div","list"),fn=i("section","section","",[i("div","section-head","",[i("span","label","Processes")]),un(),Ir]),Ur=i("div","list"),so=i("section","section","",[i("div","section-head","",[i("span","label","OpenCode outside OpenChamber")]),Ur]);so.hidden=!0;var hn=i("div","footnote","Process CPU counts 100% per core, as Activity Monitor does; the CPU card above is the whole machine. Memory is resident memory: pages a process shares with others count in each of them.");ro.append(ve,yr,dn,ln,pn,mn,fn,so,hn);var Mr=()=>{return},io=(e,o,n)=>{let s=i("button","stop",e);s.type="button";let a=!1,m,d=()=>{a=!1,s.classList.remove("armed"),s.textContent=e};return s.addEventListener("click",(g)=>{if(g.preventDefault(),g.stopPropagation(),s.disabled)return;if(!a){a=!0,s.classList.add("armed"),s.textContent=o,clearTimeout(m),m=setTimeout(d,4000);return}clearTimeout(m),s.disabled=!0,s.textContent="Stopping…",sr(ge,n).then((y)=>{if(!y)yn();Mr()})}),s},at=(e)=>i("span",e!==null&&e>=1?"cell num":"cell num quiet",de(e)),ct=(e)=>i("span","cell num",re(e)),Pr=(e,o)=>{let n=i("span","title-line","",[i("span","pname",e)]),s=i("div","who","",[n]);if(o)s.append(i("span","pdetail",o));return s},ao=(e,o,n="row")=>{let{title:s,detail:a}=pr(e,o),m=i("div",n,"",[Pr(s,a),it(),at(e.cpu),ct(e.memory)]);return m.title=`${e.name} · pid ${e.pid}${e.command?`
${e.command}`:""}`,m},Ee=new Set,En=(e,o)=>{let n=e.members.length>0&&e.count>1,s=n&&Ee.has(e.pid),a=ur(e),m=o?io("Stop",`Stop ${e.title}?`,{kind:"job",pid:e.pid,name:e.name}):void 0,d=i("div",n?"row job foldable":"row job","",[Pr(e.title,a),it(m),at(e.cpu),ct(e.memory)]);d.title=e.command||e.title,d.classList.toggle("open",s);let g=i("div",s?"job-wrap open":"job-wrap","",[d]);if(n){d.tabIndex=0,d.setAttribute("role","button"),d.setAttribute("aria-expanded",String(s));let y=()=>{if(Ee.has(e.pid))Ee.delete(e.pid);else Ee.add(e.pid);if(pe)dt(pe)};d.addEventListener("click",y),d.addEventListener("keydown",(S)=>{if(S.key==="Enter"||S.key===" ")S.preventDefault(),y()})}if(s){let y=i("div","members","",e.members.map((_)=>ao(_,"other","row member"))),S=e.count-e.members.length;if(S>0)y.append(i("div","more",S===1?"1 more process, idle":`${S} more processes, idle`));g.append(y)}return g},Gr="collapsed-groups",xe=new Set,rt=!1,xn=()=>{if(!rt)return;ge.storage.set(Gr,[...xe],{scope:"device"}).catch(()=>{return})},gn=async()=>{if(!rt)return;try{let e=await ge.storage.get(Gr,{scope:"device"});if(!Array.isArray(e))return;for(let o of e)if(o==="app"||o==="opencode"||o==="terminals")xe.add(o);if(pe)dt(pe)}catch{}},Sn=(e,o)=>{let n=i("span","dot");n.style.background=le[e.id];let s=e.id==="terminals"&&e.jobs.length>0?io("Stop all","Stop everything running in the terminal?",{kind:"terminals"}):void 0,a=i("span","gname","",[n,i("b","",tt[e.id]),i("span","count",String(e.count))]),m=xe.has(e.id),d=i("div",m?"group-head foldable":"group-head foldable open","",[a,it(s),at(e.cpu),ct(e.memory)]);d.tabIndex=0,d.setAttribute("role","button"),d.setAttribute("aria-expanded",String(!m));let g=()=>{if(xe.has(e.id))xe.delete(e.id);else xe.add(e.id);if(xn(),pe)dt(pe)};d.addEventListener("click",g),d.addEventListener("keydown",(_)=>{if(_.key==="Enter"||_.key===" ")_.preventDefault(),g()});let y=(_)=>e.id==="terminals"||e.id==="opencode"&&_.ports.length>0,S=i("div","group","",m?[d]:[d,...e.processes.map((_)=>ao(_,o(_))),...e.jobs.map((_)=>En(_,y(_)))]);return S.style.setProperty("--group-color",le[e.id]),S},_n=(e)=>{let o=e.ports.map((g)=>ir(ge,g)),n=i("div","title-line","",[...o,i("span","pname strong",e.name),i("span","origin",fr[e.group])]),s=e.job?io("Stop",`Stop ${e.job.title}?`,{kind:"job",pid:e.job.pid,name:e.job.name}):void 0,a=i("div","who","",[n]),m=e.job?.title??"";if(m)a.append(i("span","pdetail",m));let d=i("div","row server","",[a,it(s),at(e.cpu),ct(e.memory)]);return d.title=`pid ${e.pid}${e.command?`
${e.command}`:""}`,d},bn=(e,o,n)=>{e.replaceChildren(...o.filter((s)=>s.value>0).map((s)=>{let a=i("span");return a.style.width=`${Math.min(100,s.value/Math.max(1,n)*100)}%`,a.style.background=s.color,a.title=s.label,a}))},Tn={"processes-unavailable":"The process list could not be read just now. OpenChamber's numbers are from the last reading that worked.","ports-unavailable":"Listening ports could not be read, so dev servers are not detected."},xr=(e)=>le[e],Ae=null,nt=!1,gr,Nr=[],pe=null,st=()=>{let e=Ae!==null?nr[Ae]:nt?"Could not stop it. It may have ended already, or it is not something this panel stops.":Nr.join(" ");ve.hidden=e==="",ve.classList.toggle("error",Ae!==null||nt),ve.textContent=e};function yn(){nt=!0,clearTimeout(gr),gr=setTimeout(()=>{nt=!1,st()},6000),st()}var dt=(e)=>{pe=e;let{system:o,app:n}=e;br.textContent=o.hostname,Tr.textContent=[mr(o.platform),o.arch,o.cpuModel,`up ${lr(o.uptimeSeconds)}`].filter(Boolean).join(" · "),ke.textContent=`Live · every ${no} s`,ke.classList.remove("stale"),Te.value.textContent=de(o.cpu),Te.side.textContent=`${o.cores} cores`,Te.sub.textContent=o.load?`Load ${o.load.map((h)=>h.toFixed(2)).join(" · ")}`:"All cores together",Te.chart.update(e.history.system.cpu,100),ye.value.textContent=re(o.memoryUsed),ye.side.textContent=de(o.memoryUsed/Math.max(1,o.memoryTotal)*100),ye.sub.textContent=`of ${re(o.memoryTotal)} · ${re(Math.max(0,o.memoryTotal-o.memoryUsed))} free`,ye.chart.update(e.history.system.memory,o.memoryTotal),Ar.textContent=re(n.memory),kr.textContent=`${de(n.cpu)} CPU`,wr.update(e.history.app.memory,Math.max(n.memory,...e.history.app.memory)*1.15),bn(Or,n.groups.map((h)=>({value:h.memory,color:xr(h.id),label:tt[h.id]})),n.memory),Rr.replaceChildren(...n.groups.map((h)=>{let E=i("span","swatch");return E.style.background=xr(h.id),i("div","legend-row","",[E,i("span","name",tt[h.id],[i("span","muted",` · ${h.count} ${h.count===1?"process":"processes"}`)]),i("span","value num muted",de(h.cpu)),i("span","value num",re(h.memory))])}));let{lmStudio:s}=e,a=Array.isArray(s.models)?s.models.find((h)=>h.id===s.modelName):void 0,m=a?.displayName||s.modelName,d;if(s.modelName)switch(s.state){case"loaded":d=m;break;case"loading":d=`${m} · 載入中 ${et(s.prefillProgress)}`;break;case"unloaded":d=m?`${m} · 卸載`:"卸載";break;case"error":d=m?`${m} · 錯誤`:"錯誤";break;default:d=m}else switch(s.state){case"loaded":d="掛載";break;case"unloaded":d="卸載";break;case"loading":d=`載入中 ${et(s.prefillProgress)}`;break;case"error":d="錯誤";break;default:d="—"}Zt.textContent=d,Zt.className=s.state==="loaded"?"big num lm-state lm-state-loaded lm-state-dim":`big num lm-state lm-state-${s.state}`;let g=[];if(a?.paramsString)g.push(a.paramsString);if(a?.bitsPerWeight)g.push(`${a.bitsPerWeight}bit`);else if(a?.quantization)g.push(a.quantization);if(a?.format)g.push(a.format.toUpperCase());if(typeof a?.sizeBytes==="number"&&a.sizeBytes>0)g.push(`${(a.sizeBytes/1024/1024/1024).toFixed(1)}GB`);let y=a?.loadedContextLength,S=a?.maxContextLength,_="";if(y&&S)_=`Context: ${Math.round(y/1024)}K / ${Math.round(S/1024)}K`;else if(S)_=`Context: ${Math.round(S/1024)}K`;let H=[...g];if(_)H.push(_);if(qt.textContent=H.join(" · "),qt.hidden=H.length===0,s.prefillProgress>0||s.generateTokens>0)eo.textContent=et(s.prefillProgress),to.textContent=s.generateTokens.toLocaleString();else eo.textContent="—",to.textContent="—";if(ot.replaceChildren(),Array.isArray(s.models)&&s.models.length>0){let h=s.models.filter((E)=>E.state==="loaded");if(h.length>0){for(let E of h.slice(0,8)){let B=i("div","lm-model-row"),Z=i("div","lm-model-name");Z.textContent=E.displayName||E.id;let P=[];if(E.paramsString)P.push(E.paramsString);if(E.quantization)P.push(E.bitsPerWeight?`${E.bitsPerWeight}bit`:E.quantization);if(E.format)P.push(E.format.toUpperCase());if(E.arch)P.push(E.arch);if(typeof E.sizeBytes==="number"&&E.sizeBytes>0)P.push(`${(E.sizeBytes/1024/1024/1024).toFixed(1)}GB`);let C=E.capabilities;if(Array.isArray(C)){if(C.includes("vision"))P.push("VISION");if(C.includes("tool_use")||C.includes("function_calling"))P.push("TOOL");if(C.includes("reasoning"))P.push("REASON")}else if(C&&typeof C==="object"){if(C.vision)P.push("VISION");if(C.function_calling||C.tool_use)P.push("TOOL");if(C.reasoning)P.push("REASON")}let ee=i("div","lm-model-meta");ee.textContent=P.join(" · ");let A=i("div","lm-model-right"),v=i("span",`lm-pill lm-pill-${E.state}`);v.textContent=E.state==="loaded"?"載入":E.state==="loading"?"載入中":"未載入";let c=i("span","lm-pill lm-pill-ctx"),l=E.loadedContextLength??E.maxContextLength;if(c.textContent=l?`${Math.round(l/1024)}K`:"—",A.append(v,c),Array.isArray(E.loadedInstances)&&E.loadedInstances.length>1){let j=i("span","lm-pill lm-pill-ctx");j.textContent=`x${E.loadedInstances.length}`,A.append(j)}let D=i("div","lm-model-info");D.append(Z,ee),B.append(D,A),ot.append(B)}if(h.length>8){let E=i("div","lm-more");E.textContent=`+${h.length-8} 個已載入模型`,ot.append(E)}}}Cr.textContent=e.servers.length>0?String(e.servers.length):"",oo.replaceChildren(...e.servers.map(_n)),oo.hidden=e.servers.length===0,Lr.hidden=e.servers.length>0;let L=(h)=>h.pid===n.rootPid?"root":h.label==="Resource Monitor"&&h.ppid===n.rootPid?"self":"other";Ir.replaceChildren(...n.groups.map((h)=>Sn(h,L)));let Q=new Set(n.groups.flatMap((h)=>h.jobs.map((E)=>E.pid)));for(let h of Ee)if(!Q.has(h))Ee.delete(h);so.hidden=e.outside.length===0,Ur.replaceChildren(...e.outside.map((h)=>ao(h,"other"))),Nr=e.warnings.map((h)=>Tn[h]),st()},vn=(e)=>{Ae=e,st(),ke.textContent="Paused",ke.classList.add("stale")},Sr=!1;ge.onReady((e)=>{if(Dt(e,document.documentElement),dr(e.locale),e.features?.deviceStorage===!0&&!rt)rt=!0,gn();if(Sr)return;Sr=!0,{refresh:Mr}=ar(ge,ro,(o)=>{Ae=null,dt(o)},vn)});})();
