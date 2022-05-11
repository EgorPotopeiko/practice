import React, { FC } from 'react';
import { Card, Image } from 'antd';
import { Typography } from 'antd';
import './error_indicator.less';

const { Title } = Typography;

const ErrorIndicator: FC = () => {
    return (
        <div className='error__indicator'>
            <Card title='Упс!'>
                <Title level={2}>Произошла ошибка! Попробуйте перезагрузить страницу!</Title>
                <div className='error__img-block'>
                    <Image width={200} src={window.location.origin + '/img/error.png'} />
                </div>
            </Card>
        </div>
    );
}

export default ErrorIndicator;