import profilePic from "../../assest/profile.jpg"
import userinfo from './userinfo'
import posts from'../../assest/profile/posts.svg'
import collection from '../../assest/profile/collections-b.svg'
import { useEffect, useState } from 'react'


export default function ProfileTopic(){
 let isPublicProfile = false;
 let isCurrentUser = true;
 let isLoggedIn = true;
 
const [user , setInfo]=useState()
let userinfo1 =userinfo;

let mode = "posts"


let modes = [
    {
        text: "Posts",
        imgUrl: posts,
        name: "posts",
    },
    {
        text: "Collections",
        imgUrl: collection,
        name: "collections",
    },
];


useEffect(() => {
    
    const fetchData = async () => {
      
      const data = await fetch('https://dev.flatlay.io/noauth/flatlay/details/mono?page=1');
      
      const json = await data.json();
      setInfo(json.flatlays[0]);
    }
  
    
    fetchData()
      .catch(console.error);;
  }, [])
  


return(
       <>
    
     <section className="profile-top-section">
            <div style={{padding: '20px'}}>
                <div className="top-main">
                    {!isPublicProfile && <>
                        {(isCurrentUser && isLoggedIn) && 
                        <div className="account-settings button">
                        Account settings
                        </div>
                       }  
                       {(isCurrentUser && isLoggedIn)&& 
                        <div className="account-settings button"
                            style={{left:'24px' , right:'auto'}}
                        >
                            Display public profile
                        </div>
                       }
                       {(!isCurrentUser && isLoggedIn) && 
                        <div
                         className={`account-settings button ${(userinfo1.isFollowed)?'followed':''}`}>
                            {(!userinfo1.isFollowed) && 
                                <span>+ Follow</span>
                            }
                            {(userinfo1.isFollowed)&&
                            <>
                            <span className="following">Following</span>
                            <span className="unFollow"> Unfollow </span>
                            </>
                            }
                        </div>
                       }
                    </>
                    }
                  <div className="img-wrap">
                      <img src={profilePic} alt="" />
                  </div>
                </div>

                <div className="user-data text-center">
                    <h1 className="font-gt"> userNAme</h1>
                </div>

                <div className="user-info d-flex justify-content-center mb-4">
                    {userinfo1.bullets.map((info)=>{
                        return(
                            <div className="bullet d-flex">
                                <img src={info.imgUrl} alt="" />
                                <div className="info">
                                    <p className={`m-0 amount ${info.amountFontClass}`}>
                                        {info.amount}
                                    </p>
                                    <p className="m-0 type">{info.section}</p>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>

                {userinfo.myInterests.length > 0 && 
                    <div className="featured">
                        <h1 className="font-gt heading text-center">Communities</h1>
                        <div className="carousel-wrap">
                            {/* p-carousel */}
                        </div>
                    </div>
                }
            </div>
        </section>

    
    <section className="profile-top-section">
        <div style={{padding:'20px'}}>
            <div className="post-collection-toggle d-flex">
                {modes.map((item)=>{
                    return(
                        <div
                        className={`item d-flex align-items-end ${(item.name == mode)?"active":""}`}
                        >
                            <img src={item.imgUrl} alt="" />
                            <p className="m-0 text">{item.text}</p>

                        </div>
                    )
                })}
            </div>
        </div>

    </section>
    </>
        
    
        
    )
}