import DealsChart from '@/components/main/DealsChart'
import Events from '@/components/main/Events'
import { DASHBOARD_TOTAL_COUNTS_QUERY } from '@/graphql/queries'
import { DashboardTotalCountsQuery } from '@/graphql/types'
import { useCustom } from '@refinedev/core'
import { Col, Row } from 'antd'
import { FC } from 'react'

export const MainPage: FC = () => {
    const { data, isLoading } = useCustom<DashboardTotalCountsQuery>({
        url: '',
        method: 'get',
        meta: {
            gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY,
        },
    })

    return (
        <div>
            <Row gutter={[32, 32]}>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}>
                    <Events
                        type='previous'
                        pageSize={3}
                    />
                    {/* <DashboardTotalCountCard
                        resource='companies'
                        isLoading={isLoading}
                        totalCount={data?.data.companies.totalCount}
                    /> */}
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}>
                    <Events type='upcoming' />
                    {/* <DashboardTotalCountCard
                        resource='companies'
                        isLoading={isLoading}
                        totalCount={data?.data.companies.totalCount}
                    /> */}
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}>
                    {/* <DashboardTotalCountCard
                        resource='contacts'
                        isLoading={isLoading}
                        totalCount={data?.data.contacts.totalCount}
                    /> */}
                    <DealsChart />
                    Lorem ipsum dolor sit amet.
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}>
                    {/* <DashboardTotalCountCard
                        resource='deals'
                        isLoading={isLoading}
                        totalCount={data?.data.deals.totalCount}
                    /> */}
                    Lorem ipsum dolor sit amet.
                </Col>
            </Row>

            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: '32px',
                }}>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}
                    style={{
                        height: '460px',
                    }}>
                    {/* <Events /> */}
                    Lorem ipsum dolor sit amet.
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={16}
                    style={{
                        height: '460px',
                        background: '#000002',
                    }}>
                    {/* <DealsChart /> */}
                    Lorem ipsum dolor sit amet.
                </Col>
            </Row>

            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: '32px',
                }}>
                <Col xs={24}>
                    {/* <LatestActivities /> */}
                    Lorem ipsum dolor sit amet.
                </Col>
            </Row>
        </div>
    )
}
