import { useContext, useEffect, useState } from "react";
import InputText from "../Utility/InputText";
import NavigationBar from "../Utility/NavigationBar";
import NormalButton from "../Utility/NormalButton";
import { roomContext } from "../context/RoomContext";
import { authContext } from "../context/AuthContext";
import { fieldContext } from "../context/FieldContext";
import FieldCard from "../Utility/FieldCard";
import { Icon } from "@iconify/react";
import axios from "axios";
import Loading from "../Utility/loading";
function Search() {
  const { AuthenUser } = useContext(authContext);
  const {
    searchResult,
    findRoom,
    search,
    setSearch,
    GetRoom,
    openSearch,
    handleSearchOpen,
    GetSearchRoom,

    // --------------------------------
  } = useContext(roomContext);
  const { field, GetfieldData } = useContext(fieldContext);
  const [input, setInput] = useState("");

  GetfieldData();
  AuthenUser();
  GetRoom();

  console.log(findRoom);

  const handleChangeInput = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleField = (fieldname) => {
    setInput(fieldname);
    setSearch({ ...search, fieldName: fieldname });
  };

  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar />
      <div>
        <div
          className="header-text default-margin-top d-flex justify-content-center "
          style={{
            textAlign: "center",
            marginLeft: "15px",
            marginRight: "15px",
          }}
        >
          <p>Find your match</p>

          <div style={{ paddingLeft: "15px" }} onClick={handleSearchOpen}>
            <a href="#">
              <Icon
                icon="octicon:search-16"
                color="#cc3111"
                width="24"
                height="24"
              />
            </a>
          </div>
        </div>
        {/* ----------------Room Card------------------  */}
        {searchResult === "Not found" || findRoom == "" ? (
          <div style={{ textAlign: "center", fontSize: "25px", color: "red" }}>
            <p>Not Found</p>
          </div>
        ) : (
          ""
        )}
        <div
          style={{
            overflow: "auto",
            height: searchResult == "Not found" ? "600px" : "660px",
          }}
        >
          {findRoom ? (
            findRoom.map((item, index) => (
              <FieldCard
                key={index}
                field={item.Room.Field.imageField}
                map={item.Room.Field.map}
                date={item.Room.Create.date}
                starttime={item.Room.Create.time}
                fieldname={item.Room.Field.fieldName}
                hours={item.Room.Create.hours}
                maxPlayer={item.Room.maxPlayer}
                playerJoin={item.sumUser}
                roomId={item.room_id}
                value={item}
              />
            ))
          ) : (
            <Loading margintop={"150px"} />
          )}
        </div>
      </div>

      {openSearch ? (
        <div
          style={{
            zIndex: "5",
            position: "absolute",
            backgroundColor: "white",
            borderRadius: "0px 0px 10px 10px",
            marginTop: "160px",
          }}
          className="search-popup"
        >
          <div style={{ padding: "25px" }}>
            <div style={{ marginBottom: "32px" }}>
              <input
                className="search-dropdown"
                name="fieldname"
                value={input}
                style={{ width: "326px", height: "58px" }}
                label={"Find your match"}
                type={"text"}
                placeholder={"Find your match"}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <div
                className="search-result d-flex  flex-column"
                style={{ position: "absolute", zIndex: "5" }}
              >
                {field
                  .filter((item) => {
                    const search = input.toLowerCase();
                    const fieldName = item.fieldName.toLocaleLowerCase();
                    const searchFind = fieldName.startsWith(search);

                    return search && searchFind && fieldName !== search;
                  })

                  .map((item, index) => (
                    <div
                      className="text-search-result"
                      key={index}
                      onClick={() => handleField(item.fieldName)}
                    >
                      <p style={{ margin: "8px" }}>{item.fieldName}</p>
                    </div>
                  ))}
              </div>
              {/* ----------------------------------dropdown---------------------- */}
              <div className="d-flex mt-3 justify-content-between">
                <input
                  className="search-dropdown"
                  name="date"
                  value={search.name}
                  onChange={handleChangeInput}
                  style={{ width: "155px", height: "58px" }}
                  type={"date"}
                  placeholder={"date"}
                  width={"155px"}
                  height={"58px"}
                />
                <input
                  className="search-dropdown"
                  name="time"
                  value={search.name}
                  onChange={handleChangeInput}
                  style={{ width: "155px", height: "58px" }}
                  type={"time"}
                  placeholder={"Time"}
                  width={"155px"}
                  height={"58px"}
                />
              </div>
            </div>
            <div onClick={() => GetSearchRoom()}>
              <NormalButton width={"326px"}>SEARCH</NormalButton>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default Search;
