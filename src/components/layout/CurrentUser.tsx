import { useState, type FC } from 'react'
import { Popover, Button } from 'antd'
import { useGetIdentity } from '@refinedev/core'
import Avatar from './Avatar'

const CurrentUser: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { data: user } = useGetIdentity()

    return (
        <Popover
            trigger='click'
            placement='bottomRight'
            overlayInnerStyle={{ padding: 0 }}
            overlayStyle={{ zIndex: 9999 }}>
            <Avatar name={'asd'} />
        </Popover>
    )
}

export default CurrentUser
