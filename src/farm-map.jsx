import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { parseGPS } from "./locations.js";

export function FarmMap({ farms, go, publicView = false }) {
  const container = useRef(null);
  const mapRef = useRef(null);
  const [tileError, setTileError] = useState(false);
  const located = farms.filter((farm) => parseGPS(farm.gps));

  useEffect(() => {
    const map = L.map(container.current, { scrollWheelZoom: false }).setView([-19, 29.5], 6);
    mapRef.current = map;
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).on("tileerror", () => setTileError(true)).addTo(map);
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container.current);
    return () => { observer.disconnect(); map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const group = L.featureGroup().addTo(map);
    for (const farm of farms) {
      const position = parseGPS(farm.gps);
      if (!position) continue;
      const popup = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = farm.name;
      const details = document.createElement("p");
      details.textContent = `${farm.loc} · ${farm.crop} · ${farm.size} ha · ${farm.status}`;
      popup.append(title, details);
      if (go) {
        const button = document.createElement("button");
        button.className = "btn";
        button.textContent = publicView ? "View public profile" : "View farm report";
        button.onclick = () => go(`${publicView ? "business-profile" : "farm-report"}/${farm.id}`);
        popup.append(button);
      }
      L.marker(position, {
        title: farm.name,
        alt: farm.name,
        icon: L.divIcon({ className: "farm-map-pin", html: '<span aria-hidden="true"></span>', iconSize: [28, 28], iconAnchor: [14, 14] }),
      }).bindPopup(popup).addTo(group);
    }
    if (group.getLayers().length) map.fitBounds(group.getBounds(), { padding: [45, 45], maxZoom: 11 });
    else map.setView([-19, 29.5], 6);
    return () => group.remove();
  }, [farms, go, publicView]);

  return <section className="card farm-map-section" aria-label="Farm locations">
    <div className="split"><h2>Farm locations</h2><span className="muted">{located.length} on map</span></div>
    <p className="muted">Sample locations for fictional farms. Select a marker for details. Use + and − to zoom.</p>
    {farms.length > located.length && <p role="status">{farms.length - located.length} farm(s) have missing or invalid coordinates.</p>}
    {tileError && <p role="status">Background map could not load. Check your internet connection; farm markers and profiles remain available.</p>}
    <div ref={container} className="farm-map" role="region" aria-label="Interactive farm map" />
  </section>;
}
