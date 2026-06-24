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
  PanelLeft
} from 'lucide-react';
import CrmWorkspace from './components/CrmWorkspace';
import SalesWorkspace from './components/SalesWorkspace';
import CustomerMasterWorkspace from './components/CustomerMasterWorkspace';
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
  const [currentView, setCurrentView] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('admin');
  const [activeTab, setActiveTab] = useState<'reyo' | 'modules' | 'agents' | 'approvals' | 'reports' | 'my-team'>('modules');
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric', weekday: 'long' };
    const dateStr = now.toLocaleDateString('en-GB', options); // e.g. "Wednesday, 17 Jun 2026"
    setFormattedDate(dateStr);
  }, []);

  const renderContent = () => {
    const [mainView, subView] = currentView.split(':');

    if (mainView === 'crm') {
      return <CrmWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView || 'CRM Dashboard'} />;
    }
    if (mainView === 'marketing') {
      return <MarketingWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
    }
    if (currentView === 'crm-agent') {
      return (
        <CrmAiAgentWorkspace 
          onBack={() => setCurrentView('dashboard')} 
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
      return <ProcurementWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
    }
    if (mainView === 'vendor-master') {
      return <VendorMasterWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
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
      return <LaboratoryWorkspace onBack={() => setCurrentView('dashboard')} initialMenu={subView} />;
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
    <div className="min-h-screen mesh-gradient-bg text-gray-950 font-sans flex flex-col overflow-hidden">
      {/* Sticky top horizontal header navigation */}
      <header className="bg-white text-gray-900 border-b border-gray-200/80 shadow-xs sticky top-0 z-30 select-none">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo Area & Left Tagline */}
            <div className="flex items-center gap-2">

              <div 
                className="flex items-center gap-3.5 shrink-0 cursor-pointer"
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

              {/* Tagline text: updated size, bold, and split colors */}
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight leading-normal pb-1 pt-1 ml-2">
                <span className="text-[#8a9a5b]">Passary Refractories</span>
                <span className="text-gray-400 mx-2">–</span>
                <span className="text-[#f05627]">Forging Energy-Efficient Solutions</span>
              </span>
            </div>
            </div>            {/* Right Side Tagline, Settings & Login Button */}
            <div className="flex items-center gap-3.5 shrink-0">
              {/* Tagline */}
              <span className="hidden md:inline-block text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                Automate • Manage • Grow
              </span>

              <div className="hidden md:block h-4 border-l border-gray-250/60" />

              {/* Settings */}
              <button 
                onClick={() => setCurrentView('director')}
                className="p-1.5 hover:bg-gray-150 rounded-lg text-gray-500 hover:text-gray-900 transition duration-205 cursor-pointer"
                title="Settings"
              >
                <Settings size={18} />
              </button>

              <div className="h-6 border-l border-gray-200" />

              {/* Logout Button */}
              <button 
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  setCurrentView('landing');
                }}
                className="px-4 py-2 text-xs font-bold bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 rounded-full transition-all duration-200 shadow-sm cursor-pointer"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Body Container */}
      <div className="flex flex-1 overflow-hidden relative">


        {/* Main Content Pane */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto scroll-smooth custom-scrollbar bg-gray-50/30">
          {/* Header */}
        <header className="mb-8 select-none premium-collar-gradient text-slate-900 p-8 rounded-3xl border-none shadow-md flex flex-col items-center text-center gap-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
              {activeTab === 'reyo' && 'How can REYO AI assist you today?'}
              {activeTab === 'modules' && 'What would you like to work on today?'}
              {activeTab === 'agents' && 'Which AI Agent would you like to consult?'}
              {activeTab === 'approvals' && 'Pending authorizations require your attention'}
              {activeTab === 'reports' && 'Which report would you like to view today?'}
              {activeTab === 'my-team' && 'Manage your team and resources'}
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-3 text-xs font-semibold text-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
                {activeTab === 'reyo' && 'Overall Work Monitor & AI Companion'}
                {activeTab === 'modules' && 'ERP Automation Business Workflow'}
                {activeTab === 'agents' && 'AI Intelligence & Automation Core'}
                {activeTab === 'approvals' && 'Centralized Approval Center'}
                {activeTab === 'reports' && 'Analytics & Reporting Hub'}
                {activeTab === 'my-team' && 'Team & Resource Management'}
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formattedDate || "17 May 2025, Saturday"}
              </span>
            </div>
          </div>

          {/* Banner Search & Quick Controls */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl mt-2">
            {/* Elegant Search Bar */}
            <div className="relative w-full sm:flex-1">
              <input 
                id="module-search"
                type="text"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs font-semibold bg-white/80 hover:bg-white focus:bg-white border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-450 transition-all placeholder:text-slate-400 font-sans shadow-md"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            </div>


            {/* Help Button */}
            <button className="w-full sm:w-auto py-3 px-5 bg-white/60 hover:bg-white/95 border border-slate-200/40 text-slate-800 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs font-bold shadow-md backdrop-blur-md cursor-pointer">
              <HelpCircle size={15} />
              <span>Help Guide</span>
            </button>
          </div>
        </header>


        {/* Text Toggle Tabs (Acting as Titles) */}
        <div className="flex gap-8 mb-8 border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab('reyo');
              setShouldAnimate(true);
            }}
            className={`pb-2 text-lg sm:text-xl font-bold font-serif transition-all cursor-pointer relative ${
              activeTab === 'reyo' ? 'text-gray-950' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            REYO AI Assistant
            {activeTab === 'reyo' && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            )}
          </button>
          
          <button
            onClick={() => {
              setActiveTab('modules');
              setShouldAnimate(true);
            }}
            className={`pb-2 text-lg sm:text-xl font-bold font-serif transition-all cursor-pointer relative ${
              activeTab === 'modules' ? 'text-gray-950' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            Work Departments
            {activeTab === 'modules' && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            )}
          </button>
          
          <button
            onClick={() => {
              setActiveTab('agents');
              setShouldAnimate(true);
            }}
            className={`pb-2 text-lg sm:text-xl font-bold font-serif transition-all cursor-pointer relative ${
              activeTab === 'agents' ? 'text-gray-950' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            AI Agents
            {activeTab === 'agents' && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            )}
          </button>
          
          <button
            onClick={() => {
              setActiveTab('approvals');
              setShouldAnimate(true);
            }}
            className={`pb-2 text-lg sm:text-xl font-bold font-serif transition-all cursor-pointer relative ${
              activeTab === 'approvals' ? 'text-gray-950' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            Approval Center
            {activeTab === 'approvals' && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('reports');
              setShouldAnimate(true);
            }}
            className={`pb-2 text-lg sm:text-xl font-bold font-serif transition-all cursor-pointer relative ${
              activeTab === 'reports' ? 'text-gray-950' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            Reporting Center
            {activeTab === 'reports' && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            )}
          </button>
          
          <button
            onClick={() => {
              setActiveTab('my-team');
              setShouldAnimate(true);
            }}
            className={`pb-2 text-lg sm:text-xl font-bold font-serif transition-all cursor-pointer relative ${
              activeTab === 'my-team' ? 'text-gray-950' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            My Team
            {activeTab === 'my-team' && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            )}
          </button>
        </div>

        {/* AI Assistant Panel */}
        {activeTab === 'reyo' && (
          <section className="mb-12 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-950 font-sans">REYO AI Assistant</h4>
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
          <div className="mb-12">
            <ApprovalCenter userRole={userRole} />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="mb-12">
            <ReportingCenter userRole={userRole} />
          </div>
        )}

        {activeTab === 'my-team' && (
          <div className="mb-12 text-center py-12">
            <p className="text-gray-400 text-lg font-serif">My Team module is coming soon.</p>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="mb-12">
            <div className="mb-6">
              <p className="text-gray-500 text-sm font-medium">Har module ka apna dedicated AI Agent — seedha kaam karo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="mb-12">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
