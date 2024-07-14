import type { FC } from 'react'
import { Layout, Space } from 'antd'
import CurrentUser from './CurrentUser'

const Header: FC = () => {
    return (
        <Layout.Header
            style={{
                background: '#fff',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '0 24px',
                position: 'sticky',
                top: 0,
                zIndex: 999,
            }}>
            <Space
                align='center'
                size='middle'>
                <CurrentUser />
            </Space>
        </Layout.Header>
    )
}

export default Header
