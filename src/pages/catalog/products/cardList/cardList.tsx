import React from 'react';
import { Card, Divider, Typography } from 'antd';
import './cardList.less';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { PUBLIC_PATH } from "../../../../routing/names";
import { useDispatch } from 'react-redux';
import { ProductsActionTypes } from '../../../../store/products/action-types';

const { Title, Text } = Typography;

interface Props {
    id: string,
    title: string,
    desc: string,
    cost: number,
    available: boolean,
    maker: string,
    category: string,
    subcategory: string | undefined,
    img: string
}

const { PRODUCT } = PUBLIC_PATH;

const CardProduct: React.FC<Props> = ({ id, title, desc, cost, available, maker, category, subcategory, img }) => {
    const dispatch = useDispatch();
    return (
        <div className='cardList'>
            <Card title={<>
                <Title level={3}><Link onClick={() => dispatch({
                    type: ProductsActionTypes.LOAD_PRODUCTS_START,
                    id: id
                })} to={PRODUCT}>{title}</Link></Title>
                <Text>{category}</Text>
                <ShoppingCartOutlined />
            </>}
                cover={<img alt="example" src={img} />}>
                <Divider />
                <p>Стоимость: {cost} руб.</p>
                <p>Производитель: {maker}</p>
            </Card>
        </div>
    );
}

export default CardProduct;