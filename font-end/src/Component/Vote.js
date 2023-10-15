import { useContext, createContext, useState, useEffect } from "react";
import { authContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { playerContext } from "../context/PlayerContext";

import VoteBtn from "../Utility/VoteBtn";
import UserCard from "../Utility/UserCard";
import NormalButton from "../Utility/NormalButton";
import NavigationBar from "../Utility/NavigationBar";
import Loading from "../Utility/loading";
import { Icon } from "@iconify/react";
import { roomContext } from "../context/RoomContext";
import { voteContext } from "../context/VoteContext";
import UserStatus from "../Utility/UserStatus";

function Vote() {
  const [voteOpen, setVoteOpen] = useState(false);
  const navigate = useNavigate();
  const { AuthenUser, user } = useContext(authContext);
  const {
    createUserVote,
    createVote,
    GetVoteResult,
    voteResult,
    userLevel,
    UpdateUserLevel,
  } = useContext(voteContext);

  const { playerData, FetchDataUser } = useContext(playerContext);
  const userid = localStorage.getItem("userId");

  const joinStatus = localStorage.getItem("joinStatus");

  AuthenUser();
  FetchDataUser(userid);
  console.log(userid);
  GetVoteResult(userid);
  UpdateUserLevel(userid, voteResult.sumVote);

  const handleVoteOpen = () => {
    setVoteOpen((current) => !current);
  };

  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar />
      {playerData ? (
        <div className="d-flex flex-column  align-items-center default-margin-top">
          <div
            style={{ width: "300px", marginBottom: "5px" }}
            className="d-flex justify-content-between"
          >
            <div
              className="hovertext"
              style={{ pointerEvents: "-moz-initial" }}
              onClick={() => navigate("/joinmatch")}
            >
              <Icon
                icon="ion:arrow-back-outline"
                color="#cc3111"
                width="24"
                height="24"
              />
            </div>
            {userid == user.id ? (
              ""
            ) : (
              <div
                className="hovertext"
                onClick={() => {
                  navigate("/post");
                }}
              >
                <Icon
                  icon="mdi:comment-text-outline"
                  color="#cc3111"
                  width="24"
                  height="24"
                />
              </div>
            )}
          </div>
          <div>
            {playerData ? (
              <UserCard
                name={playerData[0].name}
                age={playerData[0].age}
                position={playerData[0].position}
                profileImage={playerData[0].profileImage}
                vote={voteResult.sumVote}
              />
            ) : (
              <UserCard
                name={"null"}
                age={"null"}
                position={"null"}
                profileImage={"null"}
              />
            )}
          </div>
          {userid == user.id ? (
            <UserStatus
              joinrate={voteResult.sumJoin}
              sportmanship={voteResult.sumSportmanship}
              moody={voteResult.sumMoody}
              punctual={voteResult.sumPunctual}
              maxScore={voteResult.sumVote}
            />
          ) : joinStatus === "true" ? (
            voteOpen ? (
              <div className="d-flex flex-column align-items-center">
                <p className="header-text" style={{ marginTop: "16px" }}>
                  Vote Status
                </p>
                <div className="" style={{ margin: "8px 16px 16px" }}>
                  <VoteBtn name={"getjoin"} title={"Join rate"} />

                  <VoteBtn name={"sportmanship"} title={"Sportmanship"} />

                  <VoteBtn name={"moody"} title={"Moody"} />
                  <VoteBtn name={"punctual"} title={"Punctual"} />
                </div>
              </div>
            ) : (
              <UserStatus
                joinrate={voteResult.sumJoin}
                sportmanship={voteResult.sumSportmanship}
                moody={voteResult.sumMoody}
                punctual={voteResult.sumPunctual}
                maxScore={voteResult.sumVote}
              />
            )
          ) : (
            <UserStatus
              joinrate={voteResult.sumJoin}
              sportmanship={voteResult.sumSportmanship}
              moody={voteResult.sumMoody}
              punctual={voteResult.sumPunctual}
              maxScore={voteResult.sumVote}
            />
          )}
          {userid == user.id ? (
            ""
          ) : joinStatus === "true" ? (
            voteOpen ? (
              <div
                onClick={async () => {
                  await createUserVote(userid, createVote);

                  handleVoteOpen();
                }}
              >
                <NormalButton variant={"success"}>Done</NormalButton>
              </div>
            ) : (
              <div
                onClick={async () => {
                  handleVoteOpen();
                }}
              >
                <NormalButton>Vote Player</NormalButton>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      ) : (
        <Loading margintop={"150px"} />
      )}
    </div>
  );
}
export default Vote;
