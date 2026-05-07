import{_ as u}from"./Annotation.vue_vue_type_script_setup_true_lang-DYZFoN3H.js";import{_ as m}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-CmpjLnaq.js";import{o as c,b as d,w as a,g as n,d as e,m as g,C as s,v as f,x as k,z as t}from"./modules/vue-DRD2_753.js";import{_}from"./default.vue_vue_type_script_setup_true_lang-DftnkgPl.js";import{u as b,f as v}from"./slidev/context-COPLPGQp.js";import"./modules/unplugin-icons-dQLyJs9n.js";import"./index-C6x7Btrz.js";import"./modules/shiki-DO-REf4B.js";import"./AmbientBackground-BSEtPDZF.js";const R={class:"g-code-pair"},A={__name:"slides.md__slidev_4",setup(S){const{$clicksContext:r,$frontmatter:o}=b();return r.setup(),(x,l)=>{const p=m,i=u;return c(),d(_,f(k(t(v)(t(o),3))),{default:a(()=>[l[5]||(l[5]=n("div",{class:"gigai-section__label"},"② PARSER",-1)),l[6]||(l[6]=n("h1",null,"Tokens → Abstract Syntax Tree",-1)),l[7]||(l[7]=n("div",{class:"g-cmd"},"swiftc -dump-parse Example.swift",-1)),n("div",R,[e(p,g({},{ranges:[]}),{default:a(()=>[...l[0]||(l[0]=[n("pre",{class:"shiki shiki-themes monokai monokai slidev-code",style:{"--shiki-dark":"#F8F8F2","--shiki-light":"#F8F8F2","--shiki-dark-bg":"#272822","--shiki-light-bg":"#272822"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,'FuncDecl "greet"')]),s(`
`),n("span",{class:"line"},[n("span",null,"├── ParamList")]),s(`
`),n("span",{class:"line"},[n("span",null,'│   └── Param "name" : String')]),s(`
`),n("span",{class:"line"},[n("span",null,"├── ReturnType : String")]),s(`
`),n("span",{class:"line"},[n("span",null,"└── Body")]),s(`
`),n("span",{class:"line"},[n("span",null,'    ├── VarDecl "message"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    │   └── StringInterpolation")]),s(`
`),n("span",{class:"line"},[n("span",null,'    │       ├── StringLiteral "Hello, "')]),s(`
`),n("span",{class:"line"},[n("span",null,'    │       ├── DeclRef "name"')]),s(`
`),n("span",{class:"line"},[n("span",null,'    │       └── StringLiteral "!"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    └── ReturnStmt")]),s(`
`),n("span",{class:"line"},[n("span",null,'        └── DeclRef "message"')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"TopLevelCode")]),s(`
`),n("span",{class:"line"},[n("span",null,'├── VarDecl "result"')]),s(`
`),n("span",{class:"line"},[n("span",null,'│   └── Call "greet"')]),s(`
`),n("span",{class:"line"},[n("span",null,'│       └── Argument "name"')]),s(`
`),n("span",{class:"line"},[n("span",null,'│           └── StringLiteral "Jaba"')]),s(`
`),n("span",{class:"line"},[n("span",null,'└── Call "print"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    └── Argument")]),s(`
`),n("span",{class:"line"},[n("span",null,'        └── DeclRef "result"')])])],-1)])]),_:1},16),n("div",null,[e(i,{label:"STRUCTURE",color:"var(--gigai-blue)"},{default:a(()=>[...l[1]||(l[1]=[s(" Tokens become a tree. Every node has a kind and children. ",-1)])]),_:1}),e(i,{label:"SCOPE",color:"var(--gigai-purple)"},{default:a(()=>[...l[2]||(l[2]=[s(" Function body, parameter list, top-level — boundaries are now explicit. ",-1)])]),_:1}),e(i,{label:"STILL UNTYPED",color:"var(--gigai-yellow)"},{default:a(()=>[...l[3]||(l[3]=[s(" Notice: ",-1),n("code",null,'DeclRef "name"',-1),s(" doesn't yet point to anything. ",-1)])]),_:1}),e(i,{label:"ERRORS HERE",color:"var(--gigai-red)"},{default:a(()=>[...l[4]||(l[4]=[s(" Missing brace? Mis-spelled keyword? Caught at this stage. ",-1)])]),_:1})])])]),_:1},16)}}};export{A as default};
