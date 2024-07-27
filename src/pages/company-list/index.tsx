import { useMemo, type FC } from 'react'

import { CreateButton, DeleteButton, EditButton } from '@refinedev/antd'
import { useGo, useTable } from '@refinedev/core'
import { COMPANIES_LIST_QUERY } from '@/graphql/queries'
import { Space } from 'antd'
import Avatar from '@/components/common/Avatar'
import Text from '@/components/common/Text'
import { CompaniesListQuery } from '@/graphql/types'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { currencyNumber } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomPagination from '@/components/common/CustomPagination'
import TableFilter from '@/components/company-list/TableFilter'

export type DisplayedCompany = GetFieldsFromList<CompaniesListQuery>

export const CompanyListPage: FC = () => {
    const go = useGo()

    const {
        tableQueryResult: { data },
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

    const convertedData = useMemo(
        () =>
            data?.data.map((company) => {
                const { dealsAggregate, ...rest } = company

                return {
                    ...rest,
                    value: dealsAggregate[0]?.sum?.value || 0,
                }
            }) || [],
        [data?.data]
    )

    const hasResult = convertedData.length > 0
    const hasNext = current < pageCount
    const hasPrevious = current > 1

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
                    <TableRow className='text-xl font-extrabold bg-slate-100 hover:bg-slate-200'>
                        <TableHead className='min-w-[600px] px-5 py-4 flex-[0.9]'>
                            <div className='flex items-center justify-between'>
                                <span>Company Title</span>
                                <TableFilter setFilters={setFilters} />
                            </div>
                        </TableHead>
                        <TableHead className='min-w-[100px] px-5 py-4 flex-[0.05] text-center'>
                            Open deals amount
                        </TableHead>
                        <TableHead className='min-w-[100px] px-5 py-4 flex-[0.05] text-center'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='bg-white'>
                    {convertedData.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className='text-center'>
                                <Text size='sm'>No companies found</Text>
                            </TableCell>
                        </TableRow>
                    ) : (
                        convertedData?.map((company) => (
                            <TableRow
                                key={company.id}
                                className='hover:bg-gray-100'>
                                <TableCell>
                                    <Space size={10}>
                                        <Avatar
                                            shape='square'
                                            name={company.name}
                                            src={company.avatarUrl}
                                        />
                                        <Text
                                            className='whitespace-normal'
                                            size='lg'>
                                            {company.name}
                                        </Text>
                                    </Space>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Text
                                        className='font-bold'
                                        size='lg'>
                                        {currencyNumber(company.value)}
                                    </Text>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Space>
                                        <EditButton
                                            hideText
                                            size='large'
                                            recordItemId={company.id}
                                        />
                                        <DeleteButton
                                            hideText
                                            size='large'
                                            recordItemId={company.id}
                                        />
                                    </Space>
                                </TableCell>
                            </TableRow>
                        ))
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
