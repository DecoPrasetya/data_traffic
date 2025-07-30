import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './api/Dashboard';
import Login from './api/Login';
import Users from './api/Users';
import Products from './api/Products';
import AddUsers from './api/AddUsers';
import EditUsers from './api/EditUsers';
import AddProducts from './api/AddProducts';
import EditProducts from './api/EditProducts';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/users/add' element={<AddUsers />}></Route>
          <Route path='/users/edit/:id' element={<EditUsers />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products/add' element={<AddProducts />}></Route>
          <Route path='/products/edit/:id' element={<EditProducts />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
