import{_ as u}from"./Annotation.vue_vue_type_script_setup_true_lang-DYZFoN3H.js";import{_ as d}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-CmpjLnaq.js";import{o as g,b as c,w as a,g as n,d as e,m,C as l,v as f,x as _,z as t}from"./modules/vue-DRD2_753.js";import{_ as v}from"./default.vue_vue_type_script_setup_true_lang-DftnkgPl.js";import{u as S,f as b}from"./slidev/context-COPLPGQp.js";import"./modules/unplugin-icons-dQLyJs9n.js";import"./index-C6x7Btrz.js";import"./modules/shiki-DO-REf4B.js";import"./AmbientBackground-BSEtPDZF.js";const k={class:"g-code-pair"},N={__name:"slides.md__slidev_6",setup(y){const{$clicksContext:p,$frontmatter:o}=S();return p.setup(),(I,s)=>{const r=d,i=u;return g(),c(v,f(_(t(b)(t(o),5))),{default:a(()=>[s[5]||(s[5]=n("div",{class:"gigai-section__label"},"④ SILGen · Raw SIL",-1)),s[6]||(s[6]=n("h1",null,"Typed AST → Swift Intermediate Language",-1)),s[7]||(s[7]=n("div",{class:"g-cmd"},"swiftc -emit-silgen Example.swift -o Example.silgen",-1)),n("div",k,[e(r,m({},{ranges:[]}),{default:a(()=>[...s[0]||(s[0]=[n("pre",{class:"shiki shiki-themes monokai monokai slidev-code",style:{"--shiki-dark":"#F8F8F2","--shiki-light":"#F8F8F2","--shiki-dark-bg":"#272822","--shiki-light-bg":"#272822"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"sil hidden [ossa] @greet : $@convention(thin)")]),l(`
`),n("span",{class:"line"},[n("span",null,"            (@guaranteed String) -> @owned String {")]),l(`
`),n("span",{class:"line"},[n("span",null,"bb0(%0 : @guaranteed $String):")]),l(`
`),n("span",{class:"line"},[n("span",null,'  debug_value %0 : $String, let, name "name"')]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // String interpolation begins")]),l(`
`),n("span",{class:"line"},[n("span",null,"  %1 = metatype $@thin String.Type")]),l(`
`),n("span",{class:"line"},[n("span",null,"  %2 = function_ref @StringInterpolation.init : ...")]),l(`
`),n("span",{class:"line"},[n("span",null,"  %3 = apply %2(%1) : ...")]),l(`
`),n("span",{class:"line"},[n("span",null,'  %4 = string_literal utf8 "Hello, "')]),l(`
`),n("span",{class:"line"},[n("span",null,"  %5 = apply %appendLiteral(%4, %3)")]),l(`
`),n("span",{class:"line"},[n("span",null,"  %6 = apply %appendInterpolation(%0, %3)")]),l(`
`),n("span",{class:"line"},[n("span",null,'  %7 = string_literal utf8 "!"')]),l(`
`),n("span",{class:"line"},[n("span",null,"  %8 = apply %appendLiteral(%7, %3)")]),l(`
`),n("span",{class:"line"},[n("span")]),l(`
`),n("span",{class:"line"},[n("span",null,"  // Return")]),l(`
`),n("span",{class:"line"},[n("span",null,"  %9 = apply %String.init(stringInterpolation:)(%3)")]),l(`
`),n("span",{class:"line"},[n("span",null,"  %10 = copy_value %9 : $String")]),l(`
`),n("span",{class:"line"},[n("span",null,"  return %10 : $String")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])],-1)])]),_:1},16),n("div",null,[e(i,{label:"EXPLICIT MEMORY",color:"var(--gigai-accent)"},{default:a(()=>[...s[1]||(s[1]=[l(" Every ",-1),n("code",null,"copy_value",-1),l(" / ",-1),n("code",null,"destroy_value",-1),l(" is now visible. ",-1)])]),_:1}),e(i,{label:"INTERPOLATION DECOMPOSED",color:"var(--gigai-blue)"},{default:a(()=>[...s[2]||(s[2]=[n("code",null,'"Hello, \\(name)!"',-1),l(" → ",-1),n("code",null,"init",-1),l(" + ",-1),n("code",null,"append",-1),l(" × 3. ",-1)])]),_:1}),e(i,{label:"SWIFT-AWARE",color:"var(--gigai-purple)"},{default:a(()=>[...s[3]||(s[3]=[l(" SIL still understands generics, ownership, and protocols. ",-1)])]),_:1}),e(i,{label:"3 LINES → 20+",color:"var(--gigai-yellow)"},{default:a(()=>[...s[4]||(s[4]=[l(" Each high-level construct exploded into primitives. ",-1)])]),_:1})])])]),_:1},16)}}};export{N as default};
