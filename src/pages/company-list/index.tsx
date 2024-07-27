import { useMemo, useState, type FC } from 'react'

import { CreateButton, DeleteButton, EditButton } from '@refinedev/antd'
import { useGo, useTable } from '@refinedev/core'
import { COMPANIES_LIST_QUERY } from '@/graphql/queries'
import { Button, Space } from 'antd'
import Avatar from '@/components/common/Avatar'
import Text from '@/components/common/Text'
import { CompaniesListQuery } from '@/graphql/types'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { cn, currencyNumber } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomPagination from '@/components/common/CustomPagination'
import TableFilter from '@/components/company-list/TableFilter'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export type DisplayedCompany = GetFieldsFromList<CompaniesListQuery>

export const CompanyListPage: FC = () => {
    const go = useGo()

    const {
        tableQueryResult: { data },
        current,
        setCurrent,
        pageCount,
        setFilters,
        setSorters,
    } = useTable<DisplayedCompany>({
        resource: 'companies',
        meta: {
            gqlQuery: COMPANIES_LIST_QUERY,
        },
        pagination: {
            pageSize: 10,
        },
        sorters: {
            initial: [
                {
                    field: 'name',
                    order: 'asc',
                },
            ],
        },
        filters: {
            initial: [
                {
                    field: 'name',
                    operator: 'contains',
                    value: undefined,
                },
                {
                    field: 'id',
                    operator: 'contains',
                    value: undefined,
                },
            ],
        },
    })
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo<ColumnDef<DisplayedCompany>[]>(
        () => [
            {
                id: 'name',
                accessorKey: 'name',
                header: () => (
                    <div className='flex items-center justify-between min-w-[600px] px-5 py-4 flex-[0.9]'>
                        <span>Company Title</span>
                        <TableFilter setFilters={setFilters} />
                    </div>
                ),
                cell: ({ row }) => (
                    <Space
                        size={10}
                        className='min-w-[100px] px-5 py-4 flex-[0.05] text-center'>
                        <Avatar
                            shape='square'
                            name={row.original.name}
                            src={row.original.avatarUrl}
                        />
                        <Text
                            className='whitespace-normal'
                            size='lg'>
                            {row.original.name}
                        </Text>
                    </Space>
                ),
            },
            {
                id: 'value',
                accessorFn: ({ dealsAggregate }) => dealsAggregate.at(0)?.sum?.value,
                header: ({ column }) => (
                    <div
                        className='flex items-center justify-center gap-2 '
                        onClick={() => {
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }}>
                        <p className='flex items-center p-4 cursor-pointer rounded-2xl w-f hover:bg-slate-200/80'>
                            Open Deals Amount
                            <ArrowUpDown className='w-4 h-4 ml-2' />
                        </p>
                    </div>
                ),
                cell: ({ row }) => {
                    return (
                        <Text
                            className='font-bold text-center'
                            size='lg'>
                            {currencyNumber(row.original.dealsAggregate.at(0)?.sum?.value || 0)}
                        </Text>
                    )
                },
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <Space>
                        <EditButton
                            hideText
                            size='large'
                            recordItemId={row.original.id}
                        />
                        <DeleteButton
                            hideText
                            size='large'
                            recordItemId={row.original.id}
                        />
                    </Space>
                ),
            },
        ],

        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const hasResult = Array.isArray(data?.data) && data?.data?.length > 0
    const hasNext = current < pageCount
    const hasPrevious = current > 1

    const table = useReactTable({
        data: data?.data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
    })

    return (
        <main className='flex flex-col w-full gap-8'>
            <section className='flex justify-between w-full'>
                <Text size='lg'>Companies</Text>
                <CreateButton
                    onClick={() =>
                        go({
                            to: {
                                resource: 'companies',
                                action: 'create',
                            },
                            options: {
                                keepQuery: true,
                            },
                            type: 'replace',
                        })
                    }
                />
            </section>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className={cn(header.column.id !== 'name' && 'text-center')}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className='bg-white'>
                    {table.getRowModel().rows?.length !== 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className='hover:bg-gray-100'>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className={cn(cell.column.id !== 'name' && 'text-center')}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                <Text
                                    size='lg'
                                    className='text-center'>
                                    No data found
                                </Text>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {hasResult && (
                <CustomPagination
                    current={current}
                    setCurrent={setCurrent}
                    pageCount={pageCount}
                    hasPrevious={hasPrevious}
                    hasNext={hasNext}
                />
            )}
        </main>
    )
}
