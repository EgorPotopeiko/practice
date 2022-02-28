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
import { sortingFilter } from '../../../store/filters/actions';
import { TProduct } from '../../../models/product';
import ProductsDB from '../../../services';

const { Title } = Typography;

const { Option } = Select;

const Products: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootStateOrAny) => state.productsReducer.products);
    const filterSearch = useSelector((state: RootStateOrAny) => state.filterReducer.filterSearch);
    const category = useSelector((state: RootStateOrAny) => state.filterReducer.filterCategory);
    const sort = useSelector((state: RootStateOrAny) => state.filterReducer.filterSorting);
    const maker = useSelector((state: RootStateOrAny) => state.filterReducer.filterMaker);
    const available = useSelector((state: RootStateOrAny) => state.filterReducer.filterAvailable);
    const priceRange = useSelector((state: RootStateOrAny) => state.filterReducer.filterPrice);
    const [view, setView] = useState("LIST");
    let filteredData = data.filter(
        (item: TProduct) =>
            item.title.toLowerCase().indexOf(filterSearch.toLowerCase()) !== -1
    );
    if (category === "all") { filteredData = filteredData }
    else {
        filteredData = filteredData.filter((item: TProduct) => item.category === category);
    }
    if (sort === "DATE") filteredData = filteredData.sort(function (a: TProduct, b: TProduct) { return new Date(b.added_date).valueOf() - new Date(a.added_date).valueOf() });
    if (sort === "ALPHABET") filteredData = filteredData.sort(function (a: TProduct, b: TProduct) { if (a.title < b.title) { return -1 } });
    if (sort === "HIGH_PRICE") filteredData = filteredData.sort(function (a: TProduct, b: TProduct) { return b.cost - a.cost });
    if (sort === "LOW_PRICE") filteredData = filteredData.sort(function (a: TProduct, b: TProduct) { return a.cost - b.cost });
    if (available === true) filteredData = filteredData.filter((item: TProduct) => item.available === true);
    if (available === false) filteredData = filteredData.filter((item: TProduct) => item.available === false);
    filteredData = filteredData.filter((item: TProduct) => item.cost >= priceRange[0] && item.cost <= priceRange[1]);
    if (maker.length === 0) {
        filteredData = filteredData;
    }
    else {
        filteredData = filteredData.filter((item: TProduct) => maker.includes(item.maker));
    }
    const list = filteredData.map((product: TProduct) => (
        view === "LIST"
            ?
            (
                <CardList
                    key={product.id}
                    title={product.title}
                    cost={product.cost}
                    desc={product.description}
                />
            )
            :
            (
                <CardTile
                    key={product.id}
                    title={product.title}
                    cost={product.cost}
                />
            )

    ));
    const database = new ProductsDB();
    console.log(database.getAllProducts());
    console.log(database.getProduct(5));
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