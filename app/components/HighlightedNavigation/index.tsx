import { Col, Container, Row } from "react-bootstrap";
import {
  HighlightedNavigationItem,
  IImageRowItem,
} from "./HighlightedNavigationItem";

export interface IHighlightedNavigation {
  leftItem: IImageRowItem;
  centerItem: IImageRowItem;
  rightItem: IImageRowItem;
  styleType?: string;
}
export interface IHighlightedNavigationProps extends IHighlightedNavigation {}

export function HighlightedNavigation(props: IHighlightedNavigationProps) {
  const { leftItem, centerItem, rightItem, styleType } = props;
  const DEBUG = process.env.NODE_ENV !== "production";

  if (!leftItem || !rightItem || !centerItem) {
    return null;
  }

  let typeClass: string = "style-1";
  switch (styleType) {
    case "Style 2 (White Icon)":
      typeClass = "style-2";
      break;
    default:
      typeClass = styleType || "style-1";
  }

  return (
    <Container
      fluid
      className={`${typeClass} full-width highlighted-navigation-block page-gutter`}
    >
      <Col>
        <Row xs={1} md={3}>
          <HighlightedNavigationItem {...leftItem} />
          <HighlightedNavigationItem {...centerItem} />
          <HighlightedNavigationItem {...rightItem} />
        </Row>
      </Col>
    </Container>
  );
}
