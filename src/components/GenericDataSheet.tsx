import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Plus, CheckCircle, Clock, XCircle, FileText, Activity, User, UserCheck, ClipboardCheck, X, RefreshCw } from 'lucide-react';

interface Props {
  moduleName: string;
  variant?: 'crm' | 'procurement' | 'inventory' | 'logistics' | 'production' | 'finance' | 'hr' | 'director' | 'vendor-master' | 'sales' | 'marketing' | 'laboratory';
}

import { useThemeContext } from '../context/ThemeContext';

export const getSheetTheme = (variant: string, themeMode: 'colorful' | 'dual') => {
  const isGreenTheme = ['marketing', 'procurement', 'inventory', 'production', 'hr', 'laboratory'].includes(variant);

  if (themeMode === 'dual') {
    if (isGreenTheme) {
      return { header: 'from-[#8a9e59] to-[#6a7c41]', tableHead: 'bg-[#6a7c41]', text: 'text-[#6a7c41]', border: 'border-t-[#6a7c41]' };
    } else {
      return { header: 'from-[#e09163] to-[#c2703f]', tableHead: 'bg-[#c2703f]', text: 'text-[#c2703f]', border: 'border-t-[#c2703f]' };
    }
  }

  // Colorful Mode
  switch (variant) {
    case 'sales': return { header: 'from-[#3B82F6] to-[#2563EB]', tableHead: 'bg-[#3B82F6]', text: 'text-[#3B82F6]', border: 'border-t-[#3B82F6]' };
    case 'procurement': return { header: 'from-[#F59E0B] to-[#D97706]', tableHead: 'bg-[#F59E0B]', text: 'text-[#F59E0B]', border: 'border-t-[#F59E0B]' };
    case 'inventory': return { header: 'from-[#10B981] to-[#047857]', tableHead: 'bg-[#10B981]', text: 'text-[#10B981]', border: 'border-t-[#10B981]' };
    case 'logistics': return { header: 'from-[#6366F1] to-[#4338CA]', tableHead: 'bg-[#6366F1]', text: 'text-[#6366F1]', border: 'border-t-[#6366F1]' };
    case 'production': return { header: 'from-[#0EA5E9] to-[#0369A1]', tableHead: 'bg-[#0EA5E9]', text: 'text-[#0EA5E9]', border: 'border-t-[#0EA5E9]' };
    case 'finance': return { header: 'from-[#14B8A6] to-[#0F766E]', tableHead: 'bg-[#14B8A6]', text: 'text-[#14B8A6]', border: 'border-t-[#14B8A6]' };
    case 'hr': return { header: 'from-[#F43F5E] to-[#BE123C]', tableHead: 'bg-[#F43F5E]', text: 'text-[#F43F5E]', border: 'border-t-[#F43F5E]' };
    case 'director': return { header: 'from-[#D946EF] to-[#A21CAF]', tableHead: 'bg-[#D946EF]', text: 'text-[#D946EF]', border: 'border-t-[#D946EF]' };
    case 'vendor-master': return { header: 'from-[#5B6FFF] to-[#4055D8]', tableHead: 'bg-[#5B6FFF]', text: 'text-[#5B6FFF]', border: 'border-t-[#5B6FFF]' };
    case 'laboratory': return { header: 'from-[#06B6D4] to-[#0891B2]', tableHead: 'bg-[#06B6D4]', text: 'text-[#06B6D4]', border: 'border-t-[#06B6D4]' };
    case 'marketing': return { header: 'from-[#EF4444] to-[#B91C1C]', tableHead: 'bg-[#EF4444]', text: 'text-[#EF4444]', border: 'border-t-[#EF4444]' };
    case 'crm':
    default: return { header: 'from-[#8B5CF6] to-[#6D28D9]', tableHead: 'bg-[#8B5CF6]', text: 'text-[#8B5CF6]', border: 'border-t-[#8B5CF6]' };
  }
};


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

  const { themeMode } = useThemeContext();
  const theme = getSheetTheme(variant, themeMode);
  
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

  const genericSchemas: Record<string, { columns: string[], data: any[][] }> = {
    // CRM
    'Inquiry Management': {
      columns: ['Inquiry ID', 'Date', 'Client Name', 'Requirement', 'Budget', 'Status', 'Assigned To'],
      data: [
        ['INQ-101', '24-Jun-2026', 'Apex Corp', 'High-temp Firebricks', '₹5,00,000', 'Active', 'Ravi Sharma'],
        ['INQ-102', '22-Jun-2026', 'Metalloy Industries', 'Insulation Boards', '₹2,50,000', 'Pending', 'Sneha Patel'],
        ['INQ-103', '20-Jun-2026', 'PowerGrid Ltd', 'Silica Bricks', '₹12,00,000', 'Converted', 'Amit Kumar']
      ]
    },
    'Quotation Management': {
      columns: ['Quote ID', 'Date', 'Client Name', 'Items Required', 'Quoted Value', 'Valid Until', 'Status'],
      data: [
        ['QT-301', '25-Jun-2026', 'Apex Corp', 'Firebricks (x500)', '₹4,85,000', '31-Jul-2026', 'Sent'],
        ['QT-302', '21-Jun-2026', 'Tata Steel', 'Refractory Castables', '₹15,20,000', '15-Jul-2026', 'Approved'],
        ['QT-303', '19-Jun-2026', 'Jindal Power', 'Acid Resistant Bricks', '₹6,40,000', '10-Jul-2026', 'Revised']
      ]
    },
    'Follow-up Management': {
      columns: ['Follow-up ID', 'Date', 'Contact Name', 'Mode', 'Discussion Points', 'Next Date', 'Status'],
      data: [
        ['FOL-201', '26-Jun-2026', 'Karan Johar', 'Phone Call', 'Pricing negotiation completed', '30-Jun-2026', 'Pending'],
        ['FOL-202', '25-Jun-2026', 'Meera Rajput', 'Email', 'Sent product catalogues', '02-Jul-2026', 'Completed'],
        ['FOL-203', '24-Jun-2026', 'Sanjay Dutt', 'In-Person', 'Site inspection completed', '29-Jun-2026', 'Completed']
      ]
    },
    'Customer Registration': {
      columns: ['Customer ID', 'Company Name', 'Contact Person', 'Email', 'Phone', 'Credit Limit', 'GSTIN Status'],
      data: [
        ['CUST-801', 'Shyam Refractories', 'Shyam Lal', 'shyam@refractory.com', '9876543210', '₹15,00,000', 'Verified'],
        ['CUST-802', 'Birla Cements Ltd', 'Ramesh Birla', 'ramesh@birla.com', '9876543211', '₹50,00,000', 'Verified'],
        ['CUST-803', 'Adani Power', 'Gautam Adani', 'gautam@adani.com', '9876543212', '₹2,00,00,000', 'Verified']
      ]
    },
    'Customer Support': {
      columns: ['Ticket ID', 'Date', 'Customer Name', 'Issue Description', 'Priority', 'SLA Status', 'Assigned To'],
      data: [
        ['TKT-401', '25-Jun-2026', 'Tata Steel', 'Delay in dispatch order #502', 'High', 'Within SLA', 'Rahul Sen'],
        ['TKT-402', '23-Jun-2026', 'Apex Corp', 'Incorrect dimension of brick samples', 'Medium', 'Breached', 'Siddharth Roy'],
        ['TKT-403', '22-Jun-2026', 'Jindal Power', 'Billing query on Invoice #901', 'Low', 'Within SLA', 'Kriti Sharma']
      ]
    },
    // Sales
    'Customer Purchase Orders': {
      columns: ['PO Number', 'PO Date', 'Customer Name', 'Ordered Item', 'Amount', 'Approval Status', 'Expected Delivery'],
      data: [
        ['PO-4101', '24-Jun-2026', 'Tata Steel', 'High Alumina Bricks', '₹8,50,000', 'Approved', '05-Jul-2026'],
        ['PO-4102', '22-Jun-2026', 'Jindal Steel', 'Magnesite Bricks', '₹12,40,000', 'Pending', '12-Jul-2026'],
        ['PO-4103', '20-Jun-2026', 'Ultratech Cement', 'Fireclay Mortar', '₹3,80,000', 'Approved', '01-Jul-2026']
      ]
    },
    'Sales Order Management': {
      columns: ['SO Number', 'SO Date', 'Customer Name', 'Total Value', 'Dispatch Date', 'Status'],
      data: [
        ['SO-5001', '25-Jun-2026', 'Tata Steel', '₹8,50,000', '02-Jul-2026', 'Open'],
        ['SO-5002', '21-Jun-2026', 'Ultratech Cement', '₹3,80,000', '28-Jun-2026', 'Completed'],
        ['SO-5003', '19-Jun-2026', 'Essar Steel', '₹5,60,000', '08-Jul-2026', 'Open']
      ]
    },
    'Customer Verification': {
      columns: ['Customer ID', 'Company Name', 'Credit Score', 'Credit Limit', 'GST Status', 'Verification Status'],
      data: [
        ['CUST-801', 'Shyam Refractories', '720', '₹15,00,000', 'Active', 'Verified'],
        ['CUST-802', 'Birla Cements Ltd', '810', '₹50,00,000', 'Active', 'Verified'],
        ['CUST-803', 'Adani Power', '840', '₹2,00,00,000', 'Active', 'Verified']
      ]
    },
    'Production Requirement': {
      columns: ['Req ID', 'Date', 'Item', 'Quantity', 'Sales Order Link', 'Priority', 'Status'],
      data: [
        ['PROD-REQ-01', '26-Jun-2026', 'High Alumina Bricks', '10,000 Pcs', 'SO-5001', 'High', 'Pending'],
        ['PROD-REQ-02', '24-Jun-2026', 'Magnesite Bricks', '5,000 Pcs', 'SO-5003', 'Medium', 'In Production'],
        ['PROD-REQ-03', '23-Jun-2026', 'Refractory Castables', '25 Tons', 'SO-5002', 'High', 'Completed']
      ]
    },
    'Purchase Requirement': {
      columns: ['Req ID', 'Date', 'Material Needed', 'Quantity Required', 'Indent Status'],
      data: [
        ['PUR-REQ-01', '26-Jun-2026', 'Bauxite (Calcined)', '50 Tons', 'Approved'],
        ['PUR-REQ-02', '24-Jun-2026', 'Silica Fume', '15 Tons', 'Pending'],
        ['PUR-REQ-03', '22-Jun-2026', 'Kyanite Concentrate', '8 Tons', 'Approved']
      ]
    },
    'Inventory Verification': {
      columns: ['Item ID', 'Item Name', 'Available Stock', 'Reserved Stock', 'Reorder Point', 'Status'],
      data: [
        ['RAW-101', 'Calcined Clay', '120 MT', '40 MT', '50 MT', 'On Track'],
        ['FG-201', 'High Alumina Bricks 70%', '15,000 Pcs', '8,000 Pcs', '5,000 Pcs', 'On Track'],
        ['RAW-105', 'Silicon Carbide Powder', '2 MT', '0 MT', '5 MT', 'Low Stock']
      ]
    },
    'Dispatch Management': {
      columns: ['Dispatch ID', 'Date', 'Sales Order', 'Customer Name', 'Transporter', 'Status'],
      data: [
        ['DSP-901', '26-Jun-2026', 'SO-5002', 'Ultratech Cement', 'Vikas Roadlines', 'Delivered'],
        ['DSP-902', '25-Jun-2026', 'SO-5001', 'Tata Steel', 'Speed Logistics', 'Dispatched'],
        ['DSP-903', '24-Jun-2026', 'SO-5003', 'Essar Steel', 'Cargo Carriers', 'Pending']
      ]
    },
    'Transport Allocation': {
      columns: ['Allocation ID', 'Vehicle No', 'Driver Name', 'Route', 'Freight Charges', 'Allocation Status'],
      data: [
        ['TR-301', 'OD-02-Y-5521', 'Raju Yadav', 'Rourkela to Kolkata', '₹45,000', 'Allocated'],
        ['TR-302', 'OD-02-Z-9932', 'Satish Singh', 'Rourkela to Mumbai', '₹1,20,000', 'In Transit'],
        ['TR-303', 'JH-01-A-4432', 'Gopal Das', 'Rourkela to Jamshedpur', '₹18,000', 'Allocated']
      ]
    },
    'Delivery Tracking': {
      columns: ['Tracking ID', 'Dispatch ID', 'Destination', 'Current Location', 'Expected Arrival', 'Delivery Status'],
      data: [
        ['TRK-801', 'DSP-902', 'Kolkata', 'Kharagpur Bypass', '27-Jun-2026', 'In Transit'],
        ['TRK-802', 'DSP-901', 'Jamshedpur', 'Delivered', '26-Jun-2026', 'Delivered'],
        ['TRK-803', 'DSP-903', 'Mumbai', 'Loading Bay', '29-Jun-2026', 'Pending']
      ]
    },
    'POD Management': {
      columns: ['POD ID', 'SO Number', 'Customer Name', 'Received Date', 'Verification Status'],
      data: [
        ['POD-601', 'SO-5002', 'Ultratech Cement', '26-Jun-2026', 'Verified'],
        ['POD-602', 'SO-5004', 'Birla Cement', '25-Jun-2026', 'Pending Approval'],
        ['POD-603', 'SO-5005', 'Dalmia Cement', '24-Jun-2026', 'Verified']
      ]
    },
    'Invoice Management': {
      columns: ['Invoice No', 'Date', 'Customer Name', 'Total Amount', 'Due Date', 'Status'],
      data: [
        ['INV-9001', '25-Jun-2026', 'Tata Steel', '₹8,50,000', '25-Jul-2026', 'Unpaid'],
        ['INV-9002', '21-Jun-2026', 'Ultratech Cement', '₹3,80,000', '21-Jul-2026', 'Paid'],
        ['INV-9003', '19-Jun-2026', 'Essar Steel', '₹5,60,000', '19-Jul-2026', 'Unpaid']
      ]
    },
    'Accounts Receivable': {
      columns: ['Invoice No', 'Customer Name', 'Outstanding', 'Overdue Days', 'Status'],
      data: [
        ['INV-8812', 'Tata Steel', '₹8,50,000', '15 Days', 'Active'],
        ['INV-8756', 'Ultratech Cement', '₹1,20,000', '45 Days', 'Critical Overdue'],
        ['INV-8910', 'JSW Steel', '₹15,60,000', '5 Days', 'Active']
      ]
    },
    'Payment Collection': {
      columns: ['Receipt No', 'Date', 'Customer Name', 'Amount Received', 'Payment Mode', 'Status'],
      data: [
        ['REC-401', '25-Jun-2026', 'Ultratech Cement', '₹3,80,000', 'NEFT', 'Cleared'],
        ['REC-402', '24-Jun-2026', 'JSW Steel', '₹5,00,000', 'RTGS', 'Cleared'],
        ['REC-403', '22-Jun-2026', 'Birla Cement', '₹2,50,000', 'Cheque', 'Pending Clearing']
      ]
    },
    'Material Return Management': {
      columns: ['Return ID', 'Date', 'Customer Name', 'Item Returned', 'Value', 'Reason', 'Status'],
      data: [
        ['RET-101', '20-Jun-2026', 'Apex Corp', 'Firebricks (x50)', '₹48,500', 'Dimensions out of specs', 'Approved'],
        ['RET-102', '18-Jun-2026', 'Jindal Steel', 'Magnesite Bricks (x10)', '₹24,800', 'Transit cracks', 'Pending']
      ]
    },
    'Tally Integration': {
      columns: ['Sync ID', 'Sync Type', 'Records Synced', 'Last Sync Time', 'Status'],
      data: [
        ['SYNC-701', 'Sales Invoices', '12 Records', 'Today 05:30 PM', 'Success'],
        ['SYNC-702', 'Payment Receipts', '8 Records', 'Today 05:30 PM', 'Success'],
        ['SYNC-703', 'Stock Journals', '15 Records', 'Yesterday 06:00 PM', 'Success']
      ]
    },
    // Procurement
    'Indent Management': {
      columns: ['Indent ID', 'Date', 'Department', 'Item Requested', 'Qty', 'Purpose', 'Status'],
      data: [
        ['IND-201', '24-Jun-2026', 'Production', 'Refractory Binding Clay', '20 Tons', 'BOM Requirement', 'Approved'],
        ['IND-202', '23-Jun-2026', 'Maintenance', 'Furnace Thermocouples', '10 Pcs', 'Spares replacement', 'Pending'],
        ['IND-203', '21-Jun-2026', 'Laboratory', 'Chemical Testing Reagents', '5 Litres', 'Raw material audit', 'Approved']
      ]
    },
    'Purchase Requisition': {
      columns: ['PR ID', 'Date', 'Requested Item', 'Estimated Cost', 'Priority', 'Status'],
      data: [
        ['PR-401', '25-Jun-2026', 'Refractory Binding Clay', '₹4,00,000', 'High', 'Approved'],
        ['PR-402', '24-Jun-2026', 'Furnace Thermocouples', '₹1,50,000', 'Medium', 'Pending Approval'],
        ['PR-403', '22-Jun-2026', 'Chemical Testing Reagents', '₹25,000', 'Low', 'Approved']
      ]
    },
    'Vendor Selection': {
      columns: ['Bid ID', 'PR Link', 'Vendor Name', 'Quotation Amount', 'Rating', 'Selection Status'],
      data: [
        ['BID-801', 'PR-401', 'Hindalco Industries', '₹3,80,000', '4.8/5', 'Selected'],
        ['BID-802', 'PR-401', 'Mineral Supply Co', '₹4,10,000', '4.2/5', 'Rejected'],
        ['BID-803', 'PR-402', 'Toshniwal Instruments', '₹1,45,000', '4.5/5', 'Under Review']
      ]
    },
    'RFQ Management': {
      columns: ['RFQ ID', 'Date', 'Item Description', 'Vendors Invited', 'Responses Received', 'Status'],
      data: [
        ['RFQ-301', '25-Jun-2026', 'Refractory Binding Clay', '5 Vendors', '3 Received', 'Closed'],
        ['RFQ-302', '24-Jun-2026', 'Furnace Thermocouples', '3 Vendors', '2 Received', 'Active'],
        ['RFQ-303', '22-Jun-2026', 'Insulation Blanket', '6 Vendors', '4 Received', 'Closed']
      ]
    },
    'Purchase Orders': {
      columns: ['PO No', 'Date', 'Vendor Name', 'Total Amount', 'Expected Delivery', 'Status'],
      data: [
        ['PO-7001', '26-Jun-2026', 'Hindalco Industries', '₹3,80,000', '10-Jul-2026', 'Open'],
        ['PO-7002', '22-Jun-2026', 'Toshniwal Instruments', '₹1,45,000', '02-Jul-2026', 'Approved'],
        ['PO-7003', '20-Jun-2026', 'Global Minerals', '₹6,80,000', '01-Jul-2026', 'Completed']
      ]
    },
    'PO Approvals': {
      columns: ['PO No', 'Date', 'Vendor Name', 'Total Amount', 'Pending Approvals', 'Status'],
      data: [
        ['PO-7001', '26-Jun-2026', 'Hindalco Industries', '₹3,80,000', 'Finance Head', 'Pending'],
        ['PO-7002', '22-Jun-2026', 'Toshniwal Instruments', '₹1,45,000', 'Approved', 'Approved'],
        ['PO-7004', '25-Jun-2026', 'Apex Chemicals', '₹28,000', 'Director', 'Pending']
      ]
    },
    'Vendor Follow-up': {
      columns: ['Follow-up ID', 'Vendor Name', 'PO Link', 'Scheduled Date', 'Discussion', 'Status'],
      data: [
        ['VFL-101', 'Hindalco Industries', 'PO-7001', '28-Jun-2026', 'Confirming transport dispatch details', 'Pending'],
        ['VFL-102', 'Toshniwal Instruments', 'PO-7002', '24-Jun-2026', 'Calibration reports checked', 'Completed']
      ]
    },
    'Transport Tracking': {
      columns: ['PO Link', 'Transporter', 'Vehicle No', 'Source', 'Current Location', 'Status'],
      data: [
        ['PO-7003', 'Vikas Roadlines', 'OD-02-A-5432', 'Katni Minerals', 'Rourkela Gate', 'Received'],
        ['PO-7001', 'Super Fast Cargo', 'MP-09-H-7762', 'Katni Minerals', 'Sambalpur Highway', 'In Transit']
      ]
    },
    'Material Receipt': {
      columns: ['Receipt ID', 'Date', 'PO Number', 'Received Qty', 'Inspected Qty', 'Status'],
      data: [
        ['MR-501', '25-Jun-2026', 'PO-7003', '50 Tons', '50 Tons', 'Inspected'],
        ['MR-502', '24-Jun-2026', 'PO-7002', '10 Pcs', '10 Pcs', 'Approved']
      ]
    },
    'Quality Inspection': {
      columns: ['Inspection ID', 'Date', 'Material', 'Batch No', 'Accepted Qty', 'Rejected Qty', 'Status'],
      data: [
        ['QC-801', '25-Jun-2026', 'Calcined Bauxite', 'B-1082', '48 Tons', '2 Tons', 'Pass with Waiver'],
        ['QC-802', '24-Jun-2026', 'Refractory Binding Clay', 'C-9912', '20 Tons', '0 Tons', 'Approved']
      ]
    },
    'GRN Management': {
      columns: ['GRN No', 'Date', 'Vendor Name', 'Invoice Value', 'Status'],
      data: [
        ['GRN-9001', '25-Jun-2026', 'Global Minerals', '₹6,80,000', 'Approved'],
        ['GRN-9002', '24-Jun-2026', 'Toshniwal Instruments', '₹1,45,000', 'Approved']
      ]
    },
    'Vendor Bills': {
      columns: ['Bill No', 'Date', 'Vendor Name', 'Total Value', 'Due Date', 'Status'],
      data: [
        ['VBL-2001', '25-Jun-2026', 'Global Minerals', '₹6,80,000', '25-Jul-2026', 'Unpaid'],
        ['VBL-2002', '24-Jun-2026', 'Toshniwal Instruments', '₹1,45,000', '24-Jul-2026', 'Approved']
      ]
    },
    'Vendor Payments': {
      columns: ['Payment ID', 'Date', 'Vendor Name', 'Paid Amount', 'Mode', 'Status'],
      data: [
        ['VPM-101', '20-Jun-2026', 'Global Minerals', '₹6,80,000', 'RTGS', 'Success'],
        ['VPM-102', '18-Jun-2026', 'Shyam Refractories', '₹1,25,000', 'NEFT', 'Success']
      ]
    },
    // Vendor Master
    'Vendor Registration': {
      columns: ['Vendor ID', 'Name', 'Contact Person', 'Phone', 'Email', 'Verification Status'],
      data: [
        ['VND-501', 'Global Minerals Co', 'Rajeev Gupta', '9876543001', 'rajeev@global.com', 'Verified'],
        ['VND-502', 'Katni Clay Suppliers', 'Satish Katni', '9876543002', 'satish@katniclay.com', 'Pending'],
        ['VND-503', 'Toshniwal Instruments', 'Anupam Toshniwal', '9876543003', 'anupam@toshniwal.com', 'Verified']
      ]
    },
    'Company Profile': {
      columns: ['Vendor ID', 'Company Name', 'Industry', 'Turnover', 'GSTIN', 'Compliance Status'],
      data: [
        ['VND-501', 'Global Minerals Co', 'Raw Minerals mining', '₹12 Crores', '21AAAAA1111A1Z1', 'Compliant'],
        ['VND-503', 'Toshniwal Instruments', 'Process Calibration', '₹5 Crores', '21BBBBB2222B2Z2', 'Compliant']
      ]
    },
    // Inventory
    'Item Master': {
      columns: ['Item ID', 'Item Name', 'Category', 'Unit', 'Unit Cost', 'Stock Level'],
      data: [
        ['RAW-001', 'Calcined Bauxite', 'Raw Materials', 'MT', '₹8,500', '125 Tons'],
        ['RAW-002', 'Fused Magnesite', 'Raw Materials', 'MT', '₹22,000', '48 Tons'],
        ['FG-501', 'High Alumina Bricks 70%', 'Finished Goods', 'Pcs', '₹65', '18,500 Pcs'],
        ['FG-502', 'Magnesite Bricks', 'Finished Goods', 'Pcs', '₹180', '8,200 Pcs']
      ]
    },
    // Laboratory
    'Sample Registration': {
      columns: ['Sample ID', 'Date', 'Source', 'Material Name', 'Batch No', 'Status'],
      data: [
        ['SMP-301', '26-Jun-2026', 'Vendor Receipt (PO-7001)', 'Calcined Bauxite', 'B-1082', 'Under Analysis'],
        ['SMP-302', '25-Jun-2026', 'Production Run (Line 2)', 'Finished Bricks 70%', 'FG-9921', 'Completed'],
        ['SMP-303', '24-Jun-2026', 'Vendor Receipt (PO-7003)', 'Clay Binder', 'C-8821', 'Completed']
      ]
    },
    'Test Management': {
      columns: ['Sample ID', 'Test Name', 'Specification Range', 'Observed Value', 'Compliance Status'],
      data: [
        ['SMP-302', 'Alumina content (Al2O3 %)', '68.0% - 72.0%', '70.2%', 'Compliant'],
        ['SMP-302', 'Cold Crushing Strength (CCS)', 'Min 600 kg/cm²', '645 kg/cm²', 'Compliant'],
        ['SMP-303', 'Moisture content', 'Max 2.0%', '2.8%', 'Out of Range (Fail)']
      ]
    },
    // HR
    'Employee Master': {
      columns: ['Emp ID', 'Full Name', 'Designation', 'Department', 'Date of Joining', 'Email', 'Status'],
      data: [
        ['EMP-101', 'Ravi Sharma', 'CRM Manager', 'CRM', '12-Jan-2024', 'ravi@passary.com', 'Active'],
        ['EMP-102', 'Sneha Gupta', 'Sales Coordinator', 'Sales', '18-Mar-2024', 'sneha@passary.com', 'Active'],
        ['EMP-103', 'Amit Patel', 'Purchase Manager', 'Procurement', '01-Jul-2023', 'amit@passary.com', 'Active']
      ]
    },
    // Settings
    'Settings': {
      columns: ['Setting ID', 'Parameter', 'Description', 'Config Value', 'Updated Date', 'Status'],
      data: [
        ['SET-001', 'SMTP Server', 'Outgoing transaction emails setup', 'smtp.passary.com', '12-May-2026', 'Active'],
        ['SET-002', 'Backup Interval', 'Weekly automated database backup', '7 Days', '01-Jun-2026', 'Active']
      ]
    }
  };

  if (variant === 'marketing') {
    if (cleanModuleName === 'Lead Pipeline') {
      specificColumns = ['Lead ID', 'Lead Date', 'Company Name', 'Contact Person', 'Mobile Number', 'Email', 'City', 'State', 'Industry Type', 'Product Requirement', 'Lead Source', 'Executive Name', 'Marketing Head', 'Remarks', 'Lead Status'];
      specificData = liveData || [];
    } else if (cleanModuleName === 'Approval Center') {
      specificColumns = ['Lead ID', 'Company Name', 'Executive Name', 'Marketing Head', 'Approval Status', 'Approval Date', 'Approval Time', 'Remarks'];
      specificData = liveData || [];
    } else if (genericSchemas[cleanModuleName]) {
      specificColumns = genericSchemas[cleanModuleName].columns;
      specificData = genericSchemas[cleanModuleName].data;
    } else {
      specificColumns = ['Customer ID', 'Name', 'Company', 'Industry', 'Last Contact', 'Status', 'LTV'];
      specificData = [
        ['CUS-001', 'Ankit Verma', 'TechCorp', 'IT', '19-Jun-2026', 'Active', '₹1,50,000'],
        ['CUS-002', 'Meera Reddy', 'DesignStudio', 'Media', '18-Jun-2026', 'Inactive', '₹45,000'],
        ['CUS-003', 'Vikram Singh', 'BuildIt', 'Construction', '15-Jun-2026', 'Active', '₹2,10,000'],
      ];
    }
  } else {
    // Look up dynamically in genericSchemas
    const matchedSchema = genericSchemas[cleanModuleName] || {
      columns: [`${cleanModuleName} ID`, 'Date', 'Description', 'Value', 'Status', 'Updated By'],
      data: [
        [`${cleanModuleName.slice(0, 3).toUpperCase()}-101`, '26-Jun-2026', `Sample entry for ${cleanModuleName} #1`, '₹1,50,000', 'Active', 'Admin'],
        [`${cleanModuleName.slice(0, 3).toUpperCase()}-102`, '25-Jun-2026', `Sample entry for ${cleanModuleName} #2`, '₹4,20,000', 'Pending', 'Admin'],
        [`${cleanModuleName.slice(0, 3).toUpperCase()}-103`, '24-Jun-2026', `Sample entry for ${cleanModuleName} #3`, '₹85,000', 'Completed', 'Admin']
      ]
    };
    specificColumns = matchedSchema.columns;
    specificData = matchedSchema.data;
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
        
        {/* Left Side: Tabs */}
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all shadow-sm cursor-pointer whitespace-nowrap font-bold text-sm ${
                isActive 
                  ? 'bg-white text-gray-800 border-t border-x border-gray-200 relative z-20' 
                  : 'bg-[#F4F5F9] text-gray-500 hover:bg-gray-100 hover:text-gray-700 border border-transparent relative z-20'
              }`}
            >
              {tab.icon} {tab.name}
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
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all shadow-sm cursor-pointer whitespace-nowrap font-bold text-sm text-white ${theme.tableHead} hover:opacity-90 relative z-20`}
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
        <div className="flex-1 overflow-auto">
          <table className="w-max min-w-full text-left text-sm whitespace-nowrap border-separate border-spacing-0">
            <thead className={`text-white font-bold text-[13px] uppercase tracking-wider sticky top-0 ${theme.tableHead} z-20 shadow-sm h-12`}>
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

      {/* Centered Modal Form */}
      <div className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100] transition-opacity duration-300 flex items-center justify-center p-4 sm:p-6 ${isFormOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-full max-w-4xl bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-out flex flex-col max-h-[90vh] overflow-hidden ${isFormOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
          <div className={`bg-gradient-to-r ${theme.header} px-6 py-4 flex items-center justify-between text-white shrink-0 shadow-sm`}>
            <h3 className="font-bold text-lg font-serif tracking-wide uppercase">Add New {singularName}</h3>
            <button onClick={() => setIsFormOpen(false)} className="p-1.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer">
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
                        className="w-full px-4 py-3 md:py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3B69]/20 focus:border-[#4A3B69] transition-all text-gray-900 shadow-sm"
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
            <button onClick={() => setIsFormOpen(false)} disabled={isSubmitting} className="px-6 py-3 md:py-2.5 border border-gray-300 bg-white rounded-xl text-gray-700 font-bold hover:bg-gray-100 transition-colors shadow-sm cursor-pointer disabled:opacity-50">
              Cancel
            </button>
            <button onClick={handleSaveForm} disabled={isSubmitting} className={`px-8 py-3 md:py-2.5 rounded-xl text-white font-bold transition-all shadow-sm cursor-pointer ${theme.tableHead} hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2`}>
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
            <button onClick={() => setIsApprovalModalOpen(false)} disabled={isSubmitting} className="px-5 py-3 md:py-2.5 border border-gray-300 bg-white rounded-xl text-gray-700 font-bold hover:bg-gray-100 transition-colors shadow-sm cursor-pointer disabled:opacity-50">
              Cancel
            </button>
            <button onClick={() => handleSubmitApproval('Approved')} disabled={isSubmitting} className="px-6 py-3 md:py-2.5 rounded-xl text-white font-bold transition-all shadow-sm cursor-pointer bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2">
              {isSubmitting ? <Activity size={16} className="animate-spin" /> : <CheckCircle size={16} />}
              {isSubmitting ? 'Processing...' : 'Approve'}
            </button>
            <button onClick={() => handleSubmitApproval('Rejected')} disabled={isSubmitting} className="px-6 py-3 md:py-2.5 rounded-xl text-white font-bold transition-all shadow-sm cursor-pointer bg-red-500 hover:bg-red-600 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2">
              {isSubmitting ? <Activity size={16} className="animate-spin" /> : <XCircle size={16} />}
              {isSubmitting ? 'Processing...' : 'Reject'}
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
