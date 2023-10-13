import FieldCard from "../Utility/FieldCard";
import { Icon } from "@iconify/react";
import NavigationBar from "../Utility/NavigationBar";
function FindMatch() {
  // const field = [
  //   "https://lfccityexplorer.co.uk/wp-content/uploads/2018/09/how-to-get-to-anfield-liverpool-fc-stadium02.jpg",
  //   "https://footballarroyo.co.uk/wp-content/uploads/2022/11/Stamford-Bridge-Stadium-Capacity-Tickets-Seating-Plan-Records-Location-Parking-scaled.jpg",
  //   "https://footballarroyo.co.uk/wp-content/uploads/2022/03/Old-Trafford-Stadium-Home-of-Manchester-United.jpg",
  //   "https://i2-prod.leicestermercury.co.uk/sport/football/football-news/article5466288.ece/ALTERNATES/s1200/0_King-Power-Stadium.jpg",
  // ];
  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar/>
    <div>
      <div
        className="header-text default-margin-top d-flex justify-content-between"
        style={{ textAlign: "center", marginLeft:"15px", marginRight:'15px'}}
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
      {/* <div style={{ overflow: "auto", height: "660px" }}>
        {field.map((item) => (
          <FieldCard field={item} />
        ))}
      </div> */}
      {/* ---------ใส่ search default--------- */}
    </div>
    </div>
  );
}
export default FindMatch;
