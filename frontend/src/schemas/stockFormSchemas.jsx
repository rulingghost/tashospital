import * as yup from "yup"

export const stockFormSchemas = yup.object().shape({
    stock_name: yup.string().required(),
    stock_buyed: yup.number().positive().integer().required(),
    // stock_haved: yup.number(),
    stock_skt: yup.string().required(),
    stock_group: yup.string()
})