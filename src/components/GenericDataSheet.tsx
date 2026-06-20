import React, { useState } from 'react';
import { Search, ChevronDown, Plus, CheckCircle, Clock, XCircle, FileText, Activity, User, UserCheck, ClipboardCheck } from 'lucide-react';

interface Props {
  moduleName: string;
  variant?: 'crm' | 'procurement' | 'inventory' | 'logistics' | 'production' | 'finance' | 'hr' | 'director' | 'vendor-master' | 'sales' | 'marketing' | 'laboratory';
}

const themeColors: Record<string, { header: string, tableHead: string, text: string, border: string }> = {
  crm: { header: 'from-[#A855F7] to-[#7E22CE]', tableHead: 'bg-[#A855F7]', text: 'text-[#A855F7]', border: 'border-t-[#A855F7]' },
  sales: { header: 'from-[#3B82F6] to-[#2563EB]', tableHead: 'bg-[#3B82F6]', text: 'text-[#3B82F6]', border: 'border-t-[#3B82F6]' },
  procurement: { header: 'from-[#F59E0B] to-[#D97706]', tableHead: 'bg-[#F59E0B]', text: 'text-[#F59E0B]', border: 'border-t-[#F59E0B]' },
  inventory: { header: 'from-[#10B981] to-[#047857]', tableHead: 'bg-[#10B981]', text: 'text-[#10B981]', border: 'border-t-[#10B981]' },
  logistics: { header: 'from-[#6366F1] to-[#4338CA]', tableHead: 'bg-[#6366F1]', text: 'text-[#6366F1]', border: 'border-t-[#6366F1]' },
  production: { header: 'from-[#0EA5E9] to-[#0369A1]', tableHead: 'bg-[#0EA5E9]', text: 'text-[#0EA5E9]', border: 'border-t-[#0EA5E9]' },
  finance: { header: 'from-[#14B8A6] to-[#0F766E]', tableHead: 'bg-[#14B8A6]', text: 'text-[#14B8A6]', border: 'border-t-[#14B8A6]' },
  hr: { header: 'from-[#F43F5E] to-[#BE123C]', tableHead: 'bg-[#F43F5E]', text: 'text-[#F43F5E]', border: 'border-t-[#F43F5E]' },
  director: { header: 'from-[#D946EF] to-[#A21CAF]', tableHead: 'bg-[#D946EF]', text: 'text-[#D946EF]', border: 'border-t-[#D946EF]' },
  'vendor-master': { header: 'from-[#5B6FFF] to-[#4055D8]', tableHead: 'bg-[#5B6FFF]', text: 'text-[#5B6FFF]', border: 'border-t-[#5B6FFF]' },
  marketing: { header: 'from-[#C026D3] to-[#86198F]', tableHead: 'bg-[#C026D3]', text: 'text-[#C026D3]', border: 'border-t-[#C026D3]' },
  laboratory: { header: 'from-[#06B6D4] to-[#0891B2]', tableHead: 'bg-[#06B6D4]', text: 'text-[#06B6D4]', border: 'border-t-[#06B6D4]' },
};


export default function GenericDataSheet({ moduleName, variant = 'crm' }: Props) {
  const [activeTab, setActiveTab] = useState('All Records');
  const theme = themeColors[variant] || themeColors.crm;
  
  // Clean module name by removing numbering (e.g. "1. Customer Purchase Orders" -> "Customer Purchase Orders")
  const cleanModuleName = moduleName.replace(/^\d+\.\s*/, '');
  
  // Create singular version for the add button (e.g. "Orders" -> "Order")
  let singularName = cleanModuleName;
  if (singularName.endsWith('s')) {
    singularName = singularName.slice(0, -1);
  }

  const tabs = [
    { name: 'All Records', icon: <Activity size={16} /> },
    { name: 'Pending', icon: <Clock size={16} /> },
    { name: 'Approved', icon: <CheckCircle size={16} /> },
    { name: 'Drafts', icon: <FileText size={16} /> },
    { name: 'Rejected/Cancelled', icon: <XCircle size={16} /> },
  ];

  // Create empty columns (e.g. 15 columns)
  const emptyColumns = Array.from({ length: 15 });

  // Define marketing specific data
  let specificColumns: string[] = [];
  let specificData: any[][] = [];

  if (variant === 'marketing') {
    if (cleanModuleName === 'Lead Pipeline') {
      specificColumns = ['Lead ID', 'Lead Name', 'Source', 'Date Generated', 'Assigned Exec', 'Status', 'Contact No'];
      specificData = [
        ['LD-1001', 'Rajesh Kumar', 'Google Ads', '20-Jun-2026', 'Rahul Sharma', 'New', '+91 9876543210'],
        ['LD-1002', 'Priya Singh', 'Facebook', '20-Jun-2026', 'Amit Patel', 'Contacted', '+91 8765432109'],
        ['LD-1003', 'TechVision Inc', 'LinkedIn', '19-Jun-2026', 'Sneha Gupta', 'Qualified', '+91 7654321098'],
        ['LD-1004', 'Manoj Desai', 'Organic Search', '19-Jun-2026', 'Rahul Sharma', 'New', '+91 6543210987'],
      ];
    } else if (cleanModuleName === 'Approval Center') {
      specificColumns = ['Approval ID', 'Request Type', 'Requested By', 'Amount/Budget', 'Date', 'Priority', 'Status'];
      specificData = [
        ['AP-801', 'Campaign Budget', 'Rahul Sharma', '₹50,000', '20-Jun-2026', 'High', 'Pending'],
        ['AP-802', 'Ad Creative', 'Sneha Gupta', '-', '19-Jun-2026', 'Medium', 'Approved'],
        ['AP-803', 'Vendor Payment', 'Amit Patel', '₹15,000', '18-Jun-2026', 'Low', 'Pending'],
      ];
    } else if (cleanModuleName === 'Customer CRM') {
      specificColumns = ['Customer ID', 'Name', 'Company', 'Industry', 'Last Contact', 'Status', 'LTV'];
      specificData = [
        ['CUS-001', 'Ankit Verma', 'TechCorp', 'IT', '19-Jun-2026', 'Active', '₹1,50,000'],
        ['CUS-002', 'Meera Reddy', 'DesignStudio', 'Media', '18-Jun-2026', 'Inactive', '₹45,000'],
        ['CUS-003', 'Vikram Singh', 'BuildIt', 'Construction', '15-Jun-2026', 'Active', '₹2,10,000'],
      ];
    } else if (cleanModuleName === 'Quotation Hub') {
      specificColumns = ['Quote ID', 'Vendor/Client', 'Service', 'Amount', 'Valid Until', 'Created By', 'Status'];
      specificData = [
        ['QT-501', 'AdSense Media', 'Billboards', '₹1,20,000', '30-Jun-2026', 'Amit Patel', 'Sent'],
        ['QT-502', 'PrintWorks', 'Brochures', '₹35,000', '25-Jun-2026', 'Sneha Gupta', 'Approved'],
        ['QT-503', 'DigitalBoost', 'SEO Services', '₹80,000', '28-Jun-2026', 'Rahul Sharma', 'Pending'],
      ];
    } else if (cleanModuleName === 'Workflow Approval') {
      specificColumns = ['Workflow ID', 'Process Name', 'Current Step', 'Pending With', 'Time Elapsed', 'Priority', 'Status'];
      specificData = [
        ['WF-101', 'New Product Launch', 'Budget Review', 'Director', '2 Days', 'High', 'In Progress'],
        ['WF-102', 'Q3 Social Media Plan', 'Content Approval', 'Marketing Head', '4 Hours', 'Medium', 'In Progress'],
        ['WF-103', 'Event Sponsorship', 'Legal Review', 'Legal Dept', '1 Day', 'High', 'In Progress'],
      ];
    } else if (cleanModuleName === 'Response Center') {
      specificColumns = ['Ticket ID', 'Channel', 'Customer Name', 'Query Type', 'Received Time', 'SLA Status', 'Assigned To'];
      specificData = [
        ['RC-201', 'Email', 'Rajesh Kumar', 'Pricing Inquiry', '10:30 AM', 'Within SLA', 'Rahul Sharma'],
        ['RC-202', 'WhatsApp', 'Priya Singh', 'Demo Request', '11:15 AM', 'Breached', 'Amit Patel'],
        ['RC-203', 'Website Chat', 'Manoj Desai', 'Support', '01:45 PM', 'Within SLA', 'Sneha Gupta'],
      ];
    } else if (cleanModuleName === 'PO Management') {
      specificColumns = ['PO Number', 'Vendor', 'Description', 'Total Amount', 'PO Date', 'Expected Delivery', 'Status'];
      specificData = [
        ['PO-9001', 'AdSense Media', 'Q3 Billboard Ads', '₹1,20,000', '15-Jun-2026', '01-Jul-2026', 'Approved'],
        ['PO-9002', 'PrintWorks', 'Marketing Collaterals', '₹35,000', '18-Jun-2026', '25-Jun-2026', 'Pending'],
        ['PO-9003', 'EventPro', 'Trade Show Booth', '₹2,50,000', '10-Jun-2026', '20-Jul-2026', 'Approved'],
      ];
    } else if (cleanModuleName === 'Performance Dashboard') {
      specificColumns = ['Metric', 'Current Value', 'Target', 'Variance', 'MoM Growth', 'Status'];
      specificData = [
        ['Total Leads', '856', '1,000', '-144', '+24.3%', 'On Track'],
        ['Conversion Rate', '10.4%', '12.0%', '-1.6%', '+1.2%', 'Needs Improvement'],
        ['CPA', '₹1,056', '₹1,000', '+₹56', '-5.4%', 'On Track'],
        ['Total Revenue', '₹8,50,000', '₹10,00,000', '-₹1,50,000', '+15.2%', 'On Track'],
      ];
    } else if (cleanModuleName === 'Work Tracker') {
      specificColumns = ['Task ID', 'Task Name', 'Assignee', 'Due Date', 'Project', 'Priority', 'Status'];
      specificData = [
        ['TSK-301', 'Finalize Q3 Ads', 'Rahul Sharma', '25-Jun-2026', 'Q3 Campaign', 'High', 'In Progress'],
        ['TSK-302', 'Update Email Templates', 'Sneha Gupta', '22-Jun-2026', 'Retention', 'Medium', 'Pending'],
        ['TSK-303', 'Vendor Contract Renewal', 'Amit Patel', '30-Jun-2026', 'Admin', 'High', 'Completed'],
      ];
    } else if (cleanModuleName === 'Team Operations') {
      specificColumns = ['Emp ID', 'Name', 'Role', 'Active Tasks', 'Performance Score', 'Attendance', 'Status'];
      specificData = [
        ['EMP-101', 'Rahul Sharma', 'Campaign Manager', '12', '95%', 'Present', 'Active'],
        ['EMP-102', 'Sneha Gupta', 'Content Strategist', '8', '88%', 'On Leave', 'Inactive'],
        ['EMP-103', 'Amit Patel', 'SEO Specialist', '15', '92%', 'Present', 'Active'],
      ];
    }
  }

  const hasSpecificData = specificColumns.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      
      {/* Header Area */}
      <div className={`bg-gradient-to-r ${theme.header} px-8 pt-6 pb-12 shrink-0 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-2xl font-serif font-bold text-white tracking-wide uppercase drop-shadow-sm">{cleanModuleName}</h2>
          </div>
        </div>
      </div>

      {/* Overlapping Tabs */}
      <div className="px-8 -mt-6 relative z-10 flex gap-2 overflow-x-auto pb-4 shrink-0 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all shadow-sm cursor-pointer whitespace-nowrap font-bold text-sm ${
                isActive 
                  ? 'bg-white text-gray-800 border-t border-x border-gray-200' 
                  : 'bg-[#F4F5F9] text-gray-500 hover:bg-gray-100 hover:text-gray-700 border border-transparent'
              }`}
            >
              {tab.icon} {tab.name}
            </button>
          );
        })}
        
        {/* Add New Button next to tabs */}
        <button 
          onClick={() => alert(`Add New ${singularName} form coming soon!`)}
          className="flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all shadow-sm cursor-pointer whitespace-nowrap font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white ml-2 border border-emerald-600"
        >
          <Plus size={16} /> Add New {singularName}
        </button>
        
        {/* Audit Button */}
        <button 
          onClick={() => alert('Opening Audit Sheet...')}
          className="flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all shadow-sm cursor-pointer whitespace-nowrap font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white ml-2 border border-amber-600"
        >
          <ClipboardCheck size={16} /> Audit
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white flex-1 flex flex-col -mt-[1px] border-t border-gray-200 min-h-0">
        
        {/* Search Bar */}
        <div className="px-8 py-5 border-b border-gray-100 shrink-0">
          <div className="relative max-w-sm">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={`Search ${cleanModuleName.toLowerCase()}...`}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3B69]/20 focus:border-[#4A3B69] transition-all bg-gray-50 hover:bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Dynamic Table Structure */}
        <div className="flex-1 overflow-auto scrollbar-none">
          <table className="w-max min-w-full text-left text-sm whitespace-nowrap border-separate border-spacing-0">
            <thead className={`text-white font-bold text-[11px] uppercase tracking-wider sticky top-0 ${theme.tableHead} z-20 shadow-sm h-12`}>
              <tr>
                {hasSpecificData ? (
                  specificColumns.map((col, i) => (
                    <th key={i} className={`px-6 py-4 font-bold border-b border-black/10 whitespace-nowrap ${i === 0 ? `sticky left-0 z-30 ${theme.tableHead} shadow-[2px_0_5px_-2px_rgba(0,0,0,0.3)]` : ''}`}>
                      {col}
                    </th>
                  ))
                ) : (
                  emptyColumns.map((_, i) => (
                    <th key={i} className={`px-16 py-4 font-bold border-b border-black/10 ${i === 0 ? `sticky left-0 z-30 ${theme.tableHead} shadow-[2px_0_5px_-2px_rgba(0,0,0,0.3)]` : ''}`}>
                      &nbsp;
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {hasSpecificData ? (
                specificData.map((row, rowIndex) => {
                  const isEven = rowIndex % 2 === 0;
                  const rowBg = isEven ? 'bg-white' : 'bg-gray-50';
                  return (
                    <tr key={rowIndex} className={`group cursor-pointer ${rowBg} hover:bg-purple-50 transition-colors h-14`}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className={`px-6 py-3 border-b border-gray-100 transition-colors whitespace-nowrap ${colIndex === 0 ? `sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] font-medium ${isEven ? 'bg-white group-hover:bg-purple-50' : 'bg-gray-50 group-hover:bg-purple-50'}` : ''}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  )
                })
              ) : (
                Array.from({ length: 15 }).map((_, rowIndex) => {
                  const isEven = rowIndex % 2 === 0;
                  const rowBg = isEven ? 'bg-white' : 'bg-gray-50';
                  
                  return (
                    <tr key={rowIndex} className={`group cursor-pointer ${rowBg} hover:bg-purple-50 transition-colors h-14`}>
                      {emptyColumns.map((_, colIndex) => (
                        <td key={colIndex} className={`px-6 py-3 border-b border-gray-100 transition-colors ${colIndex === 0 ? `sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] ${isEven ? 'bg-white group-hover:bg-purple-50' : 'bg-gray-50 group-hover:bg-purple-50'}` : ''}`}>
                          &nbsp;
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
