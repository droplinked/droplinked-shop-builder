import React from "react";
import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SaveBtn from "./field-save-btn/SaveBtn";

const MotionBox = motion(Box);

const AddAddressField = ({ wallet, index, handleAddressChange, saveWalletAddress }) => {
  return (
    <MotionBox
      bgColor={"mainLayer"}
      borderRadius={"8px"}
      width={"100%"}
      height={"48px"}
      padding={"0px 8px 0px 16px"}
      display={"flex"}
      alignItems={"center"}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <InputGroup>
        <Input
          type="text"
          placeholder="Enter your target wallet address"
          spellCheck={false}
          value={wallet.destinationAddress}
          onChange={(e) => handleAddressChange(e, index)}
          border={"none"}
          focusBorderColor="transparent"
          maxWidth={"90%"}
        />
        <InputRightElement width='4.5rem' bgColor={"mainLayer"} borderRadius={"8px"} paddingLeft={"8px"}>
          <SaveBtn onClickHandler={() => saveWalletAddress(index)} isDisabled={wallet.destinationAddress === ""} />
        </InputRightElement>
      </InputGroup>
    </MotionBox>
  );
};

export default AddAddressField;
