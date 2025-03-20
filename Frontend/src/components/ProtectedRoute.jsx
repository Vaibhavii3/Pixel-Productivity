// import { Navigate } from "react-router-dom";
// import { getToken } from "../Services/authService";

// const ProtectedRoute = ({ children }) => {
//     const token = getToken();
//     console.log("ProtectedRoute check: token =", token);

//     return token() ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
