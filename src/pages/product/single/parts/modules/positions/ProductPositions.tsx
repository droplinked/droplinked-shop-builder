import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import shirtBack from "assest/image/positions/back.svg";
import shirtCenter from "assest/image/positions/center.svg";
import shirtLeft from "assest/image/positions/left.svg";
import shirtRight from "assest/image/positions/right.svg";
import pantLeft from "assest/image/positions/pent-left.svg";
import pantRight from "assest/image/positions/pent-right.svg";
import backNeck from "assest/image/positions/back-neck.svg";

interface IProps {
  update(element: string): void;
  state: Array<string>;
  positions: Array<string>;
}

function ProductPositions({ update, state, positions }: IProps) {
  const icons = {
    FRONT_CENTER: shirtCenter,
    FRONT_RIGHT_CHEST: shirtLeft,
    FRONT_LEFT_CHEST: shirtRight,
    BACK_CENTER: shirtBack,
    LEFT_LEG_FRONT: pantLeft,
    RIGHT_LEG_FRONT: pantRight,
    BACK_NECK: backNeck,
  };

  return (
    <Flex gap={3}>
      {positions.map((el: any, key: number) => (
        <Box key={key}>
          <Image
            style={{
              border: `3px solid ${state.includes(el) ? "#2EC99E" : "transparent"
                }`,
              borderRadius: "8px",
            }}
            onClick={() => update(el)}
            src={icons[el]}
            cursor="pointer"
            width="58px"
            height="58px"
          />
        </Box>
      ))}
    </Flex>
  );
}

export default ProductPositions;
