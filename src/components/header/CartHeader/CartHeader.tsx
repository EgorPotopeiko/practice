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
    const auth = useSelector((state: RootStateOrAny) => state.authReducer.isAuth);
    const search = useSelector((state: RootStateOrAny) => state.filterReducer.filterSearch);
    const role = useSelector((state: RootStateOrAny) => state.userReducer.user.role);
    const showModal = () => {
        if (auth === true) {
            dispatch(logout(auth));
            dispatch(userData({ role: "guest" }))
        }
    }

    return (
        <div className="cart__header">
            <PageHeader>
                <div className='header__wrap'>
                    <Title><Link to={role === 'user' && auth ? AUTH : NOTFOUND}>Shop</Link></Title>
                    <div className='header__user'>
                        <Input onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            dispatch(searchFilter(e.target.value))
                        }
                            placeholder="input search text"
                            value={search} />
                        <Button onClick={showModal}>{auth ? "Выйти" : "Войти"}</Button>
                    </div>
                </div>
            </PageHeader>
        </div>
    );
}

export default CartHeader;