"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp, DollarSign, Award, Activity } from "lucide-react";
import { FAKE_WORKERS } from "@/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export default function AnalyticsPage() {
  // Aggregate Data
  const totalBudget = FAKE_WORKERS.reduce((acc, w) => acc + w.budgetTotal, 0);
  const totalSpent = FAKE_WORKERS.reduce((acc, w) => acc + w.budgetSpent, 0);
  const totalSavings = Math.max(0, totalBudget - totalSpent);
  
  // Find Most Active User (by distance)
  const mostActiveUser = FAKE_WORKERS.reduce((prev, current) => {
    const prevDist = parseInt(prev.distanceTravelled.replace(' km', ''));
    const currDist = parseInt(current.distanceTravelled.replace(' km', ''));
    return (prevDist > currDist) ? prev : current;
  });

  // Aggregate Category Spending across company
  const categoryMap = new Map<string, number>();
  FAKE_WORKERS.forEach(worker => {
    worker.expenseCategories.forEach(exp => {
      const current = categoryMap.get(exp.category) || 0;
      categoryMap.set(exp.category, current + exp.amount);
    });
  });
  
  const companyCategoryData = Array.from(categoryMap.entries()).map(([category, amount]) => ({
    category,
    amount
  })).sort((a, b) => b.amount - a.amount);

  return (
    <div style={{ padding: '1.5rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
        <div>
          <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
            <TrendingUp color="var(--accent-color)" /> Monthly Analytics Report
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Historical data and company-wide insights</p>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {/* Total Expenses */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <DollarSign size={18} /> Total Monthly Expenses
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            ₹{totalSpent.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.85rem', color: totalSpent > totalBudget ? '#ef4444' : '#10b981' }}>
            {totalSpent > totalBudget ? `Over budget by ₹${totalSpent - totalBudget}` : `Within budget allocation`}
          </div>
        </div>

        {/* Savings */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Award size={18} /> Total Savings
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#10b981' }}>
            ₹{totalSavings.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            vs Monthly Allocated Budget
          </div>
        </div>

        {/* Most Active User */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Activity size={18} /> Most Active User
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 600, color: mostActiveUser.color, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={mostActiveUser.avatarUrl} alt={mostActiveUser.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            {mostActiveUser.name}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Distance travelled: {mostActiveUser.distanceTravelled}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', flex: 1 }}>
        {/* Company Wide Expense Breakdown */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Company-Wide Expense Breakdown</h3>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={companyCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="amount"
                  nameKey="category"
                  label={({ name, value }: any) => `${name} (₹${value})`}
                  labelLine={false}
                >
                  {companyCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: any) => `₹${value}`}
                  contentStyle={{ borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Spenders */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Top Spenders</h3>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FAKE_WORKERS} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} style={{ fontSize: '0.85rem' }} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  formatter={(value: any) => `₹${value}`}
                  contentStyle={{ borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}
                />
                <Bar dataKey="budgetSpent" radius={[0, 4, 4, 0]}>
                  {FAKE_WORKERS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
