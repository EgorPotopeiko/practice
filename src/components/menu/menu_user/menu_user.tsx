import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { GetFilters } from '../../../store/filters/actions';
import { selectFilters } from '../../../store/filters/selectors';
import { selectListCategories } from '../../../store/category/selectors';
import { GetPage } from '../../../store/products/actions';
import { selectPageStatus } from '../../../store/products/selectors';
import { TCategory } from '../../../models/category';
import './menu_user.less';

const { TabPane } = Tabs;

export type TMenuState = {
    searchArticle: string,
    searchStatus: boolean,
    chooseStatus: "оплачен" | string,
    searchUser: string,
    searchNumber: string
}

const MenuUser: FC = () => {
    const { pageSize } = useSelector(selectPageStatus);
    const userTabs = useSelector(selectListCategories);
    const { price, search } = useSelector(selectFilters);
    const dispatch = useDispatch();
    //handlers
    const handler = (categories: string) => {
        const putCategory = [];
        const findCategory = userTabs.find((category: TCategory) => category.title === categories);
        putCategory.push(findCategory.id);
        dispatch(GetPage(1, pageSize));
        dispatch(GetFilters(search, price, putCategory));
    }

    return (
        <Tabs
            defaultActiveKey="1"
            type="card"
            onChange={(categories: string) => handler(categories)}>
            {userTabs.map((category: TCategory) => (
                <TabPane tab={category.title} key={category.title} />
            ))}
        </Tabs>
    );
}

export default MenuUser;