import LinkRegular from "./LinkRegular";
import { useState } from "react";
import pb from "../lib/pocketbase";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const navigate = useNavigate();

    const toggleNavLinks = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const logout = () => {
        pb.authStore.clear();
        navigate("/log-in");
    };

    return (
        <div>
            <div className="py-3 px-4 sm:p-3 flex justify-between items-center max-w-6xl mx-auto">
                <div>
                    <p className=" font-mono font-semibold text-2xl text-white">
                        <span>anon</span>
                        <span className="text-lime-400">.wtf</span>
                    </p>
                </div>
                <div className="hidden md:block">
                    <NavLinks />
                </div>
                <div className="md:hidden">
                    <button onClick={toggleNavLinks}>
                        {isMobileNavOpen ? "Close" : "Open"}
                    </button>
                </div>
            </div>
            <div
                className={
                    "bg-neutral-900 border-y border-neutral-800 p-4 md:hidden" +
                    (isMobileNavOpen ? "" : " hidden")
                }>
                <div className="flex flex-col md:flex-row gap-5 md:items-center w-full md:w-auto ">
                    {pb.authStore.isValid ? (
                        <NavLoggedIn logoutHandler={logout} />
                    ) : (
                        <NavLinks />
                    )}
                    <LinkRegular label="About" linkTo="/about" />
                </div>
            </div>
        </div>
    );
}

function NavLinks() {
    return (
        <>
            <LinkRegular label="Home" linkTo="/" />
            <LinkRegular label="Get started" linkTo="/sign-up" />
            <LinkRegular label="Log in" linkTo="/log-in" />
        </>
    );
}

function NavLoggedIn({ logoutHandler }) {
    return (
        <>
            <LinkRegular label="Your Questions" linkTo="/questions" />
            <button
                className=" font-semibold text-lime-500 hover:text-lime-600 transition-colors delay-75 p-1 flex"
                onClick={logoutHandler}>
                Log out
            </button>
        </>
    );
}

export default Navbar;
