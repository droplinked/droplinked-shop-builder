import "./Post.scss"
import nft2 from "../../../assest/image/nft/nft2.jpg"
import Vector from "../../../assest/feature/post page image/Vector.png"
import diamond2 from "../../../assest/feature/post page image/diamond2.png"

function Post() {

    return (
        <div className="row d-flex justify-content-center ">
            <div className=" col-12 col-md-8  d-flex justify-content-center">
                <div className="post-wrapper gr">

                    <div className="side ratio ratio-1x1 ">
                        <img className="post-img" src={nft2} alt="" />
                    </div>
                    <div className="side col-md-ratio col-md-ratio-1x1 sideR">
                        <div >
                            <div className="explore">The Explorer Guild</div>
                            <div className="exnum">Explorer #2482</div>
                            <div className="list-wrap">
                                <span className="listed"
                                    style={{ color: "#b3b3b3" }}
                                >Listed for</span>
                                <span className="listed"
                                    style={{ color: "#fff" }}
                                > 55 STX</span>
                            </div>

                            <button className="buy-btn">Buy Now</button>


                            <div className="d-flex align-item-center"
                                style={{ marginTop: "10px" }}>

                                <img className="diamond" src={diamond2} alt="" />
                                <span className="diamond-text">This is the 8,572nd rarest in the collection out of 9,216</span>
                            </div>

                            <div className="d-flex align-item-center"
                                style={{ marginTop: "10px" }}>

                                <img className="diamond" src={Vector} alt="" />
                                <span className="diamond-text">This is the 8,572nd rarest in the collection out of 9,216</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Post