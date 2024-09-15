import React from 'react'
import Header from '../components/basic/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/basic/Footer'

export default function RootLayout() {
  return (
    <>
      <Header></Header>
      <div className='pt-40'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  )
}
