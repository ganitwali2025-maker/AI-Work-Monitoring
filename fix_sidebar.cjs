const fs = require('fs');
const path = require('path');

// 1. Fix Layout.tsx
const layoutPath = './src/components/Layout.tsx';
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

if (!layoutContent.includes('activeModule?: string | null;')) {
  layoutContent = layoutContent.replace(
    "variant?: 'crm' | 'procurement' | 'inventory' | 'logistics' | 'production' | 'finance' | 'hr' | 'director' | 'vendor-master' | 'marketing';",
    "variant?: 'crm' | 'procurement' | 'inventory' | 'logistics' | 'production' | 'finance' | 'hr' | 'director' | 'vendor-master' | 'marketing';\n  activeModule?: string | null;"
  );
  
  layoutContent = layoutContent.replace(
    "export default function Layout({ departmentName, onBack, sidebarLinks, children, variant = 'inventory' }: Props) {",
    "import { useEffect as UseEffectAlias } from 'react';\n\nexport default function Layout({ departmentName, onBack, sidebarLinks, children, variant = 'inventory', activeModule }: Props) {"
  );

  layoutContent = layoutContent.replace(
    "const [activeMenuName, setActiveMenuName] = useState(sidebarLinks[0]?.name || '');",
    "const [activeMenuName, setActiveMenuName] = useState(sidebarLinks[0]?.name || '');\n\n  React.useEffect(() => {\n    if (activeModule !== undefined) {\n      if (activeModule === null) {\n        setActiveMenuName(sidebarLinks[0]?.name || '');\n      } else {\n        setActiveMenuName(activeModule);\n      }\n    }\n  }, [activeModule, sidebarLinks]);"
  );
  fs.writeFileSync(layoutPath, layoutContent);
  console.log('Fixed Layout.tsx');
}

// 2. Fix all Workspaces
const files = fs.readdirSync('./src/components').filter(f => f.endsWith('Workspace.tsx'));

files.forEach(file => {
  let content = fs.readFileSync('./src/components/' + file, 'utf8');
  let changed = false;

  // Add activeModule prop to Layout if not present
  if (content.includes('<Layout ') && !content.includes('activeModule={')) {
    content = content.replace(/<Layout /g, '<Layout activeModule={activeModule} ');
    changed = true;
  }

  // Fix sidebarLinks onClick
  const lines = content.split('\n');
  let insideSidebarLinks = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('const sidebarLinks = [')) {
      insideSidebarLinks = true;
    }
    if (insideSidebarLinks && lines[i].includes('];')) {
      insideSidebarLinks = false;
    }

    if (insideSidebarLinks && lines[i].includes('onClick: () => {}')) {
      const match = lines[i].match(/name:\s*['"](.*?)['"]/);
      if (match) {
        const name = match[1];
        if (name.toLowerCase().includes('dashboard') || name === 'CRM Dashboard') {
          lines[i] = lines[i].replace('onClick: () => {}', "onClick: () => setActiveModule(null)");
        } else {
          lines[i] = lines[i].replace('onClick: () => {}', `onClick: () => setActiveModule('${name}')`);
        }
        changed = true;
      }
    }
    
    // Also fix any already broken ones like setActiveModule('Sales Dashboard') to null
    if (insideSidebarLinks && lines[i].match(/onClick:\s*\(\)\s*=>\s*setActiveModule\(['"].*?Dashboard['"]\)/i)) {
       lines[i] = lines[i].replace(/onClick:\s*\(\)\s*=>\s*setActiveModule\(['"].*?Dashboard['"]\)/i, "onClick: () => setActiveModule(null)");
       changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync('./src/components/' + file, lines.join('\n'));
    console.log('Fixed ' + file);
  }
});
