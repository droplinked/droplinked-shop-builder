import "./Inventory-page-style.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../api/producer/Product-api";
import { getShop } from "../../../api/base-user/Profile-api";
import { SHOP_TYPES } from "../../../constant/shop-types";

import Loading from "../../../components/shared/loading/Loading";
import DroplinkedImsPage from "./droplinked ims page/droplink-ims-page";
import ShopImsPage from "./shopify-ims-page/shopify-ims-page";
import SeachBox from "./search-box/Search-box-component";

function InventoryPage() {
  const [products, setProdcuts] = useState(null);
  const [shop, setShop] = useState(null);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (token == null) {
      navigate("/");
    }

    getData();
  }, []);

  const getData = async () => {
    let pro = await getProducts();
    let sh = await getShop();
    setProdcuts(pro);
    setShop(sh);
  };

  const changeFilter = (e) => setFilter(e.target.value.toLowerCase())

  return (
    <>
      <div className="IMS-page-wrapper">
        <div className="ims-title">Merchandise</div>
        <div className="number-of-merchs">
          {products != undefined ? products.length : "0"} Listed
        </div>
        <SeachBox change={changeFilter}/>
        {products ? (
          <>
            {shop != null && (
              <>
                {shop.imsType == SHOP_TYPES.DROPLINKED ? (
                  <DroplinkedImsPage products={products} filter={filter}  />
                ) : (
                  <ShopImsPage products={products} update={getData} filter={filter} />
                )}
              </>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default InventoryPage;
