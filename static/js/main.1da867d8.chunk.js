(window["webpackJsonpwhat-to-eat"]=window["webpackJsonpwhat-to-eat"]||[]).push([[0],{104:function(e,t,a){e.exports=a(145)},144:function(e,t,a){},145:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(10),c=a.n(o);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=a(49),l=a(16),u=a(82),m=a.n(u);a(116),a(78);function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var p=m()("app:db");l.initializeApp({apiKey:"AIzaSyD99CEVcpATt7i6Jb7YNpnhQ7rhOwlWOto",authDomain:"what-to-eato.firebaseapp.com",databaseURL:"https://what-to-eato.firebaseio.com",projectId:"what-to-eato",storageBucket:"",messagingSenderId:"18156276179",appId:"1:18156276179:web:ace837d492f4f20b7b4726"});var d=l.firestore();d.enablePersistence().catch((function(e){console.error(e)}));var f=function(e){return p("save recipe: %o",e),d.collection("recipes").add(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(a,!0).forEach((function(t){Object(i.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},e,{updatedAt:l.firestore.Timestamp.fromDate(new Date)}))},h=function(e){return p("delete: %s",e),d.collection("recipes").doc(e).delete()},g=a(92),b=a(200),E=a(18),v=a(33),y=a(21),O=a.n(y),w=a(27),j=a(12),x=n.createContext({user:void 0}),k=function(){return Object(n.useContext)(x).user},C=function(){var e=r.a.useState((function(){var e=l.auth().currentUser;return{initializing:!e,user:e}})),t=Object(j.a)(e,2),a=t[0],n=t[1];function o(e){n({initializing:!1,user:e})}return r.a.useEffect((function(){var e=l.auth().onAuthStateChanged(o);return function(){return e()}}),[]),a},S=function(e,t){try{return l.auth().signInWithEmailAndPassword(e,t)}catch(a){throw console.error(a),a}},W=function(){var e=Object(w.a)(O.a.mark((function e(t,a,n){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.auth().createUserWithEmailAndPassword(a,n);case 3:return e.abrupt("return",l.auth().currentUser.updateProfile({displayName:t}));case 6:throw e.prev=6,e.t0=e.catch(0),console.error(e.t0),e.t0;case 10:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,a,n){return e.apply(this,arguments)}}(),D=function(){return l.auth().signOut()},N=a(91),P=a.n(N),B=a(90),F=a.n(B),A=a(149),I=a(199),L=a(60),z=a(201),q=a(202),R=a(185);function T(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",component:E.b,to:"/signup"},"Register"),r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",component:E.b,to:"/login"},"Login"),r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",component:E.b,to:"/dashboard"},"Dashboard"))}var U=a(188),J=a(204),G=a(189);var H=Object(v.f)((function(e){var t=Object(n.useState)(""),a=Object(j.a)(t,2),o=a[0],c=a[1],i=Object(n.useState)(""),l=Object(j.a)(i,2),u=l[0],m=l[1];function s(){return(s=Object(w.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,S(o,u);case 3:e.history.replace("/dashboard"),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),alert(t.t0.message);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))).apply(this,arguments)}return r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()&&!1}},r.a.createElement(U.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(J.a,{htmlFor:"email"},"Email Address"),r.a.createElement(G.a,{id:"email",name:"email",autoComplete:"off",autoFocus:!0,value:o,onChange:function(e){return c(e.target.value)}})),r.a.createElement(U.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(J.a,{htmlFor:"password"},"Password"),r.a.createElement(G.a,{name:"password",type:"password",id:"password",autoComplete:"off",value:u,onChange:function(e){return m(e.target.value)}})),r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",onClick:function(){return s.apply(this,arguments)}},"Sign in"),r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",component:E.b,to:"/signup"},"Signup"))}));var K=Object(v.f)((function(e){var t=Object(n.useState)(""),a=Object(j.a)(t,2),o=a[0],c=a[1],i=Object(n.useState)(""),l=Object(j.a)(i,2),u=l[0],m=l[1],s=Object(n.useState)(""),p=Object(j.a)(s,2),d=p[0],f=p[1];function h(){return(h=Object(w.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{W(o,u,d),e.history.replace("/dashboard")}catch(a){alert(a.message)}case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()&&!1}},r.a.createElement(U.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(J.a,{htmlFor:"name"},"Name"),r.a.createElement(G.a,{id:"name",name:"name",autoComplete:"off",autoFocus:!0,value:o,onChange:function(e){return c(e.target.value)}})),r.a.createElement(U.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(J.a,{htmlFor:"email"},"Email Address"),r.a.createElement(G.a,{id:"email",name:"email",autoComplete:"off",value:u,onChange:function(e){return m(e.target.value)}})),r.a.createElement(U.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(J.a,{htmlFor:"password"},"Password"),r.a.createElement(G.a,{name:"password",type:"password",id:"password",autoComplete:"off",value:d,onChange:function(e){return f(e.target.value)}})),r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",onClick:function(){return h.apply(this,arguments)}},"Signup"),r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",component:E.b,to:"/login"},"Go back to Login"))})),M=a(85),Q=a(86),V=a(190),Y=a(191),$=a(193),X=a(192),Z=a(196),_=a(197),ee=a(198),te=a(195),ae=a(194),ne=a(58),re=a(87),oe=a.n(re),ce=a(88),ie=a.n(ce),le=Object(Q.a)((function(e){return{card:{minWidth:275,maxWidth:345},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12},media:{height:0,paddingTop:"56.25%"},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:ne.a[500]}}}));function ue(e){var t=e.id,a=e.title,o=e.author,c=e.ingredients,i=e.description,l=e.image,u=le(),m=Object(n.useState)(!1),s=Object(j.a)(m,2),p=s[0],d=s[1];return r.a.createElement(V.a,{className:u.card},l&&r.a.createElement(Y.a,{className:u.media,image:l}),r.a.createElement(X.a,null,r.a.createElement(L.a,{className:u.title,color:"textSecondary",gutterBottom:!0},"Receptielis"),r.a.createElement(L.a,{variant:"h5",component:"h2"},a)),r.a.createElement($.a,{disableSpacing:!0},r.a.createElement(ae.a,{className:u.expand,onClick:function(){d(!p)},"aria-expanded":p,"aria-label":"show more"},r.a.createElement(oe.a,null)),r.a.createElement(ae.a,{"aria-label":"delete",onClick:function(){h(t)}},r.a.createElement(ie.a,null))),r.a.createElement(te.a,{in:p,timeout:"auto",unmountOnExit:!0},r.a.createElement(X.a,null,r.a.createElement(L.a,null,o),r.a.createElement(Z.a,{dense:!0},c&&c.map((function(e){return r.a.createElement(_.a,{key:"".concat(e.name,"+").concat(e.amount)},r.a.createElement(ee.a,{primary:e.name,secondary:e.amount}))}))),r.a.createElement(L.a,null,i))))}function me(){var e=k(),t=Object(M.a)(d.collection("recipes").where("userId","==",e.uid).orderBy("title","asc"),{idField:"id"}),a=Object(j.a)(t,3),n=a[0];a[1],a[2];console.log(n);var o=n;return r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},o&&o.length>0&&o.map((function(e,t){return r.a.createElement(ue,Object.assign({key:t,id:e.id,title:e.title},e))})))}var se=Object(v.f)((function(e){if(!k())return e.history.push("/"),null;function t(){return(t=Object(w.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,D();case 2:e.history.push("/");case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return r.a.createElement(r.a.Fragment,null,r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",to:"/create",component:E.b},"Add recipe"),r.a.createElement(me,null),r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",onClick:function(){return t.apply(this,arguments)}},"Logout"))})),pe=a(59),de=a(205),fe=a(151),he=a(203),ge=a(89),be=a.n(ge);var Ee=Object(v.f)((function(e){var t=e.history,a=k(),o=Object(n.useState)(""),c=Object(j.a)(o,2),i=c[0],l=c[1],u=Object(n.useState)(""),m=Object(j.a)(u,2),s=m[0],p=m[1],d=Object(n.useState)(""),h=Object(j.a)(d,2),g=h[0],b=h[1],E=Object(n.useState)([{name:"",amount:""}]),v=Object(j.a)(E,2),y=v[0],O=v[1],w=Object(n.useState)(""),x=Object(j.a)(w,2),C=x[0],S=x[1],W=Object(n.useState)(""),D=Object(j.a)(W,2),N=D[0],P=D[1],B=function(e){return function(){""===e.name&&""!==s&&""!==g?function(e){var t=Object(pe.a)(y).filter((function(e){return""!==e.name}));O([].concat(Object(pe.a)(t),[e,{name:"",amount:""}])),p(""),b("")}({name:s,amount:g}):""!==e.name&&function(e){var t=Object(pe.a)(y).filter((function(t){return t.name!==e.name}));O(t)}(e)}};return r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()&&!1}},r.a.createElement(U.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(J.a,{htmlFor:"name"},"Name that stuff"),r.a.createElement(G.a,{id:"title",name:"title",autoComplete:"off",autoFocus:!0,value:i,onChange:function(e){return l(e.target.value)},style:{marginBottom:"50px"}})),r.a.createElement("div",{style:{display:"flex",justifyContent:"center",marginBottom:"100px",flexDirection:"column"}},r.a.createElement(L.a,{component:"h2",variant:"h6",gutterBottom:!0},"Ingredients list"),y.map((function(e,t){return r.a.createElement(de.a,{key:"".concat(e.name,"-").concat(indexedDB),label:e.name?r.a.createElement("div",null,r.a.createElement("p",null,"".concat(e.name," - ").concat(e.amount))):r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(fe.a,{value:s,onChange:function(e){return p(e.target.value)},placeholder:"Name"}),r.a.createElement(fe.a,{value:g,onChange:function(e){return b(e.target.value)},placeholder:"Amount"})),color:e.name?"primary":void 0,onDelete:B(e),deleteIcon:e.name?void 0:r.a.createElement(be.a,null),style:{height:"100%",marginBottom:"15px",padding:"5px"}})})),r.a.createElement(U.a,{margin:"normal",fullWidth:!0},r.a.createElement(he.a,{id:"description",name:"description",label:"Description",multiline:!0,rows:"4",rowsMax:"10",value:C,onChange:function(e){return S(e.target.value)},margin:"normal"})),r.a.createElement(U.a,{margin:"normal",fullWidth:!0},r.a.createElement(J.a,{htmlFor:"name"},"Recipe link"),r.a.createElement(G.a,{id:"recipeLink",name:"recipeLink",autoComplete:"off",autoFocus:!0,value:N,onChange:function(e){return P(e.target.value)},style:{marginBottom:"50px"}}))),r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",onClick:function(e){if(a){var t={title:i,userId:a.uid,author:a.displayName||"",description:C,recipeLink:N,ingredients:y};f(t)}}},"Add"),r.a.createElement(R.a,{type:"submit",fullWidth:!0,variant:"contained",color:"secondary",onClick:t.goBack},"Back"))})),ve=(a(125),Object(g.a)());var ye=P()((function(e){return{main:Object(i.a)({width:"auto",display:"block",marginLeft:e.spacing(3),marginRight:e.spacing(3)},e.breakpoints.up(400+e.spacing(6)),{width:"70vw",marginLeft:"auto",marginRight:"auto"}),paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center",padding:"".concat(e.spacing(2),"px ").concat(e.spacing(3),"px ").concat(e.spacing(3),"px")},avatar:{margin:e.spacing(),backgroundColor:e.palette.secondary.main},submit:{marginTop:e.spacing(3)}}}))((function(e){var t=e.classes,a=C(l.auth()),n=a.initializing,o=a.user;return!0!==n?r.a.createElement("main",{className:t.main},r.a.createElement(A.a,{className:t.paper},r.a.createElement(I.a,{className:t.avatar},r.a.createElement(F.a,null)),o&&o.displayName&&r.a.createElement(L.a,{component:"h1",variant:"h5"},"Hello ",o.displayName),r.a.createElement(x.Provider,{value:{initializing:n,user:o}},r.a.createElement(b.a,{theme:ve},r.a.createElement(z.a,null),r.a.createElement(E.a,null,r.a.createElement(v.c,null,r.a.createElement(v.a,{exact:!0,path:"/",component:T}),r.a.createElement(v.a,{exact:!0,path:"/login",component:H}),r.a.createElement(v.a,{exact:!0,path:"/signup",component:K}),r.a.createElement(v.a,{exact:!0,path:"/dashboard",component:se}),r.a.createElement(v.a,{exact:!0,path:"/create",component:Ee}))))))):r.a.createElement("div",{id:"loader"},r.a.createElement(q.a,null))}));a(144);c.a.render(r.a.createElement(ye,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[104,1,2]]]);
//# sourceMappingURL=main.1da867d8.chunk.js.map