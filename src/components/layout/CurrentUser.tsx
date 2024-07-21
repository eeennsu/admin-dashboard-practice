import type { User } from '@/graphql/schema.types'
import { useState, type FC } from 'react'
import { Popover, Button } from 'antd'
import { useGetIdentity } from '@refinedev/core'
import Avatar from '../common/Avatar'
import Text from '@/components/common/Text'
import { SettingOutlined } from '@ant-design/icons'
import AccountSettings from './AccountSettings'

const CurrentUser: FC = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
    const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState<boolean>(false)
    const { data: user } = useGetIdentity<User>()

    const onAccountSettingsOpen = () => {
        setIsPopoverOpen(false)
        setIsAccountSettingsOpen(true)
    }

    const onAccountSettingsClose = () => {
        setIsAccountSettingsOpen(false)
    }

    const content = (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Text
                strong
                style={{ padding: '12px 20px' }}>
                {user?.name}
            </Text>
            <div
                style={{
                    borderTop: '1px solid #d9d9d9',
                    padding: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                }}>
                <Button
                    style={{ textAlign: 'left' }}
                    icon={<SettingOutlined />}
                    type='text'
                    block
                    onClick={onAccountSettingsOpen}>
                    Account Settings
                </Button>
            </div>
        </div>
    )

    return (
        <>
            <Popover
                open={isPopoverOpen}
                onOpenChange={(open) => setIsPopoverOpen(open)}
                trigger='click'
                placement='bottomRight'
                overlayInnerStyle={{ padding: 0 }}
                overlayStyle={{ zIndex: 9999 }}
                content={content}>
                <Avatar
                    name={user?.name}
                    style={{ cursor: 'pointer', width: 32, height: 32, fontSize: 18 }}
                    size='default'
                />
            </Popover>
            {user && (
                <AccountSettings
                    userId={user.id}
                    opened={isAccountSettingsOpen}
                    onCloseModal={onAccountSettingsClose}
                />
            )}
        </>
    )
}

export default CurrentUser
