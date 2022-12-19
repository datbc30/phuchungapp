import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/configStore';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/Product/Product';
import User from './pages/User/User'
import './assets/sass/styles.scss'
import Char from './pages/Char/Char';
import Detail from './pages/Detail/Detail';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Contract from './pages/Contractt/Contract';
import ContractDetail from './pages/Contractt/ContractDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<App />}>
          <Route index element={<Product />}></Route>
          <Route path='/user' element={<User />}></Route>
          <Route path='/char' element={<Char />}></Route>
          <Route path='/contract' element={<Contract />}></Route>
          <Route path='/contractDetail'>
            <Route path=':id' element={<ContractDetail />}></Route>
          </Route>
          <Route path='/detail'>
            <Route path=':id' element={<Detail />}></Route>
          </Route>
          <Route path='cart'>
            <Route path=':id' element={<Cart />}></Route>
          </Route>
        </Route>
        <Route path='login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

