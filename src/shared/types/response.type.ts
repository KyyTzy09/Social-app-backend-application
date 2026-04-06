export type ApiResponseType<T> = {
    message: string
    statusCode: number
    data: T
}

export type ApiResponseWithMetaType<T> = {
    message: string
    statusCode: number
    data: T
    meta: MetaType
}

type MetaType = {
    page: number
    limit: number
    maxPage: number
    total: number
}