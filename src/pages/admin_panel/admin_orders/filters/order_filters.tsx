import React, { FC } from 'react';
import { Input, Select } from 'antd';
import { TMenuState } from '../../../../components/menu/menu';
import './order_filters.less';

type Props = {
    handlerFilter: (type: keyof TMenuState) => (value: string | boolean) => void
}

const statusValues = ["оплачен", "доставлен", "в пути", "оформлен"];

const { Option } = Select;

const OrderFilters: FC<Props> = ({ handlerFilter }) => {
    return (
        <div className="order__filters">
            <Select placeholder="Статус" onChange={(status) => handlerFilter("chooseStatus")(status)}>
                {statusValues.map((status) => <Option key={status} value={status}>{status}</Option>)}
            </Select>
            <Input placeholder="Пользователь" onChange={(e) => handlerFilter("searchUser")(e.target.value)} />
            <Input placeholder="Номер заказа" onChange={(e) => handlerFilter("searchNumber")(e.target.value)} />
        </div>
    );
}

export default OrderFilters;