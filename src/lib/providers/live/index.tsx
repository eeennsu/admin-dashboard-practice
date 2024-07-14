import { createClient } from 'graphql-ws'
import { liveProvider as graphqlLiveProvider } from '@refinedev/nestjs-query'

export const WS_URL = 'wss://api.crm.refine.dev/graphql'

export const wsClient =
    typeof window !== 'undefined'
        ? createClient({
              url: WS_URL,
              connectionParams: () => {
                  const accessToken = localStorage.getItem('accessToken')

                  return {
                      headers: {
                          Authorization: `Bearer ${accessToken}`,
                      },
                  }
              },
          })
        : undefined

export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined
