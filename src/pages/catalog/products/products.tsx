import React from 'react';
import CardList from './cardList/cardList';
import CardTile from './cardTile/cardTile';
import { Typography } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import './products.less';
import { useState } from 'react';

interface Props {
    data: any
}

const productFilter = ["по дате добавления", "по алфавиту", "по возрастанию цены", "по убыванию цены"]

const { Title } = Typography;

const { Option } = Select;

const Products: React.FC<Props> = ({ data }) => {
    const [view, setView] = useState("LIST");
    const list = data.map((product: any) => (
        view === "LIST"
            ?
            (
                <CardList
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    desc={product.description}
                />
            )
            :
            (
                <CardTile
                    key={product.id}
                    name={product.name}
                    price={product.price}
                />
            )

    ))
    return (
        <div className="products">
            <div className="products__menu">
                <Title level={3}>Найдено {data.length} товара(-ов)</Title>
                <div className='products__menu-icons'>
                    <UnorderedListOutlined onClick={() => setView("LIST")} />
                    <AppstoreOutlined onClick={() => setView("TILE")} />
                </div>
            </div>
            <Select defaultValue="по дате добавления">
                {productFilter.map((filter) => {
                    return (
                        <Option key={filter} value={filter}>{filter}</Option>
                    )
                })}
            </Select>
            {view === "LIST"
                ?
                <ul className="products__list">{list}</ul>
                :
                <div className="products__tile">{list}</div>
            }
        </div>
    );
}

export default Products;