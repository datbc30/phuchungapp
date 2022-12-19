import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";
import { http } from "../../util/tools";

const initialState = {
  arrProduct: [],
  detailProduct: {
    product: {},
    history: [],
  },
  arrCart: [],
  userOder: [],
  User: [],
  addUser: [],
  contract:[],
  contractId:[],
  detailContract:{
    customer:{}
  },
  addProduct:[],
  editProduct:{
    name:'',
    quantity:'',
    imageUrl:'',
    note:''
  }
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProductAction: (state, action) => {
      //Lấy dữ liệu từ payload
      const arrProduct = action.payload;
      //cập nhật lại state
      state.arrProduct = arrProduct;
    },
    getDetailAction: (state, action) => {
      // const detailProduct = action.payload;
      state.detailProduct = action.payload;
    },
    changeQuantity: (state, action) => {
      if (action.payload) {
        state.quantityBuy += 1;
      } else {
        if (state.quantityBuy > 1) {
          state.quantityBuy -= 1;
        }
      }
    },
    changePrice: (state, action) => {
      state.price = action.payload;
    },
    addToCart: (state, action) => {
      let index = state.arrCart.findIndex(
        (pro) => pro._id === action.payload._id
      );
      console.log({ addCart: action.payload });
      // console.log({index});
      if (index !== -1) {
        state.arrCart[index].quantityBuy += state.quantityBuy;
      } else {
        let quantityBuy = state.quantityBuy;
        state.arrCart.push({ ...action.payload });
      }
    },
    changeQuantityCart: (state, action) => {
      let { type, id } = action.payload;
      console.log({ payload: action.payload });
      let index = state.arrCart.findIndex((pro) => pro._id === id);
      console.log({ change: state.arrCart[index] });
      if (type) {
        state.arrCart[index].quantityBuy += 1;
      } else {
        if (state.arrCart[index].quantityBuy > 1) {
          state.arrCart[index].quantityBuy -= 1;
        } else {
          state.arrCart.splice(index, 1);
        }
      }
    },
    removeFromCart: (state, action) => {
      state.arrCart = state.arrCart.filter((pro) => pro._id !== action.payload);
    },
    userOderProduct: (state, action) => {
      state.userOder = action.payload;
    },
    userAction: (state, action) => {
      state.User = action.payload;
    },
    addUserAction: (state, action) => {
      state.addUser = action.payload;
      state.User.unshift(action.payload);
    },
    getContract : (state,action) => {
      state.contract = action.payload
    },
    getContractId: (state,action) => {
      state.contractId = action.payload.elements
      state.detailContract = action.payload.order
    },
    getAddProductAction: (state,action) => {
      state.addProduct = action.payload
    },
    getEditProductAction: (state, action) => {
       const product = action.payload;
        // const products = state.arrProduct
        state.editProduct = product
      console.log({product});
    }
  },
});

export const {
  getProductAction,
  getDetailAction,
  changeQuantity,
  addToCart,
  changeQuantityCart,
  removeFromCart,
  changePrice,
  userOderProduct,
  userAction,
  addUserAction,
  getContract,
  getContractId,
  getAddProductAction,
  getEditProductAction
} = productReducer.actions;

export default productReducer.reducer;

export const getProductApi = (filter) => {
  return async (dispatch) => {
    try {
      console.log({ filter });
      const { pageIndex = 1, pageSize = 10, search = "" } = filter;
      const result = await http.get(
        `Product?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`
      );
      console.log(result.data);
      const action = getProductAction(result.data.result.results);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

export const getDetailApi = (filter) => {
  return async (dispatch) => {
    try {
      const {
        pageIndex = 1,
        pageSize = 20,
        id = "",
        rentFrom = dayjs(),
        rentTo = dayjs().add(1, "month"),
      } = filter;
      const result = await http.get(
        `Product/${id}?pageIndex=1&pageSize=12&rentFrom=${rentFrom}&rentTo=${rentTo}`
      );
      console.log({ result });
      let data = result.data.result;
      const history = data.history.map((e) => ({
        rentAt: e.order.rentAt,
        quantity: e.quantity,
        note: e.order.note,
        name: e.customer.name,
        address: e.customer.address,
        phone: e.customer.phone,
      }));
      data.history = history;

      const action = getDetailAction(data);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const postUserContract = (data) => {
  return async (dispatch) => {
    try {
      const result = await http.post("order", data);
      console.log({ result });
      const action = userOderProduct(result.data.result);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

export const getUserApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.get("customer?pageIndex=1&pageSize=20");
      const action = userAction(result.data.result.results);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

export const addUserApi = (data) => {
  return async (dispatch) => {
    try {
      const result = await http.post("customer", data);
      console.log({ result });
      const action = addUserAction(result.data.result);
      dispatch(action);
    } catch (err) {
      console.log({ err });
    }
  };
};

export const addProductApi = (data) => {
    return async (dispatch) => {
      try {
        const result = await http.post('Product', data)
        const action = getAddProductAction(result.data.result)
        dispatch(action)
      }
      catch (err) {
        console.log({err});
      }
    }
}

export const getContractApi = (filter) => {
  console.log({filter});
    return async (dispatch) => {
      try {
        const {pageIndex = 1, pageSize = 20} = filter
        const result = await http.get(`order?pageIndex=${pageIndex}&pageSize=${pageSize}`)
        const action = getContract(result.data.result.results)
        dispatch(action)
      }
      catch(err) {
        console.log({err});
      }
    }
}

export const getContractIdApi = (id) => {
  console.log({idne: id});
  return async (dispatch) => {
    try{
      const result = await http.get(`order/${id}`)
      const action = getContractId(result.data.result)
      dispatch(action)
    }
    catch(err) {
      console.log({err});
    }
  }
}

export const editProductApi = (id,data) => {
  console.log({id});
    return async (dispatch) => {
      try{
        const result = await http.put(
          `Product/${id}`,
          data
          )
        const action = getEditProductAction(result.data.result)
        dispatch(action)
      }
      catch(err) {
        console.log({err});
      }
    }
}