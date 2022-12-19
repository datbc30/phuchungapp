import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

const columns = [
    {
      title: 'ID',
      dataIndex: '_id', 
      key: '_id',
      render: (data) => <Link to={`/contractDetail/${data}`}>{data}</Link>
    },
    {
      title: 'Tên Khách Hàng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Tổ Chức',
      key: 'organization',
      dataIndex: 'organization',
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
        title: 'Trạng Thái',
        dataIndex: 'isActive',
        key: 'isActive',
      },
      {
        title: 'Ngày Tạo',
        dataIndex: 'rentAt',
        key: 'rentAt',
      },

  ];
  export default function TableContrac(contract) {
      const arrIndex = contract.contract
      console.log({arrIndex});
      let arrData = []
      for (let i = 0; i < arrIndex.length ; i++){
          arrData.push({
              key : i,
              _id : arrIndex[i]._id,
              name:arrIndex[i].customer.name,
              phone:arrIndex[i].customer.phone,
              organization:arrIndex[i].customer.organization,
              address:arrIndex[i].customer.address,
              isActive:arrIndex[i].isActive.toString(),
              rentAt:arrIndex[i].rentAt
          })
      }
  return (
    <div>
        <Table columns={columns} dataSource={arrData} />;
    </div>
  )
  }