import ModalWrapper from "../modal-wrapper/ModalWrapper";
import hiroWalletIcon from "../../assest/icon/headerWalletIcon.svg";



import {
  WalletOptionItem,
  WalletOptionIcon,
  WalletOptionName,
  Title
} from "./WalletModal-style";
import { useProfile } from "../../context/profile/ProfileContext";
import { Box } from "@chakra-ui/react";

const WalletModal = ({ show, close }) => {

    const { signinWithaWallet } = useProfile();

    const singInViaHiroWallet = () => signinWithaWallet()

  return (
    <ModalWrapper show={show} close={close}>
      <Box w="100%">
        <Title>Select wallet</Title>
        <Box mb='30px' ></Box>
        <WalletOptionItem onClick={singInViaHiroWallet}>
          <WalletOptionIcon src={hiroWalletIcon} />
          <WalletOptionName>Hiro wallet</WalletOptionName>
        </WalletOptionItem>
        <Box mb="16px"></Box>
        <WalletOptionItem>
          <WalletOptionIcon src={hiroWalletIcon} fill='var(white)' />
          <WalletOptionName>Casper wallet</WalletOptionName>
        </WalletOptionItem>
      </Box>
    </ModalWrapper>
  );
};

export default WalletModal;



