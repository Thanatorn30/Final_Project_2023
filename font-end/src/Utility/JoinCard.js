import { useContext } from "react";
import Card from "react-bootstrap/Card";
import { Icon } from "@iconify/react";
import Button from "react-bootstrap/Button";
import { authContext } from "../context/AuthContext";
import { roomContext } from "../context/RoomContext";
import { playerContext } from "../context/PlayerContext";
function JoinCard(props) {
  const {
    userImage,
    level,
    name,
    position,
    icon,
    color,
    value,
    roomId,
    playerInfomaton,
  } = props;
  const { AuthenUser, user } = useContext(authContext);
  const { userInroom, DeleteUserJoin, deleteUser } = useContext(roomContext);
  const { saveUserId, cardColor } = useContext(playerContext);
  AuthenUser();
  const roomid = localStorage.getItem("roomId");

  return (
    <div style={{ marginTop: "8px" }}>
      <Card
        style={{ cursor: "pointer" }}
        onClick={() => {
          saveUserId(playerInfomaton.id);
        }}
      >
        <Card.Body
          className=" d-flex align-items-center "
          style={{
            width: "358px",
            height: "67px",
            padding: "8px 16px",
            backgroundColor: `${cardColor(level)}`,
          }}
        >
          <Card.Img
            variant="top"
            src={userImage}
            style={{
              width: "50px",
              height: "50px",
              backgroundPosition: "cover",
              objectFit: "cover",
              marginRight: "8px",
              borderRadius: "5px",
            }}
          />

          <div
            className="d-flex justify-content-between align-items-center
          "
            style={{ width: "100%", height: "50px" }}
          >
            <p
              className="body-text overflow-hidden m-0"
              style={{ paddingLeft: "24px" }}
            >
              {name}
            </p>
            <p
              className="body-text overflow-hidden m-0"
              style={{ paddingLeft: "16px" }}
            >
              ({position})
            </p>
            <p style={{ marginBottom: "0px", textAlign: "end" }}>
              {icon === "host" ? (
                <Icon
                  onClick={() => console.log("test king mark")}
                  icon={"fa-solid:chess-king"}
                  color={color ? "#cc3111" : "rgb(40, 38, 38)"}
                  width="24px"
                  height="24px"
                />
              ) : userInroom.userInRoom[0].user_id === user.id ? (
                <Icon
                  onClick={() => DeleteUserJoin(value, roomid)}
                  icon={"fa6-solid:xmark"}
                  color={color ? "#cc3111" : "rgb(40, 38, 38)"}
                  width="24px"
                  height="24px"
                />
              ) : (
                ""
              )}
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
export default JoinCard;
