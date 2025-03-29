import React from "react";
import {Link} from "react-router-dom";

const Sidebar =() => {

    return (
        // <!-- Sidebar -->
        <div className="sidebar" data-background-color="dark">
          <div className="sidebar-logo">
            {/* <!-- Logo Header --> */}
            <div className="logo-header" data-background-color="dark">
              <a to="index.html" className="logo">
                <img
                  src="assets/img/kaiadmin/logo_light.svg"
                  alt="navbar brand"
                  className="navbar-brand"
                  height="20"
                />
              </a>
              <div className="nav-toggle">
                <button className="btn btn-toggle toggle-sidebar">
                  <i className="gg-menu-right"></i>
                </button>
                <button className="btn btn-toggle sidenav-toggler">
                  <i className="gg-menu-left"></i>
                </button>
              </div>
              <button className="topbar-toggler more">
                <i className="gg-more-vertical-alt"></i>
              </button>
            </div>
            {/* <!-- End Logo Header --> */}
          </div>
          <div className="sidebar-wrapper scrollbar scrollbar-inner">
            <div className="sidebar-content">
              <ul className="nav nav-secondary">
                
                <li className="nav-item">
                  <Link to="/admin/dashboard">
                    <i className="fas fa-desktop"></i>
                    <p>Dashboard</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link data-bs-toggle="collapse" to="#sidebarLayouts">
                    <i className="fas fa-th-list"></i>
                    <p>Sidebar Layouts</p>
                    <span className="caret"></span>
                  </Link>
                  <div className="collapse" id="sidebarLayouts">
                    <ul className="nav nav-collapse">
                      <li>
                        <Link to="/admin/add-Carousel/">
                          <span className="sub-item">Add Sidebar</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/view-Carousel">
                          <span className="sub-item">View Sidebar</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link data-bs-toggle="collapse" to="#categoryLayouts">
                    <i className="fas fa-th-list"></i>
                    <p>Category Layouts</p>
                    <span className="caret"></span>
                  </Link>
                  <div className="collapse" id="categoryLayouts">
                    <ul className="nav nav-collapse">
                      <li>
                        <Link to="/admin/add-category">
                          <span className="sub-item">Add Category</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/view-category">
                          <span className="sub-item">View Category</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link data-bs-toggle="collapse" to="#productLayouts">
                    <i className="fas fa-th-list"></i>
                    <p>Products Layouts</p>
                    <span className="caret"></span>
                  </Link>
                  <div className="collapse" id="productLayouts">
                    <ul className="nav nav-collapse">
                      <li>
                        <Link to="/admin/add-product">
                          <span className="sub-item">Add Product</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/show/:id">
                          <span className="sub-item">View Product</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>


                <li className="nav-section">
                  <span className="sidebar-mini-icon">
                    <i className="fa fa-ellipsis-h"></i>
                  </span>
                  <h4 className="text-section">Components</h4>
                </li>

                <li className="nav-item">
                  <a to="widgets.html">
                    <i className="fas fa-desktop"></i>
                    <p>Widgets</p>
                    <span className="badge badge-success">4</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a to="../../documentation/index.html">
                    <i className="fas fa-file"></i>
                    <p>Documentation</p>
                    <span className="badge badge-secondary">1</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        // <!-- End Sidebar -->
    )
}

export default Sidebar;