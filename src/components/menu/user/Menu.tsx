import { Tabs } from 'antd';
import React from 'react';
import './Menu.less';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { categoryFilter } from '../../../store/filters/actions';

const { TabPane } = Tabs;

const Menu: React.FC = () => {
    const userTabs = useSelector((state: RootStateOrAny) => state.filterReducer.listCategories);
    const dispatch = useDispatch();
    return (
        <div className="menu__catalog">
            <Tabs defaultActiveKey="1" type="card" onChange={(category) => dispatch(categoryFilter(category))}>
                {userTabs.map((item: any) => (
                    <TabPane tab={item.toUpperCase()} key={item.toLowerCase()} />
                ))}
            </Tabs>
        </div>
    );
}

export default Menu;