"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import {
	ChevronDown,
	Download,
	Filter,
	MoreHorizontal,
	Search,
} from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchKey?: string;
	searchPlaceholder?: string;
	enablePagination?: boolean;
	enableSorting?: boolean;
	enableFiltering?: boolean;
	enableColumnVisibility?: boolean;
	enableExport?: boolean;
	onExport?: (data: TData[]) => void;
	pageSize?: number;
	className?: string;
	emptyMessage?: string;
	loading?: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	searchPlaceholder = "Search...",
	enablePagination = true,
	enableSorting = true,
	enableFiltering = true,
	enableColumnVisibility = true,
	enableExport = false,
	onExport,
	pageSize = 10,
	className,
	emptyMessage = "No results found.",
	loading = false,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [globalFilter, setGlobalFilter] = React.useState("");

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: enablePagination
			? getPaginationRowModel()
			: undefined,
		getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
		getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter,
		},
		initialState: {
			pagination: {
				pageSize,
			},
		},
	});

	const selectedRows = table.getFilteredSelectedRowModel().rows;

	const handleExport = () => {
		if (onExport) {
			const dataToExport =
				selectedRows.length > 0
					? selectedRows.map((row) => row.original)
					: table.getFilteredRowModel().rows.map((row) => row.original);
			onExport(dataToExport);
		}
	};

	if (loading) {
		return (
			<div className={cn("space-y-4", className)}>
				<div className="flex items-center justify-between">
					<div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
					<div className="flex space-x-2">
						<div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
						<div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
					</div>
				</div>
				<div className="rounded-md border">
					<div className="h-12 bg-gray-100 dark:bg-gray-800 border-b" />
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
						>
							<div className="flex items-center space-x-4 p-4">
								{Array.from({ length: 4 }).map((_, j) => (
									<div
										key={j}
										className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-1"
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className={cn("space-y-4", className)}>
			{/* Toolbar */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					{enableFiltering && (
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
							<Input
								placeholder={searchPlaceholder}
								value={globalFilter}
								onChange={(event) => setGlobalFilter(event.target.value)}
								className="pl-10 w-64"
							/>
						</div>
					)}
					{selectedRows.length > 0 && (
						<Badge variant="secondary" className="ml-2">
							{selectedRows.length} selected
						</Badge>
					)}
				</div>

				<div className="flex items-center space-x-2">
					{enableExport && (
						<Button
							variant="outline"
							size="sm"
							onClick={handleExport}
							disabled={data.length === 0}
						>
							<Download className="h-4 w-4 mr-2" />
							Export
						</Button>
					)}

					{enableColumnVisibility && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm">
									<Filter className="h-4 w-4 mr-2" />
									Columns
									<ChevronDown className="h-4 w-4 ml-2" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{table
									.getAllColumns()
									.filter((column) => column.getCanHide())
									.map((column) => {
										return (
											<DropdownMenuCheckboxItem
												key={column.id}
												className="capitalize"
												checked={column.getIsVisible()}
												onCheckedChange={(value) =>
													column.toggleVisibility(!!value)
												}
											>
												{column.id}
											</DropdownMenuCheckboxItem>
										);
									})}
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			</div>

			{/* Table */}
			<div className="rounded-md border bg-white dark:bg-gray-900">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="font-semibold">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center text-gray-500 dark:text-gray-400"
								>
									{emptyMessage}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			{enablePagination && (
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Showing{" "}
							{table.getState().pagination.pageIndex *
								table.getState().pagination.pageSize +
								1}{" "}
							to{" "}
							{Math.min(
								(table.getState().pagination.pageIndex + 1) *
									table.getState().pagination.pageSize,
								table.getFilteredRowModel().rows.length,
							)}{" "}
							of {table.getFilteredRowModel().rows.length} results
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

// Row Actions Component
interface RowActionsProps<TData> {
	row: TData;
	onEdit?: (row: TData) => void;
	onDelete?: (row: TData) => void;
	onView?: (row: TData) => void;
	additionalActions?: Array<{
		label: string;
		onClick: (row: TData) => void;
		icon?: React.ReactNode;
		destructive?: boolean;
	}>;
}

export function RowActions<TData>({
	row,
	onEdit,
	onDelete,
	onView,
	additionalActions = [],
}: RowActionsProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{onView && (
					<DropdownMenuItem onClick={() => onView(row)}>
						View details
					</DropdownMenuItem>
				)}

				{onEdit && (
					<DropdownMenuItem onClick={() => onEdit(row)}>Edit</DropdownMenuItem>
				)}

				{additionalActions.map((action, index) => (
					<DropdownMenuItem
						key={index}
						onClick={() => action.onClick(row)}
						className={action.destructive ? "text-red-600" : ""}
					>
						{action.icon && <span className="mr-2">{action.icon}</span>}
						{action.label}
					</DropdownMenuItem>
				))}

				{onDelete && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => onDelete(row)}
							className="text-red-600"
						>
							Delete
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
