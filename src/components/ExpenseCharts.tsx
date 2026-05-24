"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ExpenseData, DailyExpense } from "@/lib/mockData";
import { FileText } from "lucide-react";

interface ExpenseChartsProps {
  categories: ExpenseData[];
  daily: DailyExpense[];
  color: string;
}

// Custom chart colors matching the mockup
const PIE_COLORS = ['#5b507a', '#1a5f6c', '#4a6b8c', '#8999a8', '#9e798e'];

export default function ExpenseCharts({ categories, daily, color }: ExpenseChartsProps) {
  return (
    <>
      {/* Expense Breakdown Card */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           <FileText size={16} /> EXPENSE BREAKDOWN
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', '@media (max-width: 768px)': { flexDirection: 'column' } }}>
          {/* Donut Chart */}
          <div style={{ width: '50%', height: '160px', minWidth: '160px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="amount"
                  stroke="none"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => `₹${value}`}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.98)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', fontSize: '0.9rem', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {categories.map((entry, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: PIE_COLORS[index % PIE_COLORS.length], flexShrink: 0 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span>{entry.category}</span>
                  <span style={{ color: '#64748b', fontWeight: 700 }}>₹{entry.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: '#f8fafc', 
            border: '1px solid #e2e8f0', 
            color: '#334155', 
            padding: '0.6rem 1.2rem', 
            borderRadius: '12px', 
            fontSize: '0.9rem', 
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            transition: 'all 0.2s'
          }}>
            <FileText size={16} /> View Receipts
          </button>
        </div>
      </div>

      {/* Daily Spending Trend Card */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: '320px'
      }}>
        <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           DAILY SPENDING TREND
        </h2>
        <div style={{ flex: 1, minHeight: '220px', marginTop: '0.5rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={daily} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} 
                dy={10}
              />
              <YAxis hide={true} />
              <Tooltip 
                cursor={{ fill: '#f0f0f0' }}
                formatter={(value: any) => `₹${value}`}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.98)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', fontSize: '0.9rem', fontWeight: 600 }}
              />
              <Bar dataKey="amount" fill="#10b981" radius={[6, 6, 0, 0]} barSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
