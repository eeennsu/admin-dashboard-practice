import type { CSSProperties, FC } from 'react'
import { Avatar as AntdAvatar } from 'antd'

interface Props {
    name?: string
    style?: CSSProperties
}

const Avatar: FC<Props> = ({ name, style }) => {
    return (
        <AntdAvatar
            alt={name}
            size='small'
            style={{
                backgroundColor: '#87d068',
                display: 'flex',
                alignItems: 'center',
                border: 'none',
                ...style,
            }}>
            {name}
        </AntdAvatar>
    )
}

export default Avatar
