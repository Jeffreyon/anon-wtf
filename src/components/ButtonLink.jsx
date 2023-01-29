import { Link } from "react-router-dom";

function ButtonLink({ label, linkTo }) {
    return (
        <Link
            to={linkTo}
            className="py-4 px-8 bg-lime-400 rounded-full text-black font-semibold uppercase tracking-widest mx-auto">
            {label}
        </Link>
    );
}

export default ButtonLink;
