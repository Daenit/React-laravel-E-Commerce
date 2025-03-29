import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup, Alert, Spinner } from 'react-bootstrap';

const Cart = () => {
    const [cart, setCart] = useState({ items: [], summary: {} });
    const [loading, setLoading] = useState(false);
    const [cartLoading, setCartLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingItems, setLoadingItems] = useState({}); // Track loading state for each item
    const [actionError, setActionError] = useState(null); // Track errors for cart actions

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

        setLoadingItems(prev => ({ ...prev, [id]: true })); // Mark item as loading
        setActionError(null); // Reset action error
        try {
            await axios.put(`http://127.0.0.1:8000/api/cart/update/${id}`, { quantity });
            fetchCart();
        } catch (error) {
            console.error('Error updating cart:', error);
            setActionError('Failed to update quantity.');
        } finally {
            setLoadingItems(prev => ({ ...prev, [id]: false })); // Unmark item as loading
        }
    };

    const removeItem = async (id) => {
        setLoadingItems(prev => ({ ...prev, [id]: true })); // Mark item as loading
        setActionError(null); // Reset action error
        try {
            await axios.delete(`http://127.0.0.1:8000/api/cart/remove/${id}`);
            fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
            setActionError('Failed to remove item.');
        } finally {
            setLoadingItems(prev => ({ ...prev, [id]: false })); // Unmark item as loading
        }
    };

    return (
        <>
            <div className="container-fluid page-header mb-5">
                <div className="container">
                    <h1 className="display-3 mb-3">Shopping Cart</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><Link to="/" className="text-body">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/products" className="text-body">Products</Link></li>
                            <li className="breadcrumb-item active">Cart</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <Container className="my-5">
                <h1 className="mb-4 text-center">My Cart ({cart.items.length})</h1>

                {cartLoading ? (
                    <div className="text-center my-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="text-center">{error}</Alert>
                ) : cart.items.length === 0 ? (
                    <div className="text-center py-5">
                        <h5 className="text-muted mb-4">Your cart is empty</h5>
                        <Button as={Link} to="/products" variant="primary" size="lg" className="rounded-pill">
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <Row>
                        <div className="col-md-8">
                        {actionError && <Alert variant="danger" className="text-center">{actionError}</Alert>}
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
                                                    disabled={loadingItems[item.id] || item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-3">{item.quantity}</span>
                                                <button 
                                                    className="btn btn-outline-primary rounded-pill py-2 px-3 ms-3"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={loadingItems[item.id]}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button 
                                                className="btn btn-outline-danger rounded-pill py-2 px-5 ms-3 mt-3"
                                                onClick={() => removeItem(item.id)}
                                                disabled={loadingItems[item.id]}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                        <Col lg={4}>
                            <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
                                <Card.Body>
                                    <Card.Title className="mb-4 fs-3">Order Summary</Card.Title>
                                    
                                    <ListGroup variant="flush" className="mb-4">
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <span>Subtotal:</span>
                                            <span>₹{cart.summary.subtotal?.toFixed(2)}</span>
                                        </ListGroup.Item>
                                        
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <span>Tax (5%):</span>
                                            <span>₹{cart.summary.tax?.toFixed(2)}</span>
                                        </ListGroup.Item>
                                        
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <span>Service Fee:</span>
                                            <span>₹{cart.summary.service?.toFixed(2)}</span>
                                        </ListGroup.Item>
                                        
                                        <ListGroup.Item className="d-flex justify-content-between fs-5 fw-bold">
                                            <span>Total:</span>
                                            <span>₹{cart.summary.total?.toFixed(2)}</span>
                                        </ListGroup.Item>
                                    </ListGroup>

                                    <Alert variant="info" className="text-center">
                                        Get extra 5% OFF* with Credit card payments
                                    </Alert>

                                    <Button
                                        as={Link}
                                        to="/checkout"
                                        variant="primary"
                                        size="lg"
                                        className="w-100 rounded py-3"
                                        disabled={cart.items.length === 0}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default Cart;
