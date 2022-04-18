import { createSelector } from 'reselect';
import { TApplicationState } from '../applicationState';

const stateAuth = (state: TApplicationState) => state.login;

export const selectError = createSelector(stateAuth, (state) => state.error);
export const selectStatus = createSelector(stateAuth, (state) => ({
    isLoading: state.isLoading,
    error: state.error
}));
export const selectUser = createSelector(stateAuth, (state) => state.user);
export const selectAuth = createSelector(stateAuth, (state) => state.isAuth);
export const selectSuccess = createSelector(stateAuth, (state) => state.isSuccess);