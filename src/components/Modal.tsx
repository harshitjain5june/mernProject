import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const MODAL_STYLES: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgb(34, 34, 34)",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "70%",
  width: "70%",
};

const OVERLAY_STYLES: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 1000,
};

export default function Modal({ children, onClose }: ModalProps) {
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          className="btn bg-danger fs-4"
          style={{ marginLeft: "90%", marginTop: "-35px" }}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("cart")!,
  );
}
