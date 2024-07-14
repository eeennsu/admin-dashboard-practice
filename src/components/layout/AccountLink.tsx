import type { FC } from 'react'
import { ROUTE_PATH } from '@/lib/route-path'
import { Link } from 'react-router-dom'

interface Props {
    type: 'sign-in' | 'sign-up'
}

const AccountLink: FC<Props> = ({ type }) => {
    const href = type === 'sign-in' ? ROUTE_PATH.signIn() : ROUTE_PATH.signUp()
    const linkText = type === 'sign-in' ? 'Login' : 'Sign Up'

    return (
        <p>
            <span>Go to &nbsp;</span>
            <Link to={href}>{linkText}</Link>
        </p>
    )
}

export default AccountLink
