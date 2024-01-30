import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import { useState } from "react";
import { EnhancedTextArea } from "../EnhancedTextArea";

export interface IShareYourStoryFormProps {}

export function ShareYourStoryForm(props: IShareYourStoryFormProps) {
  const [allowUsToFeatureYourStory, setAllowUsToFeatureYourStory] =
    useState(false);
  const [story, setStory] = useState("");
  const [storyShared, setStoryShared] = useState(false);
  const DEBUG = process.env.NODE_ENV !== "production";

  function handleChangeAllowUsToFeatureYourStory() {
    setAllowUsToFeatureYourStory(!allowUsToFeatureYourStory);
  }

  function handleShareMyStory() {
    setStoryShared(true);
  }

  function handleMessageChanged(updatedMessage: string) {
    setStory(updatedMessage);
  }
  function handleStorySubmittedToastClosed() {
    setStoryShared(false);
  }

  return (
    <>
      <Container fluid className="page-gutter pb-3">
        <h3>Tell Us Your Story</h3>
        {!storyShared && (
          <Form>
            <Row className="py-4 ">
              <Col>
                <EnhancedTextArea
                  required={true}
                  maxCount={1200}
                  controlId="messageId"
                  onMessageChanged={handleMessageChanged}
                />
              </Col>
            </Row>

            <Row>
              <Col className="text-left">
                <Form.Group controlId="allowUsToFeatureYourStory">
                  <Form.Check
                    className="facet-checkbox"
                    inline
                    name="allowUsToFeatureYourStory"
                    checked={allowUsToFeatureYourStory}
                    type="checkbox"
                    onChange={handleChangeAllowUsToFeatureYourStory}
                  />
                  <Form.Label>
                    <strong>
                      Allow us to feature your story on our website
                    </strong>
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="text-center">
                <div className="button-row  ">
                  <Button variant="primary" onClick={handleShareMyStory}>
                    Share My Story
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <Toast
                  show={storyShared}
                  onClose={handleStorySubmittedToastClosed}
                >
                  <Toast.Header className="justify-content-between">
                    Success!
                  </Toast.Header>
                  <Toast.Body>
                    <p className="text-uppercase">
                      Thank you. Your story has been received.
                    </p>
                    {DEBUG && (
                      <p>{`reply submitted for   AND MESSAGE WAS: ${story}`}</p>
                    )}
                  </Toast.Body>
                </Toast>
              </Col>
            </Row>
          </Form>
        )}
        <Row>
          <Col className="d-flex justify-content-center">
            <Toast show={storyShared} onClose={handleStorySubmittedToastClosed}>
              <Toast.Header className="justify-content-between">
                Success!
              </Toast.Header>
              <Toast.Body>
                <p className="text-uppercase">
                  Thank you. Your story has been received.
                </p>
                {DEBUG && (
                  <p>{`reply submitted for   AND MESSAGE WAS: ${story}`}</p>
                )}
              </Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>
    </>
  );
}
