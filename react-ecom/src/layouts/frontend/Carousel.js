import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Carousel() {
    const [loading, setLoading] = useState(true);
    const [carousels, setCarousels] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarousels = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/carousels");
                console.log(res.data);  // Log the full response
                if (res.data.status === 200) {
                    setCarousels(res.data.carousels || []);
                } else {
                    setError("Error fetching carousel: " + res.data.message);
                }
            } catch (error) {
                console.error("API Error:", error);
                setError("Something went wrong while fetching carousels.");
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

    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (error) return <div className="text-center text-danger py-5">{error}</div>;

    return (
        <div className="container-fluid p-0 mb-5 wow fadeIn" data-wow-delay="0.1s">
            <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {carousels.length > 0 ? (
                        carousels.map((carousel, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={carousel.id}>
                                <img 
                                    className="w-100" 
                                    src={`http://127.0.0.1:8000/${carousel.image}`} 
                                    alt={carousel.name || "Carousel Image"} 
                                    loading="lazy"
                                />
                                <div className="carousel-caption d-flex align-items-center justify-content-center">
                                    <div className="container">
                                        <div className="row justify-content-start">
                                            <div className="col-lg-8 text-center text-lg-start">
                                                <h1 className="display-3 mb-4 animated slideInDown">
                                                    {carousel.name || "Natural Food Is Always Healthy"}
                                                </h1>
                                                <div className="d-flex justify-content-center justify-content-lg-start">
                                                    {carousel.button1_text && (
                                                        <a 
                                                            href={carousel.button1_link || "#"} 
                                                            className="btn btn-primary rounded-pill py-3 px-5"
                                                        >
                                                            {carousel.button1_text}
                                                        </a>
                                                    )}
                                                    {carousel.button2_text && (
                                                        <a 
                                                            href={carousel.button2_link || "#"} 
                                                            className="btn btn-secondary rounded-pill py-3 px-5 ms-3"
                                                        >
                                                            {carousel.button2_text}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="carousel-item active">
                            <img className="w-100" src="/fallback-image.jpg" alt="No Carousel Data" />
                            <div className="carousel-caption">
                                <h1>No carousel data available.</h1>
                            </div>
                        </div>
                    )}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;
