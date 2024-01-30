import { ChangeEvent, useState } from "react";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { EnhancedTextArea } from "../EnhancedTextArea";
import { IContentListItem } from "../ContentList/ContentListItem";
import {
  CONTENT_TYPES,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../types";
import { ContentList } from "../ContentList";
import GrowingList from "../GrowingList";

export interface IShoutOfPraiseProps {
  content?: IContentListItem[];
  displayMethod?: PAST_CONTENT_DISPLAY_FORMATS;
}

export function ShoutOfPraise(props: IShoutOfPraiseProps) {
  console.log("ShoutOfPraise ------", props);
  console.log("ShoutOfPraise ----COMPLARE--", !props.displayMethod);

  const [message, setMessage] = useState<string>("");
  const [postAnonymously, setPostAnonymously] = useState<boolean>(false);

  const { content, displayMethod } = props;

  function handlePostAnonymouslyChanged(e: ChangeEvent<HTMLInputElement>) {
    setPostAnonymously(!postAnonymously);
  }

  function handlePostPraise() {
    alert(
      "Posting as : " +
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
              <div className="button-row pb-2 d-flex flex-row gap-2 justify-content-end">
                <Button variant="primary" onClick={handlePostPraise}>
                  Post Praise
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>

      {(!displayMethod ||
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.SIMPLE) && (
          <ContentList
            heading="Shouts of Praise"
            contentType={CONTENT_TYPES.PRAISE}
            viewAllLinkText="View all Shouts of Praise"
            viewAllLink="#VIEWALLSHOUTSOFPRAISE"
            content={props.content}
          />
        )}

      {displayMethod &&
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.FILTERED && (
          <>
            <GrowingList
              contentList={props.content || []}
              contentType={CONTENT_TYPES.PRAISE}
              itemsPerRow={1}
            />
          </>
        )}
    </>
  );
}
