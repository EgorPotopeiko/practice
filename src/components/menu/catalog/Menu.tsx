import { Tabs } from 'antd';
import React from 'react';
import './Menu.less';

const { TabPane } = Tabs;

const Menu: React.FC = () => {
    return (
        <div className="menu__catalog">
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="ВСЕ КАТЕГОРИИ" key="1">
                    Content of card tab 1
                </TabPane>
                <TabPane tab="КОШКИ" key="2">
                    Content of card tab 2
                </TabPane>
                <TabPane tab="СОБАКИ" key="3">
                    Content of card tab 3
                </TabPane>
                <TabPane tab="РЫБКИ" key="4">
                    Content of card tab 4
                </TabPane>
                <TabPane tab="ГРЫЗУНЫ" key="5">
                    Content of card tab 5
                </TabPane>
                <TabPane tab="ЗМЕИ" key="6">
                    Content of card tab 6
                </TabPane>
                <TabPane tab="НАСЕКОМЫЕ" key="7">
                    Content of card tab 7
                </TabPane>
                <TabPane tab="ДРУГОЕ" key="8">
                    Content of card tab 8
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Menu;