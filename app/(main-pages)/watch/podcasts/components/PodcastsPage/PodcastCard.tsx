import { Card, CardBody, CardHeader, Container, Image } from "react-bootstrap";
import {
  IImage,
  ILinkItemNode,
} from "../../../../../components/cms/types/core/CoreTypes";
import { JOMButtonLink } from "../../../../../components/shared/controls/JOMButtonLink";

export interface IPodcastCardProps {
  title: string;
  details: string;
  icon: IImage;
  link: ILinkItemNode;
}

export function PodcastCard(props: IPodcastCardProps) {
  return (
    <Card className="d-flex justify-content-center">
      <CardHeader className="d-flex justify-content-center">
        {props?.title}
      </CardHeader>
      <CardBody>
        <Container
          fluid
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Image
            src={props?.icon?.Url}
            alt={props?.icon?.Title}
            height={170}
            width={170}
          />
          <p className="text-center">{props?.details}</p>
          <div className="button-row  text-center text-md-center w-100">
            <JOMButtonLink href={props?.link?.Href}>
              {props?.link?.Title}
            </JOMButtonLink>
          </div>
        </Container>
      </CardBody>
    </Card>
  );
}
