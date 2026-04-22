const Button = ({ children, type = 'button', bgColor = 'bg-gray-800 hover:bg-gray-900', textColor = 'text-white', className = '', disabled = false, onClick, ...props }) => {
    return (<button type={type} disabled={disabled} onClick={onClick} className={`${bgColor} ${textColor} ${className} rounded-lg py-2 sm:py-2.5 px-4 sm:px-6 hover:shadow-lg transition-all duration-300 font-semibold text-sm sm:text-base ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} {...props}>
      {children}
    </button>);
};
export default Button;
