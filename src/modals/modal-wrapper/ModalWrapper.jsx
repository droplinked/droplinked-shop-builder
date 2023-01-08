import "./ModalWrapper-style.scss";

import { ModalContainerWrapper, ModalBody } from "./ModalWrapper-style";

const ModalWrapper = ({ children, show, close }) => {
  if (!show) return null;

  const handleChildClick = (event) => {
    event.stopPropagation();
  };

  return (
    <ModalContainerWrapper onMouseDown={close}>
      <ModalBody onMouseDown={handleChildClick}>{children}</ModalBody>
    </ModalContainerWrapper>
  );
};

export default ModalWrapper;
