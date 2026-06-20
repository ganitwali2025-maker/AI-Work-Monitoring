import React from 'react';
import { X, Building2, User, Phone, Mail, MapPin, Briefcase, IndianRupee } from 'lucide-react';

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: any) => void;
}

export default function NewLeadModal({ isOpen, onClose, onAddLead }: NewLeadModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Parse city/state
    const cityState = (formData.get('cityState') as string) || '';
    const parts = cityState.split(',').map(s => s.trim());
    const city = parts[0] || '';
    const state = parts.length > 1 ? parts[1] : '';

    const priorityLevel = (formData.get('priorityLevel') as string) || 'Medium';
    let priorityColor = 'bg-amber-100 text-amber-700';
    if (priorityLevel === 'High') priorityColor = 'bg-rose-100 text-rose-700';
    if (priorityLevel === 'Low') priorityColor = 'bg-blue-100 text-blue-700';

    const newLead = {
      leadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      companyName: formData.get('companyName') || '',
      industryType: formData.get('industryType') || '',
      contactPerson: formData.get('contactPerson') || '',
      designation: formData.get('designation') || '',
      mobileNumber: formData.get('mobileNumber') || '',
      emailAddress: formData.get('emailAddress') || '',
      city: city,
      state: state,
      leadSource: formData.get('leadSource') || '',
      productInterest: formData.get('productInterest') || '',
      leadValue: formData.get('leadValue') ? `₹ ${formData.get('leadValue')}` : '-',
      priorityLevel: priorityLevel,
      priorityColor: priorityColor,
      leadStatus: 'New',
      statusColor: 'bg-blue-100 text-blue-700',
      assignedTo: formData.get('assignedTo') || 'Unassigned',
      assignDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastFollowUpDate: '-',
      lastFollowupDoneBy: '-',
      lastFollowupSummary: '-',
      totalFollowUps: 0,
      nextAction: '-',
      nextActionDate: '-',
      expectedClosureDate: '-',
      conversionProb: '10%',
      quotationSent: 'No',
      poReceived: 'No',
      leadAge: 0,
      remarks: formData.get('remarks') || '',
      closedDate: '-'
    };
    onAddLead(newLead);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#7A28CB] px-6 py-4 flex justify-between items-center text-white shrink-0">
          <div>
            <h2 className="text-xl font-semibold">Add New Lead</h2>
            <p className="text-purple-200 text-sm mt-1">Enter details for the new CRM lead</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 scrollbar-none">
          <form id="new-lead-form" onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section: Company Info */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Building2 size={16} className="text-[#7A28CB]" /> Company Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input name="companyName" required type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all" placeholder="Enter company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry Type</label>
                  <select name="industryType" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all text-gray-700">
                    <option value="">Select Industry</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Construction">Construction</option>
                    <option value="Retail">Retail</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section: Contact Info */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <User size={16} className="text-[#7A28CB]" /> Contact Person
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input name="contactPerson" required type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all" placeholder="Contact person name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                  <input name="designation" type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all" placeholder="e.g. Director, Manager" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="mobileNumber" required type="tel" className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all" placeholder="+91" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="emailAddress" type="email" className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all" placeholder="email@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City / State</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="cityState" type="text" className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all" placeholder="City, State" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Lead Info */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Briefcase size={16} className="text-[#7A28CB]" /> Lead Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Interest</label>
                  <input name="productInterest" type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all" placeholder="What are they looking for?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Value (₹)</label>
                  <div className="relative">
                    <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="leadValue" type="number" className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
                  <select name="leadSource" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all text-gray-700">
                    <option value="">Select Source</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                  <select name="priorityLevel" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all text-gray-700">
                    <option value="Low">Low</option>
                    <option value="Medium" selected>Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <select name="assignedTo" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all text-gray-700">
                    <option value="">Unassigned</option>
                    <option value="Rajesh K">Rajesh K</option>
                    <option value="Priya M">Priya M</option>
                    <option value="Amit S">Amit S</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Remarks / Notes</label>
                  <textarea name="remarks" rows={3} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7A28CB]/20 focus:border-[#7A28CB] outline-none transition-all resize-none" placeholder="Any additional details..."></textarea>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-white border-t border-gray-200 flex justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="new-lead-form"
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Save Lead
          </button>
        </div>

      </div>
    </div>
  );
}
