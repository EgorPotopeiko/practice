import React from "react";
import { Select as FormSelect } from "formik-antd";
import './select.less';

const { Option } = FormSelect;

const FormikSelect = (props: any) => {
    const { name, options, mode, ...rest } = props
    return (
        <div className="formik__select">
            <FormSelect name={name} mode={mode} {...rest}>
                {
                    options.map((option: any) => (
                        <Option key={option.value} value={option.value}>{option.key}</Option>
                    ))
                }
            </FormSelect>
        </div>
    )
}

export default FormikSelect