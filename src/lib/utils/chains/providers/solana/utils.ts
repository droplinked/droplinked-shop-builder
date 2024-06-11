import { web3, utils } from '@coral-xyz/anchor'
import Prando from 'prando'

export const TOKEN_PROGRAM_ID = utils.token.TOKEN_PROGRAM_ID

export const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
	'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
)

export const CHAINLINK_SOTRE_PROGRAM_ID = new web3.PublicKey(
	'HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny'
)

export const CHAINLINK_SOL_USD_PRICE_FEED_ID = new web3.PublicKey(
	'CH31Xns5z3M1cTAbKW34jcxPPciazARpijcHj9rxtemt'
)
export const accounts = {
	ShopOwner: web3.Keypair.fromSecretKey(
		Uint8Array.from([
			29, 25, 43, 88, 48, 233, 254, 59, 18, 213, 61, 190, 54, 250, 214, 163, 51, 194, 167, 95, 15,
			137, 92, 49, 150, 129, 176, 195, 17, 78, 0, 220, 77, 181, 153, 106, 209, 92, 172, 167, 83,
			206, 130, 27, 108, 62, 231, 237, 66, 40, 147, 68, 176, 45, 68, 46, 90, 163, 69, 41, 26, 54,
			102, 66,
		])
	),
}

export const generators = {
	Shop: new Prando('droplinked::shop'),
	StandardProduct: {
		USD: new Prando('droplinked:product:usd'),
		SOL: new Prando('droplinked:product:sol'),
		SPLToken: new Prando('droplinked:product:spl'),
	},
}

export const addresses = {
	deriveShop: (owner: web3.PublicKey, nonce: Uint8Array, programId: web3.PublicKey) => {
		return web3.PublicKey.findProgramAddressSync(
			[Buffer.from('shop'), owner.toBuffer(), nonce],
			programId
		)
	},
	deriveProduct: (
		owner: web3.PublicKey,
		shop: web3.PublicKey,
		nonce: Uint8Array,
		programId: web3.PublicKey
	) => {
		return web3.PublicKey.findProgramAddressSync(
			[Buffer.from('product'), owner.toBuffer(), shop.toBuffer(), nonce],
			programId
		)
	},
	deriveMint: (
		owner: web3.PublicKey,
		shop: web3.PublicKey,
		product: web3.PublicKey,
		programId: web3.PublicKey
	) => {
		return web3.PublicKey.findProgramAddressSync(
			[Buffer.from('mint'), owner.toBuffer(), shop.toBuffer(), product.toBuffer()],
			programId
		)
	},
	deriveMetadata: (mint: web3.PublicKey) => {
		return web3.PublicKey.findProgramAddressSync(
			[Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
			TOKEN_METADATA_PROGRAM_ID
		)
	},
}
