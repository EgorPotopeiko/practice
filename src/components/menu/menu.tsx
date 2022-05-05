import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectUserStatus } from '../../store/login/selectors';
import './menu.less';
import MenuAdmin from './menu_admin/menu_admin';
import MenuUser from './menu_user/menu_user';

export type TMenuState = {
    searchArticle: string,
    searchStatus: boolean,
    chooseStatus: "оплачен" | string,
    searchUser: string,
    searchNumber: string
}

const Menu: FC = () => {
    const { user } = useSelector(selectUserStatus);

    return (
        <div className="menu__catalog">
            {user.role === "ADMIN" &&
                <MenuAdmin />
            }
            {(user.role === "USER" || user.role === "GUEST") &&
                <MenuUser />
            }
        </div>
    );
}

export default Menu;