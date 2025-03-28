import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import MasterLayout from "./layouts/admin/MasterLayout";
import Login from "./frontend/auth/Login";
import Register from "./frontend/auth/Register";
import AdminPrivateRoute from './AdminPrivateRoute';
import Page403 from "./components/errors/Page403";
import Page404 from "./components/errors/Page404";
import FrontendLayout from "./layouts/frontend/FrontendLayout";

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/*" element={<FrontendLayout />} />

          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />

          {/* Login Route */}
          <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Login />} />

          {/* Register Route */}
          <Route path="/register" element={localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Register />} />

          {/* Redirect /admin to /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

          {/* Admin routes */}
          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin/*" element={<MasterLayout />} />
          </Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
