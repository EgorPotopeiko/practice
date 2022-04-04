/* eslint-disable array-callback-return */
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import { PUBLIC_PATH, USER_PATH } from '../../routing/names';
import { FiltersActionTypes } from '../../store/filters/action-types';
import { selectFilters } from '../../store/filters/selectors';
import { LoginActionTypes } from '../../store/login/action-types';
import { selectUser } from '../../store/login/selectors';
import { ProductsActionTypes } from '../../store/products/action-types';
import './Header.less';
import ModalAuth from './ModalAuth/ModalAuth';

const { Title, Text } = Typography;

const { Option } = Select;

const { APP } = PUBLIC_PATH;

const { CART } = USER_PATH;

export const selectValues = ["Рога и копыта", "ZooParadise", "Purina", "RoyalConin", "Дружок", "Fisherman"];

const Header: React.FC = () => {
    const [modalAuthVisible, setModalAuthVisible] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const user = useSelector(selectUser);
    const showModal = () => {
        // @ts-ignore
        if (user.role === "guest" && user.isAuth === false) {
            setModalAuthVisible(true)
        }
        else {
            dispatch({
                type: LoginActionTypes.LOGOUT,
                user: {
                    role: "guest",
                    isAuth: false
                }
            })
            dispatch({
                type: FiltersActionTypes.REMOVE_ALL_FILTERS
            })
            dispatch({
                type: ProductsActionTypes.SET_PAGE,
                page: 1,
                pageSize: 6
            })
        }
    }
    const cancelModal = () => {
        setModalAuthVisible(false)
    }
    return (
        <div className="header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title onClick={() => {
                        dispatch({
                            type: ProductsActionTypes.REMOVE_PRODUCT
                        })
                        dispatch({
                            type: FiltersActionTypes.REMOVE_ALL_FILTERS
                        })
                        dispatch({
                            type: ProductsActionTypes.SET_PAGE,
                            page: 1,
                            pageSize: 6
                        })
                    }
                    }><Link to={APP}>Shop</Link></Title>
                    <div className='header__user'>
                        <Input suffix={<SearchOutlined onClick={() => dispatch({
                            type: FiltersActionTypes.SET_FILTERS,
                            ...filters,
                            search: searchInput
                        })} />} placeholder="Поиск по названию" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
                        <Button onClick={showModal}>{user.isAuth ? 'Выйти' : 'Войти'}</Button>
                        <Link to={CART}><UserOutlined hidden={user.isAuth ? false : true} /></Link>
                        <ModalAuth onCancel={cancelModal} visible={modalAuthVisible} />
                    </div>
                </div>
                {(user.role === "guest" || user.role === "user") && (history.location.pathname === "/auth" || history.location.pathname === "/")
                    ?
                    <div className='header__filters'>
                        <>
                            <Input suffix={<SearchOutlined onClick={() => dispatch({
                                type: FiltersActionTypes.SET_FILTERS,
                                ...filters,
                                search: searchInput
                            })} />} placeholder="Поиск по названию" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
                            <Select placeholder="Производитель" mode="multiple"
                            // onChange={(maker: string) => dispatch({
                            //     type: FiltersActionTypes.SET_FILTERS,
                            //     ...filters,
                            //     maker: maker
                            // })}
                            >
                                {selectValues.map((item) => (
                                    <Option key={item} value={item}>{item.toUpperCase()}</Option>
                                ))}
                            </Select>
                        </>
                        <>
                            <Text>В наличии</Text>
                            <Switch defaultChecked
                            //  onChange={(checked: boolean) => dispatch({
                            //     type: FiltersActionTypes.SET_FILTERS,
                            //     ...filters,
                            //     available: checked,
                            // })} 
                            />
                        </>
                        <>
                            <Text>Цена</Text>
                            <Slider range max={100000} defaultValue={[10, 100000]} onAfterChange={(priceRange: Array<Number>) => dispatch({
                                type: FiltersActionTypes.SET_FILTERS,
                                ...filters,
                                priceRange: priceRange
                            })} />
                        </>
                    </div>
                    :
                    null
                }

            </PageHeader>
        </div>
    );
}

export default Header;