import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Todos from "./Todos";
import { useAddNewPostMutation } from "../rtk/AddSlice";
import { decryptData, encryptData } from "../security/EncryDecrypt";

//only Adding
const Home = () => {
  const [sendData] = useAddNewPostMutation();
  const [text, setText] = useState("");
  const userId = localStorage.getItem("userId");
  const user_Id = decryptData(userId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("text", text);
    const payload = { id: user_Id, text: text };
    console.log("payload", payload);
    await sendData({ data: encryptData(payload) });
  };
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row
        className="justify-content-md-center text-center"
        style={{ marginTop: "2rem" }}
      >
        <h1>Tasks List</h1>
      </Row>
      <Row
        className="justify-content-md-center text-center"
        style={{ marginTop: "2rem" }}
      >
        <Col xs={12} md={8}>
          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add Task"
          />
        </Col>
        <Col xs={12} md={1} className="mt-1">
          <Button onClick={handleSubmit}>Add</Button>
        </Col>
      </Row>
      <hr className="my-4" />
      <Row
        className="justify-content-md-center py-3"
        // style={{ backgroundColor: "#c9c9ad" }}
      >
        <Todos />
      </Row>
    </Container>
  );
};

export default Home;
