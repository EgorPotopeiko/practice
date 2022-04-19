import { createSelector } from 'reselect';
import { TApplicationState } from '../applicationState';

const stateNotification = (state: TApplicationState) => state.notifications;

export const selectNotificationStatus = createSelector(stateNotification, (state) => ({
    view: state.view,
    message: state.message,
    description: state.description
}));