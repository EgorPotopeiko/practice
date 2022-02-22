import { PageHeader, Typography } from 'antd';
import React from 'react';
import './Header.less';

const { Title } = Typography;

const HeaderCatalog: React.FC = () => {
    return (
        <div className="header">
            <PageHeader>
                <Title>Todo Practice</Title>
            </PageHeader>
        </div>
    );
}

export default HeaderCatalog;