(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61067106"],{aeb1:function(e,t,a){var o,r,n;(function(a,i){r=[],o=i,n="function"===typeof o?o.apply(t,r):o,void 0===n||(e.exports=n)})(0,(function(){return function e(t,a,o){var r,n,i=window,c="application/octet-stream",s=o||c,l=t,d=!a&&!o&&l,p=document.createElement("a"),v=function(e){return String(e)},u=i.Blob||i.MozBlob||i.WebKitBlob||v,m=a||"download";if(u=u.call?u.bind(i):Blob,"true"===String(this)&&(l=[l,s],s=l[0],l=l[1]),d&&d.length<2048&&(m=d.split("/").pop().split("?")[0],p.href=d,-1!==p.href.indexOf(d))){var f=new XMLHttpRequest;return f.open("GET",d,!0),f.responseType="blob",f.onload=function(t){e(t.target.response,m,c)},setTimeout((function(){f.send()}),0),f}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(l)){if(!(l.length>2096103.424&&u!==v))return navigator.msSaveBlob?navigator.msSaveBlob(j(l),m):$(l);l=j(l),s=l.type||c}else if(/([\x80-\xff])/.test(l)){var b=0,g=new Uint8Array(l.length),_=g.length;for(b;b<_;++b)g[b]=l.charCodeAt(b);l=new u([g],{type:s})}function j(e){var t=e.split(/[:;,]/),a=t[1],o="base64"==t[2]?atob:decodeURIComponent,r=o(t.pop()),n=r.length,i=0,c=new Uint8Array(n);for(i;i<n;++i)c[i]=r.charCodeAt(i);return new u([c],{type:a})}function $(e,t){if("download"in p)return p.href=e,p.setAttribute("download",m),p.className="download-js-link",p.innerHTML="downloading...",p.style.display="none",document.body.appendChild(p),setTimeout((function(){p.click(),document.body.removeChild(p),!0===t&&setTimeout((function(){i.URL.revokeObjectURL(p.href)}),250)}),66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,c)),window.open(e)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=e),!0;var a=document.createElement("iframe");document.body.appendChild(a),!t&&/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,c)),a.src=e,setTimeout((function(){document.body.removeChild(a)}),333)}if(r=l instanceof u?l:new u([l],{type:s}),navigator.msSaveBlob)return navigator.msSaveBlob(r,m);if(i.URL)$(i.URL.createObjectURL(r),!0);else{if("string"===typeof r||r.constructor===v)try{return $("data:"+s+";base64,"+i.btoa(r))}catch(k){return $("data:"+s+","+encodeURIComponent(r))}n=new FileReader,n.onload=function(e){$(this.result)},n.readAsDataURL(r)}return!0}}))},d675:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"grey lighten-3",staticStyle:{"min-height":"100vh"}},[a("ui-app-bar",{attrs:{title:"專案 - "+e.$.project.name,back:{name:"home"}}},[a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on;return[a("v-btn",e._g({staticClass:"mr-2",attrs:{small:"",icon:""},on:{click:e.outputJS}},o),[a("v-icon",[e._v("mdi-language-javascript")])],1)]}}])},[a("span",[e._v("輸出Protractor專案")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on;return[a("v-btn",e._g({staticClass:"mr-2",attrs:{small:"",icon:""},on:{click:e.outputProject}},o),[a("v-icon",[e._v("mdi-location-exit")])],1)]}}])},[a("span",[e._v("輸出專案")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on;return[a("v-btn",e._g({staticClass:"mr-2",attrs:{small:"",icon:""},on:{click:function(t){e.$.dependencie=!0}}},o),[a("v-icon",[e._v("mdi-graph-outline")])],1)]}}])},[a("span",[e._v("npm依賴控管")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on;return[a("v-btn",e._g({staticClass:"mr-2",attrs:{small:"",icon:""},on:{click:function(t){e.$.variable=!0}}},o),[a("v-icon",[e._v("mdi-variable")])],1)]}}])},[a("span",[e._v("設定變數")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on;return[a("v-btn",e._g({staticClass:"mr-2",attrs:{small:"",icon:""},on:{click:function(t){return e.$router.push({name:"project.custombtn"})}}},o),[a("v-icon",[e._v("mdi-gamepad")])],1)]}}])},[a("span",[e._v("自定義按鈕")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on;return[a("v-btn",e._g({staticClass:"mr-2",attrs:{small:"",icon:"",color:e.$.removeMode?"red":void 0},on:{click:function(t){e.$.removeMode=!e.$.removeMode}}},o),[a("v-icon",[e._v("mdi-trash-can-outline")])],1)]}}])},[a("span",[e._v("刪除測試")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on;return[a("v-btn",e._g({attrs:{small:"",icon:""},on:{click:function(t){e.$.group=!0}}},o),[a("v-icon",[e._v("mdi-group")])],1)]}}])},[a("span",[e._v("建立分類")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on;return[a("v-btn",e._g({attrs:{small:"",icon:""},on:{click:function(t){return e.invokeTest()}}},o),[a("v-icon",[e._v("mdi-play")])],1)]}}])},[a("span",[e._v("運行所有測試")])])],1),0===e.$.project.specs.size?a("div",{staticClass:"text-center pt-5 subtitle-1 grey--text"},[a("div",[e._v("😥")]),a("div",[e._v("一個測試也沒有")])]):a("div",[e._l(e.$.project.groups.items,(function(t,o){return a("div",{key:o+"t",staticClass:"pa-5"},[a("div",{staticClass:"title"},[e._v(e._s(t.name))]),a("v-divider",{staticClass:"mt-3 mb-1"}),a("v-row",[e._l(e.$.project.specs.items,(function(o,r){return[o.group===t.id?a("v-col",{key:r,attrs:{cols:4}},[a("v-card",{staticClass:"pa-5",attrs:{to:e.$.removeMode?void 0:e.target(o)}},[a("v-row",{attrs:{align:"center"}},[a("div",{staticClass:"ml-3"},[e._v(e._s(o.name))]),a("v-spacer"),e.$.removeMode?a("v-btn",{attrs:{icon:""},on:{click:function(t){return t.stopPropagation(),e.remove(o.id)}}},[a("v-icon",[e._v("mdi-trash-can-outline")])],1):e._e()],1)],1)],1):e._e()]}))],2)],1)})),e.$.project.specs.views.hasNoCategory?a("div",{staticClass:"pa-5"},[a("div",{staticClass:"title"},[e._v("無分類")]),a("v-divider",{staticClass:"mt-3 mb-1"}),a("v-row",[e._l(e.$.project.specs.items,(function(t,o){return[e.$.project.groups.fetch(t.group)?e._e():a("v-col",{key:o,attrs:{cols:4}},[a("v-card",{staticClass:"pa-5",attrs:{to:e.$.removeMode?void 0:e.target(t)}},[a("v-row",{attrs:{align:"center"}},[a("div",{staticClass:"ml-3"},[e._v(e._s(t.name))]),a("v-spacer"),e.$.removeMode?a("v-btn",{attrs:{icon:""},on:{click:function(a){return a.stopPropagation(),e.remove(t.id)}}},[a("v-icon",[e._v("mdi-trash-can-outline")])],1):e._e()],1)],1)],1)]}))],2)],1):e._e()],2),a("v-dialog",{attrs:{"max-width":"800px",transition:"dialog-transition"},model:{value:e.$.variable,callback:function(t){e.$set(e.$,"variable",t)},expression:"$.variable"}},[a("self-variable",{attrs:{project:e.$.project}})],1),a("v-dialog",{attrs:{"max-width":"800px"},model:{value:e.$.dependencie,callback:function(t){e.$set(e.$,"dependencie",t)},expression:"$.dependencie"}},[a("self-dependencie",{attrs:{project:e.$.project}})],1),a("v-dialog",{attrs:{"max-width":"800px"},model:{value:e.$.group,callback:function(t){e.$set(e.$,"group",t)},expression:"$.group"}},[a("self-group",{attrs:{project:e.$.project}})],1),a("ui-select-spec",{ref:"selectSpecInvoke"}),a("ui-invoke",{ref:"invoke"}),a("ui-form",{ref:"createForm",attrs:{title:"建立測試"}},[a("v-text-field",{attrs:{label:"名稱",outlined:"",rules:e.$.alas.rules(["#ms.required"])},model:{value:e.$.createName,callback:function(t){e.$set(e.$,"createName",t)},expression:"$.createName"}}),a("v-select",{attrs:{outlined:"",items:e.$.project.groups.items,clearable:"","item-text":"name","item-value":"id",label:"分類"},model:{value:e.$.createGroup,callback:function(t){e.$set(e.$,"createGroup",t)},expression:"$.createGroup"}}),a("v-select",{attrs:{outlined:"",items:e.$.project.specs.items,clearable:"","item-text":"$v.typeAndName","return-object":"",label:"引用模板"},model:{value:e.$.createCopyTarget,callback:function(t){e.$set(e.$,"createCopyTarget",t)},expression:"$.createCopyTarget"}})],1),a("v-btn",{attrs:{fab:"",dark:"",fixed:"",right:"",bottom:"",color:"primary"},on:{click:e.create}},[a("v-icon",[e._v("mdi-plus")])],1)],1)},r=[],n=a("9ab4"),i=a("aeb1"),c=a.n(i),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",[a("v-card-title",{attrs:{"primary-title":""}},[a("span",[e._v("分類")]),a("v-spacer"),a("v-btn",{attrs:{text:"",icon:""},on:{click:function(t){return e.project.groups.methods.sort()}}},[a("v-icon",[e._v("mdi-refresh")])],1)],1),a("v-divider",{staticClass:"mb-5 mt-1"}),a("v-card-text",[0===e.project.groups.size?a("div",{staticClass:"mt-1 body-2 grey--text"},[e._v("本專案沒有分類")]):e._e(),e._l(e.project.groups.items,(function(t,o){return a("v-row",{key:o+"t",staticClass:"mt-3 mx-0",attrs:{"hide-details":"","no-gutters":"",align:"center"}},[a("v-col",{staticClass:"mr-2",attrs:{cols:"5"}},[a("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",label:"名稱"},model:{value:t.name,callback:function(a){e.$set(t,"name",a)},expression:"group.name"}})],1),a("v-col",{staticClass:"mr-2",attrs:{cols:"5"}},[a("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",label:"優先級"},model:{value:t.level,callback:function(a){e.$set(t,"level",a)},expression:"group.level"}})],1),a("v-col",{attrs:{cols:"1"}},[a("v-btn",{attrs:{outlined:""},on:{click:function(a){return e.remove(t.id)}}},[e._v(" 刪除 ")])],1)],1)}))],2),a("v-btn",{staticClass:"mt-2",attrs:{tile:"",block:"",color:"primary"},on:{click:e.create}},[e._v("加入一個分類")])],1)},l=[],d=a("a6f4"),p=Object(d["c"])({props:{project:Object},setup(e){let t=t=>{e.project.groups.remove(t)},a=()=>{e.project.groups.write({name:"",level:0})};return{remove:t,create:a}}}),v=p,u=a("2877"),m=a("6544"),f=a.n(m),b=a("8336"),g=a("b0af"),_=a("99d9"),j=a("62ad"),$=a("ce7e"),k=a("132d"),y=a("0fd9"),C=a("2fa4"),h=a("8654"),x=Object(u["a"])(v,s,l,!1,null,null,null),w=x.exports;f()(x,{VBtn:b["a"],VCard:g["a"],VCardText:_["b"],VCardTitle:_["c"],VCol:j["a"],VDivider:$["a"],VIcon:k["a"],VRow:y["a"],VSpacer:C["a"],VTextField:h["a"]});var V=a("0d09"),S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",[a("ui-install",{ref:"installUI"}),a("v-card-title",{attrs:{"primary-title":""}},[e._v(" npm依賴套件 "),a("v-spacer"),a("v-btn",{attrs:{text:""},on:{click:e.install}},[e._v("安裝")])],1),a("v-divider",{staticClass:"mb-5 mt-1"}),a("v-card-text",[0===e.project.dependencies.size?a("div",{staticClass:"mt-1 body-2 grey--text"},[e._v("本專案沒有依賴套件")]):e._e(),e._l(e.project.dependencies.items,(function(t,o){return a("v-row",{key:o+"t",staticClass:"mt-3 mx-0",attrs:{"hide-details":"","no-gutters":"",align:"center"}},[a("v-col",{staticClass:"mr-2",attrs:{cols:"5"}},[a("v-text-field",{attrs:{disabled:e.project.$m.isLockDependencies(t.name),dense:"",outlined:"","hide-details":"",label:"name"},model:{value:t.name,callback:function(a){e.$set(t,"name",a)},expression:"dependencie.name"}})],1),a("v-col",{staticClass:"mr-2",attrs:{cols:"5"}},[a("v-text-field",{attrs:{disabled:e.project.$m.isLockDependencies(t.name),dense:"",outlined:"","hide-details":"",label:"version"},model:{value:t.version,callback:function(a){e.$set(t,"version",a)},expression:"dependencie.version"}})],1),a("v-col",{attrs:{cols:"1"}},[a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(o){var r=o.on;return[a("v-btn",e._g({attrs:{disabled:e.project.$m.isLockDependencies(t.name),outlined:""},on:{click:function(a){return e.remove(t.id)}}},r),[e._v(" 刪除 ")])]}}],null,!0)},[a("span",[e._v("刪除依賴可能導致測試失敗")])])],1)],1)}))],2),a("v-btn",{staticClass:"mt-2",attrs:{tile:"",block:"",color:"primary"},on:{click:e.addDependencie}},[e._v("加入一個依賴")])],1)},T=[],O=Object(d["c"])({props:{project:Object},setup(e){let t=Object(d["g"])(null),a=Object(d["f"])({});Object(d["d"])(()=>{});let o=t=>{e.project.dependencies.remove(t)},r=()=>{t.value.open(e.project)},n=()=>{e.project.dependencies.write({name:""})};return{$:a,remove:o,install:r,installUI:t,addDependencie:n}}}),R=O,U=a("3a2f"),D=Object(u["a"])(R,S,T,!1,null,null,null),B=D.exports;f()(D,{VBtn:b["a"],VCard:g["a"],VCardText:_["b"],VCardTitle:_["c"],VCol:j["a"],VDivider:$["a"],VRow:y["a"],VSpacer:C["a"],VTextField:h["a"],VTooltip:U["a"]});var L=a("b529"),M=Object(d["c"])({props:{},components:{"self-group":w,"self-variable":V["a"],"self-dependencie":B},setup(){let e=Object(d["f"])({alas:L["b"],project:L["d"].fetch("project"),createName:"",createGroup:"",createCopyTarget:null,variable:!1,group:!1,removeMode:!1,dependencie:!1}),t=Object(d["g"])(null),a=Object(d["g"])(null),o=Object(d["g"])(null),r=()=>Object(n["a"])(this,void 0,void 0,(function*(){yield e.project.$o.save.start(),c()(JSON.stringify(e.project.$v.output,null,4),`project-${e.project.name}.json`,"text/plain")})),i=()=>Object(n["a"])(this,void 0,void 0,(function*(){yield e.project.$o.save.start();let t=yield e.project.$m.zip();c()(t,`project-${e.project.name}.zip`,"text/plain")})),s=()=>{a.value.open(a=>Object(n["a"])(this,void 0,void 0,(function*(){yield e.project.$o.save.start(),t.value.play(a.map(e=>e.id))})))},l=e=>({name:"project.specs",params:{id:e.id}}),p=()=>{o.value.open(()=>{if(e.createCopyTarget){let t=e.createCopyTarget.$export();t.id=void 0,t.name=e.createName,t.group=e.createGroup,e.project.specs.write(t)}else e.project.specs.write({name:e.createName,group:e.createGroup})})},v=t=>{L["a"].confirm("確定刪除測試？",a=>{e.project.specs.remove(t),a()})};return{$:e,invoke:t,selectSpecInvoke:a,createForm:o,outputProject:r,outputJS:i,invokeTest:s,target:l,create:p,remove:v}}}),N=M,A=a("169a"),I=a("b974"),G=Object(u["a"])(N,o,r,!1,null,null,null);t["default"]=G.exports;f()(G,{VBtn:b["a"],VCard:g["a"],VCol:j["a"],VDialog:A["a"],VDivider:$["a"],VIcon:k["a"],VRow:y["a"],VSelect:I["a"],VSpacer:C["a"],VTextField:h["a"],VTooltip:U["a"]})}}]);