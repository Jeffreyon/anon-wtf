function Button({ label, ...rest }) {
    return (
        <button
            {...rest}
            className="py-4 px-8 bg-lime-400 rounded-full text-black font-semibold uppercase tracking-widest inline-block">
            {label}
        </button>
    );
}

export default Button;
