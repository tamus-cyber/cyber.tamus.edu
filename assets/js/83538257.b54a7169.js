"use strict";(self.webpackChunkstandards_cyber_tamus_edu=self.webpackChunkstandards_cyber_tamus_edu||[]).push([[6958],{3104:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var s=t(74848),i=t(28453);const r={custom_edit_url:"https://github.com/tamus-cyber/standards.cyber.tamus.edu/tree/main/static/content/tamus.edu/TAMUS_profile.xml",toc_min_heading_level:2,toc_max_heading_level:2,title:"SI-14 Non-persistence",description:""},o="SI-14 Non-persistence {#si-14}",a={id:"catalog/si/si-14",title:"SI-14 Non-persistence",description:"",source:"@site/docs/catalog/si/si-14.md",sourceDirName:"catalog/si",slug:"/catalog/si/si-14",permalink:"/catalog/si/si-14",draft:!1,unlisted:!1,editUrl:"https://github.com/tamus-cyber/standards.cyber.tamus.edu/tree/main/static/content/tamus.edu/TAMUS_profile.xml",tags:[],version:"current",frontMatter:{custom_edit_url:"https://github.com/tamus-cyber/standards.cyber.tamus.edu/tree/main/static/content/tamus.edu/TAMUS_profile.xml",toc_min_heading_level:2,toc_max_heading_level:2,title:"SI-14 Non-persistence",description:""},sidebar:"catalogSidebar",previous:{title:"SI-13 Predictable Failure Prevention",permalink:"/catalog/si/si-13"},next:{title:"SI-15 Information Output Filtering",permalink:"/catalog/si/si-15"}},c={},l=[{value:"Control",id:"control",level:3},{value:"SI-14(1) Refresh from Trusted Sources",id:"si-14.01",level:2},{value:"Control",id:"control-1",level:3},{value:"SI-14(2) Non-persistent Information",id:"si-14.02",level:2},{value:"Control",id:"control-2",level:3},{value:"SI-14(3) Non-persistent Connectivity",id:"si-14.03",level:2},{value:"Control",id:"control-3",level:3}];function d(e){const n={br:"br",em:"em",h1:"h1",h2:"h2",h3:"h3",p:"p",strong:"strong",...(0,i.R)(),...e.components},{Details:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"si-14",children:"SI-14 Non-persistence"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.em,{children:(0,s.jsx)(n.strong,{children:"Implementation Level"})}),": Organization",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.em,{children:(0,s.jsx)(n.strong,{children:"Contributes to Assurance"})}),": Yes"]}),"\n",(0,s.jsx)(n.h3,{id:"control",children:"Control"}),"\n",(0,s.jsxs)(n.p,{children:["Implement non-persistent ",(0,s.jsxs)("strong",{children:["                  ",(0,s.jsx)("em",{children:"[Assignment: system components and services]"}),"               "]})," that are initiated in a known state and terminated ",(0,s.jsxs)("strong",{children:["                  ",(0,s.jsxs)("em",{children:["[Selection (one or more): upon end of session of use;                   ",(0,s.jsxs)("strong",{children:["                        ",(0,s.jsx)("em",{children:"[Assignment: frequency]"}),"                     "]}),"               ]"]}),"               "]}),"."]}),"\n",(0,s.jsxs)(t,{children:[(0,s.jsx)("summary",{children:"Supplemental Guidance"}),(0,s.jsx)(n.p,{children:"Implementation of non-persistent components and services mitigates risk from advanced persistent threats (APTs) by reducing the targeting capability of adversaries (i.e., window of opportunity and available attack surface) to initiate and complete attacks. By implementing the concept of non-persistence for selected system components, organizations can provide a trusted, known state computing resource for a specific time period that does not give adversaries sufficient time to exploit vulnerabilities in organizational systems or operating environments. Since the APT is a high-end, sophisticated threat with regard to capability, intent, and targeting, organizations assume that over an extended period, a percentage of attacks will be successful. Non-persistent system components and services are activated as required using protected information and terminated periodically or at the end of sessions. Non-persistence increases the work factor of adversaries attempting to compromise or breach organizational systems."})]}),"\n",(0,s.jsx)(n.h2,{id:"si-14.01",children:"SI-14(1) Refresh from Trusted Sources"}),"\n",(0,s.jsx)(n.h3,{id:"control-1",children:"Control"}),"\n",(0,s.jsxs)(n.p,{children:["Obtain software and data employed during system component and service refreshes from the following trusted sources: ",(0,s.jsxs)("strong",{children:["                     ",(0,s.jsx)("em",{children:"[Assignment: trusted sources]"}),"                  "]}),"."]}),"\n",(0,s.jsxs)(t,{children:[(0,s.jsx)("summary",{children:"Supplemental Guidance"}),(0,s.jsx)(n.p,{children:"Trusted sources include software and data from write-once, read-only media or from selected offline secure storage facilities."})]}),"\n",(0,s.jsx)(n.h2,{id:"si-14.02",children:"SI-14(2) Non-persistent Information"}),"\n",(0,s.jsx)(n.h3,{id:"control-2",children:"Control"}),"\n",(0,s.jsxs)(n.p,{children:["(a)                      ",(0,s.jsxs)("strong",{children:["                        ",(0,s.jsxs)("em",{children:["[Selection: refresh ",(0,s.jsxs)("strong",{children:["                              ",(0,s.jsx)("em",{children:"[Assignment: information]"}),"                           "]}),"                           ",(0,s.jsxs)("strong",{children:["                              ",(0,s.jsx)("em",{children:"[Assignment: frequency]"}),"                           "]}),"                  ; generate ",(0,s.jsxs)("strong",{children:["                              ",(0,s.jsx)("em",{children:"[Assignment: information]"}),"                           "]})," on demand]"]}),"                     "]})," ; and"]}),"\n",(0,s.jsx)(n.p,{children:"(b) Delete information when no longer needed."}),"\n",(0,s.jsxs)(t,{children:[(0,s.jsx)("summary",{children:"Supplemental Guidance"}),(0,s.jsx)(n.p,{children:"Retaining information longer than is needed makes the information a potential target for advanced adversaries searching for high value assets to compromise through unauthorized disclosure, unauthorized modification, or exfiltration. For system-related information, unnecessary retention provides advanced adversaries information that can assist in their reconnaissance and lateral movement through the system."})]}),"\n",(0,s.jsx)(n.h2,{id:"si-14.03",children:"SI-14(3) Non-persistent Connectivity"}),"\n",(0,s.jsx)(n.h3,{id:"control-3",children:"Control"}),"\n",(0,s.jsxs)(n.p,{children:["Establish connections to the system on demand and terminate connections after ",(0,s.jsxs)("strong",{children:["                     ",(0,s.jsx)("em",{children:"[Selection: completion of a request; a period of non-use]"}),"                  "]}),"."]}),"\n",(0,s.jsxs)(t,{children:[(0,s.jsx)("summary",{children:"Supplemental Guidance"}),(0,s.jsx)(n.p,{children:"Persistent connections to systems can provide advanced adversaries with paths to move laterally through systems and potentially position themselves closer to high value assets. Limiting the availability of such connections impedes the adversary\u2019s ability to move freely through organizational systems."})]})]})}function m(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var s=t(96540);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);