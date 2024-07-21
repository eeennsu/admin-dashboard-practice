import { CalendarOutlined } from '@ant-design/icons'
import { Badge, Card, List } from 'antd'
import { type FC } from 'react'
import Text from '@/components/common/Text'
import EventSkeleton from '@/components/skeletons/EventSkeleton'
import { HttpError, useList } from '@refinedev/core'
import { DASHBORAD_CALENDAR_EVENTS_QUERY } from '@/graphql/queries'
import { getEmptyArray } from '@/lib/utils'
import { getSchedule } from '../../lib/utils/date'
import dayjs from 'dayjs'
import { DashboardCalendarEventsQuery } from '@/graphql/types'

type DisplayedEvent = DashboardCalendarEventsQuery['events']['nodes'][number]

type Props = {
    type: 'previous' | 'upcoming'
    pageSize?: number
}

const Events: FC<Props> = ({ type, pageSize = 5 }) => {
    const { data, isLoading } = useList<DisplayedEvent, HttpError>({
        resource: 'events',
        meta: {
            gqlQuery: DASHBORAD_CALENDAR_EVENTS_QUERY,
        },
        pagination: {
            pageSize,
        },
        sorters: [
            {
                field: 'startDate',
                order: 'asc',
            },
        ],
        filters: [
            {
                field: 'startDate',
                operator: type === 'upcoming' ? 'gte' : 'lte',
                value: dayjs().format('YYYY-MM-DD'),
            },
        ],
    })

    return (
        <Card
            title={
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                    <CalendarOutlined />
                    <Text
                        size='sm'
                        style={{ marginLeft: '0.7rem' }}>
                        {type === 'previous' ? 'Previous' : ' Upcoming'} Events
                    </Text>
                </div>
            }
            style={{ height: '100%' }}
            styles={{
                header: {
                    padding: '8px 16px',
                },
                body: {
                    height: '87%',
                    padding: '0 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                },
            }}>
            {isLoading ? (
                <List
                    itemLayout='horizontal'
                    dataSource={getEmptyArray()}
                    renderItem={() => <EventSkeleton />}
                />
            ) : (
                <List
                    itemLayout='horizontal'
                    dataSource={data?.data || []}
                    renderItem={(item) => {
                        return (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={<Badge color={item.color} />}
                                    title={<Text size='xs'>{getSchedule(item.startDate, item.endDate)}</Text>}
                                    description={
                                        <Text
                                            strong
                                            ellipsis={{ tooltip: true }}>
                                            {item.title}
                                        </Text>
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

export default Events
