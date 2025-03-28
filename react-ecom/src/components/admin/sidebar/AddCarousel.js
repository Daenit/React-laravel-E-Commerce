import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddCarousel() {
    const [form, setForm] = useState({
        name: "",
        text: "",
        button1_text: "",
        button1_link: "",
        button2_text: "",
        button2_link: "",
        image: null
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        axios.post("/api/store-carousel", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
            Swal.fire("Success", res.data.message, "success");
            setForm({
                name: "",
                text: "",
                button1_text: "",
                button1_link: "",
                button2_text: "",
                button2_link: "",
                image: null
            });
            document.getElementById("carousel-form").reset();
        })
        .catch(error => {
            Swal.fire("Error", "Something went wrong!", "error");
            console.error("API error:", error);
        });
    };

    return (
        <div className="container">
            <h2>Add Carousel Item</h2>
            <form onSubmit={submitForm} id="carousel-form">
                <div className="mb-3">
                    <label>Name:</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label>Text:</label>
                    <textarea name="text" className="form-control" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label>Button 1 Text:</label>
                    <input type="text" name="button1_text" className="form-control" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label>Button 1 Link:</label>
                    <input type="text" name="button1_link" className="form-control" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label>Button 2 Text:</label>
                    <input type="text" name="button2_text" className="form-control" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label>Button 2 Link:</label>
                    <input type="text" name="button2_link" className="form-control" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label>Image:</label>
                    <input type="file" className="form-control" onChange={handleFileChange} required />
                </div>

                <button type="submit" className="btn btn-primary">Add Carousel</button>
            </form>
        </div>
    );
}

export default AddCarousel;
