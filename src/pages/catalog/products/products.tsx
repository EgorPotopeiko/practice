/* eslint-disable array-callback-return */
/* eslint-disable no-self-assign */
import React from 'react';
import CardList from './cardList/cardList';
import CardTile from './cardTile/cardTile';
import { Typography } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import './products.less';
import { useState } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { sortingFilter } from '../../../store/filters/filters';

const { Title } = Typography;

const { Option } = Select;

const Products: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootStateOrAny) => state.productsReducer.products);
    const filterSearch = useSelector((state: RootStateOrAny) => state.filterReducer.filterSearch);
    const category = useSelector((state: RootStateOrAny) => state.filterReducer.filterCategory);
    const sort = useSelector((state: RootStateOrAny) => state.filterReducer.filterSorting);
    const manufacture = useSelector((state: RootStateOrAny) => state.filterReducer.filterManufacture);
    const available = useSelector((state: RootStateOrAny) => state.filterReducer.filterAvailable);
    const priceRange = useSelector((state: RootStateOrAny) => state.filterReducer.filterPrice);
    const [view, setView] = useState("LIST");
    let filteredData = data.filter(
        (item: any) =>
            item.name.toLowerCase().indexOf(filterSearch.toLowerCase()) !== -1
    );
    if (category === "ALL") { filteredData = filteredData }
    else {
        filteredData = filteredData.filter((item: any) => item.category === category);
    }
    if (sort === "DATE") filteredData = filteredData.sort(function (a: any, b: any) { return new Date(b.date).valueOf() - new Date(a.date).valueOf() })
    if (sort === "ALPHABET") filteredData = filteredData.sort(function (a: any, b: any) { if (a.name < b.name) { return -1 } })
    if (sort === "HIGH_PRICE") filteredData = filteredData.sort(function (a: any, b: any) { return b.price - a.price })
    if (sort === "LOW_PRICE") filteredData = filteredData.sort(function (a: any, b: any) { return a.price - b.price })
    if (manufacture.length === 0) {
        filteredData = filteredData;
    }
    else {
        filteredData = filteredData.filter((item: any) => item.manufacture === manufacture)
    }
    if (available === true) filteredData = filteredData.filter((item: any) => item.status === true)
    if (available === false) filteredData = filteredData.filter((item: any) => item.status === false)
    filteredData = filteredData.filter((item: any) => item.price >= priceRange[0] && item.price <= priceRange[1])
    const list = filteredData.map((product: any) => (
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

    ));
    return (
        <div className="products">
            <div className="products__menu">
                <Title level={3}>Найдено {filteredData.length} товара(-ов)</Title>
                <div className='products__menu-icons'>
                    <UnorderedListOutlined onClick={() => setView("LIST")} />
                    <AppstoreOutlined onClick={() => setView("TILE")} />
                </div>
            </div>
            <Select defaultValue="по дате добавления" onChange={(sort) => dispatch(sortingFilter(sort))}>
                <Option key="DATE" value="DATE">по дате добавления</Option>
                <Option key="ALPHABET" value="ALPHABET">по алфавиту</Option>
                <Option key="LOW_PRICE" value="LOW_PRICE">по возрастанию цены</Option>
                <Option key="HIGH_PRICE" value="HIGH_PRICE">по убыванию цены</Option>
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