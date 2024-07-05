import React from "react";
import { Box, keyframes, useMediaQuery } from "@chakra-ui/react";

const sliceWrapperStyles = (length, index) => ({
  width: "50%",
  height: "50%",
  position: "absolute",
  left: "50%",
  top: "0px",
  transform: `translateX(-50%) rotate(${(360 / length) * index}deg)`,
  transformOrigin: "bottom center",
  stroke: "#2EC99E",
  strokeWidth: "0.5px"
});

const sliceStyles = {
  transform: "translateY(4.5px)",
  transition: "transform 0.3s ease",
};

const sliceStrokeAnimation = keyframes`
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 3;
  }
`;

const sliceStrokeStyles = {
  stroke: "#707070",
  transform: "scale(0.86) translateY(-1px)",
  transformOrigin: "center center",
  strokeWidth: "0.4px",
  strokeDasharray: "1",
  strokeDashoffset: "1",
  strokeMiterlimit: "10",
  strokeLinecap: "round",
  fill: "transparent",
  animation: `${sliceStrokeAnimation} 0.5s linear infinite`,
};

const sliceEmptyStyles = {
  fill: "#5E2F99",
  stroke: "#5E2F99",
  strokeWidth: "0.3",
  strokeMiterlimit: "10",
  transform: "translateY(-3px)",
  boxShadow: "0px 20px 50px 0px rgba(0, 0, 0, 0.75)",
};

const SliceIndicator = ({ slices }) => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  const containerSize = isLargerThan900 ? "500px" : isLargerThan600 ? "300px" : "200px";

  return (
    <Box
      width={containerSize}
      height={containerSize}
      position={"relative"}
      mx={"auto"}
    >
      {slices.map(({ active, lastSliceWon }, index) => (
        <Box
          as="svg"
          key={index}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 33 28.1"
          sx={sliceWrapperStyles(slices.length, index)}
        >
          <Box as="g" sx={sliceStyles}>
            {active ? (
              <g>
                <Box
                  as="path"
                  fill="#2EC99E"
                  d="M16.1,25.8c0,0,0.1,0.1,0.1,0.1c0.2,0.2,0.5,0.1,0.7-0.1l11.5-15.7c0,0,0,0,0,0
                    c0.2-0.2,0.1-0.5-0.1-0.7c-7.1-4.8-16.4-4.8-23.6,0c0,0,0,0,0,0C4.5,9.6,4.4,10,4.6,10.2L16.1,25.8L16.1,25.8z"
                  boxShadow="0px 15px 200px 25px rgba(45, 194, 153, 0.35)"
                />
              </g>
            ) : (
              <Box as="g">
                {lastSliceWon && (
                  <Box
                    as="path"
                    sx={sliceStrokeStyles}
                    d="M16.5,26.8c-0.3,0-0.6-0.1-0.8-0.3c-0.1-0.1-0.1-0.1-0.2-0.2c0,0-0.1-0.1-0.1-0.1L1.7,7.6C1.3,7,1.4,6.2,2,5.7 
                        c4.4-2.9,9.3-4.4,14.5-4.4c5.2,0,10.2,1.5,14.4,4.4c0.6,0.4,0.8,1.2,0.4,1.9L17.6,26.2C17.4,26.6,17,26.8,16.5,26.8z"
                  />
                )}
                <Box
                  as="path"
                  sx={sliceEmptyStyles}
                  d="M16.1,25.8c0,0,0.1,0.1,0.1,0.1c0.2,0.2,0.5,0.1,0.7-0.1l11.5-15.7c0,0,0,0,0,0
                    c0.2-0.2,0.1-0.5-0.1-0.7c-7.1-4.8-16.4-4.8-23.6,0c0,0,0,0,0,0C4.5,9.6,4.4,10,4.6,10.2L16.1,25.8L16.1,25.8z"
                />
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SliceIndicator;
