import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready,setReady] = useState(false)
  const [loaading,setLoading ] = useState(true)

  useEffect(()=>{
    if(!user){
     const {data}= axios.get('/profile').then(({data})=>{

       setUser(data)
       setReady(true)
    
     })
   
    }
  },[])


  return (
   
   (<UserContext.Provider value={{ user, setUser,ready }}>
      {children}
    </UserContext.Provider>)
  );
}
