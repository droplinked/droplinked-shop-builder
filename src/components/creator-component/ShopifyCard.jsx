import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { hasToken } from "../../wallet-auth/api";
export default function ShopifyCard(props) {
  
  const [token, setToken] = useState()

  useEffect(() => {
    hasToken("SP2ETSAHD0K06XQXX5C35CHRMECD998DW7VHW879N", "crashpunk").then(
      (res) => {
        setToken(res);
      }
    );
  }, []);

  return (
    
    <div className="content-wrap d-flex flex-column">
    
      <div className="img-wrap mr-3">
        <Link to={`buy/${props.index}`}>
        <img src={props.product.images[0].src} alt="" />
        </Link>
      </div>
      <div className="info">
        <p className="mt-1 mb-3 title">{props.product.title}</p>
        <p className="mb-5 price" >
          {props.product.variants[0].formatted_price}
        </p>
        
      </div>
    </div>
    
  );
}
