import{S as he,i as pe,s as _e,e as d,c as h,a as m,d as u,G as F,b as f,f as x,L as P,t as me,g as ge,H as p,v as G,j as A,w as O,l as M,x as S,R as Ie,O as ve,p as I,n as E,A as q,V as W,u as Ee,P as Ve,Z as L,m as De,a6 as Ae,o as Me,Q as be}from"../../chunks/vendor-6d69bdcb.js";import{i as v}from"../../chunks/data-1909edb0.js";import{N as Ne,b as X,t as ee,p as Pe}from"../../chunks/Nav-54247100.js";import{P as Ge}from"../../chunks/Player-f7c97560.js";import"../../chunks/singletons-a42a5e91.js";function Oe(o){let l,e;return{c(){l=d("iframe"),this.h()},l(t){l=h(t,"IFRAME",{src:!0,class:!0,title:!0,frameborder:!0}),m(l).forEach(u),this.h()},h(){F(l.src,e="https://www.youtube.com/embed/"+o[0])||f(l,"src",e),f(l,"class","w-full aspect-video"),f(l,"title","youtube video"),f(l,"frameborder","0")},m(t,r){x(t,l,r)},p(t,[r]){r&1&&!F(l.src,e="https://www.youtube.com/embed/"+t[0])&&f(l,"src",e)},i:P,o:P,d(t){t&&u(l)}}}function Se(o,l,e){let{id:t=""}=l;return o.$$set=r=>{"id"in r&&e(0,t=r.id)},[t]}class qe extends he{constructor(l){super();pe(this,l,Se,Oe,_e,{id:0})}}function $e(o,l,e){const t=o.slice();return t[5]=l[e],t[7]=e,t}function xe(o,l,e){const t=o.slice();return t[8]=l[e],t[7]=e,t}function we(o,l){let e,t=l[8]+"",r;return{key:o,first:null,c(){e=d("span"),r=me(t),this.h()},l(s){e=h(s,"SPAN",{class:!0});var a=m(e);r=ge(a,t),a.forEach(u),this.h()},h(){f(e,"class","mr-1"),this.first=e},m(s,a){x(s,e,a),p(e,r)},p(s,a){l=s},d(s){s&&u(e)}}}function He(o){let l,e=[],t=new Map,r,s=v.projects[o[0]].images;const a=c=>c[7];for(let c=0;c<s.length;c+=1){let n=$e(o,s,c),g=a(n);t.set(g,e[c]=ke(g,n))}return{c(){l=d("div");for(let c=0;c<e.length;c+=1)e[c].c();this.h()},l(c){l=h(c,"DIV",{class:!0});var n=m(l);for(let g=0;g<e.length;g+=1)e[g].l(n);n.forEach(u),this.h()},h(){f(l,"class","px-5 pb-5 lg:py-10 space-y-5 col-span-3 lg:overflow-scroll lg:h-screen lg:max-w-screen-lg lg:mx-auto w-full")},m(c,n){x(c,l,n);for(let g=0;g<e.length;g+=1)e[g].m(l,null);r=!0},p(c,n){n&1&&(s=v.projects[c[0]].images,De(),e=ve(e,n,a,1,c,s,t,l,Ae,ke,null,$e),Me())},i(c){if(!r){for(let n=0;n<s.length;n+=1)I(e[n]);r=!0}},o(c){for(let n=0;n<e.length;n+=1)E(e[n]);r=!1},d(c){c&&u(l);for(let n=0;n<e.length;n+=1)e[n].d()}}}function Re(o){let l,e,t,r;return t=new be({props:{src:v.projects[o[0]].images[0],classes:"w-full"}}),{c(){l=d("div"),e=d("div"),G(t.$$.fragment),this.h()},l(s){l=h(s,"DIV",{class:!0});var a=m(l);e=h(a,"DIV",{class:!0});var c=m(e);O(t.$$.fragment,c),c.forEach(u),a.forEach(u),this.h()},h(){f(e,"class","w-full self-end"),f(l,"class","px-5 pb-16 xl:px-20 2xl:px-32 col-span-3 lg:h-screen flex")},m(s,a){x(s,l,a),p(l,e),S(t,e,null),r=!0},p:P,i(s){r||(I(t.$$.fragment,s),r=!0)},o(s){E(t.$$.fragment,s),r=!1},d(s){s&&u(l),q(t)}}}function Be(o){let l,e,t,r;return t=new Ge({props:{src:v.projects[o[0]].localVideo}}),{c(){l=d("div"),e=d("div"),G(t.$$.fragment),this.h()},l(s){l=h(s,"DIV",{class:!0});var a=m(l);e=h(a,"DIV",{class:!0});var c=m(e);O(t.$$.fragment,c),c.forEach(u),a.forEach(u),this.h()},h(){f(e,"class","w-full self-end"),f(l,"class","px-5 pb-16 xl:px-20 2xl:px-32 col-span-3 lg:h-screen flex")},m(s,a){x(s,l,a),p(l,e),S(t,e,null),r=!0},p:P,i(s){r||(I(t.$$.fragment,s),r=!0)},o(s){E(t.$$.fragment,s),r=!1},d(s){s&&u(l),q(t)}}}function Ce(o){let l,e,t,r;return t=new qe({props:{id:v.projects[o[0]].video}}),{c(){l=d("div"),e=d("div"),G(t.$$.fragment),this.h()},l(s){l=h(s,"DIV",{class:!0});var a=m(l);e=h(a,"DIV",{class:!0});var c=m(e);O(t.$$.fragment,c),c.forEach(u),a.forEach(u),this.h()},h(){f(e,"class","w-full self-end aspect-video"),f(l,"class","px-5 pb-16 xl:px-20 2xl:px-32 col-span-3 lg:h-screen flex")},m(s,a){x(s,l,a),p(l,e),S(t,e,null),r=!0},p:P,i(s){r||(I(t.$$.fragment,s),r=!0)},o(s){E(t.$$.fragment,s),r=!1},d(s){s&&u(l),q(t)}}}function ke(o,l){let e,t,r,s;return t=new be({props:{src:l[5],classes:"w-full"}}),{key:o,first:null,c(){e=d("div"),G(t.$$.fragment),r=A(),this.h()},l(a){e=h(a,"DIV",{class:!0});var c=m(e);O(t.$$.fragment,c),r=M(c),c.forEach(u),this.h()},h(){f(e,"class",""),this.first=e},m(a,c){x(a,e,c),S(t,e,null),p(e,r),s=!0},p(a,c){l=a},i(a){s||(I(t.$$.fragment,a),s=!0)},o(a){E(t.$$.fragment,a),s=!1},d(a){a&&u(e),q(t)}}}function Fe(o){let l,e,t,r,s,a,c,n,g,te,Q,k,y,le,U,w,V,se=v.projects[o[0]].title+"",Y,Z,j,b=[],re=new Map,z,N,D,H,J,ae;l=new Ne({});let R=v.projects[o[0]].tagNames;const ce=i=>i[7];for(let i=0;i<R.length;i+=1){let _=xe(o,R,i),$=ce(_);re.set($,b[i]=we($,_))}const ye=[Ce,Be,Re,He],K=[];function je(i,_){return v.projects[i[0]].video?0:v.projects[i[0]].localVideo?1:v.projects[i[0]].images.length==1?2:3}return N=je(o),D=K[N]=ye[N](o),{c(){G(l.$$.fragment),e=A(),t=d("div"),r=d("div"),s=d("div"),a=d("div"),c=d("a"),n=d("div"),g=d("img"),Q=A(),k=d("a"),y=d("img"),U=A(),w=d("div"),V=d("h1"),Y=me(se),Z=A(),j=d("div");for(let i=0;i<b.length;i+=1)b[i].c();z=A(),D.c(),this.h()},l(i){O(l.$$.fragment,i),e=M(i),t=h(i,"DIV",{class:!0});var _=m(t);r=h(_,"DIV",{class:!0});var $=m(r);s=h($,"DIV",{class:!0});var oe=m(s);a=h(oe,"DIV",{class:!0});var B=m(a);c=h(B,"A",{href:!0,rel:!0});var ne=m(c);n=h(ne,"DIV",{class:!0});var ie=m(n);g=h(ie,"IMG",{class:!0,src:!0,alt:!0}),ie.forEach(u),ne.forEach(u),Q=M(B),k=h(B,"A",{href:!0,rel:!0});var fe=m(k);y=h(fe,"IMG",{class:!0,src:!0,alt:!0}),fe.forEach(u),B.forEach(u),oe.forEach(u),U=M($),w=h($,"DIV",{class:!0});var C=m(w);V=h(C,"H1",{class:!0});var ue=m(V);Y=ge(ue,se),ue.forEach(u),Z=M(C),j=h(C,"DIV",{class:!0});var de=m(j);for(let T=0;T<b.length;T+=1)b[T].l(de);de.forEach(u),C.forEach(u),$.forEach(u),z=M(_),D.l(_),_.forEach(u),this.h()},h(){f(g,"class","w-5 h-5"),F(g.src,te="/images/arrow-left.svg")||f(g,"src",te),f(g,"alt",""),f(n,"class","flex space-x-3 items-center cursor-pointer"),f(c,"href","/projects/"+(parseInt(o[0])==0?v.projects.length-1:parseInt(o[0])-1)),f(c,"rel","external"),f(y,"class","w-5 h-5 cursor-pointer"),F(y.src,le="/images/arrow.svg")||f(y,"src",le),f(y,"alt",""),f(k,"href","/projects/"+(parseInt(o[0])+1>=v.projects.length?"0":parseInt(o[0])+1)),f(k,"rel","external"),f(a,"class","lg:mt-5 2xl:px-5 flex justify-between"),f(s,"class","fixed w-screen bottom-10 pr-10 lg:static lg:pr-0 lg:w-full"),f(V,"class","font-bt font-thin text-2xl leading-5"),f(j,"class","flex font-light flex-wrap leading-5 text-sm"),f(w,"class","2xl:px-5"),f(r,"class","mt-10 lg:my-10 p-5 lg:mx-0 col-span-1 lg:flex flex-col justify-between lg:border-r border-black"),f(t,"class","lg:grid grid-cols-4 w-full")},m(i,_){S(l,i,_),x(i,e,_),x(i,t,_),p(t,r),p(r,s),p(s,a),p(a,c),p(c,n),p(n,g),p(a,Q),p(a,k),p(k,y),p(r,U),p(r,w),p(w,V),p(V,Y),p(w,Z),p(w,j);for(let $=0;$<b.length;$+=1)b[$].m(j,null);p(t,z),K[N].m(t,null),H=!0,J||(ae=Ie(t,"click",o[1]),J=!0)},p(i,[_]){_&1&&(R=v.projects[i[0]].tagNames,b=ve(b,_,ce,1,i,R,re,j,Ve,we,null,xe)),D.p(i,_)},i(i){H||(I(l.$$.fragment,i),I(D),H=!0)},o(i){E(l.$$.fragment,i),E(D),H=!1},d(i){q(l,i),i&&u(e),i&&u(t);for(let _=0;_<b.length;_+=1)b[_].d();K[N].d(),J=!1,ae()}}}function Le(o,l,e){let t,r,s;W(o,ee,n=>e(2,t=n)),W(o,X,n=>e(3,r=n)),W(o,Pe,n=>e(4,s=n));let a=s.params.id;return Ee(()=>{L(X,r=!1,r),L(ee,t=!1,t)}),[a,()=>{(t||r)&&(L(X,r=!1,r),L(ee,t=!1,t))}]}class Je extends he{constructor(l){super();pe(this,l,Le,Fe,_e,{})}}export{Je as default};