import React, { useState, useEffect } from 'react';
import { 
  Users,
  Target,
  ShoppingCart,
  TrendingUp,
  Percent,
  Megaphone,
  Award,
  Activity,
  ThumbsUp,
  XCircle,
  Calendar,
  LayoutDashboard,
  Settings,
  Mail,
  MessageSquare,
  Globe,
  Share2,
  CheckCircle,
  FileText
} from 'lucide-react';
import Layout from './Layout';
import ERPModuleCard from './ERPModuleCard';
import GenericDataSheet from './GenericDataSheet';

export default function MarketingWorkspace({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);
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
    { name: 'Marketing Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Lead Pipeline', icon: <Target size={20} />, onClick: () => setActiveModule('Lead Pipeline') },
    { name: 'Approval Center', icon: <CheckCircle size={20} />, onClick: () => setActiveModule('Approval Center') },
    { name: 'Customer CRM', icon: <Users size={20} />, onClick: () => setActiveModule('Customer CRM') },
    { name: 'Quotation Hub', icon: <FileText size={20} />, onClick: () => setActiveModule('Quotation Hub') },
    { name: 'Workflow Approval', icon: <Activity size={20} />, onClick: () => setActiveModule('Workflow Approval') },
    { name: 'Response Center', icon: <MessageSquare size={20} />, onClick: () => setActiveModule('Response Center') },
    { name: 'PO Management', icon: <ShoppingCart size={20} />, onClick: () => setActiveModule('PO Management') },
    { name: 'Performance Dashboard', icon: <TrendingUp size={20} />, onClick: () => setActiveModule('Performance Dashboard') },
    { name: 'Work Tracker', icon: <Calendar size={20} />, onClick: () => setActiveModule('Work Tracker') },
    { name: 'Team Operations', icon: <Users size={20} />, onClick: () => setActiveModule('Team Operations') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "TOTAL PARTIES GENERATED", 
      value: "142", 
      trend: "↑ 12.5% vs last month", 
      icon: Users, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-700"
    },
    { 
      title: "NEW LEADS GENERATED", 
      value: "856", 
      trend: "↑ 24.3% vs last month", 
      icon: Target, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "ORDERS GENERATED", 
      value: "89", 
      trend: "↑ 8.1% vs last month", 
      icon: ShoppingCart, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-700"
    },
    { 
      title: "BUSINESS GENERATED", 
      value: "₹45.2L", 
      trend: "↑ 15.2% vs last month", 
      icon: TrendingUp, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-700"
    },
    { 
      title: "CONVERSION RATE", 
      value: "10.4%", 
      trend: "↑ 1.2% vs last month", 
      icon: Percent, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "ACTIVE CAMPAIGNS", 
      value: "12", 
      trend: "Running smooth", 
      icon: Megaphone, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-black"
    },
    { 
      title: "TOP MARKETING EXEC", 
      value: "Rahul Sharma", 
      trend: "34 Orders Closed", 
      icon: Award, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    },
    { 
      title: "FOLLOW-UP SUCCESS", 
      value: "68%", 
      trend: "↑ 5.4% vs last month", 
      icon: ThumbsUp, 
      bgColor: "bg-teal-100/70",
      iconColor: "text-teal-700"
    },
    { 
      title: "LOST OPPORTUNITIES", 
      value: "45", 
      trend: "↓ 2.1% vs last month", 
      icon: XCircle, 
      bgColor: "bg-red-100/70",
      iconColor: "text-red-700"
    }
  ];

  const modules = [
    { name: 'Lead Pipeline', icon: Target, desc: 'Manage and track all incoming marketing leads.' },
    { name: 'Approval Center', icon: CheckCircle, desc: 'Review and approve marketing content and budgets.' },
    { name: 'Customer CRM', icon: Users, desc: 'Centralized database for marketing customer relations.' },
    { name: 'Quotation Hub', icon: FileText, desc: 'Generate and manage marketing vendor quotations.' },
    { name: 'Workflow Approval', icon: Activity, desc: 'Automated approval workflows for campaigns.' },
    { name: 'Response Center', icon: MessageSquare, desc: 'Track responses across all marketing channels.' },
    { name: 'PO Management', icon: ShoppingCart, desc: 'Purchase orders for marketing resources.' },
    { name: 'Performance Dashboard', icon: TrendingUp, desc: 'High-level overview of marketing metrics.' },
    { name: 'Work Tracker', icon: Calendar, desc: 'Track tasks and schedules for the marketing team.' },
    { name: 'Team Operations', icon: Users, desc: 'Manage marketing team assignments and roles.' }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="MARKETING PERFORMANCE CENTER" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="marketing">
        <GenericDataSheet moduleName={activeModule} variant="marketing" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="MARKETING PERFORMANCE CENTER" onBack={onBack} sidebarLinks={sidebarLinks} variant="marketing">
        {/* Content */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
          <div>
            <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Marketing Performance Center</h2>
            <p className="text-sm text-gray-500 font-normal">Track campaigns, monitor lead generation, and analyze marketing ROI.</p>
          </div>
          
          {/* Dynamic Date display */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm shrink-0 font-sans">
            <div className="w-9 h-9 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 shadow-xs">
              <Calendar size={18} />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-gray-900">{formattedDate || "17 Jun 2026"}</span>
              <span className="text-[10px] text-gray-400 font-medium mt-0.5">{formattedTime || "Wednesday, 05:30 PM"}</span>
            </div>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 font-serif">
          {kpis.map((kpi) => {
            const KpiIcon = kpi.icon;
            return (
              <div 
                key={kpi.title} 
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start transition-all hover:shadow-md duration-300 relative overflow-hidden"
              >
                <div className="space-y-1">
                  <p className="text-xs text-black font-black uppercase tracking-widest">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-black text-gray-900 leading-none pt-1.5">
                    {kpi.value}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 pt-1">
                    <span>{kpi.trend}</span>
                  </div>
                </div>

                <div className={`p-2 rounded-lg ${kpi.bgColor} flex items-center justify-center shrink-0 shadow-xs ${kpi.iconColor}`}>
                  <KpiIcon size={18} />
                </div>
              </div>
            );
          })}

          {/* Monthly Performance Score (Circular progress meter) */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center transition-all hover:shadow-md duration-300 relative overflow-hidden">
             <p className="text-xs text-black font-black uppercase tracking-widest mb-2 w-full text-left">
                MONTHLY SCORE
             </p>
             <div className="relative w-16 h-16 flex justify-center items-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" className="stroke-gray-100" strokeWidth="6"></circle>
                  <circle cx="32" cy="32" r="28" fill="none" className="stroke-emerald-500" strokeWidth="6" strokeDasharray="175" strokeDashoffset="35" strokeLinecap="round"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-lg font-bold text-gray-900">80%</span>
                </div>
             </div>
             <div className="text-[10px] font-semibold text-emerald-600 mt-2">
               Excellent Performance
             </div>
          </div>

        </section>

        {/* Modules Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map(mod => (
            <ERPModuleCard 
              key={mod.name} 
              name={mod.name} 
              icon={mod.icon} 
              desc={mod.desc} 
              variant="marketing" 
              onClick={() => setActiveModule(mod.name)} 
            />
          ))}
        </section>
    </Layout>
  );
}
