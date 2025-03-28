import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ViewCategory() {
    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    useEffect(() => {
        axios.get('/api/view-category')
            .then(res => {
                if (res.status === 200) {
                    setCategorylist(res.data.category);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setLoading(false);
            });
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
    
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                thisClicked.innerText = "Deleting...";
                
                axios.delete(`/api/delete-category/${id}`)
                    .then(res => {
                        if (res.data.status === 200) {
                            Swal.fire("Deleted!", res.data.message, "success");
                            thisClicked.closest("tr").remove();
                        } else if (res.data.status === 404) {
                            Swal.fire("Error", res.data.message, "error");
                            thisClicked.innerText = "Delete";
                        }
                    })
                    .catch(error => {
                        Swal.fire("Error", "Something went wrong!", "error");
                        thisClicked.innerText = "Delete";
                        console.error("Delete Error:", error);
                    });
            }
        });
    };
    

    if (loading) {
        return <h4>Loading Category...</h4>;
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3>Category List
                        <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Add Category</Link>
                    </h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorylist.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.slug}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <Link to={`/admin/edit-category/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger btn-sm" onClick={(e) => deleteCategory(e, item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;
