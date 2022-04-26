import React from "react";
import { DatePicker as FormDate } from "formik-antd";
import './datepicker.less';

const DatePicker = (props: any) => {
    const { name, format, ...rest } = props;
    return (
        <div className="formik__datepicker">
            <FormDate name={name} format={format} {...rest} />
        </div>
    )
}

export default DatePicker