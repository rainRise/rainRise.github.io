import{o as Ga,a as Za,i as Ja,b as M,s as V,e as Ye}from"./lifecycle.FmKRuIzQ.js";import{ag as Qa,ac as tr,aU as er,aV as ar,i as rr,u as ir,aW as nr,aX as Xe,aY as lr,q as sr,aZ as Et,a_ as Ke,j as Ge,d as st,w as c,f as it,t as St,g as t,a as U,p as or,b as cr,a$ as Ue,h as s,m as F,s as u,ay as Ft,e as n,r as i,y as ur,c as bt}from"./utils.DKT8dRW6.js";import{a as dr,s as tt}from"./render.DYxv9a2C.js";import{i as B}from"./if.CXLQz50p.js";import{e as vr,i as fr}from"./each.CgcUfKvb.js";import{b as ue}from"./this.gftkhbSK.js";import{s as He}from"./event-modifiers.gvea_hMH.js";import{I as m}from"./Icon.CiPbvH3Z.js";import{m as qt}from"./config.PRyYQczh.js";import{I}from"./zh_TW.DVmOe1ig.js";import{i as z}from"./translation.5R9NofpW.js";import"./props.DuKyjVO1.js";const mr=()=>performance.now(),et={tick:o=>requestAnimationFrame(o),now:()=>mr(),tasks:new Set};function Ze(){const o=et.now();et.tasks.forEach(r=>{r.c(o)||(et.tasks.delete(r),r.f())}),et.tasks.size!==0&&et.tick(Ze)}function pr(o){let r;return et.tasks.size===0&&et.tick(Ze),{promise:new Promise(_=>{et.tasks.add(r={c:o,f:_})}),abort(){et.tasks.delete(r)}}}function Yt(o,r){Xe(()=>{o.dispatchEvent(new CustomEvent(r))})}function br(o){if(o==="float")return"cssFloat";if(o==="offset")return"cssOffset";if(o.startsWith("--"))return o;const r=o.split("-");return r.length===1?r[0]:r[0]+r.slice(1).map(_=>_[0].toUpperCase()+_.slice(1)).join("")}function Oe(o){const r={},_=o.split(";");for(const y of _){const[w,T]=y.split(":");if(!w||T===void 0)break;const v=br(w.trim());r[v]=T.trim()}return r}const hr=o=>o;function gr(o,r,_,y){var w=(o&nr)!==0,T="both",v,E=r.inert,$=r.style.overflow,h,x;function j(){return Xe(()=>v??=_()(r,y?.()??{},{direction:T}))}var R={is_global:w,in(){r.inert=E,Yt(r,"introstart"),h=de(r,j(),x,1,()=>{Yt(r,"introend"),h?.abort(),h=v=void 0,r.style.overflow=$})},out(S){r.inert=!0,Yt(r,"outrostart"),x=de(r,j(),h,0,()=>{Yt(r,"outroend"),S?.()})},stop:()=>{h?.abort(),x?.abort()}},q=Qa;if((q.nodes.t??=[]).push(R),dr){var f=w;if(!f){for(var d=q.parent;d&&(d.f&tr)!==0;)for(;(d=d.parent)&&(d.f&er)===0;);f=!d||(d.f&ar)!==0}f&&rr(()=>{ir(()=>R.in())})}}function de(o,r,_,y,w){var T=y===1;if(lr(r)){var v,E=!1;return sr(()=>{if(!E){var S=r({direction:T?"in":"out"});v=de(o,S,_,y,w)}}),{abort:()=>{E=!0,v?.abort()},deactivate:()=>v.deactivate(),reset:()=>v.reset(),t:()=>v.t()}}if(_?.deactivate(),!r?.duration)return w(),{abort:Et,deactivate:Et,reset:Et,t:()=>y};const{delay:$=0,css:h,tick:x,easing:j=hr}=r;var R=[];if(T&&_===void 0&&(x&&x(0,1),h)){var q=Oe(h(0,1));R.push(q,q)}var f=()=>1-y,d=o.animate(R,{duration:$,fill:"forwards"});return d.onfinish=()=>{d.cancel();var S=_?.t()??1-y;_?.abort();var D=y-S,G=r.duration*Math.abs(D),N=[];if(G>0){var k=!1;if(h)for(var C=Math.ceil(G/16.666666666666668),p=0;p<=C;p+=1){var nt=S+D*j(p/C),H=Oe(h(nt,1-nt));N.push(H),k||=H.overflow==="hidden"}k&&(o.style.overflow="hidden"),f=()=>{var ot=d.currentTime;return S+D*j(ot/G)},x&&pr(()=>{if(d.playState!=="running")return!1;var ot=f();return x(ot,1-ot),!0})}d=o.animate(N,{duration:G,fill:"forwards"}),d.onfinish=()=>{f=()=>y,x?.(y,1-y),w()}},{abort:()=>{d&&(d.cancel(),d.effect=null,d.onfinish=Et)},deactivate:()=>{w=Et},reset:()=>{y===0&&x?.(1,0)},t:()=>f()}}function yr(o,r,_=r){var y=()=>{_(o.volume)};r()==null&&y(),Ke(o,["volumechange"],y,!1),Ge(()=>{var w=Number(r());w!==o.volume&&!isNaN(w)&&(o.volume=w)})}function xr(o,r,_=r){var y=()=>{_(o.muted)};r()==null&&y(),Ke(o,["volumechange"],y,!1),Ge(()=>{var w=!!r();o.muted!==w&&(o.muted=w)})}function _r(o){const r=o-1;return r*r*r+1}function wr(o,{delay:r=0,duration:_=400,easing:y=_r,axis:w="y"}={}){const T=getComputedStyle(o),v=+T.opacity,E=w==="y"?"height":"width",$=parseFloat(T[E]),h=w==="y"?["top","bottom"]:["left","right"],x=h.map(D=>`${D[0].toUpperCase()}${D.slice(1)}`),j=parseFloat(T[`padding${x[0]}`]),R=parseFloat(T[`padding${x[1]}`]),q=parseFloat(T[`margin${x[0]}`]),f=parseFloat(T[`margin${x[1]}`]),d=parseFloat(T[`border${x[0]}Width`]),S=parseFloat(T[`border${x[1]}Width`]);return{delay:r,duration:_,easing:y,css:D=>`overflow: hidden;opacity: ${Math.min(D*20,1)*v};${E}: ${D*$}px;padding-${h[0]}: ${D*j}px;padding-${h[1]}: ${D*R}px;margin-${h[0]}: ${D*q}px;margin-${h[1]}: ${D*f}px;border-${h[0]}-width: ${D*d}px;border-${h[1]}-width: ${D*S}px;min-${E}: 0`}}var kr=st('<div class="fixed bottom-20 right-4 z-[60] max-w-sm"><div class="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up"><!> <span class="text-sm flex-1"> </span> <button class="text-white/80 hover:text-white transition-colors"><!></button></div></div>'),Pr=st('<div class="flex space-x-0.5"><div class="w-0.5 h-3 bg-white rounded-full animate-pulse"></div> <div class="w-0.5 h-4 bg-white rounded-full animate-pulse" style="animation-delay: 150ms;"></div> <div class="w-0.5 h-2 bg-white rounded-full animate-pulse" style="animation-delay: 300ms;"></div></div>'),Er=st('<span class="text-sm text-[var(--content-meta)]"></span>'),Sr=st('<div role="button" tabindex="0"><div class="w-6 h-6 flex items-center justify-center"><!></div> <div class="w-10 h-10 rounded-lg overflow-hidden bg-[var(--btn-regular-bg)] flex-shrink-0"><img loading="lazy" class="w-full h-full object-cover"/></div> <div class="flex-1 min-w-0"><div> </div> <div> </div></div></div>'),Fr=st('<div class="playlist-panel float-panel fixed bottom-20 right-4 w-80 max-h-96 overflow-hidden z-50"><div class="playlist-header flex items-center justify-between p-4 border-b border-[var(--line-divider)]"><h3 class="text-lg font-semibold text-90"> </h3> <button class="btn-plain w-8 h-8 rounded-lg"><!></button></div> <div class="playlist-content overflow-y-auto max-h-80 hide-scrollbar"></div></div>'),Cr=st(`<!> <div><div role="button" tabindex="0"><!></div> <div><div class="flex items-center gap-3"><div class="cover-container relative w-12 h-12 rounded-full overflow-hidden cursor-pointer" role="button" tabindex="0"><img/> <div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"><!></div></div> <div class="flex-1 min-w-0 cursor-pointer" role="button" tabindex="0"><div class="text-sm font-medium text-90 truncate"> </div> <div class="text-xs text-50 truncate"> </div></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button> <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button></div></div></div> <div><div class="flex items-center gap-4 mb-4"><div class="cover-container relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0"><img/></div> <div class="flex-1 min-w-0"><div class="song-title text-lg font-bold text-90 truncate mb-1"> </div> <div class="song-artist text-sm text-50 truncate"> </div> <div class="text-xs text-30 mt-1"> </div></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button> <button><!></button></div></div> <div class="progress-section mb-4"><div class="progress-bar flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-[var(--primary)] rounded-full transition-all duration-100"></div></div></div> <div class="controls flex items-center justify-center gap-2 mb-4"><button><!></button> <button class="btn-plain w-10 h-10 rounded-lg"><!></button> <button><!></button> <button class="btn-plain w-10 h-10 rounded-lg"><!></button> <button><!></button></div> <div class="bottom-controls flex items-center gap-2"><button class="btn-plain w-8 h-8 rounded-lg"><!></button> <div class="flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer touch-none" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100"><div></div></div> <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button></div></div> <!></div> <style>.orb-player {
	position: relative;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}
.orb-player::before {
	content: '';
	position: absolute;
	inset: -0.125rem;
	background: linear-gradient(45deg, var(--primary), transparent, var(--primary));
	border-radius: 50%;
	z-index: -1;
	opacity: 0;
	transition: opacity 0.3s ease;
}
.orb-player:hover::before {
	opacity: 0.3;
	animation: rotate 2s linear infinite;
}
.orb-player .animate-pulse {
	animation: musicWave 1.5s ease-in-out infinite;
}
@keyframes rotate {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
@keyframes musicWave {
	0%, 100% { transform: scaleY(0.5); }
	50% { transform: scaleY(1); }
}
.music-player.hidden-mode {
	width: 3rem;
	height: 3rem;
}
.music-player {
    max-width: 20rem;
    -webkit-user-select: none;
       -moz-user-select: none;
            user-select: none;
}
.mini-player {
    width: 17.5rem;
    position: absolute;
    bottom: 0;
    right: 0;
    /*left: 0;*/
}
.expanded-player {
    width: 20rem;
    position: absolute;
    bottom: 0;
    right: 0;
}
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
    0%, 100% {
        opacity: 1;
	}
    50% {
        opacity: 0.5;
	}
}
.progress-section div:hover,
.bottom-controls > div:hover {
    transform: scaleY(1.2);
    transition: transform 0.2s ease;
}
@media (max-width: 768px) {
    .music-player {
        max-width: 280px !important;
        /*left: 0.5rem !important;*/
        bottom: 0.5rem !important;
        right: 0.5rem !important;
	}
    .mini-player {
        width: 280px;
    }
    .music-player.expanded {
        width: calc(100vw - 16px);
        max-width: none;
        /*left: 0.5rem !important;*/
        right: 0.5rem !important;
	}
    .playlist-panel {
        width: calc(100vw - 16px) !important;
        /*left: 0.5rem !important;*/
        right: 0.5rem !important;
        max-width: none;
	}
    .controls {
        gap: 8px;
	}
    .controls button {
        width: 36px;
        height: 36px;
	}
    .controls button:nth-child(3) {
        width: 44px;
        height: 44px;
	}
}
@media (max-width: 480px) {
    .music-player {
        max-width: 260px;
	}
    .song-title {
        font-size: 14px;
	}
    .song-artist {
        font-size: 12px;
	}
    .controls {
        gap: 6px;
        margin-bottom: 12px;
	}
    .controls button {
        width: 32px;
        height: 32px;
	}
    .controls button:nth-child(3) {
        width: 40px;
        height: 40px;
	}
    .playlist-item {
        padding: 8px 12px;
	}
    .playlist-item .w-10 {
        width: 32px;
        height: 32px;
	}
}
@keyframes slide-up {
    from {
        transform: translateY(100%);
        opacity: 0;
	}
    to {
        transform: translateY(0);
        opacity: 1;
	}
}
.animate-slide-up {
    animation: slide-up 0.3s ease-out;
}
@media (hover: none) and (pointer: coarse) {
    .music-player button,
    .playlist-item {
        min-height: 44px;
	}
    .progress-section > div,
    .bottom-controls > div:nth-child(2) {
        height: 12px;
	}
}
/* 自定义旋转动画，停止时保持当前位置 */
@keyframes spin-continuous {
    from {
        transform: rotate(0deg);
	}
    to {
        transform: rotate(360deg);
	}
}
.cover-container img {
    animation: spin-continuous 3s linear infinite;
    animation-play-state: paused;
}
.cover-container img.spinning {
    animation-play-state: running;
}
/* 让主题色按钮更有视觉反馈 */
button.bg-\\[var\\(--primary\\)\\] {
    box-shadow: 0 0 0 2px var(--primary);
	border: none;
}</style>`,1),Mr=st('<audio preload="auto"></audio> <!>',1);function Vr(o,r){cr(r,!1);let _=qt.meting_api,y=qt.id,w=qt.server,T=qt.type,v=F(!1),E=F(!1),$=F(!1),h=F(!1),x=F(0),j=F(0),R=F(.7),q=F(!1),f=F(!1),d=F(!1),S=F(0),D=F(""),G=F(!1),N=F({title:"Sample Song",artist:"Sample Artist",cover:"/favicon/favicon.ico",url:"",duration:0}),k=F([]),C=F(0),p=F(),nt=F(),H=F();async function ot(){s(f,!0);const a=_.replace(":server",w).replace(":type",T).replace(":id",y).replace(":auth","").replace(":r",Date.now().toString());try{const g=await fetch(a);if(!g.ok)throw new Error("meting api error");const Z=await g.json();s(k,Z.map(Y=>{let ht=Y.name??Y.title??z(I.unknownSong),It=Y.artist??Y.author??z(I.unknownArtist),W=Y.duration??0;return W>1e4&&(W=Math.floor(W/1e3)),(!Number.isFinite(W)||W<=0)&&(W=0),{id:Y.id,title:ht,artist:It,cover:Y.pic??"",url:Y.url??"",duration:W}})),t(k).length>0&&fe(t(k)[0]),s(f,!1)}catch{Kt(z(I.musicPlayerErrorPlaylist)),s(f,!1)}}function Ut(){!t(p)||!t(N).url||(t(v)?t(p).pause():t(p).play().catch(()=>{}))}function Ct(){s(E,!t(E)),t(E)&&(s(h,!1),s($,!1))}function Mt(){s($,!t($)),t($)&&(s(E,!1),s(h,!1))}function ve(){s(h,!t(h))}function Je(){s(d,!t(d)),t(d)&&s(S,0)}function Qe(){s(S,(t(S)+1)%3),t(S)!==0&&s(d,!1)}function ta(){if(t(k).length<=1)return;const a=t(C)>0?t(C)-1:t(k).length-1;Tt(a)}function Ht(a=!0){if(t(k).length<=1)return;let g;if(t(d))do g=Math.floor(Math.random()*t(k).length);while(g===t(C)&&t(k).length>1);else g=t(C)<t(k).length-1?t(C)+1:0;Tt(g,a)}let Ot=!1;function Tt(a,g=!0){a<0||a>=t(k).length||(Ot=g,s(C,a),fe(t(k)[t(C)]))}function jt(a){return a.startsWith("http://")||a.startsWith("https://")||a.startsWith("/")?a:`/${a}`}function fe(a){a&&a.url!==t(N).url&&(s(N,{...a}),a.url?s(f,!0):s(f,!1))}let Xt=!1;function ea(){if(s(f,!1),t(p)?.duration&&t(p).duration>1&&(s(j,Math.floor(t(p).duration)),t(k)[t(C)]&&Ft(k,t(k)[t(C)].duration=t(j)),Ft(N,t(N).duration=t(j))),Ot||t(v)){const a=t(p).play();a!==void 0&&a.catch(g=>{console.warn("自动播放被拦截，等待用户交互:",g),Xt=!0,s(v,!1)})}}function me(){if(Xt&&t(p)){const a=t(p).play();a!==void 0&&a.then(()=>{Xt=!1}).catch(()=>{})}}function aa(a){if(!t(N).url)return;s(f,!1),Kt(z(I.musicPlayerErrorSong));const g=t(v)||Ot;t(k).length>1?setTimeout(()=>Ht(g),1e3):Kt(z(I.musicPlayerErrorEmpty))}function ra(){}function ia(){t(S)===1?(Ft(p,t(p).currentTime=0),t(p).play().catch(()=>{})):t(S)===2||t(d)?Ht(!0):s(v,!1)}function Kt(a){s(D,a),s(G,!0),setTimeout(()=>{s(G,!1)},3e3)}function na(){s(G,!1)}function la(a){if(!t(p)||!t(nt))return;const g=t(nt).getBoundingClientRect(),Y=(a.clientX-g.left)/g.width*t(j);Ft(p,t(p).currentTime=Y),s(x,Y)}let Dt=F(!1),At=!1,Gt=null,ct=null;function sa(a){t(H)&&(a.preventDefault(),At=!0,t(H).setPointerCapture(a.pointerId),Gt=t(H).getBoundingClientRect(),pe(a.clientX))}function oa(a){At&&(a.preventDefault(),s(Dt,!0),!ct&&(ct=requestAnimationFrame(()=>{pe(a.clientX),ct=null})))}function ca(a){At&&(At=!1,s(Dt,!1),Gt=null,t(H)&&t(H).releasePointerCapture(a.pointerId),ct&&(cancelAnimationFrame(ct),ct=null))}function pe(a){if(!t(p)||!t(H))return;const g=Gt||t(H).getBoundingClientRect(),Z=Math.max(0,Math.min(1,(a-g.left)/g.width));s(R,Z)}function be(){s(q,!t(q))}function he(a){if(!Number.isFinite(a)||a<0)return"0:00";const g=Math.floor(a/60),Z=Math.floor(a%60);return`${g}:${Z.toString().padStart(2,"0")}`}const ge=["click","keydown","touchstart"];Ga(()=>{ge.forEach(a=>{document.addEventListener(a,me,{capture:!0})}),ot()}),Za(()=>{typeof document<"u"&&ge.forEach(a=>{document.removeEventListener(a,me,{capture:!0})})}),Ja();var ye=Mr();c("pointermove",Ue,oa),c("pointerup",Ue,ca);var O=it(ye);ue(O,a=>s(p,a),()=>t(p));var ua=u(O,2);{var da=a=>{var g=Cr(),Z=it(g);{var Y=e=>{var b=kr(),P=n(b),A=n(P);m(A,{icon:"material-symbols:error",class:"text-xl flex-shrink-0"});var L=u(A,2),l=n(L,!0);i(L);var J=u(L,2),mt=n(J);m(mt,{icon:"material-symbols:close",class:"text-lg"}),i(J),i(P),i(b),St(()=>tt(l,t(D))),c("click",J,na),U(e,b)};B(Z,e=>{t(G)&&e(Y)})}var ht=u(Z,2);let It;var W=n(ht);let xe;var va=n(W);{var fa=e=>{m(e,{icon:"eos-icons:loading",class:"text-white text-lg"})},ma=e=>{var b=bt(),P=it(b);{var A=l=>{var J=Pr();U(l,J)},L=l=>{m(l,{icon:"material-symbols:music-note",class:"text-white text-lg"})};B(P,l=>{t(v)?l(A):l(L,!1)},!0)}U(e,b)};B(va,e=>{t(f)?e(fa):e(ma,!1)})}i(W);var zt=u(W,2);let _e;var we=n(zt),ut=n(we),$t=n(ut);let ke;var Pe=u($t,2),pa=n(Pe);{var ba=e=>{m(e,{icon:"eos-icons:loading",class:"text-white text-xl"})},ha=e=>{var b=bt(),P=it(b);{var A=l=>{m(l,{icon:"material-symbols:pause",class:"text-white text-xl"})},L=l=>{m(l,{icon:"material-symbols:play-arrow",class:"text-white text-xl"})};B(P,l=>{t(v)?l(A):l(L,!1)},!0)}U(e,b)};B(pa,e=>{t(f)?e(ba):e(ha,!1)})}i(Pe),i(ut);var dt=u(ut,2),Zt=n(dt),ga=n(Zt,!0);i(Zt);var Ee=u(Zt,2),ya=n(Ee,!0);i(Ee),i(dt);var Se=u(dt,2),gt=n(Se),xa=n(gt);m(xa,{icon:"material-symbols:visibility-off",class:"text-lg"}),i(gt);var Jt=u(gt,2),_a=n(Jt);m(_a,{icon:"material-symbols:expand-less",class:"text-lg"}),i(Jt),i(Se),i(we),i(zt);var Lt=u(zt,2);let Fe;var Qt=n(Lt),te=n(Qt),ee=n(te);let Ce;i(te);var ae=u(te,2),re=n(ae),wa=n(re,!0);i(re);var ie=u(re,2),ka=n(ie,!0);i(ie);var Me=u(ie,2),Pa=n(Me);i(Me),i(ae);var Te=u(ae,2),yt=n(Te),Ea=n(yt);m(Ea,{icon:"material-symbols:visibility-off",class:"text-lg"}),i(yt);var xt=u(yt,2);let je;var Sa=n(xt);m(Sa,{icon:"material-symbols:queue-music",class:"text-lg"}),i(xt),i(Te),i(Qt);var ne=u(Qt,2),lt=n(ne),Fa=n(lt);i(lt),ue(lt,e=>s(nt,e),()=>t(nt)),i(ne);var le=u(ne,2),vt=n(le);let De;var Ca=n(vt);m(Ca,{icon:"material-symbols:shuffle",class:"text-lg"}),i(vt);var _t=u(vt,2),Ma=n(_t);m(Ma,{icon:"material-symbols:skip-previous",class:"text-xl"}),i(_t);var ft=u(_t,2);let Ae;var Ta=n(ft);{var ja=e=>{m(e,{icon:"eos-icons:loading",class:"text-xl"})},Da=e=>{var b=bt(),P=it(b);{var A=l=>{m(l,{icon:"material-symbols:pause",class:"text-xl"})},L=l=>{m(l,{icon:"material-symbols:play-arrow",class:"text-xl"})};B(P,l=>{t(v)?l(A):l(L,!1)},!0)}U(e,b)};B(Ta,e=>{t(f)?e(ja):e(Da,!1)})}i(ft);var wt=u(ft,2),Aa=n(wt);m(Aa,{icon:"material-symbols:skip-next",class:"text-xl"}),i(wt);var Nt=u(wt,2);let Ie;var Ia=n(Nt);{var za=e=>{m(e,{icon:"material-symbols:repeat-one",class:"text-lg"})},$a=e=>{var b=bt(),P=it(b);{var A=l=>{m(l,{icon:"material-symbols:repeat",class:"text-lg"})},L=l=>{m(l,{icon:"material-symbols:repeat",class:"text-lg opacity-50"})};B(P,l=>{t(S)===2?l(A):l(L,!1)},!0)}U(e,b)};B(Ia,e=>{t(S)===1?e(za):e($a,!1)})}i(Nt),i(le);var ze=u(le,2),Rt=n(ze),La=n(Rt);{var Na=e=>{m(e,{icon:"material-symbols:volume-off",class:"text-lg"})},Ra=e=>{var b=bt(),P=it(b);{var A=l=>{m(l,{icon:"material-symbols:volume-down",class:"text-lg"})},L=l=>{m(l,{icon:"material-symbols:volume-up",class:"text-lg"})};B(P,l=>{t(R)<.5?l(A):l(L,!1)},!0)}U(e,b)};B(La,e=>{t(q)||t(R)===0?e(Na):e(Ra,!1)})}i(Rt);var at=u(Rt,2),$e=n(at);let Le;i(at),ue(at,e=>s(H,e),()=>t(H));var Wt=u(at,2),Wa=n(Wt);m(Wa,{icon:"material-symbols:expand-more",class:"text-lg"}),i(Wt),i(ze),i(Lt);var Ba=u(Lt,2);{var Va=e=>{var b=Fr(),P=n(b),A=n(P),L=n(A,!0);i(A);var l=u(A,2),J=n(l);m(J,{icon:"material-symbols:close",class:"text-lg"}),i(l),i(P);var mt=u(P,2);vr(mt,5,()=>t(k),fr,(kt,rt,X)=>{var Q=Sr();let Bt;var Pt=n(Q),se=n(Pt);{var qa=K=>{m(K,{icon:"material-symbols:graphic-eq",class:"text-[var(--primary)] animate-pulse"})},Ya=K=>{var Ve=bt(),Oa=it(Ve);{var Xa=pt=>{m(pt,{icon:"material-symbols:pause",class:"text-[var(--primary)]"})},Ka=pt=>{var qe=Er();qe.textContent=X+1,U(pt,qe)};B(Oa,pt=>{X===t(C)?pt(Xa):pt(Ka,!1)},!0)}U(K,Ve)};B(se,K=>{X===t(C)&&t(v)?K(qa):K(Ya,!1)})}i(Pt);var oe=u(Pt,2),Ne=n(oe);i(oe);var Re=u(oe,2),Vt=n(Re);let We;var Ua=n(Vt,!0);i(Vt);var ce=u(Vt,2);let Be;var Ha=n(ce,!0);i(ce),i(Re),i(Q),St(K=>{Bt=V(Q,1,"playlist-item flex items-center gap-3 p-3 hover:bg-[var(--btn-plain-bg-hover)] cursor-pointer transition-colors",null,Bt,{"bg-[var(--btn-plain-bg)]":X===t(C),"text-[var(--primary)]":X===t(C)}),M(Q,"aria-label",`播放 ${t(rt).title??""} - ${t(rt).artist??""}`),M(Ne,"src",K),M(Ne,"alt",t(rt).title),We=V(Vt,1,"font-medium truncate",null,We,{"text-[var(--primary)]":X===t(C),"text-90":X!==t(C)}),tt(Ua,t(rt).title),Be=V(ce,1,"text-sm text-[var(--content-meta)] truncate",null,Be,{"text-[var(--primary)]":X===t(C)}),tt(Ha,t(rt).artist)},[()=>jt(t(rt).cover)]),c("click",Q,()=>Tt(X)),c("keydown",Q,K=>{(K.key==="Enter"||K.key===" ")&&(K.preventDefault(),Tt(X))}),U(kt,Q)}),i(mt),i(b),St(kt=>tt(L,kt),[()=>z(I.musicPlayerPlaylist)]),c("click",l,ve),gr(3,b,()=>wr,()=>({duration:300,axis:"y"})),U(e,b)};B(Ba,e=>{t(h)&&e(Va)})}i(ht),ur(2),St((e,b,P,A,L,l,J,mt,kt,rt,X,Q,Bt,Pt,se)=>{It=V(ht,1,"music-player fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out",null,It,{expanded:t(E),"hidden-mode":t($)}),xe=V(W,1,"orb-player w-12 h-12 bg-[var(--primary)] rounded-full shadow-lg cursor-pointer transition-all duration-500 ease-in-out flex items-center justify-center hover:scale-110 active:scale-95",null,xe,{"opacity-0":!t($),"scale-0":!t($),"pointer-events-none":!t($)}),M(W,"aria-label",e),_e=V(zt,1,"mini-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-3 transition-all duration-500 ease-in-out",null,_e,{"opacity-0":t(E)||t($),"scale-95":t(E)||t($),"pointer-events-none":t(E)||t($)}),M(ut,"aria-label",b),M($t,"src",P),M($t,"alt",A),ke=V($t,1,"w-full h-full object-cover transition-transform duration-300",null,ke,{spinning:t(v)&&!t(f),"animate-pulse":t(f)}),M(dt,"aria-label",L),tt(ga,t(N).title),tt(ya,t(N).artist),M(gt,"title",l),Fe=V(Lt,1,"expanded-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-4 transition-all duration-500 ease-in-out",null,Fe,{"opacity-0":!t(E),"scale-95":!t(E),"pointer-events-none":!t(E)}),M(ee,"src",J),M(ee,"alt",mt),Ce=V(ee,1,"w-full h-full object-cover transition-transform duration-300",null,Ce,{spinning:t(v)&&!t(f),"animate-pulse":t(f)}),tt(wa,t(N).title),tt(ka,t(N).artist),tt(Pa,`${kt??""} / ${rt??""}`),M(yt,"title",X),je=V(xt,1,"btn-plain w-8 h-8 rounded-lg flex items-center justify-center",null,je,{"text-[var(--primary)]":t(h)}),M(xt,"title",Q),M(lt,"aria-label",Bt),M(lt,"aria-valuenow",t(j)>0?t(x)/t(j)*100:0),Ye(Fa,`width: ${t(j)>0?t(x)/t(j)*100:0}%`),De=V(vt,1,"w-10 h-10 rounded-lg",null,De,{"btn-regular":t(d),"btn-plain":!t(d)}),vt.disabled=t(k).length<=1,_t.disabled=t(k).length<=1,Ae=V(ft,1,"btn-regular w-12 h-12 rounded-full",null,Ae,{"opacity-50":t(f)}),ft.disabled=t(f),wt.disabled=t(k).length<=1,Ie=V(Nt,1,"w-10 h-10 rounded-lg",null,Ie,{"btn-regular":t(S)>0,"btn-plain":t(S)===0}),M(at,"aria-label",Pt),M(at,"aria-valuenow",t(R)*100),Le=V($e,1,"h-full bg-[var(--primary)] rounded-full transition-all",null,Le,{"duration-100":!t(Dt),"duration-0":t(Dt)}),Ye($e,`width: ${t(R)*100}%`),M(Wt,"title",se)},[()=>z(I.musicPlayerShow),()=>t(v)?z(I.musicPlayerPause):z(I.musicPlayerPlay),()=>jt(t(N).cover),()=>z(I.musicPlayerCover),()=>z(I.musicPlayerExpand),()=>z(I.musicPlayerHide),()=>jt(t(N).cover),()=>z(I.musicPlayerCover),()=>he(t(x)),()=>he(t(j)),()=>z(I.musicPlayerHide),()=>z(I.musicPlayerPlaylist),()=>z(I.musicPlayerProgress),()=>z(I.musicPlayerVolume),()=>z(I.musicPlayerCollapse)]),c("click",W,Mt),c("keydown",W,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Mt())}),c("click",ut,Ut),c("keydown",ut,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Ut())}),c("click",dt,Ct),c("keydown",dt,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Ct())}),c("click",gt,He(Mt)),c("click",Jt,He(Ct)),c("click",yt,Mt),c("click",xt,ve),c("click",lt,la),c("keydown",lt,e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();const P=.5*t(j);t(p)&&(Ft(p,t(p).currentTime=P),s(x,P))}}),c("click",vt,Je),c("click",_t,ta),c("click",ft,Ut),c("click",wt,()=>Ht()),c("click",Nt,Qe),c("click",Rt,be),c("pointerdown",at,sa),c("keydown",at,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.key==="Enter"&&be())}),c("click",Wt,Ct),U(a,g)};B(ua,a=>{a(da)})}St(a=>M(O,"src",a),[()=>jt(t(N).url)]),yr(O,()=>t(R),a=>s(R,a)),xr(O,()=>t(q),a=>s(q,a)),c("play",O,()=>s(v,!0)),c("pause",O,()=>s(v,!1)),c("timeupdate",O,()=>s(x,t(p).currentTime)),c("ended",O,ia),c("error",O,aa),c("loadeddata",O,ea),c("loadstart",O,ra),U(o,ye),or()}export{Vr as default};
