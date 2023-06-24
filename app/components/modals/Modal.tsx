"use client";

import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  dontShowButton?: boolean;
  open?: boolean;
  payment?: boolean;
  onClose: (e: any) => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  dontShowButton,
  onClose,
  onSubmit,
  title,
  payment,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(open);

  useEffect(() => {
    setShowModal(open);
  }, [open]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!open) {
    return null;
  }

  return (
    // Note where ever you see "scrollBar-hidden" note that it is a class created in the globalcss file to hide scroll bar
    <>
      <div className="fixed w-full h-screen inset-0 flex items-center justify-center cursor-auto z-[99999]">
        <div
          className="outline-none focus:outline-none bg-neutral-800/70 fixed w-full h-screen top-0 left-0"
          onClick={handleClose}
        ></div>
        <div
          className={`
      translate
      duration-300
      w-[90%] h-[90vh] ${
        payment
          ? "800px:w-[80%] 800px:h-[90vh] lg:w-[60%] "
          : "800px:w-[55%] 800px:h-[90vh]"
      } 800px:w-[55%] 800px:h-[90vh]
      relative flex flex-col mx-auto border-0
      rounded-lg shadow-lg
      bg-white outline-none focus:outline-none overflow-y-auto scrollBar-hidden
      ${showModal ? "translate-y-0" : "translate-y-full"}
      ${showModal ? "opacity-100" : "opacity-0"}
    `}
        >
          <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
            <button
              className="p-1 border-0 hover:opacity-70 transition absolute left-9"
              onClick={handleClose}
            >
              <IoMdClose size={18} />
            </button>
            <div className="text-lg font-semibold">{title}</div>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto w-full">{body}</div>
          {/*footer*/}
          <div className="flex flex-col gap-2 p-6">
            <div className="flex flex-row items-center gap-4 w-full">
              {secondaryActionLabel && (
                <Button
                  disabled={disabled}
                  label={secondaryActionLabel}
                  onClick={handleSecondaryAction}
                  outline
                />
              )}
              {!dontShowButton && (
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              )}
            </div>
            {footer}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

// {/* <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
// <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-[90%] md:h-[90%] ">  */}
