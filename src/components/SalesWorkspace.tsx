import React, { useState } from 'react';
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
  FileCheck,
  Factory,
  Settings,
  ClipboardList,
  LayoutDashboard
} from 'lucide-react';
import Layout from './Layout';
import ERPModuleCard from './ERPModuleCard';
import GenericDataSheet from './GenericDataSheet';

export default function SalesWorkspace({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);

  const sidebarLinks = [
    { name: 'Sales Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Customer Purchase Order', icon: <FileCheck size={20} />, onClick: () => setActiveModule('Customer Purchase Order') },
    { name: 'Sales Order Management', icon: <ShoppingCart size={20} />, onClick: () => setActiveModule('Sales Order Management') },
    { name: 'Stock Verification', icon: <Package size={20} />, onClick: () => setActiveModule('Stock Verification') },
    { name: 'Production Request', icon: <Factory size={20} />, onClick: () => setActiveModule('Production Request') },
    { name: 'Purchase Requirement', icon: <ClipboardList size={20} />, onClick: () => setActiveModule('Purchase Requirement') },
    { name: 'Dispatch Management', icon: <Package size={20} />, onClick: () => setActiveModule('Dispatch Management') },
    { name: 'Transport Allocation', icon: <Truck size={20} />, onClick: () => setActiveModule('Transport Allocation') },
    { name: 'Delivery Tracking', icon: <Clock size={20} />, onClick: () => setActiveModule('Delivery Tracking') },
    { name: 'POD Management', icon: <FileText size={20} />, onClick: () => setActiveModule('POD Management') },
    { name: 'Material Return Management', icon: <AlertTriangle size={20} />, onClick: () => setActiveModule('Material Return Management') },
    { name: 'Invoice Management', icon: <FileText size={20} />, onClick: () => setActiveModule('Invoice Management') },
    { name: 'Accounts Receivable', icon: <CreditCard size={20} />, onClick: () => setActiveModule('Accounts Receivable') },
    { name: 'Payment Collection', icon: <CreditCard size={20} />, onClick: () => setActiveModule('Payment Collection') },
    { name: 'Tally Integration', icon: <RefreshCw size={20} />, onClick: () => setActiveModule('Tally Integration') },
    { name: 'Reports', icon: <BarChart size={20} />, onClick: () => setActiveModule('Reports') },
    { name: 'Analytics', icon: <BarChart size={20} />, onClick: () => setActiveModule('Analytics') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "TOTAL CUSTOMER ORDERS", 
      value: "245", 
      trend: "↑ 12.5% vs last month", 
      icon: ShoppingCart, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-600"
    },
    { 
      title: "PENDING CUSTOMER PO", 
      value: "38", 
      trend: "↑ 8.3% vs last month", 
      icon: FileCheck, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-600"
    },
    { 
      title: "READY FOR DISPATCH", 
      value: "22", 
      trend: "↑ 15.2% vs last month", 
      icon: Truck, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-600"
    },
    { 
      title: "IN PRODUCTION", 
      value: "18", 
      trend: "↑ 6.1% vs last month", 
      icon: Factory, 
      bgColor: "bg-sky-100/70",
      iconColor: "text-sky-600"
    },
    { 
      title: "IN TRANSIT", 
      value: "16", 
      trend: "↑ 7.4% vs last month", 
      icon: Truck, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-indigo-600"
    },
    { 
      title: "DELIVERED ORDERS", 
      value: "148", 
      trend: "↑ 18.7% vs last month", 
      icon: CheckCircle, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-600"
    },
    { 
      title: "PENDING INVOICES", 
      value: "26", 
      trend: "↑ 9.5% vs last month", 
      icon: FileText, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-600"
    },
    { 
      title: "ACCOUNTS RECEIVABLE", 
      value: "₹54.80L", 
      trend: "↑ 13.6% vs last month", 
      icon: CreditCard, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-600"
    },
    { 
      title: "REVENUE COLLECTION", 
      value: "₹1.82Cr", 
      trend: "↑ 16.3% vs last month", 
      icon: CreditCard, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-indigo-600"
    },
    { 
      title: "OVERDUE PAYMENTS", 
      value: "₹18.75L", 
      trend: "↑ 11.2% vs last month", 
      icon: AlertTriangle, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-600"
    },
    { 
      title: "MATERIAL RETURNS", 
      value: "6", 
      trend: "↑ 5.2% vs last month", 
      icon: RefreshCw, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-600"
    },
    { 
      title: "CREDIT NOTES", 
      value: "4", 
      trend: "↑ 3.1% vs last month", 
      icon: FileText, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-600"
    }
  ];

  const modules = [
    {
      name: '1. Customer Purchase Orders',
      desc: 'Manage customer purchase orders from creation to approval.',
      icon: FileCheck,
      variant: 'crm' as const,
      badge: 'Pending: 38',
      badgeColorClass: 'bg-indigo-50/50 text-black border-indigo-200/50'
    },
    {
      name: '2. Sales Order Management',
      desc: 'Create, manage and track sales orders.',
      icon: ShoppingCart,
      variant: 'crm' as const,
      badge: 'Open Orders: 52',
      badgeColorClass: 'bg-emerald-50/50 text-emerald-700 border-emerald-200/50'
    },
    {
      name: '3. Customer Verification',
      desc: 'Verify credit limit, GST and customer details.',
      icon: UserCheck,
      variant: 'crm' as const,
      badge: 'Pending: 15',
      badgeColorClass: 'bg-amber-50/50 text-amber-700 border-amber-200/50'
    },
    {
      name: '4. Production Requirement',
      desc: 'Raise and track production requirements.',
      icon: Factory,
      variant: 'production' as const,
      badge: 'Pending: 18',
      badgeColorClass: 'bg-indigo-50/50 text-blue-700 border-blue-200/50'
    },
    {
      name: '5. Purchase Requirement',
      desc: 'Material shortage, indent and purchase request.',
      icon: ClipboardList,
      variant: 'procurement' as const,
      badge: 'Pending: 21',
      badgeColorClass: 'bg-amber-50/50 text-amber-700 border-amber-200/50'
    },
    {
      name: '6. Inventory Verification',
      desc: 'Check available, reserved and FG stock.',
      icon: Package,
      variant: 'inventory' as const,
      badge: 'Low Stock: 14',
      badgeColorClass: 'bg-rose-50/50 text-rose-700 border-rose-200/50'
    },
    {
      name: '7. Dispatch Management',
      desc: 'Plan dispatch, generate documents and approve.',
      icon: Truck,
      variant: 'logistics' as const,
      badge: 'Pending: 22',
      badgeColorClass: 'bg-sky-50/50 text-sky-800 border-sky-200/50'
    },
    {
      name: '8. Transport Allocation',
      desc: 'Allocate transport, vehicle and freight details.',
      icon: Truck,
      variant: 'logistics' as const,
      badge: 'Pending: 16',
      badgeColorClass: 'bg-amber-50/50 text-amber-700 border-amber-200/50'
    },
    {
      name: '9. Delivery Tracking',
      desc: 'Track deliveries, expected dates and status.',
      icon: Clock,
      variant: 'logistics' as const,
      badge: 'In Transit: 16',
      badgeColorClass: 'bg-indigo-50/50 text-black border-indigo-200/50'
    },
    {
      name: '10. POD Management',
      desc: 'Manage POD collection and verification.',
      icon: FileText,
      variant: 'logistics' as const,
      badge: 'Pending: 19',
      badgeColorClass: 'bg-amber-50/50 text-amber-600 border-amber-200/50'
    },
    {
      name: '11. Invoice Management',
      desc: 'Generate, approve and share invoices.',
      icon: FileText,
      variant: 'finance' as const,
      badge: 'Pending: 26',
      badgeColorClass: 'bg-indigo-50/50 text-indigo-600 border-indigo-200/50'
    },
    {
      name: '12. Accounts Receivable',
      desc: 'Track outstanding, overdue and customer dues.',
      icon: CreditCard,
      variant: 'finance' as const,
      badge: 'Overdue: 12',
      badgeColorClass: 'bg-rose-50/50 text-rose-700 border-rose-200/50'
    },
    {
      name: '13. Payment Collection',
      desc: 'Record payments, receipts and update ledgers.',
      icon: CreditCard,
      variant: 'finance' as const,
      badge: 'Today: ₹12.40L',
      badgeColorClass: 'bg-indigo-50/50 text-indigo-600 border-indigo-200/50'
    },
    {
      name: '14. Material Return Management',
      desc: 'Handle material returns, credit notes and adjustments.',
      icon: AlertTriangle,
      variant: 'crm' as const,
      badge: 'Pending: 6',
      badgeColorClass: 'bg-amber-50/50 text-amber-700 border-amber-200/50'
    },
    {
      name: '15. Tally Integration',
      desc: 'Integrate sales, receipts and outstanding with Tally.',
      icon: RefreshCw,
      variant: 'finance' as const,
      badge: 'Last Sync: Today',
      badgeColorClass: 'bg-emerald-50/50 text-emerald-700 border-emerald-200/50'
    },
    {
      name: '16. Sales Reports & Analytics',
      desc: 'View reports, analytics and business insights.',
      icon: BarChart,
      variant: 'director' as const,
      badge: 'Reports: 28',
      badgeColorClass: 'bg-indigo-50/50 text-indigo-600 border-indigo-200/50'
    }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="SALES & REVENUE MANAGEMENT" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="crm">
        <GenericDataSheet moduleName={activeModule} variant="crm" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="SALES & REVENUE MANAGEMENT" onBack={onBack} sidebarLinks={sidebarLinks} variant="crm">
        {/* Elegant Page Header Area */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight">
            Welcome to Sales Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1.5 leading-relaxed font-normal font-serif">
            Complete visibility of Sales Order to Revenue Collection lifecycle.
          </p>
        </div>

        {/* 12 KPI Summary Cards matching layout perfectly */}
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

        {/* Modules 4-Column Responsive Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod) => (
            <ERPModuleCard 
              key={mod.name} 
              name={mod.name} 
              icon={mod.icon} 
              desc={mod.desc} 
              variant={mod.variant} 
              isInner={true}
              badge={mod.badge}
              badgeColorClass={mod.badgeColorClass}
              onClick={() => setActiveModule(mod.name)}
            />
          ))}
        </section>
    </Layout>
  );
}
