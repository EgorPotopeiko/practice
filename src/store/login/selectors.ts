import { createSelector } from 'reselect';
import { TApplicationState } from '../applicationState';

const stateAuth = (state: TApplicationState) => state.login;

export const selectStateStatus = createSelector(stateAuth, (state) => ({
    isLoading: state.isLoading,
    error: state.error
}));
export const selectUserStatus = createSelector(stateAuth, (state) => ({
    user: state.user,
    isAuth: state.isAuth
}))

export const selectSuccess = createSelector(stateAuth, (state) => state.isSuccess);