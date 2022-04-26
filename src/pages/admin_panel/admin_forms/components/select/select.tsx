import React from "react";
import { Select as FormSelect } from "formik-antd";

const { Option } = FormSelect;

const Select = (props: any) => {
    const { name, options, mode, ...rest } = props
    return (
        <div className="formik__select">
            <FormSelect name={name} mode={mode} {...rest}>
                {
                    options.map((option: any) => (
                        <Option key={option.id} value={option.value}>{option.value}</Option>
                    ))
                }
            </FormSelect>
        </div>
    )
}

export default Select