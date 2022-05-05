import React from "react";
import { Form, Input as FormInput } from "formik-antd";
import './input.less';

const FormikInput = (props: any) => {
    const { name, ...rest } = props
    return (
        <div className="formik__input">
            <Form.Item name={name}>
                <FormInput name={name} {...rest} />
            </Form.Item>
        </div>
    )
}

export default FormikInput