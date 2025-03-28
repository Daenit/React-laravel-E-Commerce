import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function Navbar() {
    const [cart, setCart] = useState({ items: [], summary: {} });
    const [cartLoading, setCartLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch cart item count from the API
    const fetchCart = async () => {
        setCartLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/cart', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            setCart(response.data);  // Update the full cart data
        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Failed to load cart. Please try again.');
        } finally {
            setCartLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();  // Fetch cart on component mount
    }, []);

    // Logout functionality
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_name");
                Swal.fire("Success", res.data.message, "success");
                navigate("/");  // Redirect after logout
            }
        }).catch(error => {
            console.error("Logout failed:", error);
            Swal.fire("Error", "Something went wrong with the logout request.", "error");
        });
    };

    // Helper function to highlight the active nav item
    const isActive = (path) => location.pathname === path ? 'active' : '';

    // Authentication buttons
    const AuthButtons = !localStorage.getItem('auth_token') ? (
        <div className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown">Account</Link>
            <div className="dropdown-menu m-0">
                <Link className={`dropdown-item ${isActive("/login")}`} to="/login">Login</Link>
                <Link className={`dropdown-item ${isActive("/register")}`} to="/register">Register</Link>
            </div>
        </div>
    ) : (
        <div className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown">Account</Link>
            <div className="dropdown-menu m-0">
                <Link onClick={logoutSubmit} className="dropdown-item" to="#">Logout</Link>
            </div>
        </div>
    );

    return (
        <div className="container-fluid fixed-top px-0 wow fadeIn" data-wow-delay="0.1s">
            <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
                <div className="col-lg-6 px-5 text-start">
                    <small><i className="bi bi-geo-alt-fill me-2"></i>123 Street, New York, USA</small>
                    <small className="ms-4"><i className="bi bi-envelope-at-fill me-2"></i>info@example.com</small>
                </div>
                <div className="col-lg-6 px-5 text-end">
                    <small>Follow us:</small>
                    <Link className="text-body ms-3" to="#"><i className="bi bi-facebook"></i></Link>
                    <Link className="text-body ms-3" to="#"><i className="bi bi-twitter"></i></Link>
                    <Link className="text-body ms-3" to="#"><i className="bi bi-linkedin"></i></Link>
                    <Link className="text-body ms-3" to="#"><i className="bi bi-instagram"></i></Link>
                </div>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
                <Link to="/" className="navbar-brand ms-4 ms-lg-0">
                    <h1 className="fw-bold text-primary m-0">F<span className="text-secondary">oo</span>dy</h1>
                </Link>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        <Link to="/" className={`nav-item nav-link ${isActive("/")}`}>Home</Link>
                        <Link to="/about" className={`nav-item nav-link ${isActive("/about")}`}>About Us</Link>
                        <Link to="/product" className={`nav-item nav-link ${isActive("/product")}`}>Products</Link>
                        <div className="nav-item dropdown">
                            <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                            <div className="dropdown-menu m-0">
                                <Link to="/blog" className="dropdown-item">Blog Grid</Link>
                                <Link to="/features" className="dropdown-item">Our Features</Link>
                                <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
                                <Link to="/404" className="dropdown-item">404 Page</Link>
                                <Link to="/productdetail" className="dropdown-item">ProductDetail</Link>
                            </div>
                        </div>
                        <Link to="/contact" className={`nav-item nav-link ${isActive("/contact")}`}>Contact Us</Link>
                        {AuthButtons}
                    </div>
                    <div className="d-flex ms-2 align-items-center">
                        <Link className="btn-sm-square bg-white rounded-circle ms-3" to="#"><small className="fa fa-search text-body"></small></Link>
                        <Link className="btn-sm-square bg-white rounded-circle ms-3" to="#"><small className="fa fa-user text-body"></small></Link>
                        <Link className="btn-sm-square bg-white rounded-circle ms-3 position-relative" to="/cart">
                            <small className="fa fa-shopping-bag text-body"></small>
                            <span className="badge bg-primary position-absolute top-0 start-100 translate-middle p-1 rounded-pill">
                                {cartLoading ? 'Loading...' : `${cart.items.length}`} {/* Display cart count or loading */}
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
            {error && <div className="alert alert-danger fixed-bottom m-4">{error}</div>} {/* Error message display */}
        </div>
    );
}

export default Navbar;
