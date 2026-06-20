const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('Workspace.tsx'));

files.forEach(file => {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip CrmWorkspace since it might already be correct
  if (file === 'CrmWorkspace.tsx') return;

  // Change function signature
  content = content.replace(
    /export default function (\w+Workspace)\(\{ onBack \}: \{ onBack: \(\) => void \}\) \{/,
    'export default function $1({ onBack, initialMenu }: { onBack: () => void, initialMenu?: string }) {'
  );

  // Change useState
  content = content.replace(
    /const \[activeModule, setActiveModule\] = useState<string \| null>\(null\);/,
    'const [activeModule, setActiveModule] = useState<string | null>(initialMenu || null);\n  React.useEffect(() => { if (initialMenu) setActiveModule(initialMenu); }, [initialMenu]);'
  );

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Workspaces updated');
