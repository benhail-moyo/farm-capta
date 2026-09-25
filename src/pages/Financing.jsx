import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, WalletCards, Building2, ChevronRight, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '../components/common';

const products=[
  {provider:'AgriCredit Zimbabwe',type:'Input finance',range:'US$5k–US$150k',duration:'6–12 months',eligibility:'Verified farm profile, production plan, buyer evidence',docs:'ID, land document, crop budget',regions:'National'},
  {provider:'Zambezi Microfinance',type:'Irrigation finance',range:'US$2k–US$35k',duration:'12–24 months',eligibility:'Water source and field verification',docs:'Quotations, photos, consent',regions:'Mashonaland, Midlands'},
  {provider:'Harvest Mutual Insurance',type:'Crop insurance',range:'Seasonal cover',duration:'One production cycle',eligibility:'Verified GPS boundary and crop declaration',docs:'Farm map, crop schedule',regions:'Pilot districts'},
  {provider:'AgriCredit Zimbabwe',type:'Equipment finance',range:'US$10k–US$200k',duration:'24–48 months',eligibility:'Equipment quotation, operational history',docs:'Asset details, insurance proof',regions:'National'},
  {provider:'Zambezi Microfinance',type:'Working capital',range:'US$3k–US$50k',duration:'3–9 months',eligibility:'Verified farm and trading history',docs:'Financial records, buyer contracts',regions:'Mashonaland, Midlands'},
  {provider:'Regional Bank',type:'Livestock finance',range:'US$15k–US$100k',duration:'12–36 months',eligibility:'Vet certification, livestock records',docs:'Animal inventory, health certificates',regions:'Selected provinces'}
];

const institutions=[
  {name:'AgriCredit Zimbabwe',type:'Agricultural lender',focus:'Input finance, working capital',regions:'National',verified:true,description:'Specialized agricultural financing institution with focus on smallholder and commercial farmers.'},
  {name:'Zambezi Microfinance',type:'Microfinance',focus:'Smallholder production loans',regions:'Mashonaland, Midlands',verified:true,description:'Microfinance institution dedicated to agricultural production and rural development.'},
  {name:'Harvest Mutual Insurance',type:'Insurance',focus:'Weather-index and crop insurance',regions:'Pilot districts',verified:false,description:'Insurance provider specializing in agricultural risk management products.'},
  {name:'Regional Bank',type:'Commercial Bank',focus:'Agricultural banking services',regions:'National',verified:true,description:'Full-service commercial bank with dedicated agricultural division.'}
];

export default function Financing() {
  return (
    <div>
      <header className="public-top">
        <div className="nav-wrap">
          <div className="brand">
            <div className="brand-mark"><Sprout size={21}/></div>
            FarmLink Zimbabwe
          </div>
          <nav className="public-links">
            <Link to="/">Home</Link>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/farms">Farms</Link>
            <Link to="/financing" className="active">Financing</Link>
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
        <section className="hero" style={{padding:'60px 20px'}}>
          <div style={{maxWidth:800,margin:'0 auto'}}>
            <h1>Agricultural Financing</h1>
            <p className="lead" style={{marginTop:16}}>Discover financing products from verified agricultural institutions across Zimbabwe.</p>
          </div>
        </section>

        <section className="section">
          <h2 style={{marginBottom:24}}>Financing Products</h2>
          <div className="grid cols2">
            {products.map((product, i) => (
              <div key={i} className="card">
                <div className="split">
                  <div>
                    <h3>{product.type}</h3>
                    <p className="muted">{product.provider}</p>
                  </div>
                  <span className="pill neutral">{product.range}</span>
                </div>
                <div className="grid cols2" style={{marginTop:16}}>
                  <div>
                    <b>Duration</b>
                    <p className="muted">{product.duration}</p>
                  </div>
                  <div>
                    <b>Regions</b>
                    <p className="muted">{product.regions}</p>
                  </div>
                </div>
                <div style={{marginTop:16}}>
                  <b>Eligibility</b>
                  <p className="muted">{product.eligibility}</p>
                </div>
                <div style={{marginTop:12}}>
                  <b>Required Documents</b>
                  <p className="muted">{product.docs}</p>
                </div>
                <div className="split" style={{marginTop:20}}>
                  <button className="btn small">Check Eligibility</button>
                  <button className="btn small primary">Start Application</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 style={{marginBottom:24}}>Financing Institutions</h2>
          <div className="grid cols3">
            {institutions.map((inst, i) => (
              <div key={i} className="card">
                <div className="split">
                  <div>
                    <h3>{inst.name}</h3>
                    <p className="muted">{inst.type}</p>
                  </div>
                  {inst.verified && <span className="pill neutral"><CheckCircle2 size={14}/> Verified</span>}
                </div>
                <p className="muted" style={{marginTop:16}}>{inst.description}</p>
                <div className="grid cols2" style={{marginTop:16}}>
                  <div>
                    <b>Focus</b>
                    <p className="muted">{inst.focus}</p>
                  </div>
                  <div>
                    <b>Regions</b>
                    <p className="muted">{inst.regions}</p>
                  </div>
                </div>
                <button className="btn small" style={{marginTop:20}}>View Institution Profile</button>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{background:'#f8f9fa',padding:'60px 20px'}}>
          <div className="grid cols2">
            <div>
              <h2>How Financing Works</h2>
              <div style={{marginTop:24}}>
                <div className="tl"><ShieldCheck size={20}/><b>Get Verified</b><p className="muted">Complete farm verification to establish credibility with lenders</p></div>
                <div className="tl"><WalletCards size={20}/><b>Browse Products</b><p className="muted">Explore financing products that match your farm's needs</p></div>
                <div className="tl"><Building2 size={20}/><b>Apply Online</b><p className="muted">Submit applications directly to verified institutions</p></div>
                <div className="tl"><CheckCircle2 size={20}/><b>Track Progress</b><p className="muted">Monitor application status and respond to lender requests</p></div>
              </div>
            </div>
            <div className="card">
              <h3>Financing Readiness</h3>
              <p className="muted">FarmLink helps farmers improve their financing readiness through structured verification and documentation.</p>
              <div style={{marginTop:20,padding:'16px',background:'rgba(47,125,85,0.1)',border:'1px solid rgba(47,125,85,0.3)',borderRadius:8}}>
                <p style={{fontSize:13,color:'#2f7d55'}}>Verified farms typically receive faster processing and better terms from financing partners.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{textAlign:'center',padding:'60px 20px'}}>
          <h2>Ready to explore financing options?</h2>
          <p className="lead" style={{marginTop:12}}>Complete your farm verification to access financing products.</p>
          <div className="actions" style={{justifyContent:'center',marginTop:24}}>
            <Link to="/login"><button className="btn primary">
              Complete Farm Verification <ChevronRight size={15}/>
            </button></Link>
            <Link to="/login"><button className="btn">Institution Sign In</button></Link>
          </div>
        </section>
      </main>
    </div>
  );
}