import React from 'react';
import { CheckCircle2, Clock3, ShieldCheck, ChartNoAxesCombined } from 'lucide-react';

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

export function ChartCard({title,children,sub}) {
  return (
    <div className="card">
      <div className="split">
        <div>
          <h3>{title}</h3>
          {sub&&<div className="muted" style={{fontSize:13}}>{sub}</div>}
        </div>
      </div>
      <div style={{height:240,marginTop:14}}>
        {children}
      </div>
    </div>
  );
}

export function FarmCard({farm,onOpen}) {
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
        <button className="btn small primary" onClick={()=>onOpen(farm.id)}>
          View Farm Report <ShieldCheck size={15}/>
        </button>
      </div>
    </div>
  );
}