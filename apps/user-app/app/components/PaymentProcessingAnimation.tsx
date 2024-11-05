import React from "react";
import Lottie from "react-lottie-player";
import paymentProcessing from "../paymentProcessing.json";

export function PaymentProcessingAnimation() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold">Processing Payment...</h2>
        <div className="mt-4">
          <Lottie loop animationData={paymentProcessing} play></Lottie>
        </div>
      </div>
    </div>
  );
}
