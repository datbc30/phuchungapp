import { Table } from "antd";
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantityCart,
  removeFromCart,
} from "../../redux/reducer/productReducer";

const TableCart = () => {
  const { arrCart } = useSelector((state) => state.productReducer);
  console.log({ arrCart });
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Hình Ảnh",
      dataIndex: "img",
      render: (imgSrc) => {
        return <img src={imgSrc} width={85} height={85} alt="..." />;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      render: (text) => {
        const { quantity, id } = text;
        return (
          <div>
            <button
              className="btn quantity-plus"
              style={{ marginRight: 10, backgroundColor: "rgb(99 132 240)" }}
              onClick={() => {
                dispatch(changeQuantityCart({ type: true, id: id }));
              }}
            >
              +
            </button>
            <span className="span quantity-span">{quantity}</span>
            <button
              className="btn quantity-minus"
              style={{ marginLeft: 10, backgroundColor: "rgb(99 132 240)" }}
              onClick={() => {
                dispatch(changeQuantityCart({ type: false, id: id }));
              }}
            >
              -
            </button>
          </div>
        );
      },
    },
    {
      title: "Thành Tiền",
      dataIndex: "total",
    },
    {
      title: "Chỉnh Sủa",
      dataIndex: "action",
      render: (_id) => {
        return (
          <div>
            {/* <button
              className="btn action-edit"
              style={{ backgroundColor: "rgb(224 176 109)", marginRight: 10 }}
            >
              <i class="fas fa-edit"></i>
            </button> */}
            <button
              className="btn action-delete"
              style={{ backgroundColor: "rgb(204 204 204)" }}
              onClick={() => {
                dispatch(removeFromCart(_id));
              }}
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        );
      },
    },
  ];
  let dataArr = [];
  console.log({ arrCart });
  for (let i = 0; i < arrCart.length; i++) {
    dataArr.push({
      key: i,
      id: arrCart[i]._id,
      img: arrCart[i].imageUrl,
      name: arrCart[i].name,
      price: `${arrCart[i].costOne}.Vnd`,
      total: `${(arrCart[i].costOne * arrCart[i].quantityBuy).toLocaleString()}.Vnd`,
      quantity: { quantity: arrCart[i].quantityBuy, id: arrCart[i]._id },
      action: arrCart[i]._id,
    });
  }
  console.log({ dataArr });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      {/* <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div> */}
      <Table
        // rowSelection={rowSelection}
        style={{maxWidth: 1100}} scroll={{ x: true}}
        columns={columns}
        dataSource={dataArr}
      />
    </div>
  );
};

export default TableCart;
