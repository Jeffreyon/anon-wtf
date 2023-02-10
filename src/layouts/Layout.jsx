import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

function Layout() {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 sm:px-3">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
