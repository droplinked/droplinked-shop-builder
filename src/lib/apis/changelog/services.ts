import { createQueryString } from "../_utils/with.query"
import axiosInstance from "../axiosConfig"
import { ChangelogEntry, ChangelogQueryParams, ChangelogResponse } from "./interfaces"

export const getChangelogEntries = (params: ChangelogQueryParams) => {
    const queryParams = createQueryString(params).toString()
    return axiosInstance.get<ChangelogResponse>(`admin/public/changelog?${queryParams}`).then(res => res.data)
}

export const getChangelogEntry = (id: string) => {
    return axiosInstance.get<{ data: ChangelogEntry }>(`admin/changelog/${id}`).then(res => res.data)
}
