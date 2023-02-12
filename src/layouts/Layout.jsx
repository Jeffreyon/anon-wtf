import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import { ToastContainer } from "react-toastify";

function Layout() {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 pb-20 sm:px-3">
                <Outlet />
            </div>
            <ToastContainer />
        </>
    );
}

export default Layout;
