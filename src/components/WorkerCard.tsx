import { MapPin, Route } from "lucide-react";
import Image from "next/image";
import styles from "./WorkerCard.module.css";

interface WorkerCardProps {
  worker: {
    id: string;
    name: string;
    role: string;
    color: string;
    distanceTravelled: string;
    budgetTotal: number;
    budgetSpent: number;
    avatarUrl: string;
    travelHistoryText: string;
    status: "active" | "offline";
  };
  isActive: boolean;
  onClick: () => void;
}

export default function WorkerCard({ worker, isActive, onClick }: WorkerCardProps) {
  const budgetPercentage = Math.min(100, (worker.budgetSpent / worker.budgetTotal) * 100);
  const isOverBudget = worker.budgetSpent > worker.budgetTotal;

  return (
    <div 
      className={`glass-panel ${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      style={{ "--card-color": worker.color } as React.CSSProperties}
    >
      <div className={styles.header}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Image 
            src={worker.avatarUrl} 
            alt={worker.name} 
            width={40} 
            height={40} 
            style={{ borderRadius: '50%', objectFit: 'cover', border: `2px solid ${worker.color}` }}
          />
          <div>
            <div className={styles.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {worker.name}
              <div 
                style={{ 
                  background: worker.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: worker.status === 'active' ? '#10b981' : '#ef4444',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginLeft: 'auto'
                }} 
              >
                {worker.status === 'active' ? 'Active' : 'Disconnected'}
              </div>
            </div>
            <div className={styles.role}>{worker.role}</div>
          </div>
        </div>
        <div className={styles.distance}>
          <MapPin size={14} />
          {worker.distanceTravelled}
        </div>
      </div>

      <div className={styles.budgetSection}>
        <div className={styles.budgetHeader}>
          <span className={styles.budgetSpent}>₹{worker.budgetSpent.toLocaleString()}</span>
          <span className={styles.budgetTotal}>/ ₹{worker.budgetTotal.toLocaleString()}</span>
        </div>
        <div className={styles.progressBarContainer}>
          <div 
            className={`${styles.progressBar} ${isOverBudget ? styles.overBudget : ""}`}
            style={{ 
              width: `${budgetPercentage}%`,
              backgroundColor: isOverBudget ? undefined : worker.color 
            }}
          />
        </div>
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', padding: '0.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem', fontWeight: 500, color: 'var(--text-primary)' }}>
             <Route size={14} /> Travel History
          </div>
          {worker.travelHistoryText}
        </div>
      </div>

      {isActive && (
        <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
          <a 
            href={`/dashboard/worker/${worker.id}`} 
            className="glass-button" 
            style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <MapPin size={14} /> View Live Map & Analytics
          </a>
        </div>
      )}
    </div>
  );
}
