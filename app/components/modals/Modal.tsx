"use client";

import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  open?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
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
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div
          className={`relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-[90%] md:h-[90%] overflow-y-scroll bg-white rounded-lg scrollBar-hidden translate duration-300   ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          {/* content */}
          <div
            className={`translate duration-300 h-full ${
              showModal
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <div
              className="w-full min-h-min 
            translate lg:h-auto md:h-auto border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"
            >
              <div className="flex items-center p-6 rounded-t relative border-b-[1px]">
                <div onClick={handleClose}>
                  <button className="p-1 border-0 hover:opacity-70 transition absolute left-0">
                    <IoMdClose />
                  </button>
                  <div className="text-lg font-semibold cursor-pointer">
                    {title}
                  </div>
                </div>
              </div>
              {/* body */}
              <div className="relative p-6 flex-auto">{body}</div>
              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}

                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

// {/* <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
// <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-[90%] md:h-[90%] ">  */}
