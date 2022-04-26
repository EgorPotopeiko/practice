import React from "react";
import { Input } from "formik-antd";

const TextArea = (props: any) => {
    const { name, ...rest } = props
    return (
        <div className="formik__textarea">
            <Input.TextArea name={name} {...rest} />
        </div>
    )
}

export default TextArea