
import './App.css'
import {Route,Routes} from 'react-router-dom'
import IndexPages from './pages/IndexPages';
import LoginPage from './pages/LoginPage';
import Layout from './Layout'
import Register from './pages/Register';
import axios from 'axios';
import UserContextProvider from './UserContext';
import AccountPage from './pages/AccountPage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlaceSinglePage from './pages/PlaceSinglePage';
import NotFound from './pages/404Page';
axios.defaults.baseURL= "http://localhost:4000" // replace with Backend 
axios.defaults.withCredentials= true



function App() {


  
  return (
    <UserContextProvider>
      <Routes>

        <Route path={'/'} element={<Layout />}>
          <Route index element={<IndexPages />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account/' element={<AccountPage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<PlaceSinglePage />} />
        </Route>
        <Route path='*' element={<NotFound/>} />


      </Routes>
      </UserContextProvider>


  )
}

export default App
