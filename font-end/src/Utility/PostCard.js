import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import NormalButton from "./NormalButton";
import { useNavigate } from "react-router-dom";
import { useContext, createContext, useState, useEffect } from "react";
import { playerContext } from "../context/PlayerContext";
function Post(props) {
  const { name, date, value } = props;

  const userId = localStorage.getItem("userId");
  // const editPost = localStorage.getItem('editPost')
  const navigate = useNavigate();
  const {
    comment,
    setComment,
    setDatePost,
    datePost,
    postComment,
    playerData,
    FetchDataUser,
    updatePost,
    title,
    setTitle,
    fetchTitle,
    setEditPost,
  } = useContext(playerContext);
  const dateDay = new Date().toJSON().slice(0, 10);
  FetchDataUser(userId);
  setDatePost(dateDay);
  const titleId = localStorage.getItem("titleId");
  const userTitle = localStorage.getItem("userTitle");

  



  // ----------------------------//

  return (
    <div className="default-margin-top">
      <div style={{ textAlign: "center" }}>
        <Form>
          <p className="body-text">
            <span style={{ color: "rgba(204, 49, 17, 1)" }}>Post by : </span>
            <span>{name}</span>
          </p>
          <p className="body-text">
            <span style={{ color: "rgba(204, 49, 17, 1)" }}>Date : </span>
            <span>{dateDay}</span>
          </p>

          <FloatingLabel
            controlId="floatingTextarea2"
            label={userTitle ? userTitle : "Comment..."}
            style={{ color: "rgba(204, 49, 17, 1)" }}
          >
            <Form.Control
              name="title"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              as="textarea"
              placeholder="Leave a comment here"
              style={{
                height: "164px",
                width: "358px",
                borderRadius: "5px",
                borderColor: "rgba(204, 49, 17, 1)",
              }}
            />
          </FloatingLabel>
          <div style={{ marginTop: "16px" }}>
            {title ? (
              <div
                onClick={() => {
                  updatePost(titleId, comment, dateDay);
                  localStorage.removeItem("userTitle");
                }}
              >
                {comment ? <NormalButton>Edit</NormalButton> : ""}
              </div>
            ) : (
              <div
                onClick={() => postComment(playerData[0].id, dateDay, comment)}
              >
                {comment ? <NormalButton>Post</NormalButton> : ""}
              </div>
            )}
            <div
              onClick={() => {
                
                setComment('')
                localStorage.removeItem("userTitle");
                localStorage.removeItem("titleId");
                navigate("/post");
              }}
            >
              <NormalButton variant={"secondary"}>Back</NormalButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Post;
