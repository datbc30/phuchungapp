import React, { useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  TextArea,
} from "antd";
import { useDispatch } from "react-redux";
import { postUserContract } from "../../redux/reducer/productReducer";

export default function FormCart(arrCart) {
  console.log({ arrCart });
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  

  const [valueForm, setValueForm] = useState("");
  console.log({ valueForm });
  const handleFormSubmit = (e) => {
    // console.log({ event: e });
    // setValueForm(e);
    const formValue = e;
    const elements = arrCart.arrCart.map((e) => ({
      product: e._id,
      costOne: e.costOne,
      quantity: e.quantityBuy,
    }));
    const data = { elements, ...formValue };
    dispatch(postUserContract(data))
  };

  

  return (
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
      onFinish={handleFormSubmit}
    >
      <Form.Item label="Tên" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Số Điện Thoại" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="Cơ Quan" name="organization">
        <Input />
      </Form.Item>
      <Form.Item label="Địa Chỉ" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="Ngày Tháng" name="rentAt">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Tiền ĐặT Cọc" name="deposit">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Khuyến Mãi" valuePropName="checked" name="discount">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Ghi Chú" name="note">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Đặt Hàng">
        <Button htmlType="submit" >
          Đặt Hàng 
        </Button>
      </Form.Item>
    </Form>
  );
}
