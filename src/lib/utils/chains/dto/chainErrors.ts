import { EthAddress, Uint256 } from "./chainStructs";

export class AlreadyRequested {
    public readonly message: string = "";
    public readonly requestId: Uint256 = 0;
    public readonly publisher: EthAddress = "";
    constructor(productId: Uint256, requester: EthAddress) {
        this.message = `Request for ${productId} from ${requester} already exists`;
        this.publisher = requester;
        this.requestId = productId;
    }
}

export class Unauthorized {
    public readonly message: string = "";
    public readonly method: string = "";
    public readonly from: EthAddress = "";
    public readonly to: EthAddress = "";
    constructor(method: string, from: EthAddress, to: EthAddress) {
        this.message = "Unauthorized";
        this.method = method;
        this.from = from;
        this.to = to;
    }
}