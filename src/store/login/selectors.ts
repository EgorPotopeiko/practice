import { createSelector } from 'reselect';
import { TApplicationState } from '../applicationState';

const stateAuth = (state: TApplicationState) => state.login;

export const selectEmail = createSelector(stateAuth, (state) => state.email);
export const selectPassword = createSelector(stateAuth, (state) => state.password);
export const selectError = createSelector(stateAuth, (state) => state.error);
export const selectStatus = createSelector(stateAuth, (state) => ({
    isLoading: state.isLoading,
    error: state.error
}));
export const selectUser = createSelector(stateAuth, (state) => state.user);

export const selectCredentials = createSelector(
    selectEmail,
    selectPassword,
    (email, password) => ({ email, password })
);