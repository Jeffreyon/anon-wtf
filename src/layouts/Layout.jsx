import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import { ToastContainer } from "react-toastify";

function Layout() {
    return (
        <div className=" min-h-screen flex flex-col justify-between">
            <div>
                <Navbar />
                <div className="max-w-6xl mx-auto px-4 pb-20 sm:px-3">
                    <Outlet />
                </div>
                <ToastContainer />
            </div>
            <footer>
                <p className="text-sm text-neutral-400 p-2 text-center">
                    Built with{" "}
                    <svg
                        className="w-4 h-4 inline fill-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                    </svg>{" "}
                    at The Backyard
                </p>
            </footer>
        </div>
    );
}

export default Layout;
