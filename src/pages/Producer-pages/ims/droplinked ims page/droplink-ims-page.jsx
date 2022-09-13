import "./droplink-ims-page.scss";

import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import SeachBox from "../search box/Search-box-component";
import Product from "../../../../components/shared/Product/Product";

import { useToasty } from "../../../../context/toastify/ToastContext";
import { USER_TYPE } from "../../../../constant/user-types";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function DroplinkedImsPage({ products }) {
  const [searchText, setSearchText] = useState("");
  const fileRef = useRef(null);

  const { errorToast } = useToasty();

  const onChangeSearchBox = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  function onReaderLoad(event) {
    var obj = JSON.parse(event.target.result);
    alert(obj);
  }
  function onReaderLoad(event) {
    console.log(event.target.result);
  }

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file.type != "application/json") {
      errorToast("dadash eshtebe");
      return;
    } else {
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = onReaderLoad;
    }
  };

  return (
    <>
      <div className="w-100 d-flex justify-content-center align-items-center mt-5">
        <Link
          to="/producer/add-product"
          style={{ width: "200px", display: "flex" }}
        >
          <BasicButton>Add item</BasicButton>
        </Link>
      </div>
      <input
        type="file"
        className="d-none"
        ref={fileRef}
        onChange={uploadFile}
      />

      {/* <div style={{ margin: "10px 0px 20px 0px" }}>
        <div
          className="Import-item-button"
          onClick={() => {
            fileRef.current.click();
          }}
        >
          Import via JSON
        </div>
      </div> */}

      <div style={{ margin: "25px 0xp" }}>
        <SeachBox onch={onChangeSearchBox} />
      </div>
      <div className="product-small-wrapper">
        {products.length <= 0 ? (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <p className="no-product"></p>
          </div>
        ) : (
          <>
            {products
              .filter((pr) => pr.title.toLowerCase().includes(searchText))
              .map((item, i) => {
                return (
                  <div className="col-6 col-md-4 col-lg-3 p-1" key={i}>
                    <Product
                      title={item.title}
                      imageUrl={item.media[0].url}
                      id={item._id}
                      type={USER_TYPE.PRODUCER}
                    />
                  </div>
                );
              })}
          </>
        )}
      </div>
    </>
  );
}
