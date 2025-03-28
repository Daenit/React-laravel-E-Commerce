import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ViewCarousel() {
    const [loading, setLoading] = useState(true);
    const [carousels, setCarousels] = useState([]);

    useEffect(() => {
        const fetchCarousels = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/carousels");
                console.log(res.data);  // Log the full response
                if (res.data.status === 200) {
                    setCarousels(res.data.carousels || []);
                } else {
                    console.error("Error fetching carousel:", res.data.message);
                }
            } catch (error) {
                console.error("API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        
    
        fetchCarousels();
    }, []);
    
    const deleteCarousel = (e, id) => {
        e.preventDefault();
    
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
                axios.delete(`/api/delete-carousel/${id}`)
                    .then(res => {
                        if (res.data.status === 200) {
                            Swal.fire("Deleted!", res.data.message, "success");
                            setCarousels(prev => prev.filter(item => item.id !== id)); // Fix state update
                        } else {
                            Swal.fire("Error", res.data.message, "error");
                        }
                    })
                    .catch(error => {
                        Swal.fire("Error", "Something went wrong!", "error");
                        console.error("Delete Error:", error);
                    });
            }
        });
    };
    

    if (loading) {
        return <h4>Loading Carousel...</h4>;
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h3>
                        Carousel List
                        <Link to="/admin/add-carousel" className="btn btn-primary btn-sm float-end">
                            Add Carousel
                        </Link>
                    </h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Text</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carousels.length > 0 ? (
                                carousels.map((carousel, index) => (
                                    <tr key={carousel.id}>
                                        <td>{carousel.id}</td>
                                        <td>
                                            <img src={`http://127.0.0.1:8000/${carousel.image}`} alt={carousel.name} width="50" height="50" />
                                        </td>
                                        <td>{carousel.name}</td>
                                        <td>{carousel.text || "No Text"}</td>
                                        <td>{carousel.status}</td>
                                        <td>
                                            <Link to={`/admin/edit-carousel/${carousel.id}`} className="btn btn-success btn-sm">
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-danger btn-sm" onClick={(e) => deleteCarousel(e, carousel.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No Carousel Items Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewCarousel;
