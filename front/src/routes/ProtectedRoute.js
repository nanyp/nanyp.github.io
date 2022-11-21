import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "../actions/userActions";

const ProtectedRoute = ({ children, isAdmin }) => {
    const { isAuthenticated = false, loading = true, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(loadUser());
        }
    }, [dispatch, isAuthenticated, loading, user])

    if (loading) return <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>;

    if (loading === false && isAuthenticated) {
        if (isAdmin === true & user.role !== "admin") {
            return <Navigate to="/" />;
        }
        return children;
    }
    else {
        return <Navigate to={"/login"} />;
    }
}

export default ProtectedRoute;