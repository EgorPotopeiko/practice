import React from "react";
import { Input } from "formik-antd";

const FormikTextArea = (props: any) => {
    const { name, ...rest } = props
    return (
        <div className="formik__textarea">
            <Input.TextArea name={name} {...rest} />
        </div>
    )
}

export default FormikTextArea