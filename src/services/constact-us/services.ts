import axiosInstance from "lib/axiosConfig";

export const contactUsService = (data: IContactUs) => axiosInstance.post("email/contact-us", data)