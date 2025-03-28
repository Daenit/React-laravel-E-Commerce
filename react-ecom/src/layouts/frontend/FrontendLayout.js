import {React, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../../layouts/frontend/Navbar";
import PublicRoutesList from "../../routes/Publicroutelist";
import Footer from "./Footer";

const FrontendLayout = () => {

    useEffect(() => {
        // Load user styles
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Lora:wght@600;700&display=swap";
        link.id = "user-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("user-style")?.remove();
        };
    }, []);

    useEffect(() => {
        // Load user styles
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com";
        link.id = "user-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("user-style")?.remove();
        };
    }, []);

    useEffect(() => {
        // Load user styles
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.gstatic.com";
        link.id = "user-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("user-style")?.remove();
        };
    }, []);

    useEffect(() => {
        // Load user styles
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/users/lib/animate/animate.min.css";
        link.id = "user-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("user-style")?.remove();
        };
    }, []);

    useEffect(() => {
        // Load user styles
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/users/lib/owlcarousel/assets/owl.carousel.min.css";
        link.id = "user-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("user-style")?.remove();
        };
    }, []);

    useEffect(() => {
        // Load user styles
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/users/css/bootstrap.min.css";
        link.id = "user-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("user-style")?.remove();
        };
    }, []);

    useEffect(() => {
        // Load user styles
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/users/css/style.css";
        link.id = "user-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("user-style")?.remove();
        };
    }, []);

    useEffect(() => {
        // Load user styles
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css";
        link.id = "user-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("user-style")?.remove();
        };
    }, []);

    useEffect(() => {
        // Load user styles
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css";
        link.id = "user-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("user-style")?.remove();
        };
    }, []);

    return (
        <div>
            <Navbar />
                    <Routes>
                        {PublicRoutesList.map((routedata, idx) => (
                            routedata.component && (
                                <Route
                                    key={idx}
                                    path={routedata.path}
                                    element={<routedata.component />}
                                />
                            )
                        ))}
                </Routes>
            <Footer />

            <a href="#" class="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i class="bi bi-arrow-up"></i></a>
        </div>
    );
};

export default FrontendLayout;
