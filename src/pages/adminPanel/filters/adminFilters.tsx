import { Input, Select } from 'antd';
import React from 'react';
import './adminFilters.less';

interface Props {
    setSearchName: any,
    setSearchArticle: any,
    setSearchCategory: any,
    setSearchStatus: any
}

const selectValues = ["ALL", "CATS", "DOGS", "FISHES", "BIRDS", "RODENTS", "OTHER"];

const { Option } = Select;

const AdminFilters: React.FC<Props> = ({ setSearchName, setSearchArticle, setSearchCategory, setSearchStatus }) => {
    return (
        <div className="admin__filters">
            <Input placeholder="Название" onChange={(e) => setSearchName(e.target.value)} />
            <Input placeholder="Артикул" onChange={(e) => setSearchArticle(e.target.value)} />
            <Select placeholder="Категория" onChange={(category) => setSearchCategory(category)}>
                {selectValues.map((item) => (
                    <Option key={item} value={item}>{item}</Option>
                ))}
            </Select>
            <Select placeholder="Статус" onChange={(status) => setSearchStatus(status)}>
                <Option key="true" value={true}>{"Есть на складе"}</Option>
                <Option key="false" value={false}>{"Нет на складе"}</Option>
            </Select>
        </div>
    );
}

export default AdminFilters;