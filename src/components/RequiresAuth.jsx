import pb from "../lib/pocketbase";
import { Navigate, useLocation } from "react-router-dom";

function RequiresAuth({ children }) {
    const location = useLocation();
    return pb.authStore.isValid ? (
        children
    ) : (
        <Navigate to="/log-in" replace state={{ path: location.pathname }} />
    );
}

export default RequiresAuth;
