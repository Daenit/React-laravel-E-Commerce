import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Category from '../components/admin/category/Category';
import ViewCategory from '../components/admin/category/ViewCategory';
import EditCategory from '../components/admin/category/EditCategory';
import AddProduct from "../components/admin/products/AddProduct";
import ViewProduct from "../components/admin/products/ViewProduct";
import EditProduct from "../components/admin/products/EditProduct";
import AddCarousel from "../components/admin/sidebar/AddCarousel";
import ViewCarousel from "../components/admin/sidebar/ViewCarousrl"

const routes = [
    {
        path: "/admin",
        exact: true,
        name: "Admin",
        component: Dashboard,
    },
    {
        path: "/admin/dashboard",
        exact: true,
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/admin/profile",
        exact: true,
        name: "Profile",
        component: Profile,
    },
    // Category 
    {
        path: "/admin/add-category",
        exact: true,
        name: "Category",
        component: Category,
    },
    {
        path: "/admin/view-category",
        exact: true,
        name: "ViewCategory",
        component: ViewCategory,
    },
    {
        path: "/admin/edit-category/:id",
        exact: true,
        name: "EditCategory",
        component: EditCategory,
    },

    // Products
    {
        path: "/admin/add-product",
        exact: true,
        name: "AddProduct",
        component: AddProduct,
    },
    {
        path: "/admin/show/:id",
        exact: true,
        name: "ViewProduct",
        component: ViewProduct,
    },
    {
        path: "/admin/edit-product/:id",
        exact: true,
        name: "EditProduct",
        component: EditProduct,
    },

    {
        path: "/admin/add-Carousel/",
        exact: true,
        name: "AddCarousel",
        component: AddCarousel,
    },

    {
        path: "/admin/view-Carousel/",
        exact: true,
        name: "ViewCarousel",
        component: ViewCarousel,
    },
    
];

export default routes;
