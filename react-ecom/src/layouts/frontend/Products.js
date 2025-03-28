import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch Products from API
    useEffect(() => {
        setLoading(true);
        axios.get('http://127.0.0.1:8000/api/view-product')
            .then(response => {
                console.log('API Response:', response.data); // Debugging
                if (response.data.status === 200) {
                    setProducts(response.data.products);
                } else {
                    setError('Failed to fetch products.');
                }
            })
            .catch(error => {
                setError('Error fetching products.');
                console.error('Error fetching products:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    // Add to Cart Function
    const addToCart = (product) => {
        axios.post('http://127.0.0.1:8000/api/cart', {
            product_id: product.id,
            quantity: 1
        })
        .then(response => {
            console.log('Product added:', response.data);
            alert('Product added to cart!');
        })
        .catch(error => {
            console.error('Error adding to cart:', error.response?.data || error.message);
            alert('Error adding to cart.');
        });
    };

    // Category Filtering
    const categories = ['All', ...new Set(products.map(product => product.category?.name).filter(Boolean))];

    if (loading) {
        return <div className="text-center">Loading products...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-0 gx-5 align-items-end">
                    <div className="col-lg-6">
                        <div className="section-header text-start mb-5" style={{ maxWidth: 500 }}>
                            <h1 className="display-5 mb-3">Our Products</h1>
                            <p>Explore our latest products!</p>
                        </div>
                    </div>

                    {/* Category Filter Buttons */}
                    <div className="col-lg-6 text-start text-lg-end">
                        <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
                            {categories.map((category, index) => (
                                <button 
                                    key={index}
                                    className={`btn m-2 ${category === activeCategory ? 'btn-primary' : 'btn-outline-primary'}`} 
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="row g-4">
                    {products
                        .filter(product => activeCategory === 'All' || product.category?.name === activeCategory)
                        .map((product) => (
                            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4 fadeInUp">
                                <div className="product-item">
                                    <div className="position-relative bg-light overflow-hidden">
                                        <img src={`http://127.0.0.1:8000/${product.image}`} className="img-fluid w-100" alt={product.name} />
                                        {product.is_new && (
                                            <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                                        )}
                                    </div>
                                    <div className="text-center p-4">
                                        <h5>{product.name}</h5>
                                        <span className="text-primary me-1">${product.selling_price}</span>
                                        {product.original_price > product.selling_price && (
                                            <span className="text-body text-decoration-line-through">${product.original_price}</span>
                                        )}
                                    </div>
                                    <div className="d-flex border-top">
                                        <small className="w-50 text-center border-end py-2">
                                            <Link to={`/product/${product.id}`} className="text-body text-decoration-none">
                                                <i className="fa fa-eye text-primary me-2"></i>View Details
                                            </Link>
                                        </small>
                                        <small className="w-50 text-center py-2">
                                            <button className="text-body border-0 bg-transparent" onClick={() => addToCart(product)}>
                                                <i className="fa fa-shopping-bag text-primary me-2"></i>Add to cart
                                            </button>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
