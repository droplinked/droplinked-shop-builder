import { Box, Text, Flex } from "@chakra-ui/react";

//import rightIcon from "../../../../../assest/icon/fillsize.svg"
import { ReactComponent as RightIcon } from "../../../../../assest/icon/fillsize.svg";
import { ReactComponent as XverseIcon } from "../../../../../assest/icon/xverseIcon.svg";
import { ReactComponent as HiroWalletIcon } from "../../../../../assest/icon/hiroWalletIcon.svg";
import { ItemContainer, IconWrapper } from "./wallet-modal-style";
import { useNavigate } from "react-router-dom";

import ModalContainer from "../../../../Modal/modal-container/modal-container";


const WalletModal = () => { 

const navigate = useNavigate()

  return (
    <ModalContainer>
      <Box>
        <Text
          color="#ccc"
          fontWeight="600"
          fontSize="18px"
          w="100%"
          textAlign="center"
          mb="20px"
        >
          Connect your wallet
        </Text>
        {/* ... */}
        <ItemContainer >
          <Flex h="100%" w="100%" justifyContent="start" alignItems="center">
            <IconWrapper>
              <HiroWalletIcon fill="red" color="red" />
            </IconWrapper>
            <Box h="100%" ml="10px">
              <Text color="white" fontSize="14px">
                hiro wallet
              </Text>
              <Text color="white" fontSize="10px">
                Browse with pc to connect your Hiro wallet
              </Text>
            </Box>
          </Flex>
          <RightIcon />
        </ItemContainer>
         {/* ... */}
        <Box mb="20px"></Box>
         {/* ... */}
        <ItemContainer cursor='pointer' as='a' href={'https://www.xverse.app/'}>
          <Flex h="100%" w="100%" justifyContent="start" alignItems="center">
            <IconWrapper pt='15px'>
              <XverseIcon />
            </IconWrapper>
            <Box h="100%" ml="10px">
              <Text color="white" fontSize="14px">
                Xverse wallet
              </Text>
              <Text color="white" fontSize="10px">
                Mobile browser for stack
              </Text>
            </Box>
          </Flex>
          <RightIcon />
        </ItemContainer>
          {/* ... */}
      </Box>
    </ModalContainer>
  );
};

export default WalletModal;
