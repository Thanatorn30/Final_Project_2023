import { fieldContext } from "../context/FieldContext";
import { authContext } from "../context/AuthContext";
import NavigationBar from "../Utility/NavigationBar";
import NormalButton from "../Utility/NormalButton";
import { useContext, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import FieldCardDashboard from "../Utility/FieldCarddashboard";
function FieldDashBoard() {
  const { AuthenUser } = useContext(authContext);
  const { field, GetfieldData,setFieldDefault } = useContext(fieldContext);
  const [input, setInput] = useState(null);
  const [fieldSearch,setFieldSearch] = useState(null)
  AuthenUser();
  GetfieldData();
  const fields = field;
 
  const handleSearch = (input) =>{
   setFieldSearch(fields.filter((item)=>item.fieldName.toLowerCase().includes(input)))
  }
  
  return (
    <div className="workspace d-flex flex-column align-items-center ">
      <NavigationBar />
      <div className=" default-margin-top">
        <p
          className="header-text"
          style={{
            fontWeight: "500",
            textAlign: "center",
            color: "rgba(204, 49, 17, 1)",
          }}
        >
          Field Dashboard
        </p>

        <div
          className="d-flex align-items-center m-3"
          style={{ width: "auto", height: "auto" }}
        >
          <input
            className="formsearch"
            name="name"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder={"Field name"}
            style={{ margin: "0px", width: "300px" }}
          />
          <button
            style={{
              marginLeft: "10px",
              border: "none",
              backgroundColor: "white",
            }}
            onClick={()=>handleSearch(input)}
          >
            <Icon icon="bi:search" color="#cc3111" width="30" height="30" />
          </button>
        </div>
        <div style={{ height: "600px", marginTop: "8px", overflow: "scroll" }}>
          {fieldSearch?
          fieldSearch.map((item) => (
            <div onClick={()=> setFieldDefault(item)}>
              <FieldCardDashboard
                key={item.id}
                name={item.fieldName}
                picture={item.imageField}
                
              />
            </div>
          ))
          
          : fields.map((item) => (
            <div onClick={()=>setFieldDefault(item) }>
              <FieldCardDashboard
                key={item.id}
                name={item.fieldName}
                picture={item.imageField}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FieldDashBoard;
