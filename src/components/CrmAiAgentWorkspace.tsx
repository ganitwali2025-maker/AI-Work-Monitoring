import { useState, useEffect } from 'react';
import { 
  UserPlus,
  ClipboardList,
  FileText,
  PhoneCall,
  UserCheck,
  Headset,
  Settings,
  LayoutDashboard,
  Calendar,
  Users,
  Target,
  Activity,
  AlertCircle,
  RefreshCcw,
  TrendingUp,
  Cpu,
  Monitor,
  Zap,
  Bot,
  ArrowUpRight,
  Skull,
  Eye,
  Crown
} from 'lucide-react';
import Layout from './Layout';

export default function CrmAiAgentWorkspace({ onBack, onOpenAiAgent = () => {} }: { onBack: () => void, onOpenAiAgent?: (agentId?: string) => void }) {
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
      setFormattedDate(now.toLocaleDateString('en-GB', dateOptions));
      
      const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
      const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      const dayStr = now.toLocaleDateString('en-US', dayOptions);
      const timeStr = now.toLocaleTimeString('en-US', timeOptions);
      setFormattedTime(`${dayStr}, ${timeStr}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const sidebarLinks = [
    { name: 'Elite CEO AI', icon: <Crown size={20} />, onClick: () => onOpenAiAgent('ceo') },
    { name: 'AI Action Center', icon: <Zap size={20} />, onClick: () => onOpenAiAgent('action-center') },
    { name: 'AI Autopsy Engine', icon: <Activity size={20} />, onClick: () => onOpenAiAgent('autopsy') },
    { name: 'AI Kill Critic', icon: <Skull size={20} />, onClick: () => onOpenAiAgent('kill-critic') },
    { name: 'AI Expose Engine', icon: <Eye size={20} />, onClick: () => onOpenAiAgent('expose-engine') },
  ];


  return (
    <Layout activeModule={null} departmentName="AI INTELLIGENCE LAYER" onBack={onBack} sidebarLinks={sidebarLinks} variant="crm">
        {/* Content */}
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-2">Welcome to AI Intelligence Layer</h2>
            <p className="text-sm text-gray-500 font-normal">Your CRM pipeline is now being continuously monitored by the AI Action Center.</p>
          </div>
        </header>


        {/* AI Action Center Launchpad */}
        <section>
          <h3 className="text-[11px] font-bold text-[#4a6b22] uppercase tracking-widest mb-4">ACTIVE AI AGENTS</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 items-stretch">
            
            {/* Elite CEO Card (Full Width) */}
            <div 
              onClick={() => onOpenAiAgent('ceo')}
              className="lg:col-span-2 bg-gradient-to-br from-[#4a6b22] to-[#2d4a22] rounded-2xl p-8 shadow-md cursor-pointer hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8 items-center relative overflow-hidden"
              style={{ viewTransitionName: 'crm-ceo-card' }}
            >
              <div className="absolute top-[-20px] right-[-20px] opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <Crown size={200} />
              </div>

              <div className="w-24 h-24 rounded-2xl bg-[#3b5a1a]/50 flex items-center justify-center text-[#eaf4d9] shrink-0 border border-[#4a6b22] group-hover:scale-105 transition-transform relative z-10">
                <Crown size={48} />
              </div>
              
              <div className="flex-1 text-white relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-3xl font-bold tracking-tight">Elite CEO Dashboard AI</h4>
                  <span className="text-[10px] font-bold bg-[#f4f8ee]/20 text-[#eaf4d9] px-2 py-0.5 rounded uppercase tracking-wider border border-[#f4f8ee]/30">Executive</span>
                </div>
                
                <div className="text-sm text-[#dbebc0] mb-6 leading-relaxed max-w-3xl space-y-1">
                  <p><strong>You are an Elite CEO Dashboard AI inside a CRM & Business Operating System.</strong></p>
                  <p><strong>Analyze:</strong> Leads, Inquiries, Quotations, Orders, Customers, Follow-ups, Support Tickets, Sales Team Performance, Revenue Data.</p>
                  <p><strong>Provide:</strong> Real-time executive intelligence, strategic insights, business health analysis, revenue forecasting, and actionable recommendations.</p>
                  <p><strong>Generate:</strong> Revenue Overview, Revenue At Risk, Business Health Score, Top Opportunities, Top Risks, and AI Executive Recommendations.</p>
                  <p><strong>Rules:</strong> Think like a CEO. Focus on revenue growth. Always explain WHY. Never show raw data only.</p>
                  <p className="text-[#eaf4d9] font-bold mt-2">Goal: Maximize Revenue, Minimize Leakage, Executive-Level Decision Intelligence.</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold bg-[#1e3314]/50 text-[#eaf4d9] px-3 py-1.5 rounded-full border border-[#3b5a1a]/50">Revenue Overview</span>
                  <span className="text-[10px] font-bold bg-[#1e3314]/50 text-[#eaf4d9] px-3 py-1.5 rounded-full border border-[#3b5a1a]/50">Business Health</span>
                  <span className="text-[10px] font-bold bg-[#1e3314]/50 text-[#eaf4d9] px-3 py-1.5 rounded-full border border-[#3b5a1a]/50">Top Opportunities</span>
                  <span className="text-[10px] font-bold bg-[#1e3314]/50 text-[#eaf4d9] px-3 py-1.5 rounded-full border border-[#3b5a1a]/50">Top Risks</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-[#2d4a22] bg-white px-6 py-3 rounded-xl shadow-md group-hover:bg-[#f4f8ee] transition-colors shrink-0 relative z-10">
                Launch Executive Dashboard <ArrowUpRight size={18} />
              </div>
            </div>

            {/* Action Center Card */}
            <div 
              onClick={() => onOpenAiAgent('action-center')}
              className="bg-white rounded-2xl p-6 border border-[#dbebc0] shadow-sm cursor-pointer hover:shadow-lg hover:border-[#4a6b22] transition-all group flex flex-col h-full"
              style={{ viewTransitionName: 'crm-ai-card' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f4f8ee] to-white flex items-center justify-center text-[#4a6b22] mb-6 border border-[#eaf4d9] group-hover:scale-110 transition-transform">
                <Bot size={32} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#2d4a22] transition-colors">AI Action Center</h4>
                  <span className="text-[10px] font-bold bg-[#eaf4d9] text-[#3b5a1a] px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">Live</span>
                </div>
                
                <div className="text-xs text-gray-600 mb-6 leading-relaxed flex-1 space-y-1">
                  <p><strong>You are an AI Action Center inside a CRM.</strong></p>
                  <p><strong>Monitor:</strong> Leads, Inquiries, Quotations, Follow-ups, Orders, Support Tickets, Customer Activities.</p>
                  <p><strong>Identify:</strong> Hot Leads, Pending Follow-ups, Aging Quotations, High-Value Opportunities, Customer Risks, Delayed Responses, Revenue Opportunities.</p>
                  <p><strong>For every issue provide:</strong> Priority Level, Revenue Impact, Conversion Probability, Recommended Action.</p>
                  <p><strong>Goal:</strong> Increase Revenue, Reduce Delays, Improve Conversions.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Hot Leads</span>
                  <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded border border-orange-100">Pending Follow-ups</span>
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Aging Quotations</span>
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Revenue Opportunities</span>
                </div>

                <div className="flex items-center justify-center w-full gap-2 text-sm font-bold text-[#2d4a22] bg-[#f4f8ee] px-6 py-3 rounded-xl group-hover:bg-[#4a6b22] group-hover:text-white transition-colors mt-auto">
                  Launch Workspace <ArrowUpRight size={18} />
                </div>
              </div>
            </div>

            {/* Autopsy Engine Card */}
            <div 
              onClick={() => onOpenAiAgent('autopsy')}
              className="bg-white rounded-2xl p-6 border border-[#dbebc0] shadow-sm cursor-pointer hover:shadow-lg hover:border-[#4a6b22] transition-all group flex flex-col h-full"
              style={{ viewTransitionName: 'crm-autopsy-card' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f4f8ee] to-white flex items-center justify-center text-[#4a6b22] mb-6 border border-[#eaf4d9] group-hover:scale-110 transition-transform">
                <Activity size={32} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#2d4a22] transition-colors">AI Autopsy Engine</h4>
                </div>
                
                <div className="text-xs text-gray-600 mb-6 leading-relaxed flex-1 space-y-1">
                  <p><strong>You are an AI Autopsy Engine inside a CRM.</strong></p>
                  <p>Whenever a lead, quotation, customer, or deal is lost: Perform a complete business autopsy.</p>
                  <p><strong>Analyze:</strong> Follow-up History, Response Time, Pricing Competitiveness, Customer Engagement, Decision Maker Involvement, Competitor Influence, Communication Quality.</p>
                  <p><strong>Generate:</strong> 1. Lost Deal Summary 2. Root Cause Analysis 3. Revenue Lost 4. Recovery Probability 5. Recovery Plan 6. Prevention Strategy.</p>
                  <p className="text-[#4a6b22] font-medium">Output must include percentage contribution for every loss reason.</p>
                  <p><strong>Goal:</strong> Understand why deals are lost and prevent future revenue leakage.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Root Cause Analysis</span>
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Recovery Plans</span>
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Revenue Lost</span>
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Prevention Strategy</span>
                </div>

                <div className="flex items-center justify-center w-full gap-2 text-sm font-bold text-[#2d4a22] bg-[#f4f8ee] px-6 py-3 rounded-xl group-hover:bg-[#4a6b22] group-hover:text-white transition-colors">
                  Launch Workspace <ArrowUpRight size={18} />
                </div>
              </div>
            </div>

            {/* Kill Critic Card */}
            <div 
              onClick={() => onOpenAiAgent('kill-critic')}
              className="bg-white rounded-2xl p-6 border border-[#dbebc0] shadow-sm cursor-pointer hover:shadow-lg hover:border-[#4a6b22] transition-all group flex flex-col h-full"
              style={{ viewTransitionName: 'crm-kill-critic-card' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f4f8ee] to-white flex items-center justify-center text-[#4a6b22] mb-6 border border-[#eaf4d9] group-hover:scale-110 transition-transform">
                <Skull size={32} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#2d4a22] transition-colors">AI Kill Critic</h4>
                </div>
                
                <div className="text-xs text-gray-600 mb-6 leading-relaxed flex-1 space-y-1">
                  <p><strong>You are AI Kill Critic.</strong></p>
                  <p>Act as a brutally honest business auditor.</p>
                  <p><strong>Audit:</strong> Lead Management, Sales Team, Follow-up Process, Quotation Management, Customer Support, Revenue Operations.</p>
                  <p><strong>Detect:</strong> Missed Opportunities, Slow Responses, Team Inefficiencies, Revenue Leakage, Workflow Bottlenecks.</p>
                  <p><strong>Generate:</strong> Business Health Score, Department Performance Scores, Revenue Risk Analysis, Critical Alerts.</p>
                  <p className="text-[#4a6b22] font-medium">Do not hide problems. Always expose weaknesses.</p>
                  <p><strong>Goal:</strong> Maximize efficiency and eliminate business weaknesses.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Business Health Score</span>
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Revenue Risk</span>
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Critical Alerts</span>
                </div>

                <div className="flex items-center justify-center w-full gap-2 text-sm font-bold text-[#2d4a22] bg-[#f4f8ee] px-6 py-3 rounded-xl group-hover:bg-[#4a6b22] group-hover:text-white transition-colors">
                  Launch Workspace <ArrowUpRight size={18} />
                </div>
              </div>
            </div>

            {/* Expose Engine Card */}
            <div 
              onClick={() => onOpenAiAgent('expose-engine')}
              className="bg-white rounded-2xl p-6 border border-[#dbebc0] shadow-sm cursor-pointer hover:shadow-lg hover:border-[#4a6b22] transition-all group flex flex-col h-full"
              style={{ viewTransitionName: 'crm-expose-engine-card' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f4f8ee] to-white flex items-center justify-center text-[#4a6b22] mb-6 border border-[#eaf4d9] group-hover:scale-110 transition-transform">
                <Eye size={32} />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#2d4a22] transition-colors">AI Expose Engine</h4>
                </div>
                
                <div className="text-xs text-gray-600 mb-6 leading-relaxed flex-1 space-y-1">
                  <p><strong>You are AI Expose Engine.</strong></p>
                  <p>Reveal hidden business problems and hidden revenue opportunities.</p>
                  <p><strong>Identify:</strong> Revenue Leakage, Unassigned Leads, Dormant Customers, Stuck Quotations, Missed Follow-ups, High Risk Customers.</p>
                  <p><strong>Calculate:</strong> Potential Revenue Recovery, Potential Revenue Growth, Customer Churn Risk, Business Risk Score.</p>
                  <p><strong>Provide:</strong> What is hidden? Why it matters? Revenue impact? Recommended action?</p>
                  <p className="text-[#4a6b22] font-medium">Goal: Expose opportunities and risks before they become losses.</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Revenue Leakage</span>
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Dormant Customers</span>
                  <span className="text-[10px] font-bold bg-[#f4f8ee] text-[#4a6b22] px-2 py-1 rounded border border-[#eaf4d9]">Recovery Potential</span>
                </div>

                <div className="flex items-center justify-center w-full gap-2 text-sm font-bold text-[#2d4a22] bg-[#f4f8ee] px-6 py-3 rounded-xl group-hover:bg-[#4a6b22] group-hover:text-white transition-colors">
                  Launch Workspace <ArrowUpRight size={18} />
                </div>
              </div>
            </div>

          </div>
        </section>

    </Layout>
  );
}
