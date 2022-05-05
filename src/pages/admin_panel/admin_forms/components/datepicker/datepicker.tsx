import React from "react";
import { DatePicker as FormDate, Form } from "formik-antd";
import './datepicker.less';

const FormikDatePicker = (props: any) => {
    const { name, format, ...rest } = props;
    return (
        <div className="formik__datepicker">
            <Form.Item name={name}>
                <FormDate name={name} format={format} {...rest} />
            </Form.Item>
        </div>
    )
}

export default FormikDatePicker