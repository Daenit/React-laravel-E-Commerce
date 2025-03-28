import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Card, ListGroup, Row, Col } from 'react-bootstrap';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        promoCode: '',
        smsUpdates: false
    });
    const [errors, setErrors] = useState({});
    const [orderProcessing, setOrderProcessing] = useState(false);
    const [orderError, setOrderError] = useState('');
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/cart-items')
            .then(response => {
                if (response.data.status === 200) {
                    setCartItems(response.data.cart_items);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email address';
        const cleanedPhone = formData.phone.replace(/\D/g, ''); // Remove non-numeric chars
        if (!/^\d{10}$/.test(cleanedPhone)) {
            newErrors.phone = 'Invalid phone number. Must be 10 digits.';
        }   
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const applyPromoCode = async () => {
        try {
            const response = await axios.post('/api/apply-promo', {
                code: formData.promoCode
            });
            
            if (response.data.status === 200) {
                setDiscount(response.data.discount);
            } else {
                setErrors({ promoCode: response.data.message });
            }
        } catch (error) {
            setErrors({ promoCode: 'Failed to apply promo code' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setOrderProcessing(true);
        setOrderError('');

        try {
            const response = await axios.post('/api/place-order', {
                ...formData,
                cartItems,
                discount
            });

            if (response.data.status === 200) {
                navigate('/order-confirmation', { state: { order: response.data.order } });
            } else {
                setOrderError(response.data.message || 'Failed to place order');
            }
        } catch (error) {
            setOrderError('Error processing your order. Please try again.');
        } finally {
            setOrderProcessing(false);
        }
    };

    const calculateTotal = () => {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.product.selling_price * item.quantity), 0);
        const tax = subtotal * 0.05;
        const serviceFee = 42;
        return (subtotal + tax + serviceFee - discount).toFixed(2);
    };

    if (loading) return <div className="text-center my-5">Loading...</div>;

    return (
        <div className="container my-5">
            <div className="container-fluid page-header mb-5">
                <div className="container">
                    <h1 className="display-3 mb-3">Checkout</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item"><a className="text-body" href="/">Home</a></li>
                            <li className="breadcrumb-item"><a className="text-body" href="/cart">Cart</a></li>
                            <li className="breadcrumb-item active">Checkout</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <Row>
                <Col md={7}>
                    <Card className="mb-4">
                        <Card.Body>
                            <h2 className="mb-4">Checkout Details</h2>
                            
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.phone}
                                        placeholder="212-5555555"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="I want to get order updates via SMS"
                                        name="smsUpdates"
                                        checked={formData.smsUpdates}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Promo Code</Form.Label>
                                    <div className="d-flex gap-2">
                                        <Form.Control
                                            name="promoCode"
                                            value={formData.promoCode}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.promoCode}
                                        />
                                        <Button 
                                            variant="outline-secondary" 
                                            onClick={applyPromoCode}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.promoCode}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {orderError && <Alert variant="danger">{orderError}</Alert>}

                                <Button 
                                    variant="primary" 
                                    size="lg" 
                                    type="submit"
                                    disabled={orderProcessing || cartItems.length === 0}
                                    className="w-100"
                                >
                                    {orderProcessing ? 'Processing...' : 'Place Order'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={5}>
                    <Card className="sticky-top" style={{ top: '20px' }}>
                        <Card.Body>
                            <h2 className="mb-4">Order Summary</h2>
                            
                            <ListGroup variant="flush">
                                {cartItems.map(item => (
                                    <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                                        <div>
                                            {item.product.name} 
                                            <span className="text-muted"> x{item.quantity}</span>
                                        </div>
                                        <div>${(item.product.selling_price * item.quantity).toFixed(2)}</div>
                                    </ListGroup.Item>
                                ))}

                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Subtotal:</span>
                                    <span>${cartItems.reduce((sum, item) => sum + (item.product.selling_price * item.quantity), 0).toFixed(2)}</span>
                                </ListGroup.Item>

                                {discount > 0 && (
                                    <ListGroup.Item className="d-flex justify-content-between text-success">
                                        <span>Discount:</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Tax (5%):</span>
                                    <span>${(cartItems.reduce((sum, item) => sum + (item.product.selling_price * item.quantity), 0) * 0.05).toFixed(2)}</span>
                                </ListGroup.Item>

                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Service Fee:</span>
                                    <span>$42.00</span>
                                </ListGroup.Item>

                                <ListGroup.Item className="d-flex justify-content-between fw-bold">
                                    <span>Total:</span>
                                    <span>${calculateTotal()}</span>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Checkout;