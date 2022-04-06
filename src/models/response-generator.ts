export interface ResponseGenerator {
    [x: string]: any,
    config?: any,
    data?: any,
    content?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}