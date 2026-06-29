import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Plus, CheckCircle, Clock, XCircle, FileText, Activity, User, UserCheck, ClipboardCheck } from 'lucide-react';
import NewLeadModal from './NewLeadModal';

export default function LeadManagementSheet() {
  const [activeTab, setActiveTab] = useState('All Leads');
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwRRIlccxVeC9zShoimpAY_55BbbLrO3_veqXuAlJvdPRCnuh-4yElFnShDrzxrbUQe/exec';

  const fetchLeads = async () => {
    try {
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddLead = async (newLeadData: any) => {
    const nextIdNumber = leads.length + 1;
    const leadId = `LEAD-${String(nextIdNumber).padStart(4, '0')}`;
    const newLead = { id: nextIdNumber, leadId, ...newLeadData };
    
    // Save to local state
    setLeads([newLead, ...leads]);
    setIsNewLeadModalOpen(false);

    // Send to Google Sheets
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLead)
      });
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
    }
  };
  
  const tabs = [
    { name: 'All Leads', icon: <Activity size={16} /> },
    { name: 'Lost/Cancelled', icon: <XCircle size={16} /> },
    { name: 'Drafts', icon: <FileText size={16} /> },
    { name: 'Assigned To', icon: <User size={16} /> },
    { name: 'CRM Done By', icon: <UserCheck size={16} /> }
  ];

  return (
    <div className="bg-[#F8F9FD] h-full w-full flex flex-col font-sans min-w-0 min-h-0 overflow-hidden">
      
      {/* Table Container Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col flex-1 min-h-0 min-w-0 relative">
        
        {/* Purple Header Area */}
        <div className="bg-[#7A28CB] pt-6 pb-12 px-8 text-white relative shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold tracking-wide">CRM LEAD MANAGEMENT</h2>
          </div>
        </div>
        
        {/* Overlapping Tabs */}
        <div className="px-8 -mt-6 relative z-10 flex gap-2 overflow-x-auto pb-4 shrink-0 scrollbar-none">
          {tabs.map(tab => {
            const isActive = activeTab === tab.name;
            return (
              <button 
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all shadow-sm cursor-pointer whitespace-nowrap font-bold text-sm ${
                  isActive 
                    ? 'bg-white text-[#4A3B69] border-t border-x border-gray-200' 
                    : 'bg-[#F4F5F9] text-gray-500 hover:bg-gray-100 hover:text-gray-700 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-[#4A3B69]' : 'text-gray-400'}>{tab.icon}</span>
                {tab.name}
              </button>
            );
          })}
          
          {/* Add New Lead Button next to tabs */}
          <button 
            onClick={() => setIsNewLeadModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all shadow-sm cursor-pointer whitespace-nowrap font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white ml-2 border border-emerald-600"
          >
            <Plus size={16} /> Add New Lead
          </button>
          
          {/* Audit Button */}
          <button 
            onClick={() => window.open('https://docs.google.com/spreadsheets/d/14pso2pY-x3e4p8N6o09nD8gnQ5JPJ0y5U5jF6h8vgVo/edit?gid=1891612607#gid=1891612607', '_blank')}
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
                placeholder="Search leads..." 
                className="w-full pl-10 pr-4 py-3 md:py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3B69]/20 focus:border-[#4A3B69] transition-all bg-gray-50 hover:bg-white text-gray-800"
              />
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto scrollbar-none">
            <table className="w-max text-left text-sm whitespace-nowrap border-separate border-spacing-0">
              <thead className="text-white font-bold text-[11px] uppercase tracking-wider sticky top-0 bg-[#7A28CB] z-20 shadow-sm">
                <tr>
                  <th className="px-6 py-4 font-bold border-b border-[#6A1B9A] sticky left-0 z-30 bg-[#7A28CB] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.3)]">Lead ID</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Lead Date</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Company Name</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Industry Type</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Contact Person</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Designation</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Mobile Number</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Email Address</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">City</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">State</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Lead Source</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Product Interest</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Lead Value (₹)</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Priority Level</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Lead Status</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Assigned To</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Assign Date</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Last Follow-up Date</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Last Followup DoneBy</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Last Followup Summary</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Total Follow-ups</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Next Action</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Next Action Date</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Expected Closure Date</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Conversion Prob (%)</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Quotation Sent (Y/N)</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">PO Received (Y/N)</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Lead Age (Days)</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Remarks</th>
                  <th className="px-6 py-4 font-bold border-b border-[#4A148C]">Closed Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {leads.map((lead, idx) => {
                  const isEven = idx % 2 === 0;
                  const rowBg = isEven ? 'bg-white' : 'bg-gray-50';
                  
                  return (
                    <tr key={lead.id} className={`group cursor-pointer ${rowBg} hover:bg-purple-50 transition-colors`}>
                      <td className={`px-6 py-3 border-b border-gray-100 font-bold text-[#4A3B69] sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] transition-colors ${isEven ? 'bg-white group-hover:bg-purple-50' : 'bg-gray-50 group-hover:bg-purple-50'}`}>{lead.leadId}</td>
                    <td className="px-6 py-3 border-b border-gray-100 font-medium">{lead.leadDate}</td>
                    <td className="px-6 py-3 border-b border-gray-100 font-bold">{lead.companyName}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.industryType}</td>
                    <td className="px-6 py-3 border-b border-gray-100 font-medium">{lead.contactPerson}</td>
                    <td className="px-6 py-3 border-b border-gray-100 text-gray-500">{lead.designation}</td>
                    <td className="px-6 py-3 border-b border-gray-100 font-medium">{lead.mobileNumber}</td>
                    <td className="px-6 py-3 border-b border-gray-100 text-blue-600">{lead.emailAddress}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.city}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.state}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.leadSource}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.productInterest}</td>
                    <td className="px-6 py-3 border-b border-gray-100 font-bold text-emerald-600">{lead.leadValue}</td>
                    <td className="px-6 py-3 border-b border-gray-100">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${lead.priorityColor}`}>{lead.priorityLevel}</span>
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${lead.statusColor}`}>{lead.leadStatus}</span>
                    </td>
                    <td className="px-6 py-3 border-b border-gray-100 font-medium">{lead.assignedTo}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.assignDate}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.lastFollowUpDate}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.lastFollowupDoneBy}</td>
                    <td className="px-6 py-3 border-b border-gray-100 max-w-[200px] truncate text-xs" title={lead.lastFollowupSummary}>{lead.lastFollowupSummary}</td>
                    <td className="px-6 py-3 border-b border-gray-100 font-bold">{lead.totalFollowUps}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.nextAction}</td>
                    <td className="px-6 py-3 border-b border-gray-100 font-medium">{lead.nextActionDate}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.expectedClosureDate}</td>
                    <td className="px-6 py-3 border-b border-gray-100 font-bold text-blue-600">{lead.conversionProb}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.quotationSent}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.poReceived}</td>
                    <td className="px-6 py-3 border-b border-gray-100 font-bold text-amber-600">{lead.leadAge}</td>
                    <td className="px-6 py-3 border-b border-gray-100 max-w-[200px] truncate text-xs" title={lead.remarks}>{lead.remarks}</td>
                    <td className="px-6 py-3 border-b border-gray-100">{lead.closedDate}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>

      {/* New Lead Modal */}
      <NewLeadModal 
        isOpen={isNewLeadModalOpen} 
        onClose={() => setIsNewLeadModalOpen(false)} 
        onAddLead={handleAddLead}
      />
    </div>
  );
}
