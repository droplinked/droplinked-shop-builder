import axiosInstance from "../axiosConfig";
import { IrecordCasperService } from "./interfaces";

export const recordCasperService = (props: IrecordCasperService) => {
    return axiosInstance.post(`sku/record/casper`, props)
}