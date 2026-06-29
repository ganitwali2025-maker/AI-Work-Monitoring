import React, { useState } from 'react';
import { 
  ArrowLeft, AlertTriangle, ArrowUpRight, Phone, MessageCircle, Mail, UserPlus, Calendar, AlertCircle, Send, Bot, Zap
} from 'lucide-react';

export default function CrmAiAgentDashboard({ onBack }: { onBack: () => void }) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'I have identified 3 Critical/High priority issues. How can I help you automate these?' }
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
      if (prompt.includes('quote') || prompt.includes('quotation')) {
        replyText = 'Checking database... Found 5 aging quotations. I recommend sending an automated WhatsApp nudge offering a 2% volume discount to Acme Textiles. Shall I execute this?';
      } else if (prompt.includes('automate') || prompt.includes('whatsapp') || prompt.includes('email')) {
        replyText = 'Initiating batch communication automation pipeline. Standard templates loaded for Acme Textiles and Bright Interiors. Broadcast request sent to WhatsApp Gateway.';
      } else if (prompt.includes('hello') || prompt.includes('hi')) {
        replyText = 'Hello! I am your CRM AI Assistant. I monitor hot leads, pending follow-ups, and aging quotes. Ask me to draft emails, trigger follow-ups, or analyze pipelines.';
      } else {
        replyText = `Analyzing your request: "${text}". I have successfully queue-scheduled an audit follow-up activity for Rohan Mehta (Acme Textiles).`;
      }
      setMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
    }, 1000);
  };

  const issues = [
    {
      id: 1,
      title: "Rohan Mehta — Acme Textiles",
      description: "Quotation sent 6 days ago, zero follow-up. Competitor activity detected in regional market.",
      issueType: "Delayed Response & Aging Quotation",
      priority: "Critical",
      revenue: "₹3.2L",
      probability: "68%",
      priorityClass: "bg-rose-100 text-rose-700",
    },
    {
      id: 2,
      title: "Priya Sharma — Bright Interiors",
      description: "Inquiry idle for 4 days, no response sent. High intent signals from website visit today.",
      issueType: "Pending Follow-up & Hot Lead",
      priority: "High",
      revenue: "₹1.1L",
      probability: "41%",
      priorityClass: "bg-orange-100 text-orange-700",
    },
    {
      id: 3,
      title: "Suresh Iyer — Iyer Constructions",
      description: "Decision-maker disengaged. Significant drop in email open rates over the last 2 weeks.",
      issueType: "Customer Risk & High-Value Opportunity",
      priority: "Medium",
      revenue: "₹6.5L",
      probability: "35%",
      priorityClass: "bg-amber-100 text-amber-700",
    }
  ];

  const handleAction = (actionName: string, clientName: string) => {
    alert(`Action "${actionName}" triggered successfully for ${clientName}!`);
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
              AI Action Center <Zap size={20} className="text-purple-600 fill-purple-600" />
            </h1>
            <p className="text-xs text-gray-500 mt-1">Goal: Increase Revenue, Reduce Delays, Improve Conversions.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 text-xs font-semibold bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync
          </span>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Action Center Feed (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-5 border border-purple-100 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle size={16} className="text-purple-600" /> Active Monitoring
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Continuously monitoring: <span className="font-semibold text-gray-900">Leads, Inquiries, Quotations, Follow-ups, Orders, Support Tickets, Customer Activities.</span>
              <br/>
              Identifying: <span className="font-semibold text-gray-900">Hot Leads, Pending Follow-ups, Aging Quotations, High-Value Opportunities, Customer Risks, Delayed Responses, Revenue Opportunities.</span>
            </p>
          </div>

          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue.id} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-purple-300 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${issue.priorityClass}`}>
                        {issue.priority} Priority
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 uppercase tracking-wider">
                        {issue.issueType}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{issue.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{issue.description}</p>
                  </div>

                  <div className="flex flex-row md:flex-col gap-4 md:gap-1 text-left md:text-right w-full md:w-auto shrink-0 bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-lg">
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Revenue Impact</p>
                      <p className="text-lg font-black text-gray-900 leading-none">{issue.revenue}</p>
                    </div>
                    <div className="w-px bg-gray-200 md:hidden"></div>
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Conversion Prob.</p>
                      <p className="text-sm font-bold text-emerald-600 leading-none">{issue.probability}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">Recommended Actions</p>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleAction('Call Customer', issue.title)} className="flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors cursor-pointer">
                      <Phone size={14} /> Call Customer
                    </button>
                    <button onClick={() => handleAction('Send WhatsApp', issue.title)} className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100 hover:border-emerald-200 transition-colors cursor-pointer">
                      <MessageCircle size={14} /> Send WhatsApp
                    </button>
                    <button onClick={() => handleAction('Send Email', issue.title)} className="flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-500 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors cursor-pointer">
                      <Mail size={14} /> Send Email
                    </button>
                    <button onClick={() => handleAction('Assign Lead', issue.title)} className="flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-indigo-200 transition-colors cursor-pointer">
                      <UserPlus size={14} /> Assign Lead
                    </button>
                    <button onClick={() => handleAction('Schedule Meeting', issue.title)} className="flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-sky-50 text-gray-700 hover:text-sky-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-sky-200 transition-colors cursor-pointer">
                      <Calendar size={14} /> Schedule Meeting
                    </button>
                    <button onClick={() => handleAction('Escalate Issue', issue.title)} className="flex items-center gap-1.5 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-lg border border-rose-100 hover:border-rose-200 transition-colors cursor-pointer">
                      <AlertCircle size={14} /> Escalate Issue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Chat Workplace (1/3 width) */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[600px] lg:h-auto overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-purple-50/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 border border-purple-200">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">AI Assistant</h3>
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
                  <Bot size={12} />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-xs">
                  <div className="text-xs text-gray-700 leading-relaxed space-y-2">
                    <p><strong>You are an AI Action Center inside a CRM.</strong></p>
                    <p><strong>Your responsibility is to continuously monitor:</strong> Leads, Inquiries, Quotations, Follow-ups, Orders, Support Tickets, Customer Activities.</p>
                    <p className="text-purple-700 font-bold">Goal: Increase Revenue, Reduce Delays, Improve Conversions.</p>
                  </div>
                </div>
              </div>

              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.sender === 'user' ? 'bg-indigo-600 text-white font-bold text-[10px]' : 'bg-purple-100 text-purple-600'}`}>
                    {msg.sender === 'user' ? 'U' : <Bot size={12} />}
                  </div>
                  <div className={`border rounded-2xl p-3 shadow-xs text-xs leading-relaxed max-w-[85%] ${msg.sender === 'user' ? 'bg-indigo-600 border-indigo-700 text-white rounded-tr-sm' : 'bg-white border-gray-100 text-gray-700 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                    <Bot size={12} />
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
                onClick={() => handleSendMessage('Show me all Aging Quotations')}
                className="text-left text-[11px] font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-lg border border-purple-100 transition-colors cursor-pointer"
              >
                Show me all Aging Quotations
              </button>
              <button 
                onClick={() => handleSendMessage('Automate WhatsApp to Medium Priority leads')}
                className="text-left text-[11px] font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-lg border border-purple-100 transition-colors cursor-pointer"
              >
                Automate WhatsApp to Medium Priority leads
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask AI to automate actions..." 
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
