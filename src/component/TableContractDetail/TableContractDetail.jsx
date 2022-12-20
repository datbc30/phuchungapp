import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Tên SP",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Hình ảnh",
    dataIndex: "imageUrl",
    key: "imageUrl",
    render: (data) =>
      data ? <img src={data} style={{ width: 60, height: 60 }} /> : <></>,
  },
  {
    title: "Số Lượng",
    key: "quantity",
    dataIndex: "quantity",
  },
  {
    title: "Đơn Giá",
    dataIndex: "costOne",
    key: "costOne",
  },
  {
    title: "Thành Tiền",
    dataIndex: "total",
    key: "total",
  },
];
export default function TableContractDetail(contractId) {
  const arrIndex = contractId.contractId;
  console.log({ arrIndex });
  let arrData = [];
  let sum = 0
  for (let i = 0; i < arrIndex.length; i++) {
      sum +=  arrIndex[i].costOne * arrIndex[i].quantity
    arrData.push({
      key: i,
      name: arrIndex[i].product.name,
      imageUrl: arrIndex[i].product.imageUrl,
      quantity: arrIndex[i].quantity,
      costOne: arrIndex[i].costOne,
      total: `${(
        arrIndex[i].costOne * arrIndex[i].quantity
      ).toLocaleString()}.Vnd`,
    });
  }
  
  
  arrData.push({
    key: null,
    name: null,
    imageUrl: null,
    quantity: null,
    costOne: "Tổng Tiền",
    total: `${sum.toLocaleString()}.Vnd`,
  });
  
  return (
    <div>
      <Table style={{maxWidth: 1200}} scroll={{ x: true}} columns={columns} dataSource={arrData} />
    </div>
  );
}
