import { Link, linkOptions } from '@tanstack/react-router'
import React from 'react'

const Navbar = () => {
    const links = linkOptions([{
        to:'/',
        label:'Home'
    },{
        to:'/about',
        label:'About'
    }])

  return (
    <div className='flex justify-between items-center p-4'>
        <h2>
            Jarida
        </h2>
        <div className='flex gap-4'>
            {links.map((link)=>(
                <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
        </div>
    </div>
  )
}

export default Navbar