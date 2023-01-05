import React from "react";
import ModalContainer from "../modal-container/modal-container";
import { Title } from "../Login/login-modal-style";
import { Box } from "@chakra-ui/react";
import StacksLogo from "../../../assest/image/stacks-stx-logo.svg";
import CasperLogo from "../../../assest/image/casper-cspr-logo.svg";

import "./ConnectWalletModal.scss";

export default function ConnectWalletModal({ close, clickHiro, clickCasper }) {
  return (
    <ModalContainer close={close}>
      <Box w="100%">
        <Title>Select Wallet</Title>
        <Box w="100%" pt="20px">
          <div className="wallet-container">
            <img src={StacksLogo} className="stx-logo" />
            <p onClick={clickHiro}>connect Hiro Wallet</p>
          </div>
          <div className="wallet-container">
            <img src={CasperLogo} className="cspr-logo" />
            <p onClick={clickCasper}>connect Casper</p>
          </div>
        </Box>
      </Box>
    </ModalContainer>
  );
}
