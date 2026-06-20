const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('Workspace.tsx'));

const result = {};

files.forEach(file => {
  if (file === 'CrmWorkspace.tsx') return; // already in App.tsx
  if (file === 'CrmAiAgentWorkspace.tsx') return;
  const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  
  // Extract modules array
  const match = content.match(/const modules = (\[[\s\S]*?\]);/);
  if (match) {
    // Basic cleanup to make it look like a JS object string
    let modulesStr = match[1];
    result[file.replace('Workspace.tsx', '')] = modulesStr;
  }
});

fs.writeFileSync(path.join(__dirname, 'extracted_modules.json'), JSON.stringify(result, null, 2));
console.log('Modules extracted');
