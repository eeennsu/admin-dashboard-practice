import { Button, Card, Skeleton, Space } from 'antd'
import type { FC, PropsWithChildren } from 'react'
import KanbanBoardContainer from '../task/kanban/KanbanBoardContainer'
import { MoreOutlined, PlusOutlined } from '@ant-design/icons'

type Props = {
    columnCount?: number
    itemCount?: number
}

const KanbanSkeleton: FC<Props> = ({ columnCount = 6, itemCount = 4 }) => {
    return (
        <KanbanBoardContainer>
            {Array.from({ length: columnCount }).map((_, index) => (
                <ColumnSkeleton key={index}>
                    {Array.from({ length: itemCount }).map((_, index) => (
                        <BoardCardSkeleton key={index} />
                    ))}
                </ColumnSkeleton>
            ))}
        </KanbanBoardContainer>
    )
}

export default KanbanSkeleton

const ColumnSkeleton: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 16px',
            }}>
            <div
                style={{
                    padding: '12px',
                }}>
                <Space
                    style={{
                        width: '100%',
                        justifyContent: 'space-between',
                    }}>
                    <Skeleton.Button
                        size='small'
                        style={{ width: '125px' }}
                    />
                    <Button
                        disabled
                        type='text'
                        shape='circle'
                        icon={
                            <MoreOutlined
                                style={{
                                    transform: 'rotate(90deg)',
                                }}
                            />
                        }
                    />
                    <Button
                        disabled
                        shape='circle'
                        icon={<PlusOutlined />}
                    />
                </Space>
            </div>
            <div
                style={{
                    flex: 1,
                    border: '2px dashed transparent',
                    borderRadius: '4px',
                }}>
                <div
                    style={{
                        marginTop: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

const BoardCardSkeleton: FC = () => {
    return (
        <Card
            size='small'
            styles={{
                body: {
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                },
            }}
            title={
                <Skeleton.Button
                    active
                    size='small'
                    style={{
                        width: '200px',
                        height: '22px',
                    }}
                />
            }>
            <Skeleton.Button
                active
                size='small'
                style={{
                    width: '200px',
                }}
            />
            <Skeleton.Avatar
                active
                size='small'
            />
        </Card>
    )
}
