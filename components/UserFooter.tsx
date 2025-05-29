import React from 'react'
import { Link } from 'react-router';

const UserFooter = () => {
  return (
    <div className="flex justify-between align-middle items-center px-24 w-full border-t-1 border-t-neutral-400 ">
    <div>
      <Link to="/" className="link-logo p-4 gap-3 border-0">
        <img
          src="/assets/icons/logo.svg"
          alt="logo"
          className="size-[30px]"
        />
        <h1>TourVisto</h1>
      </Link>
    </div>
    <div className="flex gap-5 items-center text-base text-gray-700">
      
      <p>Terms & Condition</p>
      <p>Privacy Policy</p>
    </div>
  </div>
  )
}

export default UserFooter