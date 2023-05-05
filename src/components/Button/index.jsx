function Button(props) {
  const { title, handleClick, type, disabled } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={(event) => handleClick(event)}
      className="transition duration-0 hover:duration-700 bg-gradient-to-r from-[#FABCC6] hover:from-[#ed92a0] text-gray-800 p-3 m-3 item-center border border-solid border-colour-white text-colour-white rounded-full text-xl font-semibold px-4 py-2 shadow-md"
    >
      {title}
    </button>
  );
}

export default Button;

//переписать кнопку