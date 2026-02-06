export type ApiResponseType<T> = {
    message: string
    statusCode: number
    data: T
}