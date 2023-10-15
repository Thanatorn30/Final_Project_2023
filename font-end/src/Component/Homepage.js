import UserCard from "../Utility/UserCard";
import NormalButton from "../Utility/NormalButton";
import UserStatus from "../Utility/UserStatus";
import NavigationBar from "../Utility/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import Notification from "../Utility/notification";
import { voteContext } from "../context/VoteContext";
import Loading from "../Utility/loading";

function Homepage() {
  const { AuthenUser, user } = useContext(authContext);
  const { GetVoteUserResult, voteResult } = useContext(voteContext);
  const navigate = useNavigate();

  AuthenUser();
  GetVoteUserResult();

  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar />
      {voteResult ? (
        <div>
          <div className="default-margin-top">
            <p
              className="header-text"
              style={{
                fontWeight: "500",
                textAlign: "center",
                color: "rgba(204, 49, 17, 1)",
              }}
            >
              PLAYER CARD
            </p>
            <UserCard
              name={user.name}
              age={user.age}
              position={user.position}
              profileImage={user.profileImage}
              vote={voteResult ? voteResult.sumVote : null}
              level={user.level ? user.level : 0}
            />
            <UserStatus
              joinrate={voteResult ? voteResult.sumJoin : null}
              sportmanship={voteResult ? voteResult.sumSportmanship : null}
              moody={voteResult ? voteResult.sumMoody : null}
              punctual={voteResult ? voteResult.sumPunctual : null}
              maxScore={voteResult ? voteResult.sumVote : null}
            />
            <div
              onClick={() => {
                localStorage.setItem("userId", JSON.stringify(user.id));
                navigate("/comment");
              }}
              style={{ marginTop: "40px" }}
            >
              <NormalButton>See all comment</NormalButton>
            </div>
          </div>
        </div>
      ) : (
        <Loading margintop={"300px"} />
      )}
    </div>
  );
}
export default Homepage;
