import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Home, ClipboardCheck, Tractor, WalletCards, Gauge, FolderOpen, Radio, MessageSquare, UserRound, Search, Bell, LogOut, Building2, ShieldCheck, ChartNoAxesCombined, FileCheck2, BookOpen, Eye, Heart, Flag, Settings, BriefcaseBusiness, Users, Star, Upload, Send, FileText, Check } from 'lucide-react';
import { StatusBadge, Metric, ChartCard, FarmCard, Modal } from '../components/common';

const roles = {
  farmer: { label: 'Farmer', email: 'farmer.demo@farmlink.local', name: 'Tendai Moyo' },
  lender: { label: 'Lender', email: 'lender.demo@farmlink.local', name: 'Ruvimbo Ncube' },
  investor: { label: 'Investor', email: 'investor.demo@farmlink.local', name: 'Michael Dube' },
  admin: { label: 'Admin', email: 'admin.demo@farmlink.local', name: 'Chipo Soko' }
};

const farms = [
  {id:1,name:'Nyika Plains Farm',farmer:'Tendai Moyo',loc:'Mazowe, Mashonaland Central',province:'Mashonaland Central',district:'Mazowe',crop:'Maize',size:120,need:5000,ready:'Strong',status:'Field Verification',date:'18 Aug 2026',tenure:'A2 offer letter',irrigation:'Borehole + pivot',offtaker:'Confirmed',score:82,history:[3.1,4.2,4.8],docs:5},
  {id:2,name:'Mupfure Agri Estate',farmer:'Grace Chirwa',loc:'Chegutu, Mashonaland West',province:'Mashonaland West',district:'Chegutu',crop:'Soybeans',size:210,need:8000,ready:'Strong',status:'Verified',date:'02 Aug 2026',tenure:'Lease',irrigation:'Dam access',offtaker:'Contracted',score:88,history:[2.2,2.8,3.3],docs:7},
  {id:3,name:'Green Valley Produce',farmer:'Farai Nyathi',loc:'Mutare, Manicaland',province:'Manicaland',district:'Mutare',crop:'Horticulture',size:38,need:42000,ready:'Moderate',status:'Document Review',date:'11 Aug 2026',tenure:'Communal/customary',irrigation:'Drip lines',offtaker:'Buyer letters',score:68,history:[1.4,1.6,1.9],docs:4},
  {id:4,name:'Umfuli Grain & Livestock',farmer:'Blessing Sibanda',loc:'Kwekwe, Midlands',province:'Midlands',district:'Kwekwe',crop:'Wheat',size:175,need:120000,ready:'Moderate',status:'Submitted',date:'06 Aug 2026',tenure:'Lease',irrigation:'Seasonal river',offtaker:'Pending',score:61,history:[2.7,3.0,2.9],docs:3},
  {id:5,name:'Mazowe Horticulture Estate',farmer:'Rudo Matema',loc:'Bindura, Mashonaland Central',province:'Mashonaland Central',district:'Bindura',crop:'Horticulture',size:62,need:65000,ready:'Strong',status:'Verified',date:'15 Aug 2026',tenure:'Title deed',irrigation:'Borehole + reservoir',offtaker:'Supermarket LOI',score:90,history:[1.9,2.4,2.8],docs:8}
];

const institutions = [
  {name:'AgriCredit Zimbabwe',type:'Agricultural lender',focus:'Input finance, working capital',regions:'National',verified:true},
  {name:'Zambezi Microfinance',type:'Microfinance',focus:'Smallholder production loans',regions:'Mashonaland, Midlands',verified:true},
  {name:'Harvest Mutual Insurance',type:'Insurance',focus:'Weather-index and crop insurance',regions:'Pilot districts',verified:false}
];

const opportunities = [
  {id:1,farm:'Mupfure Agri Estate',crop:'Soybeans',region:'Mashonaland West',target:'US$6,000',season:'2026/27',duration:'9 months',risk:'Moderate',verified:'Operational Profile Verified',perf:'3-year yield records available'},
  {id:2,farm:'Mazowe Horticulture Estate',crop:'Horticulture',region:'Mashonaland Central',target:'US$12,000',season:'Winter 2027',duration:'7 months',risk:'Moderate-Low',verified:'Documents Reviewed',perf:'Buyer letters and greenhouse records'},
  {id:3,farm:'Nyika Plains Farm',crop:'Maize',region:'Mashonaland Central',target:'US$9,000',season:'2026/27',duration:'10 months',risk:'Moderate',verified:'Field Verification',perf:'Production history submitted'}
];

function money(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n)}

export default function Dashboard({ role, onLogout, onPageChange }) {
  const [currentPage, setCurrentPage] = React.useState('overview');
  const navigate = useNavigate();
  
  // Modal states
  const [editProfileModal, setEditProfileModal] = React.useState(false);
  const [applyFinancingModal, setApplyFinancingModal] = React.useState(false);
  const [uploadDocumentModal, setUploadDocumentModal] = React.useState(false);
  const [farmDetailsModal, setFarmDetailsModal] = React.useState(false);
  const [selectedFarm, setSelectedFarm] = React.useState(null);
  const [newMessageModal, setNewMessageModal] = React.useState(false);
  const [productModal, setProductModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [institutionModal, setInstitutionModal] = React.useState(false);
  const [userModal, setUserModal] = React.useState(false);
  const [settingsModal, setSettingsModal] = React.useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const navItems = {
    farmer: [
      ['overview', Home, 'Overview'],
      ['onboarding', ClipboardCheck, 'Verification'],
      ['farm-profile', Tractor, 'My Farm'],
      ['financing', WalletCards, 'Financing'],
      ['monitoring', Gauge, 'Monitoring'],
      ['documents', FolderOpen, 'Documents'],
      ['feed', Radio, 'Agri Feed'],
      ['messages', MessageSquare, 'Messages'],
      ['profile', UserRound, 'Profile']
    ],
    lender: [
      ['overview', Home, 'Overview'],
      ['discovery', Search, 'Farm Discovery'],
      ['applications', ClipboardCheck, 'Applications'],
      ['portfolio', ChartNoAxesCombined, 'Portfolio'],
      ['monitoring', Gauge, 'Monitoring'],
      ['reports', FileCheck2, 'Reports'],
      ['products', WalletCards, 'Financing Products'],
      ['feed', Radio, 'Agri Feed'],
      ['messages', MessageSquare, 'Messages'],
      ['institution', Building2, 'Institution Profile']
    ],
    investor: [
      ['overview', Home, 'Overview'],
      ['opportunities', BriefcaseBusiness, 'Opportunities'],
      ['saved', Heart, 'Saved'],
      ['watchlist', Eye, 'Watchlist'],
      ['portfolio', ChartNoAxesCombined, 'Portfolio'],
      ['education', BookOpen, 'Education'],
      ['feed', Radio, 'Agri Feed'],
      ['profile', UserRound, 'Profile']
    ],
    admin: [
      ['overview', Home, 'Overview'],
      ['kyc', Users, 'KYC Queue'],
      ['farm-verification', ShieldCheck, 'Farm Verification'],
      ['users', UserRound, 'Users'],
      ['institutions', Building2, 'Institutions'],
      ['content', Radio, 'Content'],
      ['reports', Flag, 'Reports & Flags'],
      ['audit', FileCheck2, 'Audit Logs'],
      ['settings', Settings, 'Settings']
    ]
  };

  const renderDashboardContent = () => {
    switch(role) {
      case 'farmer':
        return renderFarmerContent();
      case 'lender':
        return renderLenderContent();
      case 'investor':
        return renderInvestorContent();
      case 'admin':
        return renderAdminContent();
      default:
        return <div>Role not found</div>;
    }
  };

  const renderFarmerContent = () => {
    switch(currentPage) {
      case 'overview': return <FarmerOverview onPageChange={setCurrentPage} />;
      case 'onboarding': return <FarmerOnboarding onPageChange={setCurrentPage} />;
      case 'farm-profile': return <FarmerProfile onPageChange={setCurrentPage} onEditProfile={() => setEditProfileModal(true)} />;
      case 'financing': return <FarmerFinancing onPageChange={setCurrentPage} onApplyFinancing={() => setApplyFinancingModal(true)} />;
      case 'monitoring': return <FarmerMonitoring onPageChange={setCurrentPage} />;
      case 'documents': return <FarmerDocuments onPageChange={setCurrentPage} onUploadDocument={() => setUploadDocumentModal(true)} />;
      case 'feed': return <AgriFeed onPageChange={setCurrentPage} />;
      case 'messages': return <Messages onPageChange={setCurrentPage} onNewMessage={() => setNewMessageModal(true)} />;
      case 'profile': return <UserProfile onPageChange={setCurrentPage} role={role} onEditProfile={() => setEditProfileModal(true)} />;
      default: return <FarmerOverview onPageChange={setCurrentPage} />;
    }
  };

  const renderLenderContent = () => {
    switch(currentPage) {
      case 'overview': return <LenderOverview onPageChange={setCurrentPage} onFarmClick={handleFarmCardClick} />;
      case 'discovery': return <LenderDiscovery onPageChange={setCurrentPage} onFarmClick={handleFarmCardClick} />;
      case 'applications': return <LenderApplications onPageChange={setCurrentPage} />;
      case 'portfolio': return <LenderPortfolio onPageChange={setCurrentPage} />;
      case 'monitoring': return <LenderMonitoring onPageChange={setCurrentPage} />;
      case 'reports': return <LenderReports onPageChange={setCurrentPage} />;
      case 'products': return <LenderProducts onPageChange={setCurrentPage} onProductClick={handleProductClick} />;
      case 'feed': return <AgriFeed onPageChange={setCurrentPage} />;
      case 'messages': return <Messages onPageChange={setCurrentPage} onNewMessage={() => setNewMessageModal(true)} />;
      case 'institution': return <InstitutionProfile onPageChange={setCurrentPage} onEditInstitution={() => setInstitutionModal(true)} />;
      default: return <LenderOverview onPageChange={setCurrentPage} onFarmClick={handleFarmCardClick} />;
    }
  };

  const renderInvestorContent = () => {
    switch(currentPage) {
      case 'overview': return <InvestorOverview onPageChange={setCurrentPage} />;
      case 'opportunities': return <InvestorOpportunities onPageChange={setCurrentPage} />;
      case 'saved': return <InvestorSaved onPageChange={setCurrentPage} />;
      case 'watchlist': return <InvestorWatchlist onPageChange={setCurrentPage} />;
      case 'portfolio': return <InvestorPortfolio onPageChange={setCurrentPage} />;
      case 'education': return <InvestorEducation onPageChange={setCurrentPage} />;
      case 'feed': return <AgriFeed onPageChange={setCurrentPage} />;
      case 'messages': return <Messages onPageChange={setCurrentPage} onNewMessage={() => setNewMessageModal(true)} />;
      case 'profile': return <UserProfile onPageChange={setCurrentPage} role={role} onEditProfile={() => setEditProfileModal(true)} />;
      default: return <InvestorOverview onPageChange={setCurrentPage} />;
    }
  };

  const renderAdminContent = () => {
    switch(currentPage) {
      case 'overview': return <AdminOverview onPageChange={setCurrentPage} />;
      case 'kyc': return <AdminKYC onPageChange={setCurrentPage} />;
      case 'farm-verification': return <AdminFarmVerification onPageChange={setCurrentPage} onFarmClick={handleFarmCardClick} />;
      case 'users': return <AdminUsers onPageChange={setCurrentPage} onAddUser={() => setUserModal(true)} />;
      case 'institutions': return <AdminInstitutions onPageChange={setCurrentPage} onAddInstitution={() => setInstitutionModal(true)} />;
      case 'content': return <AdminContent onPageChange={setCurrentPage} />;
      case 'reports': return <AdminReports onPageChange={setCurrentPage} />;
      case 'audit': return <AdminAudit onPageChange={setCurrentPage} />;
      case 'settings': return <AdminSettings onPageChange={setCurrentPage} onOpenSettings={() => setSettingsModal(true)} />;
      default: return <AdminOverview onPageChange={setCurrentPage} />;
    }
  };

  const handleFarmCardClick = (farmId) => {
    const farm = farms.find(f => f.id === farmId);
    setSelectedFarm(farm);
    setFarmDetailsModal(true);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductModal(true);
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="side-brand">
          <div className="brand-mark"><Sprout size={20}/></div>
          FarmLink
        </div>
        <div className="side-section">Demo role</div>
        <div className="role-switch">
          {Object.entries(roles).map(([k, r]) => (
            <button 
              key={k} 
              className={'btn small ' + (role === k ? 'primary' : '')} 
              onClick={() => { onPageChange(k); setCurrentPage('overview'); }}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="side-section">Navigation</div>
        {navItems[role]?.map(([page, Icon, label]) => (
          <button 
            key={page} 
            className={'side-link ' + (currentPage === page ? 'active' : '')}
            onClick={() => setCurrentPage(page)}
          >
            <Icon size={18}/> {label}
          </button>
        ))}
        <div className="side-section">Account</div>
        <button className="side-link" onClick={handleLogout}>
          <LogOut size={18}/> Sign Out
        </button>
      </aside>
      <main className="main">
        <div className="topbar">
          <div className="search">
            <Search size={18}/>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="actions">
            <button className="btn small ghost" onClick={() => console.log('Notifications clicked')}><Bell size={18}/></button>
            <button className="btn small ghost" onClick={() => onPageChange('profile')}><UserRound size={18}/> {roles[role].name}</button>
          </div>
        </div>
        <div style={{padding: 24}}>
          {renderDashboardContent()}
        </div>
      </main>
      
      {/* Modals */}
      <EditProfileModal isOpen={editProfileModal} onClose={() => setEditProfileModal(false)} role={role} />
      <ApplyFinancingModal isOpen={applyFinancingModal} onClose={() => setApplyFinancingModal(false)} />
      <UploadDocumentModal isOpen={uploadDocumentModal} onClose={() => setUploadDocumentModal(false)} />
      <FarmDetailsModal isOpen={farmDetailsModal} onClose={() => setFarmDetailsModal(false)} farm={selectedFarm} />
      <NewMessageModal isOpen={newMessageModal} onClose={() => setNewMessageModal(false)} />
      <ProductModal isOpen={productModal} onClose={() => setProductModal(false)} product={selectedProduct} />
      <InstitutionModal isOpen={institutionModal} onClose={() => setInstitutionModal(false)} />
      <UserModal isOpen={userModal} onClose={() => setUserModal(false)} />
      <SettingsModal isOpen={settingsModal} onClose={() => setSettingsModal(false)} />
    </div>
  );
}

function FarmerOverview({ onPageChange }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Good morning, Tendai</h2>
          <p className="muted">Nyika Plains Farm verification is moving through field review.</p>
        </div>
        <button className="btn primary" onClick={() => onPageChange('onboarding')}>Complete Verification</button>
      </div>
      <div className="grid cols4">
        <Metric label="Verification status" value="82%" trend="Field visit scheduled" icon={ShieldCheck}/>
        <Metric label="Profile completeness" value="91%" trend="+9% this week" icon={UserRound}/>
        <Metric label="Financing opportunities" value="6" trend="2 matched lenders" icon={WalletCards}/>
        <Metric label="Active applications" value="2" trend="1 in screening" icon={ClipboardCheck}/>
      </div>
      <div className="grid cols2">
        <div className="card">
          <div className="profile-cover"></div>
          <div className="split" style={{marginTop:16}}>
            <div>
              <h3>Nyika Plains Farm</h3>
              <p className="muted">Mazowe, Mashonaland Central • 120 ha • Maize / Soybeans</p>
            </div>
            <StatusBadge status="Farm Location Verified"/>
          </div>
          <div className="grid cols3" style={{marginTop:16}}>
            <div><b>A2 documentation</b><div className="muted">Tenure evidence</div></div>
            <div><b>Borehole + pivot</b><div className="muted">Irrigation</div></div>
            <div><b>2 buyer letters</b><div className="muted">Market evidence</div></div>
          </div>
        </div>
        <div className="card">
          <h3>Financing Readiness: Strong</h3>
          <p className="muted">This summarizes verification factors that may support lender assessment.</p>
          {['Identity verified','Farm location verified','Documentation mostly complete','Production history available','Buyer/offtaker information available'].map((x,i) => (
            <div className="tl" key={x} style={{marginLeft:22}}>
              <b>{x}</b>
              <div className="muted">Reviewed factor {i+1}</div>
            </div>
          ))}
          <button className="btn" onClick={() => onPageChange('documents')}>Upload missing lease schedule</button>
        </div>
      </div>
    </div>
  );
}

function LenderOverview({ onPageChange, onFarmClick }) {
  return (
    <div className="grid">
      <div>
        <h2>Agricultural Finance Intelligence</h2>
        <p className="muted">Overview of your agricultural lending portfolio and farm discovery.</p>
      </div>
      <div className="grid cols4">
        <Metric label="Verified Farms" value="12" trend="+2 this week" icon={ShieldCheck}/>
        <Metric label="Financing Applications" value="8" trend="3 awaiting review" icon={ClipboardCheck}/>
        <Metric label="Active Portfolio" value="$485,000" trend="4 farms funded" icon={WalletCards}/>
        <Metric label="Portfolio at Risk" value="2" trend="1 monitoring flag" icon={Flag}/>
      </div>
      <div className="grid cols2">
        <div className="card">
          <h3>Recent Applications</h3>
          <div style={{marginTop:16}}>
            {farms.slice(0,3).map(farm => (
              <div key={farm.id} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div className="split">
                  <div>
                    <b>{farm.name}</b>
                    <div className="muted">{farm.crop} • {farm.size} ha</div>
                  </div>
                  <StatusBadge status={farm.status}/>
                </div>
              </div>
            ))}
          </div>
          <button className="btn small" style={{marginTop:16}} onClick={() => onPageChange('applications')}>View All Applications</button>
        </div>
        <div className="card">
          <h3>Featured Farms</h3>
          <div style={{marginTop:16}}>
            {farms.slice(0,2).map(farm => (
              <FarmCard key={farm.id} farm={farm} onOpen={onFarmClick}/>
            ))}
          </div>
          <button className="btn small" style={{marginTop:16}} onClick={() => onPageChange('discovery')}>Discover More Farms</button>
        </div>
      </div>
    </div>
  );
}

function InvestorOverview({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Investment Opportunities</h2>
        <p className="muted">Explore agricultural investment opportunities across Zimbabwe.</p>
      </div>
      <div className="grid cols4">
        <Metric label="Saved Opportunities" value="5" trend="2 new this week" icon={Heart}/>
        <Metric label="Watchlist" value="8" trend="3 nearing harvest" icon={Eye}/>
        <Metric label="Portfolio Value" value="$2,000" trend="2 active investments" icon={WalletCards}/>
        <Metric label="Upcoming Harvests" value="3" trend="Next: Oct 2026" icon={BriefcaseBusiness}/>
      </div>
      <div className="card">
        <h3>Featured Opportunities</h3>
        <div className="grid cols3" style={{marginTop:16}}>
          {opportunities.map(opp => (
            <div key={opp.id} className="card" style={{background:'#f8f9fa'}}>
              <div className="split">
                <div>
                  <h4>{opp.farm}</h4>
                  <p className="muted">{opp.crop} • {opp.region}</p>
                </div>
                <StatusBadge status={opp.verified}/>
              </div>
              <div className="grid cols2" style={{marginTop:12}}>
                <div><b>{opp.target}</b><div className="muted">Target amount</div></div>
                <div><b>{opp.duration}</b><div className="muted">Duration</div></div>
              </div>
              <button className="btn small primary" style={{marginTop:16}} onClick={() => onPageChange('opportunities')}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminOverview({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Admin Console</h2>
        <p className="muted">Platform administration and compliance management.</p>
      </div>
      <div className="grid cols4">
        <Metric label="KYC Queue" value="6" trend="2 high priority" icon={Users}/>
        <Metric label="Farm Verification" value="4" trend="1 field visit scheduled" icon={ShieldCheck}/>
        <Metric label="Content Moderation" value="3" trend="All reviewed" icon={Flag}/>
        <Metric label="Platform Users" value="24" trend="+5 this week" icon={UserRound}/>
      </div>
      <div className="grid cols2">
        <div className="card">
          <h3>Pending KYC Reviews</h3>
          <div style={{marginTop:16}}>
            {['Farmer: Tendai Moyo', 'Investor: Michael Dube', 'Lender: Ruvimbo Ncube'].map((item, i) => (
              <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div className="split">
                  <b>{item}</b>
                  <StatusBadge status="Under Review"/>
                </div>
              </div>
            ))}
          </div>
          <button className="btn small" style={{marginTop:16}} onClick={() => onPageChange('kyc')}>Review KYC Queue</button>
        </div>
        <div className="card">
          <h3>Farm Verification Queue</h3>
          <div style={{marginTop:16}}>
            {farms.slice(0,3).map(farm => (
              <div key={farm.id} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div className="split">
                  <div>
                    <b>{farm.name}</b>
                    <div className="muted">{farm.crop} • {farm.size} ha</div>
                  </div>
                  <StatusBadge status={farm.status}/>
                </div>
              </div>
            ))}
          </div>
          <button className="btn small" style={{marginTop:16}} onClick={() => onPageChange('farm-verification')}>Review Farm Verification</button>
        </div>
      </div>
    </div>
  );
}

// Farmer Pages
function FarmerOnboarding({ onPageChange }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Verification Process</h2>
          <p className="muted">Complete your farm verification to unlock financing opportunities.</p>
        </div>
      </div>
      <div className="card">
        <h3>Verification Progress</h3>
        <div style={{marginTop:16}}>
          {[
            {step: 'Identity Verification', status: 'Complete', desc: 'National ID verified'},
            {step: 'Farm Location', status: 'Complete', desc: 'GPS coordinates verified'},
            {step: 'Land Tenure', status: 'In Progress', desc: 'A2 offer letter under review'},
            {step: 'Irrigation Infrastructure', status: 'Complete', desc: 'Borehole and pivot documented'},
            {step: 'Production History', status: 'Complete', desc: '3-year records submitted'},
            {step: 'Buyer/Offtaker', status: 'Complete', desc: '2 buyer letters on file'}
          ].map((item, i) => (
            <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{item.step}</b>
                  <div className="muted">{item.desc}</div>
                </div>
                <StatusBadge status={item.status}/>
              </div>
            </div>
          ))}
        </div>
        <button className="btn primary" style={{marginTop:16}} onClick={() => onPageChange('overview')}>Return to Dashboard</button>
      </div>
    </div>
  );
}

function FarmerProfile({ onPageChange, onEditProfile }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>My Farm Profile</h2>
          <p className="muted">Manage your farm information and operational details.</p>
        </div>
        <button className="btn primary" onClick={onEditProfile}>Edit Profile</button>
      </div>
      <div className="card">
        <div className="profile-cover"></div>
        <div style={{marginTop:16}}>
          <h3>Nyika Plains Farm</h3>
          <p className="muted">Mazowe, Mashonaland Central</p>
        </div>
        <div className="grid cols2" style={{marginTop:16}}>
          <div>
            <b>Farm Size</b>
            <div className="muted">120 hectares</div>
          </div>
          <div>
            <b>Primary Crops</b>
            <div className="muted">Maize, Soybeans</div>
          </div>
          <div>
            <b>Land Tenure</b>
            <div className="muted">A2 offer letter</div>
          </div>
          <div>
            <b>Irrigation</b>
            <div className="muted">Borehole + pivot irrigation</div>
          </div>
        </div>
      </div>
      <div className="card" style={{marginTop:16}}>
        <h3>Production History</h3>
        <div className="grid cols3" style={{marginTop:16}}>
          <ChartCard title="Yield Trend" data={[3.1, 4.2, 4.8]} labels={['2024', '2025', '2026']} unit="t/ha"></ChartCard>
          <ChartCard title="Revenue" data={[85000, 92000, 98000]} labels={['2024', '2025', '2026']} unit="USD"></ChartCard>
          <ChartCard title="Input Costs" data={[32000, 35000, 38000]} labels={['2024', '2025', '2026']} unit="USD"></ChartCard>
        </div>
      </div>
    </div>
  );
}

function FarmerFinancing({ onPageChange, onApplyFinancing }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Financing Opportunities</h2>
          <p className="muted">View and manage your financing applications.</p>
        </div>
        <button className="btn primary" onClick={onApplyFinancing}>Apply for Financing</button>
      </div>
      <div className="grid cols2">
        <div className="card">
          <h3>Active Applications</h3>
          <div style={{marginTop:16}}>
            {[
              {lender: 'AgriCredit Zimbabwe', amount: '$5,000', status: 'Under Review', date: '18 Aug 2026'},
              {lender: 'Zambezi Microfinance', amount: '$4,000', status: 'Approved', date: '11 Aug 2026'}
            ].map((app, i) => (
              <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div className="split">
                  <div>
                    <b>{app.lender}</b>
                    <div className="muted">{app.amount} • {app.date}</div>
                  </div>
                  <StatusBadge status={app.status}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Matched Lenders</h3>
          <div style={{marginTop:16}}>
            {institutions.map((inst, i) => (
              <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div className="split">
                  <div>
                    <b>{inst.name}</b>
                    <div className="muted">{inst.type} • {inst.focus}</div>
                  </div>
                  <StatusBadge status={inst.verified ? 'Verified' : 'Pending'}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FarmerMonitoring({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Farm Monitoring</h2>
        <p className="muted">Track your farm's performance and growth metrics.</p>
      </div>
      <div className="grid cols4">
        <Metric label="Current Season" value="2026/27" trend="Maize planting" icon={Sprout}/>
        <Metric label="Growth Stage" value="Vegetative" trend="6 weeks after planting" icon={Gauge}/>
        <Metric label="Soil Moisture" value="68%" trend="Optimal range" icon={ClipboardCheck}/>
        <Metric label="Weather Alert" value="None" trend="Clear conditions" icon={Bell}/>
      </div>
      <div className="card" style={{marginTop:16}}>
        <h3>Crop Performance</h3>
        <div className="grid cols2" style={{marginTop:16}}>
          <ChartCard title="Growth Progress" data={[20, 45, 68, 82]} labels={['Week 2', 'Week 4', 'Week 6', 'Week 8']} unit="%"></ChartCard>
          <ChartCard title="Yield Projection" data={[3.8, 4.1, 4.5, 4.8]} labels={["Month 1", "Month 2", "Month 3", "Harvest"]} unit="t/ha"></ChartCard>
        </div>
      </div>
    </div>
  );
}

function FarmerDocuments({ onPageChange, onUploadDocument }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Documents</h2>
          <p className="muted">Manage your farm documentation and certificates.</p>
        </div>
        <button className="btn primary" onClick={onUploadDocument}>Upload Document</button>
      </div>
      <div className="card">
        <h3>Document Library</h3>
        <div style={{marginTop:16}}>
          {[
            {name: 'National ID Copy', type: 'Identity', date: '15 Aug 2026', status: 'Verified'},
            {name: 'A2 Offer Letter', type: 'Land Tenure', date: '12 Aug 2026', status: 'Under Review'},
            {name: 'Borehole Installation Certificate', type: 'Infrastructure', date: '10 Aug 2026', status: 'Verified'},
            {name: 'Buyer Letter - Grain Marketers', type: 'Market', date: '08 Aug 2026', status: 'Verified'},
            {name: 'Production Records 2024-2026', type: 'History', date: '05 Aug 2026', status: 'Verified'}
          ].map((doc, i) => (
            <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{doc.name}</b>
                  <div className="muted">{doc.type} • {doc.date}</div>
                </div>
                <StatusBadge status={doc.status}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lender Pages
function LenderDiscovery({ onPageChange, onFarmClick }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Farm Discovery</h2>
          <p className="muted">Explore verified farms seeking financing.</p>
        </div>
        <div className="search">
          <Search size={18}/>
          <input type="text" placeholder="Search farms..." />
        </div>
      </div>
      <div className="grid cols3">
        {farms.map(farm => (
          <FarmCard key={farm.id} farm={farm} onOpen={onFarmClick}/>
        ))}
      </div>
    </div>
  );
}

function LenderApplications({ onPageChange }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Financing Applications</h2>
          <p className="muted">Review and manage farmer financing applications.</p>
        </div>
      </div>
      <div className="card">
        <h3>All Applications</h3>
        <div style={{marginTop:16}}>
          {farms.map(farm => (
            <div key={farm.id} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{farm.name}</b>
                  <div className="muted">{farm.crop} • {farm.size} ha • {money(farm.need)}</div>
                </div>
                <StatusBadge status={farm.status}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LenderPortfolio({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Portfolio Overview</h2>
        <p className="muted">Track your active lending portfolio performance.</p>
      </div>
      <div className="grid cols4">
        <Metric label="Total Funded" value="$485,000" trend="4 active farms" icon={WalletCards}/>
        <Metric label="On-Time Payments" value="94%" trend="Last 12 months" icon={ClipboardCheck}/>
        <Metric label="Portfolio Yield" value="12.5%" trend="Annual return" icon={ChartNoAxesCombined}/>
        <Metric label="At Risk" value="2" trend="1 monitoring flag" icon={Flag}/>
      </div>
      <div className="card" style={{marginTop:16}}>
        <h3>Active Investments</h3>
        <div style={{marginTop:16}}>
          {farms.slice(0,4).map(farm => (
            <div key={farm.id} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{farm.name}</b>
                  <div className="muted">{farm.crop} • {money(farm.need)}</div>
                </div>
                <StatusBadge status="Active"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LenderMonitoring({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Portfolio Monitoring</h2>
        <p className="muted">Monitor performance and risks across your portfolio.</p>
      </div>
      <div className="grid cols2">
        <div className="card">
          <h3>Risk Alerts</h3>
          <div style={{marginTop:16}}>
            {[
              {farm: 'Green Valley Produce', risk: 'Weather delay', severity: 'Medium', date: '20 Aug 2026'},
              {farm: 'Umfuli Grain & Livestock', risk: 'Irrigation issue', severity: 'High', date: '18 Aug 2026'}
            ].map((alert, i) => (
              <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div className="split">
                  <div>
                    <b>{alert.farm}</b>
                    <div className="muted">{alert.risk} • {alert.date}</div>
                  </div>
                  <StatusBadge status={alert.severity}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Performance Metrics</h3>
          <div className="grid cols2" style={{marginTop:16}}>
            <ChartCard title="Repayment Rate" data={[92, 94, 95, 94]} labels={['Q1', 'Q2', 'Q3', 'Q4']} unit="%"></ChartCard>
            <ChartCard title="Portfolio Growth" data={[350, 420, 455, 485]} labels={['Q1', 'Q2', 'Q3', 'Q4']} unit="k$"></ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function LenderReports({ onPageChange }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Reports</h2>
          <p className="muted">Generate and view portfolio reports.</p>
        </div>
        <button className="btn primary" onClick={() => console.log('Generate report clicked')}>Generate Report</button>
      </div>
      <div className="card">
        <h3>Available Reports</h3>
        <div style={{marginTop:16}}>
          {[
            {name: 'Portfolio Performance Report', type: 'Monthly', date: '15 Aug 2026'},
            {name: 'Risk Assessment Summary', type: 'Weekly', date: '14 Aug 2026'},
            {name: 'Application Pipeline Report', type: 'Daily', date: '13 Aug 2026'},
            {name: 'Regional Distribution Analysis', type: 'Monthly', date: '01 Aug 2026'}
          ].map((report, i) => (
            <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{report.name}</b>
                  <div className="muted">{report.type} • {report.date}</div>
                </div>
                <button className="btn small ghost" onClick={() => console.log('Download lender report clicked')}>Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LenderProducts({ onPageChange, onProductClick }) {
  const products = [
    {name: 'Input Finance Program', rate: '12%', term: '6-12 months', min: '$10,000', max: '$200,000'},
    {name: 'Working Capital Loan', rate: '14%', term: '3-9 months', min: '$5,000', max: '$100,000'},
    {name: 'Equipment Financing', rate: '10%', term: '12-24 months', min: '$20,000', max: '$500,000'},
    {name: 'Seasonal Credit Line', rate: '11%', term: 'Variable', min: '$15,000', max: '$300,000'}
  ];
  
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Financing Products</h2>
          <p className="muted">Manage your available financing products.</p>
        </div>
        <button className="btn primary" onClick={() => onProductClick({})}>Add Product</button>
      </div>
      <div className="grid cols2">
        {products.map((product, i) => (
          <div key={i} className="card">
            <h3>{product.name}</h3>
            <div className="grid cols2" style={{marginTop:16}}>
              <div><b>Interest Rate</b><div className="muted">{product.rate}</div></div>
              <div><b>Term</b><div className="muted">{product.term}</div></div>
              <div><b>Minimum</b><div className="muted">{product.min}</div></div>
              <div><b>Maximum</b><div className="muted">{product.max}</div></div>
            </div>
            <button className="btn small" style={{marginTop:16}} onClick={() => onProductClick(product)}>Edit Product</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InstitutionProfile({ onPageChange, onEditInstitution }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Institution Profile</h2>
          <p className="muted">Manage your lending institution profile.</p>
        </div>
        <button className="btn primary" onClick={onEditInstitution}>Edit Profile</button>
      </div>
      <div className="card">
        <h3>AgriCredit Zimbabwe</h3>
        <div className="grid cols2" style={{marginTop:16}}>
          <div><b>Institution Type</b><div className="muted">Agricultural lender</div></div>
          <div><b>Focus Areas</b><div className="muted">Input finance, working capital</div></div>
          <div><b>Coverage</b><div className="muted">National</div></div>
          <div><b>Verification Status</b><div className="muted">Verified</div></div>
        </div>
      </div>
      <div className="card" style={{marginTop:16}}>
        <h3>Performance Summary</h3>
        <div className="grid cols4" style={{marginTop:16}}>
          <Metric label="Active Loans" value="24" trend="+3 this month" icon={ClipboardCheck}/>
          <Metric label="Portfolio Size" value="$1.2M" trend="+$150K this quarter" icon={WalletCards}/>
          <Metric label="Default Rate" value="2.1%" trend="Below industry avg" icon={ShieldCheck}/>
          <Metric label="Customer Satisfaction" value="4.5" trend="Out of 5" icon={Star}/>
        </div>
      </div>
    </div>
  );
}

// Investor Pages
function InvestorOpportunities({ onPageChange }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Investment Opportunities</h2>
          <p className="muted">Browse verified agricultural investment opportunities.</p>
        </div>
        <div className="search">
          <Search size={18}/>
          <input type="text" placeholder="Search opportunities..." />
        </div>
      </div>
      <div className="grid cols3">
        {opportunities.map(opp => (
          <div key={opp.id} className="card">
            <div className="split">
              <div>
                <h4>{opp.farm}</h4>
                <p className="muted">{opp.crop} • {opp.region}</p>
              </div>
              <StatusBadge status={opp.verified}/>
            </div>
            <div className="grid cols2" style={{marginTop:12}}>
              <div><b>{opp.target}</b><div className="muted">Target amount</div></div>
              <div><b>{opp.duration}</b><div className="muted">Duration</div></div>
            </div>
            <div style={{marginTop:12}}>
              <div className="muted"><b>Risk Level:</b> {opp.risk}</div>
              <div className="muted">{opp.perf}</div>
            </div>
            <button className="btn small primary" style={{marginTop:16}} onClick={() => onPageChange('opportunities')}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvestorSaved({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Saved Opportunities</h2>
        <p className="muted">Your bookmarked investment opportunities.</p>
      </div>
      <div className="card">
        <h3>Saved Items</h3>
        <div style={{marginTop:16}}>
          {opportunities.slice(0,2).map(opp => (
            <div key={opp.id} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{opp.farm}</b>
                  <div className="muted">{opp.crop} • {opp.target} • {opp.risk}</div>
                </div>
                <button className="btn small ghost" onClick={() => console.log('Remove saved item clicked')}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvestorWatchlist({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Watchlist</h2>
        <p className="muted">Monitor farms and track their progress.</p>
      </div>
      <div className="card">
        <h3>Watched Farms</h3>
        <div style={{marginTop:16}}>
          {farms.slice(0,3).map(farm => (
            <div key={farm.id} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{farm.name}</b>
                  <div className="muted">{farm.crop} • {farm.status}</div>
                </div>
                <StatusBadge status={farm.status}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvestorPortfolio({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Investment Portfolio</h2>
        <p className="muted">Track your active investments and returns.</p>
      </div>
      <div className="grid cols4">
        <Metric label="Portfolio Value" value="$2,000" trend="2 active investments" icon={WalletCards}/>
        <Metric label="Total Returns" value="8.5%" trend="YTD performance" icon={ChartNoAxesCombined}/>
        <Metric label="Invested Amount" value="$1,300" trend="Principal invested" icon={BriefcaseBusiness}/>
        <Metric label="Pending Payouts" value="$800" trend="Next: Oct 2026" icon={ClipboardCheck}/>
      </div>
      <div className="card" style={{marginTop:16}}>
        <h3>Active Investments</h3>
        <div style={{marginTop:16}}>
          {opportunities.slice(0,2).map(opp => (
            <div key={opp.id} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{opp.farm}</b>
                  <div className="muted">{opp.crop} • {opp.target} • {opp.duration}</div>
                </div>
                <StatusBadge status="Active"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvestorEducation({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Education Center</h2>
        <p className="muted">Learn about agricultural investment and farming practices.</p>
      </div>
      <div className="grid cols2">
        {[
          {title: 'Understanding Agricultural Risk', category: 'Risk Management', duration: '15 min'},
          {title: 'Crop Cycle Fundamentals', category: 'Farming Basics', duration: '20 min'},
          {title: 'Due Diligence for Farm Investments', category: 'Investment Strategy', duration: '25 min'},
          {title: 'Seasonal Market Patterns', category: 'Market Analysis', duration: '18 min'}
        ].map((course, i) => (
          <div key={i} className="card">
            <h3>{course.title}</h3>
            <div className="split" style={{marginTop:12}}>
              <div className="muted">{course.category}</div>
              <div className="muted">{course.duration}</div>
            </div>
            <button className="btn small primary" style={{marginTop:16}} onClick={() => console.log('Start learning clicked')}>Start Learning</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Shared Pages
function AgriFeed({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Agri Feed</h2>
        <p className="muted">Latest news and updates from the agricultural community.</p>
      </div>
      <div className="card">
        <h3>Recent Updates</h3>
        <div style={{marginTop:16}}>
          {[
            {title: 'Maize prices expected to rise in Q4', source: 'Agricultural News', date: '20 Aug 2026'},
            {title: 'New irrigation subsidy program announced', source: 'Government Gazette', date: '19 Aug 2026'},
            {title: 'Soybean export demand increases', source: 'Market Watch', date: '18 Aug 2026'},
            {title: 'Weather forecast: Normal rainfall expected', source: 'Meteorological Dept', date: '17 Aug 2026'}
          ].map((item, i) => (
            <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div>
                <b>{item.title}</b>
                <div className="muted">{item.source} • {item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Messages({ onPageChange, onNewMessage }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Messages</h2>
          <p className="muted">Communicate with farmers, lenders, and support.</p>
        </div>
        <button className="btn primary" onClick={onNewMessage}>New Message</button>
      </div>
      <div className="card">
        <h3>Inbox</h3>
        <div style={{marginTop:16}}>
          {[
            {from: 'AgriCredit Zimbabwe', subject: 'Application Update - Nyika Plains Farm', date: '20 Aug 2026', unread: true},
            {from: 'FarmLink Support', subject: 'Document verification complete', date: '19 Aug 2026', unread: false},
            {from: 'Ruvimbo Ncube', subject: 'Financing terms discussion', date: '18 Aug 2026', unread: false}
          ].map((msg, i) => (
            <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0', background: msg.unread ? '#f8f9fa' : 'transparent'}}>
              <div className="split">
                <div>
                  <b>{msg.from}</b>
                  <div className="muted">{msg.subject} • {msg.date}</div>
                </div>
                {msg.unread && <div style={{width:8,height:8,background:'#007bff',borderRadius:'50%'}}/>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserProfile({ onPageChange, role, onEditProfile }) {
  const userData = roles[role];
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Profile Settings</h2>
          <p className="muted">Manage your account information and preferences.</p>
        </div>
        <button className="btn primary" onClick={onEditProfile}>Edit Profile</button>
      </div>
      <div className="card">
        <h3>Personal Information</h3>
        <div className="grid cols2" style={{marginTop:16}}>
          <div>
            <label>Full Name</label>
            <input type="text" defaultValue={userData.name} style={{width:'100%',padding:8,marginTop:4}}/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" defaultValue={userData.email} style={{width:'100%',padding:8,marginTop:4}}/>
          </div>
          <div>
            <label>Role</label>
            <input type="text" defaultValue={userData.label} disabled style={{width:'100%',padding:8,marginTop:4,background:'#f5f5f5'}}/>
          </div>
          <div>
            <label>Phone</label>
            <input type="tel" placeholder="+263..." style={{width:'100%',padding:8,marginTop:4}}/>
          </div>
        </div>
      </div>
      <div className="card" style={{marginTop:16}}>
        <h3>Security</h3>
        <div style={{marginTop:16}}>
          <button className="btn small" onClick={() => console.log('Change password clicked')}>Change Password</button>
          <button className="btn small ghost" onClick={() => console.log('Enable 2FA clicked')}>Enable Two-Factor Auth</button>
        </div>
      </div>
    </div>
  );
}

// Admin Pages
function AdminKYC({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>KYC Queue</h2>
        <p className="muted">Review and process Know Your Customer verification requests.</p>
      </div>
      <div className="card">
        <h3>Pending Reviews</h3>
        <div style={{marginTop:16}}>
          {[
            {user: 'Tendai Moyo', type: 'Farmer', submitted: '18 Aug 2026', priority: 'High'},
            {user: 'Michael Dube', type: 'Investor', submitted: '17 Aug 2026', priority: 'Medium'},
            {user: 'Ruvimbo Ncube', type: 'Lender', submitted: '16 Aug 2026', priority: 'Low'}
          ].map((item, i) => (
            <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{item.user}</b>
                  <div className="muted">{item.type} • Submitted: {item.submitted}</div>
                </div>
                <div>
                  <StatusBadge status={item.priority}/>
                  <button className="btn small" style={{marginLeft:8}} onClick={() => console.log('Review KYC item clicked')}>Review</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminFarmVerification({ onPageChange, onFarmClick }) {
  return (
    <div className="grid">
      <div>
        <h2>Farm Verification</h2>
        <p className="muted">Review and verify farm applications and documentation.</p>
      </div>
      <div className="card">
        <h3>Verification Queue</h3>
        <div style={{marginTop:16}}>
          {farms.map(farm => (
            <div key={farm.id} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{farm.name}</b>
                  <div className="muted">{farm.crop} • {farm.size} ha • {farm.farmer}</div>
                </div>
                <div>
                  <StatusBadge status={farm.status}/>
                  <button className="btn small" style={{marginLeft:8}} onClick={() => onFarmClick(farm.id)}>Review</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminUsers({ onPageChange, onAddUser }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>User Management</h2>
          <p className="muted">Manage platform users and access controls.</p>
        </div>
        <button className="btn primary" onClick={onAddUser}>Add User</button>
      </div>
      <div className="card">
        <h3>All Users</h3>
        <div style={{marginTop:16}}>
          {Object.entries(roles).map(([key, user]) => (
            <div key={key} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{user.name}</b>
                  <div className="muted">{user.label} • {user.email}</div>
                </div>
                <StatusBadge status="Active"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminInstitutions({ onPageChange, onAddInstitution }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Institution Management</h2>
          <p className="muted">Manage lending institutions and their verification status.</p>
        </div>
        <button className="btn primary" onClick={onAddInstitution}>Add Institution</button>
      </div>
      <div className="card">
        <h3>Registered Institutions</h3>
        <div style={{marginTop:16}}>
          {institutions.map((inst, i) => (
            <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{inst.name}</b>
                  <div className="muted">{inst.type} • {inst.focus} • {inst.regions}</div>
                </div>
                <StatusBadge status={inst.verified ? 'Verified' : 'Pending'}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminContent({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Content Moderation</h2>
        <p className="muted">Review and moderate user-generated content.</p>
      </div>
      <div className="card">
        <h3>Flagged Content</h3>
        <div style={{marginTop:16}}>
          {[
            {type: 'Farm Description', user: 'Grace Chirwa', flag: 'Inaccurate information', date: '19 Aug 2026'},
            {type: 'Investment Opportunity', user: 'Farai Nyathi', flag: 'Missing documentation', date: '18 Aug 2026'}
          ].map((item, i) => (
            <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{item.type}</b>
                  <div className="muted">{item.user} • {item.flag} • {item.date}</div>
                </div>
                <div>
                  <button className="btn small ghost" onClick={() => console.log('Approve content clicked')}>Approve</button>
                  <button className="btn small ghost" style={{marginLeft:8}} onClick={() => console.log('Reject content clicked')}>Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminReports({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Reports & Flags</h2>
        <p className="muted">View system reports and manage flagged items.</p>
      </div>
      <div className="grid cols2">
        <div className="card">
          <h3>System Reports</h3>
          <div style={{marginTop:16}}>
            {[
              {name: 'User Activity Report', period: 'Last 7 days', generated: '20 Aug 2026'},
              {name: 'Transaction Summary', period: 'Last 30 days', generated: '19 Aug 2026'},
              {name: 'Verification Status Report', period: 'Current month', generated: '18 Aug 2026'}
            ].map((report, i) => (
              <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div className="split">
                  <div>
                    <b>{report.name}</b>
                    <div className="muted">{report.period} • {report.generated}</div>
                  </div>
                  <button className="btn small ghost" onClick={() => console.log('Download admin report clicked')}>Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Active Flags</h3>
          <div style={{marginTop:16}}>
            {[
              {item: 'Umfuli Grain & Livestock', flag: 'Irrigation documentation incomplete', severity: 'High'},
              {item: 'Green Valley Produce', flag: 'Production history discrepancy', severity: 'Medium'}
            ].map((flag, i) => (
              <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div className="split">
                  <div>
                    <b>{flag.item}</b>
                    <div className="muted">{flag.flag}</div>
                  </div>
                  <StatusBadge status={flag.severity}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminAudit({ onPageChange }) {
  return (
    <div className="grid">
      <div>
        <h2>Audit Logs</h2>
        <p className="muted">View system activity and audit trails.</p>
      </div>
      <div className="card">
        <h3>Recent Activity</h3>
        <div style={{marginTop:16}}>
          {[
            {action: 'User login', user: 'Tendai Moyo', timestamp: '20 Aug 2026 14:32'},
            {action: 'Document upload', user: 'Grace Chirwa', timestamp: '20 Aug 2026 11:15'},
            {action: 'Application approved', user: 'Ruvimbo Ncube', timestamp: '19 Aug 2026 16:45'},
            {action: 'Profile updated', user: 'Michael Dube', timestamp: '19 Aug 2026 09:22'},
            {action: 'Farm verified', user: 'Chipo Soko', timestamp: '18 Aug 2026 15:30'}
          ].map((log, i) => (
            <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div className="split">
                <div>
                  <b>{log.action}</b>
                  <div className="muted">{log.user} • {log.timestamp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminSettings({ onPageChange, onOpenSettings }) {
  return (
    <div className="grid">
      <div className="split">
        <div>
          <h2>Platform Settings</h2>
          <p className="muted">Configure system-wide settings and preferences.</p>
        </div>
        <button className="btn primary" onClick={onOpenSettings}>Save Settings</button>
      </div>
      <div className="grid cols2">
        <div className="card">
          <h3>General Settings</h3>
          <div style={{marginTop:16}}>
            <div style={{marginBottom:16}}>
              <label>Platform Name</label>
              <input type="text" defaultValue="FarmLink" style={{width:'100%',padding:8,marginTop:4}}/>
            </div>
            <div style={{marginBottom:16}}>
              <label>Support Email</label>
              <input type="email" defaultValue="support@farmlink.local" style={{width:'100%',padding:8,marginTop:4}}/>
            </div>
            <div>
              <label>Default Currency</label>
              <select style={{width:'100%',padding:8,marginTop:4}}>
                <option>USD - US Dollar</option>
                <option>ZWL - Zimbabwe Dollar</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card">
          <h3>Security Settings</h3>
          <div style={{marginTop:16}}>
            <div style={{marginBottom:16}}>
              <label>
                <input type="checkbox" defaultChecked/> Require two-factor authentication
              </label>
            </div>
            <div style={{marginBottom:16}}>
              <label>
                <input type="checkbox" defaultChecked/> Enable audit logging
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" defaultChecked/> Auto-logout after inactivity
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal Components
function EditProfileModal({ isOpen, onClose, role }) {
  const userData = roles[role];
  const [formData, setFormData] = React.useState({
    name: userData.name,
    email: userData.email,
    phone: '',
    role: userData.label
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom: 16}}>
          <label>Full Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{width:'100%',padding:8,marginTop:4}}
          />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Email</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{width:'100%',padding:8,marginTop:4}}
          />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Role</label>
          <input 
            type="text" 
            value={formData.role}
            disabled
            style={{width:'100%',padding:8,marginTop:4,background:'#f5f5f5'}}
          />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Phone</label>
          <input 
            type="tel" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="+263..."
            style={{width:'100%',padding:8,marginTop:4}}
          />
        </div>
        <div className="split" style={{marginTop: 20}}>
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">Save Changes</button>
        </div>
      </form>
    </Modal>
  );
}

function ApplyFinancingModal({ isOpen, onClose }) {
  const [formData, setFormData] = React.useState({
    amount: '',
    purpose: '',
    duration: '',
    lender: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Financing application submitted:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Apply for Financing" size="large">
      <form onSubmit={handleSubmit}>
        <div className="grid cols2" style={{marginBottom: 16}}>
          <div>
            <label>Amount Required</label>
            <input 
              type="text" 
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="$10,000"
              style={{width:'100%',padding:8,marginTop:4}}
            />
          </div>
          <div>
            <label>Duration</label>
            <input 
              type="text" 
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              placeholder="6-12 months"
              style={{width:'100%',padding:8,marginTop:4}}
            />
          </div>
        </div>
        <div style={{marginBottom: 16}}>
          <label>Purpose</label>
          <textarea 
            value={formData.purpose}
            onChange={(e) => setFormData({...formData, purpose: e.target.value})}
            placeholder="Describe how you plan to use the financing..."
            style={{width:'100%',padding:8,marginTop:4,minHeight:'80px'}}
          />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Preferred Lender</label>
          <select 
            value={formData.lender}
            onChange={(e) => setFormData({...formData, lender: e.target.value})}
            style={{width:'100%',padding:8,marginTop:4}}
          >
            <option value="">Select a lender...</option>
            {institutions.map((inst, i) => (
              <option key={i} value={inst.name}>{inst.name}</option>
            ))}
          </select>
        </div>
        <div className="split" style={{marginTop: 20}}>
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">Submit Application</button>
        </div>
      </form>
    </Modal>
  );
}

function UploadDocumentModal({ isOpen, onClose }) {
  const [formData, setFormData] = React.useState({
    name: '',
    type: '',
    file: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Document uploaded:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Document">
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom: 16}}>
          <label>Document Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="e.g., Title Deed, Production Records"
            style={{width:'100%',padding:8,marginTop:4}}
          />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Document Type</label>
          <select 
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            style={{width:'100%',padding:8,marginTop:4}}
          >
            <option value="">Select type...</option>
            <option value="identity">Identity</option>
            <option value="tenure">Land Tenure</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="market">Market Evidence</option>
            <option value="history">Production History</option>
          </select>
        </div>
        <div style={{marginBottom: 16}}>
          <label>File</label>
          <div style={{
            border: '2px dashed #e4ded2',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            background: '#f8f9fa'
          }}>
            <Upload size={32} color="#66736b" style={{marginBottom: 8}}/>
            <div className="muted">Click to upload or drag and drop</div>
            <input 
              type="file" 
              onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
              style={{width:'100%',marginTop:8}}
            />
          </div>
        </div>
        <div className="split" style={{marginTop: 20}}>
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">Upload Document</button>
        </div>
      </form>
    </Modal>
  );
}

function FarmDetailsModal({ isOpen, onClose, farm }) {
  if (!farm) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Farm Details: ${farm.name}`} size="large">
      <div className="card" style={{background: '#f8f9fa', marginBottom: 16}}>
        <div className="split">
          <div>
            <h3>{farm.name}</h3>
            <p className="muted">{farm.loc}</p>
          </div>
          <StatusBadge status={farm.status}/>
        </div>
      </div>
      
      <div className="grid cols2" style={{marginBottom: 16}}>
        <div>
          <b>Farmer</b>
          <div className="muted">{farm.farmer}</div>
        </div>
        <div>
          <b>Location</b>
          <div className="muted">{farm.province}, {farm.district}</div>
        </div>
        <div>
          <b>Primary Crop</b>
          <div className="muted">{farm.crop}</div>
        </div>
        <div>
          <b>Farm Size</b>
          <div className="muted">{farm.size} hectares</div>
        </div>
        <div>
          <b>Financing Need</b>
          <div className="muted">{money(farm.need)}</div>
        </div>
        <div>
          <b>Readiness Score</b>
          <div className="muted">{farm.score}%</div>
        </div>
      </div>

      <div style={{marginBottom: 16}}>
        <h4>Additional Information</h4>
        <div className="grid cols2" style={{marginTop: 8}}>
          <div>
            <b>Land Tenure</b>
            <div className="muted">{farm.tenure}</div>
          </div>
          <div>
            <b>Irrigation</b>
            <div className="muted">{farm.irrigation}</div>
          </div>
          <div>
            <b>Offtaker Status</b>
            <div className="muted">{farm.offtaker}</div>
          </div>
          <div>
            <b>Documents</b>
            <div className="muted">{farm.docs} uploaded</div>
          </div>
        </div>
      </div>

      <div style={{marginBottom: 16}}>
        <h4>Production History</h4>
        <div className="muted" style={{marginTop: 8}}>
          {farm.history.map((yieldVal, i) => `${2024 + i}: ${yieldVal} t/ha`).join(' • ')}
        </div>
      </div>

      <div className="split" style={{marginTop: 20}}>
        <button className="btn ghost" onClick={onClose}>Close</button>
        <button className="btn primary" onClick={() => console.log('Contact farmer:', farm.farmer)}>
          Contact Farmer
        </button>
      </div>
    </Modal>
  );
}

function NewMessageModal({ isOpen, onClose }) {
  const [formData, setFormData] = React.useState({
    to: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message sent:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Message" size="large">
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom: 16}}>
          <label>To</label>
          <select 
            value={formData.to}
            onChange={(e) => setFormData({...formData, to: e.target.value})}
            style={{width:'100%',padding:8,marginTop:4}}
          >
            <option value="">Select recipient...</option>
            <option value="AgriCredit Zimbabwe">AgriCredit Zimbabwe</option>
            <option value="FarmLink Support">FarmLink Support</option>
            <option value="Ruvimbo Ncube">Ruvimbo Ncube</option>
          </select>
        </div>
        <div style={{marginBottom: 16}}>
          <label>Subject</label>
          <input 
            type="text" 
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            placeholder="Enter subject..."
            style={{width:'100%',padding:8,marginTop:4}}
          />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Message</label>
          <textarea 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="Type your message..."
            style={{width:'100%',padding:8,marginTop:4,minHeight:'120px'}}
          />
        </div>
        <div className="split" style={{marginTop: 20}}>
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">
            <Send size={16} style={{marginRight: 8}}/> Send Message
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ProductModal({ isOpen, onClose, product }) {
  const isNew = !product || !product.name;
  const [formData, setFormData] = React.useState(product || {
    name: '',
    rate: '',
    term: '',
    min: '',
    max: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product saved:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isNew ? 'Add Product' : 'Edit Product'}>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom: 16}}>
          <label>Product Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="e.g., Input Finance Program"
            style={{width:'100%',padding:8,marginTop:4}}
          />
        </div>
        <div className="grid cols2" style={{marginBottom: 16}}>
          <div>
            <label>Interest Rate</label>
            <input 
              type="text" 
              value={formData.rate}
              onChange={(e) => setFormData({...formData, rate: e.target.value})}
              placeholder="12%"
              style={{width:'100%',padding:8,marginTop:4}}
            />
          </div>
          <div>
            <label>Term</label>
            <input 
              type="text" 
              value={formData.term}
              onChange={(e) => setFormData({...formData, term: e.target.value})}
              placeholder="6-12 months"
              style={{width:'100%',padding:8,marginTop:4}}
            />
          </div>
        </div>
        <div className="grid cols2" style={{marginBottom: 16}}>
          <div>
            <label>Minimum Amount</label>
            <input 
              type="text" 
              value={formData.min}
              onChange={(e) => setFormData({...formData, min: e.target.value})}
              placeholder="$10,000"
              style={{width:'100%',padding:8,marginTop:4}}
            />
          </div>
          <div>
            <label>Maximum Amount</label>
            <input 
              type="text" 
              value={formData.max}
              onChange={(e) => setFormData({...formData, max: e.target.value})}
              placeholder="$200,000"
              style={{width:'100%',padding:8,marginTop:4}}
            />
          </div>
        </div>
        <div className="split" style={{marginTop: 20}}>
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">
            {isNew ? 'Add Product' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function InstitutionModal({ isOpen, onClose }) {
  const [formData, setFormData] = React.useState({
    name: '',
    type: '',
    focus: '',
    regions: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Institution added:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Institution">
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom: 16}}>
          <label>Institution Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="e.g., AgriBank Zimbabwe"
            style={{width:'100%',padding:8,marginTop:4}}
          />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Institution Type</label>
          <select 
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            style={{width:'100%',padding:8,marginTop:4}}
          >
            <option value="">Select type...</option>
            <option value="agricultural_lender">Agricultural Lender</option>
            <option value="microfinance">Microfinance</option>
            <option value="insurance">Insurance</option>
            <option value="commercial_bank">Commercial Bank</option>
          </select>
        </div>
        <div style={{marginBottom: 16}}>
          <label>Focus Areas</label>
          <input 
            type="text" 
            value={formData.focus}
            onChange={(e) => setFormData({...formData, focus: e.target.value})}
            placeholder="e.g., Input finance, working capital"
            style={{width:'100%',padding:8,marginTop:4}}
          />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Coverage Regions</label>
          <input 
            type="text" 
            value={formData.regions}
            onChange={(e) => setFormData({...formData, regions: e.target.value})}
            placeholder="e.g., National, Mashonaland, Midlands"
            style={{width:'100%',padding:8,marginTop:4}}
          />
        </div>
        <div className="split" style={{marginTop: 20}}>
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">Add Institution</button>
        </div>
      </form>
    </Modal>
  );
}

function UserModal({ isOpen, onClose }) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    role: 'farmer'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User added:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add User">
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom: 16}}>
          <label>Full Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="e.g., John Doe"
            style={{width:'100%',padding:8,marginTop:4}}
          />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Email</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="e.g., john@example.com"
            style={{width:'100%',padding:8,marginTop:4}}
          />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Role</label>
          <select 
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            style={{width:'100%',padding:8,marginTop:4}}
          >
            <option value="farmer">Farmer</option>
            <option value="lender">Lender</option>
            <option value="investor">Investor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="split" style={{marginTop: 20}}>
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">Add User</button>
        </div>
      </form>
    </Modal>
  );
}

function SettingsModal({ isOpen, onClose }) {
  const [formData, setFormData] = React.useState({
    platformName: 'FarmLink',
    supportEmail: 'support@farmlink.local',
    currency: 'USD',
    require2FA: true,
    enableAudit: true,
    autoLogout: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Platform Settings" size="large">
      <form onSubmit={handleSubmit}>
        <div className="grid cols2" style={{marginBottom: 16}}>
          <div>
            <label>Platform Name</label>
            <input 
              type="text" 
              value={formData.platformName}
              onChange={(e) => setFormData({...formData, platformName: e.target.value})}
              style={{width:'100%',padding:8,marginTop:4}}
            />
          </div>
          <div>
            <label>Support Email</label>
            <input 
              type="email" 
              value={formData.supportEmail}
              onChange={(e) => setFormData({...formData, supportEmail: e.target.value})}
              style={{width:'100%',padding:8,marginTop:4}}
            />
          </div>
        </div>
        <div style={{marginBottom: 16}}>
          <label>Default Currency</label>
          <select 
            value={formData.currency}
            onChange={(e) => setFormData({...formData, currency: e.target.value})}
            style={{width:'100%',padding:8,marginTop:4}}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="ZWL">ZWL - Zimbabwe Dollar</option>
          </select>
        </div>
        <div style={{marginBottom: 16}}>
          <h4>Security Settings</h4>
          <div style={{marginTop: 8}}>
            <label style={{display: 'flex', alignItems: 'center', marginBottom: 12}}>
              <input 
                type="checkbox" 
                checked={formData.require2FA}
                onChange={(e) => setFormData({...formData, require2FA: e.target.checked})}
                style={{marginRight: 8}}
              />
              Require two-factor authentication
            </label>
            <label style={{display: 'flex', alignItems: 'center', marginBottom: 12}}>
              <input 
                type="checkbox" 
                checked={formData.enableAudit}
                onChange={(e) => setFormData({...formData, enableAudit: e.target.checked})}
                style={{marginRight: 8}}
              />
              Enable audit logging
            </label>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <input 
                type="checkbox" 
                checked={formData.autoLogout}
                onChange={(e) => setFormData({...formData, autoLogout: e.target.checked})}
                style={{marginRight: 8}}
              />
              Auto-logout after inactivity
            </label>
          </div>
        </div>
        <div className="split" style={{marginTop: 20}}>
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">Save Settings</button>
        </div>
      </form>
    </Modal>
  );
}