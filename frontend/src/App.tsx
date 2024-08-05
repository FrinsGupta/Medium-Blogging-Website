import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import Publish from './pages/Publish'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/" element={<Blogs/>} />
      <Route path="/blog/:id" element={<Blog/>} />
      <Route path="/publish" element={<Publish/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
