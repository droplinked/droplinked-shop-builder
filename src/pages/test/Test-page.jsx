import { useState } from "react";

const Test = () => {
  // const [width, setWidth] = useState(400)
  // const [height, setHeight] = useState(400)

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  const click = () => {
    var browser = navigator;
    setText1(browser.appCodeName);
    setText2(browser.appVersion)
    setText3(browser.userAgentData.brands[2].brand)
    // let x = navigator.userAgent.match(/Android/i);
    // let y = navigator.userAgent.match(/iPhone/i);
    // let n = navigator.userAgent;
    // let txt = x + "<br/>" + y + "<br/>" + n;
    // setText1(x);
    // setText2(y);
    // setText3(n);
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
        <div style={{ color: "white", fontSize: "20px" }}>{text1}</div>
        <div style={{ color: "white", fontSize: "20px" }}>{text2}</div>
        <div style={{ color: "white", fontSize: "20px" }}>{text3}</div>

      </div>
    </>
  );
};

export default Test;
