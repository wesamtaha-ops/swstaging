(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[577],{2898:function(e,t,r){"use strict";r.d(t,{Z:function(){return createLucideIcon}});var a=r(2265),o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let toKebabCase=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),createLucideIcon=(e,t)=>{let r=(0,a.forwardRef)(({color:r="currentColor",size:n=24,strokeWidth:s=2,absoluteStrokeWidth:i,className:l="",children:c,...d},u)=>(0,a.createElement)("svg",{ref:u,...o,width:n,height:n,stroke:r,strokeWidth:i?24*Number(s)/Number(n):s,className:["lucide",`lucide-${toKebabCase(e)}`,l].join(" "),...d},[...t.map(([e,t])=>(0,a.createElement)(e,t)),...Array.isArray(c)?c:[c]]));return r.displayName=`${e}`,r}},8291:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var a=r(2898);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,a.Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},2851:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var a=r(2898);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,a.Z)("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]])},4135:function(e,t,r){Promise.resolve().then(r.bind(r,8942))},8942:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return CreateFormPage}});var a=r(7437);r(2265);var o=r(4033),n=r(2898);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,n.Z)("ClipboardList",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]]);var i=r(2851);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,n.Z)("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",key:"ymcmye"}]]);var c=r(8291);function CreateForm(){let e=(0,o.useRouter)(),t=[{id:"templates",title:"Use a Template",description:"Start with a pre-built template and customize it to your needs",icon:s,color:"bg-blue-50 text-blue-600",action:()=>e.push("/templates")},{id:"ai",title:"AI Form Generator",description:"Describe your form in plain text and let AI create it for you",icon:i.Z,color:"bg-purple-50 text-purple-600",action:()=>e.push("/forms/ai-create")},{id:"manual",title:"Create from Scratch",description:"Build your form manually using our drag-and-drop builder",icon:l,color:"bg-green-50 text-green-600",action:()=>e.push("/forms/new")}];return(0,a.jsx)("div",{className:"min-h-screen bg-gray-50 py-12",children:(0,a.jsxs)("div",{className:"max-w-3xl mx-auto px-4 sm:px-6 lg:px-8",children:[(0,a.jsxs)("div",{className:"text-center mb-12",children:[(0,a.jsx)("h1",{className:"text-3xl   font-bold font-almarai font-almarai  font-almarai text-gray-900",children:"Create New Form"}),(0,a.jsx)("p",{className:"mt-2 text-sm text-gray-600",children:"Choose how you'd like to create your form"})]}),(0,a.jsx)("div",{className:"space-y-4",children:t.map(e=>(0,a.jsx)("button",{onClick:e.action,className:"w-full bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-sm transition-all group",children:(0,a.jsxs)("div",{className:"flex items-start space-x-5",children:[(0,a.jsx)("div",{className:"".concat(e.color," p-3 rounded-lg"),children:(0,a.jsx)(e.icon,{className:"h-6 w-6"})}),(0,a.jsxs)("div",{className:"flex-1 text-left",children:[(0,a.jsx)("h3",{className:"text-lg font-almarai text-gray-900 group-hover:text-gray-600",children:e.title}),(0,a.jsx)("p",{className:"mt-1 text-sm text-gray-500",children:e.description})]}),(0,a.jsx)("div",{className:"self-center",children:(0,a.jsx)(c.Z,{className:"h-5 w-5 text-gray-400 group-hover:text-gray-600"})})]})},e.id))})]})})}function CreateFormPage(){return(0,a.jsx)(CreateForm,{})}},622:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=r(2265),o=Symbol.for("react.element"),n=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,i=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,r){var a,n={},c=null,d=null;for(a in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)s.call(t,a)&&!l.hasOwnProperty(a)&&(n[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps)void 0===n[a]&&(n[a]=t[a]);return{$$typeof:o,type:e,key:c,ref:d,props:n,_owner:i.current}}t.Fragment=n,t.jsx=q,t.jsxs=q},7437:function(e,t,r){"use strict";e.exports=r(622)},4033:function(e,t,r){e.exports=r(94)}},function(e){e.O(0,[971,472,744],function(){return e(e.s=4135)}),_N_E=e.O()}]);