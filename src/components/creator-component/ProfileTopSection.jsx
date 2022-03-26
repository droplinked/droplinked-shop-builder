import profilePic from '../../assest/profile.jpg'
import background from '../../assest/background.jpg'
import userinfo from './userinfo'
import posts from '../../assest/profile/posts.svg'
import collection from '../../assest/profile/collections-b.svg'
import { useEffect, useState } from 'react'
import { UseWalletInfo } from '../context/context'
import { getUserAddress } from '../../wallet-auth/api'
import therLogo from '../../assest/ether.png'

/** socials */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'

export default function ProfileTopic() {
	let isPublicProfile = false
	let isCurrentUser = true
	let isLoggedIn = false

	let userinfo1 = userinfo
	let topMainBackground = { backgroundImage: `url(${background})` }

	const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo()
	const userAddress = userData ? getUserAddress(userData) : null

	return (
		<>
			<section className='profile-top-section'>
				<div style={{ padding: '20px' }}>
					<div className='top-main' style={topMainBackground}>
						{!isPublicProfile && (
							<>
								{isCurrentUser && isLoggedIn && <div className='account-settings button'>Account settings</div>}
								{isCurrentUser && isLoggedIn && (
									<div className='account-settings button' style={{ left: '24px', right: 'auto' }}>
										Display public profile
									</div>
								)}
								{!isCurrentUser && isLoggedIn && (
									<div className={`account-settings button ${userinfo1.isFollowed ? 'followed' : ''}`}>
										{!userinfo1.isFollowed && <span>+ Follow</span>}
										{userinfo1.isFollowed && (
											<>
												<span className='following'>Following</span>
												<span className='unFollow'> Unfollow </span>
											</>
										)}
									</div>
								)}
							</>
						)}
						<div className='img-wrap'>
							<img src={profilePic} alt='' />
						</div>
					</div>

					<div className='user-data text-center'>
						<h1 className='font-gt'>CrashPunks</h1>
						<div className='d-flex-inline flex-row align-items-center'>
							<a href='https://discord.gg/crashpunks' target='_blank' rel='noreferrer' className='social'>
								<FontAwesomeIcon icon={faDiscord} />
							</a>
							<a href='http://crashpunks.com/' target='_blank' rel='noreferrer' className='social'>
								<FontAwesomeIcon icon={faEarthAmericas} />
							</a>
							<a href='https://twitter.com/crashpunks' target='_blank' rel='noreferrer' className='social'>
								<FontAwesomeIcon icon={faTwitter} />
							</a>
							<a href='https://www.instagram.com/crashpunks/' target='_blank' rel='noreferrer' className='social social__ig'>
								<FontAwesomeIcon icon={faInstagram} />
							</a>
						</div>
					</div>

					{userinfo.myInterests.length > 0 && (
						<div className='featured'>
							<h1 className='font-gt heading text-center'>Communities</h1>
							<div className='carousel-wrap'>{/* p-carousel */}</div>
						</div>
					)}
				</div>
			</section>

			<section className='profile-top-section'>
				<div className='post-collection-toggle'>
					{userData ? (
						<div className='profile-address'>
							<img src={therLogo} alt='' />
							<p>{userAddress ? userAddress.mainnet : ''}</p>
						</div>
					) : (
						<div className=''></div>
					)}
				</div>
			</section>
		</>
	)
}
