import { NotificationProvider } from '@refinedev/core'

export const notificationProvider: NotificationProvider = {
    open: ({ message, description, type }) => {
        alert(` ${type} // ${message} // ${description}`)
    },
    close: () => {
        console.log('close')
    },
}
