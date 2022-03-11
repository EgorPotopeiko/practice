import React, { useEffect } from 'react';
import CartHeader from '../../components/header/CartHeader/CartHeader';
import Menu from '../../components/menu/admin/Menu';

const AdminPanel: React.FC = () => {
    useEffect(() => {
        localStorage.getItem("orders");
    }, [])
    return (
        <div className="adminPanel">
            <CartHeader />
            <Menu />
        </div>
    );
}

export default AdminPanel;