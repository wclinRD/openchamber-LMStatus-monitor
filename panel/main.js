(()=>{var b="openchamber.sdk",T=1;var xt=`
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
`;function bo(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let s=new WeakMap;e.addEventListener("scroll",(n)=>{let a=n.target===e?o:n.target;if(!(a instanceof Element))return;if(!a.hasAttribute("data-oc-scrolling"))a.setAttribute("data-oc-scrolling","");let h=s.get(a);if(h!==void 0)clearTimeout(h);s.set(a,setTimeout(()=>{s.delete(a),a.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Fr=`(${bo.toString()})(document);`;var gt=128,St=65536;var Me=128;var Pe=65536;var Ao=/^[a-z][a-z0-9-]{0,39}$/;var To=(e)=>Object(e)===e&&!Array.isArray(e),_t=(e,o)=>Object.keys(e).every((s)=>o.includes(s)),yo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,vo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,ko=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let s of e){if(!To(s)||!Ao.test(s.id)||!yo(s.label))return!1;if(s.disabled!==void 0&&s.disabled!==!0&&s.disabled!==!1)return!1;if(o.has(s.id))return!1;if(o.add(s.id),s.kind==="button"){if(!_t(s,["kind","id","label","disabled"]))return!1;continue}if(s.kind!=="select"||!_t(s,["kind","id","label","value","options","disabled"]))return!1;if(!vo(s.value)||!Array.isArray(s.options)||s.options.length<1||s.options.length>16)return!1;let n=new Set;for(let a of s.options){if(!To(a)||!_t(a,["value","label"])||!vo(a.value)||!yo(a.label)||n.has(a.value))return!1;n.add(a.value)}if(!n.has(s.value))return!1}return!0};var Ge=20000000,Ne=256;var bt=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,wo=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let s=0;s<e.bytes.byteLength;s+=1)if(e.bytes[s]!==o.bytes[s])return!1;return!0};var Oo=/^[A-Za-z0-9_-]{1,80}$/;var Ro=["left","right","top","bottom"];var Co=(e,o=0,s={remaining:16000})=>{if(--s.remaining<0||o>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let a of n)if(!Co(a,o+1,s))return!1;return!0},Tt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((o)=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(Tt);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(Tt)}return String(e)===e||Number.isFinite(e)},yt=(e)=>{try{if(String(e.id)!==e.id||!Oo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Ro.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Co(e.data)||!Tt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Io=["file","directory","other","missing"],At=(e)=>Boolean(e&&"sessionId"in e),kt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Uo=/^[0-9a-f]{7,64}$/i,wt=(e)=>Uo.test(e),$e=500,De=32000,Mo=16000,Po=128,Go=200,No=2000,$o=16000,Do=80,Ho=200,Fo=16000;var Xo=2000;var Ot=20000,He=1024,Fe=2000000;var Xe=64000,Be=8000,Rt=4000;var Ct=90000;var Bo=999,Vo=1e4,Te=500,zo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],jo=["stopped","starting","ready","failed"],Xr=new Set(zo),Ko=(e)=>Xr.has(e),Wo=(e)=>e&&Ko(e)?e:"HOST_REJECTED",me=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(me);if(Object(e)===e)return Object.values(e).every(me);return!1},Jo=(e)=>me(e)&&JSON.stringify(e).length<=Fo,Lo=(e)=>e?.trim().slice(0,Ho)??"",fe=(e)=>{let o=e.id.trim().slice(0,Po),s=e.title.trim().slice(0,Go),n=e.url.trim().slice(0,No),a=e.text?.trim().slice(0,$o),h=e.author?.trim().slice(0,Do),d=e.kind==="pull"?"pull":"issue",g={providerId:e.providerId.trim(),id:o,title:s||o,url:n,kind:d};if(a)g.text=a;if(h)g.author=h;if(d==="pull"){let y=Lo(e.branches?.head),S=Lo(e.branches?.base);if(y&&S)g.branches={head:y,base:S}}if(Jo(e.data))g.data=e.data;return g},Lt=(e)=>{let o=fe(e);if(e.projectId)o.projectId=e.projectId;if(e.navigation)o.navigation=e.navigation;if(e.worktree)o.worktree=e.worktree;return o},It=(e)=>{let o={text:e.text.trim().slice(0,Mo)};if(e.send)o.send=!0;return o},Ut=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Bo,Math.max(0,Math.round(e)))},Mt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Vo,Math.max(0,Math.ceil(e)))};var he=(e)=>e.length>0&&e.length<=He&&!e.includes("\x00")&&!e.includes("\\");var Ve=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Xo)return!1;return!e.split("/").some((s)=>s==="."||s==="..")},Br=new Set(jo),Pt=(e)=>Boolean(e&&"status"in e&&Br.has(String(e.status))&&!("body"in e)),ze=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Gt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Nt=(e)=>Boolean(e&&"written"in e&&e.written===!0),$t=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Vr=new Set(Io),Dt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Vr.has(String(e.kind))&&Number.isFinite(e.size)),Ht=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),zr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),jr=(e)=>Object(e)===e?e:null,vt=(e)=>String(e)===e&&e.length>0,Kr=(e)=>{if(!vt(e.id))return null;if(e.ok===!0){let o={channel:b,v:T,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)o.payload=e.payload;return o}if(e.ok===!1&&vt(e.error))return{channel:b,v:T,type:"result",id:e.id,ok:!1,error:e.error,code:Wo(vt(e.code)?e.code:void 0)};return null},Ft=(e)=>{let o=jr(e);if(!o||o.channel!==b||o.v!==T)return null;if(o.type==="result")return Kr(o);if(!zr.has(String(o.type))||Object(o.payload)!==o.payload)return null;return o};var Yo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Wr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class E extends Error{code;constructor(e,o){super(o);this.name="HostRequestError",this.code=e}}var Qo=()=>Promise.reject(new E("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),je=()=>Promise.reject(new E("BAD_PATH",`File path must be 1 to ${He} characters without NUL or backslash.`)),Ke=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new E("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},x=(e)=>(e.value+=1,`oc-${e.value}`),Xt=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new E("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let s=e.acceptSource??((t)=>t===o.parent),n=e.requestTimeoutMs??Ot,a=new Set,h=new Set,d=new Set,g=new Set,y=new Set,S=new Set,_=new Set,X=new Set,Y=new Set,L=null,q=null,z=new Set,c=new Set,m=null,H=null,G=!1,v=new Map,I=new Map,w=new Map,A=!1,l={value:0},p=null,F=null,W=!1,te=!1,Ce=null,po=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},Q=(t)=>{o.parent.postMessage(t,"*")},N=(t,r)=>{for(let u of t)try{u(r)}catch(f){console.error(f)}},uo=(t)=>{if(!(t instanceof MessageEvent))return;if(!s(t.source))return;let r=Ft(t.data);if(!r)return;if(r.type==="workspace"){let f=I.get(r.payload.subscriptionId);if(f)N([f],r.payload.snapshot);return}if(r.type==="shells"){let f=w.get(r.payload.subscriptionId);if(f)N([f],r.payload.snapshot);return}if(r.type==="ready"){if(p=r.payload,F=po(r.payload.session),N(a,r.payload),N(h,r.payload.directory),N(d,r.payload.session),F)N(g,F);N(y,r.payload.connection),N(S,r.payload.settings),N(_,r.payload.item);return}if(r.type==="directory"){if(p)p={...p,directory:r.payload.directory};N(h,r.payload.directory);return}if(r.type==="session"){if(p)p={...p,session:r.payload.session};if(!r.payload.session)F=null;else if(F?.sessionId!==r.payload.session.id)F=po(r.payload.session);N(d,r.payload.session);return}if(r.type==="session-lifecycle"){F=r.payload,N(g,r.payload);return}if(r.type==="connection"){if(p)p={...p,connection:r.payload.connection};N(y,r.payload.connection);return}if(r.type==="settings"){if(p)p={...p,settings:r.payload.settings};N(S,r.payload.settings);return}if(r.type==="item"){if(p)p={...p,item:r.payload.item};N(_,r.payload.item);return}if(r.type==="status-control-event"){N(X,r.payload);return}if(r.type==="popover-closed"){N(Y,r.payload);return}if(r.type==="action"){let f=(k)=>{if(!A)Q({channel:b,v:T,type:"action-result",id:r.id,payload:k})},O=q;if(!O){f({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>O(r.payload)).then(()=>f({ok:!0}),(k)=>{let P=(k instanceof Error?k.message:String(k)).trim();f({ok:!1,error:(P||"Action failed.").slice(0,Te)})});return}if(r.type==="file-open"){let f=r.payload;if(H&&wo(H,f))return;H=f,N(z,r.payload);return}if(r.type==="file-saved"){N(c,r.payload.version);return}if(r.type==="file-snapshot"){let f=(P)=>{if(!A)Q({channel:b,v:T,type:"file-snapshot-result",id:r.id,payload:P})},O=(P)=>f({error:(P.trim()||"Could not read the edited file.").slice(0,Te)}),k=m;if(!k){O("This extension does not edit files.");return}Promise.resolve().then(()=>k(r.payload.purpose)).then((P)=>{if(bt(P)>Ge){O(`The file is over ${Ge} ${"bytes"in P?"bytes":"characters"}.`);return}if(P.version.length>Ne){O(`The snapshot version is over ${Ne} characters.`);return}f({snapshot:"bytes"in P?{bytes:P.bytes,version:P.version}:{content:P.content,version:P.version}})},(P)=>O(P instanceof Error?P.message:String(P)));return}if(r.type==="resolve"){let f=(k)=>{Q({channel:b,v:T,type:"resolve-result",id:r.id,payload:k})},O=L;if(!O){f({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>O(r.payload)).then((k)=>f({item:k?fe(k):null}),(k)=>{let P=(k instanceof Error?k.message:String(k)).trim();f({error:(P||"Command failed.").slice(0,Te)})});return}let u=v.get(r.id);if(!u)return;if(clearTimeout(u.timer),v.delete(r.id),r.ok){u.resolve(r.payload);return}u.reject(new E(r.code,r.error))};o.addEventListener("message",uo),Q({channel:b,v:T,type:"hello"});let B=(t,r=n)=>{if(A||o.parent===o)return Promise.reject(new E("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((u,f)=>{let O=setTimeout(()=>{v.delete(t.id),f(new E("HOST_TIMEOUT","Host did not answer in time."))},r);v.set(t.id,{resolve:u,reject:f,timer:O}),Q(t)})},U=(t)=>B(t).then(()=>{return}),M={channel:b,v:T},ft=(t)=>{if(!A&&o.parent!==o)Q(t)},mo=()=>ft({...M,type:"file-save"}),fo=(t)=>{if(!Yo(t)||!Wr(t))return;t.preventDefault(),mo()},ho=(t)=>{if(!Yo(t)||t.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;t.preventDefault(),So(p.popover.id,"escape").catch(()=>{return})},Le=()=>{let t=p?.surface==="popover"?p.popover:void 0;if(!t)return;let r=W||te;if(Ce===r)return;Ce=r,_o(t.id,r).catch(()=>{return})},Ie=()=>{if(p?.surface!=="popover"||W)return;W=!0,Le()},Eo=(t)=>{if(p?.surface!=="popover"||t.relatedTarget!==null||!W)return;W=!1,Le()},xo=()=>{if(p?.surface!=="popover"||te)return;te=!0,Le()},go=()=>{if(p?.surface!=="popover"||!te)return;te=!1,Le()},ee=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new E("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},ht=async(t)=>{if(t.kind!=="projects")ee(t.projectId);let r=await B({...M,type:"workspace-read",id:x(l),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new E("HOST_REJECTED","Host did not return workspace data.");return r},Et=async(t,r)=>{if(t.kind!=="projects")ee(t.projectId);let u=x(l);I.set(u,r);try{await U({...M,type:"workspace-subscribe",id:x(l),payload:{subscriptionId:u,query:t}})}catch(f){if(I.delete(u),!A)Q({...M,type:"workspace-unsubscribe",id:x(l),payload:{subscriptionId:u}});throw f}return()=>{if(!I.delete(u)||A)return;Q({...M,type:"workspace-unsubscribe",id:x(l),payload:{subscriptionId:u}})}},Hr=async(t,r)=>{if(t.kind==="session")ee(t.sessionId);if(t.kind==="project")ee(t.projectId);let u=x(l);w.set(u,r);try{await U({...M,type:"shells-subscribe",id:x(l),payload:{subscriptionId:u,scope:t}})}catch(f){if(w.delete(u),!A)Q({...M,type:"shells-unsubscribe",id:x(l),payload:{subscriptionId:u}});throw f}return()=>{if(!w.delete(u)||A)return;Q({...M,type:"shells-unsubscribe",id:x(l),payload:{subscriptionId:u}})}},Ue=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>gt))throw new E("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!me(t.value))throw new E("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>St)throw new E("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&p?.features?.deviceStorage!==!0)throw new E("UNSUPPORTED","This host does not support device storage.");let r=await B({...M,type:"storage",id:x(l),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new E("HOST_REJECTED","Host did not return storage data.");return r},So=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new E("UNSUPPORTED","This host does not support popovers.")):U({...M,type:"popover-close",id:x(l),payload:r?{id:t,reason:r}:{id:t}}),_o=(t,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===t)?Promise.reject(new E("UNSUPPORTED","This host does not support popovers.")):U({...M,type:"popover-anchor",id:x(l),payload:{id:t,active:r}});return o.addEventListener("keydown",ho,!0),o.addEventListener("pointerover",Ie),o.addEventListener("pointermove",Ie),o.addEventListener("pointerout",Eo),o.addEventListener("focus",xo),o.addEventListener("blur",go),{onAction:(t)=>(q=t,()=>{if(q===t)q=null}),listProjects:async()=>{let t=await ht({kind:"projects"});if(t.kind!=="projects")throw new E("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let r=await ht({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new E("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(t)=>{let r=await ht({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new E("HOST_REJECTED","Expected sessions.");return r},onProjects:(t)=>Et({kind:"projects"},(r)=>{if(r.kind==="projects")t(r)}),onWorktrees:(t,r)=>Et({kind:"worktrees",projectId:t},(u)=>{if(u.kind==="worktrees")r(u)}),onSessions:(t,r)=>Et({kind:"sessions",projectId:t},(u)=>{if(u.kind==="sessions")r(u)}),onRunningShells:(t,r)=>Hr(t,r),readShellOutput:async(t,r)=>{ee(t,Me);let u=r?.cursor;if(u!==void 0&&(!Number.isInteger(u)||u<0))throw new E("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let f=r?.tailBytes;if(f!==void 0&&(!Number.isInteger(f)||f<1||f>Pe))throw new E("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Pe}.`);let k=await B({...M,type:"shell-output",id:x(l),payload:{shellId:t,cursor:u,tailBytes:f}});if(!k||typeof k.output!=="string"||!Number.isFinite(k.cursor))throw new E("HOST_REJECTED","Host did not return shell output.");return k},stopShell:async(t)=>{if(ee(t,Me),(await B({...M,type:"shell-stop",id:x(l),payload:{shellId:t}}))?.stopped!==!0)throw new E("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{ee(t),await U({...M,type:"open-session",id:x(l),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let u=Ke(r),f={op:"get",key:t};if(u)f.scope=u;let O=await Ue(f);return O.op==="get"&&O.found?O.value:void 0},set:async(t,r,u)=>{let f=Ke(u),O={op:"set",key:t,value:r};if(f)O.scope=f;await Ue(O)},delete:async(t,r)=>{let u=Ke(r),f={op:"delete",key:t};if(u)f.scope=u;await Ue(f)},keys:async(t)=>{let r=Ke(t),u={op:"keys"};if(r)u.scope=r;let f=await Ue(u);if(f.op!=="keys")throw new E("HOST_REJECTED","Expected storage keys.");return f.keys}},onReady:(t)=>{if(a.add(t),p)t(p);return()=>{a.delete(t)}},onDirectory:(t)=>{if(h.add(t),p)t(p.directory);return()=>{h.delete(t)}},onSession:(t)=>{if(d.add(t),p)t(p.session);return()=>{d.delete(t)}},onSessionLifecycle:(t)=>{if(g.add(t),F)t(F);return()=>{g.delete(t)}},onConnection:(t)=>{if(y.add(t),p)t(p.connection);return()=>{y.delete(t)}},onSettings:(t)=>{if(S.add(t),p)t(p.settings);return()=>{S.delete(t)}},onItem:(t)=>{if(_.add(t),p)t(p.item);return()=>{_.delete(t)}},onStatusControl:(t)=>(X.add(t),()=>{X.delete(t)}),onPopoverClosed:(t)=>(Y.add(t),()=>{Y.delete(t)}),setStatusControls:(t)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new E("UNSUPPORTED","This host does not support status controls."));if(!ko(t))return Promise.reject(new E("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return U({...M,type:"status-controls",id:x(l),payload:{controls:t}})},openPopover:(t)=>{if(p?.features?.popovers!==!0)return Promise.reject(new E("UNSUPPORTED","This host does not support popovers."));if(!yt(t))return Promise.reject(new E("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return U({...M,type:"popover-open",id:x(l),payload:t})},closePopover:So,setPopoverAnchorActive:_o,onResolve:(t)=>(L=t,()=>{if(L===t)L=null}),toast:(t)=>{let r=t.message.trim();if(!r||r.length>$e)return Promise.reject(new E("HOST_REJECTED",`Toast message must contain 1 to ${$e} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>De))return Promise.reject(new E("HOST_REJECTED",`Toast copy text must contain 1 to ${De} characters.`));return U({channel:b,v:T,type:"toast",id:x(l),payload:{...t,message:r}})},openUrl:(t)=>U({channel:b,v:T,type:"open-url",id:x(l),payload:{url:t}}),openCommit:(t)=>wt(t)?U({channel:b,v:T,type:"open-commit",id:x(l),payload:{sha:t}}):Promise.reject(new E("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>U({channel:b,v:T,type:"open-surface",id:x(l),payload:{surfaceId:t}}),writeClipboard:(t)=>U({channel:b,v:T,type:"clipboard-write",id:x(l),payload:{text:t}}),compose:(t)=>U({channel:b,v:T,type:"compose",id:x(l),payload:t}),attach:(t)=>U({channel:b,v:T,type:"attach",id:x(l),payload:fe(t)}),startSession:async(t)=>{if(t.projectId!==void 0)ee(t.projectId);let r=t.worktree;if(r&&r!==!0)if(r.kind==="existing")ee(r.directory);else{if(r.name!==void 0)ee(r.name,200);if(r.baseBranch!==void 0)ee(r.baseBranch,200)}let u=await B({channel:b,v:T,type:"start-session",id:x(l),payload:Lt(t)},e.requestTimeoutMs??180000);if(!At(u))throw new E("HOST_REJECTED","Host did not return a session.");return u},prompt:(t)=>B({channel:b,v:T,type:"prompt",id:x(l),payload:It(t)}).then((r)=>{if(!kt(r))throw new E("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(t)=>U({channel:b,v:T,type:"session-link",id:x(l),payload:fe(t)}),close:()=>U({channel:b,v:T,type:"close",id:x(l)}),oauthStart:()=>U({channel:b,v:T,type:"oauth-start",id:x(l)}),oauthDisconnect:()=>U({channel:b,v:T,type:"oauth-disconnect",id:x(l)}),request:(t)=>(Ve(t.path)?B({channel:b,v:T,type:"request",id:x(l),payload:t}):Qo()).then((r)=>{if(!ze(r))throw new E("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(t)=>(Ve(t.path)?B({channel:b,v:T,type:"service-request",id:x(l),payload:t}):Qo()).then((r)=>{if(!ze(r))throw new E("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>B({channel:b,v:T,type:"service-status",id:x(l)}).then((t)=>{if(!Pt(t))throw new E("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(he(t)?B({channel:b,v:T,type:"file-read",id:x(l),payload:{path:t}}):je()).then((r)=>{if(!Gt(r))throw new E("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>{if(!he(t))return je();if(r.length>Fe)return Promise.reject(new E("FILE_TOO_LARGE",`Content is over ${Fe} characters.`));return B({channel:b,v:T,type:"file-write",id:x(l),payload:{path:t,content:r}}).then((u)=>{if(!Nt(u))throw new E("HOST_REJECTED","Host did not confirm the write.");return u})},listDir:(t)=>(he(t)?B({channel:b,v:T,type:"file-list",id:x(l),payload:{path:t}}):je()).then((r)=>{if(!$t(r))throw new E("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(t)=>(he(t)?B({channel:b,v:T,type:"file-stat",id:x(l),payload:{path:t}}):je()).then((r)=>{if(!Dt(r))throw new E("HOST_REJECTED","Host did not return file status.");return r}),generate:(t)=>{let r=t.prompt.trim(),u=t.system?.trim();if(r.length===0||r.length>Xe)return Promise.reject(new E("HOST_REJECTED",`Prompt must be 1 to ${Xe} characters.`));if(u!==void 0&&(u.length===0||u.length>Be))return Promise.reject(new E("HOST_REJECTED",`System prompt must be 1 to ${Be} characters.`));let f=t.maxOutputTokens===void 0?void 0:Math.min(Rt,Math.max(1,Math.floor(t.maxOutputTokens)));if(f!==void 0&&!Number.isFinite(f))return Promise.reject(new E("HOST_REJECTED","maxOutputTokens must be a number."));let O={prompt:r};if(u!==void 0)O.system=u;if(f!==void 0)O.maxOutputTokens=f;return B({channel:b,v:T,type:"generate",id:x(l),payload:O},e.requestTimeoutMs??Ct).then((k)=>{if(!Ht(k))throw new E("HOST_REJECTED","Host did not return generated text.");return k})},setBadge:(t)=>U({channel:b,v:T,type:"badge",id:x(l),payload:{count:Ut(t)}}),setHeight:(t)=>U({channel:b,v:T,type:"resize",id:x(l),payload:{height:Mt(t)}}),onFileOpen:(t)=>{if(z.add(t),!G)G=!0,o.addEventListener("keydown",fo,!0);if(H)t(H);return()=>{z.delete(t)}},onFileSnapshot:(t)=>(m=t,()=>{if(m===t)m=null}),onFileSaved:(t)=>(c.add(t),()=>{c.delete(t)}),reportFileChange:(t)=>ft({...M,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:mo,reportFileUnsupported:()=>ft({...M,type:"file-unsupported"}),dispose:()=>{for(let t of I.keys())Q({...M,type:"workspace-unsubscribe",id:x(l),payload:{subscriptionId:t}});I.clear();for(let t of w.keys())Q({...M,type:"shells-unsubscribe",id:x(l),payload:{subscriptionId:t}});if(w.clear(),A=!0,L=null,q=null,m=null,z.clear(),c.clear(),G)o.removeEventListener("keydown",fo,!0);o.removeEventListener("message",uo),o.removeEventListener("keydown",ho,!0),o.removeEventListener("pointerover",Ie),o.removeEventListener("pointermove",Ie),o.removeEventListener("pointerout",Eo),o.removeEventListener("focus",xo),o.removeEventListener("blur",go);for(let t of v.values())clearTimeout(t.timer),t.reject(new E("HOST_UNAVAILABLE","Host client was disposed."));v.clear(),a.clear(),h.clear(),d.clear(),g.clear(),y.clear(),S.clear(),_.clear(),X.clear(),Y.clear()}}};var Zo=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var Kn=new Set(Zo);var qo=["none","agent","user"];var Jn=new Set(qo);var Jr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Yr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],er=(e,o)=>{o.style.colorScheme=e.mode;for(let[s,n]of Jr)o.style.setProperty(s,e.tokens[n]);for(let[s,n,a]of Yr){let h=e.tokens[a]??"";o.style.setProperty(s,h),o.style.setProperty(n,h)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size","0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Bt=(e,o)=>{if(er(e.theme,o),o.dataset)o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode};var Qr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},R=(e,o)=>`var(--${e}, var(--oc-${Qr[e]}, ${o}))`,ae=R("surface-background","transparent"),We=R("surface-elevated","transparent"),ye=R("surface-elevated-foreground","inherit"),se=R("surface-foreground","inherit"),C=R("surface-muted-foreground","gray"),Zr=R("surface-muted","transparent"),Z=R("interactive-border","currentColor"),J=R("interactive-hover","transparent"),ce=R("interactive-active","transparent"),Vt=R("interactive-selection","transparent"),zt=R("interactive-selection-foreground","inherit"),rr=R("interactive-focus-ring","currentColor"),oe=R("primary","currentColor"),jt=R("primary-text","inherit"),Kt=R("error-text","inherit"),qr=R("font-sans","inherit"),Wt=R("font-mono","monospace"),nr=R("radius","9px"),Jt=`calc(${nr} - 2px)`,tr=`calc(${nr} - 4px)`,D=(e,o,s="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${s})`,or=`box-shadow: 0 0 0 2px ${rr};`,Je=(e)=>{let o=R(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${R(`${e}-text`,"inherit")}; }`},en=`
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
.oc-sdk { color: ${se}; font-family: ${qr}; }
.oc-sdk :focus-visible { outline: none; ${or} }
.oc-sdk-mono { font-family: ${Wt}; }
.oc-sdk-muted { color: ${C}; }
${Je("success")}${Je("warning")}${Je("error")}${Je("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${oe}; --oc-sdk-tone-text: ${jt}; }

.oc-sdk-btn { border-radius: ${Jt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${tr}; }
.oc-sdk-btn[data-variant="default"] { color: ${jt}; background: ${D(oe,10,ae)}; border-color: ${D(oe,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${D(oe,16,ae)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${D(oe,22,ae)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Zr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="outline"] { background: ${We}; color: ${ye}; border-color: ${Z}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${J}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ce}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${R("status-error","red")}; color: ${Kt}; background: ${D("var(--oc-sdk-tone)",7,ae)}; border-color: ${D("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${D("var(--oc-sdk-tone)",9,ae)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${D("var(--oc-sdk-tone)",11,ae)}; }

.oc-sdk-field-note { color: ${C}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Kt}; }
.oc-sdk-input { border-radius: ${Jt}; background: ${We}; color: ${ye}; box-shadow: inset 0 0 0 1px ${D(Z,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${C}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${rr}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${R("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${R("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Wt}; }

.oc-sdk-search-icon { color: ${C}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${oe}; }
.oc-sdk-search-clear { border-radius: ${tr}; color: ${C}; }
.oc-sdk-search-clear:hover { background: ${J}; color: ${se}; }

.oc-sdk-trigger { border-color: ${Z}; border-radius: ${Jt}; background: ${We}; color: ${ye}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${J}, ${J}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${C}; }
.oc-sdk-trigger-chevron { color: ${C}; }
.oc-sdk-popup { --surface-foreground: ${ye}; border-color: ${D(Z,60)}; border-radius: 12px; background: ${We}; color: ${ye}; box-shadow: 0 8px 24px ${D(se,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${J}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Vt}; color: ${zt}; }
.oc-sdk-option-check { color: ${se}; }
.oc-sdk-option[data-destructive="true"] { color: ${Kt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${D(R("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${C}; }
.oc-sdk-popup-empty { color: ${C}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Z}; border-radius: 4px; color: ${se}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${D(se,60,Z)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Z}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ae}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${oe}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${or} }
.oc-sdk-check-desc { color: ${C}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${D(se,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${C}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${se}; }
.oc-sdk-tab[aria-selected="true"] { color: ${zt}; background: ${Vt}; border-color: ${Z}; }
.oc-sdk-tab-count { color: ${C}; }

.oc-sdk-badge { border-radius: 9999px; background: ${J}; color: ${C}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${D("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${J}; }
.oc-sdk-row[aria-selected="true"] { background: ${Vt}; color: ${zt}; }
.oc-sdk-row-lead { font-family: ${Wt}; color: ${C}; }
.oc-sdk-row-sub { color: ${C}; }
.oc-sdk-row-meta { color: ${C}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${C}; }

.oc-sdk-empty-body { color: ${C}; }

.oc-sdk-spinner { color: ${C}; }
.oc-sdk-spinner-ring { border-color: ${Z}; border-top-color: ${oe}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${D("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${D("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${C}; }

.oc-sdk-separator { color: ${C}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${D(Z,40)}; }

.oc-sdk-progress-label { color: ${C}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Z}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${oe}); }

.oc-sdk-text a { color: ${jt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${D(Z,60)}; }
`,V=`
${xt}
${en}
${sr}`;var sn=0,ie=(e,o)=>{let s=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[n,a]of Object.entries(o))s.setAttribute(n,String(a));return s},Zt=(e)=>{let o=document.createElement("div");o.className="chart",o.style.height=`${e.height}px`;let s=e.height,n=ie("svg",{viewBox:`0 0 300 ${s}`,preserveAspectRatio:"none","aria-hidden":"true"}),a=`fill-${++sn}`,h=ie("defs",{}),d=ie("linearGradient",{id:a,x1:0,x2:0,y1:0,y2:1});d.append(ie("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),ie("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),h.append(d);let g=ie("path",{d:"",class:"chart-grid"}),y=ie("path",{d:"",fill:`url(#${a})`}),S=ie("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});n.append(h,g,y,S);let _=document.createElement("div");_.className="chart-cursor";let X=document.createElement("div");X.className="chart-dot",X.style.background=e.color;let Y=document.createElement("div");Y.className="chart-tip",o.append(n,_,X,Y);let L=[],q=1,z=null,c=null,m=(w,A)=>(e.capacity-A+w)/Math.max(1,e.capacity-1)*300,H=(w)=>s-1-Math.min(w,q)/q*(s-1-2),G=()=>{let w=z===null?void 0:L[z];if(z===null||w===void 0){o.classList.remove("hovering");return}o.classList.add("hovering");let A=o.getBoundingClientRect(),l=m(z,L.length)/300*A.width,p=H(w)/s*A.height;_.style.transform=`translateX(${l}px)`,X.style.transform=`translate(${l}px, ${p}px)`;let F=(L.length-1-z)*e.intervalSeconds;Y.textContent=`${e.format(w)} · ${F===0?"now":`${F} s ago`}`;let W=l>A.width/2;Y.style.left=W?"":`${l+8}px`,Y.style.right=W?`${A.width-l+8}px`:""},v=(w)=>{if(L.length===0)return;let A=o.getBoundingClientRect(),l=(w-A.left)/A.width*(e.capacity-1),p=Math.round(l-(e.capacity-L.length));z=Math.min(L.length-1,Math.max(0,p)),G()};return o.addEventListener("pointermove",(w)=>{c=w.clientX,v(w.clientX)}),o.addEventListener("pointerleave",()=>{c=null,z=null,G()}),{element:o,update:(w,A)=>{if(L=w,q=A>0?A:1,g.setAttribute("d",[0.25,0.5,0.75].map((l)=>`M0 ${s*l} H300`).join(" ")),L.length===0)y.setAttribute("d",""),S.setAttribute("d","");else{let l=L.map((te,Ce)=>`${m(Ce,L.length).toFixed(2)} ${H(te).toFixed(2)}`),p=L.length===1,F=p?`M${m(0,1)-2} ${l[0]?.split(" ")[1]} L${l[0]}`:`M${l.join(" L")}`;S.setAttribute("d",F);let W=p?m(0,1)-2:m(0,L.length);y.setAttribute("d",`${F} L300 ${s} L${W.toFixed(2)} ${s} Z`)}if(c!==null)v(c)}}};var i=(e,o="",s="",n=[])=>{let a=document.createElement(e);if(o)a.className=o;if(s)a.textContent=s;if(n.length>0)a.append(...n);return a};var et=2000,ir={"needs-approval":"Allow the local service for LM Studio monitor in Settings → Extensions.",paused:"LM Studio monitor is paused in Settings → Extensions.","service-failed":"The monitoring service stopped. It restarts on the next refresh.",unreachable:"Could not reach the LM Studio service.","bad-answer":"The monitoring service answered with something unexpected."},ve=(e)=>typeof e==="object"&&e!==null,an=(e)=>ve(e)&&typeof e.at==="number"&&ve(e.system)&&ve(e.app)&&Array.isArray(e.app.groups)&&Array.isArray(e.servers)&&Array.isArray(e.outside)&&ve(e.history)&&ve(e.lmStudio),cn=(e)=>{if(!(e instanceof E))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},ar=async(e,o)=>{try{return(await e.serviceRequest({method:"POST",path:"/stop",body:JSON.stringify(o)})).status===200}catch{return!1}},cr=(e,o)=>{let s=i("button","port",`:${o}`);return s.type="button",s.title=`Open http://localhost:${o}`,s.addEventListener("click",(n)=>{n.stopPropagation(),e.openUrl(`http://localhost:${o}`).catch(()=>{return})}),s},qt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,lr=(e,o,s,n)=>{let a=!1,h=et,d=async()=>{if(a||!qt(o))return;a=!0;try{let S=await e.serviceRequest({method:"GET",path:"/snapshot"}),_;try{_=JSON.parse(S.body)}catch{_=null}if(S.status===200&&an(_)){s(_);let X=_.lmStudio;h=X.prefillProgress>0||X.generateTokens>0?100:et}else n(S.status===200?"bad-answer":"service-failed")}catch(S){n(cn(S))}finally{a=!1,setTimeout(()=>{d()},h)}};d();let g=qt(o),y=()=>{let S=qt(o);if(S&&!g)d();g=S};return document.addEventListener("visibilitychange",y),new ResizeObserver(y).observe(document.documentElement),{refresh:()=>{d()}}};var dr="en",pr=(e)=>{dr=e||"en"},eo=(e,o)=>new Intl.NumberFormat(dr,{minimumFractionDigits:o,maximumFractionDigits:o}).format(e),ne=(e)=>{let o=["B","KB","MB","GB","TB"],s=Math.max(0,e),n=0;while(s>=1024&&n<o.length-1)s/=1024,n+=1;let a=n>=3&&s<100?1:0;return`${eo(s,a)} ${o[n]}`},le=(e)=>{if(e===null)return"–";if(e>0&&e<0.1)return"<0.1%";return`${eo(e,e<10?1:0)}%`},de=(e)=>`${eo(e,1)}%`,ur=(e)=>{let o=Math.floor(e/86400),s=Math.floor(e%86400/3600),n=Math.floor(e%3600/60);if(o>0)return`${o} d ${s} h`;if(s>0)return`${s} h ${n} min`;return`${n} min`},tt=(e,o)=>{let s=o.replace(/^"([^"]+)"/,"$1");if(!e||!/^([A-Za-z]:)?[\\/]/.test(s))return o;let n=-1;while((n=s.indexOf(e,n+1))>=0){if(!/[\\/]/.test(s[n-1]??""))continue;let a=s.slice(n+e.length).replace(/^\.exe/i,"");if(a===""||a.startsWith(" "))return a.trim()}return o},ln={renderer:"Renderer","gpu-process":"GPU",utility:"Utility",zygote:"Zygote"},dn=[[/network/i,"Network service"],[/storage/i,"Storage service"],[/audio/i,"Audio service"],[/video_?capture/i,"Video capture"]],ot=(...e)=>e.filter(Boolean).join(" · "),mr=(e,o)=>{let s=e.ports.map((d)=>`:${d}`).join(" ");if(o==="root")return{title:"Main process",detail:ot(s,tt(e.name,e.command))};if(o==="self")return{title:"Resource Monitor",detail:"this extension"};let n=/--type=([\w-]+)/.exec(e.command)?.[1];if(n&&/\bHelper\b/.test(e.name)){let d=n==="utility"?/--utility-sub-type=([\w.]+)/.exec(e.command)?.[1]??"":"";return{title:dn.find(([y])=>y.test(d))?.[1]??ln[n]??n,detail:ot(s,tt(e.name,e.command))}}let a=e.label||e.name,h=tt(e.name,e.command);return{title:a,detail:ot(s,h===a||h===e.name?"":h)}},fr=(e)=>{let o=tt(e.name,e.command),s=o===e.title||o===e.name||e.command===e.title;return ot(e.ports.map((n)=>`:${n}`).join(" "),e.count>1?`${e.count} processes`:"",s?"":o)},hr=(e)=>{if(e==="darwin")return"macOS";if(e==="win32")return"Windows";if(e==="linux")return"Linux";return e},rt={app:"OpenChamber",opencode:"OpenCode",terminals:"Terminal"},Er={app:"OpenChamber",opencode:"Agent",terminals:"Terminal"},pe={cpu:"var(--oc-info)",memory:"var(--oc-success)",app:"var(--oc-primary)",opencode:"color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))",terminals:"var(--oc-muted)"};var xr=`
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
`,gr=`
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
`;var to=90;var be=Xt(),so=document.querySelector("#root");if(!so)throw Error("Missing #root");var Tr=document.createElement("style");Tr.textContent=xr+gr;document.head.append(Tr);var io=et/1000,we=i("div","banner");we.hidden=!0;var yr=i("div","host-name","This machine"),vr=i("div","host-meta","Reading…"),Re=i("div","live stale","Starting"),Ar=i("div","head");Ar.append(i("div","titles","",[yr,vr]),Re);var kr=(e,o,s)=>{let n=i("span","big num","–"),a=i("span","sub num"),h=i("div","card-top","",[i("span","label",e),i("span","grow"),a]),d=Zt({color:o,height:56,capacity:to,format:s,intervalSeconds:io}),g=i("div","sub num");return{card:i("div","card","",[h,n,d.element,g]),value:n,side:a,sub:g,chart:d}},Ae=kr("CPU",pe.cpu,le),ke=kr("Memory",pe.memory,ne),pn=i("div","grid","",[Ae.card,ke.card]),wr=i("span","big num","–"),Or=i("span","sub num"),Rr=Zt({color:pe.app,height:44,capacity:to,format:ne,intervalSeconds:io}),Cr=i("div","stack"),Lr=i("div","legend"),un=i("div","card","",[i("div","card-top","",[i("span","label","OpenChamber"),i("span","grow"),Or]),wr,i("div","sub","The app, OpenCode, and everything they started"),Rr.element,Cr,Lr]),oo=i("span","big num lm-state","—"),ro=i("div","lm-spec-context"),xe=i("span","sub num"),ge=i("span","sub num"),nt=i("div","lm-detail"),st=i("span","muted"),it=i("div","lm-reqs"),mn=i("div","card","",[i("div","card-top","",[i("span","label","LM Studio"),st,i("span","grow")]),oo,i("div","lm-row","",[i("span","lm-label","Prefill"),xe]),i("div","lm-row","",[i("span","lm-label","Generate"),ge]),it,ro,nt]),fn=()=>i("div","cols","",[i("span"),i("span"),i("span","cell","CPU"),i("span","cell","Memory")]),dt=(e)=>i("span","action","",e?[e]:[]),Ir=i("span","count"),no=i("div","list"),Ur=i("div","empty","No dev servers right now. Servers started by an agent, a project action, or the terminal show up here with their ports."),hn=i("section","section","",[i("div","section-head","",[i("span","label","Dev servers"),Ir]),no,Ur]),Mr=i("div","list"),En=i("section","section","",[i("div","section-head","",[i("span","label","Processes")]),fn(),Mr]),Pr=i("div","list"),ao=i("section","section","",[i("div","section-head","",[i("span","label","OpenCode outside OpenChamber")]),Pr]);ao.hidden=!0;var xn=i("div","footnote","Process CPU counts 100% per core, as Activity Monitor does; the CPU card above is the whole machine. Memory is resident memory: pages a process shares with others count in each of them.");so.append(we,Ar,pn,un,mn,hn,En,ao,xn);var Gr=()=>{return},co=(e,o,s)=>{let n=i("button","stop",e);n.type="button";let a=!1,h,d=()=>{a=!1,n.classList.remove("armed"),n.textContent=e};return n.addEventListener("click",(g)=>{if(g.preventDefault(),g.stopPropagation(),n.disabled)return;if(!a){a=!0,n.classList.add("armed"),n.textContent=o,clearTimeout(h),h=setTimeout(d,4000);return}clearTimeout(h),n.disabled=!0,n.textContent="Stopping…",ar(be,s).then((y)=>{if(!y)An();Gr()})}),n},pt=(e)=>i("span",e!==null&&e>=1?"cell num":"cell num quiet",le(e)),ut=(e)=>i("span","cell num",ne(e)),Nr=(e,o)=>{let s=i("span","title-line","",[i("span","pname",e)]),n=i("div","who","",[s]);if(o)n.append(i("span","pdetail",o));return n},lo=(e,o,s="row")=>{let{title:n,detail:a}=mr(e,o),h=i("div",s,"",[Nr(n,a),dt(),pt(e.cpu),ut(e.memory)]);return h.title=`${e.name} · pid ${e.pid}${e.command?`
${e.command}`:""}`,h},Se=new Set,gn=(e,o)=>{let s=e.members.length>0&&e.count>1,n=s&&Se.has(e.pid),a=fr(e),h=o?co("Stop",`Stop ${e.title}?`,{kind:"job",pid:e.pid,name:e.name}):void 0,d=i("div",s?"row job foldable":"row job","",[Nr(e.title,a),dt(h),pt(e.cpu),ut(e.memory)]);d.title=e.command||e.title,d.classList.toggle("open",n);let g=i("div",n?"job-wrap open":"job-wrap","",[d]);if(s){d.tabIndex=0,d.setAttribute("role","button"),d.setAttribute("aria-expanded",String(n));let y=()=>{if(Se.has(e.pid))Se.delete(e.pid);else Se.add(e.pid);if(ue)mt(ue)};d.addEventListener("click",y),d.addEventListener("keydown",(S)=>{if(S.key==="Enter"||S.key===" ")S.preventDefault(),y()})}if(n){let y=i("div","members","",e.members.map((_)=>lo(_,"other","row member"))),S=e.count-e.members.length;if(S>0)y.append(i("div","more",S===1?"1 more process, idle":`${S} more processes, idle`));g.append(y)}return g},$r="collapsed-groups",_e=new Set,at=!1,Sn=()=>{if(!at)return;be.storage.set($r,[..._e],{scope:"device"}).catch(()=>{return})},_n=async()=>{if(!at)return;try{let e=await be.storage.get($r,{scope:"device"});if(!Array.isArray(e))return;for(let o of e)if(o==="app"||o==="opencode"||o==="terminals")_e.add(o);if(ue)mt(ue)}catch{}},bn=(e,o)=>{let s=i("span","dot");s.style.background=pe[e.id];let n=e.id==="terminals"&&e.jobs.length>0?co("Stop all","Stop everything running in the terminal?",{kind:"terminals"}):void 0,a=i("span","gname","",[s,i("b","",rt[e.id]),i("span","count",String(e.count))]),h=_e.has(e.id),d=i("div",h?"group-head foldable":"group-head foldable open","",[a,dt(n),pt(e.cpu),ut(e.memory)]);d.tabIndex=0,d.setAttribute("role","button"),d.setAttribute("aria-expanded",String(!h));let g=()=>{if(_e.has(e.id))_e.delete(e.id);else _e.add(e.id);if(Sn(),ue)mt(ue)};d.addEventListener("click",g),d.addEventListener("keydown",(_)=>{if(_.key==="Enter"||_.key===" ")_.preventDefault(),g()});let y=(_)=>e.id==="terminals"||e.id==="opencode"&&_.ports.length>0,S=i("div","group","",h?[d]:[d,...e.processes.map((_)=>lo(_,o(_))),...e.jobs.map((_)=>gn(_,y(_)))]);return S.style.setProperty("--group-color",pe[e.id]),S},Tn=(e)=>{let o=e.ports.map((g)=>cr(be,g)),s=i("div","title-line","",[...o,i("span","pname strong",e.name),i("span","origin",Er[e.group])]),n=e.job?co("Stop",`Stop ${e.job.title}?`,{kind:"job",pid:e.job.pid,name:e.job.name}):void 0,a=i("div","who","",[s]),h=e.job?.title??"";if(h)a.append(i("span","pdetail",h));let d=i("div","row server","",[a,dt(n),pt(e.cpu),ut(e.memory)]);return d.title=`pid ${e.pid}${e.command?`
${e.command}`:""}`,d},yn=(e,o,s)=>{e.replaceChildren(...o.filter((n)=>n.value>0).map((n)=>{let a=i("span");return a.style.width=`${Math.min(100,n.value/Math.max(1,s)*100)}%`,a.style.background=n.color,a.title=n.label,a}))},vn={"processes-unavailable":"The process list could not be read just now. OpenChamber's numbers are from the last reading that worked.","ports-unavailable":"Listening ports could not be read, so dev servers are not detected."},Sr=(e)=>pe[e],Oe=null,ct=!1,_r,Dr=[],ue=null,lt=()=>{let e=Oe!==null?ir[Oe]:ct?"Could not stop it. It may have ended already, or it is not something this panel stops.":Dr.join(" ");we.hidden=e==="",we.classList.toggle("error",Oe!==null||ct),we.textContent=e};function An(){ct=!0,clearTimeout(_r),_r=setTimeout(()=>{ct=!1,lt()},6000),lt()}var mt=(e)=>{ue=e;let{system:o,app:s}=e;yr.textContent=o.hostname,vr.textContent=[hr(o.platform),o.arch,o.cpuModel,`up ${ur(o.uptimeSeconds)}`].filter(Boolean).join(" · "),Re.textContent=`Live · every ${io} s`,Re.classList.remove("stale"),Ae.value.textContent=le(o.cpu),Ae.side.textContent=`${o.cores} cores`,Ae.sub.textContent=o.load?`Load ${o.load.map((c)=>c.toFixed(2)).join(" · ")}`:"All cores together",Ae.chart.update(e.history.system.cpu,100),ke.value.textContent=ne(o.memoryUsed),ke.side.textContent=le(o.memoryUsed/Math.max(1,o.memoryTotal)*100),ke.sub.textContent=`of ${ne(o.memoryTotal)} · ${ne(Math.max(0,o.memoryTotal-o.memoryUsed))} free`,ke.chart.update(e.history.system.memory,o.memoryTotal),wr.textContent=ne(s.memory),Or.textContent=`${le(s.cpu)} CPU`,Rr.update(e.history.app.memory,Math.max(s.memory,...e.history.app.memory)*1.15),yn(Cr,s.groups.map((c)=>({value:c.memory,color:Sr(c.id),label:rt[c.id]})),s.memory),Lr.replaceChildren(...s.groups.map((c)=>{let m=i("span","swatch");return m.style.background=Sr(c.id),i("div","legend-row","",[m,i("span","name",rt[c.id],[i("span","muted",` · ${c.count} ${c.count===1?"process":"processes"}`)]),i("span","value num muted",le(c.cpu)),i("span","value num",ne(c.memory))])}));let{lmStudio:n}=e,a=Array.isArray(n.models)?n.models.find((c)=>c.id===n.modelName):void 0,h=a?.displayName||n.modelName,d;if(n.modelName)switch(n.state){case"loaded":d=h;break;case"loading":d=`${h} · 載入中 ${de(n.prefillProgress)}`;break;case"unloaded":d=h?`${h} · 卸載`:"卸載";break;case"error":d=h?`${h} · 錯誤`:"錯誤";break;default:d=h}else switch(n.state){case"loaded":d="掛載";break;case"unloaded":d="卸載";break;case"loading":d=`載入中 ${de(n.prefillProgress)}`;break;case"error":d="錯誤";break;default:d="—"}oo.textContent=d,oo.className=n.state==="loaded"?"big num lm-state lm-state-loaded lm-state-dim":`big num lm-state lm-state-${n.state}`;let g=[];if(a?.paramsString)g.push(a.paramsString);if(a?.bitsPerWeight)g.push(`${a.bitsPerWeight}bit`);else if(a?.quantization)g.push(a.quantization);if(a?.format)g.push(a.format.toUpperCase());if(typeof a?.sizeBytes==="number"&&a.sizeBytes>0)g.push(`${(a.sizeBytes/1024/1024/1024).toFixed(1)}GB`);let y=a?.loadedContextLength,S=a?.maxContextLength,_="";if(y&&S)_=`Context: ${Math.round(y/1024)}K / ${Math.round(S/1024)}K`;else if(S)_=`Context: ${Math.round(S/1024)}K`;let X=[...g];if(_)X.push(_);if(ro.textContent=X.join(" · "),ro.hidden=X.length===0,n.prefillProgress>0||n.generateTokens>0){let m=n.prefillTokensPerSecond;if(m&&m>0)xe.textContent=`${de(100)} · ${m.toFixed(1)} tok/s`;else xe.textContent=de(100);let H=n.tokensPerSecond;if(H&&H>0){let G=n.generateTokens>0?`${n.generateTokens.toLocaleString()} tokens · `:"";ge.textContent=`${G}${H.toFixed(1)} tok/s`}else if(n.generateTokens>0)ge.textContent=`${n.generateTokens.toLocaleString()} tokens`;else ge.textContent="—"}else if(n.prefillProgress>0&&n.prefillProgress<100){let c=n.prefillTokensPerSecond;if(c&&c>0)xe.textContent=`${de(n.prefillProgress)} · ${c.toFixed(1)} tok/s`;else xe.textContent=de(n.prefillProgress);ge.textContent="—"}else xe.textContent="—",ge.textContent="—";if(n.parallel)st.textContent=`${n.activeRequestCount??0}/${n.parallel} slots`;else if(n.activeRequestCount&&n.activeRequestCount>0)st.textContent=`${n.activeRequestCount} active`;else st.textContent="";it.replaceChildren();let L=Array.isArray(n.requests)?n.requests:[];for(let c of L.slice(0,4)){let m=i("div","lm-req-row"),H=i("div","lm-req-name");H.textContent=c.modelDisplayName||c.model||"—";let G=i("div","lm-req-state");if(c.state==="generate"){let v=c.tokensPerSecond;if(v&&v>0){let I=c.generateTokens>0?`${c.generateTokens.toLocaleString()} tokens · `:"";G.textContent=`${I}${v.toFixed(1)} tok/s`}else if(c.generateTokens>0)G.textContent=`${c.generateTokens.toLocaleString()} tokens`;else G.textContent="Generate"}else if(c.state==="prefill"){let v=c.prefillTokensPerSecond;if(v&&v>0)G.textContent=`Prefill ${c.prefillProgress}% · ${v.toFixed(1)} tok/s`;else G.textContent=`Prefill ${c.prefillProgress}%`}else G.textContent="—";m.append(H,G),it.append(m)}if(it.hidden=L.length===0,nt.replaceChildren(),Array.isArray(n.models)&&n.models.length>0){let c=n.models.filter((m)=>m.state==="loaded");if(c.length>0){for(let m of c.slice(0,8)){let H=i("div","lm-model-row"),G=i("div","lm-model-name");G.textContent=m.displayName||m.id;let v=[];if(m.paramsString)v.push(m.paramsString);if(m.quantization)v.push(m.bitsPerWeight?`${m.bitsPerWeight}bit`:m.quantization);if(m.format)v.push(m.format.toUpperCase());if(m.arch)v.push(m.arch);if(typeof m.sizeBytes==="number"&&m.sizeBytes>0)v.push(`${(m.sizeBytes/1024/1024/1024).toFixed(1)}GB`);let I=m.capabilities;if(Array.isArray(I)){if(I.includes("vision"))v.push("VISION");if(I.includes("tool_use")||I.includes("function_calling"))v.push("TOOL");if(I.includes("reasoning"))v.push("REASON")}else if(I&&typeof I==="object"){if(I.vision)v.push("VISION");if(I.function_calling||I.tool_use)v.push("TOOL");if(I.reasoning)v.push("REASON")}let w=i("div","lm-model-meta");w.textContent=v.join(" · ");let A=i("div","lm-model-right"),l=i("span",`lm-pill lm-pill-${m.state}`);l.textContent=m.state==="loaded"?"載入":m.state==="loading"?"載入中":"未載入";let p=i("span","lm-pill lm-pill-ctx"),F=m.loadedContextLength??m.maxContextLength;if(p.textContent=F?`${Math.round(F/1024)}K`:"—",A.append(l,p),Array.isArray(m.loadedInstances)&&m.loadedInstances.length>1){let te=i("span","lm-pill lm-pill-ctx");te.textContent=`x${m.loadedInstances.length}`,A.append(te)}let W=i("div","lm-model-info");W.append(G,w),H.append(W,A),nt.append(H)}if(c.length>8){let m=i("div","lm-more");m.textContent=`+${c.length-8} 個已載入模型`,nt.append(m)}}}Ir.textContent=e.servers.length>0?String(e.servers.length):"",no.replaceChildren(...e.servers.map(Tn)),no.hidden=e.servers.length===0,Ur.hidden=e.servers.length>0;let q=(c)=>c.pid===s.rootPid?"root":c.label==="Resource Monitor"&&c.ppid===s.rootPid?"self":"other";Mr.replaceChildren(...s.groups.map((c)=>bn(c,q)));let z=new Set(s.groups.flatMap((c)=>c.jobs.map((m)=>m.pid)));for(let c of Se)if(!z.has(c))Se.delete(c);ao.hidden=e.outside.length===0,Pr.replaceChildren(...e.outside.map((c)=>lo(c,"other"))),Dr=e.warnings.map((c)=>vn[c]),lt()},kn=(e)=>{Oe=e,lt(),Re.textContent="Paused",Re.classList.add("stale")},br=!1;be.onReady((e)=>{if(Bt(e,document.documentElement),pr(e.locale),e.features?.deviceStorage===!0&&!at)at=!0,_n();if(br)return;br=!0,{refresh:Gr}=lr(be,so,(o)=>{Oe=null,mt(o)},kn)});})();
