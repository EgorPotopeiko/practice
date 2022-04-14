import { notification } from 'antd';
import React from 'react';

type Props = {
    message: string,
    description: string,
}

const NotificationSuccess: React.FC<Props> = ({ message, description }) => {
    return (
        <>
            {
                notification.open({
                    message: `${message}`,
                    type: 'success',
                    description:
                        `${description}`,
                })
            }
        </>
    )
}
export default NotificationSuccess
