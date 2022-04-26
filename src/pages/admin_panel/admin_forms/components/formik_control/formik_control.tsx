import React from "react"
import DatePicker from "../datepicker/datepicker";
import Input from "../input/input";
import RadioGroup from "../radiogroup/radiogroup";
import Select from "../select/select";
import TextArea from "../textarea/textarea";

const FormikControl = (props: any) => {
    const { control, ...rest } = props;
    switch (control) {
        case 'input': return <Input {...rest} />
        case 'textarea': return <TextArea {...rest} />
        case 'select': return <Select {...rest} />
        case 'date': return <DatePicker {...rest} />
        case 'radio': return <RadioGroup {...rest} />
        default: return null
    }
}

export default FormikControl