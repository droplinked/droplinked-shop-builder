import { useState, createContext, useContext, useEffect } from 'react';
import { authenticate, userSession } from '../../wallet-auth/auth';
import { getAccountBalances, getUserAddress } from '../../wallet-auth/api';

const UserWalletContext = createContext(undefined);

const WalletProvider = ({ children }) => {
	const [userData, setUserData] = useState(undefined);

	useEffect(() => {
		if (userSession.isSignInPending()) {
			userSession
				.handlePendingSignIn()
				.then((userData) => {
					window.history.replaceState({}, document.title, '/');
					setUserData(userData);
				})
				.catch((err) => {
					setUserData(undefined);
				});
		} else if (userSession.isUserSignedIn()) {
			setUserData(userSession.loadUserData());
		}
	}, []);

	function onSignOut() {
		userSession.signUserOut('/');
	}

	function checkTokens(tokens) {
		tokens.filter((value) => value.includes('crashpunks'));
		return tokens.length;
	}

	return (
		<UserWalletContext.Provider
			value={{ onSignOut, checkTokens, userData, authenticate }}
		>
			{children}
		</UserWalletContext.Provider>
	);
};

const UseWalletInfo = () => useContext(UserWalletContext);

export { WalletProvider, UseWalletInfo };
