import { Button } from "react-bootstrap";
import { ILinkItemNode } from "../cms/types/core/CoreTypes";

export interface IMastHeadContentProps {
  pageTitle?: string;
  backgroundImageURL?: string | null | undefined;
  backgroundImageURL_large?: string | null | undefined;
  backgroundImageURL_mobile?: string | null | undefined;
  backgroundImageURL_tablet?: string | null | undefined;
  // iconClassName?: string;
  className?: string | null | undefined;
  lineOne?: string | null | undefined;
  lineTwo?: string | null | undefined;
  lineThree?: string | null | undefined;
  isOverlay: boolean | null | undefined;
  videoUrl?: string | null | undefined;
  ariaRole?: string | null | undefined;
  links?: ILinkItemNode[] | undefined; //LinkCollection
}

export function MastHeadContent(props: IMastHeadContentProps) {
  function handleLinkClicked(link: ILinkItemNode) {
    alert("Link Clicked" + link.Href);
  }
  return (
    <div className={`masthead  ${props.className}`}>
      <div className="masthead-content ">
        <h1>
          <span className="display-4 pe-3">{props.lineOne}</span>
          <span className="display-4 pe-3">{props.lineTwo}</span>
          <span className="display-4">{props.lineThree}</span>
        </h1>
        {props.links && props.links.length > 0 && (
          <div className="button-row gap-2 d-flex flex-row">
            {props.links.map((link: ILinkItemNode, index: number) => {
              const linkData: any = link?.ContentLink?.Expanded;
              return (
                <Button
                  key={linkData.Name}
                  variant="outline-light"
                  className="text-nowrap"
                  // onClick={() => {
                  //   handleLinkClicked(linkData);
                  // }}
                  href={link.Href}
                >
                  <span>{link.Title}</span>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
