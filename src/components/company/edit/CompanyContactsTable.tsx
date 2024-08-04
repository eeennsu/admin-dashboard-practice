import { useParams } from 'react-router-dom'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { FilterOutlined, LoadingOutlined, MailOutlined, PhoneOutlined, TeamOutlined } from '@ant-design/icons'
import { Button, Card, Space } from 'antd'
import { COMPANY_CONTACTS_TABLE_QUERY } from '@/graphql/queries'
import { CompanyContactsTableQuery } from '@/graphql/types'
import Text from '@/components/common/Text'
import { FC, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import Avatar from '@/components/common/Avatar'
import ContactStatusTag from './ContactStatusTag'
import { useTable } from '@refinedev/core'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomPagination from '@/components/common/CustomPagination'
import TableDataFilter from '@/components/common/TableDataFilter'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select'

const CompanyContactsTable: FC = () => {
    const params = useParams()

    const {
        tableQueryResult: { data, isFetching },
        current,
        setCurrent,
        pageCount,
        setFilters,
    } = useTable<GetFieldsFromList<CompanyContactsTableQuery>>({
        resource: 'contacts',
        syncWithLocation: false,
        sorters: {
            initial: [
                {
                    field: 'createdAt',
                    order: 'desc',
                },
            ],
        },
        filters: {
            initial: [
                {
                    field: 'jobTitle',
                    value: '',
                    operator: 'contains',
                },
                {
                    field: 'name',
                    value: '',
                    operator: 'contains',
                },
                {
                    field: 'status',
                    value: undefined,
                    operator: 'in',
                },
            ],
            permanent: [
                {
                    field: 'company.id',
                    operator: 'eq',
                    value: params?.id as string,
                },
            ],
        },
        meta: {
            gqlQuery: COMPANY_CONTACTS_TABLE_QUERY,
        },
    })

    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo<ColumnDef<GetFieldsFromList<CompanyContactsTableQuery>>[]>(
        () => [
            {
                id: 'Name',
                accessorKey: 'name',
                header: () => (
                    <TableDataFilter
                        label='Name'
                        onFilter={(value) => {
                            setFilters(
                                [
                                    {
                                        field: 'name',
                                        value,
                                        operator: 'contains',
                                    },
                                ],
                                'merge'
                            )
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <Space>
                        <Avatar
                            name={row.original.name}
                            src={row.original.avatarUrl}
                            alt={row.original.name}
                        />
                        <Text>{row.original.name}</Text>
                    </Space>
                ),
            },
            {
                id: 'Title',
                accessorKey: 'jobTitle',
                header: () => (
                    <TableDataFilter
                        label='Title'
                        onFilter={(value) => {
                            setFilters(
                                [
                                    {
                                        field: 'jobTitle',
                                        value,
                                        operator: 'contains',
                                    },
                                ],
                                'merge'
                            )
                        }}
                    />
                ),
                maxSize: 26,
                cell: ({ row }) => <Text>{row.original.jobTitle}</Text>,
            },
            {
                id: 'Stage',
                accessorKey: 'status',
                header: () => (
                    <div className='flex items-center justify-between'>
                        <Text strong>Stage</Text>
                        <Select
                            onValueChange={(value) => {
                                setFilters(
                                    [
                                        {
                                            field: 'status',
                                            value,
                                            operator: 'eq',
                                        },
                                    ],
                                    'merge'
                                )
                            }}>
                            <SelectTrigger isInit>
                                <FilterOutlined className='text-xs size-3 opacity-40' />
                            </SelectTrigger>
                            <SelectContent className='p-0 bg-gray-100'>
                                <SelectGroup>
                                    {ContactStatusTag.STATUS.map((status) => (
                                        <SelectItem
                                            key={status}
                                            value={status}
                                            className='pl-3 hover: bg-gray-50'>
                                            <span className='uppercase'>{status}</span>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                ),
                cell: ({ row }) => <ContactStatusTag status={row.original.status} />,
            },
            {
                id: 'Actions',
                accessorKey: 'actions',
                header: () => '',
                cell: ({ row }) => (
                    <Space>
                        <Button
                            size='small'
                            href={`mailto:${row.original.email}`}
                            icon={<MailOutlined />}
                        />
                        <Button
                            size='small'
                            href={`tel:${row.original.phone}`}
                            icon={<PhoneOutlined />}
                        />
                    </Space>
                ),
            },
        ],

        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

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

    const hasResult = Array.isArray(data?.data) && data?.data?.length > 0
    const totalCount = data?.total || 0
    const hasNext = current < pageCount
    const hasPrevious = current > 1

    return (
        <Card
            styles={{
                header: {
                    borderBottom: '1px solid #D9D9D9',
                    marginBottom: '1px',
                },
                body: {
                    padding: 0,
                },
            }}
            title={
                <Space size='middle'>
                    <TeamOutlined />
                    <Text>Contacts</Text>
                </Space>
            }
            extra={
                <>
                    <Text className='tertiary'>Total contacts: </Text>
                    <Text strong>{totalCount}</Text>
                </>
            }>
            <Table>
                {isFetching && (
                    <div className='absolute -translate-y-1/2 h-full-translate-x-1/2 top-1/2 left-1/2'>
                        <LoadingOutlined className='text-4xl' />
                    </div>
                )}
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
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
                                data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className='h-24 text-center'>
                                <Text>No contacts found</Text>
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
                    rootClassName='my-3'
                    contentClassName='text-sm'
                    buttonClassName='size-7'
                />
            )}
        </Card>
    )
}

export default CompanyContactsTable
