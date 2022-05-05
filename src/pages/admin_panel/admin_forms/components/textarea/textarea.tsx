import React from "react";
import { Form, Input } from "formik-antd";

const FormikTextArea = (props: any) => {
    const { name, ...rest } = props
    return (
        <div className="formik__textarea">
            <Form.Item name={name}>
                <Input.TextArea name={name} {...rest} />
            </Form.Item>
        </div>
    )
}

export default FormikTextArea