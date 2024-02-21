import { IXHTMLString } from "../cms/types/core/CoreTypes";
import { XHTMLRenderer } from "../shared/XHTMLRenderer";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../shared/layouts/PageGutterLayout";

export interface IRichTextRowProps {
  bodyCopy: IXHTMLString;
}

export function RichTextRow(props: IRichTextRowProps) {
  const { bodyCopy } = props;
  return bodyCopy?.Data && bodyCopy?.Data.length > 0 ? (
    <PageGutterLayout className="rich-text-row-block">
      <PageGutterLayout variant={PAGE_GUTTER.NONE} className="">
        <p>
          <XHTMLRenderer xhtml={bodyCopy} />
        </p>
      </PageGutterLayout>
    </PageGutterLayout>
  ) : null;
}
