import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export type JsonPopupProps = {
  data: any | null;
  open: boolean;
  onClose: () => void;
  title?: string;
};

export const JsonPopup: React.FC<JsonPopupProps> = ({ data, open, onClose, title = 'Submitted JSON' }) => {
  const handleCopy = () => {
    try {
      if (data) {
        navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
        toast.success('JSON copied to clipboard!');
      }
    } catch (e) {
      toast.error('Failed to copy JSON');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-muted p-4 rounded-md font-mono text-xs">
          <pre className="whitespace-pre-wrap break-all">
            {data ? JSON.stringify(data, null, 2) : 'No data'}
          </pre>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCopy}>
            Copy JSON
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JsonPopup;
