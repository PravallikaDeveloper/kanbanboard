import './dialog.css';

import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
//

type DialogProps = {
  open: boolean;
  close: boolean;
  closeDialog: () => void;
  btnClass: string;
  btnText: string;
  openDialog: (x: boolean) => void;
  children: React.ReactNode;
};

const Dialog = (props: DialogProps) => {
  const [open, setOpen] = useState(false);
  function closeModal() { 
    props.closeDialog();
    setOpen(false);
  }

  useEffect(()=>{

    if(props.close) {
        closeModal();
    }

    if(props.open){
        openDialog()
    }
  }, [props.close, props.open, closeModal, openDialog]);

  function openDialog() {
    props.openDialog(true);
    setOpen(true);
  }

  return (
    <div>
      <button type="button" className={props.btnClass} onClick={() => openDialog()}>
        {props.btnText}
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="fixed w-full h-screen z-[-1] top-0 left-0 bg-black opacity-50"></div>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <div>
            {props.children}
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Dialog;