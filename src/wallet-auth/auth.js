import { showConnect, UserSession, AppConfig } from '@stacks/connect'

const appConfig = new AppConfig(['store_write', 'publish_data'])
export const userSession = new UserSession({ appConfig })

export const authenticate = () => {
	console.log('Called')
	showConnect({
		appDetails: {
			name: 'FLATLAY',
			icon: 'https://flatlay.io/assets/images/shared/Flatlay-Logo.svg',
		},
		redirectTo: '/',
		onFinish: () => {
			window.location.reload()
		},
		userSession: userSession,
	})
}
