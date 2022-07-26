import "./TopSection-style.scss"
import instaIcon from "../../../assest/icon/insta.png"
import discordIcon from "../../../assest/icon/discord.png"
import twitterIcon from "../../../assest/icon/twitter.png"
import webIcon from "../../../assest/icon/web.png"
import defaultProfile from "../../../assest/profile/defaultProfile.png"


export default function TopSection({ pic, shopname, instagram, twitter, discord, web }) {



    return (<>
        <div className="top-section-wrapper">
            <div className="d-flex justify-content-center align-content-center">
                <div className='img-wrap' >
                    {pic
                        ?
                        <img src={pic} alt='' />
                        :
                        <img src={defaultProfile} style={{ height: "90%", width: "90%" }} alt='' />
                    }
                </div>

            </div>
            <div className="d-flex justify-content-center align-content-center">
                <div className="name-text">{shopname}</div>
            </div>

            <div className='user-data'>
                <div className='d-flex justify-content-between align-items-center'>

                    {(discord != "") &&
                        <a href={`https://discord.gg/${discord}`} target='_blank' rel='noreferrer' className='social' >
                            <img src={discordIcon} alt="" className=' ratio ratio-1x1' />
                        </a>
                    }
                    {(web != "") &&
                        <a href={`https://${web}`} target='_blank' rel='noreferrer' className='social '>
                            <img src={webIcon} alt="" className='ratio ratio-1x1' />
                        </a>
                    }
                    {(twitter != "") &&
                        <a href={`https://twitter.com/${twitter}`} target='_blank' rel='noreferrer' className='social'>
                            <img src={twitterIcon} alt="" className='ratio ratio-1x1' />
                        </a>
                    }
                    {(instagram != "") &&
                        <a href={`https://www.instagram.com/${instagram}`} target='_blank' rel='noreferrer' className='social'>
                            <img src={instaIcon} alt="" className='ratio ratio-1x1' />
                        </a>
                    }

                </div>
            </div>

        </div></>)
}
