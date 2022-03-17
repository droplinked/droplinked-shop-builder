import ProfileTopSection from '../components/creator-component/ProfileTopSection'
import Box from '../components/creator-component/Box'

import { useEffect, useState } from 'react'
import { authenticate, userSession } from '../wallet-auth/auth'
import { getAccountBalances, getUserAddress } from '../wallet-auth/api'

export default function MainPage() {
	let isLoggedIn = true
	let isPublicProfile = false
	let hideLeftSidebar = false
	let hideRightSidebar = false
	let leftSidebarIsOpen = true

	const [userData, setUserData] = useState(undefined)

	useEffect(() => {
		if (userSession.isSignInPending()) {
			userSession
				.handlePendingSignIn()
				.then(userData => {
					window.history.replaceState({}, document.title, '/')
					setUserData(userData)
				})
				.catch(err => {
					setUserData(undefined)
				})
		} else if (userSession.isUserSignedIn()) {
			setUserData(userSession.loadUserData())
		}
	}, [])

	function onSignOut() {
		userSession.signUserOut('/')
	}

	function checkTokens(tokens) {
		tokens.filter(value => value.includes('crashpunks'))
		return tokens.length
	}

	return (
		<>
			<div id='profile-container'>
				{userData ? (
					<>
						<div onClick={() => onSignOut()}>sign out</div>
						<div
							onClick={() => {
								// SP1XJC7RMAK03F2XP8KT27ST7S5C409DMVFWFJ4HD
								const mainnet = getUserAddress(userData).mainnet
								const balancesPromise = getAccountBalances(mainnet)
								balancesPromise.then(response => {
									const nfts = response.data.non_fungible_tokens
									const nftKeys = []
									for (const key in nfts) nftKeys.push(key)

									if (checkTokens(nftKeys) === 0) console.log(false)
									else console.log(true)
								})
							}}>
							print balances
						</div>
					</>
				) : (
					<div onClick={() => authenticate()}>connect wallet</div>
				)}

				<ProfileTopSection />
				<Box />
			</div>
		</>
	)

	//     return(
	//         <>
	//         <section className="creator-section">

	//             {((isLoggedIn || (hideLeftSidebar && hideRightSidebar)) &&!isPublicProfile ) &&
	//             <div className={`d flex flex-row ${(hideLeftSidebar)?'content-with-bg':'d-flex'}`}>
	// {/*
	//                  {(!hideLeftSidebar)&&
	//                  <div className={`creator-sidebar ${(leftSidebarIsOpen)?'open-sidebar':'close-sidebar'} `}>
	//                      <SideBar />
	//                  </div>
	//                 } */}
	//                 <div className="creator-content">
	//                     <div className="mx-auto h-100">
	//                         {/* {search here} */}
	//                         <CreatorComponent/>

	//                     </div>
	//                 </div>
	//                 {/* right sidebar*/ }
	//                 {/* <RightSideBar/> */}

	//             </div>}
	//             {(isPublicProfile)&&
	//                 <div className="container content public">
	//                     <div className="row">
	//                         <div className="d-none d-sm-block col-sm-2"></div>
	//                         <div className="col-xs-12 col-sm-8">
	//                             <div className="py-3 d-flex align-items-center justify-content-between"
	//                             style={{fontSize: "32px"}}
	//                             >
	//                               <img src={flatlayLogo} alt=""
	//                               style={{cursor : 'pointer', outline: 'none'}}
	//                               />
	//                               {(!isLoggedIn)&&<div className="button">Get Started</div>}

	//                             </div>
	//                                 {/*router outlet */}
	//                         </div>
	//                         <div className="d-none d-sm-block col-sm-2"></div>
	//                     </div>
	//                 </div>
	//             }

	//         </section>

	//         </>
	//     )
}
