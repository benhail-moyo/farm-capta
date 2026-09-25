import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Newspaper, Calendar, Tag, ChevronRight, Search } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    category: 'Markets',
    title: 'Grain market dashboard shows rising demand for verified supplier data',
    source: 'FarmLink Sample Intelligence',
    date: '21 Aug 2026',
    summary: 'Lenders are increasingly requesting verified production data and supplier credentials as part of their agricultural financing assessment processes.',
    content: 'The agricultural financing landscape in Zimbabwe is evolving, with institutions placing greater emphasis on verified supplier data and production evidence. This trend reflects growing demand for transparency and risk mitigation in agricultural lending.'
  },
  {
    id: 2,
    category: 'Weather',
    title: 'Irrigation planning remains central for winter wheat financing decisions',
    source: 'FarmLink Sample Intelligence',
    date: '20 Aug 2026',
    summary: 'Financial institutions are prioritizing farms with demonstrated irrigation capacity for winter wheat financing programs.',
    content: 'As winter wheat season approaches, lenders are focusing on irrigation infrastructure and water access as key factors in financing decisions. Farms with verified irrigation systems are receiving preferential consideration.'
  },
  {
    id: 3,
    category: 'Finance',
    title: 'Lenders increase focus on production evidence and offtaker records',
    source: 'FarmLink Sample Intelligence',
    date: '18 Aug 2026',
    summary: 'Agricultural financing institutions are requiring more comprehensive production history and buyer relationship documentation.',
    content: 'The trend toward evidence-based agricultural financing continues to strengthen, with lenders requesting detailed production records, buyer contracts, and market access verification as part of their assessment processes.'
  },
  {
    id: 4,
    category: 'Policy',
    title: 'Agricultural sector receives renewed policy attention for food security',
    source: 'Sample Policy Update',
    date: '15 Aug 2026',
    summary: 'Government initiatives focus on supporting smallholder farmers through improved access to financing and verification services.',
    content: 'Recent policy developments emphasize the importance of agricultural verification systems in supporting food security objectives. New initiatives aim to streamline verification processes for smallholder farmers.'
  },
  {
    id: 5,
    category: 'Technology',
    title: 'Digital verification adoption increases in agricultural sector',
    source: 'FarmLink Sample Intelligence',
    date: '12 Aug 2026',
    summary: 'More agricultural businesses are adopting digital verification tools to improve credibility with financing partners.',
    content: 'Digital adoption in the agricultural sector continues to accelerate, with farmers and institutions increasingly using online verification platforms to streamline documentation and improve transparency.'
  },
  {
    id: 6,
    category: 'Commodities',
    title: 'Soybean prices show stable trends for upcoming season',
    source: 'Sample Market Analysis',
    date: '10 Aug 2026',
    summary: 'Market analysts predict stable soybean prices for the 2026/27 season based on regional supply and demand factors.',
    content: 'Soybean market conditions appear favorable for the upcoming season, with stable prices anticipated based on current supply and demand dynamics. Farmers with verified production capacity are well-positioned for the season.'
  }
];

const categories = ['All', 'Markets', 'Weather', 'Finance', 'Policy', 'Technology', 'Commodities', 'Agribusiness'];

export default function AgriNews() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
            <Link to="/farms">Farms</Link>
            <Link to="/financing">Financing</Link>
            <Link to="/agri-news" className="active">Agri News</Link>
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
            <h1>Agricultural News</h1>
            <p className="lead" style={{marginTop:16}}>Stay informed with market insights, weather updates, policy changes and agricultural intelligence.</p>
          </div>
        </section>

        <section className="section">
          <div className="card">
            <div className="search">
              <Search size={18}/>
              <input 
                type="text" 
                placeholder="Search news..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={{marginTop:20}}>
              <div className="split" style={{alignItems:'center'}}>
                <span className="muted">Filter by category:</span>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      className={'btn small ' + (selectedCategory === cat ? 'primary' : '')}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{marginTop:24}}>
            <p className="muted">{filteredNews.length} articles found</p>
            <div className="grid cols2" style={{marginTop:16}}>
              {filteredNews.map(item => (
                <div key={item.id} className="card">
                  <span className="pill info">{item.category}</span>
                  <h3 style={{marginTop:12}}>{item.title}</h3>
                  <p className="muted" style={{marginTop:8}}>{item.summary}</p>
                  <div className="split" style={{marginTop:16}}>
                    <div className="muted" style={{fontSize:13}}>
                      <Calendar size={14}/> {item.date}
                    </div>
                    <div className="muted" style={{fontSize:13}}>
                      <Tag size={14}/> {item.source}
                    </div>
                  </div>
                  <button className="btn small" style={{marginTop:16}}>
                    Read More <ChevronRight size={14}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{background:'#f8f9fa',padding:'60px 20px'}}>
          <div className="grid cols3">
            <div className="card">
              <Newspaper/>
              <h3>Market Analysis</h3>
              <p className="muted">Regular updates on commodity prices, market trends and agricultural economic indicators.</p>
            </div>
            <div className="card">
              <Calendar/>
              <h3>Weather Intelligence</h3>
              <p className="muted">Seasonal forecasts, weather patterns and irrigation planning insights for farmers.</p>
            </div>
            <div className="card">
              <Tag/>
              <h3>Policy Updates</h3>
              <p className="muted">Information on agricultural policies, regulations and government initiatives affecting the sector.</p>
            </div>
          </div>
        </section>

        <section className="section" style={{textAlign:'center',padding:'60px 20px'}}>
          <h2>Stay connected with agricultural intelligence</h2>
          <p className="lead" style={{marginTop:12}}>Join FarmLink to access personalized news and insights for your agricultural operations.</p>
          <Link to="/login"><button className="btn primary" style={{marginTop:24}}>
            Get Started <ChevronRight size={15}/>
          </button></Link>
        </section>
      </main>
    </div>
  );
}