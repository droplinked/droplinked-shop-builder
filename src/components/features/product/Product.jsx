import "./Product.scss"
import nft1 from "../../../assest/image/nft/produc.jpg"
import savebtn from "../../../assest/feature/product/savebtn.png"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { useProfile } from "../../../sevices/hooks/useProfile"
import { UseWalletInfo } from "../../../sevices/context/context"
import { fetchPrincipalNFTs } from "../../../sevices/functoinal-service/NFTcheck"
import ErrorModal from "../../errors component/error modal/ErrorModal"

function Product({ price, title, imageUrl, id }) {
    const [viewBtn, setViewBtn] = useState(false)
    const { userData, authenticate } = UseWalletInfo();
    const [hasNFT, setHasNFT] = useState([])
    const [error, setError] = useState(false)
    const { profile } = useProfile();

    useEffect(() => {
        if (userData != undefined) {
            let mainet = userData.profile.stxAddress.mainnet;
            let testnet = userData.profile.stxAddress.testnet;
            fetchPrincipalNFTs(
                testnet,
                "SPQZF23W7SEYBFG5JQ496NMY0G7379SRYEDREMSV.Candy::candy",
                1,
                0
            )
                .then((results) => {
                    console.log("result");
                    console.log(results)
                    setHasNFT(results)
                })
                .catch((reason) => {
                    console.log("could not fetch user nfts")
                })
        }
    }, [])

    const clickOnProduct = () => {
        if (userData == undefined) {
            authenticate();
        } else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, "3000")
        }
    }

    return (<>
        <div className="col-6 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center h-auto p-1">
            <div className="product-wrap mt-3">

                {(hasNFT.length > 0) ?
                    <Link to={`/product/${id}`}>
                        <div className="product-image-wrap"
                            onMouseLeave={() => setViewBtn(false)}
                            onMouseEnter={() => setViewBtn(true)}>
                            <img className="product-save-btn" src={savebtn} alt="" />
                            <div className="ratio ratio-1x1">
                                <img className={` main-img ${(viewBtn) ? "product-img-opacity" : ""}`} src={imageUrl} />
                            </div>
                            {viewBtn && <div className="product-view-btn"><p>View</p></div>}
                        </div>
                    </Link>
                    :
                    <div className="product-image-wrap"
                        onMouseLeave={() => setViewBtn(false)}
                        onMouseEnter={() => setViewBtn(true)}
                        onClick={clickOnProduct} >
                        <img className="product-save-btn" src={savebtn} alt="" />
                        <div className="ratio ratio-1x1">
                            <img className={` main-img ${(viewBtn) ? "product-img-opacity" : ""}`} src={imageUrl} />
                        </div>
                        {viewBtn && <div className="product-view-btn"><p>View</p></div>}
                    </div>
                }

                <div className="brand-name">{title}</div>
                <div className="priceS" dangerouslySetInnerHTML={{ __html: price }}></div>
            </div>
        </div>
        {error && 
        <div style={{position:"fixed",maxWidth:"200px" , maxHeight:"100px"}}>
        <ErrorModal>you haven't NFT</ErrorModal>
        </div>
        }
    </>
    )
}

export default Product




{/* {(profile == null)
                    ?
                    <Link to={`/`}>
                        <div className="product-image-wrap"
                            onMouseLeave={() => setViewBtn(false)}
                            onMouseEnter={() => setViewBtn(true)}

                        >
                           <img className="product-save-btn" src={savebtn} alt="" /> 
                            <div className="ratio ratio-1x1">
                                <img className={`main-img ${(viewBtn) ? "product-img-opacity" : ""}`} src={imageUrl} />
                            </div>
                            {viewBtn && <div className="product-view-btn"><p>View</p></div>}
                        </div>
                    </Link>

                    : */}