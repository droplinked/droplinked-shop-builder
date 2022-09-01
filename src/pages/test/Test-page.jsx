import { useState } from "react";

const Test = () => {
  // const [width, setWidth] = useState(400)
  // const [height, setHeight] = useState(400)

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  const click = () => {
    console.log(appConfig);
    setText1(appConfig.authenticatorURL)
  //   var browser = navigator;
  //   if(browser.userAgentData.mobile)setText1("mobile");
  //   else setText1("Pc");
     

  };

  return (
    <>
      {/* <input type="number" value={width} onChange={e => setWidth(e.target.value)} />
        <input type="number" value={height} onChange={e => setHeight(e.target.value)} /> */}
      <button onClick={click} style={{ backgroundColor: "white" }}>
        get
      </button>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
         <div style={{ color: "white", fontSize: "20px" }}>device: {text1}</div>
        <div style={{ color: "white", fontSize: "20px" }}>brand : {text2}</div> 
         <div style={{ color: "white", fontSize: "20px" }}>userAgent : {text3}</div> 

      </div>
    </>
  );
};

export default Test;
