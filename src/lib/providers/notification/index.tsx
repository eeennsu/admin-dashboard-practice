import { NotificationProvider } from '@refinedev/core'
import { toast } from 'react-toastify'

export const notificationProvider: NotificationProvider = {
    open: ({ message, key, type }) => {
        const _type = type === 'success' ? 'success' : type === 'error' ? 'error' : 'default'

        if (!!key && toast.isActive(key.toString())) {
            toast.update(key, {
                render: message,
                type: _type,
            })
        } else {
            toast(message, {
                toastId: key,
                type: _type,
            })
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    close: (key) => {
        toast.dismiss(key)
    },
}
