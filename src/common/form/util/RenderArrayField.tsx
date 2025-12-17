import React, { useState, useRef, KeyboardEvent } from "react";
import { useFieldArray, Control } from "react-hook-form";
import { X } from "lucide-react";

interface ChipsInputFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
}

export const RenderArrayField: React.FC<ChipsInputFieldProps> = ({
  name,
  control,
  label = "Add items",
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addChip = () => {
    const value = inputValue.trim();
    if (!value) return;

    append({ value }); // ✅ MUST be object
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip();
    }

    if (e.key === "Backspace" && inputValue === "" && fields.length > 0) {
      remove(fields.length - 1);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-sm"
          >
            {(field as any).value}
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter"
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        {inputValue.trim() && (
          <button
            type="button"
            onClick={addChip}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};
