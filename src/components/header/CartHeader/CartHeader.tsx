/* eslint-disable array-callback-return */
import { Button, Input, PageHeader, Typography } from 'antd';
import React, { ChangeEvent } from 'react';
import { logout } from '../../../store/auth/actions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { searchFilter } from '../../../store/filters/actions';
import ProductsDB from '../../../services';
import { userData } from '../../../store/user/actions';
import "./CartHeader.less"

const { Title } = Typography;

const CartHeader: React.FC = () => {
    const database = new ProductsDB();
    const dispatch = useDispatch();
    const auth = useSelector((state: RootStateOrAny) => state.authReducer.isAuth);
    const search = useSelector((state: RootStateOrAny) => state.filterReducer.filterSearch);
    const firstName = useSelector((state: RootStateOrAny) => state.userReducer.user.firstName);
    const lastName = useSelector((state: RootStateOrAny) => state.userReducer.user.lastName);

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
                    <Title>Shop</Title>
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