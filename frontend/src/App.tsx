import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import AppBar from './components/AppBar'

function App() {

  return (
    <>
    <BrowserRouter>
    <AppBar/>
    <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/blog" element={<Blog/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
