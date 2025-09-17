import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Items from './Components/Items'

function App() {

  return (
    <div className='bg-black text-amber-50 w-full min-h-screen'>
      <h1 className='text-center text-4xl py-5 text-violet-200'> App Components </h1>

      <Routes>
        <Route path='/' element={<Navigate to={'/items'} />} />
        <Route path='/items' element={<Items />} />

      </Routes>

    </div>
  )
}

export default App
