import React, { useState } from 'react';
import { 
  LayoutDashboard,
  UserSquare,
  CheckSquare,
  Bell,
  FileText,
  BarChart,
  Users,
  Settings
} from 'lucide-react';
import Layout from './Layout';
import GenericDataSheet from './GenericDataSheet';
import ERPModuleCard from './ERPModuleCard';

export default function DirectorWorkspace({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);
  const sidebarLinks = [
    { name: 'Director Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Department Performance', icon: <BarChart size={20} />, onClick: () => setActiveModule('Department Performance') },
    { name: 'Pending Approvals', icon: <CheckSquare size={20} />, onClick: () => setActiveModule('Pending Approvals') },
    { name: 'Employee Performance', icon: <UserSquare size={20} />, onClick: () => setActiveModule('Employee Performance') },
    { name: 'Task Monitoring', icon: <FileText size={20} />, onClick: () => setActiveModule('Task Monitoring') },
    { name: 'Business Summary', icon: <BarChart size={20} />, onClick: () => setActiveModule('Business Summary') },
    { name: 'Revenue Monitoring', icon: <BarChart size={20} />, onClick: () => setActiveModule('Revenue Monitoring') },
    { name: 'Cost Monitoring', icon: <BarChart size={20} />, onClick: () => setActiveModule('Cost Monitoring') },
    { name: 'Management Reports', icon: <FileText size={20} />, onClick: () => setActiveModule('Management Reports') },
    { name: 'Business Alerts', icon: <Bell size={20} />, onClick: () => setActiveModule('Business Alerts') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "TODAY'S SALES", 
      value: "₹5L", 
      trend: "↑ 10.4% vs yesterday", 
      icon: BarChart, 
      bgColor: "bg-violet-100/70",
      iconColor: "text-violet-600"
    },
    { 
      title: "TODAY'S PURCHASE", 
      value: "₹3L", 
      trend: "↓ 2.1% vs yesterday", 
      icon: BarChart, 
      bgColor: "bg-fuchsia-100/70",
      iconColor: "text-fuchsia-600"
    },
    { 
      title: "TODAY'S PRODUCTION", 
      value: "₹4L", 
      trend: "↑ 5.2% vs yesterday", 
      icon: BarChart, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-600"
    },
    { 
      title: "PENDING APPROVALS", 
      value: "12", 
      trend: "↓ 3 since morning", 
      icon: CheckSquare, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-600"
    },
    { 
      title: "PENDING PAYMENTS", 
      value: "₹10L", 
      trend: "↓ 8.5% vs last week", 
      icon: BarChart, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-600"
    },
    { 
      title: "PENDING COLLECTION", 
      value: "₹12L", 
      trend: "↑ 15.3% vs last week", 
      icon: BarChart, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-600"
    },
    { 
      title: "ACTIVE EMPLOYEES", 
      value: "180", 
      trend: "↑ 2 onboarding today", 
      icon: Users, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-600"
    },
    { 
      title: "BUSINESS PROFIT", 
      value: "₹55L", 
      trend: "↑ 18.7% vs last month", 
      icon: BarChart, 
      bgColor: "bg-violet-100/70",
      iconColor: "text-violet-600"
    }
  ];

  const modules = [
    { name: 'Director Dashboard', icon: LayoutDashboard },
    { name: 'Department Performance', icon: BarChart },
    { name: 'Pending Approvals', icon: CheckSquare },
    { name: 'Employee Performance', icon: UserSquare },
    { name: 'Task Monitoring', icon: FileText },
    { name: 'Revenue & Cost Monitoring', icon: BarChart },
    { name: 'Business Alerts & Notifications', icon: Bell },
    { name: 'Management Reports', icon: FileText }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="DIRECTOR CONTROL CENTER" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="director">
        <GenericDataSheet moduleName={activeModule} variant="director" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="DIRECTOR CONTROL CENTER" onBack={onBack} sidebarLinks={sidebarLinks} variant="director">
        {/* Content */}
        <header className="mb-8 select-none">
          <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Welcome to Director Dashboard</h2>
          <p className="text-sm text-gray-500 font-normal">Executive dashboard for real-time monitoring and strategic decision making.</p>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-serif">
          {kpis.map((kpi) => {
            const KpiIcon = kpi.icon;
            return (
              <div 
                key={kpi.title} 
                className="group bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex justify-between items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-white relative overflow-hidden"
              >
                <div className="space-y-1 relative z-10">
                  <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-black text-[#2b3a1a] leading-none pt-0.5">
                    {kpi.value}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600/90 pt-0.5">
                    <span>{kpi.trend}</span>
                  </div>
                </div>

                <div className={`p-2 rounded-xl ${kpi.bgColor} flex items-center justify-center shrink-0 shadow-sm ${kpi.iconColor} relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  <KpiIcon size={18} />
                </div>
                
                {/* Subtle decorative background shape */}
                <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${kpi.bgColor} opacity-30 blur-2xl group-hover:opacity-60 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            );
          })}
        </section>

        {/* Modules Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map(mod => (
            <ERPModuleCard key={mod.name} name={mod.name} icon={mod.icon} desc={`Access module functionalities for ${mod.name}...`} variant="director"  onClick={() => setActiveModule(mod.name)} />
          ))}
        </section>
    </Layout>
  );
}
