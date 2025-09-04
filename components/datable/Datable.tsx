"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type Column<T> = {
  id: string;
  header: React.ReactNode;
  /** cell renderer */
  cell: (row: T) => React.ReactNode;
  className?: string;
  /** if true, hide on small screens (still visible in card view) */
  hideOnMobile?: boolean;
};

export type DataTableProps<T> = {
  /** rows for current page */
  rows: T[] | undefined;
  /** total rows across all pages (for pagination) */
  total: number | undefined;
  /** current page index (0-based) */
  page: number;
  /** page size */
  pageSize: number;
  /** called when user clicks pagination */
  onPageChange: (next: number) => void;
  onPageSizeChange?: (next: number) => void;

  /** definitions for columns */
  columns: Column<T>[];
  /** unique key extractor for a row (stable id) */
  getRowId: (row: T) => string;

  /** UI states */
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;

  /** optional toolbar area (search/filters/actions) */
  toolbar?: React.ReactNode;

  /** empty state component or simple text */
  empty?: React.ReactNode;

  /** className for table wrapper */
  className?: string;

  /** card renderer for mobile (fallback to columns if not provided) */
  renderCard?: (row: T) => React.ReactNode;

  /** page size options */
  pageSizeOptions?: number[];
};

export default function DataTable<T>({
  rows,
  total = 0,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  columns,
  getRowId,
  isLoading,
  isError,
  errorMessage,
  toolbar,
  empty,
  className,
  renderCard,
  pageSizeOptions = [10, 20, 50],
}: DataTableProps<T>) {
  const totalPages = Math.max(
    1,
    Math.ceil((total ?? 0) / Math.max(1, pageSize))
  );

  return (
    <section className={cn("space-y-3", className)}>
      {/* Toolbar */}
      {toolbar && (
        <div className="flex flex-wrap items-center gap-2">{toolbar}</div>
      )}

      {/* Content */}
      <div className="rounded-md border">
        {/* Desktop table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((c) => (
                  <TableHead
                    key={c.id}
                    className={cn(
                      c.className,
                      c.hideOnMobile && "md:table-cell"
                    )}
                  >
                    {c.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: Math.min(pageSize, 6) }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((c) => (
                      <TableCell key={c.id}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="py-10 text-center text-sm text-red-600"
                  >
                    {errorMessage || "Erreur de chargement."}
                  </TableCell>
                </TableRow>
              ) : rows && rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={getRowId(row)}>
                    {columns.map((c) => (
                      <TableCell key={c.id} className={c.className}>
                        {c.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="py-10 text-center text-sm text-neutral-500"
                  >
                    {empty ?? "Aucun élément."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden">
          {isLoading ? (
            <div className="divide-y">
              {Array.from({ length: Math.min(pageSize, 4) }).map((_, i) => (
                <div key={i} className="p-3">
                  <Skeleton className="mb-2 h-5 w-2/3" />
                  <Skeleton className="mb-1 h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="p-4 text-center text-sm text-red-600">
              {errorMessage || "Erreur de chargement."}
            </div>
          ) : rows && rows.length > 0 ? (
            <ul className="divide-y">
              {rows.map((row) => (
                <li key={getRowId(row)} className="p-3">
                  {renderCard ? (
                    renderCard(row)
                  ) : (
                    <DefaultCard row={row} columns={columns} />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-sm text-neutral-500">
              {empty ?? "Aucun élément."}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-sm text-neutral-600">
          Page {page + 1} / {totalPages}{" "}
          {typeof total === "number" &&
            `• ${total} élément${total === 1 ? "" : "s"}`}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {/* {onPageSizeChange && (
            <select
              className="h-9 rounded-md border bg-background px-2 text-sm"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
          )} */}

          <Button
            variant="outline"
            size="sm"
            disabled={page <= 0}
            onClick={() => onPageChange(page - 1)}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page + 1 >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Suivant
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Default mobile card (falls back to listing each column as label:value) */
function DefaultCard<T>({ row, columns }: { row: T; columns: Column<T>[] }) {
  return (
    <div className="space-y-1">
      {columns.map((c) => (
        <div key={c.id} className="text-sm">
          <span className="mr-1 font-medium">
            {typeof c.header === "string" ? c.header : c.id}:
          </span>
          <span className="text-neutral-700">{c.cell(row)}</span>
        </div>
      ))}
    </div>
  );
}
