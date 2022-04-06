import { Button, Card, Divider, Image, Spin, Typography } from 'antd';
import React from 'react';
import './product_page.less';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, selectProductsLoading } from '../../store/products/selectors';
import Header from '../../components/header';
import { GetAddedCartAction } from '../../store/cart/actions';

const { Title, Text } = Typography;

const ProductPage: React.FC = () => {
    const dispatch = useDispatch();
    const product: any = useSelector(selectProduct)
    const loading = useSelector(selectProductsLoading)
    let finallyImg = null;
    if (product === null) {
        return (
            <div className='productPage'>
                <Spin spinning={loading}>
                    <Header />
                    <Card>
                        <Title>Loading...</Title>
                    </Card>
                </Spin>
            </div>
        )
    }
    if (product.img === undefined) {
        finallyImg = window.location.href.split('auth')[0] + product.imgCart
    }
    else {
        finallyImg = product.img
    }
    return (
        <div className='product__page'>
            <Header />
            <Card title={<>
                <Image width={400} src={finallyImg} />
                <div className='product__page-title'>
                    <Title level={3}>{product.title}</Title>
                    <Title level={4}>Есть в наличии</Title>
                </div>
            </>}>
                <div className='product__page-info'>
                    <div className='product__page-info-desc'>
                        <Text>Изготовитель:</Text>
                        <Text>Категория: {product.category[0]}</Text>
                        {
                            product.category.length > 1
                                ?
                                <Text>Подкатегория: {product.category[1]}</Text>
                                :
                                null
                        }
                    </div>
                    <div className='product__page-info-add'>
                        <Text strong >{product.price} руб.</Text>
                        <Button onClick={() => dispatch(GetAddedCartAction(product))}>Добавить в корзину</Button>
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