import { useContext, useState } from "react";
import NormalButton from "../Utility/NormalButton";
import { authContext } from "../App";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      if (!input.name && !input.email && !input.password) {
        return alert("Please insert data");
      }
      if (!input.name) {
        return alert("Please insert name");
      }
      if (!input.email) {
        return alert("Please insert email");
      }
      if (!input.password) {
        return alert("Please insert password");
      }
      if (input.ConfirmPassword !== input.password) {
        return alert("Worng Password");
      }
      await axios
        .post("http://localhost:3333/register", input)
        .then(() => {
          alert("Register Success");
        })
        .catch((err) => {
          alert(err);
        });
      setInput({ name: "", email: "", password: "" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form>
      <div style={{ marginTop: "120px" }}>
        <div style={{ textAlign: "center" }}>
          <p className="header-text">Registration</p>
          <p className="body-text">Please registration down below</p>
        </div>
        <div className="d-flex flex-column" style={{ marginTop: "40px" }}>
          <input
            className="form"
            name="name"
            type="text"
            value={input.name}
            placeholder="Name"
            onChange={handleChangeInput}
          />
          <input
            className="form"
            name="email"
            type="text"
            value={input.email}
            placeholder="Email"
            onChange={handleChangeInput}
          />
          <input
            className="form"
            name="password"
            type="password"
            value={input.password}
            placeholder="Password"
            onChange={handleChangeInput}
          />
          <input
            className="form"
            name="ConfirmPassword"
            type="password"
            value={input.ConfirmPassword}
            placeholder="Confirm password"
            onChange={handleChangeInput}
          />
        </div>

        <div
          style={{ marginTop: "48px", textAlign: "center" }}
          onClick={handleRegister}
        >
          <NormalButton>REGISTER</NormalButton>
        
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p>
            Already have an account ?
            <span style={{ marginLeft: "8px" }}>
              <a href="/" className="body-text">
                Log in
              </a>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Register;
