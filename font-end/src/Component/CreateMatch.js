import { useContext, useState, useEffect } from "react";
import axios from "axios";
import InputText from "../Utility/InputText";
import NavigationBar from "../Utility/NavigationBar";
import NormalButton from "../Utility/NormalButton";
import { fieldContext } from "../context/FieldContext";
import { authContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { roomContext } from "../context/RoomContext";
function CreateMatch() {
  const { AuthenUser } = useContext(authContext);
  const { field, GetfieldData } = useContext(fieldContext);
  const { setMatchday } = useContext(roomContext);
  const [createroom, setcreateroom] = useState({
    fieldId: "",
    date: "",
    time: "",
    hours: "",
    maxPlayer: "",
  });
  const [input, setInput] = useState("");
  console.log(createroom);
  const navigate = useNavigate();

  const handleFieldId = (id, fieldname) => {
    setInput(fieldname);
    setcreateroom({ ...createroom, fieldId: id });
    console.log(id);
  };
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("user");

      await axios
        .post("http://localhost:3333/create/match", createroom, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          if (data.data.msg === "This account has created a room.") {
            alert("Please change date");
          } else {
            alert("Create room success");

            console.log(data.data);

            navigate("/alert");
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  AuthenUser();
  GetfieldData();

  const handleChangeInput = (e) => {
    setcreateroom({ ...createroom, [e.target.name]: e.target.value });
  };

  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar />
      <div>
        <div style={{ marginBottom: "32px" }}>
          <div
            className="header-text default-margin-top"
            style={{ textAlign: "center" }}
          >
            <p>Create your match</p>
          </div>
          <div>
            <input
              className="createForm"
              style={{
                width: "326px",
                height: "58px",
                borderRadius: "10px",
                padding: "12px",
              }}
              name="name"
              type="text"
              value={input}
              placeholder={"Search Field"}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />

            {/* -------------Search dropdown--------- */}
            <div
              className="search-result d-flex  flex-column"
              style={{ position: "absolute", zIndex: "5" }}
            >
              {field
                .filter((item) => {
                  const search = input.toLocaleLowerCase();
                  const fieldName = item.fieldName.toLocaleLowerCase();
                  const searchFind = fieldName.startsWith(search);

                  return search && searchFind && fieldName !== search;
                })

                .map((item, index) => (
                  <div
                    className="text-search-result"
                    key={index}
                    onClick={() => handleFieldId(item.id, item.fieldName)}
                  >
                    <p style={{ margin: "8px" }}>{item.fieldName}</p>
                  </div>
                ))}
            </div>
            {/* -------------Search dropdown--------- */}
          </div>
          <div className="d-flex flex-column justify-content-between ">
            <div className="d-flex mt-2">
              <input
                className="createForm"
                name="date"
                value={createroom.name}
                onChange={handleChangeInput}
                controlId={"date"}
                type={"date"}
                style={{
                  width: "155px",
                  height: "58px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              />
              <input
                name="time"
                className="createForm"
                value={createroom.name}
                onChange={handleChangeInput}
                controlId={"time"}
                type={"time"}
                style={{
                  width: "155px",
                  height: "58px",
                  borderRadius: "10px",
                  marginLeft: "16px",
                  textAlign: "center",
                }}
              />
            </div>
            <div className=" d-flex justify-content-between mt-2">
              <input
                name="hours"
                className="createForm"
                value={createroom.name}
                onChange={handleChangeInput}
                placeholder={createroom.hours ? createroom.hours : "Hours"}
                type={"number"}
                style={{
                  width: "155px",
                  height: "58px",
                  borderRadius: "10px",

                  textAlign: "center",
                }}
              />
              <input
                name="maxPlayer"
                className="createForm"
                value={createroom.name}
                onChange={handleChangeInput}
                placeholder={
                  createroom.maxPlayer ? createroom.maxPlayer : "max player"
                }
                type={"number"}
                style={{
                  width: "155px",
                  height: "58px",
                  borderRadius: "10px",

                  textAlign: "center",
                }}
              />
            </div>
          </div>
        </div>
        <div onClick={handleSave}>
          <NormalButton width={"326px"}>Create Match</NormalButton>
        </div>
      </div>
    </div>
  );
}
export default CreateMatch;
