import { Tabs } from 'antd';
import React from 'react';
import './Menu.less';
import { useDispatch } from 'react-redux';
import { categoryFilter } from '../../../store/filters/actions';

const { TabPane } = Tabs;

const userTabs = ["ALL", "CATS", "DOGS", "FISH", "BIRDS", "RODENTS", "OTHER"];

const Menu: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <div className="menu__catalog">
            <Tabs defaultActiveKey="1" type="card" onChange={(category) => dispatch(categoryFilter(category))}>
                {userTabs.map((item) => (
                    <TabPane tab={item} key={item.toLowerCase()} />
                ))}
            </Tabs>
        </div>
    );
}

export default Menu;