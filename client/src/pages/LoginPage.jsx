import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../UserContext';


const LoginPage = () => {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [err,setErr] = useState(false)
  const [msg,setMsg] = useState('')

const showError =(msg)=>{
  setErr(true)
  setMsg(msg)
  setTimeout(() => {
    setErr(false)
   }, 2000);

}



  async function handleLoginSubmit(e) {
    e.preventDefault();


    
    
    if(username=='' || password==''){
    showError("Please fill both the fields ")
    return
    }

    try {
      const { data } = await axios.post('/login', { username, password });
      if(data=='yes'){
        showError("Incorrect username or password!")
        return;
      }

      setUser(data);
      
      
      setRedirect(true);
     
    } catch (error) {
     showError("Incorrect username or password!")
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4 grow flex item-center justify-around">
     
      <div className="mt-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md 2xl mx-auto border mt-2" onSubmit={handleLoginSubmit}>

          <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
  
          <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
         {err &&
         <div className="mt-2 mb-2  px-16  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         <span className="font-medium">Oops! </span> {msg}
       </div>
          } 
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">Don't have an account yet?
            <Link to={'/register'} className="underline text-black"> Register now</Link>
          </div>
        </form>


      </div>
    </div>
  );
}

export default LoginPage;
