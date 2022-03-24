import { Input, Select } from 'antd';
import React from 'react';
import './OrderFilters.less';

const selectValues = ["оплачен", "доставлен", "в пути", "оформлен"];

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