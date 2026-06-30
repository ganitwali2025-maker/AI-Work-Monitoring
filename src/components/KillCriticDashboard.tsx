import React, { useState } from 'react';
import { 
  ArrowLeft, Skull, AlertOctagon, TrendingDown, Crosshair, ArrowUpRight
} from 'lucide-react';

export default function KillCriticDashboard({ onBack }: { onBack: () => void }) {
  const [chatInput, setChatInput] = useState('');

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-gray-900 font-sans p-6 sm:p-8 flex flex-col">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-gray-500 hover:text-red-700 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              AI Kill Critic <Skull size={24} className="text-red-600" />
            </h1>
            <p className="text-xs text-gray-500 mt-1">Goal: Maximize efficiency and eliminate business weaknesses.</p>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Audit Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top Overview: Health & Revenue Risk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-red-200 shadow-sm relative overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-0"></div>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-2 relative z-10">Business Health Score</p>
              <div className="relative z-10 flex items-baseline gap-1">
                <span className="text-6xl font-bold text-red-600">42</span>
                <span className="text-xl font-bold text-gray-400">/100</span>
              </div>
              <p className="text-xs text-red-600 font-bold mt-2 bg-red-50 px-3 py-1 rounded-full relative z-10">CRITICAL CONDITION</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingDown size={14} className="text-red-500" /> Revenue Risk Analysis
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-gray-700">Revenue Leakage</span>
                    <span className="text-red-600 font-bold">₹12.5L</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{ width: '65%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-gray-700">Missed Opportunities</span>
                    <span className="text-amber-600 font-bold">₹8.2L</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Performance Scores */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider flex items-center gap-2">
              <Crosshair size={16} className="text-indigo-600" /> Department Performance
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: 'Lead Management', score: 35, color: 'text-red-600', bg: 'bg-red-50' },
                { name: 'Sales Team', score: 58, color: 'text-amber-600', bg: 'bg-amber-50' },
                { name: 'Follow-up Process', score: 22, color: 'text-red-600', bg: 'bg-red-50' },
                { name: 'Quotation Mgt', score: 75, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { name: 'Customer Support', score: 62, color: 'text-amber-600', bg: 'bg-amber-50' },
                { name: 'Revenue Ops', score: 45, color: 'text-red-600', bg: 'bg-red-50' },
              ].map(dept => (
                <div key={dept.name} className="p-4 border border-gray-100 rounded-lg bg-gray-50 flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase mb-2">{dept.name}</span>
                  <span className={`text-2xl font-bold ${dept.color}`}>{dept.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="bg-white rounded-xl p-6 border border-red-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
              <AlertOctagon size={16} className="text-red-600" /> Critical Alerts & Weaknesses
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 text-red-800 rounded-lg border border-red-100">
                <span className="font-bold">❌</span>
                <p className="text-xs leading-relaxed"><strong>Slow Responses:</strong> Average response time to web inquiries is 72 hours. Corrective Action: Implement immediate auto-assign and SMS alerts for sales managers.</p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 text-red-800 rounded-lg border border-red-100">
                <span className="font-bold">❌</span>
                <p className="text-xs leading-relaxed"><strong>Workflow Bottlenecks:</strong> 40% of deals are stuck at the 'Quotation Approval' stage for &gt;5 days. Corrective Action: Increase auto-approval limit to ₹2L.</p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 text-red-800 rounded-lg border border-red-100">
                <span className="font-bold">❌</span>
                <p className="text-xs leading-relaxed"><strong>Poor Conversion Rates:</strong> Follow-up process is inconsistent; 65% of leads have zero follow-ups after 1st call. Corrective Action: Enforce 3-touch minimum protocol.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right: AI Chat Workplace (1/3 width) */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[700px] lg:h-auto overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-red-50/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 border border-red-200">
              <Skull size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">AI Kill Critic</h3>
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
            {/* System Greeting */}
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
                <Skull size={12} />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-xs">
                <div className="text-xs text-gray-700 leading-relaxed space-y-2">
                  <p><strong>You are AI Kill Critic.</strong></p>
                  <p>Act as a brutally honest business auditor.</p>
                  <p><strong>Audit:</strong> Lead Management, Sales Team, Follow-up Process, Quotation Management, Customer Support, Revenue Operations.</p>
                  <p><strong>Detect:</strong></p>
                  <ul className="text-red-600 font-medium space-y-1 ml-2">
                    <li>❌ Missed Opportunities</li>
                    <li>❌ Slow Responses</li>
                    <li>❌ Team Inefficiencies</li>
                    <li>❌ Revenue Leakage</li>
                    <li>❌ Workflow Bottlenecks</li>
                    <li>❌ Poor Conversion Rates</li>
                  </ul>
                  <p><strong>Generate:</strong> Business Health Score (0-100), Department Performance Scores, Revenue Risk Analysis, Critical Alerts.</p>
                  <p className="text-red-600 font-bold">Do not hide problems. Always expose weaknesses and provide direct corrective actions.</p>
                  <p><strong>Goal:</strong> Maximize efficiency and eliminate business weaknesses.</p>
                  <hr className="my-2 border-gray-100" />
                  <p className="text-red-700"><strong>System:</strong> I have completed the business audit. You are bleeding revenue. Would you like me to expose the weakest link in your sales team?</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask AI Kill Critic..." 
                className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
