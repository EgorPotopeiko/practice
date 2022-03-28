/* eslint-disable array-callback-return */
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { PUBLIC_PATH } from "../../routing/names";
import { FiltersActionTypes } from '../../store/filters/action-types';
import { selectFilters } from '../../store/filters/selectors';
import { ProductsActionTypes } from '../../store/products/action-types';
import './Header.less';
import ModalAuth from './ModalAuth/ModalAuth';

const { Title, Text } = Typography;

const { Option } = Select;

const { APP } = PUBLIC_PATH

export const selectValues = ["Рога и копыта", "ZooParadise", "Purina", "RoyalConin", "Дружок", "Fisherman"];

const Header: React.FC = () => {
    const [modalAuthVisible, setModalAuthVisible] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters)
    const showModal = () => {
        setModalAuthVisible(true);
    }
    const cancelModal = () => {
        setModalAuthVisible(false)
    }
    return (
        <div className="header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title onClick={() => dispatch({
                        type: ProductsActionTypes.REMOVE_PRODUCT
                    })}><Link to={APP}>Shop</Link></Title>
                    <div className='header__user'>
                        <Input suffix={<SearchOutlined onClick={() => dispatch({
                            type: FiltersActionTypes.SET_FILTERS,
                            ...filters,
                            search: searchInput
                        })} />} placeholder="Поиск по названию" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
                        <Button onClick={showModal}>Войти</Button>
                        <ModalAuth onCancel={cancelModal} visible={modalAuthVisible} />
                    </div>
                </div>
                <div className='header__filters'>
                    <>
                        <Input suffix={<SearchOutlined onClick={() => dispatch({
                            type: FiltersActionTypes.SET_FILTERS,
                            ...filters,
                            search: searchInput
                        })} />} placeholder="Поиск по названию" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
                        <Select placeholder="Производитель" mode="multiple" onChange={(maker: string) => dispatch({
                            type: FiltersActionTypes.SET_FILTERS,
                            ...filters,
                            maker: maker
                        })}>
                            {selectValues.map((item) => (
                                <Option key={item} value={item}>{item.toUpperCase()}</Option>
                            ))}
                        </Select>
                    </>
                    <>
                        <Text>В наличии</Text>
                        <Switch defaultChecked onChange={(checked: boolean) => dispatch({
                            type: FiltersActionTypes.SET_FILTERS,
                            ...filters,
                            available: checked,
                        })} />
                    </>
                    <>
                        <Text>Цена</Text>
                        <Slider range max={50000} defaultValue={[10, 50000]} onAfterChange={(priceRange: Array<Number>) => dispatch({
                            type: FiltersActionTypes.SET_FILTERS,
                            ...filters,
                            priceRange: priceRange
                        })} />
                    </>
                </div>
            </PageHeader>
        </div>
    );
}

export default Header;