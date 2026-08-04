function Loader({ size = "md" }) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          ${sizes[size]}
          animate-spin
          rounded-full
          border-blue-600
          border-t-transparent
        `}
      />
    </div>
  );
}

export default Loader;