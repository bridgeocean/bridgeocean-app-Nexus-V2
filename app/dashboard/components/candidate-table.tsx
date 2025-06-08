"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const data: Candidate[] = [
  {
    id: "c001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    stage: "Interview",
    status: "Active",
    lastContact: "2025-06-07",
  },
  {
    id: "c002",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    phone: "+1234567891",
    stage: "Selection",
    status: "Active",
    lastContact: "2025-06-06",
  },
  {
    id: "c003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1234567892",
    stage: "Screening",
    status: "Active",
    lastContact: "2025-06-07",
  },
  {
    id: "c004",
    name: "Maria Lopez",
    email: "maria.lopez@example.com",
    phone: "+1234567893",
    stage: "Onboarding",
    status: "Active",
    lastContact: "2025-06-05",
  },
  {
    id: "c005",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1234567894",
    stage: "Screening",
    status: "Active",
    lastContact: "2025-06-06",
  },
  {
    id: "c006",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    phone: "+1234567895",
    stage: "Selection",
    status: "Inactive",
    lastContact: "2025-06-04",
  },
  {
    id: "c007",
    name: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "+1234567896",
    stage: "Interview",
    status: "Active",
    lastContact: "2025-06-05",
  },
]

export type Candidate = {
  id: string
  name: string
  email: string
  phone: string
  stage: "Screening" | "Selection" | "Interview" | "Onboarding"
  status: "Active" | "Inactive"
  lastContact: string
}

export const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.getValue("stage") as string

      return (
        <Badge
          variant="outline"
          className={
            stage === "Screening"
              ? "border-blue-500 text-blue-500"
              : stage === "Selection"
                ? "border-amber-500 text-amber-500"
                : stage === "Interview"
                  ? "border-purple-500 text-purple-500"
                  : "border-green-500 text-green-500"
          }
        >
          {stage}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      return (
        <Badge
          variant={status === "Active" ? "default" : "secondary"}
          className={status === "Active" ? "bg-green-500" : ""}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastContact",
    header: "Last Contact",
    cell: ({ row }) => <div>{row.getValue("lastContact")}</div>,
  },
]

export function CandidateTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} candidate(s) total.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
