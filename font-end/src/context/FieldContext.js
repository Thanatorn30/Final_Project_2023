import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const fieldContext = createContext();

const FieldContextProvider = ({ children }) => {
  const [field, setField] = useState([]);
  const [fieldDefault, setFieldDefault] = useState(null);
  const navigate = useNavigate();
  const GetfieldData = () => {
    useEffect(() => {
      const token = localStorage.getItem("user");
      axios
        .get("http://localhost:3333/fields", {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setField(data.data.field);
        })
        .catch((err) => console.log(err));
    }, []);
  };

  const deleteField = async (fieldid) => {
    try {
      const token = localStorage.getItem("user");

      await axios
        .delete(`http://localhost:3333/field/delete/${fieldDefault.id}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          if (data.data.msg === "Can not delete") {
            alert("can not delete")
            navigate("/fielddashboard")
          }else{
            alert("delete success")
            navigate("/fielddashboard")
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <fieldContext.Provider
      value={{
        GetfieldData,
        field,
        setFieldDefault,
        fieldDefault,
        deleteField,
      }}
    >
      {children}
    </fieldContext.Provider>
  );
};

export default FieldContextProvider;
