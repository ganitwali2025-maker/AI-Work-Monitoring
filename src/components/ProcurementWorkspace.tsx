import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart,
  Truck,
  FileText,
  CreditCard,
  BarChart,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  UserCheck,
  Search,
  ClipboardList,
  ShieldCheck,
  FilePlus,
  TrendingDown,
  TrendingUp,
  Receipt,
  Settings,
  LayoutDashboard,
  Calendar
} from 'lucide-react';
import Layout from './Layout';
import GenericDataSheet from './GenericDataSheet';
import ERPModuleCard from './ERPModuleCard';

export default function ProcurementWorkspace({ onBack, initialMenu, formattedDate, formattedTime }: { onBack: () => void, initialMenu?: string, formattedDate?: string, formattedTime?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);

  const sidebarLinks = [
    { name: 'Purchase Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Indent Management', icon: <ClipboardList size={20} />, onClick: () => setActiveModule('Indent Management') },
    { name: 'Purchase Requisition', icon: <FileText size={20} />, onClick: () => setActiveModule('Purchase Requisition') },
    { name: 'Vendor Selection', icon: <UserCheck size={20} />, onClick: () => setActiveModule('Vendor Selection') },
    { name: 'RFQ Management', icon: <Search size={20} />, onClick: () => setActiveModule('RFQ Management') },
    { name: 'Purchase Orders', icon: <ShoppingCart size={20} />, onClick: () => setActiveModule('Purchase Orders') },
    { name: 'PO Approvals', icon: <CheckCircle size={20} />, onClick: () => setActiveModule('PO Approvals') },
    { name: 'Vendor Follow-up', icon: <Clock size={20} />, onClick: () => setActiveModule('Vendor Follow-up') },
    { name: 'Transport Tracking', icon: <Truck size={20} />, onClick: () => setActiveModule('Transport Tracking') },
    { name: 'Material Receipt', icon: <Package size={20} />, onClick: () => setActiveModule('Material Receipt') },
    { name: 'Quality Inspection', icon: <ShieldCheck size={20} />, onClick: () => setActiveModule('Quality Inspection') },
    { name: 'GRN Management', icon: <FilePlus size={20} />, onClick: () => setActiveModule('GRN Management') },
    { name: 'Vendor Bills', icon: <Receipt size={20} />, onClick: () => setActiveModule('Vendor Bills') },
    { name: 'Debit Notes', icon: <TrendingDown size={20} />, onClick: () => setActiveModule('Debit Notes') },
    { name: 'Credit Notes', icon: <TrendingUp size={20} />, onClick: () => setActiveModule('Credit Notes') },
    { name: 'Tally Integration', icon: <RefreshCw size={20} />, onClick: () => setActiveModule('Tally Integration') },
    { name: 'Vendor Payments', icon: <CreditCard size={20} />, onClick: () => setActiveModule('Vendor Payments') },
    { name: 'Reports', icon: <BarChart size={20} />, onClick: () => setActiveModule('Reports') },
    { name: 'Analytics', icon: <BarChart size={20} />, onClick: () => setActiveModule('Analytics') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "PENDING INDENTS", 
      value: "45", 
      trend: "↑ 4.2% vs last month", 
      icon: ClipboardList, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-700"
    },
    { 
      title: "APPROVED REQ", 
      value: "32", 
      trend: "↑ 11.5% vs last month", 
      icon: FileText, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "OPEN POs", 
      value: "28", 
      trend: "↑ 9.2% vs last month", 
      icon: ShoppingCart, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-700"
    },
    { 
      title: "IN TRANSIT", 
      value: "15", 
      trend: "↓ 2.1% vs last month", 
      icon: Truck, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-black"
    },
    { 
      title: "PENDING GRN", 
      value: "12", 
      trend: "↑ 8.3% vs last month", 
      icon: Package, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-700"
    },
    { 
      title: "PENDING QC", 
      value: "8", 
      trend: "↓ 5.4% vs last month", 
      icon: ShieldCheck, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    },
    { 
      title: "VENDOR BILLS", 
      value: "20", 
      trend: "↑ 14.6% vs last month", 
      icon: Receipt, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-700"
    },
    { 
      title: "PENDING PAY", 
      value: "18", 
      trend: "↑ 6.3% vs last month", 
      icon: CreditCard, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "DEBIT NOTES", 
      value: "5", 
      trend: "↓ 1.5% vs last month", 
      icon: TrendingDown, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    },
    { 
      title: "CREDIT NOTES", 
      value: "3", 
      trend: "↑ 1.1% vs last month", 
      icon: TrendingUp, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-700"
    }
  ];

  const modules = [
    { name: 'Indent Management', icon: ClipboardList },
    { name: 'Purchase Requisition', icon: FileText },
    { name: 'Vendor Selection', icon: UserCheck },
    { name: 'RFQ Management', icon: Search },
    { name: 'Purchase Orders', icon: ShoppingCart },
    { name: 'PO Approvals', icon: CheckCircle },
    { name: 'Vendor Follow-up', icon: Clock },
    { name: 'Transport Tracking', icon: Truck },
    { name: 'Material Receipt', icon: Package },
    { name: 'Quality Inspection', icon: ShieldCheck },
    { name: 'GRN Management', icon: FilePlus },
    { name: 'Material Rejection', icon: AlertTriangle },
    { name: 'Debit Note', icon: TrendingDown },
    { name: 'Credit Note', icon: TrendingUp },
    { name: 'Vendor Bills', icon: Receipt },
    { name: 'Tally Integration', icon: RefreshCw },
    { name: 'Vendor Payments', icon: CreditCard },
    { name: 'Reports & Analytics', icon: BarChart }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="PURCHASE & PROCUREMENT" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="procurement">
        <GenericDataSheet moduleName={activeModule} variant="procurement" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="PURCHASE & PROCUREMENT" onBack={onBack} sidebarLinks={sidebarLinks} variant="procurement">
        {/* Content */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
          <div>
            <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Welcome to Purchase Dashboard</h2>
            <p className="text-sm text-gray-500 font-normal">Manage the complete procurement lifecycle from Material Indent to Vendor Payment.</p>
          </div>
          
          {/* Dynamic Date display */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm shrink-0 font-sans">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
              <Calendar size={18} />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-gray-900">{formattedDate || "17 Jun 2026"}</span>
              <span className="text-[10px] text-gray-400 font-medium mt-0.5">{formattedTime || "Wednesday, 05:30 PM"}</span>
            </div>
          </div>
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
                  <p className="text-xs text-black font-bold uppercase tracking-wider">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 leading-none pt-1.5">
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
            <ERPModuleCard key={mod.name} name={mod.name} icon={mod.icon} desc={`Access module functionalities for ${mod.name}...`} variant="procurement"  onClick={() => setActiveModule(mod.name)} />
          ))}
        </section>
    </Layout>
  );
}
