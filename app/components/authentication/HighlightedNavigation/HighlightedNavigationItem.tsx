import Link from "next/link";
import { Button, Image } from "react-bootstrap";
import { ILinkItemNode } from "../cms/types/core/CoreTypes";
import { StringifyOptions } from "querystring";
import { JOMButtonLink } from "../shared/controls/JOMButtonLink";

export interface IImageRowItem {
  iconUrl?: string;
  iconAltText?: string;
  link?: ILinkItemNode;
  heading?: string;
  heading2?: string;
}
// Icon {
//   Url
// }
// Link {
//   Href
//   Target
//   Text
//   Title
// }
// LinkLabel
// Heading

export interface IHighlightedNavigationItemProps extends IImageRowItem {}

export function HighlightedNavigationItem(
  props: IHighlightedNavigationItemProps
) {
  const { iconUrl, iconAltText, link, heading, heading2 } = props;

  return (
    <div className=" py-3 highlighted-nav-item d-flex justify-content-start align-items-center flex-column">
      <div className="d-flex flex-column align-items-center h-100 justify-content-between">
        {iconUrl && (
          <div className="highlighted-nav-image-wrapper mx-auto fs-2 mb-1 ">
            <Image
              height={72}
              src={iconUrl || ""}
              alt={iconAltText || "presentation icon"}
              title={heading || "presentation icon"}
              role="presentation"
            />
          </div>
        )}
        {heading && (
          <div className="highlighted-nav-title-wrapper mx-auto fs-2 mb-1">
            {heading}
          </div>
        )}

        {heading2 && (
          <div className="highlighted-nav-title-wrapper mx-auto fs-5 mb-1">
            {heading2}
          </div>
        )}
        {link && (
          <div className="highlighted-nav-link-wrapper mx-auto mb-1">
            {
              <JOMButtonLink href="manage-account/transaction-history">
                <span>{`${link?.Title}`}</span>
                <span>
                  <i className="bi bi-chevron-right pe-3 d-none d-md-inline"></i>
                </span>
              </JOMButtonLink>
            }
          </div>
        )}
      </div>
    </div>
  );
}
