import React, { useState } from 'react';
import Modal from './Modal';
import { useFarms } from '../data/FarmsContext';

export default function FarmEditor({ farm }) {
  const { updateFarm } = useFarms();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  function save(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const latitude = Number(values.latitude), longitude = Number(values.longitude);
    const changed = latitude !== farm.location?.latitude || longitude !== farm.location?.longitude;
    try {
      updateFarm({ ...farm, crop: values.crop, size: Number(values.size), tenure: values.tenure, irrigation: values.irrigation,
        location: { latitude, longitude, approximate: changed ? false : farm.location?.approximate } });
      setOpen(false);
    } catch { setError('Could not save. Please allow browser storage and try again.'); }
  }
  return <><button className="btn primary" onClick={() => setOpen(true)}>Edit Profile</button>
    {open && <Modal title={`Edit ${farm.name}`} onClose={() => setOpen(false)}><p className="muted">Changes are saved on this device and used throughout the app. Enter the farm’s GPS coordinates to replace the illustrative marker.</p>
      <form className="grid" onSubmit={save}>
        {[['crop','Primary crops'],['size','Farm size (ha)'],['tenure','Land tenure'],['irrigation','Irrigation']].map(([name,label]) => <label className="field" key={name}>{label}<input name={name} defaultValue={farm[name]} type={name === 'size' ? 'number' : 'text'} min={name === 'size' ? .01 : undefined} step="any" required/></label>)}
        <label className="field">Latitude<input name="latitude" type="number" min="-90" max="90" step="any" defaultValue={farm.location?.latitude} required/></label>
        <label className="field">Longitude<input name="longitude" type="number" min="-180" max="180" step="any" defaultValue={farm.location?.longitude} required/></label>
        {error && <p role="alert">{error}</p>}<button type="submit" className="btn primary">Save Changes</button>
      </form></Modal>}</>;
}
