import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Privacy from '../pages/Privacy'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Products from '../pages/Products'
import Detail from '../pages/Detail'
import Cart from '../pages/Cart'
import Admin from '../pages/Admin'
import Community from '../pages/Community'
import LoginCheck from './middleware/LoginCheck'


export default function AppRoutes() {
    const storedToken = window.localStorage.getItem('loginAppUser');
    const isAuthenticated = !!storedToken;

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/community' element={<Community />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/detail/:id' element={<Detail />} />
                <Route path='/login' element={!isAuthenticated ?<Login /> : <Navigate to='/profile'/>} />

                {/* Private Routes */}
                <Route path='/profile' element={isAuthenticated ?<Profile /> : <Navigate to='/login'/>} />
                <Route path='/cart' element={isAuthenticated ?<Cart /> : <Navigate to='/login'/>} />
                <Route path='/admin' element={isAuthenticated ?<Admin /> : <Navigate to='/login'/>} />

                {/* Error */}
                <Route path='*' element={isAuthenticated? <Navigate to='/profile'/> : <Navigate to='/login'/>} />
            </Routes>
        </Router>
    );
}
