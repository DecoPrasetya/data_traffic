import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Users from './pages/Users';
import Products from './pages/Products';
import AddUsers from './pages/AddUsers';
import EditUsers from './pages/EditUsers';
import AddProducts from './pages/AddProducts';
import EditProducts from './pages/EditProducts';

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
