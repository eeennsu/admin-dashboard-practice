import type { FC } from 'react'
import { AuthPage } from '@refinedev/antd'
import AccountLink from '@/components/layout/AccountLink'

export const SignUpPage: FC = () => {
    return (
        <AuthPage
            type='register'
            loginLink={<AccountLink type='sign-in' />}
        />
    )
}
