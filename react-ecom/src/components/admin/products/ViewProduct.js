import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ViewProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);  // State for categories
    
    useEffect(() => {
        axios.get('/api/view-product')
            .then(response => {
                if (response.data.status === 200) {
                    setProducts(response.data.products);
                } else {
                    console.error('Failed to fetch products:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // Fetch categories
    useEffect(() => {
        axios.get('/api/all-category')
            .then(res => {
                if (res.data.status === 200) {
                    setCategories(res.data.category);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // Function to find category name by category_id
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : "Unknown Category";
    };

    const deleteProduct = (e, id) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/delete-product/${id}`)
                    .then(response => {
                        if (response.data.status === 200) {
                            setProducts(products.filter(product => product.id !== id));
                            Swal.fire("Deleted!", "Product has been deleted.", "success");
                        } else {
                            Swal.fire("Error", response.data.message, "error");
                        }
                    })
                    .catch(() => {
                        Swal.fire("Error", "Failed to delete product", "error");
                    });
            }
        });
    };

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3>
                        Product List
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">
                            Add Product
                        </Link>
                    </h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Category Name</th>
                                <th>Selling Price</th>
                                <th>Original Price</th>
                                <th>QTY</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>
                                            <img src={`http://127.0.0.1:8000/${product.image}`} alt={product.name} width="50" height="50" />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{getCategoryName(product.category_id)}</td> {/* Display category name */}
                                        <td>{product.selling_price}</td>
                                        <td>{product.original_price}</td>
                                        <td>{product.qty}</td>
                                        <td>
                                            <Link to={`/admin/edit-product/${product.id}`} className="btn btn-success btn-sm">
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-danger btn-sm" onClick={(e) => deleteProduct(e, product.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">No Products Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;
