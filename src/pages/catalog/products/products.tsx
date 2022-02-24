import React from 'react';
import CardProduct from './card/card';
import { Typography } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import './products.less';

interface Props {
    data: any
}

const productFilter = ["по дате добавления", "по алфавиту", "по возрастанию цены", "по убыванию цены"]

const { Title } = Typography;

const { Option } = Select;

const Products: React.FC<Props> = ({ data }) => {
    const list = data.map((product: any) => {
        return (
            <CardProduct
                key={product.id}
                name={product.name}
                price={product.price} />
        )
    })
    return (
        <div className="products">
            <div className="products__menu">
                <Title level={3}>Найдено {data.length} товара(-ов)</Title>
                <div className='products__menu-icons'>
                    <UnorderedListOutlined />
                    <AppstoreOutlined />
                </div>
            </div>
            <Select defaultValue="по дате добавления">
                {productFilter.map((filter) => {
                    return (
                        <Option key={filter} value={filter}>{filter}</Option>
                    )
                })}
            </Select>
            <ul className="products__list">{list}</ul>
        </div>
    );
}

export default Products;