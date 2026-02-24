import React from 'react'
import { Navigate, Routes, Route } from 'react-router'
import Dashboard from '../pages/dashboard/Dashboard'
import Products from '../pages/products/Products'


const CustomRoutes = () => {
  return (
        <Routes>
        {/* Instead of creating the / route I am redirecting to dashboard because of assigment requirement */}
        <Route path = '/' element = {<Dashboard />} />
        <Route path = '/dashboard' element = {<Dashboard />} />
        <Route path="/products" element={<Products />} />
    </Routes>
  )
}

export default CustomRoutes