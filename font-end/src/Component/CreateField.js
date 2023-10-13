import axios from "axios";
import Card from "react-bootstrap/Card";
import NavigationBar from "../Utility/NavigationBar";
import NormalButton from "../Utility/NormalButton";
import { useContext, useRef, useState } from "react";
import { authContext } from "../context/AuthContext";
import FormData from "form-data";
import { useNavigate } from "react-router-dom";
import { fieldContext } from "../context/FieldContext";

function CreateField() {
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({ fieldName: "", map: "" });
  const { AuthenUser } = useContext(authContext);
  const { GetfieldData, fieldDefault, deleteField } = useContext(fieldContext);
  const navigate = useNavigate();

  AuthenUser();

  const handleSave = async (e) => {
    try {
      const token = localStorage.getItem("user");
      const formData = new FormData();
      formData.append("fieldName", input.fieldName);
      formData.append("map", input.map);
      formData.append("imageField", file);
      await axios
        .post("http://localhost:3333/createfield/admin", formData, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          alert("Create Success");
          navigate("/fielddashboard");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log("Save",fieldDefault.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("user");
      const formData = new FormData();
      formData.append("fieldName", input.fieldName);
      formData.append("map", input.map);
      formData.append("imageField", file);
      formData.append("id", fieldDefault.id);
      await axios
        .patch("http://localhost:3333/field/update", formData, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          alert("Update Success");
          navigate("/fielddashboard");
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log("Update");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="workspace d-flex flex-column align-items-center">
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
          Create Field
        </p>
        <div className="d-flex flex-column align-items-center">
          <Card.Img
            variant="top"
            src={
              file
                ? URL.createObjectURL(file)
                : fieldDefault
                ? fieldDefault.imageField
                : "https://www.pngitem.com/pimgs/m/23-237300_calendar-stadium-icon-white-hd-png-download.png"
            }
            style={{
              width: "128px",
              height: "128px",
              marginTop: "32px",
              objectFit: "cover",
              borderRadius: "10px",
              backgroundColor: "gray",
              border: "1px solid rgba(227, 227, 227, 1)",
            }}
          />
          <input
            type="file"
            name="imageField"
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
            {fieldDefault ? "change picture" : "upload picture"}
          </button>
          <div className="d-flex flex-column" style={{ marginTop: "32px" }}>
            <input
              className="form"
              name="fieldName"
              type="text"
              value={input ? input.name : fieldDefault.fieldName}
              placeholder={fieldDefault ? fieldDefault.fieldName : "Field name"}
              onChange={handleChangeInput}
            />
            <input
              className="form"
              name="map"
              type="text"
              value={input ? input.name : fieldDefault.map}
              placeholder={fieldDefault ? fieldDefault.map : "Map"}
              onChange={handleChangeInput}
            />
          </div>
          <div style={{ marginTop: "40px" }}>
            <div
              onClick={() => {
                if (fieldDefault) {
                  handleUpdate();
                } else {
                  handleSave();
                }
              }}
            >
              <NormalButton>Save</NormalButton>
            </div>
            <div
              onClick={() => {
                navigate("/fielddashboard");
              }}
            >
              <NormalButton variant={"secondary"}>Back</NormalButton>
            </div>
            {fieldDefault ? (
              <div onClick={deleteField}>
                <NormalButton variant={"warning"}>Delete</NormalButton>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateField;

// -----------------------แก้ Update field----------------
