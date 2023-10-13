import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { voteContext } from "../context/VoteContext";
function VoteBtn(props) {
  const {handleVoteInput,createVote} = useContext(voteContext)
  const { title, name } = props;
  // console.log(createVote);
  return (
    <div>
      <div
        name={name}
        className="d-flex justify-content-between"
        style={{ marginTop: "8px", width: "280px" }}
       
      >
        <p
          className="body-text"
          style={{ marginRight: "8px", color: "rgba(37, 37, 37)" }}
        >
          {title} :
        </p>
        <Form>
          <Form.Check
            value={"1"}
            name ={name}
            onChange={handleVoteInput}
            className="body-text"
            style={{ color: "rgba(204, 49, 17, 1) " }}
            inline
            label="1"
            type="radio"
            id=""
          />
          <Form.Check
            value={"2"}
            name ={name}
            onChange={handleVoteInput}
            className="body-text"
            style={{ color: "rgba(204, 49, 17, 1) " }}
            inline
            label="2"
            type="radio"
            id=""
          />
          <Form.Check
            value={"3"}
            name ={name}
            onChange={handleVoteInput}
            className="body-text"
            style={{ color: "rgba(204, 49, 17, 1) " }}
            inline
            label="3"
            type="radio"
            id=""
          />
          
        </Form>
      </div>
    </div>
  );
}
export default VoteBtn;
