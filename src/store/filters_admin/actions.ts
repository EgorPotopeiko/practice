import { FiltersAdminActionTypes } from './action-types';

export const GetFiltersAdmin = (searchArticle: string, searchStatus: boolean, chooseStatus: string, searchUser: string, searchNumber: string) => ({
    type: FiltersAdminActionTypes.SET_FILTERS_ADMIN,
    searchArticle,
    searchStatus,
    chooseStatus,
    searchUser,
    searchNumber
})

export const RemoveAllFiltersAdmin = () => ({
    type: FiltersAdminActionTypes.REMOVE_ALL_FILTERS_ADMIN
})