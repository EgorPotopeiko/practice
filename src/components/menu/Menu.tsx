import { Tabs } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiltersActionTypes } from '../../store/filters/action-types';
import { selectFilters, selectUserMenu } from '../../store/filters/selectors';
import './Menu.less';

const { TabPane } = Tabs;

const Menu: React.FC = () => {
    const userTabs = useSelector(selectUserMenu)
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters)
    return (
        <div className="menu__catalog">
            <Tabs defaultActiveKey="1" type="card" onChange={(category: string) => dispatch({
                type: FiltersActionTypes.SET_FILTERS,
                ...filters,
                category: category
            })}>
                {userTabs.map((item: any) => (
                    <TabPane tab={item.toUpperCase()} key={item.toLowerCase()} />
                ))}
            </Tabs>
        </div>
    );
}

export default Menu;