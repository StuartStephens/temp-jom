import { NightOfHope } from "../../../NightOfHope";
import {
  IImage,
  ILinkItemNode,
  IXHTMLString,
} from "../../types/core/CoreTypes";

export interface INightOfHopeBlockProps {
  BackgroundImage: IImage;
  Heading: string;
  Content: IXHTMLString;
  Links: ILinkItemNode[];
}

export function NightOfHopeBlock(props: INightOfHopeBlockProps) {
  const { BackgroundImage, Heading, Content, Links } = props;
  return (
    <NightOfHope
      backgroundImage={BackgroundImage}
      heading={Heading}
      contentBody={Content}
      links={Links}
    ></NightOfHope>
  );
}
