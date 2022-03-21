import axios from "axios";
import { useEffect, useState } from "react";
import ShopifyCard from "./ShopifyCard";

import iconbg from "../../assest/creator/search/icon-bg.svg";
import productIcon from "../../assest/creator/search/product.svg";

export default function Box() {
  const [products, setProducts] = useState([]);

  function getData() {
    axios
      .post(
        "https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search",
        {
          keyword: "nike",
          page: 1,
        }
      )
      .then((response) => {
        setProducts(response.data.shopify);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section style={{ padding: "20px" }}>
      <div className="box">
        <div className="search-component products all">
          {products != undefined && (
            <div className="list">
              <div className="bullet-wrap row">
                {products.map((product, i) => {
                  return (
                    <div className="col-6">
                      <ShopifyCard product={product.product_listing} index={i} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {products == undefined && (
            <span className="d-flex justify-content-center align-items-center my-4">
              <i>loading...</i>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
