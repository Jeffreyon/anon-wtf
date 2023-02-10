import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="mx-auto max-w-lg">
            <Outlet />
        </div>
    );
}

export default AuthLayout;
