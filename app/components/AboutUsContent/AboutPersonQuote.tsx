import { PropsWithChildren } from "react";

export interface IAboutPersonQuoteProps {
  author: string;
}

export function AboutPersonQuote(
  props: PropsWithChildren<IAboutPersonQuoteProps>
) {
  const { author } = props;
  return (
    <div className="quote">
      {props.children}
      {author && (
        <div className="signature">
          <span>- {author}</span>
        </div>
      )}
    </div>
  );
}
