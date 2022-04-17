import "./newProduct.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export default function NewProduct() {
  const inputFile = useRef(null);
  const [optionCounter, setOptionCounter] = useState([{}]);
  const [select1, setSelect1] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [img, setImg] = useState([]);
  const [addOption, setAddOption] = useState(true);
  let optionValues = ["Color", "Size"];

  const chooseFile = () => {
    inputFile.current.click();
  };

  return (
    <>
      <div className="page-wrapper d-flex flex-column ">
        {/* title and describe */}
        <div className="input-wrapper mt-4">
          <div className="form-group mb-4">
            <label for="exampleInputEmail1">Title</label>
            <input
              type="text"
              className="form-control description-input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Short sleeve t-shirt"
            />
            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              className="form-control description-input"
              id="exampleFormControlTextarea1"
              placeholder="Description"
              rows="5"
            ></textarea>
          </div>
        </div>
        {/* title and describe */}

        {/* option */}
        <div className="input-wrapper" style={{ marginTop: "60px" }}>
          <label
            style={{ width: "100%", fontWeight: "bold", fontSize: "24px" }}
          >
            SKU Inventory
          </label>

          {optionCounter.map((op) => {
            return (
              <div className="option-wrapper">

                {/* select option */}
                <div
                  className="d-flex flex-column"
                  style={{
                    width: "100%",
                    padding: "15px 0px",
                  }}
                >

                  
                  <div className="option d-flex justify-content-between ">
                    <div className="col-5 col-md-4 form-inp">
                      <select
                        value={select1}
                        onChange={(e) => {
                          setSelect1(e.target.value);
                        }}
                      >
                        {optionValues.map((val) => {
                          return <option value={val}>{val}</option>;
                        })}
                      </select>
                    </div>
                    <input
                      type="text"
                      className="col-5 col-md-4 form-inp"
                      placeholder="value"
                      onChange={(e) => {
                        setOption1(e.target.value);
                      }}
                    />
                  </div>

                  {addOption ? (
                    <div className="d-flex justify-content-center mt-3 ">
                      <div
                        className="add-option-btn d-flex justify-content-center align-item"
                        onClick={() => {
                          setAddOption((pre) => !pre);
                        }}
                      >
                        <p>+</p>
                      </div>
                    </div>
                  ) : (
                    <div className="option d-flex justify-content-between mt-3 ">
                      <div className="col-5 col-md-4 form-inp">
                        <select>
                          {optionValues.map((val) => {
                            if (val != select1)
                              return <option value={val}>{val}</option>;
                          })}
                        </select>
                      </div>
                      <input
                        type="text"
                        className="col-5 col-md-4 form-inp"
                        placeholder="value"
                      />
                    </div>
                  )}
                </div>
                {/* select option */}


                {/* media */}
                <div style={{ marginBottom: "40px" }}>
                  <label
                    className="mb-2"
                    style={{ width: "100%", color: "white" }}
                  >
                    media
                  </label>
                  <input
                    type="file"
                    className="input-file-input"
                    onChange={addImage}
                    ref={inputFile}
                  />
                  {img.length <= 0 ? (
                    <div
                      className="d-flex justify-content-center "
                      style={{ padding: "15px 0px" }}
                    >
                      <div
                        className="first-media-wrap d-flex justify-content-center mt-2"
                        onClick={chooseFile}
                      >
                        <div className="file-input">
                          <p>add image</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="media-wrap d-flex justify-content-start flex-wrap">
                      {img.map((item) => {
                        return (
                          <div className="col-6 col-md-4 d-flex justify-content-center">
                            <img src={item} className="media-img mt-2" alt="" />
                          </div>
                        );
                      })}
                      <div className="col-6 col-md-4 d-flex justify-content-center">
                        <div
                          className="first-media-wrap d-flex justify-content-center mt-2"
                          onClick={chooseFile}
                        >
                          <div className="file-input ">
                            <p>add image</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* media */}

                      {/* price  */}

                <div
                  className="d-flex justify-content-between mt-3"
                  style={{ width: "100%" }}
                >
                  <label className="col-5 lable-style">price</label>
                  <input
                    type="text"
                    className="col-6 col-md-4 form-inp"
                    placeholder="$ 2.000"
                  />
                </div>
                {/* price  */}

                {/* quantity */}
                <div
                  className="d-flex justify-content-between mt-3"
                  style={{ width: "100%" }}
                >
                  <label className="col-5 lable-style">quantity</label>
                  <input
                    type="text"
                    className="col-6 col-md-4 form-inp"
                    placeholder="1"
                    onChange={(e) => {
                      setOption1(e.target.value);
                    }}
                  />
                </div>
                {/* quantity */}

                {/* externalID */}
                <div
                  className="d-flex justify-content-between mt-3 mb-3"
                  style={{ width: "100%" }}
                >
                  <label className="col-5 lable-style">externalID</label>
                  <input
                    type="text"
                    className="col-6 col-md-4 form-inp"
                    placeholder="1234"
                    onChange={(e) => {
                      setOption1(e.target.value);
                    }}
                  />
                </div>
                {/* externalID */}
                
              </div>
            );
          })}

          <div className="add-more-wrap d-flex justify-content-center mt-3">
            <button
              className="form-inp"
              onClick={() => {
                let arr = Array.from(optionCounter);
                arr.push({});
                setOptionCounter(arr);
              }}
            >
              add more
            </button>
          </div>
        </div>
        {/* option */}
      </div>
    </>
  );

  function addImage(e) {
    let arr = Array.from(img);
    let image = URL.createObjectURL(e.target.files[0]);
    arr.push(image);
    setImg(arr);
    console.log(arr);
  }
}

{
  /* media */
}
{
  /* <div className="input-wrapper mt-4">
          <div class="mb-3">
            <label for="formFile" class="form-label">
              Media
            </label>
            <div className="input-media-wrapper d-flex" onClick={chooseFile}>
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
              />
              <div className="button-wrapper d-flex flex-column">
                <div class="d-flex justify-content-center">
                  <button
                    className="add-file btn text-white"
                    style={{ fontSize: "12px" }}
                    onClick={chooseFile}
                  >
                    add file
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    style={{ fontSize: "12px" }}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    add from Url
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <p className="text-white" style={{ fontSize: "12px" }}>
                    Accepts images, videos, or 3D models
                  </p>
                </div>
                <div className="d-flex justify-content-center"></div>
              </div>
            </div>
          </div>
        </div> */
}
{
  /* media */
}

{
  /* option */
}
{
  /* <div className="input-wrapper mt-4">
          <label for="formFile" className="form-label">
            Option
          </label>

          <div class="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckIndeterminate"
            />
            <label className="form-check-label" for="flexCheckIndeterminate">
              This product has options, like size or color
            </label>
          </div>
        
          <div className="option-wrapper ">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Option name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="op name"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Option values
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="op name"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Done
            </button>
          </div>
          
          <div className="option-wrapper">
            <div
              className="optin-done-wrapper d-flex justify-content-between"
              style={{ height: "50px" }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <p style={{ color: "white" }}>Color</p>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-outline-light">
                  Edit
                </button>
              </div>
            </div>
            <div
              className="d-flex justify-content-start"
              style={{ height: "30px" }}
            >
              <div className="d-flex justify-content-center align-items-center op-value">
                red
              </div>
              <div className="d-flex justify-content-center align-items-center op-value">
                red
              </div>
            </div>
          </div>
        </div> */
}
{
  /* option */
}
{
  /* price */
}
{
  /* <div className="input-wrapper mt-4">
          <div className="form-group">
            <label for="exampleInputEmail1">Price</label>
            <input
              style={{ width: "50%" }}
              type="text"
              className="form-control description-input"
              aria-describedby="emailHelp"
              placeholder="$ 200"
            />
             <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> 
          </div>
        </div> */
}
{
  /* price */
}
{
  /* inventory */
}
{
  /* <div className="input-wrapper mt-4">
          <label for="exampleInputEmail1">Inventory</label>

          <div
            className="d-flex row mt-3"
            style={{ borderBottom: "1px solid white" }}
          >
            <div className="form-group col-12 col-md-6">
              <label for="exampleInputEmail1">SKU (Stock Keeping Unit)</label>
              <input
                style={{ width: "80%" }}
                type="text"
                className="form-control description-input"
                aria-describedby="emailHelp"
                placeholder="$ 200"
              />
               <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> 
            </div>

            <div className="form-group col-12 col-md-6 mb-2">
              <label for="exampleInputEmail1">Barcode (ISBN, UPC, GTIN, etc.)</label>
              <input
                style={{ width: "80%" }}
                type="text"
                className="form-control description-input"
                aria-describedby="emailHelp"
                placeholder="$ 200"
              />
             <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> 
            </div>
          </div>

          <div className="d-flex justify-content-between"
          style={{ borderBottom: "1px solid white" , marginTop:"10px" }}
          >
          <label for="exampleInputEmail1">Location name</label>
          <label for="exampleInputEmail1">Available</label>
          </div>

          <div className="d-flex justify-content-between pt-2">
            <div className="col-6 d-flex justify-content-start align-item-center">
            <label for="exampleInputEmail1">Iran</label>
            </div>
            <div className="col-6 d-flex justify-content-end align-item-center">
              <div className="counter-body d-flex">
              <span>-</span>
               <input type="number" className="quenNum" value="1"/>
              <span>+</span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between pt-2">
            <div className="col-6 d-flex justify-content-start align-item-center">
            <label for="exampleInputEmail1">germany</label>
            </div>
            <div className="col-6 d-flex justify-content-end align-item-center">
              <div className="counter-body d-flex">
              <span>-</span>
               <input type="number" className="quenNum" value="1"/>
              <span>+</span>
              </div>
            </div>
          </div>
          

        </div> */
}
{
  /* inventory */
}
