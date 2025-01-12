import type { FC } from 'react'
import { Badge, List, Skeleton } from 'antd'

const EventSkeleton: FC = () => {
    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Badge color='transparent' />}
                title={
                    <Skeleton.Button
                        active
                        style={{
                            height: '14px',
                        }}
                    />
                }
                description={
                    <Skeleton.Button
                        active
                        style={{
                            width: '300px',
                            marginTop: '8px',
                            height: '16px',
                        }}
                    />
                }
            />
        </List.Item>
    )
}

export default EventSkeleton
