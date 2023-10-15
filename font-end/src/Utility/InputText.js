import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function InputText(props) {
  const {
    controlId,
    label,
    type,
    placeholder,
    width,
    height,
    onchange,
    value,
    name,
  } = props;
  return (
    <div
      className=""
      style={{ color: "rgba(204, 49, 17, 1)", marginBottom: "16px" }}
    >
      <FloatingLabel
        onChange={onchange}
        controlId={controlId}
        label={label}
        style={{ width: width, height: height }}
      >
        <Form.Control
          value={value}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </FloatingLabel>
    </div>
  );
}

export default InputText;
