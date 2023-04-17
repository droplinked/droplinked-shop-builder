import { Stack, Text } from "@chakra-ui/react";
import ModalWrapper from "../modal-wrapper/ModalWrapper";
import { Icon, Title, WalletContainerBox } from "./WalletModal-style";
import CasperSigner from "../../assest/icon/casper-signer-icon.svg";
import CasperWallet from "../../assest/icon/casper-wallet-icon.svg";
import WalletConnect from "../../assest/icon/wallet-connect-icon.svg";
import MetaMask from "../../assest/icon/meta-mask-icon.svg";
import NearWallet from "../../assest/icon/near-wallet-icon.svg";
import UnstoppableDomains from "../../assest/icon/unstoppable-domains-icon.svg";

export default function WalletModal({ show, close }) {
  return (
    <ModalWrapper show={show} close={close}>
      <Title>Choose Your Wallet</Title>
      <Stack spacing="16px" mt={10}>
        {[
          {
            icon: CasperSigner,
            label: "Casper Signer",
          },
          {
            icon: CasperWallet,
            label: "Casper Wallet",
          },
          {
            icon: WalletConnect,
            label: "Wallet Connect",
          },
          {
            icon: MetaMask,
            label: "MetaMask",
          },
          {
            icon: NearWallet,
            label: "NEAR Wallet",
          },
          {
            icon: UnstoppableDomains,
            label: "Unstoppable Domains",
          },
        ].map((wallet) => (
          <WalletContainerBox key={wallet.label}>
            <Icon src={wallet.icon} />
            <Text fontSize="sm" color="lightgray">
              {wallet.label}
            </Text>
          </WalletContainerBox>
        ))}
      </Stack>
    </ModalWrapper>
  );
}
