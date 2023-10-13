import "./App.css";
import { Route, Routes, Router } from "react-router-dom";
import { createContext, useState } from "react";
import MyComment from "./Component/MyComment";
import Register from "./Component/Register";
import EditProfile from "./Component/EditProfile";
import CreateMatch from "./Component/CreateMatch";
import Login from "./Component/Login";
import Search from "./Component/Search";
import FindMatch from "./Component/FindMatch";
import Join from "./Component/Join";
import MyPost from "./Component/MyPost";
import Post from "./Component/Post";
import Alert from "./Component/Alert";
import Homepage from "./Component/Homepage";
import Vote from "./Component/Vote";

import { ToastContainer, toast } from "react-toastify";
import AuthContextProvider from "./context/AuthContext";
import CreateField from "./Component/CreateField";
import FieldDashBoard from "./Component/FieldDashboard";
import NavigationBar from "./Utility/NavigationBar";
import FieldContextProvider from "./context/FieldContext";
import RoomContextProvider from "./context/RoomContext";
import PLayerContextProvider from "./context/PlayerContext";
import VoteContextProvider from "./context/VoteContext";

function App() {
  return (
    <AuthContextProvider>
      <FieldContextProvider>
        <RoomContextProvider>
          <PLayerContextProvider>
            <VoteContextProvider>

           

          <div className="app-bg d-flex align-items-center justify-content-center">
            <div className="workspace d-flex flex-column align-items-center">
              <div>
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Login />} />
                </Routes>
              </div>

              <div className="position-absolute z-0">
                <Routes>
                  <Route path="/fielddashboard" element={<FieldDashBoard />} />
                  <Route path="/createfield" element={<CreateField />} />
                  <Route path="/alert" element={<Alert />} />
                  <Route path="/creatematch" element={<CreateMatch />} />
                  <Route path="/editprofile" element={<EditProfile />} />
                  <Route path="/findmatch" element={<FindMatch />} />
                  <Route path="/home" element={<Homepage />} />
                  <Route path="/joinmatch" element={<Join />} />
                  <Route path="/search" element={<Search />} />

                  <Route path="/comment" element={<MyComment />} />
                  <Route path="/mypost" element={<MyPost />} />
                  <Route path="/post" element={<Post />} />
                  <Route path="/vote" element={<Vote />} />
                </Routes>
              </div>
            </div>
          </div>
          </VoteContextProvider>
          </PLayerContextProvider>
        </RoomContextProvider>
      </FieldContextProvider>
    </AuthContextProvider>
  );
}

export default App;

// ---------แก้ Route Navbar---------
