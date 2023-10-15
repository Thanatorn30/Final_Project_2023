import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const voteContext = createContext();

const VoteContextProvider = ({ children }) => {
  const [createVote, setCreateVote] = useState({
    getjoin: "",
    sportmanship: "",
    moody: "",
    punctual: "",
  });
  const [voteResult, setVoteResult] = useState("");
  const [userLevel, setUserLevel] = useState(null);

  const handleVoteInput = (e) => {
    setCreateVote({ ...createVote, [e.target.name]: e.target.value });
  };

  const createUserVote = async (userGetVoteId, createVote) => {
    const token = localStorage.getItem("user");
    await axios
      .post(`http://localhost:3333/user/getvote/${userGetVoteId}`, createVote, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((data) => {
        if (data.data.msg == "Can't vote") {
          alert("Can not vote");
        } else {
          setUserLevel(data.data);
          alert("Vote success");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  const GetVoteResult = (userId) => {
    useEffect(() => {
      const token = localStorage.getItem("user");
      axios
        .get(`http://localhost:3333/user/votescore/${userId}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setVoteResult(data.data.result[0]);
        })
        .catch((err) => console.log(err));
    }, [userLevel]);
  };

  const GetVoteUserResult = () => {
    useEffect(() => {
      const token = localStorage.getItem("user");
      axios
        .get(`http://localhost:3333/user/votescore`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setVoteResult(data.data.result[0]);
          console.log("save level success");
        })
        .catch((err) => console.log(err));
    }, []);
  };

  const UpdateUserLevel = async (userId, sumVote) => {
    useEffect(() => {
      const token = localStorage.getItem("user");
      axios
        .patch(
          `http://localhost:3333/user/level`,
          { userId: userId, sumVote: sumVote },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          console.log("Sve level success");
        })
        .catch((err) => console.log(err));
    }, [voteResult]);
  };
  return (
    <voteContext.Provider
      value={{
        handleVoteInput,
        createVote,
        createUserVote,
        GetVoteResult,
        voteResult,
        GetVoteUserResult,
        UpdateUserLevel,
        userLevel,
      }}
    >
      {children}
    </voteContext.Provider>
  );
};

export default VoteContextProvider;
