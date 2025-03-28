import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Alert, Badge, Spinner } from 'react-bootstrap';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get(`http://127.0.0.1:8000/api/product/${id}`)
            .then(response => {
                if (response.data.status === 200) {
                    setProduct(response.data.product);
                } else {
                    setError('Product not found');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                setError('Failed to load product details');
                setLoading(false);
            });
    }, [id]);

    const addToCart = () => {
        axios.post('http://127.0.0.1:8000/api/cart', {
            product_id: product.id,
            quantity: quantity
        })
        .then(response => {
            console.log('Product added:', response.data);
            setSuccessMessage('Product added to cart!');
            setError('');
            setTimeout(() => setSuccessMessage(''), 3000);
        })
        .catch(error => {
            console.error('Error adding to cart:', error.response?.data || error.message);
            setError('Error adding to cart.');
        });
    };

    if (loading) return <div className="text-center my-5"><Spinner animation="border" variant="primary" /></div>;
    if (error) return <div className="container my-5"><Alert variant="danger">{error}</Alert></div>;
    if (!product) return <div className="container my-5"><Alert variant="warning">Product not found</Alert></div>;

    return (
        <>

            <div class="container-fluid page-header mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div class="container">
                    <h1 class="display-3 mb-3 animated slideInDown">Products</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><Link class="text-body" href="#">Home</Link></li>
                            <li class="breadcrumb-item"><Link class="text-body" to="/cart">Cart</Link></li>
                            <li class="breadcrumb-item text-dark active" aria-current="page">Product Detail</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container my-5">
                <Row className="g-5">
                    {/* Product Image */}
                    <Col md={6}>
                        <div className="border p-3 rounded-3 position-relative">
                            <img 
                                src={`http://127.0.0.1:8000/${product.image}`} 
                                alt={product.name}
                                className="img-fluid rounded-3"
                                style={{ maxHeight: '600px', objectFit: 'cover' }}
                            />
                            {product.is_new === 1 && (
                                <Badge bg="danger" className="position-absolute top-0 start-0 m-3">
                                    New
                                </Badge>
                            )}
                        </div>
                    </Col>

                    {/* Product Details */}
                    <Col md={6}>
                        <h1 className="mb-3">{product.name}</h1>
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <h2 className="text-primary mb-0">${product.selling_price}</h2>
                            {product.original_price > product.selling_price && (
                                <del className="text-muted">${product.original_price}</del>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <h5 className="mb-0">Quantity:</h5>
                            <div className="d-flex align-items-center gap-2">
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity === 1}
                                >
                                    -
                                </Button>
                                <span className="px-3">{quantity}</span>
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        {/* Error & Success Messages */}
                        {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
                        {successMessage && <Alert variant="success" className="mb-3">{successMessage}</Alert>}

                        {/* Add to Cart Button */}
                        <Button 
                            variant="primary" 
                            size="lg" 
                            className="w-100 py-3"
                            onClick={addToCart}
                        >
                            ADD TO CART
                        </Button>

                        {/* Product Description */}
                        <div className="mt-5">
                            <h4 className="mb-3">Product Details</h4>
                            <p className="text-muted">{product.description}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default ProductDetail;
