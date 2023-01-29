import React from "react";
import { HashLoader } from "react-spinners";

function LoadingComponent({ loading }) {
    return (
        <div className="flex justify-center items-center mt-52">
            <HashLoader color="#a3e635" loading={loading} />
        </div>
    );
}

export default LoadingComponent;
