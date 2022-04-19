import { Button, Card, Divider, Empty, Image, Spin, Typography } from 'antd';
import React from 'react';
import './product_page.less';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, selectProductsStatus } from '../../store/products/selectors';
import Header from '../../components/header';
import { GetAddedCartAction } from '../../store/cart/actions';
import { TProduct } from '../../models/product';

const { Title, Text } = Typography;

const ProductPage: React.FC = () => {
    const dispatch = useDispatch();
    const product: TProduct | null = useSelector(selectProduct);
    const { isLoading } = useSelector(selectProductsStatus);
    return (
        <Spin spinning={isLoading}>
            <div className='product__page'>
                <Header />
                {!product && (<Card><Empty /></Card>)}
                {!!product && (
                    <Card title={(
                        <>
                            <Image width={400} src={product.img === undefined ? window.location.href.split('auth')[0] + product.img : product.img} />
                            <div className='product__page-title'>
                                <Title level={3}>{product.title}</Title>
                                <Title level={4}>Есть в наличии</Title>
                            </div>
                        </>
                    )}>
                        <div className='product__page-info'>
                            <div className='product__page-info-desc'>
                                <Text>Изготовитель:</Text>
                                <Text>Категория: </Text>
                                <Text>Подкатегория: </Text>
                            </div>
                            <div className='product__page-info-add'>
                                <Text strong >{product.price} руб.</Text>
                                <Button onClick={() => dispatch(GetAddedCartAction([{ id: product.id }], { id: product.id, title: product.title, price: product.price, categories: product.categories, img: product.img }))}>Добавить в корзину</Button>
                            </div>
                        </div>
                        <Divider />
                        <div className='product__page-description'>
                            <Title level={4}>Полное описание</Title>
                        </div>
                    </Card>
                )}
            </div>
        </Spin>
    );
}

export default ProductPage;