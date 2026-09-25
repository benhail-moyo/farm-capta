import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import Modal from './Modal';

export function mapUrls(location) {
  if (!location || !Number.isFinite(location.latitude) || !Number.isFinite(location.longitude) || Math.abs(location.latitude) > 90 || Math.abs(location.longitude) > 180) return null;
  const { latitude: lat, longitude: lon } = location;
  const bbox = [Math.max(-180, lon - .04), Math.max(-90, lat - .025), Math.min(180, lon + .04), Math.min(90, lat + .025)];
  return {
    embed: `https://www.openstreetmap.org/export/embed.html?${new URLSearchParams({ bbox: bbox.join(','), layer: 'mapnik', marker: `${lat},${lon}` })}`,
    full: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=14/${lat}/${lon}`
  };
}

export function FarmMap({ farm }) {
  const [attempt, setAttempt] = useState(0);
  const urls = mapUrls(farm?.location);
  if (!urls) return <p className="notice">Location unavailable. Add this farm’s GPS coordinates to show its marker.</p>;
  return <div className="farm-map">
    <p className="muted">{farm.loc}</p>
    {farm.location.approximate && <p className="notice">Demo location near {farm.district}. This marker is illustrative; the farm’s exact GPS location has not been supplied.</p>}
    <iframe key={attempt} title={`Map location of ${farm.name}`} src={urls.embed} className="farm-map-frame" loading="lazy" />
    <div className="split map-footer"><span className="muted">{farm.location.latitude.toFixed(5)}, {farm.location.longitude.toFixed(5)}</span>
      <a className="btn small" href={urls.full} target="_blank" rel="noopener noreferrer">Open larger map</a></div>
    <p className="muted">Map tiles require an internet connection. If the map is blank, <button type="button" className="text-button" onClick={() => setAttempt(n => n + 1)}>reload the map</button> or open the larger map.</p>
  </div>;
}

export default function FarmLocation({ farm }) {
  const [open, setOpen] = useState(false);
  return <><button type="button" className="btn small" onClick={() => setOpen(true)} aria-haspopup="dialog"><MapPin size={16}/> View Location</button>
    {open && <Modal title={farm?.name || 'Farm location'} onClose={() => setOpen(false)}><FarmMap farm={farm}/></Modal>}</>;
}
