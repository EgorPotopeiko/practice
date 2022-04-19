import { IconType } from 'antd/lib/notification';
import { InferValueTypes } from '../../models/common';
import * as actions from './actions';
import { NotificationActionTypes } from './action-types';

const initialState: TNotificationState = {
    view: 'success',
    message: '',
    description: ''
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TNotificationState = {
    view: IconType,
    message: string,
    description: string
}

export default function notificationsReducer(state: TNotificationState = initialState, action: ActionTypes): TNotificationState {
    switch (action.type) {
        case NotificationActionTypes.NOTIFICATION_OPEN:
            return {
                ...state,
                view: action.view,
                message: action.message,
                description: action.description
            }
        default:
            return state
    }
}
