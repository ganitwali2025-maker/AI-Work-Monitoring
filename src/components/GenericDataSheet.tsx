import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Plus, CheckCircle, Clock, XCircle, FileText, Activity, User, UserCheck, ClipboardCheck, X, RefreshCw } from 'lucide-react';

interface Props {
  moduleName: string;
  variant?: 'crm' | 'procurement' | 'inventory' | 'logistics' | 'production' | 'finance' | 'hr' | 'director' | 'vendor-master' | 'sales' | 'marketing' | 'laboratory';
}

const themeColors: Record<string, { header: string, tableHead: string, text: string, border: string, bgHead: string }> = {
  crm: { header: 'from-[#9333EA] to-[#7E22CE]', tableHead: 'bg-[#9333EA]', text: 'text-white', border: 'border-t-[#9333EA]', bgHead: 'bg-[#9333EA]' },
  sales: { header: 'from-[#3B82F6] to-[#1D4ED8]', tableHead: 'bg-[#3B82F6]', text: 'text-white', border: 'border-t-[#3B82F6]', bgHead: 'bg-[#3B82F6]' },
  procurement: { header: 'from-[#F59E0B] to-[#D97706]', tableHead: 'bg-[#F59E0B]', text: 'text-white', border: 'border-t-[#F59E0B]', bgHead: 'bg-[#F59E0B]' },
  inventory: { header: 'from-[#10B981] to-[#047857]', tableHead: 'bg-[#10B981]', text: 'text-white', border: 'border-t-[#10B981]', bgHead: 'bg-[#10B981]' },
  logistics: { header: 'from-[#6366F1] to-[#4338CA]', tableHead: 'bg-[#6366F1]', text: 'text-white', border: 'border-t-[#6366F1]', bgHead: 'bg-[#6366F1]' },
  production: { header: 'from-[#0EA5E9] to-[#0369A1]', tableHead: 'bg-[#0EA5E9]', text: 'text-white', border: 'border-t-[#0EA5E9]', bgHead: 'bg-[#0EA5E9]' },
  finance: { header: 'from-[#14B8A6] to-[#0F766E]', tableHead: 'bg-[#14B8A6]', text: 'text-white', border: 'border-t-[#14B8A6]', bgHead: 'bg-[#14B8A6]' },
  hr: { header: 'from-[#F43F5E] to-[#BE123C]', tableHead: 'bg-[#F43F5E]', text: 'text-white', border: 'border-t-[#F43F5E]', bgHead: 'bg-[#F43F5E]' },
  director: { header: 'from-[#D946EF] to-[#A21CAF]', tableHead: 'bg-[#D946EF]', text: 'text-white', border: 'border-t-[#D946EF]', bgHead: 'bg-[#D946EF]' },
  'vendor-master': { header: 'from-[#5B6FFF] to-[#4055D8]', tableHead: 'bg-[#5B6FFF]', text: 'text-white', border: 'border-t-[#5B6FFF]', bgHead: 'bg-[#5B6FFF]' },
  marketing: { header: 'from-[#C026D3] to-[#86198F]', tableHead: 'bg-[#C026D3]', text: 'text-white', border: 'border-t-[#C026D3]', bgHead: 'bg-[#C026D3]' },
  laboratory: { header: 'from-[#06B6D4] to-[#0891B2]', tableHead: 'bg-[#06B6D4]', text: 'text-white', border: 'border-t-[#06B6D4]', bgHead: 'bg-[#06B6D4]' }
};

const glassTheme = { header: 'from-[#f2f7ec] to-white', tableHead: 'bg-[#e6f0d5]', text: 'text-[#2d4a22]', border: 'border-t-[#e6f0d5]', bgHead: 'bg-[#e6f0d5]' };


export default function GenericDataSheet({ moduleName, variant = 'crm' }: Props) {
  const [activeTab, setActiveTab] = useState('All Records');
  const [liveData, setLiveData] = useState<any[][] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Approval states
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedRowForApproval, setSelectedRowForApproval] = useState<any[] | null>(null);
  const [approvalRemarks, setApprovalRemarks] = useState('');

  const [appTheme, setAppTheme] = useState<'glass' | 'colorful'>(() => {
    return (localStorage.getItem('appTheme') as 'glass' | 'colorful') || 'glass';
  });

  const theme = appTheme === 'colorful' ? (themeColors[variant] || themeColors.crm) : glassTheme;
  
  // Clean module name by removing numbering (e.g. "1. Customer Purchase Orders" -> "Customer Purchase Orders")
  const cleanModuleName = moduleName.replace(/^\d+\.\s*/, '');
  
  const sheetNameMap: Record<string, string> = {
    'Lead Pipeline': 'Lead Entry',
    'Approval Center': 'Approval Center'
  };
  const targetSheetName = sheetNameMap[cleanModuleName] || cleanModuleName;

  const getAppScriptUrl = (module: string) => {
    if (module === 'Approval Center') {
      return 'https://script.google.com/macros/s/AKfycbwRRIlccxVeC9zShoimpAY_55BbbLrO3_veqXuAlJvdPRCnuh-4yElFnShDrzxrbUQe/exec';
    }
    // Original URL for Lead Pipeline
    return 'https://script.google.com/macros/s/AKfycbyRM4JeKRXE8RpVRpynoDjbMigxgy3CXY3rXB9V380omJ4jLcUfF_Du84bKTFQUHlL9/exec';
  };

  const fetchSheetData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const APP_SCRIPT_URL = getAppScriptUrl(cleanModuleName); 
      
      // Adding a timestamp parameter to bypass browser caching of the Apps Script response
      const response = await fetch(`${APP_SCRIPT_URL}?t=${new Date().getTime()}&sheetName=${encodeURIComponent(targetSheetName)}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const result = await response.json();
      if (Array.isArray(result)) {
        setLiveData(result);
      } else {
        setLiveData([]);
      }
    } catch (err) {
      console.error('Error fetching sheet data:', err);
      setError('Failed to load live data from Sheet.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (variant === 'marketing' && (cleanModuleName === 'Lead Pipeline' || cleanModuleName === 'Approval Center')) {
      fetchSheetData();
    } else {
      setLiveData(null);
      setIsLoading(false);
      setError(null);
    }
  }, [variant, cleanModuleName]);

  const handleSaveForm = async () => {
    if (!hasSpecificData) return;
    
    setIsSubmitting(true);
    try {
      const APP_SCRIPT_URL = getAppScriptUrl(cleanModuleName);
      
      const now = new Date();
      const currentDate = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' });
      const currentTime = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();

      const finalFormData = { ...formData };
      
      specificColumns.forEach(col => {
        if (col.toLowerCase().includes('date') && !finalFormData[col]) {
          finalFormData[col] = currentDate;
        }
        if (col.toLowerCase().includes('time') && !finalFormData[col]) {
          finalFormData[col] = currentTime;
        }
      });

      const payload = {
        ...finalFormData,
        sheetName: targetSheetName
      };

      const response = await fetch(APP_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        // Using text/plain prevents CORS preflight issues with Google Apps Script
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
      
      const result = await response.json();
      if (result.status === 'success') {
        // Dual submit: Push to Approval Center if Lead Pipeline
        if (cleanModuleName === 'Lead Pipeline') {
          try {
            const APPROVAL_URL = getAppScriptUrl('Approval Center');
            const approvalPayload = {
              'Lead ID': formData['Lead ID'] || '', 
              'Company Name': formData['Company Name'] || '',
              'Executive Name': formData['Executive Name'] || '',
              'Marketing Head': formData['Marketing Head'] || '',
              'Approval Status': 'Pending',
              'Approval Date': '',
              'Approval Time': '',
              'Remarks': formData['Remarks'] || '',
              'sheetName': 'Approval Center'
            };
            const appRes = await fetch(APPROVAL_URL, {
              method: 'POST',
              body: JSON.stringify(approvalPayload),
              headers: { 'Content-Type': 'text/plain;charset=utf-8' }
            });
            const appJson = await appRes.json();
            if (appJson.status !== 'success') {
              alert('Sync to Approval Center failed: ' + appJson.message);
            }
          } catch (approvalErr: any) {
            console.error('Error syncing to Approval Center:', approvalErr);
            alert('Approval Sync Error: ' + (approvalErr.message || approvalErr) + '\n\nMake sure your Approval Center Apps Script is deployed with "Who has access: Anyone".');
          }
        }

        alert('Record saved to Google Sheet successfully!');
        setIsFormOpen(false);
        setFormData({});
        // Re-fetch data automatically so it shows up instantly in the web app
        fetchSheetData();
      } else {
        alert('Failed to save: ' + result.message);
      }
    } catch (err) {
      console.error('Error saving data:', err);
      alert('Error saving data. Make sure Apps Script URL is correct and doPost is deployed.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleOpenApprovalModal = (row: any[]) => {
    setSelectedRowForApproval(row);
    setApprovalRemarks('');
    setIsApprovalModalOpen(true);
  };

  const handleSubmitApproval = async (status: 'Approved' | 'Rejected') => {
    if (!selectedRowForApproval) return;
    setIsSubmitting(true);
    
    try {
      const APP_SCRIPT_URL = getAppScriptUrl('Approval Center');
      
      // We need to know which column is "Lead ID"
      const leadIdIndex = specificColumns.indexOf('Lead ID');
      const leadId = selectedRowForApproval[leadIdIndex];
      
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();

      const payload = {
        action: 'update',
        'Lead ID': leadId,
        'Approval Status': status,
        'Approval Date': dateStr,
        'Approval Time': timeStr,
        'Remarks': approvalRemarks,
        'sheetName': 'Approval Center'
      };

      const response = await fetch(APP_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
      
      const result = await response.json();
      if (result.status === 'success') {
        alert(`Record ${status.toLowerCase()} successfully!`);
        setIsApprovalModalOpen(false);
        fetchSheetData();
      } else {
        alert(`Failed to ${status.toLowerCase()}: ` + result.message);
      }
    } catch (err) {
      console.error('Error updating approval:', err);
      alert('Error saving approval.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      specificColumns = ['Lead ID', 'Lead Date', 'Company Name', 'Contact Person', 'Mobile Number', 'Email', 'City', 'State', 'Industry Type', 'Product Requirement', 'Lead Source', 'Executive Name', 'Marketing Head', 'Remarks', 'Lead Status'];
      specificData = liveData || [];
    } else if (cleanModuleName === 'Approval Center') {
      specificColumns = ['Lead ID', 'Company Name', 'Executive Name', 'Marketing Head', 'Approval Status', 'Approval Date', 'Approval Time', 'Remarks'];
      specificData = liveData || [];
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
      <div className={`bg-gradient-to-r ${theme.header} border-b ${appTheme === 'glass' ? 'border-[#e6f0d5]' : 'border-gray-100'} px-8 pt-6 pb-12 shrink-0 relative overflow-hidden transition-colors duration-300`}>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className={`text-2xl font-serif font-bold ${theme.text} tracking-wide uppercase drop-shadow-sm transition-colors duration-300`}>{cleanModuleName}</h2>
          </div>
        </div>
      </div>

      {/* Overlapping Tabs */}
      <div className="px-8 -mt-6 relative z-10 flex gap-2 overflow-x-auto pb-4 shrink-0 scrollbar-none">
        
        {/* Left Side: Tabs */}
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all shadow-sm cursor-pointer whitespace-nowrap font-bold text-sm ${
                isActive 
                  ? 'bg-white text-[#4a6b22] border-t border-x border-gray-200 relative z-20' 
                  : 'bg-[#F4F5F9] text-gray-500 hover:bg-gray-100 hover:text-gray-700 border border-transparent relative z-20'
              }`}
            >
              <span className={isActive ? 'text-[#4a6b22]' : 'text-gray-400'}>{tab.icon}</span> {tab.name}
            </button>
          );
        })}
        
        {/* Refresh Button - Styled like a tab */}
        <button 
          onClick={() => {
            if (variant === 'marketing' && (cleanModuleName === 'Lead Pipeline' || cleanModuleName === 'Approval Center')) {
              fetchSheetData();
            } else {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 800);
            }
          }}
          disabled={isLoading}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all shadow-sm cursor-pointer whitespace-nowrap font-bold text-sm bg-white ${theme.text} border-t border-x border-gray-200 hover:bg-gray-50 disabled:opacity-50 relative z-20 ml-4`}
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} /> 
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
        
        {/* Add New Button - Styled like a tab */}
        <button 
          onClick={() => setIsFormOpen(true)}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all shadow-sm cursor-pointer whitespace-nowrap font-bold text-sm text-white ${appTheme === 'colorful' ? `bg-gradient-to-r ${theme.header}` : 'bg-[#4a6b22] hover:bg-[#3b5a1a]'} hover:opacity-90 relative z-20`}
        >
          <Plus size={16} /> Add New {singularName}
        </button>
        
        {/* Audit Button - Styled like a tab */}
        <button 
          onClick={() => alert('Opening Audit Sheet...')}
          className="flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all shadow-sm cursor-pointer whitespace-nowrap font-bold text-sm bg-[#F4F5F9] text-gray-600 border-t border-x border-gray-200 hover:bg-gray-100 relative z-20 ml-2"
        >
          <ClipboardCheck size={16} /> Audit
        </button>

      </div>

      {/* Content Area */}
      <div className="bg-white flex-1 flex flex-col -mt-[1px] border-t border-gray-200 min-h-0 relative z-10">
        
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
          <table className="w-max min-w-full text-center text-sm whitespace-nowrap border-separate border-spacing-0">
            <thead className={`${theme.text} font-extrabold text-[13px] uppercase tracking-wider sticky top-0 ${theme.bgHead} z-20 shadow-sm h-12 transition-colors duration-300`}>
              <tr>
                {hasSpecificData ? (
                  specificColumns.map((col, i) => (
                    <th key={i} className={`px-6 py-4 font-bold border-b border-black/5 whitespace-nowrap ${i === 0 ? `sticky left-0 z-30 ${theme.bgHead} shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-colors duration-300` : ''}`}>
                      {col}
                    </th>
                  ))
                ) : (
                  emptyColumns.map((_, i) => (
                    <th key={i} className={`px-16 py-4 font-bold border-b border-black/5 ${i === 0 ? `sticky left-0 z-30 ${theme.bgHead} shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-colors duration-300` : ''}`}>
                      &nbsp;
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="text-gray-900 font-semibold font-sans tracking-normal">
              {isLoading ? (
                <tr>
                  <td colSpan={hasSpecificData ? specificColumns.length : 15} className="px-6 py-12 text-center text-gray-500 font-medium">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                      Fetching live data from Google Sheet...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={hasSpecificData ? specificColumns.length : 15} className="px-6 py-12 text-center text-red-500 font-medium">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <XCircle size={32} className="text-red-400" />
                      {error}
                    </div>
                  </td>
                </tr>
              ) : hasSpecificData ? (
                specificData.map((row, rowIndex) => {
                  const isEven = rowIndex % 2 === 0;
                  const rowBg = isEven ? 'bg-white' : 'bg-gray-50';
                  return (
                    <tr key={rowIndex} className={`group cursor-pointer ${rowBg} hover:bg-purple-50 transition-colors h-14`}>
                      {row.map((cell, colIndex) => {
                        const colName = specificColumns[colIndex];
                        return (
                        <td key={colIndex} className={`px-6 py-3 border-b border-gray-100 transition-colors whitespace-nowrap ${colIndex === 0 ? `sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] font-medium ${isEven ? 'bg-white group-hover:bg-purple-50' : 'bg-gray-50 group-hover:bg-purple-50'}` : ''}`}>
                          {cleanModuleName === 'Approval Center' && colName === 'Approval Status' && cell === 'Pending' ? (
                            <div className="flex items-center justify-center gap-3">
                              <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md text-xs font-bold shadow-sm border border-amber-200">{cell}</span>
                              <button onClick={(e) => { e.stopPropagation(); handleOpenApprovalModal(row); }} className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-md shadow-sm transition-colors cursor-pointer flex items-center gap-1">
                                <CheckCircle size={14} /> Review
                              </button>
                            </div>
                          ) : cleanModuleName === 'Approval Center' && colName === 'Approval Status' && cell === 'Approved' ? (
                             <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md text-xs font-bold shadow-sm border border-emerald-200 inline-flex items-center gap-1"><CheckCircle size={12} /> {cell}</span>
                          ) : cleanModuleName === 'Approval Center' && colName === 'Approval Status' && cell === 'Rejected' ? (
                             <span className="bg-red-100 text-red-800 px-2.5 py-1 rounded-md text-xs font-bold shadow-sm border border-red-200 inline-flex items-center gap-1"><XCircle size={12} /> {cell}</span>
                          ) : (typeof cell === 'string' && /^[0-9]{4}-[0-9]{2}-[0-9]{2}T/.test(cell)) ? (
                            colName.toLowerCase().includes('time') 
                              ? new Date(cell).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()
                              : new Date(cell).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' })
                          ) : (
                            cell
                          )}
                        </td>
                        );
                      })}
                    </tr>
                  )
                })
              ) : (
                Array.from({ length: 15 }).map((_, rowIndex) => {
                  const isEven = rowIndex % 2 === 0;
                  const rowBg = isEven ? 'bg-white' : 'bg-gray-50';
                  
                  return (
                    <tr key={rowIndex} className={`group cursor-pointer ${rowBg} hover:bg-[#f2f7ec] transition-colors h-14`}>
                      {emptyColumns.map((_, colIndex) => (
                        <td key={colIndex} className={`px-6 py-3 border-b border-gray-100 transition-colors ${colIndex === 0 ? `sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] ${isEven ? 'bg-white group-hover:bg-[#f2f7ec]' : 'bg-gray-50 group-hover:bg-[#f2f7ec]'}` : ''}`}>
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

      {/* Centered Modal Form */}
      <div className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100] transition-opacity duration-300 flex items-center justify-center p-4 sm:p-6 ${isFormOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-full max-w-4xl bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-out flex flex-col max-h-[90vh] overflow-hidden ${isFormOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
          <div className={`bg-gradient-to-r ${theme.header} px-6 py-4 flex items-center justify-between shrink-0 shadow-sm border-b border-[#e6f0d5]`}>
            <h3 className={`font-bold text-lg font-serif tracking-wide uppercase ${theme.text}`}>Add New {singularName}</h3>
            <button onClick={() => setIsFormOpen(false)} className={`p-1.5 hover:bg-[#e6f0d5] rounded-full transition-colors cursor-pointer ${theme.text}`}>
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 scrollbar-none bg-gray-50/50">
            {hasSpecificData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {specificColumns.map((col, idx) => {
                  const isDate = col.toLowerCase().includes('date') || col.toLowerCase().includes('time') || col.toLowerCase().includes('until');
                  const isNumber = col.toLowerCase().includes('amount') || col.toLowerCase().includes('budget') || col.toLowerCase().includes('revenue');
                  const type = isDate ? 'date' : isNumber ? 'number' : 'text';
                  
                  return (
                    <div key={idx} className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">{col}</label>
                      <input 
                        type={type}
                        placeholder={`Enter ${col}...`}
                        value={formData[col] || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, [col]: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3B69]/20 focus:border-[#4A3B69] transition-all text-gray-900 shadow-sm"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-gray-500 text-sm text-center py-20 flex flex-col items-center gap-3">
                <Activity size={32} className="text-gray-300" />
                Form fields will dynamically appear here.
              </div>
            )}
          </div>
          
          <div className="p-6 border-t border-gray-100 bg-white shrink-0 flex justify-end gap-3">
            <button onClick={() => setIsFormOpen(false)} disabled={isSubmitting} className="px-6 py-2.5 border border-gray-300 bg-white rounded-xl text-gray-700 font-bold hover:bg-gray-100 transition-colors shadow-sm cursor-pointer disabled:opacity-50">
              Cancel
            </button>
            <button onClick={handleSaveForm} disabled={isSubmitting} className={`px-8 py-2.5 rounded-xl text-white font-bold transition-all shadow-sm cursor-pointer ${theme.tableHead} hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2`}>
              {isSubmitting ? <Activity size={16} className="animate-spin" /> : null}
              {isSubmitting ? 'Saving...' : `Save ${singularName}`}
            </button>
          </div>
        </div>
      </div>
      {/* Approval Modal */}
      <div className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[200] transition-opacity duration-300 flex items-center justify-center p-4 sm:p-6 ${isApprovalModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-full max-w-md bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-out flex flex-col overflow-hidden ${isApprovalModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 flex items-center justify-between text-white shrink-0 shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <h3 className="font-bold text-lg tracking-wide uppercase">Approve Record</h3>
            </div>
            <button onClick={() => setIsApprovalModalOpen(false)} className="p-1.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 bg-gray-50/50">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Remarks / Approval Notes</label>
              <textarea 
                placeholder="Enter remarks for this approval..."
                value={approvalRemarks}
                onChange={(e) => setApprovalRemarks(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900 shadow-sm min-h-[100px] resize-none"
              />
            </div>
          </div>
          
          <div className="p-5 border-t border-gray-100 bg-white shrink-0 flex justify-end gap-3">
            <button onClick={() => setIsApprovalModalOpen(false)} disabled={isSubmitting} className="px-5 py-2.5 border border-gray-300 bg-white rounded-xl text-gray-700 font-bold hover:bg-gray-100 transition-colors shadow-sm cursor-pointer disabled:opacity-50">
              Cancel
            </button>
            <button onClick={() => handleSubmitApproval('Approved')} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl text-white font-bold transition-all shadow-sm cursor-pointer bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2">
              {isSubmitting ? <Activity size={16} className="animate-spin" /> : <CheckCircle size={16} />}
              {isSubmitting ? 'Processing...' : 'Approve'}
            </button>
            <button onClick={() => handleSubmitApproval('Rejected')} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl text-white font-bold transition-all shadow-sm cursor-pointer bg-red-500 hover:bg-red-600 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2">
              {isSubmitting ? <Activity size={16} className="animate-spin" /> : <XCircle size={16} />}
              {isSubmitting ? 'Processing...' : 'Reject'}
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
