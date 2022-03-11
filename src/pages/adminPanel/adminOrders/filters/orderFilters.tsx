import { Input, Select } from 'antd';
import React from 'react';
import './orderFilters.less';

interface Props {
    setChooseStatus: React.Dispatch<React.SetStateAction<string>>,
    setSearchUser: React.Dispatch<React.SetStateAction<string>>,
    setSearchNumber: React.Dispatch<React.SetStateAction<string>>
}

const selectValues = ["оплачен", "доставлен", "в пути", "оформлен"];

const { Option } = Select;

const OrderFilters: React.FC<Props> = ({ setChooseStatus, setSearchNumber, setSearchUser }) => {
    return (
        <div className="admin__filters">
            <Select placeholder="Статус" defaultValue="оплачен" onChange={(status) => setChooseStatus(status)}>
                {selectValues.map((item) => (
                    <Option key={item} value={item}>{item}</Option>
                ))}
            </Select>
            <Input placeholder="Пользователь" onChange={(e) => setSearchUser(e.target.value)} />
            <Input placeholder="Номер заказа" onChange={(e) => setSearchNumber(e.target.value)} />

        </div>
    );
}

export default OrderFilters;