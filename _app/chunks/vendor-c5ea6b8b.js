function m(){}function ot(t,e){for(const n in e)t[n]=e[n];return t}function H(t){return t()}function G(){return Object.create(null)}function v(t){t.forEach(H)}function J(t){return typeof t=="function"}function st(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function ct(t,e){return t!=t?e==e:t!==e}function ut(t){return Object.keys(t).length===0}function K(t,...e){if(t==null)return m;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Bt(t,e,n){t.$$.on_destroy.push(K(e,n))}function R(t,e,n,o){if(t){const s=U(t,e,n,o);return t[0](s)}}function U(t,e,n,o){return t[1]&&o?ot(n.ctx.slice(),t[1](o(e))):n.ctx}function V(t,e,n,o){if(t[2]&&o){const s=t[2](o(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const u=[],c=Math.max(e.dirty.length,s.length);for(let l=0;l<c;l+=1)u[l]=e.dirty[l]|s[l];return u}return e.dirty|s}return e.dirty}function W(t,e,n,o,s,u){if(s){const c=U(e,n,o,u);t.p(c,s)}}function Q(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let o=0;o<n;o++)e[o]=-1;return e}return-1}function zt(t,e,n){return t.set(n),e}let j=!1;function ft(){j=!0}function at(){j=!1}function _t(t,e,n,o){for(;t<e;){const s=t+(e-t>>1);n(s)<=o?t=s+1:e=s}return t}function dt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const i=[];for(let r=0;r<e.length;r++){const f=e[r];f.claim_order!==void 0&&i.push(f)}e=i}const n=new Int32Array(e.length+1),o=new Int32Array(e.length);n[0]=-1;let s=0;for(let i=0;i<e.length;i++){const r=e[i].claim_order,f=(s>0&&e[n[s]].claim_order<=r?s+1:_t(1,s,_=>e[n[_]].claim_order,r))-1;o[i]=n[f]+1;const a=f+1;n[a]=i,s=Math.max(a,s)}const u=[],c=[];let l=e.length-1;for(let i=n[s]+1;i!=0;i=o[i-1]){for(u.push(e[i-1]);l>=i;l--)c.push(e[l]);l--}for(;l>=0;l--)c.push(e[l]);u.reverse(),c.sort((i,r)=>i.claim_order-r.claim_order);for(let i=0,r=0;i<c.length;i++){for(;r<u.length&&c[i].claim_order>=u[r].claim_order;)r++;const f=r<u.length?u[r]:null;t.insertBefore(c[i],f)}}function b(t,e){if(j){for(dt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function B(t,e,n){j&&!n?b(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function p(t){t.parentNode.removeChild(t)}function x(t){return document.createElement(t)}function w(t){return document.createTextNode(t)}function X(){return w(" ")}function Y(){return w("")}function Ft(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function h(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function E(t){return Array.from(t.childNodes)}function ht(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Z(t,e,n,o,s=!1){ht(t);const u=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const l=t[c];if(e(l)){const i=n(l);return i===void 0?t.splice(c,1):t[c]=i,s||(t.claim_info.last_index=c),l}}for(let c=t.claim_info.last_index-1;c>=0;c--){const l=t[c];if(e(l)){const i=n(l);return i===void 0?t.splice(c,1):t[c]=i,s?i===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,l}}return o()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function mt(t,e,n,o){return Z(t,s=>s.nodeName===e,s=>{const u=[];for(let c=0;c<s.attributes.length;c++){const l=s.attributes[c];n[l.name]||u.push(l.name)}u.forEach(c=>s.removeAttribute(c))},()=>o(e))}function C(t,e,n){return mt(t,e,n,x)}function z(t,e){return Z(t,n=>n.nodeType===3,n=>{const o=""+e;if(n.data.startsWith(o)){if(n.data.length!==o.length)return n.splitText(o.length)}else n.data=o},()=>w(e),!0)}function $(t){return z(t," ")}function tt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function It(t,e,n,o){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,o?"important":"")}function Lt(t,e=document.body){return Array.from(e.querySelectorAll(t))}let A;function N(t){A=t}function F(){if(!A)throw new Error("Function called outside component initialization");return A}function Dt(t){F().$$.on_mount.push(t)}function Ht(t){F().$$.after_update.push(t)}function Gt(t,e){F().$$.context.set(t,e)}const S=[],et=[],M=[],nt=[],pt=Promise.resolve();let I=!1;function bt(){I||(I=!0,pt.then(it))}function L(t){M.push(t)}const D=new Set;let P=0;function it(){const t=A;do{for(;P<S.length;){const e=S[P];P++,N(e),yt(e.$$)}for(N(null),S.length=0,P=0;et.length;)et.pop()();for(let e=0;e<M.length;e+=1){const n=M[e];D.has(n)||(D.add(n),n())}M.length=0}while(S.length);for(;nt.length;)nt.pop()();I=!1,D.clear(),N(t)}function yt(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(L)}}const O=new Set;let y;function gt(){y={r:0,c:[],p:y}}function vt(){y.r||v(y.c),y=y.p}function q(t,e){t&&t.i&&(O.delete(t),t.i(e))}function T(t,e,n,o){if(t&&t.o){if(O.has(t))return;O.add(t),y.c.push(()=>{O.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}function Jt(t,e){const n={},o={},s={$$scope:1};let u=t.length;for(;u--;){const c=t[u],l=e[u];if(l){for(const i in c)i in l||(o[i]=1);for(const i in l)s[i]||(n[i]=l[i],s[i]=1);t[u]=l}else for(const i in c)s[i]=1}for(const c in o)c in n||(n[c]=void 0);return n}function Kt(t){return typeof t=="object"&&t!==null?t:{}}function Rt(t){t&&t.c()}function Ut(t,e){t&&t.l(e)}function kt(t,e,n,o){const{fragment:s,on_mount:u,on_destroy:c,after_update:l}=t.$$;s&&s.m(e,n),o||L(()=>{const i=u.map(H).filter(J);c?c.push(...i):v(i),t.$$.on_mount=[]}),l.forEach(L)}function xt(t,e){const n=t.$$;n.fragment!==null&&(v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function wt(t,e){t.$$.dirty[0]===-1&&(S.push(t),bt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Et(t,e,n,o,s,u,c,l=[-1]){const i=A;N(t);const r=t.$$={fragment:null,ctx:null,props:u,update:m,not_equal:s,bound:G(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(i?i.$$.context:[])),callbacks:G(),dirty:l,skip_bound:!1,root:e.target||i.$$.root};c&&c(r.root);let f=!1;if(r.ctx=n?n(t,e.props||{},(a,_,...d)=>{const g=d.length?d[0]:_;return r.ctx&&s(r.ctx[a],r.ctx[a]=g)&&(!r.skip_bound&&r.bound[a]&&r.bound[a](g),f&&wt(t,a)),_}):[],r.update(),f=!0,v(r.before_update),r.fragment=o?o(r.ctx):!1,e.target){if(e.hydrate){ft();const a=E(e.target);r.fragment&&r.fragment.l(a),a.forEach(p)}else r.fragment&&r.fragment.c();e.intro&&q(t.$$.fragment),kt(t,e.target,e.anchor,e.customElement),at(),it()}N(i)}class At{$destroy(){xt(this,1),this.$destroy=m}$on(e,n){const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const s=o.indexOf(n);s!==-1&&o.splice(s,1)}}$set(e){this.$$set&&!ut(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const k=[];function Nt(t,e){return{subscribe:St(t,e).subscribe}}function St(t,e=m){let n;const o=new Set;function s(l){if(st(t,l)&&(t=l,n)){const i=!k.length;for(const r of o)r[1](),k.push(r,t);if(i){for(let r=0;r<k.length;r+=2)k[r][0](k[r+1]);k.length=0}}}function u(l){s(l(t))}function c(l,i=m){const r=[l,i];return o.add(r),o.size===1&&(n=e(s)||m),l(t),()=>{o.delete(r),o.size===0&&(n(),n=null)}}return{set:s,update:u,subscribe:c}}function Vt(t,e,n){const o=!Array.isArray(t),s=o?[t]:t,u=e.length<2;return Nt(n,c=>{let l=!1;const i=[];let r=0,f=m;const a=()=>{if(r)return;f();const d=e(o?i[0]:i,c);u?c(d):f=J(d)?d:m},_=s.map((d,g)=>K(d,lt=>{i[g]=lt,r&=~(1<<g),l&&a()},()=>{r|=1<<g}));return l=!0,a(),function(){v(_),f()}})}const qt="\u2728",jt="\u{1F449}",Ct="\u270B",rt={inform:{color:"var(--text_color_light)",icon:qt},help:{color:"var(--help_color)",icon:jt},error:{color:"var(--error_color)",icon:Ct}};function Mt(t){let e,n,o,s,u;const c=t[8].default,l=R(c,t,t[7],null);return{c(){e=x("div"),n=x("span"),o=w(t[2]),s=X(),l&&l.c(),this.h()},l(i){e=C(i,"DIV",{class:!0,style:!0});var r=E(e);n=C(r,"SPAN",{class:!0});var f=E(n);o=z(f,t[2]),f.forEach(p),s=$(r),l&&l.l(r),r.forEach(p),this.h()},h(){h(n,"class","icon svelte-q9utf0"),h(e,"class","message panel-inset svelte-q9utf0"),h(e,"style",t[1])},m(i,r){B(i,e,r),b(e,n),b(n,o),b(e,s),l&&l.m(e,null),u=!0},p(i,r){(!u||r&4)&&tt(o,i[2]),l&&l.p&&(!u||r&128)&&W(l,c,i,i[7],u?V(c,i[7],r,null):Q(i[7]),null),(!u||r&2)&&h(e,"style",i[1])},i(i){u||(q(l,i),u=!0)},o(i){T(l,i),u=!1},d(i){i&&p(e),l&&l.d(i)}}}function Pt(t){let e,n,o,s,u;const c=t[8].default,l=R(c,t,t[7],null);return{c(){e=x("button"),n=x("span"),o=w(t[2]),s=X(),l&&l.c(),this.h()},l(i){e=C(i,"BUTTON",{class:!0,type:!0,style:!0});var r=E(e);n=C(r,"SPAN",{class:!0});var f=E(n);o=z(f,t[2]),f.forEach(p),s=$(r),l&&l.l(r),r.forEach(p),this.h()},h(){h(n,"class","icon svelte-q9utf0"),h(e,"class","message svelte-q9utf0"),h(e,"type","button"),h(e,"style",t[1])},m(i,r){B(i,e,r),b(e,n),b(n,o),b(e,s),l&&l.m(e,null),u=!0},p(i,r){(!u||r&4)&&tt(o,i[2]),l&&l.p&&(!u||r&128)&&W(l,c,i,i[7],u?V(c,i[7],r,null):Q(i[7]),null),(!u||r&2)&&h(e,"style",i[1])},i(i){u||(q(l,i),u=!0)},o(i){T(l,i),u=!1},d(i){i&&p(e),l&&l.d(i)}}}function Ot(t){let e,n,o,s;const u=[Pt,Mt],c=[];function l(i,r){return i[0]?0:1}return e=l(t),n=c[e]=u[e](t),{c(){n.c(),o=Y()},l(i){n.l(i),o=Y()},m(i,r){c[e].m(i,r),B(i,o,r),s=!0},p(i,[r]){let f=e;e=l(i),e===f?c[e].p(i,r):(gt(),T(c[f],1,1,()=>{c[f]=null}),vt(),n=c[e],n?n.p(i,r):(n=c[e]=u[e](i),n.c()),q(n,1),n.m(o.parentNode,o))},i(i){s||(q(n),s=!0)},o(i){T(n),s=!1},d(i){c[e].d(i),i&&p(o)}}}function Tt(t,e,n){let o,s,u,{$$slots:c={},$$scope:l}=e,{status:i="inform"}=e,{icon:r=void 0}=e,{color:f=void 0}=e,{button:a=void 0}=e;return t.$$set=_=>{"status"in _&&n(3,i=_.status),"icon"in _&&n(4,r=_.icon),"color"in _&&n(5,f=_.color),"button"in _&&n(0,a=_.button),"$$scope"in _&&n(7,l=_.$$scope)},t.$$.update=()=>{t.$$.dirty&24&&n(2,o=r===void 0?rt[i].icon:r),t.$$.dirty&40&&n(6,s=f===void 0?rt[i].color:f),t.$$.dirty&64&&n(1,u=s?`--color: ${s}`:void 0)},[a,u,o,i,r,f,s,l,c]}class Wt extends At{constructor(e){super();Et(this,e,Tt,Ot,ct,{status:3,icon:4,color:5,button:0})}}export{Dt as A,ot as B,St as C,R as D,Lt as E,b as F,W as G,Q as H,V as I,m as J,It as K,Ft as L,Wt as M,Bt as N,Vt as O,zt as P,At as S,E as a,h as b,C as c,p as d,x as e,B as f,z as g,Rt as h,Et as i,X as j,Y as k,Ut as l,$ as m,ct as n,kt as o,Jt as p,Kt as q,gt as r,tt as s,w as t,T as u,xt as v,vt as w,q as x,Gt as y,Ht as z};
