"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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

interface SuggestionInputProps {
  data?: string[] // Danh sách các giá trị gợi ý (VD: ["Apple", "Samsung",...])
  value?: string // Giá trị hiện tại (dùng cho controlled component)
  onChange: (value: string) => void // Hàm callback khi giá trị thay đổi
  placeholder?: string
  className?: string
  fetchSuggestions?: (value: string) => Promise<string[]> // Optional async fetcher
  minQueryLength?: number
  // When true, suggestions are only fetched once input is focused, avoiding fetch on mount with prefilled values
  onlyFetchOnFocus?: boolean
  debounceMs?: number
}

export function SuggestionInput({
  data = [],
  value = "",
  onChange,
  placeholder = "Nhập giá trị...",
  fetchSuggestions,
  minQueryLength = 1,
  debounceMs = 250,
  onlyFetchOnFocus = false,
  className,
}: SuggestionInputProps) {
  const [open, setOpen] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)
  const [suggestions, suggestionsLoading] = useDebouncedSuggestions(
    value,
    data,
    fetchSuggestions,
    minQueryLength,
    debounceMs,
    onlyFetchOnFocus ? isFocused : true
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full min-w-0 justify-between", className)}
        >
          {/* Hiển thị giá trị người dùng nhập hoặc placeholder */}
          {value || <span className="text-muted-foreground">{placeholder}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      
      {/* Popover chứa ô nhập và danh sách gợi ý */}
      <PopoverContent className="w-full max-w-[320px] p-0" align="start">
        <Command>
          {/* Input chính: Nơi người dùng nhập liệu */}
          <CommandInput
            placeholder={placeholder}
            value={value}
            onValueChange={(newValue) => {
                onChange(newValue) // Cập nhật giá trị ra ngoài ngay khi gõ
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
            <CommandList>
              {suggestionsLoading && (
                <div className="p-2 text-center text-sm text-muted-foreground">Đang tải...</div>
              )}
            {/* Nếu không có gì khớp, hiển thị thông báo (hoặc ẩn đi nếu muốn) */}
            <CommandEmpty className="py-2 text-center text-sm text-muted-foreground">
              Giá trị mới sẽ được tạo: "{value}"
            </CommandEmpty>

            <CommandGroup heading="Gợi ý có sẵn">
              {(suggestions || data || []).map((item) => (
                <CommandItem
                  key={item}
                  value={item} // Quan trọng: Giá trị dùng để filter
                  onSelect={(currentValue) => {
                    // Khi user chọn một item từ list
                    // cmdk đôi khi trả về lowercase, ta nên lấy đúng text gốc từ data
                    const originalText = data.find(
                        d => d.toLowerCase() === currentValue.toLowerCase()
                    ) || currentValue
                    
                    onChange(originalText)
                    setOpen(false) // Đóng popover sau khi chọn
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

  // Debounced update for suggestions
  function useDebouncedSuggestions(
    query: string,
    providedData: string[] | undefined,
    fetcher?: (value: string) => Promise<string[]>,
    minLen = 1,
    debounceMs = 250,
    active = true
  ): [string[], boolean] {
    const [result, setResult] = React.useState<string[]>(providedData || []);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
      let mounted = true;
      const t = setTimeout(async () => {
        if (!active) {
          // If not active (e.g., onlyFetchOnFocus and not focused), return providedData and avoid requesting
          setResult(providedData || []);
          return;
        }
        if (!query || query.length < minLen) {
          setResult(providedData || []);
          return;
        }
        if (fetcher) {
          try {
            setLoading(true);
            const res = await fetcher(query);
            if (mounted) setResult(res || []);
          } catch (err) {
            console.error('Failed to fetch suggestions', err);
          }
          finally {
            if (mounted) setLoading(false);
          }
        } else {
          // filter local data
          const filtered = (providedData || []).filter(d => d.toLowerCase().includes(query.toLowerCase()));
          setResult(filtered);
        }
      }, debounceMs);
      return () => {
        mounted = false;
        clearTimeout(t);
      };
    }, [query, providedData, fetcher, minLen, debounceMs, active]);
      return [result, loading];
  }