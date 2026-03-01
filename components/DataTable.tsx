"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: keyof T;
  searchPlaceholder?: string;
}

type SortDirection = "asc" | "desc" | null;

const PAGE_SIZE = 10;

function getNestedValue<T>(obj: T, key: string): unknown {
  return key.split(".").reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Rechercher...",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!searchKey || !search.trim()) return data;
    const lower = search.toLowerCase();
    return data.filter((row) => {
      const val = getNestedValue(row, searchKey as string);
      return String(val ?? "").toLowerCase().includes(lower);
    });
  }, [data, search, searchKey]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = getNestedValue(a, sortKey);
      const bVal = getNestedValue(b, sortKey);
      const aStr = String(aVal ?? "");
      const bStr = String(bVal ?? "");
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      const isNumeric = !isNaN(aNum) && !isNaN(bNum);
      if (isNumeric) {
        return sortDir === "asc" ? aNum - bNum : bNum - aNum;
      }
      return sortDir === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page]);

  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortKey(null);
      setSortDir(null);
    }
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return <ChevronsUpDown size={14} className="text-[#A8A8C0]" />;
    if (sortDir === "asc") return <ChevronUp size={14} className="text-[#3D8BFF]" />;
    return <ChevronDown size={14} className="text-[#3D8BFF]" />;
  };

  return (
    <div className="flex flex-col gap-4">
      {searchKey && (
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A8C0]" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder={searchPlaceholder}
            className="w-full bg-[#1C1C28] border border-[#2A2A38] rounded-lg pl-9 pr-4 py-2 text-sm text-[#F2F2F8] placeholder-[#A8A8C0] focus:outline-none focus:border-[#3D8BFF] transition-colors"
          />
        </div>
      )}

      <div className="w-full overflow-x-auto rounded-xl border border-[#2A2A38] bg-[#1C1C28]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2A2A38]">
              {columns.map((col) => {
                const key = col.key as string;
                const isSortable = col.sortable !== false;
                return (
                  <th
                    key={key}
                    onClick={() => isSortable && handleSort(key)}
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#A8A8C0] select-none ${
                      isSortable ? "cursor-pointer hover:text-[#F2F2F8] transition-colors" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {col.label}
                      {isSortable && <SortIcon colKey={key} />}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-[#A8A8C0] text-sm"
                >
                  Aucun rÃ©sultat trouvÃ©.
                </td>
              </tr>
            ) : (
              paginated.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-b border-[#2A2A38] last:border-0 hover:bg-[#111118] transition-colors group"
                >
                  {columns.map((col) => {
                    const key = col.key as string;
                    const rawValue = getNestedValue(row, key);
                    return (
                      <td key={key} className="px-4 py-3 text-[#F2F2F8]">
                        {col.render
                          ? col.render(rawValue, row)
                          : String(rawValue ?? "-")}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-[#A8A8C0]">
        <span>
          Affichage de {sorted.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}â
          {Math.min(page * PAGE_SIZE, sorted.length)} sur {sorted.length} lignes
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A38] bg-[#1C1C28] hover:bg-[#111118] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[#F2F2F8]"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .reduce<(number | "...")[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((item, idx) =>
              item === "..." ? (
                <span key={`ellipsis-${idx}`} className="px-1">
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => setPage(item as number)}
                  className={`flex items-center justify-center w-8 h-8 rounded-lg border text-sm font-medium transition-colors ${
                    page === item
                      ? "bg-[#3D8BFF] border-[#3D8BFF] text-white"
                      : "border-[#2A2A38] bg-[#1C1C28] text-[#F2F2F8] hover:bg-[#111118]"
                  }`}
                >
                  {item}
                </button>
              )
            )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A38] bg-[#1C1C28] hover:bg-[#111118] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[#F2F2F8]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
