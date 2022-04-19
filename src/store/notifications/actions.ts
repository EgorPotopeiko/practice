import { NotificationActionTypes } from './action-types';

export const GetNotificationOpenAction = (view: 'success' | 'info' | 'warning' | 'error', message: string, description: string) => ({
    type: NotificationActionTypes.NOTIFICATION_OPEN,
    view,
    message,
    description
})

