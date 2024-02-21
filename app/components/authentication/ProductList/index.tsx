import {
  CONTENT_TYPES,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../app/types";
import { ContentList } from "../ContentList";
import { IContentListItem } from "../ContentList/ContentListItem";
import GrowingList from "../GrowingList";

export interface IProductListProps {
  contentType?: CONTENT_TYPES; // "BOOK" | "MUSIC" | "SERIES" | "GIFT"
  content?: IContentListItem[];
  displayMethod?: PAST_CONTENT_DISPLAY_FORMATS;
  heading?: string;
  viewAllLinkText?: string; //TODO: we can derive this from the content type and get rid of it later
  viewAllLink?: string;
}

export function ProductList(props: IProductListProps) {
  const { displayMethod } = props;

  return (
    <>
      {(!displayMethod ||
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.SIMPLE) && (
        <ContentList
          heading={props.heading}
          contentType={CONTENT_TYPES.BOOK}
          viewAllLinkText={props.viewAllLinkText}
          viewAllLink={props.viewAllLink}
          content={props.content}
        />
      )}

      {displayMethod &&
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.FILTERED && (
          <>
            <GrowingList
              contentList={props.content || []}
              contentType={CONTENT_TYPES.BOOK}
            />
          </>
        )}
    </>
  );
}
