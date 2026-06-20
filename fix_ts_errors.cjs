const fs = require('fs');

// Fix Duplicate Users in App.tsx
let appStr = fs.readFileSync('src/App.tsx', 'utf-8');
const importsMatch = appStr.match(/import\s+\{([\s\S]*?)\}\s+from\s+'lucide-react';/);
if (importsMatch) {
  const icons = importsMatch[1].split(',').map(i => i.trim()).filter(Boolean);
  const uniqueIcons = [...new Set(icons)];
  const newImport = `import {\n  ${uniqueIcons.join(',\n  ')}\n} from 'lucide-react';`;
  appStr = appStr.replace(importsMatch[0], newImport);
  fs.writeFileSync('src/App.tsx', appStr);
}

// Fix React.useEffect issue
const workspaces = [
  'src/components/ProcurementWorkspace.tsx',
  'src/components/VendorMasterWorkspace.tsx'
];
workspaces.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    if (!content.includes("import React")) {
      content = content.replace(/import\s+\{/, "import React, {");
    }
    fs.writeFileSync(file, content);
  }
});

console.log('Fixed TS errors');
