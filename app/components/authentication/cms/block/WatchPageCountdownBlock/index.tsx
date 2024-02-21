import { WatchPageCountdown } from "../../../WatchPageCountdown";
import { IXHTMLString } from "../../types/core/CoreTypes";

export interface IWatchPageCountdownBlockProps {
  Heading1: string;
  Heading2: string;
  Speaker: string;
  BodyCopy: IXHTMLString;
  QuoteCopy: IXHTMLString;
}

export function WatchPageCountdownBlock(props: IWatchPageCountdownBlockProps) {
  const { Heading1, Heading2, Speaker, BodyCopy, QuoteCopy } = props;
  return <WatchPageCountdown />;
}
