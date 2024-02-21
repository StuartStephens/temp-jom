import { AboutUsContent } from "../../../AboutUsContent";
import { IXHTMLString } from "../../types/core/CoreTypes";

export interface IAboutUsContentBlockProps {
  Heading1: string;
  Heading2: string;
  Speaker: string;
  BodyCopy: IXHTMLString;
  QuoteCopy: IXHTMLString;
}

export function AboutUsContentBlock(props: IAboutUsContentBlockProps) {
  const { Heading1, Heading2, Speaker, BodyCopy, QuoteCopy } = props;
  return (
    <AboutUsContent
      author={Speaker}
      bodyCopy={BodyCopy}
      quoteCopy={QuoteCopy}
      heading1={Heading1}
      heading2={Heading2}
    />
  );
}
