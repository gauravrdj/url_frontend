import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Landing } from './pages/Landing'

import InputPage from './pages/Profile'
import { Home } from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/:username/:profile?' element={<Landing></Landing>}></Route>
        <Route path='/add/:username' element={<InputPage></InputPage>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App