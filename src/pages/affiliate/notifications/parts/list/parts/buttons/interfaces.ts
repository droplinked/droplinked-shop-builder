namespace requestInterfaces {
    export type IApproveStatus = "accept" | "reject"
    export type IRequestStatus = IApproveStatus | null

    export interface IStates {
        status: IRequestStatus
        loading: boolean
    }

    export interface Iprops {
        shop: any
        refetch: Function
    }
}

export default requestInterfaces