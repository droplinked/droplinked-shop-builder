import { createQueryString } from "../_utils/with.query"
import axiosInstance from "../axiosConfig"
import { ChangelogQueryParams, ChangelogResponse } from "./interfaces"

export const getChangelogEntries = (params: ChangelogQueryParams) => {
    const queryParams = createQueryString(params).toString()
    return axiosInstance.get<ChangelogResponse>(`admin/public/changelog?${queryParams}`).then(res => res.data)
}
