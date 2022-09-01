import { useState } from "react";

const Test = () => {
  // const [width, setWidth] = useState(400)
  // const [height, setHeight] = useState(400)

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  const click = () => {
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
    {
        setText1('Opera');
    }
    else if(navigator.userAgent.indexOf("Edg") != -1 )
    {
        setText1('Edge');
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 )
    {
        setText1('Chrome');
    }
    else if(navigator.userAgent.indexOf("Safari") != -1)
    {
        setText1('Safari');
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
    {
         setText1('Firefox');
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
    {
      setText1('IE'); 
    }  
    else 
    {
       setText1('unknown');
    }
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
         <div style={{ color: "white", fontSize: "20px" }}>browser: {text1}</div>
        {/* <div style={{ color: "white", fontSize: "20px" }}>brand : {text2}</div> 
         <div style={{ color: "white", fontSize: "20px" }}>userAgent : {text3}</div>  */}

      </div>
    </>
  );
};

export default Test;
