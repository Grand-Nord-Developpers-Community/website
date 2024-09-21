
import { LucideBatteryWarning } from 'lucide-react'
import React from 'react'

const HomePage = () => {
  return (
    <>
    <main className="w-full min-h-screen py-3 px-4">
        <h1 className="text-center font-extrabold text-white text-3xl">Welcome to the GNDC Website</h1>
        <p className="my-2 text-gray-200 text-sm text-center">
            If you see this page it's probably that you've successfully cloned the project
        </p>
        <div className="mt-6 w-full px-4">
            
            <h2 className="text-2xl text-white font-bold text-center">Used technologies </h2>
            <p className="mt-4">
                <ul className='mt-3 px-3 text-xl text-gray-200 text-center'>
                    <li>NextJS 13 as React Framwork</li>
                    <li>Tailwind CSS for styling</li>
                    <li>Lucide Icon for icons</li>
                    <li>TypeScript as the variant of JavaScript</li>
                </ul>
            </p>
        </div>
        <h3 className="text-7xl pt-[45px] text-center font-extrabold text-white">Let's create something great !!!</h3>
    </main>
    <div className="absolute top-10 left-10 w-[240px] px-4 border border-red-800 border-2 rounded-[14px] py-3">
        <LucideBatteryWarning className='text-red-900 text-center mx-auto mt-4 size-[50px]' />
        <p className="text-sm text-red-900 font-bold text-center">Warning</p>
        <p className="text-md mt-4 text-center text-gray-200">
            This project and it's source code is the property of the GNDC and should be used and shared by his members and partners only.
        </p>
    </div>
    
    </>
  )
}

export default HomePage
