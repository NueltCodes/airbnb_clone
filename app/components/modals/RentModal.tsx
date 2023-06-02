"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useState, useMemo } from "react";

const RentModal = () => {
  enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
  }
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLable = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  return (
    <div>
      <Modal
        // disabled={isLoading}
        open={rentModal.open}
        title="Airbnb your home"
        actionLabel={actionLable}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        // footer={footerContent}
      />
    </div>
  );
};

export default RentModal;
