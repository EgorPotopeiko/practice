import * as Yup from "yup";

const internetSchema = Yup.object().shape({
    channels: Yup.array(),
    kpis: Yup.array(),
    imageId: Yup.string()
});

export default internetSchema



