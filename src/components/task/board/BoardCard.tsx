import Text from '@/components/common/Text'
import { TasksQuery } from '@/graphql/types'
import { ClockCircleOutlined, DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { Button, Card, ConfigProvider, Dropdown, MenuProps, Space, Tag, theme, Tooltip } from 'antd'
import { useMemo, type FC } from 'react'
import TextIcon from './TextIcon'
import dayjs from 'dayjs'
import { cn, getDateColor } from '@/lib/utils'
import Avatar from '@/components/common/Avatar'

interface Props extends GetFieldsFromList<TasksQuery> {}

const BoardCard: FC<Props> = ({ title, completed, createdAt, id, updatedAt, users, description, dueDate, stageId }) => {
    const { token } = theme.useToken()

    const onEdit = () => {}

    const dropdownItems = useMemo<MenuProps['items']>(
        () => [
            {
                label: 'View Card',
                key: 1,
                icon: <EyeOutlined />,
                onClick: () => {
                    onEdit()
                },
            },
            {
                key: 2,
                label: 'Delete Card',
                icon: <DeleteOutlined />,
                onClick: () => {},
                danger: true,
            },
        ],
        []
    )

    const dueDateOptions = useMemo(() => {
        if (!dueDate) return null

        const date = dayjs(dueDate)

        return {
            color: getDateColor({ date: dueDate }),
            text: date.format('MMM DD'),
        }
    }, [dueDate])

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tag: {
                        colorText: token.colorTextSecondary,
                    },
                    Card: {
                        headerBg: 'transparent',
                    },
                },
            }}>
            <Card
                size='small'
                title={
                    <Text
                        ellipsis={{ tooltip: title }}
                        onClick={() => onEdit()}>
                        {title}
                    </Text>
                }
                extra={
                    <Dropdown
                        trigger={['click']}
                        menu={{
                            items: dropdownItems,
                        }}
                        placement='bottomLeft'
                        arrow={{ pointAtCenter: true }}>
                        <Button
                            type='text'
                            shape='circle'
                            icon={<MoreOutlined className='rotate-90' />}
                            onPointerDown={(e) => e.preventDefault()}
                        />
                    </Dropdown>
                }>
                <div className='flex flex-wrap items-center justify-between'>
                    <div className='flex gap-2'>
                        <TextIcon className='mr-1' />
                        {dueDateOptions && (
                            <Tag
                                icon={<ClockCircleOutlined className='text-xs' />}
                                color={dueDateOptions.color}
                                className={cn(
                                    'px-1.5 m-0',
                                    dueDateOptions.color === 'default' ? 'bg-transparent' : 'bg-inherit'
                                )}
                                bordered={dueDateOptions.color !== 'default'}>
                                <Text
                                    size='xs'
                                    color={dueDateOptions.color}>
                                    {dueDateOptions.text}
                                </Text>
                            </Tag>
                        )}
                    </div>
                    {!!users.length && (
                        <div className='flex flex-wrap gap-1.5 max-w-[114px]'>
                            {users.map((user) => (
                                <Tooltip>
                                    <Avatar
                                        name={user.name}
                                        src={user.avatarUrl}
                                        alt={user.name}
                                    />
                                </Tooltip>
                            ))}
                        </div>
                    )}
                </div>
            </Card>
        </ConfigProvider>
    )
}

export default BoardCard
