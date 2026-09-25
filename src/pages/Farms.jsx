import { useFarms } from '../data/FarmsContext';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, MapPin, Search, SlidersHorizontal, ChevronRight, Filter } from 'lucide-react';
import { StatusBadge, FarmCard } from '../components/common';



const provinces=['Mashonaland Central','Mashonaland East','Mashonaland West','Midlands','Manicaland','Matabeleland North','Masvingo'];
const crops=['Maize','Soybeans','Horticulture','Wheat','Tobacco','Cotton','Groundnuts'];
const statuses=['Verified','Field Verification','Document Review','Submitted','Action Required'];

export default function Farms() {
  const { farms } = useFarms();
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    province: '',
    crop: '',
    status: '',
    search: ''
  });

  const filteredFarms = farms.filter(farm => {
    if (filters.province && farm.province !== filters.province) return false;
    if (filters.crop && farm.crop !== filters.crop) return false;
    if (filters.status && farm.status !== filters.status) return false;
    if (filters.search && !farm.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !farm.farmer.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

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
            <Link to="/farms" className="active">Farms</Link>
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
        <section className="hero" style={{padding:'60px 20px'}}>
          <div style={{maxWidth:800,margin:'0 auto'}}>
            <h1>Farm Discovery</h1>
            <p className="lead" style={{marginTop:16}}>Browse verified and in-process agricultural operations across Zimbabwe.</p>
          </div>
        </section>

        <section className="section">
          <div className="card">
            <div className="split">
              <div className="search">
                <Search size={18}/>
                <input 
                  type="text" 
                  placeholder="Search farms or farmers..." 
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
              <button className="btn small" aria-expanded={showFilters} aria-controls="farm-filters" onClick={() => setShowFilters(value => !value)}>
                <Filter size={16}/> Filters
              </button>
            </div>
            <div id="farm-filters" className="grid cols4" style={{marginTop:20, display: showFilters ? undefined : "none"}}>
              <select 
                className="input"
                value={filters.province}
                onChange={(e) => setFilters({...filters, province: e.target.value})}
              >
                <option value="">All Provinces</option>
                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <select 
                className="input"
                value={filters.crop}
                onChange={(e) => setFilters({...filters, crop: e.target.value})}
              >
                <option value="">All Crops</option>
                {crops.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select 
                className="input"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">All Statuses</option>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button 
                className="btn small"
                onClick={() => setFilters({province: '', crop: '', status: '', search: ''})}
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div style={{marginTop:24}}>
            <div className="split">
              <p className="muted">{filteredFarms.length} farms found</p>
            </div>
            <div className="grid cols3" style={{marginTop:16}}>
              {filteredFarms.map(farm => (
                <FarmCard key={farm.id} farm={farm}/>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{textAlign:'center',padding:'60px 20px'}}>
          <h2>Have a farm to register?</h2>
          <p className="lead" style={{marginTop:12}}>Start the verification process to build your farm's credibility.</p>
          <Link to="/login"><button className="btn primary" style={{marginTop:24}}>
            Register Your Farm <ChevronRight size={15}/>
          </button></Link>
        </section>
      </main>
    </div>
  );
}