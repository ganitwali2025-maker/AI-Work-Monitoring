import React from 'react';
import { 
  Calendar, 
  Search,
  MoreHorizontal,
  Plus
} from 'lucide-react';

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

export default function HospitalPatientSheet() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full w-full">
      {/* Yellow Banner Header */}
      <div className="bg-[#FFCC4D] h-28 relative flex items-center justify-between px-8 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 z-10">All Patients</h1>
        
        {/* Add New Patient Button */}
        <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 z-10 shadow-sm transition-colors cursor-pointer">
          <Plus size={18} /> Add New Patient
        </button>
        
        {/* Illustration placeholder */}
        <div className="absolute top-0 right-1/3 bottom-0 w-64 pointer-events-none opacity-90 flex items-end justify-center">
            {/* CSS drawing to mimic the cartoon character */}
            <div className="w-32 h-24 relative">
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
                <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                </div>
            </div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-purple-600 rounded-full"></div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-blue-500 rounded-full"></div>
            </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1 min-h-0">
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
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
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
                    <button className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer">
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
  );
}

