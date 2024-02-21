import Banner from "../shared/Banner/Banner";
import {
  IImage,
  ILinkItemNode,
  IXHTMLString,
} from "../cms/types/core/CoreTypes";
import { XHTMLRenderer } from "../shared/XHTMLRenderer";
import { JOMButtonLink } from "../shared/controls/JOMButtonLink";
import { Container } from "react-bootstrap";

export interface INightOfHopeProps {
  backgroundImage: IImage;
  heading: string;
  contentBody: IXHTMLString;
  links: ILinkItemNode[];
}

export function NightOfHope(props: INightOfHopeProps) {
  const { backgroundImage, heading, contentBody, links } = props;
  return (
    <Banner
      className="page-gutter page-gutter-large"
      backgroundImgUrl={backgroundImage?.Url}
      ariaTitle={backgroundImage?.Title}
    >
      <Container
        fluid
        className="page-gutter page-gutter-large d-flex flex-column gap-3 align-items-center p-3"
      >
        <h2 className="text-center">{heading}</h2>
        <XHTMLRenderer xhtml={contentBody} className="text-center" />
        {links &&
          links.map((link: ILinkItemNode) => {
            return (
              <JOMButtonLink
                href={link?.Href}
                buttonProps={{
                  variant: "primary",
                  className: "text-white",
                }}
              >
                {link.Title}
              </JOMButtonLink>
            );
          })}
      </Container>
    </Banner>
  );
}
