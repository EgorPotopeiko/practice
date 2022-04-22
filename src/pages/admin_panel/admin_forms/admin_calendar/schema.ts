import * as Yup from "yup";

const calendarSchema = Yup.object().shape({
    contentThematics: Yup.array(),
    contentDirection: Yup.string(),
    contentFormats: Yup.array()
});

export default calendarSchema



