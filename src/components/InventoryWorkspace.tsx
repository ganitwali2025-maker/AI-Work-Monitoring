import React, { useState } from 'react';
import { 
  Package,
  Layers,
  Archive,
  ShoppingCart,
  Truck,
  FileText,
  Factory,
  BarChart,
  Settings,
  RefreshCw,
  ClipboardList,
  AlertTriangle,
  RotateCcw,
  LayoutGrid,
  Database,
  LayoutDashboard
} from 'lucide-react';
import Layout from './Layout';
import GenericDataSheet from './GenericDataSheet';
import ERPModuleCard from './ERPModuleCard';

export default function InventoryWorkspace({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);
  const sidebarLinks = [
    { name: 'Inventory Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Item Master', icon: <Package size={20} />, onClick: () => setActiveModule('Item Master') },
    { name: 'Raw Material Stock', icon: <Archive size={20} />, onClick: () => setActiveModule('Raw Material Stock') },
    { name: 'Semi Finished Goods', icon: <Layers size={20} />, onClick: () => setActiveModule('Semi Finished Goods') },
    { name: 'Finished Goods', icon: <Package size={20} />, onClick: () => setActiveModule('Finished Goods') },
    { name: 'Stock Ledger', icon: <Database size={20} />, onClick: () => setActiveModule('Stock Ledger') },
    { name: 'Purchase Pending', icon: <ShoppingCart size={20} />, onClick: () => setActiveModule('Purchase Pending') },
    { name: 'Material Receipt', icon: <FileText size={20} />, onClick: () => setActiveModule('Material Receipt') },
    { name: 'Production Consumption', icon: <Factory size={20} />, onClick: () => setActiveModule('Production Consumption') },
    { name: 'Sales Allocation', icon: <ShoppingCart size={20} />, onClick: () => setActiveModule('Sales Allocation') },
    { name: 'Stock Transfer', icon: <Truck size={20} />, onClick: () => setActiveModule('Stock Transfer') },
    { name: 'Warehouse Management', icon: <Database size={20} />, onClick: () => setActiveModule('Warehouse Management') },
    { name: 'Reorder Planning', icon: <RefreshCw size={20} />, onClick: () => setActiveModule('Reorder Planning') },
    { name: 'Stock Valuation', icon: <BarChart size={20} />, onClick: () => setActiveModule('Stock Valuation') },
    { name: 'ABC Analysis', icon: <BarChart size={20} />, onClick: () => setActiveModule('ABC Analysis') },
    { name: 'Inventory Reports', icon: <BarChart size={20} />, onClick: () => setActiveModule('Inventory Reports') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "TOTAL STOCK VALUE", 
      value: "₹2.5Cr", 
      trend: "↑ 4.2% vs last month", 
      icon: Package, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "RAW MATERIAL", 
      value: "₹80L", 
      trend: "↓ 2.1% vs last month", 
      icon: Archive, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-700"
    },
    { 
      title: "SEMI FINISHED", 
      value: "₹40L", 
      trend: "↑ 5.3% vs last month", 
      icon: Layers, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-700"
    },
    { 
      title: "FINISHED GOODS", 
      value: "₹1.3Cr", 
      trend: "↑ 8.7% vs last month", 
      icon: Package, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "LOW STOCK ITEMS", 
      value: "12", 
      trend: "↓ 3 since yesterday", 
      icon: AlertTriangle, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    },
    { 
      title: "EXCESS STOCK", 
      value: "5", 
      trend: "↑ 1 this week", 
      icon: AlertTriangle, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-700"
    },
    { 
      title: "IN TRANSIT", 
      value: "₹15L", 
      trend: "↑ 12.4% vs last week", 
      icon: Truck, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-black"
    },
    { 
      title: "PO PENDING GTY", 
      value: "500", 
      trend: "↓ 50 items sync", 
      icon: ShoppingCart, 
      bgColor: "bg-teal-100/70",
      iconColor: "text-teal-700"
    },
    { 
      title: "SALES RESERVED", 
      value: "200", 
      trend: "↑ 20 since morning", 
      icon: ShoppingCart, 
      bgColor: "bg-sky-100/70",
      iconColor: "text-sky-700"
    },
    { 
      title: "PROD. RESERVED", 
      value: "300", 
      trend: "↑ 40 since morning", 
      icon: Factory, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-700"
    }
  ];

  const modules = [
    { name: 'Item Master', icon: Package },
    { name: 'Raw Material Stock', icon: Archive },
    { name: 'Semi Finished Goods', icon: Layers },
    { name: 'Finished Goods', icon: Package },
    { name: 'Purchase Pending Tracker', icon: ShoppingCart },
    { name: 'In Transit Material', icon: Truck },
    { name: 'Material Receipt', icon: FileText },
    { name: 'Production Consumption', icon: Factory },
    { name: 'Sales Allocation', icon: ShoppingCart },
    { name: 'Warehouse Management', icon: Database },
    { name: 'Stock Level Monitoring', icon: LayoutGrid },
    { name: 'Reorder Planning', icon: RefreshCw },
    { name: 'Stock Valuation', icon: BarChart },
    { name: 'Purchase Return Tracker', icon: RotateCcw },
    { name: 'Inventory Control Sheet', icon: ClipboardList },
    { name: 'ABC Analysis', icon: BarChart },
    { name: 'Inventory Reports & Analytics', icon: BarChart }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="INVENTORY MANAGEMENT" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="inventory">
        <GenericDataSheet moduleName={activeModule} variant="inventory" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="INVENTORY MANAGEMENT" onBack={onBack} sidebarLinks={sidebarLinks} variant="inventory">
        {/* Content */}
        <header className="mb-8 select-none">
          <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Welcome to Inventory Dashboard</h2>
          <p className="text-sm text-gray-500 font-normal">Manage complete inventory lifecycle from Purchase Receipt to Stock Replenishment.</p>
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
            <ERPModuleCard key={mod.name} name={mod.name} icon={mod.icon} desc={`Access module functionalities for ${mod.name}...`} variant="inventory"  onClick={() => setActiveModule(mod.name)} />
          ))}
        </section>
    </Layout>
  );
}
