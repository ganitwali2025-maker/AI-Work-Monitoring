import React, { useState } from 'react';
import { 
  ArrowLeft, Activity, ArrowUpRight, ShieldAlert, Bot, Stethoscope, Briefcase, DollarSign, TrendingDown, ClipboardList
} from 'lucide-react';

export default function AutopsyEngineDashboard({ onBack }: { onBack: () => void }) {
  const [chatInput, setChatInput] = useState('');

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-gray-900 font-sans p-6 sm:p-8 flex flex-col">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-purple-100 rounded-lg transition-colors text-gray-500 hover:text-purple-700 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              AI Autopsy Engine <Stethoscope size={24} className="text-purple-600" />
            </h1>
            <p className="text-xs text-gray-500 mt-1">Goal: Understand why deals are lost and prevent future revenue leakage.</p>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Autopsy Analysis (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Lost Deal Summary */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-0"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded uppercase tracking-wider">Lost Deal Autopsy</span>
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase tracking-wider">TechNova Pvt Ltd</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">ERP Enterprise Licence</h2>
                  <p className="text-sm text-gray-500 mt-1">Deal closed as 'Lost' on 12 June 2026 after 45 days in pipeline.</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Revenue Lost</p>
                  <p className="text-3xl font-black text-rose-600">₹8.5L</p>
                </div>
              </div>

              {/* Progress Bar Analysis */}
              <div className="mb-6">
                <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-3">Loss Contribution Breakdown</p>
                <div className="h-4 w-full rounded-full bg-gray-100 flex overflow-hidden shadow-inner mb-2">
                  <div className="h-full bg-rose-500" style={{ width: '40%' }} title="Pricing Competitiveness (40%)" />
                  <div className="h-full bg-amber-500" style={{ width: '25%' }} title="Follow-up History (25%)" />
                  <div className="h-full bg-purple-500" style={{ width: '20%' }} title="Decision Maker Involvement (20%)" />
                  <div className="h-full bg-sky-500" style={{ width: '15%' }} title="Competitor Influence (15%)" />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span>Pricing (40%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Follow-ups (25%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500"></span>Decision Maker (20%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500"></span>Competitor (15%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Root Cause Analysis & Prevention */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 7-Point Analysis */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col h-full">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Activity size={16} className="text-purple-600" /> Root Cause Analysis
              </h3>
              
              <div className="space-y-4 flex-1">
                <div className="border-l-2 border-rose-500 pl-3">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Pricing Competitiveness</p>
                  <p className="text-sm text-gray-800 mt-0.5">Quote was 18% higher than industry average. No discount structure offered.</p>
                </div>
                <div className="border-l-2 border-amber-500 pl-3">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Follow-up History</p>
                  <p className="text-sm text-gray-800 mt-0.5">3 missed callbacks during evaluation phase. Average response time was 48 hours.</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-3">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Decision Maker Involvement</p>
                  <p className="text-sm text-gray-800 mt-0.5">CTO was never engaged directly. All communication routed through middle-management.</p>
                </div>
                <div className="border-l-2 border-sky-500 pl-3">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Competitor Influence</p>
                  <p className="text-sm text-gray-800 mt-0.5">Competitor XYZ presented a live demo 3 days before our scheduled call.</p>
                </div>
              </div>
            </div>

            {/* Strategic Outcomes */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col h-full">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert size={16} className="text-emerald-600" /> Recovery Probability
                </h3>
                <span className="text-2xl font-black text-emerald-600">22%</span>
              </div>

              <div className="mb-6">
                <p className="text-[11px] font-bold text-purple-600 uppercase tracking-wider mb-2">Recovery Plan (Immediate)</p>
                <ul className="text-sm text-gray-700 space-y-2 list-disc pl-4">
                  <li>Deploy automated 'Win-back' pricing tier directly to the CTO.</li>
                  <li>Schedule a technical deep-dive bypassing middle-management.</li>
                  <li>Send comparison sheet highlighting XYZ software's gaps.</li>
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 bg-gray-50 p-4 rounded-lg">
                <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-2">Prevention Strategy (Systemic)</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Implement an SLA rule: Any quote &gt; ₹5L requires immediate CTO introduction within 24 hours. Create alert for 12+ hour response delays.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right: AI Chat Workplace (1/3 width) */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[600px] lg:h-auto overflow-hidden">
          
          <div className="p-4 border-b border-gray-100 bg-purple-50/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 border border-purple-200">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">AI Autopsy Engine</h3>
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
            {/* System Greeting */}
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                <Bot size={12} />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-xs">
                <div className="text-xs text-gray-700 leading-relaxed space-y-2">
                  <p><strong>You are an AI Autopsy Engine inside a CRM.</strong></p>
                  <p>Whenever a lead, quotation, customer, or deal is lost: Perform a complete business autopsy.</p>
                  <p><strong>Analyze:</strong> Follow-up History, Response Time, Pricing Competitiveness, Customer Engagement, Decision Maker Involvement, Competitor Influence, Communication Quality.</p>
                  <p><strong>Generate:</strong> 1. Lost Deal Summary, 2. Root Cause Analysis, 3. Revenue Lost, 4. Recovery Probability, 5. Recovery Plan, 6. Prevention Strategy.</p>
                  <p className="text-rose-600 font-bold">Output must include percentage contribution for every loss reason.</p>
                  <hr className="my-2 border-gray-100" />
                  <p className="text-purple-700"><strong>System:</strong> I have performed the autopsy on the TechNova deal. Would you like me to draft the Win-back email to their CTO?</p>
                </div>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-col gap-2 pl-8">
              <button className="text-left text-[11px] font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-lg border border-purple-100 transition-colors">
                Yes, draft the Win-back email.
              </button>
              <button className="text-left text-[11px] font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-lg border border-purple-100 transition-colors">
                Show me other deals lost to Competitor XYZ.
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask Autopsy Engine..." 
                className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
