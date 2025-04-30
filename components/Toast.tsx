"use client";

import { ToastContainer } from "react-toastify";
import { memo } from "react";

const Toast: React.FC = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={true}
      stacked={true}
    />
  );
};

export default memo(Toast);
