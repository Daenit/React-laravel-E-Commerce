import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState({ items: [], summary: {} });
    const [loading, setLoading] = useState(false);
    const [cartLoading, setCartLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        setCartLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/cart');
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Failed to load cart. Please try again.');
        } finally {
            setCartLoading(false);
        }
    };

    const updateQuantity = async (id, quantity) => {
        if (quantity < 1) return;
        setLoading(true);
        try {
            await axios.put(`http://127.0.0.1:8000/api/cart/update/${id}`, { quantity });
            fetchCart();
        } catch (error) {
            console.error('Error updating cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/api/cart/remove/${id}`);
            fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
    <>
        <div className="container-fluid page-header mb-5">
            <div className="container">
                <h1 className="display-3 mb-3">Add to Cart</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a className="text-body" href="/">Home</a></li>
                        <li className="breadcrumb-item"><a className="text-body" href="/product">Product</a></li>
                        <li className="breadcrumb-item active">Cart</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div className="container py-5">
            <h1 className="mb-4 text-center">My Cart ({cart.items.length})</h1>

            {cartLoading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger text-center">{error}</div>
            ) : cart.items.length === 0 ? (
                <div className="text-center">
                    <h5 className="text-muted">Your cart is empty.</h5>
                    <Link to="/product" className="btn btn-primary rounded-pill mt-3">
                        Shop Now
                    </Link>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-8">
                        {cart.items.map(item => (
                            <div key={item.id} className="card mb-4 shadow-sm">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img 
                                            src={`http://127.0.0.1:8000/${item.product.image}`} 
                                            alt={item.product.name} 
                                            className="img-fluid rounded-start"
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <Link to={`/product/${item.product.id}`} className="text-decoration-none text-dark">
                                                    {item.product.name}
                                                </Link>
                                            </h5>
                                            <p className="card-text text-muted">₹{item.product.selling_price} / kg</p>

                                            <div className="d-flex align-items-center">
                                                <button 
                                                    className="btn btn-outline-secondary rounded-pill py-2 px-3 ms-3"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={loading || item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-3">{item.quantity}</span>
                                                <button 
                                                    className="btn btn-outline-primary rounded-pill py-2 px-3 ms-3"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={loading}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button 
                                                className="btn btn-outline-danger rounded-pill py-2 px-5 ms-3 mt-3"
                                                onClick={() => removeItem(item.id)}
                                                disabled={loading}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Order Summary</h5>

                                <div className="mb-3">
                                    <p className="d-flex justify-content-between">
                                        <span>Sub Total:</span>
                                        <span>₹{cart.summary.subtotal?.toFixed(1) || 0.0}</span>
                                    </p>
                                    <p className="d-flex justify-content-between">
                                        <span>Tax (5%):</span>
                                        <span>₹{cart.summary.tax?.toFixed(1) || 0.0}</span>
                                    </p>
                                    <p className="d-flex justify-content-between">
                                        <span>Service Fee:</span>
                                        <span>₹{cart.summary.service || 0.0}</span>
                                    </p>
                                    <hr />
                                    <p className="d-flex justify-content-between fw-bold">
                                        <span>Total:</span>
                                        <span>₹{cart.summary.total?.toFixed(1) || 0.0}</span>
                                    </p>
                                </div>

                                <div className="alert alert-info">
                                    GET EXTRA 5% OFF* with Credit card. T&C.
                                </div>

                                <Link 
                                    to="/checkout"
                                    className="btn btn-primary w-100 rounded-pill"
                                    disabled={cart.items.length === 0}
                                >
                                    PROCEED TO CHECKOUT
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
    );
};

export default Cart;
