import React from "react";

interface IButtonProps {
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
}

function Button({ text, onClick, isDisabled }: IButtonProps) {
  return (
    <button
      type="button"
      className="border text-brand border-brand py-1 px-2 rounded hover:brightness-110"
      onClick={onClick}
      disabled={isDisabled}
    >
      {text ? text : "button"}
    </button>
  );
}

export default Button;
