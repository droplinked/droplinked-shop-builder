import profilePic from '../../../assest/profile/crashpunks.gif'
import "./ProfileTopSection.scss"
import instaIcon from "../../../assest/icon/insta.png"
import discordIcon from "../../../assest/icon/discord.png"
import twitterIcon from "../../../assest/icon/twitter.png"
import webIcon from "../../../assest/icon/web.png"

export default function ProfileTopic() {

	return (
		<>


			<div className="top-section-wrapper">
				<div className="d-flex justify-content-center align-content-center">
					<a href="https://stxnft.com/collections/crashpunks">
						<div className='img-wrap'>
							<img src={profilePic} alt='' />
						</div>
					</a>
				</div>
				<div className="d-flex justify-content-center align-content-center">
					<div className="name-text">CrashPunks</div>
				</div>

				<div className='user-data'>
					<div className='d-flex justify-content-between align-items-center'>
						<a href='https://discord.gg/crashpunks' target='_blank' rel='noreferrer' className='social' >
							<img src={discord} alt="" className=' ratio ratio-1x1' />
						</a>
						<a href='http://crashpunks.com/' target='_blank' rel='noreferrer' className='social '>
							<img src={web} alt="" className='ratio ratio-1x1'/>
						</a>
						<a href='https://twitter.com/crashpunks' target='_blank' rel='noreferrer' className='social'>
							<img src={twitter} alt="" className='ratio ratio-1x1' />
						</a>
						<a href='https://www.instagram.com/crashpunks/' target='_blank' rel='noreferrer' className='social'>
							<img src={instaIcon} alt=""  className='ratio ratio-1x1' />
						</a>
					</div>
				</div>

			</div>


		</>
	)
}
