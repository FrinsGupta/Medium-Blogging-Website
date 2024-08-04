import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/blog/:id" element={<Blog/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
