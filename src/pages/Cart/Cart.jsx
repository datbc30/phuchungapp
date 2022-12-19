import React from "react";
import { useSelector } from "react-redux";
import TableCart from "../../component/Table/TableCart";
import FormCart from "../../component/FormCart/FormCart"

export default function Cart() {
  const {arrCart} = useSelector((state) => state.productReducer)
  console.log({arrCart});

  return (
    <section className="cart-detail">
      <div className="container">
        <h1 className="cart_detail-title text-center">Giỏ Hàng</h1>
        <TableCart />
        <hr className="mb-4 mt-4"/>
        <h1 className="cart-ttkh text-center mb-4 mt-4">Thông Tin Khách Hàng</h1>
        <FormCart arrCart={arrCart}/>
      </div>
    </section>
  );
}
