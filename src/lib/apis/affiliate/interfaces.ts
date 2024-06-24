export interface IcasperRequestService {
	params: {
		shopID: string
		productID: string
		deploy_hash: string
		skuID: string
		quantity: number
	}
	chain: string
}

export interface ISolanaRequestService {
	params: {
		shopID: string
		productID: string
		deploy_hash: string
		skuID: string
		quantity: number
		affiliateData: object
	}
	chain: string
}

export type IApproveRequestService = 'ACCEPTED' | 'REJECTED'

export interface IacceptRejectRequestService {
	chain: string
	params: {
		deploy_hash?: string
		requestID: string
		status: IApproveRequestService
	}
}

export interface IproducerRequestService {
	page: any
}

export interface IpublisherRequestService {
	page: any
}
