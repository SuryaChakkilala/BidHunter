import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import AboutScreen from './screens/AboutScreen'
import UserListScreen from './screens/UserListScreen'
import Reckz from './screens/Reckz'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/products/:id' element={<ProductScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              {/* Multiple routes as optional paths are not supported in router v6 */}
              <Route path='/register' element={<RegisterScreen />}/>
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/reckz' element={<Reckz />} />
              <Route path='/about' element={<AboutScreen />} />
              <Route path='/admin/userList' element={<UserListScreen />} />
              <Route path='/admin/productlist' element={<ProductListScreen />}/>
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
