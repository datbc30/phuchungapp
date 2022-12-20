import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TableContractDetail from "../../component/TableContractDetail/TableContractDetail";
import { getContractIdApi } from "../../redux/reducer/productReducer";

export default function ContractDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  let { id } = params;
  useEffect(() => {
    const action = getContractIdApi(id);
    dispatch(action);
  }, [params.id]);

  const { contractId, detailContract } = useSelector(
    (state) => state.productReducer
  );
  const { name, address, phone, organization } = detailContract.customer;


  return (
    <div className="ContractDetail">
      <div className="container">
        <div className="ContractDetail-title">
          <h2>Chi Tiết Hơp Đồng</h2>
        </div>
        <div className="table-detail">
          <TableContractDetail contractId={contractId} />
        </div>
        <div className="table-customer">
          <div className="table-customer-left">
            <div className="table-left">
              <h2 className="text-center">{name}</h2>
              <p>số điện thoại: {phone}</p>
              <p>địa chỉ : {address}</p>
              <p>Tổ chức : {organization}</p>
            </div>
          </div>
          <div className="table-customer-right">
            <div className="table-right">
              <button className="btn-kt">Kết thúc hợp đồng</button>
              <button className="btn-in">In hoá đơn tất toán</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
