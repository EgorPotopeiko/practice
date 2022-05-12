import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Input, Select } from 'antd';
import { selectFiltersAdmin } from '../../../../store/filters_admin/selectors';
import { GetFiltersAdmin } from '../../../../store/filters_admin/actions';
import './order_filters.less';

const statusValues = ["оплачен", "доставлен", "в пути", "оформлен"];

const { Option } = Select;

const OrderFilters: FC = () => {
    const { chooseStatus, searchNumber, searchStatus, searchUser, searchArticle } = useSelector(selectFiltersAdmin);
    return (
        <div className="order__filters">
            <Select placeholder="Статус" onChange={(status) => GetFiltersAdmin(searchArticle, searchStatus, status, searchUser, searchNumber)}>
                {statusValues.map((status) => <Option key={status} value={status}>{status}</Option>)}
            </Select>
            <Input placeholder="Пользователь" onChange={(e) => GetFiltersAdmin(searchArticle, searchStatus, chooseStatus, e.target.value, searchNumber)} />
            <Input placeholder="Номер заказа" onChange={(e) => GetFiltersAdmin(searchArticle, searchStatus, chooseStatus, searchUser, e.target.value)} />
        </div>
    );
}

export default OrderFilters;