import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Eye, AlertTriangle, TrendingUp, Fingerprint, Lock, ShieldAlert, ArrowUpRight, Bot
} from 'lucide-react';

export default function ExposeEngineDashboard({ onBack }: { onBack: () => void }) {
  const [chatInput, setChatInput] = useState('');

  return (
    <div className="min-h-screen bg-[#f2f7ec] text-gray-900 font-sans p-6 sm:p-8 flex flex-col">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-cyan-100 rounded-lg transition-colors text-gray-500 hover:text-cyan-700 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              AI Expose Engine <Eye size={24} className="text-cyan-600" />
            </h1>
            <p className="text-xs text-gray-500 mt-1">Goal: Expose opportunities and risks before they become losses.</p>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Expose Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top Overview: Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-cyan-200 shadow-sm relative overflow-hidden flex flex-col justify-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Potential Recovery</p>
              <p className="text-2xl font-black text-emerald-600">₹14.2L</p>
              <div className="absolute right-[-10px] bottom-[-10px] opacity-10"><TrendingUp size={64} className="text-emerald-500" /></div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-cyan-200 shadow-sm relative overflow-hidden flex flex-col justify-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Potential Growth</p>
              <p className="text-2xl font-black text-cyan-600">₹22.5L</p>
              <div className="absolute right-[-10px] bottom-[-10px] opacity-10"><TrendingUp size={64} className="text-cyan-500" /></div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-sm relative overflow-hidden flex flex-col justify-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Customer Churn Risk</p>
              <p className="text-2xl font-black text-amber-600">18%</p>
              <div className="absolute right-[-10px] bottom-[-10px] opacity-10"><ShieldAlert size={64} className="text-amber-500" /></div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-red-200 shadow-sm relative overflow-hidden flex flex-col justify-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Business Risk Score</p>
              <p className="text-2xl font-black text-red-600">65/100</p>
              <div className="absolute right-[-10px] bottom-[-10px] opacity-10"><AlertTriangle size={64} className="text-red-500" /></div>
            </div>
          </div>

          {/* Hidden Problems & Opportunities */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider flex items-center gap-2">
              <Search size={16} className="text-cyan-600" /> Identified Hidden Issues
            </h3>
            
            <div className="space-y-4">
              {/* Item 1 */}
              <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-cyan-100 text-cyan-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Dormant Customer</span>
                    <span className="font-bold text-gray-800 text-sm">Omega Corp Ltd</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">Impact: ₹5.5L</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs text-gray-700">
                  <div>
                    <span className="font-bold text-gray-500 uppercase text-[10px]">What is hidden?</span>
                    <p className="mt-1">They haven't placed an order in 6 months despite steady prior volume.</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-500 uppercase text-[10px]">Why it matters?</span>
                    <p className="mt-1">High probability of moving to competitor if not re-engaged immediately.</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-xs font-bold text-emerald-600">Action: Deploy re-engagement offer with 5% discount.</p>
                  <button className="text-[10px] bg-cyan-600 text-white px-3 py-1 rounded font-bold hover:bg-cyan-700 transition-colors">EXECUTE</button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Revenue Leakage</span>
                    <span className="font-bold text-gray-800 text-sm">Unassigned Leads Pipeline</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">Impact: ₹3.2L</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs text-gray-700">
                  <div>
                    <span className="font-bold text-gray-500 uppercase text-[10px]">What is hidden?</span>
                    <p className="mt-1">45 leads from the weekend campaign are still unassigned.</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-500 uppercase text-[10px]">Why it matters?</span>
                    <p className="mt-1">Conversion drops by 40% after 48 hours of inactivity.</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-xs font-bold text-amber-600">Action: Auto-assign to available agents based on load.</p>
                  <button className="text-[10px] bg-cyan-600 text-white px-3 py-1 rounded font-bold hover:bg-cyan-700 transition-colors">EXECUTE</button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Stuck Quotations</span>
                    <span className="font-bold text-gray-800 text-sm">High-Value Deals (4)</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">Impact: ₹18.0L</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs text-gray-700">
                  <div>
                    <span className="font-bold text-gray-500 uppercase text-[10px]">What is hidden?</span>
                    <p className="mt-1">4 enterprise quotes are stuck awaiting managerial approval.</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-500 uppercase text-[10px]">Why it matters?</span>
                    <p className="mt-1">Creates bottleneck and frustrates high-intent buyers.</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-xs font-bold text-red-600">Action: Escalate to Director dashboard immediately.</p>
                  <button className="text-[10px] bg-cyan-600 text-white px-3 py-1 rounded font-bold hover:bg-cyan-700 transition-colors">EXECUTE</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right: AI Chat Workplace (1/3 width) */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[700px] lg:h-auto overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-cyan-50/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 border border-cyan-200">
              <Eye size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">AI Expose Engine</h3>
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
            {/* System Greeting */}
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0 mt-0.5">
                <Eye size={12} />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-xs">
                <div className="text-xs text-gray-700 leading-relaxed space-y-2">
                  <p><strong>You are AI Expose Engine.</strong></p>
                  <p>Reveal hidden business problems and hidden revenue opportunities.</p>
                  <p><strong>Identify:</strong> Revenue Leakage, Unassigned Leads, Dormant Customers, Stuck Quotations, Missed Follow-ups, Repeat Inquiries, High Risk Customers, Underperforming Employees.</p>
                  <p><strong>Calculate:</strong> Potential Revenue Recovery, Potential Revenue Growth, Customer Churn Risk, Business Risk Score.</p>
                  <p><strong>Provide:</strong> What is hidden? Why it matters? Revenue impact? Recommended action?</p>
                  <p className="text-cyan-700 font-bold">Goal: Expose opportunities and risks before they become losses.</p>
                  <hr className="my-2 border-gray-100" />
                  <p className="text-cyan-700"><strong>System:</strong> I have scanned your CRM. Would you like me to expose the ₹14.2L recoverable revenue currently leaking from dormant accounts?</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask Expose Engine..." 
                className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors">
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
