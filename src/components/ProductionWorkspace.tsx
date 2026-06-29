import React, { useState } from 'react';
import { 
  Factory,
  ClipboardList,
  FileText,
  LayoutGrid,
  RefreshCw,
  Search,
  BarChart,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Database,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import Layout from './Layout';
import GenericDataSheet from './GenericDataSheet';
import ERPModuleCard from './ERPModuleCard';

export default function ProductionWorkspace({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);
  const sidebarLinks = [
    { name: 'Production Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Production Orders', icon: <Factory size={20} />, onClick: () => setActiveModule('Production Orders') },
    { name: 'Production Planning', icon: <LayoutGrid size={20} />, onClick: () => setActiveModule('Production Planning') },
    { name: 'BOM Management', icon: <FileText size={20} />, onClick: () => setActiveModule('BOM Management') },
    { name: 'Material Issue', icon: <Database size={20} />, onClick: () => setActiveModule('Material Issue') },
    { name: 'Production Tracking', icon: <Clock size={20} />, onClick: () => setActiveModule('Production Tracking') },
    { name: 'Machine Utilization', icon: <BarChart size={20} />, onClick: () => setActiveModule('Machine Utilization') },
    { name: 'Work Center Management', icon: <Factory size={20} />, onClick: () => setActiveModule('Work Center Management') },
    { name: 'Quality Control', icon: <CheckCircle size={20} />, onClick: () => setActiveModule('Quality Control') },
    { name: 'Lab Testing', icon: <Search size={20} />, onClick: () => setActiveModule('Lab Testing') },
    { name: 'Finished Goods', icon: <Package size={20} />, onClick: () => setActiveModule('Finished Goods') },
    { name: 'Production Costing', icon: <TrendingUp size={20} />, onClick: () => setActiveModule('Production Costing') },
    { name: 'Tally Integration', icon: <RefreshCw size={20} />, onClick: () => setActiveModule('Tally Integration') },
    { name: 'Production Reports', icon: <BarChart size={20} />, onClick: () => setActiveModule('Production Reports') },
    { name: 'Analytics', icon: <BarChart size={20} />, onClick: () => setActiveModule('Analytics') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "OPEN PRODUCTION", 
      value: "24", 
      trend: "↑ 2 since morning", 
      icon: Factory, 
      bgColor: "bg-sky-100/70",
      iconColor: "text-sky-600"
    },
    { 
      title: "RUNNING ORDERS", 
      value: "15", 
      trend: "↑ 85% load", 
      icon: Clock, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-600"
    },
    { 
      title: "COMPLETED ORDERS", 
      value: "105", 
      trend: "↑ 12.4% vs last month", 
      icon: CheckCircle, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-600"
    },
    { 
      title: "PENDING QC", 
      value: "12", 
      trend: "↓ 4 resolved today", 
      icon: CheckCircle, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    },
    { 
      title: "RM CONSUMED", 
      value: "₹40L", 
      trend: "↑ 3.2% vs last week", 
      icon: Database, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-700"
    },
    { 
      title: "FG PRODUCED", 
      value: "₹1.5Cr", 
      trend: "↑ 8.7% vs last month", 
      icon: Package, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "PROD. VALUE", 
      value: "₹2.1Cr", 
      trend: "↑ 14.8% vs last month", 
      icon: TrendingUp, 
      bgColor: "bg-sky-100/70",
      iconColor: "text-sky-650"
    },
    { 
      title: "PROD. COST", 
      value: "₹1.8Cr", 
      trend: "↓ 1.2% optimization", 
      icon: TrendingDown, 
      bgColor: "bg-teal-100/70",
      iconColor: "text-teal-700"
    },
    { 
      title: "REWORK QTY", 
      value: "150", 
      trend: "↓ 20 units reconciled", 
      icon: AlertTriangle, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-700"
    },
    { 
      title: "REJECTION QTY", 
      value: "45", 
      trend: "↓ 5 units reconciled", 
      icon: AlertTriangle, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    }
  ];

  const modules = [
    { name: 'Production Order Mgmt', icon: Factory },
    { name: 'Customer Order Linking', icon: ClipboardList },
    { name: 'BOM Management', icon: FileText },
    { name: 'Production Planning', icon: LayoutGrid },
    { name: 'Material Issue', icon: Database },
    { name: 'Live Production Tracking', icon: Clock },
    { name: 'Work Center Mgmt', icon: Factory },
    { name: 'Machine Utilization', icon: BarChart },
    { name: 'Quality Control', icon: CheckCircle },
    { name: 'Lab Testing', icon: Search },
    { name: 'Rejection & Rework', icon: AlertTriangle },
    { name: 'Finished Goods Mgmt', icon: Package },
    { name: 'Production Costing', icon: TrendingUp },
    { name: 'Prod. Value Analysis', icon: TrendingDown },
    { name: 'Tally Integration', icon: RefreshCw },
    { name: 'Production Reports & Analytics', icon: BarChart }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="PRODUCTION & QUALITY MANAGEMENT" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="production">
        <GenericDataSheet moduleName={activeModule} variant="production" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="PRODUCTION & QUALITY MANAGEMENT" onBack={onBack} sidebarLinks={sidebarLinks} variant="production">
        {/* Content */}
        <header className="mb-8 select-none">
          <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Welcome to Production Dashboard</h2>
          <p className="text-sm text-gray-500 font-normal">Complete manufacturing lifecycle, QC, and costing analysis.</p>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8 font-serif">
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
        </section>

        {/* Modules Grid */}
        <section className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-1 md:px-0">
          {modules.map(mod => (
            <ERPModuleCard key={mod.name} name={mod.name} icon={mod.icon} desc={`Access module functionalities for ${mod.name}...`} variant="production"  onClick={() => setActiveModule(mod.name)} />
          ))}
        </section>
    </Layout>
  );
}
