import { Divider, Radio, Typography } from 'antd';
import React from 'react';
import "./cartOrder.less"

const { Title, Text } = Typography

const CartOrder: React.FC = () => {
    return (
        <div className="cart__order">
            <div className='order__header'>
                <Title level={4}>Выбрано 0 товаров</Title>
                <Text>0 руб</Text>
            </div>
            <Divider />
            <div className='order__delivery'>
                <Text strong>Способ доставки</Text>
                <Radio.Group name="delivery" defaultValue="self">
                    <Radio value="self">Самовывоз</Radio>
                    <Radio value="post">Почтой</Radio>
                    <Radio value="deliver">Курьером</Radio>
                </Radio.Group>
            </div>
        </div>
    );
}

export default CartOrder;