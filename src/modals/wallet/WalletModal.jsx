import ModalWrapper from "../modal-wrapper/ModalWrapper";
import hiroWalletIcon from "../../assest/icon/headerWalletIcon.svg";

import {
  WalletOptionItem,
  WalletOptionIcon,
  WalletOptionName,
  Title,
} from "./WalletModal-style";
import { signinViaHirowallet } from "../../utils/hirowallet/hirowallet-utils";
import { setCurrentUser } from "../../store/profile/profile.action";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentProfile } from "../../store/profile/profile.selector";
import { autuWithCasperTest } from "../../utils/casperwallet/casperwallet-utils"

const WalletModal = ({ show, close }) => {
  const dispatch = useDispatch();

  const profile = useSelector(selectCurrentProfile);

  const addUser = (data) => dispatch(setCurrentUser(data))

  const singInViaHiroWallet = async () => {
    signinViaHirowallet(profile, addUser);
  };


  return (
    <ModalWrapper show={show} close={close}>
      <Box w="100%">
        <Title>Select wallet</Title>
        <Box mb="30px"></Box>
        <WalletOptionItem onClick={singInViaHiroWallet}>
          <WalletOptionIcon src={hiroWalletIcon} />
          <WalletOptionName>Hiro wallet</WalletOptionName>
        </WalletOptionItem>
        <Box mb="16px"></Box>
        <WalletOptionItem onClick={autuWithCasperTest}>
          <WalletOptionIcon src={hiroWalletIcon} fill="var(white)" />
          <WalletOptionName>Casper wallet</WalletOptionName>
        </WalletOptionItem>
      </Box>
    </ModalWrapper>
  );
};

export default WalletModal;
