import { RichTextRow } from "../../../RichTextRow";
import { PageGutterLayout } from "../../../shared/layouts/PageGutterLayout";
import { IXHTMLString } from "../../types/core/CoreTypes";

export interface IAboutUsContentBlockProps {
  Copy: IXHTMLString;
  ContentType: string;
}

export function RichTextRowBlock(props: IAboutUsContentBlockProps) {
  const { Copy, ContentType } = props;
  return <RichTextRow bodyCopy={Copy} />;
}
