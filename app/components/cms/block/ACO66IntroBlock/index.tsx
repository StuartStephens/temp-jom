import { ACO66Intro } from "../../../ACO66Intro";
import { IIFrameEmbed, IImage, IXHTMLString } from "../../types/core/CoreTypes";

export interface IACO66IntroBlockProps {
  Heading: string;
  Copy: IXHTMLString;
  IFrameEmbed: IIFrameEmbed;
  FallbackImage: IImage;
}

export function ACO66IntroBlock(props: IACO66IntroBlockProps) {
  const { Heading, Copy, IFrameEmbed, FallbackImage } = props;
  return (
    <ACO66Intro
      heading={Heading}
      bodyCopy={Copy}
      iframe={IFrameEmbed}
      fallbackImage={FallbackImage}
    />
  );
}
