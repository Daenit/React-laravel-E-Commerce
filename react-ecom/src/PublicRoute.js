import React from "react";
import { Route } from "react-router-dom";
import FrontendLayout from "./layouts/frontend/FrontendLayout";

function PublicRoute({ element: Element, ...rest }) {
    return <Route {...rest} element={<FrontendLayout />} />;
}

export default PublicRoute;
