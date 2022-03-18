import { PaginationActionTypes } from "./action-types"

export const GetPage = (page: any, pageSize: any) => ({
    type: PaginationActionTypes.SET_PAGE,
    page,
    pageSize
})
