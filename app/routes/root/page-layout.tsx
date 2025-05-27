import React from 'react'
import { useNavigate } from 'react-router';
import { logoutUser } from '~/appwrite/auth';

const PageLayout = () => {
    const navigate = useNavigate();
    const handleLogOut = async () => {
      await logoutUser();
      navigate("/sign-in");
    };
  return (
    <div>PageLayout

<button onClick={handleLogOut} className="cursor-pointer">
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              className="size-6"
            />
          </button>

          <button className="cursor-pointer " onClick={()=>{navigate('/dashboard')}}>
            Dashboard
          </button>
    </div>
    
  )
}

export default PageLayout