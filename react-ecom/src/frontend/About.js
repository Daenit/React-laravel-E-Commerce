import React, { useEffect, useState } from "react";
import About from "../layouts/frontend/About";
import Firm from "../layouts/frontend/Firm";
// import Customer from "../layouts/frontend/Customer";
import Feature from "../layouts/frontend/Feature";

function About_Us() {

    return (
        <>
            {/* <!-- Page Header Start --> */}
            <div class="container-fluid page-header mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div class="container">
                    <h1 class="display-3 mb-3 animated slideInDown">About Us</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><a class="text-body" href="/Home">Home</a></li>
                            <li class="breadcrumb-item"><a class="text-body" href="/">Pages</a></li>
                            <li class="breadcrumb-item text-dark active" aria-current="page">About Us</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <About />
            <Firm />
            <Feature />
            {/* <!-- Page Header End --> */}
        </>
    );
}

export default About_Us;
