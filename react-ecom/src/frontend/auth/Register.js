import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/frontend/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Footer from "../../layouts/frontend/Footer";

function Register() {


    
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


    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        error_list: {},
    });

    const handleInput = (e) => {
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password, // Fixed here
        };

        axios.get("/sanctum/csrf-cookie").then(() => {
            axios.post("/api/register", data).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_name", res.data.username);
                    Swal.fire("Success", res.data.message, "success");
                    navigate("/");
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors || {} });
                }
            }).catch((error) => {
                console.error("Registration Error:", error);
                Swal.fire("Error", "Something went wrong!", "error");
            });
        });
    };

    return (
        <div>
            <Navbar />
            <div class="container-fluid page-header mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div class="container">
                    <h1 class="display-3 mb-3 animated slideInDown">Products</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><a class="text-body" href="#">Home</a></li>
                            <li class="breadcrumb-item"><a class="text-body" href="#">Pages</a></li>
                            <li class="breadcrumb-item text-dark active" aria-current="page">Register</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="text-center">Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={handleInput}
                                            value={registerInput.name}
                                            className="form-control"
                                        />
                                        <span className="text-danger">{registerInput.error_list?.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email ID</label>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleInput}
                                            value={registerInput.email}
                                            className="form-control"
                                        />
                                        <span className="text-danger">{registerInput.error_list?.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleInput}
                                            value={registerInput.password}
                                            className="form-control"
                                        />
                                        <span className="text-danger">{registerInput.error_list?.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">
                                            Register
                                        </button>
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

export default Register;
