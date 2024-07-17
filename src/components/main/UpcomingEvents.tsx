import { CalendarOutlined } from '@ant-design/icons'
import { Card, List } from 'antd'
import { useState, type FC } from 'react'
import Text from '@/components/common/Text'

const UpcomingEvents: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loadingDataSource = new Array(5).map((_, i) => ({ id: i }))

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
                    dataSource={loadingDataSource}></List>
            ) : (
                <List></List>
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
