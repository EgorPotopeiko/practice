import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, PageHeader, Select, Slider, Switch, Typography } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import { PUBLIC_PATH, USER_PATH } from '../../routing/names';
import { GetFilters, RemoveAllFilters } from '../../store/filters/actions';
import { selectAllFilters } from '../../store/filters/selectors';
import { GetLogout } from '../../store/login/actions';
import { selectUser } from '../../store/login/selectors';
import { GetPage, RemoveProductAction } from '../../store/products/actions';
import './Header.less';
import ModalAuth from './ModalAuth';

const { Title, Text } = Typography;

const { Option } = Select;

const { APP } = PUBLIC_PATH;

const { CART } = USER_PATH;

export const selectValues = ["Рога и копыта", "ZooParadise", "Purina", "RoyalConin", "Дружок", "Fisherman"];

const Header: React.FC = () => {
    const [modalAuthVisible, setModalAuthVisible] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const dispatch = useDispatch();
    const filters = useSelector(selectAllFilters);
    const { category, priceRange, search, sort } = filters;
    const user = useSelector(selectUser);
    const showModal = () => {
        if (user.role === "guest" && user.isAuth === false) {
            setModalAuthVisible(true)
        }
        else {
            dispatch(GetLogout({
                role: "guest",
                isAuth: false
            }))
            dispatch(RemoveAllFilters())
            dispatch(GetPage(1, 6))
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
                        dispatch(RemoveProductAction())
                        dispatch(RemoveAllFilters())
                        dispatch(GetPage(1, 6))
                    }
                    }><Link to={APP}>Shop</Link></Title>
                    <div className='header__user'>
                        <Input suffix={<SearchOutlined onClick={() => dispatch(GetFilters(searchInput, priceRange, sort, category))} />} placeholder="Поиск по названию" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
                        <Button onClick={showModal}>{user.isAuth ? 'Выйти' : 'Войти'}</Button>
                        <Link to={CART}><UserOutlined hidden={user.isAuth ? false : true} /></Link>
                        <ModalAuth onCancel={cancelModal} visible={modalAuthVisible} />
                    </div>
                </div>
                {(user.role === "guest" || user.role === "user") && (history.location.pathname === "/auth" || history.location.pathname === "/")
                    ?
                    <div className='header__filters'>
                        <>
                            <Input suffix={<SearchOutlined onClick={() => dispatch(GetFilters(searchInput, priceRange, sort, category))} />} placeholder="Поиск по названию" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)} />
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
                            <Slider range max={100000} defaultValue={[10, 100000]} onAfterChange={(newPriceRange: Array<number>) => dispatch(GetFilters(search, newPriceRange, sort, category))} />
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