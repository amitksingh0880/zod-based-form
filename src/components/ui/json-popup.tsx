import React from 'react';
import { Button } from '@/components/ui/button';

export type JsonPopupProps = {
  data: any | null;
  open: boolean;
  onClose: () => void;
  title?: string;
};

export const JsonPopup: React.FC<JsonPopupProps> = ({ data, open, onClose, title = 'Submitted JSON' }) => {
  if (!open || !data) return null;

  return (
    <div className="fixed z-50 bottom-4 right-4 w-[min(600px,95vw)] max-h-[70vh]">
      <div className="bg-popover/95 backdrop-blur border rounded shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <div className="font-medium">{title}</div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => {
              try {
                navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
              } catch (e) {
                // ignore
              }
            }}>Copy</Button>
            <Button size="sm" variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
        <div className="p-3 overflow-auto text-sm bg-surface">
          <pre className="whitespace-pre-wrap break-words font-mono text-xs">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default JsonPopup;
