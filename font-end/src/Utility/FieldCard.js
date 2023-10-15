import Card from "react-bootstrap/Card";
import { Icon } from "@iconify/react";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { roomContext } from "../context/RoomContext";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

function FieldCard(props) {
  const { user } = useContext(authContext);
  const { SaveRoomId } = useContext(roomContext);

  const navigate = useNavigate();

  const { alert, setBack } = useContext(roomContext);
  const {
    field,
    active,
    map,
    joined,
    date,
    starttime,
    fieldname,
    playerJoin,
    maxPlayer,
    hours,
    value,
    checkUser,

    matchInfo,
  } = props;

  return (
    <div
      className="hovertext"
      onClick={async () =>
        matchInfo
          ? (await SaveRoomId(matchInfo),
            await localStorage.setItem("joinStatus", JSON.stringify(true)),
            navigate("/joinmatch"),
            setBack(false))
          : console.log("NO")
      }
    >
      {checkUser === user.id ? null : (
        <Card
          className={`${
            joined
              ? joined === "host"
                ? "background-host"
                : "background-joined"
              : ""
          }`}
          style={{ width: "350px", marginBottom: "8px" }}
          value={value}
        >
          <Card.Body className={`d-flex align-items-center `}>
            <Card.Img
              variant="top"
              src={field}
              style={{
                width: "154px",
                height: "148px",
                backgroundPosition: "cover",
                marginRight: "8px",
                borderRadius: "5px",
              }}
            />

            <div>
              <div className="d-flex ">
                <Card.Title
                  className={`${joined ? "color-white" : "color-red"}`}
                >
                  {fieldname}
                </Card.Title>
                <a href={map} target="_blank" style={{ marginLeft: "10px" }}>
                  <Icon
                    icon="tabler:map-pin-filled"
                    color="#cc3111"
                    width="22"
                    height="22"
                    className={`${joined ? "color-white" : "color-red"}`}
                  />
                </a>
              </div>

              <Card.Text>
                <Icon
                  icon="subway:time-2"
                  color="#cc3111"
                  width="22"
                  height="22"
                  className={`${joined ? "color-white" : "color-red"}`}
                />
                <span
                  className={`${joined ? "color-white" : "color-red"}`}
                  style={{ marginLeft: "4px" }}
                >
                  {" "}
                  {starttime}
                </span>
              </Card.Text>
              <Card.Text>
                <Icon
                  icon="bi:calendar-date"
                  color="#cc3111"
                  width="22"
                  height="22"
                  className={`${joined ? "color-white" : "color-red"}`}
                />
                <span
                  className={`${joined ? "color-white" : "color-red"}`}
                  style={{ marginLeft: "4px" }}
                >
                  {" "}
                  {date}
                </span>
              </Card.Text>
              {/* ------------------------Max Player and Hours-------------- */}
              <div className="d-flex">
                <div>
                  <Card.Text>
                    <Icon
                      icon="solar:hourglass-bold"
                      color="#cc3111"
                      width="22"
                      height="22"
                      className={`${joined ? "color-white" : "color-red"}`}
                    />
                    <span
                      className={`${joined ? "color-white" : "color-red"}`}
                      style={{ marginLeft: "4px" }}
                    >
                      {hours} hrs
                    </span>
                  </Card.Text>
                </div>
                {playerJoin ? (
                  <div style={{ paddingLeft: "15px" }}>
                    <Card.Text>
                      <Icon
                        icon="fa-solid:users"
                        color="#cc3111"
                        width="22"
                        height="22"
                        className={`${joined ? "color-white" : "color-red"}`}
                      />
                      <span
                        className={`${joined ? "color-white" : "color-red"}`}
                        style={{ marginLeft: "5px" }}
                      >
                        {playerJoin} / {maxPlayer}
                      </span>
                    </Card.Text>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {alert ? (
                <div className="d-flex mt-3 align-items-center">
                  <Icon
                    icon="pajamas:status-closed"
                    color="white"
                    width="22"
                    height="22"
                    className={`${joined ? "color-white" : "color-red"}`}
                  />

                  <p
                    style={{
                      fontWeight: "500",
                      width: "150px",
                      color: "white",
                      margin: "0 ",
                      paddingLeft: "5px",
                    }}
                  >
                    {joined}
                  </p>
                </div>
              ) : (
                <div
                  onClick={async () => {
                    await SaveRoomId(value.room_id);
                    await localStorage.setItem(
                      "joinStatus",
                      JSON.stringify(false)
                    );
                    navigate("/joinmatch");
                    setBack(true);
                  }}
                >
                  <div>
                    <Button
                      className={`${active}`}
                      variant="outline-danger"
                      style={{
                        marginTop: "10px",
                        height: "40px",
                        width: "150px",
                      }}
                    >
                      Join
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
export default FieldCard;
