import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Landmark, Tractor, Sprout, ChevronRight, CheckCircle2, MapPin, UserRound, WalletCards, ClipboardCheck, Gauge, FolderOpen, Radio, MessageSquare, BookOpen, Eye, Heart, Building2, ChartNoAxesCombined, FileCheck2, Newspaper, Bell, Menu, Search, Plus, SlidersHorizontal, Flag, Settings, BriefcaseBusiness, LogOut, CircleDollarSign } from 'lucide-react';
import { StatusBadge, Metric, ChartCard, FarmCard } from '../components/common';

function money(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n)}

const provinces=['Mashonaland Central','Mashonaland East','Mashonaland West','Midlands','Manicaland','Matabeleland North','Masvingo'];
const farms=[
 {id:1,name:'Nyika Plains Farm',farmer:'Tendai Moyo',loc:'Mazowe, Mashonaland Central',province:'Mashonaland Central',district:'Mazowe',crop:'Maize',size:120,need:85000,ready:'Strong',status:'Field Verification',date:'18 Aug 2026',tenure:'A2 offer letter',irrigation:'Borehole + pivot',offtaker:'Confirmed',score:82,history:[3.1,4.2,4.8],docs:5},
 {id:2,name:'Mupfure Agri Estate',farmer:'Grace Chirwa',loc:'Chegutu, Mashonaland West',province:'Mashonaland West',district:'Chegutu',crop:'Soybeans',size:210,need:140000,ready:'Strong',status:'Verified',date:'02 Aug 2026',tenure:'Lease',irrigation:'Dam access',offtaker:'Contracted',score:88,history:[2.2,2.8,3.3],docs:7},
 {id:3,name:'Green Valley Produce',farmer:'Farai Nyathi',loc:'Mutare, Manicaland',province:'Manicaland',district:'Mutare',crop:'Horticulture',size:38,need:42000,ready:'Moderate',status:'Document Review',date:'11 Aug 2026',tenure:'Communal/customary',irrigation:'Drip lines',offtaker:'Buyer letters',score:68,history:[1.4,1.6,1.9],docs:4},
 {id:4,name:'Umfuli Grain & Livestock',farmer:'Blessing Sibanda',loc:'Kwekwe, Midlands',province:'Midlands',district:'Kwekwe',crop:'Wheat',size:175,need:120000,ready:'Moderate',status:'Submitted',date:'06 Aug 2026',tenure:'Lease',irrigation:'Seasonal river',offtaker:'Pending',score:61,history:[2.7,3.0,2.9],docs:3},
 {id:5,name:'Mazowe Horticulture Estate',farmer:'Rudo Matema',loc:'Bindura, Mashonaland Central',province:'Mashonaland Central',district:'Bindura',crop:'Horticulture',size:62,need:65000,ready:'Strong',status:'Verified',date:'15 Aug 2026',tenure:'Title deed',irrigation:'Borehole + reservoir',offtaker:'Supermarket LOI',score:90,history:[1.9,2.4,2.8],docs:8}
];
const institutions=[
 {name:'AgriCredit Zimbabwe',type:'Agricultural lender',focus:'Input finance, working capital',regions:'National',verified:true},
 {name:'Zambezi Microfinance',type:'Microfinance',focus:'Smallholder production loans',regions:'Mashonaland, Midlands',verified:true},
 {name:'Harvest Mutual Insurance',type:'Insurance',focus:'Weather-index and crop insurance',regions:'Pilot districts',verified:false}
];
const news=[
 {cat:'Markets',title:'Sample: Grain market dashboard shows rising demand for verified supplier data',source:'FarmLink Sample Intelligence',date:'21 Aug 2026'},
 {cat:'Weather',title:'Sample: Irrigation planning remains central for winter wheat financing decisions',source:'FarmLink Sample Intelligence',date:'20 Aug 2026'},
 {cat:'Finance',title:'Sample: Lenders increase focus on production evidence and offtaker records',source:'FarmLink Sample Intelligence',date:'18 Aug 2026'}
];

export default function Home() {
  return (
    <div>
      <header className="public-top">
        <div className="nav-wrap">
          <div className="brand">
            <div className="brand-mark"><Sprout size={21}/></div>
            FarmLink Zimbabwe
          </div>
          <nav className="public-links">
            <Link to="/how-it-works">How it works</Link>
            <Link to="/farms">Farms</Link>
            <Link to="/financing">Financing</Link>
            <Link to="/agri-news">Agri News</Link>
            <Link to="/about">About</Link>
          </nav>
          <div className="actions">
            <Link to="/login"><button className="btn ghost">Sign In</button></Link>
            <Link to="/login"><button className="btn primary">Get Started</button></Link>
          </div>
        </div>
      </header>
      <main>
        <section className="hero">
          <div>
            <div className="eyebrow">Verified information → Better decisions → More productive capital</div>
            <h1>Making Zimbabwean agriculture more bankable.</h1>
            <p className="lead">FarmLink verifies agricultural operations, organizes farm intelligence and connects credible agricultural businesses with financing ecosystems.</p>
            <div className="actions" style={{marginTop:26,flexWrap:'wrap'}}>
              <Link to="/login"><button className="btn primary">Get Your Farm Verified</button></Link>
              <Link to="/login"><button className="btn">Explore Farm Opportunities</button></Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="map-card">
              <div>
                <span className="pill">Trust layer active</span>
                <h2 style={{color:'white',marginTop:14}}>Farm intelligence map</h2>
                <p style={{color:'#dbe9df'}}>Fictional demonstration data across Mashonaland, Midlands, Manicaland and Masvingo.</p>
              </div>
              <div className="floating">
                <div className="split">
                  <b>Nyika Plains Farm</b>
                  <StatusBadge status="Field Verification"/>
                </div>
                <div className="grid cols3" style={{marginTop:12}}>
                  <span>120 ha</span>
                  <span>Maize</span>
                  <span>82%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section grid cols3" id="how">
          <div className="card">
            <ShieldCheck/>
            <h3>1. Verify</h3>
            <p className="muted">Identity, land documentation, GPS evidence and operational data are reviewed through a structured verification process.</p>
          </div>
          <div className="card">
            <Landmark/>
            <h3>2. Assess</h3>
            <p className="muted">Lenders and institutions access structured farm intelligence to support underwriting and risk assessment decisions.</p>
          </div>
          <div className="card">
            <Tractor/>
            <h3>3. Finance</h3>
            <p className="muted">Verified farms connect with appropriate financing products, offtake relationships and institutional partners.</p>
          </div>
        </section>

        <section className="section">
          <div className="split">
            <div>
              <h2>Featured Farms</h2>
              <p className="muted">Verified and in-process agricultural operations across Zimbabwe.</p>
            </div>
            <Link to="/farms"><button className="btn">View all farms <ChevronRight size={15}/></button></Link>
          </div>
          <div className="grid cols3" style={{marginTop:24}}>
            {farms.slice(0,3).map(farm => (
              <FarmCard key={farm.id} farm={farm} onOpen={(id) => console.log('Open farm', id)}/>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="split">
            <div>
              <h2>Featured Institutions</h2>
              <p className="muted">Financial institutions and agricultural partners on FarmLink.</p>
            </div>
          </div>
          <div className="grid cols3" style={{marginTop:24}}>
            {institutions.map((inst, i) => (
              <div key={i} className="card">
                <div className="split">
                  <div>
                    <h3>{inst.name}</h3>
                    <p className="muted">{inst.type}</p>
                  </div>
                  {inst.verified && <span className="pill neutral"><CheckCircle2 size={14}/> Verified</span>}
                </div>
                <div style={{marginTop:16}}>
                  <b>Focus</b>
                  <p className="muted">{inst.focus}</p>
                </div>
                <div style={{marginTop:12}}>
                  <b>Regions</b>
                  <p className="muted">{inst.regions}</p>
                </div>
                <button className="btn small" style={{marginTop:16}}>View Profile</button>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="split">
            <div>
              <h2>Agricultural News</h2>
              <p className="muted">Market insights, weather updates and policy information.</p>
            </div>
            <Link to="/agri-news"><button className="btn">View all news <ChevronRight size={15}/></button></Link>
          </div>
          <div className="grid cols3" style={{marginTop:24}}>
            {news.map((item, i) => (
              <div key={i} className="card">
                <span className="pill info">{item.cat}</span>
                <h3 style={{marginTop:12}}>{item.title}</h3>
                <p className="muted" style={{marginTop:8}}>{item.source}</p>
                <p className="muted" style={{marginTop:4}}>{item.date}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{textAlign:'center',padding:'60px 20px'}}>
          <h2>Ready to build a verified farm profile?</h2>
          <p className="lead" style={{marginTop:12}}>Join FarmLink to establish credibility and connect with financing partners.</p>
          <div className="actions" style={{justifyContent:'center',marginTop:24}}>
            <Link to="/login"><button className="btn primary">Get Your Farm Verified</button></Link>
            <Link to="/login"><button className="btn">Lender Sign In</button></Link>
          </div>
        </section>
      </main>
    </div>
  );
}