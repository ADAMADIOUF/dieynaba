import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux'
import store from './store'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import TableWare from './pages/TableWare';
import Tissue from './pages/Tissue';
import Shoes from './pages/Shoes';
import Woman from './pages/Woman';
import Bag from './pages/Bag';
import Options from './components/Options';
import Historique from './components/Historique';
import Commander from './components/Commander';
import Shipping from './pages/Shipping';
import PlaceOrder from './pages/PlaceOrder';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/product/:id' element={<SingleProduct />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/tableware' element={<TableWare />} />
      <Route path='/tissue' element={<Tissue />} />
      <Route path='/shoes' element={<Shoes />} />
      <Route path='/woman' element={<Woman />} />
      <Route path='/bag' element={<Bag />} />
      <Route path='/options' element={<Options />} />
      <Route path='/history' element={<Historique />} />
      <Route path='/commander' element={<Commander />} />
      <Route path='/shipping' element={<Shipping />} />
      <Route path='/placeorder' element={<PlaceOrder />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/admin/productlist' element={<ProductList />} />
      <Route path='/admin/product/:id/edit' element={<ProductEdit />} />
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
