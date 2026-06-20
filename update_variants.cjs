const fs = require('fs');
const path = require('path');
const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Workspace.tsx'));

files.forEach(file => {
  if (file === 'SalesWorkspace.tsx' || file === 'CrmWorkspace.tsx' || file.includes('AiAgent')) return;
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');
  
  const layoutMatch = content.match(/<Layout departmentName="([^"]+)" onBack=\{.*?\} sidebarLinks=\{sidebarLinks\} variant="([^"]+)">/);
  if (layoutMatch) {
    const variant = layoutMatch[2];
    
    // Check if GenericDataSheet is missing the variant prop
    if (content.includes('<GenericDataSheet moduleName={activeModule} />')) {
      content = content.replace('<GenericDataSheet moduleName={activeModule} />', `<GenericDataSheet moduleName={activeModule} variant="${variant}" />`);
      fs.writeFileSync(p, content, 'utf8');
      console.log('Updated GenericDataSheet variant in', file);
    }
  }
});
