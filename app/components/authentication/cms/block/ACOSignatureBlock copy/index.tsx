import { ACOSignature } from "../../../ACOSignature";
import { IImage, IXHTMLString } from "../../types/core/CoreTypes";

export interface IACOSignatureBlockProps {
  Heading: "string";
  Copy: IXHTMLString;
  SignatureImage: IImage;
  Image: IImage;
}

export function ACOSignatureBlock(props: IACOSignatureBlockProps) {
  const { Heading, Copy, SignatureImage, Image } = props;
  return (
    <ACOSignature
      heading={Heading}
      bodyCopy={Copy}
      signatureImage={SignatureImage}
      image={Image}
    />
  );
}
