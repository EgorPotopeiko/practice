import React, { useState } from 'react';
import { List, Typography } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import './products.less';
import CardList from './card_list';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsStatus, selectTotal } from '../../../store/products/selectors';
import Loader from '../../../components/loader';
import { selectPageStatus } from '../../../store/products/selectors';
import CardTile from './card_tile';
import { TProduct } from '../../../models/product';
import { GetPage, GetView } from '../../../store/products/actions';
import ErrorIndicator from '../../../components/error_indicator/error_indicator';

const { Title } = Typography;

const { Option } = Select;

const Products: React.FC = () => {
    const { isLoading, products, error } = useSelector(selectProductsStatus);
    const { page, pageSize } = useSelector(selectPageStatus);
    const totalCount = useSelector(selectTotal);
    const [view, setView] = useState("list");
    const dispatch = useDispatch();
    const spinner = isLoading ? <Loader /> : null;
    const pagination = (page: number, pageSize: number) => dispatch(GetPage(page, pageSize));
    return (
        <div className="products">
            {error && <ErrorIndicator />}
            {!error &&
                <>
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
                    {isLoading && (<List>{spinner}</List>)}
                    {!isLoading && (
                        <List grid={view === "tile" ? { gutter: 8 } : undefined}
                            dataSource={products}
                            pagination={{
                                showSizeChanger: true,
                                defaultCurrent: page,
                                pageSize: pageSize,
                                pageSizeOptions: [6, 10, 20],
                                total: totalCount,
                                onChange: (page: number, pageSize: number) => pagination(page, pageSize)
                            }}
                            renderItem={(product: TProduct) => (
                                <>
                                    {
                                        view === "list" && (
                                            <CardList
                                                id={product.id}
                                                title={product.title}
                                                price={product.price}
                                                categories={product.categories}
                                                img={product.img}
                                            />
                                        )}
                                    {
                                        view === "tile" && (
                                            <CardTile
                                                key={product.id}
                                                id={product.id}
                                                title={product.title}
                                                price={product.price}
                                                categories={product.categories}
                                                img={product.img}
                                            />
                                        )}
                                </>
                            )}>
                        </List>
                    )}
                </>}
        </div>
    );
}

export default Products;