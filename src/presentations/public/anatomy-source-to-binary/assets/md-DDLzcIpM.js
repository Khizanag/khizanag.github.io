import{_ as c}from"./Annotation.vue_vue_type_script_setup_true_lang-DYZFoN3H.js";import{_ as d}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-CmpjLnaq.js";import{o as u,b as m,w as a,g as s,d as e,m as f,C as l,v as _,x as g,z as t}from"./modules/vue-DRD2_753.js";import{_ as x}from"./default.vue_vue_type_script_setup_true_lang-DftnkgPl.js";import{u as b,f as k}from"./slidev/context-COPLPGQp.js";import"./modules/unplugin-icons-dQLyJs9n.js";import"./index-C6x7Btrz.js";import"./modules/shiki-DO-REf4B.js";import"./AmbientBackground-BSEtPDZF.js";const v={class:"g-code-pair"},y={__name:"slides.md__slidev_10",setup(S){const{$clicksContext:o,$frontmatter:p}=b();return o.setup(),(E,n)=>{const r=d,i=c;return u(),m(x,_(g(t(k)(t(p),9))),{default:a(()=>[n[5]||(n[5]=s("div",{class:"gigai-section__label"},"⑧ BACKEND · ARM64",-1)),n[6]||(n[6]=s("h1",null,"IR → Machine code",-1)),n[7]||(n[7]=s("div",{class:"g-cmd"},"swiftc -emit-assembly Example.swift -o Example.s",-1)),s("div",v,[e(r,f({},{ranges:[]}),{default:a(()=>[...n[0]||(n[0]=[s("pre",{class:"shiki shiki-themes monokai monokai slidev-code",style:{"--shiki-dark":"#F8F8F2","--shiki-light":"#F8F8F2","--shiki-dark-bg":"#272822","--shiki-light-bg":"#272822"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"_$s7Example5greet4nameS2S_tF:")]),l(`
`),s("span",{class:"line"},[s("span",null,"    .cfi_startproc")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"    sub   sp, sp, #128                    ; reserve stack")]),l(`
`),s("span",{class:"line"},[s("span",null,"    stp   x29, x30, [sp, #112]            ; save frame ptr + LR")]),l(`
`),s("span",{class:"line"},[s("span",null,"    add   x29, sp, #112")]),l(`
`),s("span",{class:"line"},[s("span",null,"    .cfi_def_cfa w29, 16")]),l(`
`),s("span",{class:"line"},[s("span",null,"    .cfi_offset w30, -8")]),l(`
`),s("span",{class:"line"},[s("span",null,"    .cfi_offset w29, -16")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,'    adrp  x0, l_.str.Hello@PAGE           ; load "Hello, "')]),l(`
`),s("span",{class:"line"},[s("span",null,"    add   x0, x0, l_.str.Hello@PAGEOFF")]),l(`
`),s("span",{class:"line"},[s("span",null,"    bl    _$sSS21_builtinStringLiteral... ; call String.init")]),l(`
`),s("span",{class:"line"},[s("span",null,"    bl    _$ss26DefaultStringInterp...    ; build interpolation")]),l(`
`),s("span",{class:"line"},[s("span",null,"    bl    _swift_bridgeObjectRelease      ; ARC release")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ldp   x29, x30, [sp, #112]")]),l(`
`),s("span",{class:"line"},[s("span",null,"    add   sp, sp, #128")]),l(`
`),s("span",{class:"line"},[s("span",null,"    ret")])])],-1)])]),_:1},16),s("div",null,[e(i,{label:"REGISTERS",color:"var(--gigai-accent)"},{default:a(()=>[...n[1]||(n[1]=[s("code",null,"x0",-1),l("–",-1),s("code",null,"x30",-1),l(" — ARM64's general-purpose registers. ",-1)])]),_:1}),e(i,{label:"PROLOGUE / EPILOGUE",color:"var(--gigai-blue)"},{default:a(()=>[...n[2]||(n[2]=[l(" Stack reserved on entry, restored on exit. Same on every CPU. ",-1)])]),_:1}),e(i,{label:"CALLS",color:"var(--gigai-purple)"},{default:a(()=>[...n[3]||(n[3]=[s("code",null,"bl",-1),l(" = branch with link. The CPU's call instruction. ",-1)])]),_:1}),e(i,{label:"THIS RUNS ON YOUR PHONE",color:"var(--gigai-yellow)"},{default:a(()=>[...n[4]||(n[4]=[l(" Every iPhone since 5s speaks ARM64. ",-1)])]),_:1})])])]),_:1},16)}}};export{y as default};
