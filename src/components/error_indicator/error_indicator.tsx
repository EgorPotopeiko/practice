import React from 'react';
import { Card, Image } from 'antd';
import { Typography } from 'antd';
import './error_indicator.less';

const { Title } = Typography;

const ErrorIndicator: React.FC = () => {
    return (
        <div className='error__indicator'>
            <Card title='Упс!'>
                <Title level={2}>Произошла ошибка! Попробуйте перезагрузить страницу!</Title>
                <div className='error__img-block'>
                    {/*//todo взять из public папки*/}
                    <Image width={200} src='http://ezotera.ariom.ru/uploads/posts/2012-03/1332866659_oshibka-300x300.png' />
                </div>
            </Card>
        </div>
    );
}

export default ErrorIndicator;