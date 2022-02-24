import React from 'react';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/admin/Menu';
import AdminData from './adminData/AdminData';

const AdminPanel: React.FC = () => {
    return (
        <div className="adminPanel">
            <Header />
            <Menu />
            <AdminData />
        </div>
    );
}

export default AdminPanel;