import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import { ChangeEvent, useState } from "react";
import { EnhancedTextArea } from "../EnhancedTextArea";
import { useAuth } from "../../../app/contexts/Auth/Context";

export interface IShareYourStoryFormProps {}

export function ShareYourStoryForm(props: IShareYourStoryFormProps) {
  const { checkIsLoggedIn, openLoginModal } = useAuth();
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

  function handleMessageChanged(
    e: ChangeEvent<HTMLInputElement>,
    updatedMessage: string
  ) {
    setStory(updatedMessage);
  }
  function handleStorySubmittedToastClosed() {
    setStoryShared(false);
  }

  return (
    <>
      {checkIsLoggedIn() ? (
        <Container
          fluid
          className="page-gutter py-3 border-top border-bottom border-1 bg-body-tertiary "
        >
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
        </Container>
      ) : (
        <Container
          fluid
          className="page-gutter d-flex flex-column justify-content-center text-center bg-body-tertiary py-5 gap-3 border-top border-bottom border-1"
        >
          <h3>Sign in share your story with us.</h3>
          <div className="button-row ">
            <Button
              variant="primary"
              onClick={() => {
                openLoginModal();
              }}
            >
              Sign In
            </Button>
          </div>
        </Container>
      )}
    </>
  );
}
