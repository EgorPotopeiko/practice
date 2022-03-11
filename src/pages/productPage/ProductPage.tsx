import { Button, Card, Divider } from 'antd';
import React from 'react';
import CartHeader from '../../components/header/CartHeader/CartHeader';
import { Typography } from 'antd';
import './ProductPage.less'

const { Title, Text } = Typography

const ProductPage: React.FC = () => {
    return (
        <div className='productPage'>
            <CartHeader />
            <Card title={<>
                <Title level={3}>Name</Title>
                <Title level={4}>В наличии</Title>
            </>}>
                <div className='productPage__info'>
                    <div className='productPage__info-desc'>
                        <Text>Изготовитель: PURINA</Text>
                        <Text>Категория: DOGS</Text>
                        <Text>Подкатегория: Корма</Text>
                    </div>
                    <div className='productPage__info-add'>
                        <Text>10 руб.</Text>
                        <Button type='primary'>Добавить в корзину</Button>
                    </div>
                </div>
                <Divider />
                <div className='productPage__description'>
                    <Title level={4}>Полное описание</Title>
                    <Text>Подходит для слабо освещенных аквариумов без подачи СО2, но при этом скорость роста низкая, с вытекающими проблемами. При использовании СО2 и мощного света скорость роста существенно увеличивается.</Text>
                </div>
            </Card>
        </div>
    );
}

export default ProductPage;