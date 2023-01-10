import React from "react";

function Button({ text, onClick }) {
  return (
    <button
      type="button"
      className="border text-brand border-brand py-1 px-2 rounded hover:brightness-110"
      onClick={onClick}
    >
      {text ? text : "button"}
    </button>
  );
}

export default Button;
