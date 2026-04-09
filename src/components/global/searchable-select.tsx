"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SearchableSelectProps<T extends { id: string; name: string }> {
  label: string;
  placeholder?: string;
  items: T[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  itemsPerPage?: number;
}

export function SearchableSelect<T extends { id: string; name: string }>({
  label,
  placeholder = "Cari...",
  items,
  value,
  onChange,
  disabled = false,
  isLoading = false,
  itemsPerPage = 10,
}: SearchableSelectProps<T>) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredItems.slice(start, end);
  }, [filteredItems, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const selectedItem = items.find((item) => item.id === value);

  const handleSelect = (itemId: string) => {
    onChange(itemId);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`searchable-select-${label}`}>{label}</Label>

      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          disabled={disabled || isLoading}
          className="w-full px-3 py-2 border rounded-md text-left focus:outline-none focus:ring focus:border-blue-300 dark:bg-zinc-700 dark:border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedItem ? selectedItem.name : placeholder}
        </button>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 border rounded-md bg-white dark:bg-zinc-700 dark:border-zinc-600 shadow-lg z-50">
            <div className="p-3 border-b dark:border-zinc-600">
              <Input
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading}
                className="dark:bg-zinc-600 dark:border-zinc-500"
                autoFocus
              />
            </div>

            {/* Items List */}
            <div className="max-h-48 overflow-y-auto">
              {isLoading ? (
                <div className="p-3 text-center text-sm text-gray-500 dark:text-gray-400">
                  Loading...
                </div>
              ) : paginatedItems.length === 0 ? (
                <div className="p-3 text-center text-sm text-gray-500 dark:text-gray-400">
                  {filteredItems.length === 0 ? "Tidak ada data" : "Tidak ada hasil"}
                </div>
              ) : (
                <div>
                  {paginatedItems.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelect(item.id);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-blue-50 dark:hover:bg-zinc-600 transition ${
                        value === item.id ? "bg-blue-100 dark:bg-zinc-500" : ""
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="p-2 border-t dark:border-zinc-600 flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.max(1, p - 1));
                    }}
                    disabled={currentPage === 1}
                    className="dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-600"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                    }}
                    disabled={currentPage === totalPages}
                    className="dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-600"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
