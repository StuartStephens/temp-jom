"use client";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Toast,
} from "react-bootstrap";
import { ActionListAction, ActionListButton } from "./ActionList.Button";
import { IContentListItem } from "./ContentListItem";
import { useState } from "react";
import { EnhancedTextArea } from "../EnhancedTextArea";

export interface IPrayerContentListItemItemProps {
  contentListItem: IContentListItem;
}

export function PrayerContentListItemItem(
  props: IPrayerContentListItemItemProps
) {
  const { title, speaker, messageID, date } = props.contentListItem;
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [prayingForPerson, setPrayingForPerson] = useState(false);
  const [replySubmitted, setReplySubmitted] = useState(false);
  const DEBUG = process.env.NODE_ENV !== "production";

  function handleAction(action: ActionListAction, messageID: string) {
    alert(
      "action " +
        action.name +
        " was called against the messageID: " +
        messageID
    );
  }

  function handleReplyChanged(message: string) {
    setReplyMessage(message);
  }

  function handlePrayForPerson() {
    setPrayingForPerson(true);
  }

  function toggleReplyRow() {
    setShowReplyBox(!showReplyBox);
  }

  function handleReplyToastClosed() {
    setShowReplyBox(false);
    setReplySubmitted(false);
  }

  function handleSubmitReply() {
    setReplySubmitted(true);
  }

  return (
    <Container
      fluid
      className="full-width d-flex flex-column praise-content-list-item border-top py-2"
    >
      <Container fluid className="full-width d-flex flex-column flex-md-row   ">
        <Container
          fluid
          className="avatar d-flex flex-row align-items-center justify-content-center justify-content-md-fit "
        >
          <Image
            src="https://www.gravatar.com/avatar/a48b14c0566b0c9a46cd0e50d19ee939?s=128&r=pg&d=retro"
            roundedCircle
            height={100}
            width={100}
            alt={`avatar for ${speaker}`}
          />
        </Container>
        <Container
          fluid
          className="d-flex flex-column full-width align-items-start justify-content-center justify-content-md-start ps-0 ps-md-3 "
        >
          <h3 className=" mt-2 text-center text-md-start w-100">{speaker}</h3>
          <div className="mb-1 text-center text-md-start w-100">{date}</div>
          <p className=" text-center text-md-start w-100">{title}</p>
          <div className="button-row  text-center text-md-start w-100">
            {!prayingForPerson ? (
              <Button variant="outline-primary" onClick={handlePrayForPerson}>
                Pray For This Person
              </Button>
            ) : (
              <p className="text-uppercase">You are Praying</p>
            )}
          </div>
        </Container>
        <Container
          fluid
          className="d-flex flex-column full-width align-items-center align-items-md-end justify-content-between "
        >
          <ActionListButton
            variant="link"
            buttonText="Flag"
            leftButtonIconClass="bi-flag-fill"
            actions={[
              {
                name: "reportUser",
                text: "Report User",
                cargo: messageID,
                onAction: handleAction,
              } as ActionListAction,
              {
                name: "markInappropriate",
                text: "Mark as Inappropriate",
                cargo: messageID,
                onAction: handleAction,
              } as ActionListAction,
            ]}
          />
          <div className="button-row text-center text-md-right">
            {!replySubmitted ? (
              <Button
                variant="jombutton"
                className="text-primary "
                onClick={toggleReplyRow}
              >
                Reply to {speaker}
              </Button>
            ) : (
              // <p className="text-uppercase">Your reply is being submitted</p>
              <Toast show={replySubmitted} onClose={handleReplyToastClosed}>
                <Toast.Header className="justify-content-between">
                  Thank you for your prayers!
                </Toast.Header>
                <Toast.Body>
                  <p className="text-uppercase">
                    Your reply is being submitted
                  </p>
                  {DEBUG && (
                    <p>
                      {`reply submitted for messageid: ${props?.contentListItem?.messageID} to : ${props.contentListItem.speaker}  AND MESSAGE WAS: ${replyMessage}`}
                    </p>
                  )}
                </Toast.Body>
              </Toast>
            )}
          </div>
        </Container>
      </Container>
      <Container fluid className="full-width">
        {showReplyBox && !replySubmitted && (
          <Row className="pt-3">
            <Col>
              <Form>
                <EnhancedTextArea
                  controlId={messageID}
                  maxCount={200}
                  required={true}
                  onMessageChanged={handleReplyChanged}
                  fieldLabel={`Replying to ${speaker}`}
                />
              </Form>
              <div className="button-row text-right">
                <Button variant="primary" onClick={handleSubmitReply}>
                  Post Reply
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
}
