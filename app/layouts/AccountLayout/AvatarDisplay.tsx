import { Container, Image } from "react-bootstrap";
import { useAuth } from "../../contexts/Auth/Context";
import { AvatarDialog } from "./AvatarDialog";

export interface IAvatarDisplayProps {}

export function AvatarDisplay(props: IAvatarDisplayProps) {
  const { emailHash } = useAuth();
  return (
    <Container
      fluid
      className="full-width  d-flex flex-column align-items-center  "
    >
      <Image
        src={`https://www.gravatar.com/avatar/${emailHash}`}
        height={130}
        roundedCircle
      />
      <AvatarDialog />
    </Container>
  );
}
