import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router";
import {Link} from 'react-router-dom'
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "./AccountNav";
import PlacesFormPage from "./PlacesFormPage";


export default function AccountPage() {

    let {subpage}=useParams();
    const [redirect,setRedirect]= useState(null)
    const { ready, user ,setUser} = useContext(UserContext);
  const[newpassword,setNewpassword]= useState('')
  const [currentpassword,setCurrentpassword] = useState('')
  const[confirmpassword,setConfirmPassword]= useState('')
  const[passwordButton,setPasswordBtn] = useState(false)


    if (subpage === undefined) {  subpage = 'profile'  }
   
    async function logout() {
        await axios.post('/logout')
        setUser(null)
        setRedirect('/')
    }


    if (!ready) { return "Loading"}

    if (ready && !user && !redirect) { return <Navigate to={'/login'} />  }


  

if(redirect){
    return <Navigate to={redirect} />
}



function handleChangePasswordBtn(e){
  e.preventDefault();
  setPasswordBtn(true)


}

async function handleSubmit(e){
  e.preventDefault()

const formData = {currentpassword,newpassword,confirmpassword}



console.log(formData);
try {
  
  const response = await axios.post('/newPassword',formData)
} catch (error) {
  
}


}




    return (
        <div className='flex bg-gray-200 h-screen flex-col'>
            <AccountNav/>
            <div className="bg-gray-200"> 
          

            {subpage === 'profile' && (
                <div className="text-center max-w-lg -mt-6 mx-auto ">
                    Logged in as {user.username} <br /><br />

                    <form className="w-full max-w-lg" onSubmit={handleSubmit}>

  <div className="flex flex-wrap -mx-3 ">
    <div className="w-full md:w-1/2 px-3  md:mb-0">
      <label className="block uppercase tracking-wide text-black text-xs font-bold"  htmlFor="grid-first-name">
      First Name
      </label>
      <input className="appearance-none block w-full bg-black-200 text-black-700 border border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" value={user.firstname} placeholder=""/>
    
    </div>
    
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-black text-xs font-bold" htmlFor="grid-last-name">
        Last Name
      </label>

      <input className="appearance-none block w-full bg-black-200 text-black-700 border border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" value={user.lastname} placeholder="Doe"/>

    </div>
  </div>
   {passwordButton!==true?<button className="primary max-w-sm mt-2" onClick={handleChangePasswordBtn}> change the password</button> : null }
  













{ 
passwordButton && (
<>
<div className="flex flex-wrap ">
    <div className="w-9/12 px-3 w-full mt-4">
      <label className="block uppercase tracking-wide text-black text-xs font-bold mb-2" htmlFor="grid-password">
        Enter Current Password
      </label>
      <input className="appearance-none block w-full bg-black-200 text-black-700 border border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" value={currentpassword} onChange={(e)=>setCurrentpassword(e.target.value)} placeholder="*************"/>
    </div>
  </div>

  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 mt-4 md:mb-0">
      <label className="block uppercase tracking-wide text-black text-xs font-bold"  htmlFor="grid-new-password">
      New  Password
      </label>
      <input
  className="appearance-none block w-full bg-black-200 text-black-700 border border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  id="grid-new-password"
  type="password"  
  value={newpassword}
  onChange={(e) => setNewpassword(e.target.value)}
  placeholder=""
/>
    
    </div>
    



    <div className="w-full md:w-1/2 mt-4 px-3">
      <label className="block uppercase tracking-wide text-black text-xs font-bold" htmlFor="grid-confirm-password">
        Confirm Password
      </label>

      <input className="appearance-none block w-full bg-black-200 text-black-700 border border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder=""/>

    </div>
  </div>




 <button  type='submit' className="primary max-w-sm mt-2"> Save </button> 


</>
)}
  
</form>

            
                    <button onClick={logout} className="primary max-w-sm mt-2">  Logout</button>

                </div>)}
                </div>










                {subpage === 'places' && (
                    <PlacesFormPage/>
                )}
                {subpage ==='places/new' && (
                    <PlacesFormPage/>
                )}
        </div>


    );
}

