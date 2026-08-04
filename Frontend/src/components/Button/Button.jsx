function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        rounded-lg
        bg-blue-600
        px-4
        py-2.5
        text-white
        font-semibold
        transition-all
        duration-200
        hover:bg-blue-700
        active:scale-95
        disabled:cursor-not-allowed
        disabled:bg-gray-400
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;