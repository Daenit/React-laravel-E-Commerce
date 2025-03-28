import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Logo from "./Logo";

import routes from "../../routes/routes";

const MasterLayout = () => {

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/admin/assets/css/demo.css";
        link.id = "admin-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("admin-style")?.remove();
        };
    }, []);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/admin/assets/css/kaiadmin.min.css";
        link.id = "admin-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("admin-style")?.remove();
        };
    }, []);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/admin/assets/css/plugins.min.css";
        link.id = "admin-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("admin-style")?.remove();
        };
    }, []);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/admin/assets/css/bootstrap.min.css";
        link.id = "admin-style";
        document.head.appendChild(link);

        return () => {
            document.getElementById("admin-style")?.remove();
        };
    }, []);

    return (
        <div class="wrapper">
            <Sidebar />
            <div class="main-panel">
                <div class="main-header">
                    <Logo />

                    <Navbar />
                </div>
                <div className="container">
                    <Routes>
                        {routes.map((route, idx) =>
                            route.component ? (
                                <Route
                                    key={idx}
                                    path={route.path.replace("/admin", "")}
                                    element={<route.component />}
                                />
                            ) : null
                        )}
                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default MasterLayout;



<Routes>
{routes.map((route, idx) =>
    route.component ? (
        <Route
            key={idx}
            path={route.path.replace("/admin", "")}
            element={<route.component />}
        />
    ) : null
)}
</Routes>