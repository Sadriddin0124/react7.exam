import React from 'react'
import SignUp from './pages/Auth/SignUp'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/Auth/SignIn'
import Books from './pages/Home/Books'
import Sidebar from './pages/SideBar/Sidebar'
import Janr from './pages/Genre/Genre'
import Author from './pages/Author/Author'
import SingleBook from './pages/Home/SingleBook'
import SingleAuthor from './pages/Author/SingleAuthor'
import Main from './pages/Main/Main'
const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='signin' element={<SignIn/>}></Route>
        <Route path='main' element={<Main/>}></Route>
        <Route path='sidebar' element={<Sidebar/>}></Route>
        <Route path='single__book/:id' element={<SingleBook/>}></Route>
        <Route path='single__author/:id' element={<SingleAuthor/>}></Route>
      </Routes>
    </div>
  )
}

export default App
