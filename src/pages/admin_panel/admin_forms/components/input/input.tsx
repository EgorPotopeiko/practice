import React from "react";
import { Input as FormInput } from "formik-antd";
import './input.less';

const FormikInput = (props: any) => {
    const { name, ...rest } = props
    return (
        <div className="formik__input">
            <FormInput name={name} {...rest} />
        </div>
    )
}

export default FormikInput