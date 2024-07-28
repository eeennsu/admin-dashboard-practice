import type { FC } from 'react'
import { CompanyListPage } from '../list'
import { Form, Input, Modal, Select } from 'antd'
import { useModalForm, useSelect } from '@refinedev/antd'
import { useGo } from '@refinedev/core'
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations'
import { USERS_SELECT_QUERY } from '@/graphql/queries'
import { DefaultOptionType } from 'antd/es/select'
import { UsersSelectQuery } from '@/graphql/types'
import SelectOptionWithAvatar from '@/components/company/create/SelectOptionWithAvatar'
import { GetFieldsFromList } from '@refinedev/nestjs-query'

const CompanyCreatePage: FC = () => {
    const go = useGo()

    const goToListPage = () => {
        go({
            to: {
                resource: 'companies',
                action: 'list',
            },
            options: {
                keepQuery: true,
            },
            type: 'replace',
        })
    }

    const { formProps, modalProps } = useModalForm({
        action: 'create',
        defaultVisible: true,
        resource: 'companies',
        redirect: false,
        mutationMode: 'pessimistic',
        onMutationSuccess: goToListPage,
        meta: {
            gqlMutation: CREATE_COMPANY_MUTATION,
        },
    })

    const {
        queryResult: { data: selectData },
        selectProps,
    } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: 'users',
        optionLabel: 'name',
        meta: {
            gqlQuery: USERS_SELECT_QUERY,
        },
    })

    return (
        <CompanyListPage>
            <Modal
                {...modalProps}
                mask={true}
                onCancel={goToListPage}
                title='Create Company'
                width={512}>
                <Form
                    {...formProps}
                    layout='vertical'>
                    <Form.Item
                        label='Company name'
                        name='name'
                        rules={[{ required: true }]}>
                        <Input placeholder='Please enter a company name' />
                    </Form.Item>
                    <Form.Item
                        label='Sales owner'
                        name='salesOwnerId'
                        rules={[{ required: true }]}>
                        <Select
                            {...selectProps}
                            options={selectData?.data.map<DefaultOptionType>((user) => ({
                                value: user.id,
                                label: (
                                    <SelectOptionWithAvatar
                                        name={user.name}
                                        avatarUrl={user?.avatarUrl || undefined}
                                    />
                                ),
                            }))}
                            placeholder='Please select a sales owner'
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </CompanyListPage>
    )
}

export default CompanyCreatePage

/*
    mutationMode - 데이터의 mutation 작업이 클라이언트와 서버에서 어떻게 처리되는지 제어
        pessimistic - 서버에서 변경작업이 완료될 때까지 클라이언트 ui가 기다림
        optimistic - 서버에서 변경 작업이 완료되기 전에 클라이언트 UI를 먼저 업데이트
        undoable -  변경 작업을 일단 클라이언트 UI에 적용하지만, 일정 시간 동안 변경을 취소할 수 있는 옵션을 제공. 일정 시간(예: 5초) 내에 작업을 취소하지 않으면 서버에 최종적으로 요청이 전송
*/
