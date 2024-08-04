import type { FC } from 'react'
import { Avatar as AntdAvatar, type AvatarProps } from 'antd'
import { extractNameInitials } from '@/lib/utils'

interface Props extends AvatarProps {
    name?: string
}

const Avatar: FC<Props> = ({ name, style, ...props }) => {
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
            }}
            {...props}>
            {extractNameInitials(name)}
        </AntdAvatar>
    )
}

export default Avatar
