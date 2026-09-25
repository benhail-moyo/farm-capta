import FarmLocation from './FarmLocation';
import { DetailsButton } from './Actions';
import React from 'react';
import { CheckCircle2, Clock3, ShieldCheck, ChartNoAxesCombined, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function StatusBadge({status}) {
  let c = status?.includes('Verified') ? '' : 'neutral';
  if(['Action Required','Portfolio at Risk'].includes(status)) c = 'warn';
  if(status==='Rejected'||status==='Declined') c = 'red';
  if(status?.includes('Review')||status==='Submitted'||status==='Screening') c = 'info';
  return (
    <span className={'pill '+c}>
      {status==='Verified'||status?.includes('Verified')?<CheckCircle2 size={14}/>:
       status?.includes('Review')?<Clock3 size={14}/>:
       <ShieldCheck size={14}/>} {status}
    </span>
  );
}

export function Metric({label,value,trend,icon:Icon=ChartNoAxesCombined}) {
  return (
    <div className="metric">
      <div className="split">
        <div className="label">{label}</div>
        <Icon size={19} color="#2f7d55"/>
      </div>
      <div className="value">{value}</div>
      {trend&&<div className="trend">{trend}</div>}
    </div>
  );
}

export function ChartCard({title,children,sub,data,labels,unit}) {
  const chartData = data && labels ? data.map((value, index) => ({
    name: labels[index] || index,
    value: value
  })) : [];

  return (
    <div className="card">
      <div className="split">
        <div>
          <h3>{title}</h3>
          {sub&&<div className="muted" style={{fontSize:13}}>{sub}</div>}
        </div>
      </div>
      <div style={{height:240,marginTop:14}}>
        {children ? children : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4ded2" />
              <XAxis 
                dataKey="name" 
                stroke="#66736b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#66736b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}${unit || ''}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fffdf8',
                  border: '1px solid #e4ded2',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}${unit || ''}`, 'Value']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2f7d55" 
                strokeWidth={2}
                dot={{ fill: '#2f7d55', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export function FarmCard({farm}) {
  return (
    <div className="card">
      <div className="split">
        <div>
          <h3>{farm.name}</h3>
          <div className="muted"><ShieldCheck size={14}/> {farm.loc}</div>
        </div>
        <StatusBadge status={farm.status}/>
      </div>
      <div className="grid cols3" style={{marginTop:16}}>
        <div><b>{farm.crop}</b><div className="muted">Primary crop</div></div>
        <div><b>{farm.size} ha</b><div className="muted">Farm size</div></div>
        <div><b>${farm.need.toLocaleString()}</b><div className="muted">Financing need</div></div>
      </div>
      <div className="risk">
        <span className="muted">Readiness</span>
        <div className="bar"><span style={{width:farm.score+'%'}}/></div>
      </div>
      <div className="split">
        <span className="pill">{farm.ready}</span>
        <div className="farm-actions"><FarmLocation farm={farm}/><DetailsButton title={`${farm.name} ? Farm Report`} data={{Farmer: farm.farmer, Location: farm.loc, Crop: farm.crop, Hectares: farm.size, Status: farm.status, Tenure: farm.tenure, Irrigation: farm.irrigation, Readiness: farm.ready, "Readiness score": farm.score, "Financing need (USD)": farm.need}}>View Farm Report</DetailsButton></div>
      </div>
    </div>
  );
}

export function Modal({isOpen, onClose, title, children, size = 'medium'}) {
  if (!isOpen) return null;

  const sizeStyles = {
    small: { maxWidth: '400px' },
    medium: { maxWidth: '600px' },
    large: { maxWidth: '800px' }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fffdf8',
        borderRadius: '22px',
        border: '1px solid #e4ded2',
        boxShadow: '0 18px 50px rgba(21,35,29,.15)',
        width: '100%',
        maxWidth: sizeStyles[size].maxWidth,
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '24px'
      }}>
        <div className="split" style={{marginBottom: '20px'}}>
          <h2 style={{margin: 0}}>{title}</h2>
          <button 
            className="btn small ghost" 
            onClick={onClose}
            style={{padding: '6px 10px'}}
          >
            <X size={18}/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}