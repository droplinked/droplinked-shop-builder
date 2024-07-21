import { AccountChangedException, WalletNotFoundException } from '../../chainProvider'
import { ProductType, Beneficiary, RecordData, Uint256 } from '../../dto/chainStructs'
import { Chain, ChainWallet, Network } from '../../dto/chains'
import { ModalInterface, defaultModal } from '../../dto/modalInterface'
import { RecordProduct } from '../../dto/recordDTO'
import { SolanaApproveRequest } from './approve.solana'
import { SolanDeployShop } from './deployShop.solana'
import { SolanaLogin } from './login.solana'
import { SolanaRecordMerch } from './record.solana'

export class SolanaProvider {
	chain: Chain = Chain.SOLANA
	network: Network = Network.TESTNET
	address = ''
	modalInterface: ModalInterface = new defaultModal()
	wallet = ChainWallet.Phantom

	constructor(_chain: Chain, _network: Network) {
		this.chain = _chain
		this.network = _network
	}

	setWallet(_wallet: ChainWallet): SolanaProvider {
		this.wallet = _wallet
		return this
	}

	setModal(_modalInterface: ModalInterface): SolanaProvider {
		this.modalInterface = _modalInterface
		return this
	}

	setAddress(_address: string): SolanaProvider {
		this.address = _address
		return this
	}

	isPhantomInstalled() {
		return (window as any).phantom?.solana?.isPhantom
	}

	getPhantomProvider() {
		if (!this.isPhantomInstalled())
			throw new WalletNotFoundException('Phantom wallet is not installed')

		const provider = (window as any).phantom.solana
		if (!provider.isPhantom) throw new WalletNotFoundException('Phantom wallet is not installed')

		return provider
	}

	async walletLogin(): Promise<{ address: string; signature: string }> {
		const { address, signature } = await SolanaLogin(this.getPhantomProvider(), this.modalInterface)
		this.setAddress(address)

		return { address, signature }
	}

	async handleWallet(_address: string) {
		if (!this.isPhantomInstalled()) {
			this.modalInterface.error('Phantom wallet is not installed')
			throw new WalletNotFoundException('Phantom wallet  is not installed')
		}
		this.modalInterface.waiting('Getting accounts...')
		const provider = this.getPhantomProvider()
		if (!provider.isConnected) {
			this.modalInterface.waiting('Please connect your wallet')
			let { address } = await this.walletLogin()
			if (_address.toLocaleLowerCase() !== address.toLocaleLowerCase()) {
				throw new AccountChangedException(
					"The current account on your wallet is not the one you've logged in with!"
				)
			}
		}
		const { publicKey } = await provider.connect()
		if (publicKey.toString().toLocaleLowerCase() !== _address.toLocaleLowerCase()) {
			throw new AccountChangedException(
				"The current account on your wallet is not the one you've logged in with!"
			)
		}
		this.modalInterface.success('Wallet connected')
	}

	deployShop(
		shopName: string,
		shopAddress: string,
		shopOwner: string,
		shopLogo: string,
		shopDescription: string
	): Promise<any> {
		this.handleWallet(this.address)
		return SolanDeployShop(
			this.getPhantomProvider(),
			this.address,
			{
				name: shopName,
				address: shopAddress,
				logo: shopLogo,
				owner: shopOwner,
				description: shopDescription,
			},
			process.env.REACT_APP_RECORD_MATCH_POLYGON_RIPPLE,
			this.modalInterface
		)
	}

	recordProduct(
		sku_properties: any,
		product_title: string,
		description: string,
		image_url: string,
		price: number,
		amount: number,
		commission: number,
		type: ProductType,
		beneficiaries: Beneficiary[],
		acceptsManageWallet: boolean,
		royalty: number,
		nftContract: string,
		shopAddress: string,
		currencyAddress: string,
		apiKey: string
	): Promise<RecordData> {
		this.handleWallet(this.address)
		return SolanaRecordMerch(
			this.getPhantomProvider(),
			sku_properties,
			this.address,
			{
				title: product_title,
				description: description,
				image_url: image_url,
				price: price,
				amount: amount,
				commission: commission,
				royalty: royalty,
				type: type,
			},
			shopAddress,
			currencyAddress,
			apiKey,
			this.modalInterface
		)
	}

	recordBatch(products: RecordProduct[], shopAddress: string, nftContract: string, apiKey: string): Promise<RecordData> {
		throw new Error("Method not implemented.");
	}

	publishRequest(
		productId: Uint256,
		shopAddress: string
	): Promise<{ transactionHash: string; requestId: Uint256; publisher: string }> {
		this.handleWallet(this.address)
		return Promise.resolve({
			publisher: this.address,
			requestId: this.address,
			transactionHash: this.address,
		})
	}

	approveRequest(shop: any, sku: any, recordData: any): Promise<string> {
		this.handleWallet(this.address)
		return SolanaApproveRequest(
			this.getPhantomProvider(),
			shop,
			sku,
			this.address,
			recordData,
			this.modalInterface
		)
	}
}
