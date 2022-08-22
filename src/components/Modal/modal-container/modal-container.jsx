import "./modal-container-style.scss";

export default function ModalContainer({ children, close, center }) {
  // prevent close modal when click on modal
  const handleChildClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div
        className="medium-modal-wrapper"
        style={{
          display: `${center ? "flex" : ""}`,
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={close}
      >
        <div className="medium-modal-body" onClick={handleChildClick}>
          {children}
        </div>
      </div>
    </>
  );
}
