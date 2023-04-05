import { useState ,useEffect } from "react";

import LoginModal from "../login-modal/LoginModal";
import SignupModal from "../signup/SignupModal";
import ResetPassModal from "../reset-pass-modal/ResetPassModal";

const MODAL_TYPE = {
  SIGNIN: "SIGNIN",
  SIGNUP: "SIGNUP",
  RESET: "RESET",
};

const AuthModal = ({ show, close ,shopName , type }) => {

  const [modalType, setModalType] = useState((type)?type:MODAL_TYPE.SIGNIN);

  const switchModal = () =>
    setModalType(
      modalType == MODAL_TYPE.SIGNIN ? MODAL_TYPE.SIGNUP : MODAL_TYPE.SIGNIN
    );

    const switchResetModal = () =>
    setModalType(
      modalType == MODAL_TYPE.SIGNIN ? MODAL_TYPE.RESET : MODAL_TYPE.SIGNIN
    );

    const closeModal = () => {
      setModalType((type)?type:MODAL_TYPE.SIGNIN);
      close()
    }


  const correctComponent = () => {
    switch (modalType) {
      case MODAL_TYPE.SIGNIN:
        return (
          <LoginModal show={show} close={closeModal} switchModal={switchModal} switchReset={switchResetModal}/>
        );
      case MODAL_TYPE.SIGNUP:
        return (
          <SignupModal show={show} close={closeModal} switchModal={switchModal} shopName={shopName}  />
        );
      case MODAL_TYPE.RESET:
        return (
          <ResetPassModal show={show} close={closeModal} switchReset={switchResetModal} />
        );
    }
  };

  return <>{correctComponent()}</>;
};

export default AuthModal;
