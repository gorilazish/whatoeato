(window["webpackJsonpwhat-to-eat"]=window["webpackJsonpwhat-to-eat"]||[]).push([[0],{104:function(e,t,n){},105:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(10),o=n.n(i);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=n(67),l=n(17),u=n(68),m=n.n(u);n(93),n(63);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var d=m()("app:db");l.initializeApp({apiKey:"AIzaSyD99CEVcpATt7i6Jb7YNpnhQ7rhOwlWOto",authDomain:"what-to-eato.firebaseapp.com",databaseURL:"https://what-to-eato.firebaseio.com",projectId:"what-to-eato",storageBucket:"",messagingSenderId:"18156276179",appId:"1:18156276179:web:ace837d492f4f20b7b4726"});var p=l.firestore();p.enablePersistence().catch((function(e){console.error(e)}));var f=function(e){return d("save recipe: %o",e),p.collection("recipes").add(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(n,!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,{updatedAt:l.firestore.Timestamp.fromDate(new Date)}))},h=function(e){return d("delete: %s",e),p.collection("recipes").doc(e).delete()},g=n(13),v=n(75),b=n(147),E=n(23),y=n(30),O=n(20),j=n.n(O),w=n(26),x=n(11),k=a.createContext({user:void 0}),C=function(){return Object(a.useContext)(k).user},S=function(){var e=r.a.useState((function(){var e=l.auth().currentUser;return{initializing:!e,user:e}})),t=Object(x.a)(e,2),n=t[0],a=t[1];function i(e){a({initializing:!1,user:e})}return r.a.useEffect((function(){var e=l.auth().onAuthStateChanged(i);return function(){return e()}}),[]),n},W=function(e,t){try{return l.auth().signInWithEmailAndPassword(e,t)}catch(n){throw console.error(n),n}},P=function(){var e=Object(w.a)(j.a.mark((function e(t,n,a){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.auth().createUserWithEmailAndPassword(n,a);case 3:return e.abrupt("return",l.auth().currentUser.updateProfile({displayName:t}));case 6:throw e.prev=6,e.t0=e.catch(0),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,n,a){return e.apply(this,arguments)}}(),D=function(){return l.auth().signOut()},B=n(144),F=n(134),I=n(148),A=n(138),L=n(139);var z=Object(y.f)((function(e){var t=Object(a.useState)(""),n=Object(x.a)(t,2),i=n[0],o=n[1],c=Object(a.useState)(""),l=Object(x.a)(c,2),u=l[0],m=l[1];function s(){return(s=Object(w.a)(j.a.mark((function t(){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,W(i,u);case 3:e.history.replace("/"),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),alert(t.t0.message);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))).apply(this,arguments)}return r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()&&!1}},r.a.createElement(F.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(I.a,{htmlFor:"email"},"Email Address"),r.a.createElement(A.a,{id:"email",name:"email",autoComplete:"off",autoFocus:!0,value:i,onChange:function(e){return o(e.target.value)}})),r.a.createElement(F.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(I.a,{htmlFor:"password"},"Password"),r.a.createElement(A.a,{name:"password",type:"password",id:"password",autoComplete:"off",value:u,onChange:function(e){return m(e.target.value)}})),r.a.createElement(L.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",onClick:function(){return s.apply(this,arguments)}},"Sign in"),r.a.createElement(L.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",component:E.b,to:"/signup"},"Signup"))}));var N=Object(y.f)((function(e){var t=Object(a.useState)(""),n=Object(x.a)(t,2),i=n[0],o=n[1],c=Object(a.useState)(""),l=Object(x.a)(c,2),u=l[0],m=l[1],s=Object(a.useState)(""),d=Object(x.a)(s,2),p=d[0],f=d[1];function h(){return(h=Object(w.a)(j.a.mark((function t(){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{P(i,u,p),e.history.replace("/")}catch(n){alert(n.message)}case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()&&!1}},r.a.createElement(F.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(I.a,{htmlFor:"name"},"Name"),r.a.createElement(A.a,{id:"name",name:"name",autoComplete:"off",autoFocus:!0,value:i,onChange:function(e){return o(e.target.value)}})),r.a.createElement(F.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(I.a,{htmlFor:"email"},"Email Address"),r.a.createElement(A.a,{id:"email",name:"email",autoComplete:"off",value:u,onChange:function(e){return m(e.target.value)}})),r.a.createElement(F.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(I.a,{htmlFor:"password"},"Password"),r.a.createElement(A.a,{name:"password",type:"password",id:"password",autoComplete:"off",value:p,onChange:function(e){return f(e.target.value)}})),r.a.createElement(L.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",onClick:function(){return h.apply(this,arguments)}},"Signup"),r.a.createElement(L.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",component:E.b,to:"/login"},"Go back to Login"))})),q=n(14),U=n(72),J=n(50),R=n(141),T=n(142),G=n(143),H=n(140),K=n(73),M=n.n(K),Q=function(e){var t=e.children,n=document.getElementById("modal-root");return o.a.createPortal(t,n)};function V(){var e=Object(g.a)(["\n    height: 70vh;\n    width: 80vw;\n    background: white;\n    padding: 5%;\n    overflow: auto;\n"]);return V=function(){return e},e}function Y(){var e=Object(g.a)(["\n    top: 0;\n    left: 0;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: rgba(0,0,0, .5);\n    z-index: 11;\n"]);return Y=function(){return e},e}var $=q.a.div(Y()),X=q.a.div(V()),Z=function(e){var t=e.children;return e.isOpen?r.a.createElement(Q,null,r.a.createElement($,null,r.a.createElement(X,null,t))):null};function _(){var e=Object(g.a)(["\n  height: 100%;\n  padding-top: 56.25%;\n  display: block;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n"]);return _=function(){return e},e}function ee(){var e=Object(g.a)(["\n  width: 80%;\n  margin: 0 auto;\n  background: white;\n  margin-top: -30px;\n  padding: 30px 10px;\n"]);return ee=function(){return e},e}function te(){var e=Object(g.a)(["\n  display: grid;\n"]);return te=function(){return e},e}function ne(){var e=Object(g.a)(["\n  max-width: 345px;\n  width: 100%;\n"]);return ne=function(){return e},e}var ae=q.a.div(ne()),re=q.a.div(te()),ie=q.a.div(ee()),oe=q.a.div(_());function ce(e){var t=e.id,n=e.title,i=(e.author,e.ingredients),o=e.description,c=e.image,l=e.relatedLinks,u=void 0===l?[]:l,m=(e.style,Object(a.useState)(!1)),s=Object(x.a)(m,2),d=s[0],p=s[1],f=function(){p(!d)};return r.a.createElement(ae,null,r.a.createElement(re,null,r.a.createElement("div",null,c&&r.a.createElement(oe,{style:{backgroundImage:"url(".concat(c,")")}})),r.a.createElement(ie,{onClick:f},r.a.createElement(J.a,{variant:"h5",component:"h2"},n),r.a.createElement(J.a,null,o),r.a.createElement(H.a,{"aria-label":"delete",onClick:function(){h(t)}},r.a.createElement(M.a,null)))),r.a.createElement(Z,{isOpen:d},r.a.createElement("button",{onClick:f},"CLOSE"),c&&r.a.createElement(oe,{style:{backgroundImage:"url(".concat(c,")"),height:0,paddingTop:"25%"}}),r.a.createElement(J.a,{variant:"h5",component:"h2"},n),r.a.createElement(R.a,{dense:!0},i&&i.map((function(e){return r.a.createElement(T.a,{key:"".concat(e.name,"+").concat(e.amount)},r.a.createElement(G.a,{primary:e.name,secondary:e.amount}))}))),r.a.createElement(R.a,null,u.length>0&&u.slice(0,3).map((function(e,t){return r.a.createElement("a",{href:e.link,key:t},r.a.createElement(J.a,{color:"textSecondary",gutterBottom:!0},e.title))}))),r.a.createElement(J.a,null,o)))}function le(){var e=Object(g.a)(["\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-gap: 10px;\n  \n  @media (min-width: 640px) {\n    grid-template-columns: 1fr 1fr 1fr;\n    grid-gap: 30px;\n  }\n"]);return le=function(){return e},e}var ue=q.a.div(le());function me(){var e=C(),t=Object(U.a)(p.collection("recipes").where("userId","==",e.uid).orderBy("title","asc"),{idField:"id"}),n=Object(x.a)(t,3),a=n[0];n[1],n[2];console.log(a);var i=a;return r.a.createElement(ue,null,i&&i.length>0&&i.map((function(e,t){return r.a.createElement(ce,Object.assign({key:t,id:e.id,title:e.title},e))})))}var se=n(49),de=n(146),pe=n(106),fe=n(145),he=n(74),ge=n.n(he);var ve=Object(y.f)((function(e){var t=e.history,n=C(),i=Object(a.useState)(""),o=Object(x.a)(i,2),c=o[0],l=o[1],u=Object(a.useState)(""),m=Object(x.a)(u,2),s=m[0],d=m[1],p=Object(a.useState)(""),h=Object(x.a)(p,2),g=h[0],v=h[1],b=Object(a.useState)([{name:"",amount:""}]),E=Object(x.a)(b,2),y=E[0],O=E[1],j=Object(a.useState)(""),w=Object(x.a)(j,2),k=w[0],S=w[1],W=Object(a.useState)(""),P=Object(x.a)(W,2),D=P[0],B=P[1],z=function(e){return function(){""===e.name&&""!==s&&""!==g?function(e){var t=Object(se.a)(y).filter((function(e){return""!==e.name}));O([].concat(Object(se.a)(t),[e,{name:"",amount:""}])),d(""),v("")}({name:s,amount:g}):""!==e.name&&function(e){var t=Object(se.a)(y).filter((function(t){return t.name!==e.name}));O(t)}(e)}};return r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()&&!1}},r.a.createElement(F.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(I.a,{htmlFor:"name"},"Name that stuff"),r.a.createElement(A.a,{id:"title",name:"title",autoComplete:"off",autoFocus:!0,value:c,onChange:function(e){return l(e.target.value)},style:{marginBottom:"50px"}})),r.a.createElement("div",{style:{display:"flex",justifyContent:"center",marginBottom:"100px",flexDirection:"column"}},r.a.createElement(J.a,{component:"h2",variant:"h6",gutterBottom:!0},"Ingredients list"),y.map((function(e,t){return r.a.createElement(de.a,{key:"".concat(e.name,"-").concat(indexedDB),label:r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(pe.a,{value:e.name||s,onChange:function(e){return d(e.target.value)},placeholder:"Name",disabled:!!e.name}),r.a.createElement(pe.a,{value:e.amount||g,onChange:function(e){return v(e.target.value)},placeholder:"Amount",disabled:!!e.amount})),onDelete:z(e),deleteIcon:e.name?void 0:r.a.createElement(ge.a,null),style:{height:"100%",marginBottom:"15px",padding:"5px"}})})),r.a.createElement(F.a,{margin:"normal",fullWidth:!0},r.a.createElement(fe.a,{id:"description",name:"description",label:"Description",multiline:!0,rows:"4",rowsMax:"10",value:k,onChange:function(e){return S(e.target.value)},margin:"normal"})),r.a.createElement(F.a,{margin:"normal",fullWidth:!0},r.a.createElement(I.a,{htmlFor:"name"},"Recipe link"),r.a.createElement(A.a,{id:"recipeLink",name:"recipeLink",autoComplete:"off",autoFocus:!0,value:D,onChange:function(e){return B(e.target.value)},style:{marginBottom:"50px"}}))),r.a.createElement(L.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",onClick:function(e){if(n){var t={title:c,userId:n.uid,author:n.displayName||"",description:k,recipeLink:D,ingredients:y};f(t)}}},"Add"),r.a.createElement(L.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",onClick:t.goBack},"Back"))}));function be(){var e=Object(g.a)(["\n    top: 0;\n    left: 0;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n"]);return be=function(){return e},e}q.a.div(be());var Ee=Object(y.f)((function(e){var t=Object(a.useState)(!1),n=Object(x.a)(t,2),i=n[0],o=n[1];return C()?r.a.createElement(r.a.Fragment,null,r.a.createElement(L.a,{color:"secondary",variant:"contained",onClick:function(){return o(!i)}},"New"),r.a.createElement(Z,{isOpen:i},r.a.createElement("button",{onClick:function(){return o(!1)}},"CLOSE"),r.a.createElement(ve,null)),r.a.createElement(me,null)):r.a.createElement(r.a.Fragment,null,r.a.createElement(L.a,{type:"submit",variant:"contained",color:"secondary",component:E.b,to:"/login"},"Login"),r.a.createElement(L.a,{type:"submit",variant:"contained",color:"secondary",component:E.b,to:"/signup"},"Register"))}));n(103);function ye(){var e=Object(g.a)(["\n  display: grid;\n  grid-template-columns: 200px 1fr 200px;\n  margin: 0 auto;\n  padding: 10px;\n"]);return ye=function(){return e},e}function Oe(){var e=Object(g.a)(["\n  position: fixed;\n  top: 0;\n  height: 60px;\n  width: 100%;\n  border-bottom: 2px solid coral;\n  background: white;\n  z-index: 10;\n"]);return Oe=function(){return e},e}var je=q.a.nav(Oe()),we=q.a.div(ye());function xe(e){var t=e.user;function n(){return(n=Object(w.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D();case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement(je,null,r.a.createElement(we,null,t&&t.displayName?r.a.createElement(J.a,{component:"h1",variant:"h5"},"Hello ",t.displayName):r.a.createElement(J.a,{component:"h1",variant:"h5"},"Welcome"),r.a.createElement("div",null),r.a.createElement("div",null,t&&r.a.createElement(L.a,{type:"submit",variant:"contained",color:"secondary",onClick:function(){return n.apply(this,arguments)}},"Logout"))))}function ke(){var e=Object(g.a)(["\n  margin-top: 60px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px 30px;\n"]);return ke=function(){return e},e}function Ce(){var e=Object(g.a)(["\n  width: auto;\n  margin: 0 5px;\n\n  @media (min-width: 420px) {\n    width: 95vw;\n    margin: 0 auto;\n  }\n"]);return Ce=function(){return e},e}var Se=Object(v.a)(),We=q.a.main(Ce()),Pe=q.a.div(ke());var De=function(e){var t=S(l.auth()),n=t.initializing,a=t.user;return!0!==n?r.a.createElement(We,null,r.a.createElement(Pe,null,r.a.createElement(xe,{user:a}),r.a.createElement(k.Provider,{value:{initializing:n,user:a}},r.a.createElement(b.a,{theme:Se},r.a.createElement(E.a,null,r.a.createElement(y.c,null,r.a.createElement(y.a,{exact:!0,path:"/",component:Ee}),r.a.createElement(y.a,{exact:!0,path:"/login",component:z}),r.a.createElement(y.a,{exact:!0,path:"/signup",component:N}))))))):r.a.createElement("div",{id:"loader"},r.a.createElement(B.a,null))};n(104);o.a.render(r.a.createElement(De,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},81:function(e,t,n){e.exports=n(105)}},[[81,1,2]]]);
//# sourceMappingURL=main.6ade8aec.chunk.js.map