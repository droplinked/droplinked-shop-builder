import { ChainProvider, WalletNotFoundException } from '../../chainProvider'
import { Chain, ChainWallet, Network } from '../../dto/chains'
import { ModalInterface, defaultModal } from '../../dto/modalInterface'
import { SolanaLogin } from './login.solana'

export class SolanaProvider implements ChainProvider {
	chain: Chain = Chain.SOLANA
	network: Network = Network.TESTNET
	address = ''
	modalInterface: ModalInterface = new defaultModal()
	wallet = ChainWallet.Phantom

	constructor(_chain: Chain, _network: Network) {
		this.chain = _chain
		this.network = _network
	}

	setWallet(_wallet: ChainWallet): ChainProvider {
		this.wallet = _wallet
		return this
	}

	setModal(_modalInterface: ModalInterface): ChainProvider {
		this.modalInterface = _modalInterface
		return this
	}

	setAddress(_address: string): ChainProvider {
		this.address = _address
	}

	isPhantomInstalled() {
		return (window as any).phantom?.solana?.isPhantom
	}

	getPhantomProvider() {
		if (!this.isPhantomInstalled)
			throw new WalletNotFoundException('Phantom wallet is not installed')

		const provider = (window as any).phantom.solana
		if (provider.isPhantom) throw new WalletNotFoundException('Phantom wallet is not installed')

		return provider
	}

	async walletLogin(): Promise<{ address: string; signature: string }> {
		const { address, signature } = await SolanaLogin(this.getPhantomProvider(), this.modalInterface)
		this.setAddress(address)

		return { address, signature }
	}
}
