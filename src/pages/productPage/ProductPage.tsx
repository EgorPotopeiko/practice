import { Button, Card, Divider } from 'antd';
import React from 'react';
import { Typography } from 'antd';
import './ProductPage.less';
import Header from '../../components/header/Header';
import { useSelector } from 'react-redux';
import { selectProduct } from '../../store/products/selectors';
import Loader from '../../components/loader/Loader';

const { Title, Text } = Typography;

const ProductPage: React.FC = () => {
    const product = useSelector(selectProduct)

    if (product === null) {
        return (
            <div className='productPage'>
                <Header />
                <Card>
                    <Loader />
                </Card>
            </div>
        )
    }
    const { title, available, maker, category, subcategory, cost, description } = product
    return (
        <div className='productPage'>
            <Header />
            <Card title={<>
                <Title level={3}>{title}</Title>
                <Title level={4}>{available ? "Есть в наличии" : "Нет в наличии"}</Title>
            </>}>
                <div className='productPage__info'>
                    <div className='productPage__info-desc'>
                        <Text>Изготовитель: {maker}</Text>
                        <Text>Категория: {category}</Text>
                        <Text>Подкатегория: {subcategory}</Text>
                    </div>
                    <div className='productPage__info-add'>
                        <Text strong >{cost} руб.</Text>
                        <Button disabled={available ? false : true} type='primary'>Добавить в корзину</Button>
                    </div>
                </div>
                <Divider />
                <div className='productPage__description'>
                    <Title level={4}>Полное описание</Title>
                    <Text>{description}</Text>
                </div>
            </Card>
        </div>
    );
}

export default ProductPage;