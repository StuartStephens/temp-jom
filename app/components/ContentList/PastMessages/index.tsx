import { ContentList } from "..";
import {
  CONTENT_TYPES,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../../app/types";
import GrowingList from "../../GrowingList";
import { IContentListItem } from "../ContentListItem";

export interface IPastMessagesProps {
  content?: IContentListItem[] | null;
  displayMethod?: PAST_CONTENT_DISPLAY_FORMATS;
}

export function PastMessages(props: IPastMessagesProps) {
  // return (
  //   <ContentList
  //     heading="Past Messages"
  //     contentType={CONTENT_TYPES.MESSAGE}
  //     viewAllLinkText="View all Messages"
  //     viewAllLink="/how-to-watch/messages"
  //     content={props.content}
  //   ></ContentList>
  // );
  const { displayMethod } = props;

  return (
    <>
      {(!displayMethod ||
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.SIMPLE) && (
          <ContentList
            heading="Past Messages"
            contentType={CONTENT_TYPES.MESSAGE}
            viewAllLinkText="View all Messages"
            viewAllLink="/inspiration/messages"
            content={props.content}
          />
        )}

      {displayMethod &&
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.FILTERED && (
          <>
            <GrowingList
              contentList={props.content || []}
              contentType={CONTENT_TYPES.MESSAGE}
            />
          </>
        )}
    </>
  );
}
