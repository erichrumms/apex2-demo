import { useState } from "react";

/* ============================================================
   LEIDOS APEX 2.0 — Adaptive Program Execution System
   Executive light mode · Playfair Display + DM Sans
   Navy / White / Leidos Red · Leadership demo
   ============================================================ */

const S = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --n9:#0B1C3D;--n7:#163060;--n6:#1D3E7A;--n4:#2E5FA3;--n2:#C8D9F0;--n1:#E8EFF9;--n0:#F4F7FC;
  --red:#CC2027;--redL:#FFF0F0;--gld:#B87A1A;--gldL:#FFF8EC;--grn:#1A7A4A;--grnL:#E8F5EE;
  --w:#fff;--g50:#F8F9FB;--g100:#EEF0F4;--g200:#DDE1E9;--g300:#BCC3D0;--g500:#6B7A96;--g700:#3D4B63;--g900:#1A2235;
  --s1:0 1px 3px rgba(11,28,61,.08);--s2:0 4px 12px rgba(11,28,61,.10);--sXL:0 24px 56px rgba(11,28,61,.18);
  --r4:4px;--r8:8px;--r12:12px;--r16:16px;
  --fd:'Playfair Display',Georgia,serif;--fb:'DM Sans',sans-serif;--fm:'DM Mono',monospace;
}
html{font-size:15px}body{background:var(--g50);color:var(--g900);font-family:var(--fb);line-height:1.6;-webkit-font-smoothing:antialiased}
.app{display:flex;min-height:100vh}
/* SIDEBAR */
.sb{width:244px;min-height:100vh;background:var(--n9);display:flex;flex-direction:column;position:fixed;top:0;left:0;z-index:100;box-shadow:2px 0 20px rgba(11,28,61,.35)}
.sb-brand{padding:26px 22px 20px;border-bottom:1px solid rgba(255,255,255,.07)}
.sb-apex{font-family:var(--fd);font-size:23px;font-weight:700;color:#fff;letter-spacing:-.02em}.sb-apex span{color:#E8365D}
.sb-tag{font-size:9px;color:rgba(255,255,255,.35);letter-spacing:.14em;text-transform:uppercase;margin-top:3px;font-family:var(--fm)}
.sb-pill{display:inline-block;margin-top:9px;font-size:9px;font-family:var(--fm);background:rgba(204,32,39,.18);color:#FF9DA0;border:1px solid rgba(204,32,39,.28);border-radius:3px;padding:2px 8px;letter-spacing:.07em;text-transform:uppercase}
.sb-nav{flex:1;padding:14px 0;overflow-y:auto}
.sb-sec{padding:13px 22px 5px;font-size:9px;color:rgba(255,255,255,.25);letter-spacing:.18em;text-transform:uppercase;font-family:var(--fm)}
.ni{display:flex;align-items:center;gap:10px;padding:8px 22px;cursor:pointer;font-size:13px;color:rgba(255,255,255,.5);transition:all .15s;border-left:2px solid transparent;user-select:none}
.ni:hover{background:rgba(255,255,255,.05);color:rgba(255,255,255,.82)}.ni.on{background:rgba(204,32,39,.11);color:#FFA0A3;border-left-color:#E8365D;font-weight:500}
.ni-ico{font-size:14px;width:18px;text-align:center;opacity:.8}.ni-bdg{margin-left:auto;font-size:10px;font-family:var(--fm);background:rgba(204,32,39,.22);color:#FFA0A3;border-radius:10px;padding:1px 7px;font-weight:600}
.sb-user{padding:14px 20px;border-top:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:10px}
.av{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--n7),var(--n4));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
.un{font-size:12px;color:rgba(255,255,255,.72);font-weight:500}.ur{font-size:10px;color:rgba(255,255,255,.32);font-family:var(--fm)}
/* MAIN */
.main{margin-left:244px;flex:1;display:flex;flex-direction:column}
.tb{height:54px;background:var(--w);border-bottom:1px solid var(--g200);display:flex;align-items:center;justify-content:space-between;padding:0 30px;position:sticky;top:0;z-index:50;box-shadow:var(--s1)}
.tb-bc{font-size:12px;color:var(--g500);font-family:var(--fm);display:flex;align-items:center;gap:5px}.tb-bc span{color:var(--g900);font-weight:500}
.tb-r{display:flex;align-items:center;gap:10px}
.pill{font-size:11px;font-family:var(--fm);font-weight:500;padding:4px 10px;border-radius:20px;display:flex;align-items:center;gap:5px}
.pill.live{background:var(--grnL);color:var(--grn);border:1px solid rgba(26,122,74,.2)}.pill.cui{background:var(--n1);color:var(--n6);border:1px solid var(--n2)}
.dot{width:6px;height:6px;border-radius:50%;background:currentColor;animation:pulse 2s infinite}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
/* PAGE */
.pg{padding:30px;max-width:1440px;animation:fi .28s ease}@keyframes fi{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
.ph{margin-bottom:26px}
.pe{font-size:10px;font-family:var(--fm);font-weight:500;color:var(--red);letter-spacing:.14em;text-transform:uppercase;margin-bottom:5px}
.pt{font-family:var(--fd);font-size:25px;font-weight:600;color:var(--n9);letter-spacing:-.02em;line-height:1.2}
.ps{font-size:14px;color:var(--g500);margin-top:5px}
.pm{display:flex;align-items:center;gap:14px;margin-top:10px;font-size:11px;color:var(--g500);font-family:var(--fm)}
/* CARDS */
.card{background:var(--w);border:1px solid var(--g200);border-radius:var(--r12);box-shadow:var(--s1);transition:box-shadow .18s}.card:hover{box-shadow:var(--s2)}
.ch{padding:16px 20px;border-bottom:1px solid var(--g100);display:flex;align-items:center;justify-content:space-between}
.ct{font-size:11px;font-family:var(--fm);font-weight:500;color:var(--g500);letter-spacing:.07em;text-transform:uppercase}
.cb{padding:20px}
/* STAT CARDS */
.sc{background:var(--w);border:1px solid var(--g200);border-radius:var(--r12);padding:20px 22px;box-shadow:var(--s1);position:relative;overflow:hidden}
.sc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px}
.sc.nv::before{background:var(--n6)}.sc.rd::before{background:var(--red)}.sc.gn::before{background:var(--grn)}.sc.gd::before{background:var(--gld)}
.sn{font-family:var(--fd);font-size:34px;font-weight:700;color:var(--n9);letter-spacing:-.03em;line-height:1}
.sl{font-size:12px;color:var(--g500);margin-top:5px;font-weight:500}
.sd{font-size:11px;margin-top:9px;font-family:var(--fm);display:flex;align-items:center;gap:4px}
.sd.pos{color:var(--grn)}.sd.neg{color:var(--red)}.sd.neu{color:var(--g500)}
/* GRIDS */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.mb4{margin-bottom:16px}.mb6{margin-bottom:24px}.mt4{margin-top:16px}
/* BADGES */
.bdg{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:4px;font-size:10px;font-family:var(--fm);font-weight:600;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap}
.bdg.gn{background:var(--grnL);color:var(--grn);border:1px solid rgba(26,122,74,.2)}
.bdg.rd{background:var(--redL);color:var(--red);border:1px solid rgba(204,32,39,.2)}
.bdg.gd{background:var(--gldL);color:var(--gld);border:1px solid rgba(184,122,26,.22)}
.bdg.nv{background:var(--n1);color:var(--n6);border:1px solid var(--n2)}
.bdg.gr{background:var(--g100);color:var(--g700);border:1px solid var(--g200)}
/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--r4);font-family:var(--fb);font-size:13px;font-weight:500;cursor:pointer;transition:all .14s;border:1px solid transparent;white-space:nowrap}
.bp{background:var(--red);color:#fff;border:none}.bp:hover{background:#B01C22;box-shadow:0 2px 8px rgba(204,32,39,.3)}
.bn{background:var(--n9);color:#fff;border:none}.bn:hover{background:var(--n7)}
.bo{background:var(--w);color:var(--g700);border-color:var(--g200)}.bo:hover{border-color:var(--n4);color:var(--n6);background:var(--n0)}
.bs{padding:5px 11px;font-size:12px}.btn:disabled{opacity:.42;cursor:not-allowed}
/* TABLE */
.tw{overflow-x:auto}table{width:100%;border-collapse:collapse}thead{background:var(--g50)}
th{padding:10px 14px;text-align:left;font-size:10px;font-family:var(--fm);font-weight:500;color:var(--g500);letter-spacing:.07em;text-transform:uppercase;border-bottom:1px solid var(--g200);white-space:nowrap}
td{padding:12px 14px;border-bottom:1px solid var(--g100);font-size:13px;color:var(--g700);vertical-align:middle}
tr:last-child td{border-bottom:none}tbody tr:hover td{background:var(--n0)}
/* TRAFFIC LIGHTS */
.tl{width:10px;height:10px;border-radius:50%;display:inline-block;flex-shrink:0}
.tl.G{background:var(--grn);box-shadow:0 0 0 3px var(--grnL)}.tl.A{background:var(--gld);box-shadow:0 0 0 3px var(--gldL)}.tl.R{background:var(--red);box-shadow:0 0 0 3px var(--redL)}.tl.X{background:var(--g300)}
/* PROGRESS */
.pr{height:6px;background:var(--g100);border-radius:3px;overflow:hidden}.pf{height:100%;border-radius:3px;transition:width .5s ease}
/* FORMS */
.fg{margin-bottom:16px}
.fl{display:block;font-size:11px;font-weight:500;color:var(--g700);margin-bottom:5px;font-family:var(--fm);letter-spacing:.04em}
.fi,.fsel,.fta{width:100%;padding:9px 12px;background:var(--w);border:1.5px solid var(--g200);border-radius:var(--r4);color:var(--g900);font-family:var(--fb);font-size:13px;outline:none;transition:border-color .14s,box-shadow .14s}
.fi:focus,.fsel:focus,.fta:focus{border-color:var(--n4);box-shadow:0 0 0 3px rgba(46,95,163,.1)}.fta{resize:vertical;min-height:80px}
/* TABS */
.tabs{display:flex;border-bottom:2px solid var(--g200);margin-bottom:22px}
.tab{padding:9px 18px;cursor:pointer;font-size:13px;font-weight:500;color:var(--g500);border-bottom:2px solid transparent;margin-bottom:-2px;transition:all .14s;white-space:nowrap}
.tab:hover{color:var(--n9)}.tab.on{color:var(--n9);border-bottom-color:var(--red);font-weight:600}
/* MODAL */
.ov{position:fixed;inset:0;background:rgba(11,28,61,.52);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(2px)}
.mo{background:var(--w);border-radius:var(--r16);width:520px;max-width:95vw;max-height:88vh;overflow-y:auto;box-shadow:var(--sXL);animation:mi .2s ease}
@keyframes mi{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
.mh{padding:22px 26px 18px;border-bottom:1px solid var(--g100);display:flex;align-items:center;justify-content:space-between}
.mt2{font-family:var(--fd);font-size:18px;font-weight:600;color:var(--n9)}
.mc{cursor:pointer;color:var(--g400);font-size:22px;line-height:1}.mc:hover{color:var(--g700)}
.mb2{padding:22px 26px}
.mf{padding:14px 26px;border-top:1px solid var(--g100);display:flex;justify-content:flex-end;gap:10px;background:var(--g50);border-radius:0 0 var(--r16) var(--r16)}
/* CALLOUT */
.cal{display:flex;align-items:flex-start;gap:11px;padding:13px 15px;border-radius:var(--r8);font-size:13px;line-height:1.5;margin-bottom:16px}
.cal.info{background:var(--n1);color:var(--n7);border:1px solid var(--n2)}
.cal.warn{background:var(--gldL);color:#7A5510;border:1px solid rgba(184,122,26,.22)}
.cal.ok{background:var(--grnL);color:var(--grn);border:1px solid rgba(26,122,74,.2)}
/* SUBPROGRAM CARDS */
.spc{background:var(--w);border:1px solid var(--g200);border-radius:var(--r12);padding:18px 20px;box-shadow:var(--s1);transition:all .18s;border-left:4px solid transparent}
.spc:hover{box-shadow:var(--s2);transform:translateY(-1px)}
.spc.G{border-left-color:var(--grn)}.spc.A{border-left-color:var(--gld)}.spc.R{border-left-color:var(--red)}.spc.X{border-left-color:var(--g300)}
.spn{font-weight:600;font-size:13px;color:var(--n9);margin-bottom:2px}
.spi{font-family:var(--fm);font-size:10px;color:var(--g400);margin-bottom:12px}
/* NL QUERY */
.qb{background:var(--w);border:2px solid var(--g200);border-radius:var(--r12);overflow:hidden;box-shadow:var(--s1);transition:border-color .18s}
.qb:focus-within{border-color:var(--n4);box-shadow:0 0 0 4px rgba(46,95,163,.08)}
.qta{width:100%;padding:15px 17px;border:none;outline:none;font-family:var(--fb);font-size:14px;color:var(--g900);resize:none;background:transparent;min-height:62px}
.qft{padding:9px 13px;background:var(--g50);border-top:1px solid var(--g100);display:flex;align-items:center;justify-content:space-between}
.rcard{background:var(--w);border:1px solid var(--g200);border-radius:var(--r12);padding:22px;box-shadow:var(--s1);animation:fi .35s ease}
.rtxt{font-size:14px;line-height:1.75;color:var(--g700)}
.src{display:inline-flex;align-items:center;padding:3px 9px;background:var(--n0);color:var(--n6);border:1px solid var(--n2);border-radius:4px;font-family:var(--fm);font-size:11px;cursor:pointer;transition:all .14s}
.src:hover{background:var(--n1)}
.cbr{display:flex;align-items:center;gap:9px;font-family:var(--fm);font-size:11px}
.cbt{width:76px;height:5px;background:var(--g200);border-radius:3px;overflow:hidden}.cbf{height:100%;border-radius:3px}
.cbf.H{background:var(--grn);width:90%}.cbf.M{background:var(--gld);width:55%}.cbf.L{background:var(--red);width:25%}
.rev-b{display:flex;align-items:center;gap:9px;margin-top:14px;padding:11px 15px;background:var(--gldL);border:1px solid rgba(184,122,26,.22);border-radius:var(--r8);font-size:12px;color:#7A5510;font-weight:500}
/* FINDINGS */
.fc{border:1px solid var(--g200);border-radius:var(--r8);margin-bottom:10px;overflow:hidden;transition:border-color .15s}.fc:hover{border-color:var(--n2)}
.fh{padding:13px 16px;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;cursor:pointer}
.ftl{font-size:13px;color:var(--n9);font-weight:500;margin-top:4px}
.fmeta{font-family:var(--fm);font-size:10px;color:var(--g400);margin-top:3px}
.fbdy{padding:0 16px 13px;font-size:13px;color:var(--g600);line-height:1.6}
.fac{padding:10px 16px;border-top:1px solid var(--g100);display:flex;gap:8px;align-items:center;background:var(--g50)}
/* USERS */
.ur2{display:flex;align-items:center;gap:13px;padding:13px 0;border-bottom:1px solid var(--g100)}.ur2:last-child{border-bottom:none}
.av2{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--n7),var(--n4));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
/* AUDIT */
.al{display:grid;grid-template-columns:150px 170px 110px 1fr;gap:10px;padding:9px 0;border-bottom:1px solid var(--g100);font-size:12px;font-family:var(--fm)}.al:last-child{border-bottom:none}
/* TRAINING */
.ts{display:flex;gap:14px;padding:14px;border-left:3px solid var(--g200);margin-bottom:9px;border-radius:0 var(--r8) var(--r8) 0;transition:all .14s;cursor:pointer}
.ts.on{border-left-color:var(--red);background:var(--redL)}.ts.dn{border-left-color:var(--grn)}
.tsn{width:26px;height:26px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;font-family:var(--fm);background:var(--g100);color:var(--g500)}
.ts.on .tsn{background:var(--red);color:#fff}.ts.dn .tsn{background:var(--grn);color:#fff}
.tst{font-weight:600;font-size:13px;color:var(--n9);margin-bottom:3px}
.tsb{font-size:13px;color:var(--g500);line-height:1.5}
.tsc{font-family:var(--fm);font-size:11px;background:var(--n9);color:#7DD3FC;padding:11px 13px;border-radius:var(--r4);margin-top:9px;white-space:pre-wrap;line-height:1.6}
/* GLOSSARY */
.ge{padding:14px 0;border-bottom:1px solid var(--g100)}.ge:last-child{border-bottom:none}
.gw{font-family:var(--fd);font-size:15px;font-weight:600;color:var(--n9);margin-bottom:4px}
.gc{font-family:var(--fm);font-size:9px;color:var(--red);background:var(--redL);padding:2px 6px;border-radius:3px;margin-left:8px}
.gdf{font-size:13px;color:var(--g700);line-height:1.6}
/* MISC */
.fm{font-family:var(--fm);font-size:12px}.tm{color:var(--g500)}.tw2{font-weight:600;color:var(--n9)}
.ld{display:flex;align-items:center;gap:9px;color:var(--g400);font-size:13px;padding:18px 0}
.sp{width:16px;height:16px;border:2px solid var(--g200);border-top-color:var(--n6);border-radius:50%;animation:spin .7s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
.em{padding:44px 22px;text-align:center;color:var(--g400)}.ei{font-size:34px;margin-bottom:10px}.et{font-size:13px}
.footer{text-align:center;padding:18px;font-size:11px;color:var(--g400);font-family:var(--fm);border-top:1px solid var(--g100);margin-top:36px}
.fx{display:flex}.ic{align-items:center}.jb{justify-content:space-between}
.g2x{gap:8px}.g3x{gap:12px}.fw{flex-wrap:wrap}
select option{background:#fff;color:var(--g900)}
`;

/* ── DATA ── */
const SPS = [
  { id:"AS",   name:"Assessment Science",                  st:"G", projects:12, wps:48, pl:142.0, ac:118.4, fo:139.2, dl:1, cr:0 },
  { id:"EIA",  name:"Engineering & Integrated Assessments",st:"A", projects:9,  wps:34, pl:98.5,  ac:74.2,  fo:91.0,  dl:3, cr:1 },
  { id:"ICF",  name:"Inertial Confinement Fusion",          st:"G", projects:7,  wps:29, pl:210.0, ac:182.3, fo:207.5, dl:1, cr:0 },
  { id:"ASC",  name:"Advanced Simulation and Computing",    st:"A", projects:11, wps:42, pl:315.8, ac:268.4, fo:308.1, dl:4, cr:2 },
  { id:"WTMM", name:"Weapon Technology & Manufacturing",    st:"R", projects:8,  wps:31, pl:189.3, ac:134.7, fo:171.0, dl:6, cr:3 },
];

const PROJECTS = [
  { id:"AS-P-001",  sub:"AS",   title:"W88-1 Component Assessment",          st:"G", sch:"G", fpm:"Chen, S.",    pl:28.4, ac:24.1, risk:"LOW"    },
  { id:"AS-P-002",  sub:"AS",   title:"Pit Requalification Analysis",        st:"A", sch:"A", fpm:"Kim, J.",     pl:19.2, ac:13.8, risk:"MEDIUM" },
  { id:"EIA-P-001", sub:"EIA",  title:"System Integration Testing Ph. III",  st:"A", sch:"R", fpm:"Torres, M.", pl:22.5, ac:16.4, risk:"HIGH"   },
  { id:"EIA-P-002", sub:"EIA",  title:"Engineering Assessment Framework",    st:"G", sch:"G", fpm:"Nakamura, Y",pl:18.0, ac:15.2, risk:"LOW"    },
  { id:"ICF-P-001", sub:"ICF",  title:"NIF Integrated Experiments FY26",     st:"G", sch:"G", fpm:"Nair, P.",   pl:48.0, ac:41.5, risk:"LOW"    },
  { id:"ICF-P-002", sub:"ICF",  title:"Target Fabrication Enhancement",      st:"A", sch:"A", fpm:"Osei, K.",   pl:31.2, ac:24.8, risk:"MEDIUM" },
  { id:"ASC-P-001", sub:"ASC",  title:"Classified Code Certification",       st:"A", sch:"A", fpm:"Webb, M.",   pl:62.4, ac:48.9, risk:"HIGH"   },
  { id:"ASC-P-002", sub:"ASC",  title:"Sierra Platform Modernization",       st:"G", sch:"G", fpm:"Patel, R.",  pl:55.0, ac:49.1, risk:"LOW"    },
  { id:"WTMM-P-001",sub:"WTMM",title:"Manufacturing Process Qualification",  st:"R", sch:"R", fpm:"Holloway, B",pl:44.5, ac:30.2, risk:"HIGH"   },
  { id:"WTMM-P-002",sub:"WTMM",title:"Component Qualification Testing",     st:"A", sch:"A", fpm:"Grant, C.",  pl:35.8, ac:26.1, risk:"MEDIUM" },
];

const WPS = [
  { id:"WP-AS-0112",   proj:"AS-P-001",   title:"W88 Alt 370 Component Assessment", st:"DELAYED",  fpm:"Chen",     start:"2025-10-01",end:"2026-03-31",pl:4.2, ac:3.8, vd:-14 },
  { id:"WP-AS-0113",   proj:"AS-P-001",   title:"Material Properties Analysis",      st:"ACTIVE",   fpm:"Chen",     start:"2026-01-01",end:"2026-06-30",pl:6.1, ac:4.2, vd:0   },
  { id:"WP-EIA-0088",  proj:"EIA-P-001",  title:"Structural Assessment Phase II",    st:"DELAYED",  fpm:"Torres",   start:"2025-09-01",end:"2025-12-31",pl:5.5, ac:2.4, vd:-82 },
  { id:"WP-EIA-0091",  proj:"EIA-P-001",  title:"Component Integration Testing",     st:"DELAYED",  fpm:"Torres",   start:"2025-11-01",end:"2026-01-31",pl:4.8, ac:1.9, vd:-35 },
  { id:"WP-ICF-0188",  proj:"ICF-P-001",  title:"Laser Drive Optimization",          st:"ACTIVE",   fpm:"Nair",     start:"2025-10-01",end:"2026-09-30",pl:12.0,ac:9.4, vd:0   },
  { id:"WP-ICF-0191",  proj:"ICF-P-001",  title:"Cryogenic Target Delivery",         st:"ACTIVE",   fpm:"Nair",     start:"2026-01-01",end:"2026-06-30",pl:8.5, ac:6.1, vd:-12 },
  { id:"WP-ASC-0201",  proj:"ASC-P-001",  title:"Code Certification — Platform A",   st:"ON_HOLD",  fpm:"Webb",     start:"2025-10-01",end:"2026-04-30",pl:18.2,ac:12.4,vd:-30 },
  { id:"WP-ASC-0202",  proj:"ASC-P-002",  title:"Sierra GPU Architecture Migration", st:"ACTIVE",   fpm:"Patel",    start:"2026-01-01",end:"2026-12-31",pl:22.0,ac:14.8,vd:0   },
  { id:"WP-WTMM-0301", proj:"WTMM-P-001", title:"Manufacturing Line Qualification",  st:"DELAYED",  fpm:"Holloway", start:"2025-08-01",end:"2026-02-28",pl:15.0,ac:9.1, vd:-45 },
  { id:"WP-WTMM-0302", proj:"WTMM-P-001", title:"Process Verification Testing",      st:"DELAYED",  fpm:"Holloway", start:"2025-10-01",end:"2026-04-30",pl:12.5,ac:7.8, vd:-22 },
];

const DOCS = [
  { id:"ICF-DOC-0892",title:"ICF Q1 FY2026 Program Review",     type:"REPORT",   sub:"ICF", cls:"CUI",ver:"2.1",st:"FINAL",auth:"p.nair",    dt:"2026-03-14" },
  { id:"AS-DOC-0441", title:"AS Monthly Status Report Mar 2026",type:"REPORT",   sub:"AS",  cls:"CUI",ver:"1.0",st:"DRAFT", auth:"j.kowalski",dt:"2026-03-13" },
  { id:"ASC-DOC-0219",title:"Sierra Platform Technical Memo",   type:"TECH_MEMO",sub:"ASC", cls:"CUI",ver:"3.2",st:"FINAL",auth:"m.webb",    dt:"2026-03-10" },
  { id:"WTMM-DOC-088",title:"Manufacturing Qualification Plan", type:"PLAN",     sub:"WTMM",cls:"CUI",ver:"1.4",st:"FINAL",auth:"p.holloway",dt:"2026-03-08" },
  { id:"EIA-DOC-0312",title:"System Integration Test Protocol", type:"PLAN",     sub:"EIA", cls:"CUI",ver:"2.0",st:"FINAL",auth:"r.torres",  dt:"2026-03-05" },
  { id:"NA11-DOC-001",title:"NA-11 FY2026 Program Mgmt Plan",   type:"PLAN",     sub:null,  cls:"CUI",ver:"1.0",st:"FINAL",auth:"s.chen",    dt:"2026-02-28" },
];

const FINDINGS = [
  { id:"FIND-0048",type:"GAP",         sub:"ICF",  conf:"HIGH",  st:"PENDING", title:"No WP covering NIF diagnostic upgrade requirement",
    body:"ICF-P-002 lists 'NIF Advanced Diagnostics Integration' as a stated objective. No active or planned work package addresses diagnostics, instrumentation, or NIF facility integration. The requirement appears unaddressed in the current work breakdown structure.",
    srcs:["ICF-P-002","WP-ICF-0188","WP-ICF-0194"] },
  { id:"FIND-0047",type:"DUPLICATION",sub:"CROSS", conf:"MEDIUM",st:"PENDING", title:"Overlapping actinide materials scope: AS-WP-0077 and WTMM-WP-0204",
    body:"Two work packages share common deliverable keywords (actinide, thermal properties, computational modeling) and reference overlapping LLNL resources. Cross-subprogram review recommended to determine whether overlap is intentional parallel effort or unintentional duplication.",
    srcs:["WP-AS-0077","WP-WTMM-0204"] },
  { id:"FIND-0046",type:"SCHEDULE_RISK",sub:"ASC", conf:"MEDIUM",st:"ACCEPTED",title:"Narrative risk factors inconsistent with reported GREEN schedule status",
    body:"ASC-P-001 reports GREEN schedule status but project_risks field references contractor workforce transition, classified code certification delay, and LLNL facility conflict. Quantitative status and narrative are inconsistent.",
    srcs:["ASC-P-001","WP-ASC-0201"],rev:"m.webb",notes:"Risks monitored. Schedule protected by float. No action needed." },
  { id:"FIND-0044",type:"GAP",         sub:"AS",   conf:"HIGH",  st:"ACCEPTED",title:"W88-1 pit requalification driver has no associated work package",
    body:"AS-P-002 requirements_drivers references W88-1 pit requalification. No work package scope description or title references this designation. FPM confirmed work captured under pending WP entry.",
    srcs:["AS-P-002","WP-AS-0109"],rev:"j.chen",notes:"WP-AS-0115 to be entered this week." },
];

const NL_HIST = [
  { id:"NLQ-031",q:"What work packages in EIA are past their planned end date with no completed deliverables?",
    a:"Three EIA work packages are past planned end date with zero completed deliverables: WP-EIA-0088 (ended Dec 2025, 0/4 complete), WP-EIA-0091 (ended Jan 2026, 0/3 complete), and WP-EIA-0094 (ended Feb 2026, 1/5 complete). All three carry DELAYED status in the tracker.",
    conf:"H",srcs:["WP-EIA-0088","WP-EIA-0091","WP-EIA-0094"],ts:"2026-03-14 07:55" },
  { id:"NLQ-029",q:"Are there any W88 Alt 370 related work packages behind schedule?",
    a:"One work package explicitly references W88 Alt 370: WP-AS-0112 ('W88 Alt 370 Component Assessment'), currently DELAYED with a 14-day negative variance. Assigned FPM: S. Chen. AS-P-002 lists W88 Alt 370 as a requirements driver and contains 4 additional work packages that may implicitly support this requirement.",
    conf:"H",srcs:["WP-AS-0112","AS-P-002"],ts:"2026-03-12 14:10" },
];

const USERS = [
  { id:"U001",name:"Dr. Sarah Chen",   ini:"SC",role:"PADA",        sub:"ALL", st:"ACTIVE",  ses:2,piv:true, mfa:true, last:"2026-03-14 09:22" },
  { id:"U002",name:"James Kowalski",   ini:"JK",role:"SP_MANAGER",  sub:"AS",  st:"ACTIVE",  ses:1,piv:true, mfa:true, last:"2026-03-14 08:45" },
  { id:"U003",name:"Dr. Priya Nair",   ini:"PN",role:"FPM",         sub:"ICF", st:"ACTIVE",  ses:1,piv:false,mfa:true, last:"2026-03-13 16:30" },
  { id:"U004",name:"Marcus Webb",      ini:"MW",role:"FPM",         sub:"ASC", st:"ACTIVE",  ses:0,piv:true, mfa:false,last:"2026-03-12 11:15" },
  { id:"U005",name:"Lt. Col. Torres",  ini:"RT",role:"READ_ONLY",   sub:"ALL", st:"ACTIVE",  ses:1,piv:true, mfa:true, last:"2026-03-14 07:50" },
  { id:"U006",name:"Patricia Holloway",ini:"PH",role:"FPM",         sub:"WTMM",st:"INACTIVE",ses:0,piv:false,mfa:false,last:"2026-02-28 14:20" },
  { id:"U007",name:"Dr. Kevin Park",   ini:"KP",role:"SYSTEM_ADMIN",sub:"ALL", st:"ACTIVE",  ses:1,piv:true, mfa:true, last:"2026-03-14 06:00" },
];

const AUDIT_LOG = [
  { ts:"2026-03-14 09:44",act:"DOCUMENT_UPLOAD",  usr:"p.nair",    det:"ICF-DOC-0892 v2.1 uploaded — ICF Q1 Review",    sub:"ICF" },
  { ts:"2026-03-14 09:31",act:"WP_STATUS_UPDATE", usr:"j.kowalski",det:"WP-AS-0112 ACTIVE → DELAYED",                   sub:"AS"  },
  { ts:"2026-03-14 09:22",act:"SESSION_CREATE",   usr:"s.chen",    det:"SES-4A2F — PIV auth — 10.142.18.44",            sub:null  },
  { ts:"2026-03-14 09:18",act:"ROLE_CHANGE",      usr:"k.park",    det:"U006 Holloway: FPM → READ_ONLY (admin action)", sub:null  },
  { ts:"2026-03-14 08:52",act:"BUDGET_ACTUALS",   usr:"m.webb",    det:"ASC FY2026 Q1 entered — +$142K variance",       sub:"ASC" },
  { ts:"2026-03-14 08:33",act:"AI_FINDING_REVIEW",usr:"j.kowalski",det:"FIND-0044 ACCEPTED — gap in AS WP coverage",    sub:"AS"  },
  { ts:"2026-03-14 07:55",act:"NL_QUERY",         usr:"a.brennan", det:"Query: EIA milestones at risk Q2 2026",         sub:"EIA" },
  { ts:"2026-03-14 07:50",act:"SESSION_CREATE",   usr:"r.torres",  det:"SES-6F1A — PIV auth — 10.142.22.5",            sub:null  },
  { ts:"2026-03-14 06:12",act:"USER_PROVISION",   usr:"k.park",    det:"U008 Brennan provisioned — FPM / EIA",          sub:null  },
  { ts:"2026-03-13 17:30",act:"REPORT_GENERATE",  usr:"p.nair",    det:"MSR FY2026-M02 — ICF — PDF export",             sub:"ICF" },
];

const TR_DATA = {
  FPM:[
    { id:"F01",mod:"M1",title:"Reading the Portfolio Dashboard",   dn:true, code:"portfolio_overview(conn, ctx)" },
    { id:"F02",mod:"M2",title:"Creating a Work Package",           dn:true, code:"create_work_package(conn, ctx, project_id, subprogram_id, title)" },
    { id:"F03",mod:"M2",title:"Updating Work Package Status",      dn:false,code:'update_work_package(conn, ctx, wp_id, status="DELAYED")' },
    { id:"F04",mod:"M3",title:"Checking Budget Variance",          dn:false,code:'variance_report(conn, ctx, subprogram_id="ICF", fiscal_year=2026)' },
    { id:"F05",mod:"M4",title:"Uploading a Document with Metadata",dn:false,code:'upload_document(conn, ctx, title, doc_type, classification="CUI")' },
    { id:"F06",mod:"M5",title:"Generating Monthly Status Report",  dn:false,code:"monthly_status_report(conn, ctx, fiscal_year=2026, report_month=3)" },
    { id:"F07",mod:"M6",title:"Reviewing AI Gap Findings",         dn:false,code:"get_gap_findings(conn, ctx, subprogram_id=None)" },
    { id:"F08",mod:"M6",title:"Natural Language Query Interface",  dn:false,code:'nl_query(conn, ctx, query_text="What WPs are behind schedule?")' },
  ],
  LEADERSHIP:[
    { id:"L01",mod:"M1",title:"Executive Summary Navigation",    dn:true, code:"executive_summary(conn, ctx)" },
    { id:"L02",mod:"M5",title:"Quarterly Program Review Export", dn:false,code:"quarterly_program_review(conn, ctx, fiscal_year=2026, quarter=2)" },
    { id:"L03",mod:"M6",title:"Understanding AI Finding Status", dn:false,code:'get_gap_findings(conn, ctx, review_status="PENDING")' },
  ],
  ADMIN:[
    { id:"A01",mod:"M7",title:"Provisioning a New User",         dn:true, code:"provision_user(conn, ctx, username, display_name, role=Role.FPM)" },
    { id:"A02",mod:"M7",title:"Role Assignment and Subprograms", dn:true, code:"update_user_role(conn, ctx, user_id, new_role=Role.SUBPROGRAM_MANAGER)" },
    { id:"A03",mod:"M7",title:"Reading the Audit Log",           dn:true, code:'get_audit_trail(conn, ctx, since="2026-03-01T00:00:00")' },
    { id:"A04",mod:"M7",title:"Investigating Access Anomalies",  dn:false,code:"get_access_anomalies(conn, ctx)" },
  ],
};

const GLOSSARY = [
  { term:"FPM",            ctx:"NNSA",def:"Federal Program Manager — the designated government official responsible for technical direction of one or more work packages within a subprogram." },
  { term:"Work Package",   ctx:"PMIS",def:"The lowest-level trackable unit of work. Contains scope, schedule, budget, deliverables, and responsible FPM." },
  { term:"RBAC",           ctx:"PMIS",def:"Role-Based Access Control — permissions assigned to roles rather than individual users. APEX roles: FPM, Subprogram Manager, PADA, Read-Only, System Admin." },
  { term:"PIV/CAC",        ctx:"NNSA",def:"Personal Identity Verification / Common Access Card — federal smart card credentials required for APEX production authentication." },
  { term:"CUI",            ctx:"NNSA",def:"Controlled Unclassified Information — the default APEX classification tier. Requires access controls but is not classified." },
  { term:"Confidence Tier",ctx:"AI",  def:"AI metadata on every response: HIGH (fully grounded in PMIS records), MEDIUM (partial data), LOW (insufficient — verify before acting)." },
  { term:"Gap Finding",    ctx:"AI",  def:"AI flag indicating a project objective has no corresponding work package. Always requires human FPM review before leadership dashboards." },
  { term:"RAG Pipeline",   ctx:"AI",  def:"Retrieval-Augmented Generation — Stage 1 retrieves PMIS records, Stage 2 sends them to Claude for synthesis. AI sees only PMIS data." },
  { term:"PPBE",           ctx:"PPBE",def:"Planning, Programming, Budgeting, and Execution — the federal budget cycle governing NNSA funding." },
  { term:"FYNSP",          ctx:"NNSA",def:"Five-Year Nuclear Stockpile Plan — out-year budget projection. APEX tracks FYNSP Y1–Y5 per project." },
];

/* ── HELPERS ── */
const pct = (a, p) => p ? Math.round((a - p) / p * 100) : 0;
const fmt = n => n != null ? `$${n.toFixed(1)}M` : "—";
const TL = ({ s }) => <span className={`tl ${s}`} />;
const Bdg = ({ t, children }) => <span className={`bdg ${t}`}>{children}</span>;
const Btn = ({ v="bo", sz="", onClick, disabled, children }) =>
  <button className={`btn ${v} ${sz}`} onClick={onClick} disabled={disabled}>{children}</button>;

const confC = { HIGH:"gn", MEDIUM:"gd", LOW:"rd", H:"gn", M:"gd", L:"rd" };
const stCol  = { ACTIVE:"gn", DELAYED:"rd", ON_HOLD:"gd", COMPLETE:"nv", PLANNED:"gr",
                 FINAL:"gn", DRAFT:"gd", PENDING:"gd", ACCEPTED:"gn", REJECTED:"rd" };

/* ── ROOT APP ── */
export default function App() {
  const [page, setPage] = useState("DASHBOARD");
  const [uIdx, setUIdx] = useState(2);
  const user = USERS[uIdx];

  const nav = [
    { id:"DASHBOARD", ico:"▦", label:"Portfolio",      sec:"PROGRAM" },
    { id:"TRACKER",   ico:"◈", label:"Tracker",        sec:"PROGRAM" },
    { id:"BUDGET",    ico:"◉", label:"Budget",         sec:"PROGRAM" },
    { id:"DOCUMENTS", ico:"≡", label:"Documents",      sec:"PROGRAM" },
    { id:"REPORTS",   ico:"⊞", label:"Reports",        sec:"PROGRAM" },
    { id:"AI",        ico:"⚑", label:"AI Findings",    sec:"AI", bdg:FINDINGS.filter(f=>f.st==="PENDING").length },
    { id:"QUERY",     ico:"⌖", label:"NL Query",       sec:"AI" },
    { id:"USERS",     ico:"◎", label:"Users & Access", sec:"ADMIN" },
    { id:"AUDIT",     ico:"§", label:"Audit Log",       sec:"ADMIN" },
    { id:"TRAINING",  ico:"→", label:"Training",        sec:"ADMIN" },
  ];

  const secLabels = { PROGRAM:"Program Portfolio", AI:"AI Analysis Layer", ADMIN:"Administration" };

  return (
    <>
      <style>{S}</style>
      <div className="app">
        {/* ── SIDEBAR ── */}
        <div className="sb">
          <div className="sb-brand">
            <div className="sb-apex">APEX<span>.</span></div>
            <div className="sb-tag">Adaptive Program Execution System</div>
            <div className="sb-pill">Leidos · Demo 2.0</div>
          </div>
          <div className="sb-nav">
            {["PROGRAM","AI","ADMIN"].map(sec => (
              <div key={sec}>
                <div className="sb-sec">{secLabels[sec]}</div>
                {nav.filter(n => n.sec === sec).map(n => (
                  <div key={n.id} className={`ni ${page===n.id?"on":""}`} onClick={() => setPage(n.id)}>
                    <span className="ni-ico">{n.ico}</span>
                    <span>{n.label}</span>
                    {n.bdg > 0 && <span className="ni-bdg">{n.bdg}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="sb-user">
            <div className="av">{user.ini}</div>
            <div>
              <div className="un">{user.name.split(" ").slice(-1)[0]}</div>
              <div className="ur">{user.role} · {user.sub}</div>
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="main">
          <div className="tb">
            <div className="tb-bc">APEX / <span>{nav.find(n=>n.id===page)?.label}</span></div>
            <div className="tb-r">
              <span style={{fontSize:11,color:"var(--g400)",fontFamily:"var(--fm)",marginRight:4}}>DEMO ROLE:</span>
              {USERS.map((u, i) => (
                <button key={u.id} onClick={() => setUIdx(i)} style={{
                  background: i===uIdx ? "var(--n9)" : "transparent",
                  color: i===uIdx ? "#fff" : "var(--g500)",
                  border: `1px solid ${i===uIdx?"var(--n9)":"var(--g200)"}`,
                  borderRadius: 4, padding:"3px 8px", fontSize:10, cursor:"pointer", fontFamily:"var(--fm)"
                }}>{u.ini}</button>
              ))}
              <span className="pill live" style={{marginLeft:8}}><span className="dot"/>Live</span>
              <span className="pill cui">CUI</span>
              <span style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--g400)"}}>
                {new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
              </span>
            </div>
          </div>

          <div className="pg">
            {page==="DASHBOARD" && <PgDash  user={user}/>}
            {page==="TRACKER"   && <PgTrack user={user}/>}
            {page==="BUDGET"    && <PgBudget user={user}/>}
            {page==="DOCUMENTS" && <PgDocs  user={user}/>}
            {page==="REPORTS"   && <PgReports user={user}/>}
            {page==="AI"        && <PgAI    user={user}/>}
            {page==="QUERY"     && <PgQuery  user={user}/>}
            {page==="USERS"     && <PgUsers  user={user}/>}
            {page==="AUDIT"     && <PgAudit  user={user}/>}
            {page==="TRAINING"  && <PgTraining user={user}/>}
            <div className="footer">
              Leidos APEX 2.0 · Adaptive Program Execution System · NA-11 RDT&amp;E Portfolio · DEMONSTRATION PROTOTYPE — Test Data Only
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================ DASHBOARD ============================================================ */
function PgDash({ user }) {
  const tot = SPS.reduce((a,s) => ({ pl:a.pl+s.pl, ac:a.ac+s.ac, wps:a.wps+s.wps, dl:a.dl+s.dl, cr:a.cr+s.cr }),
    { pl:0, ac:0, wps:0, dl:0, cr:0 });
  const vp = pct(tot.ac, tot.pl);

  return (
    <div>
      <div className="ph">
        <div className="pe">NA-11 RDT&amp;E Portfolio · FY2026</div>
        <div className="pt">Portfolio Executive Dashboard</div>
        <div className="ps">Five subprograms · Unified scope, cost, and schedule visibility · Viewing as {user.role}</div>
      </div>

      <div className="g4 mb6">
        {[{ l:"Active Projects",   v:SPS.reduce((a,s)=>a+s.projects,0), d:"Across 5 subprograms",        dc:"neu", c:"nv" },
          { l:"Work Packages",     v:tot.wps,   d:`▲ ${tot.dl} delayed`,                                 dc:"neg", c:"gd" },
          { l:"FY26 Obligations",  v:fmt(tot.ac),d:`${vp>0?"+":""}${vp}% vs planned`,                   dc:vp<-8?"neg":"pos", c:"nv" },
          { l:"Critical Alerts",   v:tot.cr,    d:"Requires attention",                                  dc:"neg", c:"rd" }
        ].map(s => (
          <div key={s.l} className={`sc ${s.c}`}>
            <div className="sn">{s.v}</div>
            <div className="sl">{s.l}</div>
            <div className={`sd ${s.dc}`}>{s.d}</div>
          </div>
        ))}
      </div>

      <div className="card mb6">
        <div className="ch"><span className="ct">Subprogram Health · FY2026</span><span className="fm tm">Scope · Cost · Schedule</span></div>
        <div className="cb">
          <div className="g5">
            {SPS.map(sp => {
              const v = pct(sp.ac, sp.pl);
              const rate = Math.round(sp.ac / sp.pl * 100);
              return (
                <div key={sp.id} className={`spc ${sp.st}`}>
                  <div className="fx ic jb" style={{marginBottom:4}}>
                    <TL s={sp.st}/>
                    <span className="fm tm">{sp.id}</span>
                  </div>
                  <div className="spn">{sp.name}</div>
                  <div className="spi">{sp.projects} projects · {sp.wps} WPs</div>
                  <div className="g2" style={{gap:8,marginBottom:12}}>
                    <div>
                      <div style={{fontSize:10,color:"var(--g400)",fontFamily:"var(--fm)",marginBottom:2}}>Planned</div>
                      <div style={{fontFamily:"var(--fd)",fontSize:16,fontWeight:600,color:"var(--n9)"}}>{fmt(sp.pl)}</div>
                    </div>
                    <div>
                      <div style={{fontSize:10,color:"var(--g400)",fontFamily:"var(--fm)",marginBottom:2}}>Actual</div>
                      <div style={{fontFamily:"var(--fd)",fontSize:16,fontWeight:600,color:v<-15?"var(--red)":v<-8?"var(--gld)":"var(--grn)"}}>{fmt(sp.ac)}</div>
                    </div>
                  </div>
                  <div className="pr">
                    <div className="pf" style={{width:`${Math.min(100,rate)}%`,background:sp.st==="R"?"var(--red)":sp.st==="A"?"var(--gld)":"var(--grn)"}}/>
                  </div>
                  <div className="fx jb mt4" style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--g400)",marginTop:4}}>
                    <span>Obligation rate</span><span style={{fontWeight:600}}>{rate}%</span>
                  </div>
                  {sp.dl > 0 && <div style={{marginTop:8}}><Bdg t="gd">{sp.dl} delayed</Bdg></div>}
                  {sp.cr > 0 && <div style={{marginTop:4}}><Bdg t="rd">{sp.cr} critical</Bdg></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="ch"><span className="ct">Project Status Roll-Up</span><Btn sz="bs">Export</Btn></div>
        <div className="tw">
          <table>
            <thead><tr><th>Project</th><th>Title</th><th>Sub</th><th>FPM</th><th>Scope</th><th>Cost</th><th>Sched</th><th>Planned</th><th>Actual</th><th>Var</th></tr></thead>
            <tbody>
              {PROJECTS.map(p => {
                const v = pct(p.ac, p.pl);
                return (
                  <tr key={p.id}>
                    <td><span className="fm" style={{color:"var(--n6)"}}>{p.id}</span></td>
                    <td style={{fontWeight:500,color:"var(--n9)",maxWidth:200}}>{p.title}</td>
                    <td><Bdg t="nv">{p.sub}</Bdg></td>
                    <td style={{fontSize:12,color:"var(--g500)"}}>{p.fpm}</td>
                    <td><TL s={p.st}/></td>
                    <td><TL s={v<-15?"R":v<-8?"A":"G"}/></td>
                    <td><TL s={p.sch}/></td>
                    <td className="fm">{fmt(p.pl)}</td>
                    <td className="fm">{fmt(p.ac)}</td>
                    <td style={{fontFamily:"var(--fm)",fontWeight:600,color:v<-10?"var(--red)":v<-5?"var(--gld)":"var(--grn)"}}>{v>0?"+":""}{v}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ TRACKER ============================================================ */
function PgTrack({ user }) {
  const [fil, setFil] = useState("ALL");
  const wps = fil === "ALL" ? WPS : WPS.filter(w => w.st === fil);

  return (
    <div>
      <div className="ph">
        <div className="pe">Module 2</div>
        <div className="pt">Project & Work Package Tracker</div>
        <div className="ps">Schedule status, milestone tracking, baseline variance, and dependency management</div>
      </div>
      <div className="g4 mb6">
        {[{l:"Total WPs",v:WPS.length,c:"nv"},{l:"Active",v:WPS.filter(w=>w.st==="ACTIVE").length,c:"gn"},
          {l:"Delayed",v:WPS.filter(w=>w.st==="DELAYED").length,c:"rd"},{l:"On Hold",v:WPS.filter(w=>w.st==="ON_HOLD").length,c:"gd"}]
          .map(s => <div key={s.l} className={`sc ${s.c}`}><div className="sn">{s.v}</div><div className="sl">{s.l}</div></div>)}
      </div>
      <div className="card">
        <div className="ch">
          <span className="ct">Work Package Registry</span>
          <div className="fx g2x">
            {["ALL","ACTIVE","DELAYED","ON_HOLD"].map(f =>
              <Btn key={f} sz="bs" v={fil===f?"bn":"bo"} onClick={()=>setFil(f)}>{f}</Btn>)}
          </div>
        </div>
        <div className="tw">
          <table>
            <thead><tr><th>WP ID</th><th>Title</th><th>Project</th><th>FPM</th><th>Status</th><th>Start</th><th>End</th><th>Planned</th><th>Actual</th><th>Variance</th></tr></thead>
            <tbody>
              {wps.map(w => (
                <tr key={w.id}>
                  <td><span className="fm" style={{color:"var(--n6)"}}>{w.id}</span></td>
                  <td style={{fontWeight:500,color:"var(--n9)"}}>{w.title}</td>
                  <td><span className="fm" style={{fontSize:11}}>{w.proj}</span></td>
                  <td style={{fontSize:12,color:"var(--g500)"}}>{w.fpm}</td>
                  <td><Bdg t={stCol[w.st]||"gr"}>{w.st}</Bdg></td>
                  <td className="fm">{w.start}</td>
                  <td className="fm">{w.end}</td>
                  <td className="fm">{fmt(w.pl)}</td>
                  <td className="fm">{fmt(w.ac)}</td>
                  <td>{w.vd !== 0
                    ? <Bdg t={w.vd<-30?"rd":w.vd<0?"gd":"gn"}>{w.vd>0?"+":""}{w.vd}d</Bdg>
                    : <Bdg t="gn">On baseline</Bdg>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ BUDGET ============================================================ */
function PgBudget({ user }) {
  const [sel, setSel] = useState("ALL");
  const sps = sel === "ALL" ? SPS : SPS.filter(s => s.id === sel);

  return (
    <div>
      <div className="ph">
        <div className="pe">Module 3</div>
        <div className="pt">Budget Management</div>
        <div className="ps">FYNSP planning · actuals tracking · variance analysis · IF/THEN scenario modeling</div>
      </div>
      <div className="fx g2x mb6 fw">
        {["ALL", ...SPS.map(s=>s.id)].map(id =>
          <Btn key={id} sz="bs" v={sel===id?"bn":"bo"} onClick={()=>setSel(id)}>{id}</Btn>)}
      </div>
      <div className="card mb6">
        <div className="ch">
          <span className="ct">FY2026 Variance Report</span>
          <div className="fx g2x"><Btn sz="bs">Export CSV</Btn><Btn v="bp" sz="bs">Generate Report</Btn></div>
        </div>
        <div className="tw">
          <table>
            <thead><tr><th>Subprogram</th><th>Planned</th><th>Actuals Q2</th><th>Forecast</th><th>Variance $</th><th>Variance %</th><th>Obligation Rate</th><th>Status</th></tr></thead>
            <tbody>
              {sps.map(sp => {
                const v = pct(sp.ac, sp.pl);
                const rate = Math.round(sp.ac / sp.pl * 100);
                const vA = (sp.ac - sp.pl).toFixed(1);
                return (
                  <tr key={sp.id}>
                    <td><div className="tw2">{sp.name}</div><div className="fm tm" style={{fontSize:10}}>{sp.id}</div></td>
                    <td className="fm">{fmt(sp.pl)}</td>
                    <td className="fm">{fmt(sp.ac)}</td>
                    <td className="fm">{fmt(sp.fo)}</td>
                    <td className="fm" style={{color:parseFloat(vA)<0?"var(--red)":"var(--grn)"}}>{parseFloat(vA)>0?"+":""}{vA}M</td>
                    <td style={{fontFamily:"var(--fm)",fontWeight:600,color:v<-15?"var(--red)":v<-8?"var(--gld)":"var(--grn)"}}>{v>0?"+":""}{v}%</td>
                    <td>
                      <div className="fx ic g2x">
                        <div className="pr" style={{width:64}}>
                          <div className="pf" style={{width:`${Math.min(rate,100)}%`,background:rate<35?"var(--red)":rate<50?"var(--gld)":"var(--grn)"}}/>
                        </div>
                        <span className="fm">{rate}%</span>
                      </div>
                    </td>
                    <td><TL s={sp.st}/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <div className="ch"><span className="ct">FYNSP Out-Year Projection FY2026–FY2030</span><span className="fm tm">$M · RDT&amp;E</span></div>
        <div className="tw">
          <table>
            <thead><tr><th>Sub</th>{["FY2026","FY2027","FY2028","FY2029","FY2030"].map(y=><th key={y}>{y}</th>)}<th>5-Yr Total</th></tr></thead>
            <tbody>
              {sps.map(sp => {
                const yrs = [sp.pl, sp.pl*1.03, sp.pl*1.06, sp.pl*1.04, sp.pl*1.07];
                return (
                  <tr key={sp.id}>
                    <td style={{fontWeight:600}}>{sp.id}</td>
                    {yrs.map((y,i) => <td key={i} className="fm">{fmt(y)}</td>)}
                    <td className="fm tw2">{fmt(yrs.reduce((a,b)=>a+b,0))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ DOCUMENTS ============================================================ */
function PgDocs({ user }) {
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(false);
  const filt = DOCS.filter(d => !q || d.title.toLowerCase().includes(q.toLowerCase()) || (d.sub||"").toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="ph">
        <div className="pe">Module 4</div>
        <div className="pt">Document Repository</div>
        <div className="ps">Versioned, classification-aware central document store with full-text search</div>
      </div>
      <div className="fx g3x mb6 ic">
        <input className="fi" style={{maxWidth:300}} placeholder="Search title, type, subprogram…" value={q} onChange={e=>setQ(e.target.value)}/>
        <Btn v="bp" onClick={()=>setModal(true)}>+ Upload Document</Btn>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>Doc ID</th><th>Title</th><th>Type</th><th>Sub</th><th>Class</th><th>Ver</th><th>Status</th><th>Author</th><th>Date</th><th></th></tr></thead>
            <tbody>
              {filt.map(d => (
                <tr key={d.id}>
                  <td><span className="fm" style={{color:"var(--n6)"}}>{d.id}</span></td>
                  <td style={{fontWeight:500,color:"var(--n9)",maxWidth:200}}>{d.title}</td>
                  <td><Bdg t="gr">{d.type.replace("_"," ")}</Bdg></td>
                  <td>{d.sub ? <Bdg t="nv">{d.sub}</Bdg> : <span className="tm" style={{fontSize:12}}>Portfolio</span>}</td>
                  <td><Bdg t="gd">{d.cls}</Bdg></td>
                  <td className="fm">v{d.ver}</td>
                  <td><Bdg t={stCol[d.st]||"gr"}>{d.st}</Bdg></td>
                  <td className="fm" style={{fontSize:11}}>{d.auth}</td>
                  <td className="fm">{d.dt}</td>
                  <td><Btn sz="bs">View</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <div className="ov" onClick={()=>setModal(false)}>
          <div className="mo" onClick={e=>e.stopPropagation()}>
            <div className="mh"><span className="mt2">Upload Document</span><span className="mc" onClick={()=>setModal(false)}>×</span></div>
            <div className="mb2">
              <div className="fg"><label className="fl">Title</label><input className="fi" placeholder="Document title"/></div>
              <div className="g2">
                <div className="fg"><label className="fl">Document Type</label>
                  <select className="fsel"><option>PLAN</option><option>REPORT</option><option>TECH_MEMO</option><option>DIRECTIVE</option><option>DATA_CALL</option></select>
                </div>
                <div className="fg"><label className="fl">Classification</label>
                  <select className="fsel"><option>CUI</option><option>UNCLASSIFIED</option></select>
                </div>
              </div>
              <div className="g2">
                <div className="fg"><label className="fl">Subprogram</label>
                  <select className="fsel"><option value="">Portfolio-wide</option>{SPS.map(s=><option key={s.id}>{s.id}</option>)}</select>
                </div>
                <div className="fg"><label className="fl">Version</label><input className="fi" defaultValue="1.0"/></div>
              </div>
              <div className="fg"><label className="fl">Description</label><textarea className="fta" rows={3} placeholder="Brief description of document contents"/></div>
              <div className="cal info"><span>⚑</span><span>CUI documents require PIV authentication. SRD access requires formal accreditation — contact System Admin.</span></div>
            </div>
            <div className="mf"><Btn onClick={()=>setModal(false)}>Cancel</Btn><Btn v="bp">Upload & Index</Btn></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================ REPORTS ============================================================ */
function PgReports({ user }) {
  const [tab, setTab] = useState("MSR");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const run = () => { setLoading(true); setResult(null); setTimeout(() => { setLoading(false); setResult(tab); }, 1300); };

  return (
    <div>
      <div className="ph">
        <div className="pe">Module 5</div>
        <div className="pt">Reporting Engine</div>
        <div className="ps">Standardized templates that auto-populate from live portfolio data — consistent definitions across all five subprograms</div>
      </div>
      <div className="tabs">
        {[{id:"MSR",l:"Monthly Status"},{id:"QPR",l:"Quarterly Review"},{id:"ABS",l:"Annual Budget"},{id:"CSC",l:"Cross-Subprogram"}]
          .map(t => <div key={t.id} className={`tab ${tab===t.id?"on":""}`} onClick={()=>{setTab(t.id);setResult(null);}}>{t.l}</div>)}
      </div>
      <div className="g2" style={{gap:22,alignItems:"start"}}>
        <div className="card">
          <div className="ch"><span className="ct">{tab} Configuration</span></div>
          <div className="cb">
            {(tab==="MSR"||tab==="QPR") && <div className="fg"><label className="fl">Subprogram</label><select className="fsel"><option value="">All Subprograms</option>{SPS.map(s=><option key={s.id}>{s.name} ({s.id})</option>)}</select></div>}
            <div className="fg"><label className="fl">Fiscal Year</label><select className="fsel"><option>FY2026</option><option>FY2025</option></select></div>
            {tab==="MSR" && <div className="fg"><label className="fl">Report Month</label><select className="fsel"><option>March (Q2)</option><option>February</option><option>January</option></select></div>}
            {tab==="QPR" && <div className="fg"><label className="fl">Quarter</label><select className="fsel"><option>Q2 (Jan–Mar)</option><option>Q1 (Oct–Dec)</option></select></div>}
            <div className="cal info"><span>⚑</span><span>Reports auto-populate from live PMIS data. Same field definitions apply across all subprograms.</span></div>
            <Btn v="bp" onClick={run} disabled={loading}>{loading?"Generating…":"Generate Report"}</Btn>
          </div>
        </div>
        <div>
          {loading && <div className="ld"><div className="sp"/>Querying portfolio data and populating template…</div>}
          {result && !loading && (
            <div className="card" style={{animation:"fi .3s ease"}}>
              <div className="ch">
                <span className="ct">{result} — Generated {new Date().toLocaleTimeString()}</span>
                <div className="fx g2x"><Btn sz="bs">PDF</Btn><Btn sz="bs">Excel</Btn><Btn sz="bs">PowerPoint Data</Btn></div>
              </div>
              <div className="cb">
                {result==="MSR" && (
                  <div>
                    <div style={{fontFamily:"var(--fd)",fontSize:16,fontWeight:600,color:"var(--n9)",marginBottom:14}}>Monthly Status Report — FY2026 March</div>
                    <div className="g3 mb4">
                      {[{l:"Portfolio Status",v:"AMBER",tl:"A"},{l:"Total Projects",v:"47"},{l:"Critical Alerts",v:"6"}].map(s => (
                        <div key={s.l} style={{padding:"13px 15px",background:"var(--g50)",borderRadius:"var(--r8)",border:"1px solid var(--g200)"}}>
                          <div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--g400)",marginBottom:4}}>{s.l}</div>
                          {s.tl ? <div className="fx ic g2x"><TL s={s.tl}/><span style={{fontWeight:600}}>{s.v}</span></div>
                                : <div style={{fontFamily:"var(--fd)",fontSize:20,fontWeight:700,color:"var(--n9)"}}>{s.v}</div>}
                        </div>
                      ))}
                    </div>
                    {SPS.map(sp => (
                      <div key={sp.id} className="fx ic jb" style={{padding:"8px 0",borderBottom:"1px solid var(--g100)",fontSize:13}}>
                        <div className="fx ic g2x"><TL s={sp.st}/><span style={{fontWeight:500}}>{sp.id}</span><span style={{color:"var(--g500)",fontSize:12}}>{sp.name}</span></div>
                        <div className="fx ic g3x"><span className="fm">{fmt(sp.ac)} / {fmt(sp.pl)}</span><Bdg t={pct(sp.ac,sp.pl)<-10?"rd":pct(sp.ac,sp.pl)<-5?"gd":"gn"}>{pct(sp.ac,sp.pl)}%</Bdg></div>
                      </div>
                    ))}
                  </div>
                )}
                {result==="CSC" && (
                  <div className="tw"><table>
                    <thead><tr><th>Sub</th><th>Projects</th><th>Delayed WPs</th><th>Critical</th><th>Planned</th><th>Actual</th><th>Var %</th><th>Status</th></tr></thead>
                    <tbody>{SPS.map(sp => { const v=pct(sp.ac,sp.pl); return (
                      <tr key={sp.id}>
                        <td style={{fontWeight:600}}>{sp.id}</td><td className="fm">{sp.projects}</td>
                        <td><Bdg t={sp.dl>3?"rd":sp.dl>1?"gd":"gn"}>{sp.dl}</Bdg></td>
                        <td><Bdg t={sp.cr>2?"rd":sp.cr>0?"gd":"gn"}>{sp.cr}</Bdg></td>
                        <td className="fm">{fmt(sp.pl)}</td><td className="fm">{fmt(sp.ac)}</td>
                        <td style={{fontFamily:"var(--fm)",fontWeight:600,color:v<-10?"var(--red)":v<-5?"var(--gld)":"var(--grn)"}}>{v>0?"+":""}{v}%</td>
                        <td><TL s={sp.st}/></td>
                      </tr>);
                    })}</tbody>
                  </table></div>
                )}
                {(result==="QPR"||result==="ABS") && (
                  <div>
                    <div className="cal ok"><span>✓</span><span>Report generated. Data populated from Modules 2, 3, and 5. Export using buttons above.</span></div>
                    {SPS.map(sp => (
                      <div key={sp.id} style={{padding:"11px 0",borderBottom:"1px solid var(--g100)"}}>
                        <div className="fx ic jb">
                          <div className="fx ic g2x"><TL s={sp.st}/><span style={{fontWeight:600,color:"var(--n9)"}}>{sp.name}</span></div>
                          <div className="fx ic g2x"><Bdg t="nv">{sp.projects} projects</Bdg><Bdg t={sp.dl>3?"rd":sp.dl>1?"gd":"gn"}>{sp.dl} delayed WPs</Bdg></div>
                        </div>
                        <div className="fx ic g3x" style={{marginTop:5,fontSize:12,color:"var(--g500)"}}>
                          <span>Obligation: {Math.round(sp.ac/sp.pl*100)}%</span><span>·</span><span>Forecast: {fmt(sp.fo)}</span><span>·</span><span>Critical alerts: {sp.cr}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {!result && !loading && <div className="card"><div className="em"><div className="ei">⊞</div><div className="et">Configure parameters and click Generate Report</div></div></div>}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ AI FINDINGS ============================================================ */
function PgAI({ user }) {
  const [findings, setFindings] = useState(FINDINGS);
  const [fil, setFil] = useState("ALL");
  const [modal, setModal] = useState(null);
  const [disp, setDisp] = useState("ACCEPTED");
  const [notes, setNotes] = useState("");

  const vis = fil==="ALL" ? findings : findings.filter(f => fil==="PENDING" ? f.st==="PENDING" : f.type===fil);
  const pending = findings.filter(f => f.st==="PENDING").length;
  const typeC = { GAP:"nv", DUPLICATION:"gd", SCHEDULE_RISK:"rd" };

  const submit = () => {
    setFindings(p => p.map(f => f.id===modal.id ? { ...f, st:disp, rev:"current_user", notes } : f));
    setModal(null); setNotes("");
  };

  return (
    <div>
      <div className="ph">
        <div className="pe">Module 6 · AI Analysis Layer</div>
        <div className="pt">AI-Assisted Analysis Findings</div>
        <div className="ps">Gap detection · duplication flags · schedule risk — all require human FPM review before reaching leadership dashboards</div>
      </div>
      {pending > 0 && <div className="cal warn"><span>⚑</span><span><strong>{pending} finding{pending>1?"s":""} pending review.</strong> AI findings are decision-support only. FPM review and disposition is required before any finding informs program action.</span></div>}
      <div className="g4 mb6">
        {[{l:"Total",v:findings.length,c:"nv"},{l:"Pending Review",v:pending,c:"gd"},
          {l:"Gap Findings",v:findings.filter(f=>f.type==="GAP").length,c:"nv"},
          {l:"Duplication Flags",v:findings.filter(f=>f.type==="DUPLICATION").length,c:"gd"}]
          .map(s => <div key={s.l} className={`sc ${s.c}`}><div className="sn">{s.v}</div><div className="sl">{s.l}</div></div>)}
      </div>
      <div className="card">
        <div className="ch">
          <span className="ct">Findings Queue</span>
          <div className="fx g2x fw">
            {["ALL","PENDING","GAP","DUPLICATION","SCHEDULE_RISK"].map(f =>
              <Btn key={f} sz="bs" v={fil===f?"bn":"bo"} onClick={()=>setFil(f)}>{f.replace("_"," ")}</Btn>)}
          </div>
        </div>
        <div className="cb" style={{padding:"8px 20px"}}>
          {vis.map(f => <FindCard key={f.id} f={f} typeC={typeC} onReview={() => { setModal(f); setNotes(f.notes||""); }}/>)}
          {vis.length===0 && <div className="em"><div className="et">No findings match this filter</div></div>}
        </div>
      </div>

      {modal && (
        <div className="ov" onClick={()=>setModal(null)}>
          <div className="mo" onClick={e=>e.stopPropagation()}>
            <div className="mh"><span className="mt2">Review Finding — {modal.id}</span><span className="mc" onClick={()=>setModal(null)}>×</span></div>
            <div className="mb2">
              <div className="fx g2x fw" style={{marginBottom:8}}><Bdg t={typeC[modal.type]||"gr"}>{modal.type.replace("_"," ")}</Bdg><Bdg t={confC[modal.conf]}>{modal.conf} CONFIDENCE</Bdg></div>
              <div style={{fontWeight:600,fontSize:14,color:"var(--n9)",marginBottom:8}}>{modal.title}</div>
              <div style={{fontSize:13,color:"var(--g600)",lineHeight:1.6,marginBottom:14}}>{modal.body}</div>
              <div className="fx g2x fw" style={{marginBottom:16}}>{modal.srcs.map(s=><span key={s} className="src">{s}</span>)}</div>
              <div className="fg"><label className="fl">Disposition</label>
                <select className="fsel" value={disp} onChange={e=>setDisp(e.target.value)}>
                  <option value="ACCEPTED">ACCEPTED — Finding is valid, action required</option>
                  <option value="REJECTED">REJECTED — Not accurate or not applicable</option>
                  <option value="NEEDS_MORE_INFO">NEEDS MORE INFO — Cannot disposition without additional data</option>
                </select>
              </div>
              <div className="fg"><label className="fl">Review Notes (required)</label>
                <textarea className="fta" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Explain your disposition. If accepted, describe planned action."/>
              </div>
              <div className="cal info"><span>⚑</span><span>Your disposition and notes will be audit-logged. Accepted findings appear on FPM dashboard after review.</span></div>
            </div>
            <div className="mf"><Btn onClick={()=>setModal(null)}>Cancel</Btn><Btn v="bp" disabled={!notes.trim()} onClick={submit}>Submit Review</Btn></div>
          </div>
        </div>
      )}
    </div>
  );
}

function FindCard({ f, typeC, onReview }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fc">
      <div className="fh" onClick={()=>setOpen(!open)}>
        <div style={{flex:1}}>
          <div className="fx g2x fw" style={{marginBottom:6}}><Bdg t={typeC[f.type]||"gr"}>{f.type.replace("_"," ")}</Bdg><Bdg t={confC[f.conf]}>{f.conf}</Bdg><Bdg t={stCol[f.st]||"gr"}>{f.st}</Bdg></div>
          <div className="ftl">{f.title}</div>
          <div className="fmeta">{f.id} · {f.sub} · human_review_required: TRUE</div>
        </div>
        <span style={{color:"var(--g400)",fontSize:11,flexShrink:0}}>{open?"▲":"▼"}</span>
      </div>
      {open && (
        <>
          <div className="fbdy">{f.body}</div>
          <div style={{padding:"0 16px 12px",display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--g400)",marginRight:2}}>SOURCE REFS:</span>
            {f.srcs.map(s => <span key={s} className="src">{s}</span>)}
          </div>
          {f.notes && <div style={{padding:"0 16px 12px"}}>
            <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--g400)",marginBottom:3}}>REVIEW NOTES ({f.rev})</div>
            <div style={{fontSize:12,color:"var(--g600)",fontStyle:"italic"}}>{f.notes}</div>
          </div>}
          <div className="fac">
            <Btn v="bp" sz="bs" onClick={onReview}>{f.st==="PENDING"?"Review & Disposition":"Update Review"}</Btn>
            <span className="fm tm" style={{marginLeft:8}}>BATCH-0091</span>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================ NL QUERY ============================================================ */
function PgQuery({ user }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const [tab, setTab] = useState("query");

  const examples = [
    "What work packages support W88 Alt 370 and are behind schedule?",
    "Which ICF projects have unreviewed AI findings?",
    "Show budget variance greater than 5% across all subprograms for FY2026",
    "Are there cross-subprogram dependencies with unresolved risks?",
  ];

  const submit = async () => {
    if (!q.trim()) return;
    setLoading(true); setResp(null);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`You are the AI Analysis Layer of the NNSA NA-11 PMIS (APEX by Leidos). Answer questions about the program portfolio strictly from the context provided. Cite specific entity IDs for every factual claim. Respond ONLY in JSON: {"answer":string,"confidence":"HIGH"|"MEDIUM"|"LOW","source_refs":string[],"human_review_required":boolean,"reasoning":string}. Do not speculate beyond provided data.`,
          messages:[{role:"user",content:`Portfolio query from ${user.role} (${user.sub}):

Query: "${q}"

PMIS context:
- Delayed WPs: ${WPS.filter(w=>w.st==="DELAYED").map(w=>`${w.id} (${w.vd}d variance)`).join(", ")}
- AI Findings pending: ${FINDINGS.filter(f=>f.st==="PENDING").map(f=>f.id).join(", ")}
- Budget variance: WTMM ${pct(SPS[4].ac,SPS[4].pl)}%, EIA ${pct(SPS[1].ac,SPS[1].pl)}%, ASC ${pct(SPS[3].ac,SPS[3].pl)}%
- Projects: ${PROJECTS.slice(0,6).map(p=>`${p.id} (${p.st==="R"?"RED":p.st==="A"?"AMBER":"GREEN"}, ${fmt(p.pl)} planned)`).join("; ")}

Answer based only on this context.`}]
        })
      });
      const d = await r.json();
      const txt = d.content?.find(b=>b.type==="text")?.text || "";
      let parsed;
      try { parsed = JSON.parse(txt.replace(/```json|```/g,"").trim()); }
      catch { parsed = { answer:txt, confidence:"MEDIUM", source_refs:["PMIS-CONTEXT"], human_review_required:true, reasoning:"Response could not be parsed as structured JSON." }; }
      setResp({ ...parsed, latency:Math.round(Math.random()*800+1100), tokens:d.usage?.output_tokens||90 });
    } catch(e) {
      setResp({ answer:`Query engine error: ${e.message}. In production this calls the PMIS retrieval layer (FTS + semantic reranking) then Claude API.`, confidence:"LOW", source_refs:[], human_review_required:true, reasoning:"API call failed." });
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="ph">
        <div className="pe">Module 6 · Natural Language Query</div>
        <div className="pt">Portfolio Query Interface</div>
        <div className="ps">Ask plain-language questions. Every answer is grounded in PMIS records with source citations.</div>
        <div className="pm"><span>RAG Pipeline: FTS pre-filter → semantic reranking → Claude synthesis</span><span>·</span><span>Token budget: 8,000 in / 1,000 out per query</span></div>
      </div>
      <div className="tabs">
        <div className={`tab ${tab==="query"?"on":""}`} onClick={()=>setTab("query")}>Query Interface</div>
        <div className={`tab ${tab==="history"?"on":""}`} onClick={()=>setTab("history")}>Query History ({NL_HIST.length})</div>
      </div>

      {tab==="query" && (
        <div className="g2" style={{gap:22,alignItems:"start"}}>
          <div>
            <div className="card mb4">
              <div className="ch"><span className="ct">Portfolio Query</span></div>
              <div className="cb">
                <label className="fl">Ask a question about your portfolio</label>
                <div className="qb">
                  <textarea className="qta" value={q} onChange={e=>setQ(e.target.value)}
                    onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();submit();}}}
                    placeholder="e.g. What work packages in WTMM are behind schedule?" rows={3}/>
                  <div className="qft">
                    <span className="fm tm">Enter to submit · Shift+Enter for new line</span>
                    <div className="fx g2x">
                      <Btn sz="bs" onClick={()=>setQ("")}>Clear</Btn>
                      <Btn v="bp" sz="bs" disabled={loading||!q.trim()} onClick={submit}>{loading?"Querying…":"Submit"}</Btn>
                    </div>
                  </div>
                </div>
                {loading && <div className="ld mt4"><div className="sp"/>Stage 1: retrieving PMIS context · Stage 2: synthesizing with Claude…</div>}
                {resp && !loading && (
                  <div className="rcard mt4">
                    <div className="fx ic jb" style={{marginBottom:12}}>
                      <span className="fm tm">claude-sonnet-4-20250514 · {resp.latency}ms · {resp.tokens} tokens</span>
                      <div className="cbr">
                        <span className="tm fm">CONFIDENCE</span>
                        <div className="cbt"><div className={`cbf ${resp.confidence?.charAt(0)||"M"}`}/></div>
                        <Bdg t={confC[resp.confidence?.charAt(0)||"M"]}>{resp.confidence}</Bdg>
                      </div>
                    </div>
                    <div className="rtxt">{resp.answer}</div>
                    {resp.source_refs?.length > 0 && (
                      <div style={{marginTop:14}}>
                        <div className="fm tm" style={{marginBottom:6}}>SOURCE REFERENCES</div>
                        <div className="fx g2x fw">{resp.source_refs.map(s=><span key={s} className="src">{s}</span>)}</div>
                      </div>
                    )}
                    {resp.reasoning && <div className="fm tm" style={{fontSize:11,marginTop:10}}>CONFIDENCE REASONING: {resp.reasoning}</div>}
                    {resp.human_review_required && <div className="rev-b">⚑ human_review_required = TRUE — Verify this answer against source records before using it to inform program decisions. AI outputs do not constitute program direction.</div>}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="card mb4">
              <div className="ch"><span className="ct">Example Queries</span></div>
              <div className="cb" style={{padding:"8px 16px"}}>
                {examples.map((ex,i)=>(
                  <div key={i} onClick={()=>setQ(ex)} style={{padding:"10px 12px",border:"1px solid var(--g200)",borderRadius:"var(--r8)",marginBottom:8,cursor:"pointer",fontSize:12,color:"var(--g600)",lineHeight:1.4,transition:"all .15s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--n4)";e.currentTarget.style.background="var(--n0)"}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--g200)";e.currentTarget.style.background="transparent"}}>
                    "{ex}"
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="ch"><span className="ct">RAG Pipeline Status</span></div>
              <div className="cb" style={{padding:"10px 16px"}}>
                {[{l:"Embedding Coverage",v:"94%",ok:true},{l:"FTS Index",v:"LIVE",ok:true},{l:"Last Refresh",v:"06:00",ok:true},{l:"Stale Embeddings",v:"12",ok:false},{l:"Token Budget",v:"8K / 1K",ok:true},{l:"API Status",v:"OPERATIONAL",ok:true}]
                  .map(r=>(
                    <div key={r.l} className="fx jb" style={{padding:"7px 0",borderBottom:"1px solid var(--g100)",fontSize:12}}>
                      <span className="fm tm">{r.l}</span>
                      <span className="fm" style={{fontWeight:600,color:r.ok?"var(--grn)":"var(--gld)"}}>{r.v}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab==="history" && (
        <div className="card">
          <div className="cb">
            {NL_HIST.map(h => (
              <div key={h.id} style={{padding:"14px 0",borderBottom:"1px solid var(--g100)"}}>
                <div className="fx ic jb" style={{marginBottom:6}}>
                  <div style={{fontSize:13,fontStyle:"italic",color:"var(--g600)",flex:1,paddingRight:12}}>"{h.q}"</div>
                  <Bdg t={confC[h.conf]}>{h.conf==="H"?"HIGH":"MEDIUM"}</Bdg>
                </div>
                <div style={{fontSize:13,color:"var(--g700)",lineHeight:1.5,marginBottom:8}}>{h.a}</div>
                <div className="fx g2x fw">{h.srcs.map(s=><span key={s} className="src">{s}</span>)}</div>
                <div className="fm tm" style={{fontSize:10,marginTop:6}}>{h.id} · {h.ts}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================ USERS ============================================================ */
function PgUsers({ user }) {
  const [users, setUsers] = useState(USERS);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [newU, setNewU] = useState({ name:"", email:"", role:"FPM", sub:"AS" });

  const filt = users.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()));
  const toggle = id => setUsers(p => p.map(u => u.id===id ? { ...u, st:u.st==="ACTIVE"?"INACTIVE":"ACTIVE" } : u));
  const provision = () => {
    setUsers(p => [...p, { ...newU, id:`U00${p.length+1}`, ini:newU.name.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2)||"XX", st:"ACTIVE", ses:0, piv:false, mfa:false, last:"Just now" }]);
    setModal(false); setNewU({ name:"", email:"", role:"FPM", sub:"AS" });
  };

  return (
    <div>
      <div className="ph">
        <div className="pe">Module 7 · User Management</div>
        <div className="pt">Users & Access Control</div>
        <div className="ps">User lifecycle · role assignments · PIV/CAC authentication · session management</div>
      </div>
      <div className="g4 mb6">
        {[{l:"Total Users",v:users.length,c:"nv"},{l:"Active",v:users.filter(u=>u.st==="ACTIVE").length,c:"gn"},
          {l:"PIV Enrolled",v:users.filter(u=>u.piv).length,c:"nv"},{l:"Active Sessions",v:users.reduce((a,u)=>a+u.ses,0),c:"gd"}]
          .map(s => <div key={s.l} className={`sc ${s.c}`}><div className="sn">{s.v}</div><div className="sl">{s.l}</div></div>)}
      </div>
      <div className="card">
        <div className="ch">
          <span className="ct">User Directory</span>
          <div className="fx g2x ic">
            <input className="fi" style={{width:220}} placeholder="Search users…" value={search} onChange={e=>setSearch(e.target.value)}/>
            <Btn v="bp" onClick={()=>setModal(true)}>+ Provision User</Btn>
          </div>
        </div>
        <div className="cb" style={{padding:"4px 20px"}}>
          {filt.map(u => (
            <div key={u.id} className="ur2">
              <div className="av2">{u.ini}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:500,color:"var(--n9)",fontSize:13}}>{u.name}</div>
                <div className="fm tm" style={{marginTop:2}}>Last login: {u.last}</div>
                <div className="fx g2x fw" style={{marginTop:6}}>
                  <Bdg t="nv">{u.role}</Bdg>
                  <Bdg t={u.st==="ACTIVE"?"gn":"gr"}>{u.st}</Bdg>
                  {u.piv && <Bdg t="gn">PIV</Bdg>}
                  {u.mfa && <Bdg t="nv">MFA</Bdg>}
                  <span className="fm tm">SP: {u.sub}</span>
                  {u.ses > 0 && <span className="fm" style={{color:"var(--grn)"}}>{u.ses} session{u.ses>1?"s":""}</span>}
                </div>
              </div>
              <div className="fx g2x">
                <Btn sz="bs">Edit Role</Btn>
                <Btn sz="bs" v={u.st==="ACTIVE"?"bp":"bo"} onClick={()=>toggle(u.id)}>{u.st==="ACTIVE"?"Deactivate":"Reactivate"}</Btn>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <div className="ov" onClick={()=>setModal(false)}>
          <div className="mo" onClick={e=>e.stopPropagation()}>
            <div className="mh"><span className="mt2">Provision New User</span><span className="mc" onClick={()=>setModal(false)}>×</span></div>
            <div className="mb2">
              <div className="cal info"><span>⚑</span><span>A provisioning token will be sent to the user's .gov email. Single-use, expires 72 hours. PIV enrollment required before first login.</span></div>
              <div className="fg"><label className="fl">Full Name</label><input className="fi" value={newU.name} onChange={e=>setNewU({...newU,name:e.target.value})} placeholder="Dr. Jane Smith"/></div>
              <div className="fg"><label className="fl">Government Email</label><input className="fi" value={newU.email} onChange={e=>setNewU({...newU,email:e.target.value})} placeholder="j.smith@nnsa.doe.gov"/></div>
              <div className="g2">
                <div className="fg"><label className="fl">Role</label>
                  <select className="fsel" value={newU.role} onChange={e=>setNewU({...newU,role:e.target.value})}>
                    <option>FPM</option><option>SUBPROGRAM_MANAGER</option><option>PADA</option><option>READ_ONLY</option><option>SYSTEM_ADMIN</option>
                  </select>
                </div>
                <div className="fg"><label className="fl">Subprogram</label>
                  <select className="fsel" value={newU.sub} onChange={e=>setNewU({...newU,sub:e.target.value})}>
                    <option value="ALL">ALL</option>{SPS.map(s=><option key={s.id}>{s.id}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="mf"><Btn onClick={()=>setModal(false)}>Cancel</Btn><Btn v="bp" disabled={!newU.name||!newU.email} onClick={provision}>Provision & Send Token</Btn></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================ AUDIT ============================================================ */
function PgAudit({ user }) {
  const [fil, setFil] = useState("ALL");
  const acts = [...new Set(AUDIT_LOG.map(e=>e.act))];
  const vis = fil==="ALL" ? AUDIT_LOG : AUDIT_LOG.filter(e=>e.act===fil);
  const aC = { SESSION_CREATE:"nv", ROLE_CHANGE:"rd", BUDGET_ACTUALS:"gd", AI_FINDING_REVIEW:"gn", NL_QUERY:"nv", USER_PROVISION:"gn", DOCUMENT_UPLOAD:"nv", WP_STATUS_UPDATE:"gd", REPORT_GENERATE:"nv" };

  return (
    <div>
      <div className="ph">
        <div className="pe">Module 7 · Audit Log</div>
        <div className="pt">Immutable Audit Trail</div>
        <div className="ps">Append-only record of all data modifications. Every entry logged with user ID, timestamp, and changed entity. Cannot be edited or deleted by any user.</div>
      </div>
      <div className="card">
        <div className="ch">
          <span className="ct">Event Stream</span>
          <div className="fx g2x fw">
            <Btn sz="bs" v={fil==="ALL"?"bn":"bo"} onClick={()=>setFil("ALL")}>ALL</Btn>
            {acts.map(a => <Btn key={a} sz="bs" v={fil===a?"bn":"bo"} onClick={()=>setFil(a)} style={{fontSize:"9px"}}>{a.replace(/_/g," ")}</Btn>)}
          </div>
        </div>
        <div className="cb" style={{padding:"8px 20px"}}>
          {vis.map((e,i) => (
            <div key={i} className="al">
              <span style={{color:"var(--g500)"}}>{e.ts}</span>
              <span><Bdg t={aC[e.act]||"gr"}>{e.act.replace(/_/g," ")}</Bdg></span>
              <span style={{color:"var(--n6)"}}>{e.usr}</span>
              <span style={{color:"var(--g700)"}}>{e.det}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ TRAINING ============================================================ */
function PgTraining({ user }) {
  const [track, setTrack] = useState("FPM");
  const [active, setActive] = useState(null);
  const [done, setDone] = useState({});
  const steps = track === "GLOSSARY" ? [] : (TR_DATA[track] || []);
  const mods = [...new Set(steps.map(s=>s.mod))];

  return (
    <div>
      <div className="ph">
        <div className="pe">Module 8 · Training & Onboarding</div>
        <div className="pt">Role Walkthroughs & Glossary</div>
        <div className="ps">Step-by-step guidance with function references. Content generated from the completed system.</div>
      </div>
      <div className="tabs">
        {["FPM","LEADERSHIP","ADMIN"].map(t =>
          <div key={t} className={`tab ${track===t?"on":""}`} onClick={()=>{setTrack(t);setActive(null);}}>{t}</div>)}
        <div className={`tab ${track==="GLOSSARY"?"on":""}`} onClick={()=>{setTrack("GLOSSARY");setActive(null);}}>Glossary</div>
      </div>

      {track==="GLOSSARY" ? (
        <div className="card">
          <div className="cb">
            {GLOSSARY.map(g => (
              <div key={g.term} className="ge">
                <div className="gw">{g.term}<span className="gc">{g.ctx}</span></div>
                <div className="gdf">{g.def}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="g2" style={{gap:22,alignItems:"start"}}>
          <div>
            {mods.map(mod => (
              <div key={mod} style={{marginBottom:16}}>
                <div className="fm tm" style={{marginBottom:8,letterSpacing:".08em",textTransform:"uppercase"}}>Module {mod}</div>
                {steps.filter(s=>s.mod===mod).map((s,i) => (
                  <div key={s.id} className={`ts ${active===s.id?"on":""} ${s.dn||done[s.id]?" dn":""}`} onClick={()=>setActive(active===s.id?null:s.id)}>
                    <div className="tsn">{s.dn||done[s.id]?"✓":i+1}</div>
                    <div style={{flex:1}}>
                      <div className="fm tm" style={{fontSize:10,marginBottom:2}}>Step {i+1}</div>
                      <div className="tst">{s.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div>
            {active ? (() => {
              const s = steps.find(x=>x.id===active);
              return (
                <div className="card" style={{position:"sticky",top:60}}>
                  <div className="ch"><span className="ct">{s.title}</span><Bdg t={s.dn||done[s.id]?"gn":"gd"}>{s.dn||done[s.id]?"COMPLETE":"IN PROGRESS"}</Bdg></div>
                  <div className="cb">
                    <div className="fm" style={{fontSize:10,color:"var(--red)",marginBottom:10}}>MODULE {s.mod} · {track} TRACK</div>
                    <div className="tsb">Navigate to the corresponding module in the APEX sidebar to complete this task. The system logs your progress automatically.</div>
                    <div className="tsc">{s.code}</div>
                    <div style={{marginTop:18,display:"flex",gap:8}}>
                      <Btn v="bp" onClick={()=>setDone(p=>({...p,[s.id]:!p[s.id]}))}>
                        {s.dn||done[s.id]?"Mark Incomplete":"Mark Complete"}
                      </Btn>
                      <Btn>Contextual Help</Btn>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="card" style={{position:"sticky",top:60}}>
                <div className="cb"><div className="em"><div className="ei">→</div><div className="et">Select a step to view walkthrough content</div></div></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
