export type CustomError = {
    statusCode?: string | number
} & Partial<Error>

export type Fetch = (url: RequestInfo | URL, options?: RequestInit) => Promise<Response>
