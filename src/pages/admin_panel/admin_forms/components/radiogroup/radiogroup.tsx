import React from "react";
import { Form, Radio } from "formik-antd";

const FormikRadioGroup = (props: any) => {
    const { name, radioData, required, ...rest } = props
    return (
        <div className="formik__radio">
            <Form.Item name={name} required={required}>
                <Radio.Group name={name} {...rest}>
                    {radioData.map((radio: {
                        id: string,
                        value: string
                    }) => (
                        <Radio name={radio.value} key={radio.id} value={radio.id}>{radio.value}</Radio>
                    ))}
                </Radio.Group>
            </Form.Item>
        </div>
    )
}

export default FormikRadioGroup