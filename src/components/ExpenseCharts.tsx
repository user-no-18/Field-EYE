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
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flex: 1,
        minHeight: 0
      }}>
        <h2 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           <FileText size={14} /> WHAT DID THEY SPEND MONEY ON?
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', flex: 1, minHeight: 0 }}>
          {/* Donut Chart */}
          <div style={{ flex: '1 1 120px', height: '110px', minWidth: '120px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
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
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.98)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', fontSize: '0.85rem', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {categories.map((entry, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#0f172a', fontWeight: 600 }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: PIE_COLORS[index % PIE_COLORS.length], flexShrink: 0 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span>{entry.category}</span>
                  <span style={{ color: '#64748b', fontWeight: 700 }}>₹{entry.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            background: '#f8fafc', 
            border: '1px solid #e2e8f0', 
            color: '#334155', 
            padding: '0.35rem 0.8rem', 
            borderRadius: '8px', 
            fontSize: '0.8rem', 
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            transition: 'all 0.2s'
          }}>
            <FileText size={14} /> See Purchase Bills
          </button>
        </div>
      </div>

      {/* Daily Spending Trend Card */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0
      }}>
        <h2 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           HOW MUCH DID THEY SPEND EACH DAY?
        </h2>
        <div style={{ flex: 1, minHeight: '80px', marginTop: '0.25rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={daily} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} 
                dy={5}
              />
              <YAxis hide={true} />
              <Tooltip 
                cursor={{ fill: '#f0f0f0' }}
                formatter={(value: any) => `₹${value}`}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.98)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', fontSize: '0.85rem', fontWeight: 600 }}
              />
              <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
