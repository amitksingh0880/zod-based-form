import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { X, ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectFieldProps {
  name: string;
  control: any;
  options: string[];
  displayLabel: string;
  optional?: boolean;
  placeholder?: string;
}

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  name,
  control,
  options,
  displayLabel,
  optional = false,
  placeholder = "Select options",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedValues = Array.isArray(field.value) ? field.value : [];

        const toggle = (option: string) => {
          const current = Array.isArray(field.value) ? field.value : [];
          if (current.includes(option)) {
            field.onChange(current.filter((v: string) => v !== option));
          } else {
            field.onChange([...current, option]);
          }
        };

        return (
          <FormItem>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  {displayLabel}
                  {optional && (
                    <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                  )}
                </label>
                {selectedValues.length > 0 && (
                  <button
                    type="button"
                    onClick={() => field.onChange([])}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-full justify-between h-11 px-3",
                        selectedValues.length > 0 ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span className="truncate">
                        {selectedValues.length === 0 
                          ? placeholder 
                          : `${selectedValues.length} selected`}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <div className="px-3 py-2 border-b">
                        <div className="flex items-center">
                          <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search..."
                            className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                          {search && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="ml-auto h-6 w-6"
                              onClick={() => setSearch("")}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <CommandList>
                        <CommandGroup className="max-h-60 overflow-auto p-1">
                          {filteredOptions.length === 0 ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                              No options found
                            </div>
                          ) : (
                            filteredOptions.map((option) => {
                              const isSelected = selectedValues.includes(option);
                              return (
                                <CommandItem
                                  key={option}
                                  value={option}
                                  onSelect={() => toggle(option)}
                                  className="cursor-pointer px-2 py-2 rounded-sm"
                                >
                                  <div className="flex items-center gap-3 w-full">
                                    <div className={cn(
                                      "flex h-4 w-4 items-center justify-center rounded-sm border transition-colors",
                                      isSelected 
                                        ? "bg-primary border-primary" 
                                        : "border-muted-foreground/30"
                                    )}>
                                      {isSelected && (
                                        <Check className="h-3 w-3 text-primary-foreground" />
                                      )}
                                    </div>
                                    <span className={cn(
                                      "text-sm transition-colors",
                                      isSelected ? "text-foreground font-medium" : "text-muted-foreground"
                                    )}>
                                      {option}
                                    </span>
                                  </div>
                                </CommandItem>
                              );
                            })
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>

              {selectedValues.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedValues.map((value: string) => (
                    <div
                      key={value}
                      className="inline-flex items-center gap-1.5 bg-secondary/50 text-secondary-foreground text-xs px-2.5 py-1.5 rounded-md"
                    >
                      {value}
                      <button
                        type="button"
                        onClick={() => toggle(value)}
                        className="ml-1 rounded-full hover:bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};