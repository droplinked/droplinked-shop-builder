import { ProductType } from '../../dto/chainStructs'
import { PublicKey } from '@solana/web3.js'
import { ModalInterface } from '../../dto/modalInterface'
import { NFTStorage } from 'nft.storage'
import { AnchorProvider, BN, Program } from '@coral-xyz/anchor'
import { Connection } from '@solana/web3.js'
import Prando from 'prando'

import { DroplinkedSolanaProgram } from './idl/droplinked_solana_program'
import IDL from './idl/droplinked_solana_program.json'
import { TOKEN_METADATA_PROGRAM_ID, TOKEN_PROGRAM_ID, addresses } from './utils'
import { SYSTEM_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/native/system'

export async function uploadToIPFS(metadata: any, apiKey: string) {
	const client = new NFTStorage({ token: apiKey })
	if (typeof metadata == typeof {} || typeof metadata == typeof []) {
		metadata = JSON.stringify(metadata)
	}
	const ipfs_hash = await client.storeBlob(new Blob([metadata]))
	return ipfs_hash
}

export async function SolanaRecordMerch(
	provider: any,
	sku_properties: any,
	address: string,
	productInformation: {
		title: string
		description: string
		image_url: string
		price: number
		amount: number
		commission: number
		type: ProductType
		royalty: number
	},
	shopAddress: string,
	currencyAddress: string,
	apiKey: string,
	modalInterface: ModalInterface
) {
	modalInterface.waiting('Minting...')

	let metadata = {
		name: productInformation.title,
		description: productInformation.description,
		image: productInformation.image_url,
		properties: sku_properties,
	}
	const metadata_ipfs_hash = await uploadToIPFS(metadata, apiKey)

	try {
		modalInterface.waiting('minting the NFT...')

		const anchorProvider = new AnchorProvider(
			new Connection('https://api.devnet.solana.com'),
			provider
		)
		const program = new Program<DroplinkedSolanaProgram>(
			IDL as DroplinkedSolanaProgram,
			anchorProvider
		)

		const shop_id = JSON.parse(localStorage.getItem('appStore')).state.shop._id
		const shop_nonce_generator = new Prando(shop_id)
		shop_nonce_generator.reset()

		const sku_id = sku_properties._id
		const sku_nonce_generator = new Prando(sku_id)
		sku_nonce_generator.reset()

		const shop_nonce = [0, 0, 0, 0, 0, 0, 0, 0].map(() => shop_nonce_generator.nextInt(0, 255))
		const sku_nonce = [0, 0, 0, 0, 0, 0, 0, 0].map(() => sku_nonce_generator.nextInt(0, 255))

		const product_type: { physical: {} } | { print: {} } | { service: {} } =
			productInformation.type === ProductType.PHYSICAL
				? { physical: {} }
				: productInformation.type === ProductType.POD
				? { print: {} }
				: { service: {} }
		const product_price: { usd: { cents: BN } } = {
			usd: { cents: new BN(productInformation.price * 100_000_000) },
		}

		const owner_address = new PublicKey(address)
		const [shop_address] = addresses.deriveShop(
			owner_address,
			Uint8Array.from(shop_nonce),
			program.programId
		)
		const [sku_address] = addresses.deriveProduct(
			owner_address,
			shop_address,
			Uint8Array.from(sku_nonce),
			program.programId
		)
		const [sku_mint_address] = addresses.deriveMint(
			owner_address,
			shop_address,
			sku_address,
			program.programId
		)
		const [sku_metadata_address] = addresses.deriveMetadata(sku_mint_address)

		let signature: string
		if (productInformation.commission === 0) {
			signature = await program.methods
				.createStandardProduct(shop_nonce, sku_nonce, product_type, product_price, {
					name: productInformation.title,
					uri: metadata_ipfs_hash,
					symbol: 'd',
					sellerFeeBasisPoints: productInformation.royalty,
				})
				.accounts({ metadata: sku_metadata_address, owner: owner_address })
				// .accountsStrict({
				// 	owner: owner_address,
				// 	shop: shop_address,
				// 	standardProduct: sku_address,
				// 	productMint: sku_mint_address,
				// 	metadata: sku_metadata_address,
				// 	systemProgram: SYSTEM_PROGRAM_ID,
				// 	tokenProgram: TOKEN_PROGRAM_ID,
				// 	tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
				// })
				.rpc()
		} else {
			const publishers: PublicKey[] = []
			signature = await program.methods
				.createCommissionableProduct(
					shop_nonce,
					sku_nonce,
					product_type,
					product_price,
					productInformation.commission * 100 /** basis points */,
					publishers,
					{
						name: productInformation.title,
						sellerFeeBasisPoints: productInformation.royalty,
						symbol: 'd',
						uri: metadata_ipfs_hash,
					}
				)
				.accounts({ metadata: sku_metadata_address, owner: owner_address })
				// 	.accountsStrict({
				// 		owner: owner_address,
				// 		shop: shop_address,
				// 		commissionableProduct: sku_address,
				// 		productMint: sku_mint_address,
				// 		metadata: sku_metadata_address,
				// 		systemProgram: SYSTEM_PROGRAM_ID,
				// 		tokenProgram: TOKEN_PROGRAM_ID,
				// 		tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
				// 	})
				.rpc()
		}
		modalInterface.waiting('Finalizing Transaction...')
		await anchorProvider.connection.confirmTransaction(signature, 'finalized')

		modalInterface.success('Successfully recorded the product!')
		return {
			transactionHash: signature,
			productId: sku_nonce.join(','),
			amountRecorded: productInformation.amount,
		}
	} catch (err) {
		modalInterface.error(err)
		throw err
	}
}
