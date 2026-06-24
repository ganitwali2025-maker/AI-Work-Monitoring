import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  PhoneCall, 
  Pill, 
  BriefcaseBusiness, 
  PieChart, 
  Megaphone,
  Search,
  Bell,
  Settings,
  MoreHorizontal,
  ChevronDown,
  Plus
} from 'lucide-react';

interface HospitalCrmWorkspaceProps {
  onBack: () => void;
}

const patientsData = [
  { id: 1, name: 'Sara Field', gender: 'Male', age: 38, contact: '6423405370', patientId: 'PA700002', category: 'Govt Office', lastVisit: '02-01-2025' },
  { id: 2, name: 'Lida Brevel', gender: 'Female', age: 55, contact: '8317880003', patientId: 'PA100001', category: 'Insurance', lastVisit: '02-01-2025' },
  { id: 3, name: 'Yagya Samaria', gender: 'Male', age: 34, contact: '7734120743', patientId: 'PA100000', category: 'MLA', lastVisit: '02-01-2025' },
  { id: 4, name: 'Alana Mahajan', gender: 'Male', age: 28, contact: '938144065', patientId: 'PA100009', category: 'Govt Office', lastVisit: '02-01-2025' },
  { id: 5, name: 'Gausami Rajwanshetur', gender: 'Female', age: 55, contact: '8370146364', patientId: 'PA100008', category: 'Govt Office', lastVisit: '02-01-2025' },
  { id: 6, name: 'Purab Kothari', gender: 'Male', age: 28, contact: '7484033488', patientId: 'PA100007', category: 'Insurance', lastVisit: '01-01-2025' },
  { id: 7, name: 'Sagar Bhushan Patel', gender: 'Male', age: 38, contact: '8542555541', patientId: 'PA100006', category: 'MLA', lastVisit: '01-01-2025' },
  { id: 8, name: 'Aryan Managare', gender: 'Female', age: 55, contact: '9763887103', patientId: 'PA100005', category: 'Govt Office', lastVisit: '01-01-2025' },
  { id: 9, name: 'Yugant Agarwal', gender: 'Male', age: 34, contact: '930065544', patientId: 'PA100004', category: 'Insurance', lastVisit: '31-12-2024' },
];

export default function HospitalCrmWorkspace({ onBack }: HospitalCrmWorkspaceProps) {
  const [activeTab, setActiveTab] = useState('All Patients');

  const sidebarLinks = [
    { name: 'Appointment', icon: Calendar },
    { name: 'All Patients', icon: Users },
    { name: 'Follow up', icon: PhoneCall },
    { name: 'Pharmacy', icon: Pill },
    { name: 'HR', icon: BriefcaseBusiness },
    { name: 'Analytics', icon: PieChart },
    { name: 'What\'s new', icon: Megaphone },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FD] text-gray-800 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-24 bg-white border-r border-gray-200 flex flex-col items-center py-6 shrink-0 z-20">
        <div className="mb-8 cursor-pointer flex items-center justify-center w-full" onClick={onBack}>
          {/* Logo representation */}
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
            a.
          </div>
        </div>
        
        <div className="flex flex-col gap-6 w-full px-2 mt-4">
          {sidebarLinks.map((link) => {
            const isActive = activeTab === link.name;
            const Icon = link.icon;
            return (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 ${
                  isActive ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-indigo-500 hover:bg-gray-50'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-semibold text-center leading-tight">
                  {link.name}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2">
             <div className="font-bold text-indigo-700 text-xl tracking-tight flex items-center gap-1 cursor-pointer" onClick={onBack}>
                <span className="text-purple-600">atva</span>care
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="text-gray-400 font-medium text-sm">Tea</span>
              <ChevronDown size={16} className="inline-block ml-1 text-gray-400" />
            </div>
            
            <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <button className="text-gray-400 hover:text-gray-600">
              <Settings size={20} />
            </button>
            
            <div className="w-8 h-8 rounded-full bg-orange-200 overflow-hidden cursor-pointer border border-gray-200">
               {/* Avatar placeholder */}
               <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Workspace Content */}
        <div className="flex-1 overflow-y-auto bg-[#F8F9FD] relative">
          
          {/* Yellow Banner Background */}
          <div className="bg-[#FFCC4D] h-44 w-full relative px-8 pt-8 shrink-0">
            <div className="flex items-center justify-between relative z-10">
              <h1 className="text-2xl font-bold text-gray-900">All Patients</h1>
              
              {/* Add New Patient Button */}
              <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer">
                <Plus size={18} /> Add New Patient
              </button>
            </div>
          </div>
          
          {/* Main Card Overlapping */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-6 -mt-12 relative z-20 flex flex-col mb-6" style={{ minHeight: 'calc(100% - 150px)' }}>
            
            {/* Content Body */}
            <div className="p-6 flex flex-col flex-1">
              
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex items-center gap-4 flex-1">
                  {/* Search Input */}
                  <div className="relative w-[320px]">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search by patient name / ID / mobile no" 
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  
                  {/* Filter */}
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    Filter by Last Visit date
                    <Calendar size={16} className="text-gray-400" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-700">1-9</span> of 645 patients
                </div>
              </div>
              
              {/* Table Area */}
              <div className="flex-1 overflow-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-[#F8FAFC] text-gray-500 font-semibold text-[11px] uppercase tracking-wider sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 rounded-tl-xl">#</th>
                      <th className="px-6 py-4">PATIENT DETAILS</th>
                      <th className="px-6 py-4">CONTACT</th>
                      <th className="px-6 py-4">PATIENT ID</th>
                      <th className="px-6 py-4">CATEGORY</th>
                      <th className="px-6 py-4">LAST VISIT</th>
                      <th className="px-6 py-4 rounded-tr-xl">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {patientsData.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-gray-500">{patient.id}</td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">{patient.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{patient.gender}, {patient.age}y</div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 font-medium">{patient.contact}</td>
                        <td className="px-6 py-4 text-gray-600">{patient.patientId}</td>
                        <td className="px-6 py-4 text-gray-600">{patient.category}</td>
                        <td className="px-6 py-4 text-gray-600">{patient.lastVisit}</td>
                        <td className="px-6 py-4">
                          <button className="text-gray-400 hover:text-gray-700 p-1">
                            <MoreHorizontal size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}
