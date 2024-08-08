import { Accordion } from '@/components/common/Accordion'
import { DescriptionForm } from '@/components/form/description'
import { DueDateForm } from '@/components/form/due-date'
import { DescriptionHeader, DueDateHeader, UsersHeader } from '@/components/form/header'
import { TitleForm } from '@/components/form/title'
import { UsersForm } from '@/components/form/users'
import { UPDATE_TASK_MUTATION } from '@/graphql/mutations'
import { Task } from '@/graphql/schema.types'
import { ROUTE_PATH } from '@/lib/route-path'
import { AlignLeftOutlined, FieldTimeOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { DeleteButton, useModalForm } from '@refinedev/antd'
import { useBack, useGo } from '@refinedev/core'
import { Modal } from 'antd'
import { useState, type FC } from 'react'

const TaskEditModalPage: FC = () => {
    const [activeKey, setActiveKey] = useState<string | undefined>()

    const go = useGo()
    const { modalProps, close, queryResult } = useModalForm<Task>({
        action: 'edit',
        defaultVisible: true,
        resource: 'tasks',
        meta: {
            gqlQuery: UPDATE_TASK_MUTATION,
        },
    })

    const isLoading = queryResult?.isLoading ?? true

    const { description, dueDate, users, title } = queryResult?.data?.data ?? {
        description: '',
        dueDate: '',
        users: [],
        title: '',
    }

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close()
                go({ to: ROUTE_PATH.tasks.list(), type: 'replace' })
            }}
            title={
                <TitleForm
                    initialValues={{ title }}
                    isLoading={isLoading}
                />
            }
            width={586}
            footer={
                <DeleteButton
                    type='link'
                    onSuccess={() => {
                        go({ to: ROUTE_PATH.tasks.list(), type: 'replace' })
                    }}>
                    Delete card
                </DeleteButton>
            }>
            <Accordion
                accordionKey='description'
                activeKey={activeKey}
                setActive={setActiveKey}
                fallback={<DescriptionHeader description={description} />}
                isLoading={isLoading}
                icon={<AlignLeftOutlined />}
                label='Description'>
                <DescriptionForm
                    initialValues={{ description }}
                    cancelForm={() => setActiveKey(undefined)}
                />
            </Accordion>

            <Accordion
                accordionKey='due-date'
                activeKey={activeKey}
                setActive={setActiveKey}
                fallback={<DueDateHeader dueData={dueDate} />}
                isLoading={isLoading}
                icon={<FieldTimeOutlined />}
                label='Due date'>
                <DueDateForm
                    initialValues={{ dueDate: dueDate ?? undefined }}
                    cancelForm={() => setActiveKey(undefined)}
                />
            </Accordion>

            <Accordion
                accordionKey='users'
                activeKey={activeKey}
                setActive={setActiveKey}
                fallback={<UsersHeader users={users} />}
                isLoading={isLoading}
                icon={<UsergroupAddOutlined />}
                label='Users'>
                <UsersForm
                    initialValues={{
                        userIds: users?.map((user) => ({
                            label: user.name,
                            value: user.id,
                        })),
                    }}
                    cancelForm={() => setActiveKey(undefined)}
                />
            </Accordion>
        </Modal>
    )
}

export default TaskEditModalPage
