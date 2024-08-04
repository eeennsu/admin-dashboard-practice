import Avatar from '@/components/common/Avatar'
import SelectOptionWithAvatar from '@/components/company/create/SelectOptionWithAvatar'
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutations'
import { USERS_SELECT_QUERY } from '@/graphql/queries'
import { UpdateCompanyMutation, UsersSelectQuery } from '@/graphql/types'
import { COMPANY_SIZE_OPTIONS, COMPANY_INDUSTRY_OPTIONS, COMPANY_BUSINESS_TYPE_OPTIONS } from '@/lib/constants'
import { selectGenerator } from '@/lib/utils';
import { Edit, useForm, useSelect } from '@refinedev/antd'
import { HttpError } from '@refinedev/core'
import { GetFields, GetFieldsFromList } from '@refinedev/nestjs-query'
import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import type { FC } from 'react'

export const CompanyEditPage: FC = () => {
    const {
        formProps,

        queryResult,
        saveButtonProps,
        formLoading,
    } = useForm<GetFields<UpdateCompanyMutation>, HttpError, GetFields<UpdateCompanyMutation>>({
        redirect: false,
        resource: 'companies',
        meta: {
            gqlMutation: UPDATE_COMPANY_MUTATION,
        },
    })

    const companyData = queryResult?.data?.data

    const {
        selectProps,
        queryResult: { data: usersData },
    } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: 'users',
        optionLabel: 'name',
        meta: {
            gqlQuery: USERS_SELECT_QUERY,
        },
    })

    return (
        <main>
            <Row gutter={[32, 32]}>
                <Col
                    xs={24}
                    xl={12}>
                    <Edit
                        isLoading={formLoading}
                        saveButtonProps={saveButtonProps}
                        breadcrumb={false}>
                        <Form
                            {...formProps}
                            layout='vertical'>
                            <Avatar
                                className='mb-6 size-24'
                                shape='square'
                                src={companyData?.avatarUrl}
                                name={companyData?.name}
                                alt={companyData?.name}
                            />

                            <Form.Item
                                label='Sales Owner'
                                name='salesOwnerId'
                                initialValue={formProps.initialValues?.salesOwner?.id}>
                                <Select
                                    {...selectProps}
                                    placeholder='Please select a sales owner'
                                    options={
                                        usersData?.data?.map<DefaultOptionType>((user) => ({
                                            value: user.id,
                                            label: (
                                                <SelectOptionWithAvatar
                                                    name={user.name}
                                                    avatarUrl={user?.avatarUrl || undefined}
                                                />
                                            ),
                                        })) || []
                                    }
                                />
                            </Form.Item>

                            <Form.Item
                                label='Company Size'
                                name='companySize'
                                initialValue={formProps?.initialValues?.companySize}>
                                <Select
                                    {...selectProps}
                                    placeholder='Please Select a company size'
                                    options={selectGenerator(COMPANY_SIZE_OPTIONS)}
                                />
                            </Form.Item>

                            <Form.Item
                                label='Total revenue'
                                name='totalRevenue'
                                initialValue={formProps?.initialValues?.totalRevenue}>
                                <InputNumber<number>
                                    className='w-1/3 tracking-wider'
                                    autoFocus
                                    min={0}
                                    placeholder='0,00'
                                    addonBefore='$'
                                />
                            </Form.Item>

                            <Form.Item
                                label='Industry'
                                name='industry'
                                initialValue={formProps?.initialValues?.industry}>
                                <Select options={selectGenerator(COMPANY_INDUSTRY_OPTIONS)} />
                            </Form.Item>

                            <Form.Item
                                label='Business Type'
                                name='businessType'
                                initialValue={formProps?.initialValues?.industry}>
                                <Select options={selectGenerator(COMPANY_BUSINESS_TYPE_OPTIONS)} />
                            </Form.Item>

                            <Form.Item
                                label='Country'
                                name='country'
                                initialValue={formProps?.initialValues?.country}>
                                <Input placeholder='Country' />
                            </Form.Item>

                            <Form.Item
                                label='Website'
                                name='website'
                                initialValue={formProps?.initialValues?.country}>
                                <Input placeholder='Website' />
                            </Form.Item>
                        </Form>
                    </Edit>
                </Col>
            </Row>
        </main>
    )
}
