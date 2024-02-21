import { VideoRow } from "../../../VideoRow";
import { IVideo, IXHTMLString } from "../../types/core/CoreTypes";

export interface IVideoRowItem {
  Id: string;
  Caption?: string;
  Video?: IVideo;
  Heading?: string;
  Description?: IXHTMLString;
}

export interface IVideoRowBlockProps {
  Videos: IVideoRowItem[];
}

export function VideoRowBlock(props: IVideoRowBlockProps) {
  return <VideoRow videos={props.Videos} />;
}
