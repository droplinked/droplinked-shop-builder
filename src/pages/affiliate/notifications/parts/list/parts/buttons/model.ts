import { binanceApproveRequest } from "lib/utils/blockchain/binance/approve"
import { BinanceMetamaskLogin } from "lib/utils/blockchain/binance/metamaskLogin"
import { approve_request_polygon } from "lib/utils/blockchain/polygon/approve"
import { PolygonLogin } from "lib/utils/blockchain/polygon/metamaskLogin"
import { XRPApproveRequest } from "lib/utils/blockchain/ripple/xrpApprove"
import { XRPLogin } from "lib/utils/blockchain/ripple/xrpLogin"

interface IApprove {
    chain: "POLYGON" | "RIPPLESIDECHAIN" | "BINANCE"
    requestID: string
}

const notificationsButtonsModel = ({
    approve: async ({ chain, requestID }: IApprove) => {
        let methods = {
            login: null,
            request: null
        }

        switch (chain) {
            case 'POLYGON':
                methods = {
                    login: PolygonLogin,
                    request: approve_request_polygon
                }
                break;
            case 'RIPPLESIDECHAIN':
                methods = {
                    login: XRPLogin,
                    request: XRPApproveRequest
                }
                break;
            case 'BINANCE':
                methods = {
                    login: BinanceMetamaskLogin,
                    request: binanceApproveRequest
                }
                break;

        }

        const login = await methods.login()
        const request = await methods.request(login.address, requestID)
        return request
    }
})

export default notificationsButtonsModel