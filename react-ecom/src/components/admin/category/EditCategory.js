import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryInput, setCategory] = useState({});
    const [errors, setErrors] = useState({}); // Error handling state

    useEffect(() => {
        axios.get(`/api/edit-category/${id}`).then((res) => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
            } else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");
                navigate("/admin/view-category");
            }
        });
    }, [id, navigate]);

    const handleInput = (e) => {
        const { name, type, checked, value } = e.target;
        setCategory({
            ...categoryInput,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
        });
    };

    const updateCategory = (e) => {
        e.preventDefault();
        axios.put(`/api/update-category/${id}`, categoryInput)
            .then((res) => {
                if (res.data.status === 200) {
                    Swal.fire("Success", res.data.message, "success");
                    navigate("/admin/view-category");
                } else {
                    Swal.fire("Error", res.data.message, "error");
                    setErrors(res.data.errors || {}); // Set validation errors
                }
            });
    };

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        Edit Category{" "}
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">
                            BACK
                        </Link>
                    </h4>
                </div>
            </div>

            <div className="card-body">
                <form onSubmit={updateCategory}>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#home"
                                type="button"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                            >
                                Home
                            </button>
                        </li>

                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="seo-tag-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#seo-tags"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                            >
                                SEO Tags
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body-border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="form-group mb-3">
                                <label>Slug</label>
                                <input
                                    type="text"
                                    name="slug"
                                    onChange={handleInput}
                                    value={categoryInput.slug || ""}
                                    className="form-control"
                                />
                                <span className="text-danger">{errors.slug}</span>
                            </div>

                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleInput}
                                    value={categoryInput.name || ""}
                                    className="form-control"
                                />
                                <span className="text-danger">{errors.name}</span>
                            </div>

                            <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    onChange={handleInput}
                                    value={categoryInput.description || ""}
                                    className="form-control"
                                ></textarea>
                            </div>

                            <div className="form-group mb-3">
                                <label>Status</label>
                                <input
                                    type="checkbox"
                                    name="status"
                                    onChange={handleInput}
                                    checked={categoryInput.status === 1}
                                />
                                Status 0=shown/1=hidden
                            </div>
                        </div>

                        <div className="tab-pane card-body-border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                            <div className="form-group mb-3">
                                <label>Meta Title</label>
                                <input
                                    type="text"
                                    name="meta_title"
                                    onChange={handleInput}
                                    value={categoryInput.meta_title || ""}
                                    className="form-control"
                                />
                                <span className="text-danger">{errors.meta_title}</span>
                            </div>

                            <div className="form-group mb-3">
                                <label>Meta Keywords</label>
                                <textarea
                                    name="meta_keyword"
                                    onChange={handleInput}
                                    value={categoryInput.meta_keyword || ""}
                                    className="form-control"
                                ></textarea>
                            </div>

                            <div className="form-group mb-3">
                                <label>Meta Description</label>
                                <textarea
                                    name="meta_description"
                                    onChange={handleInput}
                                    value={categoryInput.meta_description || ""}
                                    className="form-control"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary px-4 float-end">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditCategory;
