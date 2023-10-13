import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState('');


  const navigate = useNavigate();

  const AuthenUser = () => {
    useEffect(() => {
      const token = localStorage.getItem("user");

      axios
        .get("http://localhost:3333/me", {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          if (data.data.user) {
             setUser(data.data.user);
             if(data.data.user.name == 'Admin'){
              localStorage.setItem("admin", data.data.user.name)
              
             }else{
               console.log(data.data.user);
             }
          } else {
            navigate("/");
            alert("Please Login");
          }
        })
        .catch(() => {
          alert("Please Login");
          navigate("/");
        });
    }, []);
  };

  const UpdateUser = (input)=>{
    setUser(input)
  }

  const SingOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
  };

  const getAdmin = (input) =>{
    setAdmin(input)
  }

  

  return (
    <authContext.Provider value={{ user, AuthenUser, SingOut,UpdateUser,getAdmin,admin }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
