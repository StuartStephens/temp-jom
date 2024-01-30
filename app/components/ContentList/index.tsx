"use client";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ContentListItem, IContentListItem } from "./ContentListItem";
import { CONTENT_TYPES } from "../../types";
import { JOMButtonLink } from "../shared/controls/JOMButtonLink";

export interface IContentListProps {
  contentType?: CONTENT_TYPES; // "MESSAGE" | "BLOG" | "ARTICLE"
  content?: IContentListItem[] | null;
  heading?: string;
  viewAllLinkText?: string; //TODO: we can derive this from the content type and get rid of it later
  viewAllLink?: string;
}

export function ContentList(props: IContentListProps) {
  const { contentType, content, heading, viewAllLinkText, viewAllLink } = props;

  return (
    <Container
      fluid
      className={`content-list page-gutter page-gutter-small  mb-2 type-${contentType}`}
    >
      {heading && (
        <Row className="separator">
          <Col xs={12} md={8} className="text-center text-md-start">
            <h3>{heading}</h3>
          </Col>

          <Col
            xs={0}
            md={4}
            className="justify-content-end align-items-center d-none d-md-flex "
          >
            {viewAllLink && viewAllLinkText && (
              <JOMButtonLink href={viewAllLink}>
                {viewAllLinkText}
              </JOMButtonLink>
            )}
          </Col>
        </Row>
      )}

      <Row className="gy-0 gx-3 gy-md-3" xs={1} md={3}>
        {content &&
          content.map((item, index) => {
            return (
              <Col key={index} className="">
                <ContentListItem contentListItem={item}></ContentListItem>
              </Col>
            );
          })}
      </Row>
      {viewAllLink && viewAllLinkText && (
        <Row xs={3} md={0} className="justify-content-center d-flex d-md-none">
          <JOMButtonLink href={viewAllLink}>{viewAllLinkText}</JOMButtonLink>
        </Row>
      )}
    </Container>
  );
}
