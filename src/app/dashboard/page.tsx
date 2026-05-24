"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import WorkerCard from "@/components/WorkerCard";
import styles from "./dashboard.module.css";
import Link from "next/link";
import { ArrowLeft, BarChart2 } from "lucide-react";

// Dynamically import map component to disable SSR for Leaflet
const Map = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => <div className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Map...</div>
});

import { FAKE_WORKERS } from "@/lib/mockData";

export default function Dashboard() {
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const toggleWorkerSelection = (id: string) => {
    if (selectedWorkerId === id) {
      setSelectedWorkerId(null);
    } else {
      setSelectedWorkerId(id);
    }
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-color)', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 className={styles.title}>Admin Dashboard</h1>
              <p className={styles.subtitle}>Viewing 4 active workers</p>
            </div>
            <Link href="/dashboard/analytics" className="glass-button" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <BarChart2 size={16} /> Monthly Analytics
            </Link>
          </div>
        </div>
        
        {/* Alerts Section */}
        {FAKE_WORKERS.filter(w => w.budgetSpent > w.budgetTotal).map(worker => (
          <div key={`alert-${worker.id}`} style={{ 
            margin: '0 1.5rem 1rem 1.5rem', 
            padding: '0.75rem 1rem', 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)', 
            borderRadius: '8px', 
            color: '#ef4444', 
            fontSize: '0.85rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ⚠️ {worker.name} exceeded budget by ₹{(worker.budgetSpent - worker.budgetTotal).toLocaleString()}
          </div>
        ))}

        <div className={styles.workersList}>
          {FAKE_WORKERS.map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              isActive={selectedWorkerId === worker.id}
              onClick={() => toggleWorkerSelection(worker.id)}
            />
          ))}
        </div>

        <div className="glass-panel" style={{ padding: '1rem', marginTop: 'auto' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Today's Active Routes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAKE_WORKERS.map(worker => (
              <div key={worker.id} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span style={{ fontWeight: 600, color: worker.color }}>{worker.name.split(' ')[0]}:</span> {worker.travelHistoryText}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className={styles.mapContainer}>
        <Map workers={FAKE_WORKERS} selectedWorkerId={selectedWorkerId} />
      </main>
    </div>
  );
}
