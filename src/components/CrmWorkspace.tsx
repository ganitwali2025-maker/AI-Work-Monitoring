import { useState, useEffect } from 'react';
import { 
  UserPlus,
  ClipboardList,
  FileText,
  PhoneCall,
  UserCheck,
  Headset,
  Settings,
  LayoutDashboard,
  Calendar,
  Users
} from 'lucide-react';
import Layout from './Layout';
import ERPModuleCard from './ERPModuleCard';
import LeadManagementSheet from './LeadManagementSheet';
import GenericDataSheet from './GenericDataSheet';

export default function CrmWorkspace({ onBack, initialMenu = 'CRM Dashboard' }: { onBack: () => void, initialMenu?: string }) {
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [activeMenu, setActiveMenu] = useState(initialMenu);

  const handleBack = () => {
    if (activeMenu !== 'CRM Dashboard') {
      setActiveMenu('CRM Dashboard');
    } else {
      onBack();
    }
  };

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
    { name: 'CRM Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveMenu('CRM Dashboard') },
    { name: 'Lead Management', icon: <UserPlus size={20} />, onClick: () => setActiveMenu('Lead Management') },
    { name: 'Inquiry Management', icon: <ClipboardList size={20} />, onClick: () => setActiveMenu('Inquiry Management') },
    { name: 'Quotation Management', icon: <FileText size={20} />, onClick: () => setActiveMenu('Quotation Management') },
    { name: 'Follow-up Management', icon: <PhoneCall size={20} />, onClick: () => setActiveMenu('Follow-up Management') },
    { name: 'Customer Registration', icon: <UserCheck size={20} />, onClick: () => setActiveMenu('Customer Registration') },
    { name: 'Customer Support', icon: <Headset size={20} />, onClick: () => setActiveMenu('Customer Support') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveMenu('Settings') }
  ];

  const kpis = [
    { 
      title: "TOTAL LEADS", 
      value: "340", 
      trend: "↑ 12.5% vs last month", 
      icon: Users, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-600"
    },
    { 
      title: "ACTIVE INQUIRIES", 
      value: "85", 
      trend: "↑ 8.3% vs last month", 
      icon: ClipboardList, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-600"
    },
    { 
      title: "QUOTATIONS SENT", 
      value: "48", 
      trend: "↑ 15.2% vs last month", 
      icon: FileText, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-600"
    },
    { 
      title: "FOLLOW-UPS SCHEDULED", 
      value: "24", 
      trend: "↑ 6.1% vs last month", 
      icon: PhoneCall, 
      bgColor: "bg-indigo-100/70",
      iconColor: "text-indigo-600"
    },
    { 
      title: "REGISTERED CUSTOMERS", 
      value: "192", 
      trend: "↑ 18.7% vs last month", 
      icon: UserCheck, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-600"
    },
    { 
      title: "RESOLVED TICKETS", 
      value: "94%", 
      trend: "↑ 7.4% vs last month", 
      icon: Headset, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-600"
    }
  ];

  const modules = [
    { name: 'Lead Management', icon: UserPlus, desc: 'Acquire, score, and transition prospects from traffic campaigns.' },
    { name: 'Inquiry Management', icon: ClipboardList, desc: 'Log formal item requests, client quantities, budget scopes, and specifications.' },
    { name: 'Quotation Management', icon: FileText, desc: 'Build clean itemized price estimations, tax templates, and discounts.' },
    { name: 'Follow-up Management', icon: PhoneCall, desc: 'Register callbacks, record logs, and set automated reminders.' },
    { name: 'Customer Registration', icon: UserCheck, desc: 'Transition closed-won clients with secure KYC and business details.' },
    { name: 'Customer Support', icon: Headset, desc: 'Open support tickets, verify SLA timers, and capture system resolution logs.' },
  ];

  if (activeMenu === 'CRM Dashboard') {
    return (
      <Layout activeModule={activeMenu} departmentName="CRM & CUSTOMER MANAGEMENT" onBack={onBack} sidebarLinks={sidebarLinks} variant="crm">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight">
            Welcome to CRM Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1.5 leading-relaxed font-normal font-serif">
            Complete visibility of Customer Relationships, Leads, and Follow-ups.
          </p>
        </div>

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

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod) => (
            <ERPModuleCard 
              key={mod.name} 
              name={mod.name} 
              icon={mod.icon} 
              desc={mod.desc} 
              variant="crm" 
              isInner={true}
              onClick={() => setActiveMenu(mod.name)}
            />
          ))}
        </section>
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeMenu} departmentName="CRM & CUSTOMER MANAGEMENT" onBack={handleBack} sidebarLinks={sidebarLinks} variant="crm">
        {activeMenu === 'Lead Management' ? (
          <div className="h-[calc(100vh-144px)] w-full min-w-0 flex flex-col overflow-hidden">
            <LeadManagementSheet />
          </div>
        ) : (
          <div className="h-[calc(100vh-144px)] w-full min-w-0 flex flex-col overflow-hidden">
            <GenericDataSheet moduleName={activeMenu} variant="crm" />
          </div>
        )}
    </Layout>
  );
}
