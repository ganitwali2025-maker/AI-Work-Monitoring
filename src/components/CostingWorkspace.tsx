import React, { useState } from 'react';
import { 
  Calculator,
  PieChart,
  TrendingUp,
  TrendingDown,
  BarChart,
  Settings,
  Briefcase,
  FileText,
  LayoutDashboard
} from 'lucide-react';
import Layout from './Layout';
import GenericDataSheet from './GenericDataSheet';
import ERPModuleCard from './ERPModuleCard';

export default function CostingWorkspace({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);
  const sidebarLinks = [
    { name: 'Costing Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Product Costing', icon: <Calculator size={20} />, onClick: () => setActiveModule('Product Costing') },
    { name: 'Order Costing', icon: <FileText size={20} />, onClick: () => setActiveModule('Order Costing') },
    { name: 'Customer Profitability', icon: <PieChart size={20} />, onClick: () => setActiveModule('Customer Profitability') },
    { name: 'Vendor Cost Analysis', icon: <BarChart size={20} />, onClick: () => setActiveModule('Vendor Cost Analysis') },
    { name: 'Transport Cost Analysis', icon: <BarChart size={20} />, onClick: () => setActiveModule('Transport Cost Analysis') },
    { name: 'Production Cost Analysis', icon: <TrendingUp size={20} />, onClick: () => setActiveModule('Production Cost Analysis') },
    { name: 'Material Cost Analysis', icon: <BarChart size={20} />, onClick: () => setActiveModule('Material Cost Analysis') },
    { name: 'Margin Analysis', icon: <TrendingUp size={20} />, onClick: () => setActiveModule('Margin Analysis') },
    { name: 'Cost Variance Analysis', icon: <TrendingDown size={20} />, onClick: () => setActiveModule('Cost Variance Analysis') },
    { name: 'Budget vs Actual', icon: <BarChart size={20} />, onClick: () => setActiveModule('Budget vs Actual') },
    { name: 'Reports', icon: <BarChart size={20} />, onClick: () => setActiveModule('Reports') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "TOTAL PROD. COST", 
      value: "₹1.8Cr", 
      trend: "↑ 5.2% vs last month", 
      icon: TrendingUp, 
      bgColor: "bg-teal-100/70",
      iconColor: "text-teal-700"
    },
    { 
      title: "TOTAL MATERIAL", 
      value: "₹1.2Cr", 
      trend: "↑ 4.1% vs last month", 
      icon: Calculator, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-700"
    },
    { 
      title: "TOTAL TRANSPORT", 
      value: "₹5L", 
      trend: "↓ 2.5% vs last month", 
      icon: BarChart, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-700"
    },
    { 
      title: "TOTAL PURCHASE", 
      value: "₹3Cr", 
      trend: "↑ 8.3% vs last month", 
      icon: Briefcase, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-indigo-700"
    },
    { 
      title: "GROSS PROFIT", 
      value: "₹1.5Cr", 
      trend: "↑ 12.4% vs last month", 
      icon: TrendingUp, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "NET PROFIT", 
      value: "₹55L", 
      trend: "↑ 15.6% vs last month", 
      icon: PieChart, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-700"
    },
    { 
      title: "HIGHEST MARGIN", 
      value: "Prod-A", 
      trend: "↑ 3.2% vs last month", 
      icon: TrendingUp, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "LOWEST MARGIN", 
      value: "Prod-B", 
      trend: "↓ 1.2% vs last month", 
      icon: TrendingDown, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    }
  ];

  const modules = [
    { name: 'Product Costing', icon: Calculator },
    { name: 'Order Costing', icon: FileText },
    { name: 'Customer Profitability', icon: PieChart },
    { name: 'Vendor Cost Analysis', icon: BarChart },
    { name: 'Transport Cost Analysis', icon: BarChart },
    { name: 'Production Cost Analysis', icon: TrendingUp },
    { name: 'Material Cost Analysis', icon: BarChart },
    { name: 'Margin Analysis', icon: TrendingUp },
    { name: 'Cost Variance Analysis', icon: TrendingDown },
    { name: 'Budget vs Actual', icon: BarChart }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="COSTING & PROFITABILITY" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="finance">
        <GenericDataSheet moduleName={activeModule} variant="finance" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="COSTING & PROFITABILITY" onBack={onBack} sidebarLinks={sidebarLinks} variant="finance">
        {/* Content */}
        <header className="mb-8 select-none">
          <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Welcome to Costing Dashboard</h2>
          <p className="text-sm text-gray-500 font-normal">Monitor business costing, margins, and financial performance.</p>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-serif">
          {kpis.map((kpi) => {
            const KpiIcon = kpi.icon;
            return (
              <div 
                key={kpi.title} 
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start transition-all hover:shadow-md duration-300 relative overflow-hidden"
              >
                <div className="space-y-1">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                    {kpi.title}
                  </p>
                  <p className="text-xl font-bold text-gray-900 leading-none pt-1">
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map(mod => (
            <ERPModuleCard key={mod.name} name={mod.name} icon={mod.icon} desc={`Access module functionalities for ${mod.name}...`} variant="finance"  onClick={() => setActiveModule(mod.name)} />
          ))}
        </section>
    </Layout>
  );
}
