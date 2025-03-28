import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import Swal from "sweetalert2";

function EditProduct(props) {

    const { id: product_id } = useParams();
    const navigate = useNavigate();
    const [categorylist, setCategorylist] = useState([]);

    const [productInput, setProduct] = useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',

        meta_title: '',
        meta_keyword: '',
        meta_description: '',

        selling_price: '',
        original_price: '',
        qty: '',
        brand: '',
        featured: '',
        popular: '',
        status: '',
    });
    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]:e.target.value });
    };

    const handleImage = (e) => {
        if (e.target.files.length > 0) {
            setPicture({ image: e.target.files[0] });
        } else {
            setPicture({});
        }
    };

    const [allcheckbox, setCheckboxes] = useState([]);
    const handleCheckbox = (e) => {
        e.persist();
        const { name, checked } = e.target;
        setCheckboxes(prevState => ({
            ...prevState,
            [name]: checked ? 1 : 0  // Store as 1 for checked, 0 for unchecked
        }));
    };
       
    //Name Category Type Products
    useEffect(() => {
        axios.get('/api/all-category').then(res => {
            if (res.data.status === 200) {
                setCategorylist(res.data.category)
            }
        });

        axios.get(`/api/edit-product/${product_id}`).then(res => {
            if (res.data.status === 200)
            {
                // console.log(res.data.product);
                setProduct(res.data.product);
                setCheckboxes(res.data.product);
            }
            else if (res.data.status === 404)
            {
                Swal.fire("Error",res.data.message,"error");
                navigate('/admin/view-product');
            }
            setLoading(false);
        })
    }, [product_id, navigate]);

    const updateProduct = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('image', picture.image); 
        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);

        formData.append('meta_title', productInput.meta_title);
        formData.append('meta_keyword', productInput.meta_keyword);
        formData.append('meta_description', productInput.meta_description);

        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('qty', productInput.qty);
        formData.append('brand', productInput.brand);
        formData.append('featured', allcheckbox.featured || 0);
        formData.append('popular', allcheckbox.popular || 0);
        formData.append('status', allcheckbox.status || 0);
        // Debugging: Check if the image exists
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        axios.post(`/api/update-product/${product_id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            if (res.data.status === 200)
            {
                Swal.fire("Success", res.data.message, "success");
                setPicture({});
                console.log(allcheckbox);
                setError([]);
            } 
            else if (res.data.status === 422) 
            {
                Swal.fire("All Fields are mandatory", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404)
            {
                Swal.fire("Error",res.data.message,"error");
            }
        }).catch(error => {
            console.error("Error:", error);
            navigate('/admin/view-product');
        });
    };

    if(loading)
    {
        return <h4>Edit Product Data Loading...</h4>
    }
    
    
    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Product
                        <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateProduct} encType="multipart/form-data">

                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details</button>
                            </li>
                        </ul>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                                        <option>Select Category</option>
                                        {
                                            categorylist.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className="text-danger">{errorlist.category_id}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
                                    <small className="text-danger">{errorlist.slug}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                                    <small className="text-danger">{errorlist.name}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>
                                </div>
                            </div>

                            <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                                <div className="form-group mb-3">
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className="form-control" />
                                    <small className="text-danger">{errorlist.meta_title}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Keyword</label>
                                    <input type="text" name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <input type="text" name="meta_description" onChange={handleInput} value={productInput.meta_description} className="form-control" />
                                </div>
                            </div>

                            <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Selling Price</label>
                                        <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                                        <small className="text-danger">{errorlist.selling_price}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Original Price</label>
                                        <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control" />
                                        <small className="text-danger">{errorlist.original_price}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Quantity</label>
                                        <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className="form-control" />
                                        <small className="text-danger">{errorlist.qty}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Brand</label>
                                        <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control" />
                                        <small className="text-danger">{errorlist.brand}</small>
                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="image" id="image" onChange={handleImage} className="form-control" />
                                        <img src={`http://127.0.0.1:8000/${productInput.image}`} width="50px"/>
                                        {errorlist.image && <small className="text-danger">{errorlist.image}</small>}
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Featured</label>
                                        <input type="checkbox" name="featured" onChange={handleCheckbox} defaultChecked={allcheckbox.featured ===1 ? true:false} className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Popular</label>
                                        <input type="checkbox" name="popular" onChange={handleCheckbox} defaultChecked={allcheckbox.popular ===1 ? true:false} className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Status</label>
                                        <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status ===1 ? true:false} className="w-50 h-50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
