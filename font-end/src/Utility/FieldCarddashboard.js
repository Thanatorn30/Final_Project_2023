import { Icon } from "@iconify/react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { fieldContext } from "../context/FieldContext";
import { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../context/AuthContext";

function FieldCardDashboard(props) {
  const { name, picture } = props;
  const navigate = useNavigate();

  const { AuthenUser } = useContext(authContext);

  AuthenUser();
  const admin = localStorage.getItem("admin");
  console.log(admin);

  return (
    <div className="">
      <div className="fieldcard d-flex justify-content-between align-items-center p-2 mt-3">
        <Card.Img
          variant="top"
          src={picture}
          style={{
            width: "75px",
            height: "75px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
        <p className="body-text">{name}</p>
        <div className="d-flex">
          <div
            onClick={() => {
              navigate("/createfield");
            }}
          >
            <button
              style={{
                border: "none",
                backgroundColor: "white",
              }}
            >
              <Icon icon="bxs:edit" color="#cc3111" width="20" height="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FieldCardDashboard;
