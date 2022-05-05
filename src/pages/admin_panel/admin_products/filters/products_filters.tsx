import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Select } from 'antd';
import { selectListCategories } from '../../../../store/category/selectors';
import { OpenModalAction } from '../../../../store/modals/actions';
import { TCategory } from '../../../../models/category';
import { TMenuState } from "../../../../components/menu/menu";
import './products_filters.less';
import { selectFilters } from '../../../../store/filters/selectors';
import { GetFilters } from '../../../../store/filters/actions';

type Props = {
    handlerFilter: (type: keyof TMenuState) => (value: string | boolean) => void
}

const { Option } = Select;

const ProductsFilter: FC<Props> = ({ handlerFilter }) => {
    const categoryValues = useSelector(selectListCategories);
    const { category, price, search } = useSelector(selectFilters);
    const dispatch = useDispatch();
    const handleSubmit = (categoryFilter: string) => {
        const result = categoryValues.find((category: TCategory) => category.title === categoryFilter)
        dispatch(GetFilters(search, price, [result.id]))
    }
    return (
        <div className="admin__filters">
            <div className='admin__filters-block'>
                <Input placeholder="Название" onChange={(e) => dispatch(GetFilters(e.target.value, price, category))} />
                <Input
                    type='number'
                    placeholder="Артикул"
                    onChange={(e) => handlerFilter("searchArticle")(e.target.value)} />
                <Select placeholder="Категория" onChange={handleSubmit}>
                    {categoryValues.map((category: TCategory) =>
                        <Option key={category.title} value={category.title}>{category.title}</Option>)}
                </Select>
            </div>
            <div className='admin__filters-btns'>
                <Button type='default' onClick={() => { dispatch(OpenModalAction("CreateProduct")) }}>Добавить новый товар</Button>
            </div>
        </div >
    );
}

export default ProductsFilter;