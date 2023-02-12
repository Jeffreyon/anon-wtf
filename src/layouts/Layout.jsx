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
                    Built with ❤ at The Backyard
                </p>
            </footer>
        </div>
    );
}

export default Layout;
