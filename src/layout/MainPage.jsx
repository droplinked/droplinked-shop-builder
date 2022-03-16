import ProfileTopSection from "../components/creator-component/ProfileTopSection"
import Box from "../components/creator-component/Box"


export default function MainPage(){
    let isLoggedIn = true ;
    let isPublicProfile = false ;
    let hideLeftSidebar = false ;
    let hideRightSidebar = false; 
    let leftSidebarIsOpen = true ;





return(<>
    <div id="profile-container">
        <ProfileTopSection/>
        <Box/>
    </div>
    
    

</>)

























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