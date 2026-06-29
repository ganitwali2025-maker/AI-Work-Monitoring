import React, { useState, useEffect } from 'react';
import { 
  ClipboardList,
  Activity,
  ShieldCheck,
  CheckCircle,
  Wrench,
  FileText,
  Search,
  AlertTriangle,
  IndianRupee,
  LayoutDashboard,
  Settings,
  Calendar,
  FlaskConical,
  TestTube
} from 'lucide-react';
import Layout from './Layout';
import GenericDataSheet from './GenericDataSheet';
import ERPModuleCard from './ERPModuleCard';

export default function LaboratoryWorkspace({ onBack, initialMenu, formattedDate, formattedTime }: { onBack: () => void, initialMenu?: string, formattedDate?: string, formattedTime?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);
  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);

  const sidebarLinks = [
    { name: 'Lab Dashboard', icon: <LayoutDashboard size={20} />, onClick: () => setActiveModule(null) },
    { name: 'Sample Registration', icon: <ClipboardList size={20} />, onClick: () => setActiveModule('Sample Registration') },
    { name: 'Test Management', icon: <Activity size={20} />, onClick: () => setActiveModule('Test Management') },
    { name: 'Quality Control', icon: <ShieldCheck size={20} />, onClick: () => setActiveModule('Quality Control') },
    { name: 'NABL Compliance', icon: <CheckCircle size={20} />, onClick: () => setActiveModule('NABL Compliance') },
    { name: 'Calibration Tracking', icon: <Wrench size={20} />, onClick: () => setActiveModule('Calibration Tracking') },
    { name: 'Report Generation', icon: <FileText size={20} />, onClick: () => setActiveModule('Report Generation') },
    { name: 'Audit Management', icon: <Search size={20} />, onClick: () => setActiveModule('Audit Management') },
    { name: 'Settings', icon: <Settings size={20} />, onClick: () => setActiveModule('Settings') }
  ];

  const kpis = [
    { 
      title: "PENDING SAMPLES", 
      value: "128", 
      trend: "↑ 5.2% vs last week", 
      icon: ClipboardList, 
      bgColor: "bg-blue-100/70",
      iconColor: "text-blue-700"
    },
    { 
      title: "COMPLETED TESTS", 
      value: "452", 
      trend: "↑ 12.5% vs last week", 
      icon: Activity, 
      bgColor: "bg-emerald-100/70",
      iconColor: "text-emerald-700"
    },
    { 
      title: "FAILED TESTS", 
      value: "14", 
      trend: "↓ 2.1% vs last week", 
      icon: AlertTriangle, 
      bgColor: "bg-rose-100/70",
      iconColor: "text-rose-700"
    },
    { 
      title: "CALIBRATION DUE", 
      value: "8", 
      trend: "↑ 3 equipments", 
      icon: Wrench, 
      bgColor: "bg-amber-100/70",
      iconColor: "text-amber-700"
    },
    { 
      title: "REVENUE GENERATED", 
      value: "₹4.2L", 
      trend: "↑ 18.3% vs last month", 
      icon: IndianRupee, 
      bgColor: "bg-purple-100/70",
      iconColor: "text-purple-700"
    }
  ];

  const modules = [
    { name: 'Sample Registration', icon: ClipboardList, desc: 'Register incoming materials and assign barcodes.' },
    { name: 'Test Management', icon: Activity, desc: 'Perform tests, record results, and verify parameter compliance.' },
    { name: 'Quality Control', icon: ShieldCheck, desc: 'Monitor internal QC metrics and standard deviation data.' },
    { name: 'NABL Compliance', icon: CheckCircle, desc: 'Manage accreditations, standard methods, and scope.' },
    { name: 'Calibration Tracking', icon: Wrench, desc: 'Track lab equipment calibration schedules and records.' },
    { name: 'Report Generation', icon: FileText, desc: 'Generate and authorize final test certificates.' },
    { name: 'Audit Management', icon: Search, desc: 'Prepare and manage internal/external lab audits.' }
  ];

  if (activeModule) {
    return (
      <Layout activeModule={activeModule} departmentName="LABORATORY & LIMS" onBack={() => setActiveModule(null)} sidebarLinks={sidebarLinks} variant="laboratory">
        <GenericDataSheet moduleName={activeModule} variant="laboratory" />
      </Layout>
    );
  }

  return (
    <Layout activeModule={activeModule} departmentName="LABORATORY & LIMS" onBack={onBack} sidebarLinks={sidebarLinks} variant="laboratory">
        {/* Content */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
          <div>
            <h2 className="text-3xl font-bold text-gray-950 font-serif tracking-tight leading-tight mb-2">Welcome to Lab Dashboard</h2>
            <p className="text-sm text-gray-500 font-normal">Manage samples, tests, quality control, and instrument calibrations.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm shrink-0 font-sans">
            <div className="w-9 h-9 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 shadow-xs">
              <Calendar size={18} />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-gray-900">{formattedDate || "17 Jun 2026"}</span>
              <span className="text-[10px] text-gray-400 font-medium mt-0.5">{formattedTime || "Wednesday, 05:30 PM"}</span>
            </div>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 font-serif">
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
            <ERPModuleCard key={mod.name} name={mod.name} icon={mod.icon} desc={mod.desc} variant="laboratory" onClick={() => setActiveModule(mod.name)} />
          ))}
        </section>
    </Layout>
  );
}
