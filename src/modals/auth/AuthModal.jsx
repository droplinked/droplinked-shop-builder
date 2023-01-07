import { useState } from "react";

import LoginModal from "../login/LoginModal";
import SignupModal from "../signup/SignupModal";
import ResetPassModal from "../resetpass/ResetPassModal";

const MODAL_TYPE = {
  SIGNIN: "SIGNIN",
  SIGNUP: "SIGNUP",
  RESET: "RESET",
};

const AuthModal = ({ show, close }) => {
  const [modalType, setModalType] = useState(MODAL_TYPE.SIGNIN);

  const switchModal = () =>
    setModalType(
      modalType == MODAL_TYPE.SIGNIN ? MODAL_TYPE.SIGNUP : MODAL_TYPE.SIGNIN
    );

    const switchResetModal = () =>
    setModalType(
      modalType == MODAL_TYPE.SIGNIN ? MODAL_TYPE.RESET : MODAL_TYPE.SIGNIN
    );

  const correctComponent = () => {
    switch (modalType) {
      case MODAL_TYPE.SIGNIN:
        return (
          <LoginModal show={show} close={close} switchModal={switchModal} switchReset={switchResetModal}/>
        );
      case MODAL_TYPE.SIGNUP:
        return (
          <SignupModal show={show} close={close} switchModal={switchModal}  />
        );
      case MODAL_TYPE.RESET:
        return (
          <ResetPassModal show={show} close={close} switchReset={switchResetModal} />
        );
    }
  };

  return <>{correctComponent()}</>;
};

export default AuthModal;
