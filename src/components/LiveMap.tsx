"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import styles from "./Map.module.css";
import { WorkerRoute } from "@/lib/mockData";

function RecenterMap({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.panTo(position, { animate: true, duration: 1 });
  }, [position, map]);
  return null;
}

export default function LiveMap({ worker }: { worker: WorkerRoute }) {
  const [mounted, setMounted] = useState(false);
  const [currentPos, setCurrentPos] = useState<[number, number]>(worker.route[worker.route.length - 1]);
  const [routeIndex, setRouteIndex] = useState(worker.route.length - 1);

  useEffect(() => {
    setMounted(true);
    // On mount (page refresh), pick a random point along the route
    if (worker.route.length > 0) {
      const randomIndex = Math.floor(Math.random() * worker.route.length);
      setRouteIndex(randomIndex);
      setCurrentPos(worker.route[randomIndex]);
    }
  }, [worker.route]);

  if (!mounted) return <div className={`glass-panel ${styles.mapContainer}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Live Map...</div>;

  const svgIcon = `
    <div style="position: relative; width: 40px; height: 40px;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="40" height="40" style="filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.3));">
        <path fill="${worker.color}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
      </svg>
      <div style="position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; border-radius: 50%; overflow: hidden; background: white;">
        <img src="${worker.avatarUrl}" alt="avatar" style="width: 100%; height: 100%; object-fit: cover;"/>
      </div>
    </div>
  `;

  const customIcon = L.divIcon({
    className: 'custom-live-marker',
    html: svgIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  return (
    <div className={`glass-panel ${styles.mapContainer}`} style={{ height: '100%', minHeight: '500px' }}>
      <MapContainer center={currentPos} zoom={13} className={styles.map} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* The entire planned route in grey */}
        <Polyline
          positions={worker.route}
          color="rgba(0,0,0,0.2)"
          weight={4}
          dashArray="5, 10"
        />

        {/* The route travelled so far */}
        <Polyline
          positions={worker.route.slice(0, routeIndex + 1)}
          color={worker.color}
          weight={5}
        />

        <Marker position={currentPos} icon={customIcon} zIndexOffset={1000}>
          <Popup>
            <strong>{worker.name}</strong><br/>
            Live Location<br/>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginTop: '4px' }}>Last updated: 2 mins ago</span>
          </Popup>
        </Marker>
        
        <RecenterMap position={currentPos} />
      </MapContainer>
    </div>
  );
}
