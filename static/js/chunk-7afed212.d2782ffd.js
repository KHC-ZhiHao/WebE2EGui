(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7afed212"],{"9d01":function(t,e,o){},aeb1:function(t,e,o){var a,r,n;(function(o,s){r=[],a=s,n="function"===typeof a?a.apply(e,r):a,void 0===n||(t.exports=n)})(0,(function(){return function t(e,o,a){var r,n,s=window,i="application/octet-stream",c=a||i,l=e,p=!o&&!a&&l,d=document.createElement("a"),u=function(t){return String(t)},v=s.Blob||s.MozBlob||s.WebKitBlob||u,m=o||"download";if(v=v.call?v.bind(s):Blob,"true"===String(this)&&(l=[l,c],c=l[0],l=l[1]),p&&p.length<2048&&(m=p.split("/").pop().split("?")[0],d.href=p,-1!==d.href.indexOf(p))){var f=new XMLHttpRequest;return f.open("GET",p,!0),f.responseType="blob",f.onload=function(e){t(e.target.response,m,i)},setTimeout((function(){f.send()}),0),f}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(l)){if(!(l.length>2096103.424&&v!==u))return navigator.msSaveBlob?navigator.msSaveBlob(j(l),m):_(l);l=j(l),c=l.type||i}else if(/([\x80-\xff])/.test(l)){var h=0,b=new Uint8Array(l.length),g=b.length;for(h;h<g;++h)b[h]=l.charCodeAt(h);l=new v([b],{type:c})}function j(t){var e=t.split(/[:;,]/),o=e[1],a="base64"==e[2]?atob:decodeURIComponent,r=a(e.pop()),n=r.length,s=0,i=new Uint8Array(n);for(s;s<n;++s)i[s]=r.charCodeAt(s);return new v([i],{type:o})}function _(t,e){if("download"in d)return d.href=t,d.setAttribute("download",m),d.className="download-js-link",d.innerHTML="downloading...",d.style.display="none",document.body.appendChild(d),setTimeout((function(){d.click(),document.body.removeChild(d),!0===e&&setTimeout((function(){s.URL.revokeObjectURL(d.href)}),250)}),66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(t)&&(t="data:"+t.replace(/^data:([\w\/\-\+]+)/,i)),window.open(t)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=t),!0;var o=document.createElement("iframe");document.body.appendChild(o),!e&&/^data:/.test(t)&&(t="data:"+t.replace(/^data:([\w\/\-\+]+)/,i)),o.src=t,setTimeout((function(){document.body.removeChild(o)}),333)}if(r=l instanceof v?l:new v([l],{type:c}),navigator.msSaveBlob)return navigator.msSaveBlob(r,m);if(s.URL)_(s.URL.createObjectURL(r),!0);else{if("string"===typeof r||r.constructor===u)try{return _("data:"+c+";base64,"+s.btoa(r))}catch(w){return _("data:"+c+","+encodeURIComponent(r))}n=new FileReader,n.onload=function(t){_(this.result)},n.readAsDataURL(r)}return!0}}))},d675:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"grey lighten-3",staticStyle:{"min-height":"100vh"}},[o("ui-app-bar",{attrs:{title:"專案 - "+t.$.project.name,back:{name:"home"}}},[o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[o("v-btn",t._g({staticClass:"mr-2",attrs:{small:"",icon:""},on:{click:t.openConfig}},a),[o("v-icon",[t._v("mdi-cog")])],1)]}}])},[o("span",[t._v("Protractor設定")])]),o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[o("v-btn",t._g({staticClass:"mr-2",attrs:{small:"",icon:""},on:{click:t.outputJS}},a),[o("v-icon",[t._v("mdi-language-javascript")])],1)]}}])},[o("span",[t._v("輸出Protractor專案")])]),o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[o("v-btn",t._g({staticClass:"mr-2",attrs:{small:"",icon:""},on:{click:t.outputProject}},a),[o("v-icon",[t._v("mdi-location-exit")])],1)]}}])},[o("span",[t._v("輸出專案")])]),o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[o("v-btn",t._g({staticClass:"mr-2",attrs:{small:"",icon:""},on:{click:function(e){t.$.dependencie=!0}}},a),[o("v-icon",[t._v("mdi-graph-outline")])],1)]}}])},[o("span",[t._v("npm依賴控管")])]),o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[o("v-btn",t._g({staticClass:"mr-2",attrs:{small:"",icon:""},on:{click:function(e){t.$.variable=!0}}},a),[o("v-icon",[t._v("mdi-variable")])],1)]}}])},[o("span",[t._v("設定變數")])]),o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[o("v-btn",t._g({staticClass:"mr-2",attrs:{small:"",icon:""},on:{click:function(e){return t.$router.push({name:"project.custombtn"})}}},a),[o("v-icon",[t._v("mdi-gamepad")])],1)]}}])},[o("span",[t._v("自定義按鈕")])]),o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[o("v-btn",t._g({staticClass:"mr-2",attrs:{small:"",icon:"",color:t.$.removeMode?"red":void 0},on:{click:function(e){t.$.removeMode=!t.$.removeMode}}},a),[o("v-icon",[t._v("mdi-trash-can-outline")])],1)]}}])},[o("span",[t._v("刪除測試")])]),o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[o("v-btn",t._g({attrs:{small:"",icon:""},on:{click:function(e){t.$.group=!0}}},a),[o("v-icon",[t._v("mdi-group")])],1)]}}])},[o("span",[t._v("建立分類")])]),o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[o("v-btn",t._g({attrs:{small:"",icon:""},on:{click:function(e){return t.invokeTest()}}},a),[o("v-icon",[t._v("mdi-play")])],1)]}}])},[o("span",[t._v("運行測試")])])],1),o("div",{staticClass:"pa-5 pb-0"},[o("v-toolbar",{attrs:{dense:"",elevation:"1"}},[o("span",[t._v("說明")]),o("v-spacer"),o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,r=e.attrs;return[o("v-icon",t._g(t._b({},"v-icon",r,!1),a),[t._v("mdi-help-circle-outline")])]}}])},[o("span",[t._v("你可以在這裡紀錄一些無法被覆蓋測試的說明，採用Makedown格式，在輸出檔案時也會連同說明一起輸出。")])])],1),o("markdown-editor",{staticClass:"mb-3",attrs:{height:"250px"},model:{value:t.$.project.desc,callback:function(e){t.$set(t.$.project,"desc",e)},expression:"$.project.desc"}})],1),0===t.$.project.specs.size?o("div",{staticClass:"text-center pt-5 subtitle-1 grey--text"},[o("div",[t._v("😥")]),o("div",[t._v("一個測試也沒有")])]):o("div",[t._l(t.$.project.groups.items,(function(e,a){return o("div",{key:a+"t",staticClass:"pa-5"},[o("div",{staticClass:"title"},[t._v(t._s(e.name))]),o("v-divider",{staticClass:"mt-3 mb-1"}),o("v-row",[t._l(t.$.project.specs.items,(function(a,r){return[a.group===e.id?o("v-col",{key:r,attrs:{cols:4}},[o("v-card",{staticClass:"pa-5",attrs:{to:t.$.removeMode?void 0:t.target(a)}},[o("v-row",{attrs:{align:"center"}},[o("div",{staticClass:"ml-3"},[t._v(t._s(a.name))]),o("v-spacer"),t.$.removeMode?o("v-btn",{attrs:{icon:""},on:{click:function(e){return e.stopPropagation(),t.remove(a.id)}}},[o("v-icon",[t._v("mdi-trash-can-outline")])],1):t._e()],1)],1)],1):t._e()]}))],2)],1)})),t.$.project.specs.views.hasNoCategory?o("div",{staticClass:"pa-5"},[o("div",{staticClass:"title"},[t._v("無分類")]),o("v-divider",{staticClass:"mt-3 mb-1"}),o("v-row",[t._l(t.$.project.specs.items,(function(e,a){return[t.$.project.groups.fetch(e.group)?t._e():o("v-col",{key:a,attrs:{cols:4}},[o("v-card",{staticClass:"pa-5",attrs:{to:t.$.removeMode?void 0:t.target(e)}},[o("v-row",{attrs:{align:"center"}},[o("div",{staticClass:"ml-3"},[t._v(t._s(e.name))]),o("v-spacer"),t.$.removeMode?o("v-btn",{attrs:{icon:""},on:{click:function(o){return o.stopPropagation(),t.remove(e.id)}}},[o("v-icon",[t._v("mdi-trash-can-outline")])],1):t._e()],1)],1)],1)]}))],2)],1):t._e()],2),o("v-dialog",{attrs:{"max-width":"800px",transition:"dialog-transition"},model:{value:t.$.variable,callback:function(e){t.$set(t.$,"variable",e)},expression:"$.variable"}},[o("self-variable",{attrs:{project:t.$.project}})],1),o("v-dialog",{attrs:{"max-width":"800px"},model:{value:t.$.dependencie,callback:function(e){t.$set(t.$,"dependencie",e)},expression:"$.dependencie"}},[o("self-dependencie",{attrs:{project:t.$.project}})],1),o("v-dialog",{attrs:{"max-width":"800px"},model:{value:t.$.group,callback:function(e){t.$set(t.$,"group",e)},expression:"$.group"}},[o("self-group",{attrs:{project:t.$.project}})],1),o("v-dialog",{attrs:{"max-width":"800px",persistent:!t.$.project.browserOption.$validate().success},model:{value:t.$.editConfig,callback:function(e){t.$set(t.$,"editConfig",e)},expression:"$.editConfig"}},[o("self-config",{attrs:{project:t.$.project}})],1),o("ui-select-spec",{ref:"selectSpecInvoke"}),o("ui-invoke",{ref:"invoke"}),o("ui-form",{ref:"createForm",attrs:{title:"建立測試"}},[o("v-text-field",{attrs:{label:"名稱",outlined:"",rules:t.$.alas.rules(["#ms.required"])},model:{value:t.$.createName,callback:function(e){t.$set(t.$,"createName",e)},expression:"$.createName"}}),o("v-select",{attrs:{outlined:"",items:t.$.project.groups.items,clearable:"","item-text":"name","item-value":"id",label:"分類"},model:{value:t.$.createGroup,callback:function(e){t.$set(t.$,"createGroup",e)},expression:"$.createGroup"}}),o("v-select",{attrs:{outlined:"",items:t.$.project.specs.items,clearable:"","item-text":"$v.typeAndName","return-object":"",label:"引用模板"},model:{value:t.$.createCopyTarget,callback:function(e){t.$set(t.$,"createCopyTarget",e)},expression:"$.createCopyTarget"}})],1),o("v-btn",{attrs:{fab:"",dark:"",fixed:"",right:"",bottom:"",color:"primary"},on:{click:t.create}},[o("v-icon",[t._v("mdi-plus")])],1)],1)},r=[],n=o("9ab4"),s=o("aeb1"),i=o.n(s),c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",[o("v-card-title",{attrs:{"primary-title":""}},[o("span",[t._v("分類")]),o("v-spacer"),o("v-btn",{attrs:{text:"",icon:""},on:{click:function(e){return t.project.groups.methods.sort()}}},[o("v-icon",[t._v("mdi-refresh")])],1)],1),o("v-divider",{staticClass:"mb-5 mt-1"}),o("v-card-text",[0===t.project.groups.size?o("div",{staticClass:"mt-1 body-2 grey--text"},[t._v("本專案沒有分類")]):t._e(),t._l(t.project.groups.items,(function(e,a){return o("v-row",{key:a+"t",staticClass:"mt-3 mx-0",attrs:{"hide-details":"","no-gutters":"",align:"center"}},[o("v-col",{staticClass:"mr-2",attrs:{cols:"5"}},[o("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",label:"名稱"},model:{value:e.name,callback:function(o){t.$set(e,"name",o)},expression:"group.name"}})],1),o("v-col",{staticClass:"mr-2",attrs:{cols:"5"}},[o("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",label:"優先級"},model:{value:e.level,callback:function(o){t.$set(e,"level",o)},expression:"group.level"}})],1),o("v-col",{attrs:{cols:"1"}},[o("v-btn",{attrs:{outlined:""},on:{click:function(o){return t.remove(e.id)}}},[t._v(" 刪除 ")])],1)],1)}))],2),o("v-btn",{staticClass:"mt-2",attrs:{tile:"",block:"",color:"primary"},on:{click:t.create}},[t._v("加入一個分類")])],1)},l=[],p=o("a6f4"),d=Object(p["c"])({props:{project:Object},setup(t){let e=e=>{t.project.groups.remove(e)},o=()=>{t.project.groups.write({name:"",level:0})};return{remove:e,create:o}}}),u=d,v=o("2877"),m=o("6544"),f=o.n(m),h=o("8336"),b=o("b0af"),g=o("99d9"),j=o("62ad"),_=o("ce7e"),w=o("132d"),$=o("0fd9"),C=o("2fa4"),k=o("8654"),x=Object(v["a"])(u,c,l,!1,null,null,null),y=x.exports;f()(x,{VBtn:h["a"],VCard:b["a"],VCardText:g["b"],VCardTitle:g["c"],VCol:j["a"],VDivider:_["a"],VIcon:w["a"],VRow:$["a"],VSpacer:C["a"],VTextField:k["a"]});var O=o("0d09"),S=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",[o("ui-install",{ref:"installUI"}),o("v-card-title",{attrs:{"primary-title":""}},[t._v(" npm依賴套件 "),o("v-spacer"),o("v-btn",{attrs:{text:""},on:{click:t.install}},[t._v("安裝")])],1),o("v-divider",{staticClass:"mb-5 mt-1"}),o("v-card-text",[0===t.project.dependencies.size?o("div",{staticClass:"mt-1 body-2 grey--text"},[t._v("本專案沒有依賴套件")]):t._e(),t._l(t.project.dependencies.items,(function(e,a){return o("v-row",{key:a+"t",staticClass:"mt-3 mx-0",attrs:{"hide-details":"","no-gutters":"",align:"center"}},[o("v-col",{staticClass:"mr-2",attrs:{cols:"5"}},[o("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",label:"name"},model:{value:e.name,callback:function(o){t.$set(e,"name",o)},expression:"dependencie.name"}})],1),o("v-col",{staticClass:"mr-2",attrs:{cols:"5"}},[o("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",label:"version"},model:{value:e.version,callback:function(o){t.$set(e,"version",o)},expression:"dependencie.version"}})],1),o("v-col",{attrs:{cols:"1"}},[o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(a){var r=a.on;return[o("v-btn",t._g({attrs:{outlined:""},on:{click:function(o){return t.remove(e.id)}}},r),[t._v(" 刪除 ")])]}}],null,!0)},[o("span",[t._v("刪除依賴可能導致測試失敗")])])],1)],1)}))],2),o("v-btn",{staticClass:"mt-2",attrs:{tile:"",block:"",color:"primary"},on:{click:t.addDependencie}},[t._v("加入一個依賴")])],1)},V=[],T=Object(p["c"])({props:{project:Object},setup(t){let e=Object(p["g"])(null),o=Object(p["f"])({});Object(p["d"])(()=>{});let a=e=>{t.project.dependencies.remove(e)},r=()=>{e.value.open(t.project)},n=()=>{t.project.dependencies.write({name:""})};return{$:o,remove:a,install:r,installUI:e,addDependencie:n}}}),X=T,E=o("3a2f"),Y=Object(v["a"])(X,S,V,!1,null,null,null),R=Y.exports;f()(Y,{VBtn:h["a"],VCard:b["a"],VCardText:g["b"],VCardTitle:g["c"],VCol:j["a"],VDivider:_["a"],VRow:$["a"],VSpacer:C["a"],VTextField:k["a"],VTooltip:E["a"]});var M=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",[o("v-card-title",{attrs:{"primary-title":""}},[t._v("測試設定")]),o("v-divider",{staticClass:"mb-5 mt-1"}),o("v-card-text",[o("v-radio-group",{attrs:{label:"執行瀏覽器","hide-details":""},model:{value:t.project.browserOption.target,callback:function(e){t.$set(t.project.browserOption,"target",e)},expression:"project.browserOption.target"}},[o("v-radio",{staticClass:"mt-2",attrs:{label:"chrome",value:"chrome"}}),o("v-radio",{attrs:{label:"firefox",value:"firefox(BETA)"}})],1),o("v-switch",{staticClass:"mb-2",attrs:{label:"自動打開Console"},model:{value:t.project.browserOption.openConsole,callback:function(e){t.$set(t.project.browserOption,"openConsole",e)},expression:"project.browserOption.openConsole"}}),o("v-text-field",{attrs:{label:"視窗寬",outlined:"",rules:t.project.browserOption.$rules("width")},model:{value:t.project.browserOption.width,callback:function(e){t.$set(t.project.browserOption,"width",e)},expression:"project.browserOption.width"}}),o("v-text-field",{attrs:{label:"視窗高",outlined:"",rules:t.project.browserOption.$rules("height")},model:{value:t.project.browserOption.height,callback:function(e){t.$set(t.project.browserOption,"height",e)},expression:"project.browserOption.height"}}),o("v-text-field",{attrs:{label:"起始位置X",outlined:"",rules:t.project.browserOption.$rules("posX")},model:{value:t.project.browserOption.posX,callback:function(e){t.$set(t.project.browserOption,"posX",e)},expression:"project.browserOption.posX"}}),o("v-text-field",{attrs:{label:"起始位置Y",outlined:"",rules:t.project.browserOption.$rules("posY")},model:{value:t.project.browserOption.posY,callback:function(e){t.$set(t.project.browserOption,"posY",e)},expression:"project.browserOption.posY"}})],1)],1)},A=[],B=Object(p["c"])({props:{project:Object},setup(){return{}}}),D=B,L=o("67b6"),U=o("43a6"),N=(o("ec29"),o("9d01"),o("fe09")),I=o("c37a"),G=o("80d2");const H=t=>{const{touchstartX:e,touchendX:o,touchstartY:a,touchendY:r}=t,n=.5,s=16;t.offsetX=o-e,t.offsetY=r-a,Math.abs(t.offsetY)<n*Math.abs(t.offsetX)&&(t.left&&o<e-s&&t.left(t),t.right&&o>e+s&&t.right(t)),Math.abs(t.offsetX)<n*Math.abs(t.offsetY)&&(t.up&&r<a-s&&t.up(t),t.down&&r>a+s&&t.down(t))};function P(t,e){const o=t.changedTouches[0];e.touchstartX=o.clientX,e.touchstartY=o.clientY,e.start&&e.start(Object.assign(t,e))}function z(t,e){const o=t.changedTouches[0];e.touchendX=o.clientX,e.touchendY=o.clientY,e.end&&e.end(Object.assign(t,e)),H(e)}function F(t,e){const o=t.changedTouches[0];e.touchmoveX=o.clientX,e.touchmoveY=o.clientY,e.move&&e.move(Object.assign(t,e))}function J(t){const e={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:t.left,right:t.right,up:t.up,down:t.down,start:t.start,move:t.move,end:t.end};return{touchstart:t=>P(t,e),touchend:t=>z(t,e),touchmove:t=>F(t,e)}}function q(t,e,o){const a=e.value,r=a.parent?t.parentElement:t,n=a.options||{passive:!0};if(!r)return;const s=J(e.value);r._touchHandlers=Object(r._touchHandlers),r._touchHandlers[o.context._uid]=s,Object(G["s"])(s).forEach(t=>{r.addEventListener(t,s[t],n)})}function K(t,e,o){const a=e.value.parent?t.parentElement:t;if(!a||!a._touchHandlers)return;const r=a._touchHandlers[o.context._uid];Object(G["s"])(r).forEach(t=>{a.removeEventListener(t,r[t])}),delete a._touchHandlers[o.context._uid]}const W={inserted:q,unbind:K};var Q=W,Z=o("0789"),tt=o("490a"),et=N["a"].extend({name:"v-switch",directives:{Touch:Q},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes(){return{...I["a"].options.computed.classes.call(this),"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset}},attrs(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot(){return[this.genSwitch(),this.genLabel()]},genSwitch(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",{...this.attrs,...this.attrs$}),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",{staticClass:"v-input--switch__track",...this.switchData}),this.$createElement("div",{staticClass:"v-input--switch__thumb",...this.switchData},[this.genProgress()])])},genProgress(){return this.$createElement(Z["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(tt["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft(){this.isActive&&this.onChange()},onSwipeRight(){this.isActive||this.onChange()},onKeydown(t){(t.keyCode===G["r"].left&&this.isActive||t.keyCode===G["r"].right&&!this.isActive)&&this.onChange()}}}),ot=Object(v["a"])(D,M,A,!1,null,null,null),at=ot.exports;f()(ot,{VCard:b["a"],VCardText:g["b"],VCardTitle:g["c"],VDivider:_["a"],VRadio:L["a"],VRadioGroup:U["a"],VSwitch:et,VTextField:k["a"]});var rt=o("b529"),nt=Object(p["c"])({props:{},components:{"self-group":y,"self-config":at,"self-variable":O["a"],"self-dependencie":R},setup(){let t=Object(p["f"])({alas:rt["b"],project:rt["d"].fetch("project"),createName:"",createGroup:"",createCopyTarget:null,variable:!1,group:!1,removeMode:!1,dependencie:!1,editConfig:!1}),e=Object(p["g"])(null),o=Object(p["g"])(null),a=Object(p["g"])(null),r=()=>Object(n["a"])(this,void 0,void 0,(function*(){yield t.project.$o.save.start(),i()(JSON.stringify(t.project.$v.output,null,4),`project-${t.project.name}.json`,"text/plain")})),s=()=>Object(n["a"])(this,void 0,void 0,(function*(){yield t.project.$o.save.start();let e=yield t.project.$m.zip();i()(e,`project-${t.project.name}.zip`,"text/plain")})),c=()=>{o.value.open(o=>Object(n["a"])(this,void 0,void 0,(function*(){yield t.project.$o.save.start(),e.value.play(o.map(t=>t.id))})))},l=t=>({name:"project.specs",params:{id:t.id}}),d=()=>{t.editConfig=!0},u=()=>{a.value.open(()=>{if(t.createCopyTarget){let e=t.createCopyTarget.$export();e.id=void 0,e.name=t.createName,e.group=t.createGroup,t.project.specs.write(e)}else t.project.specs.write({name:t.createName,group:t.createGroup})})},v=e=>{rt["a"].confirm("確定刪除測試？",o=>{t.project.specs.remove(e),o()})};return{$:t,invoke:e,selectSpecInvoke:o,createForm:a,openConfig:d,outputProject:r,outputJS:s,invokeTest:c,target:l,create:u,remove:v}}}),st=nt,it=o("169a"),ct=o("b974"),lt=o("71d9"),pt=Object(v["a"])(st,a,r,!1,null,null,null);e["default"]=pt.exports;f()(pt,{VBtn:h["a"],VCard:b["a"],VCol:j["a"],VDialog:it["a"],VDivider:_["a"],VIcon:w["a"],VRow:$["a"],VSelect:ct["a"],VSpacer:C["a"],VTextField:k["a"],VToolbar:lt["a"],VTooltip:E["a"]})}}]);