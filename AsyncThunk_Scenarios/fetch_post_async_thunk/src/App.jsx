import { Route, Routes } from 'react-router-dom'
import './App.css'
import CreatePost from './Components/CreatePost'
import FetchAllPosts from './Components/FetchAllPosts'
import FetchPost from './Components/FetchPost'
import Home from './Components/Home'
import About from './Components/About'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <div className=''>

      <Routes>
        <Route path='/' element={<Home />} index />
        <Route path='/about' element={<About />} />
        <Route path='/posts' element={<FetchAllPosts />} />
        <Route path='/posts/:id' element={<FetchPost />} />
        <Route path='/posts/createPost' element={<CreatePost />} />
      </Routes>

      <ToastContainer theme='dark' />
    </div>
  )
}

export default App
