import { SaveButton, useForm } from '@refinedev/antd'
import { HttpError } from '@refinedev/core'
import { GetFields, GetVariables } from '@refinedev/nestjs-query'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Card, Drawer, Form, Input, Spin } from 'antd'
import { UPDATE_USER_MUTATION } from '@/graphql/mutations'
import { UpdateUserMutation, UpdateUserMutationVariables } from '@/graphql/types'
import Avatar from './Avatar'
import { extractNameInitials } from '@/lib/utils/string'
import Text from '../common/Text'
import type { FC } from 'react'

type Props = {
    opened: boolean
    onCloseModal: () => void
    userId: string
}

const AccountSettings: FC<Props> = ({ opened, onCloseModal, userId }) => {
    const { saveButtonProps, formProps, queryResult } = useForm<
        GetFields<UpdateUserMutation>,
        HttpError,
        GetVariables<UpdateUserMutationVariables>
    >({
        mutationMode: 'optimistic',
        resource: 'users',
        action: 'edit',
        id: userId,
        meta: {
            gqlMutation: UPDATE_USER_MUTATION,
        },
    })

    const { avatarUrl = '', name = '' } = queryResult?.data?.data ?? {}

    if (queryResult?.isLoading) {
        return (
            <Drawer
                open={opened}
                width={756}
                styles={{
                    body: {
                        background: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                }}>
                <Spin />
            </Drawer>
        )
    }

    return (
        <Drawer
            onClose={onCloseModal}
            open={opened}
            width={756}
            styles={{
                body: { background: '#f5f5f5', padding: 0 },
                header: { display: 'none' },
            }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: '#fff',
                }}>
                <Text strong>Account Settings</Text>
                <Button
                    type='text'
                    icon={<CloseOutlined />}
                    onClick={() => onCloseModal()}
                />
            </div>
            <div
                style={{
                    padding: '16px',
                }}>
                <Card>
                    <Form
                        {...formProps}
                        layout='vertical'>
                        <Avatar
                            shape='square'
                            src={avatarUrl}
                            name={extractNameInitials(name || '')}
                            style={{
                                width: 96,
                                height: 96,
                                marginBottom: '24px',
                            }}
                        />
                        <Form.Item
                            label='Name'
                            name='name'>
                            <Input placeholder='Name' />
                        </Form.Item>
                        <Form.Item
                            label='Email'
                            name='email'>
                            <Input placeholder='email' />
                        </Form.Item>
                        <Form.Item
                            label='Job title'
                            name='jobTitle'>
                            <Input placeholder='jobTitle' />
                        </Form.Item>
                        <Form.Item
                            label='Phone'
                            name='phone'>
                            <Input placeholder='Timezone' />
                        </Form.Item>
                    </Form>
                    <SaveButton
                        {...saveButtonProps}
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                        }}
                    />
                </Card>
            </div>
        </Drawer>
    )
}

export default AccountSettings
