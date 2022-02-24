import { Tabs } from 'antd';
import React from 'react';
import './Menu.less';

const { TabPane } = Tabs;

const adminTabs = ["ТОВАРЫ", "КАТЕГОРИИ", "ЗАКАЗЫ"];

const Menu: React.FC = () => {
    return (
        <div className="menu__catalog">
            <Tabs defaultActiveKey="1" type="card">
                {adminTabs.map((item) => {
                    return (
                        <TabPane tab={item} key={item} />
                    )
                })}
            </Tabs>
        </div>
    );
}

export default Menu;