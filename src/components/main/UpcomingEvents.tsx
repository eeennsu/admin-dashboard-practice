import { CalendarOutlined } from '@ant-design/icons'
import { Badge, Card, List } from 'antd'
import { useState, type FC } from 'react'
import Text from '@/components/common/Text'
import UpcomingSkeleton from '../Skeleton/UpcomingSkeleton'
import { useList } from '@refinedev/core'
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries'

const UpcomingEvents: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { data, isLoading: isEventsLoading } = useList({
        resource: 'events',
        meta: {
            gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY,
        },
    })

    return (
        <Card
            title={<CardTitle />}
            style={{ height: '100%' }}
            styles={{
                header: {
                    padding: '8px 16px',
                },
                body: {
                    padding: '0 1rem',
                },
            }}>
            {isLoading ? (
                <List
                    itemLayout='horizontal'
                    dataSource={Array.from({ length: 5 }).map((_, i) => ({
                        id: i,
                    }))}
                    renderItem={() => <UpcomingSkeleton />}></List>
            ) : (
                <List
                    itemLayout='horizontal'
                    dataSource={[]}
                    renderItem={(item) => {
                        // const renderDate = getDate(item.startDate, item.startDate)

                        return (
                            <List.Item>
                                {/* <List.Item.Meta
                                    avatar={<Badge color={item.color} />}
                                    title={
                                        <Text
                                            strong
                                            ellipsis={{ tooltip: true }}>
                                            {item.title}
                                        </Text>
                                    }
                                    description='Event Description'
                                /> */}
                            </List.Item>
                        )
                    }}
                />
            )}
        </Card>
    )
}

export default UpcomingEvents

const CardTitle: FC = () => {
    return (
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
                Upcoming Events
            </Text>
        </div>
    )
}
