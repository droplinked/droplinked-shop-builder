import { useState } from "react";
import { DROPDOWN_TYPE } from "../dropdowns/dropdown.type";
import { Box } from "@chakra-ui/react";
import HeaderItem from "../components/header-button/Header-btn-component";
import SignUpModal from "../../../Modal/Register-modal/SignUpModal";
import LoginModal from "../../../Modal/Login-modal/login-modal";
import ResetPassModal from "../../../Modal/ResetPass-modal/ResetPassModal-component";
import WalletButton from "../components/wallet-button/wallet-button-component";
import Cart from "../icons/cart/cart-icon-component";
import DropdownContainer from "../dropdowns/dropdown-container/DropDown-container";

export default function DefaulHeader({ haventEmail }) {
  // state for show (login , singup , resetpass)modals
  const [signUpmodal, setSignModal] = useState(false);
  const [loginmodal, setloginModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  let url = window.location.pathname;

  const togglesignup = () => {
    setSignModal((p) => !p);
  };
  const toggleLogin = () => {
    setloginModal((p) => !p);
  };
  const toggleReset = () => {
    setResetModal((p) => !p);
  };

  // switch between signup and login  modals
  const switchToggl = () => {
    togglesignup();
    toggleLogin();
  };

  // switch between resetpass and login  modals
  const switchLogRes = () => {
    toggleLogin();
    toggleReset();
  };

  const openBasket = () => setDropdown(DROPDOWN_TYPE.BASKET);
  const close = () => setDropdown(null);

  // show login button
  // and if we are in landing page or email-confirmation or recoveri show join today
  // else show wallet icon
  return (
    <>
      {url == "/" ||
      url == "/:" ||
      url == "/email-confirmation" ||
      url == "/email-verification/:" ||
      url == "/producer/account-recovery/:token" ? (
        <>
          {/* <HeaderItem click={toggleLogin} mr={{ base: "10px", md: '20px' }} style={{ backgroundColor: "#181818" }}>Login</HeaderItem> */}
          <HeaderItem click={toggleLogin}>Login</HeaderItem>
        </>
      ) : (
        <Box d='flex' alignItems='center'>
          <Cart clickBasket={openBasket} />
          <Box mr={{base:'6px',md:'12px'}}></Box>
          <WalletButton haventEmail={haventEmail} />
          {dropdown && <DropdownContainer close={close} dropdown={dropdown} />}
        </Box>
      )}

      {/* show modals base on state */}
      {signUpmodal && (
        <SignUpModal close={togglesignup} switchToggle={switchToggl} />
      )}
      {loginmodal && (
        <LoginModal
          close={toggleLogin}
          switchToggle={switchToggl}
          switchReset={switchLogRes}
        />
      )}
      {resetModal && (
        <ResetPassModal
          backToLogin={switchLogRes}
          close={() => {
            setResetModal(false);
          }}
        />
      )}
    </>
  );
}
