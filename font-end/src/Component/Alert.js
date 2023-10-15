import { useContext } from "react";
import FieldCard from "../Utility/FieldCard";
import NavigationBar from "../Utility/NavigationBar";
import { roomContext } from "../context/RoomContext";
import { authContext } from "../context/AuthContext";
import Loading from "../Utility/loading";

function Alert() {
  const { GetMatchday, matchday, alert, setAlert } = useContext(roomContext);
  const { AuthenUser } = useContext(authContext);
  AuthenUser();
  GetMatchday();
  setAlert(true);

  return (
    <div className="workspace d-flex flex-column align-items-center">
      <NavigationBar />
      <div
        className="default-margin-top"
        style={{ overflow: matchday ? "scroll" : "" }}
      >
        <p className="header-text" style={{ textAlign: "center" }}>
          Match Day
        </p>
        {matchday ? (
          matchday ? (
            matchday.map((item, index) => (
              <div>
                <FieldCard
                  field={item.Room.Field.imageField}
                  fieldname={item.Room.Field.fieldName}
                  map={item.Room.Field.map}
                  date={item.Room.Create.date}
                  starttime={item.Room.Create.time}
                  hours={item.Room.Create.hours}
                  joined={item.join_status}
                  alert={true}
                  matchInfo={item.room_id}
                />
              </div>
            ))
          ) : (
            <Loading margintop={"150px"} />
          )
        ) : (
          <p style={{ color: "red", textAlign: "center" }}>Not Found</p>
        )}
      </div>
    </div>
  );
}
export default Alert;
