import { Tabs } from 'antd';
import React from 'react';
import './Menu.less';

const { TabPane } = Tabs;

const Menu: React.FC = () => {
    return (
        <div className="menu__catalog">
            <Tabs defaultActiveKey="1" type="card">
                <TabPane></TabPane>
            </Tabs>
        </div>
    );
}

export default Menu;