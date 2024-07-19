import { createClient } from 'graphql-ws'
import { liveProvider as graphqlLiveProvider } from '@refinedev/nestjs-query'
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '../auth'

export const WS_URL = 'wss://api.crm.refine.dev/graphql'

export const wsClient =
    typeof window !== 'undefined'
        ? createClient({
              url: WS_URL,
              connectionParams: () => {
                  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

                  return {
                      headers: {
                          Authorization: `Bearer ${accessToken}`,
                      },
                  }
              },
          })
        : undefined

export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined
