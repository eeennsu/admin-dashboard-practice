import { fetchWrapper } from '@/lib/fetch/fetch-wrapper'
import { CustomError } from '@/lib/fetch/types'
import graphqlDataProvider, { GraphQLClient } from '@refinedev/nestjs-query'

export const API_URL = 'https://api.crm.refine.dev'

const gqlClient = new GraphQLClient(API_URL, {
    fetch: (url, options) => {
        try {
            return fetchWrapper(url, options)
        } catch (error) {
            return Promise.reject(error as CustomError)
        }
    },
})

export const dataProvider = graphqlDataProvider(gqlClient)
