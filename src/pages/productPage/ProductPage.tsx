import { Button, Card, Divider } from 'antd';
import React from 'react';
import CartHeader from '../../components/header/CartHeader/CartHeader';
import { Typography } from 'antd';
import './ProductPage.less';
import ProductsDB from '../../services';
import { useDispatch } from 'react-redux';
import { addedToCart } from '../../store/cart/actions';

interface Props {
    itemId: string,
    product: any,
}

const { Title, Text } = Typography;

const ProductPage: React.FC<Props> = ({ itemId, product }) => {
    const { title, description, cost, maker, category, subcategory, available } = product;
    const database = new ProductsDB();
    const dispatch = useDispatch();

    const loadProduct = (id: string) => {
        database.getProduct(id)
            .then((response) => {
                const newCartItem = {
                    id: response.id,
                    title: response.title,
                    cost: response.cost,
                    category: response.category,
                    subcategory: response.subcategory,
                }
                dispatch(addedToCart(newCartItem))
            })
    }
    return (
        <div className='productPage'>
            <CartHeader />
            <Card key={itemId} title={<>
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
                        <Button disabled={available ? false : true} type='primary' onClick={() => loadProduct(itemId)}>Добавить в корзину</Button>
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