import "./modal-container-style.scss";

import { ModalContainerWrapper ,ModalBody} from "./modal-container-style";

export default function ModalContainer({ children, close }) {
  // prevent close modal when click on modal
  const handleChildClick = (event) => {
    event.stopPropagation();
  };

  return (
    <ModalContainerWrapper onMouseDown={close}>
      <ModalBody  onMouseDown={handleChildClick}>
        {children}
      </ModalBody>
    </ModalContainerWrapper>
  );
}

// className="medium-modal-body"
