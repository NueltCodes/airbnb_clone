"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <div className="z-50">
      <Toaster />
    </div>
  );
};

export default ToasterProvider;
