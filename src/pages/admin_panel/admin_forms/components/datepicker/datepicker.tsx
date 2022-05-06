import React from "react";
import { DatePicker as FormDate, Form } from "formik-antd";
import './datepicker.less';

const FormikDatePicker = (props: any) => {
    const { name, format, placeholder } = props;
    return (
        <div className="formik__datepicker">
            <Form.Item name={name}>
                <FormDate name={name} format={format} placeholder={placeholder} />
            </Form.Item>
        </div>
    )
}

export default FormikDatePicker