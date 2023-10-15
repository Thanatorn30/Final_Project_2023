import NavigationBar from "../Utility/NavigationBar";
import Post from "../Utility/PostCard";
import { useContext, createContext, useState, useEffect } from "react";
import { authContext } from "../context/AuthContext";

function MyPost() {
  const { AuthenUser, user } = useContext(authContext);
  AuthenUser();
  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar />
      <div>
        <Post name={user.name} />
      </div>
    </div>
  );
}
export default MyPost;
