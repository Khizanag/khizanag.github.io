import{p as J}from"./chunk-WASTHULE-BRf5bfGg.js";import{p as K}from"./wardley-RL74JXVD-T2LBEBUU-BXx20xgz.js";import{g as Q,s as Y,a as tt,b as et,t as at,q as it,_ as s,l as w,c as rt,H as st,a7 as ot,a8 as lt,a9 as G,aa as nt,e as ct,A as pt,ab as dt,I as gt}from"./md-xhjiR4rl.js";import"./chunk-MFRUYFWM-Clad2tEQ.js";import"./index-C6x7Btrz.js";import"./modules/vue-DRD2_753.js";import"./modules/shiki-DO-REf4B.js";import"./slidev/context-COPLPGQp.js";import"./lz-string-BtiCaQGM.js";import"./modules/file-saver-B8IIMB9x.js";import"./default.vue_vue_type_script_setup_true_lang-DftnkgPl.js";import"./AmbientBackground-BSEtPDZF.js";var ht=gt.pie,C={sections:new Map,showData:!1},u=C.sections,D=C.showData,ut=structuredClone(ht),ft=s(()=>structuredClone(ut),"getConfig"),mt=s(()=>{u=new Map,D=C.showData,pt()},"clear"),vt=s(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);u.has(t)||(u.set(t,a),w.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),xt=s(()=>u,"getSections"),St=s(t=>{D=t},"setShowData"),wt=s(()=>D,"getShowData"),L={getConfig:ft,clear:mt,setDiagramTitle:it,getDiagramTitle:at,setAccTitle:et,getAccTitle:tt,setAccDescription:Y,getAccDescription:Q,addSection:vt,getSections:xt,setShowData:St,getShowData:wt},Ct=s((t,a)=>{J(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),Dt={parse:s(async t=>{const a=await K("pie",t);w.debug(a),Ct(a,L)},"parse")},$t=s(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),yt=$t,Tt=s(t=>{const a=[...t.values()].reduce((r,l)=>r+l,0),$=[...t.entries()].map(([r,l])=>({label:r,value:l})).filter(r=>r.value/a*100>=1);return dt().value(r=>r.value).sort(null)($)},"createPieArcs"),At=s((t,a,$,y)=>{var F;w.debug(`rendering pie chart
`+t);const r=y.db,l=rt(),T=st(r.getConfig(),l.pie),A=40,o=18,d=4,c=450,p=c,f=ot(a),n=f.append("g");n.attr("transform","translate("+p/2+","+c/2+")");const{themeVariables:i}=l;let[_]=lt(i.pieOuterStrokeWidth);_??(_=2);const b=T.textPosition,g=Math.min(p,c)/2-A,B=G().innerRadius(0).outerRadius(g),I=G().innerRadius(g*b).outerRadius(g*b);n.append("circle").attr("cx",0).attr("cy",0).attr("r",g+_/2).attr("class","pieOuterCircle");const h=r.getSections(),O=Tt(h),P=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let m=0;h.forEach(e=>{m+=e});const E=O.filter(e=>(e.data.value/m*100).toFixed(0)!=="0"),v=nt(P).domain([...h.keys()]);n.selectAll("mySlices").data(E).enter().append("path").attr("d",B).attr("fill",e=>v(e.data.label)).attr("class","pieCircle"),n.selectAll("mySlices").data(E).enter().append("text").text(e=>(e.data.value/m*100).toFixed(0)+"%").attr("transform",e=>"translate("+I.centroid(e)+")").style("text-anchor","middle").attr("class","slice");const N=n.append("text").text(r.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText"),k=[...h.entries()].map(([e,S])=>({label:e,value:S})),x=n.selectAll(".legend").data(k).enter().append("g").attr("class","legend").attr("transform",(e,S)=>{const M=o+d,X=M*k.length/2,Z=12*o,j=S*M-X;return"translate("+Z+","+j+")"});x.append("rect").attr("width",o).attr("height",o).style("fill",e=>v(e.label)).style("stroke",e=>v(e.label)),x.append("text").attr("x",o+d).attr("y",o-d).text(e=>r.getShowData()?`${e.label} [${e.value}]`:e.label);const U=Math.max(...x.selectAll("text").nodes().map(e=>(e==null?void 0:e.getBoundingClientRect().width)??0)),q=p+A+o+d+U,R=((F=N.node())==null?void 0:F.getBoundingClientRect().width)??0,H=p/2-R/2,V=p/2+R/2,W=Math.min(0,H),z=Math.max(q,V)-W;f.attr("viewBox",`${W} 0 ${z} ${c}`),ct(f,c,z,T.useMaxWidth)},"draw"),_t={draw:At},Pt={parser:Dt,db:L,renderer:_t,styles:yt};export{Pt as diagram};
