import React, { useState } from 'react';
import { 
  UserCheck,
  Building2,
  Phone,
  MapPin,
  FileText,
  Landmark,
  CreditCard,
  Briefcase,
  History,
  Receipt,
  Users,
  Folder,
  BarChart,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import Layout from './Layout';
import GenericDataSheet from './GenericDataSheet';
import ERPModuleCard from './ERPModuleCard';

export default function CustomerMasterWorkspace({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);
  const sidebarLinks = [
    { name: 'Customer Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Customer Registration', icon: <UserCheck size={20} />, onClick: () => setActiveModule('Customer Registration') },
    { name: 'Company Profile', icon: <Building2 size={20} />, onClick: () => setActiveModule('Company Profile') },
    { name: 'Contact Management', icon: <Phone size={20} />, onClick: () => setActiveModule('Contact Management') },
    { name: 'Address Management', icon: <MapPin size={20} />, onClick: () => setActiveModule('Address Management') },
    { name: 'GST & Tax Details', icon: <FileText size={20} />, onClick: () => setActiveModule('GST & Tax Details') },
    { name: 'Bank Details', icon: <Landmark size={20} />, onClick: () => setActiveModule('Bank Details') },
    { name: 'Credit Management', icon: <CreditCard size={20} />, onClick: () => setActiveModule('Credit Management') },
    { name: 'Business Profile', icon: <Briefcase size={20} />, onClick: () => setActiveModule('Business Profile') },
    { name: 'Order History', icon: <History size={20} />, onClick: () => setActiveModule('Order History') },
    { name: 'Payment History', icon: <Receipt size={20} />, onClick: () => setActiveModule('Payment History') },
    { name: 'Relationship Management', icon: <Users size={20} />, onClick: () => setActiveModule('Relationship Management') },
    { name: 'Customer Documents', icon: <Folder size={20} />, onClick: () => setActiveModule('Customer Documents') },
    { name: 'Customer Analytics', icon: <BarChart size={20} />, onClick: () => setActiveModule('Customer Analytics') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "TOTAL CUSTOMERS", 
      value: "250", 
      trend: "↑ 8.5% vs last month", 
      icon: Users, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-600"
    },
    { 
      title: "ACTIVE CUSTOMERS", 
      value: "210", 
      trend: "↑ 6.2% vs last month", 
      icon: UserCheck, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-600"
    },
    { 
      title: "CREDIT CUSTOMERS", 
      value: "150", 
      trend: "↑ 12.4% vs last month", 
      icon: CreditCard, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-600"
    },
    { 
      title: "OUTSTANDING", 
      value: "₹45L", 
      trend: "↑ 14.8% vs last month", 
      icon: CreditCard, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-600"
    }
  ];

  const modules = [
    { name: 'Customer Registration', icon: UserCheck },
    { name: 'Company Profile', icon: Building2 },
    { name: 'Contact Management', icon: Phone },
    { name: 'Address Management', icon: MapPin },
    { name: 'GST & Tax Details', icon: FileText },
    { name: 'Bank Details', icon: Landmark },
    { name: 'Credit Management', icon: CreditCard },
    { name: 'Business Profile', icon: Briefcase },
    { name: 'Order History', icon: History },
    { name: 'Payment History', icon: Receipt },
    { name: 'Relationship Management', icon: Users },
    { name: 'Customer Documents', icon: Folder },
    { name: 'Customer Analytics', icon: BarChart }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="CUSTOMER MASTER" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="crm">
        <GenericDataSheet moduleName={activeModule} variant="crm" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="CUSTOMER MASTER" onBack={onBack} sidebarLinks={sidebarLinks} variant="crm">
        {/* Content */}
        <header className="mb-8 select-none">
          <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Welcome to Customer Dashboard</h2>
          <p className="text-sm text-gray-500 font-normal">Manage complete customer profile, company info, tax details, and business relationship.</p>
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
            <ERPModuleCard key={mod.name} name={mod.name} icon={mod.icon} desc={`Access module functionalities for ${mod.name}...`} variant="crm"  onClick={() => setActiveModule(mod.name)} />
          ))}
        </section>
    </Layout>
  );
}
