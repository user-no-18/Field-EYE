"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { FAKE_WORKERS } from "@/lib/mockData";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, AlertTriangle, Activity, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
import ExpenseCharts from "@/components/ExpenseCharts";

const LiveMap = dynamic(() => import("@/components/LiveMap"), {
  ssr: false,
  loading: () => <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', background: '#f8fafc' }}>Loading Live Map...</div>
});

export default function WorkerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const worker = FAKE_WORKERS.find(w => w.id === id);

  if (!worker) {
    notFound();
  }

  const isOverBudget = worker.budgetSpent > worker.budgetTotal;
  const firstName = worker.name.split(' ')[0];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      maxHeight: '100vh',
      overflow: 'hidden',
      padding: '0.75rem 1.25rem', 
      gap: '0.75rem', 
      backgroundColor: '#f8fafc',
      fontFamily: 'var(--font-inter, sans-serif)',
      boxSizing: 'border-box'
    }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}>
          <ArrowLeft size={16} /> Back to main dashboard
        </Link>
      </div>

      {/* Header Card - Simplified & Compact */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.6rem 1.25rem',
        background: '#ffffff', 
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Left: Avatar & Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e2e8f0', background: '#f8fafc', flexShrink: 0 }}>
             <img src={worker.avatarUrl} alt={worker.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.1 }}>
              {worker.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem', fontWeight: 500, flexWrap: 'wrap' }}>
              <span>{worker.role}</span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2' }}>
                <MapPin size={12} /> Working in {worker.location}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Status Pills in everyday words */}
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            background: worker.status === 'active' ? '#ecfdf5' : '#f1f5f9', 
            color: worker.status === 'active' ? '#059669' : '#64748b', 
            padding: '0.4rem 0.8rem', 
            borderRadius: '50px', 
            fontSize: '0.8rem', 
            fontWeight: 700 
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: worker.status === 'active' ? '#059669' : '#64748b' }} />
            {worker.status === 'active' ? 'On the road' : 'Phone off / Signal lost'}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#eff6ff', color: '#2563eb', padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700 }}>
            <Clock size={12} /> Started day at 09:00 AM
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#fef2f2', color: '#dc2626', padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700 }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
            Not moved for 45 mins
          </span>
        </div>
        
        {/* Right: Budget Box */}
        <div style={{ 
          background: isOverBudget ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)',
          border: isOverBudget ? '1px solid rgba(239, 68, 68, 0.15)' : '1px solid rgba(16, 185, 129, 0.15)',
          padding: '0.5rem 1rem',
          borderRadius: '12px',
          minWidth: '180px'
        }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            MONEY SPENT TODAY
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: isOverBudget ? '#dc2626' : '#0f172a' }}>
              ₹{worker.budgetSpent.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>out of ₹{worker.budgetTotal.toLocaleString()} limit</span>
            {isOverBudget && <AlertTriangle size={16} color="#dc2626" />}
          </div>
          <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '50px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min((worker.budgetSpent / worker.budgetTotal) * 100, 100)}%`, background: isOverBudget ? '#dc2626' : '#10b981', transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.8fr 1fr', 
        gap: '0.75rem', 
        flex: 1,
        minHeight: 0,
        height: '100%'
      }}>
        {/* Left Column: Journey Map */}
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          overflow: 'hidden'
        }}>
          <h2 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Activity size={14} /> WHERE HAS {firstName.toUpperCase()} TRAVELED TODAY?
          </h2>
          
          {/* Path Tracker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            {worker.travelHistoryText.split(' -> ').map((loc, i, arr) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  padding: '0.35rem 0.75rem', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '50px', 
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#334155',
                  background: '#f8fafc'
                }}>
                  {loc}
                </div>
                {i < arr.length - 1 && <ArrowLeft size={14} color="#cbd5e1" style={{ transform: 'rotate(180deg)' }} />}
              </div>
            ))}
          </div>

          {/* Map Container */}
          <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', minHeight: '150px', background: '#f8fafc' }}>
            <LiveMap worker={worker} />
          </div>

          {/* Distance Footer */}
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 700, fontSize: '0.85rem' }}>
             <TrendingUp size={16} color="#10b981" /> Total distance covered today: <span style={{ color: '#10b981' }}>{worker.distanceTravelled}</span>
          </div>
        </div>

        {/* Right Column: Expenses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: 0, height: '100%' }}>
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
