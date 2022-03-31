/* eslint-disable array-callback-return */
import { UserOutlined } from '@ant-design/icons';
import { Button, PageHeader, Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_PATH } from '../../../routing/names';
import { FiltersActionTypes } from '../../../store/filters/action-types';
import { LoginActionTypes } from '../../../store/login/action-types';
import { ProductsActionTypes } from '../../../store/products/action-types';
import "./CartHeader.less"

const { Title } = Typography;

const { AUTH } = USER_PATH

const CartHeader: React.FC = () => {
    const dispatch = useDispatch()
    return (
        <div className="cart__header">
            <PageHeader>
                <div className='cart__header-wrap'>
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
                    }><Link to={AUTH}>Shop</Link></Title>
                    <div className='cart__header-user'>
                        <Button onClick={() => {
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
                        }}>Выйти</Button>
                        <UserOutlined />
                    </div>
                </div>
            </PageHeader>
        </div>
    );
}

export default CartHeader;