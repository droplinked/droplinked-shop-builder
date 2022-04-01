import "./collection.scss"
import Carousel from 'react-elastic-carousel'
import colec1 from "../../../assest/image/crashpunk/collection/collection1.jpg"
import colec2 from "../../../assest/image/crashpunk/collection/collection2.jpg"
import colec3 from "../../../assest/image/crashpunk/collection/collection3.jpg"

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];


export default function Collection(props){

    return (<>

         <div className="collection-main">
                
                        <Item />              
             
         </div>

    </>)
}


function Item(){


    return(<>
            <div className="item-wrapper">
                <div className="image-wrapper d-flex">
                    <div className="col-8">
                        <img src={colec2} alt="" style={{width: '100%', height: '100%' , border:"1px solid rgb(68,68,68"}}/>
                    </div>
                     <div className="col-4">
                    <img src={colec3} alt="" style={{width: '100%', height: '50%', border:"1px solid rgb(68,68,68"}}/>
                    <img src={colec1} alt="" style={{width: '100%', height: '50%', border:"1px solid rgb(68,68,68"}}/>
                    </div> 
                </div>
                <div className="collection-name">
                    <p>Collection Name</p>
                </div>
                <div className="collection-id">
                    <p>@crash_punk</p>
                </div>
            </div>
            
    </>)
}