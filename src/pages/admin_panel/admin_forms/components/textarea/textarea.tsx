import React from "react";
import { Form, Input } from "formik-antd";

const FormikTextArea = (props: any) => {
    const { name, placeholder } = props
    return (
        <div className="formik__textarea">
            <Form.Item name={name}>
                <Input.TextArea name={name} placeholder={placeholder} />
            </Form.Item>
        </div>
    )
}

export default FormikTextArea