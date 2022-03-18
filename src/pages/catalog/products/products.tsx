/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-self-assign */
import React, { useState } from 'react';
import { List, Typography } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import './products.less';
import CardList from './cardList/cardList';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsLoading, selectProducts } from '../../../store/products/selectors';
import Loader from '../../../components/loader/loader';
import { selectPage, selectPageSize } from '../../../store/pagination/selectors';
import { PaginationActionTypes } from '../../../store/pagination/action-types';
import CardTile from './cardTile/cardTile';

const { Title } = Typography;

const { Option } = Select;

const Products: React.FC = () => {
    const products = useSelector(selectProducts);
    const pageNumber = useSelector(selectPage);
    const pageSize = useSelector(selectPageSize);
    const loading = useSelector(selectProductsLoading);
    const [view, setView] = useState("list");
    const dispatch = useDispatch();
    const spinner = loading ? <Loader /> : null;
    const pagination = (page: any, pageSize: any) => dispatch({
        type: PaginationActionTypes.SET_PAGE,
        page,
        pageSize
    })
    return (
        <div className="products">
            <div className="products__menu">
                <Title level={3}>Найдено {products.length} товара(-ов)</Title>
                <div className='products__menu-icons'>
                    <UnorderedListOutlined onClick={() => setView("list")} />
                    <AppstoreOutlined onClick={() => setView("tile")} />
                </div>
            </div>
            <Select defaultValue="по дате добавления">
                <Option key="DATE" value="DATE">по дате добавления</Option>
                <Option key="ALPHABET" value="ALPHABET">по алфавиту</Option>
                <Option key="LOW_PRICE" value="LOW_PRICE">по возрастанию цены</Option>
                <Option key="HIGH_PRICE" value="HIGH_PRICE">по убыванию цены</Option>
            </Select>
            {loading ?
                <List>
                    {spinner}
                </List>
                :
                <List grid={view === "tile" ? { gutter: 16, column: 3 } : undefined} dataSource={products} pagination={{ showSizeChanger: true, defaultCurrent: pageNumber, pageSize: pageSize, pageSizeOptions: [6, 10, 20], total: products.length, onChange: (page: any, pageSize: any) => pagination(page, pageSize) }} renderItem={(item: any) => (
                    view === "list"
                        ?
                        <CardList
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            desc={item.description}
                            cost={item.cost}
                            available={item.available}
                            maker={item.maker}
                            category={item.category}
                            subcategory={item.subcategory}
                        />
                        :
                        <CardTile
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            desc={item.description}
                            cost={item.cost}
                            available={item.available}
                            maker={item.maker}
                            category={item.category}
                            subcategory={item.subcategory}
                        />
                )}>
                </List>}
        </div>
    );
}

export default Products;