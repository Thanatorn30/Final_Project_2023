import { useContext, createContext, useState, useEffect } from "react";
import { playerContext } from "../context/PlayerContext";
import Cards from "../Utility/Cards";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import NavigationBar from "../Utility/NavigationBar";
import Loading from "../Utility/loading";
import { authContext } from "../context/AuthContext";

function Post() {
  const navigate = useNavigate();
  const [post, setPost] = useState(true);
  const { user, AuthenUser } = useContext(authContext);
  const {
    FetchComment,
    fetchAllComment,
    getJoin,
    setTitle,
    title,
    setComment,
  } = useContext(playerContext);
  AuthenUser();
  const userId = localStorage.getItem("userId");
  const joinStatus = localStorage.getItem("joinStatus");
  FetchComment(userId);

  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar />
      <div className="default-margin-top d-flex flex-column align-items-center">
        <div
          className="d-flex justify-content-between"
          style={{ width: "358px", padding: "8px 0px" }}
        >
          <div className="hovertext" onClick={() => navigate("/vote")}>
            <Icon
              icon="ion:arrow-back"
              color="#cc3111"
              width="24"
              height="24"
            />
          </div>
          {joinStatus === "true" ? (
            <div
              className="hovertext"
              onClick={async () => {
                navigate("/mypost");
              }}
            >
              <p style={{ color: "#cc3111" }} className="body-text">
                Create Post
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        {fetchAllComment ? (
          <div style={{ overflow: "auto", height: "660px" }}>
            {fetchAllComment.map((item) => (
              <Cards
                comment={item.title}
                name={item.UserPost.User.name}
                date={item.UserPost.date}
                post={item.UserPost.user_id === user.id ? true : ""}
                value={item.id}
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
export default Post;
