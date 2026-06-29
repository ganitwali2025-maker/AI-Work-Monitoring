import React from 'react';
import { 
  ShoppingCart, 
  FileText, 
  Package, 
  Factory, 
  Landmark, 
  Briefcase, 
  Truck, 
  Users, 
  Megaphone, 
  FlaskConical,
  FileBarChart
} from 'lucide-react';
import AIAgentCard from './AIAgentCard';

interface Props {
  userRole?: string;
}

export default function ReportingCenter({ userRole = 'admin' }: Props) {
  const allReports = [
    { name: 'Sales Reports', icon: ShoppingCart, desc: 'Sales performance, order book, revenue tracking, and regional breakdown.', badge: '', badgeColorClass: 'bg-blue-100/70 text-blue-700 border-blue-200/60', variant: 'sales' as const },
    { name: 'Purchase Reports', icon: FileText, desc: 'Vendor performance, indent status, cost variance, and material receipt.', badge: '', badgeColorClass: 'bg-amber-100/70 text-amber-700 border-amber-200/60', variant: 'procurement' as const },
    { name: 'Inventory Reports', icon: Package, desc: 'Stock valuation, aging analysis, slow-moving items, and stock-outs.', badge: '', badgeColorClass: 'bg-emerald-100/70 text-emerald-700 border-emerald-200/60', variant: 'inventory' as const },
    { name: 'Production Reports', icon: Factory, desc: 'Machine utilization, shift yields, rejection rates, and WIP status.', badge: '', badgeColorClass: 'bg-sky-100/70 text-sky-700 border-sky-200/60', variant: 'production' as const },
    { name: 'Finance Reports', icon: Landmark, desc: 'P&L, cash flow, receivable aging, payable aging, and GST summaries.', badge: '', badgeColorClass: 'bg-teal-100/70 text-teal-700 border-teal-200/60', variant: 'finance' as const },
    { name: 'HR Reports', icon: Briefcase, desc: 'Attendance, payroll summaries, overtime, and employee performance.', badge: '', badgeColorClass: 'bg-rose-100/70 text-rose-700 border-rose-200/60', variant: 'hr' as const },
    { name: 'Logistics Reports', icon: Truck, desc: 'Dispatch tracking, freight costs, delivery delays, and vehicle metrics.', badge: '', badgeColorClass: 'bg-indigo-100/70 text-indigo-700 border-indigo-200/60', variant: 'logistics' as const },
    { name: 'CRM Reports', icon: Users, desc: 'Lead conversion, inquiry tracking, follow-up status, and support SLA.', badge: '', badgeColorClass: 'bg-purple-100/70 text-purple-700 border-purple-200/60', variant: 'crm' as const },
    { name: 'Marketing Reports', icon: Megaphone, desc: 'Campaign ROI, traffic sources, lead generation cost, and engagement.', badge: '', badgeColorClass: 'bg-fuchsia-100/70 text-fuchsia-700 border-fuchsia-200/60', variant: 'marketing' as const },
    { name: 'Laboratory Reports', icon: FlaskConical, desc: 'Test results, parameter deviations, calibration status, and QC data.', badge: '', badgeColorClass: 'bg-cyan-100/70 text-cyan-700 border-cyan-200/60', variant: 'laboratory' as const },
  ];

  const reports = allReports.filter(report => {
    if (!userRole || userRole === 'admin') return true;
    if (userRole === 'purchase' && report.variant === 'procurement') return true;
    if (report.variant === userRole) return true;
    return false;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
          <FileBarChart size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-serif text-gray-900">Reporting Center</h2>
          <p className="text-sm text-gray-500">Centralized hub for all departmental reports, analytics, and automated schedules.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 px-1 md:px-0">
        {reports.map((report, index) => (
          <AIAgentCard
            key={report.name}
            name={report.name}
            icon={report.icon}
            desc={report.desc}
            badge={report.badge}
            badgeColorClass={report.badgeColorClass}
            variant={report.variant}
            isInner={true}
            hideAgentText={true}
            index={index}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
