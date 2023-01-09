import { Image, Box } from "@chakra-ui/react";
import { useState } from "react";

import HeaderItem from "../header-button/Header-btn-component";
import newWalletIcon from "../../../../../assest/icon/new-wallet-icon.svg";
import WalletModal from "../../../../../modals/wallet/WalletModal";

export default function WalletButton() {
  const [walletModal, setWalletModal] = useState(false);

  const toggleModal = () => setWalletModal((p) => !p);

  return (
    <>
      <HeaderItem color="white" click={toggleModal}>
        <Image
          w={{ base: "25px", md: "36px" }}
          h={{ base: "25px", md: "36px" }}
          mr={{ base: "0px", sm: "5px" }}
          src={newWalletIcon}
        />
        <Box
          d={{ base: "none", sm: "block" }}
          px={{ base: "-8px", sm: "0px" }}
          pt={{ base: "3px", md: "0px" }}
        >
          Connect
        </Box>
      </HeaderItem>
      <WalletModal show={walletModal} close={toggleModal} />
    </>
  );
}
