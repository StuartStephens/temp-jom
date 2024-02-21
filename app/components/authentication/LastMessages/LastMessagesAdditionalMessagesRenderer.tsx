import { Col, Container, Row } from "react-bootstrap";
import { CONTENT_TYPES, IMessage } from "../../../app/types";
import {
  ContentListItem,
  IContentListItem,
} from "../ContentList/ContentListItem";

export interface ILastMessagesAdditionalMessagesRendererProps {
  messages: IMessage[];
}

export function LastMessagesAdditionalMessagesRenderer(
  props: ILastMessagesAdditionalMessagesRendererProps
) {
  const { messages: additionalMessages } = props;
  if (!additionalMessages || additionalMessages.length < 1) {
    return null;
  }
  return (
    <div>
      {additionalMessages && additionalMessages.length > 1 && (
        <Container fluid className="last-messages-additional page-gutter pt-3">
          <Row className="gy-0 gx-3 gy-md-3 " xs={1} md={2}>
            {additionalMessages &&
              additionalMessages.map((message: IMessage, index: number) => {
                const item: IContentListItem = {
                  contentType: CONTENT_TYPES.MESSAGE,
                  thumbnailUrl: message.thumbnailURL,
                  title: message.title,
                  speaker:
                    message?.speaker?.firstName + message?.speaker?.lastName,
                  messageID: "" + message.messageNumber,
                  date: message.displayDate,
                  launchUrl: message?.primaryLink?.Href,
                };
                if (index > 1) {
                  return null;
                }
                return (
                  <Col key={`last_messages_mesage${index}`} className="">
                    <ContentListItem contentListItem={item}></ContentListItem>
                  </Col>
                );
              })}
          </Row>
        </Container>
      )}
    </div>
  );
}
