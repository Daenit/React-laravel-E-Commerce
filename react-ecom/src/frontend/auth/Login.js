import {React, useState, useEffect } from "react";
import Navbar from "../../layouts/frontend/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../layouts/frontend/Footer";

function Login() {
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: {},
    });

    const handleInput = (e) => {
        setLogin(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        };

        axios.post("/api/login", data)
            .then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);
                    localStorage.setItem("auth_role", res.data.role); // Store role in localStorage
                    
                    Swal.fire("Success", res.data.message, "success");

                    if (res.data.role === "admin") {
                        navigate("/admin/dashboard"); // Fixed navigation
                    } else {
                        navigate("/");
                    }
                } else if (res.data.status === 401) {
                    Swal.fire("Warning", res.data.message, "warning");
                } else {
                    setLogin(prevState => ({
                        ...prevState,
                        error_list: res.data.validation_errors || {},
                    }));
                }
            })
            .catch(error => {
                Swal.fire("Error", "Something went wrong. Please try again later.", "error");
                console.error("Login Error:", error);
            });
    };

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

            <div class="container-fluid page-header mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div class="container">
                    <h1 class="display-3 mb-3 animated slideInDown">Login</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><Link class="text-body" to="#">Home</Link></li>
                            <li class="breadcrumb-item"><Link class="text-body" to="#">Pages</Link></li>
                            <li class="breadcrumb-item text-dark active" aria-current="page">Login</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="text-center">Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            onChange={handleInput} 
                                            value={loginInput.email} 
                                            className="form-control" 
                                        />
                                        <span className="text-danger">{loginInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            onChange={handleInput} 
                                            value={loginInput.password} 
                                            className="form-control" 
                                        />
                                        <span className="text-danger">{loginInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>
            <Footer />
        </div>
    );
}

export default Login;
