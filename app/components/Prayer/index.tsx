import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { EnhancedTextArea } from "../EnhancedTextArea";
import { IContentListItem } from "../ContentList/ContentListItem";
import {
  CONTENT_TYPES,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../types";
import { ChangeEvent, useState } from "react";
import { ContentList } from "../ContentList";
import GrowingList from "../GrowingList";

export interface IPrayerBlockProps {
  content?: IContentListItem[];
  displayMethod?: PAST_CONTENT_DISPLAY_FORMATS;
}

export function Prayer(props: IPrayerBlockProps) {
  // console.log("PrayerBlock ------", props);
  // console.log("PrayerBlock ----COMPLARE--", !props.displayMethod);

  const [message, setMessage] = useState<string>("");
  const [postAnonymously, setPostAnonymously] = useState<boolean>(false);

  const { content, displayMethod } = props;

  function handlePostAnonymouslyChanged(e: ChangeEvent<HTMLInputElement>) {
    setPostAnonymously(!postAnonymously);
  }

  function handlePostPrayer() {
    alert(
      "Posting Prayer as : " +
      (!postAnonymously ? "ANONYMOUS" : "USER NAME") +
      " and MESSAGE is: " +
      message
    );
  }

  function handleMessageChanged(messageVal: string) {
    setMessage(messageVal);
  }

  return (
    <>
      <Container fluid className="page-gutter pb-3">
        <Form>
          <Row className="py-4 ">
            <Col>
              <h4>My Prayer</h4>
              {message}
              <EnhancedTextArea
                required={true}
                controlId="messageId"
                onMessageChanged={handleMessageChanged}
              />
            </Col>
          </Row>
          <Row>
            <Col className="text-right" xs={12} md={9}>
              <Form.Group controlId="postAnonymously">
                <Form.Check
                  className="facet-checkbox"
                  inline
                  name="postAnonymously"
                  checked={postAnonymously}
                  type="checkbox"
                  onChange={handlePostAnonymouslyChanged}
                />
                <Form.Label>Post Anonymously</Form.Label>
              </Form.Group>
            </Col>

            <Col className="text-right" xs={12} md={3}>
              <div className="button-row pb-2 d-flex flex-row gap-2 justify-content-end  ">
                <Button
                  variant="primary text-nowrap"
                  onClick={handlePostPrayer}
                >
                  Post Prayer
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>

      {(!displayMethod ||
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.SIMPLE) && (
          <ContentList
            heading="Prayers"
            contentType={CONTENT_TYPES.PRAYER}
            viewAllLinkText="View all Prayers"
            viewAllLink="#VIEWALLPRAYERS"
            content={props.content}
          />
        )}

      {displayMethod &&
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.FILTERED && (
          <>
            <GrowingList
              contentList={content || []}
              contentType={CONTENT_TYPES.PRAYER}
              itemsPerRow={1}
            />
          </>
        )}
    </>
  );
}
