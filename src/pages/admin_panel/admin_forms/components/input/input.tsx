import React from "react";
import { Form, Input as FormInput } from "formik-antd";
import './input.less';

const FormikInput = (props: any) => {
    const { name, type, placeholder, required, disabled } = props
    return (
        <div className="formik__input">
            <Form.Item name={name}>
                <FormInput name={name} type={type} placeholder={placeholder} required={required} disabled={disabled} />
            </Form.Item>
        </div>
    )
}

export default FormikInput