import { Skeleton } from 'antd'
import { FC } from 'react'

const AccordionHeaderSkeleton: FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderBottom: '1px solid #d9d9d9',
            }}>
            <Skeleton.Avatar
                size='small'
                shape='square'
            />
            <Skeleton.Input
                size='small'
                block
                style={{ height: '22px' }}
            />
        </div>
    )
}

export default AccordionHeaderSkeleton
