import React, { ReactElement, useEffect } from "react";
import "./Message.css";

interface MessageProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const Message = ({ type, message, onClose }: MessageProps): ReactElement => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`message-container message-${type}`}>
      <p>{message}</p>
      <button className="message-close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Message;
