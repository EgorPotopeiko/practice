import { Button, Card, Divider } from 'antd';
import React from 'react';
import { Typography } from 'antd';
import './ProductPage.less';
import Header from '../../components/header/Header';
import { useSelector } from 'react-redux';
import { selectProduct } from '../../store/products/selectors';

const { Title, Text } = Typography;

const ProductPage: React.FC = () => {
    const product = useSelector(selectProduct)
    const { title, available, maker, category, subcategory } = product
    return (
        <div className='productPage'>
            <Header />
            <Card title={<>
                <Title level={3}>{title}</Title>
                <Title level={4}>{available ? "Есть на складе" : "Нет на складе"}</Title>
            </>}>
                <div className='productPage__info'>
                    <div className='productPage__info-desc'>
                        <Text>Изготовитель: {maker}</Text>
                        <Text>Категория: {category}</Text>
                        <Text>Подкатегория: {subcategory}</Text>
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