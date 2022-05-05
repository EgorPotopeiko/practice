import React from "react";
import { Form, Select as FormSelect } from "formik-antd";
import './select.less';

const { Option } = FormSelect;

const FormikSelect = (props: any) => {
    const { name, options, mode, ...rest } = props
    return (
        <div className="formik__select">
            <Form.Item name={name}>
                <FormSelect name={name} mode={mode} {...rest}>
                    {
                        options.map((option: {
                            key: string,
                            value: string
                        }) => (
                            <Option key={option.value} value={option.value}>{option.key}</Option>
                        ))
                    }
                </FormSelect>
            </Form.Item>
        </div>
    )
}

export default FormikSelect