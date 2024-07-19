import { NotificationProvider } from '@refinedev/core'

export const notificationProvider: NotificationProvider = {
    open: ({ message, description, type }) => {
        alert(` ${type} // ${message} // ${description}`)
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    close: () => {},
}
