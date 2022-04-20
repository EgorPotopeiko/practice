import React from 'react';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import { selectNotificationStatus } from '../../store/notifications/selectors';

const Notifications: React.FC = () => {
    const { view, message, description } = useSelector(selectNotificationStatus);
    notification.config({ duration: 3 });
    return (
        <>
            {
                notification[view]({
                    message: `${message}`,
                    description: `${description}`
                })
            }
        </>
    )
}

export default Notifications
