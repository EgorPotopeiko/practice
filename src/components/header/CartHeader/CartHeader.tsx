/* eslint-disable array-callback-return */
import { Button, Input, PageHeader, Typography } from 'antd';
import React, { ChangeEvent } from 'react';
import { logout } from '../../../store/auth/actions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { searchFilter } from '../../../store/filters/actions';
import { userData } from '../../../store/user/actions';
import "./CartHeader.less"
import { Link } from 'react-router-dom';
import { AUTH_PATH, PUBLIC_PATH } from '../../../routing/names';

const { Title } = Typography;

const { AUTH } = AUTH_PATH;
const { NOTFOUND } = PUBLIC_PATH;

const CartHeader: React.FC = () => {
    const dispatch = useDispatch();
    const search = useSelector((state: RootStateOrAny) => state.filterReducer.filterSearch);
    const user = useSelector((state: RootStateOrAny) => state.userReducer.user);
    const orders = useSelector((state: RootStateOrAny) => state.orderReducer.orders);
    const showModal = () => {
        if (user.isAuth === true) {
            dispatch(logout(user.isAuth));
            dispatch(userData({ isAuth: false, role: "guest" }))
            localStorage.setItem("orders", JSON.stringify(orders))
        }
    }

    return (
        <div className="cart__header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title><Link to={user.role === 'user' && user.isAuth ? AUTH : NOTFOUND}>Shop</Link></Title>
                    <div className='header__user'>
                        <Input onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            dispatch(searchFilter(e.target.value))
                        }
                            placeholder="input search text"
                            value={search} />
                        <Button onClick={showModal}>{user.isAuth ? "Выйти" : "Войти"}</Button>
                    </div>
                </div>
            </PageHeader>
        </div>
    );
}

export default CartHeader;