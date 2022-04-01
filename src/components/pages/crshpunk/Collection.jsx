import "./collection.scss"
import Carousel from 'react-elastic-carousel'
import colec1 from "../../../assest/image/crashpunk/collection/collection1.png"
import colec2 from "../../../assest/image/crashpunk/collection/collection2.png"
import colec3 from "../../../assest/image/crashpunk/collection/collection3.png"

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];


export default function Collection(props){

    return (<>

         <div className="collection-main">
            <div className="collection-header d-flex justify-content-between">
                <div className="col-6 col-md-3">
                    <p className="collection-text">{props.name}</p>
                </div>
                {/* <div className="col-6 col-md-3 d-flex justify-content-center" style={{border:"1px solid red"}}>
                    <button className="seeMore-button"><p>See more</p></button>
                </div> */}

            </div>
            <div className="collection-body">
                <Carousel breakPoints={breakPoints} style={{height:"100%" , color:"00FFFB"}}>
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                </Carousel>
            </div>
         </div>

    </>)
}


function Item(){


    return(<>
            <div className="item-wrapper">
                <div className="image-wrapper d-flex">
                    <div className="col-8">
                        <img src={colec2} alt="" style={{width: '100%', height: '100%'}}/>
                    </div>
                     <div className="col-4">
                    <img src={colec3} alt="" style={{width: '100%', height: '50%'}}/>
                    <img src={colec1} alt="" style={{width: '100%', height: '50%'}}/>
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