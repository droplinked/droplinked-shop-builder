import "./modal-container-style.scss"


export default function ModalContainer({ children , close }) {

    // prevent close modal when click on modal
    const handleChildClick = event => {
        event.stopPropagation();
      };

    return (<>
        <div className="medium-modal-wrapper" onClick={close}>
            <div className="medium-modal-body" onClick={handleChildClick}>
                {children}
            </div>
        </div>
    </>)
}