import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, X, CheckCircle2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export type FileUploadProps = {
  id: string;
  multiple?: boolean;
  value: File | FileList | File[] | null;
  onChange: (val: File | FileList | File[] | null) => void;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
};

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  multiple = false,
  value,
  onChange,
  accept,
  maxSizeMB = 10,
  className,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const files = React.useMemo<File[]>(() => {
    if (!value) return [];
    if (value instanceof File) return [value];
    if (value instanceof FileList) return Array.from(value);
    return value;
  }, [value]);

  const validateFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File must be smaller than ${maxSizeMB}MB`);
      return false;
    }
    return true;
  };

  const handleSelect = (list: FileList | null) => {
    if (!list || list.length === 0) return;

    const valid = Array.from(list).filter(validateFile);
    if (!valid.length) return;

    setError(null);

    if (!multiple) {
      onChange(valid[0]);
      return;
    }

    try {
      const dt = new DataTransfer();
      valid.forEach((f) => dt.items.add(f));
      onChange(dt.files);
    } catch {
      onChange(valid);
    }
  };

  const remove = (index: number) => {
    if (!multiple) {
      onChange(null);
      return;
    }

    const next = files.filter((_, i) => i !== index);
    try {
      const dt = new DataTransfer();
      next.forEach((f) => dt.items.add(f));
      onChange(dt.files);
    } catch {
      onChange(next);
    }
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

  return (
    <div className={cn("space-y-4", className)}>
      <input
        ref={inputRef}
        id={id}
        type="file"
        hidden
        multiple={multiple}
        accept={accept}
        onChange={(e) => handleSelect(e.target.files)}
      />

      {/* Upload Zone */}
      <div
        className={cn(
          "rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/30 hover:border-primary/50"
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          if (e.currentTarget === e.target) setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleSelect(e.dataTransfer.files);
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">
              <span className="text-primary">Click to upload</span> or drag & drop
            </p>
            <p className="text-xs text-muted-foreground">
              Max {maxSizeMB}MB
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Files */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            {files.length} selected
          </div>

          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border px-3 py-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="truncate text-sm">{file.name}</span>
                <Badge variant="secondary">{formatSize(file.size)}</Badge>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => remove(i)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
