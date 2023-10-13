import React from "react";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { playerContext } from "../context/PlayerContext";

function UserCard(props) {
  const {cardColor} = useContext(playerContext)
  // const {
  //   user: { name, age, position, profileImage },
  // } = useContext(authContext);

  const { name, age, position, profileImage,vote,level } = props;

  return (
    <div>
      <Card
        className="d-flex align-items-center"
        border="light"
        style={{
          width: "260px",
          height: "328px",
          backgroundColor: `${cardColor(level)}`,
          borderRadius: "20px",
        }}
      >
        <div>
          <Card.Img
            variant="top"
            src={
              profileImage
                ? profileImage
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            style={{
              width: "128px",
              height: "128px",
              marginTop: "32px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
        <Card.Body style={{ marginBottom: "32px" }}>
          <Card.Text className="body-text">
            Name : <span>{name}</span>
          </Card.Text>
          <Card.Text className="body-text">
            Age : <span>{age ? age : "-"}</span>
          </Card.Text>
          <Card.Text className="body-text">
            Position : <span>{position ? position : "-"}</span>
          </Card.Text>
          <Card.Text className="body-text">
            Get vote : <span>{vote}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserCard;
