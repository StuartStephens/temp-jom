import { IXHTMLString } from "../../cms/types/core/CoreTypes";

export interface IXHTMLRendererProps {
  xhtml?: IXHTMLString;
  className?: string;
}

export function XHTMLRenderer(props: IXHTMLRendererProps) {
  // var el = document.createElement("html");
  // el.innerHTML = props.xhtml?.Data;

  return props?.xhtml ? (
    <span
      className={`${props.className}`}
      dangerouslySetInnerHTML={{ __html: props.xhtml?.Data || "UNKNONE" }}
    />
  ) : null;
}
