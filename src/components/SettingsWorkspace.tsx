import React, { useState } from 'react';
import { 
  Search, Bell, HelpCircle, ChevronDown, Home, Users, Building2, 
  Shield, Mail, Globe, Palette, Smartphone, Clock, Settings, 
  Lock, RotateCcw, Headset, Save, Monitor, Sliders, Database
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function SettingsWorkspace({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState('General');
  
  return (
    <div className="flex flex-col h-screen bg-gray-50/50 font-sans">
      {/* Top Header */}
      <header className="h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 relative">
        {/* Left: Logo & Title & Marquee */}
        <div className="flex-1 flex items-center gap-6 min-w-0 pr-4">
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={onBack}>
            <svg width="40" height="40" viewBox="25 25 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 25 75 L 25 45 A 25 18 0 0 1 75 45 L 75 75 L 43 75 L 43 63 L 63 63 L 63 45 A 13 6 0 0 0 37 45 L 37 75 Z" fill="#4a6b22" />
            </svg>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-[#111827] text-[18px] leading-tight tracking-tight">Passary</span>
              <span className="font-extrabold text-[#111827] text-[18px] leading-tight tracking-tight">Refractories</span>
            </div>
          </div>
          <div className="h-8 border-l border-gray-200 shrink-0"></div>
          <div className="flex-1 overflow-hidden">
            <div className="font-extrabold text-[#ff5a1f] text-[16px] truncate pt-1">
              System Configuration & Preferences • Manage Application Settings • Configure Security Policies • Database Management • Integrations
            </div>
          </div>
        </div>

        {/* Right: Search, Notifications, User */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-[280px] bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-[13px] outline-none focus:border-[#4a6b22] focus:ring-1 focus:ring-[#4a6b22]"
            />
          </div>
          
          <div className="h-6 border-l border-gray-200"></div>

          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-[#f4f9ea] text-[#4a6b22] hover:bg-[#4a6b22] hover:text-white border border-[#4a6b22]/20 rounded-lg font-bold text-sm transition-colors"
          >
            <Home size={16} />
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Layout (Sidebar + Content) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col justify-between shrink-0 overflow-y-auto custom-scrollbar">
          <div className="py-6">
            <div className="px-6 mb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Main Menu
            </div>
            <nav className="flex flex-col gap-1 px-3">
              {[
                { name: 'Dashboard', icon: Home },
                { name: 'Employee Management', icon: Users },
                { name: 'Department Access', icon: Building2 },
                { name: 'Role & Permissions', icon: Shield },
                { name: 'Email Settings', icon: Mail },
                { name: 'Language & Region', icon: Globe },
                { name: 'Theme Customization', icon: Palette },
                { name: 'Device Login', icon: Smartphone },
                { name: 'Login Activity', icon: Clock },
              ].map((item) => (
                <button 
                  key={item.name} 
                  onClick={item.name === 'Dashboard' ? onBack : undefined}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full text-left"
                >
                  <item.icon size={18} className="text-gray-400" />
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="px-6 mt-8 mb-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Security & System
            </div>
            <nav className="flex flex-col gap-1 px-3">
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-bold text-[#4a6b22] bg-[#f4f9ea] w-full text-left">
                <Settings size={18} className="text-[#4a6b22]" />
                System Settings
              </button>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full text-left">
                <Lock size={18} className="text-gray-400" />
                Security Settings
              </button>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors w-full text-left">
                <RotateCcw size={18} className="text-gray-400" />
                Backup & Restore
              </button>
            </nav>
          </div>

          {/* Need Help Box */}
          <div className="p-5 mx-4 mb-6 bg-[#f4f9ea] rounded-2xl border border-[#e1ebd5]/50">
            <h4 className="text-[13px] font-bold text-[#2b3a1a] mb-2">Need Help?</h4>
            <p className="text-[12px] text-[#5c6b4a] leading-relaxed mb-4">
              For any support or help contact system administrator.
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-white text-[#4a6b22] py-2 rounded-lg text-[13px] font-bold border border-[#e1ebd5] shadow-sm hover:shadow transition-all">
              <Headset size={16} />
              Contact Support
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="w-full p-8 pb-12">
            
            {/* Page Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">System Settings</h1>
                <p className="text-[13px] text-gray-500 font-medium">Manage and configure all core system preferences and application settings.</p>
              </div>
              <button className="flex items-center gap-2 bg-[#4a6b22] hover:bg-[#3b591b] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold shadow-md transition-all">
                <Save size={16} />
                Save Changes
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
              {['General', 'Email', 'Security', 'Notifications', 'System', 'Integrations'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-[14px] font-bold border-b-2 transition-colors ${activeTab === tab ? 'text-[#4a6b22] border-[#4a6b22]' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Forms Container */}
            <div className="space-y-6">
              
              {/* General Settings Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#f4f9ea] flex items-center justify-center text-[#4a6b22] shrink-0">
                    <Settings size={20} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 mb-0.5">General Settings</h3>
                    <p className="text-[12px] text-gray-500 font-medium">Configure basic application information and preferences.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pl-14">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Application Name</label>
                    <input type="text" defaultValue="Passary Refractories ERP" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-900 focus:border-[#4a6b22] focus:ring-1 focus:ring-[#4a6b22] outline-none bg-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Timezone</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-900 appearance-none outline-none bg-white">
                        <option>(GMT+05:30) Asia/Kolkata</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Application Tagline</label>
                    <input type="text" defaultValue="Forging Energy-Efficient Solutions" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-900 focus:border-[#4a6b22] focus:ring-1 focus:ring-[#4a6b22] outline-none bg-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Time Format</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-900 appearance-none outline-none bg-white">
                        <option>12 Hour (02:30 PM)</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Date Format</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-900 appearance-none outline-none bg-white">
                        <option>DD MMM YYYY (24 May 2025)</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Currency</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-900 appearance-none outline-none bg-white">
                        <option>INR (₹) - Indian Rupee</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Display Settings Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#f4f9ea] flex items-center justify-center text-[#4a6b22] shrink-0">
                    <Monitor size={20} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 mb-0.5">Display Settings</h3>
                    <p className="text-[12px] text-gray-500 font-medium">Manage how information is displayed across the application.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pl-14">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Default Language</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-900 appearance-none outline-none bg-white">
                        <option>English (United States)</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Dashboard Layout</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-900 appearance-none outline-none bg-white">
                        <option>Default</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Items Per Page</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-900 appearance-none outline-none bg-white">
                        <option>10 Items</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Sidebar Style</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-900 appearance-none outline-none bg-white">
                        <option>Light</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* System Preferences Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#f4f9ea] flex items-center justify-center text-[#4a6b22] shrink-0">
                    <Sliders size={20} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 mb-0.5">System Preferences</h3>
                    <p className="text-[12px] text-gray-500 font-medium">Configure system-wide preferences and behavior.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-8 pl-14">
                  {/* Toggle 1 */}
                  <div className="flex items-start gap-4">
                    <div className="relative inline-flex items-center cursor-pointer mt-1">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4a6b22]"></div>
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-gray-900 mb-0.5">Enable Maintenance Mode</div>
                      <div className="text-[11px] text-gray-500">System will be unavailable for all users.</div>
                    </div>
                  </div>

                  {/* Toggle 2 */}
                  <div className="flex items-start gap-4">
                    <div className="relative inline-flex items-center cursor-pointer mt-1">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4a6b22]"></div>
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-gray-900 mb-0.5">Enable Audit Logging</div>
                      <div className="text-[11px] text-gray-500">Track all system activities and changes.</div>
                    </div>
                  </div>

                  {/* Toggle 3 */}
                  <div className="flex items-start gap-4">
                    <div className="relative inline-flex items-center cursor-pointer mt-1">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4a6b22]"></div>
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-gray-900 mb-0.5">Allow User Registration</div>
                      <div className="text-[11px] text-gray-500">Users can self-register to the system.</div>
                    </div>
                  </div>

                  {/* Toggle 4 */}
                  <div className="flex items-start gap-4">
                    <div className="relative inline-flex items-center cursor-pointer mt-1">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4a6b22]"></div>
                    </div>
                    <div className="flex-1 flex items-center justify-between pr-4">
                      <div>
                        <div className="text-[13px] font-bold text-gray-900 mb-0.5">Auto Logout</div>
                        <div className="text-[11px] text-gray-500">Automatically logout inactive users.</div>
                      </div>
                      <div className="relative w-32 shrink-0 ml-4">
                        <select className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-[12px] text-gray-900 appearance-none outline-none bg-white">
                          <option>30 Minutes</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Management Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#f4f9ea] flex items-center justify-center text-[#4a6b22] shrink-0">
                    <Database size={20} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 mb-0.5">Data Management</h3>
                    <p className="text-[12px] text-gray-500 font-medium">Manage system data and storage preferences.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pl-14">
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Backup Frequency</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-900 appearance-none outline-none bg-white">
                        <option>Daily</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Data Retention Period</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-900 appearance-none outline-none bg-white">
                        <option>1 Year</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
