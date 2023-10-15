import FieldCard from "../Utility/FieldCard";
import { Icon } from "@iconify/react";
import NavigationBar from "../Utility/NavigationBar";
function FindMatch() {
  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar />
      <div>
        <div
          className="header-text default-margin-top d-flex justify-content-between"
          style={{
            textAlign: "center",
            marginLeft: "15px",
            marginRight: "15px",
          }}
        >
          <p>Find your match</p>
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
    </div>
  );
}
export default FindMatch;
