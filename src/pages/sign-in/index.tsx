import type { FC } from 'react'
import { AuthPage } from '@refinedev/antd'
import { authCredentials } from '@/lib/providers'
import AccountLink from '@/components/layout/AccountLink'

export const SignInPage: FC = () => {
    return (
        <AuthPage
            type='login'
            formProps={{
                initialValues: authCredentials,
            }}
            registerLink={<AccountLink type='sign-up' />}
        />
    )
}
