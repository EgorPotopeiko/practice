import {Button, Card, Divider, Image, Spin, Typography} from 'antd';
import React from 'react';
import './ProductPage.less';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../../store/products/selectors';
import Loader from '../../components/loader/Loader';
import { CartActionTypes } from '../../store/cart/action-types';
import Header from '../../components/header/Header';

const { Title, Text } = Typography;

const ProductPage: React.FC = () => {
    const product = useSelector(selectProduct);
    const dispatch = useDispatch();
    let finallyImg = null;
    if (product.image === undefined) {
        finallyImg = window.location.href.split('auth')[0] + product.imgCart
    }
    else {
        finallyImg = product.img
    }
    return (
        <Spin spinning={!!product}>
            <div className='productPage'>
                <Header />
                <Card title={<>
                    <Image width={400} src={finallyImg} />
                    <div className='productPage__title'>
                        <Title level={3}>{product.title}</Title>
                        <Title level={4}>Есть в наличии</Title>
                    </div>
                </>}>
                    <div className='productPage__info'>
                        <div className='productPage__info-desc'>
                            <Text>Изготовитель:</Text>
                            <Text>Категория: {product.category[0]}</Text>
                            <Text>Подкатегория: {product.category[1]}</Text>
                        </div>
                        <div className='productPage__info-add'>
                            <Text strong >{product.price} руб.</Text>
                            <Button onClick={() => dispatch({
                                type: CartActionTypes.PRODUCT_ADDED,
                                item: product
                            })}>Добавить в корзину</Button>
                        </div>
                    </div>
                    <Divider />
                    <div className='productPage__description'>
                        <Title level={4}>Полное описание</Title>
                    </div>
                </Card>
            </div>
        </Spin>

    );
}

export default ProductPage;