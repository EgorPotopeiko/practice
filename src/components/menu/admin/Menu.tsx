import { Tabs } from 'antd';
import React from 'react';
import './Menu.less';

const { TabPane } = Tabs;

const Menu: React.FC = () => {
    return (
        <div className="menu__admin">
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="ТОВАРЫ" key="1">
                    Content of card tab 1
                </TabPane>
                <TabPane tab="КАТЕГОРИИ" key="2">
                    Content of card tab 2
                </TabPane>
                <TabPane tab="ЗАКАЗЫ" key="3">
                    Content of card tab 3
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Menu;