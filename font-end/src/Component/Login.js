import { useContext, useState } from "react";
import axios from "axios";
import NormalButton from "../Utility/NormalButton";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const {getAdmin} = useContext(authContext)
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!input.email) {
      alert("Please insert email");
    }
    if (!input.password) {
      alert("Please insert password");
    }
    await axios
      .post("http://localhost:3333/login", input)
      .then((data) => {
        if(data.data.token){
          localStorage.setItem("user", data.data.token);
          if (data.data.user.email === "admin@gmail.com") {
            getAdmin(data.data.user.email)
            navigate("/fielddashboard");
          } else {
            navigate("/home");

          }

        }
        else{
          alert("email or password is invalid");
          console.log(data.data.token);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <form>
      <div style={{ marginTop: "120px" }}>
        <div style={{ textAlign: "center" }}>
          <p className="header-text">Welcome Back!</p>
          <p className="body-text">Please enter your account here</p>
        </div>
        <div className="d-flex flex-column" style={{ marginTop: "40px" }}>
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

          <div style={{ textAlign: "end" }}>
            <a href="#" className="body-text">
              Forget password ?
            </a>
          </div>
        </div>
        <div
          style={{ marginTop: "48px", textAlign: "center" }}
          onClick={handleLogin}
        >
          <NormalButton>LOGIN</NormalButton>
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p>
            Don’t have an account ?
            <span style={{ marginLeft: "8px" }}>
              <a href="/register" className="body-text">
                Register
              </a>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Login;
