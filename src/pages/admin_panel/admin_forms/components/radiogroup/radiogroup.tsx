import React from "react";
import { Radio } from "formik-antd";

const FormikRadioGroup = (props: any) => {
    const { name, radioData, ...rest } = props
    return (
        <div className="formik__radio">
            <Radio.Group name={name} {...rest}>
                {radioData.map((radio: {
                    id: string,
                    value: string
                }) => (
                    <Radio name={radio.value} key={radio.id} value={radio.id}>{radio.value}</Radio>
                ))}
            </Radio.Group>
        </div>
    )
}

export default FormikRadioGroup