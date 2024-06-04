import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import { ModalInterface } from '../../dto/modalInterface'

import { DroplinkedSolanaProgram } from './idl/droplinked_solana_program'
import IDL from './idl/droplinked_solana_program.json'
import Prando from 'prando'

export async function SolanaApproveRequest(
	provider: any,
	shop: any,
	sku: any,
	address: string,
	recordData: any,
	modalInterface: ModalInterface
) {
	modalInterface.waiting('Approving request...')

	try {
		const anchorProvider = new AnchorProvider(
			new Connection('https://api.devnet.solana.com'),
			provider
		)
		const program = new Program<DroplinkedSolanaProgram>(
			IDL as DroplinkedSolanaProgram,
			anchorProvider
		)

		const producer_shop = JSON.parse(localStorage.getItem('appStore')).state.shop
		const shop_nonce_generator = new Prando(producer_shop._id)
		shop_nonce_generator.reset()

		const sku_nonce_generator = new Prando(sku._id)
		sku_nonce_generator.reset()

		const shop_nonce = [0, 0, 0, 0, 0, 0, 0, 0].map(() => shop_nonce_generator.nextInt(0, 255))
		const sku_nonce = [0, 0, 0, 0, 0, 0, 0, 0].map(() => sku_nonce_generator.nextInt(0, 255))

		const owner_address = new PublicKey(address)

		const publisher = recordData.details.publisher
		console.log('publisher', publisher)

		const publisher_address = new PublicKey(publisher)

		const signature = await program.methods
			.whitelistPublisher(shop_nonce, sku_nonce)
			.accounts({
				owner: owner_address,
				publisher: publisher_address,
			})
			.rpc()

		modalInterface.waiting('Finalizing Transaction')
		await anchorProvider.connection.confirmTransaction(signature, 'finalized')

		modalInterface.success('Request approved')
		return signature
	} catch (err) {
		modalInterface.error(err)
		throw err
	}
}
