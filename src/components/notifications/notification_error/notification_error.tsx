import { notification } from 'antd';
import React from 'react';

type Props = {
    message: string,
    description: string,
}

const NotificationError: React.FC<Props> = ({ message, description }) => {
    return (
        <>
            {
                notification.open({
                    message: `${message}`,
                    type: 'error',
                    description:
                        `${description}`,
                })
            }
        </>
    )
}
export default NotificationError
