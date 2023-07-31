import { Link } from "react-router-dom";
import { useState } from "react";

import axios from 'axios';
import { useMemo } from "react";


const Register = () => {
  const [firstname, setFirstName] = useState('');
  const [middlename, setMiddleName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [err,setErr] = useState(false)
  const [msg,setMsg] = useState('')
  const [SuccessMessage,SetSuccessMessage] = useState(false)


  const showError = (msg) => {
    setErr(true);
    setMsg(msg)
    setTimeout(() => {
     setErr(false)
    }, 3000);
  };

  const showSuccessMessage = () => {
   
    SetSuccessMessage(true)
    setTimeout(() => {
  
      SetSuccessMessage(false)
    }, 3000);
  };


  async function registerUser(e) {
    try {
      e.preventDefault();
      const res =  await axios.post('/register/check',{username,phone})
   
     if(res.data.message=='yes'){
      console.log(res.data.message);
      showError('this username already exists')
      
      return
     }else{
 
      if(!firstname || !lastname || !username || !email || !password ){
        showError("Please fill all the fields!")
         return false;
      }

 

    


      await axios.post('/register', {
        firstname,
        middlename,
        lastname,
        phone,
        email,
        username,
        password,
   
      },{timestamps: true,});

      setFirstName('')
      setMiddleName('')
      setLastName('')
      
      setEmail('')
  
      setPassword('')
      setPhone('')
      setUsername('')

      showSuccessMessage()
      setErr(false)

    } }catch (error) {
      console.log(error);
    }
   
  }

  return (
    <div className="mt-2 grow flex item-center justify-around bg-gray-200">
      <div className="mt-8">
        <h1 className="text-4xl text-center mb-2">Register</h1>
        <form className="max-w-md 2xl mx-auto border " onSubmit={registerUser}>
    
       <label className="font-bold mx-2 "> First Name</label>
          <input type="text" value={firstname} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />

          <label className="font-bold mx-2 "> Middle Name (Optional)</label>         
          <input type="text" value={middlename} placeholder="Middle Name" onChange={(e) => setMiddleName(e.target.value)} />
         <label className="font-bold mx-2"> Last Name</label>
        
          <input type="text" value={lastname} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
       <label className="font-bold mx-2 "> Phone Number (Optional) </label>
        
          <input type="text" value={phone} placeholder="Phone Number"  onChange={(e) => setPhone(e.target.value)} />
       <label className="font-bold mx-2 "> Username</label>
        
          <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
       <label className="font-bold mx-2 ">Email Address</label>
        
          <input type="text" value={email} placeholder="Email"  pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"

 title="It Should be Proper email Format" onChange={(e) => setEmail(e.target.value)} />
       <label className="font-bold mx-2 "> Password</label>
       
          <input type="password" value={password} placeholder="Password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
  title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit or special character." onChange={(e) => setPassword(e.target.value)
          } />
        
       
     
        
        
            {err &&   <span className="font-bold italic text-red-700 mx-28">{msg} </span>}
             {SuccessMessage &&( <div className=" mx-20 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Success! </span> Your Account has Been Created
          </div>)}
       
      
          <button className="primary" type="submit">Sign up</button>
          <div className="text-center py-2 text-gray-500">Already have an account?
            <Link to="/login" className="underline text-black"> Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
