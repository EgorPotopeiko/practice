import { Button, Input, Select } from 'antd';
import React from 'react';
import './products_filters.less';
import { useDispatch, useSelector } from 'react-redux';
import { selectListCategories } from '../../../../store/category/selectors';
import { TMenuState } from '../../../../components/menu/Menu';
import { OpenModalAction } from '../../../../store/modals/actions';

type Props = {
    handlerFilter: (type: keyof TMenuState) => (value: string | boolean) => void
}

const { Option } = Select;

const ProductsFilter: React.FC<Props> = ({ handlerFilter }) => {
    const dispatch = useDispatch();
    const categoryValues = useSelector(selectListCategories);
    return (
        <div className="admin__filters">
            <div className='admin__filters-block'>
                <Input placeholder="Название" onChange={(e) => handlerFilter("searchName")(e.target.value)} />
                <Input type='number' placeholder="Артикул" onChange={(e) => handlerFilter("searchArticle")(e.target.value)} />
                <Select placeholder="Категория" onChange={(category) => handlerFilter("searchCategory")(category)}>
                    {categoryValues.map((item: any) => (
                        <Option key={item} value={item}>{item}</Option>
                    ))}
                </Select>
            </div>
            <div className='admin__filters-btns'>
                <Button type='default' onClick={() => { dispatch(OpenModalAction("CreateProduct")) }}>Добавить новый товар</Button>
            </div>
        </div >
    );
}

export default ProductsFilter;