﻿/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("image2",function(h){function C(){var a=this.getValue().match(D);(a=!(!a||0===parseInt(a[1],10)))||alert(c["invalid"+CKEDITOR.tools.capitalize(this.id)]);return a}function N(){function a(a,c){q.push(b.once(a,function(a){for(var b;b=q.pop();)b.removeListener();c(a)}))}var b=r.createElement("img"),q=[];return function(q,c,e){a("load",function(){var a=E(b);c.call(e,b,a.width,a.height)});a("error",function(){c(null)});a("abort",function(){c(null)});b.setAttribute("src",(w.baseHref||
"")+q+"?"+Math.random().toString(16).substring(2))}}function F(){var a=this.getValue();t(!1);a!==x.data.src?(G(a,function(a,b,c){t(!0);if(!a)return k(!1);f.setValue(!1===h.config.image2_prefillDimensions?0:b);g.setValue(!1===h.config.image2_prefillDimensions?0:c);u=b;v=c;k(H.checkHasNaturalRatio(a))}),l=!0):l?(t(!0),f.setValue(m),g.setValue(n),l=!1):t(!0)}function I(){if(e){var a=this.getValue();if(a&&(a.match(D)||k(!1),"0"!==a)){var b="width"==this.id,c=m||u,d=n||v,a=b?Math.round(a/c*d):Math.round(a/
d*c);isNaN(a)||(b?g:f).setValue(a)}}}function k(a){if(d){if("boolean"==typeof a){if(y)return;e=a}else a=f.getValue(),y=!0,(e=!e)&&a&&(a*=n/m,isNaN(a)||g.setValue(Math.round(a)));d[e?"removeClass":"addClass"]("cke_btn_unlocked");d.setAttribute("aria-checked",e);CKEDITOR.env.hc&&d.getChild(0).setHtml(e?CKEDITOR.env.ie?"■":"▣":CKEDITOR.env.ie?"□":"▢")}}function t(a){a=a?"enable":"disable";f[a]();g[a]()}var D=/(^\s*(\d+)(px)?\s*$)|^$/i,J=CKEDITOR.tools.getNextId(),K=CKEDITOR.tools.getNextId(),b=h.lang.image2,
c=h.lang.common,O=(new CKEDITOR.template('\x3cdiv\x3e\x3ca href\x3d"javascript:void(0)" tabindex\x3d"-1" title\x3d"'+b.lockRatio+'" class\x3d"cke_btn_locked" id\x3d"{lockButtonId}" role\x3d"checkbox"\x3e\x3cspan class\x3d"cke_icon"\x3e\x3c/span\x3e\x3cspan class\x3d"cke_label"\x3e'+b.lockRatio+'\x3c/span\x3e\x3c/a\x3e\x3ca href\x3d"javascript:void(0)" tabindex\x3d"-1" title\x3d"'+b.resetSize+'" class\x3d"cke_btn_reset" id\x3d"{resetButtonId}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3e'+
b.resetSize+"\x3c/span\x3e\x3c/a\x3e\x3c/div\x3e")).output({lockButtonId:J,resetButtonId:K}),H=CKEDITOR.plugins.image2,w=h.config,z=h.widgets.registered.image.features,E=H.getNatural,r,x,L,G,m,n,u,v,l,e,y,d,p,f,g,A,B=!(!w.filebrowserImageBrowseUrl&&!w.filebrowserBrowseUrl),M=[{id:"src",type:"text",label:c.url,onKeyup:F,onChange:F,setup:function(a){this.setValue(a.data.src)},commit:function(a){a.setData("src",this.getValue())},validate:CKEDITOR.dialog.validate.notEmpty(b.urlMissing)}];B&&M.push({type:"button",
id:"browse",style:"display:inline-block;margin-top:14px;",align:"center",label:h.lang.common.browseServer,hidden:!0,filebrowser:"info:src"});return{title:b.title,minWidth:250,minHeight:100,onLoad:function(){r=this._.element.getDocument();G=N()},onShow:function(){x=this.widget;L=x.parts.image;l=y=e=!1;A=E(L);u=m=A.width;v=n=A.height},contents:[{id:"info",label:b.infoTab,elements:[{type:"vbox",padding:0,children:[{type:"hbox",widths:["100%"],children:M}]},{id:"alt",type:"text",label:b.alt,setup:function(a){this.setValue(a.data.alt)},
commit:function(a){a.setData("alt",this.getValue())}},{id:"title",type:"text",label:b.captionPlaceholder,setup:function(a){console.log("widget",a.data);this.setValue(a.data.title)},commit:function(a){console.log("widget",a);a.setData("title",this.getValue())}},{type:"hbox",widths:["25%","25%","50%"],requiredContent:z.dimension.requiredContent,children:[{type:"text",width:"45px",id:"width",label:c.width,validate:C,onKeyUp:I,onLoad:function(){f=this},setup:function(a){this.setValue(a.data.width)},commit:function(a){a.setData("width",
this.getValue())}},{type:"text",id:"height",width:"45px",label:c.height,validate:C,onKeyUp:I,onLoad:function(){g=this},setup:function(a){this.setValue(a.data.height)},commit:function(a){a.setData("height",this.getValue())}},{id:"lock",type:"html",style:"margin-top:18px;width:40px;height:20px;",onLoad:function(){function a(a){a.on("mouseover",function(){this.addClass("cke_btn_over")},a);a.on("mouseout",function(){this.removeClass("cke_btn_over")},a)}var b=this.getDialog();d=r.getById(J);p=r.getById(K);
d&&(b.addFocusable(d,4+B),d.on("click",function(a){k();a.data&&a.data.preventDefault()},this.getDialog()),a(d));p&&(b.addFocusable(p,5+B),p.on("click",function(a){l?(f.setValue(u),g.setValue(v)):(f.setValue(m),g.setValue(n));a.data&&a.data.preventDefault()},this),a(p))},setup:function(a){k(a.data.lock)},commit:function(a){a.setData("lock",e)},html:O}]},{type:"hbox",id:"alignment",requiredContent:z.align.requiredContent,children:[{id:"align",type:"radio",items:[[c.alignNone,"none"],[c.alignLeft,"left"],
[c.alignCenter,"center"],[c.alignRight,"right"]],label:c.align,setup:function(a){this.setValue(a.data.align)},commit:function(a){a.setData("align",this.getValue())}}]},{id:"hasCaption",type:"checkbox",label:b.captioned,requiredContent:z.caption.requiredContent,setup:function(a){this.setValue(a.data.hasCaption)},commit:function(a){a.setData("hasCaption",this.getValue())}}]},{id:"Upload",hidden:!0,filebrowser:"uploadButton",label:b.uploadTab,elements:[{type:"file",id:"upload",label:b.btnUpload,style:"height:40px"},
{type:"fileButton",id:"uploadButton",filebrowser:"info:src",label:b.btnUpload,"for":["Upload","upload"]}]}]}});