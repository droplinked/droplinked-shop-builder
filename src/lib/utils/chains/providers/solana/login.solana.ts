import { ModalInterface } from '../../dto/modalInterface'

export async function SolanaLogin(
	provider: any,
	modalInterface: ModalInterface
): Promise<{ address: string; signature: string }> {
	modalInterface.waiting('Connecting to wallet...')

	try {
		await provider.connect()
	} catch (err) {
		modalInterface.error('User rejected the request.')
	}

	modalInterface.waiting('Signing message...')
	try {
		const message = `Please sign this message to let droplinked access to your PublicKey and validate your identity.`
		const encoded = new TextEncoder().encode(message)
		const signed = await provider.signMessage(encoded, 'utf8')

		return {
			address: signed.publicKey.toString(),
			signature: signed.signature,
		}
	} catch (err) {
		modalInterface.error('User rejected the signing.')
	}
}
