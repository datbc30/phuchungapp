import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Input, Button, Drawer, Form, Select, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductApi,
  addToCart,
  editProductApi,
  getEditProductAction,
  getProductApi,
} from "../../redux/reducer/productReducer";
import { NavLink, useNavigate } from "react-router-dom";

export default function Product() {
  const { arrProduct, editProduct } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const actionThuk = getProductApi({});
    dispatch(actionThuk);
  }, []);

  const handleChange = (e) => {
    const actionThuk = getProductApi({ search: e.target.value });
    dispatch(actionThuk);
  };

  const renderProdct = () => {
    return arrProduct.map((item, index) => {
      return (
        <div className="col-lg-3 col-md-4 col-sm-5" key={index}>
          <div className="card mt-3">
            <div className="card-header">
              <img
                class="card-img-top img-fluid"
                src={item.imageUrl}
                alt="..."
              />
            </div>
            <div className="card-body">
              <div className="text-card">
                <p>{item.name}</p>
              </div>
              <div className="btn-bottom">
                <button
                  className="btn"
                  value={item._id}
                  // onClick={() => {
                  //   console.log({ addToCart: item });
                  //   dispatch(addToCart(item));
                  // }}
                >
                  <i class="fas fa-cart-plus"></i>
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setUpdate(true);
                    dispatch(getEditProductAction(item));
                  }}
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    navigate(`/detail/${item._id}`);
                  }}
                >
                  <i class="fas fa-receipt"></i>
                </button>
              </div>
            </div>
            
          </div>
        </div>
      );
    });
  };
  //--------
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleProductadd = (e) => {
    console.log({ event: e });
    const submitValue = e;
    const data = { ...submitValue };
    dispatch(addProductApi(data));
  };

  const handlePage = (page, pageSize) => {
    dispatch(
      getProductApi({ pageIndex: page, pageSize: pageSize, search: "" })
    );
    console.log({ page });
    console.log({ pageSize });
  };
  //============update===========

  const [update, setUpdate] = useState(false);

  const { _id, name, quantity, note, imageUrl } = editProduct;

  const handleEditProduct = (data) => {
    // console.log({data});
    const { id, ...payload } = data;
    dispatch(editProductApi(data.id, payload));
  };

  const handleMess = () => {
    alert("Thay đổi thành công");
  };

  return (
    <div className="main-container">
      <div className="main-title">
        <h2 className="text-center">Sản Phẩm</h2>
      </div>
      <div className="search-product">
        <div className="inputSearch">
          <input
            type="text"
            id="search"
            placeholder="Tìm kiếm"
            onChange={handleChange}
          />
          <a href="/">
            <i class="fas fa-search"></i>
          </a>
        </div>
        <div className="addProduct">
          <>
            <Button type="primary" onClick={showDrawer} className="btn-product">
              Thêm Sản Phẩm
            </Button>
            <Drawer
              title="Thêm Sản Phẩm"
              placement="right"
              onClose={onClose}
              open={open}
              style={{ paddingTop: 80 }}
            >
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={handleProductadd}
              >
                <Form.Item label="Tên SP" name="name">
                  <Input />
                </Form.Item>
                <Form.Item label="số Lượng" name="quantity">
                  <Input />
                </Form.Item>
                <Form.Item label="hình ảnh" name="imageUrl">
                  <Input />
                </Form.Item>
                <Form.Item label="ghi chú" name="note">
                  <Input />
                </Form.Item>
                <Form.Item label="Select">
                  <Select>
                    <Select.Option value="True">True</Select.Option>
                    <Select.Option value="False">False</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <div className="button__create">
                    <Button
                      htmlType="submit"
                      style={{
                        backgroundColor: "#52adc0",
                        color: "#f7f7f8",
                        textDecoration: "none",
                        padding: " 8px 17px",
                        borderRadius: "0.375rem",
                        transition: "all 1s",
                        border: "none",
                        lineHeight: "initial",
                      }}
                    >
                      Thêm
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Drawer>
          </>
        </div>
      </div>
      <div className="editProduct">
        <>
          <Drawer
            title="Chỉnh Sửa Sản Phẩm"
            placement="right"
            onClose={() => {
              setUpdate(false);
            }}
            open={update}
            style={{ paddingTop: 80 }}
          >
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              initialValues={{
                size: componentSize,
              }}
              onValuesChange={onFormLayoutChange}
              size={componentSize}
              onFinish={handleEditProduct}
            >
              <Form.Item label="id" name="id" initialValue={_id} hidden>
                <Input />
              </Form.Item>
              <Form.Item label="Tên SP" name="name" initialValue={name}>
                <Input />
              </Form.Item>
              <Form.Item
                label="số Lượng"
                name="quantity"
                initialValue={quantity}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="hình ảnh"
                name="imageUrl"
                initialValue={imageUrl}
              >
                <Input />
              </Form.Item>
              <Form.Item label="ghi chú" name="note" initialValue={note}>
                <Input />
              </Form.Item>
              <Form.Item label="Select">
                <Select>
                  <Select.Option value="True">True</Select.Option>
                  <Select.Option value="False">False</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <div className="button__create">
                  <Button
                    htmlType="submit"
                    onClick={handleMess}
                    style={{
                      backgroundColor: "#52adc0",
                      color: "#f7f7f8",
                      textDecoration: "none",
                      padding: " 8px 17px",
                      borderRadius: "0.375rem",
                      transition: "all 1s",
                      border: "none",
                      lineHeight: "initial",
                    }}
                  >
                    Lưu
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Drawer>
        </>
      </div>
      <div className="main-card">
        <div className="row">{renderProdct()}</div>
        <Pagination
          defaultCurrent={1}
          onChange={handlePage}
          total={30}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        />
      </div>
      <div className="footer-product">
        <p className="text-center mt-5">Copyright</p>
      </div>
    </div>
  );
}
