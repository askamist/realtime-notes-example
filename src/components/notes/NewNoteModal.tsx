import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string) => Promise<void>;
  isLoading: boolean;
}

export function NewNoteModal({ isOpen, onClose, onSubmit, isLoading }: NewNoteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    await onSubmit(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !title.trim() || !content.trim()}>
            {isLoading ? 'Creating...' : 'Create Note'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
