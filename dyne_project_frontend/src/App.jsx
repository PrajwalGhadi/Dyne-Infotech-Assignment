import React from 'react'
import SideBar from './components/SideBar'
import CustomRoutes from './routes/CustomRoutes'

const App = () => {
  return (
    <>
      <div className='bg-[#101921] text-white w-screen h-screen relative'>
        <SideBar />
        <CustomRoutes />
      </div>
    </>
  )
}

export default App