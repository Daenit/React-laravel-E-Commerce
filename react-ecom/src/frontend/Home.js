import React from "react";
import Carousel from "../layouts/frontend/Carousel";
import About from "../layouts/frontend/About";
import Feature from "../layouts/frontend/Feature";
import Products from "../layouts/frontend/Products";
import Firm from "../layouts/frontend/Firm";
import Customer from "../layouts/frontend/Customer";
import Blog from "../layouts/frontend/Blog";

function Home() {

    return (
        <>
            <Carousel />
            <About />
            <Feature />
            <Products/>
            <Firm />
            <Customer />
            <Blog />
        </>
    )
}

export default Home;