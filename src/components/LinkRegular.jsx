import { Link } from "react-router-dom";

function LinkRegular({ label, linkTo }) {
    return (
        <Link
            className=" font-semibold text-lime-500 hover:text-lime-600 transition-colors delay-75 p-1"
            to={linkTo}>
            {label}
        </Link>
    );
}

export default LinkRegular;
