import React from 'react'
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Ngày Thuê',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Số Lượng',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Ghi Chú',
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: 'Tên Khách Hàng',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'điện thoại',
    key: 'phone',
  },
  {
    title: 'Địa Chỉ',
    dataIndex: 'address',
    key: 'address',
  },
];



export default function TableDetail(detailProduct) {
    const history = detailProduct.detailProduct.history
    console.log({history});
    let arrData = [];
    for ( let i = 0; i < history.length ; i++) {
        arrData.push({
            key : i,
            date : history[i].rentAt,
            quantity: history[i].quantity,
            note: history[i].note,
            name: history[i].name,
            phone: history[i].phone,
            address:history[i].address
        });
    }
    console.log({arrData});
  return (
    <div>
        <Table columns={columns} dataSource={arrData} />;
    </div>
  )
}
