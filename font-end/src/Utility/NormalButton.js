import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function NormalButton(props) {
  const { children, variant, width } = props;
  return (
    <div className="">
      <Button
        style={{ width: width }}
        className="submit-btn "
        type="button"
        variant={variant ? variant : "danger"}
      >
        {children}
      </Button>
    </div>
  );
}

export default NormalButton;
