import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface SidebarProps {
  activeView: 'personal' | 'shared';
  onViewChange: (view: 'personal' | 'shared') => void;
  onNewNote: () => void;
}

export function Sidebar({ activeView, onViewChange, onNewNote }: SidebarProps) {
  return (
    <aside className="w-64 space-y-2">
      <Button
        variant={activeView === 'personal' ? 'default' : 'ghost'}
        className="w-full justify-start"
        onClick={() => onViewChange('personal')}
      >
        Personal Notes
      </Button>
      <Button
        variant={activeView === 'shared' ? 'default' : 'ghost'}
        className="w-full justify-start"
        onClick={() => onViewChange('shared')}
      >
        Shared Notes
      </Button>
      <Separator />
      <Button className="w-full" onClick={onNewNote}>+ New Note</Button>
    </aside>
  );
}
