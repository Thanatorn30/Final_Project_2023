import JoinCard from "../Utility/JoinCard";
import Loading from "../Utility/loading";
import { Icon } from "@iconify/react";
import NormalButton from "../Utility/NormalButton";
import NavigationBar from "../Utility/NavigationBar";
import { useContext } from "react";
import { roomContext } from "../context/RoomContext";
import { authContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Join() {
  const { AuthenUser, user } = useContext(authContext);
  const { userInroom, joinRoom, back, GetJoinRoom, DeleteRoom } =
    useContext(roomContext);
  const navigate = useNavigate();
  AuthenUser();
  const roomId = localStorage.getItem("roomId");
  GetJoinRoom(roomId);
  console.log(userInroom);

  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar />
      {userInroom ? (
        <div className="default-margin-top">
          <div style={{ textAlign: "center" }}>
            <p className="header-text">
              {userInroom.userInRoom[0].Room.Field.fieldName}
            </p>
            <p>
              Match day :{" "}
              <span>{userInroom.userInRoom[0].Room.Create.date}</span>
            </p>
            <p className="body-text" style={{ color: "#cc3111" }}>
              <Icon icon="lucide:user" color="#cc3111" width="24" height="24" />
              <span
                className="body-text"
                style={{ marginLeft: "8px", color: "#cc3111" }}
              >
                {userInroom.userInRoom.length}
              </span>{" "}
              / {userInroom.userInRoom[0].Room.maxPlayer}
            </p>
          </div>
          <div
            className="d-flex flex-column"
            style={{ overflow: "auto", height: "410px" }}
          >
            {userInroom.userInRoom.map((item) => (
              <JoinCard
                userImage={item.User.profileImage}
                name={item.User.name}
                position={item.User.position}
                icon={item.join_status}
                userCreate={item.user_id}
                value={item.user_id}
                roomId={item.Room.id}
                playerInfomaton={item.User}
                level={item.User.level}
              />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            {back == true &&
            userInroom.userInRoom.length <
              userInroom.userInRoom[0].Room.maxPlayer ? (
              <div
                onClick={() => {
                  joinRoom(userInroom.userInRoom[0].Room.id);
                }}
              >
                <NormalButton>Join</NormalButton>
              </div>
            ) : userInroom.userInRoom[0].user_id === user.id ? (
              <div
                onClick={() => {
                  DeleteRoom(roomId);
                }}
              >
                <NormalButton variant={"warning"}>Delete room</NormalButton>
              </div>
            ) : (
              ""
            )}
            <div
              onClick={() => (back ? navigate("/search") : navigate("/alert"))}
            >
              <NormalButton variant={"secondary"}>Back</NormalButton>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "320px" }}>
          <Loading />
        </div>
      )}
    </div>
  );
}
export default Join;
