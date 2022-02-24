import { Tabs } from 'antd';
import React from 'react';
import './Menu.less';

const { TabPane } = Tabs;

const userTabs = ["ВСЕ КАТЕГОРИИ", "КОШКИ", "СОБАКИ", "РЫБКИ", "ГРЫЗУНЫ", "ЗМЕИ", "НАСЕКОМЫЕ", "ДРУГОЕ"];

const Menu: React.FC = () => {
    return (
        <div className="menu__catalog">
            <Tabs defaultActiveKey="1" type="card">
                {userTabs.map((item) => (
                    <TabPane tab={item} key={item} />
                ))}
            </Tabs>
        </div>
    );
}

export default Menu;