import React from "react";
import { Box, Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Icons
import AppIcons from "assest/icon/Appicons";

const MotionFlex = motion(Flex);

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
            <Flex alignItems={"center"} gap={"16px"}>
              <Box onClick={() => toggleEditMode(index)} cursor={"pointer"}>
                {!editableWallets.includes(index) ? <AppIcons.EditIconWhite /> : <AppIcons.Tick />}
              </Box>
              <Box onClick={() => removeWallet(index)} cursor={"pointer"}>
                <AppIcons.TrashRed />
              </Box>
            </Flex>
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
