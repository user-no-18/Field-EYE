"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import styles from "./Map.module.css";
import { WorkerRoute } from "@/lib/mockData";

interface MapProps {
  workers: WorkerRoute[];
  selectedWorkerId?: string | null;
}

export default function Map({ workers, selectedWorkerId }: MapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={`glass-panel ${styles.mapContainer}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Map...</div>;

  const center: [number, number] = [22.5726, 88.3639]; // Kolkata base center

  const activeWorkers = selectedWorkerId
    ? workers.filter((w) => w.id === selectedWorkerId)
    : workers;

  const createCustomIcon = (worker: WorkerRoute) => {
    const isOnline = worker.status === 'active';
    const statusColor = isOnline ? '#10b981' : '#ef4444';
    const wifiSvg = isOnline 
      ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${statusColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`
      : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${statusColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`;

    const svgIcon = `
      <div style="display: flex; flex-direction: column; align-items: center; width: 120px; transform: translateX(-40px);">
        <div style="position: relative; width: 40px; height: 40px; margin: 0 auto;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="40" height="40" style="filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.3));">
            <path fill="${worker.color}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
          </svg>
          <div style="position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 50%; overflow: hidden; background: white;">
            <img src="${worker.avatarUrl}" alt="avatar" style="width: 100%; height: 100%; object-fit: cover;"/>
          </div>
          <div style="position: absolute; top: -5px; right: -5px; background: white; border-radius: 50%; padding: 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;">
            ${wifiSvg}
          </div>
        </div>
        <div style="background: rgba(255,255,255,0.9); backdrop-filter: blur(4px); padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; color: #1e293b; text-align: center; margin-top: 4px; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 2px 8px rgba(0,0,0,0.1); white-space: nowrap;">
          ${worker.name}
        </div>
      </div>
    `;

    return L.divIcon({
      className: 'custom-svg-marker',
      html: svgIcon,
      iconSize: [120, 60],
      iconAnchor: [60, 40],
      popupAnchor: [0, -40]
    });
  };

  return (
    <div className={`glass-panel ${styles.mapContainer}`}>
      <MapContainer center={center} zoom={11} className={styles.map} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {activeWorkers.map((worker) => (
          <div key={worker.id}>
            {/* Removed Polyline to avoid chaos on main map */}
            {/* Marker at current location (last point in route) */}
            <Marker position={worker.route[worker.route.length - 1]} icon={createCustomIcon(worker)}>
              <Popup>
                <strong>{worker.name}</strong><br />
                {worker.role}<br/>
                Current Location<br/>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginTop: '4px' }}>Last updated: 2 mins ago</span>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>

      {/* Offline Notification Overlay */}
      {workers.filter(w => w.status === 'offline').map(offlineWorker => (
        <div key={`notif-${offlineWorker.id}`} style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'rgba(239, 68, 68, 0.9)',
          backdropFilter: 'blur(8px)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '50px',
          fontWeight: 500,
          fontSize: '0.9rem',
          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'pulse 2s infinite'
        }}>
          ⚠️ {offlineWorker.name} just turned off GPS / disconnected
        </div>
      ))}
    </div>
  );
}
