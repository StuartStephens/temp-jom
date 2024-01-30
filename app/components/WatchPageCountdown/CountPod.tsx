import { Container } from "react-bootstrap";

export interface ICountPodProps {
  counter: number;
  unit: string;
}

export function CountPod(props: ICountPodProps) {
  return (
    <Container className="count-pod d-flex flex-column align-items-center">
      <div className="counter fw-400">{props.counter}</div>
      <div className="unit">{props.unit}</div>
    </Container>
  );
}
