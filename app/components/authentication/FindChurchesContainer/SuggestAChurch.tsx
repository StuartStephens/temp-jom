"use client";
import { ChangeEvent, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

export interface ISuggestAChurchProps {}

export function SuggestAChurch(props: ISuggestAChurchProps) {
  const [churchName, setChurchName] = useState("");
  const [churchWebsite, setWebsite] = useState("");
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    switch (e.currentTarget.name) {
      case "churchName":
        setChurchName(e.currentTarget.value);
        break;
      case "churchWebsite":
        setWebsite(e.currentTarget.value);
        break;
      default:
        //Do nothing
        break;
    }
  }

  function handleSubmitSuggestedChurch() {
    alert(
      "Church Suggested - NAME: " + churchName + " WEBSITE: " + churchWebsite
    );
  }

  return (
    <Container>
      <Row className="px-5 py-5">
        <Col>
          <h2>Have a church you love but don’t see it on the list?</h2>
          <p>
            Connect with other Bible-based churches by joining the Champions
            Network
          </p>
        </Col>

        <Col>
          <Form>
            <Form.Group className="pb-3">
              <FloatingLabel
                // controlId="churchName"
                label="Church Name"
              >
                <Form.Control
                  type="text"
                  placeholder="Church Name"
                  name="churchName"
                  id="churchName"
                  onChange={handleInputChange}
                  value={churchName}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="pb-3">
              <FloatingLabel
                // controlId="churchWebsite"
                label="Church Website"
              >
                <Form.Control
                  type="text"
                  placeholder="Church Website"
                  name="churchWebsite"
                  id="churchWebsite"
                  onChange={handleInputChange}
                  value={churchWebsite}
                />
              </FloatingLabel>
            </Form.Group>

            <div className="button-row pb-3 text-right">
              <Button
                variant="outline-primary"
                href="#"
                onClick={handleSubmitSuggestedChurch}
              >
                Suggest This Church
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
