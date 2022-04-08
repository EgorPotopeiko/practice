import React from 'react';
import Header from '../../components/header';
import Menu from '../../components/menu';

const AdminPanel: React.FC = () => {
    return (
        <div className="admin__panel">
            <Header />
            <Menu />
        </div>
    );
}

export default AdminPanel;