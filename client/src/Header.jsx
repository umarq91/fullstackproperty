import { Link, Navigate, redirect } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

import axios from "axios";

const Header = () => {

  
  const {user,setUser} = useContext(UserContext);
  const [openDropDown,setOpenDropDown] = useState(false)

  const handleDropDownClick = () => {
    event.stopPropagation(); // Stop event propagation
    setOpenDropDown((prev) => !prev);
  };
  window.addEventListener('click',()=> setOpenDropDown(false))

  async function logout() {
    await axios.post('/logout')
    setUser(null)
    window.location.reload(); // Refresh the page
    window.location.href = '/'; // Redirect to the index page
    
}



    return ( 
      <header className="p-2 flex bg-gray-100 drop-shadow-2xl drop-shadow-md hover:drop-shadow-2 xl justify-between">

        <Link to={'/'} className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
          <span className="font-bold text-xl">rateAproperty</span>
        </Link>

       {/* Middle part  Of the Header   */}
        {/* <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <div> <Link to={'/'}>Home</Link> </div>
          <div className="border border-l border-gray-300"></div>
          <div><Link to={'#'}>About</Link></div>
          <div className="border border-l border-gray-300"></div>
          <div><Link to={'/account'}>My Reviews</Link></div>

        </div> */}

  
<div className="flex gap-2">
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-gray-500  text-white py-2 px-2 rounded-2xl"
            to={user ? "/account/places/new" : "/login"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg> add place
                    </Link>
                </div>



  
                <Link
          to={user ? "#" : "/login"}
          onClick={handleDropDownClick}
          className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4"
        >
         {!!user && (
            
            <div>{user.firstname}</div>
          )}

          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>

          
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          
          
        </Link>


        
        
        {/*   this below statement checks if the user is logged in then setOpendropdrown to true and rest is dropDown  */}
        {user && openDropDown && 
          <div className="flex flex-col dropDownMenu">
            <ul className="flex flex-col gap-4">
             <li><Link to='/account'>My Profile</Link>  </li>
             <li> <Link to='/account/places'> My Reviews </Link></li>
             <li> <button className="bg-white" onClick={logout} > Logout   </button></li>
         </ul>
     </div>
        
        }
      
</div>
      



      </header>
     );
}
 
export default Header;