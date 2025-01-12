import { GraphQLFormattedError } from 'graphql'
import { CustomError, Fetch } from './types'
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '../providers'

export const customFetch: Fetch = async (url, options) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

    const headers = (options?.headers as Record<string, string>) || {}

    return await fetch(url, {
        ...options,
        headers: {
            ...headers,
            Authorization: headers?.Authorization || `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Apollo-Require-Preflight': 'true',
        },
    })
}

const getGraphQLErrors = (body: Record<'errors', GraphQLFormattedError[] | undefined>): CustomError | null => {
    if (!body) {
        return {
            message: 'Unknown error',
            statusCode: 'INTERNAL_SERVER_ERROR',
        }
    }

    if ('errors' in body) {
        const errors = body?.errors
        const message = errors?.map((error) => error.message)?.join('.')
        const code = errors?.at(0)?.extensions?.code as string | number

        return {
            message: message || JSON.stringify(errors),
            statusCode: code || 500,
        }
    }

    return null
}

export const fetchWrapper: Fetch = async (url, options) => {
    const response = await customFetch(url, options)

    const responseClone = response.clone()
    const body = await responseClone.json()

    const error = getGraphQLErrors(body)

    if (error) {
        throw error
    }

    return response
}
