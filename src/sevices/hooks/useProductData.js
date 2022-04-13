import axios from "axios";
import { useState, useEffect } from "react";

const useProductData = (id) => {
  const [data, setData] = useState();

  useEffect(()=>{
    axios
    .post("https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search", {
      keyword: "tshirt",
      page: 1,
    })
    .then((response) => {
      setData(response.data.shopify[id].product_listing);
    });
  },[])
  

  return [data];
};

export default useProductData;
