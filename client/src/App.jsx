import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import Post from './components/pages/Post'
import Profile from './components/pages/Profile'

function App() {

  return (
   <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/post' element={<Post />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </Router>
   </>
  )
}

export default App
