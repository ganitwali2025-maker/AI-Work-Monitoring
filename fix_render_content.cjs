const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The pattern to replace: if (currentView === 'sales') { return <SalesWorkspace onBack={...} />; }
// Note: currentView is split into mainView and subView at the start of renderContent.
// We need to change `if (currentView === 'sales')` to `if (mainView === 'sales')`
// and `<SalesWorkspace onBack={...} />` to `<SalesWorkspace onBack={...} initialMenu={subView} />`

const workspaces = [
  { id: 'sales', cmp: 'SalesWorkspace' },
  { id: 'marketing', cmp: 'MarketingWorkspace' },
  { id: 'customer-master', cmp: 'CustomerMasterWorkspace' },
  { id: 'procurement', cmp: 'ProcurementWorkspace' },
  { id: 'vendor-master', cmp: 'VendorMasterWorkspace' },
  { id: 'inventory', cmp: 'InventoryWorkspace' },
  { id: 'logistics', cmp: 'LogisticsWorkspace' },
  { id: 'production', cmp: 'ProductionWorkspace' },
  { id: 'finance', cmp: 'FinanceWorkspace' },
  { id: 'hr', cmp: 'HrWorkspace' },
  { id: 'costing', cmp: 'CostingWorkspace' },
  { id: 'director', cmp: 'DirectorWorkspace' }
];

workspaces.forEach(({ id, cmp }) => {
  // Regex to match: if (currentView === 'id') { return <Cmp onBack={() => setCurrentView('dashboard')} />; }
  // or if (mainView === 'id') ...
  const regex1 = new RegExp(`if \\(currentView === '${id}'\\) \\{\\s*return <${cmp} onBack=\\{([^}]+)\\} \\/>;\\s*\\}`, 'g');
  const regex2 = new RegExp(`if \\(mainView === '${id}'\\) \\{\\s*return <${cmp} onBack=\\{([^}]+)\\} \\/>;\\s*\\}`, 'g');
  
  const replacement = `if (mainView === '${id}') {\n      return <${cmp} onBack={$1} initialMenu={subView} />;\n    }`;
  
  if (content.match(regex1)) {
    content = content.replace(regex1, replacement);
  } else if (content.match(regex2)) {
    content = content.replace(regex2, replacement);
  }
});

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx renderContent updated');
