import React, { useState } from 'react';
import { 
  FileText,
  CreditCard,
  BarChart,
  Landmark,
  TrendingUp,
  TrendingDown,
  Database,
  PieChart,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import Layout from './Layout';
import GenericDataSheet from './GenericDataSheet';
import ERPModuleCard from './ERPModuleCard';

export default function FinanceWorkspace({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);
  const sidebarLinks = [
    { name: 'Finance Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Sales Accounts & Receivables', icon: <CreditCard size={20} />, onClick: () => setActiveModule('Sales Accounts & Receivables') },
    { name: 'Purchase Accounts & Payables', icon: <CreditCard size={20} />, onClick: () => setActiveModule('Purchase Accounts & Payables') },
    { name: 'Transport Freight Accounts', icon: <Landmark size={20} />, onClick: () => setActiveModule('Transport Freight Accounts') },
    { name: 'Sales GST (Output GST)', icon: <FileText size={20} />, onClick: () => setActiveModule('Sales GST (Output GST)') },
    { name: 'Purchase GST (Input GST)', icon: <FileText size={20} />, onClick: () => setActiveModule('Purchase GST (Input GST)') },
    { name: 'Credit Notes', icon: <TrendingUp size={20} />, onClick: () => setActiveModule('Credit Notes') },
    { name: 'Debit Notes', icon: <TrendingDown size={20} />, onClick: () => setActiveModule('Debit Notes') },
    { name: 'Sales Profitability', icon: <PieChart size={20} />, onClick: () => setActiveModule('Sales Profitability') },
    { name: 'Financial Reports', icon: <BarChart size={20} />, onClick: () => setActiveModule('Financial Reports') },
    { name: 'Analytics', icon: <BarChart size={20} />, onClick: () => setActiveModule('Analytics') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "TOTAL SALES", 
      value: "₹5.5Cr", 
      trend: "↑ 12.5% vs last month", 
      icon: TrendingUp, 
      bgColor: "bg-teal-100/70",
      iconColor: "text-teal-700"
    },
    { 
      title: "TOTAL PURCHASE", 
      value: "₹3.2Cr", 
      trend: "↑ 8.3% vs last month", 
      icon: CreditCard, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-700"
    },
    { 
      title: "ACCOUNTS REC.", 
      value: "₹45L", 
      trend: "↓ 5.2% vs last month", 
      icon: CreditCard, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-700"
    },
    { 
      title: "ACCOUNTS PAY.", 
      value: "₹35L", 
      trend: "↓ 4.1% vs last month", 
      icon: CreditCard, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-black"
    },
    { 
      title: "TRANSPORT OUT.", 
      value: "₹5L", 
      trend: "↑ 6.3% vs last month", 
      icon: Landmark, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    },
    { 
      title: "OUTPUT GST", 
      value: "₹12L", 
      trend: "↑ 14.8% vs last month", 
      icon: FileText, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-700"
    },
    { 
      title: "INPUT GST", 
      value: "₹8L", 
      trend: "↑ 9.2% vs last month", 
      icon: FileText, 
      bgColor: "bg-teal-100/70",
      iconColor: "text-teal-700"
    },
    { 
      title: "GST PAYABLE", 
      value: "₹4L", 
      trend: "↓ 2.1% vs last month", 
      icon: FileText, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    },
    { 
      title: "CREDIT NOTES", 
      value: "₹2L", 
      trend: "↑ 1.5% vs last month", 
      icon: TrendingUp, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "DEBIT NOTES", 
      value: "₹1L", 
      trend: "↓ 0.5% vs last month", 
      icon: TrendingDown, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-700"
    },
    { 
      title: "GROSS PROFIT", 
      value: "₹1.5Cr", 
      trend: "↑ 15.6% vs last month", 
      icon: TrendingUp, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "NET PROFIT", 
      value: "₹55L", 
      trend: "↑ 18.7% vs last month", 
      icon: PieChart, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-700"
    }
  ];

  const modules = [
    { name: 'Sales Accounts & Receivables', icon: CreditCard, desc: 'Track customer invoices and payment collections.' },
    { name: 'Purchase Accounts & Payables', icon: CreditCard, desc: 'Track vendor bills and payment status.' },
    { name: 'Transport Freight Accounts', icon: Landmark, desc: 'Track freight bills and payments.' },
    { name: 'Sales GST (Output GST)', icon: FileText, desc: 'Manage GST collected from sales.' },
    { name: 'Purchase GST (Input GST)', icon: FileText, desc: 'Manage GST Input Credit.' },
    { name: 'Credit Note Management', icon: TrendingUp, desc: 'Manage financial credit adjustments.' },
    { name: 'Debit Note Management', icon: TrendingDown, desc: 'Manage debit recoveries and adjustments.' },
    { name: 'Sales Profitability Analysis', icon: PieChart, desc: 'Analyze profitability per order/product.' },
    { name: 'Financial Reports', icon: BarChart, desc: 'Generate complete accounting reports.' },
    { name: 'Financial Analytics', icon: BarChart, desc: 'Management-level financial intelligence.' },
    { name: '360° Finance Summary', icon: Database, desc: 'Premium financial snapshot of the whole business.' },
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="FINANCE & ACCOUNTING MANAGEMENT" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="finance">
        <GenericDataSheet moduleName={activeModule} variant="finance" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="FINANCE & ACCOUNTING MANAGEMENT" onBack={onBack} sidebarLinks={sidebarLinks} variant="finance">
        {/* Content */}
        <header className="mb-8 select-none">
          <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Welcome to Finance Dashboard</h2>
          <p className="text-sm text-gray-500 font-normal">Manage complete financial operations including Sales, Purchase, Transport Accounting, GST, and Profitability Analysis.</p>
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
            <ERPModuleCard key={mod.name} name={mod.name} icon={mod.icon} desc={mod.desc} variant="finance"  onClick={() => setActiveModule(mod.name)} />
          ))}
        </section>
    </Layout>
  );
}
