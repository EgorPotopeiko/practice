import { Button, Card, Divider, Image, Typography } from 'antd';
import React from 'react';
import './product_page.less';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../../store/products/selectors';
import Header from '../../components/header';
import Loader from '../../components/loader';
import { GetAddedCartAction } from '../../store/cart/actions';

const { Title, Text } = Typography;

const ProductPage: React.FC = () => {
    const product = useSelector(selectProduct);
    const dispatch = useDispatch();
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
    const { id, title, category, price, imgCart, img } = product.data;
    let finallyImg = null;
    if (img === undefined) {
        finallyImg = window.location.href.split('auth')[0] + imgCart
    }
    else {
        finallyImg = img
    }
    return (
        <div className='product__page'>
            <Header />
            <Card title={<>
                <Image width={400} src={finallyImg} />
                <div className='product__page-title'>
                    <Title level={3}>{title}</Title>
                    <Title level={4}>Есть в наличии</Title>
                </div>
            </>}>
                <div className='product__page-info'>
                    <div className='product__page-info-desc'>
                        <Text>Изготовитель:</Text>
                        <Text>Категория: {category[0]}</Text>
                        <Text>Подкатегория: {category[1]}</Text>
                    </div>
                    <div className='product__page-info-add'>
                        <Text strong >{price} руб.</Text>
                        <Button onClick={() => dispatch(GetAddedCartAction({ id, title, category, price, img }))}>Добавить в корзину</Button>
                    </div>
                </div>
                <Divider />
                <div className='product__page-description'>
                    <Title level={4}>Полное описание</Title>
                </div>
            </Card>
        </div>
    );
}

export default ProductPage;