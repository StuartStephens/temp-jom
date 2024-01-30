import * as React from "react";
import { IImage, IXHTMLString } from "../cms/types/core/CoreTypes";
import { Container, Image } from "react-bootstrap";
import { XHTMLRenderer } from "../shared/XHTMLRenderer";

export interface IACOSignatureProps {
  heading: string;
  bodyCopy: IXHTMLString;
  signatureImage: IImage;
  image: IImage;
}

export function ACOSignature(props: IACOSignatureProps) {
  const { heading, bodyCopy, signatureImage, image } = props;
  return (
    <Container
      fluid
      className="aco-signature d-flex flex-column flex-md-row p-1 p-md-5"
    >
      <Container
        fluid
        className="aco-signature d-flex flex-column justify-content-center justify-content-md-center"
      >
        <h3>{heading}</h3>
        <XHTMLRenderer xhtml={bodyCopy} />
        <div className="text-center text-md-start">
          <Image
            className="py-3"
            src={signatureImage?.Url}
            alt={signatureImage?.Title}
            fluid
            width={140}
          />
        </div>
      </Container>
      <Container
        fluid
        className="aco-signature d-flex flex-column justify-content-center justify-content-md-center"
      >
        <Image src={image?.Url} alt={image?.Title} fluid width={610} />
      </Container>
    </Container>
  );
}
