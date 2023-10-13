import Cards from "../Utility/Cards";
import { Icon } from "@iconify/react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavigationBar from "../Utility/NavigationBar";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { useContext } from "react";
import { playerContext } from "../context/PlayerContext";
import Loading from "../Utility/loading";

function MyComment() {
  const { AuthenUser, user } = useContext(authContext);
  const { FetchComment, fetchAllComment } = useContext(playerContext);
  const userId = localStorage.getItem("userId");
  AuthenUser();
  FetchComment(userId);
  console.log(fetchAllComment);

 
  const navigate = useNavigate();

  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar />
      <div style={{ overflow: "auto" }}>
        <div
          className="header-text default-margin-top d-flex justify-content-between"
          style={{ textAlign: "center" }}
        >
          <div onClick={() => navigate("/home")}>
            <Icon
              icon="ion:arrow-back-outline"
              color="#cc3111"
              width="24"
              height="24"
            />
          </div>

          <p>My comment</p>
          <Icon
            icon="ion:arrow-back-outline"
            color="white"
            width="24"
            height="24"
          />
        </div>
        <div style={{ overflow: "auto", height: "660px" }}>
          {fetchAllComment ? (
            fetchAllComment.map((item) => (
              <Cards
                comment={item.title}
                name={item.UserPost.User.name}
                date={item.UserPost.date}
              />
            ))
          ) : (
            <Loading margintop={'300px'}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyComment;
