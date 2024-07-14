import { DashboardOutlined, ProjectOutlined, ShopOutlined } from '@ant-design/icons'
import { ResourceProps } from '@refinedev/core'
import { ROUTE_PATH } from '../route-path'

/*
    rules: Resource in refine 

    list: read datas
    show: read a data
    create: create a data
    edit: update a data
    delete: delete a data
*/

export const resources: ResourceProps[] = [
    {
        name: 'dashboard',
        list: ROUTE_PATH.main(),
        meta: {
            label: 'Dashboard',
            icon: <DashboardOutlined />,
        },
    },
    {
        name: 'companies',
        list: ROUTE_PATH.companies.list(),
        show: ROUTE_PATH.companies.show(),
        create: ROUTE_PATH.companies.create(),
        edit: ROUTE_PATH.companies.edit(),
        meta: {
            label: 'Companies',
            icon: <ShopOutlined />,
        },
    },
    {
        name: 'Tasks',
        list: ROUTE_PATH.tasks.list(),
        show: ROUTE_PATH.tasks.show(),
        create: ROUTE_PATH.tasks.create(),
        edit: ROUTE_PATH.tasks.edit(),
        meta: {
            label: 'Tasks',
            icon: <ProjectOutlined />,
        },
    },
]
