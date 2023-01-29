import pb from "../lib/pocketbase";
import { Navigate } from "react-router-dom";

function LoggedIn({ children }) {
    return pb.authStore.isValid ? (
        <Navigate to="/questions" replace />
    ) : (
        children
    );
}

export default LoggedIn;
