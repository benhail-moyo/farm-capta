import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, UserRound, Landmark, BriefcaseBusiness, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: 'farmer', label: 'Farmer', icon: UserRound, description: 'Verify your farm and access financing' },
    { id: 'lender', label: 'Lender', icon: Landmark, description: 'Discover verified farms and manage portfolio' },
    { id: 'investor', label: 'Investor', icon: BriefcaseBusiness, description: 'Explore agricultural opportunities' }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setShowForm(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Accept any input as valid
    onLogin(selectedRole);
    navigate('/dashboard');
  };

  const handleBack = () => {
    setShowForm(false);
    setSelectedRole(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <header className="public-top">
        <div className="nav-wrap">
          <div className="brand">
            <div className="brand-mark"><Sprout size={21}/></div>
            <Link to="/" style={{textDecoration:'none',color:'inherit'}}>FarmLink Zimbabwe</Link>
          </div>
          <nav className="public-links">
            <Link to="/">Home</Link>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/farms">Farms</Link>
            <Link to="/financing">Financing</Link>
            <Link to="/agri-news">Agri News</Link>
            <Link to="/about">About</Link>
          </nav>
          <div className="actions">
            <Link to="/"><button className="btn primary">Get Started</button></Link>
          </div>
        </div>
      </header>
      <main>
        <section className="hero" style={{padding:'60px 20px',minHeight:'calc(100vh - 200px)',display:'flex',alignItems:'center'}}>
          <div style={{maxWidth:500,margin:'0 auto',width:'100%'}}>
            {!showForm ? (
              <>
                <div style={{textAlign:'center',marginBottom:40}}>
                  <h1>Sign In</h1>
                  <p className="muted" style={{marginTop:12}}>Select your role to continue</p>
                </div>
                <div className="grid cols1" style={{gap:16}}>
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        className="card"
                        style={{
                          textAlign:'left',
                          padding:'24px',
                          border:'2px solid transparent',
                          cursor:'pointer',
                          transition:'all 0.2s',
                          background:'white'
                        }}
                        onClick={() => handleRoleSelect(role.id)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#2f7d55';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div className="split">
                          <div style={{display:'flex',alignItems:'center',gap:16}}>
                            <div style={{padding:12,background:'rgba(47,125,85,0.1)',borderRadius:8}}>
                              <Icon size={24} color="#2f7d55"/>
                            </div>
                            <div>
                              <h3 style={{margin:0}}>{role.label}</h3>
                              <p className="muted" style={{margin:0,marginTop:4}}>{role.description}</p>
                            </div>
                          </div>
                          <ShieldCheck size={20} color="#2f7d55"/>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <button 
                  className="btn ghost" 
                  onClick={handleBack}
                  style={{marginBottom:24}}
                >
                  <ArrowLeft size={16}/> Back to role selection
                </button>
                <div className="card">
                  <div style={{textAlign:'center',marginBottom:32}}>
                    <h2>Sign in as {roles.find(r => r.id === selectedRole)?.label}</h2>
                    <p className="muted" style={{marginTop:8}}>Enter your credentials to continue</p>
                  </div>
                  <form onSubmit={handleLogin}>
                    <div style={{marginBottom:20}}>
                      <label style={{display:'block',marginBottom:8,fontWeight:500}}>Email</label>
                      <input
                        type="email"
                        className="input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{width:'100%',padding:'12px',border:'1px solid #e0e0e0',borderRadius:8,fontSize:16}}
                      />
                    </div>
                    <div style={{marginBottom:24}}>
                      <label style={{display:'block',marginBottom:8,fontWeight:500}}>Password</label>
                      <input
                        type="password"
                        className="input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{width:'100%',padding:'12px',border:'1px solid #e0e0e0',borderRadius:8,fontSize:16}}
                      />
                    </div>
                    <button type="submit" className="btn primary" style={{width:'100%',padding:'14px'}}>
                      Sign In
                    </button>
                  </form>
                  <div style={{textAlign:'center',marginTop:24}}>
                    <p className="muted">
                      Don't have an account? <Link to="/" style={{color:'#2f7d55',textDecoration:'none'}}>Get Started</Link>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}