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
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: '1rem' }}>
           EXPENSE BREAKDOWN
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Donut Chart */}
          <div style={{ width: '45%', height: '140px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
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
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontSize: '0.85rem', fontWeight: 500 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div style={{ width: '55%', paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {categories.map((entry, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0f172a', fontWeight: 500 }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} />
                <span>{entry.category} <span style={{ color: '#475569' }}>(₹{entry.amount})</span></span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            background: '#ffffff', 
            border: '1px solid #e2e8f0', 
            color: '#334155', 
            padding: '0.4rem 0.75rem', 
            borderRadius: '6px', 
            fontSize: '0.8rem', 
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <FileText size={14} /> View Receipts
          </button>
        </div>
      </div>

      {/* Daily Spending Trend Card */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
           DAILY SPENDING TREND
        </h2>
        <div style={{ flex: 1, minHeight: '140px', marginTop: '0.5rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={daily} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }} 
                dy={10}
              />
              <YAxis hide={true} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                formatter={(value: any) => `₹${value}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontSize: '0.85rem', fontWeight: 500 }}
              />
              <Bar dataKey="amount" fill="#134e4a" radius={[2, 2, 0, 0]} barSize={56} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
