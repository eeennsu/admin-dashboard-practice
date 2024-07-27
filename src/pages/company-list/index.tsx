import type { FC } from 'react'

import { CreateButton, DeleteButton, EditButton, FilterDropdown, List, useTable } from '@refinedev/antd'
import { getDefaultFilter, useGo } from '@refinedev/core'
import { COMPANIES_LIST_QUERY } from '@/graphql/queries'
import { Input, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Avatar from '@/components/common/Avatar'
import Text from '@/components/common/Text'
import { CompaniesListQuery } from '@/graphql/types'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { Company } from '@/graphql/schema.types'
import { currencyNumber } from '@/lib/utils'

type DisplayedCompany = GetFieldsFromList<CompaniesListQuery>

export const CompanyListPage: FC = () => {
    const go = useGo()

    const { tableProps, filters } = useTable<DisplayedCompany>({
        resource: 'companies',
        onSearch: (values: any) => {
            return [
                {
                    field: 'name',
                    operator: 'contains',
                    value: values.name,
                },
            ]
        },
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

    // console.log('data', tableProps.dataSource)

    return (
        <List
            breadcrumb={false}
            headerButtons={() => (
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
            )}>
            <Table
                {...tableProps}
                pagination={{ ...tableProps.pagination, showSizeChanger: true }}>
                <Table.Column<DisplayedCompany>
                    dataIndex='name'
                    title='Company Title'
                    defaultFilteredValue={getDefaultFilter('id', filters)}
                    filterIcon={<SearchOutlined />}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input placeholder='Search Company' />
                        </FilterDropdown>
                    )}
                    render={(_, company: DisplayedCompany) => (
                        <Space key={company.id}>
                            <Avatar
                                shape='square'
                                name={company.name}
                                src={company.avatarUrl}
                            />
                            <Text style={{ whiteSpace: 'nowrap' }}>{company.name}</Text>
                        </Space>
                    )}
                />

                <Table.Column<DisplayedCompany>
                    dataIndex='dealsAggregate'
                    title='Open deals amount'
                    fixed='right'
                    render={(_, company: DisplayedCompany) => (
                        <Text key={company.id}>{currencyNumber(company?.dealsAggregate?.at(0)?.sum?.value || 0)}</Text>
                    )}
                />

                <Table.Column<DisplayedCompany>
                    dataIndex='id'
                    title='Actions'
                    fixed='right'
                    render={(value) => (
                        <Space
                            size={10}
                            key={value}>
                            <EditButton
                                hideText
                                size='middle'
                                recordItemId={value}
                            />
                            <DeleteButton
                                hideText
                                size='middle'
                                recordItemId={value}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    )
}
