"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { FAKE_WORKERS } from "@/lib/mockData";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, AlertTriangle, Activity } from "lucide-react";
import dynamic from "next/dynamic";
import ExpenseCharts from "@/components/ExpenseCharts";

const LiveMap = dynamic(() => import("@/components/LiveMap"), {
  ssr: false,
  loading: () => <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', background: '#f8fafc' }}>Loading Live Map...</div>
});

export default function WorkerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const worker = FAKE_WORKERS.find(w => w.id === id);

  if (!worker) {
    notFound();
  }

  const isOverBudget = worker.budgetSpent > worker.budgetTotal;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: 'calc(100vh - 2rem)', 
      padding: '1.25rem', 
      gap: '1.25rem', 
      backgroundColor: '#f4f6f8',
      fontFamily: 'var(--font-inter, sans-serif)'
    }}>
      {/* Top Bar */}
      <div>
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      {/* Header Card */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.25rem 1.5rem', 
        background: '#ffffff', 
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
        border: '1px solid rgba(0, 0, 0, 0.04)'
      }}>
        {/* Left: Avatar & Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e2e8f0', background: '#f8fafc' }}>
             <img src={worker.avatarUrl} alt={worker.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
              {worker.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem', fontWeight: 500 }}>
              <span>{worker.role}</span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={12} /> {worker.location}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Status Pills */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', color: '#059669', padding: '0.35rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#059669' }} />
            {worker.status === 'active' ? 'Active' : 'Offline'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#eff6ff', color: '#2563eb', padding: '0.35rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>
            <Clock size={14} /> 09:00 AM <span style={{ color: '#94a3b8', fontWeight: 500 }}>Clock-in</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#fef2f2', color: '#dc2626', padding: '0.35rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
            45m Stat. <span style={{ color: '#94a3b8', fontWeight: 500 }}>Stationary time</span>
          </span>
        </div>
        
        {/* Right: Budget Box */}
        <div style={{ 
          background: isOverBudget ? 'rgba(239, 68, 68, 0.1)' : 'rgba(248, 250, 252, 0.5)',
          border: isOverBudget ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid #e2e8f0',
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          minWidth: '180px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
            BUDGET STATUS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.4rem', fontWeight: 700, color: isOverBudget ? '#dc2626' : '#0f172a' }}>
            ₹{worker.budgetSpent.toLocaleString()} <span style={{ fontSize: '0.95rem', color: '#94a3b8', fontWeight: 500 }}>/ ₹{worker.budgetTotal.toLocaleString()}</span>
            {isOverBudget && <AlertTriangle size={18} color="#dc2626" />}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem', flex: 1 }}>
        {/* Left Column: Live Tracking & Itinerary */}
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             LIVE TRACKING & ITINERARY
          </h2>
          
          {/* Path Tracker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {worker.travelHistoryText.split(' -> ').map((loc, i, arr) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  padding: '0.35rem 0.85rem', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '50px', 
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: '#334155'
                }}>
                  {loc}
                </div>
                {i < arr.length - 1 && <ArrowLeft size={14} color="#cbd5e1" style={{ transform: 'rotate(180deg)' }} />}
              </div>
            ))}
          </div>

          {/* Map Container */}
          <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', minHeight: '300px', background: '#f8fafc' }}>
            <LiveMap worker={worker} />
          </div>

          {/* Distance Footer */}
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem' }}>
             <Activity size={16} /> Total Distance Today: {worker.distanceTravelled}
          </div>
        </div>

        {/* Right Column: Expenses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <ExpenseCharts 
            categories={worker.expenseCategories} 
            daily={worker.dailyExpenses} 
            color="#115e59"
          />
        </div>
      </div>
    </div>
  );
}
