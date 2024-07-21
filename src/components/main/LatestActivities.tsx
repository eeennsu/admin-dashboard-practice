import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY } from '@/graphql/queries'
import { UnorderedListOutlined } from '@ant-design/icons'
import { HttpError, useList } from '@refinedev/core'
import { Card, Flex, List, Space } from 'antd'
import type { FC } from 'react'
import Text from '../common/Text'
import { getEmptyArray } from '@/lib/utils'
import LatestActivitiesSkeleton from '../skeletons/LatestActivitiesSkeleton'
import dayjs from 'dayjs'
import Avatar from '../common/Avatar'
import { DashboardLatestActivitiesAuditsQuery } from '@/graphql/types'
import { GetFieldsFromList } from '@refinedev/nestjs-query'

interface Props {
    pageSize?: number
}

const LatestActivities: FC<Props> = ({ pageSize = 10 }) => {
    const {
        data: auditData,
        isLoading: isLoadingAudit,
        isError: isAuditError,
    } = useList<GetFieldsFromList<DashboardLatestActivitiesAuditsQuery>>({
        resource: 'audits',
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
        },
        pagination: {
            pageSize,
        },
        sorters: [
            {
                field: 'createdAt',
                order: 'desc',
            },
        ],
    })

    const dealIds = auditData?.data?.map((audit) => audit?.targetId)

    const {
        data: dealsData,
        isLoading: isLoadingDeals,
        isError: isDealsError,
    } = useList({
        resource: 'deals',
        queryOptions: { enabled: !!dealIds?.length },
        pagination: {
            mode: 'off',
        },
        filters: [{ field: 'id', operator: 'in', value: dealIds }],
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
        },
    })

    if (isAuditError || isDealsError) return null

    return (
        <Card
            styles={{
                header: {
                    padding: 16,
                },
                body: {
                    paddingBlock: 0,
                    paddingInline: 16,
                },
            }}
            title={
                <Flex
                    align='center'
                    gap={8}>
                    <UnorderedListOutlined />
                    <Text
                        size='sm'
                        style={{ marginLeft: 8 }}>
                        Latest Activities
                    </Text>
                </Flex>
            }>
            {isLoadingAudit || isLoadingDeals ? (
                <List
                    dataSource={getEmptyArray(5)}
                    renderItem={() => <LatestActivitiesSkeleton />}
                />
            ) : (
                <List
                    itemLayout='horizontal'
                    dataSource={auditData?.data}
                    renderItem={(item) => {
                        const deal = dealsData.data.find((deal) => deal.id === String(item.targetId)) || undefined

                        if (!deal) return null

                        return (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    title={dayjs(deal.createdAt).format('DD MMM YYYY - hh:mm A')}
                                    avatar={
                                        <Avatar
                                            shape='square'
                                            size={48}
                                            src={deal?.company.avatarUrl}
                                            name={deal?.company.name}
                                        />
                                    }
                                    description={
                                        <Space size={4}>
                                            {item.user?.name && <Text strong>{item.user?.name}</Text>}
                                            <Text>
                                                {item.action === 'CREATE'
                                                    ? 'created'
                                                    : item.action === 'UPDATE'
                                                    ? 'updated'
                                                    : item.action === 'DELETE'
                                                    ? 'deleted'
                                                    : ''}
                                            </Text>
                                            <Text strong></Text>
                                        </Space>
                                    }
                                />
                            </List.Item>
                        )
                    }}
                />
            )}
        </Card>
    )
}

export default LatestActivities
