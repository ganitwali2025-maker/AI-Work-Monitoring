import React, { useState } from 'react';
import { 
  Truck,
  FileText,
  CreditCard,
  BarChart,
  Package,
  Car,
  MapPin,
  FileCheck,
  User,
  Building2,
  ShieldCheck,
  RefreshCw,
  Settings,
  Users,
  LayoutDashboard
} from 'lucide-react';
import Layout from './Layout';
import GenericDataSheet from './GenericDataSheet';
import ERPModuleCard from './ERPModuleCard';

export default function LogisticsWorkspace({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);
  const sidebarLinks = [
    { name: 'Logistics Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Transport Master', icon: <Building2 size={20} />, onClick: () => setActiveModule('Transport Master') },
    { name: 'Vehicle Master', icon: <Car size={20} />, onClick: () => setActiveModule('Vehicle Master') },
    { name: 'Driver Master', icon: <User size={20} />, onClick: () => setActiveModule('Driver Master') },
    { name: 'Purchase Inward Tracking', icon: <Package size={20} />, onClick: () => setActiveModule('Purchase Inward Tracking') },
    { name: 'Sales Dispatch Tracking', icon: <Truck size={20} />, onClick: () => setActiveModule('Sales Dispatch Tracking') },
    { name: 'Vehicle Tracking', icon: <MapPin size={20} />, onClick: () => setActiveModule('Vehicle Tracking') },
    { name: 'POD Management', icon: <FileCheck size={20} />, onClick: () => setActiveModule('POD Management') },
    { name: 'Freight Bills', icon: <FileText size={20} />, onClick: () => setActiveModule('Freight Bills') },
    { name: 'Transport Payments', icon: <CreditCard size={20} />, onClick: () => setActiveModule('Transport Payments') },
    { name: 'GST/TDS Compliance', icon: <ShieldCheck size={20} />, onClick: () => setActiveModule('GST/TDS Compliance') },
    { name: 'Rate Contracts', icon: <RefreshCw size={20} />, onClick: () => setActiveModule('Rate Contracts') },
    { name: 'Transport Analytics', icon: <BarChart size={20} />, onClick: () => setActiveModule('Transport Analytics') },
    { name: 'Reports', icon: <BarChart size={20} />, onClick: () => setActiveModule('Reports') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "TOTAL TRANSPORTERS", 
      value: "45", 
      trend: "↑ 2 new contracts", 
      icon: Building2, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-indigo-600"
    },
    { 
      title: "ACTIVE TRANSPORTERS", 
      value: "40", 
      trend: "↑ 88.8% active", 
      icon: Users, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-600"
    },
    { 
      title: "TOTAL VEHICLES", 
      value: "120", 
      trend: "↑ 5 registered", 
      icon: Car, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-600"
    },
    { 
      title: "VEHICLES IN TRANSIT", 
      value: "25", 
      trend: "↑ 4 dispatching now", 
      icon: Truck, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-black"
    },
    { 
      title: "PURCHASE IN TRANSIT", 
      value: "8", 
      trend: "↓ 2 arrived today", 
      icon: Package, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "SALES IN TRANSIT", 
      value: "12", 
      trend: "↑ 3 dispatched today", 
      icon: Truck, 
      bgColor: "bg-sky-100/70",
      iconColor: "text-sky-700"
    },
    { 
      title: "PENDING POD", 
      value: "18", 
      trend: "↓ 5 reconciled", 
      icon: FileCheck, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    },
    { 
      title: "PENDING FREIGHT", 
      value: "15", 
      trend: "↓ 3 bills audited", 
      icon: FileText, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-700"
    },
    { 
      title: "TRANSPORT PAYMENTS", 
      value: "10", 
      trend: "↑ 2 cleared today", 
      icon: CreditCard, 
      bgColor: "bg-teal-100/70",
      iconColor: "text-teal-700"
    },
    { 
      title: "MONTHLY COST", 
      value: "₹15L", 
      trend: "↓ 1.5% optimization", 
      icon: BarChart, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-indigo-600"
    }
  ];

  const modules = [
    { name: 'Transport Master', icon: Building2 },
    { name: 'Vehicle Master', icon: Car },
    { name: 'Driver Master', icon: User },
    { name: 'Purchase Inward Tracking', icon: Package },
    { name: 'Sales Dispatch Tracking', icon: Truck },
    { name: 'Vehicle Movement Tracking', icon: MapPin },
    { name: 'POD Management', icon: FileCheck },
    { name: 'Freight Bill Management', icon: FileText },
    { name: 'GST & TDS Compliance', icon: ShieldCheck },
    { name: 'Transport Payment Management', icon: CreditCard },
    { name: 'Rate Contract Management', icon: RefreshCw },
    { name: 'Material Movement History', icon: Package },
    { name: 'Transport Reports & Analytics', icon: BarChart }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="LOGISTICS & TRANSPORT" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="logistics">
        <GenericDataSheet moduleName={activeModule} variant="logistics" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="LOGISTICS & TRANSPORT" onBack={onBack} sidebarLinks={sidebarLinks} variant="logistics">
        {/* Content */}
        <header className="mb-8 select-none">
          <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Welcome to Logistics Dashboard</h2>
          <p className="text-sm text-gray-500 font-normal">Complete fleet, transport, and dispatch management.</p>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8 font-serif">
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
            <ERPModuleCard key={mod.name} name={mod.name} icon={mod.icon} desc={`Access module functionalities for ${mod.name}...`} variant="logistics"  onClick={() => setActiveModule(mod.name)} />
          ))}
        </section>
    </Layout>
  );
}
