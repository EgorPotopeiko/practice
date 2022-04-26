import React from "react";
import { Radio } from "formik-antd";

const RadioGroup = (props: any) => {
    const { name, radioData, ...rest } = props
    return (
        <div className="formik__radio">
            <Radio.Group name={name} {...rest}>
                {radioData.map((radio: any) => (
                    <Radio name={radio.value} key={radio.id} value={radio.value}>{radio.value}</Radio>
                ))}
            </Radio.Group>
        </div>
    )
}

export default RadioGroup