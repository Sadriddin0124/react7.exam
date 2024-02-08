import React, { useEffect, useState } from 'react'
import Sidebar from '../SideBar/Sidebar'
import Author from '../Author/Author'
import Books from '../Home/Books'
import Genre from '../Genre/Genre'
const Main = () => {
    const [components, setComponents] = useState([
        {id: 1, component: <Books/>},
        {id: 2, component: <Author/>},
        {id: 3, component: <Genre/>},
    ])
    const [id, setId] = useState(1)
    useEffect(()=> {
      let id = localStorage.getItem("id")
      setId(id)
    },[])
  return (
    <div className=' bg-slate-200 w-[100%] min-h-[100vh] flex'>
      <div className='w-[300px]'></div>
        <Sidebar/>
      <div className='flex w-[80%]'>
        {
        components.filter((item)=> item.id == id).map((item, index)=> {
          return <div key={index}>
            {item.component}
          </div>
        })
        }
      </div>
    </div>
  )
}

export default Main
