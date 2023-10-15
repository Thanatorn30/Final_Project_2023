import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const playerContext = createContext();

const PLayerContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [comment, setComment] = useState("");
  const [datePost, setDatePost] = useState("");
  const [fetchAllComment, setFetchAllComment] = useState("");
  const [getJoin, setGetJoin] = useState(true);
  const [title, setTitle] = useState(null);
  const [editpost, setEditPost] = useState(false);

  const saveUserId = async (data) => {
    await localStorage.setItem("userId", JSON.stringify(data));
    navigate("/vote");
  };

  const FetchDataUser = async (userId) => {
    useEffect(() => {
      const token = localStorage.getItem("user");
      axios
        .get(`http://localhost:3333/getuser/${userId}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setPlayerData(data.data.userData);
          console.log(data.data.userData);
        })
        .catch((err) => console.log(err));
    }, []);
  };

  const postComment = async (playerId, date, title) => {
    const token = localStorage.getItem("user");
    await axios
      .post(
        `http://localhost:3333/comment/user/${playerId}`,
        { date: date, title: title },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((data) => {
        if (data.data.msg == "Plese insert comment") {
          alert("Plese insert comment");
        } else {
          console.log(data);
          setComment("");
          navigate("/post");
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchTitle = (userId) => {
    const token = localStorage.getItem("user");
    axios
      .get(`http://localhost:3333/get/title/comment/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(async (data) => {
        await localStorage.setItem("userTitle", data.data.result[0].title);
        setTitle(data.data.result[0].title);
        console.log(data.data.result[0].title);
      })
      .catch((err) => console.log(err));
  };

  const updatePost = async (postId, title, date) => {
    const token = localStorage.getItem("user");
    await axios
      .patch(
        `http://localhost:3333/edit/post/${postId}`,
        { date: date, editTitle: title },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((data) => {
        console.log(data);
        setComment("");
        setTitle("");
        navigate("/post");
      })
      .catch((err) => console.log(err));
  };

  const FetchComment = (userId) => {
    useEffect(() => {
      const token = localStorage.getItem("user");
      axios
        .get(`http://localhost:3333/comments/${userId}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setFetchAllComment(data.data.result);
          console.log(data.data.result);
        })
        .catch((err) => console.log(err));
    }, []);
  };

  const deletePost = (postId) => {
    const token = localStorage.getItem("user");
    axios
      .delete(`http://localhost:3333/delete/post/${postId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((data) => {
        window.location.reload();
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  };

  const cardColor = (level) => {
    if (level >= 50) {
      return "rgba(220, 178, 253, 1)";
    } else if (level >= 40 && level < 50) {
      return "rgba(178, 240, 253, 1)";
    } else if (level >= 20 && level < 40) {
      return "rgba(253, 241, 178, 1)";
    } else if (level >= 10 && level < 20) {
      return "rgba(218, 218, 218, 1)";
    } else {
      return "rgba(253, 178, 178, 1)";
    }
  };

  return (
    <playerContext.Provider
      value={{
        playerData,
        saveUserId,
        FetchDataUser,
        setComment,
        comment,
        setDatePost,
        datePost,
        postComment,
        FetchComment,
        fetchAllComment,
        setGetJoin,
        title,
        fetchTitle,
        setTitle,
        updatePost,
        deletePost,
        setEditPost,
        cardColor,
      }}
    >
      {children}
    </playerContext.Provider>
  );
};

export default PLayerContextProvider;
