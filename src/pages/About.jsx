import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Landmark, Target, Users, CheckCircle2, MapPin, Award, Heart, BriefcaseBusiness } from 'lucide-react';

export default function About() {
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
            <Link to="/financing">Financing</Link>
            <Link to="/agri-news">Agri News</Link>
            <Link to="/about" className="active">About</Link>
          </nav>
          <div className="actions">
            <Link to="/login"><button className="btn ghost">Sign In</button></Link>
            <Link to="/login"><button className="btn primary">Get Started</button></Link>
          </div>
        </div>
      </header>
      <main>
        <section className="hero" style={{padding:'80px 20px'}}>
          <div style={{maxWidth:800,margin:'0 auto',textAlign:'center'}}>
            <h1>About FarmLink</h1>
            <p className="lead" style={{marginTop:16}}>Building trusted agricultural verification and financing infrastructure for Zimbabwe.</p>
          </div>
        </section>

        <section className="section">
          <div className="grid cols2">
            <div>
              <h2>Our Mission</h2>
              <p className="muted" style={{marginTop:16,fontSize:16,lineHeight:1.6}}>
                FarmLink helps agriculture become more bankable by making farms, farmers, land information, operational data and agricultural opportunities easier to verify and assess.
              </p>
              <p className="muted" style={{marginTop:12,fontSize:16,lineHeight:1.6}}>
                We believe that verified information leads to better decisions and more productive capital allocation in the agricultural sector.
              </p>
            </div>
            <div className="card">
              <Target/>
              <h3>Our Vision</h3>
              <p className="muted" style={{marginTop:16}}>
                To create a trusted agricultural ecosystem where verified farm profiles enable efficient financing decisions, and where agricultural investment infrastructure is built on transparency and evidence.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 style={{textAlign:'center',marginBottom:40}}>What We Do</h2>
          <div className="grid cols3">
            <div className="card">
              <ShieldCheck/>
              <h3>Farm Verification</h3>
              <p className="muted">Structured verification process for identity, land documentation, GPS evidence and operational data.</p>
            </div>
            <div className="card">
              <Landmark/>
              <h3>Financing Intelligence</h3>
              <p className="muted">Tools and data that help lenders assess agricultural businesses more efficiently and accurately.</p>
            </div>
            <div className="card">
              <BriefcaseBusiness/>
              <h3>Market Connections</h3>
              <p className="muted">Connecting verified farms with financing institutions, offtakers and agricultural partners.</p>
            </div>
          </div>
        </section>

        <section className="section" style={{background:'#f8f9fa',padding:'60px 20px'}}>
          <h2 style={{textAlign:'center',marginBottom:40}}>Our Values</h2>
          <div className="grid cols2">
            <div className="card">
              <CheckCircle2/>
              <h3>Verification First</h3>
              <p className="muted">We believe in evidence-based verification rather than claims. Information is reviewed through structured processes.</p>
            </div>
            <div className="card">
              <Users/>
              <h3>Financial Responsibility</h3>
              <p className="muted">We take financial compliance seriously and follow responsible financial practices.</p>
            </div>
            <div className="card">
              <MapPin/>
              <h3>Local Focus</h3>
              <p className="muted">Built for Zimbabwe's agricultural context, understanding local tenure systems, crops and market conditions.</p>
            </div>
            <div className="card">
              <Heart/>
              <h3>Farmer-Centric</h3>
              <p className="muted">Designed to help farmers establish credibility and access legitimate financing opportunities.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 style={{textAlign:'center',marginBottom:40}}>Our Approach</h2>
          <div className="grid cols3">
            <div className="card">
              <h3>Phase 1: Verification & Intelligence</h3>
              <p className="muted" style={{marginTop:12}}>Farm and land verification with B2B agricultural risk/data intelligence for lenders and institutions.</p>
            </div>
            <div className="card">
              <h3>Phase 2: Monitoring & Ecosystem</h3>
              <p className="muted" style={{marginTop:12}}>Farm monitoring, financing connections, portfolio intelligence and ecosystem content.</p>
            </div>
            <div className="card">
              <h3>Phase 3: Investment Infrastructure</h3>
              <p className="muted" style={{marginTop:12}}>A regulated agricultural investment marketplace operated only after required legal/regulatory approvals.</p>
            </div>
          </div>
          <div style={{marginTop:32,padding:'16px',background:'rgba(255,249,232,0.1)',border:'1px solid rgba(244,223,170,0.3)',borderRadius:8,textAlign:'center'}}>
            <p style={{fontSize:13,color:'#666'}}>Investment marketplace features are subject to regulatory approval.</p>
          </div>
        </section>

        <section className="section">
          <h2 style={{textAlign:'center',marginBottom:40}}>Who We Serve</h2>
          <div className="grid cols2">
            <div className="card">
              <Users/>
              <h3>Farmers & Landowners</h3>
              <p className="muted">Create verified farm profiles, establish credibility, and connect with financing partners.</p>
            </div>
            <div className="card">
              <Landmark/>
              <h3>Financial Institutions</h3>
              <p className="muted">Banks, microfinance institutions, and agricultural lenders access verified farm intelligence.</p>
            </div>
            <div className="card">
              <BriefcaseBusiness/>
              <h3>Agricultural Businesses</h3>
              <p className="muted">Large farms and agribusinesses build professional profiles and access market opportunities.</p>
            </div>
            <div className="card">
              <Award/>
              <h3>Institutional Partners</h3>
              <p className="muted">Offtakers, input suppliers, and service providers connect with verified agricultural operations.</p>
            </div>
          </div>
        </section>

        <section className="section" style={{textAlign:'center',padding:'60px 20px'}}>
          <h2>Join Us in Building Trusted Agriculture</h2>
          <p className="lead" style={{marginTop:12}}>Be part of the movement to make Zimbabwean agriculture more bankable.</p>
          <div className="actions" style={{justifyContent:'center',marginTop:24}}>
            <Link to="/login"><button className="btn primary">Get Your Farm Verified</button></Link>
            <Link to="/login"><button className="btn">Partner With Us</button></Link>
          </div>
        </section>

        <section className="section" style={{background:'#f8f9fa',padding:'40px 20px',textAlign:'center'}}>
          <p className="muted" style={{fontSize:13}}>
            FarmLink Zimbabwe • Agricultural Verification & Financing Platform
          </p>
        </section>
      </main>
    </div>
  );
}