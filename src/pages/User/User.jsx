import React, { useEffect, useState } from "react";
import {
  Divider,
  Radio,
  Form,
  Table,
  Button,
  Drawer,
  Input,
  Select,
  TreeSelect,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addUserApi, getUserApi } from "../../redux/reducer/productReducer";
const columns = [
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Số Điện Thoại",
    dataIndex: "phone",
  },
  {
    title: "Địa Chỉ",
    dataIndex: "address",
  },
  {
    title: "Cơ quan",
    dataIndex: "organization",
  },
  // {
  //   title: "isActive",
  //   dataIndex: "isActive",
  // },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};
const App = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const { User } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  //-----
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  //----
  console.log({ User });
  const data = [];
  for (let i = 0; i < User.length; i++) {
    data.push({
      key: i,
      name: User[i].name,
      phone: User[i].phone,
      address: User[i].address,
      organization: User[i].organization,
      // isActive: User[i].isActive,
    });
  }
  //----------
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [valueUser, setValueUser] = useState("");

  const handleUser = (e) => {
    console.log({event : e});
    const submitValue = e;
    const data = { ...submitValue };
    dispatch(addUserApi(data));
  };

  useEffect(() => {
    const actionThunk = getUserApi();
    dispatch(actionThunk);
  }, []);

  return (
    <div className="User">
      <div className="container">
        <h1 className="text-center">Khách Hàng</h1>
        <div className="create">
          <>
            <Button type="primary" onClick={showDrawer}>
              Thêm Khách Hàng
            </Button>
            <Drawer
              title="Thêm Khách Hàng"
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
                onFinish={handleUser}
              >
                <Form.Item label="Tên" name="name" >
                  <Input />
                </Form.Item>
                <Form.Item label="số điện thoại" name="phone">
                  <Input />
                </Form.Item>
                <Form.Item label="địa chỉ" name="address">
                  <Input />
                </Form.Item>
                <Form.Item label="cơ quan" name="organization">
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
        <Divider />
        <Table
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};
export default App;
