"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/UI/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/UI/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/popover"
import { useEffect } from 'react';
import { getAttributes, searchAttributes, createAttribute } from '@/services/productManagementService';
import { Attribute } from '@/types/productCreate';

// Component to search and create attributes using API endpoints

export function ComboboxWithCreate({
  value: outerValue,
  onChange,
  placeholder = 'Chọn thuộc tính...',
  className,
  items: initialItems,
  onCreate: onCreateCallback,
}: {
  value?: number | null;
  onChange?: (id: number | null) => void;
  placeholder?: string;
  className?: string;
  items?: Attribute[];
  onCreate?: (attr: Attribute) => void;
}) {
  const [open, setOpen] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState<number | null>(outerValue ?? null)
  const [query, setQuery] = React.useState("") // State để lưu từ khóa tìm kiếm
  const [items, setItems] = React.useState<Attribute[]>(initialItems ?? [])
  const [allItems, setAllItems] = React.useState<Attribute[]>(initialItems ?? [])

  // Hàm xử lý thêm mới gửi lên API
  const handleCreateNew = async () => {
    if (!query || query.trim().length === 0) return;
    try {
      const created = await createAttribute(query.trim());
      // Append to items and select it
      setItems(prev => [created, ...prev.filter(i => i.id !== created.id)]);
      setAllItems(prev => [created, ...prev.filter(i => i.id !== created.id)]);
      setSelectedId(created.id);
      onChange?.(created.id);
      onCreateCallback?.(created);
      setOpen(false);
      setQuery('');
    } catch (err) {
      console.error('Failed to create attribute:', err);
    }
  }

  // Hàm xử lý clear (xóa chọn)
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation() // Ngăn việc click lan ra làm mở/đóng popover
    setSelectedId(null)
    onChange?.(null)
  }

  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setItems(initialItems);
      setAllItems(initialItems);
      return;
    }

    // Initial load from server if not provided by parent
    const fetchAll = async () => {
      try {
        const data = await getAttributes();
        setItems(data || []);
        setAllItems(data || []);
      } catch (err) {
        console.error('Failed to fetch attributes:', err);
      }
    }
    fetchAll();
  }, [initialItems])

  // Debounced search. If parent provided initialItems, filter locally to avoid network calls
  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        const q = query?.trim();
        if (!q || q.length === 0) {
          setItems(allItems);
          return;
        }

        if (initialItems && initialItems.length > 0) {
          setItems(allItems.filter(i => i.name.toLowerCase().includes(q.toLowerCase())));
          return;
        }

        const data = await searchAttributes(q);
        setItems(data || []);
      } catch (err) {
        console.error('Failed to search attributes:', err);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [query, initialItems, allItems]);

  useEffect(() => setSelectedId(outerValue ?? null), [outerValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full min-w-0 justify-between', className)}
        >
          {selectedId
            ? items.find((item) => item.id === selectedId)?.name
            : placeholder}
          
          {/* Nút Clear hoặc Icon mũi tên */}
          <div className="flex items-center gap-1">
            {selectedId && (
               <div
                 onClick={handleClear}
                 className="cursor-pointer rounded-full p-1 hover:bg-slate-200"
               >
                 <X className="h-4 w-4 opacity-50" />
               </div>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-[320px] p-0">
          <Command>
          {/* onValueChange giúp lấy text người dùng nhập để biết cần "Thêm" cái gì */}
          <CommandInput 
            placeholder="Tìm kiếm thuộc tính..." 
            onValueChange={(search) => setQuery(search)} 
          />
          <CommandList>
            
            {/* LOGIC CHÍNH: Chỉ hiển thị khi không tìm thấy kết quả */}
            <CommandEmpty>
              <div className="p-2 text-sm text-muted-foreground">
                Không tìm thấy "{query}"
              </div>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 h-8"
                onClick={handleCreateNew}
              >
                <Plus className="h-4 w-4" />
                Thêm mới "{query}"
              </Button>
            </CommandEmpty>

            <CommandGroup>
              {items.map((attr) => (
                <CommandItem
                  key={attr.id}
                  value={attr.name} // Use label for filtering
                  onSelect={(currentValue) => {
                    const selected = items.find(i => i.name.toLowerCase() === currentValue.toLowerCase());
                    setSelectedId(selected ? selected.id : null);
                    onChange?.(selected ? selected.id : null);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedId === attr.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {attr.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}