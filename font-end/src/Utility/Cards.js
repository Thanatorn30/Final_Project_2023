import { useContext, createContext, useState, useEffect } from "react";
import { playerContext } from "../context/PlayerContext";
import Card from "react-bootstrap/Card";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function Cards(props) {
  const { deletePost, fetchTitle } = useContext(playerContext);
  const { comment, name, date, post, value } = props;
  const navigate = useNavigate();

  return (
    <Card
      style={{
        width: "358px",
        height: "164px",
        padding: "8px",
        marginBottom: "16px",
      }}
    >
      {post ? (
        <Card.Body>
          <div className="d-flex justify-content-between">
            <p className="body-text">
              @ {name} : <span style={{ marginLeft: "8px" }}>{date}</span>
            </p>
            <div>
              <Icon
                onClick={() => {
                  deletePost(value);
                  console.log("delete");
                }}
                icon="solar:trash-bin-2-bold"
                color="#cc3111"
                width="24"
                height="24"
              />

              <Icon
                onClick={async () => {
                  await fetchTitle(value);
                  localStorage.setItem("titleId", JSON.stringify(value));
                  navigate("/mypost");
                }}
                style={{ marginLeft: "16px" }}
                icon="ep:edit"
                color="rgba(241, 181, 24, 1)"
                width="24"
                height="24"
              />
            </div>
          </div>
          <Card.Text>{comment}</Card.Text>
        </Card.Body>
      ) : (
        <Card.Body>
          <div className="d-flex justify-content-between">
            <p className="body-text">
              @ {name} : <span style={{ marginLeft: "8px" }}>{date}</span>
            </p>
          </div>
          <Card.Text>{comment}</Card.Text>
        </Card.Body>
      )}
    </Card>
  );
}

export default Cards;
