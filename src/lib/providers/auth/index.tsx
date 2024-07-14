import type { AuthProvider } from '@refinedev/core'
import { API_URL, dataProvider } from '@/lib/providers'

export const authCredentials = {
    email: 'michael.scott@dundermifflin.com',
    password: 'demodemo',
}

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'accessToken'

export const authProvider: AuthProvider = {
    login: async ({ email }) => {
        try {
            const { data } = await dataProvider.custom({
                url: API_URL,
                method: 'post',
                meta: {
                    variables: { email },
                    rawQuery: `
                    mutation Login($email: String!) {
                        login(loginInput: { email: $email }) {
                            accessToken
                        }
                    }
                `,
                },
            })

            localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data?.login?.accessToken)

            return {
                success: true,
                redirectTo: '/',
            }
        } catch (err) {
            console.log('🚀  err:', err)

            const error = err as Error

            return {
                success: false,
                error: {
                    message: 'message' in error ? error.message : 'Login failed',
                    name: 'name' in error ? error.name : 'Invalid email or password',
                },
            }
        }
    },
    check: async () => {
        try {
            await dataProvider.custom({
                url: API_URL,
                method: 'post',
                meta: {
                    rawQuery: `
                        query Me {
                            me {
                                name
                            }
                        }
                    `,
                },
            })

            return {
                authenticated: true,
                redirectTo: '/',
            }
        } catch (error) {
            return {
                authenticated: false,
                redirectTo: '/login',
            }
        }
    },
    logout: async () => {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

        return {
            success: true,
            redirectTo: '/login',
        }
    },
    onError: async (error) => {
        if (error?.statusCode === 'UNAUTHENTICATED' || error?.status === 401 || error?.status === 403) {
            return {
                logout: true,
                redirectTo: '/login',
                ...error,
            }
        }

        return { error }
    },
    getIdentity: async () => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {}

        try {
            const { data } = await dataProvider.custom<{ me: any }>({
                url: API_URL,
                method: 'post',
                headers,
                meta: {
                    rawQuery: `
                      query Me {
                        me {
                          id
                          name
                          email
                          phone
                          jobTitle
                          timezone
                          avatarUrl
                        }
                      }
                    `,
                },
            })

            return data?.me
        } catch (error) {
            return undefined
        }
    },
}
