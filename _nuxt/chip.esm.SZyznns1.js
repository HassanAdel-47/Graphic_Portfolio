import{s as d}from"./index.esm.NiJ7m59I.js";import{s as u}from"./basecomponent.esm.xp6j4p3g.js";import{B as h}from"./entry.164Dl0LZ.js";import{J as i,L as a,af as t,C as r,N as c,R as p,a3 as l,X as v}from"./swiper-vue.qz64L6YE.js";import"./baseicon.esm.duyCQ9y0.js";var y=`
@layer primevue {
    .p-chip {
        display: inline-flex;
        align-items: center;
    }

    .p-chip-text {
        line-height: 1.5;
    }

    .p-chip-icon.pi {
        line-height: 1.5;
    }

    .p-chip-remove-icon {
        line-height: 1.5;
        cursor: pointer;
    }

    .p-chip img {
        border-radius: 50%;
    }
}
`,f={root:function(n){var s=n.props;return["p-chip p-component",{"p-chip-image":s.image!=null}]},icon:"p-chip-icon",label:"p-chip-text",removeIcon:"p-chip-remove-icon"},b=h.extend({name:"chip",css:y,classes:f}),g={name:"BaseChip",extends:u,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},removable:{type:Boolean,default:!1},removeIcon:{type:String,default:void 0}},style:b,provide:function(){return{$parentInstance:this}}},k={name:"Chip",extends:g,emits:["remove"],data:function(){return{visible:!0}},methods:{onKeydown:function(n){(n.key==="Enter"||n.key==="Backspace")&&this.close(n)},close:function(n){this.visible=!1,this.$emit("remove",n)}},components:{TimesCircleIcon:d}},C=["aria-label"],w=["src"];function I(e,n,s,B,m,o){return m.visible?(i(),a("div",r({key:0,class:e.cx("root"),"aria-label":e.label},e.ptm("root"),{"data-pc-name":"chip"}),[t(e.$slots,"default",{},function(){return[e.image?(i(),a("img",r({key:0,src:e.image},e.ptm("image")),null,16,w)):e.$slots.icon?(i(),c(p(e.$slots.icon),r({key:1,class:e.cx("icon")},e.ptm("icon")),null,16,["class"])):e.icon?(i(),a("span",r({key:2,class:[e.cx("icon"),e.icon]},e.ptm("icon")),null,16)):l("",!0),e.label?(i(),a("div",r({key:3,class:e.cx("label")},e.ptm("label")),v(e.label),17)):l("",!0)]}),e.removable?t(e.$slots,"removeicon",{key:0,onClick:o.close,onKeydown:o.onKeydown,removeCallback:o.close,keydownCallback:o.onKeydown},function(){return[(i(),c(p(e.removeIcon?"span":"TimesCircleIcon"),r({tabindex:"0",class:[e.cx("removeIcon"),e.removeIcon],onClick:o.close,onKeydown:o.onKeydown},e.ptm("removeIcon")),null,16,["class","onClick","onKeydown"]))]}):l("",!0)],16,C)):l("",!0)}k.render=I;export{k as default};
