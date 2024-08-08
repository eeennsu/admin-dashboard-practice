import { CREATE_TASK_MUTATION } from '@/graphql/mutations'
import { Task } from '@/graphql/schema.types';
import { useModalForm } from '@refinedev/antd'
import { useBack } from '@refinedev/core'
import { Form, Input, Modal } from 'antd'
import type { FC } from 'react'
import { useSearchParams } from 'react-router-dom'

const TaskCreateModalPage: FC = () => {
    const [searchParams] = useSearchParams()
    const back = useBack()
    const { modalProps, formProps, close } = useModalForm<Task>({
        action: 'create',
        resource: 'tasks',
        defaultVisible: true,
        meta: {
            gqlMutation: CREATE_TASK_MUTATION,
        },
    })

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close()
                back()
            }}
            title='Add new task'
            width={512}>
            <Form
                {...formProps}
                layout='vertical'
                onFinish={(values) => {
                    formProps.onFinish?.({
                        ...values,
                        stageId: searchParams.get('stageId') ? Number(searchParams.get('stageId')) : null,
                        userIds: [],
                    })
                }}>
                <Form.Item
                    label='Title'
                    required
                    name='title'>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default TaskCreateModalPage
