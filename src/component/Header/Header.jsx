import React, { useState } from "react";
import { Avatar, Badge } from "antd";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Header() {
  const { arrCart, detailProduct } = useSelector(
    (state) => state.productReducer
  );

    const handleSidebar = () => {
      document.getElementById("sidebar").style.display= "inline"
      document.getElementById("sidebar").style.position="absolute"
      document.getElementById("sidebar").style.zIndex="1100"
      document.getElementById("close").style.display = "flex"
      document.getElementById("close").style.flexDirection = "row-reverse"
      
    }
 
  return (
    <div className="header">
      <div id="menu-icon" onClick={handleSidebar}>
        <span>
          <i class="fas fa-bars"></i>
          Menu
        </span>
      </div>
      <div className="header-left">
        {/* <span>
          <i class="fa fa-search" aria-hidden="true"></i>
        </span> */}
      </div>
      <div className="header-right">
        <span className="ms-2">
          <NavLink to={`/cart/${detailProduct._id}`}>
            <Badge count={arrCart.length}>
              <i class="fas fa-shopping-cart"></i>
            </Badge>
          </NavLink>
        </span>
        <span className="ms-2">
          <NavLink to="login">
            <i class="fas fa-user"></i>
          </NavLink>
        </span>
      </div>
    </div>
  );
}
