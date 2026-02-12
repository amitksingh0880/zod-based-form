import React from 'react'

export const Select = ({ children, onValueChange }: any) => (
  <div data-testid="mock-select"
    onSelectChange={(e: any) => onValueChange?.(e.detail)}>{children}</div>
)
export const SelectTrigger = (p: any) => <button aria-label="select-trigger" {...p} />
export const SelectValue = ({ placeholder }: any) => <span>{placeholder ?? ''}</span>
export const SelectContent = ({ children }: any) => <div>{children}</div>
export const SelectItem = ({ value, children }: any) => (
  <button
    role="option"
    onClick={(e) => {
      const ev = new CustomEvent('onSelectChange', { detail: value, bubbles: true })
      e.currentTarget.dispatchEvent(ev)
    }}
  >
    {children}
  </button>
)

// --- Popover ---
export const Popover = ({ children }: any) => <div>{children}</div>
export const PopoverTrigger = ({ children }: any) => <div>{children}</div>
export const PopoverContent = ({ children }: any) => <div>{children}</div>

// --- Calendar ---
export const Calendar = ({ onSelect }: any) => (
  <div>
    <button aria-label="pick-2020-01-02" onClick={() => onSelect?.(new Date('2020-01-02'))}>
      Pick Jan 2, 2020
    </button>
  </div>
)
