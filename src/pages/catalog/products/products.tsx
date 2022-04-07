/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { List, Typography } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import './products.less';
import CardList from './card_list';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsLoading, selectProducts, selectTotal, selectView } from '../../../store/products/selectors';
import Loader from '../../../components/loader';
import { selectPage, selectPageSize } from '../../../store/products/selectors';
import CardTile from './card_tile';
import { TProduct } from '../../../models/product';
import { GetPage, GetView } from '../../../store/products/actions';

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
    const pagination = (page: number, pageSize: number) => dispatch(GetPage(page, pageSize));
    const stateSort = useSelector(selectView);
    return (
        <div className="products">
            <div className="products__menu">
                <Title level={1}>Найдено {totalCount} товара(-ов)</Title>
                <div className='products__menu-icons'>
                    <UnorderedListOutlined onClick={() => setView("list")} />
                    <AppstoreOutlined onClick={() => setView("tile")} />
                </div>
            </div>
            <Select defaultValue="low_price" onChange={(sort: string) => dispatch(GetView(sort))}>
                <Option key="low_price" value="low_price">по возрастанию цены</Option>
                <Option key="high_price" value="high_price">по убыванию цены</Option>
            </Select>
            {!!loading && (<List>{spinner}</List>)}
            {!loading && (
                <List grid={view === "tile" ? { gutter: 8 } : undefined}
                    dataSource={products}
                    pagination={{
                        showSizeChanger: true,
                        defaultCurrent: pageNumber,
                        pageSize: pageSize,
                        pageSizeOptions: [6, 10, 20],
                        total: totalCount,
                        onChange: (page: number, pageSize: number) => pagination(page, pageSize)
                    }}
                    renderItem={(item: TProduct) => (
                        <>
                            {
                                view === "list" && (
                                    <CardList
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        category={item.category}
                                        img={item.img}
                                    />
                                )}
                            {
                                view === "tile" && (
                                    <CardTile
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        category={item.category}
                                        img={item.img}
                                    />
                                )}
                        </>
                    )}>
                </List>
            )}
        </div >
    );
}

export default Products;