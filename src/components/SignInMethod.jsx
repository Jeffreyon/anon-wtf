function SignInMethod({ label, handleClick }) {
    return (
        <button
            onClick={handleClick}
            className="py-4 px-8 border border-neutral-600 rounded font-semibold uppercase tracking-widest">
            {label}
        </button>
    );
}

export default SignInMethod;
