import {
  useState,
  useEffect } from 'react';
import ReyoVoiceAssistant from './components/ReyoVoiceAssistant';
import { 
  Users,
  ShoppingCart,
  Package,
  Truck,
  Factory,
  Landmark,
  BriefcaseBusiness,
  UserCheck,
  ClipboardList,
  Building2,
  Warehouse,
  Calculator,
  LayoutDashboard,
  Search,
  HelpCircle,
  Home,
  Sparkles,
  Settings,
  ChevronDown,
  Calendar,
  Wrench,
  Megaphone,
  UserPlus,
  FileText,
  PhoneCall,
  Headset,
  PieChart,
  BarChart,
  TrendingUp,
  TrendingDown,
  Phone,
  MapPin,
  CreditCard,
  Briefcase,
  History,
  Receipt,
  Folder,
  CheckSquare,
  UserSquare,
  Bell,
  Database,
  User,
  Clock,
  FileClock,
  CheckCircle,
  FileCheck,
  LayoutGrid,
  Archive,
  Layers,
  RefreshCw,
  RotateCcw,
  Car,
  ShieldCheck,
  Target,
  Share2,
  Mail,
  Globe,
  Activity,
  FilePlus,
  AlertTriangle,
  ListChecks,
  FlaskConical,
  FileBarChart,
  Menu,
  X,
  PanelLeft,
  Bot,
  ClipboardCheck,
  Shield,
  Lightbulb
} from 'lucide-react';
import CrmWorkspace from './components/CrmWorkspace';
import SalesWorkspace from './components/SalesWorkspace';
import CustomerMasterWorkspace from './components/CustomerMasterWorkspace';
import SettingsWorkspace from './components/SettingsWorkspace';
import ProcurementWorkspace from './components/ProcurementWorkspace';
import VendorMasterWorkspace from './components/VendorMasterWorkspace';
import InventoryWorkspace from './components/InventoryWorkspace';
import LogisticsWorkspace from './components/LogisticsWorkspace';
import ProductionWorkspace from './components/ProductionWorkspace';
import FinanceWorkspace from './components/FinanceWorkspace';
import HrWorkspace from './components/HrWorkspace';
import CostingWorkspace from './components/CostingWorkspace';
import DirectorWorkspace from './components/DirectorWorkspace';
import MarketingWorkspace from './components/MarketingWorkspace';
import ERPModuleCard from './components/ERPModuleCard';
import AIAgentCard from './components/AIAgentCard';
import CrmAiAgentDashboard from './components/CrmAiAgentDashboard';
import CrmAiAgentWorkspace from './components/CrmAiAgentWorkspace';
import AutopsyEngineDashboard from './components/AutopsyEngineDashboard';
import KillCriticDashboard from './components/KillCriticDashboard';
import ExposeEngineDashboard from './components/ExposeEngineDashboard';
import EliteCeoDashboard from './components/EliteCeoDashboard';
import LandingPage from './components/LandingPage';
import SalesAiAgentDashboard from './components/SalesAiAgentDashboard';
import LaboratoryWorkspace from './components/LaboratoryWorkspace';
import ReportingCenter from './components/ReportingCenter';
import ApprovalCenter from './components/ApprovalCenter';

const departments = [
  { 
    name: 'Marketing Performance Center', 
    icon: Megaphone, 
    desc: 'Track campaigns, monitor lead generation, and analyze marketing ROI.', 
    view: 'marketing', 
    variant: 'marketing' as const,
    badge: 'Active Campaigns: 12',
    badgeColorClass: 'bg-fuchsia-100/70 text-fuchsia-700 border-fuchsia-200/60'
  },
  { 
    name: 'CRM & Customer Management', 
    icon: Users, 
    desc: 'Manage leads, inquiries, quotations, follow-ups and customer relationships.', 
    view: 'crm', 
    variant: 'crm' as const,
    badge: 'Pending: 38',
    badgeColorClass: 'bg-purple-100/70 text-purple-700 border-purple-200/60',
    subModules: [
      { name: 'Lead Management', icon: UserPlus, desc: 'Acquire, score, and transition prospects from traffic campaigns.' },
      { name: 'Inquiry Management', icon: ClipboardList, desc: 'Log formal item requests, client quantities, budget scopes, and specifications.' },
      { name: 'Quotation Management', icon: FileText, desc: 'Build clean itemized price estimations, tax templates, and discounts.' },
      { name: 'Follow-up Management', icon: PhoneCall, desc: 'Register callbacks, record logs, and set automated reminders.' },
      { name: 'Customer Registration', icon: UserCheck, desc: 'Transition closed-won clients with secure KYC and business details.' },
      { name: 'Customer Support', icon: Headset, desc: 'Open support tickets, verify SLA timers, and capture system resolution logs.' },
    ]
  },
  { 
    name: 'Sales & Revenue Management', 
    icon: ShoppingCart, 
    desc: 'Manage customer orders, dispatch, invoices, payments and revenue tracking.', 
    view: 'sales', 
    variant: 'crm' as const,
    badge: 'Open Orders: 52',
    badgeColorClass: 'bg-emerald-100/70 text-emerald-700 border-emerald-200/60'
,
    subModules: [
    {
      name: '1. Customer Purchase Orders',
      desc: 'Manage customer purchase orders from creation to approval.',
      icon: FileCheck,
      variant: 'crm' as const,
      badge: 'Pending: 38',
      badgeColorClass: 'bg-indigo-50/50 text-indigo-700 border-indigo-200/50'
    },
    {
      name: '2. Sales Order Management',
      desc: 'Create, manage and track sales orders.',
      icon: ShoppingCart,
      variant: 'crm' as const,
      badge: 'Open Orders: 52',
      badgeColorClass: 'bg-emerald-50/50 text-emerald-700 border-emerald-200/50'
    },
    {
      name: '3. Customer Verification',
      desc: 'Verify credit limit, GST and customer details.',
      icon: UserCheck,
      variant: 'crm' as const,
      badge: 'Pending: 15',
      badgeColorClass: 'bg-amber-50/50 text-amber-700 border-amber-200/50'
    },
    {
      name: '4. Production Requirement',
      desc: 'Raise and track production requirements.',
      icon: Factory,
      variant: 'production' as const,
      badge: 'Pending: 18',
      badgeColorClass: 'bg-indigo-50/50 text-blue-700 border-blue-200/50'
    },
    {
      name: '5. Purchase Requirement',
      desc: 'Material shortage, indent and purchase request.',
      icon: ClipboardList,
      variant: 'procurement' as const,
      badge: 'Pending: 21',
      badgeColorClass: 'bg-amber-50/50 text-amber-700 border-amber-200/50'
    },
    {
      name: '6. Inventory Verification',
      desc: 'Check available, reserved and FG stock.',
      icon: Package,
      variant: 'inventory' as const,
      badge: 'Low Stock: 14',
      badgeColorClass: 'bg-rose-50/50 text-rose-700 border-rose-200/50'
    },
    {
      name: '7. Dispatch Management',
      desc: 'Plan dispatch, generate documents and approve.',
      icon: Truck,
      variant: 'logistics' as const,
      badge: 'Pending: 22',
      badgeColorClass: 'bg-sky-50/50 text-sky-800 border-sky-200/50'
    },
    {
      name: '8. Transport Allocation',
      desc: 'Allocate transport, vehicle and freight details.',
      icon: Truck,
      variant: 'logistics' as const,
      badge: 'Pending: 16',
      badgeColorClass: 'bg-amber-50/50 text-amber-700 border-amber-200/50'
    },
    {
      name: '9. Delivery Tracking',
      desc: 'Track deliveries, expected dates and status.',
      icon: Clock,
      variant: 'logistics' as const,
      badge: 'In Transit: 16',
      badgeColorClass: 'bg-indigo-50/50 text-indigo-700 border-indigo-200/50'
    },
    {
      name: '10. POD Management',
      desc: 'Manage POD collection and verification.',
      icon: FileText,
      variant: 'logistics' as const,
      badge: 'Pending: 19',
      badgeColorClass: 'bg-amber-50/50 text-amber-600 border-amber-200/50'
    },
    {
      name: '11. Invoice Management',
      desc: 'Generate, approve and share invoices.',
      icon: FileText,
      variant: 'finance' as const,
      badge: 'Pending: 26',
      badgeColorClass: 'bg-indigo-50/50 text-indigo-600 border-indigo-200/50'
    },
    {
      name: '12. Accounts Receivable',
      desc: 'Track outstanding, overdue and customer dues.',
      icon: CreditCard,
      variant: 'finance' as const,
      badge: 'Overdue: 12',
      badgeColorClass: 'bg-rose-50/50 text-rose-700 border-rose-200/50'
    },
    {
      name: '13. Payment Collection',
      desc: 'Record payments, receipts and update ledgers.',
      icon: CreditCard,
      variant: 'finance' as const,
      badge: 'Today: ₹12.40L',
      badgeColorClass: 'bg-indigo-50/50 text-indigo-600 border-indigo-200/50'
    },
    {
      name: '14. Material Return Management',
      desc: 'Handle material returns, credit notes and adjustments.',
      icon: AlertTriangle,
      variant: 'crm' as const,
      badge: 'Pending: 6',
      badgeColorClass: 'bg-amber-50/50 text-amber-700 border-amber-200/50'
    },
    {
      name: '15. Tally Integration',
      desc: 'Integrate sales, receipts and outstanding with Tally.',
      icon: RefreshCw,
      variant: 'finance' as const,
      badge: 'Last Sync: Today',
      badgeColorClass: 'bg-emerald-50/50 text-emerald-700 border-emerald-200/50'
    },
    {
      name: '16. Sales Reports & Analytics',
      desc: 'View reports, analytics and business insights.',
      icon: BarChart,
      variant: 'director' as const,
      badge: 'Reports: 28',
      badgeColorClass: 'bg-indigo-50/50 text-indigo-600 border-indigo-200/50'
    }
  ]
  },
  { 
    name: 'Customer Master', 
    icon: UserCheck, 
    desc: 'Manage customer registration, KYC, GST details, documents and credit limits.', 
    view: 'customer-master', 
    variant: 'crm' as const,
    badge: 'KYC Pending: 6',
    badgeColorClass: 'bg-purple-100/70 text-purple-700 border-purple-200/60'
,
    subModules: [
    { name: 'Customer Registration', icon: UserCheck },
    { name: 'Company Profile', icon: Building2 },
    { name: 'Contact Management', icon: Phone },
    { name: 'Address Management', icon: MapPin },
    { name: 'GST & Tax Details', icon: FileText },
    { name: 'Bank Details', icon: Landmark },
    { name: 'Credit Management', icon: CreditCard },
    { name: 'Business Profile', icon: Briefcase },
    { name: 'Order History', icon: History },
    { name: 'Payment History', icon: Receipt },
    { name: 'Relationship Management', icon: Users },
    { name: 'Customer Documents', icon: Folder },
    { name: 'Customer Analytics', icon: BarChart }
  ]
  },
  { 
    name: 'Purchase & Procurement Management', 
    icon: ClipboardList, 
    desc: 'Manage material procurement, purchase requests, purchase orders and GRN.', 
    view: 'procurement', 
    variant: 'procurement' as const,
    badge: 'Pending: 15',
    badgeColorClass: 'bg-amber-100/70 text-amber-700 border-amber-200/60'
,
    subModules: [
    { name: 'Indent Management', icon: ClipboardList },
    { name: 'Purchase Requisition', icon: FileText },
    { name: 'Vendor Selection', icon: UserCheck },
    { name: 'RFQ Management', icon: Search },
    { name: 'Purchase Orders', icon: ShoppingCart },
    { name: 'PO Approvals', icon: CheckCircle },
    { name: 'Vendor Follow-up', icon: Clock },
    { name: 'Transport Tracking', icon: Truck },
    { name: 'Material Receipt', icon: Package },
    { name: 'Quality Inspection', icon: ShieldCheck },
    { name: 'GRN Management', icon: FilePlus },
    { name: 'Material Rejection', icon: AlertTriangle },
    { name: 'Debit Note', icon: TrendingDown },
    { name: 'Credit Note', icon: TrendingUp },
    { name: 'Vendor Bills', icon: Receipt },
    { name: 'Tally Integration', icon: RefreshCw },
    { name: 'Vendor Payments', icon: CreditCard },
    { name: 'Reports & Analytics', icon: BarChart }
  ]
  },
  { 
    name: 'Vendor Master', 
    icon: Building2, 
    desc: 'Manage vendor onboarding, approvals, verification and performance.', 
    view: 'vendor-master', 
    variant: 'vendor-master' as const,
    badge: 'Pending Reviews: 4',
    badgeColorClass: 'bg-blue-100/70 text-blue-700 border-blue-200/60'
,
    subModules: [
    { name: 'Vendor Registration', icon: UserCheck },
    { name: 'Company Profile', icon: Building2 },
    { name: 'Contact Management', icon: Phone },
    { name: 'Address Management', icon: MapPin },
    { name: 'GST & Compliance', icon: FileText },
    { name: 'Bank Details', icon: Landmark },
    { name: 'Categories & Material', icon: ListChecks },
    { name: 'Purchase History', icon: History },
    { name: 'Delivery Performance', icon: Truck },
    { name: 'Quality Performance', icon: ShieldCheck },
    { name: 'Payment History', icon: Receipt },
    { name: 'Approval History', icon: FileClock },
    { name: 'Vendor Documents', icon: Folder },
    { name: 'Relationship Mgmt', icon: Users },
    { name: 'Vendor Analytics', icon: BarChart }
  ]
  },
  { 
    name: 'Inventory Management', 
    icon: Warehouse, 
    desc: 'Manage stock, warehouse operations and inventory movement.', 
    view: 'inventory', 
    variant: 'inventory' as const,
    badge: 'Low Stock: 9',
    badgeColorClass: 'bg-emerald-100/70 text-emerald-700 border-emerald-200/60'
,
    subModules: [
    { name: 'Item Master', icon: Package },
    { name: 'Raw Material Stock', icon: Archive },
    { name: 'Semi Finished Goods', icon: Layers },
    { name: 'Finished Goods', icon: Package },
    { name: 'Purchase Pending Tracker', icon: ShoppingCart },
    { name: 'In Transit Material', icon: Truck },
    { name: 'Material Receipt', icon: FileText },
    { name: 'Production Consumption', icon: Factory },
    { name: 'Sales Allocation', icon: ShoppingCart },
    { name: 'Warehouse Management', icon: Database },
    { name: 'Stock Level Monitoring', icon: LayoutGrid },
    { name: 'Reorder Planning', icon: RefreshCw },
    { name: 'Stock Valuation', icon: BarChart },
    { name: 'Purchase Return Tracker', icon: RotateCcw },
    { name: 'Inventory Control Sheet', icon: ClipboardList },
    { name: 'ABC Analysis', icon: BarChart },
    { name: 'Inventory Reports & Analytics', icon: BarChart }
  ]
  },
  { 
    name: 'Laboratory & LIMS', 
    icon: FlaskConical, 
    desc: 'Manage sample registrations, quality tests, NABL compliance and calibration.', 
    view: 'laboratory', 
    variant: 'laboratory' as const,
    badge: 'Pending Tests: 128',
    badgeColorClass: 'bg-cyan-100/70 text-cyan-700 border-cyan-200/60',
    subModules: [
      { name: 'Sample Registration', icon: ClipboardList, desc: 'Register incoming materials and assign barcodes.' },
      { name: 'Test Management', icon: Activity, desc: 'Perform tests, record results, and verify parameter compliance.' },
      { name: 'Quality Control', icon: ShieldCheck, desc: 'Monitor internal QC metrics and standard deviation data.' },
      { name: 'Report Generation', icon: FileText, desc: 'Generate and authorize final test certificates.' }
    ]
  },
  { 
    name: 'Logistics & Dispatch Management', 
    icon: Truck, 
    desc: 'Manage transporters, vehicles, dispatch tracking and POD.', 
    view: 'logistics', 
    variant: 'logistics' as const,
    badge: 'Pending: 18',
    badgeColorClass: 'bg-indigo-100/70 text-indigo-700 border-indigo-200/60'
,
    subModules: [
    { name: 'Transport Master', icon: Building2 },
    { name: 'Vehicle Master', icon: Car },
    { name: 'Driver Master', icon: User },
    { name: 'Purchase Inward Tracking', icon: Package },
    { name: 'Sales Dispatch Tracking', icon: Truck },
    { name: 'Vehicle Movement Tracking', icon: MapPin },
    { name: 'POD Management', icon: FileCheck },
    { name: 'Freight Bill Management', icon: FileText },
    { name: 'GST & TDS Compliance', icon: ShieldCheck },
    { name: 'Transport Payment Management', icon: CreditCard },
    { name: 'Rate Contract Management', icon: RefreshCw },
    { name: 'Material Movement History', icon: Package },
    { name: 'Transport Reports & Analytics', icon: BarChart }
  ]
  },
  { 
    name: 'Production & Quality Management', 
    icon: Factory, 
    desc: 'Manage manufacturing, work orders, quality control and finished goods.', 
    view: 'production', 
    variant: 'production' as const,
    badge: 'Active Runs: 8',
    badgeColorClass: 'bg-sky-100/70 text-sky-700 border-sky-200/60'
,
    subModules: [
    { name: 'Production Order Mgmt', icon: Factory },
    { name: 'Customer Order Linking', icon: ClipboardList },
    { name: 'BOM Management', icon: FileText },
    { name: 'Production Planning', icon: LayoutGrid },
    { name: 'Material Issue', icon: Database },
    { name: 'Live Production Tracking', icon: Clock },
    { name: 'Work Center Mgmt', icon: Factory },
    { name: 'Machine Utilization', icon: BarChart },
    { name: 'Quality Control', icon: CheckCircle },
    { name: 'Lab Testing', icon: Search },
    { name: 'Rejection & Rework', icon: AlertTriangle },
    { name: 'Finished Goods Mgmt', icon: Package },
    { name: 'Production Costing', icon: TrendingUp },
    { name: 'Prod. Value Analysis', icon: TrendingDown },
    { name: 'Tally Integration', icon: RefreshCw },
    { name: 'Production Reports & Analytics', icon: BarChart }
  ]
  },
  { 
    name: 'Finance & Accounting Management', 
    icon: Landmark, 
    desc: 'Manage billing, GST, receivables, payables and financial reports.', 
    view: 'finance', 
    variant: 'finance' as const,
    badge: 'Pending Bills: 14',
    badgeColorClass: 'bg-teal-100/70 text-teal-700 border-teal-200/60'
,
    subModules: [
    { name: 'Sales Accounts & Receivables', icon: CreditCard, desc: 'Track customer invoices and payment collections.' },
    { name: 'Purchase Accounts & Payables', icon: CreditCard, desc: 'Track vendor bills and payment status.' },
    { name: 'Transport Freight Accounts', icon: Landmark, desc: 'Track freight bills and payments.' },
    { name: 'Sales GST (Output GST)', icon: FileText, desc: 'Manage GST collected from sales.' },
    { name: 'Purchase GST (Input GST)', icon: FileText, desc: 'Manage GST Input Credit.' },
    { name: 'Credit Note Management', icon: TrendingUp, desc: 'Manage financial credit adjustments.' },
    { name: 'Debit Note Management', icon: TrendingDown, desc: 'Manage debit recoveries and adjustments.' },
    { name: 'Sales Profitability Analysis', icon: PieChart, desc: 'Analyze profitability per order/product.' },
    { name: 'Financial Reports', icon: BarChart, desc: 'Generate complete accounting reports.' },
    { name: 'Financial Analytics', icon: BarChart, desc: 'Management-level financial intelligence.' },
    { name: '360° Finance Summary', icon: Database, desc: 'Premium financial snapshot of the whole business.' },
  ]
  },
  { 
    name: 'HR & Administration', 
    icon: BriefcaseBusiness, 
    desc: 'Manage employees, attendance, payroll, approvals and administration.', 
    view: 'hr', 
    variant: 'hr' as const,
    badge: 'Pending Actions: 5',
    badgeColorClass: 'bg-rose-100/70 text-rose-700 border-rose-200/60'
,
    subModules: [
    { name: 'Employee Master', icon: User },
    { name: 'Department Assignment', icon: Building2 },
    { name: 'Employee Directory', icon: Users },
    { name: 'Attendance Management', icon: Clock },
    { name: 'Leave Management', icon: FileClock },
    { name: 'Payroll Management', icon: CreditCard },
    { name: 'Task Management', icon: CheckCircle },
    { name: 'Approval Management', icon: FileCheck },
    { name: 'Performance Management', icon: BarChart },
    { name: 'Employee Documents', icon: Folder },
    { name: 'Shift & Work Schedule', icon: Settings },
    { name: 'Resource Matrix', icon: LayoutGrid },
    { name: 'HR Reports & Analytics', icon: BarChart }
  ]
  },
  { 
    name: 'Costing & Profitability Management', 
    icon: Calculator, 
    desc: 'Monitor business costing, margins, and financial performance.', 
    view: 'costing', 
    variant: 'finance' as const,
    badge: 'Audits Pending: 3',
    badgeColorClass: 'bg-teal-100/70 text-teal-700 border-teal-200/60'
,
    subModules: [
    { name: 'Product Costing', icon: Calculator },
    { name: 'Order Costing', icon: FileText },
    { name: 'Customer Profitability', icon: PieChart },
    { name: 'Vendor Cost Analysis', icon: BarChart },
    { name: 'Transport Cost Analysis', icon: BarChart },
    { name: 'Production Cost Analysis', icon: TrendingUp },
    { name: 'Material Cost Analysis', icon: BarChart },
    { name: 'Margin Analysis', icon: TrendingUp },
    { name: 'Cost Variance Analysis', icon: TrendingDown },
    { name: 'Budget vs Actual', icon: BarChart }
  ]
  },
  { 
    name: 'Director Control Center', 
    icon: LayoutDashboard, 
    desc: 'Executive dashboard for real-time monitoring and strategic decision making.', 
    view: 'director', 
    variant: 'director' as const,
    badge: 'Alerts: 2',
    badgeColorClass: 'bg-violet-100/70 text-violet-700 border-violet-200/60'
,
    subModules: [
    { name: 'Director Dashboard', icon: LayoutDashboard },
    { name: 'Department Performance', icon: BarChart },
    { name: 'Pending Approvals', icon: CheckSquare },
    { name: 'Employee Performance', icon: UserSquare },
    { name: 'Task Monitoring', icon: FileText },
    { name: 'Revenue & Cost Monitoring', icon: BarChart },
    { name: 'Business Alerts & Notifications', icon: Bell },
    { name: 'Management Reports', icon: FileText }
  ]
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true' ? 'dashboard' : 'landing';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || 'admin';
  });
  const [activeTab, setActiveTab] = useState<'reyo' | 'modules' | 'agents' | 'approvals' | 'reports' | 'my-team'>('modules');
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
      setFormattedDate(now.toLocaleDateString('en-GB', dateOptions));
      
      const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
      const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      const dayStr = now.toLocaleDateString('en-US', dayOptions);
      const timeStr = now.toLocaleTimeString('en-US', timeOptions);
      setFormattedTime(`${dayStr}, ${timeStr}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    const [mainView, subView] = currentView.split(':');

    if (mainView === 'settings') {
      return <SettingsWorkspace onBack={() => setCurrentView('dashboard')} />;
    }

    if (mainView === 'crm') {
      return <CrmWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView || 'CRM Dashboard'} formattedDate={formattedDate} formattedTime={formattedTime} />;
    }
    if (mainView === 'marketing') {
      return <MarketingWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} formattedDate={formattedDate} formattedTime={formattedTime} />;
    }
    if (currentView === 'crm-agent') {
      return (
        <CrmAiAgentWorkspace 
          onBack={() => setCurrentView('dashboard')} 
          formattedDate={formattedDate}
          formattedTime={formattedTime}
          onOpenAiAgent={(agentId) => {
            let nextView = 'crm-ai';
            if (agentId === 'autopsy') nextView = 'autopsy-engine';
            if (agentId === 'kill-critic') nextView = 'kill-critic';
            if (agentId === 'expose-engine') nextView = 'expose-engine';
            if (agentId === 'ceo') nextView = 'ceo-dashboard';
            
            if (!document.startViewTransition) {
              setCurrentView(nextView);
              return;
            }
            document.startViewTransition(() => setCurrentView(nextView));
          }}
        />
      );
    }
    if (currentView === 'crm-ai') {
      return <CrmAiAgentDashboard onBack={() => {
        if (!document.startViewTransition) {
          setCurrentView('crm-agent');
          return;
        }
        document.startViewTransition(() => setCurrentView('crm-agent'));
      }} />;
    }
    if (currentView === 'autopsy-engine') {
      return <AutopsyEngineDashboard onBack={() => {
        if (!document.startViewTransition) {
          setCurrentView('crm-agent');
          return;
        }
        document.startViewTransition(() => setCurrentView('crm-agent'));
      }} />;
    }
    if (currentView === 'kill-critic') {
      return <KillCriticDashboard onBack={() => {
        if (!document.startViewTransition) {
          setCurrentView('crm-agent');
          return;
        }
        document.startViewTransition(() => setCurrentView('crm-agent'));
      }} />;
    }
    if (currentView === 'expose-engine') {
      return <ExposeEngineDashboard onBack={() => {
        if (!document.startViewTransition) {
          setCurrentView('crm-agent');
          return;
        }
        document.startViewTransition(() => setCurrentView('crm-agent'));
      }} />;
    }
    if (currentView === 'ceo-dashboard') {
      return <EliteCeoDashboard onBack={() => {
        if (!document.startViewTransition) {
          setCurrentView('crm-agent');
          return;
        }
        document.startViewTransition(() => setCurrentView('crm-agent'));
      }} />;
    }
    if (currentView === 'sales-agent') {
      return <SalesAiAgentDashboard onBack={() => {
        if (!document.startViewTransition) {
          setCurrentView('dashboard');
          return;
        }
        document.startViewTransition(() => setCurrentView('dashboard'));
      }} />;
    }
    if (mainView === 'sales') {
      return <SalesWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
    }
    if (mainView === 'customer-master') {
      return <CustomerMasterWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
    }
    if (mainView === 'procurement') {
      return <ProcurementWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} formattedDate={formattedDate} formattedTime={formattedTime} />;
    }
    if (mainView === 'vendor-master') {
      return <VendorMasterWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} formattedDate={formattedDate} formattedTime={formattedTime} />;
    }
    if (mainView === 'inventory') {
      return <InventoryWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
    }
    if (mainView === 'logistics') {
      return <LogisticsWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
    }
    if (mainView === 'production') {
      return <ProductionWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
    }
    if (mainView === 'finance') {
      return <FinanceWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
    }
    if (mainView === 'hr') {
      return <HrWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
    }
    if (mainView === 'laboratory') {
      return <LaboratoryWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} formattedDate={formattedDate} formattedTime={formattedTime} />;
    }
    if (mainView === 'costing') {
      return <CostingWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
    }
    if (mainView === 'director') {
      return <DirectorWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
    }
    if (currentView === 'crm-ai') {
      return <CrmAiAgentDashboard onBack={() => {
        if (!document.startViewTransition) {
          setCurrentView('crm-agent');
          return;
        }
        document.startViewTransition(() => setCurrentView('crm-agent'));
      }} />;
    }
    // Fallback if view not matched
    return <div className="p-8 text-center text-gray-500">View not implemented yet.</div>;
  };

  if (currentView === 'landing' || !isAuthenticated) {
    return <LandingPage onLoginSuccess={(role) => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', role);
      setUserRole(role);
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    }} />;
  }

  if (currentView !== 'dashboard') {
    return renderContent();
  }

  const roleMap: Record<string, string[]> = {
    crm: ['crm'],
    sales: ['sales'],
    purchase: ['procurement'],
    procurement: ['procurement'],
    inventory: ['inventory'],
    logistics: ['logistics'],
    production: ['production'],
    finance: ['finance', 'costing'],
    hr: ['hr'],
    director: ['director'],
    'vendor-master': ['vendor-master'],
    marketing: ['marketing'],
    'customer-master': ['customer-master']
  };

  const roleFilteredDepartments = userRole === 'admin' 
    ? departments 
    : departments.filter(d => roleMap[userRole]?.includes(d.view));

  const displayItems = roleFilteredDepartments;

  const filteredDepartments = displayItems.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (dept.desc && dept.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getShortName = (name: string) => {
    return name
      .replace(' & Customer Management', '')
      .replace(' & Revenue Management', '')
      .replace(' & Procurement Management', '')
      .replace(' & Transport Management', '')
      .replace(' & Quality Management', '')
      .replace(' & Accounting Management', '')
      .replace(' & Administration', '')
      .replace(' & Profitability Management', '')
      .replace(' Control Center', '')
      .replace(' Management', '');
  };

  return (
    <div className="min-h-screen bg-[#f9fbf6] text-gray-950 font-sans flex flex-col overflow-hidden relative">
      {/* Decorative Brand Colors Background Blobs (Olive Green & Vibrant Orange) */}
      <div className="absolute top-[-10%] left-[-10%] w-[45rem] h-[45rem] bg-[#7C9C54]/30 rounded-full blur-[140px] pointer-events-none animate-blob z-0"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-[#F2642A]/20 rounded-full blur-[140px] pointer-events-none animate-blob animation-delay-400 z-0"></div>
      <div className="absolute top-[20%] left-[60%] w-[35rem] h-[35rem] bg-[#7C9C54]/20 rounded-full blur-[120px] pointer-events-none animate-blob animation-delay-800 z-0"></div>
      
      {/* Sticky top horizontal header navigation */}
      <header className="bg-white text-gray-900 border-b border-gray-200/80 shadow-xs sticky top-0 z-30 select-none">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
              <>
                {/* Logo Area & Left Tagline */}
                <div className="flex items-center gap-2 max-w-[70%] overflow-hidden">
                  {/* Hamburger menu trigger for mobile */}
                  <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 md:hidden cursor-pointer shrink-0"
                  >
                    <Menu size={20} />
                  </button>

                  <div 
                    className="flex items-center gap-2 sm:gap-3.5 shrink-0 cursor-pointer"
                    onClick={() => {
                      setShouldAnimate(false);
                      setCurrentView('dashboard');
                      setActiveTab('modules');
                    }}
                  >
                    {/* Graphic Logo (Passary Refractories) */}
                    <div className="flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all duration-200">
                      <svg className="w-8 h-8" viewBox="25 25 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 25 75 L 25 45 A 25 18 0 0 1 75 45 L 75 75 L 43 75 L 43 63 L 63 63 L 63 45 A 13 6 0 0 0 37 45 L 37 75 Z" fill="#8a9a5b" />
                      </svg>
                    </div>
      
                    {/* Desktop Tagline text: updated size, bold, and split colors */}
                    <div className="hidden md:flex items-center justify-center pb-1 pt-1 ml-2">
                      <span className="font-extrabold text-xl sm:text-2xl tracking-tight leading-normal text-[#8a9a5b]">Passary Refractories</span>
                      <span className="text-gray-400 mx-2 font-extrabold text-xl sm:text-2xl">–</span>
                      <span className="font-extrabold text-[#f05627] text-xl sm:text-2xl tracking-tight leading-normal">Forging Energy-Efficient Solutions</span>
                    </div>

                    {/* Mobile wrapped branding tagline: prevents name or tagline from ever being cut */}
                    <div className="flex flex-col justify-center pb-1 pt-1 ml-2 md:hidden">
                      <span className="font-extrabold text-xs sm:text-sm tracking-tight leading-tight text-[#8a9a5b] whitespace-normal">Passary Refractories</span>
                      <span className="font-bold text-[9px] text-[#f05627] tracking-tight leading-tight mt-0.5 whitespace-normal">Forging Energy-Efficient Solutions</span>
                    </div>
                  </div>
                </div>
                
                {/* Right Side Tagline, Notifications, Settings & Logout */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                  {/* Notification & Settings */}
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    <button className="relative p-2 bg-white hover:bg-[#f5f8f0] border border-gray-100 rounded-full text-slate-500 hover:text-[#4a6b22] transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(74,107,34,0.15)]">
                      <Bell size={16} strokeWidth={2.2} />
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#F2642A] rounded-full border border-white animate-pulse"></span>
                    </button>
                    
                    <button 
                      onClick={() => setShowCredentialsModal(true)}
                      className="p-2 bg-white hover:bg-[#f5f8f0] border border-gray-100 rounded-full text-slate-500 hover:text-[#4a6b22] transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(74,107,34,0.15)]"
                      title="Credentials Guide"
                    >
                      <Shield size={16} strokeWidth={2.2} />
                    </button>
                    
                    <button 
                      onClick={() => setCurrentView('settings')}
                      className="hidden sm:inline-block p-2 bg-white hover:bg-[#f5f8f0] border border-gray-100 rounded-full text-slate-500 hover:text-[#4a6b22] transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(74,107,34,0.15)]"
                      title="Settings"
                    >
                      <Settings size={16} strokeWidth={2.2} />
                    </button>
                  </div>
    
                  <div className="h-6 border-l border-gray-200 mx-0.5 sm:mx-1" />
                  {currentView !== 'dashboard' ? (
                    <button 
                      onClick={() => setCurrentView('dashboard')}
                      className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold bg-[#4a6b22] hover:bg-[#3b5936] text-white border-none rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(74,107,34,0.3)] hover:shadow-[0_6px_16px_rgba(74,107,34,0.4)] cursor-pointer group tracking-wider"
                    >
                      <Home size={14} className="text-white/90 group-hover:-translate-y-0.5 transition-transform" />
                      <span className="hidden sm:inline">Back to Home</span>
                    </button>
                  ) : (
                    <button 
                       onClick={() => {
                        localStorage.removeItem('isAuthenticated');
                        localStorage.removeItem('userRole');
                        setIsAuthenticated(false);
                        setCurrentView('landing');
                      }}
                      className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold bg-[#ff5a1f] hover:bg-[#e64a14] text-white border-none rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(255,90,31,0.3)] hover:shadow-[0_6px_16px_rgba(255,90,31,0.4)] cursor-pointer group tracking-wider"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </>
          </div>
        </div>
      </header>

      {/* Body Container */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Main Content Pane */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto scroll-smooth custom-scrollbar bg-gray-50/30 pb-24 md:pb-8">
            <header className="mb-6 select-none relative overflow-hidden rounded-[24px] border border-gray-100/50 shadow-sm px-6 py-6 lg:px-8 lg:py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Background Container */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#eef6e6] via-[#f7ebd9] to-[#ffdbb8]">
            {/* SVG Waves */}
            <svg className="absolute bottom-0 w-full h-auto text-[#dceacd] opacity-60 pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,250.7C672,277,768,267,864,240C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
            <svg className="absolute bottom-0 w-full h-auto text-[#eef6e6] opacity-90 pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,128L48,138.7C96,149,192,171,288,181.3C384,192,480,192,576,170.7C672,149,768,107,864,101.3C960,96,1056,128,1152,149.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>

            {/* Subtle decorative dots */}
            <div className="absolute top-[30%] left-[60%] w-24 h-24 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F2642A 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
            <div className="absolute bottom-[20%] left-[5%] w-20 h-20 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7C9C54 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>

            {/* Sparkles */}
            <Sparkles className="absolute top-[20%] left-[45%] text-white opacity-60" size={12} />
            <Sparkles className="absolute top-[40%] right-[35%] text-white opacity-80" size={16} />
            <Sparkles className="absolute bottom-[30%] left-[30%] text-white opacity-50" size={10} />
          </div>

          <div className="relative z-10 flex flex-col items-start w-full md:w-[65%]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#113a1a] tracking-tight leading-tight mb-2 font-serif">
              {activeTab === 'reyo' && 'How can PASSARY AI ASSISTANT assist you today?'}
              {activeTab === 'modules' && 'What would you like to work on today?'}
              {activeTab === 'agents' && 'Which AI Agent would you like to consult?'}
              {activeTab === 'approvals' && 'Pending authorizations require your attention'}
              {activeTab === 'reports' && 'Which report would you like to view today?'}
              {activeTab === 'my-team' && 'Manage your team and resources'}
            </h2>
            <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-semibold text-[#3b5936] mb-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2642A] inline-block animate-pulse" />
                {activeTab === 'reyo' && 'Overall Work Monitor & AI Companion'}
                {activeTab === 'modules' && 'ERP Automation Business Workflow'}
                {activeTab === 'agents' && 'AI Intelligence & Automation Core'}
                {activeTab === 'approvals' && 'Centralized Approval Center'}
                {activeTab === 'reports' && 'Analytics & Reporting Hub'}
                {activeTab === 'my-team' && 'Team & Resource Management'}
              </span>
              <span className="text-[#3b5936]/40">|</span>
              <span className="flex items-center gap-1.5 text-[#3b5936]/80">
                <Calendar size={12} />
                {formattedDate || "17 May 2025, Saturday"}
              </span>
            </div>

            {/* Banner Search & Quick Controls (Desktop Only) */}
            <div className="hidden md:flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mt-4">
              {/* Elegant Search Bar */}
              <div className="relative w-full sm:flex-1">
                <input 
                  id="module-search-desktop"
                  type="text"
                  placeholder="Search modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-2.5 text-[13px] sm:text-[11px] font-semibold bg-white/95 border-none text-gray-700 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#7C9C54]/30 transition-all placeholder:text-gray-400 font-sans shadow-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#244f24]" size={16} strokeWidth={2.5} />
              </div>

              {/* Help Button */}
              <button className="w-full sm:w-auto py-3 sm:py-2.5 px-4 bg-white/95 border-none text-gray-800 rounded-[12px] hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-1.5 text-[13px] sm:text-[11px] font-bold shadow-sm cursor-pointer">
                <HelpCircle size={16} className="text-[#244f24] sm:w-[14px] sm:h-[14px]" strokeWidth={2.5} />
                <span>Help Guide</span>
              </button>
            </div>
          </div>
          
          {/* Right side illustration */}
          <div className="z-10 w-full md:w-[35%] flex justify-end pointer-events-none mix-blend-darken absolute md:relative right-0 bottom-0 md:bottom-auto md:right-auto opacity-90 md:opacity-100">
            <img 
              src="/dashboard-illustration-5.png" 
              alt="Working illustration" 
              className="w-[140px] md:max-w-[180px] lg:max-w-[220px] object-contain animate-float-slow filter brightness-[1.02] contrast-[1.05]" 
            />
          </div>
        </header>

        {/* Mobile Search Bar (Outside Banner) */}
        <div className="flex md:hidden items-center gap-3 w-full mb-6 px-1">
          <div className="relative flex-1">
            <input 
              id="module-search-mobile"
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-[13px] font-semibold bg-white border border-gray-100 text-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7C9C54]/30 transition-all placeholder:text-gray-400 font-sans shadow-sm"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2} />
          </div>
          <button className="w-12 h-12 shrink-0 bg-white border border-gray-100 text-gray-800 rounded-2xl flex items-center justify-center shadow-sm active:bg-gray-50 transition-colors">
            <HelpCircle size={20} className="text-gray-600" strokeWidth={2} />
          </button>
        </div>


        {/* Pill-shaped Tabs (Desktop Only) */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3 mb-8 px-4 sm:px-6 pt-2 pb-2 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => {
              setActiveTab('reyo');
              setShouldAnimate(true);
            }}
            className={`px-5 py-2.5 text-sm sm:text-[14px] font-bold font-serif flex items-center gap-2 transition-all duration-300 cursor-pointer whitespace-nowrap rounded-full ${
              activeTab === 'reyo' ? 'bg-[#ff5a1f] text-white shadow-[0_4px_12px_rgba(255,90,31,0.3)] hover:shadow-[0_6px_16px_rgba(255,90,31,0.4)]' : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 border border-gray-200/60 shadow-sm'
            }`}
          >
            <Sparkles size={16} strokeWidth={2.5} />
            PASSARY AI ASSISTANT
          </button>
          
          <button
            onClick={() => {
              setActiveTab('modules');
              setShouldAnimate(true);
            }}
            className={`px-5 py-2.5 text-sm sm:text-[14px] font-bold font-serif flex items-center gap-2 transition-all duration-300 cursor-pointer whitespace-nowrap rounded-full ${
              activeTab === 'modules' ? 'bg-[#ff5a1f] text-white shadow-[0_4px_12px_rgba(255,90,31,0.3)] hover:shadow-[0_6px_16px_rgba(255,90,31,0.4)]' : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 border border-gray-200/60 shadow-sm'
            }`}
          >
            <Briefcase size={16} strokeWidth={2.5} />
            Work Departments
          </button>
          
          <button
            onClick={() => {
              setActiveTab('agents');
              setShouldAnimate(true);
            }}
            className={`px-5 py-2.5 text-sm sm:text-[14px] font-bold font-serif flex items-center gap-2 transition-all duration-300 cursor-pointer whitespace-nowrap rounded-full ${
              activeTab === 'agents' ? 'bg-[#ff5a1f] text-white shadow-[0_4px_12px_rgba(255,90,31,0.3)] hover:shadow-[0_6px_16px_rgba(255,90,31,0.4)]' : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 border border-gray-200/60 shadow-sm'
            }`}
          >
            <Bot size={16} strokeWidth={2.5} />
            AI Agents
          </button>
          
          <button
            onClick={() => {
              setActiveTab('approvals');
              setShouldAnimate(true);
            }}
            className={`px-5 py-2.5 text-sm sm:text-[14px] font-bold font-serif flex items-center gap-2 transition-all duration-300 cursor-pointer whitespace-nowrap rounded-full ${
              activeTab === 'approvals' ? 'bg-[#ff5a1f] text-white shadow-[0_4px_12px_rgba(255,90,31,0.3)] hover:shadow-[0_6px_16px_rgba(255,90,31,0.4)]' : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 border border-gray-200/60 shadow-sm'
            }`}
          >
            <ClipboardCheck size={16} strokeWidth={2.5} />
            Approval Center
          </button>

          <button
            onClick={() => {
              setActiveTab('reports');
              setShouldAnimate(true);
            }}
            className={`px-5 py-2.5 text-sm sm:text-[14px] font-bold font-serif flex items-center gap-2 transition-all duration-300 cursor-pointer whitespace-nowrap rounded-full ${
              activeTab === 'reports' ? 'bg-[#ff5a1f] text-white shadow-[0_4px_12px_rgba(255,90,31,0.3)] hover:shadow-[0_6px_16px_rgba(255,90,31,0.4)]' : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 border border-gray-200/60 shadow-sm'
            }`}
          >
            <BarChart size={16} strokeWidth={2.5} />
            Reporting Center
          </button>
          
          <button
            onClick={() => {
              setActiveTab('my-team');
              setShouldAnimate(true);
            }}
            className={`px-5 py-2.5 text-sm sm:text-[14px] font-bold font-serif flex items-center gap-2 transition-all duration-300 cursor-pointer whitespace-nowrap rounded-full ${
              activeTab === 'my-team' ? 'bg-[#ff5a1f] text-white shadow-[0_4px_12px_rgba(255,90,31,0.3)] hover:shadow-[0_6px_16px_rgba(255,90,31,0.4)]' : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 border border-gray-200/60 shadow-sm'
            }`}
          >
            <Users size={16} strokeWidth={2.5} />
            My Team
          </button>
        </div>

        {/* AI Assistant Panel */}
        {activeTab === 'reyo' && (
          <section className="mb-12 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-md animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-950 font-sans">PASSARY AI ASSISTANT</h4>
                  <p className="text-[10px] text-gray-500 font-medium">Overall Work Monitor & Automation Assistant</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center my-6">
              <ReyoVoiceAssistant />
            </div>
          </section>
        )}


        {activeTab === 'approvals' && (
          <div className="mb-12 animate-fade-in-up">
            <ApprovalCenter userRole={userRole} />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="mb-12 animate-fade-in-up">
            <ReportingCenter userRole={userRole} />
          </div>
        )}

        {activeTab === 'my-team' && (
          <div className="mb-12 text-center py-12 animate-fade-in-up">
            <p className="text-gray-400 text-lg font-serif">My Team module is coming soon.</p>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="mb-12 animate-fade-in-up">
            <div className="mb-6">
              <p className="text-gray-500 text-sm font-medium">Har module ka apna dedicated AI Agent — seedha kaam karo</p>
            </div>

            {/* Desktop View (grid cols 1 on mobile, but hidden md:grid takes over on tablet/desktop) */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDepartments.map((dept, index) => (
                <AIAgentCard 
                  key={`agent-${dept.name}`} 
                  name={dept.name} 
                  icon={dept.icon} 
                  desc={dept.desc} 
                  badge={dept.badge}
                  badgeColorClass={dept.badgeColorClass}
                  variant={dept.variant}
                  isInner={userRole !== 'admin'}
                  index={index}
                  shouldAnimate={shouldAnimate}
                  onClick={() => {
                    if (dept.view) {
                      setShouldAnimate(false);
                      if (dept.view === 'crm') {
                        setCurrentView('crm-agent');
                      } else if (dept.view === 'sales') {
                        setCurrentView('sales-agent');
                      } else {
                        setCurrentView(dept.view);
                      }
                    }
                  }}
                />
              ))}
            </div>

            {/* Mobile View: Stacked single-row cards */}
            <div className="flex flex-col gap-3 md:hidden">
              {filteredDepartments.map((dept) => {
                const Icon = dept.icon;
                const colorScheme = {
                  crm: 'bg-purple-50 text-purple-600 border-purple-100',
                  procurement: 'bg-amber-50 text-amber-600 border-amber-100',
                  inventory: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                  logistics: 'bg-indigo-50 text-indigo-600 border-indigo-100',
                  production: 'bg-sky-50 text-sky-600 border-sky-100',
                  finance: 'bg-teal-50 text-teal-600 border-teal-100',
                  hr: 'bg-rose-50 text-rose-600 border-rose-100',
                  director: 'bg-violet-50 text-violet-600 border-violet-100',
                  'vendor-master': 'bg-blue-50 text-blue-600 border-blue-100',
                  marketing: 'bg-pink-50 text-pink-600 border-pink-100',
                  laboratory: 'bg-cyan-50 text-cyan-600 border-cyan-100',
                  sales: 'bg-blue-50 text-blue-600 border-blue-100',
                }[dept.variant] || 'bg-gray-50 text-gray-600 border-gray-100';

                return (
                  <div
                    key={`mobile-agent-${dept.name}`}
                    onClick={() => {
                      if (dept.view) {
                        setShouldAnimate(false);
                        if (dept.view === 'crm') {
                          setCurrentView('crm-agent');
                        } else if (dept.view === 'sales') {
                          setCurrentView('sales-agent');
                        } else {
                          setCurrentView(dept.view);
                        }
                      }
                    }}
                    className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:bg-gray-100 transition-all cursor-pointer min-h-[72px]"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${colorScheme}`}>
                        <Icon size={20} />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[13px] font-bold text-gray-900 leading-snug truncate">{dept.name} AI</h4>
                          <span className="text-[8px] font-bold tracking-wider rounded px-1.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                            LIVE
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mt-0.5">{dept.desc || `Consult the ${dept.name} AI Agent...`}</p>
                      </div>
                    </div>
                    <div className="text-gray-400 pl-2 shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="mb-12 animate-fade-in-up">
            {/* Desktop View */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((dept, index) => (
                  <ERPModuleCard 
                    key={dept.name} 
                    name={dept.name} 
                    icon={dept.icon} 
                    desc={dept.desc} 
                    variant={dept.variant}
                    isInner={userRole !== 'admin'}
                    index={index}
                    shouldAnimate={shouldAnimate}
                    onClick={() => {
                      if (dept.view === 'reyo-ai') {
                        setActiveTab('reyo');
                        return;
                      }
                      if (dept.view) {
                        setShouldAnimate(false);
                        setCurrentView(dept.view);
                      }
                    }}
                    badge={dept.badge}
                    badgeColorClass={dept.badgeColorClass}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-gray-400 text-base font-serif">No modules match your search query.</p>
                </div>
              )}
            </div>

            {/* Mobile View: 3-column grid cards (Matching screenshot) */}
            <div className="grid grid-cols-3 gap-3 md:hidden px-1">
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((dept) => {
                  const Icon = dept.icon;
                  const colorScheme = {
                    crm: 'bg-purple-50 text-purple-600 border-purple-100',
                    procurement: 'bg-amber-50 text-amber-600 border-amber-100',
                    inventory: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                    logistics: 'bg-indigo-50 text-indigo-600 border-indigo-100',
                    production: 'bg-sky-50 text-sky-600 border-sky-100',
                    finance: 'bg-teal-50 text-teal-600 border-teal-100',
                    hr: 'bg-rose-50 text-rose-600 border-rose-100',
                    director: 'bg-violet-50 text-violet-600 border-violet-100',
                    'vendor-master': 'bg-blue-50 text-blue-600 border-blue-100',
                    marketing: 'bg-pink-50 text-pink-600 border-pink-100',
                    laboratory: 'bg-cyan-50 text-cyan-600 border-cyan-100',
                    sales: 'bg-blue-50 text-blue-600 border-blue-100',
                  }[dept.variant] || 'bg-gray-50 text-gray-600 border-gray-100';

                  return (
                    <div
                      key={`mobile-module-${dept.name}`}
                      onClick={() => {
                        if (dept.view === 'reyo-ai') {
                          setActiveTab('reyo');
                          return;
                        }
                        if (dept.view) {
                          setShouldAnimate(false);
                          setCurrentView(dept.view);
                        }
                      }}
                      className="bg-white rounded-[20px] p-3 sm:p-4 border border-gray-100 shadow-sm flex flex-col justify-between items-start relative transition-all active:scale-95 cursor-pointer h-[120px]"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-2 border ${colorScheme}`}>
                        <Icon size={16} />
                      </div>
                      
                      {/* Animated Decorative Background Graphic */}
                      <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-[0.15] overflow-visible">
                        <Icon size={42} className={`animate-float-slow ${colorScheme.split(' ')[1]}`} />
                        <Sparkles size={14} className={`absolute -top-1.5 -right-2.5 opacity-60 animate-pulse ${colorScheme.split(' ')[1]}`} />
                        <div className={`absolute bottom-1 -left-1.5 w-2 h-2 rounded-full opacity-50 animate-ping ${colorScheme.split(' ')[0].replace('bg-', 'bg-').replace('-50', '-500')}`} />
                      </div>
                      
                      <h4 className="text-[10px] font-extrabold text-gray-900 leading-tight line-clamp-3 w-full pr-2 break-words text-left">
                        {dept.name}
                      </h4>
                      
                      <div className="absolute bottom-2.5 right-2.5 text-gray-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-400 text-base font-serif">No modules match your search query.</p>
                </div>
              )}
            </div>
          </div>
        )}
        </main>
      </div>

      {/* Credentials Guide Modal */}
      {showCredentialsModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#fcfdfa] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-8 py-6 flex items-start justify-between border-b border-gray-100 bg-white">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f4f9ea] text-[#4a6b22] rounded-full text-[11px] font-extrabold tracking-widest mb-3">
                  <User size={14} /> LOGIN CREDENTIALS GUIDE
                </div>
                <p className="text-gray-600 text-[13px] font-medium">Use the following Employee ID and Password to access different modules.</p>
              </div>
              <button 
                onClick={() => setShowCredentialsModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Table */}
            <div className="overflow-y-auto hide-scrollbar p-6 bg-[#fcfdfa]">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100/50 text-[11px] text-[#4a6b22] font-bold text-left uppercase tracking-wider">
                    <th className="pb-3 pl-2">Module</th>
                    <th className="pb-3 pl-4">Employee ID</th>
                    <th className="pb-3 text-center">Password</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/50">
                  {[
                    { name: 'Marketing Performance Center', id: 'marketing', icon: Megaphone, color: 'text-pink-500', bg: 'bg-pink-50' },
                    { name: 'CRM & Customer Management', id: 'crm', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { name: 'Sales & Revenue Management', id: 'sales', icon: ShoppingCart, color: 'text-green-500', bg: 'bg-green-50' },
                    { name: 'Customer Master', id: 'customer', icon: UserPlus, color: 'text-fuchsia-500', bg: 'bg-fuchsia-50' },
                    { name: 'Purchase & Procurement', id: 'purchase', icon: ClipboardList, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { name: 'Vendor Master', id: 'vendor', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { name: 'Inventory Management', id: 'inventory', icon: Warehouse, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { name: 'Laboratory & LIMS', id: 'lab', icon: FlaskConical, color: 'text-cyan-500', bg: 'bg-cyan-50' },
                    { name: 'Logistics & Dispatch Management', id: 'dispatch', icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100' },
                    { name: 'Production & Quality Management', id: 'production', icon: Factory, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { name: 'Finance & Accounting Management', id: 'finance', icon: Landmark, color: 'text-teal-500', bg: 'bg-teal-50' },
                    { name: 'HR & Administration', id: 'hr', icon: Briefcase, color: 'text-red-500', bg: 'bg-red-50' },
                    { name: 'Costing & Profitability Management', id: 'costing', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                    { name: 'Director Control Center', id: 'director', icon: LayoutGrid, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { name: 'System Administrator', id: 'admin', icon: Shield, color: 'text-[#4a6b22]', bg: 'bg-[#f4f9ea]' }
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-white transition-colors">
                      <td className="py-2.5 px-2 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${row.bg} flex items-center justify-center ${row.color}`}>
                          <row.icon size={16} />
                        </div>
                        <span className="font-bold text-gray-700 text-[12px]">{row.name}</span>
                      </td>
                      <td className="py-2.5 pl-4">
                        <span className="px-2.5 py-1 bg-[#f4f9ea] text-[#4a6b22] font-extrabold rounded-md text-[11px] tracking-wide">{row.id}</span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="px-2.5 py-1 bg-white border border-gray-100 text-gray-500 font-extrabold rounded-md text-[11px] shadow-sm">1234</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0 bg-[#fcfdfa]">
              <div className="w-full px-4 py-3 bg-[#f4f9ea] rounded-xl flex items-center gap-3 text-[#4a6b22]">
                <Lightbulb size={18} />
                <div className="font-medium text-[13px]">
                  <span className="font-extrabold mr-2 text-black">Note:</span> 
                  Password for all accounts is <span className="px-2.5 py-0.5 bg-[#e1ecd0] rounded font-bold text-black ml-1">1234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sliding Drawer Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/40 z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Slide-out Panel */}
          <div className="fixed inset-y-0 left-0 w-[280px] bg-white z-[60] shadow-2xl p-6 flex flex-col justify-between md:hidden animate-in slide-in-from-left duration-200">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="25 25 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 25 75 L 25 45 A 25 18 0 0 1 75 45 L 75 75 L 43 75 L 43 63 L 63 63 L 63 45 A 13 6 0 0 0 37 45 L 37 75 Z" fill="#8a9a5b" />
                  </svg>
                  <span className="font-extrabold text-base text-[#8a9a5b]">Passary</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {[
                  { id: 'reyo', name: 'Passary AI Assistant', icon: Sparkles },
                  { id: 'modules', name: 'Work Departments', icon: Briefcase },
                  { id: 'agents', name: 'AI Agents', icon: Bot },
                  { id: 'approvals', name: 'Approval Center', icon: ClipboardCheck },
                  { id: 'reports', name: 'Reporting Center', icon: BarChart },
                  { id: 'my-team', name: 'My Team', icon: Users }
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setCurrentView('dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-[#f4f9ea] text-[#4a6b22]' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-[#4a6b22]' : 'text-gray-400'} />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Logout/Footer */}
            <div className="border-t border-gray-100 pt-4">
              <button 
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  localStorage.removeItem('userRole');
                  setIsAuthenticated(false);
                  setCurrentView('landing');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-sm rounded-xl cursor-pointer transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Sticky Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-lg flex items-center justify-around z-40 md:hidden select-none pb-safe">
        {[
          { id: 'dashboard', name: 'Dashboard', icon: Home, action: () => { setCurrentView('dashboard'); setActiveTab('modules'); } },
          { id: 'modules', name: 'Departments', icon: Briefcase, action: () => { setCurrentView('dashboard'); setActiveTab('modules'); } },
          { id: 'agents', name: 'AI Agents', icon: Bot, action: () => { setCurrentView('dashboard'); setActiveTab('agents'); } },
          { id: 'reports', name: 'Reports', icon: BarChart, action: () => { setCurrentView('dashboard'); setActiveTab('reports'); } },
          { id: 'more', name: 'More', icon: Settings, action: () => { setCurrentView('settings'); } }
        ].map((item) => {
          const isCurrentTab = currentView === 'dashboard' && activeTab === item.id;
          const isCurrentViewSetting = currentView === 'settings' && item.id === 'more';
          const isHomeActive = currentView === 'dashboard' && activeTab === 'modules' && item.id === 'dashboard';
          const isActive = isCurrentTab || isCurrentViewSetting || isHomeActive;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors cursor-pointer ${
                isActive ? 'text-[#ff5a1f]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span className="text-[10px] font-bold leading-none tracking-tight">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
