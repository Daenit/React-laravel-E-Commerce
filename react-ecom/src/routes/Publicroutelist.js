import Home from "../frontend/Home";
import About_Us from "../frontend/About";
import Content from "../frontend/Contact";
import Product from "../frontend/Product";
import ProductDetail from "../frontend/ProductDetail";
import Cart from "../frontend/Cart";
import Checkout from "../frontend/Checkout";

const PublicRoutesList = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About_Us",
        component: About_Us,
    },
    {
        path: "/content",
        name: "Content",
        component: Content,
    },
    {
        path: "/product",
        name: "Product",
        component: Product,
    },
    {
        path: "/product/:id", 
        name: "ProductDetail",
        component: ProductDetail,
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart,
    },

    {
        path: "/checkout",
        name: "Checkout",
        component: Checkout,
    },
];

export default PublicRoutesList;
