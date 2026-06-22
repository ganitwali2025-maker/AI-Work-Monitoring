import React, { useState } from 'react';
import { 
  User,
  Building2,
  Clock,
  FileClock,
  CreditCard,
  CheckCircle,
  FileCheck,
  Folder,
  LayoutGrid,
  BarChart,
  Users,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import Layout from './Layout';
import GenericDataSheet from './GenericDataSheet';
import ERPModuleCard from './ERPModuleCard';

export default function HrWorkspace({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);
  const sidebarLinks = [
    { name: 'HR Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Employee Master', icon: <User size={20} />, onClick: () => setActiveModule('Employee Master') },
    { name: 'Department Assignment', icon: <Building2 size={20} />, onClick: () => setActiveModule('Department Assignment') },
    { name: 'Attendance Management', icon: <Clock size={20} />, onClick: () => setActiveModule('Attendance Management') },
    { name: 'Leave Management', icon: <FileClock size={20} />, onClick: () => setActiveModule('Leave Management') },
    { name: 'Payroll Management', icon: <CreditCard size={20} />, onClick: () => setActiveModule('Payroll Management') },
    { name: 'Performance Management', icon: <BarChart size={20} />, onClick: () => setActiveModule('Performance Management') },
    { name: 'Task Management', icon: <CheckCircle size={20} />, onClick: () => setActiveModule('Task Management') },
    { name: 'Approval Management', icon: <FileCheck size={20} />, onClick: () => setActiveModule('Approval Management') },
    { name: 'Employee Documents', icon: <Folder size={20} />, onClick: () => setActiveModule('Employee Documents') },
    { name: 'Shift & Schedule', icon: <Settings size={20} />, onClick: () => setActiveModule('Shift & Schedule') },
    { name: 'Resource Matrix', icon: <LayoutGrid size={20} />, onClick: () => setActiveModule('Resource Matrix') },
    { name: 'HR Reports & Analytics', icon: <BarChart size={20} />, onClick: () => setActiveModule('HR Reports & Analytics') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "TOTAL EMPLOYEES", 
      value: "185", 
      trend: "↑ 5 new this month", 
      icon: Users, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-600"
    },
    { 
      title: "PRESENT TODAY", 
      value: "178", 
      trend: "↑ 96.2% rate", 
      icon: CheckCircle, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-600"
    },
    { 
      title: "ABSENT TODAY", 
      value: "5", 
      trend: "↓ 2% from yesterday", 
      icon: Clock, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-600"
    },
    { 
      title: "ON LEAVE", 
      value: "2", 
      trend: "↓ 1 approved today", 
      icon: FileClock, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-600"
    },
    { 
      title: "ACTIVE EMPLOYEES", 
      value: "180", 
      trend: "↑ 15 active jobs", 
      icon: User, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-600"
    },
    { 
      title: "NEW JOININGS", 
      value: "3", 
      trend: "↑ 1 joining tomorrow", 
      icon: Users, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-indigo-600"
    },
    { 
      title: "PENDING APPR.", 
      value: "8", 
      trend: "↓ 4 resolved today", 
      icon: FileCheck, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-600"
    },
    { 
      title: "MONTHLY PAYROLL", 
      value: "₹1.2Cr", 
      trend: "↑ 3.2% vs last month", 
      icon: CreditCard, 
      bgColor: "bg-teal-100/70",
      iconColor: "text-teal-600"
    }
  ];

  const modules = [
    { name: 'Employee Master', icon: User },
    { name: 'Department Assignment', icon: Building2 },
    { name: 'Employee Directory', icon: Users },
    { name: 'Attendance Management', icon: Clock },
    { name: 'Leave Management', icon: FileClock },
    { name: 'Payroll Management', icon: CreditCard },
    { name: 'Task Management', icon: CheckCircle },
    { name: 'Approval Management', icon: FileCheck },
    { name: 'Performance Management', icon: BarChart },
    { name: 'Employee Documents', icon: Folder },
    { name: 'Shift & Work Schedule', icon: Settings },
    { name: 'Resource Matrix', icon: LayoutGrid },
    { name: 'HR Reports & Analytics', icon: BarChart }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="HR & ADMINISTRATION MANAGEMENT" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="hr">
        <GenericDataSheet moduleName={activeModule} variant="hr" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="HR & ADMINISTRATION MANAGEMENT" onBack={onBack} sidebarLinks={sidebarLinks} variant="hr">
        {/* Content */}
        <header className="mb-8 select-none">
          <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Welcome to HR Dashboard</h2>
          <p className="text-sm text-gray-500 font-normal">Complete workforce management: employee records, attendance, payroll, and tasks.</p>
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
            <ERPModuleCard key={mod.name} name={mod.name} icon={mod.icon} desc={`Access module functionalities for ${mod.name}...`} variant="hr"  onClick={() => setActiveModule(mod.name)} />
          ))}
        </section>
    </Layout>
  );
}
