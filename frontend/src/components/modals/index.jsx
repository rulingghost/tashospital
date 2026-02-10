import { Fragment } from "react";
import modalData from "../../modal"
import ReactDOM from "react-dom";
import { destroyModal, useModals } from "../Utils/Modal"





const Backdrop = (props) => {
  return (
    <div
      className="backdrop-blur-sm bg-cyan-800/60 fixed w-screen h-screen top-0 left-0 z-50"
      onClick={() => {
        destroyModal()     
      }}
    ></div>
  );
};

const ModalOverlay = (props) => {
  const modals = useModals()
  
  return (
    <div>
      {modals.map((modal, key) => {
         //console.log(modal);
        
        const m = modalData.find(m => m.name === modal.name)
        // console.log(m);
        return( <m.element key={key} data = {modal.data} isEdit = {modal.isEdit} patientID= {modal.patientID} /> )
      })}
    </div>
  );
};

const index = () => {   

  return (
    <Fragment>
        {ReactDOM.createPortal(
          <Backdrop />,
          document.getElementById("backdrop-root")
        )}
        
        {ReactDOM.createPortal(
          <ModalOverlay />,
          document.getElementById("overlay-root")
        )}
    </Fragment>
  )
}

export default index