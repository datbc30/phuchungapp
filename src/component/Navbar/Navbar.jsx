import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const handleClose = () => {
    document.getElementById("sidebar").style.display = "none";
  };

  return (
    <div id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <span id="close" onClick={handleClose}>
            <i class="fa fa-close" aria-hidden="true"></i>
          </span>
          <span className="sidebar-brand-logo">
            <i class="fas fa-user-secret"></i>
            <p>Phúc Hưng Store</p>
          </span>
        </div>
      </div>
      <hr />
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <span>
            <i class="fas fa-users"></i>
            <NavLink to="/">Sản Phẩm</NavLink>
          </span>
        </li>

        <li className="sidebar-list-item">
          <span>
            <i class="fas fa-id-card"></i>
            <NavLink to="/user">Khách Hàng</NavLink>
          </span>
        </li>
        <li className="sidebar-list-item">
          <span>
            <i class="fas fa-file-contract"></i>
            <NavLink to="contract">Hợp Đồng </NavLink>
          </span>
        </li>
      </ul>
    </div>
  );
}
