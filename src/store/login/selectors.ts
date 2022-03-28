import { RootStateOrAny } from 'react-redux';

export const selectEmail = (state: RootStateOrAny) => state.login.email;
export const selectPassword = (state: RootStateOrAny) => state.login.password;
export const selectError = (state: RootStateOrAny) => state.login.error;
export const selectUser = (state: RootStateOrAny) => state.login.user;