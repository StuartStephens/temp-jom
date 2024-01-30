import Link from "next/link";
import { ILinkItemNode } from "../../cms/types/core/CoreTypes";
import { PageGutterLayout } from "../layouts/PageGutterLayout";

export interface ISocialMediaLinksProps {
  includeFacebook?: boolean;
  includeTwitter?: boolean;
  includePinterest?: boolean;
  includeEmail?: boolean;
  data: SocialMediaLinksAlias;
  variant?: string;
}

export interface SocialMediaLinksAlias {
  email?: ILinkItemNode;
  twitter?: ILinkItemNode;
  pinterest?: ILinkItemNode;
  facebook?: ILinkItemNode;
}
export function SocialMediaLinks({
  includeFacebook = true,
  includeEmail = true,
  includePinterest = true,
  includeTwitter = true,
  variant = "",
  data,
}: ISocialMediaLinksProps) {
  const { email, twitter, pinterest, facebook } = data;
  return (
    <PageGutterLayout>
      {((data && includeEmail) ||
        includeFacebook ||
        includePinterest ||
        includeTwitter) && (
        <div className="social-media-links d-flex flex-row align-center ">
          <div className="d-inline-block p-2">Share:</div>
          {includeFacebook && facebook && (
            <span className="icon-wrapper d-inline-block p-2">
              <Link href={`${facebook.Href}`} title={`${facebook.Title}`}>
                <i className={`bi bi-facebook text-${variant}`}></i>
              </Link>
            </span>
          )}
          {includeTwitter && twitter && (
            <span className="icon-wrapper d-inline-block p-2">
              <Link href={`${twitter.Href}`} title={`${twitter.Title}`}>
                <i className={`bi bi-twitter text-${variant}`}></i>
              </Link>
            </span>
          )}
          {includePinterest && pinterest && (
            <span className="icon-wrapper d-inline-block p-2">
              <Link href={`${pinterest.Href}`} title={`${pinterest.Title}`}>
                <i className={`bi bi-pinterest text-${variant}`}></i>
              </Link>
            </span>
          )}
          {includeEmail && email && (
            <span className="icon-wrapper d-inline-block p-2">
              <Link href={`${email.Href}`} title={`${email.Title}`}>
                <i className={`bi bi-envelope text-${variant}`}></i>
              </Link>
            </span>
          )}
        </div>
      )}
    </PageGutterLayout>
  );
}
