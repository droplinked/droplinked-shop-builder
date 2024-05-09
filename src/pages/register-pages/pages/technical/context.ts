import { IAuthSupportedWalletsService } from "lib/apis/auth/interfaces";
import { createContext } from "react";

export const technicalContextState = {
    imsType: 'DROPLINKED',
    paymentMethods: [],
    loginMethods: [],
}

interface IStates {
    imsType: string;
    paymentMethods: Array<any>;
    loginMethods: Array<IAuthSupportedWalletsService>;
}

interface IProps {
    state: IStates
    // userPayments: any
    updateState: Function
    // updatePayment: Function
}

const technicalContext = createContext<IProps>({
    state: technicalContextState,
    // userPayments: [],
    updateState: () => { },
    // updatePayment: () => { }
})

export default technicalContext