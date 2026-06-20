import React, { useState, useEffect } from 'react';
import { 
  Building2,
  UserCheck,
  Phone,
  MapPin,
  FileText,
  Landmark,
  ListChecks,
  History,
  ShieldCheck,
  Receipt,
  FileClock,
  Folder,
  Users,
  BarChart,
  Settings,
  LayoutDashboard,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Truck,
  CreditCard,
  ShoppingCart
} from 'lucide-react';
import Layout from './Layout';
import GenericDataSheet from './GenericDataSheet';
import ERPModuleCard from './ERPModuleCard';

export default function VendorMasterWorkspace({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
      setFormattedDate(now.toLocaleDateString('en-GB', dateOptions));
      
      const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
      const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      const dayStr = now.toLocaleDateString('en-US', dayOptions);
      const timeStr = now.toLocaleTimeString('en-US', timeOptions);
      setFormattedTime(`${dayStr}, ${timeStr}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const sidebarLinks = [
    { name: 'Vendor Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Vendor Registration', icon: <UserCheck size={20} />, onClick: () => setActiveModule('Vendor Registration') },
    { name: 'Vendor Profile', icon: <Building2 size={20} />, onClick: () => setActiveModule('Vendor Profile') },
    { name: 'Company Information', icon: <Building2 size={20} />, onClick: () => setActiveModule('Company Information') },
    { name: 'Contact Persons', icon: <Phone size={20} />, onClick: () => setActiveModule('Contact Persons') },
    { name: 'GST & Compliance', icon: <FileText size={20} />, onClick: () => setActiveModule('GST & Compliance') },
    { name: 'Bank Details', icon: <Landmark size={20} />, onClick: () => setActiveModule('Bank Details') },
    { name: 'Vendor Categories', icon: <ListChecks size={20} />, onClick: () => setActiveModule('Vendor Categories') },
    { name: 'Purchase History', icon: <History size={20} />, onClick: () => setActiveModule('Purchase History') },
    { name: 'Quality Performance', icon: <ShieldCheck size={20} />, onClick: () => setActiveModule('Quality Performance') },
    { name: 'Payment History', icon: <Receipt size={20} />, onClick: () => setActiveModule('Payment History') },
    { name: 'Documents', icon: <Folder size={20} />, onClick: () => setActiveModule('Documents') },
    { name: 'Vendor Analytics', icon: <BarChart size={20} />, onClick: () => setActiveModule('Vendor Analytics') },
    { name: 'Reports', icon: <BarChart size={20} />, onClick: () => setActiveModule('Reports') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "TOTAL VENDORS", 
      value: "150", 
      trend: "↑ 8 new this month", 
      icon: Building2, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-600"
    },
    { 
      title: "ACTIVE VENDORS", 
      value: "135", 
      trend: "↑ 90% active rate", 
      icon: UserCheck, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-600"
    },
    { 
      title: "APPROVED VENDORS", 
      value: "120", 
      trend: "↑ 3 approved today", 
      icon: CheckCircle, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-600"
    },
    { 
      title: "PENDING APPROVALS", 
      value: "15", 
      trend: "↓ 2 resolved today", 
      icon: Clock, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-600"
    },
    { 
      title: "BLOCKED VENDORS", 
      value: "5", 
      trend: "↓ 1 unblocked yesterday", 
      icon: AlertTriangle, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    },
    { 
      title: "OUTSTANDING PAYABLES", 
      value: "₹30L", 
      trend: "↓ 4.2% vs last week", 
      icon: CreditCard, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-600"
    },
    { 
      title: "OPEN POs", 
      value: "45", 
      trend: "↑ 5 POs raised today", 
      icon: ShoppingCart, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-600"
    },
    { 
      title: "VENDOR RATING", 
      value: "4.5/5", 
      trend: "↑ 0.2 vs last quarter", 
      icon: ShieldCheck, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-600"
    },
    { 
      title: "PENDING DELIVERIES", 
      value: "10", 
      trend: "↓ 2 expected tonight", 
      icon: Truck, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-indigo-600"
    },
    { 
      title: "PERFORMANCE SCORE", 
      value: "92%", 
      trend: "↑ 1.5% vs last month", 
      icon: BarChart, 
      bgColor: "bg-teal-100/70",
      iconColor: "text-teal-600"
    }
  ];

  const modules = [
    { name: 'Vendor Registration', icon: UserCheck },
    { name: 'Company Profile', icon: Building2 },
    { name: 'Contact Management', icon: Phone },
    { name: 'Address Management', icon: MapPin },
    { name: 'GST & Compliance', icon: FileText },
    { name: 'Bank Details', icon: Landmark },
    { name: 'Categories & Material', icon: ListChecks },
    { name: 'Purchase History', icon: History },
    { name: 'Delivery Performance', icon: Truck },
    { name: 'Quality Performance', icon: ShieldCheck },
    { name: 'Payment History', icon: Receipt },
    { name: 'Approval History', icon: FileClock },
    { name: 'Vendor Documents', icon: Folder },
    { name: 'Relationship Mgmt', icon: Users },
    { name: 'Vendor Analytics', icon: BarChart }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="VENDOR MASTER" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="vendor-master">
        <GenericDataSheet moduleName={activeModule} variant="vendor-master" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="VENDOR MASTER" onBack={onBack} sidebarLinks={sidebarLinks} variant="vendor-master">
        {/* Content */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
          <div>
            <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Welcome to Vendor Dashboard</h2>
            <p className="text-sm text-gray-500 font-normal">Manage complete supplier profile, compliance, procurement history, and performance.</p>
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map(mod => (
            <ERPModuleCard key={mod.name} name={mod.name} icon={mod.icon} desc={`Access module functionalities for ${mod.name}...`} variant="vendor-master"  onClick={() => setActiveModule(mod.name)} />
          ))}
        </section>
    </Layout>
  );
}
