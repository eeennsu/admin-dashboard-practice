import Avatar from '@/components/common/Avatar'
import Text from '@/components/common/Text'
import type { FC } from 'react'

interface Props {
    name: string
    avatarUrl?: string
    shape?: 'circle' | 'square'
}

const SelectOptionWithAvatar: FC<Props> = ({ shape = 'circle', name, avatarUrl }) => {
    return (
        <div className='flex items-center gap-2'>
            <Avatar
                shape={shape}
                name={name}
                src={avatarUrl}
            />
            <Text>{name}</Text>
        </div>
    )
}

export default SelectOptionWithAvatar
