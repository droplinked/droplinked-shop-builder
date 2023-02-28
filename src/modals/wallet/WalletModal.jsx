import ModalWrapper from "../modal-wrapper/ModalWrapper";
import hiroWalletIcon from "../../assest/icon/hiroWalletIcon.svg";
import casperIcon from "../../assest/icon/casper-wallet-icon.svg";
import axios from "axios";
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
import {
  autuWithCasperTest,
  casper_login,
} from "../../utils/casperwallet/casperwallet-utils";

export const auth_err = {
  cancelled_signing: Symbol("User Cancelled Signing"),
  casper_signer_not_found: Symbol("Casper Signer not found"),
  general_error: Symbol("general error"),
};

const WalletModal = ({ show, close }) => {
  const dispatch = useDispatch();

  const profile = useSelector(selectCurrentProfile);

  const addUser = (data) => dispatch(setCurrentUser(data));

  const singInViaHiroWallet = async () => {
    signinViaHirowallet(profile, addUser);
  };


 const callWalletApi = async (wallet , publicKey , signature) => {
  try {
    const res = await axios.post(`https://apiv2.droplinked.com/auth/wallet`, {
      wallet:wallet ,
      publicKey:publicKey,
      signature:signature,
      type: "CASPER",
      email: '',
    });
      console.log('response : ' ,res.data);
    return res.data;
  } catch (err) {
      console.log('error : ' ,err.response.data);
   // return err.response.data.reason;
    // return err.response.data.reason;
  }
};


  const singInViaCasperWallet = async () => {
    console.log('click capser wallet');
    casper_login(
      (account_info) => {
        // Send this account_info to backend to check if it is valid
        //
        console.log("account : ", account_info);
        callWalletApi(account_info.account_hash , account_info.publicKey , account_info.signature)
      },
      (error) => {
        switch (error) {
          case auth_err.casper_signer_not_found:
            console.log("Casper wallet is not installed");
            break;
          case auth_err.cancelled_signing:
            console.log("User cancelled signing");
            break;
        }
      }
    );
    const x = {
      wallet:
        "261d24664f7d8b33193ab0a63ddb9a384b2ff0ef12b5ddb3a04b4fc72dd35747",
      publicKey:
        "017498b89ad40ab04a7b7af156e23a1a8abc05e0f49fb39c8c6b416ed2209004df",
      signature:
        "9436d4d0abcb65223bcafd10a38d1c6318204a362f41b4f05fd2b5467b95708d51b8692d31dee7dd728e72a7f650075c98a1f1b36eabf269b19c9f39ce1df208",
      type: "CASPER",
      email: "",
    };
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
        <WalletOptionItem onClick={singInViaCasperWallet}>
          <WalletOptionIcon src={casperIcon} fill="var(white)" />
          <WalletOptionName>Casper wallet</WalletOptionName>
        </WalletOptionItem>
      </Box>
    </ModalWrapper>
  );
};

export default WalletModal;
