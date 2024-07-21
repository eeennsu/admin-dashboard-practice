import type { FC } from 'react'
import { List, Skeleton } from 'antd'

const LatestActivitiesSkeleton: FC = () => {
    return (
        <List.Item>
            <List.Item.Meta
                avatar={
                    <Skeleton.Avatar
                        active
                        size={48}
                        shape='square'
                        style={{
                            borderRadius: '8px',
                        }}
                    />
                }
                title={
                    <Skeleton.Button
                        active
                        style={{
                            height: '16px',
                        }}
                    />
                }
                description={
                    <Skeleton.Button
                        active
                        style={{
                            width: '300px',
                            height: '16px',
                        }}
                    />
                }
            />
        </List.Item>
    )
}

export default LatestActivitiesSkeleton
