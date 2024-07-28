import { MODAL_TYPE } from "pages/public-pages/homePage/HomePage";
import React, { useState } from "react";
import CompleteGoogelModal from "../complete-google/CompleteGoogelModal";
import LoginModal from "../login-modal/LoginModal";
import ResetPassModal from "../reset-pass-modal/ResetPassModal";
import SignupModal from "../signup-modal/SignupModal";

const AuthModal = ({ show, close, shopName, type = MODAL_TYPE.SIGNIN, isFromPlansPage, subscriptionPlan }: { show: boolean; close: () => void; shopName?: string; type?: MODAL_TYPE; isFromPlansPage?: boolean; subscriptionPlan?: any }) => {
  const [modalType, setModalType] = useState(type ? type : MODAL_TYPE.SIGNIN);

  const switchModal = () => setModalType(modalType === MODAL_TYPE.SIGNIN ? MODAL_TYPE.SIGNUP : MODAL_TYPE.SIGNIN);
  const switchModalWithType = (type: MODAL_TYPE) => setModalType(type)
  const switchResetModal = () => setModalType(modalType === MODAL_TYPE.SIGNIN ? MODAL_TYPE.RESET : MODAL_TYPE.SIGNIN);
  const closeModal = () => { setModalType(type ? type : MODAL_TYPE.SIGNIN); close(); }

  const correctComponent = () => {
    switch (modalType) {
      case MODAL_TYPE.SIGNIN: return <LoginModal show={show} close={closeModal} switchModal={switchModal} switchReset={switchResetModal} />
      case MODAL_TYPE.SIGNUP: return <SignupModal show={show} close={closeModal} switchModal={switchModal} shopName={shopName} />
      case MODAL_TYPE.RESET: return <ResetPassModal show={show} close={closeModal} switchReset={switchResetModal} />
      case MODAL_TYPE.GOOGLE: return <CompleteGoogelModal show={show} close={closeModal} switchModal={switchModalWithType} />
    }
  };
  return <>{correctComponent()}</>;
};

export default AuthModal;
