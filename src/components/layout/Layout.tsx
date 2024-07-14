import type { FC, PropsWithChildren } from 'react'
import { ThemedLayoutV2, ThemedTitleV2 } from '@refinedev/antd'
import Header from './Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ThemedLayoutV2
            Header={Header}
            Title={(titleProps) => (
                <ThemedTitleV2
                    {...titleProps}
                    text='Refine'
                />
            )}>
            {children}
        </ThemedLayoutV2>
    )
}

export default Layout
