import { Button, Card, Divider, Image, Typography } from 'antd';
import React from 'react';
import './ProductPage.less';
import { useSelector } from 'react-redux';
import { selectProduct } from '../../store/products/selectors';
import Loader from '../../components/loader/Loader';
import CartHeader from '../../components/header/CartHeader/CartHeader';

const { Title, Text } = Typography;

const ProductPage: React.FC = () => {
    const product = useSelector(selectProduct);
    if (product === null) {
        return (
            <div className='productPage'>
                <CartHeader />
                <Card>
                    <Loader />
                </Card>
            </div>
        )
    }
    const { title, category, price, imgCart, img } = product.data;
    let finallyImg = null;
    if (img === undefined) {
        finallyImg = window.location.href.split('auth')[0] + imgCart
    }
    else {
        finallyImg = img
    }
    return (
        <div className='productPage'>
            <CartHeader />
            <Card title={<>
                <Image width={400} src={finallyImg} />
                <div className='productPage__title'>
                    <Title level={3}>{title}</Title>
                    <Title level={4}>Есть в наличии</Title>
                </div>
            </>}>
                <div className='productPage__info'>
                    <div className='productPage__info-desc'>
                        <Text>Изготовитель:</Text>
                        <Text>Категория: {category[0]}</Text>
                        <Text>Подкатегория: {category[1]}</Text>
                    </div>
                    <div className='productPage__info-add'>
                        <Text strong >{price} руб.</Text>
                        <Button>Добавить в корзину</Button>
                    </div>
                </div>
                <Divider />
                <div className='productPage__description'>
                    <Title level={4}>Полное описание</Title>
                </div>
            </Card>
        </div>
    );
}

export default ProductPage;