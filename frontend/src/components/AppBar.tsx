import React from 'react'

const AppBar = () => {
  return (
    <div className="bg-gray-200 rounded-b-2xl">
      <div className="flex justify-between mx-8 ">
        <div className="flex">
        <div className=' font-bold text-3xl py-3 '>
      Heading
    </div>
        </div>
        <div className="flex items-center">
          <p className=" font-semibold text-xl">Hello, name</p>
          <button className="bg-gray-300 font-bold text-xl rounded-full px-3 py-1 ml-4">
            A
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppBar
