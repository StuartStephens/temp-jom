import * as React from "react";
import { SocialMediaLinks } from "../../../shared/SocialMediaLinks";
import { ILinkItemNode } from "../../types/core/CoreTypes";
import { PageGutterLayout } from "../../../shared/layouts/PageGutterLayout";

export interface ISocialMediaLinksBlock {
  Facebook?: ILinkItemNode;
  Twitter?: ILinkItemNode;
  Pinterest?: ILinkItemNode;
  Email?: ILinkItemNode;
  Variant?: string;
}
export interface ISocialMediaLinksBlockProps extends ISocialMediaLinksBlock {}

export function SocialMediaLinksBlock(props: ISocialMediaLinksBlockProps) {
  return (
    <PageGutterLayout>
      <SocialMediaLinks
        variant={`${props?.Variant || "muted"}`}
        includeFacebook={!!props?.Facebook}
        includeTwitter={!!props?.Twitter}
        includePinterest={!!props?.Pinterest}
        includeEmail={!!props?.Email}
        data={{
          facebook: props?.Email,
          twitter: props?.Email,
          pinterest: props?.Email,
          email: props?.Email,
        }}
      />
    </PageGutterLayout>
  );
}
