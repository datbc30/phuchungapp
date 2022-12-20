import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TableDetail from "../../component/TableDetail/TableDetail";
import {
  addToCart,
  changePrice,
  changeQuantity,
  getDetailApi,
} from "../../redux/reducer/productReducer";
// import { PoweroffOutlined } from "@ant-design/icons";
import { Input, DatePicker, Space } from "antd";
import dayjs from "dayjs";

export default function Detail() {
  const { detailProduct } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  let { id } = params;
  let query = { id };
  useEffect(() => {
    const action = getDetailApi(query);
    dispatch(action);
  }, [params.id]);

  const success = () => {
    alert("thêm thành Công");
  };

  //--antd----------
  
  const [quantityBuy, setQuantityBuy] = useState(0);
  const addQuantityBuy = () => {
    setQuantityBuy(quantityBuy + 1);
  };
  const subtractQuantityBuy = () => {
    setQuantityBuy(quantityBuy - 1);
  };

  const [costOne, setCostOne] = useState(0);
  const changeCostOne = (e) => {
    setCostOne(e.target.value);
  };
  //===
  const renderDetail = () => {
    const { name, note, imageUrl, _id } = detailProduct.product;
    return (
      <div className="detail-slider" key={_id}>
        <div className="detail-slider-left">
          <div className="item-left-img">
            <img src={imageUrl} alt="..." />
          </div>
        </div>
        <div className="detail-slider-right">
          <div className="item-right-title">
            <h3>{name}</h3>
          </div>
          <div className="item-right-decription">
            <p> {note}</p>
          </div>
          <div className="quantity">
            <div className="number">
              Chọn Số Lượng:
              <div className="itemm">
                <div className="up">
                  <span className="me-2" onClick={addQuantityBuy}>
                    +
                  </span>
                </div>
                <div className="buy">
                  <span>{quantityBuy}</span>
                </div>
                <div className="down">
                  <span className="ms-2" onClick={subtractQuantityBuy}>
                    -
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="inputPrice">
            <input
              type="number"
              placeholder="Giá Tiền"
              value={costOne}
              onChange={changeCostOne}
            />
            {/* <a href="/">
              <i class="fas fa-dollar-sign"></i>
            </a> */}
          </div>
          <div className="item-right-button">
            <div className="btnAddToCart">
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      quantityBuy,
                      costOne,
                      name,
                      note,
                      imageUrl,
                      _id,
                    })
                  );
                  success();
                }}
              >
                Thêm Giỏ Hàng
              </button>
            </div>
            {/* <Space direction="vertical">
              <Space wrap>
                <Button
                  type="primary"
                  loading={loadings[0]}
                  onClick={() => 
                    dispatch(addToCart({ ...detailProduct.product,quantityBuy}))
                  }
                >
                  Thêm Giỏ Hàng
                </Button>
              </Space>
            </Space> */}
          </div>
        </div>
      </div>
    );
  };

  const handleChangeDate = (e) => {
    const rentFrom = e[0];
    const rentTo = e[1];
    query = { rentFrom, rentTo, ...query };
    dispatch(getDetailApi(query));
  };

  return (
    <div className="detail">
      <div className="container">
        <div className="detail-title">
          <p className="text-center">Chi Tiết Sản Phẩm</p>
        </div>
        <div className="detail-right">{renderDetail()}</div>
        <div className="history">
          <div className="title">
            <h1 className="mb-4 mt-4">Lịch Sử Thuê Hàng</h1>
            <div className="history-oder mt-4 mb-4">
              <Input.Group compact>
                <Search
                  placeholder="Tìm Kiếm"
                  onSearch={onSearch}
                  style={{
                    width: 200,
                    marginRight: 50,
                  }}
                />
                <DatePicker.RangePicker
                  style={{
                    width: "50%",
                  }}
                  // value={dayjs()}
                  onChange={handleChangeDate}
                />
              </Input.Group>
            </div>
          </div>
          <TableDetail detailProduct={detailProduct} />
        </div>
      </div>
    </div>
  );
}
