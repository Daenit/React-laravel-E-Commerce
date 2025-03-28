import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.all.js"; // Correct import

function AdminPrivateRoute() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false); // Default to false
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/checkingAuthenticated')
            .then(res => {
                if (res.data.status === 200) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                    localStorage.removeItem('auth_token'); // Remove only if unauthenticated
                }
            })
            .catch(() => {
                setAuthenticated(false);
                localStorage.removeItem('auth_token'); // Remove only on failure
            })
            .finally(() => {
                setLoading(false);
            });

        // Axios Interceptor for Unauthorized, Forbidden, and Not Found Responses
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        Swal.fire({
                            title: "Unauthorized",
                            text: error.response.data.message || "Please login again.",
                            icon: "warning"
                        });
                        localStorage.removeItem('auth_token');
                        navigate('/login');
                    } 
                    else if (error.response.status === 403) {
                        Swal.fire({
                            title: "Forbidden",
                            text: error.response.data.message || "You don't have permission to access this page.",
                            icon: "error"
                        });
                        navigate('/403');
                    } 
                    else if (error.response.status === 404) {
                        Swal.fire({
                            title: "404 Error",
                            text: "Page Not Found",
                            icon: "warning"
                        });
                        navigate('/404'); 
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptor); // Cleanup interceptor on unmount
    }, [navigate]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h3>Checking Authentication...</h3>
                <p>Please wait...</p>
            </div>
        );
    }

    if (!authenticated || !localStorage.getItem('auth_token')) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default AdminPrivateRoute;
