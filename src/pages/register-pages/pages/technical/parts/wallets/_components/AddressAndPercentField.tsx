import React from "react";
import { Box, Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Icons
import AppIcons from "assest/icon/Appicons";

// Components
import SaveBtn from "./field-save-btn/SaveBtn";

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

const AddressAndPercentField = ({
  wallet,
  index,
  handleAddressChange,
  handlePercentChange,
  toggleEditMode,
  removeWallet,
  editableWallets,
  persistWalletAddress
}) => {
  return (
    <MotionFlex
      alignItems={"center"}
      gap={"8px"}
      alignSelf={"stretch"}
      width={"100%"}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Flex
        bgColor={"mainLayer"}
        borderRadius={"8px"}
        width={"85%"}
        height={"48px"}
        padding={"0px 8px 0px 16px"}
        alignItems={"center"}
        alignSelf={"stretch"}
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
            disabled={!editableWallets.includes(index)}
          />
          <InputRightElement width="4.5rem" marginLeft={"16px"}>
            {editableWallets.includes(index) ?
              <MotionBox
                key="save-btn"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.5 }}
              >
                <SaveBtn onClickHandler={() => toggleEditMode(index)} />
              </MotionBox>
            : 
              <MotionFlex
                key="edit-delete-icons"
                alignItems={"center"}
                gap={"16px"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Box onClick={() => toggleEditMode(index)} cursor={"pointer"}>
                  <AppIcons.EditIconWhite />
                </Box>
                <Box onClick={() => removeWallet(index)} cursor={"pointer"}>
                  <AppIcons.TrashRed />
                </Box>
              </MotionFlex>
            }
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex
        bgColor={"mainLayer"}
        borderRadius={"8px"}
        width={"15%"}
        height={"48px"}
        padding={"0px 8px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Input
          type="number"
          placeholder="%"
          spellCheck={false}
          value={wallet.percent}
          onChange={(e) => handlePercentChange(e, index)}
          border={"none"}
          focusBorderColor="transparent"
          min={1}
          max={100}
          onBlur={persistWalletAddress}
        />
      </Flex>
    </MotionFlex>
  );
};

export default AddressAndPercentField;
