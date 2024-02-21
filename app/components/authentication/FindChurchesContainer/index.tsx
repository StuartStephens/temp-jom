import { Container } from "react-bootstrap";
import { SearchForChurch } from "./SearchForChurch";
import { SuggestAChurch } from "./SuggestAChurch";

export interface IFindChurchesContainerProps {}

export function FindChurchesContainer(props: IFindChurchesContainerProps) {
  return (
    <Container fluid className="find-churches-container-block full-width ">
      <SearchForChurch />
      <SuggestAChurch />
    </Container>
  );
}
