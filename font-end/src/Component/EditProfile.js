import axios from "axios";
import NavigationBar from "../Utility/NavigationBar";
import NormalButton from "../Utility/NormalButton";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useContext, useRef, useState } from "react";
import { authContext } from "../context/AuthContext";
import FormData from "form-data";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const {
    user: { profileImage, name, age, position },
    AuthenUser,
    UpdateUser,
  } = useContext(authContext);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [input, setInput] = useState({ name: "", age: "", position: "" });
  const inputRef = useRef();
  const playerPosition = [
    "GK",
    "CB",
    "LCB",
    "RCB",
    "LB",
    "RB",
    "CDM",
    "LDM",
    "RDM",
    "CM",
    "LCM",
    "RCM",
    "LM",
    "RM",
    "CAM",
    "LWF",
    "RWF",
    "CF",
    "LCF",
    "RCF",
  ];

  AuthenUser();

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("user");

      const formData = new FormData();
      formData.append("profileImage", file);
      formData.append("name", input.name);
      formData.append("age", input.age);
      formData.append("position", input.position);

      await axios
        .patch("http://localhost:3333/update", formData, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          UpdateUser(data.data.user);
          navigate("/home");
          console.log(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    // console.log(input);
  };

  const handleBack = () => {
    setInput({name:'',age:'',position:''});
    navigate("/home");
    
  };
  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar />
      <div style={{ textAlign: "center" }}>
        <div className="default-margin-top">
          <p
            className="header-text"
            style={{
              fontWeight: "500",
              textAlign: "center",
              color: "rgba(204, 49, 17, 1)",
            }}
          >
            Edit Profile
          </p>
          <div className="d-flex flex-column align-items-center">
            <Card.Img
              variant="top"
              src={
                profileImage
                  ? file
                    ? URL.createObjectURL(file)
                    : profileImage
                  : file
                  ? URL.createObjectURL(file)
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              style={{
                width: "128px",
                height: "128px",
                marginTop: "32px",
                backgroundPosition: "cover",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <input
              type="file"
              name="profileImage"
              className="d-none"
              ref={inputRef}
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            <button
              className="uploadbtn"
              onClick={() => inputRef.current.click()}
            >
              {profileImage ? "change picture" : "upload picture"}
            </button>
          </div>
          <div style={{ marginTop: "32px" }}>
            <input
              className="form"
              name="name"
              type="text"
              value={input.name}
              placeholder={name ? name : "Name"}
              onChange={handleChangeInput}
            />
            <input
              className="form"
              name="age"
              type="number"
              value={input.age}
              placeholder={age ? age : "Age"}
              onChange={handleChangeInput}
            />

            <Form.Select
              name="position"
              onChange={handleChangeInput}
              aria-label="CAM"
              style={{
                color: "black",
                border: "0.5px solid rgba(204, 49, 17, 1)",
                margin: "0px 16px",
                width: "358px",
                color: "rgba(204, 49, 17, 1)",
                height: "58px",
                textAlign: "center",
                borderRadius: "10px",
              }}
            >
              <option>{position ? position : "Position"}</option>
              {playerPosition.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </Form.Select>
          </div>
          <div style={{ marginTop: "40px" }}>
            <div onClick={handleSave}>
              <NormalButton>Save</NormalButton>
            </div>
            <div onClick={handleBack}>
              <NormalButton variant={"secondary"}>Back</NormalButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------ทำ send post เพื่อบันทึกภาพลง DB-------------
export default EditProfile;
