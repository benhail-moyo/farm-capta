import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Landmark, Tractor, Sprout, ChevronRight, CheckCircle2, UserRound, FileCheck2, MapPin, Clock3, Upload, AlertTriangle, Lock } from 'lucide-react';
import { StatusBadge } from '../components/common';

export default function HowItWorks() {
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
            <Link to="/how-it-works" className="active">How it works</Link>
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
        <section className="hero" style={{padding:'80px 20px'}}>
          <div style={{maxWidth:800,margin:'0 auto',textAlign:'center'}}>
            <h1>How FarmLink Works</h1>
            <p className="lead" style={{marginTop:16}}>Building trusted agricultural verification and financing infrastructure for Zimbabwe.</p>
          </div>
        </section>

        <section className="section">
          <h2 style={{textAlign:'center',marginBottom:40}}>For Farmers</h2>
          <div className="grid cols4">
            <div className="card">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p className="muted">Sign up and complete identity verification with secure document upload.</p>
            </div>
            <div className="card">
              <div className="step-number">2</div>
              <h3>Register Farm</h3>
              <p className="muted">Provide farm location, size, crops, land tenure and operational details.</p>
            </div>
            <div className="card">
              <div className="step-number">3</div>
              <h3>Submit Documentation</h3>
              <p className="muted">Upload land documents, GPS evidence, production records and buyer agreements.</p>
            </div>
            <div className="card">
              <div className="step-number">4</div>
              <h3>Get Verified</h3>
              <p className="muted">Complete verification process to establish credibility with lenders.</p>
            </div>
          </div>
          <div style={{textAlign:'center',marginTop:32}}>
            <Link to="/login"><button className="btn primary">Start Farmer Verification</button></Link>
          </div>
        </section>

        <section className="section">
          <h2 style={{textAlign:'center',marginBottom:40}}>For Lenders</h2>
          <div className="grid cols4">
            <div className="card">
              <div className="step-number">1</div>
              <h3>Register Institution</h3>
              <p className="muted">Create your institutional profile and verify your organization.</p>
            </div>
            <div className="card">
              <div className="step-number">2</div>
              <h3>Publish Products</h3>
              <p className="muted">List your financing products, eligibility criteria and regions served.</p>
            </div>
            <div className="card">
              <div className="step-number">3</div>
              <h3>Discover Farms</h3>
              <p className="muted">Search and filter verified farms by region, crop, size and readiness.</p>
            </div>
            <div className="card">
              <div className="step-number">4</div>
              <h3>Assess & Finance</h3>
              <p className="muted">Review farm reports, evidence and make informed financing decisions.</p>
            </div>
          </div>
          <div style={{textAlign:'center',marginTop:32}}>
            <Link to="/login"><button className="btn primary">Lender Sign In</button></Link>
          </div>
        </section>

        <section className="section">
          <h2 style={{textAlign:'center',marginBottom:40}}>Verification Process</h2>
          <div className="grid cols3">
            <div className="card">
              <UserRound/>
              <h3>Identity Verification</h3>
              <p className="muted">Secure identity verification with document review and consent management.</p>
              <div style={{marginTop:16}}>
                <StatusBadge status="Identity Verified"/>
              </div>
            </div>
            <div className="card">
              <MapPin/>
              <h3>Farm Location Verification</h3>
              <p className="muted">GPS boundary verification and land documentation review.</p>
              <div style={{marginTop:16}}>
                <StatusBadge status="Farm Location Verified"/>
              </div>
            </div>
            <div className="card">
              <FileCheck2/>
              <h3>Document Review</h3>
              <p className="muted">Comprehensive document review for production evidence and market relationships.</p>
              <div style={{marginTop:16}}>
                <StatusBadge status="Documents Reviewed"/>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{background:'#f8f9fa',padding:'60px 20px'}}>
          <div className="grid cols2">
            <div>
              <h2>Security & Compliance</h2>
              <p className="muted" style={{marginTop:16}}>FarmLink follows responsible financial onboarding practices with proper consent management, data protection and compliance awareness.</p>
              <div style={{marginTop:24}}>
                <div className="tl"><Lock size={20}/><b>Secure data handling</b><p className="muted">Encryption and secure storage for sensitive information</p></div>
                <div className="tl"><CheckCircle2 size={20}/><b>Consent management</b><p className="muted">Explicit consent for verification, data processing and partner sharing</p></div>
                <div className="tl"><AlertTriangle size={20}/><b>Compliance awareness</b><p className="muted">AML/PEP screening awareness and responsible onboarding</p></div>
              </div>
            </div>
            <div className="card">
              <h3>Trust Layer</h3>
              <p className="muted">FarmLink's verification badges indicate that information has been reviewed through a structured process. Verification supports assessment decisions but does not guarantee outcomes.</p>
              <div style={{marginTop:20,padding:'16px',background:'rgba(255,249,232,0.1)',border:'1px solid rgba(244,223,170,0.3)',borderRadius:8}}>
                <p style={{fontSize:13,color:'#666'}}>Investment features are subject to regulatory approval.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{textAlign:'center',padding:'60px 20px'}}>
          <h2>Ready to get started?</h2>
          <p className="lead" style={{marginTop:12}}>Join FarmLink to build trusted agricultural profiles and connect with financing partners.</p>
          <div className="actions" style={{justifyContent:'center',marginTop:24}}>
            <Link to="/login"><button className="btn primary">Get Your Farm Verified</button></Link>
            <Link to="/login"><button className="btn">Lender Sign In</button></Link>
          </div>
        </section>
      </main>
    </div>
  );
}