import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Privacity from '../pages/Privacity'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Products from '../pages/Products'
import Detail from '../pages/Detail'
import Cart from '../pages/Cart'
import Admin from '../pages/Admin'
import Community from '../pages/Community'

export default function AppRoutes() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/privacity' element={<Privacity/>}/>

                {/* User */}
                <Route path='/login' element={<Login/>}/>
                <Route path='/profile' element={<Profile/>}/>

                {/* Products */}
                <Route path='/products' element={<Products/>}/>
                <Route path='/products/detail/:id' element={<Detail/>}/>
                <Route path='/cart' element={<Cart/>}/>

                {/* Admin */}
                <Route path='/admin' element={<Admin/>}/>

                {/* Comunity */}
                <Route path='/comunity' element={<Community/>}/>
                
                {/* Error */}
                <Route path='*' element={<h1>Error</h1>}/>
            </Routes>
        </Router>
    )
}