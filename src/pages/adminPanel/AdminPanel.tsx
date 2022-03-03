import React from 'react';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/admin/Menu';

const AdminPanel: React.FC = () => {
    return (
        <div className="adminPanel">
            <Header />
            <Menu />
        </div>
    );
}

export default AdminPanel;