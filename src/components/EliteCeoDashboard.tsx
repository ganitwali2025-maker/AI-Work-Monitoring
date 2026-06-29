import React, { useState } from 'react';
import { 
  ArrowLeft, Crown, TrendingUp, AlertTriangle, ShieldAlert, BarChart3, Target, Briefcase, Zap, ArrowUpRight, Bot, Send
} from 'lucide-react';

export default function EliteCeoDashboard({ onBack }: { onBack: () => void }) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'I have generated your daily CEO briefing. Your business health is at 92/100. Would you like me to automate the recovery of the 12 hot leads currently at risk?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      const prompt = text.toLowerCase();
      if (prompt.includes('health') || prompt.includes('score')) {
        replyText = 'Current Business Health is 92/100. Strengths: Order Conversion Rate (+18% MoM), Lead Volume. Weaknesses: Lead Aging in CRM (average 6.2 days response lag).';
      } else if (prompt.includes('recover') || prompt.includes('risk') || prompt.includes('opportunities')) {
        replyText = 'Processing recovery flow. Auto-reassigned 12 stalled leads to Priority Team B. Sent notifications to Account Directors. Expected recovery value: ₹8.2 Lakh.';
      } else if (prompt.includes('campaign') || prompt.includes('deploy')) {
        replyText = 'Deploying Q3 Customer Retention Campaign. Target group size: 142 clients. Dispatching email vouchers and automated WhatsApp reminders.';
      } else {
        replyText = `Understood. Analyzing corporate operational metrics for "${text}". I recommend launching a cost review on transport log contracts (Route: Kolkata) where variance exceeds 12%.`;
      }
      setMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
    }, 1000);
  };

  const handleRecommendationClick = (recName: string) => {
    alert(`AI CEO Execution: "${recName}" workflow has been initiated. Directing to the corresponding workspace...`);
  };

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
              Elite CEO Dashboard <Crown size={24} className="text-purple-600" />
            </h1>
            <p className="text-xs text-gray-500 mt-1">Goal: Maximize Revenue, Minimize Leakage, Executive-Level Decision Intelligence.</p>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: CEO Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Executive Summary & Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-6 shadow-sm text-white relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] opacity-10">
                <Crown size={120} />
              </div>
              <p className="text-[10px] text-purple-200 font-bold uppercase tracking-wider mb-4 relative z-10">Daily CEO Briefing</p>
              <div className="space-y-3 relative z-10 text-sm">
                <div className="flex justify-between border-b border-purple-700/50 pb-2">
                  <span className="text-purple-100">Business Health Score</span>
                  <span className="font-bold text-emerald-400">92/100</span>
                </div>
                <div className="flex justify-between border-b border-purple-700/50 pb-2">
                  <span className="text-purple-100">Total Revenue</span>
                  <span className="font-bold text-white">₹52.8 Lakh</span>
                </div>
                <div className="flex justify-between border-b border-purple-700/50 pb-2">
                  <span className="text-purple-100">Expected Revenue</span>
                  <span className="font-bold text-white">₹38.5 Lakh</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-purple-100">Revenue At Risk</span>
                  <span className="font-bold text-rose-400">₹9.2 Lakh</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-700/50 relative z-10">
                <p className="text-xs font-bold text-amber-300">CEO Recommendation:</p>
                <p className="text-xs mt-1 text-purple-100 italic">"Prioritize follow-up on 12 hot leads today to unlock an estimated ₹8.2 Lakh in potential revenue."</p>
              </div>
            </div>

            {/* Revenue Overview */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <BarChart3 size={14} className="text-purple-600" /> Revenue Overview
              </p>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Monthly Rev</p>
                  <p className="text-xl font-bold text-gray-900">₹14.2L</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Quarterly Rev</p>
                  <p className="text-xl font-bold text-gray-900">₹45.5L</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Yearly Rev</p>
                  <p className="text-xl font-bold text-gray-900">₹1.8Cr</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Growth %</p>
                  <p className="text-xl font-bold text-emerald-600">+18.5%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Opportunities & Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Target size={16} className="text-emerald-600" /> Top Opportunities
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-gray-900">ABC Industries</span>
                    <span className="text-xs font-bold text-emerald-700">₹4.2 Lakh</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-[9px] bg-white px-1.5 py-0.5 rounded text-emerald-600 border border-emerald-200">🔥 High Value</span>
                    <span className="text-[9px] bg-white px-1.5 py-0.5 rounded text-emerald-600 border border-emerald-200">⭐ Fast Conversion (85%)</span>
                  </div>
                  <p className="text-xs text-gray-600"><strong>Next Action:</strong> Schedule final technical demo.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-rose-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle size={16} className="text-rose-600" /> Top Risks
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-gray-900">12 Hot Leads Pending</span>
                    <span className="text-xs font-bold text-rose-700">🔴 Critical</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">Process Failure</p>
                  <p className="text-xs text-gray-600 mb-1"><strong>Impact:</strong> ₹8.2 Lakh At Risk</p>
                  <button onClick={() => alert('Assigned backup task to CRM team to contact leads.')} className="text-[10px] bg-rose-600 text-white font-bold px-3 py-1.5 rounded hover:bg-rose-700 transition-colors mt-2 cursor-pointer">Auto-assign to backup team</button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Strategic Recommendations */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} className="text-amber-500" /> Strategic AI Recommendations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                <p className="text-xs font-bold text-purple-700 mb-1">Recover Stuck Quotations</p>
                <p className="text-[10px] text-gray-500 mb-2">Priority: High | Success Rate: 60%</p>
                <p className="text-xs text-gray-700 mb-2">Impact: <strong className="text-emerald-600">+₹3.5L Expected</strong></p>
                <button onClick={() => handleRecommendationClick('Recover Stuck Quotations')} className="text-[10px] bg-purple-600 text-white px-3 py-1.5 rounded font-bold hover:bg-purple-700 transition-colors w-full cursor-pointer">Execute Recovery Flow</button>
              </div>
              <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                <p className="text-xs font-bold text-purple-700 mb-1">Launch Retention Campaign</p>
                <p className="text-[10px] text-gray-500 mb-2">Priority: Medium | Success Rate: 45%</p>
                <p className="text-xs text-gray-700 mb-2">Impact: <strong className="text-emerald-600">+₹1.2L Expected</strong></p>
                <button onClick={() => handleRecommendationClick('Launch Retention Campaign')} className="text-[10px] bg-purple-600 text-white px-3 py-1.5 rounded font-bold hover:bg-purple-700 transition-colors w-full cursor-pointer">Deploy Campaign</button>
              </div>
            </div>
          </div>

        </div>

        {/* Right: AI Chat Workplace (1/3 width) */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[600px] lg:h-auto overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-purple-50/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 border border-purple-200">
              <Crown size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Elite CEO AI</h3>
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 flex flex-col justify-between">
            <div className="space-y-4">
              {/* System Greeting */}
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                  <Crown size={12} />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-xs">
                  <div className="text-[11px] text-gray-700 leading-relaxed space-y-2">
                    <p><strong>CEO Command Center:</strong> Real-time executive intelligence, strategic insights, business health analysis, and revenue forecasting.</p>
                  </div>
                </div>
              </div>

              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.sender === 'user' ? 'bg-indigo-600 text-white font-bold text-[10px]' : 'bg-purple-100 text-purple-600'}`}>
                    {msg.sender === 'user' ? 'U' : <Crown size={12} />}
                  </div>
                  <div className={`border rounded-2xl p-3 shadow-xs text-xs leading-relaxed max-w-[85%] ${msg.sender === 'user' ? 'bg-indigo-600 border-indigo-700 text-white rounded-tr-sm' : 'bg-white border-gray-100 text-gray-700 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                    <Crown size={12} />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-xs text-xs text-gray-400 italic">
                    AI is thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-col gap-2 pt-4">
              <button 
                onClick={() => handleSendMessage('Give me a detailed business health analysis')}
                className="text-left text-[11px] font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-lg border border-purple-100 transition-colors cursor-pointer"
              >
                Detailed Business Health Analysis
              </button>
              <button 
                onClick={() => handleSendMessage('Automate recovery of Leads At Risk')}
                className="text-left text-[11px] font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-lg border border-purple-100 transition-colors cursor-pointer"
              >
                Automate recovery of Leads At Risk
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask Elite CEO AI..." 
                className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(chatInput);
                  }
                }}
              />
              <button 
                onClick={() => handleSendMessage(chatInput)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors cursor-pointer"
              >
                <Send size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
