import { Container } from "react-bootstrap";
import { BroadcastList } from "./BroadcastList";
import { BroadcastsFilter } from "./BroadcastsFilter";

export interface IBroadcastsPageProps {}

export function BroadcastsPage(props: IBroadcastsPageProps) {
  return (
    <Container fluid className="page-gutter full-width d-flex flex-column">
      <h2>Explore Messages</h2>
      <BroadcastsFilter />
      <BroadcastList />
    </Container>
  );
}
