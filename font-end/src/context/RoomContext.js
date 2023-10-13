import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const roomContext = createContext();

const RoomContextProvider = ({ children }) => {
  const [matchday, setMatchday] = useState([]);
  const [roomData, setRoomData] = useState(null);
  const [allRooms, setAllRooms] = useState(null);
  const [alert, setAlert] = useState(false);
  const [userInroom, setUserInroom] = useState(null);
  // --------------------------------------------
  const [searchResult, setSearchResult] = useState(null);
  const [findRoom, setFindRoom] = useState(null);
  const [search, setSearch] = useState({
    fieldName: "",
    date: "",
    time: "",
  });
  const [openSearch, setOpenSearch] = useState(false);
  const [back, setBack] = useState(false);
  const [checkUser, setCheckUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState({ roomId: "", userId: "" });
  const [joinRoomData, setJoinRoomData] = useState(null);
  // const [findRoomToJoin, setFindRoomToJoin] = useState(null);

  // -------------------------------------

  const navigate = useNavigate();
  const GetMatchday = () => {
    useEffect(() => {
      const token = localStorage.getItem("user");
      axios
        .get("http://localhost:3333/user/matchday", {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setMatchday(data.data.matchDay);
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  };

  const GetallRoom = () => {
    useEffect(() => {
      const token = localStorage.getItem("user");
      axios
        .get("http://localhost:3333/room", {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(async (data) => {
          setAllRooms(data.data.room);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  };
  const GetJoinRoom = (roomId) => {
    useEffect(() => {
      const token = localStorage.getItem("user");
      axios
        .post(
          "http://localhost:3333/user/joinroom",
          { roomId: roomId },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setUserInroom(data.data);
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [joinRoomData]);
  };

  // ----------------------------------------------
  const handleSearchOpen = () => {
    setOpenSearch((current) => !current);
  };
  // -------fetch room in 1st reload page -----------
  const GetRoom = () => {
    useEffect(() => {
      const token = localStorage.getItem("user");
      axios
        .post("http://localhost:3333/search/room", search, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setFindRoom(data.data.room);
        })
        .catch((err) => console.log(err));
    }, []);
  };

  const GetSearchRoom = async () => {
    // useState(()=>{
    console.log(search);
    const token = localStorage.getItem("user");
    await axios
      .post("http://localhost:3333/search/room", search, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((data) => {
        setSearchResult(data.data.msg);
        setFindRoom(data.data.room);
        setAlert(false);
        setSearch({ fieldName: "", date: "", time: "" });
        handleSearchOpen();
      })
      .catch((err) => console.log(err));

    // },[])
  };

  const joinRoom = async (data) => {
    const token = localStorage.getItem("user");
    await axios
      .post(
        "http://localhost:3333/join",
        { roomId: data },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((data) => {
        console.log(data);
        navigate("/alert");
      })
      .catch((err) => console.log(err));
  };
  // ---------------------------------------------

  const CheckUserJoin = () => {
    useEffect(() => {
      const token = localStorage.getItem("user");

      axios
        .get(`http://localhost:3333/checkuser/join`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((data) => {
          const userJoinRoom = data.data.result.map((item) => item.id);
          setCheckUser(userJoinRoom);
        })
        .catch((err) => console.log(err));
    }, []);
  };

  const DeleteUserJoin = async (value, roomid) => {
    const token = localStorage.getItem("user");

    await axios
      .delete(
        `http://localhost:3333/delete/join/${value}/roomId/${roomid}`,

        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };


  const DeleteRoom = async (roomid) => {
    const token = localStorage.getItem("user");
    await axios
      .delete(
        `http://localhost:3333/delete/roomId/${roomid}`,

        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((data) => {
        navigate('/alert')
      })
      .catch((err) => console.log(err));
  };

  const SaveRoomId = (data) => {
    localStorage.setItem("roomId", JSON.stringify(data));
  };

  return (
    <roomContext.Provider
      value={{
        GetMatchday,
        matchday,
        roomData,
        GetallRoom,
        allRooms,
        alert,
        setAlert,
        GetJoinRoom,
        userInroom,
        // ----------------
        searchResult,
        setSearchResult,
        findRoom,
        setFindRoom,
        search,
        setSearch,
        GetRoom,
        openSearch,
        handleSearchOpen,
        GetSearchRoom,
        joinRoom,
        CheckUserJoin,
        checkUser,
        back,
        setBack,
        DeleteUserJoin,
        deleteUser,
        SaveRoomId,
        setJoinRoomData,
        joinRoomData,
        DeleteRoom

        // ------------
      }}
    >
      {children}
    </roomContext.Provider>
  );
};

export default RoomContextProvider;
