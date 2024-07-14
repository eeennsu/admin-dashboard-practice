import type { FC, PropsWithChildren } from 'react'
import { Breadcrumb, ThemedLayoutV2, ThemedTitleV2 } from '@refinedev/antd'
import Menu from './Menu'
import Header from './Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ThemedLayoutV2
            Header={Header}
            Title={(titleProps) => <ThemedTitleV2 {...titleProps} />}>
            {children}
        </ThemedLayoutV2>
    )
}

export default Layout
