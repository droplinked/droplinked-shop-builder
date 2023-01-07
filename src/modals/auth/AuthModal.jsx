import { useState } from "react";

import LoginModal from "../login/LoginModal";
import SignupModal from "../signup/SignupModal";

const MODAL_TYPE = {
  SIGNIN: "SIGNIN",
  SIGNUP: "SIGNUP",
};

const AuthModal = () => {
  const [modalType, setModalType] = useState(MODAL_TYPE.SIGNIN);

  const switchModal = () =>
    setModalType(
      modalType == MODAL_TYPE.SIGNIN ? MODAL_TYPE.SIGNUP : MODAL_TYPE.SIGNIN
    );

  return (
    <>
      {modalType == MODAL_TYPE.SIGNIN ? (
        <LoginModal show={show} close={close} switchModal={switchModal} />
      ) : (
        <SignupModal show={show} close={close} switchModal={switchModal} />
      )}
    </>
  );
};

export default AuthModal;
