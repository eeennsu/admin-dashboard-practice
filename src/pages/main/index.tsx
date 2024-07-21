import DashboardTotalCard from '@/components/main/DashboardTotalCard'
import DealsChart from '@/components/main/DealsChart'
import Events from '@/components/main/Events'
import { DASHBOARD_TOTAL_COUNTS_QUERY } from '@/graphql/queries'
import { DashboardTotalCountsQuery } from '@/graphql/types'
import { useCustom } from '@refinedev/core'
import { Col, Flex, Row } from 'antd'
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
        <Flex
            wrap
            vertical
            gap='large'>
            <Row gutter={[30, 30]}>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}>
                    <DashboardTotalCard
                        resource='companies'
                        isLoading={isLoading}
                        total={data?.data.companies.totalCount}
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
                    <DashboardTotalCard
                        resource='contracts'
                        isLoading={isLoading}
                        total={data?.data.contacts.totalCount}
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
                    <DashboardTotalCard
                        resource='deals'
                        isLoading={isLoading}
                        total={data?.data.deals.totalCount}
                    />
                    {/* <DashboardTotalCount>Card
                        resource='companies'
                        isLoading={isLoading}
                        totalCount={data?.data.companies.totalCount}
                    /> */}
                </Col>
            </Row>
            <Row gutter={[30, 30]}>
                {/* <Col
                    xs={24}
                    sm={24}
                    xl={8}>
                    <Events
                        type='previous'
                        pageSize={5}
                    />
                    <DashboardTotalCountCard
                        resource='companies'
                        isLoading={isLoading}
                        totalCount={data?.data.companies.totalCount}
                    />
                </Col> */}
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
                    xl={16}>
                    {/* <DashboardTotalCountCard
                        resource='contacts'
                        isLoading={isLoading}
                        totalCount={data?.data.contacts.totalCount}
                    /> */}
                    <DealsChart />
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
                gutter={[30, 30]}
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
        </Flex>
    )
}
