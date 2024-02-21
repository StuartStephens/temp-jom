import { IXHTMLString } from "../cms/types/core/CoreTypes";
import { XHTMLRenderer } from "../shared/XHTMLRenderer";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../shared/layouts/PageGutterLayout";
import { AboutPersonQuote } from "./AboutPersonQuote";

export interface IAboutUsContentProps {
  heading1: string;
  heading2: string;
  bodyCopy: IXHTMLString;
  quoteCopy: IXHTMLString;
  author: string;
}

export function AboutUsContent(props: IAboutUsContentProps) {
  const { heading1, heading2, bodyCopy, quoteCopy } = props;
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      {heading1 && heading1.length > 0 && (
        <div>
          <h2>{heading1}</h2>
        </div>
      )}
      {heading2 && heading2.length > 0 && (
        <div>
          <h3>{heading2}</h3>
        </div>
      )}
      {bodyCopy && bodyCopy?.Data && bodyCopy?.Data.length > 0 && (
        <p>
          <XHTMLRenderer xhtml={bodyCopy} />
        </p>
      )}

      {quoteCopy && quoteCopy?.Data && quoteCopy?.Data.length > 0 && (
        <div className=" about-person">
          <AboutPersonQuote author={props.author}>
            <XHTMLRenderer xhtml={quoteCopy} />
          </AboutPersonQuote>
        </div>
      )}
    </PageGutterLayout>
  );
}
