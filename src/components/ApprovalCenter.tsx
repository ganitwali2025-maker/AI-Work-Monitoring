import React, { useState } from 'react';
import { 
  ShoppingCart, 
  FileText, 
  Landmark, 
  Briefcase, 
  UserCheck, 
  Package, 
  Factory, 
  Truck, 
  FlaskConical,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';
import AIAgentCard from './AIAgentCard';
import GenericDataSheet from './GenericDataSheet';

interface Props {
  userRole?: string;
}

export default function ApprovalCenter({ userRole = 'admin' }: Props) {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const allApprovals = [
    { name: 'Lead Approval', icon: CheckSquare, desc: 'Approve new marketing leads, verify assignments and marketing head authorization.', badge: '', badgeColorClass: 'bg-emerald-100/70 text-emerald-700 border-emerald-200/60', variant: 'marketing' as const },
    { name: 'Purchase Approvals', icon: FileText, desc: 'Review and approve purchase requisitions, POs, and vendor payments.', badge: '', badgeColorClass: 'bg-amber-100/70 text-amber-700 border-amber-200/60', variant: 'procurement' as const },
    { name: 'Sales Approvals', icon: ShoppingCart, desc: 'Authorize sales orders, custom discounts, and credit extensions.', badge: '', badgeColorClass: 'bg-blue-100/70 text-blue-700 border-blue-200/60', variant: 'sales' as const },
    { name: 'Finance Approvals', icon: Landmark, desc: 'Approve expense claims, budget overrides, and journal entries.', badge: '', badgeColorClass: 'bg-teal-100/70 text-teal-700 border-teal-200/60', variant: 'finance' as const },
    { name: 'HR Approvals', icon: Briefcase, desc: 'Review leave requests, overtime claims, and hiring requisitions.', badge: '', badgeColorClass: 'bg-rose-100/70 text-rose-700 border-rose-200/60', variant: 'hr' as const },
    { name: 'Customer Approvals', icon: UserCheck, desc: 'Verify KYC documents and approve new customer onboarding.', badge: '', badgeColorClass: 'bg-purple-100/70 text-purple-700 border-purple-200/60', variant: 'crm' as const },
    { name: 'Vendor Approvals', icon: UserCheck, desc: 'Authorize vendor registrations and contract renewals.', badge: '', badgeColorClass: 'bg-blue-100/70 text-blue-700 border-blue-200/60', variant: 'vendor-master' as const },
    { name: 'Inventory Approvals', icon: Package, desc: 'Approve stock adjustments, scrap declarations, and transfers.', badge: '', badgeColorClass: 'bg-emerald-100/70 text-emerald-700 border-emerald-200/60', variant: 'inventory' as const },
    { name: 'Production Approvals', icon: Factory, desc: 'Authorize production plans, BOM changes, and maintenance downtime.', badge: '', badgeColorClass: 'bg-sky-100/70 text-sky-700 border-sky-200/60', variant: 'production' as const },
    { name: 'Logistics Approvals', icon: Truck, desc: 'Approve special freight charges and external transporter contracts.', badge: '', badgeColorClass: 'bg-indigo-100/70 text-indigo-700 border-indigo-200/60', variant: 'logistics' as const },
    { name: 'Laboratory Approvals', icon: FlaskConical, desc: 'Authorize final test certificates and calibration logs.', badge: '', badgeColorClass: 'bg-cyan-100/70 text-cyan-700 border-cyan-200/60', variant: 'laboratory' as const },
  ];

  const approvals = allApprovals.filter(app => {
    if (!userRole || userRole === 'admin') return true;
    if (userRole === 'purchase' && app.variant === 'procurement') return true;
    if (app.variant === userRole) return true;
    return false;
  });

  const leadApprovalColumns = [
    'Lead ID',
    'Company Name',
    'Executive Name',
    'Marketing Head',
    'Approval Status',
    'Approval Date',
    'Approval Time',
    'Remarks'
  ];

  if (activeModule === 'Lead Approval') {
    return (
      <GenericDataSheet
        moduleName="Approval Center"
        columns={leadApprovalColumns}
        onBack={() => setActiveModule(null)}
        variant="marketing"
      />
    );
  }

  if (activeModule) {
    const activeData = approvals.find(a => a.name === activeModule);
    return (
      <GenericDataSheet
        moduleName={activeModule}
        columns={['ID', 'Status', 'Date', 'Time', 'Remarks']}
        onBack={() => setActiveModule(null)}
        variant={activeData?.variant || 'crm'}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-serif text-gray-900">Approval Center</h2>
          <p className="text-sm text-gray-500">Centralized hub for cross-departmental authorizations, escalations, and compliance workflows.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 px-1 md:px-0">
        {approvals.map((approval, index) => (
          <AIAgentCard
            key={approval.name}
            name={approval.name}
            icon={approval.icon}
            desc={approval.desc}
            badge={approval.badge}
            badgeColorClass={approval.badgeColorClass}
            variant={approval.variant}
            isInner={true}
            hideAgentText={true}
            index={index}
            onClick={() => setActiveModule(approval.name)}
          />
        ))}
      </div>
    </div>
  );
}
