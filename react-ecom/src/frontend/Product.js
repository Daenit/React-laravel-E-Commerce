import React from "react";
import Firm from "../layouts/frontend/Firm";
import Products from "../layouts/frontend/Products";
import Customer from "../layouts/frontend/Customer";
import { Link } from "react-router-dom";

function Product() {

    return (
        <>
            {/* <!-- Page Header Start --> */}
            <div class="container-fluid page-header mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div class="container">
                    <h1 class="display-3 mb-3 animated slideInDown">Products</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><Link class="text-body" to="#">Home</Link></li>
                            <li class="breadcrumb-item"><Link class="text-body" to="#">Pages</Link></li>
                            <li class="breadcrumb-item text-dark active" aria-current="page">Products</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <Products />

            <Firm />
            <Customer />
            {/* <!-- Page Header End --> */}
        </>
    )
}

export default Product;