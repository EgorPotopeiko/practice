import { notification } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectError, selectSuccess } from '../../store/login/selectors';
import NotificationError from './notification_error/notification_error';
import NotificationSuccess from './notification_success/notification_success';

const Notifications: React.FC = () => {
    notification.config({
        duration: 3
    });
    const error = useSelector(selectError);
    const isSuccess = useSelector(selectSuccess);
    const reStatus = /code (\d+)/;
    const reType = /auth\/(\w+)/;
    if (error === null && isSuccess === '') return null
    else if (error === null && isSuccess !== '') {
        switch (isSuccess) {
            case 'Success_auth':
                return (
                    <NotificationSuccess message='Успешная авторизация' description='Вы вошли в систему' />
                )
            case 'Success_registration':
                return (
                    <NotificationSuccess message='Успешная регистрация' description='Пользователь успешно зарегистрирован' />
                )
            case 'Success_admin_registration':
                return (
                    <NotificationSuccess message='Успешная регистрация администратора' description='Администратор зарегистрирован' />
                )
            case 'Success_order':
                return (
                    <NotificationSuccess message='Успешное создание заказа' description='Ваш заказ создан' />
                )
            default:
                return null
        }
    }
    else {
        const errorString: any = JSON.stringify(error);
        let errorStatus = errorString.match(reStatus)[1];
        let errorType = errorString.match(reType)[1];
        switch (errorType) {
            case 'login':
                switch (+errorStatus) {
                    case 400:
                        return (
                            <NotificationError message='Ошибка авторизации' description='Неверное имя пользователя или пароль' />
                        )
                    case 404:
                        return (
                            <NotificationError message='Ошибка авторизации' description='Пользователь с такими данными не найден' />
                        )
                    default:
                        return (
                            null
                        )
                }
            case 'registration':
                switch (+errorStatus) {
                    case 400:
                        return (
                            <NotificationError message='Ошибка регистрации' description='Пользователь уже существует' />
                        )
                    default:
                        return (
                            null
                        )
                }
            default:
                return (
                    null
                )
        }
    }
}
export default Notifications
