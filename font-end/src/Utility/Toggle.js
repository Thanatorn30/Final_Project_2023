import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { authContext } from "../context/AuthContext";
function Toggle() {
  const {SingOut,admin} = useContext(authContext)
  const adminChek = localStorage.getItem('admin')

  return (
    <div>
      {adminChek?
     <Nav id="nav-text me-auto ">
    
     <div className="nav-toggle">
       <Nav.Link href="/createfield" className="nav-text">
         Create field
       </Nav.Link>
     </div>
     
     <div className="nav-toggle">
       <Nav.Link href="/" className="nav-text" onClick={SingOut}>
         Sign out
       </Nav.Link>
     </div>

     <Nav.Link href="#link" className="nav-text"></Nav.Link>
   </Nav>
   : <Nav id="nav-text me-auto ">
   <div className="nav-toggle">
     <Nav.Link href="/editprofile" className="nav-text ">
       Edit Profile
     </Nav.Link>
   </div>
   <div className="nav-toggle">
     <Nav.Link href="/creatematch" className="nav-text">
       Create Match
     </Nav.Link>
   </div>
   <div className="nav-toggle">
     <Nav.Link href="/search" className="nav-text">
       Search
     </Nav.Link>
   </div>
   <div className="nav-toggle">
     <Nav.Link href="/alert" className="nav-text">
       Match Day
     </Nav.Link>
   </div>
   <div className="nav-toggle">
     <Nav.Link href="/" className="nav-text" onClick={SingOut}>
       Sign out
     </Nav.Link>
   </div>

   <Nav.Link href="#link" className="nav-text"></Nav.Link>
 </Nav>  
    }
     
    </div>
  );
}

export default Toggle;
