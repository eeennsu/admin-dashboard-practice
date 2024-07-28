import { PropsWithChildren, useMemo, useState } from 'react'
import { CreateButton, DeleteButton, EditButton } from '@refinedev/antd'
import { useGo, useTable } from '@refinedev/core'
import { COMPANIES_LIST_QUERY } from '@/graphql/queries'
import { Space } from 'antd'
import Avatar from '@/components/common/Avatar'
import Text from '@/components/common/Text'
import { CompaniesListQuery } from '@/graphql/types'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { cn, currencyNumber, getDate } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomPagination from '@/components/common/CustomPagination'
import TableFilter from '@/components/company/list/TableFilter'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, Link2Icon, Slash } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { Popover } from '@/components/ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '@/components/ui/button'

export type DisplayedCompany = GetFieldsFromList<CompaniesListQuery>

export const CompanyListPage = ({ children }: PropsWithChildren) => {
    const go = useGo()

    const {
        tableQueryResult: { data, isFetching },
        current,
        setCurrent,
        pageCount,
        setFilters,
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
                    <div className='flex items-center justify-between min-w-[300px] max-w-[400px] px-5 py-4 flex-[0.9]'>
                        <span>Company Title</span>
                        <TableFilter setFilters={setFilters} />
                    </div>
                ),
                cell: ({ row }) => (
                    <Space
                        size={10}
                        className='min-w-[100px] max-w-[350px] px-5 py-4 flex-[0.05] text-center'>
                        <Avatar
                            shape='square'
                            name={row.original.name}
                            src={row.original.avatarUrl}
                        />
                        <Text
                            className='truncate line-clamp-1'
                            size='lg'>
                            {row.original.name}
                        </Text>
                    </Space>
                ),
            },
            {
                id: 'industry',
                accessorKey: 'industry',
                header: 'Industry',
                cell: ({ row }) => (
                    <Text
                        size='md'
                        className='flex justify-center'>
                        {row.original.industry || <Slash className='rotate-45 size-4' />}
                    </Text>
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
                id: 'country',
                accessorKey: 'country',
                header: 'Country',
                cell: ({ row }) => (
                    <Text
                        size='md'
                        className='flex justify-center'>
                        {row.original.country || <Slash className='rotate-45 size-4' />}
                    </Text>
                ),
            },
            {
                id: 'website',
                accessorKey: 'website',
                header: 'Website',
                cell: ({ row }) => (
                    <Text
                        size='md'
                        className='flex justify-center'>
                        {row?.original?.website ? (
                            <Link to={row.original.website}>
                                <Link2Icon />
                            </Link>
                        ) : (
                            <Text
                                size='md'
                                className='text-center'>
                                <Slash className='rotate-45 size-4' />
                            </Text>
                        )}
                    </Text>
                ),
            },
            {
                id: 'createdBy',
                accessorKey: 'createdBy',
                header: 'Creator',
                cell: ({ row }) => (
                    <Text
                        size='md'
                        className='text-center'>
                        {row.original.createdBy.name}
                    </Text>
                ),
            },
            {
                id: 'createdAt',
                accessorKey: 'createdAt',
                header: 'Created At',
                cell: ({ row }) => (
                    <Text
                        size='md'
                        className='text-center'>
                        {getDate(row.original.createdAt)}
                    </Text>
                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant='outline'
                                className='border-gray-300 rounded-2xl focus:bg-slate-200'>
                                ...
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            side='top'
                            className='px-6 py-4 bg-blue-200 rounded-3xl'>
                            <div className='flex items-center gap-2'>
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
                            </div>
                        </PopoverContent>
                    </Popover>
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

            <Table className='relative h-full'>
                {isFetching && (
                    <div className='absolute -translate-y-1/2 h-full-translate-x-1/2 top-1/2 left-1/2'>
                        <LoadingOutlined className='text-4xl' />
                    </div>
                )}
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
                <TableBody className={cn('bg-white', isFetching && 'opacity-20')}>
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
            {children}
        </main>
    )
}
