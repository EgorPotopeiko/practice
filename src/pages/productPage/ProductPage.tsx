import { Button, Card, Divider } from 'antd';
import React from 'react';
import { Typography } from 'antd';
import './ProductPage.less';
import Header from '../../components/header/Header';

const { Title, Text } = Typography;

const ProductPage: React.FC = () => {
    return (
        <div className='productPage'>
            <Header />
            <Card title={<>
                <Title level={3}>title</Title>
                <Title level={4}>Есть в наличии</Title>
            </>}>
                <div className='productPage__info'>
                    <div className='productPage__info-desc'>
                        <Text>Изготовитель:</Text>
                        <Text>Категория:</Text>
                        <Text>Подкатегория:</Text>
                    </div>
                    <div className='productPage__info-add'>
                        <Text strong >руб.</Text>
                        <Button type='primary'>Добавить в корзину</Button>
                    </div>
                </div>
                <Divider />
                <div className='productPage__description'>
                    <Title level={4}>Полное описание</Title>
                    <Text>description</Text>
                </div>
            </Card>
        </div>
    );
}

export default ProductPage;