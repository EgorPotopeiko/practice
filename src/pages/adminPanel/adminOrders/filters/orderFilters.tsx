import { Input, Select } from 'antd';
import React from 'react';
import './orderFilters.less';

const selectValues = ["Оплачен", "Доставлен", "В пути", "Оформлен"];

const { Option } = Select;

const OrderFilters: React.FC = () => {
    return (
        <div className="admin__filters">
            <Select placeholder="Статус">
                {selectValues.map((item) => (
                    <Option key={item} value={item}>{item}</Option>
                ))}
            </Select>
            <Input placeholder="Пользователь" />
            <Input placeholder="Номер заказа" />

        </div>
    );
}

export default OrderFilters;