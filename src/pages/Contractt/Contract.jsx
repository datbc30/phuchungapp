import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TableContrac from "../../component/TableContract/TableContract";
import { getContractApi } from "../../redux/reducer/productReducer";


  

export default function Contract() {
    const {contract} = useSelector((state) => state.productReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        const actions = getContractApi({})
        dispatch(actions)
    },[])

  return (
    <div className="Contract">
      <div className="container">
        <div className="contract-title">
          <h2 className="text-center">Hợp Đồng Khách Hàng</h2>
        </div>
        <div className="contract-table">
          <TableContrac contract={contract}/>
        </div>
      </div>
    </div>
  );
}
