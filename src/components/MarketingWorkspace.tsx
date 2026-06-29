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
import KPICard, { KPICardProps } from './KPICard';

export default function MarketingWorkspace({ onBack, initialMenu, formattedDate, formattedTime }: { onBack: () => void, initialMenu?: string, formattedDate?: string, formattedTime?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);

  const sidebarLinks = [
    { name: 'Marketing Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Lead Pipeline', icon: <Target size={20} />, onClick: () => setActiveModule('Lead Pipeline') },
    { name: 'Approval Center', icon: <CheckCircle size={20} />, onClick: () => setActiveModule('Approval Center') },
    { name: 'Customer CRM', icon: <Users size={20} />, onClick: () => setActiveModule('Customer CRM') },
    { name: 'Quotation Hub', icon: <FileText size={20} />, onClick: () => setActiveModule('Quotation Hub') },
    { name: 'Response Center', icon: <MessageSquare size={20} />, onClick: () => setActiveModule('Response Center') },
    { name: 'PO Management', icon: <ShoppingCart size={20} />, onClick: () => setActiveModule('PO Management') },
    { name: 'Performance Dashboard', icon: <TrendingUp size={20} />, onClick: () => setActiveModule('Performance Dashboard') },
    { name: 'Work Tracker', icon: <Calendar size={20} />, onClick: () => setActiveModule('Work Tracker') },
    { name: 'Team Operations', icon: <Users size={20} />, onClick: () => setActiveModule('Team Operations') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis: KPICardProps[] = [
    { 
      title: "TOTAL PARTIES GENERATED", 
      value: "142", 
      trend: "12.5% vs last month", 
      trendDirection: "up",
      icon: Users, 
      colorTheme: "purple",
      status: "Pending",
      progress: 40
    },
    { 
      title: "NEW LEADS GENERATED", 
      value: "856", 
      trend: "24.3% vs last month",
      trendDirection: "up",
      icon: Target, 
      colorTheme: "emerald",
      status: "Active",
      progress: 30
    },
    { 
      title: "ORDERS GENERATED", 
      value: "89", 
      trend: "8.1% vs last month", 
      trendDirection: "up",
      icon: ShoppingCart, 
      colorTheme: "pink",
      status: "Pending",
      progress: 50
    },
    { 
      title: "BUSINESS GENERATED", 
      value: "₹45.2L", 
      trend: "15.2% vs last month", 
      trendDirection: "up",
      icon: TrendingUp, 
      colorTheme: "orange",
      status: "In Progress",
      progress: 60
    },
    { 
      title: "CONVERSION RATE", 
      value: "10.4%", 
      trend: "1.2% vs last month", 
      trendDirection: "up",
      icon: Percent, 
      colorTheme: "emerald",
      status: "Active",
      progress: 25
    },
    { 
      title: "ACTIVE CAMPAIGNS", 
      value: "12", 
      trend: "Running smooth", 
      trendDirection: "neutral",
      icon: Megaphone, 
      colorTheme: "blue",
      status: "Active",
      progress: 75
    },
    { 
      title: "TOP MARKETING EXEC", 
      value: "Rahul Sharma", 
      trend: "34 Orders Closed", 
      trendDirection: "neutral",
      icon: Award, 
      colorTheme: "rose",
      status: "Top Performer",
      progress: 85
    },
    { 
      title: "FOLLOW-UP SUCCESS", 
      value: "68%", 
      trend: "5.4% vs last month", 
      trendDirection: "up",
      icon: ThumbsUp, 
      colorTheme: "cyan",
      status: "Active",
      progress: 68
    },
    { 
      title: "LOST OPPORTUNITIES", 
      value: "45", 
      trend: "2.1% vs last month", 
      trendDirection: "down",
      icon: XCircle, 
      colorTheme: "red",
      status: "Attention",
      progress: 15
    },
    {
      title: "MONTHLY SCORE",
      value: "80%",
      trend: "Excellent Performance",
      trendDirection: "neutral",
      icon: Award,
      colorTheme: "purple",
      status: "Excellent",
      progress: 80
    }
  ];

  const modules = [
    { name: 'Lead Pipeline', icon: Target, desc: 'Manage and track all incoming marketing leads.' },
    { name: 'Approval Center', icon: CheckCircle, desc: 'Review and approve marketing content and budgets.' },
    { name: 'Customer CRM', icon: Users, desc: 'Centralized database for marketing customer relations.' },
    { name: 'Quotation Hub', icon: FileText, desc: 'Generate and manage marketing vendor quotations.' },
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
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
          {kpis.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </section>

        {/* Modules Grid */}
        <section className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-1 md:px-0">
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
