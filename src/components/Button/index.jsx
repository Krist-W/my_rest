import React from "react";

function Button({ title, handleClick, order }) {
  return (
    <button
    onClick={(event) => handleClick(event)} className="transition duration-0 hover:duration-700 bg-gradient-to-r from-[#FABCC6] hover:from-[#ed92a0] text-gray-800 item-center border border-solid border-colour-white text-colour-white rounded-full text-xl font-semibold px-4 py-2 shadow-md"
    >
      {title}
    </button>
  );
}

export default Button;
