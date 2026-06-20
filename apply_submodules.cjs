const fs = require('fs');
const path = require('path');

const extracted = JSON.parse(fs.readFileSync('extracted_modules.json', 'utf-8'));
let appContent = fs.readFileSync('src/App.tsx', 'utf-8');

// Find all icons used
const iconRegex = /icon:\s*([A-Za-z0-9_]+)/g;
const icons = new Set();
for (const key in extracted) {
  let match;
  while ((match = iconRegex.exec(extracted[key])) !== null) {
    icons.add(match[1]);
  }
}

// Update imports
const importRegex = /import\s+\{([\s\S]*?)\}\s+from\s+'lucide-react';/;
const importMatch = appContent.match(importRegex);
if (importMatch) {
  const existingIcons = new Set(importMatch[1].split(',').map(i => i.trim()).filter(Boolean));
  icons.forEach(i => existingIcons.add(i));
  const newImport = `import {\n  ${Array.from(existingIcons).join(',\n  ')}\n} from 'lucide-react';`;
  appContent = appContent.replace(importRegex, newImport);
}

// Map keys to department names
const mapping = {
  'Marketing': 'Marketing Performance Center',
  'Sales': 'Sales & Revenue Management',
  'CustomerMaster': 'Customer Master',
  'Procurement': 'Purchase & Procurement Management',
  'VendorMaster': 'Vendor Master',
  'Inventory': 'Inventory Management',
  'Logistics': 'Logistics & Transport Management',
  'Production': 'Production & Quality Management',
  'Finance': 'Finance & Accounting Management',
  'Hr': 'HR & Administration',
  'Costing': 'Costing & Profitability Management',
  'Director': 'Director Control Center'
};

for (const key in mapping) {
  const deptName = mapping[key];
  let subMods = extracted[key];
  if (!subMods) continue;
  
  // Convert standard array format to plain text insertion
  // We'll insert it right before the closing brace of the department
  
  const deptRegex = new RegExp(`(name:\\s*['"]${deptName}['"][\\s\\S]*?)(^  \\},?$)`, 'm');
  
  // Ensure we don't duplicate subModules
  if (!appContent.match(new RegExp(`name:\\s*['"]${deptName}['"][\\s\\S]*?subModules:`))) {
    appContent = appContent.replace(deptRegex, `$1,\n    subModules: ${subMods}\n$2`);
  }
}

fs.writeFileSync('src/App.tsx', appContent);
console.log('App.tsx updated successfully');
