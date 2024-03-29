/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-self-assign */
import React from 'react';
import CardList from './cardList/CardList';
import CardTile from './cardTile/CardTile';
import { Pagination, Typography } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import './Products.less';
import { useState } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { removeAllFilters, sortingFilter } from '../../../store/filters/actions';
import { TProduct } from '../../../models/product';
import { useEffect } from 'react';
import Loader from '../../../components/loader/Loader';

const { Title } = Typography;

const { Option } = Select;

const Products: React.FC = () => {
    const dispatch = useDispatch();
    const [minValue, setMinValue] = useState(0);
    const [size, setSize] = useState(6);
    const [maxValue, setMaxValue] = useState(size);
    const data = useSelector((state: RootStateOrAny) => state.productsReducer.products);
    const filterSearch = useSelector((state: RootStateOrAny) => state.filterReducer.filterSearch);
    const category = useSelector((state: RootStateOrAny) => state.filterReducer.filterCategory);
    const sort = useSelector((state: RootStateOrAny) => state.filterReducer.filterSorting);
    const maker = useSelector((state: RootStateOrAny) => state.filterReducer.filterMaker);
    const available = useSelector((state: RootStateOrAny) => state.filterReducer.filterAvailable);
    const priceRange = useSelector((state: RootStateOrAny) => state.filterReducer.filterPrice);
    const loading = useSelector((state: RootStateOrAny) => state.loadingReducer.loading);
    const [view, setView] = useState("LIST");
    const spinner = loading ? <Loader /> : null;
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
    const list = loading
        ?
        null
        :
        filteredData.slice(minValue, maxValue).map((product: TProduct) => (
            view === "LIST"
                ?
                (
                    <CardList
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        desc={product.description}
                        cost={product.cost}
                        available={product.available}
                        maker={product.maker}
                        category={product.category}
                        subcategory={product.subcategory}
                    />
                )
                :
                (
                    <CardTile
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        desc={product.description}
                        cost={product.cost}
                        available={product.available}
                        maker={product.maker}
                        category={product.category}
                        subcategory={product.subcategory}
                    />
                )

        ));
    const hangleChange = (value: number) => {
        setMinValue((value - 1) * size)
        setMaxValue((value) * size)
    }
    const showSizeChange = (current: number, size: number) => {
        setSize(size)
    }
    useEffect(() => {
        dispatch(removeAllFilters())
    }, [data])
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
                <ul className="products__list">{spinner} {list}</ul>
                :
                <div className="products__tile">{spinner} {list}</div>
            }
            <Pagination defaultCurrent={1} pageSize={size} onShowSizeChange={showSizeChange} pageSizeOptions={[6, 10, 20]} total={filteredData.length} onChange={hangleChange} />
        </div>
    );
}

export default Products;