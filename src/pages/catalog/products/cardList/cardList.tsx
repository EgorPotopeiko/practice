import React from 'react';
import { Card } from 'antd';
import './cardList.less';

interface Props {
    title: string,
    cost: number,
    desc: string,
}

const CardProduct: React.FC<Props> = ({ title, cost, desc }) => {
    return (
        <div className='cardList'>
            <Card title={title}>
                <p>{cost}$</p>
                <p>{desc}</p>
            </Card>
        </div>
    );
}

export default CardProduct;