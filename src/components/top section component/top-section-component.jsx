import "./top-section-component-style.scss"
import instaIcon from "../../assest/feature/top section/insta.png"
import discordIcon from "../../assest/feature/top section/discord.png"
import twitterIcon from "../../assest/feature/top section/twitter.png"
import webIcon from "../../assest/feature/top section/web.png"
import profilePic from '../../assest/profile/crashpunks.gif'


export default function TopSectionComponent({ pic, shopname, insta, twitter, discord, web }) {

    return (<>
        <div className="top-section-wrapper">
            <div className="d-flex justify-content-center align-content-center">
                
                    <div className='img-wrap' style={{border:"4px solid #8053ff"}}>
                        {pic && <img src={pic} alt='' />}
                    </div>
               
            </div>
            <div className="d-flex justify-content-center align-content-center">
                <div className="name-text">{shopname}</div>
            </div>

            <div className='user-data'>
                <div className='d-flex justify-content-between align-items-center'>

                    {(discord != "") &&
                        <a href='https://discord.gg/crashpunks' target='_blank' rel='noreferrer' className='social' >
                            <img src={discordIcon} alt="" className=' ratio ratio-1x1' />
                        </a>
                    }
                    {(web != "") &&
                        <a href={web} target='_blank' rel='noreferrer' className='social '>
                            <img src={webIcon} alt="" className='ratio ratio-1x1' />
                        </a>
                    }
                    {(twitter != "") &&
                        <a href={`https://twitter.com/${twitter}`} target='_blank' rel='noreferrer' className='social'>
                            <img src={twitterIcon} alt="" className='ratio ratio-1x1' />
                        </a>
                    }
                    {(insta != "") &&
                        <a href={`https://www.instagram.com/${insta}`} target='_blank' rel='noreferrer' className='social'>
                            <img src={instaIcon} alt="" className='ratio ratio-1x1' />
                        </a>
                    }

                </div>
            </div>

        </div></>)
}
