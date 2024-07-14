import type { FC } from 'react'
import { useLogout, useMenu } from '@refinedev/core'
import { NavLink } from 'react-router-dom'

const Menu: FC = () => {
    const { mutate: logout } = useLogout()
    const { menuItems } = useMenu()

    return (
        <nav className='menu'>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.key}>
                        <NavLink to={item.route ?? '/'}>{item.label}</NavLink>
                    </li>
                ))}
            </ul>
            <button onClick={() => logout()}>Logout</button>
        </nav>
    )
}

export default Menu
