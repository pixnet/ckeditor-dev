﻿/*
 Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("image2",function(k){function C(){var a=this.getValue().match(D);(a=!(!a||0===parseInt(a[1],10)))||alert(c["invalid"+CKEDITOR.tools.capitalize(this.id)]);return a}function O(){function a(a,b){d.push(l.once(a,function(a){for(var l;l=d.pop();)l.removeListener();b(a)}))}var l=t.createElement("img"),d=[];return function(d,b,c){a("load",function(){var a=E(l);b.call(c,l,a.width,a.height)});a("error",function(){b(null)});a("abort",function(){b(null)});l.setAttribute("src",(x.baseHref||
"")+d+"?"+Math.random().toString(16).substring(2))}}function F(){var a=this.getValue();u(!1);a!==y.data.src?(G(a,function(a,d,b){u(!0);if(!a)return m(!1);g.setValue(!1===k.config.image2_prefillDimensions?0:d);h.setValue(!1===k.config.image2_prefillDimensions?0:b);v=d;w=b;m(H.checkHasNaturalRatio(a))}),n=!0):n?(u(!0),g.setValue(p),h.setValue(q),n=!1):u(!0)}function I(){if(e){var a=this.getValue();if(a&&(a.match(D)||m(!1),"0"!==a)){var b="width"==this.id,d=p||v,c=q||w,a=b?Math.round(a/d*c):Math.round(a/
c*d);isNaN(a)||(b?h:g).setValue(a)}}}function m(a){if(f){if("boolean"==typeof a){if(z)return;e=a}else a=g.getValue(),z=!0,(e=!e)&&a&&(a*=q/p,isNaN(a)||h.setValue(Math.round(a)));f[e?"removeClass":"addClass"]("cke_btn_unlocked");f.setAttribute("aria-checked",e);CKEDITOR.env.hc&&f.getChild(0).setHtml(e?CKEDITOR.env.ie?"■":"▣":CKEDITOR.env.ie?"□":"▢")}}function u(a){a=a?"enable":"disable";g[a]();h[a]()}var D=/(^\s*(\d+)(px)?\s*$)|^$/i,J=CKEDITOR.tools.getNextId(),K=CKEDITOR.tools.getNextId(),b=k.lang.image2,
c=k.lang.common,P=(new CKEDITOR.template('\x3cdiv\x3e\x3ca href\x3d"javascript:void(0)" tabindex\x3d"-1" title\x3d"'+b.lockRatio+'" class\x3d"cke_btn_locked" id\x3d"{lockButtonId}" role\x3d"checkbox"\x3e\x3cspan class\x3d"cke_icon"\x3e\x3c/span\x3e\x3cspan class\x3d"cke_label"\x3e'+b.lockRatio+'\x3c/span\x3e\x3c/a\x3e\x3ca href\x3d"javascript:void(0)" tabindex\x3d"-1" title\x3d"'+b.resetSize+'" class\x3d"cke_btn_reset" id\x3d"{resetButtonId}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3e'+
b.resetSize+"\x3c/span\x3e\x3c/a\x3e\x3c/div\x3e")).output({lockButtonId:J,resetButtonId:K}),H=CKEDITOR.plugins.image2,x=k.config,L=k.widgets.registered.image.features,E=H.getNatural,t,y,M,G,p,q,v,w,n,e,z,f,r,g,h,A,B=!(!x.filebrowserImageBrowseUrl&&!x.filebrowserBrowseUrl),N=[{id:"src",type:"text",label:c.url,onKeyup:F,onChange:F,setup:function(a){this.setValue(a.data.src)},commit:function(a){a.setData("src",this.getValue())},validate:CKEDITOR.dialog.validate.notEmpty(b.urlMissing)}];B&&N.push({type:"button",
id:"browse",style:"display:inline-block;margin-top:14px;",align:"center",label:k.lang.common.browseServer,hidden:!0,filebrowser:"info:src"});return{title:b.title,minWidth:250,minHeight:100,onLoad:function(){t=this._.element.getDocument();G=O()},onShow:function(){y=this.widget;M=y.parts.image;n=z=e=!1;A=E(M);v=p=A.width;w=q=A.height},contents:[{id:"info",label:b.infoTab,elements:[{type:"vbox",padding:0,children:[{type:"hbox",widths:["100%"],children:N}]},{id:"alt",type:"text",label:b.alt,setup:function(a){this.setValue(a.data.alt)},
commit:function(a){a.setData("alt",this.getValue())}},{id:"title",type:"text",label:b.captionPlaceholder,setup:function(a){this.setValue(a.data.title)},commit:function(a){a.setData("title",this.getValue())}},{type:"hbox",widths:["25%","25%","50%"],requiredContent:L.dimension.requiredContent,children:[{type:"text",width:"45px",id:"width",label:c.width,validate:C,onKeyUp:I,onLoad:function(){g=this},setup:function(a){this.setValue(a.data.width)},commit:function(a){a.setData("width",this.getValue())}},
{type:"text",id:"height",width:"45px",label:c.height,validate:C,onKeyUp:I,onLoad:function(){h=this},setup:function(a){this.setValue(a.data.height)},commit:function(a){a.setData("height",this.getValue())}},{id:"lock",type:"html",style:"margin-top:18px;width:40px;height:20px;",onLoad:function(){function a(a){a.on("mouseover",function(){this.addClass("cke_btn_over")},a);a.on("mouseout",function(){this.removeClass("cke_btn_over")},a)}var b=this.getDialog();f=t.getById(J);r=t.getById(K);f&&(b.addFocusable(f,
4+B),f.on("click",function(a){m();a.data&&a.data.preventDefault()},this.getDialog()),a(f));r&&(b.addFocusable(r,5+B),r.on("click",function(a){n?(g.setValue(v),h.setValue(w)):(g.setValue(p),h.setValue(q));a.data&&a.data.preventDefault()},this),a(r))},setup:function(a){m(a.data.lock)},commit:function(a){a.setData("lock",e)},html:P}]},{type:"hbox",id:"alignment",requiredContent:L.align.requiredContent,children:[{id:"align",type:"radio",items:[[c.alignNone,"none"],[c.alignLeft,"left"],[c.alignCenter,
"center"],[c.alignRight,"right"]],label:c.align,setup:function(a){this.setValue(a.data.align)},commit:function(a){a.setData("align",this.getValue())}}]}]},{id:"Upload",hidden:!0,filebrowser:"uploadButton",label:b.uploadTab,elements:[{type:"file",id:"upload",label:b.btnUpload,style:"height:40px"},{type:"fileButton",id:"uploadButton",filebrowser:"info:src",label:b.btnUpload,"for":["Upload","upload"]}]}]}});