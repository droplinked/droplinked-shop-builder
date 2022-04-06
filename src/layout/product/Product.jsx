import "./product.scss";
import image1 from "../../assest/image/product/image1.jpg";
import image2 from "../../assest/image/product/image2.jpg";
import image3 from "../../assest/image/product/image3.jpg";
import image4 from "../../assest/image/product/image4.jpg";
import image5 from "../../assest/image/product/image5.jpg";

export default function product() {
  return (
    <>
      <div className="product-wrapper">
        <div className="product-main">
          {/* Top side */}
          <div className="top-side d-flex justify-content-between">

            <div className="image-side col-7 ">
              <img src={image1} alt="" />
            </div>

            <div className="option-side col-5">
              <div className="product-brand">
                <p>Brand names</p>
              </div>
              <div className="product-describe">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore quis dolorum unde? Dignissimos corrupti in modi dicta
                  dolorum, vitae rem quae provident architecto ipsa
                  voluptatibus!
                </p>
              </div>
              <div className="producr-price">$ 2.000</div>
              <div className="product-options flex-wrap d-flex justify-content-between">
              <div className="product-option col-5"> {optionTest()}</div>
              <div className="product-option col-5"> {optionTest()}</div>
              <div className="product-option col-5"> {optionTest()}</div>
              <div className="product-option col-5"> {optionTest()}</div>
              <div className="product-option col-5"> {optionTest()}</div>
              <div className="product-option col-5"> {optionTest()}</div>
              </div>
              <div className="counter-group">
                  <div className="counter-button"><p>-</p></div>
                  <div className="counter-button"><p>1</p></div>
                  <div className="counter-button"><p>+</p></div>
              </div>
              <button className="add-to-basket-button"><p>add to basket</p></button>
            </div>
            

          </div>
          {/* Top side */}
          <div className="image-groupe d-flex justify-content-between">
                <button className="slide-button">&#60;</button>
                <img className="slide-img"  src={image2}/>
                <img className="slide-img" src={image3}/>
                <img className="slide-img" src={image4}/>
                <img className="slide-img" src={image5}/>
                <button className="slide-button">&#62;</button>  
          </div>

          {/* Bottom side */}
          <div className="bottom-side">
              <div className="description">Description</div>
              <div className="detail">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum ratione, nam ipsa delectus voluptatibus eligendi voluptates eum autem perferendis! Sapiente optio alias consequuntur, dolores ratione nostrum vel quos fugit aspernatur, repellat soluta minus? Doloremque, beatae, ducimus fugiat repellendus nihil iusto praesentium dicta, sunt totam deserunt illum quidem officia nisi vel!</div>
              <div className="read-more">
                  <button>&darr;read more</button>
              </div>
          </div>
          {/* Bottom side */}
        </div>
      </div>
    </>
  );
}

function optionTest() {
  return (
    <select>
      <option value="volvo">value 1</option>
      <option value="saab">value 2</option>
      <option value="opel">value 3</option>
      <option value="audi">value 4</option>
    </select>
  );
}
