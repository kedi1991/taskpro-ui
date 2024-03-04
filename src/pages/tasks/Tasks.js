import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Tasks() {
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Tasks fpr mobile here</p>
      
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Tasks for desktop</p>
      </Col>
    </Row>
  );
}

export default Tasks;