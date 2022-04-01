/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-self-assign */
import React, { useState } from 'react';
import { List, Typography } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import './Products.less';
import CardList from './cardList/СardList';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsLoading, selectProducts, selectTotal } from '../../../store/products/selectors';
import Loader from '../../../components/loader/Loader';
import { selectPage, selectPageSize } from '../../../store/products/selectors';
import { ProductsActionTypes } from '../../../store/products/action-types';
import CardTile from './cardTile/СardTile';
import { selectFilters } from '../../../store/filters/selectors';
import { FiltersActionTypes } from '../../../store/filters/action-types';
import { TProduct } from '../../../models/product';

const { Title } = Typography;

const { Option } = Select;

const Products: React.FC = () => {
    const products = useSelector(selectProducts);
    const pageNumber = useSelector(selectPage);
    const pageSize = useSelector(selectPageSize);
    const loading = useSelector(selectProductsLoading);
    const totalCount = useSelector(selectTotal);
    const [view, setView] = useState("list");
    const dispatch = useDispatch();
    const spinner = loading ? <Loader /> : null;
    const filters = useSelector(selectFilters);
    const pagination = (page: Number, pageSize: Number) => dispatch({
        type: ProductsActionTypes.SET_PAGE,
        page,
        pageSize
    });
    return (
        <div className="products">
            <div className="products__menu">
                <Title level={2}>Найдено {totalCount} товара(-ов)</Title>
                <div className='products__menu-icons'>
                    <UnorderedListOutlined onClick={() => setView("list")} />
                    <AppstoreOutlined onClick={() => setView("tile")} />
                </div>
            </div>
            <Select defaultValue="date" onChange={(sort: string) => dispatch({
                type: FiltersActionTypes.SET_FILTERS,
                ...filters,
                sort: sort
            })}>
                <Option key="date" value="date">по дате добавления</Option>
                <Option key="alphabet" value="alphabet">по алфавиту</Option>
                <Option key="low_price" value="low_price">по возрастанию цены</Option>
                <Option key="high_price" value="high_price">по убыванию цены</Option>
            </Select>
            {loading ?
                <List>
                    {spinner}
                </List>
                :
                <List grid={view === "tile" ? {
                    gutter: 8,

                } : undefined} dataSource={products} pagination={{ showSizeChanger: true, defaultCurrent: pageNumber, pageSize: pageSize, pageSizeOptions: [6, 10, 20], total: totalCount, onChange: (page: number, pageSize: number) => pagination(page, pageSize) }} renderItem={(item: TProduct) => (
                    view === "list"
                        ?
                        <CardList
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            category={item.category}
                            img={item.img}
                        />
                        :
                        <CardTile
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            category={item.category}
                            img={item.img}
                        />
                )}>
                </List>}
        </div>
    );
}

export default Products;